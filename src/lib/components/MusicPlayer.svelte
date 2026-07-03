<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { TRACKS, type Track } from '$lib/content/music';
  import { autoplaySignal } from '$lib/stores/music';

  // 'hidden' = not yet activated | 'closed' = tiny pill | 'mini' = compact bar | 'full' = panel
  type State = 'hidden' | 'closed' | 'mini' | 'full';

  let audioEl: HTMLAudioElement;
  let view     = $state<State>('hidden');
  let track    = $state<Track | null>(null);
  let playing  = $state(false);
  let time     = $state(0);
  let duration = $state(0);

  const pct = $derived(duration ? (time / duration) * 100 : 0);

  /* ── Playback ── */
  function loadAndPlay(t: Track) {
    track = t;
    if (!audioEl) return;
    audioEl.src = t.file;
    audioEl.load();
    audioEl.play().then(() => { playing = true; }).catch(() => { playing = false; });
  }

  function togglePlay() {
    if (!audioEl || !track) return;
    if (playing) { audioEl.pause(); playing = false; }
    else { audioEl.play().then(() => { playing = true; }).catch(() => {}); }
  }

  function playNext() {
    if (!TRACKS.length) return;
    const i = track ? TRACKS.findIndex(t => t.id === track!.id) : -1;
    loadAndPlay(TRACKS[(i + 1) % TRACKS.length]);
  }

  function playPrev() {
    if (!TRACKS.length) return;
    if (time > 3 && audioEl) { audioEl.currentTime = 0; return; }
    const i = track ? TRACKS.findIndex(t => t.id === track!.id) : 0;
    loadAndPlay(TRACKS[(i - 1 + TRACKS.length) % TRACKS.length]);
  }

  function fmt(s: number): string {
    if (!isFinite(s) || isNaN(s)) return '0:00';
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  }

  function seek(e: Event) {
    const v = +(e.target as HTMLInputElement).value;
    if (audioEl) audioEl.currentTime = v;
    time = v;
  }

  /* ── Drag ── */
  const POS_KEY = 'music-player-pos';

  function loadPos(): { x: number; y: number } | null {
    try {
      const raw = localStorage.getItem(POS_KEY);
      if (!raw) return null;
      const p = JSON.parse(raw);
      if (typeof p.x === 'number' && typeof p.y === 'number') return p;
    } catch {}
    return null;
  }

  function savePos(p: { x: number; y: number }) {
    try { localStorage.setItem(POS_KEY, JSON.stringify(p)); } catch {}
  }

  let rootEl: HTMLElement;
  let pos        = $state<{ x: number; y: number } | null>(null);
  let dragging   = $state(false);
  let hasDragged = false;
  let dragStart  = { mx: 0, my: 0, ex: 0, ey: 0 };

  function startDrag(e: PointerEvent) {
    if (e.button !== 0) return;
    const rect = rootEl.getBoundingClientRect();
    dragStart  = { mx: e.clientX, my: e.clientY, ex: rect.left, ey: rect.top };
    dragging   = true;
    hasDragged = false;
    document.body.style.cursor     = 'grabbing';
    document.body.style.userSelect = 'none';
    window.addEventListener('pointermove',   onDragMove);
    window.addEventListener('pointerup',     endDrag);
    window.addEventListener('pointercancel', endDrag);
  }

  function onDragMove(e: PointerEvent) {
    const dx = e.clientX - dragStart.mx;
    const dy = e.clientY - dragStart.my;
    if (!hasDragged && Math.hypot(dx, dy) < 8) return;
    hasDragged = true;
    pos = {
      x: Math.max(0, Math.min(dragStart.ex + dx, window.innerWidth  - rootEl.offsetWidth)),
      y: Math.max(0, Math.min(dragStart.ey + dy, window.innerHeight - rootEl.offsetHeight)),
    };
  }

  function clampToViewport() {
    if (!rootEl || !pos) return;
    const w = rootEl.offsetWidth;
    const h = rootEl.offsetHeight;
    const clamped = {
      x: Math.max(0, Math.min(pos.x, window.innerWidth  - w)),
      y: Math.max(0, Math.min(pos.y, window.innerHeight - h)),
    };
    pos = clamped;
    savePos(clamped);
  }

  function snapToEdge() {
    if (!rootEl) return;
    const w = rootEl.offsetWidth;
    const h = rootEl.offsetHeight;
    const curX = pos?.x ?? (window.innerWidth - w - 16);
    const curY = pos?.y ?? (window.innerHeight - h - 64);
    const snapped = {
      x: (curX + w / 2) < window.innerWidth / 2 ? 0 : window.innerWidth - w,
      y: Math.max(0, Math.min(curY, window.innerHeight - h)),
    };
    pos = snapped;
    savePos(snapped);
  }

  function endDrag() {
    if (!dragging) return;
    dragging = false;
    document.body.style.cursor     = '';
    document.body.style.userSelect = '';
    window.removeEventListener('pointermove',   onDragMove);
    window.removeEventListener('pointerup',     endDrag);
    window.removeEventListener('pointercancel', endDrag);
    if (view === 'closed') {
      // defer one frame so the is-dragging class (transition:none) is removed
      // before we update pos — otherwise browser applies both in the same paint
      // and the CSS transition never fires
      requestAnimationFrame(snapToEdge);
    } else if (pos) {
      savePos(pos);
    }
  }

  /* ── Set default volume on mount; restore saved position; clean up on unmount ── */
  onMount(() => {
    if (audioEl) audioEl.volume = 0.40;
    const saved = loadPos();
    if (saved) {
      pos = {
        x: Math.max(0, Math.min(saved.x, window.innerWidth  - 300)),
        y: Math.max(0, Math.min(saved.y, window.innerHeight - 60)),
      };
    }
    return () => endDrag();
  });

  /* ── Show & auto-play when user first enters /outdoors ── */
  $effect(() => {
    const isOutdoors = page.url.pathname.startsWith('/outdoors');
    if (isOutdoors && view === 'hidden') {
      view = 'mini';
      if (TRACKS.length) loadAndPlay(TRACKS[0]);
    }
  });

  /* ── Signal from trail detail pages — resume play if paused ── */
  $effect(() => {
    return autoplaySignal.subscribe(val => {
      if (!val) return;
      autoplaySignal.set(false);
      if (view === 'hidden') view = 'mini';
      if (!track && TRACKS.length) loadAndPlay(TRACKS[0]);
      else if (track && !playing) togglePlay();
    });
  });
</script>

<!-- Audio element — always in DOM -->
<audio
  bind:this={audioEl}
  onended={playNext}
  ontimeupdate={() => { time = audioEl?.currentTime ?? 0; }}
  onloadedmetadata={() => { duration = audioEl?.duration ?? 0; }}
></audio>

<div
  class="root"
  class:is-dragging={dragging}
  bind:this={rootEl}
  style={pos ? `left:${pos.x}px;top:${pos.y}px;right:auto;bottom:auto` : ''}
>

  <!-- ══ CLOSED — tiny re-open pill ══ -->
  {#if view === 'closed'}
    <button
      class="reopen-pill"
      onpointerdown={startDrag}
      onclick={() => {
        if (hasDragged) return;
        view = 'mini';
        // pos was sized for the 30px pill; after Svelte renders the 300px player
        // we re-clamp so it doesn't extend off the right edge
        requestAnimationFrame(clampToViewport);
      }}
      aria-label="Open music player"
    >
      {#if playing}<span class="reopen-pulse" aria-hidden="true"></span>{/if}
      <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6Z"/>
      </svg>
    </button>
  {/if}

  <!-- ══ MINI + FULL — share the bottom controls bar ══ -->
  {#if view === 'mini' || view === 'full'}
    <div class="player">

      <!-- Drag handle -->
      <div class="drag-handle" onpointerdown={startDrag} aria-hidden="true">
        <span class="drag-dots"></span>
      </div>

      <!-- Track list (full only) -->
      {#if view === 'full'}
        <div class="panel-top">
          <div class="panel-header">
            <span class="panel-label">// music</span>
            <button class="icon-btn" onclick={() => { view = 'mini'; }} aria-label="Collapse">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
            </button>
          </div>
          <ul class="track-list">
            {#each TRACKS as t}
              <li>
                <button
                  class="track-row"
                  class:active={track?.id === t.id}
                  onclick={() => loadAndPlay(t)}
                >
                  <span class="track-row-icon" aria-hidden="true">
                    {#if track?.id === t.id && playing}▶{:else}◉{/if}
                  </span>
                  <span class="track-row-title">{t.title}</span>
                  <span class="track-row-artist">{t.artist}</span>
                </button>
              </li>
            {/each}
          </ul>
          <!-- seek in full mode -->
          <div class="full-seek">
            <span class="seek-time">{fmt(time)}</span>
            <input class="seek-range" type="range" min="0" max={duration || 1} value={time} oninput={seek} aria-label="Seek" />
            <span class="seek-time">{fmt(duration)}</span>
          </div>
        </div>
      {/if}

      <!-- ─ Controls bar (mini & full) ─ -->
      <div class="bar">
        <!-- Vinyl disc avatar — click to toggle full/mini -->
        <button
          class="disc"
          class:spinning={playing}
          onclick={() => { view = view === 'full' ? 'mini' : 'full'; }}
          aria-label={view === 'full' ? 'Collapse player' : 'Expand player'}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6Z"/>
          </svg>
        </button>

        <!-- Title (click to expand) -->
        <button
          class="title-btn"
          onclick={() => { view = view === 'full' ? 'mini' : 'full'; }}
          aria-label="Track info"
        >
          <span class="bar-title">{track?.title ?? '—'}</span>
          {#if view === 'mini'}
            <span class="bar-artist">{track?.artist ?? ''}</span>
          {/if}
        </button>

        <!-- Prev -->
        <button class="ctrl" onclick={playPrev} aria-label="Previous" disabled={!track}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6 8.5 6V6z"/></svg>
        </button>

        <!-- Play / Pause -->
        <button class="ctrl play" onclick={togglePlay} aria-label={playing ? 'Pause' : 'Play'} disabled={!track}>
          {#if playing}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6zm8-14v14h4V5z"/></svg>
          {:else}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          {/if}
        </button>

        <!-- Next -->
        <button class="ctrl" onclick={playNext} aria-label="Next" disabled={!track}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6zm8.5-6v6h2V6h-2z"/></svg>
        </button>

        <!-- Close -->
        <button class="ctrl close" onclick={() => { view = 'closed'; requestAnimationFrame(snapToEdge); }} aria-label="Close player">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </button>
      </div>

      <!-- Progress line -->
      <div class="progress-track">
        <div class="progress-fill" style="width:{pct}%"></div>
      </div>

    </div>
  {/if}

</div>

<style>
  .root {
    position: fixed;
    bottom: calc(var(--status-bar-height) + 0.75rem);
    right: 1rem;
    z-index: 40;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0;
    transition: left 0.28s cubic-bezier(0.34, 1.56, 0.64, 1),
                top  0.22s ease;
  }

  .root.is-dragging { transition: none; }

  /* ── Closed pill ── */
  .reopen-pill {
    display: flex; align-items: center; justify-content: center;
    width: 30px; height: 30px;
    background: var(--bg-sidebar);
    border: 0.5px solid var(--border-mid);
    color: var(--fg-muted); cursor: grab;
    box-shadow: var(--glow-card); position: relative;
    transition: color 0.15s, border-color 0.15s;
    touch-action: none;
  }
  .reopen-pill:active { cursor: grabbing; }
  .reopen-pill:hover { color: var(--fg); border-color: var(--grad-a); }
  .reopen-pill:focus-visible { outline: 1px solid var(--grad-a); outline-offset: -1px; }

  .reopen-pulse {
    position: absolute; inset: -4px;
    border: 1px solid var(--grad-a);
    opacity: 0; border-radius: 50%;
    animation: rp 2s ease-out infinite;
    pointer-events: none;
  }
  @keyframes rp {
    0%   { opacity: 0.6; transform: scale(1);    }
    100% { opacity: 0;   transform: scale(1.5); }
  }

  /* ── Dragging state ── */
  .root.is-dragging { cursor: grabbing !important; user-select: none; }

  /* ── Drag handle ── */
  .drag-handle {
    height: 16px; width: 100%;
    display: flex; align-items: center; justify-content: center;
    cursor: grab; flex-shrink: 0;
    background: var(--bg-activity);
    border-bottom: 0.5px solid var(--border);
    touch-action: none;
  }
  .drag-handle:active { cursor: grabbing; }
  .drag-dots {
    display: block; width: 20px; height: 3px;
    background: repeating-linear-gradient(
      90deg,
      var(--border-mid) 0, var(--border-mid) 3px,
      transparent     3px, transparent     6px
    );
    border-radius: 2px; opacity: 0.7;
  }

  /* ── Player container ── */
  .player {
    width: 300px;
    background: var(--bg-sidebar);
    border: 0.5px solid var(--border-mid);
    box-shadow: var(--glow-card), var(--glow);
    display: flex; flex-direction: column;
    overflow: hidden;
  }

  /* ── Panel top (full mode only) ── */
  .panel-top {
    display: flex; flex-direction: column;
    border-bottom: 0.5px solid var(--border);
  }

  .panel-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0.4rem 0.65rem;
    background: var(--bg-activity);
    border-bottom: 0.5px solid var(--border);
  }
  .panel-label {
    font-family: var(--font-mono); font-size: 0.6rem; font-weight: 700;
    letter-spacing: 0.08em; color: var(--fg-dim); text-transform: uppercase;
  }
  .icon-btn {
    background: none; border: none; color: var(--fg-muted);
    cursor: pointer; padding: 0.1rem; display: flex; align-items: center;
    transition: color 0.12s;
  }
  .icon-btn:hover { color: var(--fg); }
  .icon-btn:focus-visible { outline: 1px solid var(--grad-a); outline-offset: 1px; }

  /* track list */
  .track-list {
    list-style: none; margin: 0; padding: 0.25rem 0;
    max-height: 160px; overflow-y: auto; scrollbar-width: thin;
    scrollbar-color: rgba(128,128,128,0.2) transparent;
  }
  .track-row {
    display: flex; align-items: center; gap: 0.45rem;
    width: 100%; padding: 0.25rem 0.65rem;
    background: none; border: none; cursor: pointer; text-align: left;
    transition: background 0.1s;
  }
  .track-row:hover { background: var(--bg-hover); }
  .track-row.active { background: var(--bg-active); }
  .track-row:focus-visible { outline: 1px solid var(--grad-a); outline-offset: -1px; }

  .track-row-icon {
    font-size: 0.58rem; width: 0.85rem; text-align: center; flex-shrink: 0;
    background: var(--gradient-text);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .track-row:not(.active) .track-row-icon { -webkit-text-fill-color: var(--fg-dim); }

  .track-row-title {
    font-family: var(--font-mono); font-size: 0.7rem; color: var(--fg-muted);
    flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    transition: color 0.12s;
  }
  .track-row.active .track-row-title,
  .track-row:hover .track-row-title { color: var(--fg); }

  .track-row-artist {
    font-family: var(--font-mono); font-size: 0.58rem; color: var(--fg-dim); flex-shrink: 0;
  }

  /* seek in full mode */
  .full-seek {
    display: flex; align-items: center; gap: 0.4rem;
    padding: 0.45rem 0.65rem;
    border-top: 0.5px solid var(--border);
  }
  .seek-time {
    font-family: var(--font-mono); font-size: 0.58rem; color: var(--fg-dim);
    flex-shrink: 0; min-width: 2rem;
  }
  .seek-time:last-child { text-align: right; }
  .seek-range {
    flex: 1; height: 2px; appearance: none; cursor: pointer;
    background: var(--border-mid); border-radius: 1px;
  }
  .seek-range::-webkit-slider-thumb {
    appearance: none; width: 8px; height: 8px; border-radius: 50%;
    background: var(--fg); cursor: pointer;
  }
  .seek-range::-moz-range-thumb {
    width: 8px; height: 8px; border-radius: 50%;
    border: none; background: var(--fg); cursor: pointer;
  }

  /* ── Controls bar ── */
  .bar {
    display: flex; align-items: center; gap: 0.25rem;
    padding: 0.45rem 0.55rem;
    height: 52px;
  }

  /* Vinyl disc */
  .disc {
    width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
    background: var(--bg-editor);
    border: 1.5px solid var(--border-mid);
    display: flex; align-items: center; justify-content: center;
    color: var(--fg-dim); cursor: pointer;
    animation: spin 6s linear infinite;
    animation-play-state: paused;
    transition: border-color 0.2s, color 0.2s;
    position: relative; overflow: hidden;
  }
  .disc::before {
    content: '';
    position: absolute; inset: 0; border-radius: 50%;
    background: repeating-conic-gradient(
      rgba(255,255,255,0.015) 0deg,
      transparent 1deg,
      transparent 3deg
    );
    pointer-events: none;
  }
  .disc.spinning {
    animation-play-state: running;
    border-color: var(--grad-a); color: var(--fg);
  }
  .disc:focus-visible { outline: 1px solid var(--grad-a); outline-offset: 2px; }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  /* Title button */
  .title-btn {
    flex: 1; min-width: 0;
    display: flex; flex-direction: column; gap: 0.05rem;
    background: none; border: none; cursor: pointer; text-align: left;
    padding: 0 0.15rem;
  }
  .title-btn:focus-visible { outline: 1px solid var(--grad-a); outline-offset: 1px; }

  .bar-title {
    font-family: var(--font-mono); font-size: 0.72rem; font-weight: 600;
    color: var(--fg); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    display: block;
  }
  .bar-artist {
    font-family: var(--font-mono); font-size: 0.58rem; color: var(--fg-muted);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block;
  }

  /* Control buttons */
  .ctrl {
    display: flex; align-items: center; justify-content: center;
    width: 26px; height: 26px; flex-shrink: 0;
    background: none; border: none; color: var(--fg-muted);
    cursor: pointer; transition: color 0.12s;
    border-radius: 2px;
  }
  .ctrl:hover:not(:disabled) { color: var(--fg); }
  .ctrl:disabled { opacity: 0.3; cursor: default; }
  .ctrl:focus-visible { outline: 1px solid var(--grad-a); outline-offset: 1px; }

  .ctrl.play {
    width: 30px; height: 30px; border-radius: 50%;
    background: var(--bg-active); border: 0.5px solid var(--grad-a);
    color: var(--fg);
  }
  .ctrl.play:hover:not(:disabled) { background: rgba(189,52,254,0.18); }

  .ctrl.close { color: var(--fg-dim); }
  .ctrl.close:hover { color: var(--fg-muted); }

  /* Progress line */
  .progress-track {
    height: 2px; background: var(--border); flex-shrink: 0;
  }
  .progress-fill {
    height: 100%; background: var(--gradient-line);
    transition: width 0.4s linear;
    max-width: 100%;
  }

  @media (max-width: 767px) {
    .root { bottom: 4rem; right: 0.75rem; }
    .player { width: 260px; }
  }
</style>

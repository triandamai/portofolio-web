<script lang="ts">
  import Button from '../ui/Button.svelte';
  import Fab from '../ui/Fab.svelte';
  import { snackbar } from '../stores/snackbar.svelte';
  import { EMAIL, GITHUB, LINKEDIN } from '../content';

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      snackbar.show('Email copied');
    } catch {
      snackbar.show(`Copy failed. The address is ${EMAIL}`);
    }
  }
</script>

<footer class="foot" id="contact">
  <div class="copy">
    <h2>Got an app that<br /><span>needs shipping?</span></h2>
    <a class="mail" href="mailto:{EMAIL}">{EMAIL}</a>
    <p class="note">I usually reply within 1–2 days. Open to full-time roles, freelance and consulting.</p>
  </div>
  <div class="links">
    <Fab icon="content_copy" label="Copy email" extended onclick={copyEmail} />
    <Button variant="outlined" size="md" href={GITHUB} target="_blank" rel="noopener noreferrer" class="on-inverse">GitHub</Button>
    <Button variant="outlined" size="md" href={LINKEDIN} target="_blank" rel="noopener noreferrer" class="on-inverse">LinkedIn</Button>
  </div>
  <p class="legacy">
    <a href="/v2/contact">Send a message</a> · <a href="/v2/system">Design system</a> · Prefer the old editor look? <a href="/v1" data-sveltekit-reload>Open the IDE edition (v1)</a>
  </p>
</footer>

<style>
  .foot {
    display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 24px 32px; align-items: end;
    /* Always dark so the pastel brand gradient on the headline keeps its contrast in both themes */
    background: var(--hero-ink); color: var(--hero-paper);
    border-radius: var(--r-xxl) var(--r-xxl) var(--r-md) var(--r-xxl);
    padding: clamp(24px, 4vw, 48px); scroll-margin-top: 24px;
  }
  h2 {
    font-family: var(--font-display); font-size: clamp(2.2rem, 6vw, 4.6rem); line-height: .9; letter-spacing: -.03em;
    font-weight: 850; font-variation-settings: 'wdth' 40, 'wght' 850, 'opsz' 144;
  }
  h2 span { background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent; }
  .mail { display: inline-block; margin-top: 18px; font: 600 clamp(15px, 2vw, 20px)/1.3 var(--font-mono); text-decoration: none; overflow-wrap: anywhere; }
  .mail:hover { text-decoration: underline; text-underline-offset: 4px; }
  .note { margin-top: 8px; opacity: .75; font-size: 15px; max-width: 44ch; }
  .links { display: flex; gap: 8px; flex-wrap: wrap; }
  .links :global(.on-inverse) { color: var(--hero-paper); box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--hero-paper) 40%, transparent); }
  .legacy { grid-column: 1 / -1; font-size: 13px; opacity: .7; border-top: 1px solid color-mix(in srgb, var(--hero-paper) 18%, transparent); padding-top: 16px; }
  .legacy a { color: inherit; }
  @media (max-width: 840px) { .foot { grid-template-columns: minmax(0, 1fr); border-radius: var(--r-xl); } }
</style>

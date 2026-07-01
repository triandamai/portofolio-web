<script lang="ts">
  import { dialogStore } from '$lib/stores/dialog.svelte';

  let name    = $state('');
  let email   = $state('');
  let message = $state('');
  let sent    = $state(false);

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${name}`);
    const body    = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
    window.location.href = `mailto:triandamai@gmail.com?subject=${subject}&body=${body}`;
    sent = true;
    setTimeout(() => dialogStore.close(), 1600);
  }
</script>

{#if sent}
  <div class="sent">
    <span class="sent__icon" aria-hidden="true">◉</span>
    <p class="sent__text">Opening your email client…</p>
  </div>
{:else}
  <form class="form" onsubmit={handleSubmit}>
    <label class="field">
      <span class="field__label">name</span>
      <input
        type="text"
        bind:value={name}
        placeholder="Your name"
        required
        autocomplete="name"
      />
    </label>

    <label class="field">
      <span class="field__label">email</span>
      <input
        type="email"
        bind:value={email}
        placeholder="you@example.com"
        required
        autocomplete="email"
      />
    </label>

    <label class="field">
      <span class="field__label">message</span>
      <textarea
        bind:value={message}
        placeholder="What's on your mind?"
        rows="5"
        required
      ></textarea>
    </label>

    <div class="actions">
      <button type="button" class="btn-cancel" onclick={() => dialogStore.close()}>cancel</button>
      <button type="submit" class="btn-send">Send →</button>
    </div>
  </form>
{/if}

<style>
  .form {
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .field__label {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--grad-a);
  }

  .field input,
  .field textarea {
    background: var(--bg-hover);
    border: 0.5px solid var(--border-mid);
    color: var(--fg);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    padding: 0.5rem 0.75rem;
    outline: none;
    resize: vertical;
    width: 100%;
    transition: border-color 0.15s;
  }

  .field input::placeholder,
  .field textarea::placeholder { color: var(--fg-muted); }

  .field input:focus,
  .field textarea:focus { border-color: var(--grad-a); }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.625rem;
    padding-top: 0.25rem;
  }

  .btn-cancel {
    background: none;
    border: 0.5px solid var(--border);
    color: var(--fg-muted);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    padding: 0.4rem 1rem;
    cursor: pointer;
    transition: color 0.12s, border-color 0.12s;
  }

  .btn-cancel:hover { color: var(--fg); border-color: var(--border-mid); }

  .btn-send {
    background: var(--gradient);
    border: none;
    color: rgba(0,0,0,0.85);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.4rem 1.25rem;
    cursor: pointer;
    letter-spacing: 0.02em;
    transition: opacity 0.15s;
  }

  .btn-send:hover { opacity: 0.88; }
  .btn-send:focus-visible { outline: 2px solid var(--grad-a); outline-offset: 2px; }

  /* Sent state */
  .sent {
    padding: 2.5rem 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.875rem;
    text-align: center;
  }

  .sent__icon {
    font-size: 2rem;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1;
  }

  .sent__text {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--fg-muted);
  }
</style>

<script lang="ts">
  import { Button, Chip, IconButton, List, ListItem, SectionHeader, Shape, TextField, snackbar } from '$lib/v2';
  import { EMAIL, GITHUB, LINKEDIN } from '$lib/v2/content';

  let { data } = $props();

  let name = $state('');
  let email = $state('');
  let message = $state('');

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      snackbar.show('Email copied');
    } catch {
      snackbar.show(`Copy failed. The address is ${EMAIL}`);
    }
  }

  // No backend for messages: hand the draft to the visitor's email app, same as v1.
  function send(e: SubmitEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(`From: ${name} <${email}>\n\n${message}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    snackbar.show('Opening your email app with the message filled in');
  }
</script>

<svelte:head>
  <title>Contact · Trian Damai</title>
  <meta name="description" content="Get in touch with Trian Damai, software engineer open to full-time roles, freelance projects and consulting." />
</svelte:head>

<section>
  <header class="hero">
    <div class="copy">
      <span class="file">contact.md</span>
      <h1>Let's build<br /><span>something.</span></h1>
      <p>{data.intro}</p>
    </div>
    <div class="art" aria-hidden="true">
      <span class="s1"><Shape name="clover4" size="100%" color="var(--hero-ink)" motion="spin" speed={22} /></span>
      <span class="s2"><Shape name="cookie4" size="100%" color="var(--hero-paper)" motion="breathe" speed={5} /></span>
      <span class="s3"><Shape name="gem" size="100%" color="var(--hero-ink)" motion="bounce" speed={1.8} /></span>
    </div>
  </header>

  <div class="grid">
    <div class="col">
      <div class="email-card">
        <span class="k">email · fastest</span>
        <a class="addr" href="mailto:{EMAIL}">{EMAIL}</a>
        <div class="row">
          <Button icon="content_copy" onclick={copyEmail}>Copy address</Button>
          <IconButton icon="open_in_new" label="Open in your email app" variant="tonal" href="mailto:{EMAIL}" />
        </div>
        {#if data.responseTime}<p class="note">{data.responseTime}</p>{/if}
      </div>

      <List label="Elsewhere">
        <ListItem headline="GitHub" supporting="github.com/triandamai" icon="code" href={GITHUB} external />
        <ListItem headline="LinkedIn" supporting="linkedin.com/in/triandamai" icon="badge" href={LINKEDIN} external />
      </List>

      {#if data.openTo.length}
        <div class="open">
          <h2>Open to</h2>
          <div class="chips">{#each data.openTo as item (item)}<Chip>{item}</Chip>{/each}</div>
        </div>
      {/if}
    </div>

    <form class="form" onsubmit={send}>
      <h2>Send a message</h2>
      <TextField id="contact-name" label="Your name" bind:value={name} required autocomplete="name" />
      <TextField id="contact-email" label="Your email" type="email" bind:value={email} required autocomplete="email" />
      <TextField id="contact-message" label="What are you working on?" bind:value={message} multiline rows={6} required
        supporting="Opens your email app with this message filled in." />
      <div class="submit"><Button size="md" icon="send" type="submit">Send</Button></div>
    </form>
  </div>
</section>

<style>
  section { display: flex; flex-direction: column; gap: 24px; }
  .hero {
    background: var(--grad); color: var(--hero-ink);
    border-radius: var(--r-xxl) var(--r-xxl) var(--r-xxl) var(--r-md);
    padding: clamp(24px, 4vw, 48px);
    display: grid; grid-template-columns: minmax(0, 1fr) 220px; gap: 24px; align-items: center;
  }
  .copy { display: flex; flex-direction: column; gap: 14px; min-width: 0; }
  .file { font: 600 13px/1 var(--font-mono); }
  h1 {
    font-family: var(--font-display); font-size: clamp(2.8rem, 8vw, 6.4rem); line-height: .86; letter-spacing: -.035em;
    font-weight: 900; font-variation-settings: 'wdth' 30, 'opsz' 144, 'wght' 900;
  }
  h1 span { font-variation-settings: 'wdth' 151, 'opsz' 144, 'wght' 300; font-weight: 300; }
  .copy p { font-size: 18px; max-width: 40ch; }
  .art { position: relative; aspect-ratio: 1; }
  .art > span { position: absolute; display: grid; }
  .s1 { width: 62%; aspect-ratio: 1; left: 0; top: 4%; }
  .s2 { width: 40%; aspect-ratio: 1; right: 0; top: 0; }
  .s3 { width: 22%; aspect-ratio: 1; right: 14%; bottom: 4%; }

  .grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 12px; align-items: start; }
  .col { display: flex; flex-direction: column; gap: 12px; min-width: 0; }
  .email-card { background: var(--inverse-surface); color: var(--inverse-on-surface); border-radius: var(--r-xl) var(--r-sm) var(--r-xl) var(--r-xl); padding: 24px; display: flex; flex-direction: column; gap: 14px; }
  .k { font: 600 12px/1 var(--font-mono); opacity: .75; letter-spacing: .03em; }
  .addr { font: 600 clamp(18px, 2.4vw, 24px)/1.2 var(--font-mono); text-decoration: none; overflow-wrap: anywhere; }
  .addr:hover { text-decoration: underline; text-underline-offset: 4px; }
  .row { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }
  .email-card :global(.btn.filled) { background: var(--inverse-primary); color: var(--inverse-surface); }
  .note { font-size: 14px; opacity: .75; }
  .open { background: var(--sc-low); border-radius: var(--r-xl); padding: 24px; display: flex; flex-direction: column; gap: 14px; }
  h2 { font-size: 20px; font-weight: 700; }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; }
  .chips :global(.chip) { white-space: normal; height: auto; min-height: 32px; padding-block: 6px; line-height: 1.3; }
  .form { --field-bg: var(--sc-low); background: var(--sc-low); border-radius: var(--r-xl) var(--r-xl) var(--r-xl) var(--r-sm); padding: 24px; display: flex; flex-direction: column; gap: 20px; min-width: 0; }
  .submit { display: flex; justify-content: flex-end; }

  @media (max-width: 960px) { .grid { grid-template-columns: minmax(0, 1fr); } }
  @media (max-width: 640px) {
    .hero { grid-template-columns: minmax(0, 1fr); border-radius: var(--r-xl); }
    .art { width: 140px; order: -1; }
  }
</style>

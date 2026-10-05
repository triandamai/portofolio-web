<script lang="ts">
  import MarkdownRenderer from '$lib/components/MarkdownRenderer.svelte';
  import ContactForm from '$lib/components/ContactForm.svelte';
  import { dialogStore } from '$lib/stores/dialog.svelte';

  let { data } = $props();

  function openContact() {
    dialogStore.open({
      title: '// new_message.md',
      component: ContactForm,
    });
  }
</script>

<svelte:head>
  <title>contact.md — Trian Damai</title>
  <meta name="description" content="Get in touch with Trian Damai — software engineer open to freelance and full-time opportunities." />
</svelte:head>

<MarkdownRenderer content={data.content} />

<div class="cta-row">
  <button class="cta-btn" onclick={openContact}>
    ✉ Send a message →
  </button>
</div>

<style>
  .cta-row { margin-top: 2rem; }

  .cta-btn {
    font-family: var(--font-mono);
    font-size: 0.82rem;
    font-weight: 700;
    padding: 0.65rem 1.5rem;
    background: var(--gradient);
    border: none;
    color: rgba(0,0,0,0.85);
    cursor: pointer;
    letter-spacing: 0.02em;
    transition: opacity 0.15s, box-shadow 0.15s;
  }

  .cta-btn:hover { opacity: 0.88; box-shadow: var(--glow); }
  .cta-btn:focus-visible { outline: 2px solid var(--grad-a); outline-offset: 2px; }
</style>

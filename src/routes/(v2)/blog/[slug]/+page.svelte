<script lang="ts">
  import { Chip, Icon, Prose } from '$lib/v2';
  let { data } = $props();
  const post = $derived(data.post);
</script>

<svelte:head>
  <title>{post.title} · Trian Damai</title>
  <meta name="description" content={post.excerpt} />
</svelte:head>

<article>
  <header>
    <a class="back" href="/blog"><Icon name="arrow_back" size={20} />Writing</a>
    <span class="date">{post.date}</span>
    <h1>{post.title}</h1>
    <p class="excerpt">{post.excerpt}</p>
    <div class="chips">{#each post.tags as t (t)}<Chip size="sm">#{t}</Chip>{/each}</div>
  </header>
  <Prose content={data.content} />
</article>

<style>
  article { display: flex; flex-direction: column; gap: 32px; min-width: 0; }
  header { display: flex; flex-direction: column; gap: 14px; padding-bottom: 28px; border-bottom: 1px solid var(--outline-v); }
  .back { display: inline-flex; align-items: center; gap: 6px; font: 600 14px/1 var(--font-body); text-decoration: none; color: var(--primary); width: fit-content; }
  .date { font: 600 13px/1 var(--font-mono); color: var(--secondary); margin-top: 12px; }
  h1 { font-family: var(--font-display); font-size: clamp(2.6rem, 7vw, 5.2rem); line-height: .92; letter-spacing: -.03em; font-weight: 900; font-variation-settings: 'wdth' 40, 'opsz' 144, 'wght' 900; max-width: 18ch; }
  .excerpt { font-size: 19px; color: var(--on-surface-v); max-width: 56ch; }
  .chips { display: flex; flex-wrap: wrap; gap: 6px; }
</style>

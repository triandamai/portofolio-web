<script lang="ts">
  import { Card, Chip, Icon, SectionHeader } from '$lib/v2';
  let { data } = $props();
</script>

<svelte:head>
  <title>Writing · Trian Damai</title>
  <meta name="description" content="Notes by Trian Damai on Rust, Android and the things I figured out the hard way." />
</svelte:head>

<section>
  <SectionHeader level={1} file="blog/" title="Writing" description="Things I figured out the hard way, written down so I don't have to again." />
  <div class="posts">
    {#each data.posts as post, i (post.slug)}
      <Card href="/v2/blog/{post.slug}" variant={i === 0 ? 'tertiary' : 'filled'} radius="var(--r-xxl) var(--r-xxl) var(--r-xxl) var(--r-sm)" class="post">
        <span class="date">{post.date}</span>
        <h2>{post.title}</h2>
        <p>{post.excerpt}</p>
        <div class="foot">
          <div class="chips">{#each post.tags as t (t)}<Chip size="sm">#{t}</Chip>{/each}</div>
          <span class="read">Read <Icon name="arrow_forward" size={20} /></span>
        </div>
      </Card>
    {/each}
  </div>
</section>

<style>
  section { display: flex; flex-direction: column; gap: 28px; }
  .posts { display: flex; flex-direction: column; gap: 12px; }
  .posts :global(.post) { padding: clamp(24px, 3.5vw, 40px); gap: 12px; }
  .date { font: 600 13px/1 var(--font-mono); opacity: .75; }
  h2 { font-family: var(--font-display); font-size: clamp(28px, 4vw, 44px); line-height: 1; letter-spacing: -.02em; font-weight: 800; font-variation-settings: 'wdth' 60, 'wght' 800, 'opsz' 72; }
  p { max-width: 62ch; opacity: .85; }
  .foot { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; margin-top: 8px; }
  .chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .chips :global(.chip) { color: inherit; box-shadow: inset 0 0 0 1px color-mix(in srgb, currentColor 30%, transparent); }
  .read { display: inline-flex; align-items: center; gap: 6px; font-weight: 650; }
</style>

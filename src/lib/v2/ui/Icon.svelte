<script lang="ts">
  /** Material Symbols Rounded glyph. Decorative by default. */
  let { name, fill = false, size }: { name: string; fill?: boolean; size?: number } = $props();
</script>

<span class="msr" class:fill aria-hidden="true" style:font-size={size ? `${size}px` : undefined}>{name}</span>

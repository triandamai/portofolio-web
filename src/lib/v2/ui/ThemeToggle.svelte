<script lang="ts">
  import IconButton from './IconButton.svelte';
  import { appearance } from '../stores/appearance.svelte';
</script>

<IconButton
  icon={appearance.dark ? 'light_mode' : 'dark_mode'}
  label={appearance.dark ? 'Switch to light theme' : 'Switch to dark theme'}
  variant="outlined"
  onclick={() => appearance.toggleMode()}
/>

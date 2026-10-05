<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  type Props = {
    id: string;
    label: string;
    value?: string;
    type?: 'text' | 'email' | 'url';
    multiline?: boolean;
    rows?: number;
    required?: boolean;
    autocomplete?: HTMLInputAttributes['autocomplete'];
    supporting?: string;
  };

  let { id, label, value = $bindable(''), type = 'text', multiline = false, rows = 5, required = false, autocomplete, supporting }: Props = $props();
</script>

<!-- M3 outlined text field: the label floats into the outline when focused or filled -->
<div class="field" class:multiline>
  {#if multiline}
    <textarea {id} {rows} {required} bind:value placeholder=" " aria-describedby={supporting ? `${id}-sup` : undefined}></textarea>
  {:else}
    <input {id} {type} {required} {autocomplete} bind:value placeholder=" " aria-describedby={supporting ? `${id}-sup` : undefined} />
  {/if}
  <label for={id}>{label}{#if required}<span aria-hidden="true"> *</span>{/if}</label>
  {#if supporting}<span class="sup" id="{id}-sup">{supporting}</span>{/if}
</div>

<style>
  .field { position: relative; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
  input, textarea {
    width: 100%; font: 400 16px/1.5 var(--font-body); color: var(--on-surface);
    background: transparent; border: 0; border-radius: var(--r-sm);
    box-shadow: inset 0 0 0 1px var(--outline);
    padding: 16px; resize: vertical;
    transition: box-shadow .2s, border-radius .4s var(--spring-fast);
  }
  input { height: 56px; }
  input:hover, textarea:hover { box-shadow: inset 0 0 0 1px var(--on-surface); }
  input:focus, textarea:focus { outline: none; box-shadow: inset 0 0 0 2px var(--primary); border-radius: var(--r-md); }
  label {
    position: absolute; left: 12px; top: 16px; padding-inline: 4px; pointer-events: none;
    font: 400 16px/1.5 var(--font-body); color: var(--on-surface-v);
    background: var(--field-bg, var(--surface));
    transition: transform .25s var(--spring), font-size .25s var(--effects), color .2s;
    transform-origin: left top;
  }
  input:focus + label, textarea:focus + label,
  input:not(:placeholder-shown) + label, textarea:not(:placeholder-shown) + label {
    transform: translateY(-26px); font-size: 12px; color: var(--primary);
  }
  input:not(:focus):not(:placeholder-shown) + label,
  textarea:not(:focus):not(:placeholder-shown) + label { color: var(--on-surface-v); }
  .sup { font-size: 12px; color: var(--on-surface-v); padding-inline: 16px; }
</style>

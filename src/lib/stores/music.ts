import { writable } from 'svelte/store';

// Trail detail pages set this to true to trigger auto-play
export const autoplaySignal = writable(false);

import type { Component } from 'svelte';

export interface DialogOptions {
  title: string;
  component: Component<any>;
  data?: Record<string, unknown>;
}

function createDialogStore() {
  let visible = $state(false);
  let title = $state('');
  let component = $state<Component<any> | null>(null);
  let data = $state<Record<string, unknown>>({});

  return {
    get visible() { return visible; },
    get title()   { return title; },
    get component() { return component; },
    get data()    { return data; },

    open(opts: DialogOptions) {
      title     = opts.title;
      component = opts.component;
      data      = opts.data ?? {};
      visible   = true;
    },

    close() {
      visible = false;
      setTimeout(() => {
        component = null;
        data      = {};
        title     = '';
      }, 150);
    }
  };
}

export const dialogStore = createDialogStore();

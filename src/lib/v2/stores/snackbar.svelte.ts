function createSnackbar() {
  let message = $state('');
  let visible = $state(false);
  let timer: ReturnType<typeof setTimeout> | undefined;

  return {
    get message() { return message; },
    get visible() { return visible; },
    show(text: string, duration = 3000) {
      message = text;
      visible = true;
      clearTimeout(timer);
      timer = setTimeout(() => (visible = false), duration);
    },
    dismiss() {
      clearTimeout(timer);
      visible = false;
    }
  };
}

export const snackbar = createSnackbar();

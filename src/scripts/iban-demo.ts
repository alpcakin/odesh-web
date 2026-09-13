const RESET_MS = 1800;

export function initIbanDemo(): void {
  const root = document.querySelector<HTMLElement>('[data-iban-demo]');
  if (!root) return;

  const button = root.querySelector<HTMLButtonElement>('[data-iban-btn]');
  const label = root.querySelector<HTMLElement>('[data-iban-label]');
  const toast = root.querySelector<HTMLElement>('[data-iban-toast]');
  const value = root.querySelector<HTMLElement>('[data-iban-value]')?.dataset.ibanValue;
  if (!button || !label || !toast || !value) return;

  let timer: number | undefined;

  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard?.writeText(value);
    } catch {
      // Clipboard access can be denied; the visual feedback still runs for the demo.
    }

    button.classList.add('is-done');
    label.textContent = button.dataset.labelDone ?? label.textContent;
    toast.classList.add('is-visible');

    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      button.classList.remove('is-done');
      label.textContent = button.dataset.label ?? label.textContent;
      toast.classList.remove('is-visible');
    }, RESET_MS);
  });
}

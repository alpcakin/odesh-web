import type { Locale } from '@/i18n/routes';
import { computeShareSplit, formatAmount, formatMoney } from './split-math';

const MAX_SHARES = 9;
const PAYER_INDEX = 0;

export function initSplitDemo(): void {
  const root = document.querySelector<HTMLElement>('[data-split-demo]');
  if (!root) return;

  const amountInput = root.querySelector<HTMLInputElement>('[data-split-amount]');
  const amountDisplay = root.querySelector<HTMLElement>('[data-split-amount-display]');
  const rows = Array.from(root.querySelectorAll<HTMLElement>('[data-split-row]'));
  const hint = root.querySelector<HTMLElement>('[data-split-hint]');
  if (!amountInput || !amountDisplay || !hint || rows.length === 0) return;

  const locale: Locale = root.dataset.locale === 'en' ? 'en' : 'tr';
  const shares = rows.map((row) => Number(row.dataset.shares) || 0);

  const render = () => {
    const amount = Number(amountInput.value) || 0;
    const total = shares.reduce((sum, s) => sum + s, 0);
    const split = computeShareSplit(amount, shares, PAYER_INDEX);

    amountDisplay.textContent = formatAmount(amount, locale);

    rows.forEach((row, i) => {
      const share = shares[i] ?? 0;
      const portion = split[i] ?? 0;
      row.querySelector<HTMLElement>('[data-split-shares]')!.textContent = String(share);
      row.querySelector<HTMLButtonElement>('[data-split-dec]')!.disabled = share <= 0;
      row.querySelector<HTMLButtonElement>('[data-split-inc]')!.disabled = share >= MAX_SHARES;

      const value = row.querySelector<HTMLElement>('[data-split-row-amount]')!;
      value.textContent = (i === PAYER_INDEX || share === 0 ? '' : '−') + formatMoney(portion, locale);
      value.classList.toggle('owes', i !== PAYER_INDEX && share > 0);
      row.classList.toggle('is-out', share === 0);
    });

    const perShare = formatMoney(total > 0 ? amount / total : 0, locale);
    hint.textContent = `${hint.dataset.totalShares?.replace('{n}', String(total))} · ${hint.dataset.perShare} ${perShare} · ${hint.dataset.hint}`;
  };

  rows.forEach((row, i) => {
    row.querySelector('[data-split-dec]')?.addEventListener('click', () => {
      shares[i] = Math.max(0, (shares[i] ?? 0) - 1);
      render();
    });
    row.querySelector('[data-split-inc]')?.addEventListener('click', () => {
      shares[i] = Math.min(MAX_SHARES, (shares[i] ?? 0) + 1);
      render();
    });
  });

  amountInput.addEventListener('input', render);
  render();
}

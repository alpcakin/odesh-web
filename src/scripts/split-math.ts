import type { Locale } from '@/i18n/routes';

const round = (n: number) => Math.round(n * 100) / 100;

/**
 * Mirrors the app's shares split: each share is proportional, the payer's own
 * portion is excluded from what is owed, and the rounding remainder lands on
 * the last person with a non-zero share.
 */
export function computeShareSplit(amount: number, shares: number[], payerIndex: number): number[] {
  const total = shares.reduce((sum, s) => sum + s, 0);
  if (total <= 0) return shares.map(() => 0);

  const raw = shares.map((s) => round((s / total) * amount));
  const lastOwing = shares.map((s, i) => (i !== payerIndex && s > 0 ? i : -1)).filter((i) => i >= 0).pop();
  if (lastOwing !== undefined) {
    const owed = raw.reduce((sum, a, i) => (i === payerIndex ? sum : sum + a), 0);
    const payerPortion = raw[payerIndex] ?? 0;
    raw[lastOwing] = round((raw[lastOwing] ?? 0) + (amount - payerPortion - owed));
  }
  return raw;
}

/**
 * Demo money per site language: lira on Turkish pages, euro on English pages at one tenth of the lira amounts (as in
 * the app's English store screenshots).
 */
export const DEMO_MONEY: Record<Locale, { symbol: string; numberLocale: string; min: number; max: number; step: number; initial: number }> = {
  tr: { symbol: '₺', numberLocale: 'tr-TR', min: 100, max: 5000, step: 50, initial: 1200 },
  en: { symbol: '€', numberLocale: 'en-GB', min: 10, max: 500, step: 5, initial: 120 },
};

/** The amount without the currency sign, for layouts that show the sign separately. */
export const formatAmount = (n: number, locale: Locale) =>
  n.toLocaleString(DEMO_MONEY[locale].numberLocale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const formatMoney = (n: number, locale: Locale) => DEMO_MONEY[locale].symbol + formatAmount(n, locale);

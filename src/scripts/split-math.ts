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

export const formatTRY = (n: number) =>
  '₺' + n.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

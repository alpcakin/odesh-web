const formatTRY = (n: number) => '₺' + n.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const parseAmount = (raw: string) => parseFloat(raw.replace(/\./g, '').replace(',', '.')) || 0;

export function initSplitDemo(): void {
  const root = document.querySelector<HTMLElement>('[data-split-demo]');
  if (!root) return;

  const amountInput = root.querySelector<HTMLInputElement>('[data-split-amount]');
  const peopleInput = root.querySelector<HTMLInputElement>('[data-split-people]');
  const rows = root.querySelector<HTMLElement>('[data-split-rows]');
  const hint = root.querySelector<HTMLElement>('[data-split-hint]');
  if (!amountInput || !peopleInput || !rows || !hint) return;

  const people: string[] = JSON.parse(rows.dataset.people ?? '[]');
  const locale = document.documentElement.lang.startsWith('tr') ? 'tr-TR' : 'en';

  const render = () => {
    const amount = parseAmount(amountInput.value);
    const count = parseInt(peopleInput.value, 10);
    const per = amount / count;

    rows.replaceChildren(
      ...people.slice(0, count).map((name, i) => {
        const row = document.createElement('div');
        row.className = 'row';
        row.style.setProperty('--row-delay', `${i * 40}ms`);

        const avatar = document.createElement('div');
        avatar.className = i === 0 ? 'row-avatar self' : 'row-avatar';
        avatar.textContent = name.slice(0, 2).toLocaleUpperCase(locale);

        const label = document.createElement('span');
        label.className = 'row-name';
        label.textContent = name;

        const value = document.createElement('span');
        value.className = i === 0 ? 'row-amount tabular' : 'row-amount tabular owes';
        value.textContent = (i === 0 ? '' : '−') + formatTRY(per);

        row.append(avatar, label, value);
        return row;
      }),
    );

    hint.textContent = `${hint.dataset.perLabel} ${formatTRY(per)} · ${hint.dataset.hint}`;
  };

  amountInput.addEventListener('input', () => {
    const cleaned = amountInput.value.replace(/[^0-9.,]/g, '').slice(0, 10);
    if (cleaned !== amountInput.value) amountInput.value = cleaned;
    render();
  });
  peopleInput.addEventListener('input', render);
}

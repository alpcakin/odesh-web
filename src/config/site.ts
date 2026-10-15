export const SITE = {
  name: 'odesh',
  url: 'https://odesh.app',
  author: 'Alp Çakın',
  supportEmail: 'support@alpcakin.com',
  authorSite: 'https://www.alpcakin.com',
  copyrightYear: 2026,
  /** Per store: true once the listing is public. Live badges link out ("İndir"), others stay "Yakında". */
  appStoreLive: true,
  playStoreLive: false,
  // Türkiye storefront on purpose: the id-only link resolves to the US storefront on desktop and 404s while the app
  // is not sold there. On iPhone the App Store opens the user's own storefront either way.
  appStoreUrl: 'https://apps.apple.com/tr/app/odesh/id6802964428',
  playStoreUrl: 'https://play.google.com/',
  /** Milliseconds between automatic hero phone screen changes. */
  heroCycleMs: 4200,
} as const;

// Effective date shown on legal pages. Turkish stays at the published version until it is updated with the app
// release that ships the matching consent screens (odesh repo, docs/i18n_europe.md §0).
export const LEGAL = {
  date: { tr: 'Eylül 2026', en: 'October 2026' },
} as const;

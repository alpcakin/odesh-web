export type Locale = 'tr' | 'en';

export const LOCALES: readonly Locale[] = ['tr', 'en'] as const;
export const DEFAULT_LOCALE: Locale = 'tr';

export const FEATURE_IDS = ['iban', 'bolusme', 'defter', 'doviz'] as const;
export type FeatureId = (typeof FEATURE_IDS)[number];

export const LEGAL_DOC_IDS = ['kosullar', 'aydinlatma', 'veri-silme'] as const;
export type LegalDocId = (typeof LEGAL_DOC_IDS)[number];

const FEATURE_SLUGS: Record<Locale, Record<FeatureId, string>> = {
  tr: { iban: 'iban', bolusme: 'bolusme', defter: 'defter', doviz: 'doviz' },
  en: { iban: 'iban', bolusme: 'splitting', defter: 'ledger', doviz: 'multi-currency' },
};

const FEATURES_BASE: Record<Locale, string> = { tr: 'ozellikler', en: 'features' };

export const HOME_ANCHORS: Record<Locale, Record<'features' | 'how' | 'ledger' | 'security' | 'faq' | 'download', string>> = {
  tr: { features: 'ozellikler', how: 'nasil', ledger: 'defter', security: 'guvenlik', faq: 'sss', download: 'indir' },
  en: { features: 'features', how: 'how', ledger: 'ledger', security: 'security', faq: 'faq', download: 'download' },
};

export const localeHtmlLang: Record<Locale, string> = { tr: 'tr-TR', en: 'en' };

export function localePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? '' : `/${locale}`;
}

export function homePath(locale: Locale): string {
  return `${localePrefix(locale)}/`;
}

export function homeAnchor(locale: Locale, key: keyof (typeof HOME_ANCHORS)['tr']): string {
  return `${homePath(locale)}#${HOME_ANCHORS[locale][key]}`;
}

export function featurePath(locale: Locale, id: FeatureId): string {
  return `${localePrefix(locale)}/${FEATURES_BASE[locale]}/${FEATURE_SLUGS[locale][id]}/`;
}

export function featureIdFromSlug(locale: Locale, slug: string): FeatureId | undefined {
  return FEATURE_IDS.find((id) => FEATURE_SLUGS[locale][id] === slug);
}

export function featureSlug(locale: Locale, id: FeatureId): string {
  return FEATURE_SLUGS[locale][id];
}

/** Legal documents are Turkish only and are not localized (Terms of Use, section 12). */
export function legalPath(doc: LegalDocId): string {
  return `/yasal/${doc}/`;
}

export function absoluteUrl(site: string, path: string): string {
  return new URL(path, site).toString();
}

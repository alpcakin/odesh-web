import type { FeatureId } from './routes';

export interface HomeStep {
  title: string;
  body: string;
}

export interface SecurityItem {
  icon: 'map' | 'eyeoff' | 'lock' | 'slash' | 'toggle' | 'trash';
  title: string;
  body: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface LedgerRow {
  desc: string;
  date: string;
  amount: string;
  negative: boolean;
}

export interface FeaturePoint {
  title: string;
  body: string;
}

export interface FeatureCard {
  big: string;
  title: string;
  body: string;
}

export interface FeatureContent {
  eyebrow: string;
  title: string;
  lead: string;
  screenLabel: string;
  points: FeaturePoint[];
  cards: FeatureCard[];
}

export interface Dictionary {
  meta: {
    siteTitle: string;
    homeTitle: string;
    homeDescription: string;
    featuresTitleSuffix: string;
    notFoundTitle: string;
    notFoundBody: string;
    notFoundCta: string;
    langName: string;
  };
  join: {
    title: string;
    body: string;
    openCta: string;
    storeLabel: string;
    fallbackNote: string;
  };
  nav: {
    features: string;
    how: string;
    ledger: string;
    security: string;
    faq: string;
    cta: string;
    langLabel: string;
    menuLabel: string;
  };
  hero: {
    eyebrow: string;
    title1: string;
    title2: string;
    sub: string;
    storeTop: string;
    storeTopLive: string;
    screenLabels: [string, string, string];
    stageLabel: string;
  };
  features: {
    eyebrow: string;
    title: string;
    sub: string;
    iban: { title: string; body: string; hint: string; btn: string; btnDone: string; toast: string; demoName: string; demoHandle: string };
    remind: { title: string; body: string; msg: string; time: string; tags: [string, string, string] };
    split: {
      title: string;
      body: string;
      hint: string;
      amountLabel: string;
      paidLabel: string;
      /** Uses the `{n}` placeholder for the share count. */
      totalShares: string;
      perShare: string;
      /** Both use the `{name}` placeholder. */
      decreaseLabel: string;
      increaseLabel: string;
      people: [string, string, string];
    };
    fx: { title: string; body: string; rows: { code: string; name: string }[] };
  };
  how: { eyebrow: string; title: string; steps: HomeStep[] };
  ledger: {
    eyebrow: string;
    title: string;
    body: string;
    points: [string, string, string];
    badge: string;
    youOwe: string;
    settle: string;
    contactName: string;
    rows: LedgerRow[];
  };
  security: {
    eyebrow: string;
    title: string;
    sub: string;
    items: SecurityItem[];
    privacyLink: string;
    termsLink: string;
    deleteLink: string;
  };
  faq: { eyebrow: string; title: string; items: FaqItem[] };
  cta: { title: string; sub: string };
  footer: {
    tag: string;
    product: string;
    legal: string;
    contact: string;
    terms: string;
    privacy: string;
    deletion: string;
    legalNote: string;
  };
  featuresPage: {
    crumb: string;
    others: string;
    labels: Record<FeatureId, string>;
    items: Record<FeatureId, FeatureContent>;
  };
}

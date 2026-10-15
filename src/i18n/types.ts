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

/** A balance row on the phone mockup's home screen. */
export interface PhoneHomeRow {
  initials: string;
  title: string;
  /** Second line; rows with a badge have none. */
  sub?: string;
  badge?: 'group' | 'ledger';
  /** Currency code next to the name, for rows not in the main currency. */
  currency?: string;
  amount: string;
  negative: boolean;
  /** Copy-IBAN button: rows where you owe a friend. */
  copy?: boolean;
}

export interface FxRow {
  flag: string;
  code: string;
  name: string;
  amount: string;
  positive: boolean;
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
    iban: {
      title: string;
      body: string;
      hint: string;
      btn: string;
      btnDone: string;
      toast: string;
      demoName: string;
      demoHandle: string;
      demoInitials: string;
      demoAmount: string;
      /** Copied by the demo button; must not belong to a real account. */
      demoIban: string;
    };
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
    fx: { title: string; body: string; rows: FxRow[] };
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
    contactInitials: string;
    balance: string;
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
  legalPage: {
    crumb: string;
    documents: string;
    navLabel: string;
    controller: string;
    version: string;
    effective: string;
  };
  /** Phone mockups: the app's own wording in this language, demo people and amounts. */
  phone: {
    tabs: [string, string, string, string];
    home: {
      greeting: string;
      name: string;
      net: string;
      owedToYou: string;
      owedToYouAmount: string;
      owedToYouSub: string;
      youOwe: string;
      youOweAmount: string;
      youOweSub: string;
      chips: { amount: string; negative: boolean }[];
      section: string;
      groupBadge: string;
      ledgerBadge: string;
      rows: PhoneHomeRow[];
      fab: string;
    };
    friend: {
      initials: string;
      name: string;
      handle: string;
      sign: string;
      balance: string;
      balanceSub: string;
      settle: string;
      section: string;
      entries: LedgerRow[];
      toast: string;
    };
    amount: {
      eyebrow: string;
      title: string;
      flag: string;
      code: string;
      sign: string;
      value: string;
      note: string;
      today: string;
      photoAdded: string;
      next: string;
    };
    welcome: {
      headline: string;
      sub: string;
      createAccount: string;
      or: string;
      apple: string;
      google: string;
      haveAccount: string;
      login: string;
    };
  };
  featuresPage: {
    crumb: string;
    others: string;
    labels: Record<FeatureId, string>;
    items: Record<FeatureId, FeatureContent>;
  };
}

export const BRAND = '#7C5CFF';
export const BRAND_DARK = '#5C3FE0';

export const GIFTER = {
  name: 'Sarah',
  fullName: 'Sarah Chen',
  email: 'sarah@halcyon.io',
  company: 'Halcyon Labs',
};

export const STATS = {
  giftsSent:  { value: 247, format: (n: number) => Math.round(n).toLocaleString() },
  claimRate:  { value: 89,  format: (n: number) => `${Math.round(n)}%` },
  totalSpent: { value: 21,  format: (n: number) => `$${Math.round(n)}K` },
};

export function avatarGradient(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  h = Math.abs(h);
  const h1 = h % 360;
  const h2 = (h1 + 38 + (h % 30)) % 360;
  return `linear-gradient(135deg, hsl(${h1}, 70%, 58%), hsl(${h2}, 70%, 48%))`;
}

/* All distinct recipients across all past orders, keyed by email. */
export function getAllPeople(): Recipient[] {
  const seen = new Map<string, Recipient>();
  for (const order of ORDERS) {
    for (const r of getRecipients(order)) {
      if (!seen.has(r.email)) seen.set(r.email, r);
    }
  }
  return Array.from(seen.values());
}

export type GifterOrderStatus = 'Sent' | 'Scheduled' | 'Draft' | 'Completed';

/* The branded digital unboxing each recipient sees when they open the gift.
   Card posters render a live preview of this design.

   In production this record is the *source of truth* — the unboxing experience
   page and the dashboard preview both render from it. The dashboard does NOT
   scrape the unboxing URL; it re-renders the same design data at card size.
   (See docs/digital-unboxing.md for the architecture.) */
export type UnboxingDesign = {
  theme: string;       // display name of the unboxing design
  occasion: string;    // what the campaign is for
  scene: string;       // CSS background for the unwrap scene (fallback render)
  box: string;         // gift box body color (fallback render)
  lid: string;         // gift box lid color (fallback render)
  ribbon: string;      // ribbon + bow color (fallback render)
  accent: string;      // sparkle / accent color (fallback render)
  motif: string;       // emoji motif (fallback render)
  message: string;     // the note shown inside the unwrap
  /* Real-asset capture of the unboxing experience. When present, the preview
     renders this image; otherwise the CSS scene above is used as a fallback. */
  previewImage?: string;
};

export type GifterOrder = {
  id: string;
  name: string;
  status: GifterOrderStatus;
  sentDate: string | null;          // null if scheduled / draft
  scheduledDate?: string;           // for scheduled
  recipients: number;
  claimed: number;
  delivered: number;
  pending: number;
  bounced: number;
  budgetPerRecipient: string;
  unboxing: UnboxingDesign;
};

export const ORDERS: GifterOrder[] = [
  {
    id: 'may-2-2025',
    name: 'May 2, 2025',
    status: 'Sent',
    sentDate: 'May 2, 2025',
    recipients: 86,
    claimed: 60,
    delivered: 14,
    pending: 10,
    bounced: 2,
    budgetPerRecipient: '$85',
    unboxing: {
      theme: 'Spring Refresh',
      occasion: 'Customer thank-you',
      scene: 'linear-gradient(160deg, #BDEBD6, #8FD9E8)',
      box: '#FFE3EC',
      lid: '#FFF0F5',
      ribbon: '#5BBF7B',
      accent: '#FFD84A',
      motif: '🌷',
      message: 'A little something to brighten your spring.',
    },
  },
  {
    id: 'jan-15-2025',
    name: 'January 15, 2025',
    status: 'Sent',
    sentDate: 'Jan 15, 2025',
    recipients: 124,
    claimed: 94,
    delivered: 18,
    pending: 10,
    bounced: 2,
    budgetPerRecipient: '$100',
    unboxing: {
      theme: 'New Year Kickoff',
      occasion: 'Q1 client appreciation',
      scene: 'linear-gradient(160deg, #1E2A52, #3B2A6B)',
      box: '#EAF0FF',
      lid: '#FFFFFF',
      ribbon: '#4A9EFF',
      accent: '#9FD0FF',
      motif: '✦',
      message: "Here's to a brilliant year ahead.",
    },
  },
  {
    id: 'dec-20-2024',
    name: 'December 20, 2024',
    status: 'Completed',
    sentDate: 'Dec 20, 2024',
    recipients: 210,
    claimed: 180,
    delivered: 30,
    pending: 0,
    bounced: 0,
    budgetPerRecipient: '$75',
    unboxing: {
      theme: 'Holiday Cheer',
      occasion: 'Holiday team gifts',
      scene: 'linear-gradient(160deg, #14342A, #1E5038)',
      box: '#C8403F',
      lid: '#D85452',
      ribbon: '#E8C04A',
      accent: '#F4D97A',
      motif: '🎁',
      message: 'Happy holidays from all of us.',
    },
  },
  {
    id: 'oct-12-2024',
    name: 'October 12, 2024',
    status: 'Completed',
    sentDate: 'Oct 12, 2024',
    recipients: 18,
    claimed: 14,
    delivered: 4,
    pending: 0,
    bounced: 0,
    budgetPerRecipient: '$120',
    unboxing: {
      theme: 'Feno · Elite Oral Health',
      occasion: 'Year-end partner thank-you',
      scene: 'linear-gradient(160deg, #0A1A3A, #1B2C5C)',
      box: '#F4F6FB',
      lid: '#FFFFFF',
      ribbon: '#3A6BE0',
      accent: '#8FB3FF',
      motif: '✦',
      message: 'We wanted to say thanks with an Elite Oral Health!',
      previewImage: '/unboxings/feno-elite-oral-health.jpg',
    },
  },
  {
    id: 'mar-18-2025',
    name: 'March 18, 2025',
    status: 'Sent',
    sentDate: 'Mar 18, 2025',
    recipients: 32,
    claimed: 22,
    delivered: 6,
    pending: 3,
    bounced: 1,
    budgetPerRecipient: '$95',
    unboxing: {
      theme: 'Warm Welcome',
      occasion: 'New-hire welcome kits',
      scene: 'linear-gradient(160deg, #F4A574, #E8746B)',
      box: '#FFF6E8',
      lid: '#FFFCF5',
      ribbon: '#D4632E',
      accent: '#FFC94A',
      motif: '👋',
      message: "Welcome to the team — so glad you're here.",
    },
  },
  {
    id: 'jun-15-2026',
    name: 'June 15, 2026',
    status: 'Scheduled',
    sentDate: null,
    scheduledDate: 'Jun 15, 2026',
    recipients: 45,
    claimed: 0,
    delivered: 0,
    pending: 45,
    bounced: 0,
    budgetPerRecipient: '$150',
    unboxing: {
      theme: 'Summer Sendoff',
      occasion: 'Team milestone gifts',
      scene: 'linear-gradient(160deg, #E8546A, #B83A8E)',
      box: '#FFFFFF',
      lid: '#FFF4F6',
      ribbon: '#FF8C42',
      accent: '#FFD84A',
      motif: '☀',
      message: "Halfway through — you've earned this.",
    },
  },
];

export type RecipientStatus = 'Claimed' | 'Delivered' | 'Pending' | 'Bounced';

export type Recipient = {
  id: string;
  name: string;
  email: string;
  initials: string;
  status: RecipientStatus;
  picked?: string;
  tracking?: string;
  /* Per-recipient unboxing link. In production this is a tokenised URL the
     recipient receives in their gift email — the gifter can copy or resend it
     from the dashboard. Mocked here. */
  link: string;
};

const NAMES: { name: string; email: string }[] = [
  { name: 'John Doe',         email: 'john@acme.com' },
  { name: 'Jane Smith',       email: 'jane@corp.com' },
  { name: 'Sarah Jones',      email: 'sarah@company.com' },
  { name: 'Mike Wilson',      email: 'mike@example.com' },
  { name: 'Lisa Chen',        email: 'lisa@startup.io' },
  { name: 'Tom Davis',        email: 'tom@truebay.co' },
  { name: 'Maya Greene',      email: 'maya@northglobe.com' },
  { name: 'Diego Rivera',     email: 'd.rivera@coppermint.co' },
  { name: 'Hannah Park',      email: 'hannah@willowknot.org' },
  { name: 'Owen Nakamura',    email: 'owen.n@coastalpine.co' },
  { name: 'Camila Reyes',     email: 'camila@brightway.so' },
  { name: 'Felix Lindgren',   email: 'felix@arctica.dev' },
  { name: 'Naomi Patel',      email: 'naomi@halcyon.io' },
  { name: 'Theo Bridges',     email: 'theo.b@summitcg.co' },
  { name: 'Lily Okafor',      email: 'lily@orbitlabs.io' },
  { name: 'Sebastian Cruz',   email: 'seb@flintstudio.co' },
  { name: 'Iris Whitman',     email: 'iris.w@everbloom.shop' },
  { name: 'Mateo Aguilar',    email: 'mateo@meridian.co' },
];

const PRODUCTS = [
  'Signature Candle',
  'Bath Salts',
  'Artisan Tea Set',
  'Single-Origin Coffee',
  'Leather Notebook',
  'Lavender Soap Bar',
  'Cashmere Throw',
  'Ceramic Mug',
];

function initialsOf(name: string): string {
  return name.split(' ').map((s) => s[0]).join('').slice(0, 2).toUpperCase();
}

export function getRecipients(order: GifterOrder): Recipient[] {
  const total = order.recipients;
  const out: Recipient[] = [];
  let claimedRemaining = order.claimed;
  let deliveredRemaining = order.delivered;
  let pendingRemaining = order.pending;
  let bouncedRemaining = order.bounced;

  // Deterministic seed off order id
  let seed = 0;
  for (let i = 0; i < order.id.length; i++) seed = (seed * 31 + order.id.charCodeAt(i)) | 0;
  seed = Math.abs(seed);

  for (let i = 0; i < total; i++) {
    const pick = NAMES[(seed + i * 7) % NAMES.length];
    const productIdx = (seed + i * 11) % PRODUCTS.length;
    let status: RecipientStatus;
    if (deliveredRemaining > 0) { status = 'Delivered'; deliveredRemaining--; }
    else if (claimedRemaining > 0) { status = 'Claimed'; claimedRemaining--; }
    else if (pendingRemaining > 0) { status = 'Pending'; pendingRemaining--; }
    else if (bouncedRemaining > 0) { status = 'Bounced'; bouncedRemaining--; }
    else { status = 'Pending'; }

    const token = ((seed + i * 991) >>> 0).toString(36).padStart(7, '0').slice(0, 7);
    out.push({
      id: `${order.id}-${i + 1}`,
      name: pick.name,
      email: pick.email,
      initials: initialsOf(pick.name),
      status,
      picked: (status === 'Delivered' || status === 'Claimed') ? PRODUCTS[productIdx] : undefined,
      tracking: status === 'Delivered' ? `1Z${((seed + i) >>> 0).toString(36).slice(0, 6).toUpperCase()}45` : undefined,
      link: `https://giftwell.link/g/${token}`,
    });
  }
  return out;
}

export const STATUS_COLORS: Record<RecipientStatus, { bg: string; fg: string }> = {
  Claimed:   { bg: '#ECFDF5', fg: '#047857' },
  Delivered: { bg: '#EFF6FF', fg: '#1D4ED8' },
  Pending:   { bg: '#FFF7E6', fg: '#92590B' },
  Bounced:   { bg: '#FEF2F2', fg: '#B91C1C' },
};

export const ORDER_STATUS_COLORS: Record<GifterOrderStatus, { bg: string; fg: string }> = {
  Sent:       { bg: '#ECFDF5', fg: '#047857' },
  Scheduled:  { bg: '#FFF7E6', fg: '#92590B' },
  Draft:      { bg: '#F3F3F5', fg: '#5a5a62' },
  Completed:  { bg: '#EFF6FF', fg: '#1D4ED8' },
};

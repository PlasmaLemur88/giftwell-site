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
};

export const ORDERS: GifterOrder[] = [
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
  },
  {
    id: 'feb-1-2025',
    name: 'February 1, 2025',
    status: 'Scheduled',
    sentDate: null,
    scheduledDate: 'Feb 1, 2025',
    recipients: 36,
    claimed: 0,
    delivered: 0,
    pending: 36,
    bounced: 0,
    budgetPerRecipient: '$150',
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

    out.push({
      id: `${order.id}-${i + 1}`,
      name: pick.name,
      email: pick.email,
      initials: initialsOf(pick.name),
      status,
      picked: (status === 'Delivered' || status === 'Claimed') ? PRODUCTS[productIdx] : undefined,
      tracking: status === 'Delivered' ? `1Z${((seed + i) >>> 0).toString(36).slice(0, 6).toUpperCase()}45` : undefined,
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

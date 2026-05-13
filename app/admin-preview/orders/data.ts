export type Status = 'Completed' | 'Shipped' | 'Pending' | 'Cancelled';

export type Order = {
  id: string;
  sender: string;
  email: string;
  company: string;
  orderDate: string;
  targetShipping: string;
  amount: string;
  amountNum: number;
  recipients: number;
  status: Status;
  budgetPerRecipient: string;
  categories: string[];
  message: string;
  theme: string;
};

export const ORDERS: Order[] = [
  { id: '33931', sender: 'Tom Reyes',        email: 'tom@summitcg.co',     company: 'Summit Consulting Group', orderDate: 'Apr 03, 2026', targetShipping: 'Apr 04, 2026', amount: '$343.90',   amountNum: 343.90,  recipients: 1,  status: 'Completed', budgetPerRecipient: '$80',  categories: ['Pantry', 'Wellness'],                          message: 'Thanks for closing the Q1 deal. Pick something you\'ll love.',                 theme: 'Hand-drawn Confetti'       },
  { id: '33912', sender: 'Sarah Chen',       email: 'sarah@halcyon.io',    company: 'Halcyon Labs',           orderDate: 'Apr 02, 2026', targetShipping: 'Apr 04, 2026', amount: '$684.50',   amountNum: 684.50,  recipients: 2,  status: 'Shipped',   budgetPerRecipient: '$60',  categories: ['Pantry', 'Drinkware'],                         message: 'Welcome to Halcyon. Stay caffeinated.',                                         theme: 'Soft Petals'               },
  { id: '32933', sender: 'Riley Lopez',      email: 'riley@northforge.co', company: 'NorthForge',             orderDate: 'Mar 22, 2026', targetShipping: 'Mar 23, 2026', amount: '$453.90',   amountNum: 453.90,  recipients: 1,  status: 'Completed', budgetPerRecipient: '$100', categories: ['Wellness'],                                    message: 'For all the late-night sprints. Thanks for everything.',                       theme: 'Midnight Stars'            },
  { id: '32826', sender: 'Robert Schox',     email: 'rs@parallelpath.com', company: 'Parallel Path',          orderDate: 'Mar 20, 2026', targetShipping: 'Mar 21, 2026', amount: '$1,827.03', amountNum: 1827.03, recipients: 3,  status: 'Completed', budgetPerRecipient: '$120', categories: ['Pantry', 'Wellness', 'Apparel'],               message: 'You three made our launch happen. Pick whatever sparks joy.',                  theme: 'Linen Texture'             },
  { id: '32702', sender: 'Marcus Liu',       email: 'marcus@truebay.co',   company: 'Truebay',                orderDate: 'Mar 18, 2026', targetShipping: 'Mar 24, 2026', amount: '$1,212.40', amountNum: 1212.40, recipients: 4,  status: 'Pending',   budgetPerRecipient: '$80',  categories: ['Pantry'],                                      message: 'Onboarding gift from the Truebay team. Welcome aboard!',                       theme: 'Block Color'               },
  { id: '32445', sender: 'Priya Patel',      email: 'priya@orbitlabs.io',  company: 'Orbit Labs',             orderDate: 'Mar 14, 2026', targetShipping: 'Mar 18, 2026', amount: '$5,840.00', amountNum: 5840.00, recipients: 12, status: 'Completed', budgetPerRecipient: '$100', categories: ['Pantry', 'Wellness', 'Apparel', 'Drinkware'],  message: 'You all crushed this quarter. Take your pick from the catalog.',               theme: 'Hand-drawn Confetti'       },
  { id: '32102', sender: 'Jordan Park',      email: 'jp@flintstudio.co',   company: 'Flint Studio',           orderDate: 'Mar 09, 2026', targetShipping: 'Mar 10, 2026', amount: '$135.50',   amountNum: 135.50,  recipients: 1,  status: 'Cancelled', budgetPerRecipient: '$60',  categories: ['Pantry'],                                      message: '',                                                                              theme: 'Soft Petals'               },
  { id: '31872', sender: 'Alex Kim',         email: 'alex@brightway.so',   company: 'Brightway',              orderDate: 'Mar 05, 2026', targetShipping: 'Mar 06, 2026', amount: '$894.20',   amountNum: 894.20,  recipients: 2,  status: 'Completed', budgetPerRecipient: '$120', categories: ['Apparel', 'Drinkware'],                        message: 'Thanks for the referral. A little something for both of you.',                 theme: 'Linen Texture'             },
  { id: '31077', sender: 'Haipeng Wei',      email: 'haipeng@arclite.co',  company: 'Arclite',                orderDate: 'Feb 23, 2026', targetShipping: 'Feb 24, 2026', amount: '$294.40',   amountNum: 294.40,  recipients: 1,  status: 'Completed', budgetPerRecipient: '$80',  categories: ['Wellness'],                                    message: 'Hope this finds you well.',                                                     theme: 'Midnight Stars'            },
  { id: '30822', sender: 'Lauren Mitchell',  email: 'lm@everbloom.shop',   company: 'Everbloom',              orderDate: 'Feb 18, 2026', targetShipping: 'Feb 19, 2026', amount: '$2,418.60', amountNum: 2418.60, recipients: 6,  status: 'Completed', budgetPerRecipient: '$100', categories: ['Pantry', 'Wellness'],                          message: 'Your work this season was remarkable. Thank you.',                              theme: 'Block Color'               },
  { id: '30501', sender: 'Diego Vargas',     email: 'diego@meridian.co',   company: 'Meridian',               orderDate: 'Feb 12, 2026', targetShipping: 'Feb 13, 2026', amount: '$748.90',   amountNum: 748.90,  recipients: 2,  status: 'Shipped',   budgetPerRecipient: '$120', categories: ['Apparel'],                                     message: 'New offsite, new gear. See you in Tahoe.',                                     theme: 'Hand-drawn Confetti'       },
  { id: '28789', sender: 'Daniel Seminara',  email: 'daniel@seminara.io',  company: 'Seminara Holdings',      orderDate: 'Jan 27, 2026', targetShipping: 'Jan 28, 2026', amount: '$312.06',   amountNum: 312.06,  recipients: 1,  status: 'Completed', budgetPerRecipient: '$80',  categories: ['Pantry', 'Wellness'],                          message: 'A small token of appreciation for your help.',                                  theme: 'Soft Petals'               },
];

export type RecipientStatus = 'Sent' | 'Opened' | 'Picked' | 'Shipped' | 'Delivered' | 'Bounced';

export type Recipient = {
  id: string;
  name: string;
  email: string;
  status: RecipientStatus;
  pickedProduct: string | null;
  pickedAt: string | null;
  tracking: string | null;
  shippingTo: string;
  subscribed: boolean;
};

const NAME_POOL: [string, string][] = [
  ['Avery Stone',     'avery.stone@maplecourt.io'],
  ['Maya Greene',     'maya.g@northglobe.com'],
  ['Diego Rivera',    'd.rivera@coppermint.co'],
  ['Hannah Park',     'hannah@willowknot.org'],
  ['Owen Nakamura',   'owen.n@coastalpine.co'],
  ['Camila Reyes',    'camila@brightway.so'],
  ['Felix Lindgren',  'felix@arctica.dev'],
  ['Naomi Patel',     'naomi@halcyon.io'],
  ['Theo Bridges',    'theo.b@summitcg.co'],
  ['Lily Okafor',     'lily@orbitlabs.io'],
  ['Sebastian Cruz',  'seb@flintstudio.co'],
  ['Iris Whitman',    'iris.w@everbloom.shop'],
  ['Mateo Aguilar',   'mateo@meridian.co'],
  ['Ruby Cohen',      'ruby@truebay.co'],
  ['Asher Yamamoto',  'asher@parallelpath.com'],
  ['Zoe Andersson',   'zoe@arclite.co'],
];

const PRODUCT_POOL = [
  'Signature Candle',
  'Bath Salts',
  'Artisan Tea Set',
  'Cashmere Gloves',
  'Single-Origin Coffee',
  'Linen Throw',
  'Leather Notebook',
  'Lavender Soap Bar',
  'Wool Beanie',
  'Ceramic Mug',
  'Sourdough Kit',
  'Olive Oil Trio',
];

const CITY_POOL = [
  'Brooklyn, NY', 'Oakland, CA', 'Austin, TX', 'Portland, OR', 'Chicago, IL',
  'Boulder, CO', 'Seattle, WA', 'Boston, MA', 'Atlanta, GA', 'Toronto, ON',
];

// Deterministic-by-orderId so the same recipient list shows up each render.
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function getRecipients(order: Order): Recipient[] {
  const seed = hash(order.id);
  const count = order.recipients;

  const list: Recipient[] = [];
  for (let i = 0; i < count; i++) {
    const idx = (seed + i * 7) % NAME_POOL.length;
    const [name, email] = NAME_POOL[idx];
    const productIdx = (seed + i * 11) % PRODUCT_POOL.length;
    const cityIdx = (seed + i * 13) % CITY_POOL.length;
    const product = PRODUCT_POOL[productIdx];

    // Status depends on the parent order's status + a per-recipient roll
    const roll = (seed + i * 17) % 100;
    let status: RecipientStatus;
    let pickedProduct: string | null = null;
    let pickedAt: string | null = null;
    let tracking: string | null = null;
    let subscribed = false;

    if (order.status === 'Cancelled') {
      status = 'Bounced';
    } else if (order.status === 'Pending') {
      // Mostly Sent/Opened, a few Picked
      if (roll < 35) status = 'Sent';
      else if (roll < 75) status = 'Opened';
      else { status = 'Picked'; pickedProduct = product; pickedAt = order.targetShipping; }
    } else if (order.status === 'Shipped') {
      if (roll < 15) status = 'Picked';
      else if (roll < 85) {
        status = 'Shipped';
        pickedProduct = product;
        pickedAt = order.orderDate;
        tracking = `1Z${(seed + i).toString(36).slice(0, 6).toUpperCase()}45`;
      } else {
        status = 'Delivered';
        pickedProduct = product;
        pickedAt = order.orderDate;
        tracking = `1Z${(seed + i).toString(36).slice(0, 6).toUpperCase()}45`;
        subscribed = roll % 3 === 0;
      }
      if (status === 'Picked') {
        pickedProduct = product;
        pickedAt = order.orderDate;
      }
    } else {
      // Completed
      status = 'Delivered';
      pickedProduct = product;
      pickedAt = order.orderDate;
      tracking = `1Z${(seed + i).toString(36).slice(0, 6).toUpperCase()}45`;
      subscribed = roll % 100 < 23;
      // A couple of orders have one recipient who never claimed
      if (roll > 92 && count > 1 && i === count - 1) {
        status = 'Opened';
        pickedProduct = null;
        pickedAt = null;
        tracking = null;
        subscribed = false;
      }
    }

    list.push({
      id: `${order.id}-${i + 1}`,
      name,
      email,
      status,
      pickedProduct,
      pickedAt,
      tracking,
      shippingTo: CITY_POOL[cityIdx],
      subscribed,
    });
  }
  return list;
}

export const FILTERS: ('All' | Status)[] = ['All', 'Pending', 'Shipped', 'Completed', 'Cancelled'];

export const STATUS_TONE: Record<Status, 'success' | 'info' | 'attention' | 'critical'> = {
  Completed: 'success',
  Shipped:   'info',
  Pending:   'attention',
  Cancelled: 'critical',
};

export const RECIPIENT_STATUS_TONE: Record<RecipientStatus, 'success' | 'info' | 'attention' | 'critical' | undefined> = {
  Delivered: 'success',
  Shipped:   'info',
  Picked:    'info',
  Opened:    'attention',
  Sent:      undefined,
  Bounced:   'critical',
};

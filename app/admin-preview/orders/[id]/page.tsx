'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import {
  BlockStack,
  InlineStack,
  Card,
  Text,
  Button,
  Box,
  Badge,
  Divider,
  Icon,
  Tabs,
} from '@shopify/polaris';
import {
  ChevronLeftIcon,
  CashDollarIcon,
  CalendarIcon,
  DeliveryIcon,
  CheckCircleIcon,
} from '@shopify/polaris-icons';
import {
  ORDERS,
  STATUS_TONE,
  RECIPIENT_STATUS_TONE,
  getRecipients,
  type Recipient,
} from '../data';

const RECIPIENT_FILTERS: ('All' | Recipient['status'])[] = [
  'All', 'Sent', 'Opened', 'Picked', 'Shipped', 'Delivered', 'Bounced',
];

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const order = ORDERS.find((o) => o.id === id);
  const [tabIndex, setTabIndex] = useState(0);
  const [recipientFilter, setRecipientFilter] = useState<typeof RECIPIENT_FILTERS[number]>('All');

  if (!order) {
    return (
      <BlockStack gap="400">
        <Link href="/admin-preview/orders" style={BACK_LINK}>
          <ChevronLeftIcon width={14} height={14} /> Orders
        </Link>
        <Card>
          <BlockStack gap="200" inlineAlign="center">
            <Text as="p" variant="headingMd">Order not found</Text>
            <Text as="p" variant="bodyMd" tone="subdued">
              No order matches #{id}.
            </Text>
            <Box paddingBlockStart="200">
              <Button url="/admin-preview/orders">Back to all orders</Button>
            </Box>
          </BlockStack>
        </Card>
      </BlockStack>
    );
  }

  const recipients = getRecipients(order);
  const filteredRecipients = recipientFilter === 'All'
    ? recipients
    : recipients.filter((r) => r.status === recipientFilter);

  const counts = {
    All:       recipients.length,
    Sent:      recipients.filter((r) => r.status === 'Sent').length,
    Opened:    recipients.filter((r) => r.status === 'Opened').length,
    Picked:    recipients.filter((r) => r.status === 'Picked').length,
    Shipped:   recipients.filter((r) => r.status === 'Shipped').length,
    Delivered: recipients.filter((r) => r.status === 'Delivered').length,
    Bounced:   recipients.filter((r) => r.status === 'Bounced').length,
  };

  const tabs = [
    { id: 'gift-order', content: 'Gift order',         panelID: 'p-gift' },
    { id: 'recipients', content: `Recipients (${recipients.length})`, panelID: 'p-rec' },
    { id: 'activity',   content: 'Activity',           panelID: 'p-act' },
  ];

  return (
    <BlockStack gap="500">
      <Link href="/admin-preview/orders" style={BACK_LINK}>
        <ChevronLeftIcon width={14} height={14} /> Orders
      </Link>

      {/* Header */}
      <InlineStack align="space-between" blockAlign="start" gap="400" wrap={false}>
        <BlockStack gap="200">
          <InlineStack gap="300" blockAlign="center">
            <Text as="h1" variant="headingXl">#{order.id}</Text>
            <Badge tone={STATUS_TONE[order.status]}>{order.status}</Badge>
            <Box paddingInlineStart="100">
              <Text as="span" variant="bodyMd" tone="subdued">
                Bulk gift order from <strong style={{ color: '#111' }}>{order.sender}</strong> · {order.company}
              </Text>
            </Box>
          </InlineStack>
          <Text as="p" variant="bodyMd" tone="subdued">
            Placed {order.orderDate} · Target shipping {order.targetShipping} · {order.recipients} recipient{order.recipients === 1 ? '' : 's'} · {order.amount}
          </Text>
        </BlockStack>
        <InlineStack gap="200">
          <Button>Resend gift emails</Button>
          <Button>Export recipients</Button>
        </InlineStack>
      </InlineStack>

      <Card padding="0">
        <Tabs tabs={tabs} selected={tabIndex} onSelect={setTabIndex}>
          <Box padding="500">
            {tabIndex === 0 && <GiftOrderTab order={order} />}
            {tabIndex === 1 && (
              <RecipientsTab
                recipients={filteredRecipients}
                totalRecipients={recipients.length}
                counts={counts}
                filter={recipientFilter}
                onFilter={setRecipientFilter}
              />
            )}
            {tabIndex === 2 && <ActivityTab order={order} recipients={recipients} />}
          </Box>
        </Tabs>
      </Card>
    </BlockStack>
  );
}

/* ─── Tab 1: Gift order (what the gifter pre-paid for) ─── */

function GiftOrderTab({ order }: { order: typeof ORDERS[number] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24 }}>
      <BlockStack gap="500">
        <BlockStack gap="200">
          <Text as="h2" variant="headingMd">What was ordered</Text>
          <Text as="p" variant="bodySm" tone="subdued">
            The gifter pre-paid for {order.recipients} gift{order.recipients === 1 ? '' : 's'}. Each recipient picks their own item from the allowed catalog.
          </Text>
        </BlockStack>
        <div style={GIFT_GRID}>
          <Field label="Recipients"            value={`${order.recipients}`} />
          <Field label="Budget per recipient"  value={order.budgetPerRecipient} />
          <Field label="Total pre-paid"        value={order.amount} />
          <Field label="Target shipping"       value={order.targetShipping} />
          <Field
            label="Allowed categories"
            value={
              <InlineStack gap="100" wrap>
                {order.categories.map((c) => (
                  <span key={c} style={CATEGORY_CHIP}>{c}</span>
                ))}
              </InlineStack>
            }
            full
          />
          <Field label="Card theme" value={order.theme} full />
          {order.message && (
            <Field
              label="Personal message from gifter"
              value={
                <Box padding="300" borderRadius="200" background="bg-surface-secondary">
                  <Text as="p" variant="bodyMd">&ldquo;{order.message}&rdquo;</Text>
                </Box>
              }
              full
            />
          )}
        </div>
      </BlockStack>

      <BlockStack gap="400">
        <Card>
          <BlockStack gap="300">
            <Text as="h3" variant="headingSm">Gifter</Text>
            <BlockStack gap="050">
              <Text as="p" variant="bodyMd" fontWeight="semibold">{order.sender}</Text>
              <Text as="p" variant="bodySm" tone="subdued">{order.email}</Text>
              <Text as="p" variant="bodySm" tone="subdued">{order.company}</Text>
            </BlockStack>
          </BlockStack>
        </Card>
        <Card>
          <BlockStack gap="300">
            <Text as="h3" variant="headingSm">Payment</Text>
            <InlineStack gap="200" blockAlign="center">
              <Box
                padding="100"
                borderRadius="100"
                background="bg-surface-secondary"
                borderWidth="025"
                borderColor="border"
              >
                <Text as="span" variant="bodySm" fontWeight="bold">VISA</Text>
              </Box>
              <BlockStack gap="0">
                <Text as="p" variant="bodySm" fontWeight="semibold">·· 4242</Text>
                <Text as="p" variant="bodySm" tone="subdued">Charged {order.orderDate}</Text>
              </BlockStack>
            </InlineStack>
          </BlockStack>
        </Card>
      </BlockStack>
    </div>
  );
}

/* ─── Tab 2: Recipients (the sub-orders) ─── */

function RecipientsTab({
  recipients,
  totalRecipients,
  counts,
  filter,
  onFilter,
}: {
  recipients: Recipient[];
  totalRecipients: number;
  counts: Record<string, number>;
  filter: 'All' | Recipient['status'];
  onFilter: (f: 'All' | Recipient['status']) => void;
}) {
  const claimedN = counts.Picked + counts.Shipped + counts.Delivered;
  const inFlight = counts.Sent + counts.Opened;
  const stuck    = counts.Bounced;

  return (
    <BlockStack gap="400">
      <BlockStack gap="100">
        <Text as="h2" variant="headingMd">Recipient sub-orders</Text>
        <Text as="p" variant="bodySm" tone="subdued">
          One sub-order per recipient. Each picks their own product after they open their gift.
        </Text>
      </BlockStack>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        <StatTile label="In flight"            value={inFlight}  total={totalRecipients} tone="attention" />
        <StatTile label="Picked or delivered"  value={claimedN}  total={totalRecipients} tone="success" />
        <StatTile label="Bounced"              value={stuck}     total={totalRecipients} tone="critical" />
      </div>

      <InlineStack gap="100" wrap>
        {RECIPIENT_FILTERS.map((f) => (
          <RecipientChip
            key={f}
            label={f}
            count={counts[f] ?? 0}
            active={filter === f}
            onClick={() => onFilter(f)}
          />
        ))}
      </InlineStack>

      {recipients.length === 0 ? (
        <Box padding="500">
          <Text as="p" variant="bodyMd" tone="subdued" alignment="center">
            No recipients with status &ldquo;{filter}&rdquo;.
          </Text>
        </Box>
      ) : (
        <RecipientTable recipients={recipients} />
      )}
    </BlockStack>
  );
}

function StatTile({ label, value, total, tone }: {
  label: string;
  value: number;
  total: number;
  tone: 'success' | 'attention' | 'critical';
}) {
  const colors = {
    success:   { fg: '#047857', bar: '#1F8A4C' },
    attention: { fg: '#92590B', bar: '#E0A23E' },
    critical:  { fg: '#B91C1C', bar: '#E04F4F' },
  }[tone];
  const pct = total ? (value / total) * 100 : 0;
  return (
    <Box padding="300" borderRadius="200" borderWidth="025" borderColor="border" background="bg-surface">
      <BlockStack gap="200">
        <Text as="p" variant="bodySm" tone="subdued">{label}</Text>
        <Text as="p" variant="headingLg">{value}<Text as="span" variant="bodySm" tone="subdued"> of {total}</Text></Text>
        <div style={{ height: 4, borderRadius: 999, background: '#f0f0f2', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: colors.bar }} />
        </div>
      </BlockStack>
    </Box>
  );
}

function RecipientChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        all: 'unset',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        padding: '4px 9px',
        borderRadius: 7,
        fontSize: 12.5,
        fontWeight: 500,
        background: active ? '#1a1a1f' : '#fff',
        color: active ? '#fff' : '#111',
        border: `1px solid ${active ? '#1a1a1f' : '#dcdcde'}`,
        transition: 'background 120ms, color 120ms',
      }}
    >
      {label}
      <span style={{
        fontSize: 11,
        fontWeight: 600,
        padding: '0 5px',
        borderRadius: 999,
        background: active ? 'rgba(255,255,255,0.18)' : '#ececef',
        color: active ? 'rgba(255,255,255,0.92)' : '#5a5a62',
      }}>
        {count}
      </span>
    </button>
  );
}

function RecipientTable({ recipients }: { recipients: Recipient[] }) {
  return (
    <div style={{ overflowX: 'auto', borderRadius: 10, border: '1px solid #ececef' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
        <thead>
          <tr style={{ background: '#fafafb' }}>
            <th style={TH}>Recipient</th>
            <th style={TH}>Status</th>
            <th style={TH}>Contents</th>
            <th style={TH}>Ship to</th>
            <th style={TH}>Tracking</th>
          </tr>
        </thead>
        <tbody>
          {recipients.map((r) => (
            <tr key={r.id} className="rec-row">
              <td style={TD}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: '#111', fontWeight: 500 }}>{r.name}</span>
                  <span style={{ color: '#8a8a93', fontSize: 12 }}>{r.email}</span>
                </div>
              </td>
              <td style={TD}>
                <Badge tone={RECIPIENT_STATUS_TONE[r.status]}>{r.status}</Badge>
              </td>
              <td style={{ ...TD, color: '#43434b' }}>
                {r.pickedProduct ?? <span style={{ color: '#b5b5bb' }}>Not picked yet</span>}
              </td>
              <td style={{ ...TD, color: '#43434b' }}>{r.shippingTo}</td>
              <td style={{ ...TD, color: '#43434b', fontFamily: 'ui-monospace, monospace', fontSize: 12.5 }}>
                {r.tracking ?? <span style={{ color: '#b5b5bb' }}>—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        :global(.rec-row) { transition: background 120ms ease; }
        :global(.rec-row:hover) { background: #f9f9fb; }
        :global(.rec-row td) { border-bottom: 1px solid #f0f0f2; }
        :global(.rec-row:last-child td) { border-bottom: none; }
      `}</style>
    </div>
  );
}

const TH: React.CSSProperties = {
  padding: '11px 16px',
  textAlign: 'left',
  fontSize: 12.5,
  fontWeight: 600,
  color: '#6b6b73',
  letterSpacing: '-0.005em',
  whiteSpace: 'nowrap',
  borderBottom: '1px solid #ececef',
};

const TD: React.CSSProperties = {
  padding: '13px 16px',
  verticalAlign: 'middle',
};

/* ─── Tab 3: Activity ─── */

function ActivityTab({ order, recipients }: { order: typeof ORDERS[number]; recipients: Recipient[] }) {
  type Event = { time: string; title: string; sub?: string };
  const events: Event[] = [];

  events.push({
    time: order.orderDate,
    title: `${order.sender} placed the order`,
    sub: `${order.recipients} gift${order.recipients === 1 ? '' : 's'} pre-paid · ${order.amount}`,
  });
  events.push({
    time: order.orderDate,
    title: `${order.recipients} gift${order.recipients === 1 ? '' : 's'} sent to recipients`,
    sub: `From gifts@${order.email.split('@')[1]}`,
  });

  const openedN = recipients.filter((r) => r.status !== 'Sent' && r.status !== 'Bounced').length;
  if (openedN > 0) events.push({ time: order.orderDate, title: `${openedN} recipient${openedN === 1 ? '' : 's'} opened their gift` });

  const pickedN = recipients.filter((r) => r.pickedProduct).length;
  if (pickedN > 0) events.push({ time: order.targetShipping, title: `${pickedN} recipient${pickedN === 1 ? '' : 's'} picked a product` });

  const shippedN = recipients.filter((r) => r.status === 'Shipped' || r.status === 'Delivered').length;
  if (shippedN > 0) events.push({ time: order.targetShipping, title: `${shippedN} order${shippedN === 1 ? '' : 's'} shipped` });

  const deliveredN = recipients.filter((r) => r.status === 'Delivered').length;
  if (deliveredN > 0) events.push({ time: order.targetShipping, title: `${deliveredN} order${deliveredN === 1 ? '' : 's'} delivered` });

  const subscribedN = recipients.filter((r) => r.subscribed).length;
  if (subscribedN > 0) events.push({ time: order.targetShipping, title: `${subscribedN} recipient${subscribedN === 1 ? '' : 's'} subscribed to your store` });

  if (order.status === 'Cancelled') {
    events.push({ time: order.targetShipping, title: 'Order cancelled' });
  }

  return (
    <BlockStack gap="400">
      <BlockStack gap="100">
        <Text as="h2" variant="headingMd">Activity</Text>
        <Text as="p" variant="bodySm" tone="subdued">
          Lifecycle of this order, from placement to delivery.
        </Text>
      </BlockStack>
      <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column' }}>
        {events.map((e, i) => (
          <li key={i} style={{
            display: 'grid',
            gridTemplateColumns: '120px 16px 1fr',
            gap: 12,
            alignItems: 'start',
            padding: '10px 0',
          }}>
            <span style={{ fontSize: 12, color: '#8a8a93', paddingTop: 3 }}>{e.time}</span>
            <span style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: i === 0 ? '#5c4dff' : '#dcdcde',
              marginTop: 6,
              justifySelf: 'center',
            }} />
            <BlockStack gap="050">
              <Text as="p" variant="bodyMd" fontWeight={i === 0 ? 'semibold' : 'regular'}>
                {e.title}
              </Text>
              {e.sub && <Text as="p" variant="bodySm" tone="subdued">{e.sub}</Text>}
            </BlockStack>
          </li>
        ))}
      </ol>
    </BlockStack>
  );
}

/* ─── Bits ─── */

const BACK_LINK: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  color: '#5c4dff',
  fontSize: 13,
  fontWeight: 500,
  textDecoration: 'none',
};

const GIFT_GRID: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  rowGap: 16,
  columnGap: 24,
};

const CATEGORY_CHIP: React.CSSProperties = {
  display: 'inline-block',
  padding: '3px 9px',
  fontSize: 12.5,
  fontWeight: 500,
  borderRadius: 6,
  background: '#f3f3f5',
  color: '#43434b',
};

function Field({ label, value, full = false }: { label: string; value: React.ReactNode; full?: boolean }) {
  return (
    <div style={{ gridColumn: full ? '1 / span 2' : 'auto' }}>
      <Text as="p" variant="bodySm" tone="subdued">{label}</Text>
      <div style={{ marginTop: 4 }}>
        {typeof value === 'string' ? (
          <Text as="span" variant="bodyMd" fontWeight="semibold">{value}</Text>
        ) : (
          value
        )}
      </div>
    </div>
  );
}

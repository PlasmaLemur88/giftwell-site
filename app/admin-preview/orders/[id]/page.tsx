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
} from '@shopify/polaris';
import {
  ChevronLeftIcon,
  EmailIcon,
  CashDollarIcon,
  CalendarIcon,
  DeliveryIcon,
  PersonIcon,
  GiftCardFilledIcon,
  CheckCircleIcon,
  PackageFulfilledIcon,
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
          </InlineStack>
          <Text as="p" variant="bodyMd" tone="subdued">
            Placed {order.orderDate} . Target shipping {order.targetShipping}
          </Text>
        </BlockStack>
        <InlineStack gap="200">
          <Button>Resend invitations</Button>
          <Button>Export recipients</Button>
        </InlineStack>
      </InlineStack>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 14 }}>
        {/* Left column */}
        <BlockStack gap="400">
          {/* Gift order card (the parent) */}
          <Card>
            <BlockStack gap="400">
              <InlineStack gap="200" blockAlign="center">
                <Icon source={GiftCardFilledIcon} tone="base" />
                <Text as="h2" variant="headingMd">Gift order</Text>
              </InlineStack>
              <div style={GIFT_GRID}>
                <Field label="Recipients" value={`${order.recipients}`} />
                <Field label="Budget per recipient" value={order.budgetPerRecipient} />
                <Field label="Total" value={order.amount} />
                <Field label="Occasion" value={order.occasion} />
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
                    label="Personal message"
                    value={
                      <Box
                        padding="300"
                        borderRadius="200"
                        background="bg-surface-secondary"
                      >
                        <Text as="p" variant="bodyMd">
                          &ldquo;{order.message}&rdquo;
                        </Text>
                      </Box>
                    }
                    full
                  />
                )}
              </div>
            </BlockStack>
          </Card>

          {/* Recipients card */}
          <Card padding="0">
            <Box padding="400">
              <BlockStack gap="300">
                <InlineStack align="space-between" blockAlign="center">
                  <InlineStack gap="200" blockAlign="center">
                    <Icon source={PersonIcon} tone="base" />
                    <Text as="h2" variant="headingMd">Recipients ({recipients.length})</Text>
                  </InlineStack>
                  <Text as="span" variant="bodySm" tone="subdued">
                    Each recipient picks their gift independently
                  </Text>
                </InlineStack>
                <InlineStack gap="100" wrap>
                  {RECIPIENT_FILTERS.map((f) => (
                    <RecipientChip
                      key={f}
                      label={f}
                      count={counts[f]}
                      active={recipientFilter === f}
                      onClick={() => setRecipientFilter(f)}
                    />
                  ))}
                </InlineStack>
              </BlockStack>
            </Box>
            <Divider />
            {filteredRecipients.length === 0 ? (
              <Box padding="500">
                <Text as="p" variant="bodyMd" tone="subdued" alignment="center">
                  No recipients with status &ldquo;{recipientFilter}&rdquo;.
                </Text>
              </Box>
            ) : (
              <RecipientTable recipients={filteredRecipients} />
            )}
          </Card>

          {/* Activity timeline */}
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">Activity</Text>
              <Timeline order={order} recipients={recipients} />
            </BlockStack>
          </Card>
        </BlockStack>

        {/* Right rail */}
        <BlockStack gap="400">
          <Card>
            <BlockStack gap="300">
              <Text as="h3" variant="headingSm">Gifter</Text>
              <BlockStack gap="050">
                <Text as="p" variant="bodyMd" fontWeight="semibold">{order.sender}</Text>
                <Text as="p" variant="bodySm" tone="subdued">{order.email}</Text>
                <Text as="p" variant="bodySm" tone="subdued">{order.company}</Text>
              </BlockStack>
              <Divider />
              <BlockStack gap="200">
                <SummaryRow icon={CalendarIcon} label="Ordered"        value={order.orderDate} />
                <SummaryRow icon={DeliveryIcon} label="Target ship"    value={order.targetShipping} />
                <SummaryRow icon={CashDollarIcon} label="Total"        value={order.amount} />
                <SummaryRow icon={CheckCircleIcon} label="Claim rate"  value={`${Math.round((recipients.filter((r) => r.pickedProduct).length / recipients.length) * 100)}%`} />
              </BlockStack>
            </BlockStack>
          </Card>

          <Card>
            <BlockStack gap="200">
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
    </BlockStack>
  );
}

/* ─── Building blocks ─── */

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

function SummaryRow({
  icon: IconComp,
  label,
  value,
}: {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
}) {
  return (
    <InlineStack align="space-between" blockAlign="center">
      <InlineStack gap="200" blockAlign="center">
        <span style={{ width: 14, height: 14, color: '#8a8a93', display: 'inline-flex' }}>
          <IconComp width={14} height={14} />
        </span>
        <Text as="span" variant="bodySm" tone="subdued">{label}</Text>
      </InlineStack>
      <Text as="span" variant="bodySm" fontWeight="semibold">{value}</Text>
    </InlineStack>
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
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
        <thead>
          <tr>
            <th style={TH}>Recipient</th>
            <th style={TH}>Status</th>
            <th style={TH}>Picked</th>
            <th style={TH}>Ship to</th>
            <th style={TH}>Tracking</th>
            <th style={TH}>Subscribed</th>
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
                {r.pickedProduct ?? <span style={{ color: '#b5b5bb' }}>Not yet</span>}
              </td>
              <td style={{ ...TD, color: '#43434b' }}>{r.shippingTo}</td>
              <td style={{ ...TD, color: '#43434b', fontFamily: 'ui-monospace, monospace', fontSize: 12.5 }}>
                {r.tracking ?? <span style={{ color: '#b5b5bb' }}>—</span>}
              </td>
              <td style={TD}>
                {r.subscribed
                  ? <Badge tone="success">Yes</Badge>
                  : <span style={{ color: '#b5b5bb', fontSize: 12.5 }}>No</span>}
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
  padding: '12px 16px',
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

/* ─── Activity timeline ─── */

function Timeline({ order, recipients }: { order: typeof ORDERS[number]; recipients: Recipient[] }) {
  type Event = { time: string; title: string; sub?: string; tone?: 'base' | 'subdued' };
  const events: Event[] = [];

  events.push({ time: order.orderDate, title: `Order placed by ${order.sender}`, sub: `${order.recipients} recipient${order.recipients === 1 ? '' : 's'} . ${order.amount}` });
  events.push({ time: order.orderDate, title: `Invitations sent`, sub: `${order.recipients} email${order.recipients === 1 ? '' : 's'} via ${order.email.split('@')[1]}` });

  const openedN = recipients.filter((r) => r.status !== 'Sent' && r.status !== 'Bounced').length;
  if (openedN > 0) events.push({ time: order.orderDate, title: `${openedN} recipient${openedN === 1 ? '' : 's'} opened the invitation` });

  const pickedN = recipients.filter((r) => r.pickedProduct).length;
  if (pickedN > 0) events.push({ time: order.targetShipping, title: `${pickedN} recipient${pickedN === 1 ? '' : 's'} picked their gift` });

  const shippedN = recipients.filter((r) => r.status === 'Shipped' || r.status === 'Delivered').length;
  if (shippedN > 0) events.push({ time: order.targetShipping, title: `${shippedN} order${shippedN === 1 ? '' : 's'} shipped to recipients` });

  const deliveredN = recipients.filter((r) => r.status === 'Delivered').length;
  if (deliveredN > 0) events.push({ time: order.targetShipping, title: `${deliveredN} order${deliveredN === 1 ? '' : 's'} delivered` });

  const subscribedN = recipients.filter((r) => r.subscribed).length;
  if (subscribedN > 0) events.push({ time: order.targetShipping, title: `${subscribedN} recipient${subscribedN === 1 ? '' : 's'} subscribed to your store` });

  if (order.status === 'Cancelled') {
    events.push({ time: order.targetShipping, title: 'Order cancelled', tone: 'subdued' });
  }

  return (
    <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column' }}>
      {events.map((e, i) => (
        <li key={i} style={{
          display: 'grid',
          gridTemplateColumns: '110px 16px 1fr',
          gap: 10,
          alignItems: 'start',
          padding: '8px 0',
        }}>
          <span style={{ fontSize: 12, color: '#8a8a93', paddingTop: 2 }}>{e.time}</span>
          <span style={{
            width: 10,
            height: 10,
            borderRadius: 999,
            background: i === 0 ? '#5c4dff' : '#dcdcde',
            marginTop: 5,
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
  );
}

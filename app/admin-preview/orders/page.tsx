'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  BlockStack,
  InlineStack,
  Card,
  Text,
  Button,
  Box,
  Badge,
  TextField,
  Icon,
  Divider,
  Tabs,
} from '@shopify/polaris';
import {
  SearchIcon,
  ViewIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  PackageIcon,
} from '@shopify/polaris-icons';
import {
  ORDERS,
  STATUS_TONE,
  RECIPIENT_STATUS_TONE,
  getRecipients,
  type Order,
  type Recipient,
  type RecipientStatus,
  type Status,
} from './data';

type View = 'orders' | 'recipients';
type SortKey = 'date' | 'amount' | 'status' | null;
type SortDir = 'asc' | 'desc';

const ORDER_FILTERS: ('All' | Status)[] = ['All', 'Pending', 'Shipped', 'Completed', 'Cancelled'];
const RECIPIENT_FILTERS: ('All' | RecipientStatus)[] = ['All', 'Sent', 'Opened', 'Picked', 'Shipped', 'Delivered', 'Bounced'];

type RecipientRow = Recipient & {
  parentOrderId: string;
  gifterName: string;
  gifterCompany: string;
};

export default function OrdersPage() {
  const [view, setView] = useState<View>('orders');
  const [search, setSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState<typeof ORDER_FILTERS[number]>('All');
  const [recFilter, setRecFilter] = useState<typeof RECIPIENT_FILTERS[number]>('All');
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  /* Flatten all recipients across all orders, with parent metadata */
  const allRecipients: RecipientRow[] = useMemo(() => {
    return ORDERS.flatMap((o) =>
      getRecipients(o).map((r) => ({
        ...r,
        parentOrderId: o.id,
        gifterName: o.sender,
        gifterCompany: o.company,
      }))
    );
  }, []);

  const orderCounts = useMemo(() => ({
    All:       ORDERS.length,
    Pending:   ORDERS.filter((o) => o.status === 'Pending').length,
    Shipped:   ORDERS.filter((o) => o.status === 'Shipped').length,
    Completed: ORDERS.filter((o) => o.status === 'Completed').length,
    Cancelled: ORDERS.filter((o) => o.status === 'Cancelled').length,
  }), []);

  const recipientCounts = useMemo(() => ({
    All:       allRecipients.length,
    Sent:      allRecipients.filter((r) => r.status === 'Sent').length,
    Opened:    allRecipients.filter((r) => r.status === 'Opened').length,
    Picked:    allRecipients.filter((r) => r.status === 'Picked').length,
    Shipped:   allRecipients.filter((r) => r.status === 'Shipped').length,
    Delivered: allRecipients.filter((r) => r.status === 'Delivered').length,
    Bounced:   allRecipients.filter((r) => r.status === 'Bounced').length,
  }), [allRecipients]);

  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase();
    const base = ORDERS.filter((o) => {
      if (orderFilter !== 'All' && o.status !== orderFilter) return false;
      if (!q) return true;
      return (
        o.id.toLowerCase().includes(q) ||
        o.sender.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q) ||
        o.company.toLowerCase().includes(q) ||
        o.status.toLowerCase().includes(q)
      );
    });
    if (!sortKey) return base;
    return [...base].sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'date')        cmp = new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
      else if (sortKey === 'amount') cmp = a.amountNum - b.amountNum;
      else if (sortKey === 'status') cmp = a.status.localeCompare(b.status);
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [search, orderFilter, sortKey, sortDir]);

  const filteredRecipients = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allRecipients.filter((r) => {
      if (recFilter !== 'All' && r.status !== recFilter) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.parentOrderId.toLowerCase().includes(q) ||
        r.gifterName.toLowerCase().includes(q) ||
        (r.pickedProduct?.toLowerCase().includes(q) ?? false) ||
        r.status.toLowerCase().includes(q)
      );
    });
  }, [allRecipients, search, recFilter]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('desc'); }
  };

  const viewTabs = [
    { id: 'orders',     content: `Gift orders (${orderCounts.All})`,           panelID: 'p-orders' },
    { id: 'recipients', content: `Recipient orders (${recipientCounts.All})`,  panelID: 'p-recipients' },
  ];

  const showingOrders = view === 'orders';
  const total = showingOrders ? orderCounts.All : recipientCounts.All;
  const filteredCount = showingOrders ? filteredOrders.length : filteredRecipients.length;
  const isEmpty = filteredCount === 0;
  const isSearchEmpty = isEmpty && (search.trim().length > 0 || (showingOrders ? orderFilter !== 'All' : recFilter !== 'All'));
  const isPristineEmpty = isEmpty && !isSearchEmpty;

  return (
    <BlockStack gap="500">
      <InlineStack align="space-between" blockAlign="end" gap="400">
        <BlockStack gap="100">
          <Text as="h1" variant="headingXl">Orders</Text>
          <Text as="p" variant="bodyMd" tone="subdued">
            <strong style={{ color: '#111' }}>Gift orders</strong> are the bulk pre-paid orders your gifters place.
            Each contains one or more <strong style={{ color: '#111' }}>recipient orders</strong> — what each recipient picked, shipped to their address.
          </Text>
        </BlockStack>
        <InlineStack gap="200">
          <Button>Export</Button>
        </InlineStack>
      </InlineStack>

      <Card padding="0">
        <Tabs tabs={viewTabs} selected={showingOrders ? 0 : 1} onSelect={(i) => setView(i === 0 ? 'orders' : 'recipients')}>
          <Box padding="400">
            <BlockStack gap="300">
              <TextField
                label=""
                labelHidden
                value={search}
                onChange={setSearch}
                placeholder={showingOrders
                  ? 'Search by gifter, company, order #, or status'
                  : 'Search by recipient, gifter, order #, product, or status'
                }
                prefix={<Icon source={SearchIcon} />}
                autoComplete="off"
                clearButton
                onClearButtonClick={() => setSearch('')}
              />
              <InlineStack gap="100" wrap>
                {showingOrders ? (
                  ORDER_FILTERS.map((f) => (
                    <FilterChip
                      key={f}
                      label={f}
                      count={orderCounts[f]}
                      active={orderFilter === f}
                      onClick={() => setOrderFilter(f)}
                    />
                  ))
                ) : (
                  RECIPIENT_FILTERS.map((f) => (
                    <FilterChip
                      key={f}
                      label={f}
                      count={recipientCounts[f]}
                      active={recFilter === f}
                      onClick={() => setRecFilter(f)}
                    />
                  ))
                )}
              </InlineStack>
            </BlockStack>
          </Box>

          <Divider />

          {isPristineEmpty ? (
            <PristineEmpty showingOrders={showingOrders} />
          ) : isSearchEmpty ? (
            <SearchEmpty
              showingOrders={showingOrders}
              onReset={() => {
                setSearch('');
                setOrderFilter('All');
                setRecFilter('All');
              }}
            />
          ) : showingOrders ? (
            <OrdersTable
              orders={filteredOrders}
              sortKey={sortKey}
              sortDir={sortDir}
              onToggleSort={toggleSort}
            />
          ) : (
            <RecipientOrdersTable rows={filteredRecipients} />
          )}

          {!isEmpty && (
            <Box padding="300">
              <InlineStack align="space-between" blockAlign="center">
                <Text as="span" variant="bodySm" tone="subdued">
                  {filteredCount} of {total} {showingOrders ? 'gift orders' : 'recipient orders'}
                </Text>
                <InlineStack gap="100">
                  <Button disabled>Previous</Button>
                  <Button disabled>Next</Button>
                </InlineStack>
              </InlineStack>
            </Box>
          )}
        </Tabs>
      </Card>
    </BlockStack>
  );
}

/* ─── Filter chip ─── */

function FilterChip({
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
        gap: 6,
        padding: '5px 10px',
        borderRadius: 8,
        fontSize: 13,
        fontWeight: 500,
        background: active ? '#1a1a1f' : '#fff',
        color: active ? '#fff' : '#111',
        border: `1px solid ${active ? '#1a1a1f' : '#dcdcde'}`,
        transition: 'background 120ms, color 120ms',
      }}
    >
      {label}
      <span style={{
        fontSize: 11.5,
        fontWeight: 600,
        padding: '1px 6px',
        borderRadius: 999,
        background: active ? 'rgba(255,255,255,0.18)' : '#ececef',
        color: active ? 'rgba(255,255,255,0.92)' : '#5a5a62',
        minWidth: 16,
        textAlign: 'center',
      }}>
        {count}
      </span>
    </button>
  );
}

/* ─── Sortable header cell ─── */

function SortHeader({
  label,
  sortKey,
  activeKey,
  dir,
  onClick,
  align = 'left',
}: {
  label: string;
  sortKey: SortKey;
  activeKey: SortKey;
  dir: SortDir;
  onClick: () => void;
  align?: 'left' | 'right';
}) {
  const active = activeKey === sortKey;
  return (
    <th
      style={{
        padding: '12px 16px',
        textAlign: align,
        fontSize: 12.5,
        fontWeight: 600,
        color: '#6b6b73',
        letterSpacing: '-0.005em',
        whiteSpace: 'nowrap',
        borderBottom: '1px solid #ececef',
      }}
    >
      <button
        type="button"
        onClick={onClick}
        style={{
          all: 'unset',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          color: active ? '#111' : '#6b6b73',
        }}
      >
        {label}
        <span style={{ width: 12, height: 12, display: 'inline-flex', alignItems: 'center' }}>
          {active && (
            dir === 'asc'
              ? <ChevronUpIcon width={12} height={12} />
              : <ChevronDownIcon width={12} height={12} />
          )}
        </span>
      </button>
    </th>
  );
}

/* ─── Gift orders table (parent records) ─── */

function OrdersTable({
  orders,
  sortKey,
  sortDir,
  onToggleSort,
}: {
  orders: Order[];
  sortKey: SortKey;
  sortDir: SortDir;
  onToggleSort: (key: SortKey) => void;
}) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
        <thead>
          <tr>
            <th style={STATIC_TH}>Gift order</th>
            <th style={STATIC_TH}>Gifter</th>
            <SortHeader label="Order date"   sortKey="date"   activeKey={sortKey} dir={sortDir} onClick={() => onToggleSort('date')} />
            <th style={STATIC_TH}>Target shipping</th>
            <SortHeader label="Pre-paid"     sortKey="amount" activeKey={sortKey} dir={sortDir} onClick={() => onToggleSort('amount')} align="right" />
            <th style={{ ...STATIC_TH, textAlign: 'right' }}>Recipients</th>
            <SortHeader label="Status"       sortKey="status" activeKey={sortKey} dir={sortDir} onClick={() => onToggleSort('status')} />
            <th style={{ ...STATIC_TH, textAlign: 'right' }}>View</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="orders-row">
              <td style={TD}>
                <BlockStack gap="050">
                  <Link href={`/admin-preview/orders/${o.id}`} style={{ color: '#5c4dff', textDecoration: 'none', fontWeight: 500 }}>
                    #{o.id}
                  </Link>
                  <TypeChip kind="gift" recipients={o.recipients} />
                </BlockStack>
              </td>
              <td style={TD}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: '#111', fontWeight: 500 }}>{o.sender}</span>
                  <span style={{ color: '#8a8a93', fontSize: 12 }}>{o.company}</span>
                </div>
              </td>
              <td style={{ ...TD, color: '#43434b' }}>{o.orderDate}</td>
              <td style={{ ...TD, color: '#43434b' }}>{o.targetShipping}</td>
              <td style={{ ...TD, textAlign: 'right', color: '#111', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>
                {o.amount}
              </td>
              <td style={{ ...TD, textAlign: 'right', color: '#43434b', fontVariantNumeric: 'tabular-nums' }}>
                {o.recipients}
              </td>
              <td style={TD}>
                <Badge tone={STATUS_TONE[o.status]} progress={o.status === 'Pending' ? 'incomplete' : o.status === 'Shipped' ? 'partiallyComplete' : 'complete'}>
                  {o.status}
                </Badge>
              </td>
              <td style={{ ...TD, textAlign: 'right' }}>
                <Link
                  href={`/admin-preview/orders/${o.id}`}
                  aria-label={`View order ${o.id}`}
                  style={{
                    cursor: 'pointer',
                    width: 28,
                    height: 28,
                    borderRadius: 6,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#8a8a93',
                    background: '#f5f5f7',
                  }}
                >
                  <ViewIcon width={16} height={16} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        :global(.orders-row) { transition: background 120ms ease; }
        :global(.orders-row:hover) { background: #f9f9fb; }
        :global(.orders-row td) { border-bottom: 1px solid #f0f0f2; vertical-align: top; padding-top: 14px; }
        :global(.orders-row:last-child td) { border-bottom: none; }
      `}</style>
    </div>
  );
}

/* ─── Recipient orders table (child records flattened across all parents) ─── */

function RecipientOrdersTable({ rows }: { rows: RecipientRow[] }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
        <thead>
          <tr>
            <th style={STATIC_TH}>Recipient</th>
            <th style={STATIC_TH}>From gift order</th>
            <th style={STATIC_TH}>Contents</th>
            <th style={STATIC_TH}>Ship to</th>
            <th style={STATIC_TH}>Tracking</th>
            <th style={STATIC_TH}>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id} className="orders-row">
              <td style={TD}>
                <BlockStack gap="050">
                  <span style={{ color: '#111', fontWeight: 500 }}>{r.name}</span>
                  <span style={{ color: '#8a8a93', fontSize: 12 }}>{r.email}</span>
                  <TypeChip kind="recipient" />
                </BlockStack>
              </td>
              <td style={TD}>
                <BlockStack gap="050">
                  <Link href={`/admin-preview/orders/${r.parentOrderId}`} style={{ color: '#5c4dff', textDecoration: 'none', fontWeight: 500 }}>
                    #{r.parentOrderId}
                  </Link>
                  <span style={{ color: '#43434b', fontSize: 12 }}>{r.gifterName}</span>
                  <span style={{ color: '#8a8a93', fontSize: 12 }}>{r.gifterCompany}</span>
                </BlockStack>
              </td>
              <td style={{ ...TD, color: '#43434b' }}>
                {r.pickedProduct ?? <span style={{ color: '#b5b5bb' }}>Not picked yet</span>}
              </td>
              <td style={{ ...TD, color: '#43434b' }}>{r.shippingTo}</td>
              <td style={{ ...TD, color: '#43434b', fontFamily: 'ui-monospace, monospace', fontSize: 12.5 }}>
                {r.tracking ?? <span style={{ color: '#b5b5bb' }}>—</span>}
              </td>
              <td style={TD}>
                <Badge tone={RECIPIENT_STATUS_TONE[r.status]}>{r.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        :global(.orders-row) { transition: background 120ms ease; }
        :global(.orders-row:hover) { background: #f9f9fb; }
        :global(.orders-row td) { border-bottom: 1px solid #f0f0f2; vertical-align: top; padding-top: 14px; }
        :global(.orders-row:last-child td) { border-bottom: none; }
      `}</style>
    </div>
  );
}

/* ─── Type chip (Bulk gift / Recipient) ─── */

function TypeChip({ kind, recipients }: { kind: 'gift' | 'recipient'; recipients?: number }) {
  if (kind === 'gift') {
    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '2px 7px',
        borderRadius: 6,
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.01em',
        textTransform: 'uppercase',
        background: '#EEF0FF',
        color: '#4036A8',
        width: 'fit-content',
      }}>
        Bulk gift
        {recipients !== undefined && (
          <span style={{ fontWeight: 500, opacity: 0.75 }}>· {recipients}</span>
        )}
      </span>
    );
  }
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '2px 7px',
      borderRadius: 6,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.01em',
      textTransform: 'uppercase',
      background: '#F3F3F5',
      color: '#5a5a62',
      width: 'fit-content',
    }}>
      Recipient
    </span>
  );
}

const STATIC_TH: React.CSSProperties = {
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
  padding: '14px 16px',
  verticalAlign: 'top',
};

/* ─── Empty states ─── */

function SearchEmpty({ showingOrders, onReset }: { showingOrders: boolean; onReset: () => void }) {
  return (
    <Box padding="600">
      <BlockStack gap="300" inlineAlign="center">
        <Box padding="300" borderRadius="full" background="bg-surface-secondary">
          <Icon source={SearchIcon} tone="subdued" />
        </Box>
        <BlockStack gap="100" inlineAlign="center">
          <Text as="p" variant="headingMd">
            No {showingOrders ? 'gift orders' : 'recipient orders'} match
          </Text>
          <Text as="p" variant="bodyMd" tone="subdued">
            Try a different name, order number, or status.
          </Text>
        </BlockStack>
        <Button onClick={onReset}>Clear filters</Button>
      </BlockStack>
    </Box>
  );
}

function PristineEmpty({ showingOrders }: { showingOrders: boolean }) {
  return (
    <Box padding="800">
      <BlockStack gap="300" inlineAlign="center">
        <Box padding="300" borderRadius="full" background="bg-surface-secondary">
          <Icon source={PackageIcon} tone="subdued" />
        </Box>
        <BlockStack gap="100" inlineAlign="center">
          <Text as="p" variant="headingMd">
            No {showingOrders ? 'gift orders' : 'recipient orders'} yet
          </Text>
          <Text as="p" variant="bodyMd" tone="subdued">
            {showingOrders
              ? 'When a gifter places their first order, it will show up here.'
              : 'Once a gift is sent to a recipient, their order will show up here.'}
          </Text>
        </BlockStack>
        <Button variant="primary" url="/admin-preview/landing">
          Share your gift link
        </Button>
      </BlockStack>
    </Box>
  );
}

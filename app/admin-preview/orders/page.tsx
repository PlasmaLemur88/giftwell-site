'use client';

import { useMemo, useState } from 'react';
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
} from '@shopify/polaris';
import {
  SearchIcon,
  ViewIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  PackageIcon,
} from '@shopify/polaris-icons';

type Status = 'Completed' | 'Shipped' | 'Pending' | 'Cancelled';

type Order = {
  id: string;
  sender: string;
  email: string;
  orderDate: string;
  targetShipping: string;
  amount: string;
  amountNum: number;
  recipients: number;
  status: Status;
};

const ORDERS: Order[] = [
  { id: '33931', sender: 'Tom Reyes',        email: 'tom@summitcg.co',     orderDate: 'Apr 03, 2026', targetShipping: 'Apr 04, 2026', amount: '$343.90',   amountNum: 343.90,  recipients: 1,  status: 'Completed' },
  { id: '33912', sender: 'Sarah Chen',       email: 'sarah@halcyon.io',    orderDate: 'Apr 02, 2026', targetShipping: 'Apr 04, 2026', amount: '$684.50',   amountNum: 684.50,  recipients: 2,  status: 'Shipped'   },
  { id: '32933', sender: 'Riley Lopez',      email: 'riley@northforge.co', orderDate: 'Mar 22, 2026', targetShipping: 'Mar 23, 2026', amount: '$453.90',   amountNum: 453.90,  recipients: 1,  status: 'Completed' },
  { id: '32826', sender: 'Robert Schox',     email: 'rs@parallelpath.com', orderDate: 'Mar 20, 2026', targetShipping: 'Mar 21, 2026', amount: '$1,827.03', amountNum: 1827.03, recipients: 3,  status: 'Completed' },
  { id: '32702', sender: 'Marcus Liu',       email: 'marcus@truebay.co',   orderDate: 'Mar 18, 2026', targetShipping: 'Mar 24, 2026', amount: '$1,212.40', amountNum: 1212.40, recipients: 4,  status: 'Pending'   },
  { id: '32445', sender: 'Priya Patel',      email: 'priya@orbitlabs.io',  orderDate: 'Mar 14, 2026', targetShipping: 'Mar 18, 2026', amount: '$5,840.00', amountNum: 5840.00, recipients: 12, status: 'Completed' },
  { id: '32102', sender: 'Jordan Park',      email: 'jp@flintstudio.co',   orderDate: 'Mar 09, 2026', targetShipping: 'Mar 10, 2026', amount: '$135.50',   amountNum: 135.50,  recipients: 1,  status: 'Cancelled' },
  { id: '31872', sender: 'Alex Kim',         email: 'alex@brightway.so',   orderDate: 'Mar 05, 2026', targetShipping: 'Mar 06, 2026', amount: '$894.20',   amountNum: 894.20,  recipients: 2,  status: 'Completed' },
  { id: '31077', sender: 'Haipeng Wei',      email: 'haipeng@arclite.co',  orderDate: 'Feb 23, 2026', targetShipping: 'Feb 24, 2026', amount: '$294.40',   amountNum: 294.40,  recipients: 1,  status: 'Completed' },
  { id: '30822', sender: 'Lauren Mitchell',  email: 'lm@everbloom.shop',   orderDate: 'Feb 18, 2026', targetShipping: 'Feb 19, 2026', amount: '$2,418.60', amountNum: 2418.60, recipients: 6,  status: 'Completed' },
  { id: '30501', sender: 'Diego Vargas',     email: 'diego@meridian.co',   orderDate: 'Feb 12, 2026', targetShipping: 'Feb 13, 2026', amount: '$748.90',   amountNum: 748.90,  recipients: 2,  status: 'Shipped'   },
  { id: '28789', sender: 'Daniel Seminara',  email: 'daniel@seminara.io',  orderDate: 'Jan 27, 2026', targetShipping: 'Jan 28, 2026', amount: '$312.06',   amountNum: 312.06,  recipients: 1,  status: 'Completed' },
];

const FILTERS: ('All' | Status)[] = ['All', 'Pending', 'Shipped', 'Completed', 'Cancelled'];

const STATUS_TONE: Record<Status, 'success' | 'info' | 'attention' | 'critical'> = {
  Completed: 'success',
  Shipped:   'info',
  Pending:   'attention',
  Cancelled: 'critical',
};

type SortKey = 'date' | 'amount' | 'status' | null;
type SortDir = 'asc' | 'desc';

export default function OrdersPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<typeof FILTERS[number]>('All');
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const base = ORDERS.filter((o) => {
      if (filter !== 'All' && o.status !== filter) return false;
      if (!q) return true;
      return (
        o.id.toLowerCase().includes(q) ||
        o.sender.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q) ||
        o.status.toLowerCase().includes(q)
      );
    });
    if (!sortKey) return base;
    const sorted = [...base].sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'date')        cmp = new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
      else if (sortKey === 'amount') cmp = a.amountNum - b.amountNum;
      else if (sortKey === 'status') cmp = a.status.localeCompare(b.status);
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return sorted;
  }, [search, filter, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const counts = useMemo(() => ({
    All:       ORDERS.length,
    Pending:   ORDERS.filter((o) => o.status === 'Pending').length,
    Shipped:   ORDERS.filter((o) => o.status === 'Shipped').length,
    Completed: ORDERS.filter((o) => o.status === 'Completed').length,
    Cancelled: ORDERS.filter((o) => o.status === 'Cancelled').length,
  }), []);

  const isEmpty = filtered.length === 0;
  const isSearchEmpty = isEmpty && (search.trim().length > 0 || filter !== 'All');
  const isPristineEmpty = isEmpty && search.trim().length === 0 && filter === 'All';

  return (
    <BlockStack gap="500">
      <InlineStack align="space-between" blockAlign="end" gap="400">
        <BlockStack gap="100">
          <Text as="h1" variant="headingXl">Orders</Text>
          <Text as="p" variant="bodyMd" tone="subdued">
            Every gift order placed through Giftwell. Search, sort, and drill into recipients.
          </Text>
        </BlockStack>
        <InlineStack gap="200">
          <Button>Export</Button>
        </InlineStack>
      </InlineStack>

      <Card padding="0">
        <Box padding="400">
          <BlockStack gap="300">
            <TextField
              label=""
              labelHidden
              value={search}
              onChange={setSearch}
              placeholder="Search by sender, email, order #, or status"
              prefix={<Icon source={SearchIcon} />}
              autoComplete="off"
              clearButton
              onClearButtonClick={() => setSearch('')}
            />
            <InlineStack gap="100" wrap>
              {FILTERS.map((f) => (
                <FilterChip
                  key={f}
                  label={f}
                  count={counts[f]}
                  active={filter === f}
                  onClick={() => setFilter(f)}
                />
              ))}
            </InlineStack>
          </BlockStack>
        </Box>

        <Divider />

        {isPristineEmpty ? (
          <PristineEmpty />
        ) : isSearchEmpty ? (
          <SearchEmpty onReset={() => { setSearch(''); setFilter('All'); }} />
        ) : (
          <OrdersTable
            orders={filtered}
            sortKey={sortKey}
            sortDir={sortDir}
            onToggleSort={toggleSort}
          />
        )}

        {!isEmpty && (
          <Box padding="300">
            <InlineStack align="space-between" blockAlign="center">
              <Text as="span" variant="bodySm" tone="subdued">
                {filtered.length} of {ORDERS.length} orders
              </Text>
              <InlineStack gap="100">
                <Button disabled>Previous</Button>
                <Button disabled>Next</Button>
              </InlineStack>
            </InlineStack>
          </Box>
        )}
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

/* ─── Orders table ─── */

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
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: 13.5,
      }}>
        <thead>
          <tr>
            <th style={STATIC_TH}>Order</th>
            <th style={STATIC_TH}>Sender</th>
            <SortHeader label="Order date"      sortKey="date"   activeKey={sortKey} dir={sortDir} onClick={() => onToggleSort('date')} />
            <th style={STATIC_TH}>Target shipping</th>
            <SortHeader label="Amount"          sortKey="amount" activeKey={sortKey} dir={sortDir} onClick={() => onToggleSort('amount')} align="right" />
            <th style={{ ...STATIC_TH, textAlign: 'right' }}>Recipients</th>
            <SortHeader label="Status"          sortKey="status" activeKey={sortKey} dir={sortDir} onClick={() => onToggleSort('status')} />
            <th style={{ ...STATIC_TH, textAlign: 'right' }}>View</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="orders-row">
              <td style={TD}>
                <a href={`#${o.id}`} style={{ color: '#111', textDecoration: 'none', fontWeight: 500 }}>
                  #{o.id}
                </a>
              </td>
              <td style={TD}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ color: '#111', fontWeight: 500 }}>{o.sender}</span>
                  <span style={{ color: '#8a8a93', fontSize: 12 }}>{o.email}</span>
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
                <button
                  type="button"
                  aria-label={`View order ${o.id}`}
                  style={{
                    all: 'unset',
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
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        :global(.orders-row) {
          transition: background 120ms ease;
        }
        :global(.orders-row:hover) {
          background: #f9f9fb;
        }
        :global(.orders-row td) {
          border-bottom: 1px solid #f0f0f2;
        }
        :global(.orders-row:last-child td) {
          border-bottom: none;
        }
      `}</style>
    </div>
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
  verticalAlign: 'middle',
};

/* ─── Empty states ─── */

function SearchEmpty({ onReset }: { onReset: () => void }) {
  return (
    <Box padding="600">
      <BlockStack gap="300" inlineAlign="center">
        <Box
          padding="300"
          borderRadius="full"
          background="bg-surface-secondary"
        >
          <Icon source={SearchIcon} tone="subdued" />
        </Box>
        <BlockStack gap="100" inlineAlign="center">
          <Text as="p" variant="headingMd">No orders match</Text>
          <Text as="p" variant="bodyMd" tone="subdued">
            Try a different sender name, order number, or status.
          </Text>
        </BlockStack>
        <Button onClick={onReset}>Clear filters</Button>
      </BlockStack>
    </Box>
  );
}

function PristineEmpty() {
  return (
    <Box padding="800">
      <BlockStack gap="300" inlineAlign="center">
        <Box
          padding="300"
          borderRadius="full"
          background="bg-surface-secondary"
        >
          <Icon source={PackageIcon} tone="subdued" />
        </Box>
        <BlockStack gap="100" inlineAlign="center">
          <Text as="p" variant="headingMd">No orders yet</Text>
          <Text as="p" variant="bodyMd" tone="subdued">
            When a gifter places their first order, it will show up here.
          </Text>
        </BlockStack>
        <Button variant="primary" url="/admin-preview/landing">
          Share your gift link
        </Button>
      </BlockStack>
    </Box>
  );
}

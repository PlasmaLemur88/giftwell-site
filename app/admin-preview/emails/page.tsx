'use client';

import { useState } from 'react';
import {
  Card,
  BlockStack,
  InlineStack,
  Text,
  Button,
  Box,
  Badge,
  Select,
  Divider,
} from '@shopify/polaris';
import {
  GiftCardFilledIcon,
  ClockIcon,
  CheckCircleIcon,
  DeliveryIcon,
  PackageFulfilledIcon,
  ReceiptDollarIcon,
  ConfettiIcon,
  ChartLineIcon,
  FlagIcon,
} from '@shopify/polaris-icons';

type IconSrc = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
type Status =
  | { kind: 'always' }
  | { kind: 'toggle'; defaultOn: boolean }
  | { kind: 'cadence' };

type EmailRow = {
  id: string;
  Icon: IconSrc;
  name: string;
  trigger: string;
  status: Status;
};

const RECIPIENT_EMAILS: EmailRow[] = [
  { id: 'r1', Icon: GiftCardFilledIcon,  name: 'Gift notification',    trigger: 'Sent when gifter sends gift',     status: { kind: 'always' } },
  { id: 'r2', Icon: ClockIcon,           name: 'Reminder',              trigger: 'Sent 7 days after gift if unclaimed', status: { kind: 'toggle', defaultOn: true } },
  { id: 'r3', Icon: CheckCircleIcon,     name: 'Order confirmation',    trigger: 'Sent immediately after claim',    status: { kind: 'always' } },
  { id: 'r4', Icon: DeliveryIcon,        name: 'Shipped',               trigger: 'Sent when carrier picks up',      status: { kind: 'toggle', defaultOn: true } },
  { id: 'r5', Icon: PackageFulfilledIcon, name: 'Delivered + review',   trigger: 'Sent on carrier delivery scan',   status: { kind: 'toggle', defaultOn: false } },
];

const GIFTER_EMAILS: EmailRow[] = [
  { id: 'g1', Icon: ReceiptDollarIcon, name: 'Order confirmation', trigger: 'Sent on purchase — includes Dashboard + FAQ links', status: { kind: 'always' } },
  { id: 'g2', Icon: ConfettiIcon,      name: 'Campaign live',      trigger: 'Sent when first recipient claims',                 status: { kind: 'toggle', defaultOn: true } },
  { id: 'g3', Icon: ChartLineIcon,     name: 'Milestone updates',  trigger: 'Aggregated progress — replaces per-claim emails',  status: { kind: 'cadence' } },
  { id: 'g4', Icon: FlagIcon,          name: 'Campaign wrap-up',   trigger: '100% claimed or expired — final report attached',  status: { kind: 'always' } },
];

const CADENCE_OPTIONS = [
  { label: '25% / 50% / 75%', value: 'milestones' },
  { label: 'Every 10%',       value: 'every10' },
  { label: 'Weekly digest',   value: 'weekly' },
  { label: 'First & final only', value: 'edges' },
  { label: 'Off',             value: 'off' },
];

export default function EmailsPage() {
  return (
    <BlockStack gap="800">
      <InlineStack align="space-between" blockAlign="center" gap="500">
        <BlockStack gap="100">
          <Text as="h1" variant="headingXl">Emails</Text>
          <Text as="p" variant="bodyMd" tone="subdued">
            Every email Giftwell sends on your behalf — to your gifters and their recipients.
          </Text>
        </BlockStack>
        <Button>Send test email</Button>
      </InlineStack>

      <EmailGroup
        title="Recipient"
        subtitle="What the person receiving the gift gets"
        rows={RECIPIENT_EMAILS}
      />

      <EmailGroup
        title="Gifter"
        subtitle="What the corporate buyer gets — designed for low-noise updates"
        rows={GIFTER_EMAILS}
      />
    </BlockStack>
  );
}

function EmailGroup({
  title,
  subtitle,
  rows,
}: {
  title: string;
  subtitle: string;
  rows: EmailRow[];
}) {
  return (
    <BlockStack gap="400">
      <BlockStack gap="050">
        <Text as="h2" variant="headingMd">{title}</Text>
        <Text as="p" variant="bodySm" tone="subdued">{subtitle}</Text>
      </BlockStack>
      <Card padding="0">
        {rows.map((row, i) => (
          <div key={row.id}>
            {i > 0 && <Divider />}
            <Box padding="400">
              <Row row={row} />
            </Box>
          </div>
        ))}
      </Card>
    </BlockStack>
  );
}

function Row({ row }: { row: EmailRow }) {
  return (
    <InlineStack align="space-between" blockAlign="center" gap="400" wrap={false}>
      <InlineStack gap="400" blockAlign="center" wrap={false}>
        <Box
          background="bg-surface-secondary"
          borderRadius="200"
          minWidth="40px"
          minHeight="40px"
        >
          <div
            style={{
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <row.Icon width={20} height={20} style={{ fill: '#1a1a1f' }} />
          </div>
        </Box>
        <BlockStack gap="050">
          <Text as="p" variant="bodyMd" fontWeight="semibold">{row.name}</Text>
          <Text as="p" variant="bodySm" tone="subdued">{row.trigger}</Text>
        </BlockStack>
      </InlineStack>

      <InlineStack gap="300" blockAlign="center" wrap={false}>
        <StatusControl status={row.status} />
        <Button>Preview</Button>
      </InlineStack>
    </InlineStack>
  );
}

function StatusControl({ status }: { status: Status }) {
  if (status.kind === 'always') {
    return <Badge tone="success">Always on</Badge>;
  }
  if (status.kind === 'cadence') {
    return <CadenceSelect />;
  }
  return <ToggleBadge defaultOn={status.defaultOn} />;
}

function ToggleBadge({ defaultOn }: { defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      type="button"
      onClick={() => setOn((v) => !v)}
      aria-pressed={on}
      style={{
        all: 'unset',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <span
        style={{
          width: 32,
          height: 18,
          background: on ? '#1a1a1f' : '#e1e3e5',
          borderRadius: 999,
          position: 'relative',
          transition: 'background 120ms ease',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 2,
            left: on ? 16 : 2,
            width: 14,
            height: 14,
            background: '#fff',
            borderRadius: '50%',
            transition: 'left 120ms ease',
            boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
          }}
        />
      </span>
      <span
        style={{
          fontSize: 13,
          fontWeight: 500,
          color: on ? '#111' : '#8a8a93',
          minWidth: 22,
        }}
      >
        {on ? 'On' : 'Off'}
      </span>
    </button>
  );
}

function CadenceSelect() {
  const [value, setValue] = useState('milestones');
  return (
    <div style={{ minWidth: 200 }}>
      <Select
        label=""
        labelHidden
        options={CADENCE_OPTIONS}
        value={value}
        onChange={setValue}
      />
    </div>
  );
}

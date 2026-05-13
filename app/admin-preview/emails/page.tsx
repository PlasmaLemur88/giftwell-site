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
  Modal,
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
  { id: 'r1', Icon: GiftCardFilledIcon,   name: 'Gift notification',    trigger: 'Sent when gifter sends gift',             status: { kind: 'always' } },
  { id: 'r2', Icon: ClockIcon,            name: 'Reminder',              trigger: 'Sent 7 days after gift if unclaimed',     status: { kind: 'toggle', defaultOn: true } },
  { id: 'r3', Icon: CheckCircleIcon,      name: 'Order confirmation',    trigger: 'Sent immediately after claim',            status: { kind: 'always' } },
  { id: 'r4', Icon: DeliveryIcon,         name: 'Shipped',               trigger: 'Sent when carrier picks up',              status: { kind: 'toggle', defaultOn: true } },
  { id: 'r5', Icon: PackageFulfilledIcon, name: 'Delivered + review',    trigger: 'Sent on carrier delivery scan',           status: { kind: 'toggle', defaultOn: false } },
];

const GIFTER_EMAILS: EmailRow[] = [
  { id: 'g1', Icon: ReceiptDollarIcon, name: 'Order confirmation', trigger: 'Sent on purchase · includes Dashboard + FAQ links', status: { kind: 'always' } },
  { id: 'g2', Icon: ConfettiIcon,      name: 'Campaign live',      trigger: 'Sent when first recipient claims',                  status: { kind: 'toggle', defaultOn: true } },
  { id: 'g3', Icon: ChartLineIcon,     name: 'Milestone updates',  trigger: 'Aggregated progress · replaces per-claim emails',   status: { kind: 'cadence' } },
  { id: 'g4', Icon: FlagIcon,          name: 'Campaign wrap-up',   trigger: '100% claimed or expired · final report attached',   status: { kind: 'always' } },
];

const CADENCE_OPTIONS = [
  { label: '25% / 50% / 75%',    value: 'milestones' },
  { label: 'Every 10%',          value: 'every10' },
  { label: 'Weekly digest',      value: 'weekly' },
  { label: 'First & final only', value: 'edges' },
  { label: 'Off',                value: 'off' },
];

/* ─── Merchant brand (in production these come from merchant settings) ─── */

const BRAND_COLOR = '#5B6CFF';
const MERCHANT_NAME = 'Acme';

function lighten(hex: string, amount = 0.3): string {
  const cleaned = hex.replace('#', '');
  const r = parseInt(cleaned.slice(0, 2), 16);
  const g = parseInt(cleaned.slice(2, 4), 16);
  const b = parseInt(cleaned.slice(4, 6), 16);
  const mix = (c: number) => Math.round(c + (255 - c) * amount);
  return `#${[mix(r), mix(g), mix(b)].map((c) => c.toString(16).padStart(2, '0')).join('')}`;
}

function MerchantLogo({ size = 44, radius = 8 }: { size?: number; radius?: number }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: '#1a1a1f',
        color: '#fff',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontFamily: 'Georgia, "Times New Roman", serif',
        fontWeight: 700,
        fontStyle: 'italic',
        fontSize: Math.round(size * 0.5),
        letterSpacing: '-0.04em',
      }}
      aria-label={MERCHANT_NAME}
    >
      {MERCHANT_NAME.charAt(0)}
    </span>
  );
}

/* ─── Per-email mockup content ─── */

type EmailContent = {
  fromName: string;
  fromEmail: string;
  audience: 'recipient' | 'gifter';
  eyebrow: string;
  headline: string;
  body: React.ReactNode;
  primaryCta: string;
  secondaryCta?: string;
  footer: string;
  variant?: 'hero' | 'milestone' | 'wrap';
};

const EMAIL_CONTENT: Record<string, EmailContent> = {
  r1: {
    fromName: 'Acme Store via Giftwell',
    fromEmail: 'gifts@giftwell.io',
    audience: 'recipient',
    eyebrow: 'A GIFT FROM ACME STORE',
    headline: 'You’ve received a gift!',
    body: <><strong>Sarah</strong> from Acme Corp wanted to send you something special. Tap below to unwrap your gift.</>,
    primaryCta: 'Unwrap Your Gift',
    footer: 'This gift expires in 30 days',
  },
  r2: {
    fromName: 'Acme Store via Giftwell',
    fromEmail: 'gifts@giftwell.io',
    audience: 'recipient',
    eyebrow: 'DON’T MISS OUT',
    headline: 'Your gift is waiting',
    body: <>Sarah sent you a gift 7 days ago. It expires in <strong>23 days</strong>. Take a moment to unwrap it.</>,
    primaryCta: 'Unwrap Your Gift',
    footer: 'Sent 7 days after the original gift',
  },
  r3: {
    fromName: 'Acme Store via Giftwell',
    fromEmail: 'gifts@giftwell.io',
    audience: 'recipient',
    eyebrow: 'ORDER CONFIRMED',
    headline: 'Your gift is on the way',
    body: <>We&apos;ve received your selection from Sarah’s gift. We’ll let you know as soon as it ships.</>,
    primaryCta: 'View Order',
    footer: 'Order #GW-1284 · Acme Store',
  },
  r4: {
    fromName: 'Acme Store via Giftwell',
    fromEmail: 'gifts@giftwell.io',
    audience: 'recipient',
    eyebrow: 'ON THE WAY',
    headline: 'Your gift just shipped',
    body: <>Your gift from Sarah is en route. Estimated arrival: <strong>Tuesday, May 14</strong>.</>,
    primaryCta: 'Track Package',
    footer: 'USPS · 9400 1234 5678 9012 3456',
  },
  r5: {
    fromName: 'Acme Store via Giftwell',
    fromEmail: 'gifts@giftwell.io',
    audience: 'recipient',
    eyebrow: 'DELIVERED',
    headline: 'Your gift has arrived',
    body: <>We hope you love it. If you have a moment, we’d love to hear what you think.</>,
    primaryCta: 'Leave a Review',
    footer: 'Delivered May 14 · Acme Store',
  },
  g1: {
    fromName: 'Giftwell',
    fromEmail: 'hello@giftwell.io',
    audience: 'gifter',
    eyebrow: 'ORDER #G-1248',
    headline: 'Your 50 gifts are scheduled',
    body: <>Recipients will be notified tomorrow at 9am ET. Track redemption in real-time from your dashboard. Our FAQ covers the common questions.</>,
    primaryCta: 'View Dashboard',
    secondaryCta: 'View FAQ',
    footer: 'You can cancel or reschedule until 9am tomorrow.',
  },
  g2: {
    fromName: 'Giftwell',
    fromEmail: 'hello@giftwell.io',
    audience: 'gifter',
    eyebrow: 'FIRST CLAIM',
    headline: 'Your campaign is live!',
    body: <><strong>Marcus Liu</strong> just claimed his gift. 49 more recipients to go. We’ll only ping you at major milestones from here, no spam.</>,
    primaryCta: 'View Dashboard',
    footer: 'Campaign: Q4 Customer Appreciation',
  },
  g3: {
    fromName: 'Giftwell',
    fromEmail: 'hello@giftwell.io',
    audience: 'gifter',
    eyebrow: '25% CLAIMED',
    headline: '12 of 50 gifts unwrapped',
    body: <>Great traction in the first 3 days. We’ll send your next update at <strong>50% claimed</strong>, or weekly if claims slow down.</>,
    primaryCta: 'View Dashboard',
    footer: 'Adjust cadence in Emails → Milestone updates',
    variant: 'milestone',
  },
  g4: {
    fromName: 'Giftwell',
    fromEmail: 'hello@giftwell.io',
    audience: 'gifter',
    eyebrow: 'CAMPAIGN COMPLETE',
    headline: 'All 50 gifts delivered 🎉',
    body: <><strong>42</strong> claimed · <strong>8</strong> expired. Final stats and the full report are in your dashboard, ready when you are.</>,
    primaryCta: 'View Full Report',
    secondaryCta: 'Reorder Campaign',
    footer: 'Q4 Customer Appreciation · Ran Oct 1 – Nov 30',
    variant: 'wrap',
  },
};

/* ─── Page ─── */

export default function EmailsPage() {
  const [previewId, setPreviewId] = useState<string | null>(null);
  const previewRow =
    [...RECIPIENT_EMAILS, ...GIFTER_EMAILS].find((r) => r.id === previewId) ?? null;

  return (
    <>
      <BlockStack gap="800">
        <InlineStack align="space-between" blockAlign="center" gap="500">
          <BlockStack gap="100">
            <Text as="h1" variant="headingXl">Emails</Text>
            <Text as="p" variant="bodyMd" tone="subdued">
              Every email Giftwell sends on your behalf, to your gifters and their recipients.
            </Text>
          </BlockStack>
          <Button>Send test email</Button>
        </InlineStack>

        <EmailGroup
          title="Recipient"
          subtitle="What the person receiving the gift gets"
          rows={RECIPIENT_EMAILS}
          onPreview={setPreviewId}
        />

        <EmailGroup
          title="Gifter"
          subtitle="What the corporate buyer gets. Designed for low-noise updates"
          rows={GIFTER_EMAILS}
          onPreview={setPreviewId}
        />
      </BlockStack>

      <Modal
        open={previewRow !== null}
        onClose={() => setPreviewId(null)}
        title={previewRow?.name ?? ''}
      >
        {previewRow && (
          <Modal.Section>
            <BlockStack gap="400">
              <Text as="p" variant="bodySm" tone="subdued">{previewRow.trigger}</Text>
              <EmailMockup content={EMAIL_CONTENT[previewRow.id]} />
            </BlockStack>
          </Modal.Section>
        )}
      </Modal>
    </>
  );
}

function EmailGroup({
  title,
  subtitle,
  rows,
  onPreview,
}: {
  title: string;
  subtitle: string;
  rows: EmailRow[];
  onPreview: (id: string) => void;
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
              <Row row={row} onPreview={() => onPreview(row.id)} />
            </Box>
          </div>
        ))}
      </Card>
    </BlockStack>
  );
}

function Row({ row, onPreview }: { row: EmailRow; onPreview: () => void }) {
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
        <Button onClick={onPreview}>Preview</Button>
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

/* ─── Email mockup (the polished branded design) ─── */

function EmailMockup({ content }: { content: EmailContent }) {
  const isGifter = content.audience === 'gifter';
  const brandLight = lighten(BRAND_COLOR, 0.25);
  return (
    <div
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        border: '1px solid #e1e3e5',
        boxShadow: '0 4px 16px rgba(15, 15, 25, 0.06)',
        background: '#ffffff',
      }}
    >
      {/* From strip */}
      <div
        style={{
          padding: '14px 16px',
          borderBottom: '1px solid #ececef',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        {isGifter ? (
          // Service emails from Giftwell — keep Giftwell mark in the From strip
          <span
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1a1a1f, #4a4a52)',
              color: '#fff',
              fontWeight: 700,
              fontSize: 14,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
            }}
          >
            G
          </span>
        ) : (
          // Recipient emails are from the merchant — show their logo
          <MerchantLogo size={36} radius={18} />
        )}
        <div style={{ lineHeight: 1.3 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{content.fromName}</div>
          <div style={{ fontSize: 12, color: '#6b6b73' }}>{content.fromEmail}</div>
        </div>
      </div>

      {/* Hero */}
      <div
        style={{
          padding: '44px 28px 36px',
          background:
            'radial-gradient(120% 80% at 50% 0%, #f5f7ff 0%, #fbfcff 60%, #ffffff 100%)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Sparkle top={14} left={20} size={11} />
        <Sparkle top={22} right={28} size={9} />
        <Sparkle bottom={28} left={36} size={10} />
        <Sparkle bottom={48} right={20} size={8} />

        {/* Merchant logo as the hero brand mark on every email type
            (recipients see their gift's brand; gifters see the brand of
            the program they're running). */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <MerchantLogo size={48} radius={10} />
        </div>

        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: BRAND_COLOR,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 10,
          }}
        >
          {content.eyebrow}
        </div>

        <div
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: '#111',
            letterSpacing: '-0.015em',
            marginBottom: 10,
          }}
        >
          {content.headline}
        </div>

        <div
          style={{
            fontSize: 13.5,
            color: '#4a4a52',
            lineHeight: 1.55,
            maxWidth: 320,
            margin: '0 auto 20px',
          }}
        >
          {content.body}
        </div>

        {content.variant === 'milestone' && <ProgressBar percent={25} />}
        {content.variant === 'wrap' && <WrapupStats claimed={42} expired={8} total={50} />}

        <div
          style={{
            display: 'flex',
            gap: 10,
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginTop: content.variant ? 24 : 0,
          }}
        >
          <button
            style={{
              all: 'unset',
              cursor: 'pointer',
              background: `linear-gradient(135deg, ${BRAND_COLOR}, ${brandLight})`,
              color: '#fff',
              padding: '12px 26px',
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 600,
              boxShadow: `0 6px 16px ${BRAND_COLOR}40`,
            }}
          >
            {content.primaryCta}
          </button>
          {content.secondaryCta && (
            <button
              style={{
                all: 'unset',
                cursor: 'pointer',
                background: '#fff',
                color: '#1a1a1f',
                padding: '11px 22px',
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 500,
                border: '1px solid #dcdcde',
              }}
            >
              {content.secondaryCta}
            </button>
          )}
        </div>

        <div style={{ marginTop: 18, fontSize: 11.5, color: '#8a8a93' }}>
          {content.footer}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          padding: '12px 16px',
          borderTop: '1px solid #ececef',
          fontSize: 11,
          color: '#8a8a93',
          textAlign: 'center',
        }}
      >
        Powered by <span style={{ fontWeight: 600, color: '#6b6b73' }}>Giftwell</span>
      </div>
    </div>
  );
}

function Sparkle({
  top,
  left,
  right,
  bottom,
  size,
}: {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  size: number;
}) {
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left,
        right,
        bottom,
        fontSize: size,
        opacity: 0.75,
        pointerEvents: 'none',
      }}
      aria-hidden
    >
      ✨
    </div>
  );
}

function ProgressBar({ percent }: { percent: number }) {
  return (
    <div style={{ maxWidth: 280, margin: '0 auto 4px' }}>
      <div
        style={{
          background: lighten(BRAND_COLOR, 0.85),
          height: 8,
          borderRadius: 999,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: '100%',
            background: `linear-gradient(90deg, ${BRAND_COLOR}, ${lighten(BRAND_COLOR, 0.25)})`,
            borderRadius: 999,
          }}
        />
      </div>
      <div
        style={{
          marginTop: 6,
          fontSize: 11,
          color: '#8a8a93',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>{percent}% claimed</span>
        <span>Next update at 50%</span>
      </div>
    </div>
  );
}

function WrapupStats({ claimed, expired, total }: { claimed: number; expired: number; total: number }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 16,
        justifyContent: 'center',
        margin: '4px 0',
      }}
    >
      <Stat label="Claimed" value={claimed.toString()} accent="#16A34A" />
      <Stat label="Expired" value={expired.toString()} accent="#8a8a93" />
      <Stat label="Total" value={total.toString()} accent="#111" />
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div style={{ textAlign: 'center', minWidth: 64 }}>
      <div style={{ fontSize: 22, fontWeight: 700, color: accent, letterSpacing: '-0.01em' }}>{value}</div>
      <div style={{ fontSize: 11, color: '#8a8a93', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
    </div>
  );
}

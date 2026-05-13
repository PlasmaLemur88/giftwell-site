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
  ColorPicker,
  TextField,
  hexToRgb,
  rgbToHsb,
  hsbToHex,
  type HSBAColor,
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
import { Toggle } from '../components/Toggle';

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

const DEFAULT_BRAND_COLOR = '#7C5CFF';
const MERCHANT_NAME = 'Acme';

const BRAND_SWATCHES: { id: string; value: string; label: string }[] = [
  { id: 'purple',  value: '#7C5CFF', label: 'Giftwell purple' },
  { id: 'blue',    value: '#2C6ECB', label: 'Blue' },
  { id: 'green',   value: '#16A34A', label: 'Green' },
  { id: 'red',     value: '#E04F4F', label: 'Red' },
  { id: 'orange',  value: '#F0883E', label: 'Orange' },
  { id: 'magenta', value: '#C026D3', label: 'Magenta' },
  { id: 'black',   value: '#1a1a1a', label: 'Black' },
];

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const v = hex.replace('#', '');
  const r = parseInt(v.slice(0, 2), 16) / 255;
  const g = parseInt(v.slice(2, 4), 16) / 255;
  const b = parseInt(v.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0));
    else if (max === g) h = ((b - r) / d + 2);
    else h = ((r - g) / d + 4);
    h /= 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h: number, s: number, l: number): string {
  const sNorm = Math.max(0, Math.min(100, s)) / 100;
  const lNorm = Math.max(0, Math.min(100, l)) / 100;
  const c = (1 - Math.abs(2 * lNorm - 1)) * sNorm;
  const hue = ((h % 360) + 360) % 360;
  const hp = hue / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r1 = 0;
  let g1 = 0;
  let b1 = 0;
  if (hp < 1)      { r1 = c; g1 = x; }
  else if (hp < 2) { r1 = x; g1 = c; }
  else if (hp < 3) { g1 = c; b1 = x; }
  else if (hp < 4) { g1 = x; b1 = c; }
  else if (hp < 5) { r1 = x; b1 = c; }
  else             { r1 = c; b1 = x; }
  const m = lNorm - c / 2;
  const toHex = (v: number) =>
    Math.round((v + m) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r1)}${toHex(g1)}${toHex(b1)}`;
}

/* Build a multi-stop, hue-rotated gradient that stays artful for any picked
   color. Two linear bands (deep -> base -> hue-shifted bright) layered under
   two radial highlights for an iridescent "spotlight" feel. */
function artfulGradient(hex: string): string {
  const { h, s, l } = hexToHsl(hex);
  const deep      = hslToHex(h - 12, s + 6, l - 10);
  const base      = hex;
  const shiftedLt = hslToHex(h + 34, Math.max(45, s - 8), Math.min(82, l + 22));
  const glowTop   = hslToHex(h + 52, Math.max(40, s - 18), Math.min(90, l + 32));
  const glowBot   = hslToHex(h - 28, Math.min(100, s + 4),  Math.max(20, l - 6));
  return [
    `radial-gradient(ellipse 70% 55% at 18% 12%, ${glowTop} 0%, transparent 55%)`,
    `radial-gradient(ellipse 60% 50% at 88% 95%, ${glowBot} 0%, transparent 60%)`,
    `linear-gradient(135deg, ${deep} 0%, ${base} 45%, ${shiftedLt} 100%)`,
  ].join(', ');
}

function MerchantLogo({
  size = 44,
  radius = 8,
  tone = 'dark',
  letterColor,
}: {
  size?: number;
  radius?: number;
  tone?: 'dark' | 'light';
  letterColor?: string;
}) {
  const isLight = tone === 'light';
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: isLight ? '#fff' : '#1a1a1f',
        color: isLight ? (letterColor ?? '#1a1a1f') : '#fff',
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

function GiftwellMark({ size = 40, tone = 'dark' }: { size?: number; tone?: 'dark' | 'light' }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={tone === 'light' ? '/g-white-bold.png' : '/g-black-bold.png'}
      alt="Giftwell"
      style={{ width: size, height: size, display: 'block' }}
    />
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
    fromName: 'Acme Store',
    fromEmail: 'gifts@acmestore.com',
    audience: 'recipient',
    eyebrow: 'A GIFT FROM ACME STORE',
    headline: 'You’ve received a gift!',
    body: <><strong>Sarah</strong> from Acme Corp wanted to send you something special. Tap below to unwrap your gift.</>,
    primaryCta: 'Unwrap Your Gift',
    footer: 'This gift expires in 30 days',
  },
  r2: {
    fromName: 'Acme Store',
    fromEmail: 'gifts@acmestore.com',
    audience: 'recipient',
    eyebrow: 'DON’T MISS OUT',
    headline: 'Your gift is waiting',
    body: <>Sarah sent you a gift 7 days ago. It expires in <strong>23 days</strong>. Take a moment to unwrap it.</>,
    primaryCta: 'Unwrap Your Gift',
    footer: 'Sent 7 days after the original gift',
  },
  r3: {
    fromName: 'Acme Store',
    fromEmail: 'gifts@acmestore.com',
    audience: 'recipient',
    eyebrow: 'ORDER CONFIRMED',
    headline: 'Your gift is on the way',
    body: <>We&apos;ve received your selection from Sarah’s gift. We’ll let you know as soon as it ships.</>,
    primaryCta: 'View Order',
    footer: 'Order #GW-1284 · Acme Store',
  },
  r4: {
    fromName: 'Acme Store',
    fromEmail: 'gifts@acmestore.com',
    audience: 'recipient',
    eyebrow: 'ON THE WAY',
    headline: 'Your gift just shipped',
    body: <>Your gift from Sarah is en route. Estimated arrival: <strong>Tuesday, May 14</strong>.</>,
    primaryCta: 'Track Package',
    footer: 'USPS · 9400 1234 5678 9012 3456',
  },
  r5: {
    fromName: 'Acme Store',
    fromEmail: 'gifts@acmestore.com',
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
  const [brandColor, setBrandColor] = useState(DEFAULT_BRAND_COLOR);
  const [colorModalOpen, setColorModalOpen] = useState(false);
  const previewRow =
    [...RECIPIENT_EMAILS, ...GIFTER_EMAILS].find((r) => r.id === previewId) ?? null;
  const presetMatch = BRAND_SWATCHES.find((s) => s.value.toLowerCase() === brandColor.toLowerCase());
  const colorLabel = presetMatch?.label ?? 'Custom';

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

        <Card padding="400">
          <InlineStack align="space-between" blockAlign="center" gap="400" wrap={false}>
            <BlockStack gap="050">
              <Text as="p" variant="bodyMd" fontWeight="semibold">Brand color</Text>
              <Text as="p" variant="bodySm" tone="subdued">
                Tints the hero background and accents on every email.
              </Text>
            </BlockStack>
            <InlineStack gap="300" blockAlign="center">
              <InlineStack gap="200" blockAlign="center">
                <span
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    background: brandColor,
                    border: '1px solid var(--p-color-border)',
                    display: 'inline-block',
                  }}
                  aria-hidden
                />
                <BlockStack gap="0">
                  <Text as="span" variant="bodySm" fontWeight="semibold">{colorLabel}</Text>
                  <Text as="span" variant="bodySm" tone="subdued">{brandColor.toUpperCase()}</Text>
                </BlockStack>
              </InlineStack>
              <Button onClick={() => setColorModalOpen(true)}>Change</Button>
            </InlineStack>
          </InlineStack>
        </Card>

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
              <EmailMockup content={EMAIL_CONTENT[previewRow.id]} brandColor={brandColor} />
            </BlockStack>
          </Modal.Section>
        )}
      </Modal>

      <BrandColorModal
        open={colorModalOpen}
        initial={brandColor}
        onClose={() => setColorModalOpen(false)}
        onSave={(c) => {
          setBrandColor(c);
          setColorModalOpen(false);
        }}
      />
    </>
  );
}

/* ─── Brand color modal (Polaris ColorPicker + hex + presets) ─── */

function hexToHsb(hex: string): HSBAColor {
  const clean = hex.startsWith('#') ? hex : `#${hex}`;
  const rgb = hexToRgb(clean);
  const hsb = rgbToHsb(rgb);
  return { ...hsb, alpha: 1 };
}

function BrandColorModal({
  open,
  initial,
  onClose,
  onSave,
}: {
  open: boolean;
  initial: string;
  onClose: () => void;
  onSave: (hex: string) => void;
}) {
  const [hsb, setHsb] = useState<HSBAColor>(() => hexToHsb(initial));
  const [hexInput, setHexInput] = useState(() => initial.replace('#', '').toUpperCase());
  const liveHex = hsbToHex(hsb).toUpperCase();

  // When the modal re-opens with a new initial, reset state
  const initialUpper = initial.replace('#', '').toUpperCase();
  if (open && initialUpper !== liveHex.replace('#', '') && hexInput !== initialUpper) {
    // no-op guard against false re-resets — keep state stable while user is editing
  }

  const handleHsb = (next: HSBAColor) => {
    setHsb(next);
    setHexInput(hsbToHex(next).replace('#', '').toUpperCase());
  };
  const handleHex = (raw: string) => {
    const cleaned = raw.replace('#', '').toUpperCase().slice(0, 6);
    setHexInput(cleaned);
    if (/^[0-9A-F]{6}$/.test(cleaned)) {
      setHsb(hexToHsb(cleaned));
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Brand color"
      primaryAction={{ content: 'Save', onAction: () => onSave(`#${hexInput}`) }}
      secondaryActions={[{ content: 'Cancel', onAction: onClose }]}
    >
      <Modal.Section>
        <InlineStack gap="500" wrap={false} align="start">
          <Box>
            <ColorPicker color={hsb} onChange={handleHsb} />
          </Box>
          <BlockStack gap="400">
            <BlockStack gap="100">
              <TextField
                label="Hex"
                value={hexInput}
                onChange={handleHex}
                autoComplete="off"
                prefix="#"
                maxLength={6}
              />
              <Text as="p" variant="bodySm" tone="subdued">
                Type any 6-character hex.
              </Text>
            </BlockStack>
            <BlockStack gap="200">
              <Text as="p" variant="bodySm" tone="subdued" fontWeight="semibold">Presets</Text>
              <InlineStack gap="200" wrap>
                {BRAND_SWATCHES.map((s) => {
                  const selected = `#${hexInput}`.toUpperCase() === s.value.toUpperCase();
                  return (
                    <button
                      key={s.id}
                      type="button"
                      aria-label={s.label}
                      title={s.label}
                      onClick={() => {
                        setHsb(hexToHsb(s.value));
                        setHexInput(s.value.replace('#', '').toUpperCase());
                      }}
                      style={{
                        all: 'unset',
                        cursor: 'pointer',
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: s.value,
                        outline: selected
                          ? '2px solid var(--p-color-border-emphasis)'
                          : '1px solid var(--p-color-border)',
                        outlineOffset: selected ? 2 : 0,
                        boxSizing: 'border-box',
                      }}
                    />
                  );
                })}
              </InlineStack>
            </BlockStack>
            <Box
              padding="300"
              borderRadius="200"
              borderWidth="025"
              borderColor="border"
            >
              <BlockStack gap="100">
                <Text as="p" variant="bodySm" tone="subdued" fontWeight="semibold">Preview</Text>
                <div
                  style={{
                    height: 40,
                    borderRadius: 8,
                    background: artfulGradient(liveHex),
                  }}
                />
              </BlockStack>
            </Box>
          </BlockStack>
        </InlineStack>
      </Modal.Section>
    </Modal>
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
  return <Toggle on={on} onToggle={() => setOn((v) => !v)} showLabel />;
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

function EmailMockup({ content, brandColor }: { content: EmailContent; brandColor: string }) {
  const isGifter = content.audience === 'gifter';
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

      {/* Hero — brand gradient background, light text on top */}
      <div
        style={{
          padding: '44px 28px 36px',
          background: artfulGradient(brandColor),
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          color: '#ffffff',
        }}
      >
        <Sparkle top={14} left={20} size={11} tone="light" />
        <Sparkle top={22} right={28} size={9} tone="light" />
        <Sparkle bottom={28} left={36} size={10} tone="light" />
        <Sparkle bottom={48} right={20} size={8} tone="light" />

        {/* Co-brand lockup: Giftwell × Merchant. Light variants on the brand bg. */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 14,
            marginBottom: 22,
          }}
        >
          <GiftwellMark size={42} tone="light" />
          <span
            style={{
              color: 'rgba(255, 255, 255, 0.65)',
              fontWeight: 200,
              fontSize: 26,
              lineHeight: 1,
              fontFamily: 'Georgia, "Times New Roman", serif',
            }}
            aria-hidden
          >
            ×
          </span>
          <MerchantLogo size={42} radius={9} tone="light" letterColor={brandColor} />
        </div>

        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: 'rgba(255, 255, 255, 0.85)',
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
            color: '#ffffff',
            letterSpacing: '-0.015em',
            marginBottom: 10,
          }}
        >
          {content.headline}
        </div>

        <div
          style={{
            fontSize: 13.5,
            color: 'rgba(255, 255, 255, 0.92)',
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
              background: '#ffffff',
              color: brandColor,
              padding: '12px 26px',
              borderRadius: 999,
              fontSize: 14,
              fontWeight: 600,
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.18)',
            }}
          >
            {content.primaryCta}
          </button>
          {content.secondaryCta && (
            <button
              style={{
                all: 'unset',
                cursor: 'pointer',
                background: 'transparent',
                color: '#ffffff',
                padding: '11px 22px',
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 500,
                border: '1px solid rgba(255, 255, 255, 0.55)',
              }}
            >
              {content.secondaryCta}
            </button>
          )}
        </div>

        <div style={{ marginTop: 18, fontSize: 11.5, color: 'rgba(255, 255, 255, 0.72)' }}>
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
  tone = 'dark',
}: {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
  size: number;
  tone?: 'dark' | 'light';
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
        opacity: tone === 'light' ? 0.7 : 0.75,
        filter: tone === 'light' ? 'brightness(0) invert(1)' : undefined,
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
          background: 'rgba(255, 255, 255, 0.25)',
          height: 8,
          borderRadius: 999,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: '100%',
            background: '#ffffff',
            borderRadius: 999,
          }}
        />
      </div>
      <div
        style={{
          marginTop: 6,
          fontSize: 11,
          color: 'rgba(255, 255, 255, 0.78)',
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
      <Stat label="Claimed" value={claimed.toString()} />
      <Stat label="Expired" value={expired.toString()} dim />
      <Stat label="Total" value={total.toString()} />
    </div>
  );
}

function Stat({ label, value, dim }: { label: string; value: string; dim?: boolean }) {
  return (
    <div style={{ textAlign: 'center', minWidth: 64 }}>
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: dim ? 'rgba(255, 255, 255, 0.7)' : '#ffffff',
          letterSpacing: '-0.01em',
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 11,
          color: 'rgba(255, 255, 255, 0.7)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {label}
      </div>
    </div>
  );
}

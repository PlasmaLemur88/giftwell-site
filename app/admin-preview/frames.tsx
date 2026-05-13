'use client';

import { ReactNode } from 'react';
import {
  BlockStack,
  InlineStack,
  Text,
  Box,
  Badge,
  Button,
  TextField,
  Checkbox,
  InlineGrid,
  Icon,
  Divider,
  Card,
} from '@shopify/polaris';
import {
  CheckIcon,
  CheckCircleIcon,
  LockIcon,
  DeleteIcon,
  PlusIcon,
} from '@shopify/polaris-icons';

export type FrameAnswers = {
  goals?: string[];
  buyerStatus?: string;
  volume?: string;
  cardOnFile?: boolean;
  productsSelected?: string[];
  feeHandling?: 'pass' | 'absorb' | 'split';
  enableVolumeDiscounts?: boolean;
};

type FrameProps = {
  answers: FrameAnswers;
  onChange: (patch: Partial<FrameAnswers>) => void;
};

export type FrameDef = {
  id: string;
  phase: string;
  title: string;
  helper?: string;
};

export const FRAMES: FrameDef[] = [
  // Welcome
  { id: 'goals',            phase: 'Welcome',      title: 'What are you hoping to achieve?' },
  { id: 'buyers',           phase: 'Welcome',      title: 'Do you have corporate buyers already?' },
  { id: 'volume',           phase: 'Welcome',      title: 'Expected monthly volume?' },
  // Pricing
  { id: 'pricing-fee',      phase: 'Pricing',      title: 'How should the experience fee be handled?' },
  { id: 'pricing-volume',   phase: 'Pricing',      title: 'Offer volume discounts?' },
  // Billing
  { id: 'payment-method',   phase: 'Billing',      title: 'Add a payment method' },
  // Catalog
  { id: 'catalog-products', phase: 'Catalog',      title: 'Pick gifts from your store' },
  // Landing page
  { id: 'landing-url',       phase: 'Landing Page', title: 'Pick your gift page URL' },
  // Review + Launch
  { id: 'review',   phase: 'Review',  title: 'Almost there — review your setup' },
  { id: 'launched', phase: 'Launch',  title: "You're live" },
];

/* ─── Tile picker ─── */

type Tile = { id: string; title: string; description?: string; badge?: string };

function TilePicker({
  mode,
  options,
  value,
  onChange,
  columns,
}: {
  mode: 'single' | 'multi';
  options: Tile[];
  value: string | string[] | undefined;
  onChange: (val: string | string[]) => void;
  columns?: number;
}) {
  const isSelected = (id: string) =>
    mode === 'multi' ? Array.isArray(value) && value.includes(id) : value === id;
  const toggle = (id: string) => {
    if (mode === 'multi') {
      const current = Array.isArray(value) ? value : [];
      const next = current.includes(id) ? current.filter((v) => v !== id) : [...current, id];
      onChange(next);
    } else {
      onChange(id);
    }
  };
  return (
    <InlineGrid gap="300" columns={columns ?? options.length}>
      {options.map((opt) => {
        const selected = isSelected(opt.id);
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => toggle(opt.id)}
            aria-pressed={selected}
            style={{ all: 'unset', cursor: 'pointer', display: 'block', height: '100%' }}
          >
            <Box
              padding="400"
              borderRadius="200"
              borderWidth="025"
              borderColor={selected ? 'border-emphasis' : 'border'}
              background={selected ? 'bg-surface-selected' : 'bg-surface'}
              minHeight="100%"
              position="relative"
            >
              <BlockStack gap="200">
                <BlockStack gap="050">
                  <Text as="p" variant="bodyMd" fontWeight="semibold">{opt.title}</Text>
                  {opt.description && (
                    <Text as="p" tone="subdued" variant="bodySm">{opt.description}</Text>
                  )}
                </BlockStack>
                {opt.badge && <Box><Badge tone="success">{opt.badge}</Badge></Box>}
              </BlockStack>
              {selected && (
                <Box position="absolute" insetBlockStart="200" insetInlineEnd="200">
                  <Icon source={CheckIcon} tone="emphasis" />
                </Box>
              )}
            </Box>
          </button>
        );
      })}
    </InlineGrid>
  );
}

/* ─── Plan mapping (volume → tier) ─── */

function planFromVolume(volume?: string): { name: string; price: number } {
  if (volume === 'lt50') return { name: 'Starter', price: 100 };
  if (volume === '500plus') return { name: 'Scale', price: 300 };
  return { name: 'Growth', price: 200 };
}

/* ─── Frames ─── */

function FrameGoals({ answers, onChange }: FrameProps) {
  return (
    <TilePicker
      mode="multi"
      value={answers.goals}
      onChange={(v) => onChange({ goals: v as string[] })}
      options={[
        { id: 'revenue',   title: 'Increase Revenue',   description: 'Drive high-value bulk orders from corporate buyers' },
        { id: 'customers', title: 'Acquire Customers',  description: 'Turn gift recipients into repeat customers' },
        { id: 'brand',     title: 'Brand Awareness',    description: 'Create memorable brand moments' },
      ]}
    />
  );
}

function FrameBuyers({ answers, onChange }: FrameProps) {
  return (
    <TilePicker
      mode="single"
      value={answers.buyerStatus}
      onChange={(v) => onChange({ buyerStatus: v as string })}
      options={[
        { id: 'waiting', title: 'Yes, waiting on me', description: 'Buyers ready to order once I set this up' },
        { id: 'some',    title: 'Some interest',       description: 'Had inquiries but no formal process' },
        { id: 'none',    title: 'Not yet',              description: 'Looking to capture this opportunity' },
      ]}
    />
  );
}

function FrameVolume({ answers, onChange }: FrameProps) {
  return (
    <TilePicker
      mode="single"
      columns={4}
      value={answers.volume}
      onChange={(v) => onChange({ volume: v as string })}
      options={[
        { id: 'lt50',    title: '< 50 gifts',     description: 'Starter · $100/mo' },
        { id: '50-200',  title: '50–200 gifts',   description: 'Growth · $200/mo', badge: 'Most common' },
        { id: '200-500', title: '200–500 gifts',  description: 'Growth · $200/mo' },
        { id: '500plus', title: '500+ gifts',     description: 'Scale · $300/mo' },
      ]}
    />
  );
}

function FramePricingFee({ answers, onChange }: FrameProps) {
  const handling = answers.feeHandling ?? 'pass';
  return (
    <TilePicker
      mode="single"
      columns={3}
      value={handling}
      onChange={(v) => onChange({ feeHandling: v as 'pass' | 'absorb' | 'split' })}
      options={[
        { id: 'pass',   title: 'Pass to Gifter',   description: '10% added at checkout', badge: 'Recommended' },
        { id: 'absorb', title: 'Absorb in Margin', description: '10% from your revenue' },
        { id: 'split',  title: 'Split 50/50',      description: '5% gifter, 5% margin' },
      ]}
    />
  );
}

function FramePricingVolume({ answers, onChange }: FrameProps) {
  const tiers = [
    { gifts: 25, off: 5 },
    { gifts: 50, off: 10 },
    { gifts: 100, off: 15 },
  ];
  const enabled = answers.enableVolumeDiscounts ?? true;
  return (
    <BlockStack gap="300">
      <Checkbox
        label="Enable volume discounts"
        checked={enabled}
        onChange={(v) => onChange({ enableVolumeDiscounts: v })}
      />
      {enabled && (
        <BlockStack gap="200">
          {tiers.map((row) => (
            <InlineStack key={row.gifts} gap="200" blockAlign="center" wrap={false}>
              <Box minWidth="84px">
                <TextField label="" labelHidden type="number" value={row.gifts.toString()} autoComplete="off" onChange={() => {}} />
              </Box>
              <Text as="span" tone="subdued" variant="bodySm">+ gifts =</Text>
              <Box minWidth="84px">
                <TextField label="" labelHidden type="number" value={row.off.toString()} suffix="%" autoComplete="off" onChange={() => {}} />
              </Box>
              <Button variant="plain" icon={DeleteIcon} accessibilityLabel="Remove tier" />
            </InlineStack>
          ))}
          <InlineStack>
            <Button variant="plain" icon={PlusIcon}>Add tier</Button>
          </InlineStack>
        </BlockStack>
      )}
    </BlockStack>
  );
}

function FramePaymentMethod({ answers }: FrameProps) {
  const plan = planFromVolume(answers.volume);
  const handling = answers.feeHandling ?? 'pass';
  const feeLine =
    handling === 'pass'   ? '10% experience fee added at gifter’s checkout'
  : handling === 'absorb' ? '10% experience fee deducted from your revenue'
  :                          '5% added at checkout, 5% from your margin';

  return (
    <BlockStack gap="300">
      <Box padding="300" borderRadius="200" background="bg-surface-secondary">
        <BlockStack gap="100">
          <InlineStack align="space-between" blockAlign="center">
            <InlineStack gap="200" blockAlign="center">
              <Text as="span" variant="bodySm" fontWeight="semibold">{plan.name} plan</Text>
              <Badge tone="success">30-day free trial</Badge>
            </InlineStack>
            <Text as="span" variant="bodySm">${plan.price}/mo after trial</Text>
          </InlineStack>
          <Text as="span" variant="bodySm" tone="subdued">
            {feeLine}. Charged only when gifts send.
          </Text>
        </BlockStack>
      </Box>
      <StripeCardField />
      <InlineStack gap="100" blockAlign="center">
        <Icon source={LockIcon} tone="subdued" />
        <Text as="span" variant="bodySm" tone="subdued">
          Encrypted by Stripe. No charge for 30 days.
        </Text>
      </InlineStack>
    </BlockStack>
  );
}

/* ─── Compound card field (visual mock of Stripe Elements) ─── */

function StripeCardField() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'stretch',
        border: '1px solid var(--p-color-border)',
        borderRadius: 8,
        background: '#fff',
        overflow: 'hidden',
        height: 40,
      }}
    >
      <input
        type="text"
        inputMode="numeric"
        placeholder="Card number"
        defaultValue=""
        style={{
          flex: 1,
          minWidth: 0,
          border: 0,
          outline: 0,
          padding: '0 12px',
          fontSize: 14,
          background: 'transparent',
          fontFamily: 'inherit',
        }}
      />
      <div style={{ width: 1, background: 'var(--p-color-border)' }} />
      <input
        type="text"
        inputMode="numeric"
        placeholder="MM / YY"
        defaultValue=""
        style={{
          width: 84,
          border: 0,
          outline: 0,
          padding: '0 12px',
          fontSize: 14,
          background: 'transparent',
          fontFamily: 'inherit',
        }}
      />
      <div style={{ width: 1, background: 'var(--p-color-border)' }} />
      <input
        type="text"
        inputMode="numeric"
        placeholder="CVC"
        defaultValue=""
        style={{
          width: 64,
          border: 0,
          outline: 0,
          padding: '0 12px',
          fontSize: 14,
          background: 'transparent',
          fontFamily: 'inherit',
        }}
      />
    </div>
  );
}

function FrameCatalogProducts(_: FrameProps) {
  const products = [
    { id: '1', name: 'Candle',     price: '$34', sel: true, bg: 'linear-gradient(135deg, #F4ECD8, #E8D8B8)' },
    { id: '2', name: 'Bath Salts', price: '$28', sel: true, bg: 'linear-gradient(135deg, #DCDCFF, #B8B8E8)' },
    { id: '3', name: 'Tea Set',    price: '$32', sel: true, bg: 'linear-gradient(135deg, #A8E5C5, #6FCBA0)' },
    { id: '4', name: 'Gloves',     price: '$65', sel: true, bg: 'linear-gradient(135deg, #2a2a2a, #4a4a4a)' },
    { id: '5', name: 'Journal',    price: '$45', sel: true, bg: 'linear-gradient(135deg, #8B4513, #654321)' },
    { id: '6', name: 'Mug',        price: '$24', sel: true, bg: 'linear-gradient(135deg, #FFC9D5, #F58CA8)' },
  ];
  const totalCount = 84;
  return (
    <BlockStack gap="200">
      <InlineStack align="space-between" blockAlign="center" gap="200" wrap={false}>
        <Box minWidth="200px">
          <TextField label="" labelHidden placeholder="Search catalog…" autoComplete="off" onChange={() => {}} />
        </Box>
        <Text as="span" variant="bodySm" tone="subdued">
          {totalCount} of {totalCount} giftable
        </Text>
      </InlineStack>
      <InlineGrid gap="200" columns={6}>
        {products.map((p) => (
          <Box
            key={p.id}
            padding="150"
            borderRadius="200"
            borderWidth="025"
            borderColor={p.sel ? 'border-emphasis' : 'border'}
            background={p.sel ? 'bg-surface-selected' : 'bg-surface'}
            position="relative"
          >
            <BlockStack gap="100">
              <div style={{ width: '100%', aspectRatio: '1 / 1', borderRadius: 6, background: p.bg }} />
              <Text as="p" variant="bodySm" fontWeight="semibold" truncate>{p.name}</Text>
              <Text as="p" tone="subdued" variant="bodySm">{p.price}</Text>
            </BlockStack>
            {p.sel && (
              <Box position="absolute" insetBlockStart="050" insetInlineEnd="050">
                <Icon source={CheckIcon} tone="emphasis" />
              </Box>
            )}
          </Box>
        ))}
      </InlineGrid>
      <Text as="p" variant="bodySm" tone="subdued">
        Showing 6 — manage the full list in Products admin after launch.
      </Text>
    </BlockStack>
  );
}

function FrameLandingUrl(_: FrameProps) {
  return (
    <BlockStack gap="200">
      <InlineStack gap="200" blockAlign="center" wrap={false}>
        <Text as="span" tone="subdued">acmestore.com/</Text>
        <Box minWidth="200px">
          <TextField label="" labelHidden value="gift" autoComplete="off" onChange={() => {}} />
        </Box>
      </InlineStack>
      <Text as="p" tone="subdued" variant="bodySm">
        Buyers will land here to start an order. Copy this URL into your nav, footer, or
        marketing wherever you want it.
      </Text>
    </BlockStack>
  );
}

function FrameReview({ answers }: FrameProps) {
  const plan = planFromVolume(answers.volume);
  const handling = answers.feeHandling ?? 'pass';
  const feeText =
    handling === 'pass'   ? '10% passed to gifter'
  : handling === 'absorb' ? '10% from your revenue'
  :                          '5% gifter, 5% margin';
  const items = [
    { title: 'Plan',             value: `${plan.name} · $${plan.price}/mo (30-day trial)` },
    { title: 'Payment method',   value: 'Visa •••• 4242' },
    { title: 'Experience fee',   value: feeText },
    { title: 'Volume discounts', value: '3 tiers (5/10/15%)' },
    { title: 'Products',         value: '12 of 12 selected' },
    { title: 'Landing page',     value: 'acmestore.com/gift' },
  ];
  return (
    <Card padding="0">
      {items.map((item, i) => (
        <div key={item.title}>
          {i > 0 && <Divider />}
          <Box paddingInline="300" paddingBlock="150">
            <InlineStack align="space-between" blockAlign="center" gap="200" wrap={false}>
              <InlineStack gap="200" blockAlign="center" wrap={false}>
                <Icon source={CheckCircleIcon} tone="success" />
                <Text as="span" variant="bodySm" fontWeight="semibold">{item.title}</Text>
                <Text as="span" variant="bodySm" tone="subdued">·</Text>
                <Text as="span" variant="bodySm" tone="subdued" truncate>{item.value}</Text>
              </InlineStack>
              <Button variant="plain" size="micro">Edit</Button>
            </InlineStack>
          </Box>
        </div>
      ))}
    </Card>
  );
}

function FrameLaunched(_: FrameProps) {
  return (
    <BlockStack gap="200" inlineAlign="center">
      <Box
        background="bg-surface-success"
        borderRadius="full"
        minWidth="36px"
        minHeight="36px"
        padding="200"
      >
        <Icon source={CheckIcon} tone="success" />
      </Box>
      <Text as="p" tone="subdued" variant="bodySm" alignment="center">
        Your gift page is ready.
      </Text>
      <Box
        padding="200"
        borderRadius="200"
        borderWidth="025"
        borderColor="border"
        background="bg-surface-secondary"
      >
        <InlineStack gap="200" blockAlign="center">
          <Text as="span" variant="bodyMd" fontWeight="medium">acmestore.com/gift</Text>
          <Button variant="plain" size="micro">Copy</Button>
        </InlineStack>
      </Box>
      <Text as="p" variant="bodySm" tone="subdued" alignment="center">
        Update Pricing, Products, Design, or Landing page anytime from the sidebar.
      </Text>
    </BlockStack>
  );
}

export const Frames: Record<string, (p: FrameProps) => ReactNode> = {
  goals: FrameGoals,
  buyers: FrameBuyers,
  volume: FrameVolume,
  'pricing-fee': FramePricingFee,
  'pricing-volume': FramePricingVolume,
  'payment-method': FramePaymentMethod,
  'catalog-products': FrameCatalogProducts,
  'landing-url': FrameLandingUrl,
  review: FrameReview,
  launched: FrameLaunched,
};

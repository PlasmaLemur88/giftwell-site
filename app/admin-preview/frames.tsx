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
  catalogApproach?: string;
  productsSelected?: string[];
  feeHandling?: 'pass' | 'absorb' | 'split';
  enableVolumeDiscounts?: boolean;
  enableConcierge?: boolean;
  addToNav?: boolean;
  addToFooter?: boolean;
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
  { id: 'goals',            phase: 'Welcome',      title: 'What are you hoping to achieve?', helper: 'Select all that apply.' },
  { id: 'buyers',           phase: 'Welcome',      title: 'Do you have corporate buyers already?' },
  { id: 'volume',           phase: 'Welcome',      title: 'Expected monthly volume?' },
  // Pricing
  { id: 'pricing-fee',      phase: 'Pricing',      title: 'How should the experience fee be handled?' },
  { id: 'pricing-volume',   phase: 'Pricing',      title: 'Offer volume discounts?' },
  // Billing (after pricing decisions)
  { id: 'payment-method',   phase: 'Billing',      title: 'Add a payment method', helper: 'We only charge when gifts send — never up front.' },
  // Catalog
  { id: 'catalog-approach', phase: 'Catalog',      title: 'How do you want gifters to choose products?' },
  { id: 'catalog-products', phase: 'Catalog',      title: 'Pick gifts from your store', helper: 'Select the products gifters can include in a gift.' },
  // Landing page
  { id: 'landing-url',       phase: 'Landing Page', title: 'Pick your gift page URL' },
  { id: 'landing-placement', phase: 'Landing Page', title: 'Where should we link to it?' },
  // Support
  { id: 'support',  phase: 'Support', title: 'Want Giftwell to handle support?' },
  // Review + Launch
  { id: 'review',   phase: 'Review',  title: 'Almost there — review your setup' },
  { id: 'launched', phase: 'Launch',  title: "You're live" },
];

/* ─── Tile picker (composed from Polaris primitives) ─── */

type Tile = {
  id: string;
  title: string;
  description?: string;
  badge?: string;
};

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
                  <Text as="p" variant="bodyMd" fontWeight="semibold">
                    {opt.title}
                  </Text>
                  {opt.description && (
                    <Text as="p" tone="subdued" variant="bodySm">
                      {opt.description}
                    </Text>
                  )}
                </BlockStack>
                {opt.badge && (
                  <Box>
                    <Badge tone="success">{opt.badge}</Badge>
                  </Box>
                )}
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

/* ─── Frames (one question each) ─── */

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
        { id: 'lt50',    title: '< 50 gifts',     description: 'Just getting started' },
        { id: '50-200',  title: '50–200 gifts',   description: 'Growing demand', badge: 'Most common' },
        { id: '200-500', title: '200–500 gifts',  description: 'Established program' },
        { id: '500plus', title: '500+ gifts',     description: 'Enterprise scale' },
      ]}
    />
  );
}

function FramePaymentMethod({ answers }: FrameProps) {
  const handling = answers.feeHandling ?? 'pass';
  const volumeOn = answers.enableVolumeDiscounts ?? true;
  const feeLine =
    handling === 'pass'   ? '10% experience fee added at gifter’s checkout'
  : handling === 'absorb' ? '10% experience fee deducted from your revenue'
  :                          '5% added at checkout, 5% from your margin';
  const summary = `${feeLine}${volumeOn ? ', with volume discounts active' : ''}.`;

  return (
    <BlockStack gap="500">
      <Card padding="400">
        <BlockStack gap="200">
          <Text as="p" variant="bodyMd" fontWeight="semibold">Based on your choices</Text>
          <Text as="p" variant="bodySm" tone="subdued">{summary}</Text>
          <Text as="p" variant="bodySm" tone="subdued">
            Your card is only charged when gifts go out — never up front. Product costs are
            still billed through your Shopify checkout.
          </Text>
        </BlockStack>
      </Card>

      <BlockStack gap="300">
        <TextField
          label="Cardholder name"
          value="Brandon Sims"
          autoComplete="cc-name"
          onChange={() => {}}
        />
        <TextField
          label="Card number"
          placeholder="•••• •••• •••• ••••"
          autoComplete="cc-number"
          onChange={() => {}}
        />
        <InlineGrid gap="300" columns={2}>
          <TextField
            label="Expires"
            placeholder="MM / YY"
            autoComplete="cc-exp"
            onChange={() => {}}
          />
          <TextField
            label="CVC"
            placeholder="•••"
            autoComplete="cc-csc"
            onChange={() => {}}
          />
        </InlineGrid>
        <InlineStack gap="100" blockAlign="center">
          <Icon source={LockIcon} tone="subdued" />
          <Text as="span" variant="bodySm" tone="subdued">
            Card details are encrypted and stored by Stripe. We never see your card number.
          </Text>
        </InlineStack>
      </BlockStack>
    </BlockStack>
  );
}

function FramePricingFee({ answers, onChange }: FrameProps) {
  const handling = answers.feeHandling ?? 'pass';
  const subtotal = 4005.00;
  const fee = 400.50;
  let revenue = subtotal;
  let note = '';
  if (handling === 'pass') {
    revenue = subtotal;
    note = 'Fee is added at the gifter’s checkout. Your margin stays whole.';
  } else if (handling === 'absorb') {
    revenue = subtotal - fee;
    note = 'Fee is deducted from your revenue.';
  } else {
    revenue = subtotal - fee / 2;
    note = '5% added at checkout, 5% deducted from your revenue.';
  }

  return (
    <BlockStack gap="400">
      <TilePicker
        mode="single"
        columns={3}
        value={handling}
        onChange={(v) => onChange({ feeHandling: v as 'pass' | 'absorb' | 'split' })}
        options={[
          { id: 'pass',   title: 'Pass to Gifter',   description: '10% added at checkout. Margin stays intact.', badge: 'Recommended for DTC' },
          { id: 'absorb', title: 'Absorb in Margin', description: 'Cleaner pricing for buyers. 10% deducted from revenue.' },
          { id: 'split',  title: 'Split 50/50',      description: '5% added at checkout, 5% from margin.' },
        ]}
      />
      <Card padding="400">
        <BlockStack gap="300">
          <Text as="p" variant="bodySm" tone="subdued" fontWeight="semibold">
            EXAMPLE · 50-GIFT CAMPAIGN
          </Text>
          <BlockStack gap="150">
            <CalcRow label="Bundle revenue (50 × $89)" value="$4,450.00" />
            <CalcRow label="Volume discount (10%)" value="−$445.00" />
            <CalcRow label="Experience fee (10%)" value={`−$${fee.toFixed(2)}`} />
          </BlockStack>
          <Divider />
          <InlineStack align="space-between" blockAlign="center">
            <BlockStack gap="050">
              <Text as="span" variant="bodyMd" fontWeight="semibold">Your net revenue</Text>
              <Text as="span" variant="bodySm" tone="subdued">{note}</Text>
            </BlockStack>
            <Text as="span" variant="headingLg">${revenue.toFixed(2)}</Text>
          </InlineStack>
        </BlockStack>
      </Card>
    </BlockStack>
  );
}

function CalcRow({ label, value }: { label: string; value: string }) {
  return (
    <InlineStack align="space-between">
      <Text as="span" tone="subdued" variant="bodySm">{label}</Text>
      <Text as="span" variant="bodySm">{value}</Text>
    </InlineStack>
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
    <BlockStack gap="400">
      <Checkbox
        label="Enable volume discounts"
        helpText="Automatically apply discounts based on order size."
        checked={enabled}
        onChange={(v) => onChange({ enableVolumeDiscounts: v })}
      />
      {enabled && (
        <Card padding="0">
          <Box
            paddingInline="400"
            paddingBlock="300"
            background="bg-surface-secondary"
            borderColor="border"
            borderBlockEndWidth="025"
          >
            <InlineStack align="space-between" gap="400">
              <Text as="span" variant="bodySm" fontWeight="semibold" tone="subdued">
                When the order is at least
              </Text>
              <Text as="span" variant="bodySm" fontWeight="semibold" tone="subdued">
                Discount
              </Text>
            </InlineStack>
          </Box>
          {tiers.map((row, i) => (
            <div key={row.gifts}>
              {i > 0 && <Divider />}
              <Box paddingInline="400" paddingBlock="300">
                <InlineStack align="space-between" blockAlign="center" gap="200" wrap={false}>
                  <InlineStack gap="200" blockAlign="center">
                    <Box minWidth="90px">
                      <TextField
                        label=""
                        labelHidden
                        type="number"
                        value={row.gifts.toString()}
                        autoComplete="off"
                        onChange={() => {}}
                      />
                    </Box>
                    <Text as="span" tone="subdued" variant="bodySm">gifts</Text>
                  </InlineStack>
                  <InlineStack gap="200" blockAlign="center">
                    <Box minWidth="90px">
                      <TextField
                        label=""
                        labelHidden
                        type="number"
                        value={row.off.toString()}
                        suffix="%"
                        autoComplete="off"
                        onChange={() => {}}
                      />
                    </Box>
                    <Button
                      variant="plain"
                      icon={DeleteIcon}
                      accessibilityLabel="Remove tier"
                    />
                  </InlineStack>
                </InlineStack>
              </Box>
            </div>
          ))}
          <Divider />
          <Box paddingInline="400" paddingBlock="300">
            <Button variant="plain" icon={PlusIcon}>Add tier</Button>
          </Box>
        </Card>
      )}
    </BlockStack>
  );
}

function FrameCatalogApproach({ answers, onChange }: FrameProps) {
  return (
    <TilePicker
      mode="single"
      value={answers.catalogApproach}
      onChange={(v) => onChange({ catalogApproach: v as string })}
      options={[
        { id: 'full',    title: 'Full Catalog',     description: 'Make all 847 products available for gifting' },
        { id: 'curated', title: 'Curated Selection', description: 'Hand-pick which products gifters can choose', badge: 'Recommended' },
        { id: 'both',    title: 'Both',              description: 'Featured picks + browse full catalog' },
      ]}
    />
  );
}

function FrameCatalogProducts(_: FrameProps) {
  const products = [
    { id: '1',  name: 'Signature Candle',  price: '$34.00', sel: true,  bg: 'linear-gradient(135deg, #F4ECD8, #E8D8B8)' },
    { id: '2',  name: 'Bath Salts',        price: '$28.00', sel: true,  bg: 'linear-gradient(135deg, #DCDCFF, #B8B8E8)' },
    { id: '3',  name: 'Artisan Tea Set',   price: '$32.00', sel: true,  bg: 'linear-gradient(135deg, #A8E5C5, #6FCBA0)' },
    { id: '4',  name: 'Cashmere Gloves',   price: '$65.00', sel: false, bg: 'linear-gradient(135deg, #2a2a2a, #4a4a4a)' },
    { id: '5',  name: 'Leather Journal',   price: '$45.00', sel: false, bg: 'linear-gradient(135deg, #8B4513, #654321)' },
    { id: '6',  name: 'Ceramic Mug',       price: '$24.00', sel: false, bg: 'linear-gradient(135deg, #FFC9D5, #F58CA8)' },
    { id: '7',  name: 'Chocolate Box',     price: '$38.00', sel: false, bg: 'linear-gradient(135deg, #5D4037, #3E2723)' },
    { id: '8',  name: 'Wool Scarf',        price: '$55.00', sel: false, bg: 'linear-gradient(135deg, #B0BEC5, #78909C)' },
    { id: '9',  name: 'Hand Cream',        price: '$22.00', sel: true,  bg: 'linear-gradient(135deg, #FFE9A0, #FFD060)' },
    { id: '10', name: 'Wine Tumbler',      price: '$48.00', sel: false, bg: 'linear-gradient(135deg, #1F3A5F, #0F1A2E)' },
    { id: '11', name: 'Cookie Tin',        price: '$36.00', sel: true,  bg: 'linear-gradient(135deg, #E8B4B8, #D08A8E)' },
    { id: '12', name: 'Espresso Beans',    price: '$30.00', sel: false, bg: 'linear-gradient(135deg, #3E2723, #1B0A06)' },
  ];
  const selectedCount = products.filter((p) => p.sel).length;
  const allSelected = selectedCount === products.length;

  return (
    <BlockStack gap="300">
      <InlineStack align="space-between" blockAlign="center" gap="400" wrap={false}>
        <Box minWidth="280px">
          <TextField
            label=""
            labelHidden
            placeholder="Search your catalog…"
            autoComplete="off"
            onChange={() => {}}
          />
        </Box>
        <InlineStack gap="300" blockAlign="center">
          <Text as="span" variant="bodySm" tone="subdued">
            {selectedCount} of {products.length} selected
          </Text>
          <Button variant="plain">{allSelected ? 'Deselect all' : 'Select all'}</Button>
        </InlineStack>
      </InlineStack>

      <div
        style={{
          display: 'flex',
          gap: 12,
          overflowX: 'auto',
          paddingBottom: 8,
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              flexShrink: 0,
              width: 148,
              scrollSnapAlign: 'start',
            }}
          >
            <Box
              padding="200"
              borderRadius="200"
              borderWidth="025"
              borderColor={p.sel ? 'border-emphasis' : 'border'}
              background={p.sel ? 'bg-surface-selected' : 'bg-surface'}
              position="relative"
            >
              <BlockStack gap="200">
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '1 / 1',
                    borderRadius: 6,
                    background: p.bg,
                  }}
                />
                <BlockStack gap="050">
                  <Text as="p" variant="bodySm" fontWeight="semibold" truncate>
                    {p.name}
                  </Text>
                  <Text as="p" tone="subdued" variant="bodySm">
                    {p.price}
                  </Text>
                </BlockStack>
              </BlockStack>
              {p.sel && (
                <Box position="absolute" insetBlockStart="200" insetInlineEnd="200">
                  <Icon source={CheckIcon} tone="emphasis" />
                </Box>
              )}
            </Box>
          </div>
        ))}
      </div>
    </BlockStack>
  );
}

function FrameLandingUrl(_: FrameProps) {
  return (
    <BlockStack gap="200">
      <InlineStack gap="200" blockAlign="center" wrap={false}>
        <Text as="span" tone="subdued">acmestore.com/</Text>
        <Box minWidth="200px">
          <TextField
            label=""
            labelHidden
            value="gift"
            autoComplete="off"
            onChange={() => {}}
          />
        </Box>
      </InlineStack>
      <Text as="p" tone="subdued" variant="bodySm">
        This is where corporate buyers will land to start an order.
      </Text>
    </BlockStack>
  );
}

function FrameLandingPlacement({ answers, onChange }: FrameProps) {
  return (
    <BlockStack gap="400">
      <Checkbox
        label="Add to main navigation"
        helpText='Adds a "Corporate Gifting" link to your storefront nav'
        checked={answers.addToNav ?? false}
        onChange={(v) => onChange({ addToNav: v })}
      />
      <Checkbox
        label="Add to footer"
        helpText="Adds a link in the footer next to About, Contact, etc."
        checked={answers.addToFooter ?? false}
        onChange={(v) => onChange({ addToFooter: v })}
      />
    </BlockStack>
  );
}

function FrameSupport({ answers, onChange }: FrameProps) {
  return (
    <Checkbox
      label="Enable Giftwell concierge"
      helpText="We handle support for gifters and recipients on your behalf. Included in your plan."
      checked={answers.enableConcierge ?? false}
      onChange={(v) => onChange({ enableConcierge: v })}
    />
  );
}

function FrameReview(_: FrameProps) {
  const items = [
    { title: 'Payment method',     desc: 'Visa •••• 4242 — charged only when gifts send' },
    { title: 'Experience fee',     desc: '10% passed to gifter at checkout' },
    { title: 'Volume discounts',   desc: '3 tiers — 5% at 25, 10% at 50, 15% at 100' },
    { title: 'Products',           desc: '5 of 12 selected from your catalog' },
    { title: 'Landing page',       desc: 'acmestore.com/gift — added to nav & footer' },
    { title: 'Support',            desc: 'Giftwell concierge enabled' },
  ];
  return (
    <BlockStack gap="400">
      <Card padding="0">
        {items.map((item, i) => (
          <div key={item.title}>
            {i > 0 && <Divider />}
            <Box paddingInline="400" paddingBlock="300">
              <InlineStack align="space-between" blockAlign="center" gap="400" wrap={false}>
                <InlineStack gap="300" blockAlign="center" wrap={false}>
                  <Icon source={CheckCircleIcon} tone="success" />
                  <BlockStack gap="050">
                    <Text as="p" variant="bodyMd" fontWeight="semibold">{item.title}</Text>
                    <Text as="p" variant="bodySm" tone="subdued">{item.desc}</Text>
                  </BlockStack>
                </InlineStack>
                <Button variant="plain">Edit</Button>
              </InlineStack>
            </Box>
          </div>
        ))}
      </Card>
      <InlineStack gap="200">
        <Button>Preview gift page</Button>
        <Button>Send test gift</Button>
        <Button>Preview recipient email</Button>
      </InlineStack>
    </BlockStack>
  );
}

function FrameLaunched(_: FrameProps) {
  return (
    <BlockStack gap="400" inlineAlign="center">
      <Box
        background="bg-surface-success"
        borderRadius="full"
        minWidth="56px"
        minHeight="56px"
        padding="400"
      >
        <Icon source={CheckIcon} tone="success" />
      </Box>
      <Text as="p" tone="subdued" alignment="center">
        Your corporate gifting page is ready to receive orders.
      </Text>
      <Box
        padding="300"
        borderRadius="200"
        borderWidth="025"
        borderColor="border"
        background="bg-surface-secondary"
      >
        <InlineStack gap="200" blockAlign="center">
          <Text as="span" variant="bodyMd" fontWeight="medium">acmestore.com/gift</Text>
          <Button variant="plain">Copy</Button>
        </InlineStack>
      </Box>
      <InlineStack gap="200">
        <Button variant="primary">Open Gift Page</Button>
        <Button>Go to Dashboard</Button>
      </InlineStack>
    </BlockStack>
  );
}

export const Frames: Record<string, (p: FrameProps) => ReactNode> = {
  goals: FrameGoals,
  buyers: FrameBuyers,
  volume: FrameVolume,
  'payment-method': FramePaymentMethod,
  'pricing-fee': FramePricingFee,
  'pricing-volume': FramePricingVolume,
  'catalog-approach': FrameCatalogApproach,
  'catalog-products': FrameCatalogProducts,
  'landing-url': FrameLandingUrl,
  'landing-placement': FrameLandingPlacement,
  support: FrameSupport,
  review: FrameReview,
  launched: FrameLaunched,
};

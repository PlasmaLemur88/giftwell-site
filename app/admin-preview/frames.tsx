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
} from '@shopify/polaris';
import { CheckIcon } from '@shopify/polaris-icons';

export type FrameAnswers = {
  goals?: string[];
  buyerStatus?: string;
  volume?: string;
  catalogApproach?: string;
  feeHandling?: string;
  feeSplit?: boolean;
  optInPlacements?: string[];
  enableMarketingOptIn?: boolean;
  preCheckOptIn?: boolean;
  enableDoubleOptIn?: boolean;
  addToKlaviyo?: boolean;
  applyTags?: boolean;
  triggerWelcome?: boolean;
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
  { id: 'goals',           phase: 'Welcome',      title: 'What are you hoping to achieve?', helper: 'Select all that apply.' },
  { id: 'buyers',          phase: 'Welcome',      title: 'Do you have corporate buyers already?' },
  { id: 'volume',          phase: 'Welcome',      title: 'Expected monthly volume?' },
  // Catalog
  { id: 'catalog-approach', phase: 'Catalog',     title: 'How do you want gifters to choose products?' },
  { id: 'catalog-bundle',   phase: 'Catalog',     title: 'Pick products for your first bundle', helper: 'You can edit or add more bundles later.' },
  // Pricing
  { id: 'pricing-fee',     phase: 'Pricing',      title: 'How should the experience fee be handled?' },
  { id: 'pricing-volume',  phase: 'Pricing',      title: 'Offer volume discounts?' },
  // Integrations
  { id: 'integrations',    phase: 'Integrations', title: 'Connect your email marketing tool' },
  // Marketing opt-in
  { id: 'optin-enable',     phase: 'Marketing',   title: 'Show a marketing opt-in?', helper: 'Recipients can join your list when they claim their gift.' },
  { id: 'optin-placement',  phase: 'Marketing',   title: 'Where should the opt-in show?' },
  { id: 'optin-copy',       phase: 'Marketing',   title: 'What should the checkbox say?' },
  { id: 'optin-compliance', phase: 'Marketing',   title: 'Compliance settings' },
  { id: 'optin-actions',    phase: 'Marketing',   title: 'What happens when someone opts in?' },
  // Landing page
  { id: 'landing-url',       phase: 'Landing Page', title: 'Pick your gift page URL' },
  { id: 'landing-placement', phase: 'Landing Page', title: 'Where should we link to it?' },
  // Support
  { id: 'support',  phase: 'Support', title: 'Want Giftwell to handle support?' },
  // Review
  { id: 'review',   phase: 'Review',  title: 'Almost there — review your setup' },
  // Launch
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
        { id: 'revenue', title: 'Increase Revenue', description: 'Drive high-value bulk orders from corporate buyers' },
        { id: 'customers', title: 'Acquire Customers', description: 'Turn gift recipients into repeat customers' },
        { id: 'brand', title: 'Brand Awareness', description: 'Create memorable brand moments' },
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
        { id: 'some', title: 'Some interest', description: 'Had inquiries but no formal process' },
        { id: 'none', title: 'Not yet', description: 'Looking to capture this opportunity' },
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
        { id: 'lt50', title: '< 50 gifts', description: 'Just getting started' },
        { id: '50-200', title: '50–200 gifts', description: 'Growing demand', badge: 'Most common' },
        { id: '200-500', title: '200–500 gifts', description: 'Established program' },
        { id: '500plus', title: '500+ gifts', description: 'Enterprise scale' },
      ]}
    />
  );
}

function FrameCatalogApproach({ answers, onChange }: FrameProps) {
  return (
    <TilePicker
      mode="single"
      value={answers.catalogApproach}
      onChange={(v) => onChange({ catalogApproach: v as string })}
      options={[
        { id: 'full', title: 'Full Catalog', description: 'Make all 847 products available for gifting' },
        { id: 'curated', title: 'Curated Bundles', description: 'Create gift bundles from your products', badge: 'Recommended' },
        { id: 'both', title: 'Both', description: 'Featured bundles + browse full catalog' },
      ]}
    />
  );
}

function FrameCatalogBundle(_: FrameProps) {
  const products = [
    { name: 'Signature Candle', price: '$34.00', sel: true },
    { name: 'Bath Salts', price: '$28.00', sel: true },
    { name: 'Artisan Tea Set', price: '$32.00', sel: true },
    { name: 'Cashmere Gloves', price: '$65.00', sel: false },
    { name: 'Leather Journal', price: '$45.00', sel: false },
    { name: 'Ceramic Mug', price: '$24.00', sel: false },
    { name: 'Chocolate Box', price: '$38.00', sel: false },
    { name: 'Wool Scarf', price: '$55.00', sel: false },
  ];
  return (
    <BlockStack gap="400">
      <TextField label="" labelHidden placeholder="Search products…" autoComplete="off" />
      <InlineGrid gap="300" columns={4}>
        {products.map((p) => (
          <Box
            key={p.name}
            padding="200"
            borderRadius="200"
            borderWidth="025"
            borderColor={p.sel ? 'border-emphasis' : 'border'}
            background={p.sel ? 'bg-surface-selected' : 'bg-surface'}
            position="relative"
          >
            <BlockStack gap="200">
              <Box background="bg-surface-secondary" borderRadius="100" minHeight="80px" />
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
        ))}
      </InlineGrid>
      <InlineStack align="space-between" blockAlign="center">
        <Text as="span" tone="subdued" variant="bodySm">
          3 selected · combined retail $94.00
        </Text>
      </InlineStack>
    </BlockStack>
  );
}

function FramePricingFee({ answers, onChange }: FrameProps) {
  return (
    <InlineGrid gap="500" columns={['twoThirds', 'oneThird']}>
      <BlockStack gap="300">
        <TilePicker
          mode="single"
          columns={2}
          value={answers.feeHandling}
          onChange={(v) => onChange({ feeHandling: v as string })}
          options={[
            { id: 'pass', title: 'Pass to Gifter', description: '10% added at checkout. Margin stays intact.', badge: 'Recommended for DTC' },
            { id: 'absorb', title: 'Absorb in Margin', description: 'Cleaner pricing for buyers. 10% deducted from revenue.' },
          ]}
        />
        <Box padding="300" borderRadius="200" borderWidth="025" borderColor="border">
          <Checkbox
            label="Split 50/50"
            helpText="5% to gifter, 5% from margin"
            checked={answers.feeSplit ?? false}
            onChange={(v) => onChange({ feeSplit: v })}
          />
        </Box>
      </BlockStack>

      <Box padding="400" borderRadius="200" background="bg-fill-inverse">
        <BlockStack gap="200">
          <Text as="p" tone="text-inverse-secondary" variant="bodySm">
            EXAMPLE · 50 GIFTS
          </Text>
          <BlockStack gap="100">
            <CalcRow label="Bundle × 50" value="$4,450.00" />
            <CalcRow label="Volume discount" value="−$445.00" tone="success" />
            <CalcRow label="Subtotal" value="$4,005.00" />
            <CalcRow label="Fee (10%)" value="$400.50" />
          </BlockStack>
          <Divider borderColor="border-inverse" />
          <BlockStack gap="050">
            <Text as="p" tone="text-inverse-secondary" variant="bodySm">
              Your revenue
            </Text>
            <Text as="p" variant="headingLg" tone="success">
              $4,005.00
            </Text>
          </BlockStack>
        </BlockStack>
      </Box>
    </InlineGrid>
  );
}

function CalcRow({ label, value, tone }: { label: string; value: string; tone?: 'success' }) {
  return (
    <InlineStack align="space-between">
      <Text as="span" tone="text-inverse-secondary" variant="bodySm">{label}</Text>
      <Text as="span" tone={tone === 'success' ? 'success' : 'text-inverse'} variant="bodySm">
        {value}
      </Text>
    </InlineStack>
  );
}

function FramePricingVolume({ answers, onChange }: FrameProps) {
  return (
    <BlockStack gap="400">
      <Checkbox
        label="Enable volume discounts"
        helpText="Automatically apply discounts based on order size"
        checked={answers.enableVolumeDiscounts ?? false}
        onChange={(v) => onChange({ enableVolumeDiscounts: v })}
      />
      {answers.enableVolumeDiscounts && (
        <BlockStack gap="200">
          {[
            ['25', '5'],
            ['50', '10'],
            ['100', '15'],
          ].map(([gifts, off]) => (
            <InlineStack key={gifts} gap="200" blockAlign="center">
              <Box minWidth="80px"><TextField label="" labelHidden type="number" value={gifts} autoComplete="off" onChange={() => {}} /></Box>
              <Text as="span" tone="subdued">+ gifts =</Text>
              <Box minWidth="80px"><TextField label="" labelHidden type="number" value={off} autoComplete="off" onChange={() => {}} /></Box>
              <Text as="span" tone="subdued">% off</Text>
              <Button variant="plain" tone="critical">Remove</Button>
            </InlineStack>
          ))}
          <InlineStack>
            <Button variant="plain">+ Add tier</Button>
          </InlineStack>
        </BlockStack>
      )}
    </BlockStack>
  );
}

function FrameIntegrations(_: FrameProps) {
  const integrations = [
    { name: 'Klaviyo', desc: 'Sync recipients to Klaviyo lists', status: 'connected' },
    { name: 'Mailchimp', desc: 'Sync user contact info', status: null },
    { name: 'Omnisend', desc: 'Sync user contact info', status: null },
    { name: 'Postscript', desc: 'SMS for gift recipients', status: null },
  ];
  return (
    <BlockStack gap="200">
      {integrations.map((i) => (
        <Box
          key={i.name}
          padding="300"
          borderRadius="200"
          borderWidth="025"
          borderColor="border"
        >
          <InlineStack align="space-between" blockAlign="center">
            <InlineStack gap="300" blockAlign="center">
              <Box
                background="bg-surface-secondary"
                borderRadius="200"
                minWidth="36px"
                minHeight="36px"
                padding="200"
              >
                <Text as="span" variant="bodyMd" fontWeight="bold">{i.name[0]}</Text>
              </Box>
              <BlockStack gap="050">
                <Text as="p" variant="bodyMd" fontWeight="medium">{i.name}</Text>
                {i.status === 'connected' ? (
                  <InlineStack gap="100" blockAlign="center">
                    <Badge tone="success">Connected</Badge>
                  </InlineStack>
                ) : (
                  <Text as="p" tone="subdued" variant="bodySm">{i.desc}</Text>
                )}
              </BlockStack>
            </InlineStack>
            {i.status === 'connected' ? (
              <Button>Configure</Button>
            ) : (
              <Button variant="primary">Connect</Button>
            )}
          </InlineStack>
        </Box>
      ))}
    </BlockStack>
  );
}

function FrameOptInEnable({ answers, onChange }: FrameProps) {
  const current = answers.enableMarketingOptIn === undefined
    ? undefined
    : answers.enableMarketingOptIn ? 'yes' : 'no';
  return (
    <TilePicker
      mode="single"
      columns={2}
      value={current}
      onChange={(v) => onChange({ enableMarketingOptIn: v === 'yes' })}
      options={[
        { id: 'yes', title: 'Yes, show opt-in', description: 'Recipients can join your list when they claim a gift', badge: 'Most opt in' },
        { id: 'no', title: 'No, skip it', description: 'Recipients only see what they need to claim' },
      ]}
    />
  );
}

function FrameOptInPlacement({ answers, onChange }: FrameProps) {
  return (
    <TilePicker
      mode="multi"
      columns={2}
      value={answers.optInPlacements}
      onChange={(v) => onChange({ optInPlacements: v as string[] })}
      options={[
        { id: 'claim', title: 'Claim Form', description: 'When entering shipping address' },
        { id: 'unwrap', title: 'Unwrapping Page', description: 'After revealing the gift' },
      ]}
    />
  );
}

function FrameOptInCopy(_: FrameProps) {
  return (
    <TextField
      label=""
      labelHidden
      value="Keep me updated on exclusive offers and new products"
      helpText="Keep it short and clear about what they're signing up for."
      autoComplete="off"
      onChange={() => {}}
    />
  );
}

function FrameOptInCompliance({ answers, onChange }: FrameProps) {
  return (
    <BlockStack gap="400">
      <Checkbox
        label="Pre-check the box"
        helpText="Not recommended for EU"
        checked={answers.preCheckOptIn ?? false}
        onChange={(v) => onChange({ preCheckOptIn: v })}
      />
      <Checkbox
        label="Enable double opt-in for EU"
        helpText="Auto-detect EU recipients and require email confirmation"
        checked={answers.enableDoubleOptIn ?? false}
        onChange={(v) => onChange({ enableDoubleOptIn: v })}
      />
      <TextField
        label="Privacy policy URL"
        value="https://acmestore.com/privacy"
        autoComplete="off"
        onChange={() => {}}
      />
    </BlockStack>
  );
}

function FrameOptInActions({ answers, onChange }: FrameProps) {
  return (
    <BlockStack gap="400">
      <Checkbox
        label="Add to Klaviyo list"
        helpText="List: Gift Recipients"
        checked={answers.addToKlaviyo ?? false}
        onChange={(v) => onChange({ addToKlaviyo: v })}
      />
      <Checkbox
        label="Apply tags"
        helpText="gift_recipient, opted_in, source:giftwell"
        checked={answers.applyTags ?? false}
        onChange={(v) => onChange({ applyTags: v })}
      />
      <Checkbox
        label="Trigger welcome flow"
        helpText='Start "Gift Recipient Welcome" flow in Klaviyo'
        checked={answers.triggerWelcome ?? false}
        onChange={(v) => onChange({ triggerWelcome: v })}
      />
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
    { title: 'Catalog configured', desc: '3 gift bundles created' },
    { title: 'Pricing & fees', desc: '10% fee passed to gifter, volume discounts enabled' },
    { title: 'Branding', desc: 'Logo, colors, background, sparkle effects' },
    { title: 'Klaviyo connected', desc: 'Recipients sync to "Gift Recipients" list' },
    { title: 'Marketing opt-in', desc: 'Enabled on claim form, double opt-in for EU' },
    { title: 'Landing page', desc: 'acmestore.com/gift — added to nav & footer' },
    { title: 'Support', desc: 'Giftwell concierge enabled' },
  ];
  return (
    <BlockStack gap="400">
      <BlockStack gap="200">
        {items.map((i) => (
          <Box
            key={i.title}
            padding="300"
            borderRadius="200"
            borderWidth="025"
            borderColor="border"
            background="bg-surface-success"
          >
            <InlineStack gap="300" blockAlign="start">
              <Box>
                <Icon source={CheckIcon} tone="success" />
              </Box>
              <BlockStack gap="050">
                <Text as="p" variant="bodyMd" fontWeight="medium">{i.title}</Text>
                <Text as="p" tone="subdued" variant="bodySm">{i.desc}</Text>
              </BlockStack>
            </InlineStack>
          </Box>
        ))}
      </BlockStack>
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
  'catalog-approach': FrameCatalogApproach,
  'catalog-bundle': FrameCatalogBundle,
  'pricing-fee': FramePricingFee,
  'pricing-volume': FramePricingVolume,
  integrations: FrameIntegrations,
  'optin-enable': FrameOptInEnable,
  'optin-placement': FrameOptInPlacement,
  'optin-copy': FrameOptInCopy,
  'optin-compliance': FrameOptInCompliance,
  'optin-actions': FrameOptInActions,
  'landing-url': FrameLandingUrl,
  'landing-placement': FrameLandingPlacement,
  support: FrameSupport,
  review: FrameReview,
  launched: FrameLaunched,
};

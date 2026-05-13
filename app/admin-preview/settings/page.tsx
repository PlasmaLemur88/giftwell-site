'use client';

import { useState } from 'react';
import {
  Card,
  BlockStack,
  InlineStack,
  InlineGrid,
  Text,
  Button,
  Box,
  Badge,
  TextField,
  Checkbox,
  Tabs,
  Divider,
  Icon,
} from '@shopify/polaris';
import {
  LockIcon,
  DeleteIcon,
  PlusIcon,
  CheckIcon,
} from '@shopify/polaris-icons';

type TabId = 'pricing' | 'billing';

export default function SettingsPage() {
  const [tab, setTab] = useState<TabId>('pricing');
  const tabs = [
    { id: 'pricing' as const, content: 'Pricing' },
    { id: 'billing' as const, content: 'Billing' },
  ];
  const selected = tabs.findIndex((t) => t.id === tab);

  return (
    <BlockStack gap="500">
      <BlockStack gap="100">
        <Text as="h1" variant="headingXl">Settings</Text>
        <Text as="p" variant="bodyMd" tone="subdued">
          Adjust pricing, fees, and billing for your Giftwell program.
        </Text>
      </BlockStack>

      <Card padding="0">
        <Tabs tabs={tabs} selected={selected} onSelect={(i) => setTab(tabs[i].id)}>
          <Box padding="500">
            {tab === 'pricing' ? <PricingTab /> : <BillingTab />}
          </Box>
        </Tabs>
      </Card>
    </BlockStack>
  );
}

/* ─── Pricing tab ─── */

function PricingTab() {
  const [handling, setHandling] = useState<'pass' | 'absorb' | 'split'>('pass');
  const [enableVolume, setEnableVolume] = useState(true);
  const [tiers, setTiers] = useState([
    { gifts: 25, off: 5 },
    { gifts: 50, off: 10 },
    { gifts: 100, off: 15 },
  ]);

  return (
    <BlockStack gap="500">
      {/* Experience fee */}
      <BlockStack gap="300">
        <BlockStack gap="050">
          <Text as="h3" variant="headingMd">Experience fee</Text>
          <Text as="p" variant="bodySm" tone="subdued">
            How the 10% Giftwell fee is split between you and the gifter.
          </Text>
        </BlockStack>
        <InlineGrid columns={3} gap="300">
          {[
            { id: 'pass' as const,   title: 'Pass to Gifter',   description: '10% added at checkout', recommended: true },
            { id: 'absorb' as const, title: 'Absorb in Margin', description: '10% from your revenue' },
            { id: 'split' as const,  title: 'Split 50/50',      description: '5% gifter, 5% margin' },
          ].map((opt) => {
            const sel = handling === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setHandling(opt.id)}
                aria-pressed={sel}
                style={{ all: 'unset', cursor: 'pointer', display: 'block', height: '100%' }}
              >
                <Box
                  padding="400"
                  borderRadius="200"
                  borderWidth="025"
                  borderColor={sel ? 'border-emphasis' : 'border'}
                  background={sel ? 'bg-surface-selected' : 'bg-surface'}
                  minHeight="100%"
                  position="relative"
                >
                  <BlockStack gap="200">
                    <BlockStack gap="050">
                      <Text as="p" variant="bodyMd" fontWeight="semibold">{opt.title}</Text>
                      <Text as="p" tone="subdued" variant="bodySm">{opt.description}</Text>
                    </BlockStack>
                    {opt.recommended && <Box><Badge tone="success">Recommended</Badge></Box>}
                  </BlockStack>
                  {sel && (
                    <Box position="absolute" insetBlockStart="200" insetInlineEnd="200">
                      <Icon source={CheckIcon} tone="emphasis" />
                    </Box>
                  )}
                </Box>
              </button>
            );
          })}
        </InlineGrid>
      </BlockStack>

      <Divider />

      {/* Volume discounts */}
      <BlockStack gap="300">
        <InlineStack align="space-between" blockAlign="center">
          <BlockStack gap="050">
            <Text as="h3" variant="headingMd">Volume discounts</Text>
            <Text as="p" variant="bodySm" tone="subdued">
              Automatically apply discounts based on order size.
            </Text>
          </BlockStack>
          <Toggle on={enableVolume} onToggle={() => setEnableVolume((v) => !v)} />
        </InlineStack>
        {enableVolume && (
          <BlockStack gap="200">
            {tiers.map((row, idx) => (
              <InlineStack key={idx} gap="200" blockAlign="center" wrap={false}>
                <Box minWidth="100px">
                  <TextField
                    label=""
                    labelHidden
                    type="number"
                    value={row.gifts.toString()}
                    autoComplete="off"
                    onChange={(v) => {
                      const next = [...tiers];
                      next[idx] = { ...next[idx], gifts: Number(v) };
                      setTiers(next);
                    }}
                  />
                </Box>
                <Text as="span" tone="subdued" variant="bodySm">+ gifts =</Text>
                <Box minWidth="100px">
                  <TextField
                    label=""
                    labelHidden
                    type="number"
                    value={row.off.toString()}
                    suffix="%"
                    autoComplete="off"
                    onChange={(v) => {
                      const next = [...tiers];
                      next[idx] = { ...next[idx], off: Number(v) };
                      setTiers(next);
                    }}
                  />
                </Box>
                <Button
                  variant="plain"
                  icon={DeleteIcon}
                  accessibilityLabel="Remove tier"
                  onClick={() => setTiers(tiers.filter((_, i) => i !== idx))}
                />
              </InlineStack>
            ))}
            <InlineStack>
              <Button
                variant="plain"
                icon={PlusIcon}
                onClick={() => setTiers([...tiers, { gifts: 200, off: 20 }])}
              >
                Add tier
              </Button>
            </InlineStack>
          </BlockStack>
        )}
      </BlockStack>

      <Divider />

      <InlineStack align="end">
        <Button variant="primary">Save changes</Button>
      </InlineStack>
    </BlockStack>
  );
}

/* ─── Billing tab ─── */

function BillingTab() {
  return (
    <BlockStack gap="500">
      {/* Trial banner */}
      <Box
        padding="400"
        borderRadius="200"
        background="bg-surface-emphasis"
      >
        <InlineStack align="space-between" blockAlign="center" gap="400" wrap={false}>
          <BlockStack gap="050">
            <Text as="p" variant="bodyMd" fontWeight="semibold" tone="text-inverse">
              30-day free trial · 24 days remaining
            </Text>
            <Text as="p" variant="bodySm" tone="text-inverse-secondary">
              First charge on June 5, 2026 · $200.00 (Growth plan)
            </Text>
          </BlockStack>
          <Button>Upgrade now</Button>
        </InlineStack>
      </Box>

      {/* Current plan */}
      <BlockStack gap="300">
        <Text as="h3" variant="headingMd">Plan</Text>
        <InlineGrid columns={3} gap="300">
          {[
            { id: 'starter', name: 'Starter', price: '$100', desc: '< 50 gifts / month' },
            { id: 'growth',  name: 'Growth',  price: '$200', desc: '50 – 500 gifts / month', current: true },
            { id: 'scale',   name: 'Scale',   price: '$300', desc: '500+ gifts / month' },
          ].map((p) => (
            <Box
              key={p.id}
              padding="400"
              borderRadius="200"
              borderWidth="025"
              borderColor={p.current ? 'border-emphasis' : 'border'}
              background={p.current ? 'bg-surface-selected' : 'bg-surface'}
              position="relative"
            >
              <BlockStack gap="200">
                <BlockStack gap="050">
                  <InlineStack gap="200" blockAlign="center">
                    <Text as="p" variant="bodyMd" fontWeight="semibold">{p.name}</Text>
                    {p.current && <Badge tone="success">Current</Badge>}
                  </InlineStack>
                  <Text as="p" variant="bodySm" tone="subdued">{p.desc}</Text>
                </BlockStack>
                <Text as="p" variant="headingLg">{p.price}<Text as="span" variant="bodySm" tone="subdued"> /mo</Text></Text>
                {!p.current && (
                  <Button variant="plain">Switch to {p.name}</Button>
                )}
              </BlockStack>
            </Box>
          ))}
        </InlineGrid>
      </BlockStack>

      <Divider />

      {/* Payment method */}
      <BlockStack gap="300">
        <Text as="h3" variant="headingMd">Payment method</Text>
        <Card padding="0">
          <Box padding="400">
            <InlineStack align="space-between" blockAlign="center">
              <InlineStack gap="300" blockAlign="center">
                <Box
                  padding="200"
                  borderRadius="200"
                  background="bg-surface-secondary"
                  borderWidth="025"
                  borderColor="border"
                >
                  <Text as="span" variant="bodySm" fontWeight="bold">VISA</Text>
                </Box>
                <BlockStack gap="050">
                  <Text as="p" variant="bodyMd" fontWeight="semibold">Visa ending in 4242</Text>
                  <Text as="p" variant="bodySm" tone="subdued">Expires 09 / 28</Text>
                </BlockStack>
              </InlineStack>
              <Button>Update card</Button>
            </InlineStack>
          </Box>
        </Card>
        <InlineStack gap="100" blockAlign="center">
          <Icon source={LockIcon} tone="subdued" />
          <Text as="span" variant="bodySm" tone="subdued">
            Card details are encrypted by Stripe.
          </Text>
        </InlineStack>
      </BlockStack>

      <Divider />

      {/* Invoice history */}
      <BlockStack gap="300">
        <Text as="h3" variant="headingMd">Invoices</Text>
        <Card padding="0">
          <Box padding="600">
            <Text as="p" variant="bodySm" tone="subdued" alignment="center">
              No invoices yet. Your first charge will be on June 5, 2026.
            </Text>
          </Box>
        </Card>
      </BlockStack>
    </BlockStack>
  );
}

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
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
    </button>
  );
}

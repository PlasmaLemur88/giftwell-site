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
  Icon,
  Tabs,
} from '@shopify/polaris';
import { CheckIcon, StarFilledIcon, EditIcon } from '@shopify/polaris-icons';

type Mode = 'template' | 'custom';
type CustomTab = 'email' | 'unboxing';

const TEMPLATE_FEATURES = [
  'Beautifully designed by our team — mobile-optimized layout',
  'Brand pulled from Shopify (store name, logo, colors)',
  'Reminder + shipped + delivered emails included',
  'Spam-tested subject line, deliverability tuned',
  'Updated automatically when we ship improvements',
];

export default function CustomizePage() {
  const [mode, setMode] = useState<Mode>('template');
  const [customTab, setCustomTab] = useState<CustomTab>('email');

  return (
    <BlockStack gap="800">
      {/* ── Page header ── */}
      <InlineStack align="space-between" blockAlign="center" gap="500">
        <BlockStack gap="100">
          <Text as="h1" variant="headingXl">Customize</Text>
          <Text as="p" variant="bodyMd" tone="subdued">
            Use our polished Giftwell template, or tweak the basics to match your brand.
          </Text>
        </BlockStack>
        <InlineStack gap="200">
          <Button>Preview</Button>
          <Button>Send test gift</Button>
          <Button variant="primary">Save</Button>
        </InlineStack>
      </InlineStack>

      {/* ── Mode chooser ── */}
      <ModeChooser mode={mode} onSelect={setMode} />

      {/* ── Conditional content ── */}
      {mode === 'template'
        ? <TemplateView />
        : <CustomView tab={customTab} onTabChange={setCustomTab} />
      }
    </BlockStack>
  );
}

/* ─── Mode chooser (recommended + custom side-by-side) ─── */

function ModeChooser({ mode, onSelect }: { mode: Mode; onSelect: (m: Mode) => void }) {
  return (
    <InlineGrid gap="400" columns={['twoThirds', 'oneThird']}>
      <ChoiceCard
        recommended
        icon={StarFilledIcon}
        title="Use the Giftwell template"
        description="Beautifully designed by us, mobile-optimized, spam-tested. Your store name and logo are pulled from Shopify automatically — no setup required."
        ctaActive="✓ Using this template"
        ctaInactive="Use this template"
        active={mode === 'template'}
        onClick={() => onSelect('template')}
      />
      <ChoiceCard
        icon={EditIcon}
        title="Customize"
        description="Tweak the subject line, button text, and brand colors yourself. A few fields, not a full editor."
        ctaActive="✓ Customizing"
        ctaInactive="Customize"
        active={mode === 'custom'}
        onClick={() => onSelect('custom')}
      />
    </InlineGrid>
  );
}

function ChoiceCard({
  recommended,
  icon,
  title,
  description,
  ctaActive,
  ctaInactive,
  active,
  onClick,
}: {
  recommended?: boolean;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  ctaActive: string;
  ctaInactive: string;
  active: boolean;
  onClick: () => void;
}) {
  const IconSvg = icon;
  return (
    <Card padding="500" background={active ? 'bg-surface-selected' : undefined}>
      <BlockStack gap="400">
        <InlineStack gap="300" blockAlign="center">
          <IconSvg width={22} height={22} style={{ fill: '#1a1a1f' }} />
          {recommended && <Badge tone="success">Recommended</Badge>}
        </InlineStack>
        <BlockStack gap="100">
          <Text as="h3" variant="headingMd">{title}</Text>
          <Text as="p" variant="bodyMd" tone="subdued">{description}</Text>
        </BlockStack>
        <InlineStack>
          <Button variant={active ? 'primary' : 'secondary'} onClick={onClick}>
            {active ? ctaActive : ctaInactive}
          </Button>
        </InlineStack>
      </BlockStack>
    </Card>
  );
}

/* ─── Template view: feature list + preview ─── */

function TemplateView() {
  return (
    <Card padding="500">
      <InlineGrid gap="500" columns={['oneHalf', 'oneHalf']}>
        <BlockStack gap="400">
          <BlockStack gap="200">
            <Text as="h3" variant="headingMd">What's included</Text>
            <Text as="p" variant="bodyMd" tone="subdued">
              The Giftwell template handles everything below — no decisions needed.
            </Text>
          </BlockStack>
          <BlockStack gap="300">
            {TEMPLATE_FEATURES.map((f) => (
              <InlineStack key={f} gap="200" blockAlign="start" wrap={false}>
                <Box paddingBlockStart="050">
                  <Icon source={CheckIcon} tone="success" />
                </Box>
                <Text as="span" variant="bodyMd">{f}</Text>
              </InlineStack>
            ))}
          </BlockStack>
          <Box paddingBlockStart="300">
            <Button variant="plain">Send test gift to myself →</Button>
          </Box>
        </BlockStack>
        <EmailPreview />
      </InlineGrid>
    </Card>
  );
}

/* ─── Custom view: limited fields per tab ─── */

function CustomView({ tab, onTabChange }: { tab: CustomTab; onTabChange: (t: CustomTab) => void }) {
  const tabs = [
    { id: 'email' as const, content: 'Recipient email' },
    { id: 'unboxing' as const, content: 'Digital unboxing' },
  ];
  const selected = tabs.findIndex((t) => t.id === tab);

  return (
    <Card padding="0">
      <Tabs tabs={tabs} selected={selected} onSelect={(i) => onTabChange(tabs[i].id)}>
        <Box padding="500">
          {tab === 'email' ? <EmailCustomFields /> : <UnboxingCustomFields />}
        </Box>
      </Tabs>
    </Card>
  );
}

function EmailCustomFields() {
  return (
    <InlineGrid gap="500" columns={['oneHalf', 'oneHalf']}>
      <BlockStack gap="400">
        <BlockStack gap="100">
          <Text as="h3" variant="headingSm">Email basics</Text>
          <Text as="p" variant="bodySm" tone="subdued">
            Just three fields — layout and styling stay on the Giftwell template.
          </Text>
        </BlockStack>
        <TextField
          label="Subject line"
          value="🎁 [[Sender Name]] sent you a gift!"
          helpText="Variables: [[Sender Name]], [[Company]]"
          autoComplete="off"
          onChange={() => {}}
        />
        <TextField
          label="Button text"
          value="Unwrap Your Gift"
          autoComplete="off"
          onChange={() => {}}
        />
        <BrandColor />
      </BlockStack>
      <EmailPreview />
    </InlineGrid>
  );
}

function UnboxingCustomFields() {
  return (
    <InlineGrid gap="500" columns={['oneHalf', 'oneHalf']}>
      <BlockStack gap="400">
        <BlockStack gap="100">
          <Text as="h3" variant="headingSm">Unboxing basics</Text>
          <Text as="p" variant="bodySm" tone="subdued">
            Pick a background and an effect. Animation timing and layout stay on the
            Giftwell template.
          </Text>
        </BlockStack>
        <BrandColor />
        <BlockStack gap="200">
          <Text as="span" variant="bodyMd" fontWeight="medium">Background</Text>
          <InlineGrid gap="300" columns={6}>
            {[
              'linear-gradient(180deg, #1F3A5F, #0F1A2E)',
              '#FFE9A0',
              '#FFC9D5',
              '#A8E5C5',
              '#DCDCFF',
              '#1a1a1a',
            ].map((bg, i) => (
              <button
                key={i}
                type="button"
                style={{
                  all: 'unset',
                  cursor: 'pointer',
                  aspectRatio: '3/4',
                  borderRadius: 8,
                  background: bg,
                  outline: i === 0 ? '2px solid var(--p-color-border-emphasis)' : '1px solid var(--p-color-border)',
                  outlineOffset: i === 0 ? 2 : 0,
                  boxSizing: 'border-box',
                }}
              />
            ))}
          </InlineGrid>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="span" variant="bodyMd" fontWeight="medium">Effect</Text>
          <InlineStack gap="200">
            {['Sparkles', 'Snow', 'Confetti', 'Hearts', 'None'].map((e, i) => (
              <Button key={e} pressed={i === 0}>{e}</Button>
            ))}
          </InlineStack>
        </BlockStack>
      </BlockStack>
      <UnboxingPreview />
    </InlineGrid>
  );
}

function BrandColor() {
  return (
    <BlockStack gap="200">
      <Text as="span" variant="bodyMd" fontWeight="medium">Brand color</Text>
      <InlineStack gap="200">
        {['#5B6CFF', '#E04F4F', '#3FB950', '#F0883E', '#A371F7', '#1a1a1a'].map((c, i) => (
          <button
            key={c}
            type="button"
            aria-label={`Color ${c}`}
            style={{
              all: 'unset',
              cursor: 'pointer',
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: c,
              outline: i === 0 ? '2px solid var(--p-color-border-emphasis)' : '1px solid var(--p-color-border)',
              outlineOffset: i === 0 ? 2 : 0,
              boxSizing: 'border-box',
            }}
          />
        ))}
      </InlineStack>
    </BlockStack>
  );
}

/* ─── Previews ─── */

function EmailPreview() {
  return (
    <Box position="sticky" insetBlockStart="400">
      <BlockStack gap="200">
        <Text as="p" tone="subdued" variant="bodySm">EMAIL PREVIEW</Text>
        <Box
          borderRadius="300"
          borderWidth="025"
          borderColor="border"
          padding="300"
          background="bg-surface"
        >
          <BlockStack gap="300">
            <InlineStack gap="200" blockAlign="center">
              <Box
                background="bg-surface-secondary"
                borderRadius="full"
                minWidth="32px"
                minHeight="32px"
              />
              <BlockStack gap="050">
                <Text as="p" variant="bodySm" fontWeight="medium">Acme Store via Giftwell</Text>
                <Text as="p" tone="subdued" variant="bodySm">gifts@giftwell.io</Text>
              </BlockStack>
            </InlineStack>

            <Text as="p" variant="bodySm">🎁 Sarah sent you a gift!</Text>

            <Box
              borderRadius="200"
              padding="500"
              background="bg-fill-inverse"
            >
              <BlockStack gap="200" inlineAlign="center">
                <Text as="p" tone="text-inverse-secondary" variant="bodySm">ACME STORE</Text>
                <Text as="p" variant="headingMd" tone="text-inverse">
                  You&apos;ve received a gift!
                </Text>
                <Text as="p" tone="text-inverse-secondary" variant="bodySm">
                  From Sarah at Acme Corp
                </Text>
              </BlockStack>
            </Box>

            <Text as="p" tone="subdued" variant="bodySm" alignment="center">
              Sarah from Acme Corp wanted to send you something special. Tap below to unwrap your gift!
            </Text>

            <InlineStack align="center">
              <Button variant="primary">Unwrap Your Gift</Button>
            </InlineStack>

            <Text as="p" tone="subdued" variant="bodySm" alignment="center">
              This gift expires in 30 days
            </Text>
          </BlockStack>
        </Box>
      </BlockStack>
    </Box>
  );
}

function UnboxingPreview() {
  return (
    <Box position="sticky" insetBlockStart="400">
      <BlockStack gap="200">
        <Text as="p" tone="subdued" variant="bodySm">LIVE PREVIEW</Text>
        <Box
          borderRadius="300"
          padding="0"
          minHeight="420px"
          background="bg-fill-inverse"
        >
          <BlockStack gap="400" inlineAlign="center">
            <Box padding="500">
              <BlockStack gap="800" inlineAlign="center">
                <Text as="p" tone="text-inverse-secondary" variant="bodySm">ACME STORE</Text>
                <Box minHeight="120px" />
                <Box
                  background="bg-surface"
                  borderRadius="300"
                  padding="400"
                >
                  <BlockStack gap="200" inlineAlign="center">
                    <Text as="p" variant="headingMd" alignment="center">
                      You&apos;ve received a gift!
                    </Text>
                    <Text as="p" tone="subdued" variant="bodySm" alignment="center">
                      From Sarah at Acme Corp
                    </Text>
                    <Button variant="primary">Tap to Unwrap</Button>
                  </BlockStack>
                </Box>
              </BlockStack>
            </Box>
          </BlockStack>
        </Box>
      </BlockStack>
    </Box>
  );
}

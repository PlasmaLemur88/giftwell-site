'use client';

import { useState } from 'react';
import {
  Page,
  Card,
  BlockStack,
  InlineStack,
  Text,
  Button,
  Box,
  Badge,
  TextField,
  Checkbox,
  Tabs,
  RangeSlider,
  InlineGrid,
  Divider,
  Icon,
} from '@shopify/polaris';
import { CheckIcon } from '@shopify/polaris-icons';

type TabId = 'email' | 'unboxing';

export default function CustomizePage() {
  const [tab, setTab] = useState<TabId>('email');

  const tabs = [
    { id: 'email' as const, content: 'Recipient email' },
    { id: 'unboxing' as const, content: 'Digital unboxing' },
  ];

  const selected = tabs.findIndex((t) => t.id === tab);

  return (
    <Page
      title="Customize"
      subtitle="Tune the gift recipient email and the digital unboxing experience."
      primaryAction={{ content: 'Save', disabled: true }}
      secondaryActions={[{ content: 'Preview' }, { content: 'Send test gift' }]}
    >
      <Card padding="0">
        <Tabs
          tabs={tabs}
          selected={selected}
          onSelect={(i) => setTab(tabs[i].id)}
        >
          <Box padding="500">
            {tab === 'email' && <EmailTab />}
            {tab === 'unboxing' && <UnboxingTab />}
          </Box>
        </Tabs>
      </Card>
    </Page>
  );
}

/* ─── Email tab ─── */

function EmailTab() {
  return (
    <InlineGrid gap="500" columns={['twoThirds', 'oneThird']}>
      <BlockStack gap="500">
        <Section title="From">
          <BlockStack gap="400">
            <TextField
              label="From name"
              value="Acme Store via Giftwell"
              helpText="Recipients will see this as the sender."
              autoComplete="off"
              onChange={() => {}}
            />
            <TextField
              label="Subject line"
              value="🎁 [[Sender Name]] sent you a gift!"
              helpText="Available variables: [[Sender Name]], [[Company]], [[Recipient Name]]"
              autoComplete="off"
              onChange={() => {}}
            />
            <TextField
              label="Preview text"
              value="You've received a gift from [[Company]]. Tap to unwrap."
              autoComplete="off"
              onChange={() => {}}
            />
          </BlockStack>
        </Section>

        <Section title="Content">
          <BlockStack gap="400">
            <TextField
              label="Headline"
              value="You've received a gift!"
              autoComplete="off"
              onChange={() => {}}
            />
            <TextField
              label="Body text"
              value="[[Sender Name]] from [[Company]] wanted to send you something special. Tap below to unwrap your gift!"
              multiline={3}
              autoComplete="off"
              onChange={() => {}}
            />
            <TextField
              label="Button text"
              value="Unwrap Your Gift"
              autoComplete="off"
              onChange={() => {}}
            />
            <TextField
              label="Footer text"
              value="This gift expires in 30 days"
              autoComplete="off"
              onChange={() => {}}
            />
          </BlockStack>
        </Section>

        <Section title="Additional emails">
          <BlockStack gap="400">
            <Checkbox
              label="Reminder email (7 days)"
              helpText="Send if gift hasn't been claimed"
              checked
              onChange={() => {}}
            />
            <Checkbox
              label="Shipped notification"
              helpText="Notify when gift ships"
              checked
              onChange={() => {}}
            />
            <Checkbox
              label="Delivered notification"
              helpText="Notify when gift is delivered"
              checked
              onChange={() => {}}
            />
          </BlockStack>
        </Section>
      </BlockStack>

      <EmailPreview />
    </InlineGrid>
  );
}

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
        <Button variant="plain">Send test email to myself</Button>
      </BlockStack>
    </Box>
  );
}

/* ─── Unboxing tab ─── */

function UnboxingTab() {
  return (
    <InlineGrid gap="500" columns={['twoThirds', 'oneThird']}>
      <BlockStack gap="500">
        <Section
          title="Brand identity"
          subtitle="We pulled these from your Shopify theme — adjust as needed."
        >
          <InlineGrid gap="400" columns={2}>
            <TextField
              label="Brand name"
              value="Acme Store"
              autoComplete="off"
              onChange={() => {}}
            />
            <BlockStack gap="100">
              <Text as="span" variant="bodyMd" fontWeight="medium">Logo</Text>
              <InlineStack gap="200" blockAlign="center">
                <Box
                  background="bg-surface-secondary"
                  borderRadius="200"
                  borderWidth="025"
                  borderColor="border"
                  minWidth="40px"
                  minHeight="40px"
                />
                <Button>Change</Button>
              </InlineStack>
            </BlockStack>
          </InlineGrid>
        </Section>

        <Section title="Brand colors">
          <InlineGrid gap="500" columns={2}>
            <BlockStack gap="200">
              <Text as="p" tone="subdued" variant="bodySm">PRIMARY</Text>
              <InlineStack gap="200">
                {['#5B6CFF', '#E04F4F', '#3FB950', '#F0883E', '#A371F7'].map((c, i) => (
                  <Swatch key={c} color={c} selected={i === 0} />
                ))}
                <Swatch gradient />
              </InlineStack>
            </BlockStack>
            <BlockStack gap="200">
              <Text as="p" tone="subdued" variant="bodySm">SECONDARY</Text>
              <InlineStack gap="200">
                {['#1a1a1a', '#7B2FBE', '#1F3A5F', '#0D9488', '#A371F7'].map((c, i) => (
                  <Swatch key={c} color={c} selected={i === 1} />
                ))}
                <Swatch gradient />
              </InlineStack>
            </BlockStack>
          </InlineGrid>
        </Section>

        <Section
          title="Background"
          subtitle="Choose from our library, upload your own, or generate with AI."
        >
          <BlockStack gap="400">
            <InlineStack gap="100">
              <Button pressed>Library</Button>
              <Button>Upload</Button>
              <Button>AI Generate</Button>
            </InlineStack>
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
                  }}
                />
              ))}
            </InlineGrid>
          </BlockStack>
        </Section>

        <Section
          title="Effects & particles"
          subtitle="Add animated elements to the unwrapping experience."
        >
          <BlockStack gap="400">
            <InlineGrid gap="200" columns={6}>
              {[
                { id: 'sparkles', label: 'Sparkles' },
                { id: 'snow', label: 'Snow' },
                { id: 'confetti', label: 'Confetti' },
                { id: 'hearts', label: 'Hearts' },
                { id: 'stars', label: 'Stars' },
                { id: 'none', label: 'None' },
              ].map((e, i) => (
                <button key={e.id} type="button" style={{ all: 'unset', cursor: 'pointer', display: 'block' }}>
                  <Box
                    padding="300"
                    borderRadius="200"
                    borderWidth="025"
                    borderColor={i === 0 ? 'border-emphasis' : 'border'}
                    background={i === 0 ? 'bg-surface-selected' : 'bg-surface'}
                  >
                    <BlockStack gap="100" inlineAlign="center">
                      <Box minHeight="20px" />
                      <Text as="span" variant="bodySm">{e.label}</Text>
                    </BlockStack>
                  </Box>
                </button>
              ))}
            </InlineGrid>
            <RangeSlider
              label="Effect intensity"
              value={60}
              onChange={() => {}}
              output
            />
            <Button variant="plain">Upload custom Lottie animation</Button>
          </BlockStack>
        </Section>
      </BlockStack>

      <UnboxingPreview />
    </InlineGrid>
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
          minHeight="500px"
          background="bg-fill-inverse"
        >
          <BlockStack gap="400" inlineAlign="center">
            <Box padding="500">
              <BlockStack gap="800" inlineAlign="center">
                <Text as="p" tone="text-inverse-secondary" variant="bodySm">ACME STORE</Text>
                <Box minHeight="160px" />
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

/* ─── Building blocks ─── */

function Swatch({ color, selected, gradient }: { color?: string; selected?: boolean; gradient?: boolean }) {
  return (
    <button
      type="button"
      style={{
        all: 'unset',
        cursor: 'pointer',
        width: 28,
        height: 28,
        borderRadius: '50%',
        background: gradient
          ? 'conic-gradient(from 0deg, red, yellow, green, cyan, blue, magenta, red)'
          : color,
        outline: selected ? '2px solid var(--p-color-border-emphasis)' : '1px solid var(--p-color-border)',
        outlineOffset: selected ? 2 : 0,
        boxSizing: 'border-box',
      }}
    />
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <BlockStack gap="300">
      <BlockStack gap="050">
        <Text as="h3" variant="headingSm">{title}</Text>
        {subtitle && <Text as="p" tone="subdued" variant="bodySm">{subtitle}</Text>}
      </BlockStack>
      {children}
      <Divider />
    </BlockStack>
  );
}

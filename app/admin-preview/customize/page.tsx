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
  RangeSlider,
  Divider,
  Icon,
} from '@shopify/polaris';
import {
  CheckIcon,
  StarFilledIcon,
  EditIcon,
} from '@shopify/polaris-icons';

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
      <PageHeader />
      <ModeChooser mode={mode} onSelect={setMode} />
      {mode === 'template'
        ? <TemplateView />
        : <CustomFullView tab={customTab} onTabChange={setCustomTab} />}
    </BlockStack>
  );
}

function PageHeader() {
  return (
    <InlineStack align="space-between" blockAlign="center" gap="500">
      <BlockStack gap="100">
        <Text as="h1" variant="headingXl">Customize</Text>
        <Text as="p" variant="bodyMd" tone="subdued">
          Use our polished Giftwell template, or tweak the details to match your brand.
        </Text>
      </BlockStack>
      <InlineStack gap="200">
        <Button>Preview</Button>
        <Button>Send test gift</Button>
        <Button variant="primary">Save</Button>
      </InlineStack>
    </InlineStack>
  );
}

/* ─── Mode chooser ─── */

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
        description="Full control over the recipient email and the digital unwrap experience."
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

/* ─── Template mode: feature list + polished branded preview ─── */

function TemplateView() {
  return (
    <InlineGrid gap="500" columns={['oneHalf', 'oneHalf']}>
      <Card padding="500">
        <BlockStack gap="400">
          <BlockStack gap="200">
            <Text as="h3" variant="headingMd">The Giftwell template</Text>
            <Text as="p" variant="bodyMd" tone="subdued">
              No setup needed. Your store name and logo come from Shopify; we handle the rest.
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
      </Card>
      <PolishedPreview />
    </InlineGrid>
  );
}

function PolishedPreview() {
  return (
    <Box position="sticky" insetBlockStart="400">
      <BlockStack gap="200">
        <Text as="p" tone="subdued" variant="bodySm">EMAIL PREVIEW</Text>
        <div
          style={{
            borderRadius: 16,
            overflow: 'hidden',
            border: '1px solid #e1e3e5',
            boxShadow: '0 4px 16px rgba(15, 15, 25, 0.06)',
            background: '#ffffff',
          }}
        >
          {/* Email client "From" strip */}
          <div
            style={{
              padding: '14px 16px',
              borderBottom: '1px solid #ececef',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #7C5CFF, #A855F7)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              A
            </div>
            <div style={{ lineHeight: 1.3 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>
                Acme Store via Giftwell
              </div>
              <div style={{ fontSize: 12, color: '#6b6b73' }}>gifts@giftwell.io</div>
            </div>
          </div>

          {/* Hero card — branded, gradient bg, sparkles, big G logo */}
          <div
            style={{
              padding: '44px 28px 36px',
              background:
                'radial-gradient(120% 80% at 50% 0%, #f5edff 0%, #fbf8ff 60%, #ffffff 100%)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Sparkle top={14} left={20} size={11} />
            <Sparkle top={22} right={28} size={9} />
            <Sparkle bottom={28} left={36} size={10} />
            <Sparkle bottom={48} right={20} size={8} />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/g-black-bold.png"
              alt=""
              style={{ width: 44, height: 44, margin: '0 auto 16px', display: 'block' }}
            />

            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: '#7C5CFF',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: 10,
              }}
            >
              A Gift from Acme Store
            </div>

            <div
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: '#111',
                letterSpacing: '-0.015em',
                marginBottom: 8,
              }}
            >
              You&apos;ve received a gift!
            </div>

            <div
              style={{
                fontSize: 13.5,
                color: '#4a4a52',
                lineHeight: 1.55,
                maxWidth: 300,
                margin: '0 auto 22px',
              }}
            >
              <strong style={{ color: '#111' }}>Sarah</strong> from Acme Corp wanted to send you
              something special. Tap below to unwrap your gift.
            </div>

            <button
              style={{
                all: 'unset',
                cursor: 'pointer',
                background: 'linear-gradient(135deg, #7C5CFF, #A855F7)',
                color: '#fff',
                padding: '12px 26px',
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 600,
                boxShadow: '0 6px 16px rgba(124, 92, 255, 0.25)',
                letterSpacing: '-0.005em',
              }}
            >
              Unwrap Your Gift
            </button>

            <div style={{ marginTop: 18, fontSize: 11.5, color: '#8a8a93' }}>
              This gift expires in 30 days
            </div>
          </div>

          {/* Footer strip */}
          <div
            style={{
              padding: '12px 16px',
              borderTop: '1px solid #ececef',
              fontSize: 11,
              color: '#8a8a93',
              textAlign: 'center',
            }}
          >
            Powered by{' '}
            <span style={{ fontWeight: 600, color: '#6b6b73' }}>Giftwell</span>
          </div>
        </div>
      </BlockStack>
    </Box>
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

/* ─── Custom mode: full editor (restored) ─── */

function CustomFullView({
  tab,
  onTabChange,
}: {
  tab: CustomTab;
  onTabChange: (t: CustomTab) => void;
}) {
  const tabs = [
    { id: 'email' as const, content: 'Recipient email' },
    { id: 'unboxing' as const, content: 'Digital unboxing' },
  ];
  const selected = tabs.findIndex((t) => t.id === tab);

  return (
    <Card padding="0">
      <Tabs tabs={tabs} selected={selected} onSelect={(i) => onTabChange(tabs[i].id)}>
        <Box padding="500">
          {tab === 'email' ? <EmailFullTab /> : <UnboxingFullTab />}
        </Box>
      </Tabs>
    </Card>
  );
}

function EmailFullTab() {
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

      <BasicEmailPreview />
    </InlineGrid>
  );
}

function UnboxingFullTab() {
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
                    outline:
                      i === 0
                        ? '2px solid var(--p-color-border-emphasis)'
                        : '1px solid var(--p-color-border)',
                    outlineOffset: i === 0 ? 2 : 0,
                    boxSizing: 'border-box',
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

      <BasicUnboxingPreview />
    </InlineGrid>
  );
}

/* ─── Plain previews used inside the Custom editor (different from the
       polished branded preview shown in Template mode). ─── */

function BasicEmailPreview() {
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

function BasicUnboxingPreview() {
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

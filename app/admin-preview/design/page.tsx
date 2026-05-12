'use client';

import {
  Card,
  BlockStack,
  InlineStack,
  InlineGrid,
  Text,
  Button,
  Box,
  TextField,
  RangeSlider,
  Divider,
} from '@shopify/polaris';

export default function DesignPage() {
  return (
    <BlockStack gap="800">
      <InlineStack align="space-between" blockAlign="center" gap="500">
        <BlockStack gap="100">
          <Text as="h1" variant="headingXl">Design</Text>
          <Text as="p" variant="bodyMd" tone="subdued">
            Brand identity and the digital unboxing experience. Applies to every Giftwell email
            and unwrap screen.
          </Text>
        </BlockStack>
        <InlineStack gap="200">
          <Button>Preview unboxing</Button>
          <Button variant="primary">Save</Button>
        </InlineStack>
      </InlineStack>

      <InlineGrid gap="500" columns={['twoThirds', 'oneThird']}>
        <BlockStack gap="500">
          <Card padding="500">
            <BlockStack gap="500">
              <Section
                title="Brand identity"
                subtitle="Pulled from your Shopify theme — override if needed."
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

              <Section title="Brand color" subtitle="Used on CTAs and accents across emails.">
                <InlineStack gap="200">
                  {['#5B6CFF', '#E04F4F', '#3FB950', '#F0883E', '#A371F7', '#1a1a1a'].map((c, i) => (
                    <Swatch key={c} color={c} selected={i === 0} />
                  ))}
                  <Swatch gradient />
                </InlineStack>
              </Section>
            </BlockStack>
          </Card>

          <Card padding="500">
            <BlockStack gap="500">
              <Section
                title="Unboxing background"
                subtitle="The full-screen scene when a recipient unwraps their gift."
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
                subtitle="Animated elements layered over the unwrap."
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
                      <button
                        key={e.id}
                        type="button"
                        style={{ all: 'unset', cursor: 'pointer', display: 'block' }}
                      >
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
          </Card>
        </BlockStack>

        <UnboxingPreview />
      </InlineGrid>
    </BlockStack>
  );
}

/* ─── Right-side sticky preview of the unboxing screen ─── */

function UnboxingPreview() {
  return (
    <Box position="sticky" insetBlockStart="400">
      <BlockStack gap="200">
        <Text as="p" tone="subdued" variant="bodySm">UNBOXING PREVIEW</Text>
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

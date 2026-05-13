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
  Divider,
} from '@shopify/polaris';

export default function LandingPage() {
  const [slug, setSlug] = useState('gift');
  const [headline, setHeadline] = useState('Send a gift they’ll actually love');
  const [subhead, setSubhead] = useState(
    'Bulk gifting for client appreciation, employee onboarding, and holiday programs. Recipients pick their own. You ship one address at a time.',
  );
  const [ctaLabel, setCtaLabel] = useState('Start a gift');

  return (
    <BlockStack gap="500">
      <InlineStack align="space-between" blockAlign="center" gap="500">
        <BlockStack gap="100">
          <Text as="h1" variant="headingXl">Landing page</Text>
          <Text as="p" variant="bodyMd" tone="subdued">
            Where corporate buyers land to start an order. Tune the URL and copy.
          </Text>
        </BlockStack>
        <InlineStack gap="200">
          <Button url="/landing-preview" external>Preview</Button>
          <Button variant="primary">Save</Button>
        </InlineStack>
      </InlineStack>

      <InlineGrid columns={['oneHalf', 'oneHalf']} gap="500">
        {/* Editor */}
        <BlockStack gap="500">
          <Card padding="500">
            <BlockStack gap="400">
              <BlockStack gap="050">
                <Text as="h3" variant="headingMd">URL</Text>
                <Text as="p" variant="bodySm" tone="subdued">
                  Copy this URL into your storefront nav, footer, or marketing wherever you want it.
                </Text>
              </BlockStack>
              <InlineStack gap="200" blockAlign="center" wrap={false}>
                <Text as="span" tone="subdued">acmestore.com/</Text>
                <Box minWidth="180px">
                  <TextField
                    label=""
                    labelHidden
                    value={slug}
                    onChange={setSlug}
                    autoComplete="off"
                  />
                </Box>
                <Button>Copy URL</Button>
              </InlineStack>
              <InlineStack gap="200" blockAlign="center">
                <Badge tone="success">Live</Badge>
                <Text as="span" variant="bodySm" tone="subdued">
                  acmestore.com/{slug}
                </Text>
              </InlineStack>
            </BlockStack>
          </Card>

          <Card padding="500">
            <BlockStack gap="400">
              <BlockStack gap="050">
                <Text as="h3" variant="headingMd">Hero content</Text>
                <Text as="p" variant="bodySm" tone="subdued">
                  Headline + subhead + call-to-action shown above the fold.
                </Text>
              </BlockStack>
              <TextField
                label="Headline"
                value={headline}
                onChange={setHeadline}
                autoComplete="off"
              />
              <TextField
                label="Subhead"
                value={subhead}
                multiline={3}
                onChange={setSubhead}
                autoComplete="off"
              />
              <TextField
                label="Button label"
                value={ctaLabel}
                onChange={setCtaLabel}
                autoComplete="off"
              />
            </BlockStack>
          </Card>
        </BlockStack>

        {/* Preview */}
        <Box position="sticky" insetBlockStart="400">
          <BlockStack gap="200">
            <Text as="p" tone="subdued" variant="bodySm">LANDING PAGE PREVIEW</Text>
            <div
              style={{
                borderRadius: 14,
                overflow: 'hidden',
                border: '1px solid #e1e3e5',
                boxShadow: '0 4px 16px rgba(15, 15, 25, 0.06)',
                background: '#fff',
              }}
            >
              <div
                style={{
                  padding: '14px 18px',
                  borderBottom: '1px solid #ececef',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: '#fafafa',
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#ff5f57',
                  }}
                />
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#febc2e',
                  }}
                />
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#28c840',
                  }}
                />
                <div
                  style={{
                    marginLeft: 8,
                    fontSize: 11,
                    color: '#8a8a93',
                    fontFamily: 'monospace',
                  }}
                >
                  acmestore.com/{slug}
                </div>
              </div>
              <div
                style={{
                  padding: '60px 28px',
                  background:
                    'radial-gradient(120% 80% at 50% 0%, #fbf8ff 0%, #ffffff 60%)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#7C5CFF',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: 12,
                  }}
                >
                  Acme Store · Corporate gifting
                </div>
                <div
                  style={{
                    fontSize: 26,
                    fontWeight: 700,
                    color: '#111',
                    letterSpacing: '-0.015em',
                    lineHeight: 1.15,
                    marginBottom: 12,
                  }}
                >
                  {headline}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: '#4a4a52',
                    lineHeight: 1.55,
                    maxWidth: 340,
                    margin: '0 auto 24px',
                  }}
                >
                  {subhead}
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
                  }}
                >
                  {ctaLabel}
                </button>
              </div>
              <Divider />
              <div
                style={{
                  padding: 18,
                  fontSize: 11.5,
                  color: '#8a8a93',
                  textAlign: 'center',
                }}
              >
                Powered by <span style={{ fontWeight: 600, color: '#6b6b73' }}>Giftwell</span>
              </div>
            </div>
          </BlockStack>
        </Box>
      </InlineGrid>
    </BlockStack>
  );
}

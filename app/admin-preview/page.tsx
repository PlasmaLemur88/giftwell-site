'use client';

import { useState } from 'react';
import {
  Page,
  Card,
  BlockStack,
  InlineStack,
  Text,
  Button,
  ProgressBar,
  Box,
  Divider,
  Banner,
} from '@shopify/polaris';
import { Frames, FRAMES, type FrameAnswers } from './frames';

export default function AdminPreviewPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<FrameAnswers>({
    goals: ['revenue', 'customers'],
    buyerStatus: 'waiting',
    volume: '50-200',
    catalogApproach: 'curated',
    feeHandling: 'pass',
    optInPlacements: ['claim', 'unwrap'],
    enableMarketingOptIn: true,
    enableDoubleOptIn: true,
    addToKlaviyo: true,
    applyTags: true,
    triggerWelcome: true,
    enableVolumeDiscounts: true,
    enableConcierge: true,
    addToNav: true,
    addToFooter: true,
  });

  const frame = FRAMES[step];
  const Frame = Frames[frame.id];
  const isLast = step === FRAMES.length - 1;
  const isReview = frame.id === 'review';
  const isLaunched = frame.id === 'launched';
  const progress = Math.round(((step + 1) / FRAMES.length) * 100);

  // Group frames by phase for the preview switcher
  const phases = FRAMES.reduce<Record<string, { frame: typeof FRAMES[number]; index: number }[]>>((acc, f, i) => {
    (acc[f.phase] ??= []).push({ frame: f, index: i });
    return acc;
  }, {});

  return (
    <Page>
      <BlockStack gap="400">
        {/* Preview-only frame switcher (not part of the real component) */}
        <Banner tone="info" title="Preview-only frame switcher">
          <BlockStack gap="200">
            <Text as="p" tone="subdued">
              The chips below let you jump between frames. In the real component, only Skip / Back / Continue would be visible.
            </Text>
            <BlockStack gap="100">
              {Object.entries(phases).map(([phase, items]) => (
                <InlineStack key={phase} gap="200" blockAlign="center" wrap>
                  <Box minWidth="100px">
                    <Text as="span" tone="subdued" variant="bodySm">{phase}</Text>
                  </Box>
                  <InlineStack gap="100" wrap>
                    {items.map(({ frame: f, index }) => (
                      <Button
                        key={f.id}
                        size="micro"
                        pressed={index === step}
                        onClick={() => setStep(index)}
                      >
                        {f.title.length > 32 ? f.title.slice(0, 30) + '…' : f.title}
                      </Button>
                    ))}
                  </InlineStack>
                </InlineStack>
              ))}
            </BlockStack>
          </BlockStack>
        </Banner>

        {/* Onboarding card */}
        <Card>
          <BlockStack gap="500">
            <BlockStack gap="200">
              <InlineStack align="space-between" blockAlign="center">
                <Text as="span" tone="subdued" variant="bodySm">
                  {frame.phase} · Step {step + 1} of {FRAMES.length}
                </Text>
                <Text as="span" tone="subdued" variant="bodySm">
                  {progress}%
                </Text>
              </InlineStack>
              <ProgressBar progress={progress} size="small" tone="primary" />
            </BlockStack>

            <BlockStack gap="100">
              <Text as="h2" variant="headingLg">{frame.title}</Text>
              {frame.helper && (
                <Text as="p" tone="subdued">{frame.helper}</Text>
              )}
            </BlockStack>

            <Frame answers={answers} onChange={(patch) => setAnswers((a) => ({ ...a, ...patch }))} />

            {!isLaunched && (
              <>
                <Divider />
                <InlineStack align="space-between" blockAlign="center">
                  <Button variant="plain">Skip setup</Button>
                  <InlineStack gap="200">
                    {step > 0 && (
                      <Button onClick={() => setStep(step - 1)}>Back</Button>
                    )}
                    <Button
                      variant="primary"
                      onClick={() => setStep(Math.min(step + 1, FRAMES.length - 1))}
                    >
                      {isReview ? 'Launch gift page' : 'Continue'}
                    </Button>
                  </InlineStack>
                </InlineStack>
              </>
            )}
          </BlockStack>
        </Card>

        {/* Faux dashboard below to show the card lives alongside the rest of the app */}
        <Card>
          <BlockStack gap="400">
            <InlineStack align="space-between" blockAlign="center">
              <BlockStack gap="050">
                <Text as="h2" variant="headingMd">Analytics</Text>
                <Text as="p" tone="subdued" variant="bodySm">Last 30 days · May 9 – Jun 8</Text>
              </BlockStack>
              <InlineStack gap="200">
                <Button>Last 30 days</Button>
                <Button>Compare to</Button>
              </InlineStack>
            </InlineStack>
            <InlineStack gap="400" wrap={false} align="start">
              {['Gifts sent', 'Recipients claimed', 'Opt-in rate', 'Revenue'].map((label) => (
                <Box key={label} padding="400" borderColor="border" borderWidth="025" borderRadius="200" minWidth="220px">
                  <BlockStack gap="100">
                    <Text as="p" tone="subdued" variant="bodySm">{label}</Text>
                    <Text as="p" variant="heading2xl" tone="subdued">—</Text>
                    <Text as="p" tone="subdued" variant="bodySm">No data yet</Text>
                  </BlockStack>
                </Box>
              ))}
            </InlineStack>
          </BlockStack>
        </Card>
      </BlockStack>
    </Page>
  );
}

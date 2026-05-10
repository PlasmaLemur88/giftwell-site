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
import { Frames, FRAMES, type FrameAnswers } from '../frames';

export default function SetupPage() {
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
  const isReview = frame.id === 'review';
  const isLaunched = frame.id === 'launched';
  const progress = Math.round(((step + 1) / FRAMES.length) * 100);

  const phases = FRAMES.reduce<
    Record<string, { frame: typeof FRAMES[number]; index: number }[]>
  >((acc, f, i) => {
    (acc[f.phase] ??= []).push({ frame: f, index: i });
    return acc;
  }, {});

  return (
    <Page title="Setup" subtitle="Get your gift page ready to launch">
      <BlockStack gap="400">
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

            <Frame
              answers={answers}
              onChange={(patch) => setAnswers((a) => ({ ...a, ...patch }))}
            />

            {!isLaunched && (
              <>
                <Divider />
                <InlineStack align="space-between" blockAlign="center">
                  <Button variant="plain" url="/admin-preview">
                    Skip setup
                  </Button>
                  <InlineStack gap="200">
                    {step > 0 && (
                      <Button onClick={() => setStep(step - 1)}>Back</Button>
                    )}
                    <Button
                      variant="primary"
                      onClick={() =>
                        setStep(Math.min(step + 1, FRAMES.length - 1))
                      }
                    >
                      {isReview ? 'Launch gift page' : 'Continue'}
                    </Button>
                  </InlineStack>
                </InlineStack>
              </>
            )}
          </BlockStack>
        </Card>
      </BlockStack>
    </Page>
  );
}

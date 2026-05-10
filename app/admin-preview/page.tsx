'use client';

import { useState } from 'react';
import {
  Page,
  Layout,
  Card,
  CalloutCard,
  BlockStack,
  InlineStack,
  Text,
  Box,
  Banner,
  ProgressBar,
  Button,
  Badge,
  Divider,
} from '@shopify/polaris';

type Metric = {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
  range: string;
  spark: number[];
};

const METRICS: Metric[] = [
  {
    label: 'Gifts sent',
    value: '1,284',
    delta: '+18.2%',
    positive: true,
    range: 'Last 30 days',
    spark: [12, 18, 14, 22, 20, 28, 26, 34, 30, 38, 42, 48],
  },
  {
    label: 'Recipients claimed',
    value: '947',
    delta: '+22.4%',
    positive: true,
    range: 'Last 30 days',
    spark: [8, 12, 10, 16, 14, 22, 24, 28, 26, 32, 36, 40],
  },
  {
    label: 'Opt-in rate',
    value: '64.8%',
    delta: '+3.1pp',
    positive: true,
    range: 'Last 30 days',
    spark: [55, 58, 56, 60, 59, 62, 63, 64, 63, 65, 66, 65],
  },
  {
    label: 'Revenue',
    value: '$84,210',
    delta: '+12.7%',
    positive: true,
    range: 'Last 30 days',
    spark: [400, 520, 480, 600, 580, 720, 760, 820, 800, 880, 940, 1020],
  },
];

const FUNNEL = [
  { label: 'Sent', value: 1284, color: '#5C6AC4' },
  { label: 'Opened', value: 1102, color: '#7C5CFF' },
  { label: 'Claimed', value: 947, color: '#A855F7' },
  { label: 'Delivered', value: 902, color: '#16A34A' },
];

function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const w = 120;
  const h = 36;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stroke = positive ? '#16A34A' : '#DC2626';
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden>
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <Card>
      <BlockStack gap="200">
        <InlineStack align="space-between" blockAlign="center">
          <Text as="span" tone="subdued" variant="bodySm">
            {metric.label}
          </Text>
          <Badge size="small">{metric.range}</Badge>
        </InlineStack>
        <InlineStack align="space-between" blockAlign="end" gap="200">
          <BlockStack gap="050">
            <Text as="p" variant="heading2xl">
              {metric.value}
            </Text>
            <Text
              as="span"
              variant="bodySm"
              tone={metric.positive ? 'success' : 'critical'}
            >
              {metric.delta} vs prior period
            </Text>
          </BlockStack>
          <Sparkline data={metric.spark} positive={metric.positive} />
        </InlineStack>
      </BlockStack>
    </Card>
  );
}

function FunnelChart() {
  const max = Math.max(...FUNNEL.map((s) => s.value));
  return (
    <Card>
      <BlockStack gap="400">
        <InlineStack align="space-between" blockAlign="center">
          <BlockStack gap="050">
            <Text as="h3" variant="headingMd">
              Recipient funnel
            </Text>
            <Text as="p" tone="subdued" variant="bodySm">
              Last 30 days · How recipients moved through the gift flow
            </Text>
          </BlockStack>
          <Button>View report</Button>
        </InlineStack>
        <BlockStack gap="300">
          {FUNNEL.map((stage, i) => {
            const pct = (stage.value / max) * 100;
            const conv =
              i === 0
                ? null
                : ((stage.value / FUNNEL[i - 1].value) * 100).toFixed(1);
            return (
              <BlockStack key={stage.label} gap="100">
                <InlineStack align="space-between">
                  <InlineStack gap="200" blockAlign="center">
                    <Text as="span" variant="bodyMd" fontWeight="semibold">
                      {stage.label}
                    </Text>
                    {conv && (
                      <Text as="span" tone="subdued" variant="bodySm">
                        {conv}% from prior
                      </Text>
                    )}
                  </InlineStack>
                  <Text as="span" variant="bodyMd">
                    {stage.value.toLocaleString()}
                  </Text>
                </InlineStack>
                <Box
                  background="bg-surface-secondary"
                  borderRadius="100"
                  minHeight="10px"
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      height: 10,
                      background: stage.color,
                      borderRadius: 6,
                      transition: 'width 200ms ease',
                    }}
                  />
                </Box>
              </BlockStack>
            );
          })}
        </BlockStack>
      </BlockStack>
    </Card>
  );
}

export default function DashboardPage() {
  const [showSetupBanner, setShowSetupBanner] = useState(true);
  const setupProgress = 35;

  return (
    <Page
      title="Dashboard"
      subtitle="Welcome back — here's how Acme Store's gifting is performing"
    >
      <Layout>
        {showSetupBanner && (
          <Layout.Section>
            <Banner
              tone="info"
              title="You're 35% through setup"
              onDismiss={() => setShowSetupBanner(false)}
              action={{ content: 'Resume setup', url: '/admin-preview/setup' }}
              secondaryAction={{
                content: 'Customize gift experience',
                url: '/admin-preview/customize',
              }}
            >
              <BlockStack gap="200">
                <Text as="p">
                  Pick up where you left off. We'll save your answers as you go.
                </Text>
                <Box maxWidth="320px">
                  <ProgressBar progress={setupProgress} size="small" tone="primary" />
                </Box>
              </BlockStack>
            </Banner>
          </Layout.Section>
        )}

        <Layout.Section>
          <CalloutCard
            title="New: AI-powered recipient parsing"
            illustration="/g-gradient.png"
            primaryAction={{
              content: 'See what changed',
              url: '/admin-preview/recipients',
            }}
          >
            <p>
              Paste any messy list of names and addresses — we'll handle the
              cleanup automatically and route the rest to the claim flow. No
              more loading screens or row-by-row error fixes.
            </p>
          </CalloutCard>
        </Layout.Section>

        <Layout.Section>
          <BlockStack gap="400">
            <InlineStack align="space-between" blockAlign="center">
              <BlockStack gap="050">
                <Text as="h2" variant="headingLg">
                  Analytics
                </Text>
                <Text as="p" tone="subdued" variant="bodySm">
                  Last 30 days · May 9 – Jun 8
                </Text>
              </BlockStack>
              <InlineStack gap="200">
                <Button>Last 30 days</Button>
                <Button>Compare to</Button>
              </InlineStack>
            </InlineStack>
            <Layout>
              {METRICS.map((m) => (
                <Layout.Section key={m.label} variant="oneHalf">
                  <MetricCard metric={m} />
                </Layout.Section>
              ))}
            </Layout>
          </BlockStack>
        </Layout.Section>

        <Layout.Section>
          <FunnelChart />
        </Layout.Section>

        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <BlockStack gap="050">
                <Text as="h3" variant="headingMd">
                  Plan usage
                </Text>
                <Text as="p" tone="subdued" variant="bodySm">
                  Pro plan · Resets on Jun 1
                </Text>
              </BlockStack>
              <Divider />
              <BlockStack gap="200">
                <InlineStack align="space-between">
                  <Text as="span" variant="bodyMd">
                    Recipients this month
                  </Text>
                  <Text as="span" variant="bodyMd" tone="subdued">
                    1,284 / 5,000
                  </Text>
                </InlineStack>
                <ProgressBar progress={26} size="small" tone="primary" />
              </BlockStack>
              <InlineStack align="end">
                <Button variant="primary">Upgrade plan</Button>
              </InlineStack>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

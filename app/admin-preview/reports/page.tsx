'use client';

import Link from 'next/link';
import {
  BlockStack,
  InlineStack,
  InlineGrid,
  Card,
  Text,
  Button,
  Badge,
} from '@shopify/polaris';
import {
  CashDollarIcon,
  ChartFunnelIcon,
  ConnectIcon,
  CalendarIcon,
  TargetIcon,
  PersonAddIcon,
  PersonIcon,
  EmailIcon,
  WrenchIcon,
  PlusIcon,
} from '@shopify/polaris-icons';
import styles from './reports.module.css';

type IconSource = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
type Report = {
  slug: string;
  title: string;
  description: string;
  iconSource: IconSource;
};

const REPORTS: Report[] = [
  { slug: 'revenue',     title: 'Revenue',             description: 'Net revenue, gross, fees, and trend over time',              iconSource: CashDollarIcon },
  { slug: 'funnel',      title: 'Recipient funnel',    description: 'Sent → Opened → Claimed → Delivered → Opted in → Customer',  iconSource: ChartFunnelIcon },
  { slug: 'attribution', title: 'Attribution',         description: 'Performance by UTM source, medium, and campaign',            iconSource: ConnectIcon },
  { slug: 'campaigns',   title: 'Campaigns',           description: 'Per-campaign revenue, claim rate, and ROI',                  iconSource: CalendarIcon },
  { slug: 'cac',         title: 'Cost of acquisition', description: 'CAC, ROAS, and payback period by channel',                   iconSource: TargetIcon },
  { slug: 'recipients',  title: 'Recipients',          description: 'Opt-in rate, LTV, and recipient-to-customer conversion',     iconSource: PersonAddIcon },
  { slug: 'gifters',     title: 'Gifters',             description: 'New vs repeat, top buyers, and gifter-level LTV',            iconSource: PersonIcon },
  { slug: 'email',       title: 'Email performance',   description: 'Open, click, and click-to-claim rates per email type',       iconSource: EmailIcon },
  { slug: 'operations',  title: 'Operations',          description: 'Unclaimed, failed orders, refunds, and time-to-claim',       iconSource: WrenchIcon },
];

function ReportCard({ href, iconSource: IconSvg, title, description }: { href: string; iconSource: IconSource; title: string; description: string }) {
  return (
    <Link href={href} className={styles.cardLink}>
      <Card padding="500">
        <BlockStack gap="500">
          <IconSvg
            width={28}
            height={28}
            style={{ fill: '#1a1a1f', alignSelf: 'flex-start' }}
          />
          <BlockStack gap="100">
            <Text as="h3" variant="headingMd">{title}</Text>
            <Text as="p" variant="bodyMd" tone="subdued">{description}</Text>
          </BlockStack>
        </BlockStack>
      </Card>
    </Link>
  );
}

export default function ReportsLandingPage() {
  return (
    <BlockStack gap="800">
      <InlineStack align="space-between" blockAlign="center" gap="400">
        <BlockStack gap="100">
          <Text as="h1" variant="headingXl">Reports</Text>
          <Text as="p" variant="bodyMd" tone="subdued">View reports</Text>
        </BlockStack>
        <Button variant="primary" icon={PlusIcon}>Create</Button>
      </InlineStack>

      <InlineGrid columns={{ xs: 1, sm: 2, md: 3 }} gap="400">
        {REPORTS.map((r) => (
          <ReportCard
            key={r.slug}
            href={`/admin-preview/reports/${r.slug}`}
            iconSource={r.iconSource}
            title={r.title}
            description={r.description}
          />
        ))}
      </InlineGrid>

      <BlockStack gap="400">
        <InlineStack gap="300" blockAlign="center">
          <Text as="h2" variant="headingMd">My reports</Text>
          <Badge>Early access</Badge>
        </InlineStack>
        <InlineGrid columns={{ xs: 1, sm: 2, md: 3 }} gap="400">
          <ReportCard
            href="#"
            iconSource={PlusIcon}
            title="Create a report"
            description="Build a custom dashboard for your data"
          />
        </InlineGrid>
      </BlockStack>
    </BlockStack>
  );
}

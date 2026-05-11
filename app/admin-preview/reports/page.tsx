'use client';

import Link from 'next/link';
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

type Report = {
  slug: string;
  title: string;
  description: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const REPORTS: Report[] = [
  { slug: 'revenue', title: 'Revenue', description: 'Net revenue, gross, fees, and trend over time', Icon: CashDollarIcon },
  { slug: 'funnel', title: 'Recipient funnel', description: 'Sent → Opened → Claimed → Delivered → Opted in → Customer', Icon: ChartFunnelIcon },
  { slug: 'attribution', title: 'Attribution', description: 'Performance by UTM source, medium, and campaign', Icon: ConnectIcon },
  { slug: 'campaigns', title: 'Campaigns', description: 'Per-campaign revenue, claim rate, and ROI', Icon: CalendarIcon },
  { slug: 'cac', title: 'Cost of acquisition', description: 'CAC, ROAS, and payback period by channel', Icon: TargetIcon },
  { slug: 'recipients', title: 'Recipients', description: 'Opt-in rate, LTV, and recipient-to-customer conversion', Icon: PersonAddIcon },
  { slug: 'gifters', title: 'Gifters', description: 'New vs repeat, top buyers, and gifter-level LTV', Icon: PersonIcon },
  { slug: 'email', title: 'Email performance', description: 'Open, click, and click-to-claim rates per email type', Icon: EmailIcon },
  { slug: 'operations', title: 'Operations', description: 'Unclaimed, failed orders, refunds, and time-to-claim', Icon: WrenchIcon },
];

export default function ReportsLandingPage() {
  return (
    <div className={styles.rp}>
      <div className={styles.rpHeader}>
        <div>
          <h1 className={styles.rpTitle}>Reports</h1>
          <p className={styles.rpSubtitle}>View and export reports</p>
        </div>
        <button className={styles.rpCreate}>
          <PlusIcon aria-hidden />
          Create
        </button>
      </div>

      <div className={styles.rpGrid}>
        {REPORTS.map((r) => {
          const Icon = r.Icon;
          return (
            <Link key={r.slug} className={styles.rpCard} href={`/admin-preview/reports/${r.slug}`}>
              <div className={styles.rpCardIcon}><Icon /></div>
              <div className={styles.rpCardTitle}>{r.title}</div>
              <div className={styles.rpCardDesc}>{r.description}</div>
            </Link>
          );
        })}
      </div>

      <div className={styles.rpSection}>
        <div className={styles.rpSectionHeader}>
          <h2 className={styles.rpSectionTitle}>My reports</h2>
          <span className={styles.rpBadge}>Early access</span>
        </div>
        <div className={styles.rpGrid}>
          <Link className={`${styles.rpCard} ${styles.rpCardDashed}`} href="#">
            <div className={styles.rpCardIcon}><PlusIcon aria-hidden /></div>
            <div className={styles.rpCardTitle}>Create a report</div>
            <div className={styles.rpCardDesc}>Build a custom dashboard for your data</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import styles from './reports.module.css';

/* ─── Icons ──────────────────────────────────────────────────────────── */

function DollarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="12" y1="2" x2="12" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}
function FunnelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}
function LinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}
function PiggyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M2 9v2a2 2 0 0 0 2 2h1l2 6h3v-3h4v3h3l1-4h2v-3a4 4 0 0 0-4-4h-7a5 5 0 0 0-5 1z" />
      <circle cx="15" cy="11" r="1" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11" />
    </svg>
  );
}
function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  );
}
function WrenchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M14.7 6.3a4 4 0 1 1 5.7 5.7l-1.4 1.4-5.7-5.7 1.4-1.4zM13 8L4 17v3h3l9-9-3-3z" />
    </svg>
  );
}

type Report = {
  slug: string;
  title: string;
  description: string;
  Icon: React.ComponentType;
};

const REPORTS: Report[] = [
  { slug: 'revenue', title: 'Revenue', description: 'Net revenue, gross, fees, and trend over time', Icon: DollarIcon },
  { slug: 'funnel', title: 'Recipient funnel', description: 'Sent → Opened → Claimed → Delivered → Opted in → Customer', Icon: FunnelIcon },
  { slug: 'attribution', title: 'Attribution', description: 'Performance by UTM source, medium, and campaign', Icon: LinkIcon },
  { slug: 'campaigns', title: 'Campaigns', description: 'Per-campaign revenue, claim rate, and ROI', Icon: CalendarIcon },
  { slug: 'cac', title: 'Cost of acquisition', description: 'CAC, ROAS, and payback period by channel', Icon: PiggyIcon },
  { slug: 'recipients', title: 'Recipients', description: 'Opt-in rate, LTV, and recipient-to-customer conversion', Icon: UsersIcon },
  { slug: 'gifters', title: 'Gifters', description: 'New vs repeat, top buyers, and gifter-level LTV', Icon: PersonIcon },
  { slug: 'email', title: 'Email performance', description: 'Open, click, and click-to-claim rates per email type', Icon: MailIcon },
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
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 5v14M5 12h14" />
          </svg>
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
            <div className={styles.rpCardIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <div className={styles.rpCardTitle}>Create a report</div>
            <div className={styles.rpCardDesc}>Build a custom dashboard for your data</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

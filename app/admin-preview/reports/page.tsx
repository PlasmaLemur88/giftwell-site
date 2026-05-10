'use client';

import Link from 'next/link';

type Report = {
  slug: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  priority: 'P0' | 'P1' | 'P2';
};

const REPORTS: Report[] = [
  {
    slug: 'revenue',
    title: 'Revenue',
    description: 'Net revenue, gross, fees, and trend over time',
    icon: <DollarIcon />,
    priority: 'P0',
  },
  {
    slug: 'funnel',
    title: 'Recipient funnel',
    description: 'Sent → Opened → Claimed → Delivered → Opted in → Customer',
    icon: <FunnelIcon />,
    priority: 'P0',
  },
  {
    slug: 'attribution',
    title: 'Attribution',
    description: 'Performance by UTM source, medium, and campaign',
    icon: <LinkIcon />,
    priority: 'P1',
  },
  {
    slug: 'campaigns',
    title: 'Campaigns',
    description: 'Per-campaign revenue, claim rate, and ROI',
    icon: <CalendarIcon />,
    priority: 'P1',
  },
  {
    slug: 'cac',
    title: 'Cost of acquisition',
    description: 'CAC, ROAS, and payback period by channel',
    icon: <PiggyIcon />,
    priority: 'P1',
  },
  {
    slug: 'recipients',
    title: 'Recipients',
    description: 'Opt-in rate, LTV, and recipient-to-customer conversion',
    icon: <UsersIcon />,
    priority: 'P0',
  },
  {
    slug: 'gifters',
    title: 'Gifters',
    description: 'New vs repeat, top buyers, and gifter-level LTV',
    icon: <PersonIcon />,
    priority: 'P0',
  },
  {
    slug: 'email',
    title: 'Email performance',
    description: 'Open, click, and click-to-claim rates per email type',
    icon: <MailIcon />,
    priority: 'P2',
  },
  {
    slug: 'operations',
    title: 'Operations',
    description: 'Unclaimed, failed orders, refunds, and time-to-claim',
    icon: <WrenchIcon />,
    priority: 'P0',
  },
];

export default function ReportsLandingPage() {
  return (
    <div className="rp">
      <div className="rp-header">
        <div>
          <h1 className="rp-title">Reports</h1>
          <p className="rp-subtitle">View and export reports</p>
        </div>
        <button className="rp-create">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 5v14M5 12h14" />
          </svg>
          Create
        </button>
      </div>

      <div className="rp-grid">
        {REPORTS.map((r) => (
          <Link key={r.slug} className="rp-card" href={`/admin-preview/reports/${r.slug}`}>
            <div className="rp-card-icon">{r.icon}</div>
            <div className="rp-card-title">{r.title}</div>
            <div className="rp-card-desc">{r.description}</div>
          </Link>
        ))}
      </div>

      <div className="rp-section">
        <div className="rp-section-header">
          <h2 className="rp-section-title">My reports</h2>
          <span className="rp-badge">Early access</span>
        </div>
        <div className="rp-grid">
          <Link className="rp-card rp-card-dashed" href="#">
            <div className="rp-card-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 5v14M5 12h14" />
              </svg>
            </div>
            <div className="rp-card-title">Create a report</div>
            <div className="rp-card-desc">Build a custom dashboard for your data</div>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .rp {
          padding: 28px 32px 40px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .rp-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
        }
        .rp-title {
          font-size: 26px;
          font-weight: 700;
          color: #111;
          margin: 0 0 4px;
          letter-spacing: -0.01em;
        }
        .rp-subtitle {
          font-size: 14px;
          color: #6b6b73;
          margin: 0;
        }
        .rp-create {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 16px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 500;
          background: #111;
          color: #fff;
          border: none;
          cursor: pointer;
          transition: background 120ms ease;
        }
        .rp-create:hover { background: #2a2a30; }

        .rp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        @media (max-width: 900px) {
          .rp-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .rp-grid { grid-template-columns: 1fr; }
        }

        .rp-card {
          background: #fff;
          border: 1px solid #ececef;
          border-radius: 14px;
          padding: 22px 24px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          text-decoration: none;
          color: inherit;
          transition: border-color 120ms ease, transform 120ms ease, box-shadow 120ms ease;
        }
        .rp-card:hover {
          border-color: #d6d6db;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px -6px rgba(15, 15, 25, 0.08);
        }
        .rp-card-icon {
          width: 32px;
          height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #111;
          margin-bottom: 6px;
        }
        .rp-card-icon :global(svg) {
          width: 22px;
          height: 22px;
        }
        .rp-card-title {
          font-size: 15.5px;
          font-weight: 600;
          color: #111;
          margin: 0;
        }
        .rp-card-desc {
          font-size: 13px;
          color: #6b6b73;
          line-height: 1.45;
        }
        .rp-card-dashed {
          border-style: dashed;
          border-color: #d6d6db;
          background: transparent;
        }
        .rp-card-dashed:hover {
          background: #fff;
          border-style: solid;
        }

        .rp-section {
          margin-top: 40px;
        }
        .rp-section-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .rp-section-title {
          font-size: 17px;
          font-weight: 600;
          color: #111;
          margin: 0;
        }
        .rp-badge {
          font-size: 11.5px;
          color: #5c4dff;
          background: #f0eefe;
          padding: 3px 8px;
          border-radius: 999px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}

/* ─── Icons ───────────────────────────────────────────────────────────── */

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

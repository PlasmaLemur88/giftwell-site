'use client';

import Link from 'next/link';
import { use } from 'react';

const TITLES: Record<string, { title: string; description: string }> = {
  revenue: { title: 'Revenue', description: 'Net revenue, gross, fees, and trend over time' },
  funnel: { title: 'Recipient funnel', description: 'Sent → Opened → Claimed → Delivered → Opted in → Customer' },
  attribution: { title: 'Attribution', description: 'Performance by UTM source, medium, and campaign' },
  campaigns: { title: 'Campaigns', description: 'Per-campaign revenue, claim rate, and ROI' },
  cac: { title: 'Cost of acquisition', description: 'CAC, ROAS, and payback period by channel' },
  recipients: { title: 'Recipients', description: 'Opt-in rate, LTV, and recipient-to-customer conversion' },
  gifters: { title: 'Gifters', description: 'New vs repeat, top buyers, and gifter-level LTV' },
  email: { title: 'Email performance', description: 'Open, click, and click-to-claim rates per email type' },
  operations: { title: 'Operations', description: 'Unclaimed, failed orders, refunds, and time-to-claim' },
};

export default function ReportDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const meta = TITLES[slug] ?? { title: slug, description: 'Report' };

  return (
    <div className="rd">
      <Link href="/admin-preview/reports" className="rd-back">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Reports
      </Link>
      <div className="rd-header">
        <div>
          <h1 className="rd-title">{meta.title}</h1>
          <p className="rd-subtitle">{meta.description}</p>
        </div>
        <div className="rd-actions">
          <button className="rd-pill">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M3 10h18M8 3v4M16 3v4" />
            </svg>
            Last 30 days
          </button>
          <button className="rd-pill">Export</button>
        </div>
      </div>

      <div className="rd-placeholder">
        <div className="rd-placeholder-icon">📊</div>
        <div className="rd-placeholder-title">Report layout coming next</div>
        <div className="rd-placeholder-text">
          This page will host the {meta.title.toLowerCase()} drill-down. Chart cards,
          breakdown tables, and slicers in the Alia/Shopify-native style we agreed on.
        </div>
        <Link href="/admin-preview/reports" className="rd-placeholder-link">
          ← Back to all reports
        </Link>
      </div>

      <style jsx>{`
        .rd {
          padding-top: 12px;
        }
        .rd-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #5c4dff;
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          margin-bottom: 16px;
        }
        .rd-back:hover { text-decoration: underline; }
        .rd-header {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 28px;
        }
        .rd-title {
          font-size: 26px;
          font-weight: 700;
          color: #111;
          margin: 0 0 4px;
          letter-spacing: -0.01em;
        }
        .rd-subtitle {
          font-size: 14px;
          color: #6b6b73;
          margin: 0;
        }
        .rd-actions { display: flex; gap: 8px; }
        .rd-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 12px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          background: #fff;
          border: 1px solid #ececef;
          color: #111;
          cursor: pointer;
        }
        .rd-pill:hover { background: #f5f5f7; }

        .rd-placeholder {
          background: #fff;
          border: 1px dashed #d6d6db;
          border-radius: 14px;
          padding: 80px 24px;
          text-align: center;
        }
        .rd-placeholder-icon { font-size: 40px; margin-bottom: 16px; }
        .rd-placeholder-title {
          font-size: 17px;
          font-weight: 600;
          color: #111;
          margin-bottom: 6px;
        }
        .rd-placeholder-text {
          font-size: 14px;
          color: #6b6b73;
          max-width: 480px;
          margin: 0 auto 18px;
          line-height: 1.55;
        }
        .rd-placeholder-link {
          color: #5c4dff;
          font-size: 13.5px;
          font-weight: 500;
          text-decoration: none;
        }
        .rd-placeholder-link:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
}

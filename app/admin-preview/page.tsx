'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  GiftCardIcon,
  GiftCardFilledIcon,
  PersonIcon,
  CheckCircleIcon,
  EmailNewsletterIcon,
  CashDollarIcon,
  DeliveryIcon,
  PackageFulfilledIcon,
} from '@shopify/polaris-icons';
import { InlineSetupCard } from './components/InlineSetupCard';
import { AnnouncementCard } from './components/AnnouncementCard';
import { AtAGlance } from './components/AtAGlance';

type IconComp = React.ComponentType<React.SVGProps<SVGSVGElement>>;
type Metric = {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
  Icon: IconComp;
  spark: number[];
  href: string;
};

const METRICS: Metric[] = [
  { label: 'Gifts ordered',       value: '1,284',   delta: '+18.2%', positive: true, Icon: GiftCardIcon,    spark: [62, 68, 70, 78, 84, 92, 96, 104, 110, 118, 124, 132],         href: '/admin-preview/orders' },
  { label: 'Active gifters',      value: '92',      delta: '+12.5%', positive: true, Icon: PersonIcon,      spark: [70, 72, 74, 76, 78, 80, 82, 84, 86, 88, 90, 92],              href: '/admin-preview/reports/gifters' },
  { label: 'Recipients claimed',  value: '812',     delta: '+14.8%', positive: true, Icon: CheckCircleIcon, spark: [38, 44, 48, 52, 58, 62, 66, 72, 76, 82, 88, 94],              href: '/admin-preview/reports/funnel' },
  { label: 'Gift revenue',        value: '$24,180', delta: '+18.0%', positive: true, Icon: CashDollarIcon,  spark: [1100, 1240, 1280, 1420, 1540, 1680, 1820, 1980, 2120, 2280, 2380, 2510], href: '/admin-preview/reports/revenue' },
];

type OrderStatus = 'Delivered' | 'Shipped' | 'Claimed' | 'Pending';
type Order = { id: string; name: string; count: number; status: OrderStatus };

const RECENT_ORDERS: Order[] = [
  { id: '33931', name: 'Tom Reyes',    count:  1, status: 'Delivered' },
  { id: '33912', name: 'Sarah Chen',   count:  2, status: 'Shipped'   },
  { id: '32445', name: 'Priya Patel',  count: 12, status: 'Delivered' },
  { id: '32702', name: 'Marcus Liu',   count:  4, status: 'Pending'   },
];

type Activity = { Icon: IconComp; text: string; time: string; href: string };

const RECENT_ACTIVITY: Activity[] = [
  { Icon: GiftCardFilledIcon,   text: 'Tom Reyes placed a new order',          time: '2m ago',  href: '/admin-preview/orders/33931' },
  { Icon: EmailNewsletterIcon,  text: 'Avery Stone opened her gift',           time: '14m ago', href: '/admin-preview/orders/33912' },
  { Icon: DeliveryIcon,         text: 'Order #32445 shipped to 12 recipients', time: '1h ago',  href: '/admin-preview/orders/32445' },
  { Icon: GiftCardFilledIcon,   text: 'Maya Greene picked Bath Salts',         time: '2h ago',  href: '/admin-preview/orders/33912' },
  { Icon: PackageFulfilledIcon, text: 'Order #33931 delivered',                time: '3h ago',  href: '/admin-preview/orders/33931' },
  { Icon: EmailNewsletterIcon,  text: 'Diego Rivera subscribed to Acme Store', time: '4h ago',  href: '/admin-preview/orders/32445' },
];

function Sparkline({ data }: { data: number[] }) {
  const w = 200;
  const h = 36;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - 2 - ((v - min) / range) * (h - 4);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return (
    <svg className="metric-spark" width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden>
      <polyline
        fill="none"
        stroke="#5C6AC4"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        points={points.join(' ')}
      />
    </svg>
  );
}

export default function DashboardPage() {
  const [setupComplete, setSetupComplete] = useState(false);

  return (
    <>
      <div className="dash">
        {setupComplete && (
          <div className="dash-reset">
            <button
              className="dash-link"
              onClick={() => setSetupComplete(false)}
            >
              Reset setup (preview)
            </button>
          </div>
        )}

        {setupComplete ? (
          <AnnouncementCard />
        ) : (
          <InlineSetupCard onComplete={() => setSetupComplete(true)} />
        )}

        <div className="dash-section">
          <div className="dash-section-header">
            <h2 className="dash-section-title">Analytics</h2>
            <div className="dash-section-actions">
              <button className="dash-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M3 10h18M8 3v4M16 3v4" />
                </svg>
                Last 30 days <span className="dash-pill-sub">May 9 – Jun 8</span>
              </button>
              <button className="dash-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M3 8h13l-3-3M21 16H8l3 3" />
                </svg>
                Compare to
              </button>
              <button className="dash-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
                </svg>
                Settings
              </button>
              <button className="dash-pill dash-pill-icon" aria-label="More">⋯</button>
            </div>
          </div>

          <div className="metric-strip">
            {METRICS.map((m) => {
              const Icon = m.Icon;
              return (
                <Link className="metric-card" key={m.label} href={m.href}>
                  <div className="metric-card-top">
                    <span className="metric-icon" aria-hidden><Icon /></span>
                    <span className={`metric-delta-pill ${m.positive ? 'pos' : 'neg'}`}>
                      {m.delta}
                    </span>
                  </div>
                  <div className="metric-value">{m.value}</div>
                  <div className="metric-label">{m.label}</div>
                  <Sparkline data={m.spark} />
                </Link>
              );
            })}
          </div>
        </div>

        <AtAGlance />

        <div className="dash-grid-2col">
          <section className="panel">
            <div className="panel-header">
              <h3 className="panel-title">Recent orders</h3>
              <Link className="panel-link" href="/admin-preview/orders">View all →</Link>
            </div>
            <ul className="order-list">
              {RECENT_ORDERS.map((o) => (
                <li key={o.id}>
                  <Link href={`/admin-preview/orders/${o.id}`} className="order-row">
                    <span className="order-avatar" aria-hidden>
                      {o.name.charAt(0)}
                    </span>
                    <div className="order-meta">
                      <div className="order-name">{o.name}</div>
                      <div className="order-sub">#{o.id} · {o.count} {o.count === 1 ? 'gift' : 'gifts'}</div>
                    </div>
                    <span className={`status-pill status-${o.status.toLowerCase()}`}>{o.status}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section className="panel">
            <div className="panel-header">
              <h3 className="panel-title">Recent activity</h3>
              <Link className="panel-link" href="/admin-preview/orders">View all →</Link>
            </div>
            <ul className="activity-list">
              {RECENT_ACTIVITY.map((a, i) => {
                const Icon = a.Icon;
                return (
                  <li key={i}>
                    <Link href={a.href} className="activity-row">
                      <span className="activity-icon" aria-hidden><Icon /></span>
                      <span className="activity-text">{a.text}</span>
                      <span className="activity-time">{a.time}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

      </div>

      <style jsx>{`
        .dash {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-top: 12px;
        }
        .dash-reset {
          display: flex;
          justify-content: flex-end;
        }
        .dash-link {
          background: transparent;
          border: none;
          color: #5c4dff;
          font-size: 12.5px;
          font-weight: 500;
          cursor: pointer;
          padding: 6px 4px;
        }
        .dash-link:hover { text-decoration: underline; }

        .dash-section { display: flex; flex-direction: column; gap: 16px; }
        .dash-section-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }
        .dash-section-title {
          font-size: 22px;
          font-weight: 600;
          color: #111;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .dash-section-actions { display: flex; gap: 8px; }

        .dash-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 12px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 500;
          background: #fff;
          border: 1px solid #dcdcde;
          color: #111;
          cursor: pointer;
          transition: background 120ms ease;
        }
        .dash-pill:hover { background: #f5f5f7; }
        .dash-pill-icon { padding: 7px 10px; }
        .dash-pill-sub { color: #8a8a93; font-weight: 400; margin-left: 4px; }

        .metric-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 1080px) { .metric-strip { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 540px) { .metric-strip { grid-template-columns: 1fr; } }

        .metric-card {
          background: #fff;
          border: 1px solid #dcdcde;
          border-radius: 14px;
          padding: 18px 18px 14px;
          box-shadow: 0 1px 2px rgba(15, 15, 25, 0.03);
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 0;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          transition: border-color 120ms ease, transform 120ms ease, box-shadow 120ms ease;
        }
        .metric-card:hover {
          border-color: #c4c4ca;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px -8px rgba(15, 15, 25, 0.12);
        }
        .metric-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        .metric-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: #f5f5f7;
          color: #4a4a52;
        }
        .metric-icon :global(svg) {
          width: 18px;
          height: 18px;
          fill: currentColor;
        }
        .metric-delta-pill {
          display: inline-flex;
          align-items: center;
          padding: 3px 8px;
          border-radius: 999px;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: -0.005em;
        }
        .metric-delta-pill.pos { background: #ECFDF5; color: #047857; }
        .metric-delta-pill.neg { background: #FEF2F2; color: #B91C1C; }
        .metric-value {
          font-size: 26px;
          font-weight: 700;
          color: #111;
          line-height: 1.1;
          letter-spacing: -0.015em;
        }
        .metric-label {
          font-size: 13px;
          color: #6b6b73;
          font-weight: 500;
          margin-bottom: 6px;
        }
        .metric-card :global(.metric-spark) {
          display: block;
          margin-top: auto;
        }

        .dash-grid-2col {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 16px;
        }
        @media (max-width: 900px) { .dash-grid-2col { grid-template-columns: 1fr; } }

        .panel {
          background: #fff;
          border: 1px solid #dcdcde;
          border-radius: 14px;
          padding: 18px 20px;
          box-shadow: 0 1px 2px rgba(15, 15, 25, 0.03);
        }
        .panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .panel-title {
          font-size: 15px;
          font-weight: 600;
          color: #111;
          margin: 0;
          letter-spacing: -0.005em;
        }
        .panel-link {
          font-size: 12.5px;
          color: #5c4dff;
          font-weight: 500;
          text-decoration: none;
        }
        .panel-link:hover { text-decoration: underline; }

        .order-list, .activity-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
        }
        .order-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 0;
          border-top: 1px solid #f0f0f2;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          transition: background 120ms ease;
        }
        .order-row:hover { background: #f9f9fb; }
        .order-list li:first-child .order-row { border-top: none; }
        .order-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #ececef;
          color: #4a4a52;
          font-size: 13px;
          font-weight: 600;
          flex-shrink: 0;
        }
        .order-meta { flex: 1; min-width: 0; }
        .order-name { font-size: 13.5px; font-weight: 500; color: #111; }
        .order-sub { font-size: 12px; color: #8a8a93; margin-top: 1px; }

        .status-pill {
          font-size: 11.5px;
          font-weight: 600;
          padding: 3px 9px;
          border-radius: 999px;
          letter-spacing: -0.005em;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .status-delivered { background: #ECFDF5; color: #047857; }
        .status-shipped   { background: #EFF6FF; color: #1D4ED8; }
        .status-claimed   { background: #F3E8FF; color: #6D28D9; }
        .status-pending   { background: #FEF3C7; color: #92400E; }

        .activity-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 0;
          border-top: 1px solid #f0f0f2;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          transition: background 120ms ease;
        }
        .activity-row:hover { background: #f9f9fb; }
        .activity-list li:first-child .activity-row { border-top: none; }
        .activity-icon {
          width: 26px;
          height: 26px;
          border-radius: 7px;
          background: #f5f5f7;
          color: #4a4a52;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .activity-icon :global(svg) {
          width: 14px;
          height: 14px;
          fill: currentColor;
        }
        .activity-text { flex: 1; font-size: 13px; color: #111; min-width: 0; }
        .activity-time { font-size: 12px; color: #8a8a93; flex-shrink: 0; }

        @media (max-width: 720px) {
          .dash-section-header { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </>
  );
}

'use client';

import { useState } from 'react';
import { InlineSetupCard } from './components/InlineSetupCard';
import { AnnouncementCard } from './components/AnnouncementCard';

type Metric = {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
  range: string;
  spark: number[];
};

const METRICS: Metric[] = [
  { label: 'Gifts sent', value: '1,284', delta: '+18.2%', positive: true, range: 'Last 30 days', spark: [12, 18, 14, 22, 20, 28, 26, 34, 30, 38, 42, 48] },
  { label: 'Recipients claimed', value: '947', delta: '+22.4%', positive: true, range: 'Last 30 days', spark: [8, 12, 10, 16, 14, 22, 24, 28, 26, 32, 36, 40] },
  { label: 'Opt-in rate', value: '64.8%', delta: '+3.1pp', positive: true, range: 'Last 30 days', spark: [55, 58, 56, 60, 59, 62, 63, 64, 63, 65, 66, 65] },
  { label: 'Revenue', value: '$84,210', delta: '+12.7%', positive: true, range: 'Last 30 days', spark: [400, 520, 480, 600, 580, 720, 760, 820, 800, 880, 940, 1020] },
];

const FUNNEL = [
  { label: 'Sent', value: 1284, color: '#7C5CFF' },
  { label: 'Opened', value: 1102, color: '#9A7FFF' },
  { label: 'Claimed', value: 947, color: '#B79CFF' },
  { label: 'Delivered', value: 902, color: '#16A34A' },
];

function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function FilterIcon({ kind }: { kind: 'campaign' | 'bundle' | 'source' | 'channel' }) {
  const common = {
    width: 14,
    height: 14,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  if (kind === 'campaign') return (
    <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></svg>
  );
  if (kind === 'bundle') return (
    <svg {...common}><path d="M3 7l9-4 9 4v10l-9 4-9-4V7z" /><path d="M3 7l9 4 9-4M12 11v10" /></svg>
  );
  if (kind === 'source') return (
    <svg {...common}><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" /></svg>
  );
  return (
    <svg {...common}><rect x="2" y="6" width="20" height="14" rx="2" /><path d="M2 6l10 7 10-7" /></svg>
  );
}

function Sparkline({ data, positive }: { data: number[]; positive: boolean }) {
  const w = 110;
  const h = 32;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stroke = positive ? '#16A34A' : '#DC2626';
  const fill = positive ? 'rgba(22, 163, 74, 0.08)' : 'rgba(220, 38, 38, 0.08)';
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const polyline = points.join(' ');
  const polygon = `0,${h} ${polyline} ${w},${h}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden>
      <polygon points={polygon} fill={fill} />
      <polyline fill="none" stroke={stroke} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" points={polyline} />
    </svg>
  );
}

export default function DashboardPage() {
  const [setupComplete, setSetupComplete] = useState(false);

  return (
    <>
      <div className="dash">
        <div className="dash-header">
          <div>
            <h1 className="dash-title">Dashboard</h1>
            <p className="dash-subtitle">
              Welcome back — here's how Acme Store's gifting is performing
            </p>
          </div>
          {setupComplete && (
            <button
              className="dash-link"
              onClick={() => setSetupComplete(false)}
            >
              Reset setup (preview)
            </button>
          )}
        </div>

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

          <div className="filter-row">
            <span className="filter-label">Add filters</span>
            <button className="filter-pill">
              <FilterIcon kind="campaign" />
              Campaign
              <ChevronDownIcon />
            </button>
            <button className="filter-pill">
              <FilterIcon kind="bundle" />
              Bundle
              <ChevronDownIcon />
            </button>
            <button className="filter-pill">
              <FilterIcon kind="source" />
              Recipient source
              <ChevronDownIcon />
            </button>
            <button className="filter-pill">
              <FilterIcon kind="channel" />
              Channel
              <ChevronDownIcon />
            </button>
          </div>

          <div className="metric-grid">
            {METRICS.map((m) => (
              <div className="metric-card" key={m.label}>
                <div className="metric-top">
                  <span className="metric-label">{m.label}</span>
                  <span className="metric-range">{m.range}</span>
                </div>
                <div className="metric-row">
                  <div>
                    <div className="metric-value">{m.value}</div>
                    <div className={`metric-delta ${m.positive ? 'pos' : 'neg'}`}>
                      {m.delta} vs prior
                    </div>
                  </div>
                  <Sparkline data={m.spark} positive={m.positive} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dash-section">
          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Recipient funnel</h3>
                <p className="card-sub">Last 30 days · How recipients moved through the gift flow</p>
              </div>
              <a className="dash-pill" href="/admin-preview/reports/funnel">View report</a>
            </div>
            <div className="funnel">
              {FUNNEL.map((stage, i) => {
                const max = Math.max(...FUNNEL.map((s) => s.value));
                const pct = (stage.value / max) * 100;
                const conv = i === 0 ? null : ((stage.value / FUNNEL[i - 1].value) * 100).toFixed(1);
                return (
                  <div className="funnel-row" key={stage.label}>
                    <div className="funnel-row-top">
                      <span>
                        <strong>{stage.label}</strong>
                        {conv && <span className="funnel-conv">{conv}% from prior</span>}
                      </span>
                      <span>{stage.value.toLocaleString()}</span>
                    </div>
                    <div className="funnel-bar">
                      <div
                        className="funnel-bar-fill"
                        style={{ width: `${pct}%`, background: stage.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="dash-section">
          <div className="card">
            <div className="card-header">
              <div>
                <h3 className="card-title">Plan usage</h3>
                <p className="card-sub">Pro plan · Resets on Jun 1</p>
              </div>
              <a className="dash-btn dash-btn-primary" href="#">Upgrade plan</a>
            </div>
            <div className="plan-row">
              <div className="plan-row-top">
                <span>Recipients this month</span>
                <span className="plan-row-sub">1,284 / 5,000</span>
              </div>
              <div className="plan-progress">
                <div className="plan-progress-fill" style={{ width: '26%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dash {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding-top: 12px;
        }
        .dash-header {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 4px;
        }
        .dash-title {
          font-size: 26px;
          font-weight: 700;
          color: #111;
          margin: 0 0 4px;
          letter-spacing: -0.01em;
        }
        .dash-subtitle {
          font-size: 14px;
          color: #6b6b73;
          margin: 0;
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

        .dash-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 16px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          border: 1px solid transparent;
          transition: background 120ms ease;
        }
        .dash-btn-primary { background: #111; color: #fff; }
        .dash-btn-primary:hover { background: #2a2a30; }

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
          border: 1px solid #ececef;
          color: #111;
          cursor: pointer;
          transition: background 120ms ease;
        }
        .dash-pill:hover { background: #f5f5f7; }
        .dash-pill-icon { padding: 7px 10px; }
        .dash-pill-sub { color: #8a8a93; font-weight: 400; margin-left: 4px; }

        .filter-row {
          display: grid;
          grid-template-columns: auto repeat(4, 1fr);
          gap: 10px;
          align-items: center;
        }
        .filter-label {
          font-size: 13px;
          color: #6b6b73;
          padding: 0 4px;
        }
        .filter-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 14px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 500;
          background: #fff;
          border: 1px solid #ececef;
          color: #111;
          cursor: pointer;
          transition: background 120ms ease;
          width: 100%;
          text-align: left;
        }
        .filter-pill :global(svg) { color: #6b6b73; flex-shrink: 0; }
        .filter-pill :global(svg:last-child) { margin-left: auto; }
        .filter-pill:hover { background: #f5f5f7; }

        @media (max-width: 900px) {
          .filter-row { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 540px) {
          .filter-row { grid-template-columns: 1fr; }
        }

        .metric-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        @media (max-width: 760px) { .metric-grid { grid-template-columns: 1fr; } }

        .metric-card {
          background: #fff;
          border: 1px solid #ececef;
          border-radius: 14px;
          padding: 18px 20px;
        }
        .metric-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .metric-label { font-size: 13px; color: #6b6b73; font-weight: 500; }
        .metric-range {
          font-size: 11px;
          color: #8a8a93;
          background: #f5f5f7;
          padding: 3px 8px;
          border-radius: 6px;
        }
        .metric-row {
          display: flex;
          align-items: end;
          justify-content: space-between;
          gap: 12px;
        }
        .metric-value {
          font-size: 28px;
          font-weight: 700;
          color: #111;
          line-height: 1.1;
          letter-spacing: -0.01em;
        }
        .metric-delta { font-size: 12.5px; margin-top: 4px; font-weight: 500; }
        .metric-delta.pos { color: #16A34A; }
        .metric-delta.neg { color: #DC2626; }

        .card {
          background: #fff;
          border: 1px solid #ececef;
          border-radius: 14px;
          padding: 22px 24px;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 16px;
          margin-bottom: 18px;
        }
        .card-title { font-size: 16px; font-weight: 600; color: #111; margin: 0 0 2px; }
        .card-sub { font-size: 13px; color: #6b6b73; margin: 0; }

        .funnel { display: flex; flex-direction: column; gap: 14px; }
        .funnel-row-top {
          display: flex;
          justify-content: space-between;
          font-size: 13.5px;
          margin-bottom: 6px;
          color: #111;
        }
        .funnel-row-top strong { font-weight: 600; }
        .funnel-conv { margin-left: 10px; color: #8a8a93; font-size: 12.5px; font-weight: 400; }
        .funnel-bar { background: #f5f5f7; border-radius: 6px; height: 10px; overflow: hidden; }
        .funnel-bar-fill { height: 100%; border-radius: 6px; transition: width 200ms ease; }

        .plan-row-top {
          display: flex;
          justify-content: space-between;
          font-size: 13.5px;
          color: #111;
          margin-bottom: 8px;
        }
        .plan-row-sub { color: #8a8a93; }
        .plan-progress {
          width: 100%;
          height: 6px;
          background: #f5f5f7;
          border-radius: 6px;
          overflow: hidden;
        }
        .plan-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #7C5CFF, #A855F7);
          border-radius: 6px;
        }

        @media (max-width: 720px) {
          .dash-section-header { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </>
  );
}

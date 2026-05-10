'use client';

import { useState } from 'react';
import { InlineSetupCard } from './components/InlineSetupCard';
import { AnnouncementCard } from './components/AnnouncementCard';

type MetricIcon = 'gift' | 'percent' | 'mail' | 'dollar';
type Metric = {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
  icon: MetricIcon;
  spark: number[];
};

const METRICS: Metric[] = [
  { label: 'Gifts sent', value: '1,284', delta: '+18.2%', positive: true, icon: 'gift', spark: [12, 18, 14, 22, 20, 28, 26, 34, 30, 38, 42, 48] },
  { label: 'Opt-in rate', value: '64.8%', delta: '+3.1pp', positive: true, icon: 'percent', spark: [55, 58, 56, 60, 59, 62, 63, 64, 63, 65, 66, 65] },
  { label: 'New subscribers', value: '612', delta: '+28.5%', positive: true, icon: 'mail', spark: [8, 12, 10, 18, 22, 28, 32, 40, 38, 48, 52, 60] },
  { label: 'Revenue', value: '$84,210', delta: '+12.7%', positive: true, icon: 'dollar', spark: [400, 520, 480, 600, 580, 720, 760, 820, 800, 880, 940, 1020] },
];

const FUNNEL = [
  { label: 'Sent', value: 1284, color: '#7C5CFF' },
  { label: 'Opened', value: 1102, color: '#9A7FFF' },
  { label: 'Claimed', value: 947, color: '#B79CFF' },
  { label: 'Delivered', value: 902, color: '#16A34A' },
];

function MetricIconGlyph({ icon }: { icon: MetricIcon }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  if (icon === 'gift') return (
    <svg {...common}><rect x="3" y="8" width="18" height="13" rx="1.5" /><path d="M3 12h18M12 8v13M8 8a2.5 2.5 0 1 1 0-5c1.8 0 3 2 4 5 1-3 2.2-5 4-5a2.5 2.5 0 1 1 0 5" /></svg>
  );
  if (icon === 'percent') return (
    <svg {...common}><line x1="19" y1="5" x2="5" y2="19" /><circle cx="7" cy="7" r="2.5" /><circle cx="17" cy="17" r="2.5" /></svg>
  );
  if (icon === 'mail') return (
    <svg {...common}><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 7l10 7 10-7" /></svg>
  );
  return (
    <svg {...common}><line x1="12" y1="2" x2="12" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
  );
}

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
            {METRICS.map((m) => (
              <div className="metric-card" key={m.label}>
                <div className="metric-card-top">
                  <span className="metric-icon" aria-hidden>
                    <MetricIconGlyph icon={m.icon} />
                  </span>
                  <span className={`metric-delta-pill ${m.positive ? 'pos' : 'neg'}`}>
                    {m.delta}
                  </span>
                </div>
                <div className="metric-value">{m.value}</div>
                <div className="metric-label">{m.label}</div>
                <Sparkline data={m.spark} />
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
          color: #5c5c66;
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

        .card {
          background: #fff;
          border: 1px solid #dcdcde;
          border-radius: 14px;
          padding: 22px 24px;
          box-shadow: 0 1px 2px rgba(15, 15, 25, 0.03);
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

        @media (max-width: 720px) {
          .dash-section-header { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </>
  );
}

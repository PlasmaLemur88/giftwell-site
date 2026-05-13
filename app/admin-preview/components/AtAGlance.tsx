'use client';

import Link from 'next/link';

const ACCENT = '#7C5CFF';
const ACCENT_SOFT = 'rgba(124, 92, 255, 0.14)';
const NEUTRAL = '#C4C6CC';

const CARD_STYLE: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #dcdcde',
  borderRadius: 14,
  padding: '16px 16px 14px',
  boxShadow: '0 1px 2px rgba(15, 15, 25, 0.03)',
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  minWidth: 0,
  textDecoration: 'none',
  color: 'inherit',
  cursor: 'pointer',
  transition: 'border-color 120ms ease, transform 120ms ease, box-shadow 120ms ease',
};

const LABEL_STYLE: React.CSSProperties = {
  fontSize: 12.5,
  color: '#6b6b73',
  fontWeight: 500,
  letterSpacing: '-0.005em',
  marginBottom: 8,
};

const HEADLINE_STYLE: React.CSSProperties = {
  fontSize: 24,
  fontWeight: 700,
  color: '#111',
  lineHeight: 1.1,
  letterSpacing: '-0.015em',
};

const SECONDARY_STYLE: React.CSSProperties = {
  fontSize: 12.5,
  color: '#6b6b73',
  lineHeight: 1.4,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  flexWrap: 'wrap',
  marginTop: 4,
};

const VIZ_STYLE: React.CSSProperties = {
  marginTop: 12,
  height: 38,
  display: 'flex',
  alignItems: 'flex-end',
};

type CardProps = {
  href: string;
  label: string;
  headline: string;
  secondary: React.ReactNode;
  viz: React.ReactNode;
};

function GlanceCard({ href, label, headline, secondary, viz }: CardProps) {
  return (
    <Link href={href} style={CARD_STYLE} className="glance-card">
      <div style={LABEL_STYLE}>{label}</div>
      <div style={HEADLINE_STYLE}>{headline}</div>
      <div style={SECONDARY_STYLE}>{secondary}</div>
      <div style={VIZ_STYLE}>{viz}</div>
    </Link>
  );
}

function DeltaBadge({ tone, children }: { tone: 'success' | 'critical' | 'neutral'; children: React.ReactNode }) {
  const colors = {
    success:  { bg: '#ECFDF5', fg: '#047857' },
    critical: { bg: '#FEF2F2', fg: '#B91C1C' },
    neutral:  { bg: '#F3F3F5', fg: '#5a5a62' },
  }[tone];
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '2px 7px',
      borderRadius: 999,
      fontSize: 11.5,
      fontWeight: 600,
      letterSpacing: '-0.005em',
      background: colors.bg,
      color: colors.fg,
      flexShrink: 0,
    }}>
      {children}
    </span>
  );
}

/* ─── Mini-viz primitives ─── */

function Sparkline({ data, height = 38 }: { data: number[]; height?: number }) {
  const w = 220;
  const h = height;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - 2 - ((v - min) / range) * (h - 4);
    return [x, y] as const;
  });
  const pointStr = points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const areaStr = `M 0,${h} L ${pointStr.replaceAll(' ', ' L ')} L ${w},${h} Z`;
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden style={{ display: 'block' }}>
      <path d={areaStr} fill={ACCENT_SOFT} />
      <polyline
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        points={pointStr}
      />
    </svg>
  );
}

function DualSparkline({ primary, secondary, height = 38 }: { primary: number[]; secondary: number[]; height?: number }) {
  const w = 220;
  const h = height;
  const all = [...primary, ...secondary];
  const min = Math.min(...all);
  const max = Math.max(...all);
  const range = max - min || 1;
  const toPts = (data: number[]) =>
    data
      .map((v, i) => {
        const x = (i / (data.length - 1)) * w;
        const y = h - 2 - ((v - min) / range) * (h - 4);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden style={{ display: 'block' }}>
      <polyline
        fill="none"
        stroke={NEUTRAL}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        points={toPts(secondary)}
      />
      <polyline
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        points={toPts(primary)}
      />
    </svg>
  );
}

function VerticalBars({ values, height = 38 }: { values: number[]; height?: number }) {
  const w = 220;
  const h = height;
  const max = Math.max(...values) || 1;
  const gap = 4;
  const barW = (w - gap * (values.length - 1)) / values.length;
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden style={{ display: 'block' }}>
      {values.map((v, i) => {
        const barH = Math.max(2, (v / max) * (h - 2));
        const x = i * (barW + gap);
        const y = h - barH;
        const isMax = v === max;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barW}
            height={barH}
            rx={2}
            fill={isMax ? ACCENT : ACCENT_SOFT}
          />
        );
      })}
    </svg>
  );
}

function FunnelBars({ values, height = 38 }: { values: number[]; height?: number }) {
  const w = 220;
  const h = height;
  const max = Math.max(...values) || 1;
  const rowH = (h - (values.length - 1) * 2) / values.length;
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden style={{ display: 'block' }}>
      {values.map((v, i) => {
        const barW = (v / max) * w;
        const y = i * (rowH + 2);
        const alpha = 1 - i * 0.15;
        return (
          <rect
            key={i}
            x={0}
            y={y}
            width={barW}
            height={rowH}
            rx={2}
            fill={ACCENT}
            opacity={alpha}
          />
        );
      })}
    </svg>
  );
}

function CompareBars({ target, actual, height = 38 }: { target: number; actual: number; height?: number }) {
  const w = 220;
  const h = height;
  const max = Math.max(target, actual);
  const rowH = (h - 8) / 2;
  const targetW = (target / max) * w;
  const actualW = (actual / max) * w;
  const better = actual <= target;
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden style={{ display: 'block' }}>
      <rect x={0} y={0} width={targetW} height={rowH} rx={2} fill={NEUTRAL} />
      <rect
        x={0}
        y={rowH + 8}
        width={actualW}
        height={rowH}
        rx={2}
        fill={better ? '#1F8A4C' : '#E04F4F'}
      />
    </svg>
  );
}

function Donut({ percent, height = 38 }: { percent: number; height?: number }) {
  const size = height;
  const stroke = 6;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const filled = (percent / 100) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden style={{ overflow: 'visible', display: 'block' }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={ACCENT_SOFT}
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={ACCENT}
        strokeWidth={stroke}
        strokeDasharray={`${filled} ${c}`}
        strokeDashoffset={c / 4}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}

/* ─── Section ─── */

export function AtAGlance() {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{
          fontSize: 17,
          fontWeight: 600,
          color: '#111',
          margin: 0,
          letterSpacing: '-0.005em',
        }}>
          At a glance
        </h2>
        <Link href="/admin-preview/reports" style={{
          fontSize: 12.5,
          color: '#5c4dff',
          fontWeight: 500,
          textDecoration: 'none',
        }}>
          View all reports →
        </Link>
      </div>

      <div className="aag-grid">
        <GlanceCard
          href="/admin-preview/reports/revenue"
          label="Money from gifting"
          headline="$24,180"
          secondary={<><DeltaBadge tone="success">+18%</DeltaBadge> vs last 30 days</>}
          viz={<Sparkline data={[420, 480, 460, 540, 580, 620, 680, 740, 720, 820, 880, 960]} />}
        />

        <GlanceCard
          href="/admin-preview/reports/funnel"
          label="Recipient claim rate"
          headline="64%"
          secondary={<>412 of 645 gifts claimed</>}
          viz={<FunnelBars values={[100, 88, 64, 60, 41]} />}
        />

        <GlanceCard
          href="/admin-preview/reports/campaigns"
          label="Top campaign"
          headline="Mother's Day '26"
          secondary={<>$8,420 · 72% claim rate</>}
          viz={<VerticalBars values={[42, 58, 84, 36, 48, 22]} />}
        />

        <GlanceCard
          href="/admin-preview/reports/cac"
          label="Cost per customer"
          headline="$11.40"
          secondary={<><DeltaBadge tone="success">$3.20 under target</DeltaBadge></>}
          viz={<CompareBars target={14.6} actual={11.4} />}
        />

        <GlanceCard
          href="/admin-preview/reports/recipients"
          label="Recipients who buy"
          headline="23%"
          secondary={<>94 of 412 became customers</>}
          viz={<Donut percent={23} />}
        />

        <GlanceCard
          href="/admin-preview/reports/email"
          label="Email engagement"
          headline="52% open rate"
          secondary={<>28% click-to-claim</>}
          viz={<DualSparkline
            primary={[28, 30, 32, 30, 34, 33, 36, 35, 38, 40, 38, 42]}
            secondary={[48, 50, 51, 50, 52, 52, 53, 52, 54, 53, 54, 55]}
          />}
        />
      </div>

      <style jsx>{`
        .aag-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        @media (max-width: 1080px) { .aag-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 540px)  { .aag-grid { grid-template-columns: 1fr; } }
        :global(.glance-card:hover) {
          border-color: #c4c4ca !important;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px -8px rgba(15, 15, 25, 0.12) !important;
        }
      `}</style>
    </section>
  );
}

'use client';

import Link from 'next/link';

const ACCENT = '#7C5CFF';
const ACCENT_SOFT = 'rgba(124, 92, 255, 0.14)';
const ACCENT_MID = 'rgba(124, 92, 255, 0.55)';
const NEUTRAL = '#C4C6CC';
const WARNING = '#E0A23E';

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

function DeltaBadge({ tone, children }: { tone: 'success' | 'critical' | 'attention' | 'neutral'; children: React.ReactNode }) {
  const colors = {
    success:   { bg: '#ECFDF5', fg: '#047857' },
    critical:  { bg: '#FEF2F2', fg: '#B91C1C' },
    attention: { bg: '#FFF7E6', fg: '#92590B' },
    neutral:   { bg: '#F3F3F5', fg: '#5a5a62' },
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

function VerticalBars({ values, highlightIndex, height = 38 }: { values: number[]; highlightIndex?: number; height?: number }) {
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
        const hi = highlightIndex !== undefined ? i === highlightIndex : v === max;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barW}
            height={barH}
            rx={2}
            fill={hi ? ACCENT : ACCENT_SOFT}
          />
        );
      })}
    </svg>
  );
}

function LabeledFunnel({ stages, height = 38 }: { stages: { label: string; value: number }[]; height?: number }) {
  const w = 220;
  const h = height;
  const max = Math.max(...stages.map((s) => s.value)) || 1;
  const rowH = (h - (stages.length - 1) * 1.5) / stages.length;
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden style={{ display: 'block' }}>
      {stages.map((s, i) => {
        const barW = (s.value / max) * w;
        const y = i * (rowH + 1.5);
        const alpha = 1 - i * 0.15;
        return (
          <rect
            key={i}
            x={0}
            y={y}
            width={barW}
            height={rowH}
            rx={1.5}
            fill={ACCENT}
            opacity={alpha}
          />
        );
      })}
    </svg>
  );
}

function ComparePair({ prior, current, height = 38 }: { prior: number; current: number; height?: number }) {
  const w = 220;
  const h = height;
  const max = Math.max(prior, current);
  const barW = (w - 14) / 2;
  const priorH = (prior / max) * (h - 2);
  const currentH = (current / max) * (h - 2);
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden style={{ display: 'block' }}>
      <rect x={0} y={h - priorH} width={barW} height={priorH} rx={2} fill={ACCENT_SOFT} />
      <rect x={barW + 14} y={h - currentH} width={barW} height={currentH} rx={2} fill={ACCENT} />
    </svg>
  );
}

function StuckBar({ claimedPct, inFlightPct, stuckPct, height = 38 }: {
  claimedPct: number;
  inFlightPct: number;
  stuckPct: number;
  height?: number;
}) {
  const w = 220;
  const h = 10;
  const yOffset = (height - h) / 2;
  const claimedW = (claimedPct / 100) * w;
  const inFlightW = (inFlightPct / 100) * w;
  const stuckW = (stuckPct / 100) * w;
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${w} ${height}`} preserveAspectRatio="none" aria-hidden style={{ display: 'block' }}>
      <rect x={0}                       y={yOffset} width={claimedW}  height={h} rx={3} ry={3} fill={ACCENT_SOFT} />
      <rect x={claimedW}                y={yOffset} width={inFlightW} height={h}             fill={NEUTRAL}    opacity={0.35} />
      <rect x={claimedW + inFlightW}    y={yOffset} width={stuckW}    height={h} rx={3} ry={3} fill={WARNING} />
    </svg>
  );
}

function BigDonut({ percent, size = 80 }: { percent: number; size?: number }) {
  const stroke = 9;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const filled = (percent / 100) * c;
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden style={{ display: 'block' }}>
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
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 19,
        fontWeight: 700,
        color: '#111',
        letterSpacing: '-0.015em',
      }}>
        {percent}%
      </div>
    </div>
  );
}

/* ─── Recipients-who-buy card with hero donut ─── */

function RecipientsCard() {
  return (
    <Link href="/admin-preview/reports/recipients" style={CARD_STYLE} className="glance-card">
      <div style={LABEL_STYLE}>Recipients who buy</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 4, flex: 1 }}>
        <BigDonut percent={23} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>
            187 of 812 became customers
          </div>
          <div style={{ fontSize: 11.5, color: '#8a8a93', lineHeight: 1.4 }}>
            within 30 days of claiming
          </div>
          <div style={{ marginTop: 2 }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '2px 7px',
              borderRadius: 999,
              fontSize: 11.5,
              fontWeight: 600,
              background: '#ECFDF5',
              color: '#047857',
            }}>
              +2.4pp
            </span>
          </div>
        </div>
      </div>
    </Link>
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
          href="/admin-preview/reports/funnel"
          label="Recipient claim rate"
          headline="63%"
          secondary={<>812 of 1,284 claimed within 30 days</>}
          viz={
            <LabeledFunnel stages={[
              { label: 'Sent',       value: 1284 },
              { label: 'Opened',     value: 1130 },
              { label: 'Picked',     value: 938 },
              { label: 'Delivered',  value: 812 },
              { label: 'Subscribed', value: 526 },
            ]} />
          }
        />

        <GlanceCard
          href="/admin-preview/reports/gifters"
          label="Repeat gifter rate"
          headline="38%"
          secondary={<><DeltaBadge tone="success">+6pp</DeltaBadge> 35 of 92 ordered again in 90 days</>}
          viz={<ComparePair prior={32} current={38} />}
        />

        <GlanceCard
          href="/admin-preview/reports/campaigns"
          label="Top campaign by revenue"
          headline="Mother's Day '26"
          secondary={<>$8,420 · 72% claim rate</>}
          viz={<VerticalBars values={[42, 58, 84, 36, 48, 22]} highlightIndex={2} />}
        />

        <RecipientsCard />

        <GlanceCard
          href="/admin-preview/reports/email"
          label="Email open rate"
          headline="52%"
          secondary={<><DeltaBadge tone="success">+4pp</DeltaBadge> across all 9 emails</>}
          viz={<Sparkline data={[44, 46, 45, 47, 48, 49, 49, 50, 51, 51, 52, 52]} />}
        />

        <GlanceCard
          href="/admin-preview/reports/operations"
          label="Unclaimed gifts"
          headline="$2,486 stuck"
          secondary={<><DeltaBadge tone="attention">132 gifts</DeltaBadge> expired or near expiry</>}
          viz={<StuckBar claimedPct={63} inFlightPct={27} stuckPct={10} />}
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

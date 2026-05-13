'use client';

import Link from 'next/link';
import { BRAND, GIFTER, STATS, ORDERS, ORDER_STATUS_COLORS, getRecipients } from './data';

const PEACH = '#FFD6C2';

export default function GifterHome() {
  return (
    <div className="gd-home">
      {/* Hero */}
      <section className="gd-hero">
        <div className="gd-hero-content">
          <h1 className="gd-hero-name">
            <span className="gd-hero-name-italic">{GIFTER.name}</span>
            <span className="gd-hero-name-stop">.</span>
          </h1>
          <p className="gd-hero-tagline">
            You've made <strong>220 people</strong> smile this year. <span className="gd-sparkle" aria-hidden>✦</span>
          </p>

          <div className="gd-hero-stats">
            <StatTile big={STATS.giftsSent}   sub="gifts sent" />
            <StatTile big={STATS.claimRate}   sub="claimed and counting" />
            <StatTile big={STATS.totalSpent}  sub="in generosity" />
          </div>
        </div>

        {/* Decorative gift box illustration, corner */}
        <GiftBoxIllustration />
      </section>

      {/* Recent orders */}
      <section className="gd-section">
        <div className="gd-section-header">
          <h2 className="gd-section-title">Recent</h2>
          <Link href="/gifter-dashboard/orders" className="gd-section-link">See all →</Link>
        </div>
        <div className="gd-orders-list">
          {ORDERS.slice(0, 3).map((o) => {
            const claimedTotal = o.claimed + o.delivered;
            const pct = o.recipients > 0 ? Math.round((claimedTotal / o.recipients) * 100) : 0;
            const tone = ORDER_STATUS_COLORS[o.status];
            const previewRecipients = o.status !== 'Scheduled' && o.status !== 'Draft'
              ? getRecipients(o).slice(0, 5)
              : [];
            return (
              <Link
                key={o.id}
                href={`/gifter-dashboard/orders/${o.id}`}
                className="gd-order-card"
                style={{
                  background: '#fff',
                  border: '1px solid rgba(15, 15, 25, 0.06)',
                  borderRadius: 16,
                  padding: '20px 22px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  textDecoration: 'none',
                  color: 'inherit',
                  boxShadow: '0 6px 18px -10px rgba(20, 14, 50, 0.18)',
                  transition: 'border-color 160ms ease, transform 160ms ease, box-shadow 160ms ease',
                }}
              >
                <div className="gd-order-card-top">
                  <div>
                    <div className="gd-order-name">{o.name}</div>
                    <div className="gd-order-sub">
                      {o.recipients} recipients · {o.budgetPerRecipient}/person
                    </div>
                  </div>
                  <span className="gd-order-status" style={{ background: tone.bg, color: tone.fg }}>
                    {o.status}
                  </span>
                </div>

                {previewRecipients.length > 0 && (
                  <div className="gd-recipients-row">
                    <div className="gd-avatars">
                      {previewRecipients.map((r, i) => (
                        <span
                          key={r.id}
                          className="gd-avatar-mini"
                          style={{
                            background: `hsl(${(r.initials.charCodeAt(0) * 7) % 360}, 60%, 55%)`,
                            zIndex: 5 - i,
                          }}
                        >{r.initials}</span>
                      ))}
                      {o.recipients > previewRecipients.length && (
                        <span className="gd-avatar-more" style={{ zIndex: 0 }}>
                          +{o.recipients - previewRecipients.length}
                        </span>
                      )}
                    </div>
                    <span className="gd-recipients-pct">{pct}% have unwrapped</span>
                  </div>
                )}

                {o.status !== 'Scheduled' && o.status !== 'Draft' && (
                  <div className="gd-progress">
                    <div className="gd-progress-fill" style={{ width: `${pct}%` }} />
                  </div>
                )}

                {o.status === 'Scheduled' && (
                  <div className="gd-order-footer">
                    <span>{o.recipients} recipients · {o.budgetPerRecipient}/person</span>
                    <span style={{ color: BRAND, fontWeight: 600 }}>Edit →</span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      <style jsx>{`
        .gd-home {
          display: flex; flex-direction: column; gap: 28px;
          animation: gd-fadeup 360ms cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        @keyframes gd-fadeup {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ─── Hero — no card, just content on the body atmosphere ─── */
        .gd-hero {
          position: relative;
          color: #fff;
          padding: 8px 8px 24px;
        }
        .gd-hero-content { position: relative; z-index: 2; }
        .gd-hero-name {
          font-size: 44px;
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1;
          margin: 0 0 8px;
          color: #fff;
        }
        .gd-hero-name-italic {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 400;
          letter-spacing: -0.015em;
        }
        .gd-hero-name-stop {
          color: rgba(255, 255, 255, 0.5);
        }
        .gd-hero-tagline {
          font-size: 15px;
          color: #fff;
          margin: 0 0 28px;
          font-weight: 500;
          text-shadow: 0 1px 2px rgba(20, 14, 50, 0.25);
        }
        .gd-hero-tagline strong { font-weight: 700; color: #fff; }
        .gd-sparkle {
          display: inline-block;
          margin-left: 4px;
          color: ${PEACH};
          font-size: 13px;
          animation: gd-shimmer 2.4s ease-in-out infinite;
        }
        @keyframes gd-shimmer {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50%      { opacity: 1;   transform: scale(1.15); }
        }
        .gd-hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        @media (max-width: 640px) {
          .gd-hero { padding: 28px 22px 24px; }
          .gd-hero-name { font-size: 36px; }
          .gd-hero-stats { gap: 8px; }
        }


        /* ─── Section ─── */
        .gd-section { display: flex; flex-direction: column; gap: 14px; }
        .gd-section-header {
          display: flex; justify-content: space-between; align-items: baseline;
        }
        .gd-section-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 22px;
          font-weight: 400;
          font-style: italic;
          color: #1a1a1f;
          margin: 0;
          letter-spacing: -0.015em;
        }
        .gd-section-link {
          font-size: 13px; font-weight: 500;
          color: ${BRAND}; text-decoration: none;
        }

        /* ─── Order list ─── */
        .gd-orders-list { display: flex; flex-direction: column; gap: 14px; }
        :global(.gd-order-card:hover) {
          border-color: rgba(15, 15, 25, 0.18) !important;
          transform: translateY(-1px);
          box-shadow: 0 12px 28px -10px rgba(20, 14, 50, 0.25) !important;
        }
        .gd-order-card-top {
          display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;
        }
        .gd-order-name { font-size: 16px; font-weight: 600; letter-spacing: -0.005em; color: #1a1a1f; }
        .gd-order-sub { font-size: 13px; color: #43434b; margin-top: 3px; }
        .gd-order-status {
          font-size: 11.5px; font-weight: 600; padding: 3px 9px;
          border-radius: 999px;
          white-space: nowrap;
        }

        /* Recipient avatars */
        .gd-recipients-row {
          display: flex; align-items: center; gap: 12px;
        }
        .gd-avatars { display: flex; }
        .gd-avatar-mini, .gd-avatar-more {
          width: 30px; height: 30px;
          border-radius: 50%;
          border: 2px solid #fff;
          color: #fff;
          font-size: 11px; font-weight: 600;
          display: inline-flex; align-items: center; justify-content: center;
          margin-left: -8px;
        }
        .gd-avatar-mini:first-child { margin-left: 0; }
        .gd-avatar-more {
          background: #f0f0f2; color: #5a5a62;
          font-weight: 500;
          font-size: 10.5px;
        }
        .gd-recipients-pct {
          font-size: 12.5px; color: #6b6b73;
          font-family: 'Georgia', serif; font-style: italic;
        }

        /* Progress bar */
        .gd-progress {
          height: 4px; border-radius: 999px;
          background: #f0f0f2; overflow: hidden;
        }
        .gd-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #1F8A4C, #34B561);
          transition: width 240ms ease;
        }

        .gd-order-footer {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 12.5px; color: #8a8a93;
        }
      `}</style>
    </div>
  );
}

/* ─── Components ─── */

function StatTile({ big, sub }: { big: string; sub: string }) {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.92)',
      border: '1px solid rgba(255, 255, 255, 0.7)',
      borderRadius: 14,
      padding: '14px 16px 12px',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      boxShadow: '0 4px 18px -6px rgba(20, 14, 50, 0.18)',
    }}>
      <div style={{
        fontFamily: '"Georgia", "Times New Roman", serif',
        fontSize: 26,
        fontWeight: 500,
        letterSpacing: '-0.02em',
        color: '#1a1a1f',
        lineHeight: 1.1,
      }}>{big}</div>
      <div style={{ fontSize: 12, color: '#6b6b73', marginTop: 4 }}>{sub}</div>
    </div>
  );
}

/* ─── Decorative gift-box SVG, floats in hero corner ─── */

function GiftBoxIllustration() {
  return (
    <div style={{
      position: 'absolute',
      top: 18, right: 22,
      pointerEvents: 'none',
      animation: 'gd-float 5s ease-in-out infinite',
      zIndex: 1,
    }}>
      <style jsx>{`
        @keyframes gd-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%      { transform: translateY(-6px) rotate(2deg); }
        }
        @media (max-width: 640px) {
          div { display: none !important; }
        }
      `}</style>
      <svg width="110" height="120" viewBox="0 0 110 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        {/* Box shadow */}
        <ellipse cx="55" cy="112" rx="32" ry="3" fill="rgba(20, 14, 50, 0.18)" />

        {/* Box body */}
        <rect x="14" y="48" width="82" height="62" rx="6" fill="rgba(255, 255, 255, 0.92)" />

        {/* Box lid */}
        <rect x="10" y="44" width="90" height="14" rx="3" fill="#fff" />

        {/* Vertical ribbon */}
        <rect x="50" y="44" width="10" height="66" fill={PEACH} />

        {/* Horizontal ribbon */}
        <rect x="10" y="48" width="90" height="10" fill={PEACH} />

        {/* Bow left loop */}
        <ellipse cx="42" cy="42" rx="14" ry="11" fill={PEACH} />
        <ellipse cx="42" cy="42" rx="6" ry="5" fill="rgba(255, 255, 255, 0.55)" />

        {/* Bow right loop */}
        <ellipse cx="68" cy="42" rx="14" ry="11" fill={PEACH} />
        <ellipse cx="68" cy="42" rx="6" ry="5" fill="rgba(255, 255, 255, 0.55)" />

        {/* Bow center knot */}
        <rect x="50" y="36" width="10" height="14" rx="2" fill="#FFB89D" />

        {/* Sparkles */}
        <text x="2" y="14" fill="#fff" fontSize="14" opacity="0.9">✦</text>
        <text x="92" y="22" fill={PEACH} fontSize="11" opacity="0.95">✦</text>
        <text x="100" y="78" fill="#fff" fontSize="10" opacity="0.85">✦</text>
      </svg>
    </div>
  );
}


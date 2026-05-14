'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { GIFTER, STATS, ORDERS, getRecipients, avatarGradient } from './data';

function useCountUp(target: number, duration = 1400): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = () => {
      const elapsed = performance.now() - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

const ROTATIONS = ['-1.2deg', '0.8deg', '-0.4deg'];
const CARD_TINTS = ['var(--gd-paper)', 'var(--gd-peach)', 'var(--gd-sky)'];

export default function GifterHome() {
  const smiles = useCountUp(220);

  return (
    <div className="gd-home">
      {/* Magazine-style hero */}
      <section className="gd-hero">
        <div className="gd-hero-eyebrow">
          <span className="gd-eyebrow-dot" />
          Hi, {GIFTER.name}
        </div>
        <h1 className="gd-hero-headline">
          You&rsquo;ve made&nbsp;
          <span className="gd-hero-number">{Math.round(smiles)}</span>
          <br />
          <em>people smile</em>
          <span className="gd-hero-trail">&nbsp;this year.</span>
          <span className="gd-hero-sparkle" aria-hidden>✦</span>
        </h1>

        <div className="gd-hero-stats">
          <MiniStat
            target={STATS.giftsSent.value}
            format={STATS.giftsSent.format}
            label="gifts sent"
            color="var(--gd-lime)"
            rotation="-1.5deg"
          />
          <MiniStat
            target={STATS.claimRate.value}
            format={STATS.claimRate.format}
            label="claim rate"
            color="var(--gd-peach)"
            rotation="1.2deg"
          />
          <MiniStat
            target={STATS.totalSpent.value}
            format={STATS.totalSpent.format}
            label="given so far"
            color="var(--gd-pink-soft)"
            rotation="-0.6deg"
          />
        </div>
      </section>

      {/* Recent orders */}
      <section className="gd-section">
        <div className="gd-section-head">
          <h2 className="gd-section-title">
            <em>Recently</em> sent
          </h2>
          <Link href="/gifter-dashboard/orders" className="gd-section-link">
            See all <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="gd-orders-list">
          {ORDERS.slice(0, 3).map((o, idx) => {
            const claimedTotal = o.claimed + o.delivered;
            const pct = o.recipients > 0 ? Math.round((claimedTotal / o.recipients) * 100) : 0;
            const previewRecipients = o.status !== 'Scheduled' && o.status !== 'Draft'
              ? getRecipients(o).slice(0, 5)
              : [];
            const allClaimed = pct === 100 && previewRecipients.length > 0;
            return (
              <Link
                key={o.id}
                href={`/gifter-dashboard/orders/${o.id}`}
                className="gd-order-card"
                style={{
                  background: CARD_TINTS[idx % CARD_TINTS.length],
                  transform: `rotate(${ROTATIONS[idx % ROTATIONS.length]})`,
                }}
              >
                <div className="gd-order-card-top">
                  <div>
                    <div className="gd-order-name">{o.name}</div>
                    <div className="gd-order-sub">
                      {o.recipients} recipients · {o.budgetPerRecipient}/person
                    </div>
                  </div>
                  {allClaimed ? (
                    <span className="gd-celebration">
                      <span aria-hidden>🎉</span> all claimed
                    </span>
                  ) : (
                    <span className="gd-order-status">{o.status}</span>
                  )}
                </div>

                {previewRecipients.length > 0 && (
                  <div className="gd-recipients-row">
                    <div className="gd-avatars">
                      {previewRecipients.map((r, i) => (
                        <span
                          key={r.id}
                          className="gd-avatar-mini"
                          style={{
                            background: avatarGradient(r.initials),
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
                    <span className="gd-recipients-pct">
                      <strong>{pct}%</strong> unwrapped
                    </span>
                  </div>
                )}

                {o.status !== 'Scheduled' && o.status !== 'Draft' && (
                  <div className="gd-progress">
                    <div className="gd-progress-fill" style={{ width: `${pct}%` }} />
                  </div>
                )}

                {o.status === 'Scheduled' && (
                  <div className="gd-order-footer">
                    <span>Scheduled · {o.recipients} recipients</span>
                    <span className="gd-edit-link">edit →</span>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      <style jsx>{`
        .gd-home {
          display: flex; flex-direction: column; gap: 36px;
          animation: gd-fadeup 360ms cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        @keyframes gd-fadeup {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ─── Magazine hero ─── */
        .gd-hero {
          position: relative;
          padding: 20px 4px 8px;
        }
        .gd-hero-eyebrow {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 12px; font-weight: 600;
          color: var(--gd-ink); text-transform: uppercase;
          letter-spacing: 0.12em;
          margin-bottom: 18px;
          background: var(--gd-lime);
          border: var(--gd-border);
          padding: 5px 12px 5px 10px;
          border-radius: 999px;
          box-shadow: var(--gd-sticker-sm);
        }
        .gd-eyebrow-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--gd-ink);
        }
        .gd-hero-headline {
          font-family: var(--gd-display);
          font-size: clamp(40px, 7vw, 64px);
          font-weight: 500;
          letter-spacing: -0.025em;
          line-height: 1.02;
          color: var(--gd-ink);
          margin: 0 0 32px;
          position: relative;
        }
        .gd-hero-headline em {
          font-style: italic; font-weight: 500;
          color: var(--gd-ink);
        }
        .gd-hero-number {
          font-style: italic; font-weight: 600;
          color: var(--gd-pink);
          font-variant-numeric: tabular-nums;
          padding: 0 6px;
          background: var(--gd-lime);
          border: var(--gd-border);
          border-radius: 12px;
          box-shadow: var(--gd-sticker-sm);
          display: inline-block;
          line-height: 0.9;
          transform: rotate(-1.5deg) translateY(-4px);
          margin: 0 4px;
        }
        .gd-hero-trail {
          font-style: italic;
          color: var(--gd-ink);
        }
        .gd-hero-sparkle {
          font-family: var(--gd-display);
          color: var(--gd-pink);
          font-size: 0.7em;
          margin-left: 8px;
          display: inline-block;
          animation: gd-shimmer 2.4s ease-in-out infinite;
        }
        @keyframes gd-shimmer {
          0%, 100% { transform: scale(1) rotate(0deg);   opacity: 0.85; }
          50%      { transform: scale(1.2) rotate(20deg); opacity: 1;   }
        }

        .gd-hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 12px;
        }
        @media (max-width: 640px) {
          .gd-hero-stats { gap: 10px; }
        }

        /* ─── Section ─── */
        .gd-section { display: flex; flex-direction: column; gap: 22px; }
        .gd-section-head {
          display: flex; justify-content: space-between; align-items: baseline;
          padding: 0 4px;
        }
        .gd-section-title {
          font-family: var(--gd-display);
          font-size: 28px; font-weight: 500;
          color: var(--gd-ink);
          margin: 0; letter-spacing: -0.015em;
        }
        .gd-section-title em {
          font-style: italic; font-weight: 500;
          color: var(--gd-pink);
        }
        .gd-section-link {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 600;
          color: var(--gd-ink); text-decoration: none;
          background: var(--gd-paper);
          border: var(--gd-border);
          padding: 6px 14px; border-radius: 999px;
          box-shadow: var(--gd-sticker-sm);
          transition: transform 140ms ease, box-shadow 140ms ease;
        }
        .gd-section-link:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 var(--gd-ink);
        }

        /* ─── Order list (sticker cards) ─── */
        .gd-orders-list {
          display: flex; flex-direction: column;
          gap: 26px;
          padding: 8px 6px 16px;
        }
        :global(.gd-order-card) {
          display: flex; flex-direction: column; gap: 14px;
          padding: 22px 26px;
          border: var(--gd-border);
          border-radius: var(--gd-radius-lg);
          box-shadow: var(--gd-sticker);
          text-decoration: none;
          color: var(--gd-ink);
          transition: transform 160ms ease, box-shadow 160ms ease;
        }
        :global(.gd-order-card:hover) {
          transform: translate(-3px, -3px) rotate(0deg) !important;
          box-shadow: 7px 7px 0 var(--gd-ink) !important;
        }
        .gd-order-card-top {
          display: flex; justify-content: space-between; align-items: flex-start; gap: 14px;
        }
        .gd-order-name {
          font-family: var(--gd-display);
          font-size: 22px; font-weight: 500; font-style: italic;
          color: var(--gd-ink); letter-spacing: -0.015em;
        }
        .gd-order-sub {
          font-size: 13px; color: var(--gd-ink-soft);
          margin-top: 4px; font-weight: 500;
        }
        .gd-order-status {
          font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
          padding: 5px 11px; border-radius: 999px;
          background: var(--gd-ink); color: var(--gd-cream);
          white-space: nowrap;
        }
        .gd-celebration {
          font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
          padding: 5px 12px;
          border-radius: 999px;
          background: var(--gd-lime);
          color: var(--gd-ink);
          border: var(--gd-border);
          white-space: nowrap;
          display: inline-flex; align-items: center; gap: 5px;
        }

        /* Avatars */
        .gd-recipients-row {
          display: flex; align-items: center; gap: 14px;
        }
        .gd-avatars { display: flex; }
        .gd-avatar-mini, .gd-avatar-more {
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 1.5px solid var(--gd-ink);
          color: #fff;
          font-size: 11px; font-weight: 700;
          display: inline-flex; align-items: center; justify-content: center;
          margin-left: -9px;
        }
        .gd-avatar-mini:first-child { margin-left: 0; }
        .gd-avatar-more {
          background: var(--gd-paper); color: var(--gd-ink);
        }
        .gd-recipients-pct {
          font-size: 13px; color: var(--gd-ink);
          font-family: var(--gd-display);
          font-style: italic;
        }
        .gd-recipients-pct strong {
          font-weight: 600; color: var(--gd-pink);
        }

        /* Progress bar */
        .gd-progress {
          height: 8px;
          border: 1.5px solid var(--gd-ink);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.5);
          overflow: hidden;
        }
        .gd-progress-fill {
          height: 100%;
          background: var(--gd-lime);
          border-right: 1.5px solid var(--gd-ink);
          transition: width 240ms ease;
        }

        .gd-order-footer {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 12.5px; color: var(--gd-ink-soft);
          font-weight: 500;
        }
        .gd-edit-link { color: var(--gd-pink); font-weight: 700; }
      `}</style>
    </div>
  );
}

function MiniStat({
  target, format, label, color, rotation,
}: {
  target: number;
  format: (n: number) => string;
  label: string;
  color: string;
  rotation: string;
}) {
  const animated = useCountUp(target);
  return (
    <div style={{
      background: color,
      border: '1.5px solid var(--gd-ink)',
      borderRadius: 14,
      padding: '14px 16px 12px',
      boxShadow: 'var(--gd-sticker-sm)',
      transform: `rotate(${rotation})`,
      transition: 'transform 160ms ease',
    }}>
      <div style={{
        fontFamily: 'var(--gd-display)',
        fontStyle: 'italic',
        fontSize: 32,
        fontWeight: 600,
        letterSpacing: '-0.02em',
        color: 'var(--gd-ink)',
        lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
      }}>{format(animated)}</div>
      <div style={{
        fontSize: 11.5,
        color: 'var(--gd-ink)',
        marginTop: 6,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      }}>{label}</div>
    </div>
  );
}

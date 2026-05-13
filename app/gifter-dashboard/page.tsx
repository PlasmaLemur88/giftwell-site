'use client';

import Link from 'next/link';
import { BRAND, BRAND_DARK, GIFTER, STATS, ORDERS, ORDER_STATUS_COLORS } from './data';

export default function GifterHome() {
  const urgentCount = ORDERS.find((o) => o.id === 'holiday-2025')?.pending ?? 0;

  return (
    <div className="gd-home">
      {/* Hero */}
      <section className="gd-hero">
        <div className="gd-hero-content">
          <div className="gd-hero-greet">Welcome back</div>
          <h1 className="gd-hero-name">{GIFTER.name} <span aria-hidden>👋</span></h1>
          <div className="gd-hero-stats">
            <StatTile label="Gifts sent"   value={STATS.giftsSent} />
            <StatTile label="Claim rate"   value={STATS.claimRate} />
            <StatTile label="Total spent"  value={STATS.totalSpent} />
          </div>
        </div>
      </section>

      {/* Attention banner — only if there's something to do */}
      {urgentCount > 0 && (
        <Link href="/gifter-dashboard/orders/holiday-2025" className="gd-alert">
          <div className="gd-alert-dot" />
          <div className="gd-alert-text">
            <strong>{urgentCount} recipients haven't claimed yet.</strong> Holiday Gifts 2025 expires in 5 days.
          </div>
          <span className="gd-alert-cta">Review →</span>
        </Link>
      )}

      {/* Quick actions — 3-col on desktop, stacks on mobile */}
      <section className="gd-quick-grid">
        <PrimaryAction href="#"                              label="Send a new gift" sub="Start a new order"   icon={<PlusIcon />} />
        <QuickAction   href="/gifter-dashboard/address-book" label="Address book"    sub="Saved recipients"    icon={<PeopleIcon />} />
        <QuickAction   href="/gifter-dashboard/help"         label="Receipts"        sub="Download invoices"   icon={<ReceiptIcon />} />
      </section>

      {/* Recent orders */}
      <section className="gd-section">
        <div className="gd-section-header">
          <h2 className="gd-section-title">Recent orders</h2>
          <Link href="/gifter-dashboard/orders" className="gd-section-link">View all →</Link>
        </div>
        <div className="gd-orders-list">
          {ORDERS.slice(0, 3).map((o) => {
            const claimedTotal = o.claimed + o.delivered;
            const pct = o.recipients > 0 ? Math.round((claimedTotal / o.recipients) * 100) : 0;
            const tone = ORDER_STATUS_COLORS[o.status];
            return (
              <Link key={o.id} href={`/gifter-dashboard/orders/${o.id}`} className="gd-order-card">
                <div className="gd-order-card-top">
                  <div>
                    <div className="gd-order-name">{o.name}</div>
                    <div className="gd-order-sub">
                      {o.status === 'Scheduled' && o.scheduledDate
                        ? `Scheduled ${o.scheduledDate}`
                        : o.sentDate ? `Sent ${o.sentDate}` : 'Draft'}
                    </div>
                  </div>
                  <span className="gd-order-status" style={{ background: tone.bg, color: tone.fg }}>
                    {o.status}
                  </span>
                </div>

                {o.status !== 'Scheduled' && o.status !== 'Draft' && (
                  <>
                    <div className="gd-order-numbers">
                      <span><strong>{o.recipients}</strong> Total</span>
                      <span style={{ color: '#047857' }}><strong>{claimedTotal}</strong> Claimed</span>
                      {o.pending > 0 && <span style={{ color: '#92590B' }}><strong>{o.pending}</strong> Pending</span>}
                    </div>
                    <div className="gd-progress">
                      <div className="gd-progress-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="gd-order-footer">
                      <span>{pct}% claimed</span>
                      <span style={{ color: BRAND, fontWeight: 600 }}>View details →</span>
                    </div>
                  </>
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
          display: flex; flex-direction: column; gap: 32px;
        }

        /* ─── Hero ─── */
        .gd-hero {
          background:
            radial-gradient(ellipse 65% 70% at 12% 18%, rgba(92, 63, 224, 0.85) 0%, transparent 60%),
            radial-gradient(ellipse 55% 60% at 88% 88%, rgba(255, 255, 255, 0.55) 0%, transparent 60%),
            radial-gradient(ellipse 70% 60% at 80% 20%, rgba(255, 220, 245, 0.4) 0%, transparent 55%),
            linear-gradient(135deg, ${BRAND} 0%, #A68DF0 45%, #DDC8F0 80%, #F4E9FB 100%);
          color: #fff;
          border-radius: 18px;
          padding: 36px 36px 32px;
        }
        .gd-hero-greet { font-size: 13px; opacity: 0.85; letter-spacing: 0.02em; margin-bottom: 4px; }
        .gd-hero-name {
          font-size: 30px; font-weight: 700; letter-spacing: -0.015em;
          margin: 0 0 22px;
        }
        .gd-hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }

        /* ─── Alert banner ─── */
        .gd-alert {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 18px; border-radius: 12px;
          background: #FFF7E6; border: 1px solid #FFEAB5;
          color: #5a3d00; text-decoration: none;
          transition: background 120ms ease;
        }
        .gd-alert:hover { background: #FFF3D6; }
        .gd-alert-dot {
          width: 8px; height: 8px; border-radius: 999px;
          background: #E0A23E;
          flex-shrink: 0;
        }
        .gd-alert-text { flex: 1; font-size: 14px; line-height: 1.45; }
        .gd-alert-cta { color: #92590B; font-size: 13px; font-weight: 600; flex-shrink: 0; }

        /* ─── Section ─── */
        .gd-section {
          display: flex; flex-direction: column; gap: 12px;
        }
        .gd-section-header {
          display: flex; justify-content: space-between; align-items: center;
        }
        .gd-section-title {
          font-size: 16px; font-weight: 700; letter-spacing: -0.005em;
          margin: 0;
        }
        .gd-section-link {
          font-size: 13px; font-weight: 600; color: ${BRAND};
          text-decoration: none;
        }

        /* ─── Quick action grid ─── */
        .gd-quick-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        @media (max-width: 640px) {
          .gd-quick-grid { grid-template-columns: 1fr; }
        }

        /* ─── Order list ─── */
        .gd-orders-list { display: flex; flex-direction: column; gap: 10px; }

        .gd-order-card {
          background: #fff;
          border: 1px solid #ececef;
          border-radius: 14px;
          padding: 16px 18px;
          display: flex; flex-direction: column; gap: 10px;
          text-decoration: none; color: inherit;
          transition: border-color 120ms ease, transform 120ms ease, box-shadow 120ms ease;
        }
        .gd-order-card:hover {
          border-color: #c4c4ca;
          box-shadow: 0 6px 16px -8px rgba(15, 15, 25, 0.1);
        }
        .gd-order-card-top {
          display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;
        }
        .gd-order-name { font-size: 15.5px; font-weight: 600; }
        .gd-order-sub { font-size: 12.5px; color: #8a8a93; margin-top: 2px; }
        .gd-order-status {
          font-size: 11.5px; font-weight: 600; padding: 3px 9px;
          border-radius: 999px; letter-spacing: -0.005em;
          white-space: nowrap;
        }
        .gd-order-numbers {
          display: flex; gap: 14px;
          font-size: 13px; color: #43434b;
        }
        .gd-order-numbers strong { font-size: 15px; font-weight: 700; }
        .gd-progress {
          height: 6px; border-radius: 999px;
          background: #f0f0f2; overflow: hidden;
        }
        .gd-progress-fill {
          height: 100%;
          background: #1F8A4C;
          transition: width 220ms ease;
        }
        .gd-order-footer {
          display: flex; justify-content: space-between; align-items: center;
          font-size: 12.5px; color: #8a8a93;
        }
      `}</style>
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      background: 'rgba(30, 20, 60, 0.22)',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      borderRadius: 12,
      padding: '14px 14px 12px',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
    }}>
      <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.015em', color: '#fff' }}>{value}</div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.9)', marginTop: 2 }}>{label}</div>
    </div>
  );
}

function PrimaryAction({ href, label, sub, icon }: { href: string; label: string; sub: string; icon: React.ReactNode }) {
  return (
    <Link href={href} style={{
      background: `linear-gradient(135deg, ${BRAND_DARK}, ${BRAND})`,
      borderRadius: 12,
      padding: '14px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      textDecoration: 'none',
      color: '#fff',
      transition: 'transform 120ms ease, box-shadow 120ms ease',
      boxShadow: '0 6px 16px -6px rgba(124, 92, 255, 0.4)',
    }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'none'; }}
    >
      <span style={{
        width: 36, height: 36, borderRadius: 10,
        background: 'rgba(255,255,255,0.18)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', flexShrink: 0,
      }}>{icon}</span>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)', marginTop: 1 }}>{sub}</div>
      </div>
    </Link>
  );
}

function QuickAction({ href, label, sub, icon }: { href: string; label: string; sub: string; icon: React.ReactNode }) {
  return (
    <Link href={href} style={{
      background: '#fff',
      border: '1px solid #ececef',
      borderRadius: 12,
      padding: '14px 14px',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      textDecoration: 'none',
      color: 'inherit',
      transition: 'border-color 120ms ease, box-shadow 120ms ease',
    }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#c4c4ca'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#ececef'; }}
    >
      <span style={{
        width: 36, height: 36, borderRadius: 10,
        background: '#f5f5f7',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        color: '#1a1a1f', flexShrink: 0,
      }}>{icon}</span>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: 12, color: '#8a8a93', marginTop: 1 }}>{sub}</div>
      </div>
    </Link>
  );
}

function PlusIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function ReceiptIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 2v20l3-2 3 2 3-2 3 2 3-2V2l-3 2-3-2-3 2-3-2z" />
      <line x1="8" y1="8" x2="16" y2="8" />
      <line x1="8" y1="12" x2="16" y2="12" />
      <line x1="8" y1="16" x2="13" y2="16" />
    </svg>
  );
}

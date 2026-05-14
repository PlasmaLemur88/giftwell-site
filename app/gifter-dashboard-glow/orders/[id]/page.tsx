'use client';

import { use, useMemo, useState } from 'react';
import Link from 'next/link';
import { ORDERS, getRecipients, avatarGradient, type RecipientStatus } from '@/app/gifter-dashboard/data';
import { DigitalUnboxingPreview } from '@/app/gifter-dashboard/components/DigitalUnboxingPreview';

const FILTERS: ('All' | RecipientStatus)[] = ['All', 'Claimed', 'Delivered', 'Pending', 'Bounced'];

const SEGMENT_COLORS: Record<RecipientStatus, string> = {
  Claimed:   '#34D399',
  Delivered: '#60A5FA',
  Pending:   '#FBBF24',
  Bounced:   '#F87171',
};

export default function GlowOrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const order = ORDERS.find((o) => o.id === id);
  const [filter, setFilter] = useState<typeof FILTERS[number]>('All');
  const [search, setSearch] = useState('');

  if (!order) {
    return (
      <div style={{ padding: '40px 0' }}>
        <Link href="/gifter-dashboard-glow/orders" style={{ color: 'var(--gdg-purple-soft)', textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>← Back to orders</Link>
        <h1 style={{ marginTop: 16, fontFamily: 'var(--gdg-display)', color: 'var(--gdg-text)' }}>Order not found</h1>
        <p style={{ color: 'var(--gdg-text-dim)' }}>No order matches #{id}.</p>
      </div>
    );
  }

  const recipients = getRecipients(order);

  const counts = {
    All:       recipients.length,
    Claimed:   recipients.filter((r) => r.status === 'Claimed').length,
    Delivered: recipients.filter((r) => r.status === 'Delivered').length,
    Pending:   recipients.filter((r) => r.status === 'Pending').length,
    Bounced:   recipients.filter((r) => r.status === 'Bounced').length,
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return recipients.filter((r) => {
      if (filter !== 'All' && r.status !== filter) return false;
      if (!q) return true;
      return r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q);
    });
  }, [recipients, filter, search]);

  return (
    <div className="gdg-order">
      <section className="gdg-order-hero">
        <Link href="/gifter-dashboard-glow/orders" className="gdg-back">← Back to orders</Link>
        <h1 className="gdg-order-title">{order.name}</h1>
        <div className="gdg-order-meta">
          <span>{order.recipients} recipients</span>
          <span className="gdg-dot" aria-hidden>·</span>
          <span>{order.budgetPerRecipient}/person</span>
          <span className="gdg-dot" aria-hidden>·</span>
          <span className={`gdg-status-text gdg-status-text-${order.status.toLowerCase()}`}>{order.status}</span>
        </div>
      </section>

      {/* Digital unboxing showcase */}
      <section className="gdg-unboxing">
        <DigitalUnboxingPreview design={order.unboxing} aspectRatio="21 / 9" radius={0} showLabel={false} />
        <div className="gdg-unboxing-caption">
          <div className="gdg-unboxing-info">
            <span className="gdg-unboxing-kicker">
              <span className="gdg-unboxing-play" aria-hidden>▶</span>
              Digital unboxing
            </span>
            <div className="gdg-unboxing-theme">{order.unboxing.theme}</div>
            <div className="gdg-unboxing-occasion">{order.unboxing.occasion}</div>
          </div>
          <div className="gdg-unboxing-msg">&ldquo;{order.unboxing.message}&rdquo;</div>
        </div>
      </section>

      {/* Health */}
      <section className="gdg-health">
        <div className="gdg-health-bar">
          {(['Claimed', 'Delivered', 'Pending', 'Bounced'] as RecipientStatus[]).map((status) => {
            const pct = (counts[status] / order.recipients) * 100;
            if (pct === 0) return null;
            return (
              <div
                key={status}
                style={{ width: `${pct}%`, background: SEGMENT_COLORS[status], height: '100%' }}
                title={`${status}: ${counts[status]}`}
              />
            );
          })}
        </div>
        <div className="gdg-health-legend">
          {(['Claimed', 'Delivered', 'Pending', 'Bounced'] as RecipientStatus[]).map((status) => (
            <div key={status} className="gdg-legend-item">
              <span className="gdg-legend-dot" style={{ background: SEGMENT_COLORS[status] }} />
              <span className="gdg-legend-num">{counts[status]}</span>
              <span className="gdg-legend-label">{status}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Filters */}
      <div className="gdg-pills">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`gdg-pill ${filter === f ? 'gdg-pill-active' : ''}`}
          >
            {f}
            <span className="gdg-pill-count">{counts[f]}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="gdg-search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search recipients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Recipients */}
      <div className="gdg-recipients">
        {filtered.length === 0 ? (
          <div className="gdg-empty">No recipients match.</div>
        ) : (
          filtered.map((r) => {
            const isStuck = r.status === 'Pending';
            return (
              <div key={r.id} className="gdg-recipient">
                <span className="gdg-recipient-avatar" style={{ background: avatarGradient(r.initials) }}>
                  {r.initials}
                </span>
                <div className="gdg-recipient-meta">
                  <div className="gdg-recipient-name">{r.name}</div>
                  <div className="gdg-recipient-email">{r.email}</div>
                  {r.picked && (
                    <div className="gdg-recipient-picked">Picked: {r.picked}{r.tracking ? ` · ${r.tracking}` : ''}</div>
                  )}
                </div>
                <div className="gdg-recipient-right">
                  <span className={`gdg-rec-status gdg-rec-status-${r.status.toLowerCase()}`}>{r.status}</span>
                  {isStuck && <button className="gdg-resend">Resend</button>}
                </div>
              </div>
            );
          })
        )}
      </div>

      <style jsx>{`
        .gdg-order {
          display: flex; flex-direction: column; gap: 22px;
          animation: gdg-fade 380ms cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        @keyframes gdg-fade {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .gdg-order-hero { padding: 20px 0 4px; }
        .gdg-back {
          display: inline-block;
          font-size: 13px; font-weight: 600;
          color: var(--gdg-purple-soft); text-decoration: none;
          margin-bottom: 16px;
        }
        .gdg-back:hover { text-decoration: underline; }
        .gdg-order-title {
          font-family: var(--gdg-display);
          font-size: clamp(38px, 5.5vw, 60px);
          font-weight: 600; letter-spacing: -0.035em;
          line-height: 1; margin: 0 0 12px;
          color: var(--gdg-text);
        }
        .gdg-order-meta {
          display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
          font-size: 14px; color: var(--gdg-text-soft); font-weight: 500;
        }
        .gdg-dot { color: var(--gdg-text-dim); }
        .gdg-status-text { font-weight: 600; }
        .gdg-status-text-sent      { color: #6EE7B7; }
        .gdg-status-text-scheduled { color: #FCD34D; }
        .gdg-status-text-completed { color: #93C5FD; }
        .gdg-status-text-draft     { color: var(--gdg-text-soft); }

        /* Digital unboxing showcase */
        .gdg-unboxing {
          background: var(--gdg-surface);
          border: 1px solid var(--gdg-hairline);
          border-radius: var(--gdg-radius);
          overflow: hidden;
        }
        .gdg-unboxing-caption {
          display: flex; align-items: center; justify-content: space-between;
          gap: 20px; padding: 16px 20px;
        }
        .gdg-unboxing-info { min-width: 0; }
        .gdg-unboxing-kicker {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: var(--gdg-text-dim);
        }
        .gdg-unboxing-play { font-size: 7px; }
        .gdg-unboxing-theme {
          font-family: var(--gdg-display);
          font-size: 19px; font-weight: 600;
          letter-spacing: -0.015em; color: var(--gdg-text);
          margin-top: 3px;
        }
        .gdg-unboxing-occasion {
          font-size: 13px; color: var(--gdg-text-soft); margin-top: 1px;
        }
        .gdg-unboxing-msg {
          font-size: 14px; color: var(--gdg-text-soft);
          font-style: italic; text-align: right;
          max-width: 280px; flex-shrink: 0;
        }
        @media (max-width: 620px) {
          .gdg-unboxing-caption { flex-direction: column; align-items: flex-start; gap: 10px; }
          .gdg-unboxing-msg { text-align: left; max-width: none; }
        }

        /* Health */
        .gdg-health {
          background: var(--gdg-surface);
          border: 1px solid var(--gdg-hairline);
          border-radius: var(--gdg-radius);
          padding: 18px 20px;
        }
        .gdg-health-bar {
          height: 12px; border-radius: 999px; overflow: hidden;
          background: rgba(255, 255, 255, 0.06);
          display: flex; margin-bottom: 16px;
        }
        .gdg-health-legend {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;
        }
        .gdg-legend-item {
          display: flex; flex-direction: column; align-items: flex-start; gap: 4px;
        }
        .gdg-legend-dot { width: 9px; height: 9px; border-radius: 999px; }
        .gdg-legend-num {
          font-family: var(--gdg-display);
          font-size: 22px; font-weight: 600;
          color: var(--gdg-text); letter-spacing: -0.02em;
          line-height: 1;
        }
        .gdg-legend-label {
          font-size: 11px; color: var(--gdg-text-dim);
          text-transform: uppercase; letter-spacing: 0.06em; font-weight: 600;
        }
        @media (min-width: 720px) {
          .gdg-health-legend { grid-template-columns: repeat(4, max-content); gap: 36px; }
        }

        .gdg-pills { display: flex; gap: 8px; flex-wrap: wrap; }
        .gdg-pill {
          all: unset; cursor: pointer;
          display: inline-flex; align-items: center; gap: 7px;
          padding: 9px 16px; border-radius: 999px;
          background: var(--gdg-pill);
          color: var(--gdg-text-soft);
          font-size: 13.5px; font-weight: 500;
          border: 1.5px solid transparent;
          transition: color 140ms ease, background 140ms ease, border-color 140ms ease;
        }
        .gdg-pill:hover { background: var(--gdg-pill-hover); color: var(--gdg-text); }
        .gdg-pill-active { color: var(--gdg-text); border-color: var(--gdg-blue); }
        .gdg-pill-count { font-size: 12px; font-weight: 600; color: var(--gdg-text-dim); }
        .gdg-pill-active .gdg-pill-count { color: var(--gdg-blue); }

        .gdg-search {
          display: flex; align-items: center; gap: 10px;
          background: var(--gdg-surface);
          border: 1px solid var(--gdg-hairline);
          border-radius: 999px;
          padding: 0 18px;
          color: var(--gdg-text-dim);
        }
        .gdg-search input {
          flex: 1;
          padding: 13px 0;
          border: none; background: transparent;
          font-size: 14px; outline: none; color: var(--gdg-text);
          font-family: inherit;
        }
        .gdg-search input::placeholder { color: var(--gdg-text-dim); }

        .gdg-recipients {
          background: var(--gdg-surface);
          border: 1px solid var(--gdg-hairline);
          border-radius: var(--gdg-radius);
          overflow: hidden;
        }
        .gdg-recipient {
          display: flex; align-items: center; gap: 13px;
          padding: 14px 18px;
          border-bottom: 1px solid var(--gdg-hairline);
        }
        .gdg-recipient:last-child { border-bottom: none; }
        .gdg-recipient-avatar {
          width: 40px; height: 40px; border-radius: 50%;
          color: #fff; font-size: 13px; font-weight: 700;
          display: inline-flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .gdg-recipient-meta { flex: 1; min-width: 0; }
        .gdg-recipient-name { font-size: 14px; font-weight: 600; color: var(--gdg-text); }
        .gdg-recipient-email {
          font-size: 12.5px; color: var(--gdg-text-soft); margin-top: 1px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .gdg-recipient-picked {
          font-size: 12px; color: var(--gdg-text-dim); margin-top: 4px;
          font-family: ui-monospace, monospace;
        }
        .gdg-recipient-right {
          display: flex; align-items: center; gap: 10px; flex-shrink: 0;
        }
        .gdg-rec-status {
          font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.05em;
          padding: 4px 10px; border-radius: 999px;
        }
        .gdg-rec-status-claimed   { background: rgba(52, 211, 153, 0.16); color: #6EE7B7; }
        .gdg-rec-status-delivered { background: rgba(96, 165, 250, 0.16); color: #93C5FD; }
        .gdg-rec-status-pending   { background: rgba(251, 191, 36, 0.16); color: #FCD34D; }
        .gdg-rec-status-bounced   { background: rgba(248, 113, 113, 0.16); color: #FCA5A5; }
        .gdg-resend {
          all: unset; cursor: pointer;
          font-size: 12px; font-weight: 600;
          color: var(--gdg-text); padding: 6px 13px;
          border-radius: 999px;
          background: var(--gdg-pill);
          border: 1px solid var(--gdg-hairline);
          transition: background 140ms ease;
        }
        .gdg-resend:hover { background: var(--gdg-pill-hover); }

        .gdg-empty {
          padding: 36px; text-align: center;
          color: var(--gdg-text-dim); font-size: 14px;
        }
      `}</style>
    </div>
  );
}

'use client';

import { use, useMemo, useState } from 'react';
import Link from 'next/link';
import { BRAND, BRAND_DARK, ORDERS, getRecipients, STATUS_COLORS, type RecipientStatus } from '../../data';

const FILTERS: ('All' | RecipientStatus)[] = ['All', 'Claimed', 'Delivered', 'Pending', 'Bounced'];

const SEGMENT_COLORS: Record<RecipientStatus, string> = {
  Claimed:   '#1F8A4C',
  Delivered: '#3A6EE0',
  Pending:   '#E0A23E',
  Bounced:   '#E04F4F',
};

export default function GifterOrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const order = ORDERS.find((o) => o.id === id);
  const [filter, setFilter] = useState<typeof FILTERS[number]>('All');
  const [search, setSearch] = useState('');

  if (!order) {
    return (
      <div style={{ padding: 24 }}>
        <Link href="/gifter-dashboard/orders" style={{ color: BRAND, textDecoration: 'none' }}>← Back to orders</Link>
        <h1 style={{ marginTop: 16 }}>Order not found</h1>
        <p style={{ color: '#8a8a93' }}>No order matches #{id}.</p>
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
    <div className="gd-order">
      {/* Hero */}
      <section className="gd-order-hero">
        <Link href="/gifter-dashboard" className="gd-order-back">← Back</Link>
        <h1 className="gd-order-title">{order.name}</h1>
        <div className="gd-order-meta">
          {order.recipients} recipients · {order.sentDate ? `Sent ${order.sentDate}` : `Scheduled ${order.scheduledDate}`}
        </div>
      </section>

      {/* Aggregate health bar */}
      <section className="gd-health">
        <div className="gd-health-bar">
          {(['Claimed', 'Delivered', 'Pending', 'Bounced'] as RecipientStatus[]).map((status) => {
            const pct = (counts[status] / order.recipients) * 100;
            if (pct === 0) return null;
            return (
              <div
                key={status}
                style={{
                  width: `${pct}%`,
                  background: SEGMENT_COLORS[status],
                  height: '100%',
                }}
                title={`${status}: ${counts[status]}`}
              />
            );
          })}
        </div>
        <div className="gd-health-legend">
          {(['Claimed', 'Delivered', 'Pending', 'Bounced'] as RecipientStatus[]).map((status) => (
            <div key={status} className="gd-health-legend-item">
              <span className="gd-health-dot" style={{ background: SEGMENT_COLORS[status] }} />
              <span className="gd-health-num">{counts[status]}</span>
              <span className="gd-health-label">{status}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Filter chips */}
      <div className="gd-filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`gd-chip ${filter === f ? 'gd-chip-active' : ''}`}
          >
            {f}
            <span className="gd-chip-count">{counts[f]}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="gd-search">
        <span className="gd-search-icon" aria-hidden>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search recipients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Recipient list */}
      <div className="gd-recipients">
        {filtered.length === 0 ? (
          <div className="gd-empty">
            No recipients match.
          </div>
        ) : (
          filtered.map((r) => {
            const tone = STATUS_COLORS[r.status];
            const isStuck = r.status === 'Pending';
            return (
              <div key={r.id} className="gd-recipient-row">
                <span className="gd-recipient-avatar" style={{
                  background: `hsl(${(r.initials.charCodeAt(0) * 7) % 360}, 60%, 55%)`,
                }}>{r.initials}</span>
                <div className="gd-recipient-meta">
                  <div className="gd-recipient-name">{r.name}</div>
                  <div className="gd-recipient-email">{r.email}</div>
                  {r.picked && (
                    <div className="gd-recipient-picked">Picked: {r.picked}{r.tracking ? ` · ${r.tracking}` : ''}</div>
                  )}
                </div>
                <div className="gd-recipient-right">
                  <span className="gd-recipient-status" style={{ background: tone.bg, color: tone.fg }}>
                    {r.status}
                  </span>
                  {isStuck && (
                    <button className="gd-recipient-resend">Resend</button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      <style jsx>{`
        .gd-order { display: flex; flex-direction: column; gap: 18px; }

        /* Hero */
        .gd-order-hero {
          background:
            radial-gradient(ellipse 65% 70% at 12% 18%, rgba(92, 63, 224, 0.85) 0%, transparent 60%),
            radial-gradient(ellipse 55% 60% at 88% 88%, rgba(255, 255, 255, 0.55) 0%, transparent 60%),
            radial-gradient(ellipse 70% 60% at 80% 20%, rgba(255, 220, 245, 0.4) 0%, transparent 55%),
            linear-gradient(135deg, ${BRAND} 0%, #A68DF0 45%, #DDC8F0 80%, #F4E9FB 100%);
          color: #fff;
          border-radius: 18px;
          padding: 28px 32px 32px;
        }
        .gd-order-back {
          display: inline-flex; align-items: center;
          color: rgba(255,255,255,0.85); text-decoration: none;
          font-size: 13.5px; margin-bottom: 14px;
        }
        .gd-order-back:hover { color: #fff; }
        .gd-order-title {
          font-size: 26px; font-weight: 700; letter-spacing: -0.015em;
          margin: 0 0 6px;
        }
        .gd-order-meta {
          font-size: 13.5px; color: rgba(255,255,255,0.85);
        }

        /* Health */
        .gd-health {
          background: #fff;
          border: 1px solid #ececef;
          border-radius: 14px;
          padding: 16px 18px;
        }
        .gd-health-bar {
          height: 10px; border-radius: 999px; overflow: hidden;
          background: #f0f0f2;
          display: flex;
          margin-bottom: 14px;
        }
        .gd-health-legend {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }
        .gd-health-legend-item {
          display: flex; flex-direction: column; align-items: flex-start; gap: 4px;
        }
        .gd-health-dot {
          width: 8px; height: 8px; border-radius: 999px;
        }
        .gd-health-num {
          font-size: 18px; font-weight: 700; color: #1a1a1f;
          letter-spacing: -0.01em;
        }
        .gd-health-label {
          font-size: 11.5px; color: #8a8a93;
        }
        @media (min-width: 901px) {
          .gd-health-legend { grid-template-columns: repeat(4, max-content); gap: 24px; }
        }

        /* Filter chips */
        .gd-filters {
          display: flex; gap: 8px; flex-wrap: wrap;
        }
        .gd-chip {
          all: unset; cursor: pointer;
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 12px; border-radius: 999px;
          background: #fff; color: #1a1a1f;
          border: 1px solid #dcdcde;
          font-size: 13px; font-weight: 500;
          transition: all 120ms ease;
        }
        .gd-chip-active {
          background: ${BRAND}; color: #fff; border-color: ${BRAND};
        }
        .gd-chip-count {
          font-size: 11.5px; font-weight: 600;
          padding: 1px 7px; border-radius: 999px;
          background: rgba(0,0,0,0.06); color: #5a5a62;
        }
        .gd-chip-active .gd-chip-count {
          background: rgba(255,255,255,0.18); color: #fff;
        }

        /* Search */
        .gd-search {
          position: relative;
          background: #fff;
          border: 1px solid #dcdcde;
          border-radius: 10px;
          display: flex; align-items: center;
        }
        .gd-search-icon {
          padding: 0 10px 0 14px; color: #8a8a93;
          display: inline-flex; align-items: center;
        }
        .gd-search input {
          flex: 1;
          padding: 11px 14px 11px 0;
          border: none; background: transparent;
          font-size: 14px; outline: none; color: #1a1a1f;
          font-family: inherit;
        }
        .gd-search input::placeholder { color: #8a8a93; }

        /* Recipients */
        .gd-recipients {
          background: #fff;
          border: 1px solid #ececef;
          border-radius: 14px;
          overflow: hidden;
        }
        .gd-recipient-row {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 16px;
          border-bottom: 1px solid #f0f0f2;
        }
        .gd-recipient-row:last-child { border-bottom: none; }
        .gd-recipient-avatar {
          width: 38px; height: 38px; border-radius: 50%;
          color: #fff; font-size: 12.5px; font-weight: 600;
          display: inline-flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .gd-recipient-meta { flex: 1; min-width: 0; }
        .gd-recipient-name { font-size: 14px; font-weight: 600; color: #1a1a1f; }
        .gd-recipient-email {
          font-size: 12.5px; color: #8a8a93; margin-top: 1px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .gd-recipient-picked {
          font-size: 12px; color: #43434b; margin-top: 4px;
          font-family: ui-monospace, monospace;
        }
        .gd-recipient-right {
          display: flex; align-items: center; gap: 10px; flex-shrink: 0;
        }
        .gd-recipient-status {
          font-size: 11.5px; font-weight: 600;
          padding: 3px 9px; border-radius: 999px;
          letter-spacing: -0.005em;
        }
        .gd-recipient-resend {
          all: unset; cursor: pointer;
          font-size: 12.5px; font-weight: 600;
          color: #1a1a1f; padding: 6px 12px;
          border: 1px solid #1a1a1f; border-radius: 8px;
          transition: background 120ms ease, color 120ms ease;
        }
        .gd-recipient-resend:hover { background: #1a1a1f; color: #fff; }

        .gd-empty {
          padding: 32px; text-align: center;
          color: #8a8a93; font-size: 14px;
        }
      `}</style>
    </div>
  );
}

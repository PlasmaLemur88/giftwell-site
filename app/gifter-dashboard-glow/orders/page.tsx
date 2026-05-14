'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ORDERS, getRecipients, avatarGradient,
  type GifterOrderStatus,
} from '@/app/gifter-dashboard/data';

const FILTERS: ('All' | GifterOrderStatus)[] = ['All', 'Sent', 'Scheduled', 'Completed'];

export default function GlowOrders() {
  const [filter, setFilter] = useState<typeof FILTERS[number]>('All');

  const counts = useMemo(() => ({
    All:       ORDERS.length,
    Sent:      ORDERS.filter((o) => o.status === 'Sent').length,
    Scheduled: ORDERS.filter((o) => o.status === 'Scheduled').length,
    Completed: ORDERS.filter((o) => o.status === 'Completed').length,
    Draft:     ORDERS.filter((o) => o.status === 'Draft').length,
  }), []);

  const visible = filter === 'All' ? ORDERS : ORDERS.filter((o) => o.status === filter);

  return (
    <div className="gdg-orders">
      <section className="gdg-page-hero">
        <h1 className="gdg-page-title">Orders</h1>
        <p className="gdg-page-sub">Every gift order you&rsquo;ve placed.</p>
      </section>

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

      <div className="gdg-grid">
        {visible.map((o) => {
          const claimedTotal = o.claimed + o.delivered;
          const pct = o.recipients > 0 ? Math.round((claimedTotal / o.recipients) * 100) : 0;
          const previewRecipients = o.status !== 'Scheduled' && o.status !== 'Draft'
            ? getRecipients(o).slice(0, 4)
            : [];
          return (
            <Link key={o.id} href={`/gifter-dashboard-glow/orders/${o.id}`} className="gdg-card gdg-order-card">
              <div className="gdg-order-poster">
                <span className={`gdg-status gdg-status-${o.status.toLowerCase()}`}>{o.status}</span>
                <span className="gdg-order-poster-amount">{o.budgetPerRecipient}</span>
                <span className="gdg-order-poster-label">per person</span>
              </div>
              <div className="gdg-order-body">
                <div className="gdg-order-name">{o.name}</div>
                <div className="gdg-order-meta">{o.recipients} recipients</div>
                {previewRecipients.length > 0 ? (
                  <>
                    <div className="gdg-progress">
                      <div className="gdg-progress-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <div className="gdg-order-foot">
                      <div className="gdg-avatars">
                        {previewRecipients.map((r, i) => (
                          <span key={r.id} className="gdg-avatar-mini" style={{ background: avatarGradient(r.initials), zIndex: 4 - i }}>
                            {r.initials}
                          </span>
                        ))}
                      </div>
                      <span className="gdg-order-pct">{pct}% claimed</span>
                    </div>
                  </>
                ) : (
                  <div className="gdg-order-foot">
                    <span className="gdg-order-pct gdg-order-pct-dim">Scheduled to send</span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      <style jsx>{`
        .gdg-orders {
          display: flex; flex-direction: column; gap: 24px;
          animation: gdg-fade 380ms cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        @keyframes gdg-fade {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .gdg-page-hero { padding: 24px 0 4px; }
        .gdg-page-title {
          font-family: var(--gdg-display);
          font-size: clamp(40px, 5.5vw, 64px);
          font-weight: 600; letter-spacing: -0.035em;
          line-height: 1; margin: 0 0 10px;
          color: var(--gdg-text);
        }
        .gdg-page-sub {
          font-size: 16px; color: var(--gdg-text-soft); margin: 0;
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

        .gdg-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(248px, 1fr));
          gap: 18px;
        }
        :global(.gdg-card) {
          background: var(--gdg-surface);
          border: 1px solid var(--gdg-hairline);
          border-radius: var(--gdg-radius-lg);
          overflow: hidden;
          text-decoration: none;
          color: var(--gdg-text);
          transition: transform 180ms cubic-bezier(0.22, 0.61, 0.36, 1),
                      border-color 180ms ease, box-shadow 180ms ease;
        }
        :global(.gdg-card:hover) {
          transform: translateY(-3px);
          border-color: rgba(124, 92, 255, 0.5);
          box-shadow: 0 18px 40px -16px rgba(124, 92, 255, 0.45);
        }
        .gdg-order-poster {
          position: relative;
          aspect-ratio: 4 / 3;
          background:
            radial-gradient(circle at 30% 25%, rgba(167, 139, 250, 0.45), transparent 60%),
            linear-gradient(135deg, #2A2150, #1A1530);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 2px;
        }
        .gdg-order-poster-amount {
          font-family: var(--gdg-display);
          font-size: 40px; font-weight: 600;
          letter-spacing: -0.03em; color: #fff;
        }
        .gdg-order-poster-label {
          font-size: 11px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.55);
        }
        .gdg-status {
          position: absolute; top: 12px; left: 12px;
          font-size: 10.5px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.06em;
          padding: 4px 9px; border-radius: 999px; color: #fff;
        }
        .gdg-status-sent      { background: rgba(52, 211, 153, 0.22); color: #6EE7B7; }
        .gdg-status-scheduled { background: rgba(251, 191, 36, 0.22); color: #FCD34D; }
        .gdg-status-completed { background: rgba(96, 165, 250, 0.22); color: #93C5FD; }
        .gdg-status-draft     { background: rgba(255, 255, 255, 0.12); color: rgba(255,255,255,0.7); }
        .gdg-order-body { padding: 14px 16px 16px; }
        .gdg-order-name {
          font-family: var(--gdg-display);
          font-size: 17px; font-weight: 600;
          letter-spacing: -0.015em; color: var(--gdg-text);
        }
        .gdg-order-meta {
          font-size: 12.5px; color: var(--gdg-text-soft); margin-top: 3px;
        }
        .gdg-progress {
          height: 6px; border-radius: 999px;
          background: rgba(255, 255, 255, 0.08);
          overflow: hidden; margin-top: 14px;
        }
        .gdg-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--gdg-purple), var(--gdg-purple-soft));
          border-radius: 999px;
        }
        .gdg-order-foot {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: 12px; gap: 10px;
        }
        .gdg-avatars { display: flex; }
        .gdg-avatar-mini {
          width: 26px; height: 26px; border-radius: 50%;
          border: 2px solid var(--gdg-surface);
          color: #fff; font-size: 9.5px; font-weight: 700;
          display: inline-flex; align-items: center; justify-content: center;
          margin-left: -7px;
        }
        .gdg-avatar-mini:first-child { margin-left: 0; }
        .gdg-order-pct {
          font-size: 12px; font-weight: 600; color: var(--gdg-purple-soft);
        }
        .gdg-order-pct-dim { color: var(--gdg-text-dim); font-weight: 500; }
      `}</style>
    </div>
  );
}

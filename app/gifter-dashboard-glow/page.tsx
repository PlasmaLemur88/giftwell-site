'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  GIFTER, ORDERS, getRecipients, getAllPeople, avatarGradient,
  type GifterOrderStatus,
} from '@/app/gifter-dashboard/data';
import { DigitalUnboxingPreview } from '@/app/gifter-dashboard/components/DigitalUnboxingPreview';

const FILTERS: ('All' | GifterOrderStatus)[] = ['All', 'Sent', 'Scheduled', 'Completed'];

export default function GlowHome() {
  const [filter, setFilter] = useState<typeof FILTERS[number]>('All');

  const counts = useMemo(() => ({
    All:       ORDERS.length,
    Sent:      ORDERS.filter((o) => o.status === 'Sent').length,
    Scheduled: ORDERS.filter((o) => o.status === 'Scheduled').length,
    Completed: ORDERS.filter((o) => o.status === 'Completed').length,
    Draft:     ORDERS.filter((o) => o.status === 'Draft').length,
  }), []);

  const visible = filter === 'All' ? ORDERS : ORDERS.filter((o) => o.status === filter);
  const people = getAllPeople().slice(0, 6);

  return (
    <div className="gdg-home">
      {/* Hero */}
      <section className="gdg-hero">
        <h1 className="gdg-hero-title">Welcome back {GIFTER.name}!</h1>
        <p className="gdg-hero-sub">
          You&rsquo;ve made <strong>220 people</strong> smile this year.{' '}
          <Link href="/gifter-dashboard-glow/orders" className="gdg-hero-link">Send another!</Link>
        </p>
      </section>

      {/* Filter pills */}
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

      {/* Order grid */}
      <div className="gdg-grid">
        {visible.map((o) => {
          const claimedTotal = o.claimed + o.delivered;
          const pct = o.recipients > 0 ? Math.round((claimedTotal / o.recipients) * 100) : 0;
          const previewRecipients = o.status !== 'Scheduled' && o.status !== 'Draft'
            ? getRecipients(o).slice(0, 4)
            : [];
          return (
            <Link key={o.id} href={`/gifter-dashboard-glow/orders/${o.id}`} className="gdg-card gdg-order-card">
              <div className="gdg-order-poster-wrap">
                <DigitalUnboxingPreview design={o.unboxing} aspectRatio="4 / 3" radius={0} />
                <span className={`gdg-status gdg-status-${o.status.toLowerCase()}`}>{o.status}</span>
              </div>
              <div className="gdg-order-body">
                <div className="gdg-order-name">{o.name}</div>
                <div className="gdg-order-meta">{o.recipients} recipients · {o.budgetPerRecipient}/person</div>
                {previewRecipients.length > 0 ? (
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
                ) : (
                  <div className="gdg-order-foot">
                    <span className="gdg-order-pct gdg-order-pct-dim">Scheduled to send</span>
                  </div>
                )}
              </div>
            </Link>
          );
        })}

        {/* New gift card */}
        <Link href="/gifter-dashboard-glow/orders" className="gdg-new-card">
          <span className="gdg-new-plus" aria-hidden>+</span>
          <span className="gdg-new-label">New gift</span>
        </Link>
      </div>

      {/* Your people */}
      <section className="gdg-people-section">
        <div className="gdg-section-head">
          <h2 className="gdg-section-title">Your people</h2>
          <Link href="/gifter-dashboard-glow/people" className="gdg-see-all">See all</Link>
        </div>
        <div className="gdg-people-row">
          {people.map((r) => (
            <div key={r.email} className="gdg-person">
              <span className="gdg-person-avatar" style={{ background: avatarGradient(r.name) }}>
                {r.initials}
              </span>
              <div className="gdg-person-name">{r.name}</div>
              <div className="gdg-person-meta">{r.email}</div>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .gdg-home {
          display: flex; flex-direction: column; gap: 28px;
          animation: gdg-fade 380ms cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        @keyframes gdg-fade {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ─── Hero ─── */
        .gdg-hero { padding: 28px 0 8px; }
        .gdg-hero-title {
          font-family: var(--gdg-display);
          font-size: clamp(44px, 6.5vw, 78px);
          font-weight: 600;
          letter-spacing: -0.035em;
          line-height: 1;
          margin: 0 0 14px;
          color: var(--gdg-text);
        }
        .gdg-hero-sub {
          font-size: 17px;
          color: var(--gdg-text-soft);
          margin: 0;
          font-weight: 400;
        }
        .gdg-hero-sub strong { color: var(--gdg-text); font-weight: 600; }
        .gdg-hero-link {
          color: var(--gdg-purple-soft);
          text-decoration: none;
          font-weight: 600;
        }
        .gdg-hero-link:hover { text-decoration: underline; }

        /* ─── Filter pills ─── */
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
        .gdg-pill-active {
          color: var(--gdg-text);
          border-color: var(--gdg-blue);
        }
        .gdg-pill-count {
          font-size: 12px; font-weight: 600;
          color: var(--gdg-text-dim);
        }
        .gdg-pill-active .gdg-pill-count { color: var(--gdg-blue); }

        /* ─── Order grid ─── */
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
        .gdg-order-poster-wrap {
          position: relative;
        }
        .gdg-status {
          position: absolute; top: 12px; right: 12px;
          font-size: 10.5px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.06em;
          padding: 4px 9px; border-radius: 999px;
          color: #fff;
        }
        .gdg-status-sent      { background: rgba(52, 211, 153, 0.22); color: #6EE7B7; }
        .gdg-status-scheduled { background: rgba(251, 191, 36, 0.22); color: #FCD34D; }
        .gdg-status-completed { background: rgba(96, 165, 250, 0.22); color: #93C5FD; }
        .gdg-status-draft     { background: rgba(255, 255, 255, 0.12); color: rgba(255,255,255,0.7); }
        .gdg-order-body { padding: 14px 16px 16px; }
        .gdg-order-name {
          font-family: var(--gdg-display);
          font-size: 17px; font-weight: 600;
          letter-spacing: -0.015em;
          color: var(--gdg-text);
        }
        .gdg-order-meta {
          font-size: 12.5px; color: var(--gdg-text-soft);
          margin-top: 3px;
        }
        .gdg-order-foot {
          display: flex; align-items: center; justify-content: space-between;
          margin-top: 14px; gap: 10px;
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
          font-size: 12px; font-weight: 600;
          color: var(--gdg-purple-soft);
        }
        .gdg-order-pct-dim { color: var(--gdg-text-dim); font-weight: 500; }

        /* New gift card */
        .gdg-new-card {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 8px;
          min-height: 200px;
          border: 1.5px dashed rgba(255, 255, 255, 0.18);
          border-radius: var(--gdg-radius-lg);
          text-decoration: none;
          color: var(--gdg-text-soft);
          transition: border-color 160ms ease, color 160ms ease, background 160ms ease;
        }
        .gdg-new-card:hover {
          border-color: var(--gdg-purple);
          color: var(--gdg-text);
          background: rgba(124, 92, 255, 0.06);
        }
        .gdg-new-plus {
          font-size: 30px; font-weight: 300; line-height: 0.7;
        }
        .gdg-new-label {
          font-size: 13px; font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.08em;
        }

        /* ─── Your people ─── */
        .gdg-people-section { display: flex; flex-direction: column; gap: 18px; margin-top: 8px; }
        .gdg-section-head {
          display: flex; align-items: center; justify-content: space-between;
        }
        .gdg-section-title {
          font-family: var(--gdg-display);
          font-size: 24px; font-weight: 600;
          letter-spacing: -0.02em;
          margin: 0; color: var(--gdg-text);
        }
        .gdg-see-all {
          padding: 7px 15px; border-radius: 999px;
          background: var(--gdg-pill);
          color: var(--gdg-text-soft);
          font-size: 13px; font-weight: 500;
          text-decoration: none;
          transition: background 140ms ease, color 140ms ease;
        }
        .gdg-see-all:hover { background: var(--gdg-pill-hover); color: var(--gdg-text); }
        .gdg-people-row {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 14px;
        }
        .gdg-person {
          background: var(--gdg-surface);
          border: 1px solid var(--gdg-hairline);
          border-radius: var(--gdg-radius);
          padding: 18px 14px;
          display: flex; flex-direction: column; align-items: center;
          text-align: center;
        }
        .gdg-person-avatar {
          width: 56px; height: 56px; border-radius: 50%;
          color: #fff; font-size: 17px; font-weight: 700;
          display: inline-flex; align-items: center; justify-content: center;
          margin-bottom: 10px;
        }
        .gdg-person-name {
          font-size: 13.5px; font-weight: 600; color: var(--gdg-text);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          max-width: 100%;
        }
        .gdg-person-meta {
          font-size: 11.5px; color: var(--gdg-text-dim);
          margin-top: 2px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          max-width: 100%;
        }
      `}</style>
    </div>
  );
}

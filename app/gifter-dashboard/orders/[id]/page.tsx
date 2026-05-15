'use client';

import { use, useMemo, useState } from 'react';
import Link from 'next/link';
import { ORDERS, getRecipients, avatarGradient, type RecipientStatus } from '../../data';
import { DigitalUnboxingPreview } from '../../components/DigitalUnboxingPreview';

const FILTERS: ('All' | RecipientStatus)[] = ['All', 'Claimed', 'Delivered', 'Pending', 'Bounced'];

const SEGMENT_COLORS: Record<RecipientStatus, string> = {
  Claimed:   'var(--gd-lime)',
  Delivered: 'var(--gd-sky)',
  Pending:   'var(--gd-peach)',
  Bounced:   'var(--gd-pink-soft)',
};

const STATUS_PILL_BG: Record<RecipientStatus, string> = {
  Claimed:   'var(--gd-lime)',
  Delivered: 'var(--gd-sky)',
  Pending:   'var(--gd-peach)',
  Bounced:   'var(--gd-pink-soft)',
};

export default function GifterOrderDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const order = ORDERS.find((o) => o.id === id);
  const [filter, setFilter] = useState<typeof FILTERS[number]>('All');
  const [search, setSearch] = useState('');
  const [actioned, setActioned] = useState<{ id: string; kind: 'copied' | 'resent' } | null>(null);

  function copyLink(rid: string, link: string) {
    navigator.clipboard?.writeText(link);
    setActioned({ id: rid, kind: 'copied' });
    setTimeout(() => setActioned((a) => (a?.id === rid ? null : a)), 1600);
  }
  function resend(rid: string, link: string) {
    navigator.clipboard?.writeText(link);
    setActioned({ id: rid, kind: 'resent' });
    setTimeout(() => setActioned((a) => (a?.id === rid ? null : a)), 1600);
  }

  if (!order) {
    return (
      <div style={{ padding: 24 }}>
        <Link href="/gifter-dashboard/orders" style={{ color: 'var(--gd-pink)', textDecoration: 'none', fontWeight: 600 }}>← back to orders</Link>
        <h1 style={{ marginTop: 16, fontFamily: 'var(--gd-display)', fontStyle: 'italic' }}>Order not found</h1>
        <p style={{ color: 'var(--gd-ink-muted)' }}>No order matches #{id}.</p>
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
      <section className="gd-order-hero">
        <Link href="/gifter-dashboard/orders" className="gd-order-back">
          <span aria-hidden>←</span> back to orders
        </Link>
        <h1 className="gd-order-title">{order.name}</h1>
        <div className="gd-order-meta">
          <span className="gd-meta-chip">{order.recipients} recipients</span>
          <span className="gd-meta-chip">{order.budgetPerRecipient}/person</span>
          <span className="gd-meta-chip gd-meta-chip-pink">{order.status}</span>
        </div>
      </section>

      {/* Digital unboxing showcase */}
      <section className="gd-unboxing">
        <DigitalUnboxingPreview design={order.unboxing} aspectRatio="21 / 9" radius={0} showLabel={false} />
        <div className="gd-unboxing-caption">
          <div>
            <span className="gd-unboxing-kicker"><span aria-hidden>▶</span> Digital unboxing</span>
            <div className="gd-unboxing-theme">{order.unboxing.theme}</div>
            <div className="gd-unboxing-occasion">{order.unboxing.occasion}</div>
          </div>
          <div className="gd-unboxing-msg">&ldquo;{order.unboxing.message}&rdquo;</div>
        </div>
      </section>

      {/* Developer note — explains the prototype vs. production architecture */}
      <aside className="gd-devnote" aria-label="Developer note">
        <span className="gd-devnote-tag">Dev note</span>
        <span className="gd-devnote-body">
          In production this preview re-renders from the same design record as the unboxing experience —
          it&rsquo;s not scraped from the URL. The fields (<code>theme</code>, <code>scene</code>,{' '}
          <code>message</code>, etc.) live on <code>UnboxingDesign</code> in{' '}
          <code>app/gifter-dashboard/data.ts</code>; real captures drop in via <code>previewImage</code>.
          See <code>docs/digital-unboxing.md</code> for the full architecture.
        </span>
      </aside>

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
                  borderRight: '1.5px solid var(--gd-ink)',
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

      <div className="gd-search">
        <span className="gd-search-icon" aria-hidden>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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

      <div className="gd-recipients">
        {filtered.length === 0 ? (
          <div className="gd-empty">No recipients match.</div>
        ) : (
          filtered.map((r) => {
            const isCopied = actioned?.id === r.id && actioned.kind === 'copied';
            const isResent = actioned?.id === r.id && actioned.kind === 'resent';
            return (
              <div key={r.id} className="gd-recipient-row">
                <span className="gd-recipient-avatar" style={{
                  background: avatarGradient(r.initials),
                }}>{r.initials}</span>
                <div className="gd-recipient-meta">
                  <div className="gd-recipient-name">{r.name}</div>
                  <div className="gd-recipient-email">{r.email}</div>
                  {r.picked && (
                    <div className="gd-recipient-picked">picked: {r.picked}{r.tracking ? ` · ${r.tracking}` : ''}</div>
                  )}
                </div>
                <div className="gd-recipient-right">
                  <span className="gd-recipient-status" style={{ background: STATUS_PILL_BG[r.status] }}>
                    {r.status}
                  </span>
                  <div className="gd-rec-actions">
                    <button
                      type="button"
                      className={`gd-rec-action ${isCopied ? 'gd-rec-action-ok' : ''}`}
                      onClick={() => copyLink(r.id, r.link)}
                      title={r.link}
                    >
                      {isCopied ? '✓ Copied' : 'Copy link'}
                    </button>
                    <button
                      type="button"
                      className={`gd-rec-action gd-rec-action-primary ${isResent ? 'gd-rec-action-ok' : ''}`}
                      onClick={() => resend(r.id, r.link)}
                    >
                      {isResent ? '✓ Resent' : 'Resend'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <style jsx>{`
        .gd-order { display: flex; flex-direction: column; gap: 22px; }

        .gd-order-hero { padding: 8px 4px 4px; }
        .gd-order-back {
          display: inline-flex; align-items: center; gap: 6px;
          color: var(--gd-ink); text-decoration: none;
          font-size: 12px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.12em;
          background: var(--gd-paper);
          border: var(--gd-border);
          padding: 5px 12px; border-radius: 999px;
          box-shadow: var(--gd-sticker-sm);
          margin-bottom: 18px;
          transition: transform 140ms ease, box-shadow 140ms ease;
        }
        .gd-order-back:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 var(--gd-ink);
        }
        .gd-order-title {
          font-family: var(--gd-display);
          font-size: clamp(38px, 6vw, 54px);
          font-weight: 500; font-style: italic;
          letter-spacing: -0.025em;
          margin: 0 0 16px;
          color: var(--gd-ink);
          line-height: 1;
        }
        .gd-order-meta {
          display: flex; flex-wrap: wrap; gap: 8px;
        }
        .gd-meta-chip {
          font-size: 12px; font-weight: 600;
          color: var(--gd-ink);
          background: var(--gd-paper);
          border: var(--gd-border);
          padding: 4px 11px;
          border-radius: 999px;
          box-shadow: var(--gd-sticker-sm);
        }
        .gd-meta-chip-pink { background: var(--gd-pink); color: var(--gd-cream); }

        /* Digital unboxing showcase */
        .gd-unboxing {
          background: var(--gd-paper);
          border: var(--gd-border);
          border-radius: var(--gd-radius-lg);
          box-shadow: var(--gd-sticker);
          overflow: hidden;
        }
        .gd-unboxing-caption {
          display: flex; align-items: center; justify-content: space-between;
          gap: 20px; padding: 16px 20px;
          border-top: var(--gd-border);
        }
        .gd-unboxing-kicker {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 10px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: var(--gd-ink-muted);
        }
        .gd-unboxing-kicker span { font-size: 7px; }
        .gd-unboxing-theme {
          font-family: var(--gd-display);
          font-size: 22px; font-weight: 500; font-style: italic;
          letter-spacing: -0.015em; color: var(--gd-ink);
          margin-top: 3px;
        }
        .gd-unboxing-occasion {
          font-size: 13px; color: var(--gd-ink-soft); margin-top: 1px;
          font-weight: 500;
        }
        .gd-unboxing-msg {
          font-family: var(--gd-display);
          font-size: 15px; font-style: italic;
          color: var(--gd-ink-soft);
          text-align: right; max-width: 260px; flex-shrink: 0;
        }
        @media (max-width: 620px) {
          .gd-unboxing-caption { flex-direction: column; align-items: flex-start; gap: 10px; }
          .gd-unboxing-msg { text-align: left; max-width: none; }
        }

        /* Dev note callout */
        .gd-devnote {
          display: flex; align-items: flex-start; gap: 12px;
          padding: 12px 16px;
          background: var(--gd-paper);
          border: 1.5px dashed var(--gd-ink);
          border-radius: var(--gd-radius);
          font-size: 12.5px; line-height: 1.55;
          color: var(--gd-ink-soft);
        }
        .gd-devnote-tag {
          flex-shrink: 0;
          font-size: 10px; font-weight: 800;
          text-transform: uppercase; letter-spacing: 0.12em;
          padding: 3px 8px; border-radius: 4px;
          background: var(--gd-ink); color: var(--gd-cream);
          margin-top: 1px;
        }
        .gd-devnote-body code {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11.5px;
          background: rgba(15, 15, 18, 0.08);
          padding: 1px 5px; border-radius: 3px;
          color: var(--gd-ink);
        }

        .gd-health {
          background: var(--gd-paper);
          border: var(--gd-border);
          border-radius: var(--gd-radius);
          box-shadow: var(--gd-sticker);
          padding: 18px 20px;
        }
        .gd-health-bar {
          height: 14px; border-radius: 999px; overflow: hidden;
          background: rgba(255, 255, 255, 0.5);
          border: 1.5px solid var(--gd-ink);
          display: flex;
          margin-bottom: 16px;
        }
        .gd-health-legend {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .gd-health-legend-item {
          display: flex; flex-direction: column; align-items: flex-start; gap: 4px;
        }
        .gd-health-dot {
          width: 12px; height: 12px; border-radius: 999px;
          border: 1.5px solid var(--gd-ink);
        }
        .gd-health-num {
          font-family: var(--gd-display);
          font-size: 24px; font-weight: 600; font-style: italic;
          color: var(--gd-ink);
          letter-spacing: -0.015em;
          line-height: 1;
        }
        .gd-health-label {
          font-size: 11px; color: var(--gd-ink); font-weight: 600;
          text-transform: uppercase; letter-spacing: 0.1em;
        }
        @media (min-width: 901px) {
          .gd-health-legend { grid-template-columns: repeat(4, max-content); gap: 32px; }
        }

        .gd-filters { display: flex; gap: 8px; flex-wrap: wrap; }
        .gd-chip {
          all: unset; cursor: pointer;
          display: inline-flex; align-items: center; gap: 7px;
          padding: 7px 13px; border-radius: 999px;
          background: var(--gd-paper);
          color: var(--gd-ink);
          border: var(--gd-border);
          font-size: 13px; font-weight: 600;
          box-shadow: var(--gd-sticker-sm);
          transition: transform 140ms ease, box-shadow 140ms ease;
        }
        .gd-chip:hover {
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0 var(--gd-ink);
        }
        .gd-chip-active {
          background: var(--gd-ink); color: var(--gd-cream);
        }
        .gd-chip-count {
          font-size: 11px; font-weight: 700;
          padding: 1px 7px; border-radius: 999px;
          background: rgba(0, 0, 0, 0.08);
        }
        .gd-chip-active .gd-chip-count {
          background: var(--gd-lime); color: var(--gd-ink);
        }

        .gd-search {
          position: relative;
          background: var(--gd-paper);
          border: var(--gd-border);
          border-radius: 12px;
          box-shadow: var(--gd-sticker-sm);
          display: flex; align-items: center;
        }
        .gd-search-icon {
          padding: 0 8px 0 14px; color: var(--gd-ink);
          display: inline-flex; align-items: center;
        }
        .gd-search input {
          flex: 1;
          padding: 12px 16px 12px 4px;
          border: none; background: transparent;
          font-size: 14px; outline: none; color: var(--gd-ink);
          font-family: inherit; font-weight: 500;
        }
        .gd-search input::placeholder { color: var(--gd-ink-muted); }

        .gd-recipients {
          background: var(--gd-paper);
          border: var(--gd-border);
          border-radius: var(--gd-radius-lg);
          box-shadow: var(--gd-sticker);
          overflow: hidden;
        }
        .gd-recipient-row {
          display: flex; align-items: center; gap: 14px;
          padding: 15px 18px;
          border-bottom: 1px solid rgba(15, 15, 18, 0.1);
        }
        .gd-recipient-row:last-child { border-bottom: none; }
        .gd-recipient-avatar {
          width: 40px; height: 40px; border-radius: 50%;
          border: 1.5px solid var(--gd-ink);
          color: #fff; font-size: 13px; font-weight: 700;
          display: inline-flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .gd-recipient-meta { flex: 1; min-width: 0; }
        .gd-recipient-name {
          font-size: 14.5px; font-weight: 600; color: var(--gd-ink);
        }
        .gd-recipient-email {
          font-size: 12.5px; color: var(--gd-ink-muted); margin-top: 1px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .gd-recipient-picked {
          font-size: 12px; color: var(--gd-ink-soft); margin-top: 4px;
          font-family: ui-monospace, monospace;
        }
        .gd-recipient-right {
          display: flex; align-items: center; gap: 10px; flex-shrink: 0;
        }
        .gd-recipient-status {
          font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
          padding: 4px 11px; border-radius: 999px;
          color: var(--gd-ink);
          border: 1.5px solid var(--gd-ink);
        }
        .gd-rec-actions {
          display: inline-flex; align-items: center; gap: 6px;
        }
        .gd-rec-action {
          all: unset; cursor: pointer;
          font-size: 11px; font-weight: 700;
          color: var(--gd-ink); padding: 5px 11px;
          border-radius: 999px;
          background: var(--gd-paper);
          border: 1.5px solid var(--gd-ink);
          box-shadow: 2px 2px 0 var(--gd-ink);
          text-transform: uppercase; letter-spacing: 0.05em;
          white-space: nowrap;
          transition: transform 140ms ease, box-shadow 140ms ease, background 140ms ease;
        }
        .gd-rec-action:hover {
          transform: translate(-1px, -1px);
          box-shadow: 3px 3px 0 var(--gd-ink);
        }
        .gd-rec-action-primary {
          background: var(--gd-lime);
        }
        .gd-rec-action-ok {
          background: var(--gd-sky) !important;
          color: var(--gd-ink) !important;
        }

        .gd-empty {
          padding: 36px; text-align: center;
          color: var(--gd-ink-muted); font-size: 14px;
          font-family: var(--gd-display); font-style: italic;
        }
      `}</style>
    </div>
  );
}

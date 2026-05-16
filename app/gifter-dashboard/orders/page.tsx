'use client';

import Link from 'next/link';
import { ORDERS } from '../data';
import { DigitalUnboxingPreview } from '../components/DigitalUnboxingPreview';

const ROW_TINTS = ['var(--gd-paper)', 'var(--gd-peach)', 'var(--gd-sky)', 'var(--gd-pink-soft)'];

export default function GifterOrders() {
  return (
    <div className="gd-orders-page">
      <header className="gd-page-header">
        <span className="gd-eyebrow">All orders</span>
        <h1>
          Every <em>gift</em> you&rsquo;ve sent.
        </h1>
      </header>

      <div className="gd-orders-list">
        {ORDERS.map((o, idx) => {
          const claimedTotal = o.claimed + o.delivered;
          const pct = o.recipients > 0 ? Math.round((claimedTotal / o.recipients) * 100) : 0;
          return (
            <Link
              key={o.id}
              href={`/gifter-dashboard/orders/${o.id}`}
              className="gd-order-row"
              style={{ background: ROW_TINTS[idx % ROW_TINTS.length] }}
            >
              <div className="gd-row-thumb">
                <DigitalUnboxingPreview design={o.unboxing} aspectRatio="1 / 1" radius={10} bordered showLabel={false} />
              </div>
              <div className="gd-row-main">
                <div className="gd-row-name">{o.name}</div>
                <div className="gd-row-sub">
                  {o.recipients} recipients · {o.budgetPerRecipient}/person
                </div>
              </div>

              <div className="gd-row-progress">
                {(o.status === 'Sent' || o.status === 'Completed') && (
                  <>
                    <div className="gd-row-pct"><strong>{pct}%</strong> claimed</div>
                    <div className="gd-row-bar">
                      <div className="gd-row-bar-fill" style={{ width: `${pct}%` }} />
                    </div>
                  </>
                )}
              </div>

              <span className="gd-row-status">{o.status}</span>
              <span className="gd-row-arrow" aria-hidden>→</span>
            </Link>
          );
        })}
      </div>

      <style jsx>{`
        .gd-orders-page { display: flex; flex-direction: column; gap: 28px; }

        .gd-page-header { padding: 8px 4px 4px; }
        .gd-eyebrow {
          display: inline-flex; align-items: center;
          font-size: 11.5px; font-weight: 700;
          color: var(--gd-ink); text-transform: uppercase;
          letter-spacing: 0.14em;
          background: var(--gd-lime);
          border: var(--gd-border);
          padding: 5px 12px;
          border-radius: 999px;
          box-shadow: var(--gd-sticker-sm);
          margin-bottom: 18px;
        }
        .gd-page-header h1 {
          font-family: var(--gd-display);
          font-size: clamp(36px, 5.5vw, 52px);
          font-weight: 500;
          letter-spacing: -0.025em;
          line-height: 1.02;
          margin: 0;
          color: var(--gd-ink);
        }
        .gd-page-header h1 em {
          font-style: italic; color: var(--gd-pink);
        }

        .gd-orders-list {
          display: flex; flex-direction: column;
          gap: 18px;
          padding: 4px 6px 16px;
        }
        :global(.gd-order-row) {
          display: grid;
          grid-template-columns: 72px 1fr 200px auto 20px;
          align-items: center;
          gap: 18px;
          padding: 16px 22px;
          border: var(--gd-border);
          border-radius: var(--gd-radius-lg);
          box-shadow: var(--gd-sticker);
          text-decoration: none;
          color: var(--gd-ink);
          transition: transform 160ms ease, box-shadow 160ms ease;
        }
        :global(.gd-order-row:hover) {
          transform: translate(-3px, -3px);
          box-shadow: 7px 7px 0 var(--gd-ink);
        }
        .gd-row-thumb { width: 72px; }
        .gd-row-main { min-width: 0; }
        .gd-row-name {
          font-family: var(--gd-display);
          font-size: 20px; font-weight: 500; font-style: italic;
          letter-spacing: -0.015em;
          color: var(--gd-ink);
        }
        .gd-row-sub {
          font-size: 13px; color: var(--gd-ink-soft);
          margin-top: 4px; font-weight: 500;
        }
        .gd-row-progress { min-width: 0; }
        .gd-row-pct {
          font-family: var(--gd-display);
          font-size: 14px; font-style: italic;
          color: var(--gd-ink); margin-bottom: 6px;
        }
        .gd-row-pct strong { font-weight: 600; color: var(--gd-pink); }
        .gd-row-bar {
          height: 8px;
          border: 1.5px solid var(--gd-ink);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.5);
          overflow: hidden;
        }
        .gd-row-bar-fill {
          height: 100%;
          background: var(--gd-lime);
          border-right: 1.5px solid var(--gd-ink);
        }
        .gd-row-status {
          font-size: 11px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
          padding: 5px 11px; border-radius: 999px;
          background: var(--gd-ink); color: var(--gd-cream);
          white-space: nowrap;
        }
        .gd-row-arrow {
          font-family: var(--gd-display);
          font-size: 22px; font-style: italic;
          color: var(--gd-ink); font-weight: 500;
        }

        @media (max-width: 720px) {
          :global(.gd-order-row) {
            grid-template-columns: 56px 1fr auto;
            grid-template-areas:
              "thumb name status"
              "progress progress progress";
            gap: 10px 14px;
          }
          .gd-row-thumb { grid-area: thumb; width: 56px; }
          .gd-row-main { grid-area: name; }
          .gd-row-progress { grid-area: progress; }
          .gd-row-status { grid-area: status; align-self: center; }
          .gd-row-arrow { display: none; }
        }
      `}</style>
    </div>
  );
}

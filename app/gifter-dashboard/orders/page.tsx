'use client';

import Link from 'next/link';
import { BRAND, ORDERS, ORDER_STATUS_COLORS } from '../data';

export default function GifterOrders() {
  return (
    <div className="gd-orders-page">
      <header className="gd-page-header">
        <h1>Orders</h1>
        <p>All gift orders you've placed.</p>
      </header>

      <div className="gd-orders-list">
        {ORDERS.map((o) => {
          const claimedTotal = o.claimed + o.delivered;
          const pct = o.recipients > 0 ? Math.round((claimedTotal / o.recipients) * 100) : 0;
          const tone = ORDER_STATUS_COLORS[o.status];
          return (
            <Link key={o.id} href={`/gifter-dashboard/orders/${o.id}`} className="gd-order-row">
              <div className="gd-order-row-meta">
                <div className="gd-order-row-name">{o.name}</div>
                <div className="gd-order-row-sub">
                  {o.status === 'Scheduled' && o.scheduledDate
                    ? `Scheduled ${o.scheduledDate}`
                    : o.sentDate ? `Sent ${o.sentDate}` : 'Draft'}
                  {' · '}{o.recipients} recipients · {o.budgetPerRecipient}/person
                </div>
              </div>
              <div className="gd-order-row-progress">
                {(o.status === 'Sent' || o.status === 'Completed') && (
                  <>
                    <div className="gd-order-row-pct">{pct}% claimed</div>
                    <div className="gd-progress">
                      <div className="gd-progress-fill" style={{ width: `${pct}%` }} />
                    </div>
                  </>
                )}
              </div>
              <span className="gd-order-row-status" style={{ background: tone.bg, color: tone.fg }}>
                {o.status}
              </span>
              <span className="gd-order-row-chev" aria-hidden>›</span>
            </Link>
          );
        })}
      </div>

      <style jsx>{`
        .gd-orders-page { display: flex; flex-direction: column; gap: 20px; }
        .gd-page-header { padding: 4px 8px 8px; color: #fff; }
        .gd-page-header h1 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 38px; font-weight: 400; font-style: italic;
          letter-spacing: -0.02em; margin: 0 0 4px;
          color: #fff;
        }
        .gd-page-header p { font-size: 14.5px; color: rgba(255, 255, 255, 0.85); margin: 0; }

        .gd-orders-list { display: flex; flex-direction: column; gap: 10px; }
        .gd-order-row {
          background: #fff;
          border: 1px solid rgba(15, 15, 25, 0.06);
          border-radius: 14px;
          padding: 16px 20px;
          display: grid;
          grid-template-columns: 1fr 200px auto 16px;
          align-items: center;
          gap: 16px;
          text-decoration: none; color: inherit;
          box-shadow: 0 4px 14px -8px rgba(20, 14, 50, 0.15);
          transition: border-color 160ms ease, transform 160ms ease, box-shadow 160ms ease;
        }
        .gd-order-row:hover {
          border-color: rgba(15, 15, 25, 0.18);
          transform: translateY(-1px);
          box-shadow: 0 10px 24px -10px rgba(20, 14, 50, 0.25);
        }
        .gd-order-row-name { font-size: 15px; font-weight: 600; color: #1a1a1f; }
        .gd-order-row-sub { font-size: 13px; color: #43434b; margin-top: 3px; }
        .gd-order-row-pct { font-size: 12px; color: #43434b; margin-bottom: 5px; font-weight: 500; }
        .gd-progress { height: 4px; border-radius: 999px; background: #f0f0f2; overflow: hidden; }
        .gd-progress-fill { height: 100%; background: #1F8A4C; }
        .gd-order-row-status {
          font-size: 11.5px; font-weight: 600;
          padding: 3px 9px; border-radius: 999px;
        }
        .gd-order-row-chev { color: #c4c4ca; font-size: 22px; }

        @media (max-width: 640px) {
          .gd-order-row {
            grid-template-columns: 1fr auto;
            grid-template-areas: 'meta status' 'progress progress';
          }
          .gd-order-row-meta { grid-area: meta; }
          .gd-order-row-status { grid-area: status; align-self: flex-start; }
          .gd-order-row-progress { grid-area: progress; }
          .gd-order-row-chev { display: none; }
        }
      `}</style>
    </div>
  );
}

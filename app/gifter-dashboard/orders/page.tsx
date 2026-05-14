'use client';

import Link from 'next/link';
import { BRAND, ORDERS, ORDER_STATUS_COLORS } from '../data';

const CARD_STYLE: React.CSSProperties = {
  background: '#fff',
  border: '1px solid rgba(15, 15, 25, 0.06)',
  borderRadius: 14,
  padding: '16px 20px',
  display: 'grid',
  gridTemplateColumns: '1fr 200px auto 16px',
  alignItems: 'center',
  gap: 16,
  textDecoration: 'none',
  color: 'inherit',
  boxShadow: '0 4px 14px -8px rgba(20, 14, 50, 0.15)',
  transition: 'border-color 160ms ease, transform 160ms ease, box-shadow 160ms ease',
};

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
            <Link
              key={o.id}
              href={`/gifter-dashboard/orders/${o.id}`}
              style={CARD_STYLE}
              className="gd-order-row"
            >
              <div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1f' }}>{o.name}</div>
                <div style={{ fontSize: 13, color: '#43434b', marginTop: 3 }}>
                  {o.recipients} recipients · {o.budgetPerRecipient}/person
                </div>
              </div>
              <div>
                {(o.status === 'Sent' || o.status === 'Completed') && (
                  <>
                    <div style={{ fontSize: 12, color: '#43434b', marginBottom: 5, fontWeight: 500 }}>
                      {pct}% claimed
                    </div>
                    <div style={{ height: 4, borderRadius: 999, background: '#f0f0f2', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: '#1F8A4C' }} />
                    </div>
                  </>
                )}
              </div>
              <span style={{
                fontSize: 11.5, fontWeight: 600,
                padding: '3px 9px', borderRadius: 999,
                background: tone.bg, color: tone.fg, whiteSpace: 'nowrap',
              }}>
                {o.status}
              </span>
              <span style={{ color: '#c4c4ca', fontSize: 22 }} aria-hidden>›</span>
            </Link>
          );
        })}
      </div>

      <style jsx>{`
        .gd-orders-page { display: flex; flex-direction: column; gap: 20px; }
        .gd-page-header { padding: 4px 8px 8px; color: var(--gd-text); }
        .gd-page-header h1 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 38px; font-weight: 400; font-style: italic;
          letter-spacing: -0.02em; margin: 0 0 4px;
          color: var(--gd-text);
        }
        .gd-page-header p {
          font-size: 14.5px; color: var(--gd-text);
          margin: 0; font-weight: 500;
          text-shadow: var(--gd-text-shadow);
        }
        .gd-orders-list { display: flex; flex-direction: column; gap: 10px; }
        :global(.gd-order-row:hover) {
          border-color: rgba(15, 15, 25, 0.18) !important;
          transform: translateY(-1px);
          box-shadow: 0 10px 24px -10px rgba(20, 14, 50, 0.25) !important;
        }
      `}</style>
    </div>
  );
}

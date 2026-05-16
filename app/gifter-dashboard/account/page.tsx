'use client';

import { GIFTER } from '../data';

export default function AccountPage() {
  return (
    <div className="gd-account">
      <header className="gd-page-header">
        <span className="gd-eyebrow">Your account</span>
        <h1>Profile &amp; <em>preferences</em>.</h1>
      </header>

      <section className="gd-card gd-card-paper" style={{ transform: 'rotate(-0.4deg)' }}>
        <div className="gd-card-head">
          <h2 className="gd-card-title">Profile</h2>
          <button className="gd-edit">Edit</button>
        </div>
        <dl className="gd-fields">
          <Field label="Name" value={GIFTER.fullName} />
          <Field label="Email" value={GIFTER.email} />
          <Field label="Company" value={GIFTER.company} />
        </dl>
      </section>

      <section className="gd-card gd-card-peach" style={{ transform: 'rotate(0.6deg)' }}>
        <div className="gd-card-head">
          <h2 className="gd-card-title">Billing</h2>
          <button className="gd-edit">Update card</button>
        </div>
        <div className="gd-card-row">
          <div className="gd-card-icon">VISA</div>
          <div style={{ flex: 1 }}>
            <div className="gd-row-name">Visa ending in 4242</div>
            <div className="gd-row-sub">Expires 09/28</div>
          </div>
        </div>
      </section>

      <section className="gd-card gd-card-paper" style={{ transform: 'rotate(-0.3deg)' }}>
        <div className="gd-card-head">
          <h2 className="gd-card-title">Email preferences</h2>
        </div>
        <PrefRow label="Order updates"           sub="When a gift is sent, claimed, shipped, or delivered" on />
        <PrefRow label="Recipient claim recaps"  sub="Milestones at 25, 50, 75, and 100% claimed"            on />
        <PrefRow label="Product news"            sub="New themes, posters, and seasonal collections"         on={false} />
      </section>

      <button className="gd-signout">Sign out</button>

      <style jsx>{`
        .gd-account { display: flex; flex-direction: column; gap: 24px; }

        .gd-page-header { padding: 8px 4px 4px; }
        .gd-eyebrow {
          display: inline-flex;
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
        .gd-page-header h1 em { font-style: italic; color: var(--gd-pink); }

        .gd-card {
          border: var(--gd-border);
          border-radius: var(--gd-radius-lg);
          box-shadow: var(--gd-sticker);
          padding: 20px 24px;
        }
        .gd-card-paper { background: var(--gd-paper); }
        .gd-card-peach { background: var(--gd-peach); }
        .gd-card-head {
          display: flex; justify-content: space-between; align-items: baseline;
          margin-bottom: 16px;
        }
        .gd-card-title {
          font-family: var(--gd-display);
          font-size: 22px; font-weight: 500; font-style: italic;
          color: var(--gd-ink);
          margin: 0; letter-spacing: -0.015em;
        }
        .gd-edit {
          all: unset; cursor: pointer;
          font-size: 11.5px; font-weight: 700;
          color: var(--gd-ink);
          text-transform: uppercase; letter-spacing: 0.06em;
          background: var(--gd-cream);
          border: 1.5px solid var(--gd-ink);
          padding: 6px 13px; border-radius: 999px;
          box-shadow: 3px 3px 0 var(--gd-ink);
          transition: transform 140ms ease, box-shadow 140ms ease, background 140ms ease;
        }
        .gd-edit:hover {
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0 var(--gd-ink);
          background: var(--gd-lime);
        }

        .gd-fields {
          display: flex; flex-direction: column; gap: 12px;
          margin: 0; padding: 0;
        }

        .gd-card-row {
          display: flex; align-items: center; gap: 14px;
        }
        .gd-card-icon {
          width: 56px; height: 36px; border-radius: 8px;
          background: var(--gd-cream);
          border: 1.5px solid var(--gd-ink);
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 800; color: var(--gd-ink);
          letter-spacing: 0.05em;
        }
        .gd-row-name { font-size: 14.5px; font-weight: 600; color: var(--gd-ink); }
        .gd-row-sub { font-size: 12.5px; color: var(--gd-ink-soft); margin-top: 2px; }

        .gd-signout {
          all: unset; cursor: pointer;
          color: var(--gd-ink);
          font-size: 12px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
          background: var(--gd-pink);
          border: 1.5px solid var(--gd-ink);
          padding: 10px 18px; border-radius: 999px;
          box-shadow: var(--gd-sticker-sm);
          align-self: flex-start;
          transition: transform 140ms ease, box-shadow 140ms ease;
        }
        .gd-signout:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 var(--gd-ink);
        }
      `}</style>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 12,
      padding: '10px 0',
      borderTop: '1px solid rgba(15, 15, 18, 0.1)',
    }}>
      <dt style={{
        fontSize: 11.5,
        color: 'var(--gd-ink)',
        margin: 0,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
      }}>{label}</dt>
      <dd style={{
        fontSize: 14.5,
        color: 'var(--gd-ink)',
        fontWeight: 600,
        margin: 0,
      }}>{value}</dd>
    </div>
  );
}

function PrefRow({ label, sub, on }: { label: string; sub: string; on: boolean }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 14,
      padding: '14px 0',
      borderTop: '1px solid rgba(15, 15, 18, 0.1)',
    }}>
      <div>
        <div style={{ fontSize: 14.5, fontWeight: 600, color: 'var(--gd-ink)' }}>{label}</div>
        <div style={{ fontSize: 12.5, color: 'var(--gd-ink-soft)', marginTop: 2 }}>{sub}</div>
      </div>
      <span style={{
        width: 42, height: 24, borderRadius: 999,
        background: on ? 'var(--gd-lime)' : 'var(--gd-cream)',
        border: '1.5px solid var(--gd-ink)',
        position: 'relative', flexShrink: 0,
      }}>
        <span style={{
          position: 'absolute', top: 1, left: on ? 19 : 1,
          width: 18, height: 18, borderRadius: 999,
          background: 'var(--gd-ink)',
          transition: 'left 180ms cubic-bezier(0.4, 0, 0.2, 1)',
        }} />
      </span>
    </div>
  );
}

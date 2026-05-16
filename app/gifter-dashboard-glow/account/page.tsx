'use client';

import { GIFTER } from '@/app/gifter-dashboard/data';

export default function GlowAccount() {
  return (
    <div className="gdg-account">
      <section className="gdg-page-hero">
        <h1 className="gdg-page-title">Account</h1>
        <p className="gdg-page-sub">Your profile, billing, and preferences.</p>
      </section>

      <section className="gdg-card">
        <div className="gdg-card-head">
          <h2 className="gdg-card-title">Profile</h2>
          <button className="gdg-edit">Edit</button>
        </div>
        <dl className="gdg-fields">
          <Field label="Name" value={GIFTER.fullName} />
          <Field label="Email" value={GIFTER.email} />
          <Field label="Company" value={GIFTER.company} />
        </dl>
      </section>

      <section className="gdg-card">
        <div className="gdg-card-head">
          <h2 className="gdg-card-title">Billing</h2>
          <button className="gdg-edit">Update card</button>
        </div>
        <div className="gdg-card-row">
          <div className="gdg-card-icon">VISA</div>
          <div style={{ flex: 1 }}>
            <div className="gdg-row-name">Visa ending in 4242</div>
            <div className="gdg-row-sub">Expires 09/28</div>
          </div>
        </div>
      </section>

      <section className="gdg-card">
        <div className="gdg-card-head">
          <h2 className="gdg-card-title">Email preferences</h2>
        </div>
        <PrefRow label="Order updates"          sub="When a gift is sent, claimed, shipped, or delivered" on />
        <PrefRow label="Recipient claim recaps" sub="Milestones at 25, 50, 75, and 100% claimed"            on />
        <PrefRow label="Product news"           sub="New themes, posters, and seasonal collections"         on={false} />
      </section>

      <button className="gdg-signout">Sign out</button>

      <style jsx>{`
        .gdg-account {
          display: flex; flex-direction: column; gap: 18px;
          animation: gdg-fade 380ms cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        @keyframes gdg-fade {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .gdg-page-hero { padding: 24px 0 6px; }
        .gdg-page-title {
          font-family: var(--gdg-display);
          font-size: clamp(40px, 5.5vw, 64px);
          font-weight: 600; letter-spacing: -0.035em;
          line-height: 1; margin: 0 0 10px;
          color: var(--gdg-text);
        }
        .gdg-page-sub { font-size: 16px; color: var(--gdg-text-soft); margin: 0; }

        .gdg-card {
          background: var(--gdg-surface);
          border: 1px solid var(--gdg-hairline);
          border-radius: var(--gdg-radius);
          padding: 20px 22px;
        }
        .gdg-card-head {
          display: flex; justify-content: space-between; align-items: baseline;
          margin-bottom: 16px;
        }
        .gdg-card-title {
          font-family: var(--gdg-display);
          font-size: 18px; font-weight: 600;
          letter-spacing: -0.015em; margin: 0;
          color: var(--gdg-text);
        }
        .gdg-edit {
          all: unset; cursor: pointer;
          font-size: 12.5px; font-weight: 600;
          color: var(--gdg-purple-soft);
          padding: 6px 13px; border-radius: 999px;
          background: var(--gdg-pill);
          border: 1px solid var(--gdg-hairline);
          transition: background 140ms ease;
        }
        .gdg-edit:hover { background: var(--gdg-pill-hover); }

        .gdg-fields { display: flex; flex-direction: column; margin: 0; padding: 0; }

        .gdg-card-row { display: flex; align-items: center; gap: 14px; }
        .gdg-card-icon {
          width: 52px; height: 34px; border-radius: 7px;
          background: var(--gdg-pill);
          border: 1px solid var(--gdg-hairline);
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 800; color: var(--gdg-text);
          letter-spacing: 0.04em;
        }
        .gdg-row-name { font-size: 14px; font-weight: 600; color: var(--gdg-text); }
        .gdg-row-sub { font-size: 12.5px; color: var(--gdg-text-soft); margin-top: 2px; }

        .gdg-signout {
          all: unset; cursor: pointer;
          align-self: flex-start;
          color: #FCA5A5;
          font-size: 13.5px; font-weight: 600;
          padding: 10px 18px; border-radius: 999px;
          background: rgba(248, 113, 113, 0.12);
          border: 1px solid rgba(248, 113, 113, 0.25);
          transition: background 140ms ease;
        }
        .gdg-signout:hover { background: rgba(248, 113, 113, 0.2); }
      `}</style>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12,
      padding: '12px 0', borderTop: '1px solid var(--gdg-hairline)',
    }}>
      <dt style={{ fontSize: 13, color: 'var(--gdg-text-dim)', margin: 0, fontWeight: 500 }}>{label}</dt>
      <dd style={{ fontSize: 14, color: 'var(--gdg-text)', fontWeight: 500, margin: 0 }}>{value}</dd>
    </div>
  );
}

function PrefRow({ label, sub, on }: { label: string; sub: string; on: boolean }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14,
      padding: '14px 0', borderTop: '1px solid var(--gdg-hairline)',
    }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--gdg-text)' }}>{label}</div>
        <div style={{ fontSize: 12.5, color: 'var(--gdg-text-dim)', marginTop: 2 }}>{sub}</div>
      </div>
      <span style={{
        width: 40, height: 23, borderRadius: 999,
        background: on ? 'var(--gdg-purple)' : 'var(--gdg-pill)',
        border: on ? 'none' : '1px solid var(--gdg-hairline)',
        position: 'relative', flexShrink: 0,
        transition: 'background 160ms ease',
      }}>
        <span style={{
          position: 'absolute', top: 3, left: on ? 20 : 3,
          width: 17, height: 17, borderRadius: 999, background: '#fff',
          transition: 'left 160ms cubic-bezier(0.4, 0, 0.2, 1)',
        }} />
      </span>
    </div>
  );
}

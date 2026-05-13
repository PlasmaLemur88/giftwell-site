'use client';

import { GIFTER, BRAND } from '../data';

export default function AccountPage() {
  return (
    <div className="gd-account">
      <header className="gd-page-header">
        <h1>Account</h1>
        <p>Your profile, billing, and preferences.</p>
      </header>

      <section className="gd-card">
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

      <section className="gd-card">
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

      <section className="gd-card">
        <div className="gd-card-head">
          <h2 className="gd-card-title">Email preferences</h2>
        </div>
        <PrefRow label="Order updates"           sub="When a gift is sent, claimed, shipped, or delivered" on />
        <PrefRow label="Recipient claim recaps"  sub="Milestones at 25, 50, 75, and 100% claimed"            on />
        <PrefRow label="Product news"            sub="New themes, posters, and seasonal collections"         on={false} />
      </section>

      <section className="gd-card">
        <button className="gd-signout">Sign out</button>
      </section>

      <style jsx>{`
        .gd-account { display: flex; flex-direction: column; gap: 18px; }
        .gd-page-header { padding: 4px 8px 8px; color: #fff; }
        .gd-page-header h1 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 38px; font-weight: 400; font-style: italic;
          letter-spacing: -0.02em; margin: 0 0 6px;
          color: #fff;
        }
        .gd-page-header p {
          font-size: 14.5px; color: #fff; font-weight: 500;
          margin: 0; text-shadow: 0 1px 2px rgba(20, 14, 50, 0.25);
        }

        .gd-card {
          background: #fff;
          border: 1px solid rgba(15, 15, 25, 0.06);
          border-radius: 14px;
          padding: 18px 22px;
          box-shadow: 0 4px 14px -8px rgba(20, 14, 50, 0.15);
        }
        .gd-card-head {
          display: flex; justify-content: space-between; align-items: baseline;
          margin-bottom: 16px;
        }
        .gd-card-title {
          font-size: 15px; font-weight: 600; color: #1a1a1f;
          margin: 0; letter-spacing: -0.005em;
        }
        .gd-edit {
          all: unset; cursor: pointer;
          font-size: 13px; font-weight: 600;
          color: ${BRAND};
          padding: 6px 10px; border-radius: 8px;
          transition: background 120ms ease;
        }
        .gd-edit:hover { background: rgba(124, 92, 255, 0.08); }

        .gd-fields {
          display: flex; flex-direction: column; gap: 12px;
          margin: 0; padding: 0;
        }

        .gd-card-row {
          display: flex; align-items: center; gap: 14px;
        }
        .gd-card-icon {
          width: 48px; height: 32px; border-radius: 6px;
          background: #f3f3f5; border: 1px solid #ececef;
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; color: #1a1a1f;
        }
        .gd-row-name { font-size: 14px; font-weight: 600; color: #1a1a1f; }
        .gd-row-sub { font-size: 12.5px; color: #5a5a62; margin-top: 2px; }

        .gd-signout {
          all: unset; cursor: pointer;
          color: #B91C1C;
          font-size: 14px; font-weight: 600;
          padding: 4px 0;
        }
        .gd-signout:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
      <dt style={{ fontSize: 13, color: '#5a5a62', margin: 0 }}>{label}</dt>
      <dd style={{ fontSize: 14, color: '#1a1a1f', fontWeight: 500, margin: 0 }}>{value}</dd>
    </div>
  );
}

function PrefRow({ label, sub, on }: { label: string; sub: string; on: boolean }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 14,
      padding: '12px 0', borderTop: '1px solid #f0f0f2',
    }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1f' }}>{label}</div>
        <div style={{ fontSize: 12.5, color: '#5a5a62', marginTop: 2 }}>{sub}</div>
      </div>
      <span style={{
        width: 36, height: 20, borderRadius: 999,
        background: on ? '#1F8A4C' : '#dcdcde',
        position: 'relative', flexShrink: 0,
      }}>
        <span style={{
          position: 'absolute', top: 2, left: on ? 18 : 2,
          width: 16, height: 16, borderRadius: 999, background: '#fff',
          boxShadow: '0 1px 2px rgba(0,0,0,0.18)',
          transition: 'left 160ms cubic-bezier(0.4, 0, 0.2, 1)',
        }} />
      </span>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { BRAND, avatarGradient, ORDERS, getRecipients, getAllPeople, type Recipient } from '../data';
import { GlassButton } from '@/components/ui/apple-tahoe-liquid-glass-button';

function formatForCopy(recipients: Recipient[]): string {
  return recipients.map((r) => `${r.name} <${r.email}>`).join('\n');
}

export default function PeoplePage() {
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const handleCopy = (id: string, recipients: Recipient[]) => {
    void navigator.clipboard?.writeText(formatForCopy(recipients)).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId((curr) => (curr === id ? null : curr)), 1800);
  };

  const allPeople = getAllPeople();
  const filteredDirectory = !search.trim()
    ? allPeople
    : allPeople.filter((r) => {
        const q = search.toLowerCase();
        return r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q);
      });

  return (
    <div className="gd-people">
      <header className="gd-page-header">
        <h1>People</h1>
        <p>
          Everyone you've ever gifted to, grouped by the campaign you sent them in.
          Copy any list and paste it into a Giftwell gifting flow on any merchant's store.
        </p>
      </header>

      {/* Recent campaigns — one card per past order */}
      <section className="gd-lists-section">
        <div className="gd-lists-head">
          <h2 className="gd-section-title">Your campaigns</h2>
          <button className="gd-add-link" onClick={() => setAddOpen(!addOpen)}>
            {addOpen ? '× Close' : '+ Add or import people'}
          </button>
        </div>

        {addOpen && (
          <div className="gd-add-card">
            <div className="gd-add-title">Add to your saved people</div>
            <textarea
              placeholder={`Avery Stone, avery@maplecourt.io\nMaya Greene <maya@northglobe.com>`}
              rows={3}
            />
            <div className="gd-add-actions">
              <button className="gd-add-secondary" onClick={() => setAddOpen(false)}>Cancel</button>
              <button className="gd-add-primary">Save to list</button>
            </div>
          </div>
        )}

        <div className="gd-lists-grid">
          {/* Everyone card — primary */}
          <CampaignCard
            id="everyone"
            label="Everyone"
            sublabel={`${allPeople.length} unique people across all campaigns`}
            recipients={allPeople}
            primary
            copied={copiedId === 'everyone'}
            onCopy={() => handleCopy('everyone', allPeople)}
          />

          {/* One card per past order */}
          {ORDERS.map((o) => {
            const recipients = getRecipients(o);
            return (
              <CampaignCard
                key={o.id}
                id={o.id}
                label={o.name}
                sublabel={`${recipients.length} ${recipients.length === 1 ? 'person' : 'people'} · ${o.status}`}
                recipients={recipients}
                copied={copiedId === o.id}
                onCopy={() => handleCopy(o.id, recipients)}
              />
            );
          })}
        </div>
      </section>

      {/* Directory — searchable + individual copy */}
      <section className="gd-directory">
        <div className="gd-directory-head">
          <h2 className="gd-section-title">All people</h2>
          <p className="gd-directory-sub">{allPeople.length} unique recipients across all campaigns</p>
        </div>

        <div className="gd-search">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email"
          />
        </div>

        <div className="gd-directory-list">
          {filteredDirectory.length === 0 ? (
            <div className="gd-empty">No one matches that search.</div>
          ) : filteredDirectory.map((r) => (
            <div key={r.email} className="gd-contact-row">
              <span className="gd-contact-avatar" style={{ background: avatarGradient(r.name) }}>
                {r.initials}
              </span>
              <div className="gd-contact-meta">
                <div className="gd-contact-name">{r.name}</div>
                <div className="gd-contact-sub">{r.email}</div>
              </div>
              <button
                className={`gd-row-copy ${copiedId === r.email ? 'gd-row-copy-done' : ''}`}
                onClick={() => handleCopy(r.email, [r])}
              >
                {copiedId === r.email ? '✓ Copied' : <><CopyIcon /> Copy</>}
              </button>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .gd-people { display: flex; flex-direction: column; gap: 26px; }

        /* Header */
        .gd-page-header { padding: 4px 8px 8px; color: #fff; }
        .gd-page-header h1 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 38px; font-weight: 400; font-style: italic;
          letter-spacing: -0.02em; margin: 0 0 6px;
          color: #fff;
        }
        .gd-page-header p {
          font-size: 14.5px; color: #fff;
          margin: 0; max-width: 600px; line-height: 1.5;
          font-weight: 500;
          text-shadow: 0 1px 2px rgba(20, 14, 50, 0.25);
        }

        .gd-section-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 22px; font-weight: 400; font-style: italic;
          color: #1a1a1f; margin: 0; letter-spacing: -0.015em;
        }

        /* Campaigns section */
        .gd-lists-section { display: flex; flex-direction: column; gap: 14px; }
        .gd-lists-head {
          display: flex; justify-content: space-between; align-items: baseline;
          padding: 0 4px;
        }
        .gd-add-link {
          all: unset; cursor: pointer;
          font-size: 13px; font-weight: 600;
          color: #1a1a1f;
          padding: 6px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.7);
          transition: background 120ms ease;
        }
        .gd-add-link:hover { background: #fff; }

        .gd-add-card {
          background: #fff;
          border: 1px solid rgba(15, 15, 25, 0.06);
          border-radius: 14px;
          padding: 16px 18px;
          display: flex; flex-direction: column; gap: 12px;
          box-shadow: 0 6px 18px -8px rgba(20, 14, 50, 0.18);
        }
        .gd-add-title { font-size: 14px; font-weight: 600; color: #1a1a1f; }
        .gd-add-card textarea {
          width: 100%; box-sizing: border-box;
          padding: 11px 14px; border-radius: 10px;
          border: 1px solid #ececef; background: #fafafb;
          font-family: ui-monospace, monospace; font-size: 13px;
          outline: none; color: #1a1a1f; resize: vertical;
          line-height: 1.6;
        }
        .gd-add-card textarea:focus { border-color: ${BRAND}; background: #fff; }
        .gd-add-actions { display: flex; justify-content: flex-end; gap: 8px; }
        .gd-add-secondary {
          all: unset; cursor: pointer;
          padding: 8px 14px; border-radius: 8px;
          font-size: 13px; font-weight: 500; color: #5a5a62;
        }
        .gd-add-secondary:hover { background: #f3f3f5; }
        .gd-add-primary {
          all: unset; cursor: pointer;
          background: ${BRAND}; color: #fff;
          padding: 8px 16px; border-radius: 8px;
          font-size: 13px; font-weight: 600;
        }

        .gd-lists-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 12px;
        }

        /* Directory */
        .gd-directory { display: flex; flex-direction: column; gap: 12px; }
        .gd-directory-head { padding: 0 4px; }
        .gd-directory-sub { font-size: 12.5px; color: #43434b; margin: 4px 0 0; }

        .gd-search input {
          width: 100%; box-sizing: border-box;
          padding: 12px 16px; border-radius: 12px;
          border: 1px solid rgba(15, 15, 25, 0.08);
          background: rgba(255, 255, 255, 0.95);
          font-size: 14px; outline: none; font-family: inherit; color: #1a1a1f;
          box-shadow: 0 4px 14px -8px rgba(20, 14, 50, 0.12);
        }
        .gd-search input::placeholder { color: #8a8a93; }
        .gd-search input:focus { border-color: ${BRAND}; background: #fff; }

        .gd-directory-list {
          background: #fff;
          border: 1px solid rgba(15, 15, 25, 0.06);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 4px 14px -8px rgba(20, 14, 50, 0.12);
        }
        .gd-contact-row {
          display: grid;
          grid-template-columns: 44px 1fr auto;
          align-items: center;
          gap: 14px;
          padding: 13px 18px;
          border-bottom: 1px solid #f0f0f2;
          transition: background 120ms ease;
        }
        .gd-contact-row:hover { background: #fafafb; }
        .gd-contact-row:last-child { border-bottom: none; }
        .gd-contact-avatar {
          width: 40px; height: 40px; border-radius: 50%;
          color: #fff; font-size: 13px; font-weight: 600;
          display: inline-flex; align-items: center; justify-content: center;
        }
        .gd-contact-meta { min-width: 0; }
        .gd-contact-name { font-size: 14.5px; font-weight: 600; color: #1a1a1f; }
        .gd-contact-sub {
          font-size: 12.5px; color: #43434b; margin-top: 2px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .gd-row-copy {
          all: unset; cursor: pointer;
          display: inline-flex; align-items: center; gap: 5px;
          padding: 7px 12px; border-radius: 8px;
          font-size: 12.5px; font-weight: 600;
          color: #1a1a1f;
          border: 1px solid #ececef;
          background: #fff;
          transition: all 120ms ease;
        }
        .gd-row-copy:hover { background: #1a1a1f; color: #fff; border-color: #1a1a1f; }
        .gd-row-copy-done {
          background: #ECFDF5 !important;
          color: #047857 !important;
          border-color: #ECFDF5 !important;
        }
        .gd-row-copy :global(svg) { width: 13px; height: 13px; }

        .gd-empty { padding: 40px; text-align: center; color: #5a5a62; font-size: 14px; }
      `}</style>
    </div>
  );
}

/* ─── Campaign card (one per past order, plus Everyone) ─── */

function CampaignCard({
  id, label, sublabel, recipients, primary, copied, onCopy,
}: {
  id: string;
  label: string;
  sublabel: string;
  recipients: Recipient[];
  primary?: boolean;
  copied: boolean;
  onCopy: () => void;
}) {
  const previewCount = Math.min(4, recipients.length);
  const remainder = recipients.length - previewCount;
  return (
    <div style={{
      background: '#fff',
      border: `1px solid ${primary ? 'rgba(124, 92, 255, 0.35)' : 'rgba(15, 15, 25, 0.06)'}`,
      borderRadius: 14,
      padding: '16px 18px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      boxShadow: primary
        ? '0 10px 28px -10px rgba(124, 92, 255, 0.35)'
        : '0 6px 18px -10px rgba(20, 14, 50, 0.18)',
    }}>
      <div>
        <div style={{
          fontFamily: '"Georgia", "Times New Roman", serif',
          fontSize: 16,
          fontWeight: 500,
          fontStyle: 'italic',
          color: '#1a1a1f',
          letterSpacing: '-0.01em',
          marginBottom: 3,
        }}>
          {label}
        </div>
        <div style={{ fontSize: 12.5, color: '#5a5a62' }}>{sublabel}</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, minHeight: 28 }}>
        {recipients.slice(0, previewCount).map((r, i) => (
          <span
            key={r.email + i}
            title={r.name}
            style={{
              width: 28, height: 28, borderRadius: '50%',
              background: avatarGradient(r.name),
              color: '#fff', fontSize: 10.5, fontWeight: 600,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid #fff',
              marginLeft: i === 0 ? 0 : -8,
              zIndex: previewCount - i,
            }}
          >{r.initials}</span>
        ))}
        {remainder > 0 && (
          <span style={{
            width: 28, height: 28, borderRadius: '50%',
            background: '#f0f0f2', color: '#5a5a62',
            fontSize: 10.5, fontWeight: 500,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid #fff', marginLeft: -8,
          }}>+{remainder}</span>
        )}
      </div>

      <GlassButton
        size="sm"
        onClick={onCopy}
        glassColor={copied
          ? 'rgba(31, 138, 76, 0.95)'
          : (primary ? 'rgba(124, 92, 255, 0.85)' : 'rgba(21, 21, 26, 0.9)')}
        className="w-full !text-white"
      >
        {copied ? '✓ Copied to clipboard' : <><CopyIcon /> Copy {recipients.length} {recipients.length === 1 ? 'person' : 'people'}</>}
      </GlassButton>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

'use client';

import { useState } from 'react';
import { avatarGradient, ORDERS, getRecipients, getAllPeople, type Recipient } from '../data';

function formatForCopy(recipients: Recipient[]): string {
  return recipients.map((r) => `${r.name} <${r.email}>`).join('\n');
}

const CARD_TINTS = [
  'var(--gd-paper)',
  'var(--gd-peach)',
  'var(--gd-sky)',
  'var(--gd-pink-soft)',
];
const CARD_ROTATIONS = ['-1.2deg', '0.8deg', '-0.4deg', '1.4deg'];

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
        <span className="gd-eyebrow">Your people</span>
        <h1>
          Everyone you&rsquo;ve <em>gifted</em>.
        </h1>
        <p>
          Grouped by the campaign you sent them in. Copy any list and paste it into a Giftwell flow.
        </p>
      </header>

      <section className="gd-lists-section">
        <div className="gd-lists-head">
          <h2 className="gd-section-title"><em>Past</em> campaigns</h2>
          <button className="gd-add-link" onClick={() => setAddOpen(!addOpen)}>
            {addOpen ? '× close' : '+ add people'}
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
              <button className="gd-add-primary">Save</button>
            </div>
          </div>
        )}

        <div className="gd-lists-grid">
          <CampaignCard
            id="everyone"
            label="Everyone"
            sublabel={`${allPeople.length} unique people`}
            recipients={allPeople}
            tint="var(--gd-lime)"
            rotation="-1.5deg"
            primary
            copied={copiedId === 'everyone'}
            onCopy={() => handleCopy('everyone', allPeople)}
          />

          {ORDERS.map((o, idx) => {
            const recipients = getRecipients(o);
            return (
              <CampaignCard
                key={o.id}
                id={o.id}
                label={o.name}
                sublabel={`${recipients.length} ${recipients.length === 1 ? 'person' : 'people'} · ${o.status}`}
                recipients={recipients}
                tint={CARD_TINTS[idx % CARD_TINTS.length]}
                rotation={CARD_ROTATIONS[idx % CARD_ROTATIONS.length]}
                copied={copiedId === o.id}
                onCopy={() => handleCopy(o.id, recipients)}
              />
            );
          })}
        </div>
      </section>

      <section className="gd-directory">
        <div className="gd-directory-head">
          <h2 className="gd-section-title"><em>All</em> people</h2>
          <p className="gd-directory-sub">{allPeople.length} unique recipients</p>
        </div>

        <div className="gd-search-wrap">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email"
          />
        </div>

        <div className="gd-directory-list">
          {filteredDirectory.length === 0 ? (
            <div className="gd-empty">No one matches.</div>
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
                {copiedId === r.email ? '✓ copied' : <><CopyIcon /> copy</>}
              </button>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .gd-people { display: flex; flex-direction: column; gap: 36px; }

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
          margin: 0 0 14px;
          color: var(--gd-ink);
        }
        .gd-page-header h1 em { font-style: italic; color: var(--gd-pink); }
        .gd-page-header p {
          font-size: 14.5px; color: var(--gd-ink-soft);
          margin: 0; max-width: 540px; line-height: 1.5;
          font-weight: 500;
        }

        .gd-section-title {
          font-family: var(--gd-display);
          font-size: 26px; font-weight: 500;
          color: var(--gd-ink);
          margin: 0; letter-spacing: -0.015em;
        }
        .gd-section-title em {
          font-style: italic; color: var(--gd-pink);
        }

        .gd-lists-section { display: flex; flex-direction: column; gap: 18px; }
        .gd-lists-head {
          display: flex; justify-content: space-between; align-items: baseline;
          padding: 0 4px;
        }
        .gd-add-link {
          all: unset; cursor: pointer;
          font-size: 12px; font-weight: 700;
          color: var(--gd-ink);
          text-transform: uppercase; letter-spacing: 0.06em;
          padding: 7px 14px;
          border-radius: 999px;
          background: var(--gd-paper);
          border: var(--gd-border);
          box-shadow: var(--gd-sticker-sm);
          transition: transform 140ms ease, box-shadow 140ms ease;
        }
        .gd-add-link:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 var(--gd-ink);
        }

        .gd-add-card {
          background: var(--gd-paper);
          border: var(--gd-border);
          border-radius: var(--gd-radius);
          box-shadow: var(--gd-sticker);
          padding: 18px 20px;
          display: flex; flex-direction: column; gap: 14px;
        }
        .gd-add-title {
          font-family: var(--gd-display);
          font-size: 17px; font-weight: 500; font-style: italic;
          color: var(--gd-ink);
        }
        .gd-add-card textarea {
          width: 100%; box-sizing: border-box;
          padding: 12px 14px; border-radius: 10px;
          border: 1.5px solid var(--gd-ink);
          background: var(--gd-cream);
          font-family: ui-monospace, monospace; font-size: 13px;
          outline: none; color: var(--gd-ink); resize: vertical;
          line-height: 1.6;
        }
        .gd-add-card textarea:focus {
          background: #fff;
          box-shadow: 3px 3px 0 var(--gd-ink);
        }
        .gd-add-actions { display: flex; justify-content: flex-end; gap: 10px; }
        .gd-add-secondary {
          all: unset; cursor: pointer;
          padding: 8px 16px; border-radius: 999px;
          font-size: 12px; font-weight: 700;
          color: var(--gd-ink);
          text-transform: uppercase; letter-spacing: 0.06em;
        }
        .gd-add-secondary:hover { background: rgba(0,0,0,0.05); }
        .gd-add-primary {
          all: unset; cursor: pointer;
          background: var(--gd-lime); color: var(--gd-ink);
          padding: 8px 18px; border-radius: 999px;
          border: var(--gd-border);
          box-shadow: var(--gd-sticker-sm);
          font-size: 12px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.06em;
          transition: transform 140ms ease, box-shadow 140ms ease;
        }
        .gd-add-primary:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 var(--gd-ink);
        }

        .gd-lists-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 26px;
          padding: 12px 6px 8px;
        }

        .gd-directory { display: flex; flex-direction: column; gap: 14px; }
        .gd-directory-head { padding: 0 4px; }
        .gd-directory-sub {
          font-size: 13px; color: var(--gd-ink-soft);
          margin: 6px 0 0; font-weight: 500;
        }

        .gd-search-wrap input {
          width: 100%; box-sizing: border-box;
          padding: 13px 18px; border-radius: 12px;
          border: var(--gd-border);
          background: var(--gd-paper);
          font-size: 14px; outline: none;
          font-family: inherit; color: var(--gd-ink);
          font-weight: 500;
          box-shadow: var(--gd-sticker-sm);
        }
        .gd-search-wrap input::placeholder { color: var(--gd-ink-muted); }
        .gd-search-wrap input:focus { background: #fff; }

        .gd-directory-list {
          background: var(--gd-paper);
          border: var(--gd-border);
          border-radius: var(--gd-radius-lg);
          box-shadow: var(--gd-sticker);
          overflow: hidden;
        }
        .gd-contact-row {
          display: grid;
          grid-template-columns: 44px 1fr auto;
          align-items: center;
          gap: 14px;
          padding: 13px 18px;
          border-bottom: 1px solid rgba(15, 15, 18, 0.08);
        }
        .gd-contact-row:last-child { border-bottom: none; }
        .gd-contact-avatar {
          width: 40px; height: 40px; border-radius: 50%;
          color: #fff; font-size: 13px; font-weight: 700;
          display: inline-flex; align-items: center; justify-content: center;
          border: 1.5px solid var(--gd-ink);
        }
        .gd-contact-meta { min-width: 0; }
        .gd-contact-name { font-size: 14.5px; font-weight: 600; color: var(--gd-ink); }
        .gd-contact-sub {
          font-size: 12.5px; color: var(--gd-ink-muted); margin-top: 2px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .gd-row-copy {
          all: unset; cursor: pointer;
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 13px; border-radius: 999px;
          font-size: 11.5px; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.06em;
          color: var(--gd-ink);
          border: 1.5px solid var(--gd-ink);
          background: var(--gd-cream);
          box-shadow: 3px 3px 0 var(--gd-ink);
          transition: transform 140ms ease, box-shadow 140ms ease, background 140ms ease;
        }
        .gd-row-copy:hover {
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0 var(--gd-ink);
          background: var(--gd-lime);
        }
        .gd-row-copy-done {
          background: var(--gd-lime) !important;
        }
        .gd-row-copy :global(svg) { width: 13px; height: 13px; }

        .gd-empty {
          padding: 40px; text-align: center;
          color: var(--gd-ink-muted); font-size: 14px;
          font-family: var(--gd-display); font-style: italic;
        }
      `}</style>
    </div>
  );
}

function CampaignCard({
  label, sublabel, recipients, primary, copied, onCopy, tint, rotation,
}: {
  id: string;
  label: string;
  sublabel: string;
  recipients: Recipient[];
  tint: string;
  rotation: string;
  primary?: boolean;
  copied: boolean;
  onCopy: () => void;
}) {
  const previewCount = Math.min(4, recipients.length);
  const remainder = recipients.length - previewCount;
  return (
    <div
      className="gd-campaign-card"
      style={{
        background: tint,
        border: '1.5px solid var(--gd-ink)',
        borderRadius: 18,
        padding: '18px 20px',
        boxShadow: 'var(--gd-sticker)',
        transform: `rotate(${rotation})`,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      <div>
        <div style={{
          fontFamily: 'var(--gd-display)',
          fontSize: 22,
          fontWeight: 500,
          fontStyle: 'italic',
          color: 'var(--gd-ink)',
          letterSpacing: '-0.015em',
          marginBottom: 4,
          lineHeight: 1.05,
        }}>
          {label}
        </div>
        <div style={{
          fontSize: 12,
          color: 'var(--gd-ink)',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
        }}>{sublabel}</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6, minHeight: 30 }}>
        {recipients.slice(0, previewCount).map((r, i) => (
          <span
            key={r.email + i}
            title={r.name}
            style={{
              width: 30, height: 30, borderRadius: '50%',
              background: avatarGradient(r.name),
              color: '#fff', fontSize: 10.5, fontWeight: 700,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              border: '1.5px solid var(--gd-ink)',
              marginLeft: i === 0 ? 0 : -8,
              zIndex: previewCount - i,
            }}
          >{r.initials}</span>
        ))}
        {remainder > 0 && (
          <span style={{
            width: 30, height: 30, borderRadius: '50%',
            background: 'var(--gd-cream)', color: 'var(--gd-ink)',
            fontSize: 10.5, fontWeight: 700,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            border: '1.5px solid var(--gd-ink)', marginLeft: -8,
          }}>+{remainder}</span>
        )}
      </div>

      <button
        onClick={onCopy}
        className="gd-campaign-copy"
        style={{
          all: 'unset',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          padding: '10px 16px',
          borderRadius: 999,
          background: copied ? 'var(--gd-lime)' : (primary ? 'var(--gd-ink)' : 'var(--gd-cream)'),
          color: copied ? 'var(--gd-ink)' : (primary ? 'var(--gd-cream)' : 'var(--gd-ink)'),
          border: '1.5px solid var(--gd-ink)',
          boxShadow: '3px 3px 0 var(--gd-ink)',
          fontSize: 12,
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          transition: 'transform 140ms ease, box-shadow 140ms ease',
        }}
      >
        {copied ? '✓ copied to clipboard' : <><CopyIcon /> copy {recipients.length} {recipients.length === 1 ? 'person' : 'people'}</>}
      </button>

      <style jsx>{`
        :global(.gd-campaign-copy:hover) {
          transform: translate(-1px, -1px);
          box-shadow: 4px 4px 0 var(--gd-ink) !important;
        }
      `}</style>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

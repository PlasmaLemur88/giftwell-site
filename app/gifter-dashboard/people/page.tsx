'use client';

import { useState } from 'react';
import { BRAND } from '../data';

type Contact = {
  id: string;
  name: string;
  email: string;
  company: string;
  tag: 'Clients' | 'Team' | 'Vendors' | 'Personal';
  giftsSent: number;
};

const CONTACTS: Contact[] = [
  { id: '1',  name: 'John Doe',         email: 'john@acme.com',          company: 'Acme Corp',         tag: 'Clients', giftsSent: 4 },
  { id: '2',  name: 'Jane Smith',       email: 'jane@corp.com',          company: 'Corp Industries',   tag: 'Clients', giftsSent: 2 },
  { id: '3',  name: 'Sarah Jones',      email: 'sarah@company.com',      company: 'Company Inc',       tag: 'Team',    giftsSent: 6 },
  { id: '4',  name: 'Mike Wilson',      email: 'mike@example.com',       company: 'Example LLC',       tag: 'Clients', giftsSent: 1 },
  { id: '5',  name: 'Lisa Chen',        email: 'lisa@startup.io',        company: 'Startup IO',        tag: 'Team',    giftsSent: 3 },
  { id: '6',  name: 'Tom Davis',        email: 'tom@truebay.co',         company: 'Truebay',           tag: 'Vendors', giftsSent: 2 },
  { id: '7',  name: 'Maya Greene',      email: 'maya@northglobe.com',    company: 'NorthGlobe',        tag: 'Clients', giftsSent: 5 },
  { id: '8',  name: 'Diego Rivera',     email: 'd.rivera@coppermint.co', company: 'Coppermint',        tag: 'Team',    giftsSent: 1 },
];

const TAGS: (Contact['tag'] | 'All')[] = ['All', 'Clients', 'Team', 'Vendors', 'Personal'];

const TAG_COLORS: Record<Contact['tag'], { bg: string; fg: string }> = {
  Clients:  { bg: '#EEF0FF', fg: '#4036A8' },
  Team:     { bg: '#ECFDF5', fg: '#047857' },
  Vendors:  { bg: '#FFF7E6', fg: '#92590B' },
  Personal: { bg: '#FEF2F2', fg: '#B91C1C' },
};

export default function PeoplePage() {
  const [filter, setFilter] = useState<typeof TAGS[number]>('All');
  const [search, setSearch] = useState('');
  const [pasteOpen, setPasteOpen] = useState(false);

  const filtered = CONTACTS.filter((c) => {
    if (filter !== 'All' && c.tag !== filter) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.company.toLowerCase().includes(q);
  });

  return (
    <div className="gd-ab">
      <header className="gd-page-header">
        <div className="gd-page-header-row">
          <div>
            <h1>People</h1>
            <p>Everyone you've gifted before. Send to them again in a tap, or build a fresh list.</p>
          </div>
          <div className="gd-page-actions">
            <button className="gd-secondary" onClick={() => setPasteOpen(true)}>
              <ClipboardIcon /> Paste a list
            </button>
            <button className="gd-add">+ Add one</button>
          </div>
        </div>
      </header>

      {pasteOpen && (
        <div className="gd-paste-card">
          <div className="gd-paste-head">
            <div>
              <div className="gd-paste-title">Paste your recipients</div>
              <div className="gd-paste-sub">One per line. We'll auto-detect <code>Name &lt;email&gt;</code> or <code>name, email</code>.</div>
            </div>
            <button onClick={() => setPasteOpen(false)} className="gd-paste-close" aria-label="Close">×</button>
          </div>
          <textarea
            placeholder={`Avery Stone, avery@maplecourt.io\nMaya Greene <maya@northglobe.com>\nDiego Rivera, d.rivera@coppermint.co`}
            rows={6}
          />
          <div className="gd-paste-actions">
            <button onClick={() => setPasteOpen(false)} className="gd-paste-secondary">Cancel</button>
            <button className="gd-paste-primary">Add to People</button>
          </div>
        </div>
      )}

      <div className="gd-ab-search">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, or company"
        />
      </div>

      <div className="gd-ab-tags">
        {TAGS.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`gd-tag-chip ${filter === t ? 'gd-tag-chip-active' : ''}`}
          >{t}</button>
        ))}
      </div>

      <div className="gd-ab-list">
        {filtered.length === 0 ? (
          <div className="gd-empty">No one matches that search.</div>
        ) : filtered.map((c) => {
          const tone = TAG_COLORS[c.tag];
          const initials = c.name.split(' ').map((s) => s[0]).join('').slice(0, 2);
          return (
            <div key={c.id} className="gd-contact-row">
              <span className="gd-contact-avatar" style={{
                background: `hsl(${(c.name.charCodeAt(0) * 7) % 360}, 60%, 55%)`,
              }}>{initials}</span>
              <div className="gd-contact-meta">
                <div className="gd-contact-name">{c.name}</div>
                <div className="gd-contact-sub">{c.email} · {c.company}</div>
              </div>
              <span className="gd-contact-tag" style={{ background: tone.bg, color: tone.fg }}>{c.tag}</span>
              <div className="gd-contact-stats">{c.giftsSent} {c.giftsSent === 1 ? 'gift' : 'gifts'}</div>
              <button className="gd-contact-send">Send gift →</button>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .gd-ab { display: flex; flex-direction: column; gap: 18px; }

        .gd-page-header { padding: 4px 8px 8px; color: #fff; }
        .gd-page-header h1 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 38px; font-weight: 400; font-style: italic;
          letter-spacing: -0.02em; margin: 0 0 6px;
          color: #fff;
        }
        .gd-page-header p {
          font-size: 14.5px; color: rgba(255, 255, 255, 0.92);
          margin: 0; max-width: 540px; line-height: 1.5;
          text-shadow: 0 1px 2px rgba(20, 14, 50, 0.2);
        }
        .gd-page-header-row {
          display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; flex-wrap: wrap;
        }
        .gd-page-actions { display: flex; gap: 8px; }
        .gd-secondary {
          all: unset; cursor: pointer;
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          color: #1a1a1f;
          padding: 9px 14px; border-radius: 10px;
          font-size: 13px; font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.7);
          transition: transform 120ms ease, background 120ms ease;
        }
        .gd-secondary:hover { background: #fff; transform: translateY(-1px); }
        .gd-secondary :global(svg) { width: 14px; height: 14px; }
        .gd-add {
          all: unset; cursor: pointer;
          background: #15151a; color: #fff;
          padding: 10px 18px; border-radius: 10px;
          font-size: 13px; font-weight: 600;
          box-shadow: 0 8px 20px -8px rgba(20, 14, 50, 0.45);
          transition: transform 120ms ease;
        }
        .gd-add:hover { transform: translateY(-1px); }

        /* Paste card */
        .gd-paste-card {
          background: #fff;
          border: 1px solid rgba(15, 15, 25, 0.08);
          border-radius: 14px;
          padding: 18px;
          display: flex; flex-direction: column; gap: 14px;
          box-shadow: 0 10px 28px -10px rgba(20, 14, 50, 0.25);
        }
        .gd-paste-head {
          display: flex; justify-content: space-between; align-items: flex-start; gap: 12px;
        }
        .gd-paste-title { font-size: 15px; font-weight: 600; color: #1a1a1f; }
        .gd-paste-sub { font-size: 13px; color: #5a5a62; margin-top: 4px; }
        .gd-paste-sub code {
          font-family: ui-monospace, monospace; font-size: 12px;
          background: #f3f3f5; padding: 1px 5px; border-radius: 4px; color: #1a1a1f;
        }
        .gd-paste-close {
          all: unset; cursor: pointer;
          width: 28px; height: 28px; border-radius: 999px;
          display: inline-flex; align-items: center; justify-content: center;
          background: #f3f3f5; color: #5a5a62;
          font-size: 18px; font-weight: 400;
          transition: background 120ms ease;
        }
        .gd-paste-close:hover { background: #ececef; color: #1a1a1f; }
        .gd-paste-card textarea {
          width: 100%; box-sizing: border-box;
          padding: 12px 14px; border-radius: 10px;
          border: 1px solid #dcdcde; background: #fafafb;
          font-family: ui-monospace, monospace; font-size: 13px;
          outline: none; color: #1a1a1f; resize: vertical;
          min-height: 110px;
        }
        .gd-paste-card textarea:focus { border-color: ${BRAND}; background: #fff; }
        .gd-paste-actions {
          display: flex; justify-content: flex-end; gap: 8px;
        }
        .gd-paste-secondary {
          all: unset; cursor: pointer;
          padding: 9px 16px; border-radius: 8px;
          font-size: 13px; font-weight: 500;
          color: #43434b;
        }
        .gd-paste-secondary:hover { background: #f3f3f5; }
        .gd-paste-primary {
          all: unset; cursor: pointer;
          background: ${BRAND}; color: #fff;
          padding: 9px 18px; border-radius: 8px;
          font-size: 13px; font-weight: 600;
        }
        .gd-paste-primary:hover { background: #6A4DE8; }

        /* Search */
        .gd-ab-search input {
          width: 100%; box-sizing: border-box;
          padding: 12px 16px; border-radius: 12px;
          border: 1px solid rgba(15, 15, 25, 0.08);
          background: rgba(255, 255, 255, 0.95);
          font-size: 14px; outline: none; font-family: inherit; color: #1a1a1f;
          box-shadow: 0 4px 14px -8px rgba(20, 14, 50, 0.15);
        }
        .gd-ab-search input::placeholder { color: #8a8a93; }
        .gd-ab-search input:focus { border-color: ${BRAND}; background: #fff; }

        .gd-ab-tags { display: flex; gap: 6px; flex-wrap: wrap; }
        .gd-tag-chip {
          all: unset; cursor: pointer;
          padding: 7px 14px; border-radius: 999px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(8px);
          color: #1a1a1f;
          border: 1px solid rgba(255, 255, 255, 0.7);
          font-size: 12.5px; font-weight: 500;
          transition: background 120ms ease, color 120ms ease;
        }
        .gd-tag-chip-active { background: #15151a; color: #fff; border-color: #15151a; }

        .gd-ab-list {
          background: #fff;
          border: 1px solid rgba(15, 15, 25, 0.06);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 4px 14px -8px rgba(20, 14, 50, 0.15);
        }
        .gd-contact-row {
          display: grid;
          grid-template-columns: 44px 1fr auto auto auto;
          align-items: center;
          gap: 14px;
          padding: 14px 18px;
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
        .gd-contact-tag {
          font-size: 11px; font-weight: 600;
          padding: 3px 9px; border-radius: 999px;
        }
        .gd-contact-stats {
          font-size: 12.5px; color: #5a5a62;
          white-space: nowrap;
        }
        .gd-contact-send {
          all: unset; cursor: pointer;
          font-size: 12.5px; font-weight: 600;
          color: ${BRAND};
          padding: 4px 0;
        }
        .gd-contact-send:hover { text-decoration: underline; }

        .gd-empty { padding: 40px; text-align: center; color: #5a5a62; font-size: 14px; }

        @media (max-width: 640px) {
          .gd-contact-row {
            grid-template-columns: 44px 1fr auto;
            grid-template-areas: 'avatar meta send' 'avatar tag tag';
            row-gap: 6px;
          }
          .gd-contact-row > :nth-child(1) { grid-area: avatar; }
          .gd-contact-meta { grid-area: meta; }
          .gd-contact-tag { grid-area: tag; justify-self: start; }
          .gd-contact-send { grid-area: send; }
          .gd-contact-stats { display: none; }
        }
      `}</style>
    </div>
  );
}

function ClipboardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="2" width="6" height="4" rx="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    </svg>
  );
}

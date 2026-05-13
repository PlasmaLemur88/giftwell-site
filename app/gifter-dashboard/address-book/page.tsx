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
  { id: '1',  name: 'John Doe',         email: 'john@acme.com',        company: 'Acme Corp',         tag: 'Clients', giftsSent: 4 },
  { id: '2',  name: 'Jane Smith',       email: 'jane@corp.com',        company: 'Corp Industries',   tag: 'Clients', giftsSent: 2 },
  { id: '3',  name: 'Sarah Jones',      email: 'sarah@company.com',    company: 'Company Inc',       tag: 'Team',    giftsSent: 6 },
  { id: '4',  name: 'Mike Wilson',      email: 'mike@example.com',     company: 'Example LLC',       tag: 'Clients', giftsSent: 1 },
  { id: '5',  name: 'Lisa Chen',        email: 'lisa@startup.io',      company: 'Startup IO',        tag: 'Team',    giftsSent: 3 },
  { id: '6',  name: 'Tom Davis',        email: 'tom@truebay.co',       company: 'Truebay',           tag: 'Vendors', giftsSent: 2 },
  { id: '7',  name: 'Maya Greene',      email: 'maya@northglobe.com',  company: 'NorthGlobe',        tag: 'Clients', giftsSent: 5 },
  { id: '8',  name: 'Diego Rivera',     email: 'd.rivera@coppermint.co', company: 'Coppermint',     tag: 'Team',    giftsSent: 1 },
];

const TAGS: (Contact['tag'] | 'All')[] = ['All', 'Clients', 'Team', 'Vendors', 'Personal'];

const TAG_COLORS: Record<Contact['tag'], { bg: string; fg: string }> = {
  Clients:  { bg: '#EEF0FF', fg: '#4036A8' },
  Team:     { bg: '#ECFDF5', fg: '#047857' },
  Vendors:  { bg: '#FFF7E6', fg: '#92590B' },
  Personal: { bg: '#FEF2F2', fg: '#B91C1C' },
};

export default function AddressBook() {
  const [filter, setFilter] = useState<typeof TAGS[number]>('All');
  const [search, setSearch] = useState('');

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
            <h1>Address book</h1>
            <p>Saved recipients you've gifted before.</p>
          </div>
          <button className="gd-add">+ Add recipient</button>
        </div>
      </header>

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
          <div className="gd-empty">No recipients match.</div>
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
          letter-spacing: -0.02em; margin: 0 0 4px;
          color: #fff;
        }
        .gd-page-header p { font-size: 14.5px; color: rgba(255, 255, 255, 0.85); margin: 0; }
        .gd-page-header-row {
          display: flex; justify-content: space-between; align-items: flex-end; gap: 12px;
        }
        .gd-add {
          all: unset; cursor: pointer;
          background: ${BRAND}; color: #fff;
          padding: 9px 16px; border-radius: 10px;
          font-size: 13.5px; font-weight: 600;
          transition: transform 120ms ease;
        }
        .gd-add:hover { transform: translateY(-1px); }

        .gd-ab-search input {
          width: 100%; padding: 11px 14px; border-radius: 10px;
          border: 1px solid #dcdcde; background: #fff;
          font-size: 14px; outline: none; font-family: inherit; color: #1a1a1f;
        }

        .gd-ab-tags { display: flex; gap: 6px; flex-wrap: wrap; }
        .gd-tag-chip {
          all: unset; cursor: pointer;
          padding: 6px 12px; border-radius: 999px;
          background: #fff; color: #1a1a1f;
          border: 1px solid #dcdcde;
          font-size: 12.5px; font-weight: 500;
        }
        .gd-tag-chip-active { background: #1a1a1f; color: #fff; border-color: #1a1a1f; }

        .gd-ab-list {
          background: #fff;
          border: 1px solid #ececef;
          border-radius: 14px;
          overflow: hidden;
        }
        .gd-contact-row {
          display: grid;
          grid-template-columns: 40px 1fr auto auto auto;
          align-items: center;
          gap: 14px;
          padding: 12px 16px;
          border-bottom: 1px solid #f0f0f2;
        }
        .gd-contact-row:last-child { border-bottom: none; }
        .gd-contact-avatar {
          width: 38px; height: 38px; border-radius: 50%;
          color: #fff; font-size: 12.5px; font-weight: 600;
          display: inline-flex; align-items: center; justify-content: center;
        }
        .gd-contact-meta { min-width: 0; }
        .gd-contact-name { font-size: 14px; font-weight: 600; }
        .gd-contact-sub {
          font-size: 12.5px; color: #8a8a93; margin-top: 1px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .gd-contact-tag {
          font-size: 11px; font-weight: 600;
          padding: 3px 9px; border-radius: 999px;
        }
        .gd-contact-stats {
          font-size: 12.5px; color: #8a8a93;
          white-space: nowrap;
        }
        .gd-contact-send {
          all: unset; cursor: pointer;
          font-size: 12.5px; font-weight: 600;
          color: ${BRAND};
        }
        .gd-contact-send:hover { text-decoration: underline; }

        .gd-empty { padding: 32px; text-align: center; color: #8a8a93; font-size: 14px; }

        @media (max-width: 640px) {
          .gd-contact-row {
            grid-template-columns: 40px 1fr auto;
            grid-template-areas: 'avatar meta send' 'avatar tag tag';
            row-gap: 4px;
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

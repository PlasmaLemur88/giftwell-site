'use client';

import { useState } from 'react';
import { BRAND, avatarGradient } from '../data';

type Contact = {
  id: string;
  name: string;
  email: string;
  company: string;
  tag: 'Clients' | 'Team' | 'Vendors' | 'Personal';
};

const CONTACTS: Contact[] = [
  { id: '1', name: 'John Doe',     email: 'john@acme.com',          company: 'Acme Corp',       tag: 'Clients' },
  { id: '2', name: 'Jane Smith',   email: 'jane@corp.com',          company: 'Corp Industries', tag: 'Clients' },
  { id: '3', name: 'Maya Greene',  email: 'maya@northglobe.com',    company: 'NorthGlobe',      tag: 'Clients' },
  { id: '4', name: 'Mike Wilson',  email: 'mike@example.com',       company: 'Example LLC',     tag: 'Clients' },
  { id: '5', name: 'Sarah Jones',  email: 'sarah@company.com',      company: 'Company Inc',     tag: 'Team' },
  { id: '6', name: 'Lisa Chen',    email: 'lisa@startup.io',        company: 'Startup IO',      tag: 'Team' },
  { id: '7', name: 'Diego Rivera', email: 'd.rivera@coppermint.co', company: 'Coppermint',      tag: 'Team' },
  { id: '8', name: 'Tom Davis',    email: 'tom@truebay.co',         company: 'Truebay',         tag: 'Vendors' },
];

const TAGS = ['Clients', 'Team', 'Vendors', 'Personal'] as const;
type Tag = typeof TAGS[number];

const TAG_COLORS: Record<Tag, { bg: string; fg: string; ring: string }> = {
  Clients:  { bg: '#EEF0FF', fg: '#4036A8', ring: '#7C5CFF' },
  Team:     { bg: '#ECFDF5', fg: '#047857', ring: '#1F8A4C' },
  Vendors:  { bg: '#FFF7E6', fg: '#92590B', ring: '#E0A23E' },
  Personal: { bg: '#FEF2F2', fg: '#B91C1C', ring: '#E04F4F' },
};

function formatForCopy(contacts: Contact[]): string {
  return contacts.map((c) => `${c.name} <${c.email}>`).join('\n');
}

function initialsOf(name: string): string {
  return name.split(' ').map((s) => s[0]).join('').slice(0, 2).toUpperCase();
}

export default function PeoplePage() {
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const handleCopy = (id: string, contacts: Contact[]) => {
    const text = formatForCopy(contacts);
    void navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId((curr) => (curr === id ? null : curr)), 1800);
  };

  const grouped: Record<Tag, Contact[]> = {
    Clients:  CONTACTS.filter((c) => c.tag === 'Clients'),
    Team:     CONTACTS.filter((c) => c.tag === 'Team'),
    Vendors:  CONTACTS.filter((c) => c.tag === 'Vendors'),
    Personal: CONTACTS.filter((c) => c.tag === 'Personal'),
  };

  const filteredDirectory = !search.trim()
    ? CONTACTS
    : CONTACTS.filter((c) => {
        const q = search.toLowerCase();
        return c.name.toLowerCase().includes(q) ||
               c.email.toLowerCase().includes(q) ||
               c.company.toLowerCase().includes(q);
      });

  return (
    <div className="gd-people">
      <header className="gd-page-header">
        <h1>People</h1>
        <p>Your saved lists. Copy any group and paste it into a Giftwell gifting flow on any merchant's store.</p>
      </header>

      {/* Lists — primary, copy-out */}
      <section className="gd-lists-section">
        <div className="gd-lists-head">
          <h2 className="gd-section-title">Your circles</h2>
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
          <ListCard
            id="everyone"
            label="Everyone"
            sublabel={`${CONTACTS.length} people across all lists`}
            contacts={CONTACTS}
            primary
            copied={copiedId === 'everyone'}
            onCopy={() => handleCopy('everyone', CONTACTS)}
          />
          {TAGS.map((tag) => grouped[tag].length > 0 && (
            <ListCard
              key={tag}
              id={tag}
              label={tag}
              sublabel={`${grouped[tag].length} ${grouped[tag].length === 1 ? 'person' : 'people'}`}
              contacts={grouped[tag]}
              tagColor={TAG_COLORS[tag]}
              copied={copiedId === tag}
              onCopy={() => handleCopy(tag, grouped[tag])}
            />
          ))}
        </div>
      </section>

      {/* Directory — secondary, individual lookup + copy */}
      <section className="gd-directory">
        <div className="gd-directory-head">
          <h2 className="gd-section-title">Everyone</h2>
        </div>

        <div className="gd-search">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or company"
          />
        </div>

        <div className="gd-directory-list">
          {filteredDirectory.length === 0 ? (
            <div className="gd-empty">No one matches that search.</div>
          ) : filteredDirectory.map((c) => {
            const tone = TAG_COLORS[c.tag];
            return (
              <div key={c.id} className="gd-contact-row">
                <span className="gd-contact-avatar" style={{
                  background: avatarGradient(c.name),
                }}>{initialsOf(c.name)}</span>
                <div className="gd-contact-meta">
                  <div className="gd-contact-name">{c.name}</div>
                  <div className="gd-contact-sub">{c.email} · {c.company}</div>
                </div>
                <span className="gd-contact-tag" style={{ background: tone.bg, color: tone.fg }}>{c.tag}</span>
                <button
                  className={`gd-row-copy ${copiedId === c.id ? 'gd-row-copy-done' : ''}`}
                  onClick={() => handleCopy(c.id, [c])}
                >
                  {copiedId === c.id ? '✓ Copied' : <><CopyIcon /> Copy</>}
                </button>
              </div>
            );
          })}
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
          margin: 0; max-width: 580px; line-height: 1.5;
          font-weight: 500;
          text-shadow: 0 1px 2px rgba(20, 14, 50, 0.25);
        }

        .gd-section-title {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 22px; font-weight: 400; font-style: italic;
          color: #1a1a1f; margin: 0; letter-spacing: -0.015em;
        }

        /* Lists section */
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

        /* Add card (collapsible) */
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

        /* Lists grid */
        .gd-lists-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 12px;
        }

        /* Directory */
        .gd-directory { display: flex; flex-direction: column; gap: 12px; }
        .gd-directory-head { padding: 0 4px; }

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
          grid-template-columns: 44px 1fr auto auto;
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
        .gd-contact-tag {
          font-size: 11px; font-weight: 600;
          padding: 3px 9px; border-radius: 999px;
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

        @media (max-width: 640px) {
          .gd-contact-row {
            grid-template-columns: 44px 1fr auto;
            grid-template-areas: 'avatar meta copy' 'avatar tag tag';
            row-gap: 6px;
          }
          .gd-contact-row > :nth-child(1) { grid-area: avatar; }
          .gd-contact-meta { grid-area: meta; }
          .gd-contact-tag { grid-area: tag; justify-self: start; }
          .gd-row-copy { grid-area: copy; }
        }
      `}</style>
    </div>
  );
}

/* ─── List card ─── */

function ListCard({
  id, label, sublabel, contacts, tagColor, primary, copied, onCopy,
}: {
  id: string;
  label: string;
  sublabel: string;
  contacts: Contact[];
  tagColor?: { bg: string; fg: string; ring: string };
  primary?: boolean;
  copied: boolean;
  onCopy: () => void;
}) {
  const previewCount = Math.min(4, contacts.length);
  const remainder = contacts.length - previewCount;
  return (
    <div style={{
      background: '#fff',
      border: '1px solid rgba(15, 15, 25, 0.06)',
      borderRadius: 14,
      padding: '16px 18px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      boxShadow: primary
        ? '0 10px 28px -10px rgba(124, 92, 255, 0.35)'
        : '0 6px 18px -10px rgba(20, 14, 50, 0.18)',
      ...(primary ? { borderColor: 'rgba(124, 92, 255, 0.35)' } : null),
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
            color: tagColor?.fg ?? '#5C3FE0', marginBottom: 4,
          }}>
            {label}
          </div>
          <div style={{ fontSize: 13, color: '#5a5a62' }}>{sublabel}</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {contacts.slice(0, previewCount).map((c, i) => (
          <span
            key={c.id}
            title={c.name}
            style={{
              width: 28, height: 28, borderRadius: '50%',
              background: avatarGradient(c.name),
              color: '#fff', fontSize: 10.5, fontWeight: 600,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid #fff',
              marginLeft: i === 0 ? 0 : -8,
              zIndex: previewCount - i,
            }}
          >{initialsOf(c.name)}</span>
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

      <button
        onClick={onCopy}
        style={{
          all: 'unset', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          padding: '10px 14px', borderRadius: 10,
          background: copied ? '#1F8A4C' : (primary ? BRAND : '#15151a'),
          color: '#fff',
          fontSize: 13, fontWeight: 600,
          transition: 'background 160ms ease, transform 120ms ease',
        }}
        onMouseEnter={(e) => { if (!copied) (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)'; }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'none'; }}
      >
        {copied ? '✓ Copied to clipboard' : <><CopyIcon /> Copy {contacts.length} {contacts.length === 1 ? 'person' : 'people'}</>}
      </button>
    </div>
  );
}

/* ─── Icon ─── */

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

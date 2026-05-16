'use client';

import { useState } from 'react';
import { avatarGradient, ORDERS, getRecipients, getAllPeople, type Recipient } from '@/app/gifter-dashboard/data';

function formatForCopy(recipients: Recipient[]): string {
  return recipients.map((r) => `${r.name} <${r.email}>`).join('\n');
}

export default function GlowPeople() {
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
    <div className="gdg-people">
      <section className="gdg-page-hero">
        <h1 className="gdg-page-title">People</h1>
        <p className="gdg-page-sub">
          Everyone you&rsquo;ve gifted, grouped by campaign. Copy any list into a Giftwell flow.
        </p>
      </section>

      {/* Campaign cards */}
      <section className="gdg-section">
        <h2 className="gdg-section-title">Your campaigns</h2>
        <div className="gdg-campaign-grid">
          <CampaignCard
            id="everyone"
            label="Everyone"
            sublabel={`${allPeople.length} unique people`}
            recipients={allPeople}
            primary
            copied={copiedId === 'everyone'}
            onCopy={() => handleCopy('everyone', allPeople)}
          />
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

      {/* Directory */}
      <section className="gdg-section">
        <h2 className="gdg-section-title">All people</h2>
        <div className="gdg-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email"
          />
        </div>
        <div className="gdg-directory">
          {filteredDirectory.length === 0 ? (
            <div className="gdg-empty">No one matches that search.</div>
          ) : filteredDirectory.map((r) => (
            <div key={r.email} className="gdg-contact">
              <span className="gdg-contact-avatar" style={{ background: avatarGradient(r.name) }}>
                {r.initials}
              </span>
              <div className="gdg-contact-meta">
                <div className="gdg-contact-name">{r.name}</div>
                <div className="gdg-contact-email">{r.email}</div>
              </div>
              <button
                className={`gdg-copy-btn ${copiedId === r.email ? 'gdg-copy-btn-done' : ''}`}
                onClick={() => handleCopy(r.email, [r])}
              >
                {copiedId === r.email ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .gdg-people {
          display: flex; flex-direction: column; gap: 30px;
          animation: gdg-fade 380ms cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        @keyframes gdg-fade {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .gdg-page-hero { padding: 24px 0 0; }
        .gdg-page-title {
          font-family: var(--gdg-display);
          font-size: clamp(40px, 5.5vw, 64px);
          font-weight: 600; letter-spacing: -0.035em;
          line-height: 1; margin: 0 0 10px;
          color: var(--gdg-text);
        }
        .gdg-page-sub {
          font-size: 16px; color: var(--gdg-text-soft); margin: 0;
          max-width: 540px; line-height: 1.5;
        }

        .gdg-section { display: flex; flex-direction: column; gap: 16px; }
        .gdg-section-title {
          font-family: var(--gdg-display);
          font-size: 22px; font-weight: 600;
          letter-spacing: -0.02em; margin: 0;
          color: var(--gdg-text);
        }

        .gdg-campaign-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 16px;
        }

        .gdg-search {
          display: flex; align-items: center; gap: 10px;
          background: var(--gdg-surface);
          border: 1px solid var(--gdg-hairline);
          border-radius: 999px;
          padding: 0 18px;
          color: var(--gdg-text-dim);
        }
        .gdg-search input {
          flex: 1; padding: 13px 0;
          border: none; background: transparent;
          font-size: 14px; outline: none; color: var(--gdg-text);
          font-family: inherit;
        }
        .gdg-search input::placeholder { color: var(--gdg-text-dim); }

        .gdg-directory {
          background: var(--gdg-surface);
          border: 1px solid var(--gdg-hairline);
          border-radius: var(--gdg-radius);
          overflow: hidden;
        }
        .gdg-contact {
          display: grid;
          grid-template-columns: 42px 1fr auto;
          align-items: center; gap: 13px;
          padding: 12px 18px;
          border-bottom: 1px solid var(--gdg-hairline);
        }
        .gdg-contact:last-child { border-bottom: none; }
        .gdg-contact-avatar {
          width: 40px; height: 40px; border-radius: 50%;
          color: #fff; font-size: 13px; font-weight: 700;
          display: inline-flex; align-items: center; justify-content: center;
        }
        .gdg-contact-meta { min-width: 0; }
        .gdg-contact-name { font-size: 14px; font-weight: 600; color: var(--gdg-text); }
        .gdg-contact-email {
          font-size: 12.5px; color: var(--gdg-text-soft); margin-top: 1px;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .gdg-copy-btn {
          all: unset; cursor: pointer;
          padding: 7px 15px; border-radius: 999px;
          font-size: 12.5px; font-weight: 600;
          color: var(--gdg-text);
          background: var(--gdg-pill);
          border: 1px solid var(--gdg-hairline);
          transition: background 140ms ease;
        }
        .gdg-copy-btn:hover { background: var(--gdg-pill-hover); }
        .gdg-copy-btn-done {
          background: rgba(52, 211, 153, 0.16);
          color: #6EE7B7;
          border-color: transparent;
        }

        .gdg-empty {
          padding: 36px; text-align: center;
          color: var(--gdg-text-dim); font-size: 14px;
        }
      `}</style>
    </div>
  );
}

function CampaignCard({
  label, sublabel, recipients, primary, copied, onCopy,
}: {
  id: string;
  label: string;
  sublabel: string;
  recipients: Recipient[];
  primary?: boolean;
  copied: boolean;
  onCopy: () => void;
}) {
  const previewCount = Math.min(5, recipients.length);
  const remainder = recipients.length - previewCount;
  return (
    <div className={`gdg-campaign ${primary ? 'gdg-campaign-primary' : ''}`}>
      <div className="gdg-campaign-top">
        <div className="gdg-campaign-name">{label}</div>
        <div className="gdg-campaign-sub">{sublabel}</div>
      </div>
      <div className="gdg-campaign-avatars">
        {recipients.slice(0, previewCount).map((r, i) => (
          <span
            key={r.email + i}
            title={r.name}
            className="gdg-campaign-avatar"
            style={{ background: avatarGradient(r.name), zIndex: previewCount - i }}
          >
            {r.initials}
          </span>
        ))}
        {remainder > 0 && (
          <span className="gdg-campaign-avatar gdg-campaign-more">+{remainder}</span>
        )}
      </div>
      <button className={`gdg-campaign-copy ${copied ? 'gdg-campaign-copy-done' : ''}`} onClick={onCopy}>
        {copied ? '✓ Copied to clipboard' : `Copy ${recipients.length} ${recipients.length === 1 ? 'person' : 'people'}`}
      </button>

      <style jsx>{`
        .gdg-campaign {
          background: var(--gdg-surface);
          border: 1px solid var(--gdg-hairline);
          border-radius: var(--gdg-radius);
          padding: 18px;
          display: flex; flex-direction: column; gap: 14px;
          transition: border-color 160ms ease, transform 160ms ease;
        }
        .gdg-campaign:hover { transform: translateY(-2px); border-color: rgba(124, 92, 255, 0.4); }
        .gdg-campaign-primary {
          background: linear-gradient(160deg, rgba(124, 92, 255, 0.18), var(--gdg-surface) 70%);
          border-color: rgba(124, 92, 255, 0.4);
        }
        .gdg-campaign-name {
          font-family: var(--gdg-display);
          font-size: 18px; font-weight: 600;
          letter-spacing: -0.015em; color: var(--gdg-text);
        }
        .gdg-campaign-sub {
          font-size: 12px; color: var(--gdg-text-dim);
          margin-top: 3px;
          text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;
        }
        .gdg-campaign-avatars { display: flex; min-height: 30px; }
        .gdg-campaign-avatar {
          width: 30px; height: 30px; border-radius: 50%;
          border: 2px solid var(--gdg-surface);
          color: #fff; font-size: 10px; font-weight: 700;
          display: inline-flex; align-items: center; justify-content: center;
          margin-left: -8px;
        }
        .gdg-campaign-avatar:first-child { margin-left: 0; }
        .gdg-campaign-more {
          background: var(--gdg-pill); color: var(--gdg-text-soft);
        }
        .gdg-campaign-copy {
          all: unset; cursor: pointer; text-align: center;
          padding: 10px 16px; border-radius: 999px;
          font-size: 13px; font-weight: 600;
          color: #fff;
          background: linear-gradient(135deg, var(--gdg-purple), var(--gdg-purple-deep));
          transition: opacity 140ms ease, transform 140ms ease;
        }
        .gdg-campaign-copy:hover { transform: translateY(-1px); }
        .gdg-campaign-copy-done {
          background: rgba(52, 211, 153, 0.18);
          color: #6EE7B7;
        }
      `}</style>
    </div>
  );
}

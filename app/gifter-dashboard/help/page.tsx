'use client';

import { useState } from 'react';

const FAQS = [
  { q: 'How do I send a new gift order?',
    a: `Tap "Send a new gift" on the Home page. Pick how many recipients, set a budget per person, choose an occasion, and write a personal message. We email each recipient a link to pick what they want from the merchant's catalog.` },
  { q: `What happens if a recipient doesn't claim their gift?`,
    a: `Unclaimed gifts expire 30 days after they're sent. We'll email you a reminder a week before any gift expires so you can extend it, reassign it, or get refunded for the unclaimed portion.` },
  { q: `Can I edit an order after it's sent?`,
    a: `You can edit the recipient list, budget, or shipping window up until a recipient claims their gift. After they claim, that specific recipient's order is locked, but the rest of the order is still editable.` },
  { q: 'How do receipts and billing work?',
    a: `Your card is charged when you place the order. You get an invoice immediately, and we send a final wrap-up invoice when all recipients have claimed (or unclaimed gifts expire and refund). Receipts are available under Account.` },
  { q: 'Can I gift internationally?',
    a: `Yes, anywhere the merchant ships. If a recipient is in a country the merchant doesn't ship to, we'll offer them a digital alternative.` },
  { q: 'Who do I contact for support?',
    a: `Use the chat widget below for fast answers. For order-specific issues, drill into the order detail page and use the "Resend" or "Cancel" actions on individual recipients. For billing questions, email support@giftwell.io.` },
];

export default function Help() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="gd-help">
      <header className="gd-page-header">
        <span className="gd-eyebrow">Got questions?</span>
        <h1>
          We&rsquo;ve <em>got you</em>.
        </h1>
        <p>Common questions. If yours isn&rsquo;t here, chat with us using the button in the corner.</p>
      </header>

      <div className="gd-faq">
        {FAQS.map((f, i) => (
          <div key={i} className="gd-faq-item">
            <button
              className="gd-faq-q"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <span className="gd-faq-q-text">{f.q}</span>
              <span className={`gd-faq-icon ${open === i ? 'gd-faq-icon-open' : ''}`} aria-hidden>
                +
              </span>
            </button>
            {open === i && <div className="gd-faq-a">{f.a}</div>}
          </div>
        ))}
      </div>

      <style jsx>{`
        .gd-help { display: flex; flex-direction: column; gap: 26px; }

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
          margin: 0 0 12px;
          color: var(--gd-ink);
        }
        .gd-page-header h1 em { font-style: italic; color: var(--gd-pink); }
        .gd-page-header p {
          font-size: 14.5px; color: var(--gd-ink-soft);
          margin: 0; max-width: 540px; font-weight: 500;
        }

        .gd-faq {
          background: var(--gd-paper);
          border: var(--gd-border);
          border-radius: var(--gd-radius-lg);
          box-shadow: var(--gd-sticker);
          overflow: hidden;
        }
        .gd-faq-item { border-bottom: 1.5px solid var(--gd-ink); }
        .gd-faq-item:last-child { border-bottom: none; }
        .gd-faq-q {
          all: unset; cursor: pointer;
          display: flex; justify-content: space-between; align-items: center; gap: 16px;
          padding: 18px 20px;
          width: 100%;
          box-sizing: border-box;
          color: var(--gd-ink);
          transition: background 140ms ease;
        }
        .gd-faq-q:hover { background: rgba(255, 214, 194, 0.4); }
        .gd-faq-q-text {
          font-family: var(--gd-display);
          font-size: 17px; font-weight: 500; font-style: italic;
          letter-spacing: -0.01em;
        }
        .gd-faq-icon {
          width: 30px; height: 30px;
          flex-shrink: 0;
          border-radius: 50%;
          background: var(--gd-lime);
          border: 1.5px solid var(--gd-ink);
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 18px; font-weight: 700;
          color: var(--gd-ink);
          transition: transform 220ms cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .gd-faq-icon-open {
          transform: rotate(45deg);
          background: var(--gd-pink);
          color: var(--gd-cream);
        }
        .gd-faq-a {
          padding: 0 20px 20px 20px;
          font-size: 14px;
          color: var(--gd-ink-soft);
          line-height: 1.6;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
}

'use client';

import { useState } from 'react';

const FAQS = [
  { q: 'How do I send a new gift order?',
    a: `Tap "New gift" in the top nav. Pick how many recipients, set a budget per person, choose an occasion, and write a personal message. We email each recipient a link to pick what they want from the merchant's catalog.` },
  { q: `What happens if a recipient doesn't claim their gift?`,
    a: `Unclaimed gifts expire 30 days after they're sent. We'll email you a reminder a week before any gift expires so you can extend it, reassign it, or get refunded for the unclaimed portion.` },
  { q: `Can I edit an order after it's sent?`,
    a: `You can edit the recipient list, budget, or shipping window up until a recipient claims their gift. After they claim, that specific recipient's order is locked, but the rest of the order is still editable.` },
  { q: 'How do receipts and billing work?',
    a: `Your card is charged when you place the order. You get an invoice immediately, and we send a final wrap-up invoice when all recipients have claimed (or unclaimed gifts expire and refund). Receipts are available under Account.` },
  { q: 'Can I gift internationally?',
    a: `Yes, anywhere the merchant ships. If a recipient is in a country the merchant doesn't ship to, we'll offer them a digital alternative.` },
  { q: 'Who do I contact for support?',
    a: `Use the chat widget in the corner for fast answers. For order-specific issues, drill into the order detail page and use the "Resend" action on individual recipients. For billing questions, email support@giftwell.io.` },
];

export default function GlowHelp() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="gdg-help">
      <section className="gdg-page-hero">
        <h1 className="gdg-page-title">Help</h1>
        <p className="gdg-page-sub">Common questions. If yours isn&rsquo;t here, chat with us.</p>
      </section>

      <div className="gdg-faq">
        {FAQS.map((f, i) => (
          <div key={i} className="gdg-faq-item">
            <button className="gdg-faq-q" onClick={() => setOpen(open === i ? null : i)}>
              <span>{f.q}</span>
              <span className={`gdg-faq-icon ${open === i ? 'gdg-faq-icon-open' : ''}`} aria-hidden>+</span>
            </button>
            {open === i && <div className="gdg-faq-a">{f.a}</div>}
          </div>
        ))}
      </div>

      <style jsx>{`
        .gdg-help {
          display: flex; flex-direction: column; gap: 24px;
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
        }

        .gdg-faq {
          background: var(--gdg-surface);
          border: 1px solid var(--gdg-hairline);
          border-radius: var(--gdg-radius);
          overflow: hidden;
        }
        .gdg-faq-item { border-bottom: 1px solid var(--gdg-hairline); }
        .gdg-faq-item:last-child { border-bottom: none; }
        .gdg-faq-q {
          all: unset; cursor: pointer;
          display: flex; justify-content: space-between; align-items: center; gap: 16px;
          padding: 18px 20px;
          width: 100%; box-sizing: border-box;
          font-size: 15px; font-weight: 500;
          color: var(--gdg-text);
          transition: background 140ms ease;
        }
        .gdg-faq-q:hover { background: rgba(255, 255, 255, 0.03); }
        .gdg-faq-icon {
          width: 28px; height: 28px; border-radius: 999px;
          background: var(--gdg-pill);
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 16px; font-weight: 500;
          color: var(--gdg-text-soft);
          flex-shrink: 0;
          transition: transform 220ms cubic-bezier(0.22, 0.61, 0.36, 1), background 160ms ease, color 160ms ease;
        }
        .gdg-faq-icon-open {
          transform: rotate(45deg);
          background: var(--gdg-purple);
          color: #fff;
        }
        .gdg-faq-a {
          padding: 0 20px 20px;
          font-size: 14px; color: var(--gdg-text-soft);
          line-height: 1.65;
        }
      `}</style>
    </div>
  );
}

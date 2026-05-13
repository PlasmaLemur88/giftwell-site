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
        <h1>Help</h1>
        <p>Common questions. If yours isn't here, chat with us.</p>
      </header>

      <div className="gd-faq">
        {FAQS.map((f, i) => (
          <div key={i} className="gd-faq-item">
            <button
              className="gd-faq-q"
              onClick={() => setOpen(open === i ? null : i)}
            >
              {f.q}
              <span className={`gd-faq-icon ${open === i ? 'gd-faq-icon-open' : ''}`}>+</span>
            </button>
            {open === i && <div className="gd-faq-a">{f.a}</div>}
          </div>
        ))}
      </div>

      <style jsx>{`
        .gd-help { display: flex; flex-direction: column; gap: 20px; }
        .gd-page-header { padding: 4px 8px 8px; color: #fff; }
        .gd-page-header h1 {
          font-family: 'Georgia', 'Times New Roman', serif;
          font-size: 38px; font-weight: 400; font-style: italic;
          letter-spacing: -0.02em; margin: 0 0 4px;
          color: #fff;
        }
        .gd-page-header p {
          font-size: 14.5px; color: #fff;
          margin: 0; font-weight: 500;
          text-shadow: 0 1px 2px rgba(20, 14, 50, 0.25);
        }

        .gd-faq {
          background: #fff;
          border: 1px solid #ececef;
          border-radius: 14px;
          overflow: hidden;
        }
        .gd-faq-item { border-bottom: 1px solid #f0f0f2; }
        .gd-faq-item:last-child { border-bottom: none; }
        .gd-faq-q {
          all: unset; cursor: pointer;
          display: flex; justify-content: space-between; align-items: center;
          padding: 16px 18px;
          width: 100%;
          font-size: 14.5px; font-weight: 500; color: #1a1a1f;
        }
        .gd-faq-icon {
          width: 24px; height: 24px; border-radius: 999px;
          background: #f3f3f5;
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 600;
          transition: transform 200ms ease;
          flex-shrink: 0;
        }
        .gd-faq-icon-open { transform: rotate(45deg); }
        .gd-faq-a {
          padding: 0 18px 16px; font-size: 13.5px; color: #43434b; line-height: 1.6;
        }
      `}</style>
    </div>
  );
}

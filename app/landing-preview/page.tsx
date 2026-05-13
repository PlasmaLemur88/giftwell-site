'use client';

import { useState } from 'react';

const BRAND = '#7C5CFF';
const BRAND_DARK = '#5C3FE0';
const MERCHANT = 'Acme Store';

const PRODUCTS = [
  { id: '1', name: 'Signature Candle',     price: '$34', bg: 'linear-gradient(135deg, #F4ECD8, #E8D8B8)', text: '#5a4a2a' },
  { id: '2', name: 'Bath Salts',           price: '$28', bg: 'linear-gradient(135deg, #DCDCFF, #B8B8E8)', text: '#3a3a8a' },
  { id: '3', name: 'Artisan Tea Set',      price: '$32', bg: 'linear-gradient(135deg, #A8E5C5, #6FCBA0)', text: '#1a4a2a' },
  { id: '4', name: 'Single-Origin Coffee', price: '$24', bg: 'linear-gradient(135deg, #d4a574, #8b5a2b)', text: '#fff' },
  { id: '5', name: 'Leather Notebook',     price: '$38', bg: 'linear-gradient(135deg, #2a2a2a, #4a4a4a)', text: '#fff' },
  { id: '6', name: 'Lavender Soap Bar',    price: '$18', bg: 'linear-gradient(135deg, #d8c4f0, #b896d8)', text: '#3a2a5a' },
];

const FAQS = [
  { q: 'How much does it cost?',                         a: `Just the gift budget plus a 10% Giftwell fee. No subscription, no hidden charges. You only pay when a recipient claims their gift.` },
  { q: `What if a recipient doesn't claim their gift?`,  a: `Unclaimed gifts expire after 30 days and are automatically refunded to your card. We'll email you before that happens so you can extend or re-send.` },
  { q: 'Can I send internationally?',                    a: `Yes, wherever ${MERCHANT} ships. Recipients in countries you don't ship to will get a digital alternative.` },
  { q: 'Can I add a personal message?',                  a: `Every gift includes a personal message you write at checkout. You can also choose from a few card themes to match the occasion.` },
  { q: 'Is there a minimum order?',                      a: `No. Send one gift or a thousand. Volume discounts kick in at 25, 50, and 100 recipients.` },
  { q: 'What if I need to make a change?',               a: `You can edit recipients, budgets, or shipping windows up until the moment a recipient claims their gift. Cancel any sub-order for a full refund.` },
];

export default function LandingPreviewPage() {
  const [recipientCount, setRecipientCount] = useState('25');
  const [budget, setBudget] = useState('100');
  const [date, setDate] = useState('');
  const [occasion, setOccasion] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div style={{ fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif', color: '#1a1a1f', background: '#fff' }}>
      {/* Top notice */}
      <div style={{
        background: '#1a1a1f', color: '#fff', padding: '8px 16px', textAlign: 'center', fontSize: 12, fontWeight: 500, letterSpacing: '0.02em',
      }}>
        Preview of the landing page that gets installed on each merchant's store . Edit copy + image at <a href="/admin-preview/landing" style={{ color: '#a78bfa', textDecoration: 'underline' }}>/admin-preview/landing</a>
      </div>

      <ThemeHeader />

      <Hero />

      <QuickStartForm
        recipientCount={recipientCount}
        setRecipientCount={setRecipientCount}
        budget={budget}
        setBudget={setBudget}
        date={date}
        setDate={setDate}
        occasion={occasion}
        setOccasion={setOccasion}
      />

      <FeaturedProducts />
      <HowItWorks />
      <TrustStrip />
      <Faq open={openFaq} onToggle={(i) => setOpenFaq(openFaq === i ? null : i)} />
      <FinalCta />

      <ThemeFooter />

      <ChatWidget open={chatOpen} onToggle={() => setChatOpen(!chatOpen)} />
    </div>
  );
}

/* ─── Theme chrome placeholders (inherited from merchant's Shopify theme in production) ─── */

function ThemeHeader() {
  return (
    <header style={{
      borderBottom: '1px solid #ececef',
      background: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '16px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '0.05em' }}>ACME</div>
        <nav style={{ display: 'flex', gap: 32, fontSize: 14 }}>
          <a href="#" style={{ color: '#1a1a1f', textDecoration: 'none' }}>Shop</a>
          <a href="#" style={{ color: '#1a1a1f', textDecoration: 'none' }}>About</a>
          <a href="#" style={{ color: '#1a1a1f', textDecoration: 'none' }}>Stories</a>
          <a href="#" style={{ color: BRAND, textDecoration: 'none', fontWeight: 600 }}>Send a gift</a>
          <a href="#" style={{ color: '#1a1a1f', textDecoration: 'none' }}>Contact</a>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 14 }}>Account</span>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 32, height: 32, borderRadius: 999, border: '1px solid #dcdcde', fontSize: 13,
          }}>0</span>
        </div>
      </div>
      <div style={{ background: '#fafafb', padding: '6px 16px', fontSize: 11, color: '#8a8a93', textAlign: 'center', borderTop: '1px dashed #dcdcde' }}>
        ↑ Your Shopify theme header (logo, nav, cart) sits here in production
      </div>
    </header>
  );
}

function ThemeFooter() {
  return (
    <footer style={{ borderTop: '1px solid #ececef', background: '#fafafb', marginTop: 0 }}>
      <div style={{ background: '#fff', padding: '6px 16px', fontSize: 11, color: '#8a8a93', textAlign: 'center', borderBottom: '1px dashed #dcdcde' }}>
        ↓ Your Shopify theme footer sits here in production
      </div>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, marginBottom: 32 }}>
          {[
            { title: 'Shop',    links: ['All products', 'New', 'Best sellers', 'Sale'] },
            { title: 'Support', links: ['FAQ', 'Shipping', 'Returns', 'Contact'] },
            { title: 'Company', links: ['About', 'Stories', 'Press', 'Careers'] },
            { title: 'Stay in touch', links: ['Newsletter', 'Instagram', 'TikTok', 'Pinterest'] },
          ].map((col) => (
            <div key={col.title}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>{col.title}</div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {col.links.map((l) => (
                  <li key={l}><a href="#" style={{ color: '#6b6b73', textDecoration: 'none', fontSize: 13 }}>{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid #ececef', paddingTop: 20, display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#8a8a93' }}>
          <span>© 2026 Acme Store. All rights reserved.</span>
          <span>Privacy · Terms · Accessibility</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── 1. Hero ─── */

function Hero() {
  return (
    <section style={{
      background: `
        radial-gradient(ellipse 60% 50% at 20% 15%, rgba(167, 139, 250, 0.55) 0%, transparent 55%),
        radial-gradient(ellipse 50% 45% at 85% 90%, rgba(91, 63, 224, 0.5) 0%, transparent 60%),
        linear-gradient(135deg, ${BRAND_DARK} 0%, ${BRAND} 50%, #B197F2 100%)
      `,
      color: '#fff',
      padding: '96px 32px 120px',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', opacity: 0.85, marginBottom: 20 }}>
          Corporate gifting by {MERCHANT}
        </div>
        <h1 style={{
          fontSize: 56, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.05,
          margin: '0 0 20px', color: '#fff',
        }}>
          Gifts they'll love, sent in minutes.
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.55, opacity: 0.92, margin: '0 auto 36px', maxWidth: 580 }}>
          Bulk gifting for client thank-yous, employee onboarding, and holiday programs. Recipients pick their own gift. You ship one address.
        </p>
        <a href="#start" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: '#fff', color: BRAND_DARK,
          padding: '14px 28px', borderRadius: 999, fontSize: 15, fontWeight: 600,
          textDecoration: 'none',
          boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)',
        }}>
          Start a gift order ↓
        </a>
      </div>
    </section>
  );
}

/* ─── 2. Quick-start form ─── */

const RECIPIENT_CHIPS = ['5', '10', '25', '50', '100+'];
const BUDGET_CHIPS = ['$25', '$50', '$100', '$200', '$500'];

function QuickStartForm({
  recipientCount, setRecipientCount,
  budget, setBudget,
  date, setDate,
  occasion, setOccasion,
}: {
  recipientCount: string; setRecipientCount: (v: string) => void;
  budget: string; setBudget: (v: string) => void;
  date: string; setDate: (v: string) => void;
  occasion: string; setOccasion: (v: string) => void;
}) {
  return (
    <section id="start" style={{ background: '#fafafb', padding: '80px 32px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.015em', margin: '0 0 12px' }}>
            Start a gift order
          </h2>
          <p style={{ fontSize: 15, color: '#5a5a62', margin: 0 }}>
            Tell us a bit and we'll show you what fits.
          </p>
        </div>

        <div style={{
          background: '#fff', borderRadius: 14, padding: 32,
          boxShadow: '0 4px 24px rgba(15, 15, 25, 0.06)', border: '1px solid #ececef',
        }}>
          {/* Recipients */}
          <FieldGroup label="How many recipients?">
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {RECIPIENT_CHIPS.map((c) => (
                <Chip key={c} active={recipientCount === c} onClick={() => setRecipientCount(c)}>{c}</Chip>
              ))}
              <input
                type="text"
                placeholder="Custom"
                value={RECIPIENT_CHIPS.includes(recipientCount) ? '' : recipientCount}
                onChange={(e) => setRecipientCount(e.target.value)}
                style={chipInput}
              />
            </div>
          </FieldGroup>

          {/* Budget */}
          <FieldGroup label="Budget per person?">
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {BUDGET_CHIPS.map((c) => (
                <Chip key={c} active={budget === c.replace('$', '')} onClick={() => setBudget(c.replace('$', ''))}>{c}</Chip>
              ))}
              <input
                type="text"
                placeholder="Custom"
                value={BUDGET_CHIPS.map((c) => c.replace('$', '')).includes(budget) ? '' : budget}
                onChange={(e) => setBudget(e.target.value)}
                style={chipInput}
              />
            </div>
          </FieldGroup>

          {/* Date + Occasion */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <FieldGroup label="When should it ship?">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={textInput}
              />
            </FieldGroup>
            <FieldGroup label="What's the occasion?">
              <select value={occasion} onChange={(e) => setOccasion(e.target.value)} style={textInput}>
                <option value="">Optional</option>
                <option value="thanks">Client thank-you</option>
                <option value="newhire">New hire</option>
                <option value="holiday">Holiday</option>
                <option value="promotion">Promotion</option>
                <option value="other">Other</option>
              </select>
            </FieldGroup>
          </div>

          {/* CTA */}
          <button style={{
            width: '100%', marginTop: 24, padding: '14px 24px', borderRadius: 12,
            background: BRAND, color: '#fff',
            border: 'none', fontSize: 15, fontWeight: 600, cursor: 'pointer',
            boxShadow: '0 8px 20px -8px rgba(124, 92, 255, 0.6)',
            transition: 'transform 120ms ease',
          }}>
            See gifts that fit →
          </button>

          <p style={{ fontSize: 12.5, color: '#8a8a93', textAlign: 'center', margin: '14px 0 0' }}>
            Takes 2 minutes. No signup until you're ready to pay.
          </p>
        </div>
      </div>
    </section>
  );
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 8, color: '#1a1a1f' }}>{label}</label>
      {children}
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        all: 'unset', cursor: 'pointer',
        padding: '8px 16px', borderRadius: 999, fontSize: 13.5, fontWeight: 500,
        background: active ? BRAND : '#fff',
        color: active ? '#fff' : '#1a1a1f',
        border: `1px solid ${active ? BRAND : '#dcdcde'}`,
        transition: 'all 120ms ease',
      }}
    >
      {children}
    </button>
  );
}

const chipInput: React.CSSProperties = {
  padding: '8px 14px', borderRadius: 999, fontSize: 13.5, fontWeight: 500,
  background: '#fff', border: '1px solid #dcdcde', width: 90,
  fontFamily: 'inherit', outline: 'none',
};

const textInput: React.CSSProperties = {
  width: '100%', padding: '11px 14px', borderRadius: 10, fontSize: 14,
  background: '#fff', border: '1px solid #dcdcde',
  fontFamily: 'inherit', outline: 'none', color: '#1a1a1f',
};

/* ─── 3. Featured products ─── */

function FeaturedProducts() {
  return (
    <section style={{ background: '#fff', padding: '80px 32px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.015em', margin: '0 0 10px' }}>
            Curated for gifting
          </h2>
          <p style={{ fontSize: 15, color: '#5a5a62', margin: 0 }}>
            Pulled straight from {MERCHANT}'s shop. Recipients pick what fits your budget.
          </p>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20,
        }}>
          {PRODUCTS.map((p) => (
            <div key={p.id} style={{
              border: '1px solid #ececef', borderRadius: 14, overflow: 'hidden',
              background: '#fff', transition: 'transform 120ms ease, box-shadow 120ms ease',
              cursor: 'pointer',
            }}>
              <div style={{ height: 200, background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.text, fontSize: 14, fontWeight: 500 }}>
                {p.name}
              </div>
              <div style={{ padding: '14px 18px' }}>
                <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{p.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 14, color: '#5a5a62' }}>{p.price}</span>
                  <a href="#" style={{ color: BRAND, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Send this →</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <a href="#" style={{ color: BRAND, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
            See all gifts →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── 4. How it works ─── */

function HowItWorks() {
  const steps = [
    { n: '1', title: 'Set your budget', body: 'Pick how much to spend per person. We curate options that fit.' },
    { n: '2', title: 'Send the link',  body: `Each recipient gets a personal email from ${MERCHANT} with their gift link.` },
    { n: '3', title: 'They pick, you ship', body: 'Recipients choose what they want. We handle shipping and tracking.' },
  ];
  return (
    <section style={{ background: '#fafafb', padding: '80px 32px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.015em', margin: '0 0 40px', textAlign: 'center' }}>
          How it works
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {steps.map((s) => (
            <div key={s.n} style={{ textAlign: 'center' }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: `linear-gradient(135deg, ${BRAND}, ${BRAND_DARK})`,
                color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22, fontWeight: 700, marginBottom: 20,
              }}>{s.n}</div>
              <h3 style={{ fontSize: 17, fontWeight: 600, margin: '0 0 8px' }}>{s.title}</h3>
              <p style={{ fontSize: 14.5, color: '#5a5a62', lineHeight: 1.55, margin: 0 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 5. Trust strip ─── */

function TrustStrip() {
  return (
    <section style={{ background: '#1a1a1f', color: '#fff', padding: '48px 32px' }}>
      <div style={{
        maxWidth: 900, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, textAlign: 'center',
      }}>
        {[
          { stat: '200+',  label: 'teams trust Giftwell' },
          { stat: '98%',   label: 'of recipients claim their gift' },
          { stat: '2 days', label: 'average claim time' },
        ].map((s, i) => (
          <div key={i}>
            <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em', color: '#fff', marginBottom: 4 }}>{s.stat}</div>
            <div style={{ fontSize: 13, color: '#a8a8b0' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── 6. FAQ ─── */

function Faq({ open, onToggle }: { open: number | null; onToggle: (i: number) => void }) {
  return (
    <section style={{ background: '#fff', padding: '80px 32px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.015em', margin: '0 0 32px', textAlign: 'center' }}>
          Questions
        </h2>
        <div style={{ borderTop: '1px solid #ececef' }}>
          {FAQS.map((f, i) => (
            <div key={i} style={{ borderBottom: '1px solid #ececef' }}>
              <button
                onClick={() => onToggle(i)}
                style={{
                  all: 'unset', cursor: 'pointer', display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', width: '100%', padding: '18px 0',
                  fontSize: 16, fontWeight: 500, color: '#1a1a1f',
                }}
              >
                {f.q}
                <span style={{
                  width: 24, height: 24, borderRadius: 999, background: '#f5f5f7',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  transform: open === i ? 'rotate(45deg)' : 'none',
                  transition: 'transform 200ms ease',
                  fontSize: 14, fontWeight: 600, color: '#1a1a1f',
                }}>+</span>
              </button>
              {open === i && (
                <div style={{ padding: '0 0 18px', fontSize: 14.5, color: '#5a5a62', lineHeight: 1.65 }}>
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 7. Final CTA ─── */

function FinalCta() {
  return (
    <section style={{
      background: `linear-gradient(135deg, ${BRAND_DARK} 0%, ${BRAND} 100%)`,
      color: '#fff', padding: '80px 32px', textAlign: 'center',
    }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <h2 style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 16px' }}>
          Ready to send something they'll love?
        </h2>
        <p style={{ fontSize: 16, opacity: 0.9, margin: '0 0 32px' }}>
          Most orders take less than two minutes to set up.
        </p>
        <a href="#start" style={{
          display: 'inline-flex', alignItems: 'center',
          background: '#fff', color: BRAND_DARK,
          padding: '15px 32px', borderRadius: 999, fontSize: 15, fontWeight: 600,
          textDecoration: 'none', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)',
        }}>
          Start a gift order ↑
        </a>
        <p style={{ fontSize: 13, opacity: 0.75, margin: '24px 0 0' }}>
          Or chat with us, bottom right →
        </p>
      </div>
    </section>
  );
}

/* ─── 8. Chat widget ─── */

function ChatWidget({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <>
      {/* Floating button */}
      <button
        onClick={onToggle}
        aria-label="Chat with Giftwell"
        style={{
          all: 'unset', cursor: 'pointer',
          position: 'fixed', bottom: 24, right: 24, zIndex: 100,
          display: open ? 'none' : 'inline-flex',
          alignItems: 'center', gap: 10,
          background: BRAND, color: '#fff',
          padding: '12px 18px', borderRadius: 999,
          boxShadow: '0 10px 30px -8px rgba(124, 92, 255, 0.55), 0 4px 10px rgba(0,0,0,0.1)',
          fontSize: 14, fontWeight: 600,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        Questions? Chat with us
      </button>

      {/* Panel */}
      {open && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 100,
          width: 360, height: 520, background: '#fff', borderRadius: 16,
          boxShadow: '0 24px 60px -12px rgba(0,0,0,0.25), 0 8px 16px rgba(0,0,0,0.08)',
          border: '1px solid #ececef',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 18px',
            background: `linear-gradient(135deg, ${BRAND_DARK}, ${BRAND})`,
            color: '#fff',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Giftwell support</div>
              <div style={{ fontSize: 12, opacity: 0.85 }}>Quick answers, real humans</div>
            </div>
            <button onClick={onToggle} aria-label="Close" style={{
              all: 'unset', cursor: 'pointer', padding: 4, borderRadius: 6,
              color: '#fff', fontSize: 18,
            }}>×</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: 18, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{
              background: '#f3f3f5', color: '#1a1a1f',
              padding: '10px 14px', borderRadius: 12, borderBottomLeftRadius: 4,
              fontSize: 13.5, lineHeight: 1.5, alignSelf: 'flex-start', maxWidth: '85%',
            }}>
              Hi! 👋 What can I help with? Pick a quick option or ask anything.
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignSelf: 'flex-start' }}>
              {['Pricing', 'Shipping', 'Customization', 'Talk to a human'].map((q) => (
                <button key={q} style={{
                  all: 'unset', cursor: 'pointer',
                  padding: '6px 12px', borderRadius: 999,
                  border: `1px solid ${BRAND}`, color: BRAND,
                  fontSize: 12.5, fontWeight: 500,
                }}>{q}</button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div style={{ borderTop: '1px solid #ececef', padding: 12, display: 'flex', gap: 8 }}>
            <input
              type="text"
              placeholder="Type a message"
              style={{
                flex: 1, padding: '10px 14px', borderRadius: 999,
                border: '1px solid #dcdcde', fontSize: 13.5, outline: 'none',
                fontFamily: 'inherit', color: '#1a1a1f',
              }}
            />
            <button style={{
              all: 'unset', cursor: 'pointer',
              background: BRAND, color: '#fff',
              padding: '10px 16px', borderRadius: 999, fontSize: 13.5, fontWeight: 600,
            }}>Send</button>
          </div>

          {/* Footer */}
          <div style={{ padding: '8px 18px', fontSize: 11, color: '#8a8a93', textAlign: 'center', borderTop: '1px solid #ececef', background: '#fafafb' }}>
            Powered by <strong style={{ color: '#6b6b73' }}>Giftwell</strong>
          </div>
        </div>
      )}
    </>
  );
}

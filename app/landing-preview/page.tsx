'use client';

import { useState } from 'react';

const BRAND = '#7C5CFF';
const LAVENDER_BG = '#F0EEFA';
const MERCHANT = 'Acme Store';

type Bundle = {
  id: string;
  name: string;
  price: string;
  blurb: string;
  bg: string;
};

const BUNDLES: Bundle[] = [
  { id: '1', name: 'Elite Oral Health',         price: '$519.00', blurb: 'Comprehensive oral intelligence valued at over $740 . offered at $519. Our system eliminates inconsistent brushing while...', bg: 'linear-gradient(135deg, #E8E2F4, #C9C0E8)' },
  { id: '2', name: `Founder's Edition Plus`,    price: '$399.00', blurb: `This premium bundle delivers $530+ worth of advanced oral health tools and smart support . all for $399. This package...`, bg: 'linear-gradient(135deg, #D4CFE8, #B5ADD8)' },
  { id: '3', name: `Founder's Edition Bundle`,  price: '$299.00', blurb: `This limited-time bundle features ${MERCHANT}'s complete oral care suite, including: The Acme Smartbrush™ (comprised of the...`, bg: 'linear-gradient(135deg, #BBB2D4, #9C90C0)' },
];

export default function LandingPreviewPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [recipientCount, setRecipientCount] = useState('25');
  const [budget, setBudget] = useState('100');
  const [date, setDate] = useState('');
  const [occasion, setOccasion] = useState('');

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
        recipientCount={recipientCount} setRecipientCount={setRecipientCount}
        budget={budget} setBudget={setBudget}
        date={date} setDate={setDate}
        occasion={occasion} setOccasion={setOccasion}
      />
      <NoAddressesSection />
      <DigitalUnboxingSection />
      <BundleShowcase />
      <HowItWorks />

      <ThemeFooter />
      <ChatWidget open={chatOpen} onToggle={() => setChatOpen(!chatOpen)} />
    </div>
  );
}

/* ─── Theme chrome placeholders (inherited from merchant's Shopify theme in production) ─── */

function ThemeHeader() {
  return (
    <header style={{ borderBottom: '1px solid #ececef', background: '#fff', position: 'sticky', top: 0, zIndex: 10 }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '16px 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '0.05em' }}>ACME</div>
        <nav style={{ display: 'flex', gap: 32, fontSize: 14 }}>
          <a href="#" style={{ color: '#1a1a1f', textDecoration: 'none' }}>Shop</a>
          <a href="#" style={{ color: '#1a1a1f', textDecoration: 'none' }}>About</a>
          <a href="#" style={{ color: '#1a1a1f', textDecoration: 'none' }}>Stories</a>
          <a href="#" style={{ color: '#1a1a1f', textDecoration: 'none', fontWeight: 600 }}>Send a gift</a>
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
            { title: 'Shop',           links: ['All products', 'New', 'Best sellers', 'Sale'] },
            { title: 'Support',        links: ['FAQ', 'Shipping', 'Returns', 'Contact'] },
            { title: 'Company',        links: ['About', 'Stories', 'Press', 'Careers'] },
            { title: 'Stay in touch',  links: ['Newsletter', 'Instagram', 'TikTok', 'Pinterest'] },
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

/* ─── 1. Hero (image-led, split, lavender wash) ─── */

function Hero() {
  return (
    <section style={{ background: LAVENDER_BG, padding: '64px 32px 80px' }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center',
      }}>
        <div>
          <h1 style={{
            fontSize: 44, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1,
            margin: '0 0 16px', color: '#1a1a1f',
          }}>
            Send hundreds of gifts at once.
            <br />Without the busywork.
          </h1>
          <p style={{ fontSize: 15.5, lineHeight: 1.6, color: '#3a3a42', margin: '0 0 28px', maxWidth: 460 }}>
            From flexible recipient input to a pre-populated or customizable unwrapping experience, it all happens <strong>in seconds</strong>.
          </p>
          <a href="#start" style={{
            display: 'inline-block',
            background: '#1a1a1f', color: '#fff',
            padding: '14px 36px', borderRadius: 10, fontSize: 15, fontWeight: 600,
            textDecoration: 'none',
          }}>
            Start Gifting
          </a>
        </div>
        <div style={{
          aspectRatio: '1 / 1',
          background: 'radial-gradient(circle at 50% 45%, #2a2a3a 0%, #0a0a18 80%)',
          borderRadius: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Faux gift box visual */}
          <div style={{ position: 'relative', width: '70%', height: '55%' }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(135deg, #d4d4dc, #f0f0f5)',
              borderRadius: 4,
              boxShadow: '0 20px 50px -10px rgba(0,0,0,0.5)',
            }} />
            {/* Ribbon vertical */}
            <div style={{
              position: 'absolute', left: '47%', top: -10, bottom: -10, width: '6%',
              background: 'linear-gradient(180deg, #3a5fb8, #1d3d8a)',
            }} />
            {/* Ribbon horizontal */}
            <div style={{
              position: 'absolute', top: '47%', left: -10, right: -10, height: '6%',
              background: 'linear-gradient(180deg, #3a5fb8, #1d3d8a)',
            }} />
            {/* Bow */}
            <div style={{
              position: 'absolute', left: '40%', top: '38%', width: '20%', height: '20%',
              background: 'radial-gradient(ellipse, #4a6fc8 0%, #1d3d8a 80%)',
              borderRadius: '50%',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            }} />
          </div>
          <div style={{
            position: 'absolute', bottom: 18, left: 18, fontSize: 11,
            color: 'rgba(255,255,255,0.5)', fontStyle: 'italic',
          }}>Merchant-uploaded hero image</div>
        </div>
      </div>
    </section>
  );
}

/* ─── 2. Quick-start form (the form Brandon wanted) ─── */

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
    <section id="start" style={{ background: '#fff', padding: '72px 32px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.015em', margin: '0 0 10px' }}>
            Start a gift order
          </h2>
          <p style={{ fontSize: 14.5, color: '#5a5a62', margin: 0 }}>
            Tell us a bit, we'll show you what fits.
          </p>
        </div>

        <div style={{
          background: '#fff', borderRadius: 14, padding: 28,
          border: '1px solid #ececef',
        }}>
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <FieldGroup label="When should it ship?">
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={textInput} />
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

          <button style={{
            width: '100%', marginTop: 20, padding: '14px 24px', borderRadius: 10,
            background: '#1a1a1f', color: '#fff',
            border: 'none', fontSize: 15, fontWeight: 600, cursor: 'pointer',
          }}>
            Continue →
          </button>

          <p style={{ fontSize: 12.5, color: '#8a8a93', textAlign: 'center', margin: '12px 0 0' }}>
            Takes 2 minutes. No signup until checkout.
          </p>
        </div>
      </div>
    </section>
  );
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 18 }}>
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
        background: active ? '#1a1a1f' : '#fff',
        color: active ? '#fff' : '#1a1a1f',
        border: `1px solid ${active ? '#1a1a1f' : '#dcdcde'}`,
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

/* ─── 3. "No addresses? No problem" (image + bullets + CTA, split) ─── */

function NoAddressesSection() {
  const items = [
    'Pick your gift and send as email gifts to redeem.',
    'No addresses needed; schedule delivery and include a message.',
    'Recipient redeems with code for your preselected bundle value.',
  ];
  return (
    <section style={{ background: '#fff', padding: '80px 32px' }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center',
      }}>
        <div style={{
          aspectRatio: '4 / 3',
          background: 'radial-gradient(circle at 30% 40%, #2747a8 0%, #0a0a30 90%)',
          borderRadius: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Faux digital gift card */}
          <div style={{
            background: '#0a0a18', padding: '36px 44px', borderRadius: 6,
            display: 'flex', alignItems: 'center', gap: 12,
            transform: 'rotate(-3deg)',
            boxShadow: '0 30px 60px -20px rgba(0,0,0,0.6)',
          }}>
            <span style={{
              fontSize: 28, fontWeight: 800, color: '#fff', letterSpacing: '0.06em',
            }}>{MERCHANT.toUpperCase()}</span>
            <span style={{
              fontSize: 11, fontWeight: 700, padding: '4px 8px',
              background: BRAND, color: '#fff', borderRadius: 4, letterSpacing: '0.05em',
            }}>GIFT</span>
          </div>
          <div style={{
            position: 'absolute', bottom: 18, left: '50%', transform: 'translateX(-50%)',
            fontSize: 12, color: 'rgba(255,255,255,0.7)', fontStyle: 'italic',
          }}>Delivered Digitally</div>
        </div>
        <div>
          <h2 style={{
            fontSize: 30, fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.15,
            margin: '0 0 20px',
          }}>
            No addresses? No problem
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {items.map((t) => (
              <li key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14.5, color: '#3a3a42', lineHeight: 1.55 }}>
                <span style={{
                  width: 20, height: 20, borderRadius: '50%', border: '1.5px solid #1a1a1f',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2,
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                {t}
              </li>
            ))}
          </ul>
          <a href="#start" style={{
            display: 'inline-block',
            background: '#1a1a1f', color: '#fff',
            padding: '13px 32px', borderRadius: 10, fontSize: 14.5, fontWeight: 600, textDecoration: 'none',
          }}>
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── 4. Digital unboxing showcase ─── */

function DigitalUnboxingSection() {
  return (
    <section style={{ background: '#fff', padding: '40px 32px 80px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{
          fontSize: 30, fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.15,
          margin: '0 0 14px',
        }}>
          Delight them with a<br />digital unboxing
        </h2>
        <p style={{ fontSize: 15, color: '#5a5a62', lineHeight: 1.6, margin: '0 0 36px', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>
          Personalize your gift with a unique digital unwrapping to create a memorable and branded experience.
        </p>
        <div style={{
          aspectRatio: '16 / 10',
          background: '#ececef',
          borderRadius: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          {/* Faux video play button */}
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 10px 30px -8px rgba(0,0,0,0.2)',
          }}>
            <div style={{
              width: 0, height: 0,
              borderLeft: '20px solid #1a1a1f',
              borderTop: '12px solid transparent',
              borderBottom: '12px solid transparent',
              marginLeft: 5,
            }} />
          </div>
          <div style={{ position: 'absolute', bottom: 14, fontSize: 11, color: '#8a8a93', fontStyle: 'italic' }}>
            Digital unboxing demo video / GIF
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── 5. Bundle showcase ("The perfect gift, at scale") ─── */

function BundleShowcase() {
  return (
    <section style={{ background: LAVENDER_BG, padding: '80px 32px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{
          fontSize: 30, fontWeight: 700, letterSpacing: '-0.015em',
          margin: '0 0 40px', textAlign: 'center',
        }}>
          The perfect gift, at scale
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {BUNDLES.map((b) => (
            <div key={b.id} style={{
              background: '#fff', borderRadius: 14, padding: 18,
              display: 'flex', flexDirection: 'column', gap: 14,
            }}>
              <div style={{
                aspectRatio: '4 / 3', background: b.bg, borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(0,0,0,0.4)', fontSize: 12, fontStyle: 'italic',
              }}>
                Bundle image
              </div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 6px' }}>{b.name}</h3>
                <p style={{ fontSize: 12.5, color: '#5a5a62', lineHeight: 1.5, margin: '0 0 10px' }}>{b.blurb}</p>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1f' }}>{b.price}</div>
              </div>
              <button style={{
                all: 'unset', cursor: 'pointer', textAlign: 'center',
                padding: '11px 16px', borderRadius: 8,
                border: '1px solid #1a1a1f', color: '#1a1a1f',
                fontSize: 13.5, fontWeight: 500,
                transition: 'background 120ms ease',
              }}>
                Gift this Set
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 6. How it works (image + numbered steps, split) ─── */

function HowItWorks() {
  const steps = [
    { n: '1', title: 'Choose a Gift Set',        body: 'Browse our curated collections and pick the perfect fit.' },
    { n: '2', title: 'Personalize Your Message', body: 'Add a heartfelt note and customize the experience.' },
    { n: '3', title: 'Send & Delight',           body: 'Your recipient gets a beautiful gift experience delivered right to them.' },
  ];
  return (
    <section style={{ background: '#fff', padding: '80px 32px' }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center',
      }}>
        <div style={{
          aspectRatio: '4 / 3',
          background: 'linear-gradient(135deg, #f5f5f5, #e0e0e0)',
          borderRadius: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#8a8a93', fontSize: 12, fontStyle: 'italic',
        }}>
          Product / experience image
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {steps.map((s) => (
            <div key={s.n}>
              <span style={{
                display: 'inline-block',
                fontSize: 11.5, fontWeight: 600, color: '#3a3a42',
                padding: '4px 11px', borderRadius: 999,
                border: '1px solid #dcdcde', marginBottom: 10,
              }}>
                Step {s.n}
              </span>
              <h3 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.01em', margin: '0 0 6px' }}>{s.title}</h3>
              <p style={{ fontSize: 14, color: '#5a5a62', lineHeight: 1.55, margin: 0, borderLeft: '2px solid #ececef', paddingLeft: 12 }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 7. Chat widget (Giftwell-operated, floating) ─── */

function ChatWidget({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <>
      <button
        onClick={onToggle}
        aria-label="Chat with Giftwell"
        style={{
          all: 'unset', cursor: 'pointer',
          position: 'fixed', bottom: 24, right: 24, zIndex: 100,
          display: open ? 'none' : 'inline-flex',
          alignItems: 'center', gap: 10,
          background: '#1a1a1f', color: '#fff',
          padding: '12px 18px', borderRadius: 999,
          boxShadow: '0 10px 30px -8px rgba(0,0,0,0.25), 0 4px 10px rgba(0,0,0,0.1)',
          fontSize: 14, fontWeight: 600,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        Questions? Chat with us
      </button>

      {open && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 100,
          width: 360, height: 520, background: '#fff', borderRadius: 16,
          boxShadow: '0 24px 60px -12px rgba(0,0,0,0.25), 0 8px 16px rgba(0,0,0,0.08)',
          border: '1px solid #ececef',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          <div style={{
            padding: '16px 18px',
            background: '#1a1a1f', color: '#fff',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Giftwell support</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>Quick answers, real humans</div>
            </div>
            <button onClick={onToggle} aria-label="Close" style={{
              all: 'unset', cursor: 'pointer', padding: 4, borderRadius: 6,
              color: '#fff', fontSize: 18,
            }}>×</button>
          </div>

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
                  border: '1px solid #1a1a1f', color: '#1a1a1f',
                  fontSize: 12.5, fontWeight: 500,
                }}>{q}</button>
              ))}
            </div>
          </div>

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
              background: '#1a1a1f', color: '#fff',
              padding: '10px 16px', borderRadius: 999, fontSize: 13.5, fontWeight: 600,
            }}>Send</button>
          </div>

          <div style={{ padding: '8px 18px', fontSize: 11, color: '#8a8a93', textAlign: 'center', borderTop: '1px solid #ececef', background: '#fafafb' }}>
            Powered by <strong style={{ color: '#6b6b73' }}>Giftwell</strong>
          </div>
        </div>
      )}
    </>
  );
}

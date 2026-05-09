'use client';

import { ReactNode } from 'react';

export type FrameAnswers = {
  goals?: string[];
  buyerStatus?: string;
  volume?: string;
  catalogApproach?: string;
  feeHandling?: string;
  optInPlacements?: string[];
  enableMarketingOptIn?: boolean;
  enableDoubleOptIn?: boolean;
  addToKlaviyo?: boolean;
  applyTags?: boolean;
  triggerWelcome?: boolean;
  enableVolumeDiscounts?: boolean;
  enableConcierge?: boolean;
  addToNav?: boolean;
  addToFooter?: boolean;
};

type FrameProps = {
  answers: FrameAnswers;
  onChange: (patch: Partial<FrameAnswers>) => void;
};

export const FRAMES = [
  { id: 'welcome', label: 'Welcome', title: 'Welcome to Giftwell', subtitle: "Let's get your corporate gifting set up. Takes about 10 minutes." },
  { id: 'catalog', label: 'Catalog', title: 'What products can gifters choose from?', subtitle: 'We found 847 products in your Shopify catalog.' },
  { id: 'pricing', label: 'Pricing', title: 'How should pricing work?', subtitle: 'Configure the experience fee and volume discounts.' },
  { id: 'branding', label: 'Branding', title: 'Customize the gift experience', subtitle: 'Your colors, your logo, your vibe.' },
  { id: 'integrations', label: 'Integrations', title: 'Connect your tools', subtitle: 'Sync gift data with your email marketing and CRM.' },
  { id: 'optin', label: 'Marketing', title: 'Turn gift recipients into customers', subtitle: 'Configure the marketing opt-in shown during the gift experience.' },
  { id: 'landing', label: 'Landing Page', title: 'Your gift page', subtitle: 'Where gifters land when they want to send a gift.' },
  { id: 'support', label: 'Support', title: 'Concierge support', subtitle: 'Let Giftwell handle support questions for your gifters.' },
  { id: 'review', label: 'Review', title: 'Almost there — review your setup', subtitle: 'Make sure everything looks good before going live.' },
  { id: 'launched', label: 'Launch', title: "You're live!", subtitle: null as string | null },
] as const;

/* ─── Shared building blocks ─── */

function Question({ label, helper, children }: { label: string; helper?: string; children: ReactNode }) {
  return (
    <div className="mb-7 last:mb-0">
      <h3 className="text-base font-semibold mb-1">{label}</h3>
      {helper && <p className="text-sm text-[#6d7175] mb-3">{helper}</p>}
      {!helper && <div className="mb-3" />}
      {children}
    </div>
  );
}

type Tile = {
  id: string;
  title: string;
  description?: string;
  badge?: string;
};

function TilePicker({
  mode,
  options,
  value,
  onChange,
  columns,
}: {
  mode: 'single' | 'multi';
  options: Tile[];
  value: string | string[] | undefined;
  onChange: (val: string | string[]) => void;
  columns?: number;
}) {
  const isSelected = (id: string) =>
    mode === 'multi' ? Array.isArray(value) && value.includes(id) : value === id;

  const toggle = (id: string) => {
    if (mode === 'multi') {
      const current = Array.isArray(value) ? value : [];
      const next = current.includes(id) ? current.filter((v) => v !== id) : [...current, id];
      onChange(next);
    } else {
      onChange(id);
    }
  };

  const cols = columns ?? options.length;

  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
    >
      {options.map((opt) => {
        const selected = isSelected(opt.id);
        return (
          <button
            key={opt.id}
            onClick={() => toggle(opt.id)}
            className={`relative text-left p-4 rounded-xl border transition-all ${
              selected
                ? 'border-black bg-[#fafafa] ring-1 ring-black'
                : 'border-[#e1e3e5] bg-white hover:border-[#c9cccf]'
            }`}
          >
            <div className="font-semibold text-sm mb-1">{opt.title}</div>
            {opt.description && (
              <div className="text-xs text-[#6d7175] leading-relaxed">{opt.description}</div>
            )}
            {opt.badge && (
              <div className="mt-2 inline-block text-[10px] font-medium px-1.5 py-0.5 rounded bg-[#e3f1df] text-[#0a5132]">
                {opt.badge}
              </div>
            )}
            {selected && (
              <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-black grid place-items-center">
                <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6.5L5 9L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

function Toggle({ checked, onChange, label, helper }: { checked: boolean; onChange: (v: boolean) => void; label: string; helper?: string }) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-[#f1f1f1] last:border-b-0">
      <div className="flex-1 pr-4">
        <p className="text-sm font-medium">{label}</p>
        {helper && <p className="text-xs text-[#6d7175] mt-0.5">{helper}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-9 h-5 rounded-full transition-colors flex-shrink-0 ${
          checked ? 'bg-black' : 'bg-[#d2d5d8]'
        }`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
            checked ? 'translate-x-4' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}

function TextInput({ label, value, helper }: { label: string; value: string; helper?: string }) {
  return (
    <div className="mb-4 last:mb-0">
      <label className="text-sm font-medium block mb-1.5">{label}</label>
      <input
        defaultValue={value}
        className="w-full text-sm px-3 py-2 rounded-lg border border-[#e1e3e5] bg-white focus:outline-none focus:border-black"
      />
      {helper && <p className="text-xs text-[#6d7175] mt-1">{helper}</p>}
    </div>
  );
}

function Section({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <div className="border border-[#e1e3e5] rounded-xl p-5 mb-4 last:mb-0">
      <div className="mb-4">
        <h4 className="text-sm font-semibold">{title}</h4>
        {description && <p className="text-xs text-[#6d7175] mt-0.5">{description}</p>}
      </div>
      {children}
    </div>
  );
}

/* ─── Frame components ─── */

function FrameWelcome({ answers, onChange }: FrameProps) {
  return (
    <div>
      <Question label="What are you hoping to achieve?" helper="Select all that apply.">
        <TilePicker
          mode="multi"
          value={answers.goals}
          onChange={(v) => onChange({ goals: v as string[] })}
          options={[
            { id: 'revenue', title: 'Increase Revenue', description: 'Drive high-value bulk orders from corporate buyers' },
            { id: 'customers', title: 'Acquire Customers', description: 'Turn gift recipients into repeat customers' },
            { id: 'brand', title: 'Brand Awareness', description: 'Create memorable brand moments' },
          ]}
        />
      </Question>

      <Question label="Do you have corporate buyers already?">
        <TilePicker
          mode="single"
          value={answers.buyerStatus}
          onChange={(v) => onChange({ buyerStatus: v as string })}
          options={[
            { id: 'waiting', title: 'Yes, waiting on me', description: 'Buyers ready to order once I set this up' },
            { id: 'some', title: 'Some interest', description: 'Had inquiries but no formal process' },
            { id: 'none', title: 'Not yet', description: 'Looking to capture this opportunity' },
          ]}
        />
      </Question>

      <Question label="Expected monthly volume?">
        <TilePicker
          mode="single"
          columns={4}
          value={answers.volume}
          onChange={(v) => onChange({ volume: v as string })}
          options={[
            { id: 'lt50', title: '< 50 gifts', description: 'Just getting started' },
            { id: '50-200', title: '50–200 gifts', description: 'Growing demand', badge: 'Most common' },
            { id: '200-500', title: '200–500 gifts', description: 'Established program' },
            { id: '500plus', title: '500+ gifts', description: 'Enterprise scale' },
          ]}
        />
      </Question>
    </div>
  );
}

function FrameCatalog({ answers, onChange }: FrameProps) {
  return (
    <div>
      <Question label="Choose your catalog approach">
        <TilePicker
          mode="single"
          value={answers.catalogApproach}
          onChange={(v) => onChange({ catalogApproach: v as string })}
          options={[
            { id: 'full', title: 'Full Catalog', description: 'Make all 847 products available for gifting' },
            { id: 'curated', title: 'Curated Bundles', description: 'Create gift bundles from your products', badge: 'Recommended' },
            { id: 'both', title: 'Both', description: 'Featured bundles + browse full catalog' },
          ]}
        />
      </Question>

      <Section title="Select products for your first bundle" description="Click to select, then we'll help you create a bundle">
        <input
          placeholder="Search products…"
          className="w-full text-sm px-3 py-2 rounded-lg border border-[#e1e3e5] bg-white mb-4 focus:outline-none focus:border-black"
        />
        <div className="grid grid-cols-4 gap-3">
          {[
            { name: 'Signature Candle', price: '$34.00', sel: true },
            { name: 'Bath Salts', price: '$28.00', sel: true },
            { name: 'Artisan Tea Set', price: '$32.00', sel: true },
            { name: 'Cashmere Gloves', price: '$65.00', sel: false },
            { name: 'Leather Journal', price: '$45.00', sel: false },
            { name: 'Ceramic Mug', price: '$24.00', sel: false },
            { name: 'Chocolate Box', price: '$38.00', sel: false },
            { name: 'Wool Scarf', price: '$55.00', sel: false },
          ].map((p) => (
            <div
              key={p.name}
              className={`relative aspect-square rounded-lg border ${
                p.sel ? 'border-black ring-1 ring-black bg-[#fafafa]' : 'border-[#e1e3e5] bg-white'
              } flex flex-col`}
            >
              <div className="flex-1 bg-[#f6f6f7] rounded-t-lg" />
              <div className="p-2">
                <p className="text-xs font-medium truncate">{p.name}</p>
                <p className="text-xs text-[#6d7175]">{p.price}</p>
              </div>
              {p.sel && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-black grid place-items-center">
                  <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6.5L5 9L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-[#6d7175]">3 products selected · Combined retail value: $94.00</span>
          <button className="text-xs px-3 py-1.5 rounded-lg bg-black text-white">Create Bundle →</button>
        </div>
      </Section>
    </div>
  );
}

function FramePricing({ answers, onChange }: FrameProps) {
  return (
    <div className="grid grid-cols-[1fr_280px] gap-6">
      <div>
        <Question label="Experience Fee (10%)" helper="This covers the digital unwrapping, AI parsing, and tracking.">
          <TilePicker
            mode="single"
            value={answers.feeHandling}
            onChange={(v) => onChange({ feeHandling: v as string })}
            columns={2}
            options={[
              { id: 'pass', title: 'Pass to Gifter', description: '10% added at checkout. Your margin stays intact.', badge: 'Recommended for DTC' },
              { id: 'absorb', title: 'Absorb in Margin', description: 'Cleaner pricing for buyers. 10% deducted from revenue.' },
            ]}
          />
          <div className="mt-3 flex items-center gap-3 p-3 rounded-lg border border-[#e1e3e5]">
            <input type="checkbox" className="accent-black" />
            <div>
              <p className="text-sm font-medium">Split 50/50</p>
              <p className="text-xs text-[#6d7175]">5% to gifter, 5% from margin</p>
            </div>
          </div>
        </Question>

        <Section title="Volume Discounts" description="Incentivize larger orders with automatic discounts">
          <Toggle
            checked={answers.enableVolumeDiscounts ?? false}
            onChange={(v) => onChange({ enableVolumeDiscounts: v })}
            label="Enable volume discounts"
            helper="Automatically apply discounts based on order size"
          />
          <div className="mt-3 space-y-2">
            {[
              ['25', '5'],
              ['50', '10'],
              ['100', '15'],
            ].map(([gifts, off]) => (
              <div key={gifts} className="flex items-center gap-2 text-sm">
                <input defaultValue={gifts} className="w-16 px-2 py-1.5 rounded border border-[#e1e3e5]" />
                <span className="text-[#6d7175]">+ gifts =</span>
                <input defaultValue={off} className="w-16 px-2 py-1.5 rounded border border-[#e1e3e5]" />
                <span className="text-[#6d7175]">% off</span>
                <button className="text-[#6d7175] ml-1">×</button>
              </div>
            ))}
            <button className="text-xs text-blue-600 mt-1">+ Add tier</button>
          </div>
        </Section>
      </div>

      {/* Side calculator — only shown on this frame */}
      <div className="bg-[#1a1a1a] text-white rounded-xl p-5 h-fit sticky top-6">
        <p className="text-xs uppercase tracking-wide text-[#a8a8a8] mb-4">Example order (50 gifts)</p>
        <div className="space-y-2.5 text-sm">
          <Row label="Holiday Wellness Bundle × 50" value="$4,450.00" />
          <Row label="Volume discount (10%)" value="−$445.00" valueClass="text-emerald-400" />
          <Row label="Subtotal" value="$4,005.00" />
          <Row label="Experience fee (10%)" value="$400.50" />
          <div className="pt-2.5 mt-2.5 border-t border-[#333]">
            <div className="flex justify-between font-semibold">
              <span>Gifter pays</span>
              <span>$4,405.50</span>
            </div>
          </div>
        </div>
        <div className="mt-5 pt-5 border-t border-[#333]">
          <p className="text-xs text-[#a8a8a8]">Your revenue</p>
          <p className="text-2xl font-semibold text-emerald-400 mt-1">$4,005.00</p>
          <p className="text-xs text-[#a8a8a8] mt-1">Margin intact — fee passed to gifter</p>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, valueClass = '' }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-[#a8a8a8]">{label}</span>
      <span className={valueClass || 'text-white'}>{value}</span>
    </div>
  );
}

function FrameBranding(_: FrameProps) {
  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-6 border-b border-[#e1e3e5] mb-6">
        {['Basics', 'Backgrounds', 'Effects', 'Themes'].map((t, i) => (
          <button
            key={t}
            className={`pb-3 text-sm border-b-2 -mb-px ${
              i === 0 ? 'border-black font-semibold' : 'border-transparent text-[#6d7175]'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <Section title="Brand Identity" description="We pulled these from your Shopify theme — adjust as needed.">
        <div className="grid grid-cols-2 gap-4">
          <TextInput label="Brand Name" value="Acme Store" />
          <div>
            <label className="text-sm font-medium block mb-1.5">Logo</label>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#f6f6f7] border border-[#e1e3e5]" />
              <button className="text-xs px-3 py-1.5 rounded-lg border border-[#e1e3e5]">Change</button>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Brand Colors">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-[#6d7175] mb-2">Primary</p>
            <div className="flex gap-2">
              {['#5B6CFF', '#E04F4F', '#3FB950', '#F0883E', '#A371F7', 'gradient'].map((c, i) => (
                <div
                  key={i}
                  className={`w-7 h-7 rounded-full border ${i === 0 ? 'ring-2 ring-offset-1 ring-black' : 'border-[#e1e3e5]'}`}
                  style={{ background: c === 'gradient' ? 'conic-gradient(from 0deg, red, yellow, green, cyan, blue, magenta, red)' : c }}
                />
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs text-[#6d7175] mb-2">Secondary</p>
            <div className="flex gap-2">
              {['#1a1a1a', '#7B2FBE', '#1F3A5F', '#0D9488', '#A371F7', 'gradient'].map((c, i) => (
                <div
                  key={i}
                  className={`w-7 h-7 rounded-full border ${i === 1 ? 'ring-2 ring-offset-1 ring-black' : 'border-[#e1e3e5]'}`}
                  style={{ background: c === 'gradient' ? 'conic-gradient(from 0deg, red, yellow, green, cyan, blue, magenta, red)' : c }}
                />
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Background" description="Choose from our library, upload your own, or generate with AI.">
        <div className="flex gap-1 p-1 bg-[#f6f6f7] rounded-lg w-fit mb-3">
          {['Library', 'Upload', 'AI Generate'].map((t, i) => (
            <button
              key={t}
              className={`text-xs px-3 py-1.5 rounded ${i === 0 ? 'bg-white shadow-sm' : 'text-[#6d7175]'}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-6 gap-3">
          {['linear-gradient(180deg, #1F3A5F, #0F1A2E)', '#FFE9A0', '#FFC9D5', '#A8E5C5', '#DCDCFF', '#1a1a1a'].map((bg, i) => (
            <div
              key={i}
              className={`aspect-[3/4] rounded-lg ${i === 0 ? 'ring-2 ring-black' : 'border border-[#e1e3e5]'}`}
              style={{ background: bg }}
            />
          ))}
        </div>
        <button className="mt-3 text-xs text-blue-600">Preview gift page →</button>
      </Section>
    </div>
  );
}

function FrameIntegrations(_: FrameProps) {
  const integrations = [
    { name: 'Klaviyo', desc: 'Sync recipients to Klaviyo lists', status: 'connected' },
    { name: 'Mailchimp', desc: 'Sync user contact info', status: null },
    { name: 'Omnisend', desc: 'Sync user contact info', status: null },
    { name: 'Postscript', desc: 'SMS for gift recipients', status: null },
  ];
  return (
    <div>
      <Section title="Email Marketing" description="Sync gift recipient data to your email platform.">
        <div className="space-y-2">
          {integrations.map((i) => (
            <div key={i.name} className="flex items-center justify-between py-3 px-3 border border-[#e1e3e5] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#f6f6f7] grid place-items-center text-sm font-semibold">
                  {i.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium">{i.name}</p>
                  {i.status === 'connected' ? (
                    <p className="text-xs text-emerald-600">✓ Connected</p>
                  ) : (
                    <p className="text-xs text-[#6d7175]">{i.desc}</p>
                  )}
                </div>
              </div>
              <button
                className={`text-xs px-3 py-1.5 rounded-lg ${
                  i.status === 'connected'
                    ? 'bg-[#e3f1df] text-[#0a5132]'
                    : 'bg-black text-white'
                }`}
              >
                {i.status === 'connected' ? 'Configure →' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function FrameOptIn({ answers, onChange }: FrameProps) {
  return (
    <div>
      <Section title="Opt-In Settings">
        <Toggle
          checked={answers.enableMarketingOptIn ?? false}
          onChange={(v) => onChange({ enableMarketingOptIn: v })}
          label="Enable marketing opt-in"
          helper="Show opt-in checkbox during gift claim"
        />
        <div className="mt-4">
          <p className="text-sm font-medium mb-2">Where to show opt-in</p>
          <TilePicker
            mode="multi"
            value={answers.optInPlacements}
            onChange={(v) => onChange({ optInPlacements: v as string[] })}
            columns={2}
            options={[
              { id: 'claim', title: 'Claim Form', description: 'When entering shipping address' },
              { id: 'unwrap', title: 'Unwrapping Page', description: 'After revealing the gift' },
            ]}
          />
        </div>
        <div className="mt-4">
          <TextInput
            label="Opt-in checkbox text"
            value="Keep me updated on exclusive offers and new products"
            helper="Keep it short and clear about what they're signing up for."
          />
        </div>
      </Section>

      <Section title="Compliance">
        <Toggle checked={false} onChange={() => {}} label="Pre-check the box" helper="Checkbox starts checked (not recommended for EU)" />
        <Toggle
          checked={answers.enableDoubleOptIn ?? false}
          onChange={(v) => onChange({ enableDoubleOptIn: v })}
          label="Enable double opt-in for EU"
          helper="Auto-detect EU recipients and require email confirmation"
        />
        <div className="mt-3">
          <TextInput label="Privacy policy URL" value="https://acmestore.com/privacy" />
        </div>
      </Section>

      <Section title="What happens on opt-in">
        <Toggle
          checked={answers.addToKlaviyo ?? false}
          onChange={(v) => onChange({ addToKlaviyo: v })}
          label="Add to Klaviyo list"
          helper="List: Gift Recipients"
        />
        <Toggle
          checked={answers.applyTags ?? false}
          onChange={(v) => onChange({ applyTags: v })}
          label="Apply tags"
          helper="Tags: gift_recipient, opted_in, source:giftwell"
        />
        <Toggle
          checked={answers.triggerWelcome ?? false}
          onChange={(v) => onChange({ triggerWelcome: v })}
          label="Trigger welcome flow"
          helper='Start "Gift Recipient Welcome" flow in Klaviyo'
        />
      </Section>
    </div>
  );
}

function FrameLanding({ answers, onChange }: FrameProps) {
  return (
    <div>
      <Section title="Public URL" description="Where corporate gifters land to start an order.">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-[#6d7175]">acmestore.com/</span>
          <input
            defaultValue="gift"
            className="text-sm px-3 py-2 rounded-lg border border-[#e1e3e5] bg-white flex-1 focus:outline-none focus:border-black"
          />
        </div>
        <a className="text-xs text-blue-600">Preview landing page →</a>
      </Section>

      <Section title="Storefront placement">
        <Toggle
          checked={answers.addToNav ?? false}
          onChange={(v) => onChange({ addToNav: v })}
          label="Add to main navigation"
          helper='Adds a "Corporate Gifting" link to your storefront nav'
        />
        <Toggle
          checked={answers.addToFooter ?? false}
          onChange={(v) => onChange({ addToFooter: v })}
          label="Add to footer"
          helper="Adds a link in the footer next to About, Contact, etc."
        />
      </Section>
    </div>
  );
}

function FrameSupport({ answers, onChange }: FrameProps) {
  return (
    <div>
      <Section title="Giftwell Concierge" description="Our team handles support questions from gifters and recipients on your behalf.">
        <Toggle
          checked={answers.enableConcierge ?? false}
          onChange={(v) => onChange({ enableConcierge: v })}
          label="Enable concierge support"
          helper="Recipients with shipping or claim issues are routed to support@giftwell.io. Included in your plan."
        />
      </Section>
    </div>
  );
}

function FrameReview(_: FrameProps) {
  const items = [
    { title: 'Catalog configured', desc: '3 gift bundles created' },
    { title: 'Pricing & fees', desc: '10% fee passed to gifter, volume discounts enabled' },
    { title: 'Branding', desc: 'Logo, colors, background, sparkle effects' },
    { title: 'Klaviyo connected', desc: 'Recipients sync to "Gift Recipients" list' },
    { title: 'Marketing opt-in', desc: 'Enabled on claim form, double opt-in for EU' },
    { title: 'Landing page', desc: 'acmestore.com/gift — added to nav & footer' },
    { title: 'Support', desc: 'Giftwell concierge enabled' },
  ];

  return (
    <div>
      <div className="space-y-2 mb-6">
        {items.map((i) => (
          <div key={i.title} className="flex items-start gap-3 py-3 px-4 rounded-lg border border-[#e1e3e5] bg-[#fafbf9]">
            <div className="w-5 h-5 rounded-full bg-emerald-500 grid place-items-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6.5L5 9L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">{i.title}</p>
              <p className="text-xs text-[#6d7175]">{i.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <p className="text-sm font-semibold mb-3">Test the experience</p>
        <div className="flex gap-2">
          <button className="text-xs px-3 py-2 rounded-lg border border-[#e1e3e5] bg-white">Preview gift page</button>
          <button className="text-xs px-3 py-2 rounded-lg border border-[#e1e3e5] bg-white">Send test gift</button>
          <button className="text-xs px-3 py-2 rounded-lg border border-[#e1e3e5] bg-white">Preview recipient email</button>
        </div>
      </div>
    </div>
  );
}

function FrameLaunched(_: FrameProps) {
  return (
    <div className="text-center py-6">
      <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-black grid place-items-center">
        <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none">
          <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h3 className="text-2xl font-semibold mb-2">You&apos;re live</h3>
      <p className="text-[#6d7175] mb-5 max-w-md mx-auto">
        Your corporate gifting page is ready to receive orders. Share the link with buyers or wait for organic discovery.
      </p>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#f6f6f7] border border-[#e1e3e5] mb-6">
        <span className="text-sm font-mono">acmestore.com/gift</span>
        <button className="text-xs text-blue-600">Copy</button>
      </div>
      <div className="flex gap-2 justify-center mb-8">
        <button className="text-sm px-4 py-2 rounded-lg bg-black text-white">Open Gift Page →</button>
        <button className="text-sm px-4 py-2 rounded-lg border border-[#e1e3e5] bg-white">Go to Dashboard</button>
      </div>
      <div className="grid grid-cols-3 gap-3 max-w-2xl mx-auto text-left">
        {[
          { title: 'Book a strategy call', desc: '30 min with our team to optimize your setup', cta: 'Schedule →' },
          { title: 'Download Ads Playbook', desc: 'Ready-to-run Google campaigns for corporate buyers', cta: 'Download →' },
          { title: 'Join Slack community', desc: 'Connect with other merchants using Giftwell', cta: 'Join →' },
        ].map((c) => (
          <div key={c.title} className="p-4 rounded-lg border border-[#e1e3e5]">
            <p className="text-sm font-medium mb-1">{c.title}</p>
            <p className="text-xs text-[#6d7175] mb-3">{c.desc}</p>
            <a className="text-xs text-blue-600">{c.cta}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export const Frames: Record<typeof FRAMES[number]['id'], (p: FrameProps) => ReactNode> = {
  welcome: FrameWelcome,
  catalog: FrameCatalog,
  pricing: FramePricing,
  branding: FrameBranding,
  integrations: FrameIntegrations,
  optin: FrameOptIn,
  landing: FrameLanding,
  support: FrameSupport,
  review: FrameReview,
  launched: FrameLaunched,
};

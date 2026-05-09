'use client';

import { useState, ReactNode } from 'react';
import { Frames, FRAMES, type FrameAnswers } from './frames';

export default function AdminPreviewPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<FrameAnswers>({
    goals: ['revenue', 'customers'],
    buyerStatus: 'waiting',
    volume: '50-200',
    catalogApproach: 'curated',
    feeHandling: 'pass',
    optInPlacements: ['claim', 'unwrap'],
    enableMarketingOptIn: true,
    enableDoubleOptIn: true,
    addToKlaviyo: true,
    applyTags: true,
    triggerWelcome: true,
    enableVolumeDiscounts: true,
    enableConcierge: true,
    addToNav: true,
    addToFooter: true,
  });

  const Frame = Frames[FRAMES[step].id];

  return (
    <div className="min-h-screen bg-[#f1f1f1] font-sans text-[#1a1a1a]" style={{ fontFamily: 'Inter, -apple-system, system-ui, sans-serif' }}>
      <ShopifyChrome />

      <main className="max-w-[1100px] mx-auto px-6 py-6">
        {/* Frame switcher (preview-only — not part of the real component) */}
        <div className="mb-6 flex flex-wrap gap-2 items-center">
          <span className="text-xs uppercase tracking-wide text-[#6d7175] mr-2">Preview frame:</span>
          {FRAMES.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setStep(i)}
              className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                i === step
                  ? 'bg-black text-white border-black'
                  : 'bg-white text-[#1a1a1a] border-[#e1e3e5] hover:bg-[#f6f6f7]'
              }`}
            >
              {i + 1}. {f.label}
            </button>
          ))}
        </div>

        {/* Onboarding Card */}
        <Card>
          <ProgressDots total={FRAMES.length} current={step} />

          <div className="mt-6 mb-7">
            <p className="text-xs text-[#6d7175] mb-2 uppercase tracking-wide">
              Step {step + 1} of {FRAMES.length} — {FRAMES[step].label}
            </p>
            <h2 className="text-2xl font-semibold mb-2">{FRAMES[step].title}</h2>
            {FRAMES[step].subtitle && (
              <p className="text-[#6d7175]">{FRAMES[step].subtitle}</p>
            )}
          </div>

          <Frame
            answers={answers}
            onChange={(patch) => setAnswers((a) => ({ ...a, ...patch }))}
          />

          {FRAMES[step].id !== 'launched' && (
            <div className="mt-8 pt-5 border-t border-[#e1e3e5] flex items-center justify-between">
              <button className="text-sm text-[#6d7175] hover:text-[#1a1a1a]">
                Skip setup
              </button>
              <div className="flex gap-2">
                {step > 0 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="text-sm px-3.5 py-2 rounded-lg border border-[#e1e3e5] bg-white hover:bg-[#f6f6f7]"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={() => setStep(Math.min(step + 1, FRAMES.length - 1))}
                  className="text-sm px-3.5 py-2 rounded-lg bg-black text-white hover:bg-[#1a1a1a]"
                >
                  {FRAMES[step].id === 'review' ? 'Launch gift page' : 'Continue'}
                </button>
              </div>
            </div>
          )}
        </Card>

        {/* Faux dashboard below to show the card lives alongside the rest of the app */}
        <FauxDashboard />
      </main>
    </div>
  );
}

function ShopifyChrome() {
  return (
    <header className="bg-[#1a1a1a] text-white text-sm">
      <div className="max-w-[1100px] mx-auto px-6 h-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-[#7B2FBE] to-[#E040A0] grid place-items-center text-xs">
            G
          </div>
          <span className="text-[13px] text-[#e3e3e3]">Giftwell</span>
        </div>
        <div className="flex items-center gap-3 text-[12px] text-[#a8a8a8]">
          <span>Shopify admin</span>
        </div>
      </div>
    </header>
  );
}

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-[#e1e3e5] p-8 shadow-sm">
      {children}
    </div>
  );
}

function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1 flex-1 rounded-full ${
            i <= current ? 'bg-black' : 'bg-[#e1e3e5]'
          }`}
        />
      ))}
    </div>
  );
}

function FauxDashboard() {
  return (
    <div className="mt-8">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-semibold">Analytics</h2>
          <p className="text-sm text-[#6d7175]">Last 30 days · May 9 – Jun 8</p>
        </div>
        <div className="flex gap-2">
          <button className="text-xs px-3 py-1.5 rounded-lg border border-[#e1e3e5] bg-white">Last 30 days ▾</button>
          <button className="text-xs px-3 py-1.5 rounded-lg border border-[#e1e3e5] bg-white">Compare to ▾</button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {['Gifts sent', 'Recipients claimed', 'Opt-in rate', 'Revenue'].map((label) => (
          <div key={label} className="bg-white rounded-xl border border-[#e1e3e5] p-4">
            <p className="text-xs text-[#6d7175] mb-1">{label}</p>
            <p className="text-2xl font-semibold text-[#c9cccf]">—</p>
            <p className="text-xs text-[#6d7175] mt-2">No data yet</p>
          </div>
        ))}
      </div>
    </div>
  );
}

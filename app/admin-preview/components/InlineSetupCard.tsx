'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Frames, FRAMES, type FrameAnswers } from '../frames';

const DEFAULT_ANSWERS: FrameAnswers = {
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
};

export function InlineSetupCard({ onComplete }: { onComplete?: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<FrameAnswers>(DEFAULT_ANSWERS);

  const frame = FRAMES[step];
  const Frame = Frames[frame.id];
  const isLast = step === FRAMES.length - 1;
  const isReview = frame.id === 'review';
  const progressPct = ((step + 1) / FRAMES.length) * 100;

  const next = () => {
    if (isLast) {
      onComplete?.();
      return;
    }
    setStep((s) => Math.min(s + 1, FRAMES.length - 1));
  };

  return (
    <div className="setup-card">
      <div className="setup-illustration">
        <div className="setup-icon-block">
          <Image
            src="/g-white-bold.png"
            alt=""
            width={64}
            height={64}
            aria-hidden
          />
        </div>
      </div>
      <div className="setup-body">
        <div className="setup-eyebrow">
          {frame.phase} · Step {step + 1} of {FRAMES.length}
        </div>
        <div className="setup-dots" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={FRAMES.length}>
          {FRAMES.map((_, i) => (
            <span
              key={i}
              className={`setup-dot ${i <= step ? 'setup-dot-active' : ''}`}
            />
          ))}
        </div>
        <h2 className="setup-title">{frame.title}</h2>
        {frame.helper && <p className="setup-helper">{frame.helper}</p>}

        <div className="setup-frame">
          <Frame
            answers={answers}
            onChange={(patch) => setAnswers((a) => ({ ...a, ...patch }))}
          />
        </div>

        <div className="setup-actions">
          <div className="setup-actions-left">
            <button className="setup-link" onClick={onComplete}>
              Skip setup
            </button>
            <select
              className="setup-jump"
              value={step}
              onChange={(e) => setStep(Number(e.target.value))}
              aria-label="Jump to frame (preview)"
            >
              {FRAMES.map((f, i) => (
                <option key={f.id} value={i}>
                  {i + 1}. {f.title.length > 36 ? f.title.slice(0, 34) + '…' : f.title}
                </option>
              ))}
            </select>
          </div>
          <div className="setup-actions-right">
            {step > 0 && (
              <button
                className="setup-btn setup-btn-outline"
                onClick={() => setStep((s) => Math.max(s - 1, 0))}
              >
                Back
              </button>
            )}
            <button className="setup-btn setup-btn-primary" onClick={next}>
              {isReview ? 'Launch gift page' : isLast ? 'Done' : 'Continue'}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .setup-card {
          background: #fff;
          border: 1px solid #dcdcde;
          border-radius: 14px;
          padding: 26px 28px;
          display: flex;
          gap: 28px;
          align-items: flex-start;
          box-shadow: 0 1px 2px rgba(15, 15, 25, 0.03);
        }
        .setup-illustration {
          flex-shrink: 0;
          width: 80px;
          padding-top: 4px;
        }
        .setup-icon-block {
          width: 80px;
          height: 80px;
          background: linear-gradient(140deg, #7C5CFF 0%, #A855F7 100%);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            inset 0 -2px 0 rgba(15, 15, 25, 0.06),
            0 6px 18px -8px rgba(124, 92, 255, 0.4);
        }
        .setup-icon-block :global(img) {
          object-fit: contain;
          width: 60%;
          height: auto;
        }
        .setup-body {
          flex: 1;
          min-width: 0;
        }
        .setup-eyebrow {
          font-size: 12.5px;
          font-weight: 500;
          color: #5c4dff;
          margin-bottom: 8px;
          text-transform: capitalize;
        }
        .setup-dots {
          display: flex;
          gap: 3px;
          margin-bottom: 14px;
        }
        .setup-dot {
          flex: 1;
          height: 3px;
          border-radius: 2px;
          background: #ececef;
          max-width: 32px;
          transition: background 160ms ease;
        }
        .setup-dot-active {
          background: #111;
        }
        .setup-title {
          font-size: 22px;
          font-weight: 700;
          line-height: 1.25;
          color: #111;
          margin: 0 0 6px;
          letter-spacing: -0.01em;
        }
        .setup-helper {
          font-size: 14px;
          line-height: 1.5;
          color: #6b6b73;
          margin: 0 0 16px;
        }
        .setup-frame {
          margin: 16px 0 20px;
        }
        .setup-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding-top: 16px;
          border-top: 1px solid #f1f1f3;
        }
        .setup-actions-left {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
          min-width: 0;
        }
        .setup-actions-right {
          display: flex;
          gap: 8px;
        }
        .setup-link {
          background: transparent;
          border: none;
          color: #5c4dff;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          padding: 6px 4px;
        }
        .setup-link:hover { text-decoration: underline; }
        .setup-jump {
          font-size: 11.5px;
          color: #8a8a93;
          background: #f5f5f7;
          border: 1px solid #ececef;
          border-radius: 6px;
          padding: 4px 6px;
          max-width: 240px;
          cursor: pointer;
        }
        .setup-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 16px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          border: 1px solid transparent;
          transition: background 120ms ease;
        }
        .setup-btn-outline {
          background: #fff;
          border-color: #d6d6db;
          color: #111;
        }
        .setup-btn-outline:hover { background: #f5f5f7; }
        .setup-btn-primary {
          background: #111;
          color: #fff;
        }
        .setup-btn-primary:hover { background: #2a2a30; }

        @media (max-width: 640px) {
          .setup-card { flex-direction: column; gap: 16px; padding: 20px; }
          .setup-illustration { padding-top: 0; width: 80px; }
          .setup-icon-block { width: 80px; height: 80px; border-radius: 14px; }
          .setup-actions { flex-direction: column; align-items: stretch; }
          .setup-actions-right { justify-content: flex-end; }
        }
      `}</style>
    </div>
  );
}

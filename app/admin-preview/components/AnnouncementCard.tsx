'use client';

import Image from 'next/image';
import { useState } from 'react';

type Slide = {
  eyebrow: string;
  title: string;
  body: string;
  illustration: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

const SLIDES: Slide[] = [
  {
    eyebrow: 'Introducing AI recipient parsing',
    title: 'Paste any list. We handle the rest.',
    body:
      "Messy names and addresses get cleaned automatically. Anything we can't resolve routes into the claim flow — no more loading screens or row-by-row error fixes.",
    illustration: '/g-gradient.png',
    primaryLabel: 'View Recipients',
    primaryHref: '/admin-preview/recipients',
    secondaryLabel: 'Learn more',
    secondaryHref: '#',
  },
  {
    eyebrow: 'New: failed-order banner',
    title: 'Catch payment issues before they hurt revenue',
    body:
      "When a payment method is missing and orders fail, we surface a top-of-page banner so you can fix it in seconds.",
    illustration: '/g-gradient.png',
    primaryLabel: 'See orders',
    primaryHref: '/admin-preview/orders',
    secondaryLabel: 'Learn more',
    secondaryHref: '#',
  },
  {
    eyebrow: 'Tip: customize without rerunning setup',
    title: 'Iterate on the gift experience anytime',
    body:
      "Email templates, brand colors, backgrounds, and unwrap effects all live on the Customize page. Tweak them per campaign without going back through onboarding.",
    illustration: '/g-gradient.png',
    primaryLabel: 'Open Customize',
    primaryHref: '/admin-preview/customize',
    secondaryLabel: 'Learn more',
    secondaryHref: '#',
  },
];

export function AnnouncementCard() {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];

  return (
    <div className="ann-card">
      <div className="ann-illustration">
        <Image
          src={slide.illustration}
          alt=""
          width={120}
          height={120}
          aria-hidden
        />
      </div>
      <div className="ann-body">
        <div className="ann-eyebrow">{slide.eyebrow}</div>
        <div className="ann-dots" role="tablist" aria-label="Announcements">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}`}
              className={`ann-dot ${i === index ? 'ann-dot-active' : ''}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <h2 className="ann-title">{slide.title}</h2>
        <p className="ann-text">{slide.body}</p>
        <div className="ann-actions">
          {slide.secondaryLabel && (
            <a className="ann-btn ann-btn-outline" href={slide.secondaryHref}>
              {/* external arrow */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
              {slide.secondaryLabel}
            </a>
          )}
          <a className="ann-btn ann-btn-primary" href={slide.primaryHref}>
            {slide.primaryLabel}
          </a>
        </div>
      </div>

      <style jsx>{`
        .ann-card {
          background: #fff;
          border-radius: 14px;
          padding: 26px 28px;
          display: flex;
          gap: 28px;
          align-items: flex-start;
          box-shadow: 0 1px 0 rgba(15, 15, 25, 0.04);
          border: 1px solid #ececef;
        }
        .ann-illustration {
          flex-shrink: 0;
          width: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ann-illustration :global(img) {
          object-fit: contain;
          max-width: 100%;
          height: auto;
        }
        .ann-body {
          flex: 1;
          min-width: 0;
        }
        .ann-eyebrow {
          font-size: 13px;
          font-weight: 500;
          color: #5c4dff;
          margin-bottom: 8px;
        }
        .ann-dots {
          display: flex;
          gap: 6px;
          margin-bottom: 12px;
        }
        .ann-dot {
          width: 36px;
          height: 4px;
          border-radius: 2px;
          background: #ececef;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: background 160ms ease;
        }
        .ann-dot-active {
          background: #111;
        }
        .ann-title {
          font-size: 22px;
          font-weight: 700;
          line-height: 1.25;
          color: #111;
          margin: 0 0 8px;
        }
        .ann-text {
          font-size: 14px;
          line-height: 1.55;
          color: #43434b;
          margin: 0 0 18px;
          max-width: 560px;
        }
        .ann-actions {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
        }
        .ann-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 9px 16px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          transition: background 120ms ease, border-color 120ms ease;
          border: 1px solid transparent;
        }
        .ann-btn-outline {
          background: #fff;
          border-color: #d6d6db;
          color: #111;
        }
        .ann-btn-outline:hover {
          background: #f5f5f7;
        }
        .ann-btn-primary {
          background: #111;
          color: #fff;
        }
        .ann-btn-primary:hover {
          background: #2a2a30;
        }

        @media (max-width: 640px) {
          .ann-card {
            flex-direction: column;
            gap: 16px;
            padding: 20px;
          }
          .ann-illustration {
            width: 80px;
          }
          .ann-actions {
            justify-content: stretch;
          }
          .ann-btn {
            flex: 1;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}

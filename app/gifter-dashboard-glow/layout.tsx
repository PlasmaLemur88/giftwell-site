'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GIFTER } from '@/app/gifter-dashboard/data';

const NAV = [
  { href: '/gifter-dashboard-glow',        label: 'Home' },
  { href: '/gifter-dashboard-glow/orders', label: 'Orders' },
  { href: '/gifter-dashboard-glow/people', label: 'People' },
  { href: '/gifter-dashboard-glow/help',   label: 'Help' },
];

export default function GifterDashboardGlowLayout({ children }: { children: ReactNode }) {
  const initials = GIFTER.fullName.split(' ').map((n) => n[0]).join('');

  return (
    <div className="gdg-shell">
      {/* Ambient purple bloom */}
      <div className="gdg-glow" aria-hidden />

      <div className="gdg-notice">
        Preview of the Giftwell gifter dashboard . hosted on <strong>account.giftwell.io</strong> in production
      </div>

      {/* Top nav */}
      <header className="gdg-nav">
        <div className="gdg-nav-inner">
          <Link href="/gifter-dashboard-glow" className="gdg-logo">
            <span className="gdg-logo-mark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/g-white-bold.png" alt="" />
            </span>
            <span className="gdg-logo-word">Giftwell</span>
          </Link>

          <nav className="gdg-nav-links">
            {NAV.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </nav>

          <div className="gdg-nav-right">
            <Link href="/gifter-dashboard-glow/orders" className="gdg-create">
              <span aria-hidden>+</span> New gift
            </Link>
            <button className="gdg-icon-btn" aria-label="Help" type="button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </button>
            <button className="gdg-icon-btn" aria-label="Notifications" type="button">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="gdg-badge">3</span>
            </button>
            <Link href="/gifter-dashboard-glow/account" className="gdg-avatar" aria-label="Account">
              {initials}
            </Link>
          </div>
        </div>
      </header>

      <main className="gdg-main">
        <div className="gdg-main-inner">
          {children}
        </div>
      </main>

      {/* Chat FAB */}
      <button className="gdg-chat-fab" aria-label="Chat with support" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </button>

      {/* Mobile bottom nav */}
      <nav className="gdg-bottom-nav">
        {NAV.map((item) => (
          <BottomNavLink key={item.href} {...item} />
        ))}
      </nav>

      <style jsx global>{`
        body { background: #0A0A0C; margin: 0; }

        .gdg-shell {
          position: relative;
          font-family: var(--gdg-body);
          color: var(--gdg-text);
          min-height: 100vh;
          background: var(--gdg-bg);
          overflow-x: hidden;
        }

        /* Ambient purple bloom — top of page, fades to black */
        .gdg-glow {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 760px;
          pointer-events: none;
          z-index: 0;
          background:
            radial-gradient(ellipse 70% 90% at 28% -10%, rgba(124, 92, 255, 0.42), transparent 62%),
            radial-gradient(ellipse 60% 80% at 88% -20%, rgba(224, 86, 160, 0.28), transparent 60%),
            radial-gradient(ellipse 90% 70% at 50% 0%, rgba(92, 63, 224, 0.30), transparent 70%);
        }

        .gdg-notice {
          position: relative; z-index: 3;
          background: #000;
          color: rgba(255, 255, 255, 0.7);
          padding: 8px 16px; text-align: center;
          font-size: 12px; font-weight: 500; letter-spacing: 0.02em;
          border-bottom: 1px solid var(--gdg-hairline);
        }
        .gdg-notice strong { color: var(--gdg-text); font-weight: 600; }

        /* ─── Top nav ─── */
        .gdg-nav {
          position: sticky; top: 0; z-index: 40;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .gdg-nav-inner {
          max-width: 1180px; margin: 0 auto;
          display: flex; align-items: center; gap: 24px;
          padding: 16px 32px;
        }
        .gdg-logo {
          display: inline-flex; align-items: center; gap: 9px;
          text-decoration: none;
        }
        .gdg-logo-mark {
          width: 32px; height: 32px;
          border-radius: 9px;
          background: linear-gradient(135deg, var(--gdg-purple), var(--gdg-purple-deep));
          display: inline-flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 16px -4px rgba(124, 92, 255, 0.6);
        }
        .gdg-logo-mark img { width: 19px; height: 19px; object-fit: contain; }
        .gdg-logo-word {
          font-family: var(--gdg-display);
          font-weight: 600; font-size: 21px;
          letter-spacing: -0.02em;
          color: var(--gdg-text);
        }

        .gdg-nav-links {
          display: flex; align-items: center; gap: 4px;
          margin-left: 8px;
        }
        .gdg-nav-link {
          padding: 8px 14px; border-radius: 999px;
          font-size: 14px; font-weight: 500;
          color: var(--gdg-text-soft); text-decoration: none;
          transition: color 140ms ease, background 140ms ease;
        }
        .gdg-nav-link:hover { color: var(--gdg-text); background: rgba(255, 255, 255, 0.05); }
        .gdg-nav-link-active {
          color: var(--gdg-text);
          background: var(--gdg-pill);
        }

        .gdg-nav-right {
          margin-left: auto;
          display: flex; align-items: center; gap: 10px;
        }
        .gdg-create {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 9px 18px; border-radius: 999px;
          font-size: 13.5px; font-weight: 600;
          color: var(--gdg-text); text-decoration: none;
          background: var(--gdg-pill);
          border: 1px solid var(--gdg-hairline);
          transition: background 140ms ease, transform 140ms ease;
        }
        .gdg-create:hover { background: var(--gdg-pill-hover); transform: translateY(-1px); }
        .gdg-create span { font-size: 16px; line-height: 0; }
        .gdg-icon-btn {
          all: unset; cursor: pointer;
          position: relative;
          width: 38px; height: 38px; border-radius: 999px;
          display: inline-flex; align-items: center; justify-content: center;
          color: var(--gdg-text-soft);
          background: var(--gdg-pill);
          border: 1px solid var(--gdg-hairline);
          transition: background 140ms ease, color 140ms ease;
        }
        .gdg-icon-btn:hover { background: var(--gdg-pill-hover); color: var(--gdg-text); }
        .gdg-icon-btn svg { width: 17px; height: 17px; }
        .gdg-badge {
          position: absolute; top: -3px; right: -3px;
          min-width: 17px; height: 17px; border-radius: 999px;
          background: #F2415A; color: #fff;
          font-size: 10px; font-weight: 700;
          display: inline-flex; align-items: center; justify-content: center;
          padding: 0 4px;
          border: 2px solid var(--gdg-bg);
        }
        .gdg-avatar {
          width: 38px; height: 38px; border-radius: 999px;
          background: linear-gradient(135deg, var(--gdg-purple), #E056A0);
          color: #fff; font-size: 13px; font-weight: 700;
          display: inline-flex; align-items: center; justify-content: center;
          text-decoration: none;
          letter-spacing: -0.01em;
          box-shadow: 0 4px 14px -4px rgba(124, 92, 255, 0.5);
        }

        /* ─── Main ─── */
        .gdg-main { position: relative; z-index: 1; }
        .gdg-main-inner {
          max-width: 1180px; margin: 0 auto;
          padding: 28px 32px 120px;
        }

        /* ─── Chat FAB ─── */
        .gdg-chat-fab {
          all: unset; cursor: pointer;
          position: fixed; bottom: 26px; right: 26px;
          width: 56px; height: 56px; border-radius: 50%;
          background: linear-gradient(135deg, var(--gdg-purple), var(--gdg-purple-deep));
          color: #fff;
          display: inline-flex; align-items: center; justify-content: center;
          box-shadow: 0 14px 32px -8px rgba(124, 92, 255, 0.7), 0 4px 12px rgba(0, 0, 0, 0.4);
          z-index: 50;
          transition: transform 160ms cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .gdg-chat-fab:hover { transform: translateY(-3px) scale(1.04); }
        .gdg-chat-fab svg { width: 23px; height: 23px; }

        /* ─── Mobile bottom nav ─── */
        .gdg-bottom-nav { display: none; }

        @media (max-width: 860px) {
          .gdg-nav-links { display: none; }
          .gdg-nav-inner { padding: 14px 18px; gap: 12px; }
          .gdg-create span { display: none; }
          .gdg-main-inner { padding: 22px 18px 110px; }
          .gdg-chat-fab { bottom: 86px; right: 16px; width: 50px; height: 50px; }
          .gdg-bottom-nav {
            display: flex;
            position: fixed; bottom: 14px; left: 14px; right: 14px;
            background: rgba(30, 30, 35, 0.92);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid var(--gdg-hairline);
            border-radius: 999px;
            padding: 6px;
            justify-content: space-around;
            z-index: 45;
            box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.6);
          }
          .gdg-bottom-nav-item {
            flex: 1;
            text-align: center;
            padding: 9px 4px; border-radius: 999px;
            color: var(--gdg-text-soft); text-decoration: none;
            font-size: 12px; font-weight: 600;
            transition: color 120ms ease, background 120ms ease;
          }
          .gdg-bottom-nav-item-active {
            background: var(--gdg-purple);
            color: #fff;
          }
        }
      `}</style>
    </div>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = href === '/gifter-dashboard-glow'
    ? pathname === href
    : pathname.startsWith(href);
  return (
    <Link href={href} className={`gdg-nav-link ${active ? 'gdg-nav-link-active' : ''}`}>
      {label}
    </Link>
  );
}

function BottomNavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = href === '/gifter-dashboard-glow'
    ? pathname === href
    : pathname.startsWith(href);
  return (
    <Link href={href} className={`gdg-bottom-nav-item ${active ? 'gdg-bottom-nav-item-active' : ''}`}>
      {label}
    </Link>
  );
}

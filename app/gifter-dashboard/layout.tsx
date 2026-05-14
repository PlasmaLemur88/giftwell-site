'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BRAND, BRAND_DARK, GIFTER } from './data';
import { RandomBackground, type BackgroundMode } from './components/RandomBackground';

const NAV = [
  { href: '/gifter-dashboard',                label: 'Home',         icon: HomeIcon },
  { href: '/gifter-dashboard/orders',         label: 'Orders',       icon: PackageIcon },
  { href: '/gifter-dashboard/people',         label: 'People',       icon: PeopleIcon },
  { href: '/gifter-dashboard/help',           label: 'Help',         icon: HelpIcon },
];

export default function GifterDashboardLayout({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<BackgroundMode>('dark');
  const isLight = mode === 'light';

  return (
    <div className="gd-shell" data-mode={mode}>
      <RandomBackground onModeChange={setMode} />

      {/* Top notice */}
      <div className="gd-notice">
        Preview of the Giftwell gifter dashboard . hosted on <strong>account.giftwell.io</strong> in production
      </div>

      <div className="gd-grid">
        {/* Desktop sidebar */}
        <aside className="gd-sidebar">
          <div className="gd-sidebar-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={isLight ? "/g-black-bold.png" : "/g-white-bold.png"} alt="" className="gd-mark" />
            <span className="gd-wordmark">Giftwell</span>
          </div>
          <nav className="gd-sidebar-nav">
            {NAV.map((item) => (
              <SidebarLink key={item.href} {...item} />
            ))}
          </nav>
          <div className="gd-sidebar-foot-wrap">
            <Link href="/gifter-dashboard/account" className="gd-sidebar-foot">
              <div className="gd-avatar">{GIFTER.fullName.split(' ').map((n) => n[0]).join('')}</div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div className="gd-user-name">{GIFTER.fullName}</div>
                <div className="gd-user-company">{GIFTER.company}</div>
              </div>
              <span aria-hidden style={{ color: '#8a8a93', fontSize: 16 }}>›</span>
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <main className="gd-main">
          <div className="gd-main-inner">
            {/* Mobile header */}
            <header className="gd-mobile-header">
              <div className="gd-sidebar-logo" style={{ padding: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={isLight ? "/g-black-bold.png" : "/g-white-bold.png"} alt="" className="gd-mark" />
                <span className="gd-wordmark">Giftwell</span>
              </div>
              <Link href="/gifter-dashboard/account" className="gd-avatar gd-avatar-sm" aria-label="Account">
                {GIFTER.fullName.split(' ').map((n) => n[0]).join('')}
              </Link>
            </header>

            {children}

            <footer className="gd-footer-sig">
              Crafted with <em>✦</em> by Giftwell
            </footer>
          </div>
        </main>
      </div>

      {/* Floating chat (placeholder for Intercom) */}
      <button className="gd-chat-fab" aria-label="Chat with support" type="button">
        <span className="gd-chat-fab-pulse" aria-hidden />
        <ChatIcon />
      </button>

      {/* Mobile bottom nav */}
      <nav className="gd-bottom-nav">
        {NAV.map((item) => (
          <BottomNavLink key={item.href} {...item} />
        ))}
      </nav>

      <style jsx global>{`
        body { background: #F6F2FA; margin: 0; }

        /* Adaptive text tokens — flip based on the active background mode.
           Pages reference these via var(--gd-text), var(--gd-text-shadow),
           var(--gd-text-muted) and re-resolve when the background swaps. */
        .gd-shell {
          position: relative;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #1a1a1f;
          min-height: 100vh;
          background-color: #F6F2FA;
          /* Dark-bg defaults: text-on-purple */
          --gd-text: #ffffff;
          --gd-text-muted: rgba(255, 255, 255, 0.92);
          --gd-text-shadow: 0 1px 2px rgba(20, 14, 50, 0.25);
          --gd-nav-pill-bg: rgba(255, 255, 255, 0.96);
          --gd-nav-pill-text: ${BRAND_DARK};
        }
        /* Light-bg override: text-on-white-or-grid */
        .gd-shell[data-mode="light"] {
          --gd-text: #1a1a1f;
          --gd-text-muted: rgba(26, 26, 31, 0.7);
          --gd-text-shadow: none;
          --gd-nav-pill-bg: #1a1a1f;
          --gd-nav-pill-text: #ffffff;
        }
        .gd-notice {
          background: #1a1a1f; color: #fff;
          padding: 8px 16px; text-align: center;
          font-size: 12px; font-weight: 500; letter-spacing: 0.02em;
        }
        .gd-grid {
          display: grid;
          grid-template-columns: 240px 1fr;
          min-height: calc(100vh - 30px);
        }

        /* ─── Sidebar (desktop only) ─── */
        .gd-sidebar {
          background: transparent;
          padding: 20px 12px 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .gd-sidebar-logo {
          display: flex; align-items: center; gap: 8px;
          padding: 4px 8px 8px;
        }
        .gd-mark {
          width: 28px; height: 28px;
          display: inline-block;
          object-fit: contain;
        }
        .gd-wordmark {
          font-size: 16px; font-weight: 700; letter-spacing: -0.005em;
          color: var(--gd-text);
        }

        .gd-sidebar-nav {
          display: flex; flex-direction: column; gap: 2px;
          flex: 1;
        }
        .gd-nav-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; border-radius: 10px;
          font-size: 14px; font-weight: 500;
          color: var(--gd-text); text-decoration: none;
          text-shadow: var(--gd-text-shadow);
          transition: background 160ms ease, color 160ms ease;
        }
        .gd-shell[data-mode="dark"]  .gd-nav-item:hover { background: rgba(255, 255, 255, 0.18); }
        .gd-shell[data-mode="light"] .gd-nav-item:hover { background: rgba(15, 15, 25, 0.06); }
        .gd-nav-item-active {
          background: var(--gd-nav-pill-bg);
          color: var(--gd-nav-pill-text);
          text-shadow: none;
          box-shadow: 0 4px 14px -6px rgba(20, 14, 50, 0.25);
        }
        .gd-nav-item-active:hover { background: var(--gd-nav-pill-bg); color: var(--gd-nav-pill-text); }
        .gd-nav-item svg { width: 18px; height: 18px; flex-shrink: 0; }

        .gd-sidebar-foot {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.65);
          border-radius: 12px;
          box-shadow: 0 4px 18px -6px rgba(20, 14, 50, 0.12);
          text-decoration: none; color: inherit;
          transition: background 120ms ease, transform 120ms ease;
        }
        .gd-sidebar-foot:hover { background: rgba(255, 255, 255, 0.95); transform: translateY(-1px); }
        .gd-avatar-sm { text-decoration: none; }
        .gd-avatar {
          width: 34px; height: 34px;
          background: linear-gradient(135deg, ${BRAND}, ${'#A78BFA'});
          color: #fff; border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 600; flex-shrink: 0;
          letter-spacing: -0.005em;
        }
        .gd-avatar-sm { width: 28px; height: 28px; font-size: 11.5px; }
        .gd-user-name {
          font-size: 13.5px; font-weight: 600;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .gd-user-company {
          font-size: 12px; color: #8a8a93;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        /* ─── Main content ─── */
        .gd-main { min-width: 0; padding: 36px 40px 88px; }
        .gd-main-inner { max-width: 1040px; margin: 0 auto; }

        /* ─── Mobile header (hidden on desktop) ─── */
        .gd-mobile-header { display: none; }

        /* ─── Bottom nav (hidden on desktop) ─── */
        .gd-bottom-nav { display: none; }

        @media (max-width: 900px) {
          .gd-grid { grid-template-columns: 1fr; }
          .gd-sidebar { display: none; }
          .gd-main { padding: 12px 16px 80px; }
          .gd-mobile-header {
            display: flex;
            justify-content: space-between; align-items: center;
            padding: 10px 0 18px;
          }
          .gd-bottom-nav {
            display: flex;
            position: fixed; bottom: 0; left: 0; right: 0;
            background: #fff; border-top: 1px solid #ececef;
            padding: 8px 8px max(8px, env(safe-area-inset-bottom));
            justify-content: space-around;
            z-index: 50;
          }
          .gd-bottom-nav-item {
            flex: 1;
            display: flex; flex-direction: column; align-items: center; gap: 4px;
            padding: 6px 4px; border-radius: 8px;
            color: #8a8a93; text-decoration: none;
            font-size: 11px; font-weight: 500;
            transition: color 120ms ease;
          }
          .gd-bottom-nav-item svg { width: 20px; height: 20px; }
          .gd-bottom-nav-item-active { color: ${BRAND}; }
        }

        /* ─── Floating chat (Intercom placeholder) ─── */
        .gd-chat-fab {
          all: unset; cursor: pointer;
          position: fixed; bottom: 24px; right: 24px;
          width: 56px; height: 56px; border-radius: 50%;
          background: linear-gradient(135deg, ${BRAND}, ${BRAND_DARK});
          color: #fff;
          display: inline-flex; align-items: center; justify-content: center;
          box-shadow: 0 12px 28px -8px rgba(124, 92, 255, 0.55), 0 4px 10px rgba(0, 0, 0, 0.1);
          z-index: 60;
          transition: transform 160ms cubic-bezier(0.22, 0.61, 0.36, 1), box-shadow 160ms ease;
        }
        .gd-chat-fab:hover {
          transform: translateY(-2px) scale(1.04);
          box-shadow: 0 16px 32px -10px rgba(124, 92, 255, 0.65), 0 4px 10px rgba(0, 0, 0, 0.12);
        }
        .gd-chat-fab :global(svg) { width: 22px; height: 22px; position: relative; z-index: 1; }
        .gd-chat-fab-pulse {
          position: absolute; inset: 0;
          border-radius: 50%;
          border: 2px solid rgba(124, 92, 255, 0.6);
          animation: gd-fab-pulse 2.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          pointer-events: none;
        }
        @keyframes gd-fab-pulse {
          0%   { transform: scale(1);   opacity: 0.8; }
          70%  { transform: scale(1.6); opacity: 0;   }
          100% { transform: scale(1.6); opacity: 0;   }
        }
        @media (max-width: 900px) {
          .gd-chat-fab { bottom: 78px; right: 16px; width: 50px; height: 50px; }
        }

        /* ─── Footer signature ─── */
        .gd-footer-sig {
          text-align: center;
          font-size: 12px;
          color: #5a5a62;
          padding: 32px 16px 16px;
          letter-spacing: 0.02em;
          opacity: 0.7;
        }
        .gd-footer-sig em {
          font-family: 'Georgia', serif;
          font-style: italic;
          color: ${BRAND_DARK};
          margin: 0 4px;
        }
      `}</style>
    </div>
  );
}

function SidebarLink({ href, label, icon: Icon }: typeof NAV[number]) {
  const pathname = usePathname();
  const active = href === '/gifter-dashboard'
    ? pathname === href
    : pathname.startsWith(href);
  return (
    <Link href={href} className={`gd-nav-item ${active ? 'gd-nav-item-active' : ''}`}>
      <Icon />
      {label}
    </Link>
  );
}

function BottomNavLink({ href, label, icon: Icon }: typeof NAV[number]) {
  const pathname = usePathname();
  const active = href === '/gifter-dashboard'
    ? pathname === href
    : pathname.startsWith(href);
  return (
    <Link href={href} className={`gd-bottom-nav-item ${active ? 'gd-bottom-nav-item-active' : ''}`}>
      <Icon />
      {label}
    </Link>
  );
}

/* ─── Icons ─── */

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2h-4v-7H10v7H6a2 2 0 0 1-2-2z" />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function PeopleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

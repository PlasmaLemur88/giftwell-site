'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GIFTER } from './data';

const NAV = [
  { href: '/gifter-dashboard',        label: 'Home',   icon: HomeIcon },
  { href: '/gifter-dashboard/orders', label: 'Orders', icon: PackageIcon },
  { href: '/gifter-dashboard/people', label: 'People', icon: PeopleIcon },
  { href: '/gifter-dashboard/help',   label: 'Help',   icon: HelpIcon },
];

export default function GifterDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="gd-shell">
      {/* Paper texture overlay */}
      <div className="gd-grain" aria-hidden />

      <div className="gd-notice">
        Preview of the Giftwell gifter dashboard . hosted on <strong>account.giftwell.io</strong> in production
      </div>

      <div className="gd-grid">
        {/* Desktop sidebar */}
        <aside className="gd-sidebar">
          <Link href="/gifter-dashboard" className="gd-sidebar-logo">
            <span className="gd-mark" aria-hidden>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/g-black-bold.png" alt="" />
            </span>
            <span className="gd-wordmark">Giftwell</span>
          </Link>
          <nav className="gd-sidebar-nav">
            {NAV.map((item) => (
              <SidebarLink key={item.href} {...item} />
            ))}
          </nav>
        </aside>

        {/* Top-right profile pill */}
        <Link href="/gifter-dashboard/account" className="gd-profile-tr" aria-label="Account">
          <div className="gd-profile-tr-meta">
            <div className="gd-profile-tr-name">{GIFTER.fullName}</div>
            <div className="gd-profile-tr-company">{GIFTER.company}</div>
          </div>
          <div className="gd-avatar">{GIFTER.fullName.split(' ').map((n) => n[0]).join('')}</div>
        </Link>

        {/* Main content */}
        <main className="gd-main">
          <div className="gd-main-inner">
            <header className="gd-mobile-header">
              <Link href="/gifter-dashboard" className="gd-sidebar-logo" style={{ padding: 0 }}>
                <span className="gd-mark" aria-hidden>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/g-black-bold.png" alt="" />
                </span>
                <span className="gd-wordmark">Giftwell</span>
              </Link>
              <Link href="/gifter-dashboard/account" className="gd-avatar gd-avatar-sm" aria-label="Account">
                {GIFTER.fullName.split(' ').map((n) => n[0]).join('')}
              </Link>
            </header>

            {children}
          </div>
        </main>
      </div>

      <button className="gd-chat-fab" aria-label="Chat with support" type="button">
        <ChatIcon />
      </button>

      <nav className="gd-bottom-nav">
        {NAV.map((item) => (
          <BottomNavLink key={item.href} {...item} />
        ))}
      </nav>

      <style jsx global>{`
        body { background: var(--gd-cream); margin: 0; }

        .gd-shell {
          position: relative;
          font-family: var(--gd-body);
          color: var(--gd-ink);
          min-height: 100vh;
          background: var(--gd-cream);
          overflow-x: hidden;
        }

        /* Paper grain — subtle texture so cream doesn't read as a flat fill */
        .gd-grain {
          position: fixed; inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.45;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.06  0 0 0 0 0.06  0 0 0 0 0.07  0 0 0 0.18 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
          mix-blend-mode: multiply;
        }

        /* Subtle blob accents on the corners so the cream isn't blank */
        .gd-shell::before {
          content: ''; position: fixed;
          top: -180px; right: -120px;
          width: 480px; height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--gd-peach) 0%, transparent 65%);
          opacity: 0.55;
          pointer-events: none;
          z-index: 0;
        }
        .gd-shell::after {
          content: ''; position: fixed;
          bottom: -220px; left: -180px;
          width: 520px; height: 520px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--gd-pink-soft) 0%, transparent 70%);
          opacity: 0.45;
          pointer-events: none;
          z-index: 0;
        }

        .gd-notice {
          position: relative; z-index: 2;
          background: var(--gd-ink); color: var(--gd-paper);
          padding: 8px 16px; text-align: center;
          font-size: 12px; font-weight: 500; letter-spacing: 0.02em;
        }
        .gd-grid {
          position: relative; z-index: 1;
          display: grid;
          grid-template-columns: 240px 1fr;
          min-height: calc(100vh - 30px);
        }

        /* ─── Sidebar ─── */
        .gd-sidebar {
          background: transparent;
          padding: 22px 14px 18px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .gd-sidebar-logo {
          display: flex; align-items: center; gap: 9px;
          padding: 4px 8px 8px;
          text-decoration: none; color: var(--gd-ink);
        }
        .gd-mark {
          width: 34px; height: 34px;
          border-radius: 10px;
          background: var(--gd-lime);
          border: var(--gd-border);
          box-shadow: var(--gd-sticker-sm);
          display: inline-flex; align-items: center; justify-content: center;
          transform: rotate(-4deg);
          flex-shrink: 0;
        }
        .gd-mark img {
          width: 20px; height: 20px;
          object-fit: contain;
          display: block;
        }
        .gd-wordmark {
          font-family: var(--gd-display);
          font-style: italic;
          font-size: 22px; font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--gd-ink);
        }

        .gd-sidebar-nav {
          display: flex; flex-direction: column; gap: 4px;
          flex: 1;
        }
        .gd-nav-item {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 14px;
          border-radius: 999px;
          font-size: 14px; font-weight: 500;
          color: var(--gd-ink); text-decoration: none;
          border: 1.5px solid transparent;
          transition: transform 140ms ease, background 140ms ease,
                      box-shadow 140ms ease, border-color 140ms ease;
        }
        .gd-nav-item:hover {
          background: var(--gd-paper);
          border-color: var(--gd-ink);
          box-shadow: var(--gd-sticker-sm);
          transform: translate(-1px, -1px);
        }
        .gd-nav-item-active {
          background: var(--gd-ink);
          color: var(--gd-cream);
          border-color: var(--gd-ink);
          box-shadow: var(--gd-sticker-sm);
        }
        .gd-nav-item-active:hover {
          background: var(--gd-ink);
          color: var(--gd-cream);
          transform: translate(-1px, -1px);
        }
        .gd-nav-item svg { width: 18px; height: 18px; flex-shrink: 0; }

        /* Avatar */
        .gd-avatar {
          width: 34px; height: 34px;
          background: var(--gd-pink);
          color: var(--gd-cream);
          border: var(--gd-border);
          border-radius: 50%;
          display: inline-flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 700; flex-shrink: 0;
          letter-spacing: -0.005em;
          font-family: var(--gd-body);
        }
        .gd-avatar-sm { width: 32px; height: 32px; font-size: 12px; text-decoration: none; }

        /* Top-right profile pill — desktop */
        .gd-profile-tr {
          position: fixed;
          top: 46px; right: 28px;
          display: inline-flex; align-items: center; gap: 12px;
          padding: 6px 8px 6px 14px;
          background: var(--gd-paper);
          border: var(--gd-border);
          border-radius: 999px;
          box-shadow: var(--gd-sticker-sm);
          text-decoration: none; color: inherit;
          z-index: 55;
          transition: transform 140ms ease, box-shadow 140ms ease;
        }
        .gd-profile-tr:hover {
          transform: translate(-2px, -2px);
          box-shadow: 5px 5px 0 var(--gd-ink);
        }
        .gd-profile-tr-meta { text-align: right; min-width: 0; }
        .gd-profile-tr-name {
          font-size: 13px; font-weight: 600; color: var(--gd-ink);
          white-space: nowrap;
        }
        .gd-profile-tr-company {
          font-size: 11.5px; color: var(--gd-ink-muted);
          white-space: nowrap; margin-top: 1px;
        }

        /* ─── Main content ─── */
        .gd-main { min-width: 0; padding: 36px 40px 96px; }
        .gd-main-inner { max-width: 1040px; margin: 0 auto; }

        .gd-mobile-header { display: none; }
        .gd-bottom-nav { display: none; }

        @media (max-width: 900px) {
          .gd-grid { grid-template-columns: 1fr; }
          .gd-sidebar { display: none; }
          .gd-profile-tr { display: none; }
          .gd-main { padding: 12px 18px 88px; }
          .gd-mobile-header {
            display: flex;
            justify-content: space-between; align-items: center;
            padding: 12px 0 22px;
          }
          .gd-bottom-nav {
            display: flex;
            position: fixed; bottom: 12px; left: 12px; right: 12px;
            background: var(--gd-paper);
            border: var(--gd-border); border-radius: 999px;
            padding: 6px;
            justify-content: space-around;
            box-shadow: var(--gd-sticker-sm);
            z-index: 50;
          }
          .gd-bottom-nav-item {
            flex: 1;
            display: flex; flex-direction: column; align-items: center; gap: 2px;
            padding: 6px 4px; border-radius: 999px;
            color: var(--gd-ink); text-decoration: none;
            font-size: 10.5px; font-weight: 600;
            transition: background 120ms ease;
          }
          .gd-bottom-nav-item svg { width: 19px; height: 19px; }
          .gd-bottom-nav-item-active {
            background: var(--gd-ink);
            color: var(--gd-cream);
          }
        }

        /* Floating chat */
        .gd-chat-fab {
          all: unset; cursor: pointer;
          position: fixed; bottom: 28px; right: 28px;
          width: 60px; height: 60px; border-radius: 50%;
          background: var(--gd-lime);
          color: var(--gd-ink);
          border: var(--gd-border);
          box-shadow: var(--gd-sticker);
          display: inline-flex; align-items: center; justify-content: center;
          z-index: 60;
          transition: transform 160ms cubic-bezier(0.22, 0.61, 0.36, 1),
                      box-shadow 160ms ease;
        }
        .gd-chat-fab:hover {
          transform: translate(-3px, -3px);
          box-shadow: 7px 7px 0 var(--gd-ink);
        }
        .gd-chat-fab :global(svg) { width: 24px; height: 24px; }
        @media (max-width: 900px) {
          .gd-chat-fab { bottom: 80px; right: 18px; width: 52px; height: 52px; }
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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BRAND, GIFTER } from './data';

const NAV = [
  { href: '/gifter-dashboard',                label: 'Home',         icon: HomeIcon },
  { href: '/gifter-dashboard/orders',         label: 'Orders',       icon: PackageIcon },
  { href: '/gifter-dashboard/address-book',   label: 'Address book', icon: PeopleIcon },
  { href: '/gifter-dashboard/help',           label: 'Help',         icon: HelpIcon },
];

export default function GifterDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="gd-shell">
      {/* Top notice */}
      <div className="gd-notice">
        Preview of the Giftwell gifter dashboard . hosted on <strong>account.giftwell.io</strong> in production
      </div>

      <div className="gd-grid">
        {/* Desktop sidebar */}
        <aside className="gd-sidebar">
          <div className="gd-sidebar-logo">
            <span className="gd-mark">G</span>
            <span className="gd-wordmark">Giftwell</span>
          </div>
          <nav className="gd-sidebar-nav">
            {NAV.map((item) => (
              <SidebarLink key={item.href} {...item} />
            ))}
          </nav>
          <div className="gd-sidebar-foot">
            <div className="gd-avatar">{GIFTER.fullName.split(' ').map((n) => n[0]).join('')}</div>
            <div style={{ minWidth: 0 }}>
              <div className="gd-user-name">{GIFTER.fullName}</div>
              <div className="gd-user-company">{GIFTER.company}</div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="gd-main">
          <div className="gd-main-inner">
            {/* Mobile header */}
            <header className="gd-mobile-header">
              <div className="gd-sidebar-logo" style={{ padding: 0 }}>
                <span className="gd-mark">G</span>
                <span className="gd-wordmark">Giftwell</span>
              </div>
              <div className="gd-avatar gd-avatar-sm">{GIFTER.fullName.split(' ').map((n) => n[0]).join('')}</div>
            </header>

            {children}
          </div>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="gd-bottom-nav">
        {NAV.map((item) => (
          <BottomNavLink key={item.href} {...item} />
        ))}
      </nav>

      <style jsx global>{`
        body { background: #fafafb; margin: 0; }

        .gd-shell {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          color: #1a1a1f;
          min-height: 100vh;
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
          background: #fff;
          border-right: 1px solid #ececef;
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
          background: ${BRAND}; color: #fff;
          border-radius: 8px;
          display: inline-flex; align-items: center; justify-content: center;
          font-family: Georgia, serif; font-style: italic; font-weight: 700; font-size: 17px;
          letter-spacing: -0.02em;
        }
        .gd-wordmark { font-size: 16px; font-weight: 700; letter-spacing: -0.005em; }

        .gd-sidebar-nav {
          display: flex; flex-direction: column; gap: 2px;
          flex: 1;
        }
        .gd-nav-item {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 10px; border-radius: 8px;
          font-size: 14px; font-weight: 500;
          color: #43434b; text-decoration: none;
          transition: background 120ms ease, color 120ms ease;
        }
        .gd-nav-item:hover { background: #f3f3f5; color: #1a1a1f; }
        .gd-nav-item-active {
          background: #1a1a1f; color: #fff;
        }
        .gd-nav-item-active:hover { background: #1a1a1f; color: #fff; }
        .gd-nav-item svg { width: 18px; height: 18px; flex-shrink: 0; }

        .gd-sidebar-foot {
          display: flex; align-items: center; gap: 10px;
          padding: 8px 6px; border-top: 1px solid #ececef; padding-top: 14px;
        }
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

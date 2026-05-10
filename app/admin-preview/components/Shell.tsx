'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './shell.module.css';

const STORES = [
  { id: 'acme', name: 'Acme Store', plan: 'Pro plan' },
  { id: 'feno', name: 'Feno', plan: 'Pro plan' },
  { id: 'proud', name: 'Proud Labs', plan: 'Trial' },
];

const NAV_PRIMARY = [
  { href: '/admin-preview', label: 'Dashboard', icon: HomeIcon, exact: true },
  { href: '/admin-preview/campaigns', label: 'Campaigns', icon: CalendarIcon },
  { href: '/admin-preview/orders', label: 'Orders', icon: BoxIcon },
  { href: '/admin-preview/recipients', label: 'Recipients', icon: UsersIcon },
  { href: '/admin-preview/reports', label: 'Reports', icon: ChartIcon },
  { href: '/admin-preview/integrations', label: 'Integrations', icon: PlugIcon },
  { href: '/admin-preview/settings', label: 'Settings', icon: GearIcon },
];

const NAV_CONFIGURE = [
  { href: '/admin-preview/customize', label: 'Customize', icon: BrushIcon },
  { href: '/admin-preview/setup', label: 'Setup', icon: SparkleIcon },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/admin-preview';
  const [storeMenuOpen, setStoreMenuOpen] = useState(false);
  const [activeStore, setActiveStore] = useState(STORES[0]);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setStoreMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + '/');

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <Link href="/admin-preview" className={styles.sidebarLogo} aria-label="Giftwell">
          <Image src="/g-black-bold.png" alt="Giftwell" width={120} height={28} priority />
        </Link>

        <nav className={styles.navSection}>
          {NAV_PRIMARY.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
              >
                <Icon />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.navSection}>
          <div className={styles.navSectionTitle}>Configure</div>
          {NAV_CONFIGURE.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
              >
                <Icon />
                {item.label}
              </Link>
            );
          })}
        </div>
      </aside>

      <header className={styles.topbar}>
        <div className={styles.topbarCenter}>
          Use the menu on the left to navigate
        </div>
        <div className={styles.topbarRight} ref={menuRef}>
          <span className={styles.livePill}>
            <CheckIcon />
            Live
          </span>
          <button
            className={styles.storeDropdown}
            onClick={() => setStoreMenuOpen((o) => !o)}
            aria-haspopup="menu"
            aria-expanded={storeMenuOpen}
          >
            {activeStore.name}
            <ChevronDownIcon />
          </button>
          {storeMenuOpen && (
            <div className={styles.storeMenu} role="menu">
              {STORES.map((s) => (
                <div
                  key={s.id}
                  className={`${styles.storeMenuItem} ${
                    s.id === activeStore.id ? styles.storeMenuItemActive : ''
                  }`}
                  onClick={() => {
                    setActiveStore(s);
                    setStoreMenuOpen(false);
                  }}
                  role="menuitem"
                >
                  <span>{s.name}</span>
                  <span style={{ fontSize: 11, color: '#8a8a93' }}>{s.plan}</span>
                </div>
              ))}
            </div>
          )}
          <button className={styles.overflowBtn} aria-label="More options">
            <DotsIcon />
          </button>
        </div>
      </header>

      <main className={styles.content}>
        <div className={styles.contentInner}>{children}</div>
      </main>
    </div>
  );
}

/* ─── Inline SVG icons (avoids polaris-icons name guessing) ────────────── */

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2v-9z" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  );
}
function BoxIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7l9-4 9 4v10l-9 4-9-4V7z" />
      <path d="M3 7l9 4 9-4M12 11v10" />
    </svg>
  );
}
function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="M7 14l4-4 4 4 5-7" />
    </svg>
  );
}
function PlugIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-12 0V8zM12 18v4" />
    </svg>
  );
}
function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
    </svg>
  );
}
function BrushIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l-6 6a3 3 0 1 0 4.2 4.2l6-6M14 7l3 3M21 3a4 4 0 0 0-5.66 0L9 9.34 14.66 15 21 8.66A4 4 0 0 0 21 3z" />
    </svg>
  );
}
function SparkleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2 2-5zM19 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
function DotsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <circle cx="5" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="19" cy="12" r="1.6" />
    </svg>
  );
}

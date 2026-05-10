'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './shell.module.css';

const SHOPIFY_PRIMARY = [
  { label: 'Home', icon: HomeIcon },
  { label: 'Orders', icon: OrdersIcon, badge: '3' },
  { label: 'Products', icon: ProductsIcon },
  { label: 'Customers', icon: CustomersIcon },
  { label: 'Marketing', icon: MarketingIcon },
  { label: 'Discounts', icon: DiscountsIcon },
  { label: 'Content', icon: ContentIcon },
  { label: 'Markets', icon: MarketsIcon },
  { label: 'Analytics', icon: AnalyticsIcon },
];

const SHOPIFY_CHANNELS = [
  { label: 'Online Store', icon: StoreIcon },
];

const APPS = [
  { label: 'Klaviyo', iconClass: styles.appIconKlaviyo, letter: 'K' },
];

const GIFTWELL_SUB = [
  { href: '/admin-preview', label: 'Dashboard', exact: true },
  { href: '/admin-preview/setup', label: 'Setup' },
  { href: '/admin-preview/customize', label: 'Customize' },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '/admin-preview';
  const giftwellActive = pathname.startsWith('/admin-preview');
  const [search, setSearch] = useState('');

  const isSubActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + '/');

  return (
    <div className={styles.shell}>
      {/* ─── Shopify dark top bar ─── */}
      <header className={styles.topbar}>
        <div className={styles.shopifyLogo} aria-label="Shopify">S</div>

        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </span>
          <input
            className={styles.search}
            type="search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.topbarRight}>
          <button className={styles.iconBtn} aria-label="Notifications">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            <span className={styles.notifDot} />
          </button>
          <button className={styles.shopifyStore}>
            Acme Store
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <button className={styles.iconBtn} aria-label="Profile">
            <span className={styles.shopifyAvatar}>BS</span>
          </button>
        </div>
      </header>

      {/* ─── Shopify left sidebar ─── */}
      <aside className={styles.sidebar}>
        <nav className={styles.sidebarSection}>
          {SHOPIFY_PRIMARY.map((item) => {
            const Icon = item.icon;
            return (
              <a className={styles.navItem} href="#" key={item.label}>
                <Icon />
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && <NavBadge value={item.badge} />}
              </a>
            );
          })}
        </nav>

        <div className={styles.sidebarSectionDivider} />

        <nav className={styles.sidebarSection}>
          <div className={styles.sidebarSectionTitle}>Sales channels</div>
          {SHOPIFY_CHANNELS.map((item) => {
            const Icon = item.icon;
            return (
              <a className={styles.navItem} href="#" key={item.label}>
                <Icon />
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div className={styles.sidebarSectionDivider} />

        <nav className={styles.sidebarSection}>
          <div className={styles.sidebarSectionTitle}>Apps</div>
          {APPS.map((a) => (
            <a className={styles.navItem} href="#" key={a.label}>
              <span className={`${styles.appIcon} ${a.iconClass}`}>{a.letter}</span>
              <span>{a.label}</span>
            </a>
          ))}

          {/* Giftwell — active app, expanded */}
          <a
            className={`${styles.navItem} ${giftwellActive ? styles.navItemActive : ''}`}
            href="/admin-preview"
          >
            <span className={`${styles.appIcon} ${styles.appIconGiftwell}`}>G</span>
            <span>Giftwell</span>
          </a>
          {giftwellActive && (
            <div className={styles.subNav}>
              {GIFTWELL_SUB.map((item) => (
                <Link
                  href={item.href}
                  key={item.href}
                  className={`${styles.subNavItem} ${
                    isSubActive(item.href, item.exact) ? styles.subNavItemActive : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </nav>

        <div className={styles.sidebarSpacer} />

        <div className={styles.sidebarSectionDivider} />

        <nav className={`${styles.sidebarSection} ${styles.sidebarSettings}`}>
          <a className={styles.navItem} href="#">
            <SettingsIcon />
            <span>Settings</span>
          </a>
        </nav>
      </aside>

      {/* ─── Embedded app content ─── */}
      <main className={styles.content}>{children}</main>
    </div>
  );
}

function NavBadge({ value }: { value: string }) {
  return (
    <span style={{
      background: '#e3e3e7',
      color: '#303030',
      borderRadius: 999,
      fontSize: 11,
      fontWeight: 500,
      padding: '1px 7px',
      lineHeight: '16px',
    }}>{value}</span>
  );
}

/* ─── Shopify nav icons (inline SVG) ───────────────────────────────────── */

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l9-7 9 7v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2v-9z" />
    </svg>
  );
}
function OrdersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 2L4 7v15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V7l-5-5H9z" />
      <path d="M3 7h18M16 11a4 4 0 0 1-8 0" />
    </svg>
  );
}
function ProductsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 7l-8-4-8 4 8 4 8-4zM4 7v10l8 4M20 7v10l-8 4M12 11v10" />
    </svg>
  );
}
function CustomersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11" />
    </svg>
  );
}
function MarketingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11h2l4-7v18l-4-7H3v-4zM21 6v12M17 9v6" />
    </svg>
  );
}
function DiscountsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 12V7a2 2 0 0 0-2-2h-5L2 16l6 6 11-11h-1z" />
      <circle cx="14" cy="10" r="1" />
    </svg>
  );
}
function ContentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  );
}
function MarketsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" />
    </svg>
  );
}
function AnalyticsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="M7 14l4-4 4 4 5-7" />
    </svg>
  );
}
function StoreIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l1-5h16l1 5M3 9v11h18V9M3 9h18M9 13h6" />
    </svg>
  );
}
function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
    </svg>
  );
}

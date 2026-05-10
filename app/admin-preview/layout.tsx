'use client';

import { useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import {
  AppProvider,
  Frame,
  TopBar,
  Navigation,
  Badge,
} from '@shopify/polaris';
import {
  HomeIcon,
  CalendarIcon,
  OrderIcon,
  PersonIcon,
  ChartLineIcon,
  ConnectIcon,
  SettingsIcon,
} from '@shopify/polaris-icons';
import enTranslations from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/build/esm/styles.css';

const STORES = [
  { id: 'acme', name: 'Acme Store', initials: 'A', plan: 'Pro plan' },
  { id: 'feno', name: 'Feno', initials: 'F', plan: 'Pro plan' },
  { id: 'proud', name: 'Proud Labs', initials: 'P', plan: 'Trial' },
];

export default function AdminPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() || '/admin-preview';
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeStore, setActiveStore] = useState(STORES[0]);

  const toggleUserMenu = useCallback(() => setUserMenuOpen((o) => !o), []);
  const toggleMobileNav = useCallback(() => setMobileNavOpen((o) => !o), []);

  const userMenu = (
    <TopBar.UserMenu
      actions={[
        {
          items: STORES.map((s) => ({
            content: s.name,
            active: s.id === activeStore.id,
            onAction: () => {
              setActiveStore(s);
              setUserMenuOpen(false);
            },
          })),
        },
        {
          items: [
            { content: 'Account settings', icon: SettingsIcon },
            { content: 'Sign out' },
          ],
        },
      ]}
      name={activeStore.name}
      detail={activeStore.plan}
      initials={activeStore.initials}
      open={userMenuOpen}
      onToggle={toggleUserMenu}
    />
  );

  const secondaryMenu = (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        paddingRight: 12,
      }}
    >
      <Badge tone="success" progress="complete">
        Live
      </Badge>
    </div>
  );

  const topBar = (
    <TopBar
      showNavigationToggle
      userMenu={userMenu}
      secondaryMenu={secondaryMenu}
      onNavigationToggle={toggleMobileNav}
    />
  );

  const navigation = (
    <Navigation location={pathname}>
      <Navigation.Section
        items={[
          {
            url: '/admin-preview',
            label: 'Dashboard',
            icon: HomeIcon,
            exactMatch: true,
          },
          {
            url: '/admin-preview/campaigns',
            label: 'Campaigns',
            icon: CalendarIcon,
          },
          {
            url: '/admin-preview/orders',
            label: 'Orders',
            icon: OrderIcon,
          },
          {
            url: '/admin-preview/recipients',
            label: 'Recipients',
            icon: PersonIcon,
          },
          {
            url: '/admin-preview/reports',
            label: 'Reports',
            icon: ChartLineIcon,
          },
          {
            url: '/admin-preview/integrations',
            label: 'Integrations',
            icon: ConnectIcon,
          },
          {
            url: '/admin-preview/settings',
            label: 'Settings',
            icon: SettingsIcon,
          },
        ]}
      />
      <Navigation.Section
        title="Configure"
        items={[
          {
            url: '/admin-preview/customize',
            label: 'Customize',
          },
          {
            url: '/admin-preview/setup',
            label: 'Setup',
          },
        ]}
      />
    </Navigation>
  );

  const logo = {
    width: 96,
    topBarSource: '/g-black-bold.png',
    contextualSaveBarSource: '/g-black-bold.png',
    url: '/admin-preview',
    accessibilityLabel: 'Giftwell',
  };

  return (
    <AppProvider i18n={enTranslations}>
      <Frame
        logo={logo}
        topBar={topBar}
        navigation={navigation}
        showMobileNavigation={mobileNavOpen}
        onNavigationDismiss={toggleMobileNav}
      >
        {children}
      </Frame>
    </AppProvider>
  );
}

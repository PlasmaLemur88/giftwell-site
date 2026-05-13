'use client';

import { AppProvider } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import '@shopify/polaris/build/esm/styles.css';
import './components/rim-beam.css';
import { Shell } from './components/Shell';

export default function AdminPreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider i18n={enTranslations}>
      <Shell>{children}</Shell>
    </AppProvider>
  );
}

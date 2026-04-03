'use client';

import { useState, useCallback } from 'react';
import { DemoScreen, StoreData } from './lib/types';
import { fetchStoreData } from './lib/store-fetcher';
import StoreInput from './components/StoreInput';
import DemoShell from './components/DemoShell';
import ScreenGiftPage from './components/ScreenGiftPage';
import ScreenCustomize from './components/ScreenCustomize';
import ScreenRecipients from './components/ScreenRecipients';
import ScreenDashboard from './components/ScreenDashboard';
import ScreenCTA from './components/ScreenCTA';

const SCREEN_ORDER: DemoScreen[] = ['gift-page', 'customize', 'recipients', 'dashboard', 'cta'];

export default function DemoPage() {
  const [store, setStore] = useState<StoreData | null>(null);
  const [screen, setScreen] = useState<DemoScreen>('input');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchStoreData(url);
      if (data.products.length === 0) {
        // Use fallback products for demo
        data.products = getFallbackProducts();
      }
      setStore(data);
      setScreen('gift-page');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load store data. Check the URL and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const goNext = useCallback(() => {
    const idx = SCREEN_ORDER.indexOf(screen);
    if (idx < SCREEN_ORDER.length - 1) {
      setScreen(SCREEN_ORDER[idx + 1]);
    }
  }, [screen]);

  // Input screen (no shell)
  if (screen === 'input' || !store) {
    return (
      <StoreInput onSubmit={handleSubmit} loading={loading} error={error} />
    );
  }

  // Demo screens (with shell)
  return (
    <DemoShell store={store} currentScreen={screen} onNavigate={setScreen}>
      {screen === 'gift-page' && <ScreenGiftPage store={store} onNext={goNext} />}
      {screen === 'customize' && <ScreenCustomize store={store} onNext={goNext} />}
      {screen === 'recipients' && <ScreenRecipients store={store} onNext={goNext} />}
      {screen === 'dashboard' && <ScreenDashboard store={store} onNext={goNext} />}
      {screen === 'cta' && <ScreenCTA store={store} />}
    </DemoShell>
  );
}

function getFallbackProducts() {
  return [
    {
      id: 1,
      title: 'Premium Gift Box',
      handle: 'premium-gift-box',
      body_html: '',
      vendor: 'Sample',
      product_type: '',
      images: [{ id: 1, src: 'https://images.unsplash.com/photo-1549465220-1a8b9238f615?w=400&h=400&fit=crop', alt: null }],
      variants: [{ id: 1, title: 'Default', price: '89.00' }],
    },
    {
      id: 2,
      title: 'Artisan Collection',
      handle: 'artisan-collection',
      body_html: '',
      vendor: 'Sample',
      product_type: '',
      images: [{ id: 2, src: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&h=400&fit=crop', alt: null }],
      variants: [{ id: 2, title: 'Default', price: '125.00' }],
    },
    {
      id: 3,
      title: 'Wellness Bundle',
      handle: 'wellness-bundle',
      body_html: '',
      vendor: 'Sample',
      product_type: '',
      images: [{ id: 3, src: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop', alt: null }],
      variants: [{ id: 3, title: 'Default', price: '75.00' }],
    },
  ];
}

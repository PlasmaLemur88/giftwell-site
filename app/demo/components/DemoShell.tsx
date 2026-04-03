'use client';

import { DemoScreen, StoreData } from '../lib/types';

const SCREENS: { id: DemoScreen; label: string }[] = [
  { id: 'gift-page', label: 'Design' },
  { id: 'customize', label: 'Gift Sets' },
  { id: 'recipients', label: 'Recipients' },
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'cta', label: 'Get Started' },
];

export default function DemoShell({
  store,
  currentScreen,
  onNavigate,
  children,
}: {
  store: StoreData;
  currentScreen: DemoScreen;
  onNavigate: (screen: DemoScreen) => void;
  children: React.ReactNode;
}) {
  const currentIndex = SCREENS.findIndex(s => s.id === currentScreen);

  return (
    <div className="demo-page">
      {/* Fixed background layer */}
      <div className="demo-bg-layer" />

      {/* Content layer */}
      <div className="demo-content-layer">
        {/* Header — matches real app */}
        <header className="demo-header">
          <div className="demo-header-inner">
            <div className="demo-header-left">
              {store.logo ? (
                <img src={store.logo} alt={store.name} className="demo-header-logo" />
              ) : (
                <span className="demo-header-logo-text">{store.name}</span>
              )}
              <span className="demo-header-powered">
                powered by <a href="https://giftwell.ai" target="_blank" rel="noopener">Giftwell</a>
              </span>
            </div>
            <div className="demo-header-right">
              <div className="demo-header-eye">👁</div>
              <button className="demo-btn-view-cart">View Cart</button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div style={{ flex: 1, paddingBottom: 60 }}>
          {children}
        </div>

        {/* Bottom step nav */}
        <div className="demo-step-nav">
          {currentIndex > 0 ? (
            <button className="demo-step-back" onClick={() => onNavigate(SCREENS[currentIndex - 1].id)}>
              ← Back
            </button>
          ) : <div />}

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <span className="demo-step-caption">
              Step {currentIndex + 1} of {SCREENS.length} —{' '}
              {currentScreen === 'gift-page' && 'This is what your gifters see'}
              {currentScreen === 'customize' && 'Choose from your real products'}
              {currentScreen === 'recipients' && 'Add recipients in seconds'}
              {currentScreen === 'dashboard' && 'Track everything in real time'}
              {currentScreen === 'cta' && 'Ready to launch?'}
            </span>
            <div className="demo-step-dots">
              {SCREENS.map((screen, i) => (
                <div
                  key={screen.id}
                  className={`demo-step-dot ${i === currentIndex ? 'active' : ''} ${i < currentIndex ? 'complete' : ''}`}
                />
              ))}
            </div>
          </div>

          {currentIndex < SCREENS.length - 1 ? (
            <button className="demo-step-next" onClick={() => onNavigate(SCREENS[currentIndex + 1].id)}>
              Next →
            </button>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}

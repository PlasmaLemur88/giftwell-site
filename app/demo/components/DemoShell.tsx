'use client';

import { DemoScreen, StoreData } from '../lib/types';

const SCREENS: { id: DemoScreen; label: string; }[] = [
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
    <div className="demo-shell">
      {/* Top nav */}
      <div className="demo-topnav">
        <div className="demo-topnav-left">
          {store.logo ? (
            <img src={store.logo} alt={store.name} className="demo-topnav-logo" />
          ) : (
            <span className="demo-topnav-logo-text">{store.name}</span>
          )}
          <span className="demo-topnav-powered">powered by Giftwell</span>
        </div>
        <div className="demo-topnav-right">
          <span className="demo-topnav-step">Step {currentIndex + 1} of {SCREENS.length}</span>
          <span className="demo-topnav-caption">
            {currentScreen === 'gift-page' && 'This is what your gifters see'}
            {currentScreen === 'customize' && 'Choose from your real products'}
            {currentScreen === 'recipients' && 'Add recipients in seconds'}
            {currentScreen === 'dashboard' && 'Track everything in real time'}
            {currentScreen === 'cta' && 'Ready to launch?'}
          </span>
          <span className="demo-topnav-saved">Progress Saved</span>
          <button className="demo-btn-cart">View Cart</button>
        </div>
      </div>

      {/* Main content */}
      <div className="demo-body">
        {children}
      </div>

      {/* Bottom nav */}
      <div className="demo-bottomnav">
        {currentIndex > 0 ? (
          <button className="demo-nav-back" onClick={() => onNavigate(SCREENS[currentIndex - 1].id)}>
            ← Back
          </button>
        ) : <div />}
        <div className="demo-nav-dots">
          {SCREENS.map((screen, i) => (
            <div
              key={screen.id}
              className={`demo-nav-dot ${i === currentIndex ? 'active' : ''} ${i < currentIndex ? 'complete' : ''}`}
            />
          ))}
        </div>
        {currentIndex < SCREENS.length - 1 ? (
          <button className="demo-nav-next" onClick={() => onNavigate(SCREENS[currentIndex + 1].id)}>
            Next →
          </button>
        ) : <div />}
      </div>
    </div>
  );
}

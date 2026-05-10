'use client';

import { useState, useRef, useEffect } from 'react';

const STORES = [
  { id: 'acme', name: 'Acme Store', plan: 'Pro plan' },
  { id: 'feno', name: 'Feno', plan: 'Pro plan' },
  { id: 'proud', name: 'Proud Labs', plan: 'Trial' },
];

export function MiniHeader() {
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

  return (
    <header className="mh">
      <div className="mh-left">
        <div className="mh-logo">
          <span className="mh-logo-icon">G</span>
          <span className="mh-logo-text">Giftwell</span>
        </div>
        <span className="mh-hint">Use the menu on the left to navigate</span>
      </div>
      <div className="mh-right" ref={menuRef}>
        <span className="mh-live">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Live
        </span>
        <button
          className="mh-store"
          onClick={() => setStoreMenuOpen((o) => !o)}
          aria-haspopup="menu"
          aria-expanded={storeMenuOpen}
        >
          {activeStore.name}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        {storeMenuOpen && (
          <div className="mh-menu" role="menu">
            {STORES.map((s) => (
              <div
                key={s.id}
                className={`mh-menu-item ${s.id === activeStore.id ? 'mh-menu-item-active' : ''}`}
                onClick={() => {
                  setActiveStore(s);
                  setStoreMenuOpen(false);
                }}
                role="menuitem"
              >
                <span>{s.name}</span>
                <span className="mh-menu-plan">{s.plan}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .mh {
          background: #fff;
          border: 1px solid #ececef;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          height: 56px;
          box-shadow: 0 1px 0 rgba(15, 15, 25, 0.04);
        }
        .mh-left {
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .mh-logo {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .mh-logo-icon {
          width: 24px;
          height: 24px;
          border-radius: 6px;
          background: linear-gradient(135deg, #7C5CFF, #A855F7);
          color: #fff;
          font-weight: 700;
          font-size: 13px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          letter-spacing: -0.02em;
        }
        .mh-logo-text {
          font-size: 15px;
          font-weight: 600;
          color: #111;
          letter-spacing: -0.01em;
        }
        .mh-hint {
          font-size: 13px;
          color: #6b6b73;
        }
        .mh-right {
          display: flex;
          align-items: center;
          gap: 8px;
          position: relative;
        }
        .mh-live {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #e6f6ec;
          color: #146c43;
          font-size: 12.5px;
          font-weight: 500;
          padding: 5px 11px 5px 9px;
          border-radius: 999px;
          border: 1px solid #c7ebd5;
        }
        .mh-store {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #fff;
          border: 1px solid #ececef;
          color: #111;
          font-size: 13px;
          font-weight: 500;
          padding: 6px 10px 6px 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 120ms ease;
        }
        .mh-store:hover { background: #f5f5f7; }
        .mh-store :global(svg) { color: #6b6b73; }
        .mh-menu {
          position: absolute;
          top: 42px;
          right: 0;
          background: #fff;
          border: 1px solid #ececef;
          border-radius: 10px;
          box-shadow: 0 8px 24px rgba(15, 15, 25, 0.08);
          padding: 6px;
          min-width: 220px;
          z-index: 20;
        }
        .mh-menu-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 10px;
          border-radius: 6px;
          font-size: 13px;
          cursor: pointer;
        }
        .mh-menu-item:hover { background: #f5f5f7; }
        .mh-menu-item-active { color: #5c4dff; font-weight: 500; }
        .mh-menu-plan { color: #8a8a93; font-size: 11.5px; }

        @media (max-width: 720px) {
          .mh-hint { display: none; }
        }
      `}</style>
    </header>
  );
}

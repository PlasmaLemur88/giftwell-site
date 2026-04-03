'use client';

import { StoreData } from '../lib/types';

export default function ScreenCTA({ store }: { store: StoreData }) {
  return (
    <div className="screen-cta-dark">
      <div className="cta-card-dark">
        <div className="cta-icon">🎁</div>
        <h2>Ready to launch gifting on {store.name}?</h2>
        <p className="cta-subtitle">
          You just saw how easy it is. Your customers are already buying from you — let Giftwell turn those purchases into premium corporate gifts.
        </p>

        <div className="cta-stats-dark">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="cta-stat-value">0%</span>
            <span className="cta-stat-label">margin hit</span>
          </div>
          <div className="cta-stat-divider" />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="cta-stat-value">5 min</span>
            <span className="cta-stat-label">to set up</span>
          </div>
          <div className="cta-stat-divider" />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="cta-stat-value">Free</span>
            <span className="cta-stat-label">to start</span>
          </div>
        </div>

        <form className="cta-form-dark" onSubmit={(e) => { e.preventDefault(); }}>
          <div className="cta-form-row">
            <input type="text" placeholder="Your name" />
            <input type="email" placeholder="Work email" />
          </div>
          <input type="text" value={store.domain} readOnly />
          <button type="submit">Apply for Early Access</button>
        </form>

        <p className="cta-fine-print-dark">
          We&apos;ll review your application and get you set up within 24 hours.
        </p>
      </div>
    </div>
  );
}

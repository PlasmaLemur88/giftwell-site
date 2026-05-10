'use client';

export function AppEmbedStrip() {
  return (
    <div className="aes">
      <div className="aes-left">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <span className="aes-name">Giftwell</span>
      </div>
      <button className="aes-overflow" aria-label="More options">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <circle cx="5" cy="12" r="1.6" />
          <circle cx="12" cy="12" r="1.6" />
          <circle cx="19" cy="12" r="1.6" />
        </svg>
      </button>

      <style jsx>{`
        .aes {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 16px;
          background: #f1f1f1;
          border-bottom: 1px solid transparent;
          height: 36px;
        }
        .aes-left {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #6e6e73;
        }
        .aes-name {
          font-size: 13px;
          font-weight: 500;
          color: #303030;
        }
        .aes-overflow {
          background: transparent;
          border: none;
          width: 28px;
          height: 28px;
          border-radius: 6px;
          color: #6e6e73;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
        .aes-overflow:hover { background: #e7e7eb; }
      `}</style>
    </div>
  );
}

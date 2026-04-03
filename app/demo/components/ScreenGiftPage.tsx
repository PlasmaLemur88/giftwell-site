'use client';

import { useState } from 'react';
import { StoreData } from '../lib/types';

const FONT_STYLES = [
  { id: 'default', label: 'default' },
  { id: 'elegant', label: 'elegant' },
  { id: 'playful', label: 'playful' },
  { id: 'sophisticated', label: 'sophisticated' },
] as const;

export default function ScreenGiftPage({
  store,
  onNext,
}: {
  store: StoreData;
  onNext: () => void;
}) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [fontStyle, setFontStyle] = useState('default');
  const [activeTab, setActiveTab] = useState<'design' | 'gifts' | 'delivery'>('design');

  const selectedProduct = store.products[0];
  const productImage = selectedProduct?.images[0]?.src;
  const productTitle = selectedProduct?.title || 'Gift Set';

  return (
    <div className="demo-site-container">
      {/* Section header row */}
      <div className="demo-section-header">
        <span className="demo-section-title">Customize your digital unboxing</span>
        <span className="demo-progress-saved">Progress Saved</span>
      </div>

      {/* Main grid — matches real app's 10-col grid */}
      <div className="demo-main-grid">
        {/* Preview card (the big editor card) */}
        <div className="demo-preview-card">
          {/* Main card content (left side) */}
          <div className="demo-card-main">
            {activeTab === 'design' && (
              <>
                {/* Gift Title section */}
                <div className="demo-required-bar">
                  <span>Required: Gift Title</span>
                </div>
                <div className="demo-card-content">
                  <textarea
                    className={`demo-title-input font-${fontStyle}`}
                    placeholder="Write your title here..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    rows={1}
                  />

                  {/* Font style pills */}
                  <div className="demo-font-pills">
                    {FONT_STYLES.map((f) => (
                      <button
                        key={f.id}
                        className={`demo-font-pill ${fontStyle === f.id ? 'active' : ''}`}
                        data-font={f.id}
                        onClick={() => setFontStyle(f.id)}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* + Media / + Your Logo */}
                <div className="demo-card-content" style={{ paddingTop: 0 }}>
                  <div className="demo-action-btns">
                    <button className="demo-action-btn">+ Media</button>
                    <button className="demo-action-btn">+ Your Logo</button>
                  </div>
                </div>

                {/* Gift Message section */}
                <div className="demo-required-bar">
                  <span>Required: Gift Message</span>
                </div>
                <div className="demo-card-content">
                  <textarea
                    className="demo-message-textarea"
                    placeholder="Write your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button className="demo-recipient-btn">+ Recipient Name</button>
                </div>
              </>
            )}

            {activeTab === 'gifts' && (
              <div className="gw-gift-panel">
                <h3>Choose Your Set — {store.products.length} Options</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
                  {store.products.slice(0, 6).map((product) => {
                    const img = product.images[0]?.src;
                    const price = product.variants[0]?.price;
                    return (
                      <div key={product.id} className="gw-gift-card" onClick={() => setActiveTab('design')}>
                        {img && (
                          <div className="gw-gift-card-img">
                            <img src={img} alt={product.title} />
                          </div>
                        )}
                        <div className="gw-gift-card-body">
                          <div className="gw-gift-card-row">
                            <span className="gw-gift-card-name">{product.title}</span>
                            {price && <span className="gw-gift-card-price">${parseFloat(price).toFixed(2)}</span>}
                          </div>
                          <button className="gw-gift-card-btn">Add to Cart</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="gw-gift-panel">
                <h3>Delivery Options</h3>
                <p style={{ fontSize: 13, color: 'var(--gw-slate-gray)', lineHeight: 1.6, marginBottom: 16 }}>
                  Choose how recipients receive their gift.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <button className="gw-gift-card-btn" style={{ padding: 14, textAlign: 'left' }}>
                    Digital Unwrapping (Email)
                  </button>
                  <button className="gw-gift-card-btn" style={{ padding: 14, textAlign: 'left' }}>
                    Ship to Recipient
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right preview panel (inside the card) */}
          <div className="demo-right-preview">
            <h3 className="demo-preview-title">
              {title || `We wanted to say thanks with a ${productTitle}!`}
            </h3>
            {productImage && (
              <div className="demo-preview-image-wrap">
                <img src={productImage} alt={productTitle} />
                <button className="demo-preview-change-btn" onClick={() => setActiveTab('gifts')}>
                  Change Gift Set
                </button>
              </div>
            )}
            <span className="demo-preview-mode">Previewing: Ship to Recipient option.</span>
            <h4 className="demo-preview-subtitle">Your gift is coming straight to you!</h4>
          </div>

          {/* Aside tab bar (vertical, rightmost) */}
          <aside className="demo-aside">
            <div className="demo-aside-tabs">
              <button
                className={`demo-aside-tab ${activeTab === 'design' ? 'active' : ''}`}
                onClick={() => setActiveTab('design')}
              >
                <div className="demo-aside-tab-icon">
                  <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: activeTab === 'design' ? 'transparent' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    ✏️
                  </div>
                </div>
                <span>Design</span>
              </button>
              <button
                className={`demo-aside-tab ${activeTab === 'gifts' ? 'active' : ''}`}
                onClick={() => setActiveTab('gifts')}
              >
                <div className="demo-aside-tab-icon">🎁</div>
                <span>Gift Sets</span>
              </button>
              <button
                className={`demo-aside-tab ${activeTab === 'delivery' ? 'active' : ''}`}
                onClick={() => setActiveTab('delivery')}
              >
                <div className="demo-aside-tab-icon">📨</div>
                <span>Delivery</span>
              </button>
            </div>
          </aside>
        </div>
      </div>

      {/* Preview Email button */}
      <button className="demo-preview-email-btn" onClick={onNext}>
        Preview Recipient Email
      </button>

      {/* Footer */}
      <div className="demo-footer">
        <span>Need Help? <a href="#">Start a Chat.</a></span>
        <a href="https://giftwell.ai" target="_blank" rel="noopener">powered by Giftwell</a>
      </div>
    </div>
  );
}

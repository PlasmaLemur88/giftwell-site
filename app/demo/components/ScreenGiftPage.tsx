'use client';

import { useState } from 'react';
import { StoreData } from '../lib/types';

const FONT_STYLES = [
  { id: 'default', label: 'Default' },
  { id: 'elegant', label: 'Elegant' },
  { id: 'playful', label: 'Playful' },
  { id: 'sophisticated', label: 'Sophisticated' },
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

  return (
    <>
      {/* Left: Form */}
      <div className="demo-form-area">
        <h3 style={{ fontSize: 16, fontWeight: 500, color: 'var(--gw-text-muted)', marginBottom: 24 }}>
          Customize your digital unboxing
        </h3>

        {/* Gift Title */}
        <div className="gw-section">
          <span className="gw-section-label">Required: Gift Title</span>
          <input
            type="text"
            className="gw-input"
            placeholder="Write your title here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="gw-font-pills">
            {FONT_STYLES.map((f) => (
              <button
                key={f.id}
                className={`gw-font-pill ${fontStyle === f.id ? 'active' : ''}`}
                data-font={f.id}
                onClick={() => setFontStyle(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Media + Logo buttons */}
        <div className="gw-action-btns">
          <button className="gw-action-btn">+ Media</button>
          <button className="gw-action-btn">+ Your Logo</button>
        </div>

        {/* Gift Message */}
        <div className="gw-section">
          <span className="gw-section-label">Required: Gift Message</span>
          <textarea
            className="gw-textarea"
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="gw-recipient-btn">+ Recipient Name</button>
        </div>

        {/* Preview Email button */}
        <button className="gw-preview-email-btn" onClick={onNext}>
          Preview Recipient Email
        </button>
      </div>

      {/* Right: Preview + Vertical tabs */}
      <div className="demo-right-area">
        {/* Vertical tabs */}
        <div className="demo-vtabs">
          <button
            className={`demo-vtab ${activeTab === 'design' ? 'active' : ''}`}
            onClick={() => setActiveTab('design')}
          >
            <div className="demo-vtab-icon">✏️</div>
            Design
          </button>
          <button
            className={`demo-vtab ${activeTab === 'gifts' ? 'active' : ''}`}
            onClick={() => setActiveTab('gifts')}
          >
            <div className="demo-vtab-icon">🎁</div>
            Gift Sets
          </button>
          <button
            className={`demo-vtab ${activeTab === 'delivery' ? 'active' : ''}`}
            onClick={() => setActiveTab('delivery')}
          >
            <div className="demo-vtab-icon">📨</div>
            Delivery
          </button>
        </div>

        {/* Preview / Gift selection panel */}
        <div className="demo-preview-col">
          {activeTab === 'design' && (
            <div className="gw-preview-card">
              {productImage && (
                <div className="gw-preview-image">
                  <img src={productImage} alt={selectedProduct?.title} />
                  <button className="gw-preview-change" onClick={() => setActiveTab('gifts')}>
                    🎁 Change Gift Set
                  </button>
                </div>
              )}
              <div className="gw-preview-info">
                <div className="gw-preview-mode">Previewing: Ship to Recipient option.</div>
                <div className="gw-preview-title-text">
                  {title || 'Your gift is coming straight to you!'}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gifts' && (
            <div className="gw-gift-panel">
              <div className="gw-gift-panel-header">
                <h3>Choose Your Set</h3>
                <span className="gw-gift-panel-count">{store.products.length} Options</span>
              </div>
              {store.products.slice(0, 4).map((product) => {
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
          )}

          {activeTab === 'delivery' && (
            <div className="gw-gift-panel">
              <div className="gw-gift-panel-header">
                <h3>Delivery Options</h3>
              </div>
              <p style={{ fontSize: 13, color: 'var(--gw-text-dim)', lineHeight: 1.6 }}>
                Choose how recipients receive their gift — digital unwrapping link via email, or shipped directly to their address.
              </p>
              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button className="gw-gift-card-btn" style={{ padding: 14, textAlign: 'left' }}>
                  📧 Digital Unwrapping (Email)
                </button>
                <button className="gw-gift-card-btn" style={{ padding: 14, textAlign: 'left' }}>
                  📦 Ship to Recipient
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

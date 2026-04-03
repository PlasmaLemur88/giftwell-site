'use client';

import { StoreData } from '../lib/types';

export default function ScreenCustomize({
  store,
  onNext,
}: {
  store: StoreData;
  onNext: () => void;
}) {
  return (
    <div className="demo-site-container">
      <div className="demo-section-header">
        <span className="demo-section-title">Choose Your Set — {store.products.length} Options</span>
      </div>
      <p style={{ fontSize: 13, color: 'var(--gw-slate-gray)', marginBottom: 24 }}>
        Your gifters choose from your products. Each bundle includes a branded unwrapping experience.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
        {store.products.slice(0, 6).map((product) => {
          const img = product.images[0]?.src;
          const price = product.variants[0]?.price;
          return (
            <div key={product.id} className="gw-gift-card" onClick={onNext}>
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
  );
}

'use client';

import { StoreData } from '../lib/types';

// Screen 2 is now "Gift Sets" — showing the product selection in the same dark UI
export default function ScreenCustomize({
  store,
  onNext,
}: {
  store: StoreData;
  onNext: () => void;
}) {
  return (
    <div style={{ maxWidth: 800, width: '100%' }}>
      <h3 style={{ fontSize: 16, fontWeight: 500, color: 'var(--gw-text-muted)', marginBottom: 8 }}>
        Choose Your Set
      </h3>
      <p style={{ fontSize: 13, color: 'var(--gw-text-dim)', marginBottom: 24 }}>
        Your gifters choose from {store.products.length} products in your catalog.
        Each bundle includes your branded unwrapping experience.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
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

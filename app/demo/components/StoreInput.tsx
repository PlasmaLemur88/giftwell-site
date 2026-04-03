'use client';

import { useState } from 'react';

export default function StoreInput({
  onSubmit,
  loading,
  error,
}: {
  onSubmit: (url: string) => void;
  loading: boolean;
  error: string | null;
}) {
  const [value, setValue] = useState('');

  return (
    <div className="store-input-screen">
      <div className="store-input-card">
        <div className="store-input-badge">Interactive Demo</div>
        <h1 className="store-input-title">
          See Giftwell on <em>your</em> store
        </h1>
        <p className="store-input-subtitle">
          Enter your Shopify store URL and we&apos;ll show you exactly what corporate gifting looks like with your products and branding.
        </p>

        <form
          className="store-input-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (value.trim() && !loading) onSubmit(value.trim());
          }}
        >
          <div className="store-input-field-wrap">
            <img src="/shopify-logo.png" alt="" className="store-input-shopify-icon" />
            <input
              type="text"
              className="store-input-field"
              placeholder="yourstore.myshopify.com"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={loading}
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="store-input-submit"
            disabled={!value.trim() || loading}
          >
            {loading ? (
              <span className="store-input-spinner" />
            ) : (
              'Show me →'
            )}
          </button>
        </form>

        {error && <p className="store-input-error">{error}</p>}

        <p className="store-input-hint">
          Try: <button type="button" onClick={() => setValue('dreandsnoop.com')} className="store-input-example">dreandsnoop.com</button>
        </p>
      </div>
    </div>
  );
}

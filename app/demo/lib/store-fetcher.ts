import { StoreData, ShopifyProduct } from './types';

async function proxyFetch(url: string) {
  const res = await fetch('/api/shopify-proxy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(err.error || `Failed: ${res.status}`);
  }
  return res.json();
}

function normalizeDomain(input: string): string {
  let domain = input.trim().toLowerCase();
  domain = domain.replace(/^https?:\/\//, '');
  domain = domain.replace(/\/.*$/, '');
  // If no dots at all, assume it's a myshopify handle
  if (!domain.includes('.')) {
    domain = `${domain}.myshopify.com`;
  }
  return domain;
}

/** Try to find the .myshopify.com domain from the store's HTML */
function extractMyshopifyDomain(html: string): string | null {
  // Look for Shopify.shop = "xxx.myshopify.com"
  const shopMatch = html.match(/Shopify\.shop\s*=\s*"([^"]+\.myshopify\.com)"/);
  if (shopMatch) return shopMatch[1];

  // Look for any .myshopify.com reference in the HTML
  const myshopifyMatch = html.match(/([a-z0-9-]+\.myshopify\.com)/);
  if (myshopifyMatch) return myshopifyMatch[1];

  return null;
}

function extractMetaFromHTML(html: string): { logo: string | null; ogImage: string | null; themeColor: string | null; title: string | null } {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || null;
  const appleTouchIcon = doc.querySelector('link[rel="apple-touch-icon"]')?.getAttribute('href') || null;
  const favicon = doc.querySelector('link[rel="icon"]')?.getAttribute('href')
    || doc.querySelector('link[rel="shortcut icon"]')?.getAttribute('href') || null;

  const logo = appleTouchIcon || favicon || null;
  const themeColor = doc.querySelector('meta[name="theme-color"]')?.getAttribute('content') || null;
  const title = doc.querySelector('title')?.textContent || null;

  return { logo, ogImage, themeColor, title };
}

async function extractDominantColor(imageUrl: string): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) { resolve(null); return; }

        canvas.width = 50;
        canvas.height = 50;
        ctx.drawImage(img, 0, 0, 50, 50);

        const data = ctx.getImageData(0, 0, 50, 50).data;
        let r = 0, g = 0, b = 0, count = 0;

        for (let i = 0; i < data.length; i += 4) {
          const alpha = data[i + 3];
          const ri = data[i], gi = data[i + 1], bi = data[i + 2];
          if (alpha < 128) continue;
          if (ri > 240 && gi > 240 && bi > 240) continue;
          if (ri < 15 && gi < 15 && bi < 15) continue;
          r += ri; g += gi; b += bi; count++;
        }

        if (count === 0) { resolve(null); return; }
        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);

        resolve(`#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = imageUrl;
  });
}

const DEFAULT_ACCENT = '#7B2FBE';

export async function fetchStoreData(rawInput: string): Promise<StoreData> {
  let domain = normalizeDomain(rawInput);
  const isCustomDomain = !domain.endsWith('.myshopify.com');
  let base = `https://${domain}`;

  // Step 1: Fetch homepage HTML (works for both custom and myshopify domains)
  const homepageRes = await proxyFetch(base).catch(() => ({ html: '' }));
  const html: string = homepageRes.html || '';

  // Step 2: If custom domain, resolve the myshopify domain from HTML
  let myshopifyDomain = domain;
  if (isCustomDomain && html) {
    const resolved = extractMyshopifyDomain(html);
    if (resolved) {
      myshopifyDomain = resolved;
    }
  }
  const myshopifyBase = `https://${myshopifyDomain}`;

  // Step 3: Fetch products from myshopify domain (more reliable for /products.json)
  const [productsRes, metaRes] = await Promise.all([
    proxyFetch(`${myshopifyBase}/products.json?limit=6`).catch(() => ({ products: [] })),
    proxyFetch(`${myshopifyBase}/meta.json`).catch(() => null),
  ]);

  const products: ShopifyProduct[] = productsRes.products || [];

  // Extract meta from HTML
  const htmlMeta = html ? extractMetaFromHTML(html) : { logo: null, ogImage: null, themeColor: null, title: null };

  // Store name
  const storeName = metaRes?.name
    || htmlMeta.title?.replace(/\s*[–—|:].*/g, '').trim()
    || domain.replace('.myshopify.com', '').replace(/\./g, ' ');

  // Logo: make absolute using the original domain
  let logo = htmlMeta.logo;
  if (logo && !logo.startsWith('http')) {
    logo = logo.startsWith('//') ? `https:${logo}` : `${base}${logo}`;
  }

  // Accent color
  let accentColor = htmlMeta.themeColor || null;
  if (!accentColor && htmlMeta.ogImage) {
    accentColor = await extractDominantColor(htmlMeta.ogImage);
  }
  if (!accentColor) {
    accentColor = DEFAULT_ACCENT;
  }

  return {
    name: storeName,
    domain: isCustomDomain ? domain : myshopifyDomain,
    description: metaRes?.description || '',
    logo,
    accentColor,
    products,
  };
}

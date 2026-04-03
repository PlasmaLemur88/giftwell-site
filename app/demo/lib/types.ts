export interface ShopifyProduct {
  id: number;
  title: string;
  handle: string;
  body_html: string;
  vendor: string;
  product_type: string;
  images: { id: number; src: string; alt: string | null }[];
  variants: { id: number; title: string; price: string }[];
}

export interface StoreData {
  name: string;
  domain: string;
  description: string;
  logo: string | null;
  accentColor: string;
  products: ShopifyProduct[];
}

export type DemoScreen = 'input' | 'gift-page' | 'customize' | 'recipients' | 'dashboard' | 'cta';

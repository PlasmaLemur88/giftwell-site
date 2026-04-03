import './demo.css';

export const metadata = {
  title: 'Giftwell Demo — See It On Your Store',
  description: 'Enter your Shopify store URL and see what corporate gifting looks like with your products and branding.',
};

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

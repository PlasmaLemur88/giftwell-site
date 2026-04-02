import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-cabinet",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Giftwell — Corporate Gifting That Actually Feels Like a Gift",
  description:
    "Your customers paste a list, pick a gift, and checkout in under 5 minutes. They look like heroes. You get high-value orders on autopilot.",
  openGraph: {
    title: "Giftwell — Corporate Gifting That Actually Converts",
    description:
      "The Shopify app that turns your store into a corporate gifting powerhouse. Branded unwrapping, AI-powered recipient parsing, and zero margin hit.",
    siteName: "Giftwell",
    type: "website",
    url: "https://giftwell.ai",
  },
  twitter: {
    card: "summary_large_image",
    title: "Giftwell — Corporate Gifting That Actually Converts",
    description:
      "The Shopify app that turns your store into a corporate gifting powerhouse.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${syne.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}

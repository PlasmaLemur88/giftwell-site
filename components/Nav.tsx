"use client";

import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "nav-blur border-b border-gray-200/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-2xl">🎁</span>
          <span className={scrolled ? "text-gray-900" : "text-white"}>
            Giftwell
          </span>
        </a>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {["How It Works", "Why Giftwell", "Pricing", "Blog"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              className={`text-sm font-medium transition-colors ${
                scrolled
                  ? "text-gray-600 hover:text-gray-900"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className={`text-sm font-medium hidden sm:inline-block ${
              scrolled ? "text-gray-700" : "text-white/90"
            }`}
          >
            Log in
          </a>
          <a
            href="#"
            className={`btn-pill text-sm py-2.5 px-5 ${
              scrolled ? "btn-dark" : "btn-primary"
            }`}
          >
            Install Free
          </a>
        </div>
      </div>
    </nav>
  );
}

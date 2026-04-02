"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How does Giftwell integrate with Shopify?",
    a: "One-click install from the Shopify App Store. No dev work, no code changes. Giftwell creates a dedicated /gift page on your store and adds gifting to your nav. Orders appear in Shopify just like any other order, tagged for easy filtering.",
  },
  {
    q: "How does pricing work?",
    a: "Store subscription is $500/month (with a 90-day free trial). The 10% gift experience fee is added at checkout and paid by the gifter — not deducted from your product revenue. Your margins stay completely intact.",
  },
  {
    q: "How does the digital unwrapping work?",
    a: "Recipients get a branded email, click through to a personalized page on your site, and experience an animated gift reveal with your logo, colors, and messaging. It's designed to make both the sender and your brand look amazing.",
  },
  {
    q: "What if buyers don't have recipient addresses?",
    a: "No problem. They can send with just an email address. Recipients get the unwrapping experience and enter their own shipping address when they claim the gift. If unclaimed after 30 days, it auto-ships to the original gifter.",
  },
  {
    q: "Do I need to change my fulfillment process?",
    a: "Nope. Orders show up in Shopify tagged as giftwell-direct or giftwell-claimed. You fulfill them exactly like any other order. Nothing changes on your end.",
  },
  {
    q: "How do corporate buyers find my store?",
    a: "Three ways: (1) We build a branded /gift landing page optimized for corporate buyers, (2) We place gifting in your nav and footer so existing visitors discover it, (3) We give you a ready-to-run search ads playbook to capture HR teams actively searching for gifts.",
  },
  {
    q: "What if a buyer doesn't want to use the self-serve flow?",
    a: "Our concierge chat handles it. Buyers can hand off their list and we facilitate the entire order — it never hits your support queue.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section-padding gradient-soft">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="headline-lg text-3xl md:text-4xl text-gray-900 mb-4">
            Questions? We&apos;ve got answers.
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden reveal"
            >
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-semibold text-gray-900 text-sm">
                  {faq.q}
                </span>
                <span
                  className={`text-gray-400 transition-transform duration-200 text-lg ${
                    open === i ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  open === i ? "max-h-96 pb-5" : "max-h-0"
                }`}
              >
                <p className="px-6 text-gray-500 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

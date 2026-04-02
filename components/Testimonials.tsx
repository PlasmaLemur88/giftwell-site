const reviews = [
  {
    quote: "We've tried corporate gifting before and it was a nightmare. Giftwell just works. Paste the list, done.",
    author: "@shopify_seller_22",
    title: "Finally, B2B revenue that doesn't suck",
    date: "Dec 12",
  },
  {
    quote: "Our clients literally send us screenshots of the unwrapping experience. It's the thing that makes us memorable.",
    author: "@dtc_brand_owner",
    title: "The unwrapping is what sells it",
    date: "Nov 28",
  },
  {
    quote: "Installed in October for holiday. Best decision we made all year.",
    author: "@wellness_merchant",
    title: "$47K in November alone",
    date: "Dec 3",
  },
  {
    quote: "Corporate gifting was always this thing we knew we should do but never figured out. Now it just happens.",
    author: "@beauty_brand_co",
    title: "Wish I found this sooner",
    date: "Nov 15",
  },
];

export default function Testimonials() {
  return (
    <section className="section-padding gradient-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 text-purple-600 text-sm font-medium mb-4">
            ⭐ Try Free for 90 Days
          </div>
          <h2 className="headline-lg text-3xl md:text-5xl text-gray-900 mb-4">
            Real reviews from real merchants
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {reviews.map((r, i) => (
            <div key={r.author} className={`card reveal reveal-delay-${(i % 2) + 1}`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900 text-sm">{r.title}</h3>
                <span className="text-gray-400 text-xs">{r.date}</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed italic mb-4">
                &ldquo;{r.quote}&rdquo;
              </p>
              <p className="text-purple-500 text-xs font-medium">
                — {r.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

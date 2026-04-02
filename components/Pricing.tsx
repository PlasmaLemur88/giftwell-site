export default function Pricing() {
  return (
    <section className="section-padding bg-white" id="pricing">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="headline-lg text-3xl md:text-5xl text-gray-900 mb-4">
            Zero hit to your margins.{" "}
            <span className="gradient-text">Seriously.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Your product revenue stays intact. The experience fee is paid by
            your customers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Store Subscription */}
          <div className="card border-2 border-purple-200 reveal">
            <div className="text-center">
              <p className="text-purple-600 text-sm font-medium uppercase tracking-wider mb-2">
                Store Subscription
              </p>
              <div className="flex items-baseline justify-center gap-1 mb-1">
                <span className="headline-xl text-5xl text-gray-900">$500</span>
                <span className="text-gray-400">/month</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-medium mb-6">
                ✨ 90-day free trial included
              </div>
            </div>
            <ul className="space-y-3 mt-4">
              {[
                "Unlimited campaigns",
                "Full Shopify integration",
                "Custom branding",
                "Dedicated landing page",
                "Nav & footer placement",
                "Search ads playbook",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-gray-600 text-sm">
                  <span className="text-purple-500">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Experience Fee */}
          <div className="card border-2 border-gray-200 reveal reveal-delay-1">
            <div className="text-center">
              <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2">
                Gift Experience
              </p>
              <div className="flex items-baseline justify-center gap-1 mb-1">
                <span className="headline-xl text-5xl text-gray-900">+10%</span>
              </div>
              <p className="text-gray-400 text-sm mb-6">per gift</p>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium">
                💳 Paid by your customers at checkout — not you
              </div>
            </div>
            <ul className="space-y-3 mt-6">
              {[
                "Digital unwrapping experience",
                "Multi-recipient sending",
                "AI-powered address collection",
                "Branded recipient emails",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-gray-600 text-sm">
                  <span className="text-green-500">✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center mt-8 reveal">
          <p className="text-gray-400 text-sm mb-6 max-w-xl mx-auto">
            Your margin stays intact. The 10% experience fee is added at
            checkout and paid by the gifter — not deducted from your product
            revenue.
          </p>
          <a href="#" className="btn-pill btn-gradient text-base px-8 py-4">
            Start Your 90-Day Free Trial
          </a>
          <p className="text-gray-400 text-xs mt-3">No credit card required</p>
        </div>
      </div>
    </section>
  );
}

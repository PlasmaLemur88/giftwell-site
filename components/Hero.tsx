export default function Hero() {
  return (
    <section className="gradient-hero relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-pink-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-sm font-medium mb-8 border border-white/20">
          <span className="text-yellow-300">★★★★★</span>
          Trusted by DTC brands on Shopify
        </div>

        {/* Headline */}
        <h1 className="headline-xl text-white text-5xl md:text-7xl lg:text-8xl mb-6">
          Corporate gifting
          <br />
          that actually
          <br />
          <em className="not-italic">converts.</em>
        </h1>

        {/* Subhead */}
        <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Your customers paste a list, pick a gift, and checkout in under 5
          minutes. They look like heroes. You get high-value orders on autopilot.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a href="#" className="btn-pill btn-primary text-base px-8 py-4">
            See How It Works
          </a>
          <a href="#" className="btn-pill btn-secondary text-base px-8 py-4">
            Watch Demo
          </a>
        </div>

        {/* Browser Mockup */}
        <div className="browser-mockup max-w-4xl mx-auto">
          <div className="browser-bar">
            <div className="browser-dot bg-red-400" />
            <div className="browser-dot bg-yellow-400" />
            <div className="browser-dot bg-green-400" />
            <div className="flex-1 text-center">
              <span className="text-xs text-gray-400 bg-gray-700 px-4 py-1 rounded-md">
                yourstore.com/gift
              </span>
            </div>
          </div>
          <div className="bg-gray-900 p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Gift selector side */}
              <div className="bg-gray-800 rounded-xl p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🎁</span>
                  <span className="text-white font-semibold">Your Gift</span>
                  <span className="ml-auto text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                    ✓ Ready
                  </span>
                </div>
                <div className="bg-gradient-to-br from-purple-600/30 to-pink-500/30 rounded-lg p-4 mb-3 border border-white/10">
                  <p className="text-white font-bold">🎁 Holiday Wellness Bundle</p>
                  <p className="text-white/60 text-sm mt-1">
                    Candle, bath salts &amp; tea
                  </p>
                  <p className="text-white font-bold mt-2">$89.00</p>
                </div>
                <button className="w-full bg-purple-500 text-white rounded-xl py-3 font-semibold text-sm">
                  Continue →
                </button>
              </div>

              {/* Recipient preview side */}
              <div className="bg-gray-800 rounded-xl p-5">
                <p className="text-gray-400 text-xs mb-3 uppercase tracking-wider">
                  Recipient sees:
                </p>
                <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-lg p-5 text-center border border-white/10">
                  <p className="text-3xl mb-2">❄️</p>
                  <div className="w-8 h-8 rounded-full bg-purple-500 mx-auto mb-2 flex items-center justify-center text-white text-xs font-bold">
                    A
                  </div>
                  <p className="text-white/60 text-xs">From Sarah</p>
                  <p className="text-white font-semibold text-sm mt-2">
                    Happy Holidays, Jamie! 🎄
                  </p>
                  <div className="mt-4 bg-white/10 rounded-lg px-4 py-2">
                    <p className="text-white text-xs">🎁 Holiday Bundle</p>
                    <p className="text-purple-300 text-xs mt-1">
                      Tap to unwrap →
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

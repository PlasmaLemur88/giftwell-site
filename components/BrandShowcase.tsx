export default function BrandShowcase() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="headline-lg text-3xl md:text-5xl text-gray-900 mb-4">
            Your brand, front and center{" "}
            <span className="text-3xl md:text-5xl">🎨</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Same product. Completely different experience. Giftwell lets you
            customize colors, backgrounds, logos, and messaging — so every gift
            feels unmistakably yours.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Generic Experience */}
          <div className="comparison-old rounded-2xl p-6 reveal">
            <p className="font-bold text-gray-400 text-sm uppercase tracking-wider mb-4">
              Generic Experience
            </p>
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <div className="bg-gray-100 rounded-lg p-4 mb-4 font-mono text-xs text-gray-500 space-y-1">
                <p>📦 TRACKING #8294751023</p>
                <p>TO: Sarah Johnson</p>
                <p>123 Main St, Suite 400</p>
                <p>Gift note: &ldquo;Enjoy!&rdquo; - no sender info</p>
              </div>
              <div className="text-center py-4">
                <p className="text-2xl mb-2">📦</p>
                <p className="text-gray-500 text-sm">Package arrived</p>
                <p className="text-gray-400 text-xs italic mt-1">
                  &ldquo;Wait... who sent this?&rdquo;
                </p>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-red-400 text-sm flex items-center gap-2">
                <span>✗</span> Sender gets no credit
              </p>
              <p className="text-red-400 text-sm flex items-center gap-2">
                <span>✗</span> Recipient confused about who sent it
              </p>
              <p className="text-red-400 text-sm flex items-center gap-2">
                <span>✗</span> Zero brand recognition
              </p>
            </div>
          </div>

          {/* Giftwell Experience */}
          <div className="comparison-new rounded-2xl p-6 reveal reveal-delay-1">
            <p className="font-bold text-purple-600 text-sm uppercase tracking-wider mb-4">
              With Giftwell ✨
            </p>
            <div className="bg-gradient-to-br from-indigo-900 to-purple-800 rounded-xl p-5 text-center text-white relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-3xl opacity-10">
                🎊✨🎉⭐
              </div>
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 mx-auto mb-2 flex items-center justify-center text-xs font-bold">
                  A
                </div>
                <p className="text-xs text-white/60 uppercase tracking-wider">
                  ACME CORP
                </p>
                <div className="mt-3 text-sm">Unwrapping...</div>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-green-600 text-sm flex items-center gap-2">
                <span>✓</span> Your logo &amp; colors
              </p>
              <p className="text-green-600 text-sm flex items-center gap-2">
                <span>✓</span> Animated unwrapping experience
              </p>
              <p className="text-green-600 text-sm flex items-center gap-2">
                <span>✓</span> Memorable brand moment
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

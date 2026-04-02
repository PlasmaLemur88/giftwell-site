const steps = [
  {
    num: 1,
    emoji: "📧",
    title: "Email Arrives",
    desc: "Branded email stands out in their inbox",
    mockup: (
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Team updates</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Weekly sync notes...</span>
          </div>
          <div className="flex items-center gap-3 bg-purple-50 rounded-lg p-3 border border-purple-100">
            <span className="text-lg">🎁</span>
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Acme Corp via Giftwell
              </p>
              <p className="text-xs text-gray-500">
                Sarah sent you a gift! 🎉
              </p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    num: 2,
    emoji: "🖱️",
    title: "Click to Unwrap",
    desc: "Personalized preview builds anticipation",
    mockup: (
      <div className="bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl p-5 text-center text-white">
        <div className="w-10 h-10 rounded-full bg-white/20 mx-auto mb-3 flex items-center justify-center text-sm font-bold">
          A
        </div>
        <p className="text-white/80 text-xs">Acme Corp via Giftwell</p>
        <p className="font-semibold mt-1">Sarah sent you a gift! 🎉</p>
        <div className="mt-4">
          <span className="text-3xl">🎁</span>
          <p className="text-sm mt-2">You&apos;ve received a gift!</p>
        </div>
        <button className="mt-4 bg-white text-purple-600 rounded-full px-6 py-2 text-sm font-semibold">
          Unwrap Your Gift →
        </button>
      </div>
    ),
  },
  {
    num: 3,
    emoji: "✨",
    title: "Digital Unwrapping",
    desc: "Animated reveal on your branded site",
    mockup: (
      <div className="bg-gradient-to-br from-indigo-900 to-purple-800 rounded-xl p-5 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-4xl opacity-20">
          🎉✨🎊⭐✨
        </div>
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-white/20 mx-auto mb-2 flex items-center justify-center text-xs font-bold">
            A
          </div>
          <p className="text-xs text-white/60 uppercase tracking-wider">
            ACME CORP
          </p>
          <p className="text-sm text-white/80 mt-1">A gift from Sarah</p>
          <div className="mt-4 text-3xl">👟</div>
          <p className="font-semibold mt-2">Nike Air Max 90</p>
          <p className="text-xs text-white/60 mt-1 italic">
            &ldquo;Thanks for an incredible year! 🎉&rdquo;
          </p>
        </div>
      </div>
    ),
  },
  {
    num: 4,
    emoji: "📦",
    title: "Claim & Track",
    desc: "Both sender & recipient see status",
    mockup: (
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-green-500 text-lg">✓</span>
          <span className="font-semibold text-gray-900">Claim Your Gift</span>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-gray-400 block mb-1">
              Shipping Address
            </label>
            <div className="bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-600">
              123 Main St, San Francisco...
            </div>
          </div>
          <button className="w-full bg-purple-500 text-white rounded-xl py-3 text-sm font-semibold">
            Confirm & Ship 📦
          </button>
        </div>
      </div>
    ),
  },
];

export default function GiftExperience() {
  return (
    <section className="section-padding gradient-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <h2 className="headline-lg text-3xl md:text-5xl text-gray-900 mb-4">
            The gift experience that gets you{" "}
            <span className="gradient-text">remembered</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Every recipient gets a personalized, branded moment — not just a
            package on their doorstep.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={step.num} className={`reveal reveal-delay-${i + 1}`}>
              <div className="mb-4">
                <div className="step-number mb-3">{step.num}</div>
                {step.mockup}
              </div>
              <h3 className="font-bold text-gray-900 mt-3">{step.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

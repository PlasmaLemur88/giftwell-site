const steps = [
  {
    emoji: "⚡",
    title: "Install the app",
    desc: "One click from the Shopify App Store. No dev work, no code.",
  },
  {
    emoji: "🎨",
    title: "Configure your gifting bundles",
    desc: "Choose which products to offer. We handle the rest — pricing, fulfillment, everything.",
  },
  {
    emoji: "🚀",
    title: "Corporate orders roll in",
    desc: "HR teams find you, place bulk orders, and their recipients get a premium unwrapping experience.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section-padding bg-white" id="how-it-works">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-600 text-sm font-medium mb-4">
            Live in minutes, revenue in days
          </div>
          <h2 className="headline-lg text-3xl md:text-5xl text-gray-900">
            No dev work. No complex setup.{" "}
            <span className="gradient-text">Just results.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <div key={step.title} className={`card text-center reveal reveal-delay-${i + 1}`}>
              <div className="text-4xl mb-4">{step.emoji}</div>
              <div className="step-number mx-auto mb-4">{i + 1}</div>
              <h3 className="headline-md text-xl text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

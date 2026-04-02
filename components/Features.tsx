const features = [
  {
    emoji: "🎨",
    title: "Branded to you",
    desc: "Your colors, your logo, your products — not generic gift wrap.",
  },
  {
    emoji: "📅",
    title: "Schedule sends",
    desc: "Set it and forget it. Holiday gifts queued in October.",
  },
  {
    emoji: "💰",
    title: "Built-in revenue share",
    desc: "Free to install. We only win when you win.",
  },
];

export default function Features() {
  return (
    <section className="section-padding gradient-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="headline-lg text-3xl md:text-5xl text-gray-900 mb-4">
            Powerful features,{" "}
            <span className="gradient-text">easy revenue</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={f.title} className={`card text-center reveal reveal-delay-${i + 1}`}>
              <div className="text-4xl mb-4">{f.emoji}</div>
              <h3 className="headline-md text-xl text-gray-900 mb-3">
                {f.title}
              </h3>
              <p className="text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

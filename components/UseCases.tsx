const cases = [
  { emoji: "🏆", title: "Employee Appreciation", desc: "Celebrate wins, anniversaries, and everyday contributions" },
  { emoji: "🤝", title: "Client Thank Yous", desc: "Strengthen relationships with something more memorable than a fruit basket" },
  { emoji: "❄️", title: "Holiday Gifting", desc: "Send hundreds of holiday gifts without the spreadsheet nightmare" },
  { emoji: "📦", title: "New Hire Welcome Kits", desc: "Make day one special with branded swag and treats" },
  { emoji: "🎯", title: "Sales Incentives", desc: "Reward top performers with gifts they actually want" },
  { emoji: "🎉", title: "Event Giveaways", desc: "Turn conference attendees into brand advocates" },
];

export default function UseCases() {
  return (
    <section className="section-padding gradient-soft">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="headline-lg text-3xl md:text-5xl text-gray-900 mb-4">
            Perfect for every gifting moment{" "}
            <span className="text-3xl md:text-5xl">🎉</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cases.map((c, i) => (
            <div key={c.title} className={`emoji-card reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="text-3xl mb-3">{c.emoji}</div>
              <h3 className="font-bold text-gray-900 mb-1">{c.title}</h3>
              <p className="text-gray-500 text-sm">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

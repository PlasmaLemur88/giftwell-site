const oldWay = [
  "Spreadsheet formatting required",
  "Manual address collection",
  "Desktop only",
  "Support tickets land on your team",
  "No visibility into gift status",
  "Unclaimed gifts = accounting headache",
];

const newWay = [
  "Pre-populated everything — ready in 4 clicks",
  "AI-powered parsing — paste anything",
  "Mobile-first — works between meetings",
  "Concierge chat handles it — zero tickets for you",
  "Dashboards for gifters AND merchants",
  "Auto-converts after 30 days — clean books",
];

export default function Comparison() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="headline-lg text-3xl md:text-5xl text-gray-900 mb-4">
            We&apos;re not like other gifting apps{" "}
            <span className="text-3xl md:text-5xl">👀</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="comparison-old rounded-2xl p-6 reveal">
            <h3 className="font-bold text-gray-400 uppercase text-sm tracking-wider mb-4">
              The old way
            </h3>
            <ul className="space-y-3">
              {oldWay.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-500 text-sm">
                  <span className="text-red-400 mt-0.5">✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="comparison-new rounded-2xl p-6 reveal reveal-delay-1">
            <h3 className="font-bold text-purple-600 uppercase text-sm tracking-wider mb-4">
              The Giftwell way
            </h3>
            <ul className="space-y-3">
              {newWay.map((item) => (
                <li key={item} className="flex items-start gap-3 text-gray-700 text-sm">
                  <span className="text-green-500 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AIParsing() {
  return (
    <section className="section-padding bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="reveal">
          <h2 className="headline-lg text-3xl md:text-4xl text-gray-900 mb-4">
            No spreadsheets. No friction.{" "}
            <span className="gradient-text">No drop-off.</span>{" "}
            <span className="text-3xl">📋</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed mb-6">
            Corporate gifters have 300 recipients and zero patience for
            formatting. Giftwell lets them paste messy data from anywhere — we
            parse names, emails, and addresses automatically.
          </p>
          <p className="text-gray-500 text-lg leading-relaxed mb-6">
            No address? No problem. They can send with just an email and let
            recipients claim their gift.
          </p>
          <a href="#" className="btn-pill btn-dark text-sm">
            See how it works
          </a>
        </div>

        {/* Paste Demo */}
        <div className="reveal reveal-delay-2">
          <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                ✓ 500 <span className="text-green-300">imported in 4s</span>
              </div>
            </div>

            {/* Raw paste area */}
            <div className="bg-gray-800 rounded-lg p-3 mb-4 font-mono text-xs text-gray-400 leading-relaxed">
              <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-2">
                Raw paste
              </p>
              <p>john@acme.com, John Smith</p>
              <p>Sarah Chen sarah.chen@corp.io</p>
              <p>mike@company.com Mike Wilson</p>
              <p className="text-gray-600">...</p>
            </div>

            {/* Parsed results */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm mb-3">
                <div className="flex items-center gap-2 text-white">
                  <span>👥</span>
                  <span className="font-semibold">Recipients parsed</span>
                </div>
                <span className="text-green-400 text-xs font-medium">
                  500 ready
                </span>
              </div>

              {[
                { initial: "J", name: "John Smith", email: "john@acme.com" },
                { initial: "S", name: "Sarah Chen", email: "sarah.chen@corp.io" },
                { initial: "M", name: "Mike Wilson", email: "mike@company.com" },
              ].map((person) => (
                <div
                  key={person.email}
                  className="flex items-center gap-3 bg-gray-800 rounded-lg px-3 py-2"
                >
                  <div className="w-8 h-8 rounded-full bg-purple-500/30 flex items-center justify-center text-purple-300 text-xs font-bold">
                    {person.initial}
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">
                      {person.name}
                    </p>
                    <p className="text-gray-400 text-xs">{person.email}</p>
                  </div>
                  <span className="text-green-400">✓</span>
                </div>
              ))}

              <p className="text-gray-500 text-xs text-center mt-2">
                + 497 more recipients
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

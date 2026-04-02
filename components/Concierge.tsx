export default function Concierge() {
  return (
    <section className="section-padding gradient-soft">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 text-purple-600 text-sm font-medium mb-4">
            💬 Concierge Service
          </div>
          <h2 className="headline-lg text-3xl md:text-4xl text-gray-900 mb-4">
            Don&apos;t want to click around?{" "}
            <span className="gradient-text">We&apos;ll do it for you.</span>
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed mb-6">
            Some buyers just want to hand it off. Our concierge chat handles the
            entire order — so it never lands in your support queue.
          </p>
          <ul className="space-y-3">
            {[
              "Order configuration",
              "Recipient list wrangling",
              "Payment processing",
              "Follow-up questions",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-gray-600">
                <span className="text-green-500">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 text-sm font-medium">
            ✨ Zero support tickets for you
          </div>
        </div>

        {/* Chat Mockup */}
        <div className="reveal reveal-delay-2">
          <div className="bg-gray-900 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-700">
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm font-bold">
                G
              </div>
              <div>
                <p className="text-white font-semibold text-sm">
                  Giftwell Concierge
                </p>
                <p className="text-gray-400 text-xs">
                  Typically replies in minutes
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="chat-bubble chat-bubble-user">
                <p className="text-sm">
                  I need to send 200 gifts but my list is a mess
                </p>
              </div>
              <div className="chat-bubble chat-bubble-bot">
                <p className="text-sm">
                  No problem — just paste what you have and we&apos;ll take it
                  from here ✓
                </p>
              </div>
              <div className="chat-bubble chat-bubble-user">
                <p className="text-sm">Here&apos;s the spreadsheet</p>
              </div>
              <div className="chat-bubble chat-bubble-bot">
                <p className="text-sm">
                  Got it. 200 recipients parsed. Ready to checkout when you are.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 bg-gray-800 rounded-full px-4 py-2">
              <span className="text-gray-400 text-sm flex-1">
                Type a message...
              </span>
              <span>💬</span>
              <span>✨</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

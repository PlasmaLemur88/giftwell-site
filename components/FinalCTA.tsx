export default function FinalCTA() {
  return (
    <section className="gradient-hero section-padding text-center relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-pink-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        <h2 className="headline-xl text-white text-4xl md:text-6xl lg:text-7xl mb-6 reveal">
          They paste a list.
          <br />
          You get the sale.
          <br />
          Recipients get the{" "}
          <em className="not-italic">wow.</em>
        </h2>
        <p className="text-white/80 text-lg mb-10 reveal reveal-delay-1">
          Corporate gifting that works for everyone — finally.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal reveal-delay-2">
          <a href="#" className="btn-pill btn-primary text-base px-8 py-4">
            Install on Shopify
          </a>
          <a href="#" className="btn-pill btn-secondary text-base px-8 py-4">
            Book a Demo
          </a>
        </div>
      </div>
    </section>
  );
}

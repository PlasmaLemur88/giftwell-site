"use client";

import { useEffect, useRef, useState } from "react";

function AnimatedNumber({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="headline-lg text-4xl md:text-5xl gradient-text">
      {prefix}{value.toLocaleString()}{suffix}
    </div>
  );
}

const stats = [
  { target: 300, prefix: "$", suffix: "B+", label: "Corporate gifting market size" },
  { target: 94, suffix: "%", label: "Recipient engagement rate" },
  { target: 5, suffix: "x", label: "Higher engagement than standard emails" },
  { target: 2, suffix: " min", label: "Average checkout time" },
];

export default function Stats() {
  return (
    <section className="gradient-soft section-padding">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center reveal">
            <AnimatedNumber target={stat.target} prefix={stat.prefix} suffix={stat.suffix} />
            <p className="text-gray-500 text-sm mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const metrics = [
  {
    value: 500,
    suffix: "+",
    label: "Test Suites Delivered",
    sublabel: "Across web, API, mobile, and performance",
    color: "#6366f1",
  },
  {
    value: 100,
    suffix: "+",
    label: "Students Trained",
    sublabel: "Placed in QA roles worldwide",
    color: "#8b5cf6",
  },
  {
    value: 95,
    suffix: "%",
    label: "Defect Detection Rate",
    sublabel: "Before reaching production",
    color: "#06b6d4",
  },
  {
    value: 50,
    suffix: "+",
    label: "Products Tested",
    sublabel: "From startups to enterprise",
    color: "#10b981",
  },
];

function AnimatedCounter({
  target,
  suffix,
  color,
}: {
  target: number;
  suffix: string;
  color: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <div ref={ref} className="tabular-nums font-black text-5xl md:text-6xl" style={{ color }}>
      {count}
      <span className="text-4xl">{suffix}</span>
    </div>
  );
}

export default function MetricsSection() {
  return (
    <section id="metrics" className="py-28 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-indigo-950/10 to-[#030712]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-3 block">
            By the Numbers
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Results that speak for themselves
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              className="relative p-8 rounded-2xl border border-white/6 bg-white/[0.02] text-center overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6, borderColor: `${m.color}30` }}
            >
              {/* Background glow */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${m.color}08 0%, transparent 70%)`,
                }}
              />

              {/* Pulse rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                {[1, 2, 3].map((ring) => (
                  <motion.div
                    key={ring}
                    className="absolute rounded-full border"
                    style={{ borderColor: `${m.color}15` }}
                    animate={{
                      width: [40, 120 + ring * 30],
                      height: [40, 120 + ring * 30],
                      opacity: [0.6, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: ring * 0.8,
                      ease: "easeOut",
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10">
                <AnimatedCounter target={m.value} suffix={m.suffix} color={m.color} />
                <div className="text-base font-semibold text-white mt-3 mb-1">{m.label}</div>
                <div className="text-xs text-slate-500 leading-snug">{m.sublabel}</div>

                {/* Bottom bar */}
                <div className="mt-5 h-0.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: m.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.3 + i * 0.1 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional social proof */}
        <motion.div
          className="mt-16 grid grid-cols-3 md:grid-cols-6 gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {[
            { label: "Years Active", value: "3+" },
            { label: "Industries", value: "8+" },
            { label: "Frameworks", value: "15+" },
            { label: "Countries", value: "6" },
            { label: "Automation Hours", value: "12k+" },
            { label: "Bugs Caught", value: "25k+" },
          ].map((item) => (
            <div key={item.label} className="text-center py-4 px-3 rounded-xl border border-white/5 bg-white/[0.015]">
              <div className="text-lg font-bold text-slate-200">{item.value}</div>
              <div className="text-[10px] text-slate-600 mt-0.5">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

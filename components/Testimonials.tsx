"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Chidi Eze",
    role: "CTO",
    company: "FinTechPro",
    text: "PisonQALab embedded with our team during our Series A product launch. They found 47 critical bugs in 3 days that our internal team had missed. Absolutely saved our launch.",
    stars: 5,
    highlight: "47 critical bugs caught pre-launch",
    avatar: "CE",
    color: "#6366f1",
  },
  {
    name: "Yetunde Adebayo",
    role: "VP Engineering",
    company: "PaySwift",
    text: "Their API testing service is next-level. We now have 98% API coverage and our contract tests catch breaking changes before they ever hit staging. Game changer.",
    stars: 5,
    highlight: "98% API coverage achieved",
    avatar: "YA",
    color: "#8b5cf6",
  },
  {
    name: "Marcus Osei",
    role: "Head of QA",
    company: "HealthNet",
    text: "TestCatalyst transformed how we manage test cases. What used to take a QA team 2 weeks to write, the AI generates in 20 minutes — with better coverage.",
    stars: 5,
    highlight: "2 weeks → 20 minutes with AI",
    avatar: "MO",
    color: "#06b6d4",
  },
  {
    name: "Amina Bello",
    role: "Engineering Manager",
    company: "CloudScale",
    text: "The Academy training for our junior engineers was transformative. Three months in, they're shipping automation that our senior devs respect. Incredible investment.",
    stars: 5,
    highlight: "Junior engineers shipping automation",
    avatar: "AB",
    color: "#10b981",
  },
  {
    name: "David Mensah",
    role: "Founder & CEO",
    company: "DataStream",
    text: "We had zero QA process. PisonQALab built us an entire quality infrastructure in 6 weeks — automated, integrated into GitHub Actions, with real dashboards. Transformed us.",
    stars: 5,
    highlight: "Zero to full QA infra in 6 weeks",
    avatar: "DM",
    color: "#f59e0b",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const goTo = (idx: number, dir: number) => {
    setDirection(dir);
    setCurrent(idx);
  };

  const next = () => goTo((current + 1) % testimonials.length, 1);
  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length, -1);

  useEffect(() => {
    timerRef.current = setTimeout(next, 5000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current]);

  const t = testimonials[current];

  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-slate-950/60 to-[#030712]" />

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-3 block">
            Client Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Trusted by engineering teams
            <br />
            <span className="gradient-text">across Africa and beyond</span>
          </h2>
        </motion.div>

        {/* Main testimonial */}
        <div className="relative min-h-64">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -80 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="relative"
            >
              <div className="relative p-8 md:p-12 rounded-3xl border border-white/8 overflow-hidden"
                style={{ background: "rgba(15,23,42,0.6)" }}
              >
                {/* Background glow */}
                <div
                  className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${t.color}10 0%, transparent 70%)`,
                    transform: "translate(30%, -30%)",
                  }}
                />

                {/* Quote icon */}
                <Quote
                  size={48}
                  className="absolute top-6 right-8 opacity-5 text-white"
                />

                {/* Highlight badge */}
                <div
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
                  style={{
                    background: `${t.color}15`,
                    color: t.color,
                    border: `1px solid ${t.color}25`,
                  }}
                >
                  <span>✦</span>
                  {t.highlight}
                </div>

                <p className="text-xl md:text-2xl text-slate-200 leading-relaxed font-light mb-8 relative z-10">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}80)` }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{t.name}</div>
                      <div className="text-sm text-slate-400">
                        {t.role} · {t.company}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-1">
                    {Array.from({ length: t.stars }).map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-xl border border-white/10 hover:border-white/20 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 hover:bg-white/5"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                className="transition-all duration-300"
                aria-label={`Go to testimonial ${i + 1}`}
              >
                <motion.div
                  animate={{
                    width: i === current ? 24 : 8,
                    background: i === current ? testimonials[i].color : "#374151",
                  }}
                  className="h-2 rounded-full"
                />
              </button>
            ))}
          </div>

          <button
            onClick={next}
            className="w-10 h-10 rounded-xl border border-white/10 hover:border-white/20 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200 hover:bg-white/5"
            aria-label="Next testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Additional mini cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {[
            { metric: "3 days", label: "Average onboarding time", color: "#6366f1" },
            { metric: "2-5x", label: "Typical coverage improvement", color: "#8b5cf6" },
            { metric: "100%", label: "Client satisfaction rate", color: "#10b981" },
          ].map((item) => (
            <div
              key={item.label}
              className="text-center p-5 rounded-xl border border-white/5 bg-white/[0.015]"
            >
              <div className="text-2xl font-bold mb-1" style={{ color: item.color }}>
                {item.metric}
              </div>
              <div className="text-xs text-slate-500">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Tunde Adesanya", role: "VP Engineering", company: "Interswitch",
    text: "PisonQALab embedded with our team ahead of a major platform release. They uncovered 47 critical defects in under 3 days that our internal team had missed entirely. They absolutely saved the launch.",
    stars: 5, highlight: "47 critical bugs caught pre-launch", avatar: "IS", color: "#FF6B35",
  },
  {
    name: "Chika Okonkwo", role: "Head of Engineering", company: "Flutterwave",
    text: "Their API testing coverage is exceptional. We now run contract tests across every payment endpoint — breaking changes are caught before they ever touch staging. An absolute game changer for our release confidence.",
    stars: 5, highlight: "98% API coverage achieved", avatar: "FW", color: "#F5A623",
  },
  {
    name: "Emeka Nwosu", role: "Head of QA", company: "Qore",
    text: "TestCatalyst completely changed how we write and manage test cases. What used to take our QA team two weeks to produce, the AI generates in 20 minutes — with better traceability and higher coverage.",
    stars: 5, highlight: "2 weeks → 20 minutes with AI", avatar: "QR", color: "#6366f1",
  },
  {
    name: "Adaeze Ike", role: "Engineering Manager", company: "BeyondCredit",
    text: "The corporate training PisonQALab delivered to our junior engineers was transformative. Three months in, they are shipping automation frameworks our senior developers genuinely respect. Incredible ROI.",
    stars: 5, highlight: "Junior engineers shipping automation", avatar: "BC", color: "#10b981",
  },
  {
    name: "Seun Falola", role: "CTO", company: "OPay",
    text: "We came in with almost no QA process. PisonQALab built a complete quality infrastructure in 6 weeks — fully automated, integrated into our GitHub Actions pipeline, with real-time dashboards. Transformative.",
    stars: 5, highlight: "Zero to full QA infra in 6 weeks", avatar: "OP", color: "#22c55e",
  },
  {
    name: "Bayo Adeleke", role: "Director of Engineering", company: "Moniepoint",
    text: "The performance testing engagement ahead of our year-end peak season was invaluable. They stress-tested our infrastructure to 10x normal load and surfaced three critical bottlenecks we had no idea existed.",
    stars: 5, highlight: "10x load tested, 3 bottlenecks resolved", avatar: "MP", color: "#3b82f6",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const goTo = (idx: number, dir: number) => { setDirection(dir); setCurrent(idx); };
  const next = () => goTo((current + 1) % testimonials.length, 1);
  const prev = () => goTo((current - 1 + testimonials.length) % testimonials.length, -1);

  useEffect(() => {
    timerRef.current = setTimeout(next, 5000);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [current]);

  const t = testimonials[current];

  return (
    <section className="py-28 px-6 relative overflow-hidden bg-slate-50">
      <div className="absolute inset-0 dot-pattern opacity-25" />

      <div className="max-w-5xl mx-auto relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-3 block">
            Client Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
            What our clients
            <br />
            <span className="gradient-text">say about us</span>
          </h2>
        </motion.div>

        <div className="relative min-h-64">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -80 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="relative p-8 md:p-12 rounded-3xl border border-slate-100 bg-white shadow-sm overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${t.color}06 0%, transparent 70%)`, transform: "translate(30%, -30%)" }} />

                <Quote size={48} className="absolute top-6 right-8 opacity-5 text-slate-900" />

                <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
                  style={{ background: `${t.color}10`, color: t.color, border: `1px solid ${t.color}20` }}>
                  <span>✦</span>
                  {t.highlight}
                </div>

                <p className="text-xl md:text-2xl text-slate-700 leading-relaxed font-light mb-8 relative z-10">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}90)` }}>
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{t.name}</div>
                      <div className="text-sm text-slate-400">{t.role} · {t.company}</div>
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

        <div className="flex items-center justify-between mt-8">
          <button onClick={prev}
            className="w-10 h-10 rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all duration-200 hover:bg-slate-50"
            aria-label="Previous testimonial">
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => goTo(i, i > current ? 1 : -1)} aria-label={`Go to testimonial ${i + 1}`}>
                <motion.div
                  animate={{ width: i === current ? 24 : 8, background: i === current ? testimonials[i].color : "#e2e8f0" }}
                  className="h-2 rounded-full"
                />
              </button>
            ))}
          </div>

          <button onClick={next}
            className="w-10 h-10 rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all duration-200 hover:bg-slate-50"
            aria-label="Next testimonial">
            <ChevronRight size={18} />
          </button>
        </div>

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
            <div key={item.label} className="text-center p-5 rounded-xl border border-slate-100 bg-white shadow-sm">
              <div className="text-2xl font-bold mb-1" style={{ color: item.color }}>{item.metric}</div>
              <div className="text-xs text-slate-400">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

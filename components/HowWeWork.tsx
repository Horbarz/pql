"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, PenTool, FlaskConical, Rocket } from "lucide-react";

const phases = [
  {
    number: "01", icon: Search, title: "Discover", color: "#6366f1",
    subtitle: "Understand your quality landscape",
    description: "We audit your current testing coverage, CI pipeline, team structure, and risk areas. You get a clear QA health report with prioritized gaps within 48 hours.",
    deliverables: ["QA Health Audit", "Risk Matrix", "Coverage Gap Report", "Tooling Recommendations"],
  },
  {
    number: "02", icon: PenTool, title: "Design", color: "#8b5cf6",
    subtitle: "Blueprint your quality strategy",
    description: "We co-create a testing strategy tailored to your stack, release cadence, and team size. This includes test plans, automation framework design, and CI quality gates.",
    deliverables: ["Test Strategy Doc", "Automation Architecture", "CI/CD Quality Gates", "Test Plan Templates"],
  },
  {
    number: "03", icon: FlaskConical, title: "Test", color: "#06b6d4",
    subtitle: "Execute with precision",
    description: "Our team embeds with yours to execute manual, automated, API, performance, and security tests. You get daily progress updates and real-time defect triage.",
    deliverables: ["Test Execution Reports", "Defect Triage", "Coverage Metrics", "Performance Baselines"],
  },
  {
    number: "04", icon: Rocket, title: "Launch", color: "#10b981",
    subtitle: "Ship with confidence",
    description: "Post-launch monitoring, regression suites, and continuous improvement cycles ensure your quality scales as you ship. We handoff or stay on as your ongoing QA partner.",
    deliverables: ["Launch Readiness Report", "Regression Suite", "KPI Dashboard", "Ongoing SLA"],
  },
];

export default function HowWeWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  return (
    <section id="how-we-work" className="py-28 px-6 relative overflow-hidden bg-slate-50" ref={containerRef}>
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <motion.div
        className="absolute left-1/2 rounded-full pointer-events-none"
        style={{
          width: "600px", height: "600px",
          background: "radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)",
          x: "-50%",
          y: useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]),
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-3 block">
            Our Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            How we work
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            A proven four-phase engagement model that delivers measurable quality improvement from day one.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 md:-translate-x-0.5 top-0 bottom-0 w-px hidden md:block">
            <motion.div
              className="h-full w-full origin-top"
              style={{
                background: "linear-gradient(180deg, #6366f1, #8b5cf6, #06b6d4, #10b981)",
                scaleY: useTransform(scrollYProgress, [0.1, 0.9], [0, 1]),
              }}
            />
          </div>

          <div className="flex flex-col gap-16">
            {phases.map((phase, i) => {
              const Icon = phase.icon;
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={phase.number}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-8 ${isEven ? "md:flex-row" : "md:flex-row-reverse"}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7 }}
                >
                  <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <div className={`flex items-center gap-3 mb-3 ${isEven ? "md:flex-row-reverse" : ""}`}>
                      <span className="text-4xl font-black tracking-tighter" style={{ color: `${phase.color}25` }}>
                        {phase.number}
                      </span>
                      <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: phase.color }}>
                        {phase.subtitle}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{phase.title}</h3>
                    <p className="text-slate-500 leading-relaxed mb-4">{phase.description}</p>
                    <div className={`flex flex-wrap gap-2 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                      {phase.deliverables.map((d) => (
                        <span key={d} className="text-xs px-2.5 py-1 rounded-md font-medium"
                          style={{ background: `${phase.color}10`, color: phase.color, border: `1px solid ${phase.color}20` }}>
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white shadow-md"
                      style={{ border: `2px solid ${phase.color}25` }}
                      whileHover={{ scale: 1.15, boxShadow: `0 8px 30px ${phase.color}25` }}
                    >
                      <Icon size={24} style={{ color: phase.color }} />
                    </motion.div>
                  </div>

                  <div className="flex-1 hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, Award, TrendingUp, Star, ArrowRight, Play } from "lucide-react";

const timeline = [
  {
    phase: "Month 1",
    title: "Foundations",
    desc: "SDLC, testing types, bug lifecycle, test documentation, JIRA basics.",
    color: "#6366f1",
    icon: "🧱",
  },
  {
    phase: "Month 2",
    title: "Test Automation",
    desc: "Selenium, Cypress, Playwright. Page Object Model, assertions, CI integration.",
    color: "#8b5cf6",
    icon: "⚙️",
  },
  {
    phase: "Month 3",
    title: "API & Performance",
    desc: "Postman, REST Assured, k6 load testing, contract testing, schema validation.",
    color: "#06b6d4",
    icon: "🔗",
  },
  {
    phase: "Month 4",
    title: "Advanced QA",
    desc: "Mobile testing, security basics, AI test tools, real-world project capstone.",
    color: "#10b981",
    icon: "🚀",
  },
];

const outcomes = [
  { label: "Graduates Hired", value: "94%", color: "#10b981" },
  { label: "Avg Salary Increase", value: "68%", color: "#6366f1" },
  { label: "Completion Rate", value: "89%", color: "#8b5cf6" },
  { label: "Employer NPS", value: "92", color: "#06b6d4" },
];

const testimonials = [
  {
    name: "Adaeze Okonkwo",
    role: "QA Engineer, NeoBank",
    text: "I went from zero testing knowledge to landing a QA role at a fintech company in 5 months. The real-world projects made all the difference.",
    avatar: "AO",
    stars: 5,
  },
  {
    name: "Samuel Adetunji",
    role: "Senior Automation Engineer",
    text: "The mentorship at PisonQA is unmatched. My mentor had 10+ years of industry experience and guided me through my first automation framework.",
    avatar: "SA",
    stars: 5,
  },
  {
    name: "Funmi Balogun",
    role: "QA Lead, CloudScale",
    text: "Took the corporate training for my team. Within 2 months, our test coverage went from 40% to 81%. Incredible ROI.",
    avatar: "FB",
    stars: 5,
  },
];

export default function AcademySection() {
  return (
    <section id="academy" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-slate-950/80 to-[#030712]" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-violet-400 uppercase mb-4 px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5">
            <BookOpen size={12} />
            QA Academy
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
            Your journey from
            <br />
            <span className="gradient-text">beginner to QA pro</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Structured curriculum, industry mentors, real-world projects, and a community that
            keeps growing even after you graduate.
          </p>
        </motion.div>

        {/* Outcome stats */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {outcomes.map((o, i) => (
            <motion.div
              key={o.label}
              className="text-center p-6 rounded-2xl border border-white/6 bg-white/[0.02]"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4, borderColor: `${o.color}40` }}
            >
              <div className="text-3xl font-bold mb-1" style={{ color: o.color }}>
                {o.value}
              </div>
              <div className="text-xs text-slate-400">{o.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Curriculum timeline */}
        <div className="mb-20">
          <motion.h3
            className="text-2xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            4-Month Curriculum Roadmap
          </motion.h3>

          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-10 left-0 right-0 h-0.5 hidden lg:block" style={{
              background: "linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4, #10b981)"
            }} />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-4">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.phase}
                  className="relative flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                >
                  {/* Circle node */}
                  <motion.div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mb-5 relative z-10"
                    style={{
                      background: `${item.color}15`,
                      border: `2px solid ${item.color}40`,
                    }}
                    whileHover={{
                      scale: 1.1,
                      boxShadow: `0 0 30px ${item.color}40`,
                    }}
                  >
                    {item.icon}
                    <div
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[#030712]"
                      style={{ background: item.color }}
                    />
                  </motion.div>

                  <span
                    className="text-xs font-semibold tracking-wide uppercase mb-1"
                    style={{ color: item.color }}
                  >
                    {item.phase}
                  </span>
                  <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Offerings */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {[
            {
              icon: Users,
              title: "1-on-1 Mentorship",
              desc: "Weekly sessions with senior QA engineers from leading tech companies.",
              color: "#6366f1",
            },
            {
              icon: Award,
              title: "Certification Prep",
              desc: "ISTQB, AWS testing certifications, and company-issued PisonQA badges.",
              color: "#8b5cf6",
            },
            {
              icon: TrendingUp,
              title: "Corporate Training",
              desc: "Bespoke training programs designed around your team's stack and goals.",
              color: "#06b6d4",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                className="p-6 rounded-2xl border border-white/6 bg-white/[0.02] hover:border-white/12 transition-all duration-300 group"
                whileHover={{ y: -4 }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                >
                  <Icon size={22} style={{ color: item.color }} />
                </div>
                <h4 className="text-base font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-xl font-bold text-white text-center mb-8">Student Stories</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                className="p-6 rounded-2xl border border-white/6 bg-white/[0.02]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -2, borderColor: "rgba(99,102,241,0.25)" }}
              >
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} size={12} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-4 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <a
            href="#contact"
            className="group flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #6366f1)" }}
          >
            Enroll Now
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-slate-300 border border-white/10 hover:border-white/20 hover:text-white transition-all duration-300"
          >
            <Play size={14} />
            Watch Intro
          </a>
        </motion.div>
      </div>
    </section>
  );
}

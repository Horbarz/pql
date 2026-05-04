"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Globe, Smartphone, Gauge, ShieldCheck, GitBranch, Braces, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Bot,
    title: "Test Automation",
    tagline: "Scale your coverage 10x",
    description: "Framework-agnostic automation built for scale. We design robust test suites using Playwright, Cypress, Selenium, and Appium — integrated into your CI pipeline from day one.",
    features: ["Playwright & Cypress", "Framework design", "CI/CD integration", "Parallel execution"],
    color: "#6366f1",
  },
  {
    icon: Braces,
    title: "API Testing",
    tagline: "Contract & load tested",
    description: "End-to-end API validation covering functional correctness, schema contracts, security headers, and performance under load. We test REST, GraphQL, and gRPC interfaces.",
    features: ["Postman & Newman", "GraphQL coverage", "Contract testing", "Schema validation"],
    color: "#8b5cf6",
  },
  {
    icon: Smartphone,
    title: "Mobile Testing",
    tagline: "iOS & Android covered",
    description: "Real-device and emulator-based testing across iOS and Android. We cover gesture flows, biometrics, offline behavior, and cross-device pixel-perfect consistency.",
    features: ["Appium & XCTest", "Real device farms", "Accessibility checks", "Cross-platform"],
    color: "#06b6d4",
  },
  {
    icon: Gauge,
    title: "Performance Testing",
    tagline: "Find limits before users do",
    description: "Load, stress, and spike testing to identify bottlenecks before production. We simulate thousands of concurrent users and deliver actionable performance reports.",
    features: ["k6 & JMeter", "Load profiling", "Bottleneck analysis", "SLA validation"],
    color: "#f59e0b",
  },
  {
    icon: ShieldCheck,
    title: "Security Testing",
    tagline: "OWASP top 10 coverage",
    description: "OWASP-aligned security assessments including penetration testing, vulnerability scanning, and secure code review. Protect your users before attackers find the gaps.",
    features: ["OWASP top 10", "Pentest reports", "SAST/DAST", "Auth testing"],
    color: "#ef4444",
  },
  {
    icon: Globe,
    title: "Web App Testing",
    tagline: "Every browser, every viewport",
    description: "Comprehensive web testing across browsers, viewports, and user flows. We cover functional, regression, accessibility (WCAG), and visual consistency.",
    features: ["Cross-browser", "WCAG compliance", "Visual regression", "E2E flows"],
    color: "#10b981",
  },
  {
    icon: GitBranch,
    title: "CI/CD Quality Integration",
    tagline: "Quality gates at every commit",
    description: "Embed quality gates directly into your delivery pipeline. We configure automated test triggers, coverage thresholds, and rollback policies across GitHub Actions, Jenkins, and GitLab CI.",
    features: ["GitHub Actions", "Quality gates", "Coverage gates", "Auto rollback"],
    color: "#a78bfa",
  },
];

export default function ServicesSection() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="services" className="py-28 px-6 relative overflow-hidden bg-white">
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-3 block">
            QA Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Everything your product
            <br />
            <span className="gradient-text">needs to ship confident</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">
            Full-spectrum quality assurance — from unit-level automation to enterprise-scale
            performance and security testing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            const isActive = active === i;

            return (
              <motion.div
                key={svc.title}
                className="relative rounded-2xl border overflow-hidden cursor-pointer group transition-all duration-300"
                style={{
                  background: isActive ? `${svc.color}05` : "#ffffff",
                  borderColor: isActive ? `${svc.color}30` : "#f1f5f9",
                  boxShadow: isActive ? `0 8px 32px ${svc.color}15` : "0 1px 4px rgba(0,0,0,0.04)",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                onHoverStart={() => setActive(i)}
                onHoverEnd={() => setActive(null)}
                whileHover={{ y: -4 }}
              >
                <div className="p-6">
                  <motion.div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${svc.color}12`, border: `1px solid ${svc.color}20` }}
                    animate={{ boxShadow: isActive ? `0 0 20px ${svc.color}30` : "none" }}
                    transition={{ duration: 0.3 }}
                  >
                    <Icon size={22} style={{ color: svc.color }} />
                  </motion.div>

                  <div className="mb-3">
                    <h3 className="text-base font-semibold text-slate-900 mb-0.5">{svc.title}</h3>
                    <span className="text-xs font-medium" style={{ color: svc.color }}>
                      {svc.tagline}
                    </span>
                  </div>

                  <p className="text-sm text-slate-500 leading-relaxed mb-4">{svc.description}</p>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-100 mb-4">
                          {svc.features.map((f) => (
                            <div key={f} className="flex items-center gap-1.5">
                              <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: svc.color }} />
                              <span className="text-xs text-slate-500">{f}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center gap-1.5 text-xs font-medium group-hover:gap-2.5 transition-all duration-200" style={{ color: svc.color }}>
                    Learn more <ArrowRight size={12} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-slate-700 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 group"
          >
            Get a Custom QA Strategy
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

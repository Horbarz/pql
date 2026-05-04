"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, GitMerge, BarChart3, Bug, ArrowRight, Check, Zap, ChevronRight } from "lucide-react";

const features = [
  { icon: Sparkles, title: "AI Test Generation", desc: "Generate comprehensive test cases from requirements, user stories, or Figma designs in seconds.", color: "#6366f1" },
  { icon: GitMerge, title: "Jira Sync", desc: "Bi-directional sync with Jira — test cases auto-link to issues, defects create tickets automatically.", color: "#8b5cf6" },
  { icon: BarChart3, title: "Coverage Analytics", desc: "Real-time automation coverage heatmaps, trending pass rates, and flaky test detection.", color: "#06b6d4" },
  { icon: Bug, title: "Bug Intelligence", desc: "AI clusters similar defects, predicts regression risk, and surfaces root cause patterns.", color: "#ef4444" },
];

const aiTestCases = [
  { id: "TC-001", name: "User login with valid credentials", priority: "High", status: "pass" },
  { id: "TC-002", name: "Password reset flow end-to-end", priority: "High", status: "pass" },
  { id: "TC-003", name: "Session timeout after inactivity", priority: "Medium", status: "running" },
  { id: "TC-004", name: "OAuth social login (Google)", priority: "High", status: "pass" },
  { id: "TC-005", name: "Invalid token rejection (401)", priority: "Critical", status: "fail" },
  { id: "TC-006", name: "Rate limiting on auth endpoints", priority: "Medium", status: "pending" },
];

const statusColors: Record<string, string> = { pass: "#10b981", fail: "#ef4444", running: "#f59e0b", pending: "#94a3b8" };
const priorityColors: Record<string, string> = { Critical: "#ef4444", High: "#f59e0b", Medium: "#6366f1", Low: "#10b981" };

function DashboardMockup() {
  const [currentLine, setCurrentLine] = useState(0);
  const [generatedCount, setGeneratedCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setCurrentLine((l) => (l + 1) % aiTestCases.length), 1200);
    const counter = setInterval(() => setGeneratedCount((c) => Math.min(c + 7, 247)), 80);
    return () => { clearInterval(interval); clearInterval(counter); };
  }, []);

  return (
    <div className="w-full rounded-2xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-100 bg-white">
      <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 bg-slate-50">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <span className="text-xs text-slate-400 ml-2 font-mono">TestCatalyst Dashboard</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-green-600 font-medium">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-4 divide-x divide-slate-100 border-b border-slate-100">
        {[
          { label: "AI Generated", value: `${generatedCount}`, color: "#6366f1" },
          { label: "Pass Rate", value: "96.4%", color: "#10b981" },
          { label: "Coverage", value: "87%", color: "#8b5cf6" },
          { label: "Open Bugs", value: "12", color: "#ef4444" },
        ].map((stat) => (
          <div key={stat.label} className="px-4 py-3 text-center">
            <div className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles size={13} className="text-indigo-500" />
            <span className="text-xs font-medium text-slate-700">AI-Generated Test Suite</span>
          </div>
          <motion.span
            className="text-[10px] px-2 py-0.5 rounded-full text-indigo-600 bg-indigo-50 border border-indigo-100 font-medium"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Generating...
          </motion.span>
        </div>

        <div className="space-y-1.5">
          {aiTestCases.map((tc, i) => (
            <motion.div
              key={tc.id}
              className="flex items-center gap-3 px-3 py-2 rounded-lg border transition-all duration-300"
              animate={{
                background: i === currentLine ? "rgba(99,102,241,0.04)" : "#fafafa",
                borderColor: i === currentLine ? "rgba(99,102,241,0.2)" : "#f1f5f9",
              }}
            >
              <span className="text-[10px] font-mono text-slate-400 w-12 flex-shrink-0">{tc.id}</span>
              <span className="text-xs text-slate-600 flex-1 truncate">{tc.name}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-medium flex-shrink-0"
                style={{ color: priorityColors[tc.priority], background: `${priorityColors[tc.priority]}12` }}>
                {tc.priority}
              </span>
              <div className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: statusColors[tc.status], boxShadow: tc.status === "running" ? `0 0 6px ${statusColors[tc.status]}` : "none" }} />
            </motion.div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-slate-400">Automation Coverage</span>
            <span className="text-xs font-mono text-indigo-500">87% / 100%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)" }}
              initial={{ width: 0 }}
              animate={{ width: "87%" }}
              transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestCatalystSection() {
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setActiveFeature((f) => (f + 1) % features.length), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testcatalyst" className="py-28 px-6 relative overflow-hidden bg-slate-50">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-200 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-100 bg-indigo-50 mb-6">
            <Zap size={14} className="text-indigo-500 fill-indigo-500" />
            <span className="text-xs font-semibold text-indigo-600 tracking-wide">AI-Powered Platform</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tight mb-5">
            Introducing{" "}
            <span className="gradient-text">TestCatalyst</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            The intelligent test management platform that turns requirements into test cases,
            bugs into insights, and pipelines into quality gates.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-indigo-100/50 to-violet-100/50 blur-xl" />
            <DashboardMockup />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-4"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Intelligence built into every workflow
            </h3>

            {features.map((feat, i) => {
              const Icon = feat.icon;
              const isActive = activeFeature === i;
              return (
                <motion.div
                  key={feat.title}
                  className="flex gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-300"
                  style={{
                    borderColor: isActive ? `${feat.color}30` : "#f1f5f9",
                    background: isActive ? `${feat.color}06` : "#ffffff",
                    boxShadow: isActive ? `0 4px 20px ${feat.color}12` : "none",
                  }}
                  onClick={() => setActiveFeature(i)}
                  whileHover={{ x: 4 }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${feat.color}12`, border: `1px solid ${feat.color}20` }}>
                    <Icon size={18} style={{ color: feat.color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-slate-800">{feat.title}</h4>
                      {isActive && (
                        <motion.span className="text-[10px] px-1.5 py-0.5 rounded-full font-medium"
                          style={{ background: `${feat.color}12`, color: feat.color }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}>
                          Active
                        </motion.span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">{feat.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {[
            "Requirement-to-test traceability",
            "Figma vs. API visual validation",
            "Flaky test detection & healing",
            "Multi-team access controls",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2 p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
              <div className="w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check size={11} className="text-indigo-500" />
              </div>
              <span className="text-sm text-slate-600">{item}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-10 py-4 rounded-xl font-semibold text-white text-lg transition-all duration-300 hover:shadow-xl hover:shadow-indigo-200 hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            See TestCatalyst in Action
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <p className="text-xs text-slate-400 mt-3">No credit card required · Free 14-day trial</p>
        </motion.div>
      </div>
    </section>
  );
}

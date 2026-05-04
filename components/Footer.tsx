"use client";

import { motion } from "framer-motion";
import { ExternalLink, Globe, Mail, MessageSquare, Video } from "lucide-react";
import { LogoIcon } from "./Logo";

const links = {
  Services: ["Test Automation", "API Testing", "Mobile Testing", "Performance Testing", "Security Testing", "CI/CD Integration"],
  TestCatalyst: ["AI Test Generation", "Jira Integration", "Coverage Analytics", "Bug Intelligence", "Pricing", "Changelog"],
  Academy: ["QA Fundamentals", "Automation Track", "API & Performance", "Mentorship", "Corporate Training", "Certifications"],
  Company: ["About Us", "Blog", "Case Studies", "Careers", "Press", "Contact"],
};

const socials = [
  { icon: MessageSquare, label: "X / Twitter", href: "#" },
  { icon: Globe, label: "LinkedIn", href: "#" },
  { icon: ExternalLink, label: "GitHub", href: "#" },
  { icon: Video, label: "YouTube", href: "#" },
  { icon: Mail, label: "Email", href: "mailto:hello@pisonqalab.com" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-100 bg-white">
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 py-16 border-b border-slate-100">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <LogoIcon size={32} />
              <span className="text-base font-bold tracking-tight text-slate-900">
                Pison<span className="text-indigo-500">QA</span>Lab
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Engineering confidence. Accelerating quality. From world-class QA to AI-powered
              testing and elite training.
            </p>
            <div className="flex gap-2">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a key={s.label} href={s.href} aria-label={s.label}
                    className="w-8 h-8 rounded-lg border border-slate-200 hover:border-indigo-300 flex items-center justify-center text-slate-400 hover:text-indigo-500 transition-all duration-200 hover:bg-indigo-50">
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </div>

          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold tracking-widest text-slate-800 uppercase mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-slate-400 hover:text-slate-700 transition-colors duration-200">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-10 border-b border-slate-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-base font-semibold text-slate-900 mb-1">Stay in the quality loop</h4>
              <p className="text-sm text-slate-500">QA insights, industry news, and TestCatalyst updates — weekly.</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto" suppressHydrationWarning>
              <input type="email" placeholder="your@email.com"
                suppressHydrationWarning
                className="flex-1 md:w-64 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-300 outline-none text-sm text-slate-800 placeholder-slate-400 transition-colors" />
              <button suppressHydrationWarning
                className="px-5 py-2.5 rounded-xl font-medium text-sm text-white transition-all duration-200 hover:opacity-90 flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-8">
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} PisonQALab. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a key={item} href="#" className="text-xs text-slate-400 hover:text-slate-600 transition-colors">{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-slate-400">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

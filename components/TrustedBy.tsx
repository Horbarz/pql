"use client";

import { motion } from "framer-motion";

const clients = [
  { name: "Interswitch", initials: "IS", color: "#FF6B35", bg: "rgba(255,107,53,0.08)", border: "rgba(255,107,53,0.2)", sector: "Payments Infrastructure" },
  { name: "Flutterwave", initials: "FW", color: "#F5A623", bg: "rgba(245,166,35,0.08)", border: "rgba(245,166,35,0.2)", sector: "Payment Gateway" },
  { name: "Qore", initials: "QR", color: "#6366f1", bg: "rgba(99,102,241,0.08)", border: "rgba(99,102,241,0.2)", sector: "Core Banking" },
  { name: "BeyondCredit", initials: "BC", color: "#10b981", bg: "rgba(16,185,129,0.08)", border: "rgba(16,185,129,0.2)", sector: "Digital Lending" },
  { name: "OPay", initials: "OP", color: "#22c55e", bg: "rgba(34,197,94,0.08)", border: "rgba(34,197,94,0.2)", sector: "Mobile Finance" },
  { name: "Moniepoint", initials: "MP", color: "#3b82f6", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.2)", sector: "Business Banking" },
];

function ClientCard({ name, initials, color, bg, border, sector }: (typeof clients)[0]) {
  return (
    <motion.div
      className="flex-shrink-0 mx-3 flex items-center gap-3 px-5 py-3.5 rounded-xl border border-slate-100 bg-white transition-all duration-300 group shadow-sm"
      whileHover={{ y: -2, borderColor: border, background: bg }}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0"
        style={{ background: bg, border: `1px solid ${border}`, color }}
      >
        {initials}
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors whitespace-nowrap leading-tight">
          {name}
        </p>
        <p className="text-[10px] text-slate-400 tracking-wide">{sector}</p>
      </div>
    </motion.div>
  );
}

export default function TrustedBy() {
  return (
    <section className="py-20 overflow-hidden relative bg-slate-50">
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <motion.div
        className="relative text-center mb-12 px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-xs font-semibold text-slate-400 tracking-widest uppercase mb-3">
          Trusted by Africa&apos;s leading fintechs
        </p>
        <p className="text-slate-500 text-sm max-w-md mx-auto">
          Engineering quality for the teams building the future of African finance and technology.
        </p>
      </motion.div>

      <div className="relative overflow-hidden mb-4">
        <div className="flex" style={{ animation: "marquee 22s linear infinite" }}>
          {[...clients, ...clients, ...clients].map((c, i) => (
            <ClientCard key={`${c.name}-${i}`} {...c} />
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex" style={{ animation: "marquee-reverse 28s linear infinite" }}>
          {[...[...clients].reverse(), ...[...clients].reverse(), ...[...clients].reverse()].map((c, i) => (
            <ClientCard key={`${c.name}-r-${i}`} {...c} />
          ))}
        </div>
      </div>

      <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />
    </section>
  );
}

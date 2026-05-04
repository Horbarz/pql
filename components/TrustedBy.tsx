"use client";

import { motion } from "framer-motion";

const companies = [
  { name: "FinTechPro", sector: "Fintech" },
  { name: "NeoBank", sector: "Banking" },
  { name: "CloudScale", sector: "SaaS" },
  { name: "PaySwift", sector: "Payments" },
  { name: "DataStream", sector: "Analytics" },
  { name: "SecureVault", sector: "Cybersecurity" },
  { name: "MobileFirst", sector: "Mobile" },
  { name: "APIConnect", sector: "Infrastructure" },
  { name: "RetailFlow", sector: "Ecommerce" },
  { name: "HealthNet", sector: "Healthtech" },
];

function LogoCard({ name, sector }: { name: string; sector: string }) {
  return (
    <motion.div
      className="flex-shrink-0 mx-4 px-7 py-4 rounded-xl border border-white/6 bg-white/[0.02] flex flex-col items-center gap-1 hover:border-indigo-500/30 hover:bg-white/[0.04] transition-all duration-300 group"
      whileHover={{ y: -2 }}
    >
      <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors whitespace-nowrap">
        {name}
      </span>
      <span className="text-[10px] text-slate-600 tracking-wide uppercase">{sector}</span>
    </motion.div>
  );
}

export default function TrustedBy() {
  return (
    <section className="py-20 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-slate-950/50 to-[#030712]" />

      <motion.div
        className="relative text-center mb-10 px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm text-slate-500 tracking-widest uppercase font-medium mb-2">
          Trusted by innovative teams
        </p>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          From fast-moving startups to enterprise engineering teams across fintech, healthtech, and SaaS.
        </p>
      </motion.div>

      {/* Marquee row 1 */}
      <div className="relative overflow-hidden mb-4">
        <div
          className="flex"
          style={{
            animation: "marquee 30s linear infinite",
          }}
        >
          {[...companies, ...companies].map((c, i) => (
            <LogoCard key={`${c.name}-${i}`} {...c} />
          ))}
        </div>
      </div>

      {/* Marquee row 2 - reverse */}
      <div className="relative overflow-hidden">
        <div
          className="flex"
          style={{
            animation: "marquee-reverse 25s linear infinite",
          }}
        >
          {[...companies.slice(5), ...companies.slice(0, 5), ...companies.slice(5), ...companies.slice(0, 5)].map(
            (c, i) => (
              <LogoCard key={`${c.name}-r-${i}`} {...c} />
            )
          )}
        </div>
      </div>

      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#030712] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#030712] to-transparent pointer-events-none" />
    </section>
  );
}

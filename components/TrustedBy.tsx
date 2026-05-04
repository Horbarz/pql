"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const clients = [
  {
    name: "Interswitch",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Interswitch_logo.svg",
    sector: "Payments Infrastructure",
    width: 130,
    height: 36,
  },
  {
    name: "Flutterwave",
    logo: "https://flutterwave.com/images/logo/full.svg",
    sector: "Payment Gateway",
    width: 140,
    height: 36,
  },
  {
    name: "Qore",
    logo: "https://qore.inc/wp-content/uploads/2022/10/Dark-Green.png",
    sector: "Core Banking",
    width: 100,
    height: 36,
  },
  {
    name: "BeyondCredit",
    logo: "https://beyondcredit.com.ng/images/logo/bc-logo.png",
    sector: "Digital Lending",
    width: 140,
    height: 36,
  },
  {
    name: "OPay",
    logo: "https://gstatic.opayweb.com/website-ng/img/opay-logo.684aa98.svg",
    sector: "Mobile Finance",
    width: 100,
    height: 36,
  },
  {
    name: "Moniepoint",
    logo: "https://moniepoint.com/logo-icon.svg",
    sector: "Business Banking",
    width: 40,
    height: 40,
    isIcon: true,
  },
];

function ClientCard({ name, logo, sector, width, height, isIcon }: (typeof clients)[0]) {
  return (
    <motion.div
      className="flex-shrink-0 mx-4 px-6 py-4 rounded-2xl border border-slate-100 bg-white shadow-sm flex items-center gap-4 group transition-all duration-300"
      whileHover={{ y: -2, boxShadow: "0 8px 30px rgba(0,0,0,0.08)", borderColor: "#e0e7ff" }}
    >
      <div className="flex items-center justify-center" style={{ minWidth: width, height: 40 }}>
        <Image
          src={logo}
          alt={`${name} logo`}
          width={width}
          height={height}
          className={`object-contain transition-all duration-300 ${isIcon ? "h-9 w-9" : "h-8 w-auto"}`}
          unoptimized
        />
      </div>
      <div className="border-l border-slate-100 pl-4">
        <p className="text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors whitespace-nowrap leading-tight">
          {name}
        </p>
        <p className="text-[10px] text-slate-400 tracking-wide mt-0.5">{sector}</p>
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

      {/* Row 1 */}
      <div className="relative overflow-hidden mb-4">
        <div className="flex" style={{ animation: "marquee 28s linear infinite" }}>
          {[...clients, ...clients, ...clients].map((c, i) => (
            <ClientCard key={`${c.name}-${i}`} {...c} />
          ))}
        </div>
      </div>

      {/* Row 2 — reversed */}
      <div className="relative overflow-hidden">
        <div className="flex" style={{ animation: "marquee-reverse 34s linear infinite" }}>
          {[...[...clients].reverse(), ...[...clients].reverse(), ...[...clients].reverse()].map(
            (c, i) => (
              <ClientCard key={`${c.name}-r-${i}`} {...c} />
            )
          )}
        </div>
      </div>

      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none" />
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "TestCatalyst", href: "#testcatalyst" },
  { label: "Academy", href: "#academy" },
  { label: "How We Work", href: "#how-we-work" },
  { label: "About", href: "#metrics" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 lg:px-12 py-4 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(3,7,18,0.85)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.06)"
            : "1px solid transparent",
        }}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Zap size={16} className="text-white fill-white" />
          </div>
          <span className="text-base font-bold tracking-tight text-white">
            Pison<span className="text-indigo-400">QA</span>Lab
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-slate-400 hover:text-white transition-colors duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-indigo-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="text-sm text-slate-300 hover:text-white transition-colors px-4 py-2"
          >
            Contact
          </a>
          <a
            href="#testcatalyst"
            className="text-sm font-medium px-5 py-2 rounded-lg text-white transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:shadow-indigo-500/25"
            style={{
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            }}
          >
            Get Started
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-slate-300 hover:text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-[#030712]/95 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              className="absolute top-20 left-4 right-4 rounded-2xl border border-white/10 p-6 flex flex-col gap-4"
              style={{ background: "rgba(15,23,42,0.95)" }}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base text-slate-300 hover:text-white py-2 border-b border-white/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#testcatalyst"
                onClick={() => setMobileOpen(false)}
                className="mt-2 text-center text-sm font-medium px-5 py-3 rounded-xl text-white"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
              >
                Get Started
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MessageSquare, BookOpen, BarChart2 } from "lucide-react";

function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;

      const gridSize = 50;
      const cols = Math.ceil(canvas.width / gridSize) + 1;
      const rows = Math.ceil(canvas.height / gridSize) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * gridSize;
          const y = row * gridSize;
          const dist = Math.sqrt(
            Math.pow(x - canvas.width / 2, 2) + Math.pow(y - canvas.height / 2, 2)
          );
          const wave = Math.sin(dist * 0.02 - t) * 0.5 + 0.5;

          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(99,102,241,${wave * 0.35})`;
          ctx.fill();
        }
      }

      // Center glow
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        300
      );
      gradient.addColorStop(0, "rgba(99,102,241,0.08)");
      gradient.addColorStop(0.5, "rgba(139,92,246,0.04)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

export default function CTASection() {
  return (
    <section id="contact" className="py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#030712]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="max-w-5xl mx-auto relative">
        <div className="relative rounded-3xl overflow-hidden border border-indigo-500/15 p-12 md:p-20 text-center">
          {/* Animated grid bg */}
          <div className="absolute inset-0">
            <GridBackground />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950/80" />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-indigo-500/30 rounded-tl-3xl" />
          <div className="absolute top-0 right-0 w-24 h-24 border-r-2 border-t-2 border-violet-500/30 rounded-tr-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 border-cyan-500/30 rounded-bl-3xl" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-indigo-500/30 rounded-br-3xl" />

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-block text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-6 px-3 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5">
                Get Started Today
              </span>

              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.05] mb-6">
                Ready to build
                <br />
                <span className="gradient-text">without bugs?</span>
              </h2>

              <p className="text-lg text-slate-400 max-w-xl mx-auto mb-12 leading-relaxed">
                Whether you need QA expertise, AI-powered test management, or world-class training
                — we&apos;re ready to help you ship with confidence.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <a
                  href="mailto:hello@pisonqalab.com"
                  className="group flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-white text-base transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/40 hover:-translate-y-1"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
                >
                  <MessageSquare size={18} />
                  Talk to Us
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#academy"
                  className="group flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-white text-base border border-white/10 hover:border-violet-500/40 hover:bg-violet-500/5 transition-all duration-300"
                >
                  <BookOpen size={18} />
                  Start Learning
                </a>
                <a
                  href="#testcatalyst"
                  className="group flex items-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-slate-300 hover:text-white text-base border border-white/8 hover:border-white/15 hover:bg-white/3 transition-all duration-300"
                >
                  <BarChart2 size={18} />
                  Request Demo
                </a>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center justify-center gap-8 text-xs text-slate-600">
                <span className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  No contracts required
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Response within 24 hours
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Free initial audit
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

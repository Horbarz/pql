"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, ChevronDown, FileText, PenLine, Zap, BarChart2, Rocket } from "lucide-react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: Particle[] = [];
    const colors = ["#6366f1", "#8b5cf6", "#06b6d4", "#a78bfa"];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 70; i++) {
      particles.push({
        id: i,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99,102,241,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 200);
      gradient.addColorStop(0, "rgba(99,102,241,0.04)");
      gradient.addColorStop(1, "transparent");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        const dxM = p.x - mouseX;
        const dyM = p.y - mouseY;
        const dM = Math.sqrt(dxM * dxM + dyM * dyM);
        if (dM < 150) {
          p.vx += (dxM / dM) * 0.015;
          p.vy += (dyM / dM) * 0.015;
        }

        p.vx *= 0.995;
        p.vy *= 0.995;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

export default function HeroSection() {

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-white pt-24 pb-16 overflow-x-hidden">
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-pattern opacity-70" />

      {/* Soft gradient blobs */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)",
        }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <ParticleField />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 sm:px-6 max-w-5xl mx-auto w-full">

        {/* Headline */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-5 w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-slate-900">Engineering </span>
          <span className="shimmer-text">Confidence.</span>
          <br />
          <span className="text-slate-900">Accelerating </span>
          <span className="gradient-text">Quality.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-slate-500 max-w-xl sm:max-w-2xl leading-relaxed mb-8 sm:mb-10 px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          From world-class QA services to AI-powered testing and elite QA training.{" "}
          <span className="text-slate-800 font-medium">PisonQALab</span> helps teams ship with confidence.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-12 sm:mb-16 w-full sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          <a
            href="#contact"
            className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-xl hover:shadow-indigo-200 hover:-translate-y-0.5 text-sm sm:text-base"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}
          >
            Book a Consultation
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </a>
          <a
            href="#testcatalyst"
            className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-700 border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 transition-all duration-300 text-sm sm:text-base"
          >
            Explore TestCatalyst
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform flex-shrink-0" />
          </a>
          <a
            href="#academy"
            className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-slate-500 hover:text-slate-800 border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all duration-300 text-sm sm:text-base"
          >
            <Play size={14} className="text-violet-500 flex-shrink-0" />
            Join the Academy
          </a>
        </motion.div>

        {/* Pipeline animation — desktop only */}
        <motion.div
          className="hidden sm:block w-full max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
        >
          <PipelineAnimation />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="text-xs text-slate-400 tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="text-slate-400" />
      </motion.div>
    </section>
  );
}

function PipelineAnimation() {
  const steps = [
    { label: "Requirements", Icon: FileText, color: "#6366f1" },
    { label: "Test Design",  Icon: PenLine,  color: "#8b5cf6" },
    { label: "Execution",    Icon: Zap,      color: "#a78bfa" },
    { label: "Analysis",     Icon: BarChart2, color: "#06b6d4" },
    { label: "Ship",         Icon: Rocket,   color: "#10b981" },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
          <div className="w-3 h-3 rounded-full bg-green-400/70" />
        </div>
        <span className="text-xs text-slate-400 ml-2 font-mono">test-pipeline.yml</span>
      </div>

      <div className="flex items-center justify-between gap-2">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center gap-2 flex-1">
            <motion.div
              className="flex flex-col items-center gap-2 flex-shrink-0"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.15 }}
            >
              <motion.div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: `${step.color}12`, border: `1px solid ${step.color}25` }}
                animate={{ boxShadow: [`0 0 0px ${step.color}00`, `0 0 14px ${step.color}25`, `0 0 0px ${step.color}00`] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
              >
                <step.Icon size={18} style={{ color: step.color }} />
              </motion.div>
              <span className="text-[11px] text-slate-400 text-center leading-tight">{step.label}</span>
            </motion.div>

            {i < steps.length - 1 && (
              <motion.div
                className="h-px flex-1 min-w-[12px]"
                style={{ background: `linear-gradient(90deg, ${step.color}50, ${steps[i + 1].color}50)` }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2 + i * 0.15, duration: 0.4 }}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <div className="flex-1 h-1.5 rounded-full bg-slate-100">
          <motion.div
            className="h-1.5 rounded-full"
            style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)" }}
            initial={{ width: "0%" }}
            animate={{ width: "78%" }}
            transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
          />
        </div>
        <motion.span
          className="text-xs text-indigo-500 font-mono whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          78% coverage
        </motion.span>
      </div>
    </div>
  );
}

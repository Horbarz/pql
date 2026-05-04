"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 400);
          return 100;
        }
        return p + Math.random() * 15 + 5;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#030712]"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 dot-pattern opacity-30" />

          <motion.div
            className="relative flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo mark */}
            <div className="relative">
              <motion.div
                className="w-20 h-20 rounded-2xl border border-indigo-500/30 flex items-center justify-center"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))",
                }}
              >
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path
                    d="M6 18C6 11.373 11.373 6 18 6s12 5.373 12 12"
                    stroke="#6366f1"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M18 12v6l4 2"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="18" cy="26" r="2" fill="#06b6d4" />
                </svg>
              </motion.div>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-2xl border border-indigo-500/20"
                  animate={{ scale: [1, 1.8 + i * 0.4], opacity: [0.5, 0] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>

            <div className="text-center">
              <p className="text-lg font-semibold gradient-text tracking-wide">
                PisonQALab
              </p>
              <p className="text-xs text-slate-500 mt-1 tracking-widest uppercase">
                Initializing...
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-48 h-0.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)",
                  width: `${Math.min(progress, 100)}%`,
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="text-xs text-slate-600 tabular-nums">
              {Math.min(Math.round(progress), 100)}%
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

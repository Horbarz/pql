"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LENS_RADIUS = 56;
const KILL_RADIUS = 26;
const BUG_SPEED = 1.1;
const NUM_BUGS = 8;

interface Bug {
  id: number;
  x: number;
  y: number;
  angle: number;
  turnRate: number;
  alive: boolean;
  dying: boolean;
  deathAlpha: number;
  legPhase: number;
}

interface Splash {
  id: number;
  x: number;
  y: number;
}

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number; opacity: number; color: string;
}

function drawBug(ctx: CanvasRenderingContext2D, bug: Bug, t: number) {
  const alpha = bug.dying ? bug.deathAlpha : 1;
  if (alpha <= 0) return;

  ctx.save();
  ctx.translate(bug.x, bug.y);
  ctx.rotate(bug.angle);
  const scale = bug.dying ? 1 + (1 - bug.deathAlpha) * 0.9 : 1;
  ctx.scale(scale, scale);
  ctx.globalAlpha = alpha;

  const legSwing = Math.sin(t * 0.012 + bug.id) * 3;

  // Antennae
  ctx.strokeStyle = "#991b1b";
  ctx.lineWidth = 1.2;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-3, -9);
  ctx.quadraticCurveTo(-7, -15, -10, -19);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(3, -9);
  ctx.quadraticCurveTo(7, -15, 10, -19);
  ctx.stroke();
  // Antenna tips
  ctx.fillStyle = "#991b1b";
  ctx.beginPath(); ctx.arc(-10, -19, 2, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(10, -19, 2, 0, Math.PI * 2); ctx.fill();

  // Head
  ctx.beginPath();
  ctx.arc(0, -8, 6, 0, Math.PI * 2);
  ctx.fillStyle = "#b91c1c";
  ctx.fill();
  // Eyes
  ctx.fillStyle = "rgba(255,255,255,0.95)";
  ctx.beginPath(); ctx.arc(-2.5, -9, 1.6, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(2.5, -9, 1.6, 0, Math.PI * 2); ctx.fill();
  // Pupils
  ctx.fillStyle = "#1e1e1e";
  ctx.beginPath(); ctx.arc(-2.2, -9, 0.7, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(2.8, -9, 0.7, 0, Math.PI * 2); ctx.fill();

  // Body shell
  ctx.beginPath();
  ctx.ellipse(0, 4, 7.5, 11, 0, 0, Math.PI * 2);
  ctx.fillStyle = "#ef4444";
  ctx.fill();

  // Shell dividing line
  ctx.beginPath();
  ctx.moveTo(0, -4);
  ctx.lineTo(0, 15);
  ctx.strokeStyle = "#b91c1c";
  ctx.lineWidth = 1.1;
  ctx.stroke();

  // Spots
  ctx.fillStyle = "rgba(153,27,27,0.5)";
  [[-4, 1], [4, 1], [-4, 7.5], [4, 7.5]].forEach(([sx, sy]) => {
    ctx.beginPath();
    ctx.arc(sx, sy, 2.4, 0, Math.PI * 2);
    ctx.fill();
  });

  // Shell highlight
  ctx.beginPath();
  ctx.ellipse(-2.5, -1, 2, 4, -0.3, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.fill();

  // Legs (animated)
  ctx.strokeStyle = "#991b1b";
  ctx.lineWidth = 1.3;
  ctx.lineCap = "round";
  const legs: [number, number, number, number, number][] = [
    [-7.5, -1,  -15, -4,  1],
    [ 7.5, -1,   15, -4, -1],
    [-7.5,  4,  -16,  4,  1],
    [ 7.5,  4,   16,  4, -1],
    [-7.5, 10,  -15, 14,  1],
    [ 7.5, 10,   15, 14, -1],
  ];
  legs.forEach(([x1, y1, x2, y2, side]) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2 + side * legSwing, y2 + Math.abs(legSwing) * 0.3);
    ctx.stroke();
  });

  ctx.restore();
}

function drawLens(ctx: CanvasRenderingContext2D, x: number, y: number, t: number) {
  if (x < -200) return;
  ctx.save();

  // Outer glow
  const glow = ctx.createRadialGradient(x, y, LENS_RADIUS * 0.8, x, y, LENS_RADIUS * 1.5);
  glow.addColorStop(0, "rgba(99,102,241,0.12)");
  glow.addColorStop(1, "rgba(99,102,241,0)");
  ctx.beginPath();
  ctx.arc(x, y, LENS_RADIUS * 1.5, 0, Math.PI * 2);
  ctx.fillStyle = glow;
  ctx.fill();

  // Glass fill
  const glass = ctx.createRadialGradient(
    x - LENS_RADIUS * 0.25, y - LENS_RADIUS * 0.25, 0,
    x, y, LENS_RADIUS
  );
  glass.addColorStop(0, "rgba(238,242,255,0.22)");
  glass.addColorStop(0.7, "rgba(199,210,254,0.1)");
  glass.addColorStop(1, "rgba(165,180,252,0.15)");
  ctx.beginPath();
  ctx.arc(x, y, LENS_RADIUS, 0, Math.PI * 2);
  ctx.fillStyle = glass;
  ctx.fill();

  // Lens ring
  ctx.beginPath();
  ctx.arc(x, y, LENS_RADIUS, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(99,102,241,0.85)";
  ctx.lineWidth = 3;
  ctx.stroke();

  // Inner kill-zone ring (pulsing red dashed)
  const pulse = 0.25 + Math.sin(t * 0.008) * 0.15;
  ctx.beginPath();
  ctx.arc(x, y, KILL_RADIUS, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(239,68,68,${pulse})`;
  ctx.lineWidth = 1.2;
  ctx.setLineDash([5, 4]);
  ctx.stroke();
  ctx.setLineDash([]);

  // Crosshair lines
  ctx.strokeStyle = "rgba(99,102,241,0.2)";
  ctx.lineWidth = 1;
  const cr = LENS_RADIUS - 10;
  ctx.beginPath(); ctx.moveTo(x - cr, y); ctx.lineTo(x + cr, y); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x, y - cr); ctx.lineTo(x, y + cr); ctx.stroke();

  // Center reticle dot
  ctx.beginPath();
  ctx.arc(x, y, 3.5, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(239,68,68,${0.5 + Math.sin(t * 0.01) * 0.3})`;
  ctx.fill();

  // Handle
  const ha = Math.PI * 0.72;
  const hx1 = x + Math.cos(ha) * (LENS_RADIUS - 2);
  const hy1 = y + Math.sin(ha) * (LENS_RADIUS - 2);
  const hx2 = x + Math.cos(ha) * (LENS_RADIUS + 40);
  const hy2 = y + Math.sin(ha) * (LENS_RADIUS + 40);
  ctx.shadowColor = "rgba(99,102,241,0.5)";
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.moveTo(hx1, hy1);
  ctx.lineTo(hx2, hy2);
  ctx.strokeStyle = "rgba(79,70,229,0.95)";
  ctx.lineWidth = 6;
  ctx.lineCap = "round";
  ctx.stroke();
  // Handle grip notches
  ctx.shadowBlur = 0;
  for (let i = 1; i <= 3; i++) {
    const t2 = i / 4;
    const nx = hx1 + (hx2 - hx1) * t2;
    const ny = hy1 + (hy2 - hy1) * t2;
    const perp = ha + Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(nx + Math.cos(perp) * 4, ny + Math.sin(perp) * 4);
    ctx.lineTo(nx - Math.cos(perp) * 4, ny - Math.sin(perp) * 4);
    ctx.strokeStyle = "rgba(199,210,254,0.4)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // Lens glare
  ctx.beginPath();
  ctx.ellipse(
    x - LENS_RADIUS * 0.28, y - LENS_RADIUS * 0.3,
    LENS_RADIUS * 0.28, LENS_RADIUS * 0.12,
    -Math.PI / 4, 0, Math.PI * 2
  );
  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.fill();

  ctx.restore();
}

export default function BugHunter({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const lensRef = useRef({ x: -999, y: -999 });
  const [splashes, setSplashes] = useState<Splash[]>([]);
  const splashCounter = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const bugs: Bug[] = Array.from({ length: NUM_BUGS }, (_, i) => ({
      id: i,
      x: 100 + Math.random() * Math.max(canvas.width - 200, 100),
      y: 100 + Math.random() * Math.max(canvas.height - 200, 100),
      angle: Math.random() * Math.PI * 2,
      turnRate: (Math.random() - 0.5) * 0.05,
      alive: true,
      dying: false,
      deathAlpha: 1,
      legPhase: Math.random() * 100,
    }));

    const particles: Particle[] = [];

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouseRef.current = { x: -999, y: -999 }; };

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("mouseleave", onMouseLeave);

    const spawnParticles = (x: number, y: number) => {
      for (let i = 0; i < 16; i++) {
        const angle = (i / 16) * Math.PI * 2 + Math.random() * 0.4;
        const spd = 1.5 + Math.random() * 5;
        particles.push({
          x, y,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd - 1.5,
          r: 2 + Math.random() * 4,
          opacity: 1,
          color: i % 3 === 0 ? "#991b1b" : "#ef4444",
        });
      }
    };

    const killBug = (bug: Bug) => {
      if (bug.dying) return;
      bug.dying = true;
      spawnParticles(bug.x, bug.y);
      const id = ++splashCounter.current;
      const bx = bug.x;
      const by = bug.y;
      setSplashes(prev => [...prev, { id, x: bx, y: by }]);
      setTimeout(() => setSplashes(prev => prev.filter(s => s.id !== id)), 900);
      setTimeout(() => {
        if (!canvas) return;
        bug.x = 100 + Math.random() * Math.max(canvas.width - 200, 100);
        bug.y = 100 + Math.random() * Math.max(canvas.height - 200, 100);
        bug.angle = Math.random() * Math.PI * 2;
        bug.alive = true;
        bug.dying = false;
        bug.deathAlpha = 1;
      }, 3500);
    };

    let t = 0;

    const animate = () => {
      t++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Ease lens toward mouse
      const m = mouseRef.current;
      const l = lensRef.current;
      if (m.x > -200) {
        l.x += (m.x - l.x) * 0.13;
        l.y += (m.y - l.y) * 0.13;
      } else {
        l.x = -999; l.y = -999;
      }

      // Update and draw bugs
      bugs.forEach(bug => {
        if (!bug.alive && !bug.dying) return;

        if (bug.dying) {
          bug.deathAlpha -= 0.04;
          if (bug.deathAlpha <= 0) { bug.alive = false; bug.dying = false; }
          drawBug(ctx, bug, t);
          return;
        }

        const dx = bug.x - l.x;
        const dy = bug.y - l.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Flee from lens when it's close
        if (l.x > -200 && dist < LENS_RADIUS * 2.2) {
          const fleeAngle = Math.atan2(dy, dx);
          const diff = fleeAngle - (bug.angle - Math.PI / 2);
          const normalDiff = Math.atan2(Math.sin(diff), Math.cos(diff));
          bug.angle += normalDiff * 0.12 + Math.PI / 2;
        } else {
          // Wander
          bug.angle += bug.turnRate + (Math.random() - 0.5) * 0.04;
        }

        const spd = l.x > -200 && dist < LENS_RADIUS * 2.2 ? BUG_SPEED * 2.2 : BUG_SPEED;
        bug.x += Math.cos(bug.angle - Math.PI / 2) * spd;
        bug.y += Math.sin(bug.angle - Math.PI / 2) * spd;

        // Bounce off edges
        const edge = 28;
        if (bug.x < edge) { bug.angle = Math.PI - bug.angle; bug.x = edge; }
        if (bug.x > canvas.width - edge) { bug.angle = Math.PI - bug.angle; bug.x = canvas.width - edge; }
        if (bug.y < edge) { bug.angle = -bug.angle; bug.y = edge; }
        if (bug.y > canvas.height - edge) { bug.angle = -bug.angle; bug.y = canvas.height - edge; }

        // Kill check
        if (l.x > -200 && dist < KILL_RADIUS) killBug(bug);

        drawBug(ctx, bug, t);
      });

      // Draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.22;
        p.vx *= 0.97;
        p.opacity -= 0.028;
        if (p.opacity <= 0) { particles.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Lens on top
      drawLens(ctx, l.x, l.y, t);

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [containerRef]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        aria-hidden="true"
      />
      <AnimatePresence>
        {splashes.map(s => (
          <motion.div
            key={s.id}
            className="absolute pointer-events-none select-none z-30"
            style={{ left: s.x, top: s.y }}
            initial={{ opacity: 1, scale: 0.5, x: "-50%", y: "-120%" }}
            animate={{ opacity: 0, scale: 1.5, y: "-180%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          >
            <span className="font-black text-red-500 text-sm tracking-widest drop-shadow-sm whitespace-nowrap">
              SQUISH!
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}

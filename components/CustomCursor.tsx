"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let mouseX = 0;
    let mouseY = 0;
    let curX = 0;
    let curY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    };

    const animate = () => {
      curX += (mouseX - curX) * 0.12;
      curY += (mouseY - curY) * 0.12;
      cursor.style.left = `${curX}px`;
      cursor.style.top = `${curY}px`;
      requestAnimationFrame(animate);
    };

    const onMouseEnterLink = () => {
      cursor.style.width = "40px";
      cursor.style.height = "40px";
      cursor.style.borderColor = "rgba(139,92,246,0.8)";
      cursor.style.background = "rgba(99,102,241,0.1)";
    };

    const onMouseLeaveLink = () => {
      cursor.style.width = "20px";
      cursor.style.height = "20px";
      cursor.style.borderColor = "rgba(99,102,241,0.8)";
      cursor.style.background = "transparent";
    };

    document.addEventListener("mousemove", onMouseMove);
    animate();

    const interactives = document.querySelectorAll("a, button, [role='button']");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterLink);
      el.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] rounded-full border-2 border-indigo-500/80 transition-[width,height,background] duration-200"
        style={{
          width: "20px",
          height: "20px",
          transform: "translate(-50%, -50%)",
          top: 0,
          left: 0,
        }}
      />
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] rounded-full bg-indigo-500"
        style={{
          width: "5px",
          height: "5px",
          transform: "translate(-50%, -50%)",
          top: 0,
          left: 0,
        }}
      />
    </>
  );
}

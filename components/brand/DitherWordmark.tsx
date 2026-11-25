"use client";

import { useEffect, useRef } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Dot = { x: number; y: number; dx: number; dy: number; vx: number; vy: number; a: number };

const REACH = 110;

/**
 * The name at full width, printed as a field of small squares. Dots shimmer
 * while it is on screen and move aside for the pointer. One static frame for
 * reduced motion; the loop stops whenever the canvas is out of view.
 */
export default function DitherWordmark({ text, label, className }: { text: string; label: string; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = prefersReducedMotion();
    const family = getComputedStyle(document.documentElement).getPropertyValue("--font-display").trim() || "serif";
    let dots: Dot[] = [];
    let W = 0;
    let H = 0;
    let size = 4;
    let raf = 0;
    let visible = false;
    let disposed = false;
    let pointer: { x: number; y: number } | null = null;
    let last = 0;

    const build = () => {
      const w = canvas.clientWidth;
      if (!w || w === W) return;
      W = w;
      const cell = W < 640 ? 2.5 : W < 1000 ? 4 : 5;
      size = cell - (cell > 3 ? 1.5 : 0.8);

      // Fit the text to the width, then set it again one pixel to a cell, so
      // each pixel's alpha is how much of that cell the letter covers. Reading
      // coverage (not one sample point) is what keeps the hairlines.
      const off = document.createElement("canvas");
      const o = off.getContext("2d", { willReadFrequently: true });
      if (!o) return;
      o.font = `500 200px ${family}`;
      const probe = o.measureText(text);
      const natural = probe.actualBoundingBoxLeft + probe.actualBoundingBoxRight;
      const px = (200 * W) / natural;
      o.font = `500 ${px}px ${family}`;
      const m = o.measureText(text);
      const ascent = m.actualBoundingBoxAscent;
      H = Math.ceil(ascent + m.actualBoundingBoxDescent) + 2;
      const cols = Math.ceil(W / cell);
      const rows = Math.ceil(H / cell);
      off.width = cols;
      off.height = rows;
      o.scale(1 / cell, 1 / cell);
      o.font = `500 ${px}px ${family}`;
      o.fillText(text, m.actualBoundingBoxLeft, ascent + 1);
      const data = o.getImageData(0, 0, cols, rows).data;

      dots = [];
      const keep = W < 640 ? 0.94 : 0.86;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (data[(r * cols + c) * 4 + 3] < 64 || Math.random() > keep) continue;
          dots.push({ x: (c + 0.5) * cell, y: (r + 0.5) * cell, dx: 0, dy: 0, vx: 0, vy: 0, a: 0.32 + Math.random() * 0.68 });
        }
      }

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#F5F5F3";
      for (const d of dots) {
        ctx.globalAlpha = d.a;
        ctx.fillRect(d.x + d.dx - size / 2, d.y + d.dy - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
    };

    const frame = (now: number) => {
      raf = 0;
      let moving = false;
      for (const d of dots) {
        if (pointer) {
          const ex = d.x + d.dx - pointer.x;
          const ey = d.y + d.dy - pointer.y;
          const dist = Math.hypot(ex, ey);
          if (dist < REACH && dist > 0.01) {
            const push = ((REACH - dist) / REACH) * 1.9;
            d.vx += (ex / dist) * push;
            d.vy += (ey / dist) * push;
          }
        }
        if (d.dx || d.dy || d.vx || d.vy) {
          d.vx = (d.vx - d.dx * 0.045) * 0.86;
          d.vy = (d.vy - d.dy * 0.045) * 0.86;
          d.dx += d.vx;
          d.dy += d.vy;
          if (Math.abs(d.dx) + Math.abs(d.dy) + Math.abs(d.vx) + Math.abs(d.vy) < 0.04) d.dx = d.dy = d.vx = d.vy = 0;
          else moving = true;
        }
      }
      // A slow shimmer: every so often a handful of dots change weight.
      const shimmer = now - last > 140;
      if (shimmer) {
        last = now;
        for (let i = 0; i < dots.length / 60; i++) dots[(Math.random() * dots.length) | 0].a = 0.32 + Math.random() * 0.68;
      }
      if (moving || shimmer) draw();
      if (visible) raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (!raf && visible && !still) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => {
      pointer = null;
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      start();
    });
    const ro = new ResizeObserver(() => !disposed && build());

    const ready = document.fonts?.load ? document.fonts.load(`500 200px ${family}`, text).catch(() => undefined) : Promise.resolve();
    ready.then(() => {
      if (disposed) return;
      build();
      ro.observe(canvas);
      io.observe(canvas);
    });
    if (!still && hasFinePointer()) {
      canvas.addEventListener("pointermove", onMove, { passive: true });
      canvas.addEventListener("pointerleave", onLeave);
    }
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [text]);

  return <canvas ref={ref} role="img" aria-label={label} className={cn("block aspect-[4.6/1] w-full", className)} />;
}

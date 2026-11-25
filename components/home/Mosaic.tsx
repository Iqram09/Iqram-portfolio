"use client";

import Image from "next/image";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { kongImages } from "@/data/kong";
import { LetterGlyph, type LetterKey } from "@/components/brand/Letterform";
import { hasFinePointer } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Place = { c: number; r: number; w: number; h: number };
type Tile = Place & { sm?: Place; ground: string; art: ReactNode };

const glyph = (letter: LetterKey, color: string) => (
  <LetterGlyph letter={letter} className={cn("absolute inset-[18%] h-[64%] w-[64%]", color)} />
);

/*
 * Tiles on a 14-column grid of squares (6 on phones, where only tiles with an
 * `sm` place are shown). The letters of the name are scattered in order.
 */
const tiles: Tile[] = [
  { c: 0, r: 0, w: 2, h: 2, sm: { c: 0, r: 0, w: 2, h: 2 }, ground: "bg-dusk", art: <Image src="/crops/stans-square.jpg" alt="" fill quality={85} sizes="220px" className="object-cover" /> },
  { c: 4, r: 0, w: 1, h: 1, sm: { c: 3, r: 0, w: 1, h: 1 }, ground: "bg-sky", art: glyph("i", "text-dusk") },
  { c: 8, r: 0, w: 1, h: 1, sm: { c: 5, r: 1, w: 1, h: 1 }, ground: "bg-cobalt", art: glyph("q", "text-sky") },
  {
    c: 12, r: 0, w: 2, h: 1, ground: "bg-dusk",
    art: <Image src="/crops/stans-sky.jpg" alt="" fill quality={85} sizes="220px" className="object-cover" />,
  },
  { c: 12, r: 2, w: 1, h: 1, ground: "bg-camel", art: glyph("r", "text-fg") },
  { c: 1, r: 5, w: 1, h: 1, sm: { c: 0, r: 6, w: 1, h: 1 }, ground: "bg-accent", art: glyph("a", "text-accent-soft") },
  {
    c: 6, r: 5, w: 2, h: 1, ground: "bg-sky",
    art: <Image src={kongImages.kongRoutes.src} alt="" fill quality={85} sizes="220px" className="object-cover object-left-top" />,
  },
  { c: 9, r: 5, w: 1, h: 1, sm: { c: 2, r: 6, w: 1, h: 1 }, ground: "bg-leaf", art: glyph("m", "text-accent-soft") },
  { c: 11, r: 4, w: 2, h: 2, sm: { c: 4, r: 5, w: 2, h: 2 }, ground: "bg-camel", art: <Image src="/crops/proximo-square.jpg" alt="" fill quality={85} sizes="220px" className="object-cover" /> },
];

const at = ({ c, r, w, h }: Place): CSSProperties => ({
  left: `calc(var(--cell) * ${c})`,
  top: `calc(var(--cell) * ${r})`,
  width: `calc(var(--cell) * ${w})`,
  height: `calc(var(--cell) * ${h})`,
});

/** A wall of squares behind the closing line. The cell under the pointer lights up. */
export default function Mosaic({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const cell = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    const lit = cell.current;
    if (!el || !lit || !hasFinePointer()) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const s = lit.offsetWidth;
      lit.style.transform = `translate3d(${Math.floor((e.clientX - r.left) / s) * s}px, ${Math.floor((e.clientY - r.top) / s) * s}px, 0)`;
      lit.style.opacity = "1";
    };
    const onLeave = () => {
      lit.style.opacity = "0";
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={root}
      className="relative h-[calc(var(--cell)*7)] overflow-hidden [--cell:calc(100vw/6)] md:h-[calc(var(--cell)*6)] md:[--cell:calc(100vw/14)]"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(245,245,243,.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(245,245,243,.1) 1px, transparent 1px)",
          backgroundSize: "var(--cell) var(--cell)",
        }}
      />
      <span ref={cell} aria-hidden className="absolute left-0 top-0 h-[var(--cell)] w-[var(--cell)] bg-white/10 opacity-0 transition-opacity duration-300" />
      <div aria-hidden>
        {tiles.map((t) => (
          <div key={`${t.c}-${t.r}`} data-tile>
            <div className={cn("absolute hidden overflow-hidden md:block", t.ground)} style={at(t)}>
              {t.art}
            </div>
            {t.sm ? (
              <div className={cn("absolute overflow-hidden md:hidden", t.ground)} style={at(t.sm)}>
                {t.art}
              </div>
            ) : null}
          </div>
        ))}
      </div>
      {children}
    </div>
  );
}

"use client";

import { useRef, useState, type PointerEvent, type ReactNode } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  /** Short label that follows the pointer, e.g. "Visit". */
  label: ReactNode;
  className?: string;
};

/** A small tag that follows the pointer across a card. Fine pointers only; purely decorative. */
export default function HoverTag({ children, label, className }: Props) {
  const tag = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);

  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (!tag.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    tag.current.style.transform = `translate3d(${e.clientX - r.left}px, ${e.clientY - r.top}px, 0)`;
  };

  return (
    <div
      className={cn("relative", className)}
      onPointerEnter={(e) => {
        if (!hasFinePointer() || prefersReducedMotion()) return;
        move(e);
        setOn(true);
      }}
      onPointerMove={on ? move : undefined}
      onPointerLeave={() => setOn(false)}
    >
      {children}
      <span ref={tag} aria-hidden className="pointer-events-none absolute left-0 top-0 z-10 transition-transform duration-200 ease-out">
        <span
          className={cn(
            "flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-1 rounded-full bg-bg-1 text-[16px] font-medium tracking-[-0.015em] text-fg transition-[opacity,scale] duration-300 ease-out-expo",
            on ? "opacity-100 [scale:1]" : "opacity-0 [scale:0.5]"
          )}
        >
          {label}
        </span>
      </span>
    </div>
  );
}

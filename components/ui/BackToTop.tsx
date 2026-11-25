"use client";

import { getLenis, prefersReducedMotion } from "@/lib/motion";
import { ArrowUp } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

export default function BackToTop({ className }: { className?: string }) {
  const go = () => {
    const lenis = getLenis();
    if (lenis && !prefersReducedMotion()) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  };
  return (
    <button type="button" onClick={go} className={cn("group inline-flex items-center gap-2 self-start rounded text-[15px] text-inv transition-colors hover:text-accent-soft", className)}>
      Back to top
      <ArrowUp size={17} className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-1" />
    </button>
  );
}

import type { ReactNode } from "react";
import { ChevronRight } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

/** A square white tag, set straight on the ground. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("inline-block bg-bg-1 px-2.5 py-1.5 text-[14px] leading-tight tracking-[-0.01em] text-fg", className)}>{children}</span>;
}

/** The round arrow that closes a card caption; fills when its group is hovered. */
export function CircleArrow({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid h-11 w-11 shrink-0 place-items-center rounded-full border border-fg/70 text-fg transition-[background-color,color,transform] duration-500 ease-out-expo group-hover:translate-x-1 group-hover:bg-fg group-hover:text-bg",
        className
      )}
    >
      <ChevronRight size={20} />
    </span>
  );
}

/** Technologies or facets as one line, separated by middots. */
export function DotList({ items, label, tone = "dim", className }: { items: readonly string[]; label?: string; tone?: "dim" | "onAccent"; className?: string }) {
  return (
    <ul className={cn("dots flex flex-wrap gap-y-1 text-[16px] tracking-[-0.01em]", tone === "dim" ? "text-fg-dim" : "text-white/75", className)} aria-label={label}>
      {items.map((t) => (
        <li key={t} className="whitespace-nowrap">
          {t}
        </li>
      ))}
    </ul>
  );
}

/** The small live / available dot. */
export function Dot({ tone = "ok", pulse }: { tone?: "ok" | "soft"; pulse?: boolean }) {
  return (
    <span aria-hidden className={cn("relative inline-flex h-2 w-2 shrink-0 rounded-full align-middle", tone === "ok" ? "bg-ok" : "bg-accent-soft")}>
      {pulse && <span className="node-pulse absolute -inset-1 rounded-full bg-inherit opacity-30" />}
    </span>
  );
}

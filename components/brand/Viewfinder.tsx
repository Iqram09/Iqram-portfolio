import { cn } from "@/lib/cn";

/** Four viewfinder corner brackets framing their positioned parent (Distant Harmony HUD). */
export default function Viewfinder({ className, inset = "inset-0" }: { className?: string; inset?: string }) {
  return (
    <span aria-hidden className={cn("pointer-events-none absolute", inset, className)}>
      <span className="vf vf-tl" />
      <span className="vf vf-tr" />
      <span className="vf vf-bl" />
      <span className="vf vf-br" />
    </span>
  );
}

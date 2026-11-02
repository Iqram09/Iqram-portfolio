import { cn } from "@/lib/cn";

type GlowProps = {
  tone: "blue" | "mint" | "lavender" | "warm";
  /** Position and size, e.g. "-right-40 -top-40 w-[640px]". Always circular. */
  className?: string;
  /** A slow drift; off for reduced motion. */
  drift?: boolean;
};

/**
 * Ambient light (adapted from Sky Digital Lab): a large radial gradient at the
 * edge of a layout. Parent needs `relative overflow-hidden`.
 */
export default function Glow({ tone, className, drift = false }: GlowProps) {
  return <span aria-hidden className={cn("glow", `glow-${tone}`, drift && "glow-drift", className)} />;
}

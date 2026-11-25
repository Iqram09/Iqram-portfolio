import Link from "next/link";
import type { ReactNode } from "react";
import AnchorLink from "@/components/ui/AnchorLink";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outlineLight";
type Size = "md" | "sm";

const variants: Record<Variant, string> = {
  primary: "bg-fg text-bg border border-fg hover:bg-accent hover:border-accent",
  secondary: "bg-transparent text-fg border border-fg/80 hover:bg-fg hover:text-bg",
  ghost: "bg-transparent text-fg-muted border border-transparent hover:text-fg",
  // For dark bands.
  light: "bg-bg text-fg border border-bg hover:bg-accent-soft hover:border-accent-soft",
  outlineLight: "bg-transparent text-white border border-white/60 hover:bg-white hover:text-fg",
};

const sizes: Record<Size, string> = {
  md: "h-[52px] px-6 text-[17px]",
  sm: "h-10 px-4 text-[14px]",
};

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium tracking-[-0.015em] whitespace-nowrap transition-[background-color,border-color,color,transform] duration-300 ease-out-expo active:translate-y-px";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  external?: boolean;
  download?: string;
  className?: string;
  ariaLabel?: string;
};

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  external,
  download,
  className = "",
  ariaLabel,
}: Props) {
  const cls = `${baseClass} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href.startsWith("/#")) {
    return (
      <AnchorLink href={href} className={cls} ariaLabel={ariaLabel}>
        {children}
      </AnchorLink>
    );
  }
  if (href.startsWith("/") && !download) {
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={cls}
      aria-label={ariaLabel}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

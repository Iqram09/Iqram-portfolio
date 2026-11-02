import Link from "next/link";
import type { ReactNode } from "react";
import AnchorLink from "@/components/ui/AnchorLink";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

const variants: Record<Variant, string> = {
  // Warm porcelain pill — the one solid surface on the page.
  primary: "bg-fg text-bg hover:bg-white border border-transparent shadow-[0_10px_40px_-12px_rgba(217,207,201,0.35)]",
  // Glass pill.
  secondary: "glass glass-blur text-fg hover:border-fg/25",
  ghost: "bg-transparent text-fg-muted border border-transparent hover:text-fg",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-6 text-sm",
  sm: "h-9 px-4 text-[13px]",
};

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight whitespace-nowrap transition-[background-color,border-color,color,transform,box-shadow] duration-300 ease-out-expo active:translate-y-px";

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

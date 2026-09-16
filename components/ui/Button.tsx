import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

const variants: Record<Variant, string> = {
  primary:
    "bg-fg text-bg hover:bg-white border border-transparent",
  secondary:
    "bg-bg-2 text-fg border border-line hover:border-line-strong hover:bg-bg-3",
  ghost:
    "bg-transparent text-fg-muted border border-transparent hover:text-fg",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  sm: "h-9 px-4 text-[13px]",
};

const baseClass =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-[background-color,border-color,color,transform] duration-200 ease-out active:translate-y-px";

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
  const isInternal = href.startsWith("/") && !download;

  if (isInternal) {
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

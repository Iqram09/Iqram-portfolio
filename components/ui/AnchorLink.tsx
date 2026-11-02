"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";
import { scrollToId } from "@/lib/motion";

type Props = {
  /** A home-page anchor such as "/#work". */
  href: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  ariaCurrent?: "true" | undefined;
  onNavigate?: () => void;
};

/**
 * On the home page, glides to the section through Lenis (or natively) and
 * moves focus with it. From any other page it is an ordinary link to "/#id".
 */
export default function AnchorLink({ href, className, children, ariaLabel, ariaCurrent, onNavigate }: Props) {
  const pathname = usePathname();
  const id = href.split("#")[1] ?? "";

  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();
    if (pathname !== "/" || !id || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    if (scrollToId(id)) e.preventDefault();
  };

  return (
    <Link href={href} onClick={onClick} className={className} aria-label={ariaLabel} aria-current={ariaCurrent} scroll={false}>
      {children}
    </Link>
  );
}

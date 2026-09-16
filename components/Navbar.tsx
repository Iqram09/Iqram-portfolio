"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, site } from "@/data/site";
import { Menu, Close } from "@/components/ui/Icons";

const SECTION_IDS = ["work", "experience", "about", "contact"] as const;

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section indicator (home only).
  useEffect(() => {
    if (!isHome || typeof IntersectionObserver === "undefined") return;
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.1, 0.25] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [isHome]);

  // Close the mobile menu on route change / escape.
  useEffect(() => setOpen(false), [pathname]);
  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);
  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onKey]);

  const isActive = (id: string) => {
    if (id === "resume") return pathname === "/resume";
    return isHome && active === id;
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[height,background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-line bg-bg/80 backdrop-blur-md supports-[backdrop-filter]:bg-bg/70"
          : "border-b border-transparent bg-transparent"
      }`}
      style={{ height: scrolled ? 56 : 64 }}
    >
      <nav className="container-site flex h-full items-center justify-between" aria-label="Primary">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="font-semibold tracking-[0.18em] text-fg transition-colors hover:text-accent"
            aria-label={`${site.displayName} — home`}
          >
            {site.shortName}
          </Link>
          <span className="hidden items-center gap-2 rounded-full border border-line bg-bg-2/70 px-2.5 py-1 font-mono text-[11px] text-fg-muted sm:inline-flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-ok opacity-60 node-pulse" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ok" />
            </span>
            {site.status}
          </span>
        </div>

        {/* Desktop */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => {
            const on = isActive(l.id);
            return (
              <li key={l.id}>
                <Link
                  href={l.href}
                  aria-current={on ? "true" : undefined}
                  className={`relative rounded-md px-3 py-2 text-sm transition-colors ${
                    on ? "text-fg" : "text-fg-muted hover:text-fg"
                  }`}
                >
                  {l.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-3 -bottom-px h-px bg-accent transition-opacity ${
                      on ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-fg-muted hover:text-fg md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <Close size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile panel */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="border-b border-line bg-bg/95 backdrop-blur-md md:hidden"
      >
        <ul className="container-site flex flex-col py-3">
          {navLinks.map((l) => (
            <li key={l.id}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(l.id) ? "true" : undefined}
                className={`block rounded-md px-2 py-3 text-base ${
                  isActive(l.id) ? "text-fg" : "text-fg-muted"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="mt-2 border-t border-line pt-3 font-mono text-[11px] text-fg-dim sm:hidden">
            <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-ok align-middle" />
            {site.status}
          </li>
        </ul>
      </div>
    </header>
  );
}

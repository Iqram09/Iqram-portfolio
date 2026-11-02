"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, LazyMotion, m, useReducedMotion } from "framer-motion";
import { navLinks, site } from "@/data/site";
import AnchorLink from "@/components/ui/AnchorLink";
import Glint from "@/components/brand/Glint";
import Glow from "@/components/brand/Glow";
import { Close, Menu } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import { afterIdle } from "@/lib/motion";

const loadFeatures = () => afterIdle().then(() => import("@/lib/motion-features")).then((r) => r.default);
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Minimal floating glass navigation. The active section is marked by a glass
 * pill that glides between links (Framer Motion shared layout); a hairline
 * along the pill's lower edge shows reading progress.
 */
export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const progress = useRef<HTMLSpanElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  // Condensed state + reading progress, batched to one frame.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 24);
      if (progress.current) progress.current.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  // Active section (home only).
  useEffect(() => {
    if (!isHome || typeof IntersectionObserver === "undefined") return;
    const els = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.1] }
    );
    els.forEach((el) => obs.observe(el));
    const top = document.getElementById("top");
    const topObs = new IntersectionObserver(([e]) => e.isIntersecting && setActive(null), { threshold: 0.4 });
    if (top) topObs.observe(top);
    return () => {
      obs.disconnect();
      topObs.disconnect();
    };
  }, [isHome]);

  useEffect(() => setOpen(false), [pathname]);

  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setOpen(false);
      toggle.current?.focus();
    }
  }, []);
  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, onKey]);

  return (
    <LazyMotion features={loadFeatures} strict>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 md:pt-4">
        <nav
          aria-label="Primary"
          className={cn(
            "glass glass-blur pointer-events-auto relative flex h-14 w-full max-w-[760px] items-center justify-between gap-2 overflow-hidden rounded-full pl-4 pr-2 transition-[background-color,box-shadow] duration-500",
            scrolled ? "glass-strong" : ""
          )}
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2.5 rounded-full py-2 pr-2 text-[13px] font-semibold tracking-[0.24em] text-fg"
            aria-label={`${site.displayName} — home`}
          >
            <Glint className="w-3 text-accent-soft transition-transform duration-700 ease-out-expo group-hover:rotate-90" />
            {site.shortName}
          </Link>

          <ul className="hidden items-center md:flex">
            {navLinks.map((l) => {
              const on = isHome && active === l.id;
              return (
                <li key={l.id} className="relative">
                  {on && (
                    <m.span
                      layoutId="nav-pill"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34 }}
                      className="absolute inset-0 rounded-full border border-fg/10 bg-fg/[0.06]"
                    />
                  )}
                  <AnchorLink
                    href={l.href}
                    ariaCurrent={on ? "true" : undefined}
                    className={cn(
                      "relative block rounded-full px-3.5 py-2 text-[13px] transition-colors duration-300",
                      on ? "text-fg" : "text-fg-muted hover:text-fg"
                    )}
                  >
                    {l.label}
                  </AnchorLink>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <Link
              href="/resume"
              className={cn(
                "hidden h-10 items-center rounded-full px-4 text-[13px] font-medium transition-colors sm:inline-flex",
                pathname === "/resume" ? "bg-fg text-bg" : "bg-fg/90 text-bg hover:bg-white"
              )}
            >
              Résumé
            </Link>
            <button
              ref={toggle}
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-fg/10 text-fg-muted transition-colors hover:text-fg md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <Close size={18} /> : <Menu size={18} />}
            </button>
          </div>

          <span
            ref={progress}
            aria-hidden
            style={{ transform: "scaleX(0)" }}
            className={cn(
              "absolute inset-x-6 bottom-0 h-px origin-left bg-gradient-to-r from-warm via-accent to-lavender transition-opacity duration-500",
              scrolled && !open ? "opacity-80" : "opacity-0"
            )}
          />
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <m.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto overflow-x-hidden bg-night px-6 pb-10 pt-28 md:hidden"
            data-lenis-prevent
          >
            <Glow tone="blue" className="-right-40 -top-40 w-[520px]" />
            <Glow tone="warm" className="-bottom-48 -left-40 w-[520px] [--glow-opacity:0.4]" />
            <ul className="relative flex flex-col">
              {[...navLinks, { label: "Résumé", href: "/resume", id: "resume" }].map((l, i) => (
                <m.li
                  key={l.id}
                  initial={reduce ? false : { opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.05 * i, ease: EASE }}
                  className="border-b border-fg/10"
                >
                  {l.href.startsWith("/#") ? (
                    <AnchorLink
                      href={l.href}
                      onNavigate={() => setOpen(false)}
                      className="flex items-baseline justify-between py-4 font-display text-4xl font-semibold uppercase tracking-tightest text-fg"
                    >
                      {l.label}
                      <span className="hud">{String(i + 1).padStart(2, "0")}</span>
                    </AnchorLink>
                  ) : (
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-4 font-display text-4xl font-semibold uppercase tracking-tightest text-fg"
                    >
                      {l.label}
                      <span className="hud">{String(i + 1).padStart(2, "0")}</span>
                    </Link>
                  )}
                </m.li>
              ))}
            </ul>
            <div className="relative mt-10 flex flex-col gap-3">
              <a href={`mailto:${site.email}`} className="text-base text-fg-muted transition-colors hover:text-fg">
                {site.email}
              </a>
              <p className="hud">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-ok align-middle" />
                {site.availability} · {site.location}
              </p>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </LazyMotion>
  );
}

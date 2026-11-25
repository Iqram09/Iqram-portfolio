"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, LazyMotion, m, useReducedMotion } from "framer-motion";
import { navLinks, site } from "@/data/site";
import AnchorLink from "@/components/ui/AnchorLink";
import Wordmark from "@/components/brand/Wordmark";
import { Dot } from "@/components/ui/Bits";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import { afterIdle } from "@/lib/motion";

const loadFeatures = () => afterIdle().then(() => import("@/lib/motion-features")).then((r) => r.default);
const EASE = [0.16, 1, 0.3, 1] as const;

const byId = Object.fromEntries(navLinks.map((l) => [l.id, l])) as Record<(typeof navLinks)[number]["id"], (typeof navLinks)[number]>;
// Work, Experience and Expertise sit in the white pill; About joins Résumé
// beside the wordmark; Contact is the one filled control.
const pill = [byId.work, byId.experience, byId.expertise];

/**
 * A floating frosted bar. The active section is marked by a pill that glides
 * between links (Framer Motion shared layout); a hairline along the lower
 * edge shows reading progress.
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

  // Scrolled state + reading progress, batched to one frame.
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

  const on = (id: string) => isHome && active === id;

  return (
    <LazyMotion features={loadFeatures} strict>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6">
        <nav
          aria-label="Primary"
          data-scrolled={scrolled ? "" : undefined}
          className="nav-shell pointer-events-auto relative mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between gap-3 overflow-hidden rounded-[14px] pl-4 pr-2 transition-[background-color] duration-500 md:h-[72px] md:pl-6 md:pr-2.5"
        >
          <div className="flex items-center gap-9">
            <Link href="/" className="group inline-flex rounded-md py-2 text-[27px] text-fg md:text-[31px]" aria-label={`${site.displayName} — home`}>
              <Wordmark />
            </Link>
            <ul className="caps hidden items-center gap-7 text-fg-muted lg:flex">
              <li>
                <AnchorLink
                  href={byId.about.href}
                  ariaCurrent={on("about") ? "true" : undefined}
                  className={cn("rounded py-2 transition-colors hover:text-accent", on("about") && "text-accent")}
                >
                  {byId.about.label}
                </AnchorLink>
              </li>
              <li>
                <Link
                  href="/resume"
                  aria-current={pathname === "/resume" ? "page" : undefined}
                  className={cn(
                    "inline-flex items-center gap-1 rounded py-2 transition-colors hover:text-accent",
                    pathname === "/resume" && "text-accent"
                  )}
                >
                  Résumé <ArrowUpRight size={13} />
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center md:rounded-full md:bg-bg-1 md:p-2 md:pl-2.5">
              <ul className="caps hidden items-center text-fg-muted md:flex">
                {pill.map((l) => (
                  <li key={l.id} className="relative">
                    {on(l.id) && (
                      <m.span
                        layoutId="nav-pill"
                        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34 }}
                        className="absolute inset-0 rounded-full bg-bg"
                      />
                    )}
                    <AnchorLink
                      href={l.href}
                      ariaCurrent={on(l.id) ? "true" : undefined}
                      className={cn("relative block rounded-full px-3.5 py-2.5 transition-colors duration-300 hover:text-fg", on(l.id) && "text-fg")}
                    >
                      {l.label}
                    </AnchorLink>
                  </li>
                ))}
              </ul>
              <AnchorLink
                href={byId.contact.href}
                className="group ml-1 inline-flex h-10 items-center gap-2.5 rounded-full bg-fg pl-4 pr-1.5 text-[15px] font-medium tracking-[-0.015em] text-bg transition-colors duration-300 hover:bg-accent md:ml-2"
              >
                {byId.contact.label}
                <span className="grid h-7 w-7 place-items-center rounded-full bg-bg-1 text-fg transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5">
                  <ArrowRight size={15} strokeWidth={2} />
                </span>
              </AnchorLink>
            </div>
            <button
              ref={toggle}
              type="button"
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-bg-1 text-fg md:h-[52px] md:w-[52px] lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span aria-hidden className="relative block h-3 w-3.5">
                <span className={cn("absolute left-0 top-[3px] h-0.5 w-full bg-fg transition-transform duration-300", open && "translate-y-[2.5px] rotate-45")} />
                <span className={cn("absolute bottom-[3px] left-0 h-0.5 w-full bg-fg transition-transform duration-300", open && "-translate-y-[1.5px] -rotate-45")} />
              </span>
            </button>
          </div>

          <span
            ref={progress}
            aria-hidden
            style={{ transform: "scaleX(0)" }}
            className={cn("absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent transition-opacity duration-500", scrolled && !open ? "opacity-100" : "opacity-0")}
          />
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <m.div
            id="site-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto overflow-x-hidden bg-bg/90 px-5 pb-10 pt-28 backdrop-blur-xl lg:hidden"
            data-lenis-prevent
          >
            <ul className="flex flex-col">
              {[...navLinks, { label: "Résumé", href: "/resume", id: "resume" }].map((l, i) => (
                <m.li
                  key={l.id}
                  initial={reduce ? false : { opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.05 * i, ease: EASE }}
                  className="border-b border-line-strong/60"
                >
                  {l.href.startsWith("/#") ? (
                    <AnchorLink href={l.href} onNavigate={() => setOpen(false)} className="display block py-3.5 text-[2.9rem]">
                      {l.label}
                    </AnchorLink>
                  ) : (
                    <Link href={l.href} onClick={() => setOpen(false)} className="display block py-3.5 text-[2.9rem]">
                      {l.label}
                    </Link>
                  )}
                </m.li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-2 text-[17px]">
              <a href={`mailto:${site.email}`} className="text-fg underline decoration-line-strong underline-offset-4">
                {site.email}
              </a>
              <p className="flex items-center gap-2 text-fg-muted">
                <Dot /> {site.availability} · {site.location}
              </p>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </LazyMotion>
  );
}

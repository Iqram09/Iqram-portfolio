"use client";

import { useEffect, useRef } from "react";
import { site } from "@/data/site";
import Mosaic from "@/components/home/Mosaic";
import MumbaiClock from "@/components/brand/MumbaiClock";
import { Dot } from "@/components/ui/Bits";
import { ArrowRight, ArrowUpRight, FileText, Github, Linkedin, Mail, Phone } from "@/components/ui/Icons";
import { useGsap } from "@/lib/useGsap";
import { prefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/cn";

const EASE = [0.16, 1, 0.3, 1] as const;

const rows = [
  { k: "Email", v: site.email, href: `mailto:${site.email}`, Icon: Mail },
  { k: "LinkedIn", v: `linkedin.com/in/${site.linkedinHandle}`, href: site.linkedin, external: true, Icon: Linkedin },
  { k: "GitHub", v: `github.com/${site.githubHandle}`, href: site.github, external: true, Icon: Github },
  { k: "Résumé", v: "View or download the CV", href: "/resume", Icon: FileText },
  { k: "Phone", v: site.phone, href: site.phoneHref, Icon: Phone },
];

// Each line of the close sits in its own run of cells.
const closing = [
  { text: "Let’s build", w: "w-[calc(var(--cell)*5)] md:w-[calc(var(--cell)*6)]" },
  { text: "something", w: "w-[calc(var(--cell)*5)] md:w-[calc(var(--cell)*5)]" },
  { text: "intelligent.", w: "w-[calc(var(--cell)*5)] md:w-[calc(var(--cell)*5)]" },
];

/** The closing sequence: the mosaic, then how to get in touch. */
export default function ContactSection() {
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLUListElement>(null);

  // Rows render visible (server HTML, no-JS, reduced motion). On the client,
  // rows still below the fold are lowered out of sight, then rise in turn as
  // the list arrives — with Framer Motion's animate(), loaded on demand so its
  // engine stays out of the first paint.
  useEffect(() => {
    const el = list.current;
    if (!el || prefersReducedMotion() || typeof IntersectionObserver === "undefined") return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;
    const items = Array.from(el.querySelectorAll("li"));
    items.forEach((li) => {
      li.style.opacity = "0";
      li.style.transform = "translateY(24px)";
    });
    let cancelled = false;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        obs.disconnect();
        import("framer-motion").then(({ animate, stagger }) => {
          if (cancelled) return;
          animate(items, { opacity: 1, y: 0 }, { duration: 0.9, delay: stagger(0.08), ease: EASE });
        });
      },
      { rootMargin: "0px 0px -80px 0px" }
    );
    obs.observe(el);
    return () => {
      cancelled = true;
      obs.disconnect();
      items.forEach((li) => {
        li.style.opacity = "";
        li.style.transform = "";
      });
    };
  }, []);

  // The wall assembles: tiles drop in, then the bars wipe open under the words.
  useGsap(root, ({ gsap }, el) => {
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 62%", once: true } });
    tl.from(gsap.utils.toArray("[data-tile] > div", el), { scale: 0, transformOrigin: "50% 50%", duration: 0.7, ease: "power3.out", stagger: 0.035 })
      .from("[data-bar]", { scaleX: 0, transformOrigin: "0% 50%", duration: 0.8, ease: "power3.inOut", stagger: 0.1 }, 0.1)
      .from("[data-closing]", { yPercent: 45, opacity: 0, duration: 1, ease: "power4.out", stagger: 0.1 }, 0.4)
      .from("[data-closing-cta]", { opacity: 0, y: 16, duration: 0.7, ease: "power3.out" }, 0.8);
  });

  return (
    <section ref={root} id="contact" className="on-dark overflow-hidden bg-night text-inv" aria-labelledby="contact-title">
      <Mosaic>
        <div className="absolute left-0 top-[calc(var(--cell)*2)] px-0 md:left-[calc(var(--cell)*3)]">
          <h2
            id="contact-title"
            className="isolate font-display text-[calc(var(--cell)*1.06)] font-medium leading-none tracking-[-0.035em] md:text-[calc(var(--cell)*1.02)]"
          >
            {closing.map((l, i) => (
              <span key={l.text} className={cn("relative block h-[var(--cell)]", l.w)}>
                <span aria-hidden data-bar className="absolute inset-0 bg-[#333331]" />
                <span data-closing className="relative z-10 block whitespace-nowrap pl-5 leading-[calc(var(--cell)*0.94)] md:pl-[0.14em]">
                  {l.text}
                  {i < closing.length - 1 ? " " : null}
                </span>
              </span>
            ))}
          </h2>
        </div>
        <a
          data-closing-cta
          href={`mailto:${site.email}`}
          className="group absolute left-5 top-[calc(var(--cell)*5.2)] inline-flex h-11 items-center gap-2 rounded-full bg-accent-soft pl-4 pr-3.5 text-[15px] font-medium tracking-[-0.015em] text-fg transition-colors duration-300 hover:bg-white md:left-[calc(var(--cell)*8.2)] md:top-[calc(var(--cell)*4.5)] md:h-[52px] md:-translate-y-1/2 md:gap-2.5 md:pl-5 md:pr-4 md:text-[18px]"
        >
          {site.availability}
          <ArrowRight size={18} className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
        </a>
      </Mosaic>

      <div className="container-site py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col lg:col-span-5">
            <p className="max-w-md text-pretty text-[clamp(1.4rem,2vw,1.7rem)] leading-[1.34] tracking-[-0.025em]">
              Open to full-time AI and software engineering roles, and to freelance projects — from architecture to
              deployment.
            </p>
            <div className="mt-12 lg:mt-auto">
              <p className="display text-[clamp(4.2rem,9.4vw,8.4rem)] leading-[0.9] tabular-nums">
                <MumbaiClock short />
              </p>
              <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-[17px] text-inv-muted">
                <span>{site.location} · IST</span>
                <span className="inline-flex items-center gap-2.5">
                  <Dot pulse tone="soft" /> {site.availability}
                </span>
              </p>
            </div>
          </div>

          <ul ref={list} className="rounded-[18px] border border-white/20 px-5 md:px-8 lg:col-span-6 lg:col-start-7">
            {rows.map((r, i) => (
              <li key={r.k} className="border-b border-white/15 last:border-b-0">
                <a
                  href={r.href}
                  target={r.external ? "_blank" : undefined}
                  rel={r.external ? "noopener noreferrer" : undefined}
                  className="group grid grid-cols-[1fr_auto] items-center gap-x-4 py-5 md:py-6"
                >
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 text-[15px] text-inv-muted">
                      <r.Icon size={14} /> {r.k}
                    </span>
                    <span
                      className={cn(
                        "mt-1 block truncate tracking-[-0.025em] transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5",
                        i === 0 ? "text-[clamp(1.45rem,2.4vw,2rem)]" : "text-[clamp(1.1rem,1.7vw,1.4rem)]"
                      )}
                    >
                      {r.v}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={22}
                    className="text-inv-dim transition-[color,transform] duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-inv"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

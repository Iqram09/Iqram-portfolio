"use client";

import { useEffect, useRef } from "react";
import { site } from "@/data/site";
import Glow from "@/components/brand/Glow";
import CutLine from "@/components/brand/CutLine";
import Viewfinder from "@/components/brand/Viewfinder";
import MumbaiClock from "@/components/brand/MumbaiClock";
import { ArrowUpRight, FileText, Github, Linkedin, Mail, Phone } from "@/components/ui/Icons";
import { useGsap } from "@/lib/useGsap";
import { prefersReducedMotion } from "@/lib/motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const rows = [
  { k: "Email", v: site.email, href: `mailto:${site.email}`, Icon: Mail },
  { k: "LinkedIn", v: `linkedin.com/in/${site.linkedinHandle}`, href: site.linkedin, external: true, Icon: Linkedin },
  { k: "GitHub", v: `github.com/${site.githubHandle}`, href: site.github, external: true, Icon: Github },
  { k: "Résumé", v: "View or download the CV", href: "/resume", Icon: FileText },
  { k: "Phone", v: site.phone, href: site.phoneHref, Icon: Phone },
];

/** Scene 09 — the closing shot. */
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

  // The closing line resolves from wide, dim letters to its set tracking.
  useGsap(root, ({ gsap }, el) => {
    gsap.fromTo(
      "[data-closing] > span",
      { letterSpacing: "0.06em", opacity: 0.25 },
      {
        letterSpacing: "-0.045em",
        opacity: 1,
        ease: "none",
        stagger: 0.15,
        scrollTrigger: { trigger: el, start: "top 85%", end: "top 25%", scrub: 0.8 },
      }
    );
  });

  return (
    <section ref={root} id="contact" className="relative isolate overflow-hidden bg-night pb-16 pt-32 md:pt-44" aria-labelledby="contact-title">
        <div aria-hidden className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-bg to-transparent" />
        <Glow tone="blue" drift className="-right-[16rem] -top-[10rem] w-[1000px] [--glow-opacity:0.3]" />
        <Glow tone="warm" className="-bottom-[20rem] -left-[16rem] w-[900px] [--glow-opacity:0.4]" />
        <div aria-hidden className="absolute inset-0 bg-reeded opacity-40 [mask-image:radial-gradient(60%_60%_at_80%_30%,black,transparent)]" />
        <CutLine animate glint={0.58} className="left-[-5%] top-[46%] h-[14%] w-[110%] opacity-60" />

        <div className="container-site relative">
          <div className="hud flex items-center gap-4">
            <span className="text-warm-soft">Scene 09</span>
            <span aria-hidden className="ticks h-2 flex-1 opacity-40" />
            <span className="hidden sm:inline">Contact</span>
            <span aria-hidden>09 / 09</span>
          </div>

          <h2 id="contact-title" data-closing className="display mt-16 text-[clamp(2.8rem,8.6vw,9rem)] md:mt-24">
            <span className="block text-chrome">Let&rsquo;s build</span>
            <span className="block text-chrome">something</span>
            <span className="block text-chrome">intelligent.</span>
          </h2>

          <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="max-w-sm text-pretty text-lg leading-relaxed text-fg-muted">
                Open to full-time AI and software engineering roles, and to freelance projects — from architecture to
                deployment.
              </p>
              <div className="glass relative mt-10 inline-flex flex-col gap-3 overflow-hidden rounded-2xl px-6 py-5">
                <Viewfinder inset="inset-2" />
                <span className="hud inline-flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-ok opacity-60 node-pulse" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ok" />
                  </span>
                  {site.availability}
                </span>
                <span className="font-mono text-sm text-fg">
                  {site.location} · IST <MumbaiClock className="tabular-nums" />
                </span>
              </div>
            </div>

            <ul ref={list} className="border-t border-line lg:col-span-7 lg:col-start-6">
              {rows.map((r, i) => (
                <li key={r.k} className="border-b border-line">
                  <a
                    href={r.href}
                    target={r.external ? "_blank" : undefined}
                    rel={r.external ? "noopener noreferrer" : undefined}
                    className="group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 py-6 transition-colors md:grid-cols-[8rem_1fr_auto] md:py-7"
                  >
                    <span className="hud col-span-2 inline-flex items-center gap-2 md:col-span-1">
                      <r.Icon size={13} /> {r.k}
                    </span>
                    <span
                      className={`min-w-0 truncate font-display font-medium tracking-tight text-fg transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5 ${
                        i === 0 ? "text-[1.6rem] md:text-4xl" : "text-xl md:text-2xl"
                      }`}
                    >
                      {r.v}
                    </span>
                    <ArrowUpRight size={18} className="text-fg-dim transition-[color,transform] duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-fg" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
    </section>
  );
}

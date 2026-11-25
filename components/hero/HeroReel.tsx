"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { clients } from "@/data/experience";
import { kong, kongImages } from "@/data/kong";
import { prefersReducedMotion } from "@/lib/motion";
import { ArrowUpRight } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

const INTERVAL = 3600;

type Slide = { label: string; href: string; external: boolean; ground: string; art: "photo" | "sheet"; src: string };

const slides: Slide[] = [
  { label: clients[0].name, href: clients[0].url, external: true, ground: "bg-dusk", art: "photo", src: "/crops/stans-portrait.jpg" },
  { label: kong.title, href: `/projects/${kong.slug}`, external: false, ground: "bg-cobalt", art: "sheet", src: kongImages.agentDiagnosis.src },
  { label: clients[1].name, href: clients[1].url, external: true, ground: "bg-camel", art: "photo", src: "/crops/proximo-portrait.jpg" },
];

/** The small work card that leans into the headline, wiping upward through three projects. */
export default function HeroReel({ className }: { className?: string }) {
  // `step` only ever grows, so each turn gets a higher layer than the last.
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setStep((s) => s + 1);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, []);

  const n = slides.length;
  const current = step % n;
  const previous = step > 0 ? (step - 1) % n : -1;

  return (
    <div className={cn("relative overflow-hidden rounded-[3px] bg-dusk", className)}>
      {slides.map((s, i) => {
        const isCurrent = i === current;
        const isPrevious = i === previous;
        return (
          <a
            key={s.label}
            href={s.href}
            target={s.external ? "_blank" : undefined}
            rel={s.external ? "noopener noreferrer" : undefined}
            tabIndex={isCurrent ? undefined : -1}
            aria-hidden={!isCurrent}
            aria-label={s.external ? `${s.label} (opens in a new tab)` : s.label}
            className={cn(
              "absolute inset-0 block",
              s.ground,
              isCurrent ? "z-20" : isPrevious ? "z-10" : "z-0",
              // The newcomer wipes up over the one it replaces; the rest wait, closed.
              isCurrent && step > 0 && "transition-[clip-path] duration-1000 ease-out-expo",
              isCurrent || isPrevious ? "[clip-path:inset(0)]" : "[clip-path:inset(100%_0_0_0)]"
            )}
          >
            {s.art === "photo" ? (
              <Image src={s.src} alt="" fill quality={85} sizes="200px" priority={i === 0} loading={i === 0 ? undefined : "lazy"} className="object-cover" />
            ) : (
              <span aria-hidden className="absolute left-[14%] top-[36%] block aspect-[1059/817] w-[170%] origin-top-left -rotate-6 overflow-hidden rounded-[3px]">
                <Image src={s.src} alt="" fill quality={90} sizes="400px" loading="lazy" className="object-cover object-left-top" />
              </span>
            )}
            <span className="absolute inset-x-3 top-3 text-[14px] font-medium leading-tight tracking-[-0.015em] text-white [text-shadow:0_1px_10px_rgba(0,0,0,.4)]">
              {s.label}
            </span>
            <ArrowUpRight size={18} className="absolute bottom-3 right-3 text-white" />
          </a>
        );
      })}
    </div>
  );
}

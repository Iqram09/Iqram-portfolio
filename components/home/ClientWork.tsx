import Image from "next/image";
import { clients } from "@/data/experience";
import SectionHead from "@/components/ui/SectionHead";
import ScaleIn from "@/components/motion/ScaleIn";
import HoverTag from "@/components/ui/HoverTag";
import Reveal from "@/components/ui/Reveal";
import { CircleArrow, Dot, DotList, Tag } from "@/components/ui/Bits";
import { ArrowUpRight } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

/* How each live site is staged: a ground cropped from its own photography and a tilted browser. */
const stage: Record<string, { ground: string; shade: string; browser: string; screen: string }> = {
  "Stans Buildtech": {
    ground: "/crops/stans-ground.jpg",
    shade: "bg-[linear-gradient(180deg,rgba(24,32,54,0)_30%,rgba(24,32,54,.6))]",
    browser: "left-[9%] top-[27%] w-[128%] -rotate-[7deg]",
    screen: "bg-dusk",
  },
  Proximo: {
    ground: "/crops/proximo-ground.jpg",
    shade: "bg-[linear-gradient(180deg,rgba(92,58,34,0)_40%,rgba(92,58,34,.4))]",
    browser: "left-[-26%] top-[44%] w-[118%] rotate-[6deg]",
    screen: "bg-camel",
  },
};

/** Freelance client work — both sites live. */
export default function ClientWork() {
  return (
    <section id="clients" className="overflow-hidden bg-bg pb-24 pt-4 md:pb-36" aria-labelledby="clients-title">
      <div className="container-site">
        <SectionHead
          eyebrow="Client work"
          id="clients-title"
          title="Shipped for real clients"
          lede="Since March 2026 I've been building and launching websites for businesses — from the interface down to the database and storage."
          aside={
            <span className="inline-flex items-center gap-2 text-[15px] text-fg-muted">
              <Dot pulse />
              {clients.length} sites live
            </span>
          }
        />

        <ol className="mt-14 grid gap-x-10 gap-y-20 md:mt-20 md:grid-cols-2 lg:gap-x-[10%]">
          {clients.map((c) => {
            const s = stage[c.name];
            return (
              <li key={c.name}>
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="group block rounded-[4px]">
                  <span className="sr-only">(opens in a new tab)</span>
                  <ScaleIn>
                    <HoverTag
                      label={
                        <>
                          Visit <ArrowUpRight size={16} />
                        </>
                      }
                    >
                      <div className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-dusk">
                        <Image src={s.ground} alt="" fill quality={85} sizes="(min-width: 1280px) 540px, (min-width: 768px) 45vw, 92vw" className="object-cover" />
                        <div aria-hidden className={cn("absolute inset-0", s.shade)} />

                        {/* The live homepage, in a browser. */}
                        <div className={cn("absolute", s.browser)}>
                          <div className={cn("overflow-hidden rounded-lg shadow-[0_50px_90px_-30px_rgba(0,0,0,.7)] transition-transform duration-[1200ms] ease-out-expo group-hover:-translate-y-3 group-hover:scale-[1.03]", s.screen)}>
                            <div className="flex h-7 items-center gap-1.5 bg-bg-1 px-3" aria-hidden>
                              <i className="h-2 w-2 rounded-full bg-bg-3" />
                              <i className="h-2 w-2 rounded-full bg-bg-3" />
                              <i className="h-2 w-2 rounded-full bg-bg-3" />
                            </div>
                            <Image
                              src={c.image.src}
                              alt={c.image.alt}
                              width={c.image.w}
                              height={c.image.h}
                              quality={90}
                              // Wider than its box (128% of the card): a tilted capture needs spare pixels to stay crisp.
                              sizes="(min-width: 1280px) 960px, (min-width: 768px) 80vw, 140vw"
                              className="w-full"
                            />
                          </div>
                        </div>

                        <Tag className="absolute left-4 top-4 md:left-5 md:top-5">https://{c.domain}</Tag>
                      </div>
                    </HoverTag>
                  </ScaleIn>

                  <Reveal className="mt-6 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-[28px] font-medium leading-tight tracking-[-0.03em] md:text-[32px]">{c.name}</h3>
                      <p className="dots mt-1 text-[17px] tracking-[-0.015em] text-fg-dim">
                        <span>{c.sector.split(" · ")[0]}</span>
                        {c.sector.split(" · ")[1] ? <span>{c.sector.split(" · ")[1]}</span> : null}
                        <span>{c.role}</span>
                        <span>{c.year}</span>
                      </p>
                    </div>
                    <CircleArrow className="mt-1" />
                  </Reveal>
                </a>
                <Reveal delay={80}>
                  <p className="mt-5 max-w-[52ch] text-pretty text-[17px] leading-[1.5] tracking-[-0.01em]">{c.summary}</p>
                  <DotList items={c.technologies} label="Technologies" className="mt-4" />
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

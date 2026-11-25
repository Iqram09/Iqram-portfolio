import type { CSSProperties } from "react";
import { site } from "@/data/site";
import Button from "@/components/ui/Button";
import { Dot } from "@/components/ui/Bits";
import HeroReel from "@/components/hero/HeroReel";
import MumbaiClock from "@/components/brand/MumbaiClock";
import { Download } from "@/components/ui/Icons";

// site.headline, broken into three stepped lines.
const lines = [
  { text: "I build", indent: "pl-[1.1em] lg:pl-[1.62em]" },
  { text: "intelligent", indent: "pl-0 lg:pl-[0.24em]" },
  { text: "systems.", indent: "pl-[0.42em] lg:pl-[0.96em]" },
];

const delay = (ms: number) => ({ animationDelay: `${ms}ms` }) as CSSProperties;

/**
 * The opening. Everything enters in CSS: the headline is the LCP element and
 * has to paint before hydration, so it rises but never starts transparent.
 */
export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pb-14 md:pb-16" aria-labelledby="hero-title">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute -right-[12%] -top-[30%] h-[95%] w-[62%] bg-[radial-gradient(closest-side,rgba(242,201,196,.62),rgba(198,154,102,.16)_58%,transparent)]" />
        <div className="absolute left-[24%] top-[18%] h-[60%] w-[42%] bg-grid [mask-image:radial-gradient(closest-side,black,transparent)]" />
      </div>

      <div className="container-site relative pt-[calc(var(--nav-h)+36px)] lg:pt-[calc(var(--nav-h)+36px)]">
        {/* Everything in here is measured in ems of the headline. The 11rem cap is where
            "systems." would meet the side column. */}
        <div className="relative text-[min(22.4vw,11.2rem)] lg:text-[min(12.4vw,20.5svh,11rem)]">
          <HeroReel className="card-in !absolute left-0 top-0 hidden h-[1.36em] w-[1.06em] lg:block" />

          <div className="pb-5 lg:pb-[0.13em] lg:pl-[1.66em] lg:pt-[0.3em]">
            <p className="fade-rise text-center text-[13px] uppercase leading-[1.45] tracking-caps text-fg-muted lg:text-left" style={delay(260)}>
              {site.identity.split(" | ").map((part, i) => (
                <span key={part} className="block">
                  {i > 0 && <span className="sr-only">, </span>}
                  {part}
                </span>
              ))}
            </p>
          </div>

          <h1 id="hero-title" className="display leading-[0.86]">
            {lines.map((line, i) => (
              <span key={line.text} className="line-mask">
                <span className={`line-rise ${line.indent}`} style={delay(80 + i * 110)}>
                  {line.text}
                </span>
              </span>
            ))}
          </h1>
        </div>

        <div className="mt-9 flex flex-col md:mt-14 lg:absolute lg:bottom-1 lg:right-10 lg:mt-0 lg:w-[min(34vw,430px)]">
          {/* On phones this paragraph is the LCP element: it rises but never starts transparent. */}
          <p className="rise-only text-pretty text-[17px] leading-[1.45] tracking-[-0.01em]" style={delay(340)}>
            {site.intro}
          </p>
          <div className="fade-rise mt-7 flex flex-wrap gap-3" style={delay(520)}>
            <Button href="/#work">Selected work</Button>
            <Button href={site.resumeFile} variant="secondary" download={site.resumeDownloadName}>
              <Download size={17} /> Download CV
            </Button>
          </div>
          <p className="fade-rise mt-7 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[14px] text-fg-muted" style={delay(640)}>
            <span className="inline-flex items-center gap-2">
              <Dot pulse />
              {site.availability}
            </span>
            <span>{site.location}</span>
            <span>
              IST <MumbaiClock className="tabular-nums" />
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

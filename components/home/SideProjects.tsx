import type { ReactNode } from "react";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import SectionHead from "@/components/ui/SectionHead";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { ArrowUpRight, Github } from "@/components/ui/Icons";

/* Drawn covers: one plain idea per project. Decorative. */

function RouteCover() {
  return (
    <svg viewBox="0 0 400 520" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden focusable={false}>
      <rect width="400" height="520" fill="#1F6B4A" />
      <g stroke="#2E8460" strokeWidth="26" fill="none">
        <path d="M-20 92H420M-20 236H420M-20 398H420M74-20V540M214-20V540M338-20V540" />
        <path d="M-20 470 420 150" strokeWidth="34" />
      </g>
      <path
        d="M74 420V236H214V92H338"
        fill="none"
        stroke="#F2C9C4"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        className="[stroke-dasharray:1] [stroke-dashoffset:0] transition-[stroke-dashoffset] duration-[1600ms] ease-out-expo group-hover:[stroke-dashoffset:0.62]"
      />
      <circle cx="74" cy="420" r="20" fill="#F2C9C4" />
      <path d="M338 20c-25 0-44 19-44 43 0 32 44 70 44 70s44-38 44-70c0-24-19-43-44-43Z" fill="#fff" />
      <circle cx="338" cy="63" r="16" fill="#1F6B4A" />
    </svg>
  );
}

function ScreenCover() {
  const tiles = [
    [-30, 40, "#9C2648"], [112, 40, "#F2C9C4"], [254, 40, "#A8345A"], [396, 40, "#C69A66"],
    [-84, 226, "#B9486B"], [58, 226, "#5E0C22"], [200, 226, "#BFD5EE"], [342, 226, "#9C2648"],
    [-30, 412, "#C69A66"], [112, 412, "#A8345A"], [254, 412, "#5E0C22"], [396, 412, "#F2C9C4"],
  ] as const;
  return (
    <svg viewBox="0 0 400 520" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden focusable={false}>
      <rect width="400" height="520" fill="#7F1330" />
      <g className="transition-transform duration-[1600ms] ease-out-expo group-hover:translate-x-[-22px]">
        <g transform="rotate(-12 200 260)">
          {tiles.map(([x, y, f]) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="126" height="170" rx="6" fill={f} />
          ))}
        </g>
      </g>
      <g className="origin-center transition-transform duration-700 ease-out-expo [transform-box:fill-box] group-hover:scale-110">
        <circle cx="200" cy="218" r="58" fill="#fff" />
        <path d="M184 190v56l46-28z" fill="#7F1330" />
      </g>
    </svg>
  );
}

function ChartCover() {
  const bars = [120, 176, 148, 232, 196, 286, 250];
  return (
    <svg viewBox="0 0 400 520" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden focusable={false}>
      <rect width="400" height="520" fill="#1F3FBF" />
      {[110, 190, 270, 350].map((y) => (
        <path key={y} d={`M0 ${y}H400`} stroke="#3C5BDA" strokeWidth="1.5" />
      ))}
      {bars.map((h, i) => (
        <rect
          key={i}
          x={24 + i * 52}
          y={400 - h}
          width="38"
          height={h + 140}
          fill={i === 5 ? "#F2C9C4" : "#BFD5EE"}
          className="origin-bottom transition-transform duration-[900ms] ease-out-expo [transform-box:fill-box] group-hover:scale-y-[1.08]"
          style={{ transitionDelay: `${i * 35}ms` }}
        />
      ))}
      <circle cx="303" cy="74" r="20" fill="#fff" />
    </svg>
  );
}

const covers: Record<string, ReactNode> = {
  "food-delivery-app": <RouteCover />,
  "streaming-platform": <ScreenCover />,
  "hospitality-expense-analysis": <ChartCover />,
};

/** Side projects from the CV, on the dark band. */
export default function SideProjects() {
  return (
    <section id="also-built" className="on-dark overflow-hidden bg-night py-24 text-inv md:py-32" aria-labelledby="also-title">
      <div className="container-site">
        <SectionHead
          eyebrow={projects.map((p) => p.category).join(" · ")}
          id="also-title"
          title="Also built"
          tone="dark"
          titleClassName="display text-[clamp(2.9rem,6vw,5.25rem)]"
        />
      </div>
      <ul className="mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-auto md:mt-16 md:grid md:max-w-site md:grid-cols-3 md:overflow-visible md:px-10">
        {projects.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={i * 90} className="w-[82vw] max-w-[380px] shrink-0 snap-center md:w-auto md:max-w-none">
            <a href={p.github} target="_blank" rel="noopener noreferrer" className="group relative block h-full overflow-hidden rounded-lg">
              <div className="h-[560px] overflow-hidden lg:h-[600px]">{covers[p.slug]}</div>
              <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(14,14,14,.72)_24%,rgba(14,14,14,.94))] px-5 pb-6 pt-24">
                <p className="text-[14px] text-white/80">{p.category}</p>
                <h3 className="mt-1 text-[26px] font-medium leading-[1.12] tracking-[-0.03em] text-white">
                  {p.title} <span className="whitespace-nowrap text-white/65">— {p.subtitle}</span>
                </h3>
                <p className="mt-3 text-[16px] leading-[1.45] text-white/85">{p.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 border-b border-white/40 pb-0.5 text-[16px] font-medium text-white transition-colors group-hover:border-white">
                  <Github size={15} /> Source{" "}
                  <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </a>
          </Reveal>
        ))}
      </ul>
      <div className="mt-12 flex justify-center px-5 md:mt-14">
        <Button href={site.github} external variant="light">
          <Github size={17} /> github.com/{site.githubHandle}
        </Button>
      </div>
    </section>
  );
}

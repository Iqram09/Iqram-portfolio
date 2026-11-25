import Link from "next/link";
import { kong, headlineMetrics, evalRun } from "@/data/kong";
import { caseSections } from "@/components/case-study/sections";
import SectionHead from "@/components/ui/SectionHead";
import KongShowcase from "@/components/home/KongShowcase";
import ScaleIn from "@/components/motion/ScaleIn";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { DotList } from "@/components/ui/Bits";
import { ArrowRight, Github } from "@/components/ui/Icons";

const href = `/projects/${kong.slug}`;

const facts = [
  { k: "Year", v: "2026" },
  { k: "Type", v: "Reference implementation" },
  { k: "Stack", v: "TypeScript · MCP · Kong 3.9" },
];

export default function FeaturedWork() {
  return (
    <section id="work" className="overflow-hidden bg-bg py-24 md:py-36" aria-labelledby="work-title">
      <div className="container-site">
        <SectionHead
          eyebrow="Featured system"
          id="work-title"
          title={kong.title}
          lede={kong.subtitle}
          aside={
            <dl className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[15px]">
              {facts.map((f) => (
                <div key={f.k} className="flex gap-2">
                  <dt className="text-fg-dim">{f.k}</dt>
                  <dd>{f.v}</dd>
                </div>
              ))}
            </dl>
          }
        />

        <ScaleIn className="mt-14 md:mt-20" from={0.78}>
          <KongShowcase />
        </ScaleIn>

        <div className="mt-16 grid gap-14 md:mt-24 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-6">
            <p className="text-pretty text-[clamp(1.35rem,2vw,1.7rem)] leading-[1.38] tracking-[-0.02em]">
              An MCP server that lets an LLM agent investigate a Kong Gateway through fourteen read-only, bounded,
              schema-validated tools. A deterministic diagnostic engine produces the facts, a bounded agent loop produces
              the explanation, and an evaluation harness measures whether it works.
            </p>
            <blockquote className="mt-12">
              <p className="display text-[clamp(2.3rem,4vw,3.6rem)] leading-[1.02]">
                {kong.principle.a}
                <br />
                <span className="text-accent">{kong.principle.b}</span>
              </p>
            </blockquote>
            <DotList items={kong.stack} label="Technologies" className="mt-10" />
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={href}>
                Read the case study <ArrowRight size={17} />
              </Button>
              <Button href={kong.repo} variant="secondary" external>
                <Github size={16} /> Source
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5 lg:col-start-8">
            <dl className="grid grid-cols-2 gap-2">
              {headlineMetrics.map((m) => (
                <div key={m.label} className="flex min-h-[190px] flex-col bg-bg-1 p-5 md:min-h-[210px] md:p-6">
                  <dt className="order-2 mt-auto pt-6 text-[17px] font-medium tracking-[-0.015em]">{m.label}</dt>
                  <dd className="display order-1 text-[clamp(3.4rem,5.4vw,5rem)] tabular-nums">
                    {m.value}
                    {m.suffix}
                  </dd>
                  <dd className="order-3 mt-1 text-[14px] leading-snug text-fg-dim">{m.note}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-[15px] leading-relaxed text-fg-muted">
              {evalRun.caveat} Finding recall is the share of expected diagnostic codes the deterministic engine produced
              during {evalRun.id} — not a general accuracy claim.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">{kong.status}</p>
          </Reveal>
        </div>

        {/* Case-study navigation. */}
        <Reveal className="mt-20 md:mt-28">
          <nav aria-label="Case study chapters">
            <p className="eyebrow">Inside the case study</p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {caseSections.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`${href}#${s.id}`}
                    className="group flex items-center gap-4 rounded-lg border border-line bg-bg-1 p-1.5 pr-5 transition-colors duration-300 hover:border-fg"
                  >
                    <span className="grid h-[58px] w-[74px] shrink-0 place-items-center rounded-md border border-line text-[21px] tracking-[-0.02em] tabular-nums transition-colors duration-300 group-hover:border-fg group-hover:bg-fg group-hover:text-bg">
                      {s.n}
                    </span>
                    <span className="text-[17px] tracking-[-0.015em]">{s.title}</span>
                    <ArrowRight size={17} className="ml-auto text-fg-dim transition-transform duration-500 ease-out-expo group-hover:translate-x-1 group-hover:text-fg" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>
      </div>
    </section>
  );
}

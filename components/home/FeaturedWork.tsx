import Link from "next/link";
import { kong, headlineMetrics, evalRun } from "@/data/kong";
import { caseSections } from "@/components/case-study/sections";
import SceneHeader from "@/components/home/SceneHeader";
import KongShowcase from "@/components/home/KongShowcase";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Glow from "@/components/brand/Glow";
import { ArrowRight, ArrowUpRight, Github } from "@/components/ui/Icons";

const href = `/projects/${kong.slug}`;

export default function FeaturedWork() {
  return (
    <section id="work" className="relative overflow-hidden bg-bg pb-28 pt-8 md:pb-40" aria-labelledby="work-title">
      <Glow tone="blue" className="-left-[30rem] top-[30%] w-[900px] [--glow-opacity:0.18]" />
      <div className="container-site relative">
        <SceneHeader
          index="03"
          label="Featured system"
          id="work-title"
          title={kong.title}
          lede={kong.subtitle}
          aside={
            <dl className="grid grid-cols-3 gap-6 font-mono text-[11px] lg:grid-cols-1 lg:gap-3 lg:text-right">
              <div>
                <dt className="hud">Year</dt>
                <dd className="mt-1 text-fg">2026</dd>
              </div>
              <div>
                <dt className="hud">Type</dt>
                <dd className="mt-1 text-fg">Reference implementation</dd>
              </div>
              <div>
                <dt className="hud">Stack</dt>
                <dd className="mt-1 text-fg">TypeScript · MCP · Kong 3.9</dd>
              </div>
            </dl>
          }
        />

        <Reveal className="mt-14 md:mt-20" y={40}>
          <KongShowcase />
        </Reveal>

        <div className="mt-16 grid gap-14 md:mt-24 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-6">
            <p className="text-pretty text-lg leading-relaxed text-fg-muted">
              An MCP server that lets an LLM agent investigate a Kong Gateway through fourteen read-only, bounded,
              schema-validated tools. A deterministic diagnostic engine produces the facts, a bounded agent loop produces
              the explanation, and an evaluation harness measures whether it works.
            </p>
            <blockquote className="mt-10 border-l border-warm pl-6">
              <p className="font-display text-2xl font-medium leading-snug tracking-tight text-fg md:text-3xl">
                {kong.principle.a}
                <br />
                <span className="text-fg-muted">{kong.principle.b}</span>
              </p>
            </blockquote>
            <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2" aria-label="Technologies">
              {kong.stack.map((t) => (
                <li key={t} className="hud text-fg-muted">
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href={href}>
                Read the case study <ArrowRight size={16} />
              </Button>
              <Button href={kong.repo} variant="secondary" external>
                <Github size={15} /> Source
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5 lg:col-start-8">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-10">
              {headlineMetrics.map((m) => (
                <div key={m.label} className="flex flex-col border-t border-line pt-5">
                  <dt className="order-2 mt-2 text-sm font-medium text-fg">{m.label}</dt>
                  <dd className="order-1 font-display text-5xl font-medium tabular-nums tracking-tightest text-fg">
                    {m.value}
                    <span className="text-fg-dim">{m.suffix}</span>
                  </dd>
                  <dd className="hud order-3 mt-1 normal-case tracking-normal">{m.note}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-sm leading-relaxed text-fg-dim">
              {evalRun.caveat} Finding recall is the share of expected diagnostic codes the deterministic engine produced
              during {evalRun.id} — not a general accuracy claim.
            </p>
            <p className="mt-4 font-mono text-[11px] leading-relaxed text-fg-dim">{kong.status}</p>
          </Reveal>
        </div>

        {/* Case-study navigation. */}
        <Reveal className="mt-20 md:mt-28">
          <nav aria-label="Case study chapters" className="border-t border-line pt-6">
            <p className="hud">Inside the case study</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1 sm:grid-cols-3 lg:grid-cols-6">
              {caseSections.map((s) => (
                <li key={s.id}>
                  <Link
                    href={`${href}#${s.id}`}
                    className="group flex items-baseline gap-2 py-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
                  >
                    <span className="font-mono text-[10.5px] text-warm-soft">{s.n}</span>
                    {s.title}
                    <ArrowUpRight size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
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

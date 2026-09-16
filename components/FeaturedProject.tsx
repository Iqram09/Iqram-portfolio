import Image from "next/image";
import Link from "next/link";
import { kong, headlineMetrics, topology, kongImages } from "@/data/kong";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import Window from "@/components/ui/Window";
import Motif from "@/components/ui/Motif";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight, Github } from "@/components/ui/Icons";

export default function FeaturedProject() {
  const shot = kongImages.agentDiagnosis;
  const href = `/projects/${kong.slug}`;

  return (
    <section id="work" className="scroll-mt-20 py-20 md:py-28" aria-labelledby="featured-title">
      <div className="container-site">
        <Reveal>
          <SectionHeader
            index="01"
            eyebrow="Featured work"
            id="featured-title"
            title={kong.title}
            lede={kong.subtitle}
            aside={
              <div className="flex items-center gap-2 font-mono text-[11px] text-fg-dim">
                <span className="rounded border border-line bg-bg-2 px-2 py-1">reference implementation</span>
                <span className="rounded border border-line bg-bg-2 px-2 py-1">2026</span>
              </div>
            }
          />
        </Reveal>

        <Reveal delay={80} className="mt-10 md:mt-14">
          <article className="group overflow-hidden rounded-2xl border border-line bg-bg-1">
            <div className="grid lg:grid-cols-12">
              {/* Visual */}
              <div className="relative min-w-0 border-b border-line bg-bg-2/40 p-4 sm:p-6 lg:col-span-7 lg:border-b-0 lg:border-r">
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(70%_70%_at_50%_40%,black,transparent)]" />
                <Link href={href} className="relative block rounded-lg focus-visible:outline-offset-4" aria-label="Open the Kong AI Gateway Diagnostics case study">
                  <Window title="npm run agent -- &quot;Why is authentication failing on /payments?&quot;" meta="gemini-3.5-flash-lite">
                    <div className="overflow-hidden">
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        width={shot.w}
                        height={shot.h}
                        sizes="(min-width: 1024px) 700px, 100vw"
                        priority={false}
                        className="w-full transition-transform duration-500 ease-out group-hover:scale-[1.012]"
                      />
                    </div>
                  </Window>
                </Link>

                {/* Topology strip — seeded gateway facts. */}
                <dl className="relative mt-4 grid grid-cols-4 gap-x-3 gap-y-3 sm:grid-cols-7">
                  {topology.map((t) => (
                    <div key={t.label} className="min-w-0">
                      <dt className="truncate font-mono text-[10px] uppercase tracking-wider text-fg-dim">{t.label}</dt>
                      <dd className="font-mono text-base tabular-nums text-fg">{t.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Narrative */}
              <div className="flex min-w-0 flex-col p-6 sm:p-8 lg:col-span-5 lg:p-10">
                <Motif />
                <p className="mt-6 text-pretty text-[15px] leading-relaxed text-fg-muted">
                  An MCP server that lets an LLM agent investigate a Kong Gateway through fourteen read-only,
                  bounded, schema-validated tools. A deterministic diagnostic engine produces the facts, a bounded
                  agent loop produces the explanation, and an evaluation harness measures whether it works.
                </p>

                <blockquote className="mt-6 border-l-2 border-accent pl-4">
                  <p className="text-lg font-medium leading-snug tracking-tight text-fg">
                    {kong.principle.a}
                    <br />
                    <span className="text-fg-muted">{kong.principle.b}</span>
                  </p>
                </blockquote>

                <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
                  {kong.stack.map((t) => (
                    <li key={t} className="rounded border border-line bg-bg-2 px-2 py-1 font-mono text-[11px] text-fg-muted">
                      {t}
                    </li>
                  ))}
                </ul>

                <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line">
                  {headlineMetrics.map((m) => (
                    <div key={m.label} className="bg-bg-1 p-4">
                      <dd className="font-mono text-2xl tabular-nums text-fg">
                        {m.value}
                        {m.suffix}
                      </dd>
                      <dt className="mt-1 text-xs text-fg-muted">
                        {m.label}
                        {m.suffix === "%" && <span className="ml-1 font-mono text-[10px] text-fg-dim">· run-003</span>}
                      </dt>
                    </div>
                  ))}
                </dl>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button href={href}>
                    Read case study <ArrowRight size={16} />
                  </Button>
                  <Button href={kong.repo} variant="secondary" external>
                    <Github size={16} /> GitHub
                  </Button>
                </div>

                <p className="mt-6 font-mono text-[11px] leading-relaxed text-fg-dim">
                  {kong.status}
                </p>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { contextMeasurements, evalRun, failureSummary, kong, tests } from "@/data/kong";
import { ArrowUpRight } from "@/components/ui/Icons";

const layers = [
  { path: "src/mcp", label: "14 read-only tools", owns: "definitions · Zod schemas · shared runner" },
  { path: "src/context", label: "Context management", owns: "references · summaries · limits · pagination" },
  { path: "src/diagnostics", label: "Diagnostic engine", owns: "evidence collector · 11 pure rules" },
  { path: "src/kong", label: "Kong client", owns: "typed · GET only · validated · bounded" },
];

const sides = [
  { path: "src/safety", label: "Safety", owns: "registration gating · audit" },
  { path: "src/telemetry", label: "Telemetry", owns: "JSON logs → stderr · metrics · cost" },
  { path: "src/agent", label: "Agent loop", owns: "steps · repeats · budget · halt" },
  { path: "src/evaluation", label: "Evaluation", owns: "28 cases · deterministic scorer" },
];

function Panel({
  title,
  anchor,
  children,
  className = "",
}: {
  title: string;
  anchor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={`/projects/${kong.slug}#${anchor}`}
      className={`group flex flex-col rounded-xl border border-line bg-bg-1 p-6 transition-colors hover:border-line-strong hover:bg-bg-2/60 ${className}`}
    >
      <div className="flex items-center justify-between">
        <span className="label-mono">{title}</span>
        <ArrowUpRight size={14} className="text-fg-dim transition-colors group-hover:text-fg" />
      </div>
      <div className="mt-5 flex flex-1 flex-col">{children}</div>
    </Link>
  );
}

/** Homepage "Engineering" section — the Kong system's layers and measured properties. */
export default function EngineeringSurface() {
  const raw = contextMeasurements[0].bytes;
  return (
    <section className="border-t border-line py-20 md:py-28" aria-labelledby="eng-title">
      <div className="container-site">
        <Reveal>
          <SectionHeader
            index="04"
            eyebrow="Architecture · Engineering"
            id="eng-title"
            title="Engineering, not just prompting"
            lede="The layers around the model are where the work is. Each panel is a measured property of the Kong project; each links into the case study."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {/* Layered architecture — wide panel */}
          <Reveal className="md:col-span-2 lg:row-span-2">
            <Panel title="layered architecture" anchor="architecture" className="h-full">
              <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
                <ol className="flex flex-col gap-1.5">
                  {layers.map((l, i) => (
                    <li key={l.path} className="relative rounded-md border border-line bg-bg-2 px-3.5 py-2.5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-fg">{l.label}</span>
                        <span className="font-mono text-[10px] text-fg-dim">{l.path}</span>
                      </div>
                      <div className="mt-0.5 font-mono text-[11px] text-fg-muted">{l.owns}</div>
                      {i < layers.length - 1 && (
                        <span aria-hidden className="absolute -bottom-2 left-1/2 h-2 w-px bg-line-strong" />
                      )}
                    </li>
                  ))}
                  <li className="mt-1 rounded-md border border-dashed border-line px-3.5 py-2 font-mono text-[11px] text-fg-dim">
                    ↓ Kong Admin API (GET) → Kong Gateway 3.9.3 + PostgreSQL 17
                  </li>
                </ol>
                <span aria-hidden className="hidden w-px bg-line sm:block" />
                <ul className="flex flex-col gap-1.5">
                  {sides.map((s) => (
                    <li key={s.path} className="rounded-md border border-line/80 bg-bg-1 px-3.5 py-2.5">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm text-fg">{s.label}</span>
                        <span className="font-mono text-[10px] text-fg-dim">{s.path}</span>
                      </div>
                      <div className="mt-0.5 font-mono text-[11px] text-fg-muted">{s.owns}</div>
                    </li>
                  ))}
                  <li className="mt-auto font-mono text-[11px] leading-relaxed text-fg-dim">
                    Invariants: no write path in src/ · facts only from rules over Kong data · stdout is the protocol · every result bounded in one runner.
                  </li>
                </ul>
              </div>
            </Panel>
          </Reveal>

          {/* Context */}
          <Reveal delay={60}>
            <Panel title="context management" anchor="context" className="h-full">
              <div className="font-mono text-3xl tabular-nums text-fg">
                11<span className="text-fg-dim">%</span>
              </div>
              <p className="mt-1 text-sm text-fg-muted">of the raw configuration dump reaches the model for one route diagnosis.</p>
              <ul className="mt-5 flex flex-col gap-2">
                {contextMeasurements.map((m) => (
                  <li key={m.label}>
                    <div className="flex justify-between font-mono text-[10px] text-fg-dim">
                      <span className="truncate">{m.label}</span>
                      <span className="tabular-nums text-fg-muted">{m.bytes.toLocaleString()} B</span>
                    </div>
                    <div className="mt-1 h-1 w-full overflow-hidden rounded bg-bg-3">
                      <div
                        className={`h-full rounded ${m.tone === "accent" ? "bg-accent" : m.tone === "muted" ? "bg-fg-muted" : "bg-line-strong"}`}
                        style={{ width: `${Math.max(2, (m.bytes / raw) * 100)}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>
          </Reveal>

          {/* Safety */}
          <Reveal delay={100}>
            <Panel title="safety" anchor="safety" className="h-full">
              <div className="font-mono text-3xl tabular-nums text-fg">0</div>
              <p className="mt-1 text-sm text-fg-muted">write methods in src/. Read-only by structure, not by prompt.</p>
              <ol className="mt-5 flex flex-wrap gap-1 font-mono text-[10px] text-fg-muted">
                {["read-only", "typed schemas", "bounded output", "deterministic findings", "audit"].map((s, i, a) => (
                  <li key={s} className="flex items-center gap-1">
                    <span className="rounded border border-line bg-bg-2 px-1.5 py-0.5">{s}</span>
                    {i < a.length - 1 && <span aria-hidden className="text-line-strong">→</span>}
                  </li>
                ))}
              </ol>
            </Panel>
          </Reveal>

          {/* Evaluation */}
          <Reveal delay={140}>
            <Panel title={`evaluation · ${evalRun.id}`} anchor="evaluation" className="h-full">
              <div className="font-mono text-3xl tabular-nums text-fg">
                {evalRun.passed}<span className="text-fg-dim">/{evalRun.cases}</span>
              </div>
              <p className="mt-1 text-sm text-fg-muted">
                cases passed with a deterministic scorer and no LLM judge. {evalRun.costPerCase} per case.
              </p>
              <p className="mt-5 font-mono text-[10px] leading-relaxed text-fg-dim">{evalRun.caveat}</p>
            </Panel>
          </Reveal>

          {/* Failures + tests */}
          <Reveal delay={180}>
            <Panel title="failures · tests" anchor="failure-modes" className="h-full">
              <div className="flex items-baseline gap-4">
                <div>
                  <div className="font-mono text-3xl tabular-nums text-fg">{failureSummary.observed}</div>
                  <div className="font-mono text-[10px] text-fg-dim">failures documented</div>
                </div>
                <div>
                  <div className="font-mono text-3xl tabular-nums text-fg">{tests.total}</div>
                  <div className="font-mono text-[10px] text-fg-dim">tests passing</div>
                </div>
              </div>
              <p className="mt-4 text-sm text-fg-muted">
                Each failure carries symptom, root cause, impact, mitigation and a regression test. {failureSummary.provoked} more were deliberately provoked.
              </p>
            </Panel>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

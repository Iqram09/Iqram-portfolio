import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Button from "@/components/ui/Button";
import Motif from "@/components/ui/Motif";
import Window from "@/components/ui/Window";
import Reveal from "@/components/ui/Reveal";
import AgentConsole from "@/components/AgentConsole";
import CaseStudyNav from "@/components/case-study/CaseStudyNav";
import ArchitectureDiagram from "@/components/case-study/ArchitectureDiagram";
import ToolCatalog from "@/components/case-study/ToolCatalog";
import CompressionChart from "@/components/case-study/CompressionChart";
import SafetyChain from "@/components/case-study/SafetyChain";
import TelemetryPanel from "@/components/case-study/TelemetryPanel";
import EvaluationDashboard from "@/components/case-study/EvaluationDashboard";
import FailureModeGrid from "@/components/case-study/FailureModeGrid";
import TestMetrics from "@/components/case-study/TestMetrics";
import { caseSections } from "@/components/case-study/sections";
import { kong, headlineMetrics, topology, demoRun, limitations, kongImages } from "@/data/kong";
import { site } from "@/data/site";
import { ArrowLeft, ArrowUpRight, Github } from "@/components/ui/Icons";

export const metadata: Metadata = {
  title: kong.title,
  description:
    "Case study: an MCP server with 14 read-only tools, a deterministic diagnostic engine, a bounded agent loop and a 28-case evaluation harness for Kong Gateway 3.9.3.",
  openGraph: {
    title: `${kong.title} — ${site.displayName}`,
    description:
      "MCP server · agentic diagnostics · LLM evaluation. 14 tools, 170 tests, 28 evaluation cases, 100% finding recall in run-003.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
};

const S = Object.fromEntries(caseSections.map((s) => [s.id, s])) as Record<
  (typeof caseSections)[number]["id"],
  (typeof caseSections)[number]
>;

function CaseSection({
  id,
  title,
  lede,
  children,
  wide = false,
}: {
  id: keyof typeof S;
  title?: string;
  lede?: ReactNode;
  children: ReactNode;
  wide?: boolean;
}) {
  const s = S[id];
  return (
    <section id={s.id} className="scroll-mt-24 border-t border-line py-14 md:py-20" aria-labelledby={`${s.id}-title`}>
      <Reveal>
        <div className="flex items-center gap-3">
          <span className="section-index">{s.n}</span>
          <span className="h-px w-6 bg-line-strong" aria-hidden />
          <span className="label-mono">{s.title}</span>
        </div>
        <h2 id={`${s.id}-title`} className="mt-4 text-balance text-2xl font-semibold tracking-tight text-fg md:text-3xl">
          {title ?? s.title}
        </h2>
        {lede && <div className={`mt-4 text-pretty text-[15px] leading-relaxed text-fg-muted md:text-base ${wide ? "" : "max-w-prose"}`}>{lede}</div>}
      </Reveal>
      <Reveal delay={80} className="mt-8 md:mt-10">
        {children}
      </Reveal>
    </section>
  );
}

export default function KongCaseStudy() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        {/* Header */}
        <header className="relative overflow-hidden border-b border-line pt-[calc(var(--nav-h)+40px)] pb-12 md:pt-[calc(var(--nav-h)+64px)] md:pb-16">
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(50%_60%_at_20%_0%,rgba(56,189,248,0.10),transparent_70%)]" />
          <div className="container-site relative">
            <Link href="/#work" className="inline-flex items-center gap-2 font-mono text-xs text-fg-muted transition-colors hover:text-fg">
              <ArrowLeft size={14} /> Back to portfolio
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                  <span className="rounded border border-line bg-bg-2 px-2 py-1 text-fg-muted">case study</span>
                  <span className="rounded border border-line bg-bg-2 px-2 py-1 text-fg-muted">reference implementation</span>
                  <span className="rounded border border-line bg-bg-2 px-2 py-1 text-fg-dim">captured {kong.capturedOn}</span>
                </div>
                <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tightest text-fg sm:text-5xl md:text-6xl">
                  {kong.title}
                </h1>
                <p className="mt-4 font-mono text-sm text-accent">{kong.subtitle}</p>
                <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-fg-muted">
                  An MCP server that lets an LLM agent investigate a Kong Gateway through fourteen read-only, bounded,
                  schema-validated tools — with a deterministic diagnostic engine producing the facts, a bounded agent
                  loop producing the explanation, and an evaluation harness measuring whether it works.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Button href={kong.repo} external>
                    <Github size={16} /> View repository
                  </Button>
                  <Button href="#agent" variant="secondary">
                    Watch the agent run
                  </Button>
                  <Motif className="ml-1" />
                </div>
              </div>

              <div className="lg:col-span-4">
                <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
                  {headlineMetrics.map((m) => (
                    <div key={m.label} className="bg-bg-1 p-4">
                      <dd className="font-mono text-2xl tabular-nums text-fg">
                        {m.value}
                        {m.suffix}
                      </dd>
                      <dt className="mt-1 text-[12px] text-fg-muted">{m.label}</dt>
                      <dd className="font-mono text-[10px] text-fg-dim">{m.note}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <ul className="mt-10 flex flex-wrap gap-1.5 border-t border-line pt-6" aria-label="Stack">
              {kong.stack.map((t) => (
                <li key={t} className="rounded border border-line bg-bg-1 px-2 py-1 font-mono text-[11px] text-fg-muted">
                  {t}
                </li>
              ))}
              <li className="ml-auto self-center font-mono text-[11px] text-fg-dim">{kong.status}</li>
            </ul>
          </div>
        </header>

        {/* Body */}
        <div className="container-site grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
          <aside className="min-w-0 pt-8 lg:pt-14">
            <CaseStudyNav />
          </aside>

          <div className="min-w-0">
            {/* 01 Problem */}
            <CaseSection
              id="problem"
              title="Gateway debugging is a sequence of narrow questions."
              lede={
                <>
                  <p>
                    Which route serves this path? Which service does it point to? Which plugins actually apply once scope
                    precedence is accounted for? Is the upstream healthy? Does this consumer hold the credential the route
                    requires? Each question is a specific Admin API call across routes, services, plugins, consumers,
                    upstreams and health.
                  </p>
                  <p className="mt-4">
                    The failure modes are not exotic — a disabled plugin that still shows in the UI, a route attached to
                    the wrong service, a 503 that means “wrong address” rather than “backend down” — but they are easy to
                    miss when eyeballing JSON, and the obvious first hypothesis is often wrong. An LLM is good at sequencing
                    an investigation from a vague description. It is bad at being trusted with infrastructure state. The
                    agent&rsquo;s job is to investigate; the model must not become the source of truth.
                  </p>
                </>
              }
              wide
            >
              {/* Centrepiece statement */}
              <div className="relative overflow-hidden rounded-2xl border border-line bg-bg-1 px-6 py-14 text-center md:py-20">
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-70" />
                <p className="relative text-balance text-3xl font-semibold leading-tight tracking-tightest text-fg sm:text-4xl md:text-5xl">
                  {kong.principle.a}
                  <br />
                  <span className="text-fg-muted">{kong.principle.b}</span>
                </p>
                <p className="relative mt-6 font-mono text-[11px] text-fg-dim">design principle · README</p>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-12">
                <Window title="Kong Manager · Routes" meta="seeded gateway" className="min-w-0 lg:col-span-8">
                  <Image
                    src={kongImages.kongRoutes.src}
                    alt={kongImages.kongRoutes.alt}
                    width={kongImages.kongRoutes.w}
                    height={kongImages.kongRoutes.h}
                    sizes="(min-width: 1024px) 720px, 100vw"
                    className="w-full opacity-90"
                  />
                </Window>
                <div className="flex flex-col justify-between rounded-xl border border-line bg-bg-1 p-5 lg:col-span-4">
                  <div>
                    <p className="label-mono">seeded topology</p>
                    <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
                      {topology.map((t) => (
                        <div key={t.label}>
                          <dd className="font-mono text-xl tabular-nums text-fg">{t.value}</dd>
                          <dt className="text-[11px] text-fg-muted">{t.label}</dt>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <p className="mt-6 text-[12.5px] leading-relaxed text-fg-muted">
                    Ten intentional defects across eleven scenarios — a missing auth plugin, a disabled one, a rate limit
                    far below traffic, a wrong upstream target, a typo&rsquo;d path, config drift — and one healthy route as the
                    control that catches invented faults.
                  </p>
                </div>
              </div>
            </CaseSection>

            {/* 02 Architecture */}
            <CaseSection
              id="architecture"
              title="Every layer has something it owns and something it must not do."
              lede="The MCP server and its tools run without any LLM. The agent and evaluation harness are consumers of the tool layer, not part of it. Select a node to see its responsibilities."
            >
              <ArchitectureDiagram />
            </CaseSection>

            {/* 03 MCP Tooling */}
            <CaseSection
              id="tooling"
              title="Fourteen tools, one vocabulary."
              lede="MCP gives the model a fixed vocabulary of operations — each with a schema, a description of when to use it, and a bounded result — instead of an HTTP client and a URL. The whole attack and blast surface is enumerable in one file. There is deliberately no execute_kong_api_call tool."
            >
              <ToolCatalog />
            </CaseSection>

            {/* 04 Agentic Workflow */}
            <CaseSection
              id="agent"
              title="The premise was wrong, and the agent said so."
              lede={
                <>
                  Actual output of{" "}
                  <code className="font-mono text-[13px] text-fg">npm run agent -- --trace &quot;{demoRun.question}&quot;</code>{" "}
                  against the seeded gateway and gemini-3.5-flash-lite, captured {kong.capturedOn}. Two tool calls. The
                  route was not rejecting anything: no authentication plugin was attached or enabled at any scope, so Kong
                  was passing every request through. The agent corrected the question from evidence rather than accepting it.
                </>
              }
            >
              <div className="grid gap-6 lg:grid-cols-12">
                <div className="min-w-0 lg:col-span-7">
                  <AgentConsole autoplay />
                </div>
                <div className="flex min-w-0 flex-col gap-4 lg:col-span-5">
                  {/* Investigation path */}
                  <ol className="rounded-xl border border-line bg-bg-1 p-4" aria-label="Investigation path">
                    {[
                      { k: "find_route_by_path", v: '{"path":"/payments"}', r: "route:payments-prod" },
                      { k: "diagnose_route", v: '{"route":"route:payments-prod"}', r: "evidence bundle · 7× GET" },
                      { k: "evidence", v: "route · service · global plugins read", r: "absence can be asserted" },
                      { k: demoRun.finding.code, v: `${demoRun.finding.severity} · ${demoRun.finding.confidence}`, r: "rule output, not model output" },
                      { k: "diagnosis", v: "prose + next steps + limitations", r: "3 steps · $0.0046" },
                    ].map((s, i, a) => (
                      <li key={s.k} className="relative grid grid-cols-[16px_1fr] gap-x-3">
                        <div className="flex flex-col items-center" aria-hidden>
                          <span className={`mt-1.5 h-2 w-2 rounded-full ${i >= 3 ? "bg-accent" : "border border-fg-dim"}`} />
                          {i < a.length - 1 && <span className="w-px flex-1 bg-line-strong" />}
                        </div>
                        <div className={i < a.length - 1 ? "pb-3" : ""}>
                          <code className={`font-mono text-[12px] ${i >= 3 ? "text-accent" : "text-fg"}`}>{s.k}</code>
                          <div className="font-mono text-[11px] text-fg-muted">{s.v}</div>
                          <div className="font-mono text-[10px] text-fg-dim">→ {s.r}</div>
                        </div>
                      </li>
                    ))}
                  </ol>

                  {/* Structured finding */}
                  <div className="rounded-xl border border-line bg-bg-1 p-4">
                    <p className="label-mono">finding · as an MCP client receives it</p>
                    <dl className="mt-3 grid grid-cols-2 gap-y-2 font-mono text-[11px]">
                      <dt className="text-fg-dim">code</dt>
                      <dd className="text-warn">{demoRun.finding.code}</dd>
                      <dt className="text-fg-dim">category</dt>
                      <dd className="text-fg">{demoRun.finding.category}</dd>
                      <dt className="text-fg-dim">severity</dt>
                      <dd className="text-fg">{demoRun.finding.severity}</dd>
                      <dt className="text-fg-dim">confidence</dt>
                      <dd className="text-ok">{demoRun.finding.confidence}</dd>
                      <dt className="text-fg-dim">entityRef</dt>
                      <dd className="text-fg">{demoRun.finding.entityRef}</dd>
                    </dl>
                    <ul className="mt-3 border-t border-line pt-3 font-mono text-[11px] text-fg-muted">
                      {demoRun.finding.evidence.map((e) => (
                        <li key={e}>· {e}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2">
                <Window title="npm run agent · terminal" meta="captured output">
                  <Image
                    src={kongImages.agentDiagnosis.src}
                    alt={kongImages.agentDiagnosis.alt}
                    width={kongImages.agentDiagnosis.w}
                    height={kongImages.agentDiagnosis.h}
                    sizes="(min-width: 768px) 460px, 100vw"
                    className="w-full"
                  />
                </Window>
                <Window title="npm run agent · a second question" meta="HEALTHCHECKS_OFF, not unhealthy">
                  <Image
                    src={kongImages.agentUpstream.src}
                    alt={kongImages.agentUpstream.alt}
                    width={kongImages.agentUpstream.w}
                    height={kongImages.agentUpstream.h}
                    sizes="(min-width: 768px) 460px, 100vw"
                    className="w-full"
                  />
                </Window>
              </div>
              <p className="mt-4 max-w-prose text-[13px] leading-relaxed text-fg-muted">
                The loop is the project&rsquo;s own, not the SDK&rsquo;s: a step limit of 10, identical-call detection, a
                cumulative context budget, and a halt path that keeps tools declared but forbidden so the model must
                write an explicitly incomplete answer rather than an empty one. A provider error ends the run as
                provider_error, never as a diagnosis.
              </p>
            </CaseSection>

            {/* 05 Context */}
            <CaseSection
              id="context"
              title="Make the targeted result the normal case."
              lede="A naive design gives the model the whole gateway and lets it find the relevant part. Measured on the seeded gateway, a single-route diagnosis is 11% of the raw configuration dump. Every mechanism below exists to make that row the normal case — and none of them drop anything silently."
              wide
            >
              <CompressionChart />
            </CaseSection>

            {/* 06 Safety */}
            <CaseSection
              id="safety"
              title="Read-only by structure, not by instruction."
              lede="The system sits between an LLM and an unauthenticated Admin API — a control plane. The threats that matter are a write, a leaked secret, an asserted falsehood, a loop, and unvalidated input. Each control below exists in the code and has a test; the limitation is stated with the same weight."
            >
              <SafetyChain />
            </CaseSection>

            {/* 07 Observability */}
            <CaseSection
              id="observability"
              title="A number is reported only if it was measured."
              lede="Structured JSON via pino, to stderr and optionally a file — never stdout. Every tool call and every LLM call is recorded; a separate audit log records what the model attempted and what it was allowed to do. Metrics are computed only from recorded calls, with nearest-rank percentiles because interpolation invents a latency no call had."
            >
              <TelemetryPanel />
            </CaseSection>

            {/* 08 Evaluation */}
            <CaseSection
              id="evaluation"
              title="28 cases, a deterministic scorer, and the bad runs kept."
              lede="One case per user question, across 11 scenarios and three difficulties, with phrasings varied on purpose and two false-positive controls. A case passes only if the deterministic engine produced every expected finding, the answer contains every expected fact and no named wrong conclusion, and the run finished within its limits. No LLM judge."
              wide
            >
              <EvaluationDashboard />
            </CaseSection>

            {/* 09 Failure modes */}
            <CaseSection
              id="failure-modes"
              title="Where it broke"
              lede="Each entry was observed while building the repository. The symptom is what actually appeared; the root cause is what was actually found. Identifiers are stable and referenced from code comments and tests."
              wide
            >
              <FailureModeGrid />
            </CaseSection>

            {/* 10 Testing */}
            <CaseSection
              id="testing"
              title="Three suites, one command each."
              lede="Unit tests need no Docker and no network. Integration tests run against the live seeded Kong, including MCP over real stdio. End-to-end tests take a question through the agent, a tool, Kong and back to a diagnosis with a live model."
            >
              <TestMetrics />
            </CaseSection>

            {/* 11 Limitations */}
            <CaseSection
              id="limitations"
              title="What it does not do."
              lede="Stated with the same care as the features. Several of these shaped the harness more than the model did."
            >
              <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                {limitations.map((l, i) => (
                  <li key={l.title} className="bg-bg p-5">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-[10px] tabular-nums text-fg-dim">{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="text-sm font-semibold text-fg">{l.title}</h3>
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-fg-muted">{l.detail}</p>
                  </li>
                ))}
              </ol>
            </CaseSection>

            {/* Closing */}
            <div className="border-t border-line py-14 md:py-20">
              <div className="grid gap-8 rounded-2xl border border-line bg-bg-1 p-7 md:grid-cols-12 md:items-center md:p-10">
                <div className="md:col-span-8">
                  <Motif />
                  <h2 className="mt-4 text-balance text-2xl font-semibold tracking-tight text-fg md:text-3xl">
                    The code is the case study.
                  </h2>
                  <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-fg-muted">
                    Every number on this page is copied from the repository&rsquo;s README, docs and result files. The
                    fourteen architecture decisions, the full failure-mode record and every verbatim evaluation answer are
                    there too.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
                  <Button href={kong.repo} external>
                    <Github size={16} /> {kong.repoName} <ArrowUpRight size={14} />
                  </Button>
                  <Button href="/#contact" variant="secondary">
                    Contact
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

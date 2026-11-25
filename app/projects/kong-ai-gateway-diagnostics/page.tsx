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
import { DotList, Tag } from "@/components/ui/Bits";
import { LetterGlyph } from "@/components/brand/Letterform";
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
    <section id={s.id} className="!scroll-mt-10 border-t border-line-strong/60 py-16 md:py-24" aria-labelledby={`${s.id}-title`}>
      <Reveal>
        <p className="eyebrow">
          <span className="mr-2.5 tabular-nums text-accent">{s.n}</span>
          {s.title}
        </p>
        <h2 id={`${s.id}-title`} className="display mt-3 max-w-[17em] text-balance text-[clamp(2.4rem,4.6vw,4rem)] leading-[0.98]">
          {title ?? s.title}
        </h2>
        {lede && <div className={`mt-6 text-pretty text-[17px] leading-[1.6] text-fg-muted ${wide ? "max-w-[860px]" : "max-w-prose"}`}>{lede}</div>}
      </Reveal>
      <Reveal delay={80} className="mt-10 md:mt-12">
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
        <header className="on-dark relative overflow-hidden bg-cobalt pb-14 pt-[calc(var(--nav-h)+36px)] text-white md:pb-20 md:pt-[calc(var(--nav-h)+56px)]">
          <LetterGlyph letter="q" className="pointer-events-none absolute -bottom-[30%] -right-[4%] h-[120%] w-auto text-[#2A4BD0]" />
          <div className="container-site relative">
            <Link href="/#work" className="inline-flex items-center gap-2 text-[16px] text-white/85 transition-colors hover:text-white">
              <ArrowLeft size={16} /> Back to portfolio
            </Link>

            <div className="mt-9 flex flex-wrap items-center gap-1.5">
              <Tag>case study</Tag>
              <Tag>reference implementation</Tag>
              <Tag>captured {kong.capturedOn}</Tag>
            </div>
            <h1 className="display-caps mt-6 max-w-[11em] text-balance text-[clamp(3.1rem,9.2vw,8.6rem)]">{kong.title}</h1>
            <p className="mt-5 text-[clamp(1.1rem,1.6vw,1.35rem)] tracking-[-0.015em] text-sky">{kong.subtitle}</p>

            <div className="mt-10 grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="max-w-2xl text-pretty text-[clamp(1.2rem,1.7vw,1.45rem)] leading-[1.42] tracking-[-0.018em]">
                  An MCP server that lets an LLM agent investigate a Kong Gateway through fourteen read-only, bounded,
                  schema-validated tools — with a deterministic diagnostic engine producing the facts, a bounded agent
                  loop producing the explanation, and an evaluation harness measuring whether it works.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <Button href={kong.repo} external variant="light">
                    <Github size={17} /> View repository
                  </Button>
                  <Button href="#agent" variant="outlineLight">
                    Watch the agent run
                  </Button>
                </div>
              </div>

              <dl className="grid grid-cols-2 gap-x-8 gap-y-7 lg:col-span-5">
                {headlineMetrics.map((m) => (
                  <div key={m.label} className="flex flex-col border-t border-white/35 pt-4">
                    <dt className="order-2 mt-2 text-[16px] font-medium tracking-[-0.015em]">{m.label}</dt>
                    <dd className="display order-1 text-[clamp(2.8rem,4.6vw,4rem)] tabular-nums">
                      {m.value}
                      {m.suffix}
                    </dd>
                    <dd className="order-3 text-[14px] text-white/80">{m.note}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </header>

        <div className="border-b border-line bg-bg-1">
          <div className="container-site flex flex-col gap-4 py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <DotList items={kong.stack} label="Stack" />
            <Motif className="shrink-0" />
          </div>
        </div>

        {/* Body */}
        <div className="container-site grid grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[208px_minmax(0,1fr)] lg:gap-16">
          <aside className="min-w-0 pt-8 lg:pt-16">
            <CaseStudyNav />
          </aside>

          <div className="min-w-0">
            <p className="pt-2 text-[15px] leading-relaxed text-fg-muted lg:pt-16">{kong.status}</p>
            <div className="mt-8 [&>section:first-child]:border-t-0 [&>section:first-child]:pt-6">
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
              <div className="rounded-[18px] bg-accent px-6 py-16 text-center text-white md:py-24">
                <p className="display text-balance text-[clamp(2.6rem,5.8vw,5.2rem)] leading-[1]">
                  {kong.principle.a}
                  <br />
                  <span className="text-accent-soft">{kong.principle.b}</span>
                </p>
                <p className="mt-7 text-[15px] text-white/80">design principle · README</p>
              </div>

              <div className="mt-6 grid gap-6 lg:grid-cols-12">
                <Window title="Kong Manager · Routes" meta="seeded gateway" className="min-w-0 self-start lg:col-span-8">
                  <Image
                    src={kongImages.kongRoutes.src}
                    alt={kongImages.kongRoutes.alt}
                    width={kongImages.kongRoutes.w}
                    height={kongImages.kongRoutes.h}
                    sizes="(min-width: 1024px) 720px, 100vw"
                    className="w-full"
                  />
                </Window>
                <div className="flex flex-col justify-between lg:col-span-4">
                  <div>
                    <p className="label">seeded topology</p>
                    <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-5">
                      {topology.map((t) => (
                        <div key={t.label} className="flex flex-col">
                          <dt className="order-2 mt-1 text-[15px] text-fg-muted">{t.label}</dt>
                          <dd className="display order-1 text-[40px] tabular-nums">{t.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                  <p className="mt-8 text-[15px] leading-relaxed text-fg-muted">
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
                  <code className="font-mono text-[14.5px] text-fg">npm run agent -- --trace &quot;{demoRun.question}&quot;</code>{" "}
                  against the seeded gateway and gemini-3.5-flash-lite, captured {kong.capturedOn}. Two tool calls. The
                  route was not rejecting anything: no authentication plugin was attached or enabled at any scope, so Kong
                  was passing every request through. The agent corrected the question from evidence rather than accepting it.
                </>
              }
            >
              <div className="grid gap-6 lg:grid-cols-12">
                <div className="min-w-0 lg:col-span-7">
                  <AgentConsole autoplay bodyHeight="h-[420px] md:h-[560px]" />
                </div>
                <div className="flex min-w-0 flex-col gap-4 lg:col-span-5">
                  {/* Investigation path */}
                  <ol className="rounded-[14px] bg-bg-1 p-5" aria-label="Investigation path">
                    {[
                      { k: "find_route_by_path", v: '{"path":"/payments"}', r: "route:payments-prod" },
                      { k: "diagnose_route", v: '{"route":"route:payments-prod"}', r: "evidence bundle · 7× GET" },
                      { k: "evidence", v: "route · service · global plugins read", r: "absence can be asserted" },
                      { k: demoRun.finding.code, v: `${demoRun.finding.severity} · ${demoRun.finding.confidence}`, r: "rule output, not model output" },
                      { k: "diagnosis", v: "prose + next steps + limitations", r: "3 steps · $0.0046" },
                    ].map((s, i, a) => (
                      <li key={s.k} className="relative grid grid-cols-[16px_1fr] gap-x-3">
                        <div className="flex flex-col items-center" aria-hidden>
                          <span className={`mt-1.5 h-2.5 w-2.5 rounded-full ${i >= 3 ? "bg-accent" : "border border-fg-dim"}`} />
                          {i < a.length - 1 && <span className="w-px flex-1 bg-line-strong" />}
                        </div>
                        <div className={i < a.length - 1 ? "pb-4" : ""}>
                          <code className={`font-mono text-[13px] font-medium ${i >= 3 ? "text-accent" : "text-fg"}`}>{s.k}</code>
                          <div className="break-words text-[14px] text-fg-muted">{s.v}</div>
                          <div className="text-[13px] text-fg-dim">→ {s.r}</div>
                        </div>
                      </li>
                    ))}
                  </ol>

                  {/* Structured finding */}
                  <div className="rounded-[14px] bg-bg-1 p-5">
                    <p className="label">finding · as an MCP client receives it</p>
                    <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 font-mono text-[12.5px]">
                      <dt className="text-fg-dim">code</dt>
                      <dd className="text-warn">{demoRun.finding.code}</dd>
                      <dt className="text-fg-dim">category</dt>
                      <dd>{demoRun.finding.category}</dd>
                      <dt className="text-fg-dim">severity</dt>
                      <dd>{demoRun.finding.severity}</dd>
                      <dt className="text-fg-dim">confidence</dt>
                      <dd className="text-ok">{demoRun.finding.confidence}</dd>
                      <dt className="text-fg-dim">entityRef</dt>
                      <dd className="break-all">{demoRun.finding.entityRef}</dd>
                    </dl>
                    <ul className="mt-3.5 border-t border-line pt-3.5 text-[14px] leading-relaxed text-fg-muted">
                      {demoRun.finding.evidence.map((e) => (
                        <li key={e}>· {e}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-2">
                <Window title="npm run agent · terminal" meta="captured output" bodyClassName="bg-term">
                  <Image
                    src={kongImages.agentDiagnosis.src}
                    alt={kongImages.agentDiagnosis.alt}
                    width={kongImages.agentDiagnosis.w}
                    height={kongImages.agentDiagnosis.h}
                    sizes="(min-width: 768px) 460px, 100vw"
                    className="w-full"
                  />
                </Window>
                <Window title="npm run agent · a second question" meta="HEALTHCHECKS_OFF, not unhealthy" bodyClassName="bg-term">
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
              <p className="mt-6 max-w-prose text-[16px] leading-relaxed text-fg-muted">
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
              <ol className="grid gap-x-10 sm:grid-cols-2">
                {limitations.map((l, i) => (
                  <li key={l.title} className="flex gap-4 border-t border-line py-5">
                    <span className="w-6 shrink-0 text-[14px] leading-7 tabular-nums text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 className="text-[18px] font-medium tracking-[-0.02em]">{l.title}</h3>
                      <p className="mt-1 text-[15px] leading-relaxed text-fg-muted">{l.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </CaseSection>
            </div>

            {/* Closing */}
            <div className="pb-20 md:pb-28">
              <div className="rounded-[18px] bg-fg p-7 text-inv md:p-12">
                <h2 className="display text-balance text-[clamp(2.6rem,5vw,4.4rem)]">The code is the case study.</h2>
                <p className="mt-5 max-w-prose text-[17px] leading-relaxed text-inv-muted">
                  Every number on this page is copied from the repository&rsquo;s README, docs and result files. The
                  fourteen architecture decisions, the full failure-mode record and every verbatim evaluation answer are
                  there too.
                </p>
                <div className="on-dark mt-8 flex flex-wrap gap-3">
                  <Button href={kong.repo} external variant="light" className="max-sm:!text-[15px]">
                    <Github size={17} /> {kong.repoName} <ArrowUpRight size={16} />
                  </Button>
                  <Button href="/#contact" variant="outlineLight">
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

"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import AgentConsole, { type Stage } from "@/components/AgentConsole";
import SectionHead from "@/components/ui/SectionHead";
import { kong } from "@/data/kong";
import { ArrowRight, Plus } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

type FlowNode = {
  id: Exclude<Stage, "idle" | "done">;
  label: string;
  kicker: string;
  detail: string;
  tone?: "model" | "accent";
};

const flow: FlowNode[] = [
  {
    id: "input",
    label: "Question",
    kicker: "vague, human, possibly wrong",
    detail:
      "The user asks in plain language. The premise may be wrong — here it was: nothing was rejecting requests on /payments.",
  },
  {
    id: "agent",
    label: "Agent",
    kicker: "bounded loop · Gemini",
    tone: "model",
    detail:
      "A loop the project owns: a step limit of 10, identical-call detection, a cumulative context budget and a halt path that says “diagnosis incomplete” instead of guessing. The model chooses tools and writes prose; it never produces a fact.",
  },
  {
    id: "mcp",
    label: "MCP",
    kicker: "stdio · JSON-RPC · Zod",
    detail:
      "Fourteen read-only tools with schemas, descriptions and bounded results — instead of an HTTP client and a URL. The in-repo agent is given eight of them, on purpose.",
  },
  {
    id: "tool",
    label: "Tool",
    kicker: "shared runner · limits · audit",
    detail:
      "Every call passes through one runner: argument validation, item caps, character budgets, telemetry and an audit event. No tool can opt out of a bound.",
  },
  {
    id: "kong",
    label: "Kong",
    kicker: "Admin API · GET only",
    detail:
      "A typed client against Kong Gateway 3.9.3. Only GET methods exist; responses are validated with Zod; credential values are stripped at the boundary.",
  },
  {
    id: "evidence",
    label: "Evidence",
    kicker: "11 pure rules · ~64 ms",
    tone: "accent",
    detail:
      "An evidence collector reads what a rule needs, then pure rules derive findings with a code, severity, evidence lines and a confidence of CONFIRMED, PARTIAL or INSUFFICIENT_EVIDENCE.",
  },
  {
    id: "diagnosis",
    label: "Diagnosis",
    kicker: "prose + run metrics",
    tone: "accent",
    detail:
      "An explanation with evidence, next steps and limitations, followed by measured run metrics: steps, tool calls, tokens, estimated cost, wall clock.",
  },
];

const toneText = { model: "text-violet", accent: "text-accent", plain: "text-fg" } as const;

/**
 * The run, two ways: a replay of the recorded session, and the seven layers it
 * passes through as a list that follows along. Frontend only — nothing here
 * queries a gateway.
 */
export default function LiveSystem() {
  const [active, setActive] = useState<Stage>("idle");
  const [selected, setSelected] = useState<FlowNode["id"] | null>(null);

  const onStage = useCallback((s: Stage) => setActive(s), []);

  // One layer is always open: the chosen one, else wherever the run has got to.
  const shown = selected ?? (active !== "idle" && active !== "done" ? active : "agent");

  return (
    <section id="system" className="bg-bg pt-24 md:pt-36" aria-labelledby="live-title">
      <div className="container-site">
        <SectionHead
          eyebrow="System architecture"
          id="live-title"
          title="How a question becomes a diagnosis"
          lede="Watch the recorded Kong run stream through each layer, or select a layer to read what it owns."
          titleClassName="display-caps text-[clamp(2.7rem,7.6vw,7rem)]"
        />
      </div>

      {/* Two grounds, edge to edge. */}
      <div className="mt-14 grid grid-cols-[minmax(0,1fr)] md:mt-20 lg:grid-cols-2">
        <div className="order-2 min-w-0 bg-stone px-5 py-14 md:px-10 md:py-20 lg:order-1 lg:pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))] lg:pr-14">
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="text-[32px] tracking-[-0.03em] md:text-[40px]">System flow</h3>
            <span className="label">{selected ? "selected" : active === "idle" ? "default" : "following run"}</span>
          </div>
          <ol className="mt-8 flex flex-col gap-2.5 lg:min-h-[574px]" aria-label="System flow">
            {flow.map((n, i) => {
              const isOpen = shown === n.id;
              const isActive = active === n.id;
              return (
                <li
                  key={n.id}
                  className={cn(
                    "rounded-[18px] border transition-colors duration-500",
                    isOpen ? "border-fg bg-bg-1" : "border-fg/35 hover:border-fg"
                  )}
                >
                  <h4>
                    <button
                      type="button"
                      onClick={() => setSelected((s) => (s === n.id ? null : n.id))}
                      aria-expanded={isOpen}
                      aria-controls={`layer-${n.id}`}
                      className="flex w-full items-center gap-4 rounded-[18px] px-5 py-4 text-left"
                    >
                      <span className={cn("w-6 text-[15px] tabular-nums transition-colors", isActive ? "text-accent" : "text-fg-dim")}>0{i + 1}</span>
                      <span className={cn("text-[18px] font-semibold tracking-[-0.02em]", isOpen ? toneText[n.tone ?? "plain"] : "text-fg")}>{n.label}</span>
                      <span className="hidden truncate text-[15px] text-fg-dim sm:block">{n.kicker}</span>
                      <span className="ml-auto flex items-center gap-3">
                        {isActive && <span aria-hidden className="node-pulse h-2 w-2 rounded-full bg-accent" />}
                        <Plus size={20} strokeWidth={1.4} className={cn("text-fg-dim transition-transform duration-500 ease-out-expo", isOpen && "rotate-45 text-fg")} />
                      </span>
                    </button>
                  </h4>
                  <div
                    id={`layer-${n.id}`}
                    aria-hidden={!isOpen}
                    className="grid transition-[grid-template-rows] duration-500 ease-out-expo"
                    style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="text-pretty px-5 pb-5 text-[16px] leading-[1.5] text-fg-muted sm:pl-[3.75rem]">
                        <span className="mb-1 block text-fg-dim sm:hidden">{n.kicker}</span>
                        {n.detail}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <Link
            href={`/projects/${kong.slug}#architecture`}
            className="group mt-8 inline-flex items-center gap-2 border-b border-fg/40 pb-0.5 text-[17px] font-medium transition-colors hover:border-accent hover:text-accent"
          >
            Read the architecture <ArrowRight size={17} className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="order-1 min-w-0 bg-bg px-5 pb-14 md:px-10 md:pb-20 lg:order-2 lg:py-20 lg:pl-14 lg:pr-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))]">
          <div className="lg:sticky lg:top-28">
            <AgentConsole onStage={onStage} bodyHeight="h-[400px] md:h-[560px] lg:h-[clamp(440px,calc(100svh-260px),640px)]" />
            <p className="mt-4 text-[14px] text-fg-dim">Frontend simulation · replayed from a recorded run · no live gateway</p>
          </div>
        </div>
      </div>
    </section>
  );
}

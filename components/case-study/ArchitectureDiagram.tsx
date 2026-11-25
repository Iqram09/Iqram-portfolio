"use client";

import { useState } from "react";
import { architectureSpine, architectureSide, architectureEntities, type ArchNode } from "@/data/kong";
import { cn } from "@/lib/cn";

const all = [...architectureSpine, ...architectureSide];

function NodeButton({
  node,
  selected,
  onSelect,
  variant,
}: {
  node: ArchNode;
  selected: boolean;
  onSelect: (id: string) => void;
  variant: "spine" | "side";
}) {
  const emphasis = node.id === "tools" || node.id === "kong";
  return (
    <button
      type="button"
      onClick={() => onSelect(node.id)}
      aria-pressed={selected}
      aria-describedby="arch-detail"
      className={cn(
        "w-full rounded-lg border text-left transition-[border-color,background-color,color,transform] duration-300 ease-out-expo hover:-translate-y-px",
        variant === "spine" ? "px-5 py-3.5" : "px-4 py-3",
        selected ? "border-fg bg-fg text-bg" : emphasis ? "border-fg/50 bg-bg-1 hover:border-fg" : "border-line bg-bg-1 hover:border-fg"
      )}
    >
      <span className={cn("block font-medium tracking-[-0.015em]", variant === "spine" ? "text-[17px]" : "text-[15px]")}>{node.label}</span>
      {node.sub && <span className={cn("mt-0.5 block truncate text-[13px]", selected ? "text-inv-muted" : "text-fg-dim")}>{node.sub}</span>}
    </button>
  );
}

export default function ArchitectureDiagram() {
  const [selectedId, setSelectedId] = useState<string>("tools");
  const node = all.find((n) => n.id === selectedId) ?? all[0];

  return (
    <div className="overflow-hidden rounded-[18px] border border-line bg-bg-2">
      <div className="flex items-center justify-between border-b border-line bg-bg-1 px-5 py-3 text-[14px]">
        <span className="text-fg-muted">architecture · select a node</span>
        <span className="hidden text-fg-dim sm:inline">hover highlights · click reveals</span>
      </div>

      <div className="relative grid grid-cols-[minmax(0,1fr)] gap-8 p-5 md:p-8 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(70%_80%_at_40%_50%,black,transparent)]" />

        {/* Spine */}
        <ol className="relative mx-auto flex w-full max-w-md flex-col" aria-label="Request path">
          {architectureSpine.map((n, i) => (
            <li key={n.id} className="relative">
              <NodeButton node={n} selected={selectedId === n.id} onSelect={setSelectedId} variant="spine" />
              {i < architectureSpine.length - 1 && (
                <div className="flex h-7 items-center justify-center" aria-hidden>
                  <svg width="2" height="28" className="overflow-visible">
                    <line x1="1" y1="0" x2="1" y2="28" stroke="#B9B9B4" strokeWidth="2" />
                    <line x1="1" y1="0" x2="1" y2="28" stroke="#7F1330" strokeWidth="2" className="edge-flow" />
                  </svg>
                </div>
              )}
            </li>
          ))}
          <li aria-label="Kong entities">
            <div className="flex h-7 items-center justify-center" aria-hidden>
              <svg width="2" height="28">
                <line x1="1" y1="0" x2="1" y2="28" stroke="#B9B9B4" strokeWidth="2" strokeDasharray="3 4" />
              </svg>
            </div>
            <ul className="grid grid-cols-3 gap-1.5 sm:grid-cols-5">
              {architectureEntities.map((e) => (
                <li key={e} className="min-w-0 truncate rounded-md border border-line bg-bg-1 px-1 py-2 text-center text-[13px] text-fg-muted">
                  {e}
                </li>
              ))}
            </ul>
          </li>
        </ol>

        {/* Side layers */}
        <div className="relative">
          <p className="label mb-2.5">cross-cutting layers</p>
          <ul className="flex flex-col gap-2" aria-label="Cross-cutting layers">
            {architectureSide.map((n) => (
              <li key={n.id}>
                <NodeButton node={n} selected={selectedId === n.id} onSelect={setSelectedId} variant="side" />
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[14px] leading-relaxed text-fg-dim">
            Dotted into the tool layer: every tool call passes through safety and telemetry; diagnostics and context sit
            between tools and the Kong client.
          </p>
        </div>
      </div>

      {/* Detail */}
      <div id="arch-detail" className="grid gap-6 border-t border-line bg-bg-1 p-5 md:grid-cols-[220px_1fr] md:p-8" aria-live="polite">
        <div>
          <p className="label">selected</p>
          <h3 className="mt-1 text-[24px] leading-tight tracking-[-0.03em]">{node.label}</h3>
          {node.sub && <p className="mt-2 text-[14px] text-fg-dim">{node.sub}</p>}
        </div>
        <dl className="grid gap-5 sm:grid-cols-3">
          <div>
            <dt className="label">what it does</dt>
            <dd className="mt-1.5 text-[15px] leading-relaxed text-fg-muted">{node.does}</dd>
          </div>
          <div>
            <dt className="label">what it owns</dt>
            <dd className="mt-1.5 text-[15px] leading-relaxed text-fg-muted">{node.owns}</dd>
          </div>
          <div>
            <dt className="text-[13px] font-medium text-err">must not</dt>
            <dd className="mt-1.5 text-[15px] leading-relaxed text-fg-muted">{node.mustNot}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

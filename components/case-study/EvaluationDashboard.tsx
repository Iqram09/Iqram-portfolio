import Image from "next/image";
import { evalRun, evalHistory, kongImages } from "@/data/kong";
import Window from "@/components/ui/Window";

function Stat({ value, label, tone = "fg" }: { value: string; label: string; tone?: "fg" | "ok" }) {
  return (
    <div className="bg-bg-1 p-4 md:p-5">
      <div className={`font-mono text-2xl tabular-nums md:text-3xl ${tone === "ok" ? "text-ok" : "text-fg"}`}>{value}</div>
      <div className="mt-1 text-[12px] text-fg-muted">{label}</div>
    </div>
  );
}

export default function EvaluationDashboard() {
  const r = evalRun;
  const maxCalls = Math.max(...r.toolUsage.map((t) => t.calls));
  const shot = kongImages.evalExcerpt;

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-bg-1">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-bg-2/60 px-5 py-3">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
          <span className="rounded border border-accent/50 bg-accent/10 px-2 py-0.5 text-accent">{r.id}</span>
          <span className="text-fg-muted">dataset {r.dataset}</span>
          <span className="text-line-strong" aria-hidden>·</span>
          <span className="text-fg-muted">{r.model}</span>
          <span className="text-line-strong" aria-hidden>·</span>
          <span className="text-fg-muted">Kong {r.kong}</span>
          <span className="text-line-strong" aria-hidden>·</span>
          <span className="text-fg-dim">{r.date}</span>
        </div>
        <span className="rounded border border-warn/40 bg-warn/5 px-2 py-0.5 font-mono text-[11px] text-warn">{r.caveat}</span>
      </div>

      {/* Primary stats */}
      <div className="grid grid-cols-2 gap-px bg-line md:grid-cols-4">
        <Stat value={`${r.passed} / ${r.cases}`} label="cases passed" tone="ok" />
        <Stat value={r.findingRecall} label="finding recall (mean)" tone="ok" />
        <Stat value={r.answerFactMatch} label="answer fact match (mean)" tone="ok" />
        <Stat value={String(r.repeatedCalls)} label="repeated tool calls (total)" />
      </div>

      <div className="grid gap-px bg-line lg:grid-cols-12">
        {/* Secondary stats */}
        <dl className="grid grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:col-span-7 lg:grid-cols-3">
          {[
            [r.meanSteps, "steps per case (mean)", r.stepsRange],
            [r.toolCallsPerCase, "tool calls per case (mean)", `${r.unnecessaryCalls} unnecessary in total`],
            [r.totalTokens, "tokens (total)", `${r.tokensPerCase} per case`],
            [r.totalCost, "estimated cost (total)", `${r.costPerCase} per case`],
            [r.medianDuration, "duration per case (median)", `retry-free median ${r.retryFreeMedian}`],
            [r.completedWithinLimits, "completed within limits", `tool coverage ${r.toolCoverage}`],
          ].map(([v, l, n]) => (
            <div key={l} className="bg-bg-1 p-4">
              <dd className="font-mono text-lg tabular-nums text-fg">{v}</dd>
              <dt className="mt-0.5 text-[12px] text-fg-muted">{l}</dt>
              <dd className="mt-0.5 font-mono text-[10px] text-fg-dim">{n}</dd>
            </div>
          ))}
        </dl>

        {/* Difficulty */}
        <div className="bg-bg-1 p-4 lg:col-span-5">
          <p className="label-mono">by difficulty</p>
          <ul className="mt-3 flex flex-col gap-2.5">
            {r.byDifficulty.map((d) => (
              <li key={d.tier}>
                <div className="flex justify-between font-mono text-[11px]">
                  <span className="text-fg">{d.tier}</span>
                  <span className="tabular-nums text-fg-muted">
                    {d.passed} / {d.total}
                  </span>
                </div>
                <div className="mt-1 h-1.5 w-full overflow-hidden rounded bg-bg-3">
                  <div className="h-full rounded bg-ok" style={{ width: `${(d.passed / d.total) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-mono text-[10px] leading-relaxed text-fg-dim">
            pass = recall 100% and fact match 100% and no forbidden conclusion and finished within limits. Deterministic scorer; no LLM judge.
          </p>
        </div>
      </div>

      {/* Tool usage + excerpt */}
      <div className="grid grid-cols-[minmax(0,1fr)] gap-px border-t border-line bg-line lg:grid-cols-12">
        <div className="bg-bg-1 p-4 md:p-5 lg:col-span-5">
          <p className="label-mono">tool usage across 28 cases</p>
          <ul className="mt-3 flex flex-col gap-2">
            {r.toolUsage.map((t) => (
              <li key={t.tool} className="grid grid-cols-[150px_1fr_28px] items-center gap-2 sm:grid-cols-[170px_1fr_28px]">
                <code className="truncate font-mono text-[11px] text-fg-muted">{t.tool}</code>
                <div className="h-1.5 overflow-hidden rounded bg-bg-3">
                  <div className="h-full rounded bg-accent/80" style={{ width: `${(t.calls / maxCalls) * 100}%` }} />
                </div>
                <span className="text-right font-mono text-[11px] tabular-nums text-fg">{t.calls}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0 bg-bg-1 p-4 md:p-5 lg:col-span-7">
          <Window title="Get-Content .\evals\results\run-003.md" meta="excerpt">
            <Image src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} sizes="(min-width: 1024px) 560px, 100vw" className="w-full" />
          </Window>
        </div>
      </div>

      {/* History — kept on purpose */}
      <div className="border-t border-line">
        <div className="flex items-center justify-between px-5 py-3">
          <p className="label-mono">earlier runs, kept on purpose</p>
          <p className="font-mono text-[10px] text-fg-dim">no run failed a case because of a wrong diagnosis</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-[12.5px]">
            <thead>
              <tr className="border-y border-line font-mono text-[10px] uppercase tracking-wider text-fg-dim">
                <th scope="col" className="px-5 py-2 font-normal">run</th>
                <th scope="col" className="px-3 py-2 font-normal">dataset</th>
                <th scope="col" className="px-3 py-2 font-normal">passed</th>
                <th scope="col" className="px-3 py-2 font-normal">what the misses were</th>
              </tr>
            </thead>
            <tbody>
              {evalHistory.map((h) => (
                <tr key={h.run} className={`border-b border-line last:border-b-0 ${h.current ? "bg-bg-2/50" : ""}`}>
                  <td className="px-5 py-2.5 font-mono text-fg">{h.run}</td>
                  <td className="px-3 py-2.5 font-mono text-fg-muted">{h.dataset}</td>
                  <td className="px-3 py-2.5 font-mono tabular-nums text-fg">{h.passed}</td>
                  <td className="px-3 py-2.5 text-fg-muted">{h.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

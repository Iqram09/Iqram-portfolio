import Image from "next/image";
import { evalRun, evalHistory, kongImages } from "@/data/kong";
import Window from "@/components/ui/Window";
import { Tag } from "@/components/ui/Bits";

function Stat({ value, label, tone = "fg" }: { value: string; label: string; tone?: "fg" | "ok" }) {
  return (
    <div className="bg-bg-1 p-5 md:p-6">
      <div className={`display whitespace-nowrap text-[clamp(2.4rem,4vw,3.4rem)] tabular-nums ${tone === "ok" ? "text-ok" : ""}`}>{value}</div>
      <div className="mt-2 text-[15px] leading-snug text-fg-muted">{label}</div>
    </div>
  );
}

export default function EvaluationDashboard() {
  const r = evalRun;
  const maxCalls = Math.max(...r.toolUsage.map((t) => t.calls));
  const shot = kongImages.evalExcerpt;

  return (
    <div className="overflow-hidden rounded-[18px] border border-line bg-bg-1">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-fg px-5 py-4 text-inv">
        <div className="dots flex flex-wrap items-center text-[15px] text-inv-muted">
          <span className="font-medium text-inv">{r.id}</span>
          <span>dataset {r.dataset}</span>
          <span>{r.model}</span>
          <span>Kong {r.kong}</span>
          <span>{r.date}</span>
        </div>
        <Tag className="!bg-accent-soft">{r.caveat}</Tag>
      </div>

      {/* Primary stats */}
      <div className="grid grid-cols-2 gap-px bg-line md:grid-cols-4">
        <Stat value={`${r.passed} / ${r.cases}`} label="cases passed" tone="ok" />
        <Stat value={r.findingRecall} label="finding recall (mean)" tone="ok" />
        <Stat value={r.answerFactMatch} label="answer fact match (mean)" tone="ok" />
        <Stat value={String(r.repeatedCalls)} label="repeated tool calls (total)" />
      </div>

      <div className="grid gap-px border-t border-line bg-line lg:grid-cols-12">
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
            <div key={l} className="flex flex-col bg-bg-1 p-5">
              <dt className="order-2 mt-1.5 text-[14px] leading-snug text-fg-muted">{l}</dt>
              <dd className="order-1 text-[24px] leading-none tracking-[-0.03em] tabular-nums">{v}</dd>
              <dd className="order-3 mt-0.5 text-[13px] leading-snug text-fg-dim">{n}</dd>
            </div>
          ))}
        </dl>

        {/* Difficulty */}
        <div className="bg-bg-1 p-5 md:p-6 lg:col-span-5">
          <p className="label">by difficulty</p>
          <ul className="mt-4 flex flex-col gap-3.5">
            {r.byDifficulty.map((d) => (
              <li key={d.tier}>
                <div className="flex justify-between text-[15px]">
                  <span>{d.tier}</span>
                  <span className="tabular-nums text-fg-muted">
                    {d.passed} / {d.total}
                  </span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden bg-bg-3">
                  <div className="h-full bg-leaf" style={{ width: `${(d.passed / d.total) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[14px] leading-relaxed text-fg-dim">
            pass = recall 100% and fact match 100% and no forbidden conclusion and finished within limits. Deterministic scorer; no LLM judge.
          </p>
        </div>
      </div>

      {/* Tool usage + excerpt */}
      <div className="grid grid-cols-[minmax(0,1fr)] gap-px border-t border-line bg-line lg:grid-cols-12">
        <div className="bg-bg-1 p-5 md:p-6 lg:col-span-5">
          <p className="label">tool usage across 28 cases</p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {r.toolUsage.map((t) => (
              <li key={t.tool} className="grid grid-cols-[158px_1fr_28px] items-center gap-2.5 sm:grid-cols-[172px_1fr_28px]">
                <code className="truncate font-mono text-[12px] text-fg-muted">{t.tool}</code>
                <div className="h-2 overflow-hidden bg-bg-3">
                  <div className="h-full bg-cobalt" style={{ width: `${(t.calls / maxCalls) * 100}%` }} />
                </div>
                <span className="text-right text-[14px] tabular-nums">{t.calls}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="min-w-0 bg-bg-1 p-5 md:p-6 lg:col-span-7">
          <Window title="Get-Content .\evals\results\run-003.md" meta="excerpt">
            <Image src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} sizes="(min-width: 1024px) 560px, 100vw" className="w-full" />
          </Window>
        </div>
      </div>

      {/* History — kept on purpose */}
      <div className="border-t border-line">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 py-4 md:px-6">
          <p className="text-[17px] font-medium tracking-[-0.015em]">earlier runs, kept on purpose</p>
          <p className="text-[14px] text-fg-dim">no run failed a case because of a wrong diagnosis</p>
        </div>
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Earlier runs">
          <table className="w-full min-w-[640px] text-left text-[15px]">
            <thead>
              <tr className="border-y border-line text-[14px] text-fg-dim">
                <th scope="col" className="px-5 py-2.5 font-normal md:px-6">run</th>
                <th scope="col" className="px-3 py-2.5 font-normal">dataset</th>
                <th scope="col" className="px-3 py-2.5 font-normal">passed</th>
                <th scope="col" className="px-3 py-2.5 font-normal">what the misses were</th>
              </tr>
            </thead>
            <tbody>
              {evalHistory.map((h) => (
                <tr key={h.run} className={`border-b border-line last:border-b-0 ${h.current ? "bg-stone" : ""}`}>
                  <td className="whitespace-nowrap px-5 py-3 font-medium md:px-6">{h.run}</td>
                  <td className="px-3 py-3 text-fg-muted">{h.dataset}</td>
                  <td className="whitespace-nowrap px-3 py-3 tabular-nums">{h.passed}</td>
                  <td className="px-3 py-3 pr-6 text-fg-muted">{h.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

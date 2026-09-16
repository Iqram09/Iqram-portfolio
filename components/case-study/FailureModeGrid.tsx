import { failureModes, failureSummary, observedFailureIds } from "@/data/kong";

const shown = failureModes.slice(0, 6);
const rest = observedFailureIds.filter((id) => !shown.some((f) => f.id === id));

export default function FailureModeGrid() {
  return (
    <div>
      <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {shown.map((f) => (
          <li key={f.id} className="lift flex flex-col rounded-xl border border-line bg-bg-1">
            <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
              <code className="font-mono text-[11px] text-err">{f.id}</code>
              <span className="h-1.5 w-1.5 rounded-full bg-err/70" aria-hidden />
            </div>
            <dl className="flex flex-1 flex-col gap-4 p-4">
              <div>
                <dt className="label-mono">failure</dt>
                <dd className="mt-1 text-[13px] leading-relaxed text-fg">{f.failure}</dd>
              </div>
              <div>
                <dt className="label-mono">impact</dt>
                <dd className="mt-1 text-[13px] leading-relaxed text-fg-muted">{f.impact}</dd>
              </div>
              <div className="mt-auto border-t border-line pt-3">
                <dt className="label-mono text-ok/80">fix</dt>
                <dd className="mt-1 text-[13px] leading-relaxed text-fg-muted">{f.fix}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>

      <div className="mt-6 grid gap-4 rounded-xl border border-line bg-bg-1 p-5 md:grid-cols-[auto_1fr] md:items-start md:gap-8">
        <div className="flex gap-8">
          <div>
            <div className="font-mono text-3xl tabular-nums text-fg">{failureSummary.observed}</div>
            <div className="mt-1 text-[12px] text-fg-muted">
              major failures <span className="text-fg">observed</span> during development
            </div>
          </div>
          <div>
            <div className="font-mono text-3xl tabular-nums text-fg">{failureSummary.provoked}</div>
            <div className="mt-1 text-[12px] text-fg-muted">
              failure modes deliberately <span className="text-fg">provoked</span> and verified
            </div>
          </div>
        </div>
        <div>
          <p className="text-[13px] leading-relaxed text-fg-muted">
            Observed failures happened on their own and were written up with symptom, root cause, impact, mitigation and a
            regression test. Provoked failure modes — a hallucinated tool name, invalid arguments, a Kong timeout, a malformed
            response — were induced to confirm the handling. The two are counted separately.
          </p>
          <p className="mt-3 font-mono text-[10.5px] leading-relaxed text-fg-dim">
            also observed: {rest.join(" · ")}
          </p>
        </div>
      </div>
    </div>
  );
}

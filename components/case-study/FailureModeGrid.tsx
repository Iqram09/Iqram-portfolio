import { failureModes, failureSummary, observedFailureIds } from "@/data/kong";

const shown = failureModes.slice(0, 6);
const rest = observedFailureIds.filter((id) => !shown.some((f) => f.id === id));

export default function FailureModeGrid() {
  return (
    <div>
      <ol className="grid gap-3 md:grid-cols-2">
        {shown.map((f) => (
          <li key={f.id} className="lift flex flex-col rounded-[18px] border border-line bg-bg-1 p-5 md:p-6">
            <div className="flex items-center justify-between gap-4">
              <code className="break-all font-mono text-[13px] font-medium text-err">{f.id}</code>
              <span className="h-2 w-2 shrink-0 rounded-full bg-err" aria-hidden />
            </div>
            <dl className="mt-4 flex flex-1 flex-col gap-4">
              <div>
                <dt className="label">failure</dt>
                <dd className="mt-1 text-[16px] leading-[1.5]">{f.failure}</dd>
              </div>
              <div>
                <dt className="label">impact</dt>
                <dd className="mt-1 text-[15px] leading-[1.5] text-fg-muted">{f.impact}</dd>
              </div>
              <div className="mt-auto border-t border-line pt-4">
                <dt className="text-[13px] font-medium text-ok">fix</dt>
                <dd className="mt-1 text-[15px] leading-[1.5] text-fg-muted">{f.fix}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>

      <div className="mt-3 grid gap-8 rounded-[18px] bg-stone p-6 md:grid-cols-[auto_1fr] md:items-start md:gap-12 md:p-8">
        <div className="flex gap-10">
          <div className="max-w-[9.5rem]">
            <div className="display text-[56px] tabular-nums">{failureSummary.observed}</div>
            <div className="mt-2 text-[15px] leading-snug text-fg-muted">
              major failures <span className="font-medium text-fg">observed</span> during development
            </div>
          </div>
          <div className="max-w-[9.5rem]">
            <div className="display text-[56px] tabular-nums">{failureSummary.provoked}</div>
            <div className="mt-2 text-[15px] leading-snug text-fg-muted">
              failure modes deliberately <span className="font-medium text-fg">provoked</span> and verified
            </div>
          </div>
        </div>
        <div>
          <p className="text-[16px] leading-relaxed text-fg-muted">
            Observed failures happened on their own and were written up with symptom, root cause, impact, mitigation and a
            regression test. Provoked failure modes — a hallucinated tool name, invalid arguments, a Kong timeout, a malformed
            response — were induced to confirm the handling. The two are counted separately.
          </p>
          <p className="mt-4 break-words text-[14px] leading-relaxed text-fg-muted">also observed: {rest.join(" · ")}</p>
        </div>
      </div>
    </div>
  );
}

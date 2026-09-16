import { safetyChain, safetyStatements, executionLimits } from "@/data/kong";
import { Shield } from "@/components/ui/Icons";

export default function SafetyChain() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12">
      {/* Guardrail chain */}
      <div className="rounded-xl border border-line bg-bg-1 p-5 md:p-7 lg:col-span-7">
        <div className="flex items-center justify-between font-mono text-[11px] text-fg-dim">
          <span>guardrail chain · each layer has a test</span>
          <Shield size={14} className="text-ok" />
        </div>
        <ol className="mt-5 flex flex-col">
          {safetyChain.map((s, i) => (
            <li key={s.label} className="relative grid grid-cols-[24px_1fr] gap-x-4">
              <div className="flex flex-col items-center" aria-hidden>
                <span className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-[10px] ${i === 0 ? "border-ok text-ok" : "border-line-strong text-fg-muted"}`}>
                  {i + 1}
                </span>
                {i < safetyChain.length - 1 && <span className="w-px flex-1 bg-line-strong" />}
              </div>
              <div className={i < safetyChain.length - 1 ? "pb-5" : ""}>
                <div className="text-sm font-medium text-fg">{s.label}</div>
                <p className="mt-1 text-[13px] leading-relaxed text-fg-muted">{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col gap-4 lg:col-span-5">
        {/* Statements — plain, unhedged, and the one honest caveat. */}
        <ul className="flex flex-col gap-2">
          {safetyStatements.map((s, i) => (
            <li
              key={s}
              className={`rounded-lg border px-4 py-3 text-sm font-medium ${
                i === safetyStatements.length - 1 ? "border-warn/40 bg-warn/5 text-fg" : "border-line bg-bg-1 text-fg"
              }`}
            >
              <span className={`mr-2 font-mono ${i === safetyStatements.length - 1 ? "text-warn" : "text-ok"}`}>
                {i === safetyStatements.length - 1 ? "!" : "✓"}
              </span>
              {s}
            </li>
          ))}
        </ul>
        <p className="text-[13px] leading-relaxed text-fg-muted">
          Prompt injection through gateway data is not detected or filtered. What exists is structural: there is no write
          tool for an injected instruction to call, arguments are typed, and an injected “this route is fine” cannot change
          what the rules derive from Kong. An injected instruction can still steer which read tools are called.
        </p>

        {/* Execution limits */}
        <div className="rounded-xl border border-line bg-bg-1">
          <div className="border-b border-line px-4 py-2 font-mono text-[11px] text-fg-dim">bounded execution · defaults</div>
          <table className="w-full text-left text-[12px]">
            <tbody>
              {executionLimits.map((l) => (
                <tr key={l.name} className="border-b border-line last:border-b-0">
                  <th scope="row" className="px-4 py-2 font-mono font-normal text-fg">{l.name}</th>
                  <td className="px-2 py-2 font-mono tabular-nums text-fg-muted">{l.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

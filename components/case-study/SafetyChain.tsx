import { safetyChain, safetyStatements, executionLimits } from "@/data/kong";
import { Shield } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

export default function SafetyChain() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12">
      {/* Guardrail chain */}
      <div className="rounded-[18px] bg-bg-1 p-6 md:p-8 lg:col-span-7">
        <div className="flex items-center justify-between text-[14px] text-fg-dim">
          <span>guardrail chain · each layer has a test</span>
          <Shield size={18} className="text-ok" />
        </div>
        <ol className="mt-6 flex flex-col">
          {safetyChain.map((s, i) => (
            <li key={s.label} className="relative grid grid-cols-[32px_1fr] gap-x-4">
              <div className="flex flex-col items-center" aria-hidden>
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[14px] tabular-nums",
                    i === 0 ? "bg-ok text-white" : "border border-line-strong text-fg-muted"
                  )}
                >
                  {i + 1}
                </span>
                {i < safetyChain.length - 1 && <span className="w-px flex-1 bg-line-strong" />}
              </div>
              <div className={i < safetyChain.length - 1 ? "pb-7" : ""}>
                <div className="text-[18px] font-medium leading-8 tracking-[-0.02em]">{s.label}</div>
                <p className="mt-0.5 text-[15px] leading-relaxed text-fg-muted">{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col gap-4 lg:col-span-5">
        {/* Statements — plain, unhedged, and the one honest caveat. */}
        <ul className="flex flex-col gap-2">
          {safetyStatements.map((s, i) => {
            const caveat = i === safetyStatements.length - 1;
            return (
              <li
                key={s}
                className={cn("flex gap-3 rounded-lg border px-4 py-3 text-[16px] font-medium tracking-[-0.01em]", caveat ? "border-warn/50 bg-warn/[0.07]" : "border-line bg-bg-1")}
              >
                <span className={caveat ? "text-warn" : "text-ok"}>{caveat ? "!" : "✓"}</span>
                {s}
              </li>
            );
          })}
        </ul>
        <p className="text-[15px] leading-relaxed text-fg-muted">
          Prompt injection through gateway data is not detected or filtered. What exists is structural: there is no write
          tool for an injected instruction to call, arguments are typed, and an injected “this route is fine” cannot change
          what the rules derive from Kong. An injected instruction can still steer which read tools are called.
        </p>

        {/* Execution limits */}
        <div className="rounded-[14px] border border-line bg-bg-1">
          <div className="border-b border-line px-4 py-2.5 text-[14px] text-fg-dim">bounded execution · defaults</div>
          <table className="w-full text-left">
            <tbody>
              {executionLimits.map((l) => (
                <tr key={l.name} className="border-b border-line last:border-b-0">
                  <th scope="row" className="break-all px-4 py-2.5 font-mono text-[12.5px] font-normal">{l.name}</th>
                  <td className="whitespace-nowrap px-4 py-2.5 text-right text-[14px] tabular-nums text-fg-muted">{l.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

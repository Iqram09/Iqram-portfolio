import Image from "next/image";
import { tests } from "@/data/kong";
import Window from "@/components/ui/Window";

export default function TestMetrics() {
  const total = tests.total;
  return (
    <div>
      {/* Proportional bar */}
      <div className="rounded-xl border border-line bg-bg-1 p-5 md:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-4xl tabular-nums text-fg md:text-5xl">{total}</div>
            <div className="mt-1 text-sm text-fg-muted">automated tests · Vitest</div>
          </div>
          <p className="font-mono text-[11px] text-ok">✓ {tests.statement}</p>
        </div>
        <div className="mt-5 flex h-3 w-full gap-px overflow-hidden rounded" role="img" aria-label="140 unit, 27 integration, 3 end-to-end tests">
          {tests.suites.map((s, i) => (
            <div
              key={s.name}
              className={i === 0 ? "bg-fg-muted" : i === 1 ? "bg-accent" : "bg-violet"}
              style={{ width: `${(s.count / total) * 100}%` }}
            />
          ))}
        </div>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px]">
          {tests.suites.map((s, i) => (
            <li key={s.name} className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-sm ${i === 0 ? "bg-fg-muted" : i === 1 ? "bg-accent" : "bg-violet"}`} aria-hidden />
              <span className="text-fg">{s.count}</span>
              <span className="text-fg-muted">{s.name}</span>
              <span className="text-fg-dim">· {s.detail}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Real runs */}
      <div className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-3">
        {tests.suites.map((s) => (
          <Window key={s.name} title={`npm run ${s.name === "unit" ? "check" : `test:${s.name}`}`} meta={`${s.count} passed`}>
            <Image src={s.image} alt={`Vitest output: ${s.count} ${s.name} tests passed across ${s.files} file${s.files > 1 ? "s" : ""}.`} width={s.w} height={s.h} sizes="(min-width: 768px) 380px, 100vw" className="w-full" />
          </Window>
        ))}
      </div>
      <p className="mt-3 font-mono text-[11px] text-fg-dim">
        Integration and e2e suites skip themselves with a message when Docker or an API key is absent, so npm test passes on a fresh clone. This is not production testing.
      </p>
    </div>
  );
}

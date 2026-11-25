import Image from "next/image";
import { tests } from "@/data/kong";
import Window from "@/components/ui/Window";

const tones = ["bg-fg", "bg-cobalt", "bg-accent"];

export default function TestMetrics() {
  const total = tests.total;
  return (
    <div>
      {/* Proportional bar */}
      <div className="rounded-[18px] bg-bg-1 p-6 md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="display text-[clamp(4.5rem,9vw,7.5rem)] leading-[0.85] tabular-nums">{total}</div>
            <div className="mt-3 text-[17px] text-fg-muted">automated tests · Vitest</div>
          </div>
          <p className="text-[16px] text-ok">✓ {tests.statement}</p>
        </div>
        <div className="mt-7 flex h-4 w-full gap-[3px]" role="img" aria-label="140 unit, 27 integration, 3 end-to-end tests">
          {tests.suites.map((s, i) => (
            <div key={s.name} className={tones[i]} style={{ width: `${(s.count / total) * 100}%` }} />
          ))}
        </div>
        <ul className="mt-5 flex flex-col gap-2.5 text-[15px] md:flex-row md:flex-wrap md:gap-x-8">
          {tests.suites.map((s, i) => (
            <li key={s.name} className="flex flex-wrap items-center gap-x-2">
              <span className={`h-2.5 w-2.5 ${tones[i]}`} aria-hidden />
              <span className="font-medium">{s.count}</span>
              <span>{s.name}</span>
              <span className="text-fg-dim">· {s.detail}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Real runs */}
      <div className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-4 md:grid-cols-3">
        {tests.suites.map((s) => (
          <Window key={s.name} title={`npm run ${s.name === "unit" ? "check" : `test:${s.name}`}`} meta={`${s.count} passed`} bodyClassName="bg-term">
            <Image
              src={s.image}
              alt={`Vitest output: ${s.count} ${s.name} tests passed across ${s.files} file${s.files > 1 ? "s" : ""}.`}
              width={s.w}
              height={s.h}
              sizes="(min-width: 768px) 380px, 100vw"
              className="w-full"
            />
          </Window>
        ))}
      </div>
      <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-fg-muted">
        Integration and e2e suites skip themselves with a message when Docker or an API key is absent, so npm test passes on a fresh clone. This is not production testing.
      </p>
    </div>
  );
}

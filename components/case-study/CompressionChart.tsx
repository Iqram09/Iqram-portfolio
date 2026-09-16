import { contextMeasurements, routeMeasurements, contextMechanisms } from "@/data/kong";

const fill = { dim: "#2B2B37", muted: "#6B6B76", accent: "#38BDF8" } as const;

export default function CompressionChart() {
  const max = contextMeasurements[0].bytes;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12 lg:items-start">
      {/* Chart */}
      <figure className="min-w-0 rounded-xl border border-line bg-bg-1 p-5 md:p-7 lg:col-span-7">
        <figcaption className="flex items-center justify-between font-mono text-[11px] text-fg-dim">
          <span>bytes reaching the model · seeded gateway</span>
          <span>measured</span>
        </figcaption>

        <ol className="mt-6 flex flex-col gap-5">
          {contextMeasurements.map((m) => {
            const pct = (m.bytes / max) * 100;
            return (
              <li key={m.label}>
                <div className="flex items-baseline justify-between gap-4">
                  <div className="min-w-0">
                    <div className={`text-sm font-medium ${m.tone === "accent" ? "text-accent" : "text-fg"}`}>{m.label}</div>
                    <div className="truncate font-mono text-[11px] text-fg-dim">{m.sub}</div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="font-mono text-base tabular-nums text-fg">{m.bytes.toLocaleString()} B</div>
                    <div className="font-mono text-[11px] tabular-nums text-fg-dim">{Math.round(pct)}%</div>
                  </div>
                </div>
                <svg viewBox="0 0 100 6" preserveAspectRatio="none" className="mt-2 h-2.5 w-full min-w-0" width="100%" role="img" aria-label={`${m.label}: ${m.bytes.toLocaleString()} bytes, ${Math.round(pct)} percent of the raw dump`}>
                  <rect x="0" y="0" width="100" height="6" rx="1" fill="#15151C" />
                  <rect x="0" y="0" width={pct} height="6" rx="1" fill={fill[m.tone]} />
                </svg>
              </li>
            );
          })}
        </ol>

        <div className="mt-7 grid grid-cols-2 gap-4 border-t border-line pt-5">
          {routeMeasurements.map((r, i) => (
            <div key={r.label}>
              <div className="font-mono text-[11px] text-fg-dim">{r.label}</div>
              <div className="mt-1 flex items-center gap-3">
                <span className="font-mono text-lg tabular-nums text-fg">{r.bytes} B</span>
                <svg viewBox="0 0 100 6" preserveAspectRatio="none" className="h-2 w-full min-w-0 flex-1" width="100%" aria-hidden>
                  <rect x="0" y="0" width="100" height="6" rx="1" fill="#15151C" />
                  <rect x="0" y="0" width={(r.bytes / routeMeasurements[0].bytes) * 100} height="6" rx="1" fill={i === 0 ? "#2B2B37" : "#38BDF8"} />
                </svg>
              </div>
            </div>
          ))}
          <p className="col-span-2 font-mono text-[11px] text-fg-dim">one route: 549 → 222 bytes (40% of raw)</p>
        </div>
      </figure>

      {/* Mechanisms */}
      <div className="min-w-0 lg:col-span-5">
        <p className="label-mono">mechanisms</p>
        <ol className="mt-3 divide-y divide-line rounded-xl border border-line bg-bg-1">
          {contextMechanisms.map((m, i) => (
            <li key={m.name} className="flex gap-4 p-4">
              <span className="font-mono text-[11px] tabular-nums text-accent">0{i + 1}</span>
              <div>
                <div className="text-sm font-medium text-fg">{m.name}</div>
                <p className="mt-1 text-[13px] leading-relaxed text-fg-muted">{m.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

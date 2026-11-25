import { contextMeasurements, routeMeasurements, contextMechanisms } from "@/data/kong";

const fill = { dim: "#B9B9B4", muted: "#7A7A75", accent: "#1F3FBF" } as const;
const track = "#E4E4E1";

export default function CompressionChart() {
  const max = contextMeasurements[0].bytes;

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12 lg:items-start">
      {/* Chart */}
      <figure className="min-w-0 rounded-[18px] bg-bg-1 p-5 md:p-8 lg:col-span-7">
        <figcaption className="flex items-center justify-between gap-4 text-[14px] text-fg-dim">
          <span>bytes reaching the model · seeded gateway</span>
          <span>measured</span>
        </figcaption>

        <ol className="mt-7 flex flex-col gap-7">
          {contextMeasurements.map((m) => {
            const pct = (m.bytes / max) * 100;
            return (
              <li key={m.label}>
                <div className="flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <div className={`text-[17px] font-medium tracking-[-0.015em] ${m.tone === "accent" ? "text-cobalt" : "text-fg"}`}>{m.label}</div>
                    <div className="truncate text-[14px] text-fg-dim">{m.sub}</div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="whitespace-nowrap text-[24px] leading-none tracking-[-0.03em] tabular-nums">{m.bytes.toLocaleString()} B</div>
                    <div className="mt-1 text-[14px] tabular-nums text-fg-dim">{Math.round(pct)}%</div>
                  </div>
                </div>
                <svg
                  viewBox="0 0 100 6"
                  preserveAspectRatio="none"
                  className="mt-2.5 h-3 w-full min-w-0"
                  width="100%"
                  role="img"
                  aria-label={`${m.label}: ${m.bytes.toLocaleString()} bytes, ${Math.round(pct)} percent of the raw dump`}
                >
                  <rect x="0" y="0" width="100" height="6" fill={track} />
                  <rect x="0" y="0" width={pct} height="6" fill={fill[m.tone]} />
                </svg>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-6">
          {routeMeasurements.map((r, i) => (
            <div key={r.label}>
              <div className="text-[14px] text-fg-dim">{r.label}</div>
              <div className="mt-1 flex items-center gap-3">
                <span className="whitespace-nowrap text-[22px] tracking-[-0.03em] tabular-nums">{r.bytes} B</span>
                <svg viewBox="0 0 100 6" preserveAspectRatio="none" className="h-2.5 w-full min-w-0 flex-1" width="100%" aria-hidden>
                  <rect x="0" y="0" width="100" height="6" fill={track} />
                  <rect x="0" y="0" width={(r.bytes / routeMeasurements[0].bytes) * 100} height="6" fill={i === 0 ? fill.dim : fill.accent} />
                </svg>
              </div>
            </div>
          ))}
          <p className="col-span-2 text-[14px] text-fg-dim">one route: 549 → 222 bytes (40% of raw)</p>
        </div>
      </figure>

      {/* Mechanisms */}
      <div className="min-w-0 lg:col-span-5">
        <p className="label">mechanisms</p>
        <ol className="mt-3 border-t border-line-strong">
          {contextMechanisms.map((m, i) => (
            <li key={m.name} className="flex gap-4 border-b border-line py-4">
              <span className="w-6 shrink-0 text-[14px] leading-6 tabular-nums text-accent">0{i + 1}</span>
              <div>
                <div className="text-[16px] font-medium tracking-[-0.015em]">{m.name}</div>
                <p className="mt-1 text-[15px] leading-relaxed text-fg-muted">{m.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

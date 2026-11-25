import { experience } from "@/data/experience";
import type { CSSProperties } from "react";

// Every technology named against a role, in order, once.
const names = Array.from(new Set(experience.flatMap((e) => e.technologies)));
const half = Math.ceil(names.length / 2);
const rows = [names.slice(0, half), names.slice(half)];

function Row({ items, reverse }: { items: string[]; reverse?: boolean }) {
  return (
    <div className="marquee fade-x" style={{ "--marquee-duration": "46s" } as CSSProperties}>
      <div className="marquee-track" data-reverse={reverse ? "" : undefined}>
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center gap-14 pr-14 md:gap-24 md:pr-24">
            {items.map((n) => (
              <li key={n} className="whitespace-nowrap text-[22px] font-semibold tracking-[-0.03em] text-fg-muted md:text-[28px]">
                {n}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

/** The stack behind the roles below, as two quiet rows. Decorative: Experience lists it properly. */
export default function TechBand() {
  return (
    <div aria-hidden className="bg-bg-1 py-20 md:py-24">
      <div className="flex flex-col gap-9 md:gap-12">
        <Row items={rows[0]} />
        <Row items={rows[1]} reverse />
      </div>
    </div>
  );
}

import type { ReactNode } from "react";

/*
 * One small drawn tile per skill group. Each fan shows the group's own tile in
 * front of its two neighbours. Decorative.
 */

type Tile = { ground: string; art: ReactNode };

const tiles: Record<string, Tile> = {
  // Braces, as two facing arcs.
  languages: {
    ground: "#1F3FBF",
    art: (
      <g fill="none" stroke="#BFD5EE" strokeWidth="9" strokeLinecap="round">
        <path d="M40 30c-16 0-8 32-24 32 16 0 8 32 24 32" />
        <path d="M60 30c16 0 8 32 24 32-16 0-8 32-24 32" />
      </g>
    ),
  },
  // Two ends that meet.
  apis: {
    ground: "#C69A66",
    art: (
      <g fill="#161616">
        <path d="M0 22h34a40 40 0 0 1 0 80H0Z" fill="#fff" />
        <path d="M100 22H82a40 40 0 0 0 0 80h18Z" />
        <circle cx="38" cy="62" r="9" fill="#C69A66" />
      </g>
    ),
  },
  // A bounded loop with a point of decision.
  ai: {
    ground: "#7F1330",
    art: (
      <g fill="none" stroke="#F2C9C4" strokeWidth="9">
        <circle cx="50" cy="62" r="32" strokeDasharray="150 52" strokeLinecap="round" />
        <circle cx="76" cy="40" r="10" fill="#fff" stroke="none" />
        <circle cx="50" cy="62" r="9" fill="#F2C9C4" stroke="none" />
      </g>
    ),
  },
  // Containers, stacked.
  cloud: {
    ground: "#1F6B4A",
    art: (
      <g fill="#BFD5EE">
        <rect x="14" y="82" width="72" height="26" />
        <rect x="14" y="51" width="34" height="26" fill="#fff" />
        <rect x="52" y="51" width="34" height="26" />
        <rect x="33" y="20" width="34" height="26" fill="#F2C9C4" />
      </g>
    ),
  },
  // Stores.
  databases: {
    ground: "#BFD5EE",
    art: (
      <g fill="#1F3FBF">
        <path d="M14 92v10c0 9 16 16 36 16s36-7 36-16V92c0 9-16 16-36 16s-36-7-36-16Z" />
        <path d="M14 62v14c0 9 16 16 36 16s36-7 36-16V62c0 9-16 16-36 16s-36-7-36-16Z" />
        <path d="M14 32v14c0 9 16 16 36 16s36-7 36-16V32c0 9-16 16-36 16s-36-7-36-16Z" />
        <ellipse cx="50" cy="26" rx="36" ry="15" fill="#7F1330" />
      </g>
    ),
  },
  // Checks on a grid.
  platforms: {
    ground: "#F2C9C4",
    art: (
      <g>
        <rect x="14" y="26" width="34" height="34" fill="#7F1330" />
        <rect x="52" y="26" width="34" height="34" fill="#fff" />
        <rect x="14" y="64" width="34" height="34" fill="#fff" />
        <rect x="52" y="64" width="34" height="34" fill="#1F6B4A" />
        <path d="m60 81 7 7 12-15" fill="none" stroke="#fff" strokeWidth="5" />
        <path d="m22 43 7 7 12-15" fill="none" stroke="#fff" strokeWidth="5" />
      </g>
    ),
  },
  // Points and a fit.
  ml: {
    ground: "#2D3E53",
    art: (
      <g fill="#BFD5EE">
        <path d="M8 104 94 24" stroke="#F2C9C4" strokeWidth="6" />
        <circle cx="24" cy="78" r="7" />
        <circle cx="42" cy="84" r="7" />
        <circle cx="46" cy="52" r="7" />
        <circle cx="66" cy="62" r="7" fill="#fff" />
        <circle cx="72" cy="32" r="7" />
      </g>
    ),
  },
};

const order = Object.keys(tiles);

function TileSvg({ id }: { id: string }) {
  const t = tiles[id];
  return (
    <svg viewBox="0 0 100 124" className="absolute inset-0 h-full w-full overflow-hidden rounded-[7px]" aria-hidden focusable={false}>
      <rect width="100" height="124" fill={t.ground} />
      {t.art}
    </svg>
  );
}

export default function TileFan({ id, className }: { id: string; className?: string }) {
  const i = order.indexOf(id);
  const n = order.length;
  const trio = [order[(i + n - 1) % n], order[(i + 1) % n], id];
  return (
    <div aria-hidden className={className}>
      <div className="fan relative mx-auto h-[112px] w-[90px]">
        {trio.map((t) => (
          <div key={t} className="absolute inset-0">
            <TileSvg id={t} />
          </div>
        ))}
      </div>
    </div>
  );
}

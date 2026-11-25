import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The name, drawn as five shapes: stems are rectangles, bowls and shoulders
 * are arches, and the counters are narrow slits so a picture survives the cut.
 * Every shape is 500 tall; `w` is its natural width.
 */
export const LETTERS = {
  i: {
    w: 200,
    d: "M100 0a100 100 0 1 1 0 200a100 100 0 1 1 0-200ZM0 222H200V500H0Z",
  },
  q: {
    w: 400,
    d: "M130 0A130 130 0 0 1 260 130V0H400V500H260V270A130 130 0 0 1 0 270V130A130 130 0 0 1 130 0ZM130 142a8 8 0 0 1 8 8V250a8 8 0 0 1-16 0V150a8 8 0 0 1 8-8Z",
  },
  r: {
    w: 370,
    d: "M0 0H180V95A95 95 0 0 1 370 95V232H180V500H0Z",
  },
  a: {
    w: 400,
    d: "M130 0A130 130 0 0 1 260 130V0H400V500H260V370A130 130 0 0 1 0 370V130A130 130 0 0 1 130 0ZM130 186a8 8 0 0 1 8 8V306a8 8 0 0 1-16 0V194a8 8 0 0 1 8-8Z",
  },
  m: {
    w: 590,
    d: "M0 0H190V100A100 100 0 0 1 390 100A100 100 0 0 1 590 100V500H398V258A8 8 0 0 0 382 258V500H198V258A8 8 0 0 0 182 258V500H0Z",
  },
} as const;

export type LetterKey = keyof typeof LETTERS;

const mask = (key: LetterKey) => {
  const { w, d } = LETTERS[key];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} 500' preserveAspectRatio='none'><path fill-rule='evenodd' d='${d}'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};

const MASKS = Object.fromEntries((Object.keys(LETTERS) as LetterKey[]).map((k) => [k, mask(k)])) as Record<LetterKey, string>;

/** A box cut to one letter. Set its height; the width follows. */
export function LetterCut({
  letter,
  children,
  className,
}: {
  letter: LetterKey;
  children?: ReactNode;
  className?: string;
}) {
  const style: CSSProperties = {
    aspectRatio: `${LETTERS[letter].w} / 500`,
    maskImage: MASKS[letter],
    WebkitMaskImage: MASKS[letter],
  };
  return (
    <div className={cn("letter relative overflow-hidden", className)} style={style}>
      {children}
    </div>
  );
}

/** The same letter as a flat glyph, for small sizes. */
export function LetterGlyph({ letter, className }: { letter: LetterKey; className?: string }) {
  const { w, d } = LETTERS[letter];
  return (
    <svg viewBox={`0 0 ${w} 500`} className={className} aria-hidden focusable={false}>
      <path d={d} fill="currentColor" fillRule="evenodd" />
    </svg>
  );
}

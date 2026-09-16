import type { ReactNode } from "react";

type Props = {
  index?: string;
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  id?: string;
  /** Right-aligned slot (e.g. filters, a link). */
  aside?: ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

/**
 * Editorial section heading: index + eyebrow on one line, a large title,
 * and an optional lede. Used consistently across the homepage and case study.
 */
export default function SectionHeader({
  index,
  eyebrow,
  title,
  lede,
  id,
  aside,
  as = "h2",
  className = "",
}: Props) {
  const Heading = as;
  return (
    <div className={`flex flex-col gap-6 md:flex-row md:items-end md:justify-between ${className}`}>
      <div className="max-w-3xl">
        {(index || eyebrow) && (
          <div className="mb-4 flex items-center gap-3">
            {index && <span className="section-index">{index}</span>}
            {index && eyebrow && <span className="h-px w-6 bg-line-strong" aria-hidden />}
            {eyebrow && <span className="label-mono">{eyebrow}</span>}
          </div>
        )}
        <Heading
          id={id}
          className="text-balance text-3xl font-semibold tracking-tight text-fg md:text-4xl"
        >
          {title}
        </Heading>
        {lede && (
          <p className="mt-4 max-w-2xl text-pretty text-base leading-relaxed text-fg-muted md:text-lg">
            {lede}
          </p>
        )}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  );
}

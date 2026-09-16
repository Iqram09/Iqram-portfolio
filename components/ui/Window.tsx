import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  /** Right-aligned mono text in the title bar. */
  meta?: ReactNode;
  className?: string;
  bodyClassName?: string;
};

/**
 * Terminal / app window frame used for consoles, screenshots and telemetry panels.
 * Restrained: one border, one title bar, no drop shadows.
 */
export default function Window({ title, children, meta, className = "", bodyClassName = "" }: Props) {
  return (
    <div className={`overflow-hidden rounded-lg border border-line bg-bg-1 ${className}`}>
      <div className="flex items-center justify-between gap-4 border-b border-line bg-bg-2/60 px-3.5 py-2">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex gap-1.5" aria-hidden>
            <i className="h-2 w-2 rounded-full bg-line-strong" />
            <i className="h-2 w-2 rounded-full bg-line-strong" />
            <i className="h-2 w-2 rounded-full bg-line-strong" />
          </span>
          <span className="truncate font-mono text-[11px] text-fg-muted">{title}</span>
        </div>
        {meta && <div className="hidden shrink-0 font-mono text-[11px] text-fg-dim sm:block">{meta}</div>}
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

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
 * Terminal / app window frame for consoles, screenshots and telemetry: a
 * glass title bar over a dark body.
 */
export default function Window({ title, children, meta, className = "", bodyClassName = "" }: Props) {
  return (
    <div className={`glass overflow-hidden rounded-xl bg-night-1/80 ${className}`}>
      <div className="relative flex items-center justify-between gap-4 border-b border-fg/[0.07] bg-fg/[0.03] px-3.5 py-2.5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex gap-1.5" aria-hidden>
            <i className="h-2 w-2 rounded-full bg-fg/15" />
            <i className="h-2 w-2 rounded-full bg-fg/15" />
            <i className="h-2 w-2 rounded-full bg-fg/15" />
          </span>
          <span className="truncate font-mono text-[11px] text-fg-muted">{title}</span>
        </div>
        {meta && <div className="hidden shrink-0 font-mono text-[11px] text-fg-dim sm:block">{meta}</div>}
      </div>
      <div className={`relative ${bodyClassName}`}>{children}</div>
    </div>
  );
}

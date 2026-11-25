import type { ReactNode } from "react";

type Props = {
  title: string;
  children: ReactNode;
  /** Right-aligned text in the title bar. */
  meta?: ReactNode;
  className?: string;
  bodyClassName?: string;
};

/** App / terminal frame for consoles, captures and telemetry: a white title bar over the body. */
export default function Window({ title, children, meta, className = "", bodyClassName = "" }: Props) {
  return (
    <div className={`flex flex-col overflow-hidden rounded-xl border border-line bg-bg-1 ${className}`}>
      <div className="flex items-center justify-between gap-4 border-b border-line px-3.5 py-2.5">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex gap-1.5" aria-hidden>
            <i className="h-2 w-2 rounded-full bg-bg-3" />
            <i className="h-2 w-2 rounded-full bg-bg-3" />
            <i className="h-2 w-2 rounded-full bg-bg-3" />
          </span>
          <span className="truncate font-mono text-[12px] text-fg-muted">{title}</span>
        </div>
        {meta && <div className="hidden shrink-0 text-[12px] text-fg-dim sm:block">{meta}</div>}
      </div>
      <div className={`relative flex-1 ${bodyClassName}`}>{children}</div>
    </div>
  );
}

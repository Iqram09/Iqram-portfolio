import { cn } from "@/lib/cn";

/**
 * "iqram patel" in the display serif. The i is set dotless and its tittle is
 * drawn as a separate maroon dot — the same dot that marks live and available
 * states across the site. Decorative: give the parent an accessible name.
 */
export default function Wordmark({ className, dotClassName }: { className?: string; dotClassName?: string }) {
  return (
    <span aria-hidden className={cn("inline-block whitespace-nowrap font-display font-medium leading-none tracking-[-0.03em]", className)}>
      {/* Generated content, so half a name never enters the text of the page. */}
      <span className="relative inline-block before:content-['ı']">
        <span
          className={cn(
            "absolute left-1/2 top-[0.1em] h-[0.17em] w-[0.17em] -translate-x-1/2 rounded-full bg-accent transition-transform duration-500 ease-out-expo group-hover:-translate-y-[0.08em]",
            dotClassName
          )}
        />
      </span>
      <span className="before:content-['qram_patel']" />
    </span>
  );
}

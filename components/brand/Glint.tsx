import { cn } from "@/lib/cn";

/**
 * A thin four-point glint — light catching an edge of glass. The site's one
 * accent mark; use one at a time. Size with width; takes the text colour.
 */
export default function Glint({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" className={cn("inline-block h-auto w-3 shrink-0 fill-current", className)}>
      <path d="M12 0C12.5 7.6 16.4 11.5 24 12C16.4 12.5 12.5 16.4 12 24C11.5 16.4 7.6 12.5 0 12C7.6 11.5 11.5 7.6 12 0Z" />
    </svg>
  );
}

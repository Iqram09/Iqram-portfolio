/**
 * Signature motif — appears in the hero, project card, case study and contact.
 *   > tool_call()  → evidence  ✓ verified
 */
export default function Motif({
  className = "",
  size = "sm",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  const text = size === "md" ? "text-sm" : "text-xs";
  return (
    <div
      className={`inline-flex flex-wrap items-center gap-x-3 gap-y-1 font-mono ${text} text-fg-dim ${className}`}
      aria-label="tool call, evidence, verified"
    >
      <span>
        <span className="text-accent">&gt;</span> tool_call()
      </span>
      <span aria-hidden className="text-line-strong">
        →
      </span>
      <span>evidence</span>
      <span aria-hidden className="text-line-strong">
        →
      </span>
      <span className="text-ok">✓ verified</span>
    </div>
  );
}

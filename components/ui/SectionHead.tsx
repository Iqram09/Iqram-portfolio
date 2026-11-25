import type { ReactNode } from "react";
import SplitText from "@/components/ui/SplitText";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

type Props = {
  eyebrow: string;
  title: string;
  lede?: ReactNode;
  id?: string;
  aside?: ReactNode;
  /** Centred capitals (the default) or a left-set sentence-case head. */
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
  /** Replaces the centred title's type classes. */
  titleClassName?: string;
};

/**
 * Opens every section: a small sans line, then the title in the display serif
 * rising word by word, then one line of context.
 */
export default function SectionHead({
  eyebrow,
  title,
  lede,
  id,
  aside,
  align = "center",
  tone = "light",
  className,
  titleClassName,
}: Props) {
  const dark = tone === "dark";
  if (align === "left") {
    return (
      <header className={cn("flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between", className)}>
        <div>
          <p className={dark ? "eyebrow-inv" : "eyebrow"}>{eyebrow}</p>
          <h2 id={id} className={cn("display mt-3 text-balance text-[clamp(2.9rem,6vw,5.25rem)]")}>
            <SplitText>{title}</SplitText>
          </h2>
        </div>
        {lede ? (
          <Reveal delay={120} className="max-w-sm lg:pb-2">
            <p className={cn("text-pretty text-[17px] leading-relaxed", dark ? "text-inv-muted" : "text-fg-muted")}>{lede}</p>
          </Reveal>
        ) : null}
        {aside ? <Reveal delay={180}>{aside}</Reveal> : null}
      </header>
    );
  }
  return (
    <header className={cn("mx-auto flex max-w-[1080px] flex-col items-center text-center", className)}>
      <p className={dark ? "eyebrow-inv" : "eyebrow"}>{eyebrow}</p>
      <h2 id={id} className={cn("mt-3 text-balance", titleClassName ?? "display-caps text-[clamp(2.9rem,8.6vw,8rem)]")}>
        <SplitText>{title}</SplitText>
      </h2>
      {lede ? (
        <Reveal delay={150}>
          <p className={cn("mx-auto mt-5 max-w-[640px] text-pretty text-[17px] leading-relaxed", dark ? "text-inv-muted" : "text-fg-muted")}>
            {lede}
          </p>
        </Reveal>
      ) : null}
      {aside ? (
        <Reveal delay={200} className="mt-6">
          {aside}
        </Reveal>
      ) : null}
    </header>
  );
}

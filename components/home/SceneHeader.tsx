import type { ReactNode } from "react";
import SplitText from "@/components/ui/SplitText";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

export const SCENE_TOTAL = 9;

type Props = {
  /** Scene number, e.g. "03". */
  index: string;
  /** Short HUD label, e.g. "Featured system". */
  label: string;
  title: string;
  lede?: ReactNode;
  id?: string;
  aside?: ReactNode;
  className?: string;
};

/**
 * Opens every homepage scene: a viewfinder-style marker rule (scene number,
 * label, position in the reel), then a display title that rises word by word.
 */
export default function SceneHeader({ index, label, title, lede, id, aside, className }: Props) {
  return (
    <header className={cn("relative", className)}>
      <div className="hud flex items-center gap-4">
        <span className="text-warm-soft">Scene {index}</span>
        <span aria-hidden className="ticks h-2 flex-1 opacity-40" />
        <span className="hidden sm:inline">{label}</span>
        <span aria-hidden className="tabular-nums">
          {index} / {String(SCENE_TOTAL).padStart(2, "0")}
        </span>
      </div>
      <div className="mt-10 flex flex-col gap-8 md:mt-14 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-4xl">
          <h2 id={id} className="display text-balance text-[clamp(2.5rem,6.6vw,6.5rem)] text-fg">
            <SplitText>{title}</SplitText>
          </h2>
          {lede ? (
            <Reveal delay={150}>
              <p className="mt-7 max-w-2xl text-pretty text-[17px] leading-relaxed text-fg-muted md:text-lg">{lede}</p>
            </Reveal>
          ) : null}
        </div>
        {aside ? <Reveal delay={200} className="shrink-0">{aside}</Reveal> : null}
      </div>
    </header>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { clients } from "@/data/experience";
import { kong, kongImages } from "@/data/kong";
import { LetterCut, type LetterKey } from "@/components/brand/Letterform";
import { cn } from "@/lib/cn";

const caseHref = `/projects/${kong.slug}`;

type Card = {
  letter: LetterKey;
  label: string;
  href: string;
  external?: boolean;
  /** Where the label sits inside the letter. */
  at: string;
  ground: string;
  ink: string;
  art: (eager: boolean) => ReactNode;
};

/** A capture laid on a flat ground, tilted, like a sheet on a desk. */
function Sheet({ src, alt, w, h, sizes, className, eager }: { src: string; alt: string; w: number; h: number; sizes: string; className: string; eager: boolean }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={w}
      height={h}
      quality={90}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      className={cn("absolute max-w-none rounded-md shadow-[0_24px_60px_-20px_rgba(0,0,0,.55)]", className)}
    />
  );
}

const cards: Card[] = [
  {
    letter: "i",
    label: clients[0].name,
    href: clients[0].url,
    external: true,
    at: "bottom-[4%] left-[8%] right-[8%]",
    ground: "bg-dusk",
    ink: "text-white",
    art: (eager) => <Image src="/crops/stans-tall.jpg" alt="" fill quality={85} sizes="(min-width: 768px) 220px, 120px" loading={eager ? "eager" : "lazy"} className="object-cover" />,
  },
  {
    letter: "q",
    label: "Agent diagnosis",
    href: `${caseHref}#agent`,
    at: "left-[13%] top-[13%] w-[46%]",
    ground: "bg-cobalt",
    ink: "text-white",
    art: (eager) => <Sheet src={kongImages.agentDiagnosis.src} alt="" w={1059} h={817} sizes="(min-width: 768px) 720px, 420px" eager={eager} className="left-[20%] top-[40%] w-[150%] -rotate-[9deg]" />,
  },
  {
    letter: "r",
    label: clients[1].name,
    href: clients[1].url,
    external: true,
    at: "bottom-[4%] left-[5%]",
    ground: "bg-camel",
    ink: "text-white",
    art: (eager) => <Image src="/crops/proximo-letter.jpg" alt="" fill quality={85} sizes="(min-width: 768px) 400px, 215px" loading={eager ? "eager" : "lazy"} className="object-cover" />,
  },
  {
    letter: "a",
    label: "Evaluation",
    href: `${caseHref}#evaluation`,
    at: "left-[13%] top-[15%]",
    ground: "bg-accent",
    ink: "text-white",
    art: (eager) => <Sheet src={kongImages.evalExcerpt.src} alt="" w={1053} h={487} sizes="(min-width: 768px) 900px, 520px" eager={eager} className="left-[-14%] top-[45%] w-[190%] rotate-[7deg]" />,
  },
  {
    letter: "m",
    label: "Seeded gateway",
    href: `${caseHref}#problem`,
    at: "left-[3.5%] top-[5%] w-[26%]",
    ground: "bg-sky",
    ink: "text-fg",
    art: (eager) => <Sheet src={kongImages.kongRoutes.src} alt="" w={1581} h={839} sizes="(min-width: 768px) 800px, 460px" eager={eager} className="left-[12%] top-[32%] w-[112%] -rotate-[4deg]" />,
  },
];

function Group({ copy }: { copy?: boolean }) {
  return (
    <ul className="flex shrink-0 items-end gap-3 pr-3 md:gap-5 md:pr-5" aria-hidden={copy || undefined}>
      {cards.map((c) => {
        const body = (
          <LetterCut letter={c.letter} className={cn("h-[clamp(280px,36vw,520px)]", c.ground)}>
            <div className="absolute inset-0 transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.04]">{c.art(!copy)}</div>
            <span className={cn("absolute text-[15px] font-medium leading-[1.1] tracking-[-0.015em] md:text-[17px]", c.at, c.ink, c.ink === "text-white" && "[text-shadow:0_1px_14px_rgba(0,0,0,.45)]")}>
              {c.label}
            </span>
          </LetterCut>
        );
        const props = { className: "group block rounded-none", tabIndex: copy ? -1 : undefined };
        return (
          <li key={c.letter}>
            {c.external ? (
              <a href={c.href} target="_blank" rel="noopener noreferrer" {...props}>
                {body}
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            ) : (
              <Link href={c.href} {...props}>
                {body}
              </Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** The five letters of the name, each cut from a piece of the work. */
export default function LetterMarquee() {
  return (
    <section aria-label="Selected work" className="marquee bg-bg pb-24 md:pb-32" style={{ "--marquee-duration": "70s" } as React.CSSProperties}>
      <div className="marquee-track">
        <Group />
        <Group copy />
      </div>
    </section>
  );
}

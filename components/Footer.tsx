import Link from "next/link";
import { navLinks, site } from "@/data/site";
import AnchorLink from "@/components/ui/AnchorLink";
import BackToTop from "@/components/ui/BackToTop";
import DitherWordmark from "@/components/brand/DitherWordmark";
import MumbaiClock from "@/components/brand/MumbaiClock";

const link = "inline-block py-1 text-[16px] text-inv-muted transition-colors hover:text-inv";

export default function Footer() {
  return (
    <footer className="on-dark overflow-hidden bg-night pb-10 pt-4 text-inv">
      <div className="container-site">
        <div className="rule-dashed" aria-hidden />
        <div className="grid gap-x-8 gap-y-10 py-12 sm:grid-cols-2 md:py-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-[17px] font-semibold tracking-[-0.015em]">{site.identity}</p>
            <p className="mt-2 text-[16px] leading-relaxed text-inv-muted">
              {site.location} · {site.coordinates}
            </p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 sm:col-span-2 lg:col-span-6 lg:col-start-7">
            <ul>
              {navLinks.map((l) => (
                <li key={l.id}>
                  <AnchorLink href={l.href} className={link}>
                    {l.label}
                  </AnchorLink>
                </li>
              ))}
            </ul>
            <ul>
              <li>
                <Link href="/resume" className={link}>
                  Résumé
                </Link>
              </li>
              <li>
                <a href={site.github} target="_blank" rel="noopener noreferrer" className={link}>
                  GitHub
                </a>
              </li>
              <li>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={link}>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className={link}>
                  Email
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="rule-dashed" aria-hidden />

        <div className="py-14 md:py-24">
          <DitherWordmark text="iqram patel" label={site.displayName} />
        </div>

        <div className="flex flex-col gap-x-10 gap-y-3 text-[15px] text-inv-muted md:flex-row md:items-center">
          <p>
            Mumbai, <MumbaiClock short className="tabular-nums" />
          </p>
          <p>© 2026 {site.fullName}</p>
          <p className="text-inv-dim">Next.js · TypeScript · GSAP · Framer Motion · Lenis</p>
          <BackToTop className="md:ml-auto" />
        </div>
      </div>
    </footer>
  );
}

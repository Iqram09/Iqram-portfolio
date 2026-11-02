import Link from "next/link";
import { navLinks, site } from "@/data/site";
import AnchorLink from "@/components/ui/AnchorLink";
import Glint from "@/components/brand/Glint";

export default function Footer() {
  return (
    <footer className="relative bg-night py-12">
      <div className="container-site">
        <div className="flex flex-col gap-10 border-t border-line pt-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="inline-flex items-center gap-2.5 text-sm font-semibold tracking-[0.24em] text-fg">
              <Glint className="w-3 text-accent-soft" /> {site.shortName}
            </p>
            <p className="mt-3 text-sm text-fg-muted">{site.identity}</p>
            <p className="hud mt-2">
              {site.location} · {site.coordinates}
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-14 gap-y-2 text-sm sm:grid-cols-3">
            {navLinks.map((l) => (
              <AnchorLink key={l.id} href={l.href} className="text-fg-muted transition-colors hover:text-fg">
                {l.label}
              </AnchorLink>
            ))}
            <Link href="/resume" className="text-fg-muted transition-colors hover:text-fg">
              Résumé
            </Link>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="text-fg-muted transition-colors hover:text-fg">
              GitHub
            </a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-fg-muted transition-colors hover:text-fg">
              LinkedIn
            </a>
            <a href={`mailto:${site.email}`} className="text-fg-muted transition-colors hover:text-fg">
              Email
            </a>
          </nav>
        </div>

        <div className="hud mt-12 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {site.fullName}</p>
          <p>Next.js · TypeScript · GSAP · Framer Motion · Lenis</p>
        </div>
      </div>
    </footer>
  );
}

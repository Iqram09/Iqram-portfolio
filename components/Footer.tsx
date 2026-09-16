import Link from "next/link";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-site flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-fg">{site.displayName}</p>
          <p className="mt-0.5 text-sm text-fg-muted">{site.role}</p>
          <p className="mt-0.5 font-mono text-xs text-fg-dim">{site.location}</p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="text-fg-muted transition-colors hover:text-fg">
                GitHub
              </a>
            </li>
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-fg-muted transition-colors hover:text-fg">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="text-fg-muted transition-colors hover:text-fg">
                Email
              </a>
            </li>
            <li>
              <Link href="/resume" className="text-fg-muted transition-colors hover:text-fg">
                Resume
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container-site mt-8 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[11px] text-fg-dim sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 {site.displayName}</p>
        <p>Next.js · TypeScript · Tailwind CSS</p>
      </div>
    </footer>
  );
}

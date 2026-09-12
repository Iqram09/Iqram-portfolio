import Link from "next/link";
import { LuGithub, LuLinkedin, LuMail } from "react-icons/lu";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-primary py-12 mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <h3 className="text-lg font-semibold text-bright mb-1">
              Iqram Patel
            </h3>
            <p className="text-muted text-sm mb-1">AI / Software Engineer</p>
            <p className="text-muted/70 text-sm">Mumbai, India</p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/Iqram09"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-bright transition-colors"
              aria-label="GitHub"
            >
              <LuGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/iqram-patel09/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-bright transition-colors"
              aria-label="LinkedIn"
            >
              <LuLinkedin size={20} />
            </a>
            <a
              href="mailto:mdipramp@gmail.com"
              className="text-muted hover:text-bright transition-colors"
              aria-label="Email"
            >
              <LuMail size={20} />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted/70 font-mono">
          <p>© {new Date().getFullYear()} Iqram Patel</p>
          <p>Built with Next.js & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}

import { SiGithub,} from "react-icons/si";
import { CiLinkedin } from "react-icons/ci";

export default function Footer() {
  return (
    <footer className="border-t border-[#1E2D4A] py-8 bg-[#0D1323]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-medium">Iqram Patel</span> · Built with Next.js & Tailwind
        </p>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/Iqram09"
            target="_blank"
            rel="noreferrer"
            className="text-slate-500 hover:text-white transition-colors"
          >
            <SiGithub size={18} />
          </a>
          <a
            href="https://linkedin.com/in/iqram-patel09"
            target="_blank"
            rel="noreferrer"
            className="text-slate-500 hover:text-white transition-colors"
          >
            <CiLinkedin size={18} />
          </a>
          <a href="mailto:mdipramp@gmail.com" className="text-slate-500 hover:text-[#00C9B1] transition-colors text-sm">
            mdipramp@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}

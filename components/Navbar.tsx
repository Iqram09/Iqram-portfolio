"use client";
import { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { SiGithub,} from "react-icons/si";
import { CiLinkedin } from "react-icons/ci";

const links = [
  { label: "About",     href: "#about" },
  { label: "Skills",    href: "#skills" },
  { label: "Projects",  href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact",   href: "#contact" },
];

export default function Navbar() {
  const [open,      setOpen]      = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [active,    setActive]    = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* intersection observer to highlight active section */
  useEffect(() => {
    const ids = links.map((l) => l.href.replace("#", ""));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0F1C]/90 backdrop-blur-lg border-b border-[#1E2D4A] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-display font-800 text-xl tracking-tight">
          <span className="text-white">Iqram</span>
          <span className="text-[#00C9B1]">.</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative text-sm font-medium transition-colors ${
                active === l.href
                  ? "text-[#00C9B1]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {l.label}
              {active === l.href && (
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#00C9B1] rounded-full" />
              )}
            </a>
          ))}
        </nav>

        {/* Social + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com/Iqram09"
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <SiGithub size={18} />
          </a>
          <a
            href="https://linkedin.com/in/iqram-patel09"
            target="_blank"
            rel="noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <CiLinkedin size={18} />
          </a>
          <a
            href="#contact"
            className="ml-2 px-4 py-2 bg-[#00C9B1] text-[#0A0F1C] text-sm font-semibold rounded-lg hover:bg-[#00E5CC] transition-colors"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-slate-300"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0F1629] border-t border-[#1E2D4A] px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-slate-300 hover:text-[#00C9B1] text-sm font-medium transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-2 text-center px-4 py-2 bg-[#00C9B1] text-[#0A0F1C] text-sm font-semibold rounded-lg"
          >
            Hire Me
          </a>
        </div>
      )}
    </header>
  );
}

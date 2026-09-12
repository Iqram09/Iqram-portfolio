"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LuMenu, LuX } from "react-icons/lu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "Experience", href: "#experience" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-primary/80 backdrop-blur-md border-b border-border py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-bright hover:text-accent transition-colors"
          >
            IQRAM.
          </Link>
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-surface rounded-full border border-border text-xs font-mono text-muted">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow"></span>
            Open to opportunities
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-muted hover:text-bright transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/resume"
            className="text-sm font-medium text-accent hover:text-bright transition-colors"
          >
            Resume
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-muted hover:text-bright"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <LuX size={24} /> : <LuMenu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-secondary border-b border-border shadow-xl">
          <nav className="flex flex-col py-4 px-6 gap-4">
            <div className="flex items-center gap-2 mb-2 px-3 py-2 bg-surface rounded-lg border border-border text-xs font-mono text-muted w-max">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow"></span>
              Open to opportunities
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium text-muted hover:text-bright transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/resume"
              className="text-base font-medium text-accent py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Resume
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

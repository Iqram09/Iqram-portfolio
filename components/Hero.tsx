"use client";
import { useEffect, useState } from "react";
import { HiArrowDown, HiDownload } from "react-icons/hi";
import { SiGithub, } from "react-icons/si";
import { CiLinkedin } from "react-icons/ci";
import Image from "next/image";

const roles = ["Full-Stack Developer",
  "AI & Machine Learning Enthusiast",
  "Data Science Learner",
  "Data Analytics Explorer",
  "Building Modern Digital Experiences",
];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [charIdx, setCharIdx] = useState(0);

  /* typewriter */
  useEffect(() => {
    const current = roles[roleIdx];
    let timeout: NodeJS.Timeout;

    if (!deleting && charIdx <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, 60);
    } else if (!deleting && charIdx > current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIdx >= 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx((c) => c - 1);
      }, 35);
    } else {
      setDeleting(false);
      setRoleIdx((r) => (r + 1) % roles.length);
      setCharIdx(0);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, roleIdx]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden noise"
    >
      {/* background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#00C9B1]/8 blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-purple-500/8 blur-[100px] animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-blue-500/6 blur-[80px] animate-pulse-slow" style={{ animationDelay: "0.8s" }} />

        {/* grid */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00C9B1" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* floating orbs */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border border-[#00C9B1]/20 animate-float"
            style={{
              width:  `${20 + i * 15}px`,
              height: `${20 + i * 15}px`,
              top:    `${15 + i * 12}%`,
              left:   `${5 + i * 15}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${3 + i * 0.7}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-28 pb-20 w-full grid lg:grid-cols-2 gap-12 items-center">
        {/* Left — text */}
        <div className="space-y-6 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-[#0F1629] border border-[#1E2D4A] rounded-full px-4 py-1.5 text-xs font-medium text-[#00C9B1]">
            <span className="w-2 h-2 rounded-full bg-[#00C9B1] animate-pulse-slow" />
            Available for opportunities
          </div>

          <div>
            <p className="text-slate-400 text-lg mb-1 font-light">Hey there, I&apos;m</p>
            <h1 className="font-display font-extrabold text-5xl lg:text-6xl tracking-tight leading-tight text-white">
              Iqram<br />
              <span className="grad-text">Patel</span>
            </h1>
          </div>

          <div className="h-10 flex items-center">
            <span className="text-xl text-slate-300 font-medium">
              {displayed}
              <span className="inline-block w-0.5 h-5 bg-[#00C9B1] ml-0.5 animate-pulse" />
            </span>
          </div>

          <p className="text-slate-400 text-base leading-relaxed max-w-md">
            Full-stack developer from Mumbai diving deep into Data Science.
            I build scalable web apps and am currently completing the{" "}
            <span className="text-[#00C9B1] font-medium">Codebasics DS Foundation Bootcamp</span>{" "}
            with a virtual internship.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="#projects"
              className="px-6 py-3 bg-[#00C9B1] text-[#0A0F1C] font-semibold rounded-xl hover:bg-[#00E5CC] transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#00C9B1]/25 text-sm"
            >
              View Projects
            </a>
            {/* <a
              href="#"
              className="px-6 py-3 bg-[#0F1629] border border-[#1E2D4A] text-slate-200 font-semibold rounded-xl hover:border-[#00C9B1]/50 transition-all hover:-translate-y-0.5 text-sm flex items-center gap-2"
            >
              <HiDownload size={16} />
              Download CV
            </a> */}
          </div>

          {/* socials */}
          <div className="flex items-center gap-4 pt-1">
            <a
              href="https://github.com/Iqram09"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-xl bg-[#0F1629] border border-[#1E2D4A] flex items-center justify-center text-slate-400 hover:text-white hover:border-[#00C9B1]/50 transition-all hover:-translate-y-0.5"
            >
              <SiGithub size={18} />
            </a>
            <a
              href="https://linkedin.com/in/iqram-patel09"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 rounded-xl bg-[#0F1629] border border-[#1E2D4A] flex items-center justify-center text-slate-400 hover:text-white hover:border-[#00C9B1]/50 transition-all hover:-translate-y-0.5"
            >
              <CiLinkedin size={18} />
            </a>
            <span className="text-slate-500 text-xs ml-2">Mumbai, India 🇮🇳</span>
          </div>
        </div>

        {/* Right — avatar card */}
        <div className="hidden lg:flex justify-center items-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="relative">
            {/* spinning ring */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#00C9B1]/30 animate-spin-slow" style={{ inset: "-20px" }} />
            <div className="absolute inset-0 rounded-full border border-[#00C9B1]/15 animate-spin-slow" style={{ inset: "-40px", animationDirection: "reverse", animationDuration: "16s" }} />

            {/* avatar */}
            <div className="relative w-72 h-80 rounded-3xl border-2 border-[#1E2D4A] glow-ring overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-[#0F1629] via-[#131D35] to-[#1a2544]" />

  {/* avatar + name — top-anchored */}
  <div className="absolute inset-0 flex flex-col items-center pt-12">
    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#00C9B1] to-purple-500 flex items-center justify-center mb-3.5 font-display font-extrabold text-4xl text-[#0A0F1C] flex-shrink-0">
      <Image
    src="/img.jpg"
    alt="Iqram Patel"
    width={96}
    height={96}
    className="w-full h-full object-cover rounded-full"
  />
    </div>
    <p className="text-white font-display font-bold text-lg">Iqram Patel</p>
    <p className="text-[#00C9B1] text-xs mt-1">Full-Stack · Data Science</p>
  </div>

  {/* stat badges — bottom-anchored */}
  <div className="absolute bottom-4 left-3 right-3 grid grid-cols-3 gap-2">
    {[
      { n: "2+",   label: "Years Experience" },
      { n: "AI/ML",label: "Learning Journey" },
      { n: "DS",   label: "Career Focus"     },
    ].map((s) => (
      <div key={s.label} className="bg-[#0A0F1C]/85 backdrop-blur rounded-xl py-2 text-center border border-[#1E2D4A]/80">
        <p className="text-[#00C9B1] font-bold text-sm leading-none mb-1">{s.n}</p>
        <p className="text-slate-400 text-[9px] leading-tight">{s.label}</p>
      </div>
    ))}
  </div>
</div>

            {/* floating chips */}
            <div className="absolute -top-4 -right-6 bg-[#0F1629] border border-[#1E2D4A] rounded-xl px-3 py-2 text-xs font-medium text-[#00C9B1] animate-float shadow-xl">
              🐍 Python
            </div>
            <div className="absolute -bottom-4 -left-6 bg-[#0F1629] border border-[#1E2D4A] rounded-xl px-3 py-2 text-xs font-medium text-purple-300 animate-float shadow-xl" style={{ animationDelay: "1s" }}>
              ⚛️ React / Next.js
            </div>
            <div className="absolute top-1/2 -right-10 bg-[#0F1629] border border-[#1E2D4A] rounded-xl px-3 py-2 text-xs font-medium text-blue-300 animate-float shadow-xl" style={{ animationDelay: "0.5s" }}>
              📊 ML / EDA
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-500 hover:text-[#00C9B1] transition-colors animate-bounce"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <HiArrowDown size={16} />
      </a>
    </section>
  );
}

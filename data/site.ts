/**
 * Single source of truth for identity, links and contact details.
 * Every component reads from here so a change lands everywhere at once.
 */
export const site = {
  fullName: "Mohammed Iqram Patel",
  displayName: "Iqram Patel",
  shortName: "IQRAM",
  role: "AI Engineer",
  supporting: ["Software & Intelligent Systems"],
  /** The hero identity line. */
  identity: "AI Engineer | Software & Intelligent Systems",
  headline: "I build intelligent systems.",
  intro:
    "I design and engineer intelligent applications, scalable backend systems and digital products — from architecture to deployment.",
  /** Mumbai, for the HUD readout. */
  coordinates: "19.0760° N · 72.8777° E",
  experienceYears: "3+",
  location: "Mumbai, India",
  status: "Open to opportunities",
  availability: "Available for opportunities",
  email: "mdiqramp@gmail.com",
  phone: "+91 93245 33302",
  phoneHref: "tel:+919324533302",
  github: "https://github.com/Iqram09",
  githubHandle: "Iqram09",
  linkedin: "https://www.linkedin.com/in/iqram-patel09/",
  linkedinHandle: "iqram-patel09",
  url: "https://iqram-portfolio.vercel.app",
  resumeFile: "/Iqram_Patel_CV.pdf",
  resumeDownloadName: "Iqram_Patel_CV.pdf",
  title: "Iqram Patel — AI Engineer | Software & Intelligent Systems",
  description:
    "Iqram Patel is a Mumbai-based AI and software engineer with 3+ years shipping full-stack products, enterprise API gateway integrations for banking clients, and an LLM agent that diagnoses Kong Gateway through a custom MCP server.",
} as const;

export const navLinks = [
  { label: "Work", href: "/#work", id: "work" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "Expertise", href: "/#expertise", id: "expertise" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Contact", href: "/#contact", id: "contact" },
] as const;

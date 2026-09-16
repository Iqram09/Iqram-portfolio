/**
 * Single source of truth for identity, links and contact details.
 * Every component reads from here so a change lands everywhere at once.
 */
export const site = {
  fullName: "Mohammed Iqram Patel",
  displayName: "Iqram Patel",
  shortName: "IQRAM",
  role: "AI / Software Engineer",
  supporting: [
    "AI Platforms",
    "Agentic Systems",
    "API Architecture",
    "Full-Stack Engineering",
  ],
  location: "Mumbai, India",
  status: "Open to opportunities",
  availability: "Available for opportunities",
  email: "mdipramp@gmail.com",
  phone: "+91 93245 33302",
  phoneHref: "tel:+919324533302",
  github: "https://github.com/Iqram09",
  githubHandle: "Iqram09",
  linkedin: "https://www.linkedin.com/in/iqram-patel09/",
  linkedinHandle: "iqram-patel09",
  url: "https://iqram-portfolio.vercel.app",
  resumeFile: "/Iqram_Patel_CV.pdf",
  resumeDownloadName: "Iqram_Patel_CV.pdf",
  title: "Iqram Patel — AI / Software Engineer",
  description:
    "Iqram Patel is a software engineer from Mumbai focused on AI platforms, agentic systems, API architecture and full-stack engineering.",
} as const;

export const navLinks = [
  { label: "Work", href: "/#work", id: "work" },
  { label: "Experience", href: "/#experience", id: "experience" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Resume", href: "/resume", id: "resume" },
  { label: "Contact", href: "/#contact", id: "contact" },
] as const;

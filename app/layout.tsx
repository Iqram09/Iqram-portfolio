import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { site } from "@/data/site";
import SmoothScroll from "@/components/motion/SmoothScroll";
import "./globals.css";

// All fonts are self-hosted (OFL, licences in app/fonts) so a build never has to
// reach Google Fonts: next/font/google fails outright if Google answers with a
// font URL it cannot parse.

// Noto Serif Display, condensed cut, as two static Latin instances: 15 KB each,
// against 76 KB for the variable.
const display = localFont({
  src: [
    { path: "./fonts/noto-serif-display-condensed-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/noto-serif-display-condensed-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
  adjustFontFallback: "Times New Roman",
});

// Inter Tight carries everything that is read rather than looked at.
const sans = localFont({
  src: "./fonts/inter-tight-latin.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-sans",
  display: "swap",
  adjustFontFallback: "Arial",
});

// JetBrains Mono is kept for code: terminals, identifiers, JSON.
const mono = localFont({
  src: "./fonts/jetbrains-mono-latin.woff2",
  weight: "400 500",
  style: "normal",
  variable: "--font-mono",
  display: "swap",
  adjustFontFallback: "Arial",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.displayName}`,
  },
  description: site.description,
  applicationName: "Iqram Patel",
  authors: [{ name: site.fullName, url: site.url }],
  creator: site.fullName,
  keywords: [
    "Iqram Patel",
    "AI engineer",
    "software engineer",
    "intelligent systems",
    "MCP",
    "agentic systems",
    "Kong Gateway",
    "API integration",
    "Layer7",
    "Apigee",
    "Next.js",
    "TypeScript",
    "Python",
    "Mumbai",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: "Iqram Patel",
    title: site.title,
    description: site.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Iqram Patel — AI Engineer | Software & Intelligent Systems. Mumbai, India.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#F1F1F0",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.fullName,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Mumbai", addressCountry: "IN" },
  sameAs: [site.github, site.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        {/* Adds `js` before first paint so entrance states only apply when scripts run. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-screen flex-col bg-bg font-sans text-fg antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-lg focus:bg-fg focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-bg"
        >
          Skip to content
        </a>
        <SmoothScroll />
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      </body>
    </html>
  );
}

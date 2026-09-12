import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Iqram Patel — AI / Software Engineer",
  description:
    "Iqram Patel is a software engineer from Mumbai focused on AI platforms, agentic systems, API architecture and full-stack engineering.",
  openGraph: {
    title: "Iqram Patel — AI / Software Engineer",
    description:
      "Iqram Patel is a software engineer from Mumbai focused on AI platforms, agentic systems, API architecture and full-stack engineering.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-primary text-bright antialiased min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Iqram Patel · Full-Stack & Data Science Portfolio",
  description: "Full-Stack Developer & Data Science enthusiast based in Mumbai, India.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-[#0A0F1C] text-slate-200 antialiased">{children}</body>
    </html>
  );
}

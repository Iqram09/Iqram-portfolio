import Navbar from "@/components/Navbar";
import Hero from "@/components/hero/Hero";
import LetterMarquee from "@/components/hero/LetterMarquee";
import Intro from "@/components/home/Intro";
import TechBand from "@/components/home/TechBand";
import FeaturedWork from "@/components/home/FeaturedWork";
import ClientWork from "@/components/home/ClientWork";
import SideProjects from "@/components/home/SideProjects";
import LiveSystem from "@/components/LiveSystem";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Expertise from "@/components/home/Expertise";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

/**
 * Hero → introduction → featured AI system → client work → side projects →
 * system architecture → experience → expertise → about → contact.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <LetterMarquee />
        <Intro />
        <TechBand />
        <FeaturedWork />
        <ClientWork />
        <SideProjects />
        <LiveSystem />
        <ExperienceTimeline />
        <Expertise />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

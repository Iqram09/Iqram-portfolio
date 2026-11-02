import Navbar from "@/components/Navbar";
import Hero from "@/components/hero/Hero";
import Intro from "@/components/home/Intro";
import FeaturedWork from "@/components/home/FeaturedWork";
import ClientWork from "@/components/home/ClientWork";
import LiveSystem from "@/components/LiveSystem";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Expertise from "@/components/home/Expertise";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

/**
 * The reel, in nine scenes: hero → introduction → featured AI system →
 * client work → system architecture → experience → expertise → about →
 * contact.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <Intro />
        <FeaturedWork />
        <ClientWork />
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

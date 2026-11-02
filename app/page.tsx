import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MetricStrip from "@/components/MetricStrip";
import FeaturedProject from "@/components/FeaturedProject";
import ClientWork from "@/components/ClientWork";
import LiveSystem from "@/components/LiveSystem";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import OtherWork from "@/components/OtherWork";
import SkillGroups from "@/components/SkillGroups";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main" className="flex-1">
        <Hero />
        <MetricStrip />
        <FeaturedProject />
        <ClientWork />
        <LiveSystem />
        <ExperienceTimeline />
        <OtherWork />
        <SkillGroups />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

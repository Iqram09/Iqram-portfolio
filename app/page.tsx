import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MetricStrip from "@/components/MetricStrip";
import FeaturedProject from "@/components/FeaturedProject";
import LiveSystem from "@/components/LiveSystem";
import HowIBuild from "@/components/HowIBuild";
import EngineeringSurface from "@/components/EngineeringSurface";
import OtherWork from "@/components/OtherWork";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import SkillGroups from "@/components/SkillGroups";
import LearningSection from "@/components/LearningSection";
import AboutSection from "@/components/AboutSection";
import ResumeCTA from "@/components/ResumeCTA";
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
        <LiveSystem />
        <HowIBuild />
        <EngineeringSurface />
        <OtherWork />
        <ExperienceTimeline />
        <SkillGroups />
        <LearningSection />
        <AboutSection />
        <ResumeCTA />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

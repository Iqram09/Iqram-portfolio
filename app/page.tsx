import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Metrics from "@/components/Metrics";
import FeaturedProject from "@/components/FeaturedProject";
import ArchitecturePrinciples from "@/components/ArchitecturePrinciples";
import OtherWork from "@/components/OtherWork";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Hero />
        <Metrics />
        <FeaturedProject />
        <ArchitecturePrinciples />
        <OtherWork />
        <ExperienceTimeline />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

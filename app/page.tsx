import Navbar from "@/components/nav/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import FeaturedProject from "@/components/sections/FeaturedProject";
import Achievements from "@/components/sections/Achievements";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import MouseSpotlight from "@/components/effects/MouseSpotlight";

export default function Home() {
  return (
    <main className="relative">
      {/* Global mouse spotlight */}
      <MouseSpotlight />

      {/* Navigation */}
      <Navbar />

      {/* Sections */}
      <Hero />
      <About />
      <Skills />
      <FeaturedProject />
      <Achievements />
      <Contact />
      <Footer />
    </main>
  );
}

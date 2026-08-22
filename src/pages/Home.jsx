import Hero from "../components/Hero";
import ServicesSection from "../components/ServicesSection";
import MasterVisuals from "../components/MasterVisuals";
import WhatWeDo from "../components/WhatWeDo";
import OurClients from "../components/OurClients";
import Stats from "../components/Stats";
import Contact from "../components/Contact";

// The homepage is just an ordered list of sections — reorder,
// remove, or add sections here without touching their internals.
export default function Home() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <MasterVisuals />
      <WhatWeDo />
      <OurClients />
      <Stats />
      <Contact />
    </>
  );
}

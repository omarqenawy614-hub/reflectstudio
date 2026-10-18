import Hero from "../components/Hero";
import ServicesSection from "../components/ServicesSection";
import MasterVisuals from "../components/MasterVisuals";
import Process from "../components/Process";
import OurClients from "../components/OurClients";
import Urgency from "../components/Urgency";
import usePanels from "../utils/usePanels";

// The homepage is an ordered list of full-screen panels — reorder,
// remove, or add sections here without touching their internals.
// (The footer is the last panel; it is mounted from App.jsx.)
export default function Home() {
  usePanels();

  return (
    <>
      <Hero />
      <ServicesSection />
      <MasterVisuals />
      <Process />
      <OurClients />
      <Urgency />
    </>
  );
}

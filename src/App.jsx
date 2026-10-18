import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CursorGlow from "./components/CursorGlow";
import CursorRing from "./components/CursorRing";
import SpaceField from "./components/SpaceField";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import Meteor from "./components/Meteor";
import SoundToggle from "./components/SoundToggle";
import WhatsAppFloat from "./components/WhatsAppFloat";
import ComingSoon from "./pages/ComingSoon";
import { ProjectModalProvider } from "./components/ProjectModal";
import { scrollToPanel } from "./utils/scrollToPanel";

// Scrolls to top on every route change, or to a section id when the
// URL includes a #hash (e.g. navigating to /#contact from another page).
function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");

      setTimeout(() => {
        scrollToPanel(id);
      }, 60);
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [location]);

  return null;
}

// Custom cursor effects (ring + heavier interaction) are desktop-only:
// touch devices don't have a persistent pointer, so we detect a fine
// pointer with hover support and skip mounting them otherwise.
function useIsFinePointer() {
  const [isFine, setIsFine] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    );

    setIsFine(mq.matches);

    const onChange = (e) => setIsFine(e.matches);

    mq.addEventListener("change", onChange);

    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isFine;
}

// true on phones / small screens (900px wide or less).
// To show "Coming Soon" on phones only, lower the number to 700.
function useIsMobile(breakpoint = 900) {
  const query = `(max-width: ${breakpoint}px)`;
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const mq = window.matchMedia(query);

    setIsMobile(mq.matches);

    const onChange = (e) => setIsMobile(e.matches);

    mq.addEventListener("change", onChange);

    return () => mq.removeEventListener("change", onChange);
  }, [query]);

  return isMobile;
}

export default function App() {
  const isProjectDetail =
    useLocation().pathname.startsWith("/project/");

  const isFinePointer = useIsFinePointer();
  const isMobile = useIsMobile();

  // Mobile visitors see the "Coming Soon" page instead of the site.
  // To bring the mobile version back, delete this one line.
  // (It must stay AFTER all the hooks above.)
  if (isMobile) return <ComingSoon />;

  return (
    <ProjectModalProvider>
      <div className="grain" />

      <SpaceField />
      <Meteor />

      <CursorGlow quiet={isProjectDetail} />

      {isFinePointer && <CursorRing />}

      <ScrollManager />

      <Header />

      <SoundToggle />

      <WhatsAppFloat />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
        <Route path="/:category" element={<CategoryPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </ProjectModalProvider>
  );
}
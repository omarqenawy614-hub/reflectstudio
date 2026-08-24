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
import Meteor from "./components/Meteor";
import SoundToggle from "./components/SoundToggle";

// Scrolls to top on every route change, or to a section id when the
// URL includes a #hash (e.g. navigating to /#contact from another page).
function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");

      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({
          behavior: "smooth",
        });
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

export default function App() {
  const isProjectDetail =
    useLocation().pathname.startsWith("/project/");

  const isFinePointer = useIsFinePointer();

  return (
    <>
      <div className="grain" />

      <SpaceField />
      <Meteor />

      <CursorGlow quiet={isProjectDetail} />

      {isFinePointer && <CursorRing />}

      <ScrollManager />

      <Header />

      <SoundToggle />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
        <Route path="/:category" element={<CategoryPage />} />
      </Routes>

      <Footer />
    </>
  );
}
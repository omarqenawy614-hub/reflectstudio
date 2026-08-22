import { useEffect, useRef } from "react";

// A soft light that trails the cursor across the page. Mounted once
// in App.jsx. Pass `quiet` on project detail pages for a subtler
// version, since those pages should stay calm and work-focused.
export default function CursorGlow({ quiet = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const move = (e) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
    };
    const show = () => (el.style.opacity = "1");
    const hide = () => (el.style.opacity = "0");
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseenter", show);
    window.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseenter", show);
      window.removeEventListener("mouseleave", hide);
    };
  }, []);

  return <div ref={ref} className={`cursor-glow${quiet ? " quiet" : ""}`} />;
}

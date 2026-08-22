import { useEffect, useRef } from "react";

// A large ring that trails the cursor with a slight delay and
// subtly stretches along the direction of movement — an elegant,
// minimal "creative cursor" accent. Only mounted on fine-pointer
// devices (see App.jsx); disabled entirely on touch.
export default function CursorRing() {
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const last = useRef({ x: -100, y: -100 });
  const raf = useRef(null);
  const active = useRef(false);

  useEffect(() => {
    function onMove(e) {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!active.current) {
        // snap in on first move so it doesn't glide in from a corner
        pos.current.x = e.clientX;
        pos.current.y = e.clientY;
        last.current.x = e.clientX;
        last.current.y = e.clientY;
        active.current = true;
        ringRef.current?.style.setProperty("opacity", "1");
      }
    }
    function onOver(e) {
      const interactive = e.target.closest("a, button, .category-card");
      ringRef.current?.classList.toggle("cursor-ring--active", !!interactive);
    }
    function onLeaveWindow() {
      ringRef.current?.style.setProperty("opacity", "0");
      active.current = false;
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseleave", onLeaveWindow);

    function frame() {
      // ease toward the real cursor position — gives the slight delay/lag
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;

      const vx = pos.current.x - last.current.x;
      const vy = pos.current.y - last.current.y;
      last.current.x = pos.current.x;
      last.current.y = pos.current.y;

      const speed = Math.min(Math.sqrt(vx * vx + vy * vy), 32);
      const angle = Math.atan2(vy, vx) * (180 / Math.PI);
      const stretch = 1 + (speed / 32) * 0.55; // elongate along travel direction
      const squeeze = 1 - (speed / 32) * 0.2; // compress the perpendicular axis

      const el = ringRef.current;
      if (el) {
        el.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) rotate(${angle}deg) scaleX(${stretch}) scaleY(${squeeze})`;
      }
      raf.current = requestAnimationFrame(frame);
    }
    raf.current = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseleave", onLeaveWindow);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return <div className="cursor-ring" ref={ringRef} />;
}

import { useEffect, useRef } from "react";

// Ambient starfield behind the ENTIRE site (mounted once in App.jsx,
// fixed to the viewport so it stays put while the page scrolls).
//
// Deliberately does NOT light up individual stars near the cursor —
// instead:
//  1. a very subtle camera-like parallax shifts the whole field based
//     on mouse position (closer/"nearer" stars shift a bit more than
//     distant ones, giving a sense of depth), and
//  2. stars are softly displaced away from the cursor, like disturbing
//     a field of dust, then spring back once the cursor moves on.
export default function SpaceField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w, h, particles, raf;
    const mouse = { x: -99999, y: -99999 };
    const camera = { x: 0, y: 0 };
    const cameraTarget = { x: 0, y: 0 };

    const MAX_PARALLAX = 14 * devicePixelRatio; // total px range of the camera drift — kept subtle
    const REPEL_RADIUS = 100 * devicePixelRatio;
    const REPEL_STRENGTH = 16 * devicePixelRatio;

    function resize() {
      w = canvas.width = window.innerWidth * devicePixelRatio;
      h = canvas.height = window.innerHeight * devicePixelRatio;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";

      const count = Math.floor((window.innerWidth * window.innerHeight) / 8000);
      particles = Array.from({ length: count }, () => {
        // depth 0 = far/small/dim, 1 = near/larger/brighter — this is
        // what gives the field its sense of dimension.
        const depth = 0.25 + Math.random() * 0.75;
        const tinted = Math.random() < 0.16;
        const color = tinted ? (Math.random() < 0.5 ? "197,124,255" : "199,137,148") : "246,241,250";
        const baseX = Math.random() * w;
        const baseY = Math.random() * h;
        return {
          baseX,
          baseY,
          depth,
          r: (0.35 + depth * 1.05) * devicePixelRatio,
          color,
          baseAlpha: 0.12 + depth * 0.4,
          phase: Math.random() * Math.PI * 2,
          twSpeed: 0.35 + Math.random() * 0.55,
          dx: 0,
          dy: 0,
        };
      });
    }
    resize();
    window.addEventListener("resize", resize);

    function onMove(e) {
      mouse.x = e.clientX * devicePixelRatio;
      mouse.y = e.clientY * devicePixelRatio;
      cameraTarget.x = (e.clientX / window.innerWidth - 0.5) * 2; // -1 .. 1
      cameraTarget.y = (e.clientY / window.innerHeight - 0.5) * 2;
    }
    function onLeave() {
      mouse.x = -99999;
      mouse.y = -99999;
      cameraTarget.x = 0;
      cameraTarget.y = 0;
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    function frame(t) {
      ctx.clearRect(0, 0, w, h);

      if (!reducedMotion) {
        camera.x += (cameraTarget.x - camera.x) * 0.045;
        camera.y += (cameraTarget.y - camera.y) * 0.045;
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!reducedMotion) {
          const dxm = p.baseX - mouse.x;
          const dym = p.baseY - mouse.y;
          const dist = Math.sqrt(dxm * dxm + dym * dym);
          if (dist < REPEL_RADIUS) {
            const push = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
            const nx = dxm / (dist || 1);
            const ny = dym / (dist || 1);
            p.dx += nx * push * 0.06;
            p.dy += ny * push * 0.06;
          }
          // spring the displacement back toward zero — smooth, organic return
          p.dx += (0 - p.dx) * 0.045;
          p.dy += (0 - p.dy) * 0.045;
        }

        const camOffsetX = camera.x * MAX_PARALLAX * p.depth;
        const camOffsetY = camera.y * MAX_PARALLAX * p.depth;
        const drawX = p.baseX + p.dx + camOffsetX;
        const drawY = p.baseY + p.dy + camOffsetY;

        const twinkle = reducedMotion ? 0 : Math.sin(t / 1000 * p.twSpeed + p.phase) * 0.22;
        const alpha = Math.max(0.03, Math.min(1, p.baseAlpha + p.baseAlpha * twinkle));

        ctx.globalAlpha = alpha;
        ctx.fillStyle = `rgb(${p.color})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas className="space-field" ref={canvasRef} />;
}

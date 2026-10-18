import { useEffect } from "react";

// ============================================================
// PANEL SCROLL ENGINE
//
// Reads the scroll position and writes two things on every
// `[data-panel]` element:
//   --d     how far the panel is from "centered" (−1 … 1+):
//           negative = still arriving, positive = being covered
//   .in     class that is ON while the panel is (almost) on screen —
//           every text reveal (.rv / SplitText) keys off this class,
//           so the text motion replays each time you come back.
// Multi-stage panels (data-stages="3") also get data-stage="0|1|2".
//
// It also takes over wheel / keyboard / swipe: ONE gesture moves
// exactly ONE screen with a smooth glide, so a section is never
// left half on screen and the next one never peeks in.
// ============================================================
export default function usePanels() {
  useEffect(() => {
    document.documentElement.classList.add("panels-on");

    let panels = [];
    let tops = [];
    let stops = [];
    let vh = window.innerHeight;
    let raf = 0;

    // ---------- glide engine ----------
    const BASE = 1050;
    let animating = false;
    let animRaf = 0;
    let settleTimer = 0;
    let lastWheel = 0;
    let lockUntil = 0;
    const ease = (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2);

    const nearest = () => {
      const y = window.scrollY;
      let best = 0;
      stops.forEach((s, i) => {
        if (Math.abs(s - y) < Math.abs(stops[best] - y)) best = i;
      });
      return best;
    };

    function glideTo(target) {
      cancelAnimationFrame(animRaf);
      const from = window.scrollY;
      const dist = target - from;
      if (Math.abs(dist) < 2) {
        animating = false;
        return;
      }
      animating = true;
      // longer trips (footer shortcuts) glide a little longer
      const DURATION = Math.min(1700, BASE + (Math.abs(dist) / vh) * 90);
      const t0 = performance.now();
      const frame = (now) => {
        const t = Math.min((now - t0) / DURATION, 1);
        window.scrollTo({ top: from + dist * ease(t), behavior: "instant" });
        if (t < 1) animRaf = requestAnimationFrame(frame);
        else {
          animating = false;
          lockUntil = performance.now() + 140;
        }
      };
      animRaf = requestAnimationFrame(frame);
    }

    function step(dir) {
      if (!stops.length) return;
      const i = Math.max(0, Math.min(stops.length - 1, nearest() + dir));
      glideTo(stops[i]);
    }

    const typing = (el) =>
      el && (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable);

    const modalOpen = () => document.documentElement.classList.contains("modal-open");

    function onWheel(e) {
      if (e.ctrlKey || modalOpen()) return; // pinch-zoom / form window open
      if (typing(e.target) && e.target.tagName === "TEXTAREA") return;
      e.preventDefault();
      const now = performance.now();
      const gap = now - lastWheel;
      lastWheel = now;
      if (animating || now < lockUntil) return;
      // trackpad inertia keeps firing after a swipe: only react to a fresh gesture
      if (gap < 90 && Math.abs(e.deltaY) < 40 && now - (onWheel.lastStep || 0) < 1600) return;
      if (Math.abs(e.deltaY) < 4) return;
      onWheel.lastStep = now;
      step(e.deltaY > 0 ? 1 : -1);
    }

    function onKey(e) {
      if (typing(e.target) || modalOpen()) return;
      const k = e.key;
      if (["ArrowDown", "PageDown", " "].includes(k) && !e.shiftKey) {
        e.preventDefault();
        if (!animating) step(1);
      } else if (["ArrowUp", "PageUp"].includes(k) || (k === " " && e.shiftKey)) {
        e.preventDefault();
        if (!animating) step(-1);
      } else if (k === "Home") {
        e.preventDefault();
        glideTo(stops[0]);
      } else if (k === "End") {
        e.preventDefault();
        glideTo(stops[stops.length - 1]);
      }
    }

    // touch swipe (tablets)
    let touchY = null;
    const onTouchStart = (e) => (touchY = e.touches[0].clientY);
    const onTouchMove = (e) => {
      if (!typing(e.target) && !modalOpen()) e.preventDefault();
    };
    const onTouchEnd = (e) => {
      if (touchY === null) return;
      const dy = touchY - e.changedTouches[0].clientY;
      touchY = null;
      if (Math.abs(dy) > 40 && !animating) step(dy > 0 ? 1 : -1);
    };

    // dragging the scrollbar / any other scroll: settle on the nearest screen
    function scheduleSettle() {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => {
        if (animating || !stops.length) return;
        const target = stops[nearest()];
        if (Math.abs(target - window.scrollY) > 2) glideTo(target);
      }, 160);
    }

    function measure() {
      vh = window.innerHeight;
      panels = Array.from(document.querySelectorAll("[data-panel]"));
      let y = 0;
      tops = panels.map((el) => {
        y += parseFloat(getComputedStyle(el).marginTop) || 0;
        const t = y;
        y += el.offsetHeight;
        return t;
      });
      // every place the page is allowed to rest
      stops = [];
      panels.forEach((el, i) => {
        const n = Number(el.dataset.stages || 1);
        for (let k = 0; k < n; k++) stops.push(tops[i] + k * vh);
      });
      update();
    }

    let current = "";
    function update() {
      raf = 0;
      const y = window.scrollY;
      // which screen are we on? (the header highlights its pill from this)
      let cur = panels[0];
      let curStage = 0;
      panels.forEach((el, i) => {
        const n = Number(el.dataset.stages || 1);
        for (let k = 0; k < n; k++) {
          if (y >= tops[i] + k * vh - vh * 0.5) {
            cur = el;
            curStage = k;
          }
        }
      });
      if (cur) {
        const key = cur.id === "why-us" ? (curStage >= 2 ? "why-cards" : "why-us") : cur.id;
        if (key !== current) {
          current = key;
          window.dispatchEvent(new CustomEvent("panelchange", { detail: key }));
        }
      }
      panels.forEach((el, i) => {
        const d = (y - tops[i]) / vh;
        const stages = Number(el.dataset.stages || 1);

        // arrival / departure -> text replay
        const lastStageEnd = stages; // in viewport-heights
        const inView = d > -0.55 && d < lastStageEnd - 1 + 0.55;
        if (stages === 1) el.classList.toggle("in", inView);

        const dd = d < 0 ? d : Math.max(0, d - (stages - 1));
        el.style.setProperty("--d", Math.max(-1, Math.min(dd, 1.2)).toFixed(3));

        if (stages > 1) {
          const p = Math.max(0, Math.min(d, stages - 1));
          el.style.setProperty("--p", p.toFixed(3));
          const stage = Math.round(p);
          if (el.dataset.stage !== String(stage)) el.dataset.stage = String(stage);
          el.classList.toggle("near", inView);
          el.querySelectorAll(".stage").forEach((st, k) => {
            st.classList.toggle("in", inView && k === stage);
            st.classList.toggle("past", k < stage);
          });
        }
      });
    }

    function onScroll() {
      if (!raf) raf = requestAnimationFrame(update);
      scheduleSettle();
    }

    window.__panelGlide = glideTo;
    measure();
    // fonts / images change heights a little -> measure again once loaded
    const t = setTimeout(measure, 400);
    window.addEventListener("load", measure);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      clearTimeout(settleTimer);
      cancelAnimationFrame(animRaf);
      delete window.__panelGlide;
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      clearTimeout(t);
      if (raf) cancelAnimationFrame(raf);
      document.documentElement.classList.remove("panels-on");
      window.removeEventListener("load", measure);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}

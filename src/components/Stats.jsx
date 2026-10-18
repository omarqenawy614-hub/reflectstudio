import { useEffect, useRef, useState } from "react";
import SplitText from "./SplitText";
import { stats } from "../data/clients";

function StatCounter({ target, suffix, label }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || started.current) return;
          started.current = true;
          const dur = 1400;
          const t0 = performance.now();
          function step(t) {
            const p = Math.min((t - t0) / dur, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(eased * target));
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div className="stat" ref={ref}>
      <div className="num">
        <span>{value}</span>
        {suffix}
      </div>
      <div className="label">{label}</div>
    </div>
  );
}

// The "In Numbers" block. It lives INSIDE the Our Clients screen.
export default function StatsBlock() {
  return (
    <div className="numbers-row">
      <div className="numbers-intro">
        <div className="eyebrow rv" style={{ "--rd": "500ms" }}>
          <span className="line" />
          In Numbers
        </div>
        <SplitText as="h2" className="section-title numbers-title" delay={600}>
          Results that <span className="gradient-text">speak</span> for us.
        </SplitText>
      </div>

      <div className="stats-grid rv" style={{ "--rd": "800ms" }}>
        {stats.map((s) => (
          <StatCounter key={s.label} target={s.num} suffix={s.suffix} label={s.label} />
        ))}
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import Section from "./Section";
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

export default function Stats() {
  return (
    <Section id="stats" className="quiet">
      <div className="wrap">
        <div className="stats-grid">
          {stats.map((s) => (
            <StatCounter key={s.label} target={s.num} suffix={s.suffix} label={s.label} />
          ))}
        </div>
      </div>
    </Section>
  );
}

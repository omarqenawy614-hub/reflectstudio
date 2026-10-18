// Floating sparkles / dust. Drop it inside any `position: relative` box
// and it fills that box; it fades in with the section (see .sparks in CSS).
//   <Sparks count={40} />
export default function Sparks({ count = 46, className = "" }) {
  const list = Array.from({ length: count }, (_, i) => {
    // deterministic pseudo-random: positions never change between renders
    const r = (n) => {
      const x = Math.sin((i + 1) * 12.9898 + n * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };
    return {
      x: r(1) * 100,
      y: r(2) * 100,
      size: 1.5 + r(3) * 3.5,
      dur: 5 + r(4) * 7,
      delay: -r(5) * 10,
      drift: 14 + r(6) * 40,
      rose: r(7) > 0.72,
    };
  });

  return (
    <div className={`sparks ${className}`} aria-hidden="true">
      <span className="sparks-glow" />
      {list.map((p, i) => (
        <i
          key={i}
          className={p.rose ? "rose" : ""}
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            "--drift": `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}

import Section from "./Section";

// Short editorial summary of the studio's core disciplines. Keep this
// list to 4-5 items — it's meant to read as a statement, not a menu.
const ITEMS = [
  { t: "Visual Identity", d: "Logos, systems, guidelines" },
  { t: "Motion & Film", d: "Title sequences, edits, VFX" },
  { t: "Campaigns", d: "Concept-to-delivery, multi-channel" },
  { t: "Digital Products", d: "Websites, apps, interactive" },
];

export default function WhatWeDo() {
  return (
    <Section id="what-we-do">
      <div className="wrap wwd-layout">
        <div>
          <div className="eyebrow">
            <span className="line" />
            Approach
          </div>
          <h2 className="section-title">
            Design that
            <br />
            reflects, not
            <br />
            imitates.
          </h2>
          <p className="section-sub">
            We don't start from templates or trends. Every engagement starts with what makes a brand
            genuinely itself — then we build the visual language, motion and campaigns around it.
          </p>
        </div>
        <div className="wwd-list">
          {ITEMS.map((item) => (
            <div className="wwd-item" key={item.t}>
              <span className="t">{item.t}</span>
              <span className="d">{item.d}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

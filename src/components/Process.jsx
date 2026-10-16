import Section from "./Section";
import { processSteps } from "../data/process";

export default function Process() {
  return (
    <Section id="what-we-do">
      <div className="wrap process-layout">
        <div className="process-intro">
          <div className="eyebrow">
            <span className="line" />
            How We Work
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
            genuinely itself — then we build the visual language, content and campaigns around it.
          </p>
        </div>

        <ol className="process-list">
          {processSteps.map((step, i) => (
            <li className="process-item" key={step.t}>
              <span className="p-n">0{i + 1}</span>
              <div>
                <h3>{step.t}</h3>
                <p>{step.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

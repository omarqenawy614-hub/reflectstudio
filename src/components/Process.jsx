import Section from "./Section";
import SplitText from "./SplitText";
import Sparks from "./Sparks";
import { processSteps } from "../data/process";

export default function Process() {
  return (
    <Section id="what-we-do">
      <div className="wrap process-layout">
        <div className="process-intro">
          <div className="eyebrow rv">
            <span className="line" />
            How We Work
          </div>
          <div className="heading-sparks">
            <Sparks count={34} />
            <SplitText as="h2" className="section-title" delay={120}>
              Design that reflects, not imitates.
            </SplitText>
          </div>
          <p className="section-sub rv" style={{ "--rd": "500ms" }}>
            We don't start from templates or trends. Every engagement starts with what makes a brand
            genuinely itself — then we build the visual language, content and campaigns around it.
          </p>
        </div>

        <ol className="process-list">
          {processSteps.map((step, i) => (
            <li className="process-item rv" key={step.t} style={{ "--rd": `${350 + i * 140}ms` }}>
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

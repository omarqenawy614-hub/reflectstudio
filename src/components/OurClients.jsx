import Section from "./Section";
import { clients } from "../data/clients";

function ClientBadge({ client }) {
  return (
    <div className="client-badge">
      <span className="mark" />
      {client.logo ? <img src={client.logo} alt={client.name} /> : client.name}
    </div>
  );
}

export default function OurClients() {
  const reversed = [...clients].reverse();

  return (
    <Section id="our-clients">
      <div className="wrap">
        <div className="eyebrow">
          <span className="line" />
          Trusted By
        </div>
        <h2 className="section-title">Our Clients</h2>
      </div>

      <div className="clients-marquee">
        {/* Each row's content is duplicated once so the loop is seamless. */}
        <div className="marquee-track-wrap">
          <div className="marquee-track left">
            {[...clients, ...clients].map((c, i) => (
              <ClientBadge client={c} key={`row1-${i}`} />
            ))}
          </div>
        </div>
        <div className="marquee-track-wrap">
          <div className="marquee-track right">
            {[...reversed, ...reversed].map((c, i) => (
              <ClientBadge client={c} key={`row2-${i}`} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

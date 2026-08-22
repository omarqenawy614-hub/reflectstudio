import Section from "./Section";
import { clients } from "../data/clients";

function ClientBadge({ client }) {
  return (
    <div className="client-badge">
      
      <span className="mark" />

      {client.logo && (
        <img
          src={client.logo}
          alt={client.name}
          className="client-logo"
        />
      )}

      <span className="client-name">
        {client.name}
      </span>

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

        <h2 className="section-title">
          Our Clients
        </h2>

      </div>


      <div className="clients-marquee">

        {/* ROW 1 */}

        <div className="marquee-track-wrap">

          <div className="marquee-track left">

            {[...clients, ...clients].map((c, i) => (

              <ClientBadge
                client={c}
                key={`row1-${i}`}
              />

            ))}

          </div>

        </div>


        {/* ROW 2 */}

        <div className="marquee-track-wrap">

          <div className="marquee-track right">

            {[...reversed, ...reversed].map((c, i) => (

              <ClientBadge
                client={c}
                key={`row2-${i}`}
              />

            ))}

          </div>

        </div>

      </div>

    </Section>
  );
}
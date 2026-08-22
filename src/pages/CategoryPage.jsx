import { useParams, Link } from "react-router-dom";
import { services } from "../data/services";
import { getProjectsByCategory } from "../data/projects";
import ProjectCard from "../components/ProjectCard";

export default function CategoryPage() {
  const { category } = useParams();
  const service = services.find((s) => s.slug === category);
  const list = getProjectsByCategory(category);

  if (!service) {
    return (
      <div className="wrap page-header">
        <Link to="/" className="back-link">
          ← Back home
        </Link>
        <h2 className="section-title">Category not found</h2>
        <p className="section-sub">That category doesn't exist yet — check the link or head back home.</p>
      </div>
    );
  }

  return (
    <>
      <div className="wrap page-header">
        <Link to="/" className="back-link">
          ← Back home
        </Link>
        <div className="eyebrow">
          <span className="line" />
          Selected Work
        </div>
        <h1 className="section-title">{service.name}</h1>
        <p className="section-sub">{service.blurb}</p>
      </div>

      <div className="wrap">
        {list.length > 0 ? (
          <div className="project-grid">
            {list.map((p, i) => (
              <ProjectCard project={p} index={i} key={p.slug} />
            ))}
          </div>
        ) : (
          <p className="empty-state">
            No projects added to {service.name} yet — add one in src/data/projects.js.
          </p>
        )}
      </div>
    </>
  );
}

import { useParams, Link } from "react-router-dom";
import { getProjectBySlug, getProjectsByCategory } from "../data/projects";
import { services } from "../data/services";
import { artStyle } from "../utils/placeholderArt";

// Route: /project/:slug — a flat, global project URL. The project's
// own `category` field (in src/data/projects.js) is what links it
// back to its category page and to its "next project" sibling.
export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <div className="wrap page-header">
        <Link to="/" className="back-link">
          ← Back home
        </Link>
        <h2 className="section-title">Project not found</h2>
        <p className="section-sub">That project doesn't exist yet — check the link or head back home.</p>
      </div>
    );
  }

  const categoryInfo = services.find((s) => s.slug === project.category);
  const siblings = getProjectsByCategory(project.category).filter((p) => p.slug !== project.slug);
  const next = siblings[0];

  return (
    <>
      <div className="wrap project-detail-header">
        <Link to={`/${project.category}`} className="back-link">
          ← Back to {categoryInfo ? categoryInfo.name : project.category}
        </Link>
        <h1>{project.title}</h1>

        <div className="project-meta-row">
          <div>
            <div className="m-label">Client</div>
            <div className="m-value">{project.client}</div>
          </div>
          <div>
            <div className="m-label">Year</div>
            <div className="m-value">{project.year}</div>
          </div>
          <div>
            <div className="m-label">Services</div>
            <div className="m-value">{project.servicesUsed.join(", ")}</div>
          </div>
        </div>

        <p className="project-desc">{project.description}</p>
      </div>

      <div className="wrap project-gallery">
        {project.images.map((img, i) => (
          <div {...artStyle("g-img", img, i)} key={i} />
        ))}
      </div>

      {next && (
        <div className="wrap project-next">
          <Link to={`/project/${next.slug}`}>Next project — {next.title} →</Link>
        </div>
      )}
    </>
  );
}

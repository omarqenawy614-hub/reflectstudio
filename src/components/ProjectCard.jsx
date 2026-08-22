import { Link } from "react-router-dom";
import { artStyle } from "../utils/placeholderArt";

export default function ProjectCard({ project, index }) {
  return (
    <Link to={`/project/${project.slug}`} className="project-card">
      <div {...artStyle("thumb", project.thumb, index)} />
      <div className="meta">
        <span className="p-title">{project.title}</span>
        <span className="p-desc">
          {project.client} — {project.year}
        </span>
      </div>
    </Link>
  );
}

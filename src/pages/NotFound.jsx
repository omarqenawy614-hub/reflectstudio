import { Link } from "react-router-dom";

export default function NotFound({ what = "page" }) {
  return (
    <div className="wrap page-header not-found">
      <div className="eyebrow">
        <span className="line" />
        404
      </div>
      <h1 className="section-title">We couldn't find that {what}.</h1>
      <p className="section-sub">The link may be old or mistyped — let's get you back on track.</p>
      <div className="hero-actions">
        <Link to="/" className="btn-primary">
          Back to homepage →
        </Link>
      </div>
    </div>
  );
}

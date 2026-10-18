// ============================================================
// SECTION = one full-screen "panel".
//
// Every homepage section is exactly one screen tall. Panels are
// stacked (position: sticky) so the NEXT section rises up over the
// current one — it feels like the page is moving, not like you are
// scrolling down a long document. The scroll engine that animates
// them lives in src/utils/usePanels.js (called once from Home.jsx).
// ============================================================
export default function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`panel ${className}`} data-panel>
      <div className="panel-inner">{children}</div>
    </section>
  );
}

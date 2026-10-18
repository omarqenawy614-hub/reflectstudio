// ============================================================
// Panels are stacked (sticky), so the browser's own
// scrollIntoView() can't find them once they are "stuck" at the
// top. This helper scrolls to a panel by its real position in the
// stack instead. Use it for every "go to section" link.
// ============================================================
// extra shortcuts that land on a stage inside the 3-screen urgency block
const ALIAS = { "why-us": ["why-us", 1], "why-cards": ["why-us", 2] };

export function panelTop(rawId) {
  const [id, stage] = ALIAS[rawId] || [rawId, 0];
  const panels = Array.from(document.querySelectorAll("[data-panel]"));
  let y = 0;
  for (const el of panels) {
    y += parseFloat(getComputedStyle(el).marginTop) || 0;
    if (el.id === id) return y + stage * window.innerHeight;
    y += el.offsetHeight;
  }
  return null;
}

export function scrollToPanel(id, behavior = "smooth") {
  const top = panelTop(id);
  if (top === null) {
    document.getElementById(id)?.scrollIntoView({ behavior });
    return;
  }
  // on the homepage the panel engine glides there (same motion as the wheel)
  if (window.__panelGlide) window.__panelGlide(top);
  else window.scrollTo({ top, behavior });
}

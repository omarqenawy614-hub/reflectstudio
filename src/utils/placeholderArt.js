// ============================================================
// Returns inline style props for a tile/thumbnail: a real image
// if `src` is provided, otherwise a brand-colored gradient
// placeholder (art-1 .. art-6, cycled by index) so the layout
// always looks intentional even before real assets are added.
// ============================================================
export function artStyle(baseClassName, src, index = 0) {
  if (src) {
    return { className: baseClassName, style: { backgroundImage: `url(${src})` } };
  }
  return { className: `${baseClassName} art-${(index % 6) + 1}`, style: undefined };
}

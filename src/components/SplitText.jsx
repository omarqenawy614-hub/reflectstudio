import { Children, cloneElement, isValidElement } from "react";

// ============================================================
// SPLIT TEXT — the title motion.
// Splits a heading into words; each word rises out of a mask with
// a soft blur, one after another. It plays whenever the panel it
// lives in gets the `.in` class (see usePanels.js).
//
//   <SplitText as="h2" className="section-title" delay={120}>
//     Our <span className="gradient-text">Services.</span>
//   </SplitText>
//
// `delay` = ms before the first word. Elements with a className
// (like the gradient span) keep their look on every word.
// ============================================================
function split(node, counter, wordClass, key = "") {
  if (typeof node === "string") {
    return node.split(/(\s+)/).map((part, i) => {
      if (!part) return null;
      if (/^\s+$/.test(part)) return " ";
      const n = counter.n++;
      return (
        <span className="sw" key={`${key}-${i}`}>
          <span className={`swi ${wordClass}`} style={{ "--i": n }}>
            {part}
          </span>
        </span>
      );
    });
  }
  if (Array.isArray(node)) return node.map((c, i) => split(c, counter, wordClass, `${key}${i}`));
  if (isValidElement(node)) {
    if (node.type === "br") return node;
    const cls = [wordClass, node.props.className].filter(Boolean).join(" ");
    return cloneElement(
      node,
      { key: key || undefined, className: "sw-group" },
      Children.map(node.props.children, (c, i) => split(c, counter, cls, `${key}g${i}`))
    );
  }
  return node;
}

export default function SplitText({ as: Tag = "h2", className = "", delay = 0, children }) {
  const counter = { n: 0 };
  return (
    <Tag className={`split ${className}`} style={{ "--base": `${delay}ms` }}>
      {Children.map(children, (c, i) => split(c, counter, "", `s${i}`))}
    </Tag>
  );
}

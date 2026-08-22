import { motion } from "framer-motion";

// Wrap any homepage section in this to get the "next section enters
// the scene" cinematic reveal as the user scrolls to it. Used for
// every section except the Hero (which is always visible on load).
export default function Section({ id, className = "", children }) {
  return (
    <motion.section
      id={id}
      className={`section ${className}`}
      initial={{ opacity: 0, y: 46 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.section>
  );
}

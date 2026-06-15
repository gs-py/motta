import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gradient bar tracking page scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });
  return (
    <motion.div
      style={{ scaleX, originX: 0 }}
      className="fixed left-0 top-0 z-[80] h-[3px] w-full bg-gradient-to-r from-pink via-lavender to-rosegold"
    />
  );
}

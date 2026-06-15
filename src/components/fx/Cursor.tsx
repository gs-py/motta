import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Desktop-only custom cursor: a small dot + a trailing soft glow ring
 * that grows over interactive elements. Disabled on touch / coarse pointers.
 */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.5 });

  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.body.classList.add("has-cursor");

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement;
      setActive(!!el.closest("button, a, [data-cursor='hover']"));
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[120] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-soft mix-blend-difference"
        style={{ x, y }}
        animate={{ scale: active ? 0.5 : 1 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[120] -translate-x-1/2 -translate-y-1/2 rounded-full border border-pink/60"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: active ? 56 : 32,
          height: active ? 56 : 32,
          opacity: active ? 1 : 0.5,
          backgroundColor: active
            ? "rgba(255,158,196,0.12)"
            : "rgba(255,158,196,0)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
      />
    </>
  );
}

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { content } from "@/content";
import { Stars } from "./fx/Particles";

/**
 * Full-screen cinematic loader.
 * Two handwritten lines draw in, then the whole layer lifts away.
 */
export function Loader({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState(0); // 0 line1, 1 line2, 2 exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1700);
    const t2 = setTimeout(() => setPhase(2), 3600);
    const t3 = setTimeout(onDone, 4500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-purple-ink"
      animate={phase === 2 ? { opacity: 0, scale: 1.06 } : {}}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      style={{ pointerEvents: phase === 2 ? "none" : "auto" }}
    >
      <div className="absolute inset-0 bg-aurora opacity-40 blur-3xl" />
      <Stars count={60} />

      <div className="relative text-center">
        <motion.p
          className="handwrite text-3xl text-pink-soft/90 sm:text-4xl"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          {content.loader.line1}
        </motion.p>

        <motion.h1
          className="handwrite mt-4 bg-gradient-to-r from-pink-soft via-pink to-lavender bg-clip-text text-5xl text-transparent sm:text-7xl"
          initial={{ opacity: 0, y: 24, filter: "blur(14px)" }}
          animate={
            phase >= 1
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 24, filter: "blur(14px)" }
          }
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {content.loader.line2}
        </motion.h1>

        {/* loading bar */}
        <motion.div className="mx-auto mt-10 h-px w-48 overflow-hidden bg-white/15">
          <motion.div
            className="h-full bg-gradient-to-r from-pink to-lavender"
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { content } from "@/content";
import { Aurora } from "../fx/Aurora";
import { Particles, Stars } from "../fx/Particles";

const word = {
  hidden: { opacity: 0, y: 40, filter: "blur(14px)", rotateX: -40 },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    rotateX: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero({ onBegin }: { onBegin: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  const words = content.hero.title.split(" ");

  return (
    <section
      ref={ref}
      className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      <motion.div style={{ scale }} className="absolute inset-0">
        <Aurora />
        <Stars count={90} />
        <Particles count={28} variant="hearts" />
      </motion.div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="handwrite mb-6 text-2xl text-pink-soft/90 sm:text-3xl"
        >
          for {content.her.nick.toLowerCase()}…
        </motion.p>

        <motion.h1
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.16, delayChildren: 0.4 }}
          className="font-serif text-5xl font-light leading-[1.05] text-cream sm:text-7xl md:text-8xl"
          style={{ perspective: 800 }}
        >
          {words.map((w, i) => (
            <motion.span
              key={i}
              variants={word}
              className={
                i === words.length - 1
                  ? "mr-3 inline-block bg-gradient-to-r from-pink-soft via-pink to-lavender bg-clip-text text-transparent"
                  : "mr-3 inline-block"
              }
            >
              {w}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 1.3, duration: 1.1 }}
          className="mx-auto mt-8 max-w-xl text-base font-light leading-relaxed text-cream/70 sm:text-lg"
        >
          {content.hero.subtitle}
        </motion.p>

        <motion.button
          onClick={onBegin}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="gradient-border group relative mt-12 overflow-hidden rounded-full px-10 py-4 text-sm font-medium uppercase tracking-[0.2em] text-cream"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-pink/20 to-lavender/20 opacity-0 transition-opacity group-hover:opacity-100" />
          <span className="relative">{content.hero.cta}</span>
        </motion.button>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-cream/50"
        >
          <ChevronDown size={26} />
        </motion.div>
      </motion.div>
    </section>
  );
}

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { content } from "@/content";
import { Aurora } from "../fx/Aurora";
import { Particles, Stars } from "../fx/Particles";
import { MagneticButton } from "../ui/MagneticButton";

const word = {
  hidden: { opacity: 0, y: 50, filter: "blur(16px)", rotateX: -50 },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    rotateX: 0,
    transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero({ onBegin }: { onBegin: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const orb1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const orb2 = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const words = content.hero.title.split(" ");

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden"
    >
      <motion.div style={{ scale }} className="absolute inset-0">
        <div className="absolute inset-0 bg-mesh" />
        <Aurora />
        <Stars count={100} />
        <Particles count={26} variant="hearts" />
      </motion.div>

      {/* depth orbs */}
      <motion.div
        style={{ y: orb1 }}
        className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-lavender/20 blur-[100px]"
      />
      <motion.div
        style={{ y: orb2 }}
        className="pointer-events-none absolute -right-16 bottom-1/4 h-80 w-80 rounded-full bg-pink/20 blur-[110px]"
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto max-w-4xl px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="handwrite mb-5 text-2xl text-pink-soft/90 sm:text-3xl"
        >
          for {content.her.nick.toLowerCase()}…
        </motion.p>

        <motion.h1
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.16, delayChildren: 0.4 }}
          className="font-serif text-[3.25rem] font-light leading-[1.02] tracking-tight text-cream sm:text-7xl md:text-8xl"
          style={{ perspective: 900 }}
        >
          {words.map((w, i) => (
            <motion.span
              key={i}
              variants={word}
              className={
                i === words.length - 1
                  ? "mr-3 inline-block gradient-text-anim"
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
          className="text-balance mx-auto mt-8 max-w-xl text-base font-light leading-relaxed text-cream/70 sm:text-lg"
        >
          {content.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="mt-12 flex justify-center"
        >
          <MagneticButton onClick={onBegin}>
            {content.hero.cta}
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-cream/40">
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-cream/50"
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}

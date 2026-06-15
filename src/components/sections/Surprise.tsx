import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import confetti from "canvas-confetti";
import { Gift, Lock } from "lucide-react";
import { content } from "@/content";
import { Section } from "../fx/Section";
import { Particles } from "../fx/Particles";

export function Surprise() {
  const [open, setOpen] = useState(false);
  const { surprise } = content;

  const burst = () => {
    const colors = ["#ff9ec4", "#b69dff", "#e8b08e", "#fff8f3"];
    const fire = (ratio: number, opts: confetti.Options) =>
      confetti({
        origin: { y: 0.6 },
        colors,
        particleCount: Math.floor(220 * ratio),
        ...opts,
      });
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.9 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  const handleOpen = () => {
    if (open) return;
    setOpen(true);
    burst();
    setTimeout(burst, 600);
  };

  return (
    <Section
      id="surprise"
      eyebrow="One more thing"
      title={
        <>
          A little <span className="italic text-pink-soft">surprise</span>
        </>
      }
      contentClassName="max-w-2xl text-center"
    >
      <div className="relative flex flex-col items-center">
        {open && <Particles count={24} variant="hearts" />}

        <AnimatePresence mode="wait">
          {!open ? (
            <motion.button
              key="box"
              onClick={handleOpen}
              exit={{ scale: 0.6, opacity: 0, rotate: 8 }}
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group relative"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2.4, repeat: Infinity }}
                className="glass gradient-border flex h-48 w-48 flex-col items-center justify-center gap-4 rounded-3xl shadow-card"
              >
                <Gift size={64} className="text-pink-soft" />
                <span className="flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-cream/60">
                  <Lock size={12} /> locked
                </span>
              </motion.div>
              <p className="mt-6 font-serif text-xl font-light text-cream/80">
                {surprise.teaser}
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-pink/80">
                {surprise.button}
              </p>
            </motion.button>
          ) : (
            <motion.div
              key="reveal"
              initial={{ scale: 0.8, opacity: 0, filter: "blur(14px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="glass-strong gradient-border relative rounded-3xl p-10 shadow-card"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink/40 to-lavender/40"
              >
                <Gift size={30} className="text-cream" />
              </motion.div>
              <h3 className="font-serif text-3xl font-light text-cream sm:text-4xl">
                {surprise.revealTitle}
              </h3>
              <p className="mx-auto mt-4 max-w-md font-serif text-lg font-light italic leading-relaxed text-cream/85">
                {surprise.revealMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}

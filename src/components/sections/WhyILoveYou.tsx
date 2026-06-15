import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { content } from "@/content";
import { Section } from "../fx/Section";
import { Reveal } from "../fx/Reveal";

/**
 * Reasons hidden behind cards that flip on tap/hover to reveal.
 */
export function WhyILoveYou() {
  return (
    <Section
      id="why"
      eyebrow="Tap each one"
      title={
        <>
          Why I <span className="italic text-pink-soft">love</span> you
        </>
      }
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {content.whyILoveYou.map((reason, i) => (
          <Reveal key={i} delay={(i % 3) * 0.08}>
            <FlipCard reason={reason} index={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function FlipCard({ reason, index }: { reason: string; index: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <button
      onClick={() => setFlipped((f) => !f)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      className="group relative h-52 w-full [perspective:1200px]"
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* front */}
        <div className="glass gradient-border absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-3xl [backface-visibility:hidden]">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-pink/30 to-lavender/30">
            <Heart className="text-pink-soft" size={24} />
          </span>
          <p className="font-serif text-2xl font-light text-cream/80">
            Reason {String(index + 1).padStart(2, "0")}
          </p>
          <p className="text-[11px] uppercase tracking-[0.25em] text-cream/40">
            reveal
          </p>
        </div>

        {/* back */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl bg-gradient-to-br from-pink/25 via-lavender/20 to-rosegold/20 p-6 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <Sparkles className="text-pink-soft" size={20} />
          <p className="font-serif text-xl font-light leading-relaxed text-cream">
            {reason}
          </p>
        </div>
      </motion.div>
    </button>
  );
}

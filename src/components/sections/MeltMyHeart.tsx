import { motion } from "framer-motion";
import { content } from "@/content";
import { Section } from "../fx/Section";
import { Reveal } from "../fx/Reveal";
import { cn } from "@/lib/utils";

/**
 * Little things she does — revealed one by one as you scroll,
 * each sliding in from alternating sides.
 */
export function MeltMyHeart() {
  return (
    <Section
      eyebrow="The small things"
      title={
        <>
          Things you do that{" "}
          <span className="italic text-pink-soft">melt</span> me
        </>
      }
      contentClassName="max-w-3xl"
    >
      <div className="space-y-6">
        {content.meltMyHeart.map((item, i) => (
          <Reveal key={i} direction={i % 2 ? "left" : "right"}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={cn(
                "glass flex items-center gap-5 rounded-3xl p-6 sm:p-8",
                i % 2 ? "sm:ml-12" : "sm:mr-12"
              )}
            >
              <span className="bg-gradient-to-br from-pink-soft to-lavender bg-clip-text font-serif text-5xl font-light text-transparent sm:text-6xl">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-serif text-xl font-light leading-relaxed text-cream/90 sm:text-2xl">
                {item}
              </p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

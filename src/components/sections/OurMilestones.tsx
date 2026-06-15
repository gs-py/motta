import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { content } from "@/content";
import { Section } from "../fx/Section";
import { Reveal } from "../fx/Reveal";
import { cn } from "@/lib/utils";

/**
 * The "how we grew" timeline — milestones pulled straight from the chat,
 * with a scroll-driven rail like the meetings timeline.
 */
export function OurMilestones() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.6", "end 0.4"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const items = content.numbers.milestones;

  return (
    <Section
      id="milestones"
      eyebrow="Written by us, one message at a time"
      title={
        <>
          How we <span className="italic text-pink-soft">grew</span>
        </>
      }
    >
      <div ref={ref} className="relative mx-auto max-w-3xl pl-6 sm:pl-0">
        {/* rail */}
        <div className="absolute left-2 top-0 h-full w-px bg-white/10 sm:left-[120px]">
          <motion.div
            style={{ scaleY: lineScale, originY: 0 }}
            className="h-full w-full bg-gradient-to-b from-pink via-lavender to-rosegold shadow-glow-lav"
          />
        </div>

        <div className="space-y-10 sm:space-y-12">
          {items.map((m, i) => (
            <Reveal key={i} delay={(i % 2) * 0.05} direction="up">
              <div className="relative flex flex-col gap-2 sm:flex-row sm:gap-8">
                {/* date column */}
                <div className="sm:w-[110px] sm:shrink-0 sm:pt-1 sm:text-right">
                  <span className="text-xs font-medium uppercase tracking-[0.12em] text-pink-soft">
                    {m.date}
                  </span>
                </div>

                {/* node */}
                <span className="absolute -left-[18px] top-1.5 z-10 sm:left-[114px]">
                  <span className="relative flex h-3.5 w-3.5 items-center justify-center">
                    <span className="absolute h-3.5 w-3.5 animate-ping rounded-full bg-pink/40" />
                    <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-pink to-lavender shadow-glow" />
                  </span>
                </span>

                {/* body */}
                <div
                  className={cn(
                    "glass gradient-border flex-1 rounded-2xl p-5 sm:ml-6",
                  )}
                >
                  <p className="font-serif text-xl font-light text-cream">
                    {m.title}
                  </p>
                  <p className="mt-1.5 font-serif text-base font-light italic text-cream/70">
                    {m.quote}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

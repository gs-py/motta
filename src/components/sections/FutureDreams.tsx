import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sparkles } from "lucide-react";
import { content, filled } from "@/content";
import { Section } from "../fx/Section";
import { Reveal } from "../fx/Reveal";

/**
 * A dream roadmap — a glowing path that draws itself as you scroll,
 * stops marked Today → Next Meeting → Future Trip → Forever.
 */
export function FutureDreams() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.5"],
  });
  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section
      id="future"
      eyebrow="The road still ahead"
      title={
        <>
          Where we're <span className="italic text-pink-soft">going</span>
        </>
      }
    >
      <div ref={ref} className="relative">
        {/* curvy path */}
        <svg
          className="absolute left-0 top-0 h-full w-full"
          viewBox="0 0 100 400"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M50 0 C20 60, 80 110, 50 170 S20 280, 50 340 L50 400"
            fill="none"
            stroke="url(#road)"
            strokeWidth="1.2"
            style={{ pathLength: draw }}
          />
          <defs>
            <linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ff9ec4" />
              <stop offset="0.5" stopColor="#b69dff" />
              <stop offset="1" stopColor="#e8b08e" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative space-y-12 md:space-y-20">
          {content.future.map((stop, i) => (
            <Reveal
              key={i}
              direction={i % 2 ? "left" : "right"}
              className={i % 2 ? "md:pl-[55%]" : "md:pr-[55%]"}
            >
              <motion.div
                whileHover={{ y: -5 }}
                className="glass gradient-border rounded-3xl p-7 shadow-card"
              >
                <div className="mb-3 flex items-center gap-2">
                  <Sparkles size={16} className="text-pink-soft" />
                  <span className="text-xs uppercase tracking-[0.25em] text-lavender">
                    {stop.tag}
                  </span>
                </div>
                <p className="font-serif text-2xl font-light text-cream">
                  {stop.title}
                </p>
                {filled(stop.note) && (
                  <p className="mt-2 text-sm font-light text-cream/60">
                    {stop.note}
                  </p>
                )}
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

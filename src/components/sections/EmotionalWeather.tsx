import { motion } from "framer-motion";
import { Sun } from "lucide-react";
import { content } from "@/content";
import { Section } from "../fx/Section";
import { Reveal } from "../fx/Reveal";
import { Counter } from "../fx/Counter";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Zoom the narrow 0.5–0.75 positive band into a readable 22–100% bar height. */
function heightPct(p: number) {
  const lo = 0.5,
    hi = 0.75;
  const v = Math.max(0, Math.min(1, (p - lo) / (hi - lo)));
  return 22 + v * 78;
}

export function EmotionalWeather() {
  const w = content.numbers.weather;
  return (
    <Section
      id="weather"
      eyebrow={w.eyebrow}
      title={
        <>
          {w.title.split(w.emphasis)[0]}
          <span className="italic text-pink-soft">{w.emphasis}</span>
          {w.title.split(w.emphasis)[1]}
        </>
      }
    >
      <Reveal className="mb-10 text-center font-serif text-lg font-light italic text-cream/80">
        {w.caption}
      </Reveal>

      {/* overall warmth */}
      <Reveal className="glass gradient-border mx-auto mb-8 flex max-w-sm items-center justify-center gap-4 rounded-3xl p-6">
        <Sun className="text-pink-soft" size={28} />
        <div className="text-center">
          <p className="bg-gradient-to-r from-pink-soft to-lavender bg-clip-text font-serif text-4xl font-light text-transparent">
            +<Counter to={w.overall} decimals={2} />
          </p>
          <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-cream/55">
            overall warmth · −1 to +1
          </p>
        </div>
      </Reveal>

      {/* monthly weather bars */}
      <Reveal className="glass gradient-border rounded-3xl p-6 sm:p-9">
        <div className="flex h-64 items-end justify-between gap-1.5 sm:gap-3">
          {w.items.map((m, i) => (
            <div key={m.label} className="flex flex-1 flex-col items-center gap-2">
              <span className="font-serif text-[11px] text-pink-soft sm:text-xs">
                +{m.value.toFixed(2)}
              </span>
              <div className="flex h-40 w-full items-end sm:h-44">
                <motion.div
                  className="w-full rounded-t-lg bg-gradient-to-t from-lavender-deep via-pink to-pink-soft shadow-glow"
                  initial={{ height: 0 }}
                  whileInView={{ height: `${heightPct(m.value)}%` }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.9, ease: EASE, delay: i * 0.06 }}
                />
              </div>
              <span className="text-[10px] capitalize text-cream/70 sm:text-xs">
                {m.sub}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-cream/40 sm:text-[10px]">
                {m.label}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-7 text-center font-serif text-lg font-light italic text-cream/85">
          {w.note}
        </p>
      </Reveal>
    </Section>
  );
}

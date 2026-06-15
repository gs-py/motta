import { motion } from "framer-motion";
import { CalendarHeart } from "lucide-react";
import { content } from "@/content";
import { Section } from "../fx/Section";
import { Reveal } from "../fx/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

export function OurYear() {
  const { months, monthsNote, weekdays, topDays } = content.numbers;
  const maxMonth = Math.max(...months.map((m) => m.value));
  const maxDow = Math.max(...weekdays.map((d) => d.value));

  return (
    <Section
      id="rhythm"
      eyebrow="Eight months, drawn out"
      title={
        <>
          Our year in <span className="italic text-pink-soft">messages</span>
        </>
      }
    >
      {/* monthly bar chart */}
      <Reveal className="glass gradient-border rounded-3xl p-7 sm:p-10">
        <div className="flex h-56 items-end justify-between gap-2 sm:gap-4">
          {months.map((m, i) => {
            const peak = m.value === maxMonth;
            return (
              <div key={m.label} className="flex flex-1 flex-col items-center gap-2">
                <span
                  className={`font-serif text-xs sm:text-sm ${
                    peak ? "text-pink-soft" : "text-cream/55"
                  }`}
                >
                  {(m.value / 1000).toFixed(1)}k
                </span>
                <div className="flex h-40 w-full items-end">
                  <motion.div
                    className={`w-full rounded-t-lg ${
                      peak
                        ? "bg-gradient-to-t from-pink-deep to-pink-soft shadow-glow"
                        : "bg-gradient-to-t from-lavender-deep/70 to-lavender/70"
                    }`}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${(m.value / maxMonth) * 100}%` }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.9, ease: EASE, delay: i * 0.06 }}
                  />
                </div>
                <span className="text-[11px] uppercase tracking-wider text-cream/50">
                  {m.label}
                </span>
              </div>
            );
          })}
        </div>
        <p className="mt-7 text-center font-serif text-lg font-light italic text-cream/85">
          {monthsNote}
        </p>
      </Reveal>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* weekday rhythm */}
        <Reveal className="glass gradient-border rounded-3xl p-7 sm:p-8">
          <div className="mb-6 flex items-center gap-2">
            <CalendarHeart size={15} className="text-lavender" />
            <p className="text-xs uppercase tracking-[0.2em] text-lavender/80">
              The day that's most ours
            </p>
          </div>
          <div className="space-y-3">
            {weekdays.map((d, i) => {
              const peak = d.value === maxDow;
              return (
                <div key={d.label} className="flex items-center gap-3">
                  <span
                    className={`w-9 text-sm ${
                      peak ? "text-pink-soft" : "text-cream/60"
                    }`}
                  >
                    {d.label}
                  </span>
                  <span className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/8">
                    <motion.span
                      className={`block h-full rounded-full bg-gradient-to-r ${
                        peak ? "from-pink to-pink-soft" : "from-lavender-deep to-lavender"
                      }`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(d.value / maxDow) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: EASE, delay: i * 0.05 }}
                    />
                  </span>
                  <span className="w-12 text-right font-serif text-sm text-cream/55">
                    {(d.value / 1000).toFixed(1)}k
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-5 font-serif text-base font-light italic text-cream/80">
            Sundays are loudest — lazy, all-day us.
          </p>
        </Reveal>

        {/* loudest days */}
        <Reveal className="glass gradient-border rounded-3xl p-7 sm:p-8" delay={0.1}>
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-lavender/80">
            Our loudest days ever
          </p>
          <div className="space-y-4">
            {topDays.map((d, i) => (
              <div key={d.date} className="flex items-center gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink to-lavender font-serif text-sm text-purple-ink">
                  {i + 1}
                </span>
                <span className="flex-1 text-cream/85">{d.date}</span>
                <span className="font-serif text-xl font-light text-pink-soft">
                  {d.count.toLocaleString()}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-cream/40">
                  msgs
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Moon, Heart } from "lucide-react";
import { content } from "@/content";
import { Section } from "../fx/Section";
import { Reveal, Stagger, staggerItem } from "../fx/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Count-up number that animates the first time it scrolls into view. */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: EASE,
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {Math.round(val).toLocaleString()}
      {suffix}
    </span>
  );
}

/** A single animated horizontal bar (grows on scroll-in). */
function Bar({
  pct,
  className = "from-pink to-lavender",
  delay = 0,
}: {
  pct: number;
  className?: string;
  delay?: number;
}) {
  return (
    <span className="block h-2.5 w-full overflow-hidden rounded-full bg-white/8">
      <motion.span
        className={`block h-full rounded-full bg-gradient-to-r ${className}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      />
    </span>
  );
}

export function ByTheNumbers() {
  const { numbers: n } = content;
  const maxPhrase = Math.max(...n.phrases.map((p) => p.value));
  const maxNick = Math.max(...n.nicknames.map((x) => x.total));
  const maxHour = Math.max(...n.hours);

  return (
    <Section
      id="numbers"
      eyebrow={n.eyebrow}
      title={
        <>
          Us, in <span className="italic text-pink-soft">numbers</span>
        </>
      }
    >
      {/* headline counters */}
      <Stagger className="mb-16 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-5">
        {n.headline.map((s) => (
          <motion.div
            key={s.label}
            variants={staggerItem}
            className="glass rounded-2xl p-5 text-center sm:p-6"
          >
            <p className="bg-gradient-to-r from-pink-soft to-lavender bg-clip-text font-serif text-3xl font-light text-transparent sm:text-4xl">
              <Counter to={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-cream/60 sm:text-xs">
              {s.label}
            </p>
          </motion.div>
        ))}
      </Stagger>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* who talked more */}
        <Reveal className="glass gradient-border rounded-3xl p-7 sm:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-lavender/80">
            Who talked more
          </p>
          <div className="mt-6 flex h-4 w-full overflow-hidden rounded-full">
            <motion.span
              className="flex items-center justify-start bg-gradient-to-r from-lavender-deep to-lavender pl-3 text-[10px] font-medium text-purple-ink"
              initial={{ width: 0 }}
              whileInView={{ width: `${n.split.me.pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE }}
            >
              {n.split.me.pct}%
            </motion.span>
            <motion.span
              className="flex items-center justify-end bg-gradient-to-r from-pink to-pink-deep pr-3 text-[10px] font-medium text-purple-ink"
              initial={{ width: 0 }}
              whileInView={{ width: `${n.split.you.pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.15 }}
            >
              {n.split.you.pct}%
            </motion.span>
          </div>
          <div className="mt-3 flex justify-between text-sm text-cream/70">
            <span>
              <b className="text-lavender">{n.split.me.label}</b> ·{" "}
              {n.split.me.count.toLocaleString()}
            </span>
            <span>
              {n.split.you.count.toLocaleString()} ·{" "}
              <b className="text-pink">{n.split.you.label}</b>
            </span>
          </div>
          <p className="mt-5 font-serif text-lg font-light italic text-cream/85">
            Almost perfectly even. We both showed up.
          </p>
        </Reveal>

        {/* love, out loud */}
        <Reveal className="glass gradient-border rounded-3xl p-7 sm:p-8" delay={0.1}>
          <p className="text-xs uppercase tracking-[0.2em] text-lavender/80">
            Said out loud
          </p>
          <div className="mt-6 space-y-4">
            {n.phrases.map((p, i) => (
              <div key={p.label}>
                <div className="mb-1.5 flex items-baseline justify-between text-sm">
                  <span className="text-cream/85">{p.label}</span>
                  <span className="font-serif text-cream/60">{p.value}×</span>
                </div>
                <Bar pct={(p.value / maxPhrase) * 100} delay={i * 0.08} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* what we call each other */}
      <Reveal className="glass gradient-border mt-6 rounded-3xl p-7 sm:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.2em] text-lavender/80">
            What we call each other
          </p>
          <p className="flex items-center gap-4 text-[11px] uppercase tracking-[0.15em] text-cream/55">
            <span className="flex items-center gap-1.5">
              <i className="h-2.5 w-2.5 rounded-full bg-lavender" /> Me
            </span>
            <span className="flex items-center gap-1.5">
              <i className="h-2.5 w-2.5 rounded-full bg-pink" /> You
            </span>
          </p>
        </div>

        <div className="space-y-5">
          {n.nicknames.map((nk, i) => (
            <Reveal key={nk.name} delay={i * 0.06}>
              <div className="flex items-center gap-3 sm:gap-5">
                <div className="w-28 shrink-0 sm:w-40">
                  <p className="font-serif text-lg font-light text-cream">
                    {nk.name}
                  </p>
                  <p className="text-[11px] italic text-cream/45">{nk.note}</p>
                </div>
                <div className="flex h-3.5 flex-1 overflow-hidden rounded-full bg-white/8">
                  <motion.span
                    className="block h-full bg-gradient-to-r from-lavender-deep to-lavender"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(nk.me / maxNick) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: EASE, delay: i * 0.06 }}
                  />
                  <motion.span
                    className="block h-full bg-gradient-to-r from-pink to-pink-deep"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(nk.you / maxNick) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: EASE, delay: i * 0.06 + 0.1 }}
                  />
                </div>
                <span className="w-10 shrink-0 text-right font-serif text-lg text-cream/70">
                  {nk.total}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* the emotional colours of us */}
      <Reveal className="glass gradient-border mt-6 rounded-3xl p-7 sm:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-lavender/80">
          The emotional colours of us
        </p>
        <div className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
          {n.emotions.map((e, i) => (
            <div key={e.label}>
              <div className="mb-1.5 flex items-baseline justify-between text-sm">
                <span className="text-cream/85">{e.label}</span>
                <span className="font-serif text-cream/55">{e.pct}%</span>
              </div>
              <Bar
                pct={(e.pct / n.emotions[0].pct) * 100}
                delay={i * 0.05}
                className={
                  i < 3
                    ? "from-pink to-pink-soft"
                    : i < 6
                    ? "from-lavender to-pink"
                    : "from-lavender-deep to-lavender"
                }
              />
            </div>
          ))}
        </div>
        <p className="mt-6 font-serif text-lg font-light italic text-cream/85">
          {n.emotionsNote}
        </p>
      </Reveal>

      {/* we are night people */}
      <Reveal className="glass gradient-border mt-6 rounded-3xl p-7 sm:p-8">
        <div className="mb-6 flex items-center gap-2">
          <Moon size={15} className="text-lavender" />
          <p className="text-xs uppercase tracking-[0.2em] text-lavender/80">
            We are night people
          </p>
        </div>
        <div className="flex h-32 items-end gap-[3px] sm:gap-1.5">
          {n.hours.map((h, hr) => {
            const night = hr >= 22 || hr <= 1;
            return (
              <motion.div
                key={hr}
                className={`flex-1 rounded-t ${
                  night
                    ? "bg-gradient-to-t from-pink-deep to-pink-soft shadow-glow"
                    : "bg-white/12"
                }`}
                initial={{ height: 0 }}
                whileInView={{ height: `${(h / maxHour) * 100}%` }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.8, ease: EASE, delay: hr * 0.02 }}
                title={`${hr}:00 — ${h.toLocaleString()} msgs`}
              />
            );
          })}
        </div>
        <div className="mt-3 flex justify-between text-[10px] uppercase tracking-wider text-cream/40">
          <span>12 AM</span>
          <span>6 AM</span>
          <span>12 PM</span>
          <span>6 PM</span>
          <span>11 PM</span>
        </div>
        <p className="mt-5 font-serif text-lg font-light italic text-cream/85">
          Our loudest hour is{" "}
          <span className="text-pink-soft">{n.peakHour}</span> — and our busiest
          day ever was {n.busiest.day}, with{" "}
          <span className="text-pink-soft">
            {n.busiest.count.toLocaleString()}
          </span>{" "}
          messages.
        </p>
      </Reveal>

      {/* closing line */}
      <Reveal className="mt-16 text-center">
        <Heart className="mx-auto mb-5 text-pink-soft" size={26} />
        <p className="mx-auto max-w-2xl text-balance font-serif text-2xl font-light leading-relaxed text-cream/90 sm:text-3xl">
          {n.closing}
        </p>
      </Reveal>
    </Section>
  );
}

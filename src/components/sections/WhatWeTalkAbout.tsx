import { motion } from "framer-motion";
import { content } from "@/content";
import { Section } from "../fx/Section";
import { Reveal } from "../fx/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

export function WhatWeTalkAbout() {
  const t = content.numbers.topics;
  const max = Math.max(...t.items.map((x) => x.value));

  return (
    <Section
      id="topics"
      eyebrow={t.eyebrow}
      title={
        <>
          {t.title.split(t.emphasis)[0]}
          <span className="italic text-pink-soft">{t.emphasis}</span>
          {t.title.split(t.emphasis)[1]}
        </>
      }
    >
      <Reveal className="mb-12 text-center font-serif text-lg font-light italic text-cream/80">
        {t.caption}
      </Reveal>

      <div className="mx-auto max-w-3xl space-y-6">
        {t.items.map((row, i) => {
          const mePct = (row.me / (row.me + row.you)) * 100;
          return (
            <Reveal key={row.label} delay={i * 0.05}>
              <div className="glass gradient-border rounded-2xl p-5 sm:p-6">
                <div className="mb-2 flex items-baseline justify-between gap-3">
                  <div>
                    <span className="font-serif text-xl font-light text-cream">
                      {row.label}
                    </span>
                    <span className="ml-2 text-sm italic text-cream/55">
                      {row.sub}
                    </span>
                  </div>
                  <span className="shrink-0 font-serif text-2xl font-light text-pink-soft">
                    {row.value.toLocaleString()}
                  </span>
                </div>

                {/* total reach bar */}
                <span className="block h-2.5 w-full overflow-hidden rounded-full bg-white/8">
                  <motion.span
                    className="block h-full rounded-full bg-gradient-to-r from-lavender via-pink to-pink-soft"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(row.value / max) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: EASE, delay: i * 0.05 }}
                  />
                </span>

                {/* who brings it up more */}
                <div className="mt-2 flex items-center gap-2 text-[11px] text-cream/45">
                  <span className="text-lavender">Me</span>
                  <span className="flex h-1.5 flex-1 overflow-hidden rounded-full bg-white/8">
                    <span
                      className="block h-full bg-lavender/70"
                      style={{ width: `${mePct}%` }}
                    />
                    <span
                      className="block h-full bg-pink/70"
                      style={{ width: `${100 - mePct}%` }}
                    />
                  </span>
                  <span className="text-pink">You</span>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-12 text-center">
        <p className="mx-auto max-w-xl font-serif text-xl font-light italic text-cream/85">
          {t.note}
        </p>
      </Reveal>
    </Section>
  );
}

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { content } from "@/content";
import { Section } from "../fx/Section";
import { Reveal } from "../fx/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

type Versus = (typeof content.numbers.versus)[number];

function fmt(v: number, decimals: number, unit: string) {
  const num = decimals > 0 ? v.toFixed(decimals) : v.toLocaleString();
  return `${num}${unit}`;
}

export function MeVsYou() {
  const { versus, versusNote } = content.numbers;

  return (
    <Section
      id="vs"
      eyebrow="Two people, one chat"
      title={
        <>
          Me <span className="italic text-pink-soft">vs</span> You
        </>
      }
    >
      {/* header legend */}
      <Reveal className="mb-10 flex items-center justify-center gap-8 text-sm uppercase tracking-[0.2em]">
        <span className="flex items-center gap-2 text-lavender">
          <i className="h-3 w-3 rounded-full bg-lavender" /> Me
        </span>
        <span className="font-serif text-cream/40">vs</span>
        <span className="flex items-center gap-2 text-pink">
          You <i className="h-3 w-3 rounded-full bg-pink" />
        </span>
      </Reveal>

      <div className="mx-auto max-w-3xl space-y-7">
        {versus.map((row: Versus, i) => (
          <Row key={row.label} row={row} delay={i * 0.06} />
        ))}
      </div>

      <Reveal className="mt-12 text-center">
        <p className="mx-auto max-w-xl font-serif text-xl font-light italic text-cream/85">
          {versusNote}
        </p>
      </Reveal>
    </Section>
  );
}

function Row({ row, delay }: { row: Versus; delay: number }) {
  // weight by value; for "lower wins" metrics invert so the faster side is longer
  const meScore = row.lowerWins ? 1 / row.me : row.me;
  const youScore = row.lowerWins ? 1 / row.you : row.you;
  const total = meScore + youScore;
  const mePct = (meScore / total) * 100;
  const youPct = (youScore / total) * 100;
  const meWins = row.lowerWins ? row.me < row.you : row.me > row.you;

  return (
    <Reveal delay={delay}>
      <div>
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="flex items-center gap-1.5 font-serif text-base text-lavender-soft">
            {meWins && <Heart size={13} className="fill-lavender text-lavender" />}
            {fmt(row.me, row.decimals, row.unit)}
          </span>
          <span className="text-xs uppercase tracking-[0.15em] text-cream/60">
            {row.label}
          </span>
          <span className="flex items-center gap-1.5 font-serif text-base text-pink-soft">
            {fmt(row.you, row.decimals, row.unit)}
            {!meWins && <Heart size={13} className="fill-pink text-pink" />}
          </span>
        </div>
        <div className="flex h-3.5 w-full gap-0.5">
          <div className="flex flex-1 justify-end overflow-hidden rounded-l-full bg-white/8">
            <motion.span
              className="block h-full rounded-l-full bg-gradient-to-l from-lavender to-lavender-deep"
              initial={{ width: 0 }}
              whileInView={{ width: `${mePct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE, delay }}
            />
          </div>
          <div className="flex flex-1 overflow-hidden rounded-r-full bg-white/8">
            <motion.span
              className="block h-full rounded-r-full bg-gradient-to-r from-pink to-pink-deep"
              initial={{ width: 0 }}
              whileInView={{ width: `${youPct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: EASE, delay: delay + 0.1 }}
            />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

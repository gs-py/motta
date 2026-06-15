import { motion } from "framer-motion";
import { content } from "@/content";
import { Section } from "../fx/Section";
import { Reveal, Stagger, staggerItem } from "../fx/Reveal";
import { Counter } from "../fx/Counter";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Circular progress ring with an animated stroke + count-up number. */
function Ring({
  value,
  size = 132,
  stroke = 9,
  hero = false,
}: {
  value: number;
  size?: number;
  stroke?: number;
  hero?: boolean;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const gid = `g-${value}-${size}`;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: c - (value / 100) * c }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.6, ease: EASE }}
        />
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ff9ec4" />
            <stop offset="1" stopColor="#b69dff" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className={`bg-gradient-to-r from-pink-soft to-lavender bg-clip-text font-serif font-light text-transparent ${
            hero ? "text-5xl" : "text-3xl"
          }`}
        >
          <Counter to={value} />
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-cream/45">
          / 100
        </span>
      </div>
    </div>
  );
}

export function ReportCard() {
  const { scores, overallScore } = content.numbers;

  return (
    <Section
      id="report"
      eyebrow="Graded by 82,675 messages"
      title={
        <>
          Our report <span className="italic text-pink-soft">card</span>
        </>
      }
    >
      {/* hero overall score */}
      <Reveal className="glass gradient-border mx-auto mb-10 flex max-w-xl flex-col items-center gap-5 rounded-3xl p-8 text-center sm:flex-row sm:text-left">
        <Ring value={overallScore.value} size={150} stroke={11} hero />
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-pink/80">
            {overallScore.label} health
          </p>
          <p className="mt-2 font-serif text-2xl font-light text-cream">
            We're thriving.
          </p>
          <p className="mt-1 font-serif text-lg font-light italic text-cream/75">
            {overallScore.blurb}
          </p>
        </div>
      </Reveal>

      {/* four sub-scores */}
      <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {scores.map((s) => (
          <motion.div
            key={s.label}
            variants={staggerItem}
            className="glass flex items-center gap-5 rounded-3xl p-6"
          >
            <div className="shrink-0">
              <Ring value={s.value} size={104} stroke={8} />
            </div>
            <div>
              <p className="font-serif text-xl font-light text-cream">
                {s.label}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-cream/65">
                {s.blurb}
              </p>
            </div>
          </motion.div>
        ))}
      </Stagger>
    </Section>
  );
}

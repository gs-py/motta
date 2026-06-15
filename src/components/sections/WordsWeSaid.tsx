import { content } from "@/content";
import { Section } from "../fx/Section";
import { Reveal, Stagger, staggerItem } from "../fx/Reveal";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

/**
 * Real lines from the chat — his column, her column — plus the
 * inside jokes only the two of them understand.
 */
export function WordsWeSaid() {
  const { wordsHe, wordsShe, jokes } = content.numbers;

  return (
    <Section
      id="words"
      eyebrow="Real lines, straight from us"
      title={
        <>
          Words we <span className="italic text-pink-soft">said</span>
        </>
      }
    >
      <div className="grid gap-8 md:grid-cols-2">
        <QuoteColumn title="He said" accent="lavender" quotes={wordsHe} />
        <QuoteColumn title="She said" accent="pink" quotes={wordsShe} />
      </div>

      {/* inside jokes */}
      <Reveal className="mt-16">
        <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-pink/80">
          Only we get these
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {jokes.map((j, i) => (
            <Reveal key={i} delay={(i % 2) * 0.08}>
              <div className="glass flex items-center gap-4 rounded-2xl p-5">
                <span className="text-2xl">{j.emoji}</span>
                <p className="font-serif text-lg font-light text-cream/85">
                  {j.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

function QuoteColumn({
  title,
  accent,
  quotes,
}: {
  title: string;
  accent: "pink" | "lavender";
  quotes: readonly string[];
}) {
  const border = accent === "pink" ? "border-pink/60" : "border-lavender/60";
  const dot = accent === "pink" ? "text-pink-soft" : "text-lavender";
  return (
    <div>
      <p className={`mb-5 font-script text-3xl ${dot}`}>{title}</p>
      <Stagger className="space-y-4">
        {quotes.map((q, i) => (
          <motion.div
            key={i}
            variants={staggerItem}
            className={`glass rounded-2xl border-l-2 ${border} p-5`}
          >
            <Quote size={16} className={`mb-2 ${dot}`} />
            <p className="font-serif text-xl font-light italic leading-relaxed text-cream/90">
              {q}
            </p>
          </motion.div>
        ))}
      </Stagger>
    </div>
  );
}

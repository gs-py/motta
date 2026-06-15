import { motion } from "framer-motion";
import { content } from "@/content";
import { Section } from "../fx/Section";
import { Reveal } from "../fx/Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

export function WhoFeelsWhat() {
  const { emotionByPerson, persona, personaNote } = content.numbers;
  const maxSide = Math.max(
    ...emotionByPerson.flatMap((e) => [e.me, e.you])
  );

  return (
    <Section
      id="fingerprint"
      eyebrow="Read from how we write"
      title={
        <>
          Who feels <span className="italic text-pink-soft">what</span>
        </>
      }
    >
      {/* persona cards */}
      <div className="mb-12 grid gap-6 md:grid-cols-2">
        <PersonaCard p={persona.me} accent="lavender" />
        <PersonaCard p={persona.you} accent="pink" />
      </div>

      {/* diverging emotion bars */}
      <Reveal className="glass gradient-border rounded-3xl p-6 sm:p-9">
        <div className="mb-6 flex items-center justify-between text-[11px] uppercase tracking-[0.2em]">
          <span className="text-lavender">◄ Me</span>
          <span className="text-cream/40">who feels it more</span>
          <span className="text-pink">You ►</span>
        </div>

        <div className="space-y-4">
          {emotionByPerson.map((e, i) => {
            const meWins = e.me >= e.you;
            return (
              <Reveal key={e.emotion} delay={i * 0.04}>
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* me value */}
                  <span className="w-9 text-right font-serif text-sm text-lavender-soft sm:w-11">
                    {e.me}
                  </span>
                  {/* left track (fills right-to-left) */}
                  <span className="flex h-3 flex-1 justify-end overflow-hidden rounded-l-full bg-white/8">
                    <motion.span
                      className="block h-full bg-gradient-to-l from-lavender to-lavender-deep"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(e.me / maxSide) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: EASE, delay: i * 0.04 }}
                    />
                  </span>
                  {/* label */}
                  <span
                    className={`w-24 shrink-0 text-center text-xs uppercase tracking-wide sm:w-32 ${
                      meWins ? "text-lavender-soft" : "text-pink-soft"
                    }`}
                  >
                    {e.emotion}
                  </span>
                  {/* right track */}
                  <span className="flex h-3 flex-1 overflow-hidden rounded-r-full bg-white/8">
                    <motion.span
                      className="block h-full bg-gradient-to-r from-pink to-pink-deep"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(e.you / maxSide) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: EASE, delay: i * 0.04 + 0.08 }}
                    />
                  </span>
                  {/* you value */}
                  <span className="w-9 font-serif text-sm text-pink-soft sm:w-11">
                    {e.you}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-7 text-center font-serif text-lg font-light italic text-cream/85">
          {personaNote}
        </p>
      </Reveal>
    </Section>
  );
}

function PersonaCard({
  p,
  accent,
}: {
  p: { name: string; emojis: readonly string[]; title: string; line: string };
  accent: "pink" | "lavender";
}) {
  const ring = accent === "pink" ? "from-pink/30 to-pink-deep/20" : "from-lavender/30 to-lavender-deep/20";
  const text = accent === "pink" ? "text-pink-soft" : "text-lavender";
  return (
    <Reveal className="glass gradient-border rounded-3xl p-7 text-center sm:p-8">
      <div
        className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${ring} text-3xl`}
      >
        {p.emojis[0]}
      </div>
      <p className={`text-xs uppercase tracking-[0.25em] ${text}`}>{p.name}</p>
      <p className="mt-1 font-script text-3xl text-cream">{p.title}</p>
      <p className="mt-3 font-serif text-base font-light leading-relaxed text-cream/75">
        {p.line}
      </p>
      <div className="mt-4 flex justify-center gap-2 text-2xl">
        {p.emojis.map((e, i) => (
          <span key={i} className={i === 0 ? "" : "opacity-70"}>
            {e}
          </span>
        ))}
      </div>
    </Reveal>
  );
}

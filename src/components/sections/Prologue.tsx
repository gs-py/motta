import { content, filled } from "@/content";
import { Section } from "../fx/Section";
import { Reveal } from "../fx/Reveal";

/**
 * Quiet opening chapter — how it all started.
 * Reads like the first page of a book.
 */
export function Prologue() {
  const { intro } = content;
  const rows = [
    { k: "How long", v: intro.together },
    { k: "We first met", v: intro.firstMetWhen },
    { k: "The way it happened", v: intro.firstMetHow },
  ];

  return (
    <Section
      eyebrow="Chapter One"
      title={
        <>
          How <span className="italic text-pink-soft">us</span> began
        </>
      }
      contentClassName="max-w-3xl"
    >
      <Reveal className="glass gradient-border rounded-3xl p-8 sm:p-12">
        <p className="font-serif text-2xl font-light leading-relaxed text-cream/90 sm:text-3xl">
          Somewhere between Kerala and Bangalore, two timelines crossed — and
          nothing felt ordinary again.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {rows.map((r) => (
            <div key={r.k}>
              <p className="text-xs uppercase tracking-[0.25em] text-lavender/80">
                {r.k}
              </p>
              <p className="mt-1 text-lg font-light text-cream/80">{r.v}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <blockquote className="border-l-2 border-pink/50 pl-4">
            <p className="text-xs uppercase tracking-[0.25em] text-pink/80">
              My first thought about her
            </p>
            <p className="mt-2 font-serif text-xl italic text-cream/90">
              “{intro.yourImpression}”
            </p>
          </blockquote>
          {filled(intro.herImpression) && (
            <blockquote className="border-l-2 border-lavender/50 pl-4">
              <p className="text-xs uppercase tracking-[0.25em] text-lavender/80">
                Her first thought about me
              </p>
              <p className="mt-2 font-serif text-xl italic text-cream/90">
                “{intro.herImpression}”
              </p>
            </blockquote>
          )}
        </div>

        {filled(intro.favoriteMemory) && (
          <div className="mt-10 border-t border-white/10 pt-8">
            <p className="text-xs uppercase tracking-[0.25em] text-pink/80">
              My favourite memory of us
            </p>
            <p className="mt-2 font-serif text-2xl font-light italic leading-relaxed text-cream/90">
              “{intro.favoriteMemory}”
            </p>
          </div>
        )}
      </Reveal>
    </Section>
  );
}

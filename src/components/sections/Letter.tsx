import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { content } from "@/content";
import { Section } from "../fx/Section";
import { Reveal } from "../fx/Reveal";

/**
 * Premium letter on paper texture.
 * Body paragraphs type themselves out, one after another, once in view.
 */
export function Letter() {
  const { letter } = content;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <Section
      eyebrow="From me, to you"
      title={
        <>
          A <span className="italic text-pink-soft">letter</span> for Mi Amore
        </>
      }
      contentClassName="max-w-2xl"
    >
      <Reveal>
        <div
          ref={ref}
          className="paper relative rounded-[20px] p-8 shadow-soft sm:p-12"
          style={{
            boxShadow:
              "0 40px 90px -30px rgba(0,0,0,0.6), inset 0 0 60px rgba(120,90,60,0.06)",
          }}
        >
          {/* tape */}
          <span className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-1 bg-white/30 backdrop-blur-sm" />

          <p className="handwrite mb-6 text-3xl text-[#7a5230] sm:text-4xl">
            {letter.greeting}
          </p>

          <div className="space-y-5">
            {letter.body.map((para, i) => (
              <Typewriter key={i} text={para} start={inView} order={i} />
            ))}
          </div>

          <p className="handwrite mt-8 text-2xl text-[#7a5230]">
            {letter.signoff}
          </p>
          <p className="handwrite text-3xl text-[#a85d7a]">{letter.signature}</p>
        </div>
      </Reveal>
    </Section>
  );
}

const SPEED = 22; // ms per character

function Typewriter({
  text,
  start,
  order,
}: {
  text: string;
  start: boolean;
  order: number;
}) {
  const [shown, setShown] = useState(0);
  const [begun, setBegun] = useState(false);

  // stagger paragraph starts
  useEffect(() => {
    if (!start) return;
    const wait = order * 1400;
    const t = setTimeout(() => setBegun(true), wait);
    return () => clearTimeout(t);
  }, [start, order]);

  useEffect(() => {
    if (!begun) return;
    if (shown >= text.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), SPEED);
    return () => clearTimeout(t);
  }, [begun, shown, text.length]);

  const done = shown >= text.length;

  return (
    <p className="font-serif text-lg leading-relaxed text-[#4a3527] sm:text-xl">
      {text.slice(0, shown)}
      {begun && !done && (
        <motion.span
          className="ml-0.5 inline-block h-5 w-[2px] translate-y-1 bg-[#a85d7a]"
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
      )}
    </p>
  );
}

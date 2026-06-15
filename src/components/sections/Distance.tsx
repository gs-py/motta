import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Plane } from "lucide-react";
import { content } from "@/content";
import { Section } from "../fx/Section";
import { Reveal, Stagger, staggerItem } from "../fx/Reveal";

function Counter({
  to,
  prefix = "",
  suffix = "",
}: {
  to: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {prefix}
      {Math.round(val).toLocaleString()}
      {suffix}
    </span>
  );
}

export function Distance() {
  const { distance } = content;
  return (
    <Section
      eyebrow="480 kilometers, one heart"
      title={
        <>
          The space <span className="italic text-pink-soft">between</span> us
        </>
      }
    >
      {/* map of two cities */}
      <Reveal className="glass gradient-border relative mb-14 overflow-hidden rounded-3xl p-8 sm:p-12">
        <div className="relative flex items-center justify-between">
          <City name={distance.from} sub="home" align="left" />

          <div className="relative mx-4 flex-1">
            <svg viewBox="0 0 300 60" className="w-full" preserveAspectRatio="none">
              <motion.path
                d="M5 40 Q150 -10 295 40"
                fill="none"
                stroke="url(#dline)"
                strokeWidth="2"
                strokeDasharray="4 6"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="dline" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#ff9ec4" />
                  <stop offset="1" stopColor="#b69dff" />
                </linearGradient>
              </defs>
            </svg>
            <motion.span
              className="absolute top-1 text-pink-soft drop-shadow-[0_0_8px_rgba(255,158,196,0.8)]"
              initial={{ left: "0%", top: "55%", opacity: 0 }}
              whileInView={{
                left: ["0%", "50%", "100%"],
                top: ["55%", "5%", "55%"],
                opacity: [0, 1, 1, 0],
              }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            >
              <Plane size={18} className="rotate-[35deg]" />
            </motion.span>
          </div>

          <City name={distance.to} sub="where I am" align="right" />
        </div>
      </Reveal>

      {/* stat counters */}
      <Stagger className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
        {distance.stats.map((s) => (
          <motion.div
            key={s.label}
            variants={staggerItem}
            className="glass rounded-2xl p-6 text-center"
          >
            <p className="bg-gradient-to-r from-pink-soft to-lavender bg-clip-text font-serif text-4xl font-light text-transparent sm:text-5xl">
              <Counter
                to={s.value}
                prefix={"prefix" in s ? (s.prefix as string) : ""}
                suffix={s.suffix}
              />
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.15em] text-cream/60">
              {s.label}
            </p>
          </motion.div>
        ))}
      </Stagger>

      {/* the aching lines */}
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        <MissCard label="What I miss most about her" text={distance.missAboutHer} />
        <MissCard label="What I miss about Bangalore" text={distance.missAboutBangalore} />
        <MissCard label="Our place" text={distance.specialPlace} />
      </div>
    </Section>
  );
}

function City({
  name,
  sub,
  align,
}: {
  name: string;
  sub: string;
  align: "left" | "right";
}) {
  return (
    <div className={align === "right" ? "text-right" : "text-left"}>
      <motion.div
        className="relative mx-auto mb-2 flex h-3 w-3 items-center justify-center"
        whileInView={{ scale: [0, 1.4, 1] }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <span className="absolute h-3 w-3 animate-ping rounded-full bg-pink/50" />
        <span className="h-2.5 w-2.5 rounded-full bg-pink shadow-glow" />
      </motion.div>
      <p className="font-serif text-2xl font-light text-cream sm:text-3xl">{name}</p>
      <p className="text-xs uppercase tracking-[0.2em] text-cream/50">{sub}</p>
    </div>
  );
}

function MissCard({ label, text }: { label: string; text: string }) {
  return (
    <Reveal className="glass rounded-2xl p-6">
      <p className="text-xs uppercase tracking-[0.2em] text-lavender/80">{label}</p>
      <p className="mt-2 font-serif text-lg font-light italic text-cream/85">
        “{text}”
      </p>
    </Reveal>
  );
}

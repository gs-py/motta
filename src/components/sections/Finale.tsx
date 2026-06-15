import { RotateCcw } from "lucide-react";
import { content } from "@/content";
import { Aurora } from "../fx/Aurora";
import { Particles, Stars } from "../fx/Particles";
import { Reveal } from "../fx/Reveal";
import { MagneticButton } from "../ui/MagneticButton";

export function Finale({ onReplay }: { onReplay: () => void }) {
  const { finale } = content;
  return (
    <section
      id="finale"
      className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden px-6 py-32"
    >
      <Aurora />
      <Stars count={70} />
      <Particles count={20} variant="hearts" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="handwrite text-3xl text-pink-soft/90 sm:text-4xl">
            {finale.title}
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-2xl font-serif text-2xl font-light leading-relaxed text-cream/90 sm:text-3xl">
            {finale.line}
          </p>
        </Reveal>

        <Reveal delay={0.4}>
          <h2 className="mt-10 bg-gradient-to-r from-pink-soft via-pink to-lavender bg-clip-text font-serif text-5xl font-light text-transparent sm:text-7xl">
            {finale.sign}
          </h2>
        </Reveal>

        <Reveal delay={0.6} className="mt-14 flex justify-center">
          <MagneticButton onClick={onReplay}>
            <RotateCcw
              size={16}
              className="transition-transform duration-500 group-hover:-rotate-180"
            />
            {finale.replay}
          </MagneticButton>
        </Reveal>

        <Reveal delay={0.8}>
          <p className="mt-16 text-xs uppercase tracking-[0.3em] text-cream/40">
            made with love, only for {content.her.fullName}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { PHOTOS } from "@/content";
import { Section } from "../fx/Section";
import { Reveal } from "../fx/Reveal";
import { cn } from "@/lib/utils";

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);
  const go = useCallback(
    (dir: number) =>
      setActive((cur) =>
        cur === null ? cur : (cur + dir + PHOTOS.length) % PHOTOS.length
      ),
    []
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, go]);

  return (
    <Section
      eyebrow="Frozen seconds I never want to lose"
      title={
        <>
          Our little <span className="italic text-pink-soft">gallery</span>
        </>
      }
    >
      <div className="columns-2 gap-3 sm:columns-3 sm:gap-4 lg:columns-4">
        {PHOTOS.map((src, i) => (
          <Reveal
            key={src}
            delay={(i % 4) * 0.05}
            className="mb-3 break-inside-avoid sm:mb-4"
          >
            <motion.button
              onClick={() => setActive(i)}
              whileHover={{ y: -6, rotate: i % 2 ? 1.5 : -1.5 }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
              className="group relative block w-full overflow-hidden rounded-2xl bg-white/5 p-2 shadow-card"
            >
              {/* polaroid frame */}
              <div className="overflow-hidden rounded-xl">
                <img
                  src={src}
                  alt={`memory ${i + 1}`}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-purple-ink/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-purple-ink/90 p-4 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button
              className="absolute right-5 top-5 text-cream/70 transition-colors hover:text-cream"
              onClick={close}
              aria-label="Close"
            >
              <X size={30} />
            </button>

            <NavBtn side="left" onClick={() => go(-1)} />
            <NavBtn side="right" onClick={() => go(1)} />

            <motion.div
              key={active}
              initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[85vh] max-w-3xl rounded-2xl bg-white/5 p-3 shadow-soft"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={PHOTOS[active]}
                alt={`memory ${active + 1}`}
                className="max-h-[78vh] w-auto rounded-xl object-contain"
              />
              <p className="handwrite mt-2 text-center text-2xl text-cream/80">
                us · {active + 1} of {PHOTOS.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}

function NavBtn({
  side,
  onClick,
}: {
  side: "left" | "right";
  onClick: () => void;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        "glass-strong absolute top-1/2 z-10 -translate-y-1/2 rounded-full p-3 text-cream/80 transition-colors hover:text-cream",
        side === "left" ? "left-4" : "right-4"
      )}
      aria-label={side === "left" ? "Previous" : "Next"}
    >
      {side === "left" ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
    </button>
  );
}

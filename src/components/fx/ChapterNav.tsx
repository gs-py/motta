import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export type Chapter = { id: string; label: string };

/**
 * Right-edge chapter dots. Tracks the section in view with an
 * IntersectionObserver and scrolls smoothly on click.
 * Hidden on small screens.
 */
export function ChapterNav({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(chapters[0]?.id);

  useEffect(() => {
    const els = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [chapters]);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex">
      {chapters.map((c) => {
        const on = active === c.id;
        return (
          <button
            key={c.id}
            onClick={() => go(c.id)}
            className="group relative flex items-center"
            aria-label={c.label}
          >
            <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-full bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-cream/80 opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
              {c.label}
            </span>
            <motion.span
              className="block rounded-full"
              animate={{
                width: on ? 10 : 7,
                height: on ? 10 : 7,
                backgroundColor: on
                  ? "rgba(255,158,196,1)"
                  : "rgba(255,255,255,0.25)",
                boxShadow: on
                  ? "0 0 14px 2px rgba(255,158,196,0.7)"
                  : "0 0 0 0 transparent",
              }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
            />
          </button>
        );
      })}
    </nav>
  );
}

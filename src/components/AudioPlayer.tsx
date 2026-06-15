import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause, Play } from "lucide-react";
import { content } from "@/content";

/**
 * Floating audio toggle with an animated waveform.
 * Hidden entirely if no audio src is configured.
 * Fades volume in/out instead of hard cut.
 */
export function AudioPlayer() {
  const src = content.audio.src;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const fadeRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    };
  }, []);

  if (!src) return null;

  const fadeTo = (target: number, onEnd?: () => void) => {
    const el = audioRef.current;
    if (!el) return;
    if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    const step = () => {
      if (!el) return;
      const diff = target - el.volume;
      if (Math.abs(diff) < 0.03) {
        el.volume = target;
        onEnd?.();
        return;
      }
      el.volume = Math.min(1, Math.max(0, el.volume + diff * 0.08));
      fadeRef.current = requestAnimationFrame(step);
    };
    step();
  };

  const toggle = async () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      fadeTo(0, () => el.pause());
      setPlaying(false);
    } else {
      el.volume = 0;
      try {
        await el.play();
        setPlaying(true);
        fadeTo(0.65);
      } catch {
        /* autoplay blocked until gesture — this IS the gesture, so fine */
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="auto" />
      <motion.button
        onClick={toggle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="glass-strong fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full px-4 py-3 text-sm text-cream shadow-soft transition-colors hover:bg-white/15"
        aria-label={playing ? "Pause music" : "Play music"}
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </span>

        <AnimatePresence>
          {playing && (
            <motion.span
              className="flex items-end gap-[3px]"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.span
                  key={i}
                  className="w-[3px] rounded-full bg-gradient-to-t from-pink to-lavender"
                  animate={{ height: [6, 18, 9, 16, 6] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.12,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.span>
          )}
          {!playing && <Music size={15} className="text-pink-soft/80" />}
        </AnimatePresence>
      </motion.button>
    </>
  );
}

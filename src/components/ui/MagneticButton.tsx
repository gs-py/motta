import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Magnetic button: subtly follows the cursor, with a sweeping shine
 * and a glowing gradient border. Pure CSS shine, spring-driven magnet.
 */
export function MagneticButton({
  children,
  onClick,
  className,
  strength = 0.35,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "group gradient-border relative overflow-hidden rounded-full px-10 py-4 text-sm font-medium uppercase tracking-[0.2em] text-cream",
        className
      )}
    >
      {/* hover wash */}
      <span className="absolute inset-0 bg-gradient-to-r from-pink/25 to-lavender/25 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {/* shine sweep */}
      <span className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-shine bg-[length:60%_100%] bg-no-repeat opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:[animation:shine-sweep_0.9s_ease]" />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}

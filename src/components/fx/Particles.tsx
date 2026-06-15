import { useMemo } from "react";

type Variant = "dust" | "hearts";

/**
 * Deterministic floating particles (no Math.random in render path issues —
 * seeded once via useMemo). Renders glowing dust or floating hearts.
 */
export function Particles({
  count = 40,
  variant = "dust",
}: {
  count?: number;
  variant?: Variant;
}) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        // pseudo-random but stable per index
        const r = (n: number) => {
          const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453;
          return x - Math.floor(x);
        };
        return {
          left: r(1) * 100,
          top: r(2) * 100,
          size: 2 + r(3) * (variant === "hearts" ? 14 : 4),
          delay: r(4) * -8,
          duration: 6 + r(5) * 8,
          opacity: 0.2 + r(6) * 0.6,
        };
      }),
    [count, variant]
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((p, i) => (
        <span
          key={i}
          className="absolute animate-float"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: p.opacity,
          }}
        >
          {variant === "hearts" ? (
            <span
              style={{ fontSize: `${p.size + 6}px` }}
              className="text-pink/70 drop-shadow-[0_0_8px_rgba(255,158,196,0.6)]"
            >
              ❤
            </span>
          ) : (
            <span
              className="block rounded-full bg-gradient-to-br from-pink-soft to-lavender shadow-glow"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                filter: "blur(0.4px)",
              }}
            />
          )}
        </span>
      ))}
    </div>
  );
}

/** Twinkling star field — denser, smaller, slower. */
export function Stars({ count = 80 }: { count?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const r = (n: number) => {
          const x = Math.sin(i * 4.17 + n * 19.19) * 9999;
          return x - Math.floor(x);
        };
        return {
          left: r(1) * 100,
          top: r(2) * 100,
          size: 1 + r(3) * 2,
          delay: r(4) * -4,
        };
      }),
    [count]
  );
  return (
    <div className="pointer-events-none absolute inset-0">
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

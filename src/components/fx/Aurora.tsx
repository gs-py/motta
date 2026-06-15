import { cn } from "@/lib/utils";

/**
 * Layered, slowly-drifting aurora gradient backdrop.
 * Pure CSS — cheap, runs at 60fps, GPU-composited.
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute -inset-[20%] bg-aurora opacity-70 blur-[60px] animate-aurora-shift" />
      <div
        className="absolute -inset-[20%] bg-aurora opacity-40 blur-[90px] animate-aurora-shift"
        style={{ animationDelay: "-6s", animationDuration: "24s" }}
      />
      {/* vignette so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-ink/30 via-transparent to-purple-ink/80" />
    </div>
  );
}

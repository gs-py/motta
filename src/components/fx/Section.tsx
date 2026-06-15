import { type ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/**
 * Standard section shell: vertical rhythm, max width, optional eyebrow + title.
 */
export const Section = forwardRef<
  HTMLElement,
  {
    id?: string;
    eyebrow?: string;
    title?: ReactNode;
    children: ReactNode;
    className?: string;
    contentClassName?: string;
  }
>(({ id, eyebrow, title, children, className, contentClassName }, ref) => {
  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "relative w-full px-6 py-24 sm:py-32 md:py-40",
        className
      )}
    >
      <div className={cn("mx-auto w-full max-w-6xl", contentClassName)}>
        {(eyebrow || title) && (
          <Reveal className="mb-14 text-center sm:mb-20">
            {eyebrow && (
              <p className="mb-4 text-[11px] uppercase tracking-[0.35em] text-pink/80 sm:text-xs">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="text-balance font-serif text-[2.5rem] font-light leading-[1.08] tracking-tight text-cream sm:text-5xl md:text-6xl">
                {title}
              </h2>
            )}
            <div className="divider mt-7" />
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
});

Section.displayName = "Section";

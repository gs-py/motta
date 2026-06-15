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
          <Reveal className="mb-12 text-center sm:mb-16">
            {eyebrow && (
              <p className="mb-3 text-xs uppercase tracking-[0.35em] text-pink/80 sm:text-sm">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-serif text-4xl font-light leading-tight text-cream sm:text-5xl md:text-6xl">
                {title}
              </h2>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
});

Section.displayName = "Section";

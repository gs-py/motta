import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar } from "lucide-react";
import { content, filled, type Meeting } from "@/content";
import { Section } from "../fx/Section";
import { Reveal } from "../fx/Reveal";
import { cn } from "@/lib/utils";

export function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.6", "end 0.4"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const meetings = content.meetings.filter((m) => filled(m.memory));

  return (
    <Section
      id="story"
      eyebrow="Eight times the distance lost"
      title={
        <>
          Our <span className="italic text-pink-soft">eight</span> meetings
        </>
      }
    >
      <div ref={ref} className="relative mx-auto max-w-5xl">
        {/* center rail (desktop) / left rail (mobile) */}
        <div className="absolute left-4 top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-1/2">
          <motion.div
            style={{ scaleY: lineScale, originY: 0 }}
            className="h-full w-full bg-gradient-to-b from-pink via-lavender to-rosegold shadow-glow-lav"
          />
        </div>

        <div className="space-y-16 md:space-y-28">
          {meetings.map((m, i) => (
            <MeetingCard key={i} meeting={m} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function MeetingCard({ meeting, index }: { meeting: Meeting; index: number }) {
  const left = index % 2 === 0;
  return (
    <div
      className={cn(
        "relative flex items-center pl-12 md:pl-0",
        left ? "md:justify-start" : "md:justify-end"
      )}
    >
      {/* node */}
      <span className="absolute left-4 top-2 z-10 -translate-x-1/2 md:left-1/2">
        <span className="relative flex h-4 w-4 items-center justify-center">
          <span className="absolute h-4 w-4 animate-ping rounded-full bg-pink/40" />
          <span className="h-3 w-3 rounded-full bg-gradient-to-br from-pink to-lavender shadow-glow" />
        </span>
      </span>

      <Reveal
        direction={left ? "right" : "left"}
        className={cn("w-full md:w-[46%]")}
      >
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="glass gradient-border group overflow-hidden rounded-3xl shadow-card"
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={meeting.photo}
              alt={meeting.place}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-ink/90 via-purple-ink/10 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-cream/90">
              {filled(meeting.date) && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} className="text-pink-soft" />
                  {meeting.date}
                </span>
              )}
              {filled(meeting.place) && (
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-lavender" />
                  {meeting.place}
                </span>
              )}
            </div>
            <span className="absolute right-4 top-3 font-serif text-5xl font-light text-cream/20">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="p-6">
            <p className="font-serif text-xl font-light leading-relaxed text-cream/90">
              {meeting.memory}
            </p>
          </div>
        </motion.div>
      </Reveal>
    </div>
  );
}

import { motion } from "framer-motion";
import {
  Palette,
  Flower2,
  UtensilsCrossed,
  IceCream,
  Clapperboard,
  Music2,
  Plane,
  Sparkle,
} from "lucide-react";
import { content, filled } from "@/content";
import { Section } from "../fx/Section";
import { Stagger, staggerItem } from "../fx/Reveal";

export function AboutHer() {
  const f = content.favorites;
  const cards = [
    { icon: Palette, label: "Favorite color", value: f.color },
    { icon: Flower2, label: "Favorite flower", value: f.flower },
    { icon: UtensilsCrossed, label: "Favorite food", value: f.food },
    { icon: IceCream, label: "Favorite dessert", value: f.dessert },
    { icon: Clapperboard, label: "On repeat", value: f.movie },
    { icon: Music2, label: "Her song", value: f.song },
    { icon: Plane, label: "Dream destination", value: f.destination },
    { icon: Sparkle, label: "Her hobbies", value: f.hobbies },
  ].filter((c) => filled(c.value));

  return (
    <Section
      id="about"
      eyebrow="Everything that is so her"
      title={
        <>
          The little world of{" "}
          <span className="italic text-pink-soft">Divs</span>
        </>
      }
    >
      <Stagger className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {cards.map(({ icon: Icon, label, value }) => (
          <motion.div
            key={label}
            variants={staggerItem}
            whileHover={{ y: -6 }}
            className="glass gradient-border flex flex-col gap-3 rounded-2xl p-5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink/25 to-lavender/25">
              <Icon size={18} className="text-pink-soft" />
            </span>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-cream/50">
                {label}
              </p>
              <p className="mt-1 font-serif text-lg font-light text-cream/90">
                {value}
              </p>
            </div>
          </motion.div>
        ))}
      </Stagger>
    </Section>
  );
}

import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useLenis } from "./hooks/useLenis";

import { Loader } from "./components/Loader";
import { AudioPlayer } from "./components/AudioPlayer";
import { ScrollProgress } from "./components/fx/ScrollProgress";
import { Cursor } from "./components/fx/Cursor";
import { ChapterNav, type Chapter } from "./components/fx/ChapterNav";

import { Hero } from "./components/sections/Hero";
import { Prologue } from "./components/sections/Prologue";
import { Timeline } from "./components/sections/Timeline";
import { Distance } from "./components/sections/Distance";
import { ByTheNumbers } from "./components/sections/ByTheNumbers";
import { OurYear } from "./components/sections/OurYear";
import { MeVsYou } from "./components/sections/MeVsYou";
import { WhoFeelsWhat } from "./components/sections/WhoFeelsWhat";
import { ReportCard } from "./components/sections/ReportCard";
import { OurMilestones } from "./components/sections/OurMilestones";
import { AboutHer } from "./components/sections/AboutHer";
import { Gallery } from "./components/sections/Gallery";
import { WhyILoveYou } from "./components/sections/WhyILoveYou";
import { MeltMyHeart } from "./components/sections/MeltMyHeart";
import { WordsWeSaid } from "./components/sections/WordsWeSaid";
import { FutureDreams } from "./components/sections/FutureDreams";
import { Letter } from "./components/sections/Letter";
import { Surprise } from "./components/sections/Surprise";
import { Finale } from "./components/sections/Finale";

const CHAPTERS: Chapter[] = [
  { id: "top", label: "Start" },
  { id: "prologue", label: "How we began" },
  { id: "story", label: "Our meetings" },
  { id: "distance", label: "The distance" },
  { id: "numbers", label: "Us in numbers" },
  { id: "rhythm", label: "Our year" },
  { id: "vs", label: "Me vs You" },
  { id: "fingerprint", label: "Who feels what" },
  { id: "report", label: "Report card" },
  { id: "milestones", label: "How we grew" },
  { id: "about", label: "All her" },
  { id: "gallery", label: "Gallery" },
  { id: "why", label: "Why I love you" },
  { id: "melt", label: "Little things" },
  { id: "words", label: "Words we said" },
  { id: "future", label: "Our future" },
  { id: "letter", label: "The letter" },
  { id: "surprise", label: "Surprise" },
  { id: "finale", label: "To my Divs" },
];

export default function App() {
  const [loading, setLoading] = useState(true);
  useLenis(!loading);

  const scrollToStory = useCallback(() => {
    document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const replay = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Loader onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <Cursor />
      <ScrollProgress />
      <ChapterNav chapters={CHAPTERS} />
      <AudioPlayer />

      <main className="grain relative bg-purple-ink">
        {/* persistent deep-space backdrop behind every section */}
        <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-purple-night via-purple-ink to-purple-ink" />
        <div className="pointer-events-none fixed inset-0 bg-mesh opacity-60" />
        {/* edge vignette for cinematic framing */}
        <div className="pointer-events-none fixed inset-0 shadow-[inset_0_0_180px_60px_rgba(8,5,14,0.9)]" />

        <div className="relative">
          <Hero onBegin={scrollToStory} />
          <Prologue />
          <Timeline />
          <Distance />
          <ByTheNumbers />
          <OurYear />
          <MeVsYou />
          <WhoFeelsWhat />
          <ReportCard />
          <OurMilestones />
          <AboutHer />
          <Gallery />
          <WhyILoveYou />
          <MeltMyHeart />
          <WordsWeSaid />
          <FutureDreams />
          <Letter />
          <Surprise />
          <Finale onReplay={replay} />
        </div>
      </main>
    </>
  );
}

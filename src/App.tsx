import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useLenis } from "./hooks/useLenis";

import { Loader } from "./components/Loader";
import { AudioPlayer } from "./components/AudioPlayer";
import { ScrollProgress } from "./components/fx/ScrollProgress";

import { Hero } from "./components/sections/Hero";
import { Prologue } from "./components/sections/Prologue";
import { Timeline } from "./components/sections/Timeline";
import { Distance } from "./components/sections/Distance";
import { AboutHer } from "./components/sections/AboutHer";
import { Gallery } from "./components/sections/Gallery";
import { WhyILoveYou } from "./components/sections/WhyILoveYou";
import { MeltMyHeart } from "./components/sections/MeltMyHeart";
import { FutureDreams } from "./components/sections/FutureDreams";
import { Letter } from "./components/sections/Letter";
import { Surprise } from "./components/sections/Surprise";
import { Finale } from "./components/sections/Finale";

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

      <ScrollProgress />
      <AudioPlayer />

      <main className="relative bg-purple-ink">
        {/* persistent deep-space backdrop behind every section */}
        <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-purple-night via-purple-ink to-purple-ink" />

        <div className="relative">
          <Hero onBegin={scrollToStory} />
          <Prologue />
          <Timeline />
          <Distance />
          <AboutHer />
          <Gallery />
          <WhyILoveYou />
          <MeltMyHeart />
          <FutureDreams />
          <Letter />
          <Surprise />
          <Finale onReplay={replay} />
        </div>
      </main>
    </>
  );
}

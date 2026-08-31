import { useEffect } from "react";
import Navbar from "./components/Navbar";
import MusicPlayer from "./components/MusicPlayer";
import Socials from "./components/Socials";
import ThemeEditor from "./components/ThemeEditor";
import CursorTrail from "./components/CursorTrail";
import CodeRain from "./components/CodeRain";
import LoadingScreen from "./components/LoadingScreen";
import CommandPalette from "./components/CommandPalette";
import Hero from "./pages/Hero";
import Journey from "./pages/Journey";
import Showcase from "./pages/Showcase";
import TechStack from "./pages/TechStack";
import Terminal from "./pages/Terminal";
import Contact from "./pages/Contact";

function App() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-white/20 selection:text-white relative">
      {/* Loading screen — shown once per session */}
      <LoadingScreen />

      {/* Futuristic Command Palette (Ctrl + K) */}
      <CommandPalette />

      {/* Custom cursor trail */}
      <CursorTrail />

      {/* Global code rain background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CodeRain />
      </div>

      <Navbar />
      <MusicPlayer />
      <Socials />
      <ThemeEditor />

      <main className="relative z-10">
        <Hero id="home" />
        <Journey id="journey" />
        <Showcase id="showcase" />
        <TechStack id="techstack" />
        <Terminal id="terminal" />
        <Contact id="contact" />
      </main>
    </div>
  );
}

export default App;

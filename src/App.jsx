import Navbar from "./components/Navbar";
import MusicPlayer from "./components/MusicPlayer";
import Socials from "./components/Socials";
import ThemeEditor from "./components/ThemeEditor";
import CustomCursor from "./components/CustomCursor";
import Particles from "./components/Particles";
import Hero from "./pages/Hero";
import Journey from "./pages/Journey";
import Showcase from "./pages/Showcase";
import TechStack from "./pages/TechStack";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="bg-primary-900 min-h-screen text-white font-sans selection:bg-accent-blue/30 selection:text-white relative overflow-x-hidden">
      <CustomCursor />
      
      {/* Global Particle Background */}
      <div className="fixed inset-0 z-0">
        <Particles />
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
        <Contact id="contact" />
      </main>
    </div>
  );
}

export default App;

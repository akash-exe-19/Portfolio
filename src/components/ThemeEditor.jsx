import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, X, Camera, Maximize, Link2, Sun, Moon } from "lucide-react";
import html2canvas from "html2canvas";

const themes = [
  { name: "Cyber Blue", hex: "#00d2ff" },
  { name: "Neon Purple", hex: "#7a2cb3" },
  { name: "Emerald", hex: "#10b981" },
  { name: "Firebrick", hex: "#ef4444" },
  { name: "Sunset", hex: "#f97316" },
  { name: "Hot Pink", hex: "#ec4899" },
  { name: "Gold", hex: "#fbbf24" },
  { name: "Lime", hex: "#84cc16" },
];

const ThemeEditor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeColor, setActiveColor] = useState("#ef4444");
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    setIsLightMode(document.documentElement.classList.contains('light-theme'));
  }, []);

  const changeTheme = (hexCode) => {
    setActiveColor(hexCode);
    document.documentElement.style.setProperty('--color-accent-blue', hexCode);
  };

  const toggleLightMode = () => {
    if (isLightMode) {
      document.documentElement.classList.remove('light-theme');
      setIsLightMode(false);
    } else {
      document.documentElement.classList.add('light-theme');
      setIsLightMode(true);
    }
  };

  const takeScreenshot = async () => {
    try {
      const canvas = await html2canvas(document.body, {
        useCORS: true,
        backgroundColor: null
      });
      const image = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = image;
      a.download = "Akash_Portfolio_Screenshot.png";
      a.click();
    } catch (err) {
      console.error("Screenshot failed:", err);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
      document.exitFullscreen();
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 py-6 px-2 rounded-l-xl glass-panel bg-primary-900/60 backdrop-blur-md border border-white/10 border-r-0 shadow-[-10px_0_30px_-10px_rgba(0,0,0,0.5)] transition-all cursor-pointer text-white/60 hover:text-accent-blue ${isOpen ? 'translate-x-full' : 'translate-x-0'}`}
        aria-label="Open Theme Editor"
      >
        <div style={{ writingMode: 'vertical-rl' }} className="text-xs font-bold tracking-[0.3em] uppercase">
          Themes
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-[60] p-6 rounded-l-3xl glass-panel bg-primary-900/80 backdrop-blur-xl border border-white/10 border-r-0 shadow-[-20px_0_50px_-10px_rgba(0,0,0,0.5)] w-64"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Palette size={18} className="text-accent-blue" /> Theme
              </h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/50 hover:text-white transition-colors cursor-pointer p-1"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-white/60 uppercase tracking-widest font-medium mb-2">Preset Colors</p>
              <div className="flex flex-wrap gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => changeTheme(theme.hex)}
                    className={`w-8 h-8 rounded-full border-2 transition-all cursor-pointer ${
                      activeColor === theme.hex ? 'border-white scale-110 shadow-[0_0_15px_-2px_currentColor]' : 'border-transparent hover:scale-110'
                    }`}
                    style={{ backgroundColor: theme.hex, color: theme.hex }}
                    title={theme.name}
                    aria-label={`Set theme to ${theme.name}`}
                  />
                ))}
              </div>

              <div className="pt-4 border-t border-white/10 mt-4">
                <p className="text-sm text-white/60 uppercase tracking-widest font-medium mb-3">Custom Color</p>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={activeColor}
                    onChange={(e) => changeTheme(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer bg-transparent border-0 p-0 color-input"
                    aria-label="Custom Color Picker"
                  />
                  <span className="text-sm font-mono text-white/80 uppercase">{activeColor}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 mt-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-white/60 uppercase tracking-widest font-medium m-0">Mode</p>
                  <button 
                    onClick={toggleLightMode}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent-blue transition-all text-white/80 hover:text-white cursor-pointer flex items-center justify-center"
                    title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
                  >
                    {isLightMode ? <Moon size={18} /> : <Sun size={18} />}
                  </button>
                </div>
                <p className="text-sm text-white/60 uppercase tracking-widest font-medium mb-3 mt-4">Tools</p>
                <div className="flex gap-3">
                  <button 
                    onClick={takeScreenshot}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent-blue transition-all text-white/80 hover:text-white cursor-pointer"
                    title="Take Screenshot"
                  >
                    <Camera size={18} />
                  </button>
                  <button 
                    onClick={toggleFullscreen}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent-blue transition-all text-white/80 hover:text-white cursor-pointer"
                    title="Toggle Fullscreen"
                  >
                    <Maximize size={18} />
                  </button>
                  <button 
                    onClick={copyLink}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent-blue transition-all text-white/80 hover:text-white cursor-pointer"
                    title="Copy Link"
                  >
                    <Link2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThemeEditor;

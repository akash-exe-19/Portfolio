import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Maximize, Link2 } from "lucide-react";
import html2canvas from "html2canvas";

const themes = [
  { name: "Red", hex: "#ef4444" },
  { name: "Cyan", hex: "#00d2ff" },
  { name: "Purple", hex: "#7a2cb3" },
  { name: "Green", hex: "#10b981" },
  { name: "Pink", hex: "#ec4899" },
  { name: "Orange", hex: "#f97316" },
  { name: "Gold", hex: "#fbbf24" },
  { name: "Lime", hex: "#84cc16" },
];

const ThemeEditor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeColor, setActiveColor] = useState("#ef4444");

  const changeTheme = (hex) => {
    setActiveColor(hex);
    document.documentElement.style.setProperty("--color-accent-blue", hex);
  };

  const takeScreenshot = async () => {
    try {
      const canvas = await html2canvas(document.body, { useCORS: true, backgroundColor: null });
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = "Akash_Portfolio.png";
      a.click();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(console.log);
    else document.exitFullscreen();
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <>
      {/* Trigger tab */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-50 py-6 px-2 border border-white/10 border-r-0 bg-black transition-all cursor-pointer text-white/40 hover:text-white hover:border-white/30 ${isOpen ? "translate-x-full" : "translate-x-0"}`}
        aria-label="Open Theme Editor"
      >
        <div style={{ writingMode: "vertical-rl" }} className="text-[10px] font-mono tracking-[0.4em] uppercase">
          THEMES
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[59]"
              onClick={() => setIsOpen(false)}
            />
            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed right-0 top-0 bottom-0 z-[60] w-64 bg-black border-l border-white/10 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <span className="font-mono text-xs tracking-[0.3em] uppercase text-white/60">THEMES</span>
                <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white cursor-pointer">
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
                {/* Color swatches */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-4">ACCENT COLOR</p>
                  <div className="grid grid-cols-4 gap-2">
                    {themes.map((t) => (
                      <button
                        key={t.name}
                        onClick={() => changeTheme(t.hex)}
                        title={t.name}
                        className={`w-full aspect-square border transition-all cursor-pointer ${
                          activeColor === t.hex ? "border-white scale-95" : "border-transparent hover:border-white/40"
                        }`}
                        style={{ backgroundColor: t.hex }}
                        aria-label={t.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Custom color */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-4">CUSTOM HEX</p>
                  <div className="flex items-center gap-3 border border-white/10 p-3">
                    <input
                      type="color"
                      value={activeColor}
                      onChange={(e) => changeTheme(e.target.value)}
                      className="w-8 h-8 border-0 bg-transparent cursor-pointer"
                      aria-label="Custom color"
                    />
                    <span className="font-mono text-xs text-white/60 uppercase tracking-widest">{activeColor}</span>
                  </div>
                </div>

                {/* Tools */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-4">TOOLS</p>
                  <div className="flex gap-2">
                    {[
                      { icon: Camera, label: "Screenshot", action: takeScreenshot },
                      { icon: Maximize, label: "Fullscreen", action: toggleFullscreen },
                      { icon: Link2, label: "Copy Link", action: copyLink },
                    ].map(({ icon: Icon, label, action }) => (
                      <button
                        key={label}
                        onClick={action}
                        title={label}
                        className="flex-1 py-3 border border-white/10 text-white/40 hover:border-white/40 hover:text-white transition-all cursor-pointer flex justify-center"
                      >
                        <Icon size={16} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Active color preview strip */}
              <div className="h-1 w-full" style={{ backgroundColor: "var(--color-accent-blue)" }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ThemeEditor;

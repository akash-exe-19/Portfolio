import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, ArrowRight, Volume2, VolumeX, Camera, Maximize, Copy, Hash, Box, Terminal as TerminalIcon } from "lucide-react";
import { sfx } from "../utils/sfx";

const COMMAND_ITEMS = [
  { id: "home", title: "Jump to Home", category: "Navigation", icon: Hash, action: () => scrollToSection("home") },
  { id: "journey", title: "Jump to Journey", category: "Navigation", icon: Hash, action: () => scrollToSection("journey") },
  { id: "showcase", title: "Jump to Showcase", category: "Navigation", icon: Hash, action: () => scrollToSection("showcase") },
  { id: "mesh-playground", title: "Jump to 3D Mesh Playground", category: "Navigation", icon: Box, action: () => scrollToSection("mesh-playground") },
  { id: "techstack", title: "Jump to Tech Stack", category: "Navigation", icon: Hash, action: () => scrollToSection("techstack") },
  { id: "terminal", title: "Jump to Terminal", category: "Navigation", icon: TerminalIcon, action: () => scrollToSection("terminal") },
  { id: "contact", title: "Jump to Contact", category: "Navigation", icon: Hash, action: () => scrollToSection("contact") },
  
  { id: "theme-red", title: "Theme: Red", category: "Appearance", icon: Command, action: () => setTheme("#ef4444") },
  { id: "theme-cyan", title: "Theme: Cyan", category: "Appearance", icon: Command, action: () => setTheme("#00d2ff") },
  { id: "theme-purple", title: "Theme: Purple", category: "Appearance", icon: Command, action: () => setTheme("#7a2cb3") },
  { id: "theme-green", title: "Theme: Emerald", category: "Appearance", icon: Command, action: () => setTheme("#10b981") },
  
  { id: "copy-email", title: "Copy Email Address", category: "Actions", icon: Copy, action: () => copyEmail() },
  { id: "toggle-sfx", title: "Toggle UI Sound Effects", category: "Actions", icon: Volume2, action: () => toggleSFX() },
  { id: "fullscreen", title: "Toggle Fullscreen", category: "Actions", icon: Maximize, action: () => toggleFullscreen() },
];

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const setTheme = (color) => {
  document.documentElement.style.setProperty("--color-accent-blue", color);
};

const copyEmail = () => {
  navigator.clipboard.writeText("akash19cbe@gmail.com");
  alert("Email copied to clipboard!");
};

const toggleSFX = () => {
  sfx.toggleMute();
};

const toggleFullscreen = () => {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
  else document.exitFullscreen();
};

const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const filteredItems = COMMAND_ITEMS.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        sfx.playClick();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const executeItem = (item) => {
    sfx.playCommand();
    item.action();
    setIsOpen(false);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      sfx.playHover();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      sfx.playHover();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      executeItem(filteredItems[selectedIndex]);
    }
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) */}
      <button
        onClick={() => {
          sfx.playClick();
          setIsOpen(true);
        }}
        onMouseEnter={() => sfx.playHover()}
        className="fixed bottom-6 right-6 z-40 px-3.5 py-2 border border-white/15 bg-black/80 backdrop-blur-md font-mono text-xs text-white/60 hover:text-white hover:border-accent-blue transition-all hidden sm:flex items-center gap-2 cursor-pointer shadow-2xl"
        title="Open Command Palette (Ctrl + K)"
      >
        <Command size={14} className="text-accent-blue" />
        <span>COMMAND [ Ctrl + K ]</span>
      </button>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl flex justify-center items-start pt-20 px-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-xl border border-white/20 bg-black shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Search Bar Input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
                <Search size={18} className="text-accent-blue shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Type a command or search..."
                  className="w-full bg-transparent border-none outline-none font-mono text-sm text-white caret-accent-blue placeholder:text-white/30"
                />
                <span className="font-mono text-[10px] text-white/30 border border-white/10 px-2 py-0.5 uppercase shrink-0">
                  ESC
                </span>
              </div>

              {/* Items List */}
              <div className="max-h-80 overflow-y-auto p-2">
                {filteredItems.length > 0 ? (
                  filteredItems.map((item, index) => {
                    const isSelected = index === selectedIndex;
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.id}
                        onClick={() => executeItem(item)}
                        onMouseEnter={() => {
                          sfx.playHover();
                          setSelectedIndex(index);
                        }}
                        className={`flex items-center justify-between px-4 py-3 cursor-pointer font-mono text-xs transition-colors ${
                          isSelected
                            ? "bg-white/10 text-white border-l-2 border-accent-blue"
                            : "text-white/60 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={14} className={isSelected ? "text-accent-blue" : "text-white/40"} />
                          <span>{item.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-white/30 uppercase">{item.category}</span>
                          {isSelected && <ArrowRight size={12} className="text-accent-blue" />}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center font-mono text-xs text-white/40">
                    NO COMMANDS MATCHING "{query.toUpperCase()}"
                  </div>
                )}
              </div>

              {/* Footer Bar */}
              <div className="bg-white/5 border-t border-white/10 px-5 py-2.5 flex justify-between items-center font-mono text-[10px] text-white/30">
                <span>↑↓ SELECT · ENTER TO EXECUTE</span>
                <span>AKASH.SYSTEM</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandPalette;

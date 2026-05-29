import { useState, useRef, useEffect, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio("https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    // Attempt autoplay
    audioRef.current.play().then(() => {
      setIsPlaying(true);
    }).catch((error) => {
      console.warn("Autoplay prevented by browser. User must interact first.", error);
      setIsPlaying(false);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => console.error("Audio playback failed:", error));
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  const handleWheel = useCallback((e) => {
    e.preventDefault();
    setVolume((prev) => {
      const delta = e.deltaY > 0 ? -0.05 : 0.05;
      const newVolume = Math.min(Math.max(prev + delta, 0), 1);
      if (audioRef.current) audioRef.current.volume = newVolume;
      return newVolume;
    });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.addEventListener("wheel", handleWheel, { passive: false });
      return () => el.removeEventListener("wheel", handleWheel);
    }
  }, [handleWheel]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-6 right-6 z-50 flex flex-col items-center justify-start p-3 rounded-full glass-panel bg-primary-900/60 backdrop-blur-md border border-white/10 shadow-xl group hover:shadow-[0_0_30px_-5px_color-mix(in_srgb,var(--color-accent-blue)_40%,transparent)] transition-shadow duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={togglePlay}
        className="flex items-center justify-center text-white transition-all cursor-pointer relative"
        aria-label="Toggle Music"
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-full blur-md bg-accent-blue/0 group-hover:bg-accent-blue/40 transition-colors duration-300 pointer-events-none scale-150" />
        
        {isPlaying ? (
          <Volume2 size={22} className="text-accent-blue relative z-10" />
        ) : (
          <VolumeX size={22} className="text-white/60 group-hover:text-white relative z-10" />
        )}
      </button>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 100, opacity: 1, marginTop: 12 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center overflow-hidden w-full"
          >
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.01" 
              value={volume}
              onChange={handleVolumeChange}
              className="w-1.5 h-[90%] bg-white/20 rounded-lg appearance-none cursor-ns-resize accent-accent-blue"
              style={{ WebkitAppearance: 'slider-vertical', writingMode: 'bt-lr' }}
              aria-label="Volume Control"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MusicPlayer;

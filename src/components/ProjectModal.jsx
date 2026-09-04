import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Code2, Terminal, Sparkles, Image as ImageIcon, ChevronRight } from "lucide-react";
import { sfx } from "../utils/sfx";

const ProjectModal = ({ project, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Lock body scroll when modal is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow || "auto";
    };
  }, []);

  // Handle ESC key press to close modal or expanded preview
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (selectedImage) {
          setSelectedImage(null);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, selectedImage]);

  if (!project) return null;

  const details = project.details || {};

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[150] bg-black/90 backdrop-blur-xl flex justify-center items-center p-4 md:p-8 overflow-hidden"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="w-full max-w-4xl max-h-[90vh] border border-white/20 bg-black shadow-2xl flex flex-col overflow-hidden text-white"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="bg-white/5 border-b border-white/10 px-5 py-3.5 flex justify-between items-center shrink-0 font-mono text-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="text-white/40 tracking-wider">
                system://manifests/proj_{String(project.id).padStart(2, "0")}.json
              </span>
            </div>
            <button
              onClick={() => {
                sfx.playClick();
                onClose();
              }}
              className="p-1.5 border border-white/20 hover:border-accent-blue text-white/70 hover:text-white transition-all cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto overscroll-contain p-6 md:p-10 space-y-8 font-sans">
            {/* 1. TITLE & TAGLINE */}
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-accent-blue tracking-widest uppercase mb-2">
                <Terminal size={14} />
                <span>[ PROJECT MANIFEST #0{project.id} ]</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white display-text">
                {project.title}
              </h2>
              {details.tagline && (
                <p className="font-mono text-xs md:text-sm text-white/50 mt-2">
                  {details.tagline}
                </p>
              )}
            </div>

            {/* IN DEVELOPMENT NOTICE BANNER */}
            {project.inDevelopment && (
              <div className="border border-amber-500/40 bg-amber-500/10 p-4 font-mono text-xs text-amber-400 flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                <span>PROJECT IN DEVELOPMENT · Codebase, algorithms, and documentation are under active engineering.</span>
              </div>
            )}

            {/* 2. RELATED LINKS ROW */}
            <div className="flex flex-wrap gap-3 font-mono text-xs pt-2 border-t border-b border-white/10 py-4">
              <span className="text-white/40 flex items-center gap-1 uppercase tracking-widest shrink-0 self-center mr-2">
                <ChevronRight size={14} className="text-accent-blue" /> LINKS:
              </span>
              {project.inDevelopment ? (
                <div className="inline-flex items-center gap-2 border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-amber-400 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>PROJECT IN DEVELOPMENT</span>
                </div>
              ) : (
                <>
                  {project.github && project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sfx.playClick()}
                      className="inline-flex items-center gap-2 border border-accent-blue/50 px-4 py-2 text-accent-blue hover:bg-accent-blue hover:text-black transition-all font-bold cursor-pointer"
                    >
                      <Code2 size={14} />
                      <span>GITHUB REPOSITORY ↗</span>
                    </a>
                  )}
                  {project.link && project.link !== "#" && project.link !== project.github && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sfx.playClick()}
                      className="inline-flex items-center gap-2 border border-white/20 px-4 py-2 text-white hover:border-white transition-all cursor-pointer"
                    >
                      <ExternalLink size={14} />
                      <span>LIVE DEMO ↗</span>
                    </a>
                  )}
                </>
              )}
            </div>

            {/* 3. ABOUT THE PROJECT (OVERVIEW) */}
            <div className="space-y-3">
              <h3 className="font-mono text-xs uppercase tracking-widest text-accent-blue flex items-center gap-2">
                <Sparkles size={14} />
                <span>[ ABOUT THE PROJECT ]</span>
              </h3>
              <p className="text-sm md:text-base text-white/80 leading-relaxed font-sans font-normal">
                {details.overview || project.description}
              </p>
            </div>

            {/* 4. KEY FEATURES & EMBEDDED PHOTOS */}
            {details.features && details.features.length > 0 && (
              <div className="space-y-6 pt-4 border-t border-white/10">
                <h3 className="font-mono text-xs uppercase tracking-widest text-white/60 flex items-center gap-2">
                  <ImageIcon size={14} className="text-accent-blue" />
                  <span>[ KEY FEATURES & SCREENSHOTS ]</span>
                </h3>

                <div className="grid grid-cols-1 gap-8">
                  {details.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="border border-white/10 bg-white/5 p-5 md:p-6 space-y-4 rounded-none"
                    >
                      <h4 className="font-bold text-base md:text-lg text-white flex items-center gap-2">
                        <span className="font-mono text-xs text-accent-blue">0{idx + 1}.</span>
                        {feature.name}
                      </h4>
                      <p className="font-mono text-xs md:text-sm text-white/70 leading-relaxed">
                        {feature.desc}
                      </p>

                      {/* Single Feature Image */}
                      {feature.image && (
                        <div
                          onClick={() => setSelectedImage(feature.image)}
                          className="mt-3 border border-white/15 overflow-hidden relative group cursor-pointer bg-black"
                        >
                          <img
                            src={feature.image}
                            alt={feature.name}
                            className="w-full max-h-96 object-contain group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-mono text-xs text-white">
                            [ CLICK TO EXPAND PHOTO ]
                          </div>
                        </div>
                      )}

                      {/* Multiple Feature Images */}
                      {feature.images && feature.images.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                          {feature.images.map((img, imgIdx) => (
                            <div
                              key={imgIdx}
                              onClick={() => setSelectedImage(img)}
                              className="border border-white/15 overflow-hidden relative group cursor-pointer bg-black h-64 flex items-center justify-center p-2"
                            >
                              <img
                                src={img}
                                alt={`${feature.name} ${imgIdx + 1}`}
                                className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-mono text-xs text-white">
                                [ CLICK TO EXPAND ]
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. TECH STACK FLAGS */}
            <div className="pt-4 border-t border-white/10 font-mono text-xs">
              <p className="text-white/40 uppercase tracking-widest mb-3">--stack & dependencies</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 border border-white/15 bg-white/5 text-white font-mono text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div className="bg-white/5 border-t border-white/10 px-6 py-3 flex justify-between items-center font-mono text-[10px] text-white/40 shrink-0">
            <span>PRESS ESC TO CLOSE</span>
            <span>STATUS: ACTIVE_MANIFEST</span>
          </div>
        </motion.div>

        {/* FULL IMAGE EXPAND LIGHTBOX */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <img
              src={selectedImage}
              alt="Expanded preview"
              className="max-w-full max-h-[90vh] object-contain border border-white/20"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-2 border border-white/20 text-white hover:text-accent-blue font-mono text-xs"
            >
              [ CLOSE PREVIEW ]
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;

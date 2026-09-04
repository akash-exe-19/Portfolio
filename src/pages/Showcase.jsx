import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedLayout from "../components/AnimatedLayout";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import CanvasSandbox from "../components/CanvasSandbox";
import { graphicsData, categories } from "../data/graphicsData";
import { projectData } from "../data/projectData";
import { ChevronLeft, ChevronRight, X, Maximize2, Layers, Download } from "lucide-react";

const Showcase = ({ id = "showcase" }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeItem, setActiveItem] = useState(null); // For Lightbox modal
  const [selectedProject, setSelectedProject] = useState(null); // For Project detail modal
  const scrollContainerRef = useRef(null);

  const filteredGraphics = selectedCategory === "All" 
    ? graphicsData 
    : graphicsData.filter(g => g.category === selectedCategory);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <AnimatedLayout id={id}>
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* ================================================================= */}
        {/* PART A: GRAPHIC DESIGN FILM STRIP GALLERY                        */}
        {/* ================================================================= */}
        <section>
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase mb-3 text-accent-blue">
                [ DESIGN GALLERY ]
              </p>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white display-text">
                GRAPHIC WORK
              </h2>
              <p className="font-mono text-xs md:text-sm text-white/40 mt-3 max-w-lg">
                Brand identities, posters, banners, and 3D concept art.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      if (scrollContainerRef.current) {
                        scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
                      }
                    }}
                    className={`font-mono text-xs px-3.5 py-2 uppercase tracking-widest transition-all cursor-pointer border ${
                      isActive
                        ? "border-accent-blue text-accent-blue bg-white/5"
                        : "border-white/10 text-white/40 hover:border-white/30 hover:text-white"
                    }`}
                  >
                    [ {cat} ]
                  </button>
                );
              })}
            </div>
          </div>

          {/* Film Strip Gallery Controls Bar */}
          <div className="flex justify-between items-center mb-4 px-2 font-mono text-xs text-white/30">
            <div className="flex items-center gap-2">
              <Layers size={14} className="text-accent-blue" />
              <span>TOTAL: {filteredGraphics.length} ITEMS</span>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <span>← DRAG OR SCROLL TO EXPLORE →</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleScroll("left")}
                className="p-2 border border-white/10 text-white/60 hover:border-white/40 hover:text-white transition-all cursor-pointer"
                title="Scroll Left"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => handleScroll("right")}
                className="p-2 border border-white/10 text-white/60 hover:border-white/40 hover:text-white transition-all cursor-pointer"
                title="Scroll Right"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Draggable / Scrollable Horizontal Film Strip */}
          {filteredGraphics.length > 0 ? (
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-none scroll-smooth select-none cursor-grab active:cursor-grabbing"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {filteredGraphics.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => setActiveItem(item)}
                  className="w-72 md:w-80 h-[26rem] shrink-0 snap-start border border-white/15 bg-black relative group overflow-hidden cursor-pointer flex flex-col justify-between"
                >
                  {/* Top Spec Header Bar */}
                  <div className="p-3 bg-white/5 border-b border-white/10 flex justify-between items-center z-10">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                      ID: #{String(item.id).padStart(2, "0")}
                    </span>
                    <div className="flex items-center gap-1.5 font-mono text-[10px]">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: item.themeColor }}
                      />
                      <span className="text-white/40 uppercase">{item.category}</span>
                    </div>
                  </div>

                  {/* Image Display Container */}
                  <div className="relative flex-1 w-full flex items-center justify-center p-4 overflow-hidden bg-black/40">
                    <div
                      className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 blur-2xl pointer-events-none scale-75"
                      style={{ backgroundColor: item.themeColor }}
                    />
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-w-full max-h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105 z-10"
                      loading="lazy"
                    />

                    {/* Hover Spec Overlay Icon */}
                    <div className="absolute top-4 right-4 z-20 p-2 border border-white/20 bg-black/80 text-white/80 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Maximize2 size={14} />
                    </div>
                  </div>

                  {/* Bottom Info Bar */}
                  <div className="p-4 bg-black border-t border-white/10 z-10 flex justify-between items-end">
                    <div className="flex-1 min-w-0 pr-2">
                      <h3 className="font-bold text-base text-white group-hover:text-accent-blue transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="font-mono text-[10px] text-white/40 tracking-wider mt-1 uppercase">
                        COLOR: {item.themeColor}
                      </p>
                      {item.category === "3D Models" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            alert("Blender file download coming soon!");
                          }}
                          className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider border border-white/20 px-2 py-1 text-white/80 hover:border-accent-blue hover:text-accent-blue transition-all cursor-pointer bg-white/5"
                          title="Download .BLEND File"
                        >
                          <Download size={12} />
                          <span>[ DOWNLOAD .BLEND ]</span>
                        </button>
                      )}
                    </div>
                    <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest shrink-0">
                      [ {index + 1}/{filteredGraphics.length} ]
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="w-full h-64 border border-white/10 bg-black flex justify-center items-center">
              <p className="font-mono text-xs text-white/40 uppercase tracking-widest">
                NO DESIGNS FOUND IN THIS CATEGORY.
              </p>
            </div>
          )}
        </section>

        {/* ================================================================= */}
        {/* INTERACTIVE 3D MESH PLAYGROUND                                    */}
        {/* ================================================================= */}
        <section id="mesh-playground">
          <CanvasSandbox />
        </section>

        {/* ================================================================= */}
        {/* PART B: ENGINEERING & APPS (CYBER TERMINAL CARDS)                */}
        {/* ================================================================= */}
        <section>
          <div className="mb-12">
            <p className="font-mono text-xs tracking-[0.3em] uppercase mb-3 text-accent-blue">
              [ ENGINEERING ]
            </p>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white display-text">
              SYSTEMS & APPS
            </h2>
            <p className="font-mono text-xs md:text-sm text-white/40 mt-3 max-w-lg">
              Full-stack applications, mobile apps, and interactive web experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectData.map((project, index) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={project.id}
              >
                <ProjectCard
                  project={project}
                  onSelectProject={(p) => setSelectedProject(p)}
                />
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* ================================================================= */}
      {/* FLOATING PROJECT DETAIL MODAL                                     */}
      {/* ================================================================= */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* ================================================================= */}
      {/* LIGHTBOX MODAL FOR HIGH-RES INSPECTION                           */}
      {/* ================================================================= */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-6 md:p-12"
            onClick={() => setActiveItem(null)}
          >
            {/* Modal Header Bar */}
            <div className="flex justify-between items-center w-full max-w-7xl mx-auto z-10">
              <div className="font-mono text-xs text-white/60 tracking-widest">
                <span className="text-accent-blue mr-2">[ INSPECTING ]</span>
                <span className="text-white font-bold">{activeItem.title}</span>
              </div>
              <button
                className="p-2.5 border border-white/20 text-white hover:border-accent-blue hover:text-accent-blue transition-all cursor-pointer"
                onClick={() => setActiveItem(null)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Main Image */}
            <div className="relative flex-1 flex items-center justify-center my-6 overflow-hidden">
              <div
                className="absolute inset-0 blur-[120px] opacity-20 pointer-events-none scale-50"
                style={{ backgroundColor: activeItem.themeColor }}
              />
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", bounce: 0.15, duration: 0.4 }}
                src={activeItem.image}
                alt={activeItem.title}
                className="max-w-full max-h-full object-contain cursor-default drop-shadow-2xl border border-white/10"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Modal Footer Info Bar */}
            <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center border-t border-white/10 pt-4 gap-4 z-10 font-mono text-xs">
              <div className="flex items-center gap-4 text-white/60 flex-wrap">
                <span>CATEGORY: <strong className="text-white">{activeItem.category}</strong></span>
                <span>COLOR: <strong style={{ color: activeItem.themeColor }}>{activeItem.themeColor}</strong></span>
                {activeItem.category === "3D Models" && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert("Blender file download coming soon!");
                    }}
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest border border-accent-blue px-3.5 py-1.5 text-accent-blue hover:bg-accent-blue hover:text-black transition-all cursor-pointer"
                  >
                    <Download size={14} />
                    <span>[ DOWNLOAD .BLEND FILE ]</span>
                  </button>
                )}
              </div>
              <span className="text-white/30 uppercase tracking-widest">PRESS ESC OR CLICK ANYWHERE TO CLOSE</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedLayout>
  );
};

export default Showcase;

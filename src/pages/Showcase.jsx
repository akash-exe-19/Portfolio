import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedLayout from "../components/AnimatedLayout";
import Dropdown from "../components/Dropdown";
import ProjectCard from "../components/ProjectCard";
import { graphicsData, categories } from "../data/graphicsData";
import { projectData } from "../data/projectData";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const Showcase = ({ id = "showcase" }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  
  const filteredGraphics = selectedCategory === "All" 
    ? graphicsData 
    : graphicsData.filter(g => g.category === selectedCategory);

  // Reset carousel index when switching categories
  useEffect(() => {
    setDirection(1);
    setCurrentIndex(0);
  }, [selectedCategory]);

  const scrollLeft = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? filteredGraphics.length - 1 : prev - 1));
  };

  const scrollRight = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === filteredGraphics.length - 1 ? 0 : prev + 1));
  };
  
  // Auto-scroll logic (every 3 seconds)
  useEffect(() => {
    if (isLightboxOpen || filteredGraphics.length <= 1 || isHovered) return;
    
    const intervalId = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev === filteredGraphics.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(intervalId);
  }, [isLightboxOpen, filteredGraphics.length, isHovered]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.95
    })
  };
  
  return (
    <AnimatedLayout id={id}>
      <div className="max-w-7xl mx-auto space-y-32">
        
        {/* Part A: Graphic Design Showcase */}
        <section>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-black mb-4">Design Portfolio</h2>
              <p className="text-white/60 max-w-lg">
                A collection of my graphic design work, ranging from brand identities to 3D concept art.
              </p>
            </div>
            <Dropdown 
              categories={categories} 
              selectedCategory={selectedCategory} 
              onSelect={setSelectedCategory} 
            />
          </div>

          <div 
            className="relative group/carousel flex justify-center items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Navigation Arrows */}
            {filteredGraphics.length > 1 && (
              <>
                <button 
                  onClick={scrollLeft}
                  className="absolute left-4 md:-left-6 z-10 p-3 rounded-full bg-primary-900 border border-white/10 text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-white/10 cursor-pointer shadow-xl"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={scrollRight}
                  className="absolute right-4 md:-right-6 z-10 p-3 rounded-full bg-primary-900 border border-white/10 text-white opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 hover:bg-white/10 cursor-pointer shadow-xl"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Single Active Item Container */}
            <div 
              className="w-full max-w-5xl aspect-video md:aspect-[21/9] relative cursor-pointer flex justify-center items-center overflow-hidden rounded-2xl" 
              onClick={() => setIsLightboxOpen(true)}
            >
              <AnimatePresence initial={false} custom={direction}>
                {filteredGraphics.length > 0 && (
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute w-full h-full flex justify-center items-center p-4 md:p-8"
                  >
                    {/* Dynamic Glow Behind Image */}
                    <div 
                      className="absolute inset-0 rounded-full blur-[100px] opacity-30 transition-colors duration-700 pointer-events-none scale-75"
                      style={{ backgroundColor: filteredGraphics[currentIndex].themeColor }}
                    />
                    <img 
                      src={filteredGraphics[currentIndex].image} 
                      alt={filteredGraphics[currentIndex].title} 
                      className="max-w-full max-h-full object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105 z-10 relative"
                      loading="lazy"
                    />
                    <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 flex justify-between items-end z-20 pointer-events-none">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white drop-shadow-lg">{filteredGraphics[currentIndex].title}</h3>
                        <span className="text-accent-blue text-sm md:text-md font-medium px-3 py-1 bg-primary-900/50 backdrop-blur-md rounded-full border border-white/10 shadow-lg">
                          {filteredGraphics[currentIndex].category}
                        </span>
                      </div>
                      <span className="text-white/40 text-sm font-medium tracking-widest uppercase hidden md:block">
                        {currentIndex + 1} / {filteredGraphics.length}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Part B: Project Showcase */}
        <section>
          <div className="mb-12">
            <h2 className="text-4xl font-black mb-4">Engineering & Apps</h2>
            <p className="text-white/60 max-w-lg">
              Full-stack applications, mobile apps, and interactive web experiences engineered for performance and scalability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectData.map((project, index) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                key={project.id}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && filteredGraphics.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-primary-900/95 backdrop-blur-xl flex justify-center items-center p-4 md:p-12 cursor-zoom-out"
            onClick={() => setIsLightboxOpen(false)}
          >
            <button 
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all z-10 cursor-pointer"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
              src={filteredGraphics[currentIndex].image}
              alt={filteredGraphics[currentIndex].title}
              className="max-w-full max-h-full object-contain drop-shadow-2xl cursor-default rounded-lg"
              onClick={(e) => e.stopPropagation()} // Prevent click from closing
            />
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedLayout>
  );
};

export default Showcase;

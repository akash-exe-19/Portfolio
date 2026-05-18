import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import AnimatedLayout from "../components/AnimatedLayout";
import Dropdown from "../components/Dropdown";
import ProjectCard from "../components/ProjectCard";
import { graphicsData, categories } from "../data/graphicsData";
import { projectData } from "../data/projectData";

const Showcase = ({ id = "showcase" }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const filteredGraphics = selectedCategory === "All" 
    ? graphicsData 
    : graphicsData.filter(g => g.category === selectedCategory);

  const carouselRef = useRef(null);
  const { scrollXProgress } = useScroll({ container: carouselRef });
  
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

          <div className="relative">
            {/* Horizontal Scroll Container */}
            <div 
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              <AnimatePresence mode="popLayout">
                {filteredGraphics.map((item) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                    key={item.id}
                    className="min-w-[300px] md:min-w-[400px] aspect-[4/3] rounded-2xl overflow-hidden glass-panel relative group snap-center"
                  >
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                        <span className="text-accent-blue text-sm font-medium">{item.category}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {/* Custom Scroll Progress Bar */}
            <div className="w-full h-1 bg-white/10 rounded-full mt-4 overflow-hidden hidden md:block">
              <motion.div 
                className="h-full bg-accent-blue rounded-full origin-left"
                style={{ scaleX: scrollXProgress }}
              />
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
    </AnimatedLayout>
  );
};

export default Showcase;

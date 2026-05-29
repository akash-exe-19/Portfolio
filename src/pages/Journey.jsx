import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import AnimatedLayout from "../components/AnimatedLayout";
import { timelineData } from "../data/timelineData";

const TimelineItem = ({ item, index, totalItems, scrollYProgress }) => {
  const rangeStart = index / totalItems;
  const rangeEnd = (index + 1) / totalItems;
  
  // Tight margins for a clean visual "snap" effect
  const p1 = Math.max(0, rangeStart - 0.02);
  const p2 = rangeStart + 0.05;
  const p3 = rangeEnd - 0.05;
  const p4 = Math.min(1, rangeEnd + 0.02);
  
  const opacity = useTransform(
    scrollYProgress,
    [p1, p2, p3, p4],
    [0, 1, 1, 0]
  );
  
  const y = useTransform(
    scrollYProgress,
    [p1, p2, p3, p4],
    [30, 0, 0, -30]
  );
  
  const scale = useTransform(
    scrollYProgress,
    [p1, p2, p3, p4],
    [0.95, 1, 1, 0.95]
  );

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 flex flex-col justify-center pointer-events-none"
    >
      <div className="pointer-events-auto w-[85%] md:w-2/3 pl-8 md:pl-16">
        <span className="text-accent-blue text-2xl font-bold tracking-widest mb-4 block">
          {item.year}
        </span>
        <h2 className="text-4xl md:text-5xl font-black mb-6 text-white">
          {item.title}
        </h2>
        <p className="text-lg text-white/70 mb-8 max-w-lg leading-relaxed">
          {item.description}
        </p>
        
        <div className="flex flex-col gap-6">
          <div>
            <h4 className="text-sm uppercase tracking-wider text-white/50 mb-3">Core Skills</h4>
            <div className="flex flex-wrap gap-2">
              {item.skills.map(skill => (
                <span key={skill} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm uppercase tracking-wider text-white/50 mb-3">Milestones</h4>
            <ul className="list-disc list-inside text-white/80 space-y-1 text-sm">
              {item.milestones.map(milestone => (
                <li key={milestone}>{milestone}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Journey = ({ id = "journey" }) => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001
  });

  const scrollToTop = () => {
    if (containerRef.current) {
      const top = containerRef.current.offsetTop;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const scrollToBottom = () => {
    if (containerRef.current) {
      const bottom = containerRef.current.offsetTop + containerRef.current.offsetHeight - window.innerHeight;
      window.scrollTo({ top: bottom, behavior: "smooth" });
    }
  };

  return (
    <AnimatedLayout id={id} className="!pt-0 !pb-0 !px-0">
      <div 
        ref={containerRef} 
        className="h-[700vh] w-full relative bg-transparent"
      >
        <div className="sticky top-0 left-0 w-full h-[100vh]">
          {/* Vertical Timeline Track */}
          <div className="absolute left-6 md:left-[20%] top-[10vh] bottom-[10vh] w-1 bg-white/10 rounded-full overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-accent-blue shadow-[0_0_20px_var(--color-accent-blue)]"
              style={{ 
                height: "100%",
                scaleY: smoothProgress,
                transformOrigin: "top"
              }}
            />
          </div>

          {/* Navigation Arrows */}
          <div className="absolute right-4 md:right-auto md:left-[24%] top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
            <button 
              onClick={scrollToTop}
              className="p-3 rounded-full glass-panel bg-primary-900/60 backdrop-blur-md border border-white/10 shadow-xl text-white/60 hover:text-white hover:shadow-[0_0_30px_-5px_color-mix(in_srgb,var(--color-accent-blue)_40%,transparent)] transition-all cursor-pointer"
              title="Jump to Start"
            >
              <ChevronUp size={24} />
            </button>
            <button 
              onClick={scrollToBottom}
              className="p-3 rounded-full glass-panel bg-primary-900/60 backdrop-blur-md border border-white/10 shadow-xl text-white/60 hover:text-white hover:shadow-[0_0_30px_-5px_color-mix(in_srgb,var(--color-accent-blue)_40%,transparent)] transition-all cursor-pointer"
              title="Jump to End"
            >
              <ChevronDown size={24} />
            </button>
          </div>

          <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex justify-end items-center h-full">
            <div className="w-[85%] md:w-2/3 relative h-[80vh]">
              {timelineData.map((item, index) => (
                <TimelineItem 
                  key={item.id} 
                  item={item} 
                  index={index} 
                  totalItems={timelineData.length} 
                  scrollYProgress={smoothProgress} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedLayout>
  );
};

export default Journey;

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedLayout from "../components/AnimatedLayout";
import { timelineData } from "../data/timelineData";

const TimelineItem = ({ item, index, totalItems, scrollYProgress }) => {
  const rangeStart = index / totalItems;
  const rangeEnd = (index + 1) / totalItems;
  
  // Ensure the array is strictly non-decreasing and bounded
  const p1 = Math.max(0, rangeStart - 0.05);
  const p2 = Math.max(p1 + 0.01, rangeStart);
  const p3 = Math.max(p2 + 0.01, rangeEnd - 0.05);
  const p4 = Math.max(p3 + 0.01, rangeEnd);
  
  const opacity = useTransform(
    scrollYProgress,
    [p1, p2, p3, p4],
    [0, 1, 1, 0]
  );
  
  const y = useTransform(
    scrollYProgress,
    [p1, p2, p3, p4],
    [50, 0, 0, -50]
  );
  
  const scale = useTransform(
    scrollYProgress,
    [p1, p2, p3, p4],
    [0.9, 1, 1, 0.9]
  );

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 flex flex-col justify-center pointer-events-none"
    >
      <div className="pointer-events-auto">
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

  return (
    <AnimatedLayout id={id} className="!pt-0 !pb-0 !px-0">
      <div ref={containerRef} className="h-[300vh] relative bg-transparent">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          {/* Wheel Background Element */}
          <motion.div 
            className="absolute left-[-20vw] top-1/2 -translate-y-1/2 w-[80vh] h-[80vh] rounded-full border-[1px] border-white/5 opacity-50"
            style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, 360]) }}
          >
            {timelineData.map((item, i) => {
              const angle = (i / timelineData.length) * 360;
              return (
                <div 
                  key={item.id} 
                  className="absolute w-4 h-4 bg-accent-blue rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(40vh)`
                  }}
                />
              )
            })}
          </motion.div>

          <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row justify-end items-center">
            
            <div className="w-full md:w-1/2 relative h-[60vh]">
              {timelineData.map((item, index) => (
                <TimelineItem 
                  key={item.id} 
                  item={item} 
                  index={index} 
                  totalItems={timelineData.length} 
                  scrollYProgress={scrollYProgress} 
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

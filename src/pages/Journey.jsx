import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import AnimatedLayout from "../components/AnimatedLayout";
import { timelineData } from "../data/timelineData";

const TimelineItem = ({ item, index, totalItems, scrollYProgress }) => {
  const rangeStart = index / totalItems;
  const rangeEnd = (index + 1) / totalItems;
  
  const isFirst = index === 0;
  const p1 = isFirst ? 0 : Math.max(0, rangeStart - 0.02);
  const p2 = isFirst ? 0 : rangeStart + 0.05;
  const p3 = rangeEnd - 0.05;
  const p4 = Math.min(1, rangeEnd + 0.02);
  
  const opacity = useTransform(scrollYProgress, [p1, p2, p3, p4], isFirst ? [1, 1, 1, 0] : [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [p1, p2, p3, p4], isFirst ? [0, 0, 0, -30] : [30, 0, 0, -30]);
  const scale = useTransform(scrollYProgress, [p1, p2, p3, p4], isFirst ? [1, 1, 1, 0.98] : [0.98, 1, 1, 0.98]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 flex flex-col justify-center pointer-events-none"
    >
      <div className="pointer-events-auto w-[90%] md:w-2/3 pl-8 md:pl-16 relative">
        {/* Giant background year */}
        <div
          className="absolute -top-8 -left-2 text-[8rem] md:text-[12rem] font-bold leading-none select-none pointer-events-none"
          style={{ color: "rgba(255,255,255,0.03)", fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {item.year}
        </div>

        {/* Content */}
        <span className="font-mono text-xs tracking-[0.3em] uppercase mb-3 block" style={{ color: "var(--color-accent-blue)" }}>
          {item.year}
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white tracking-tight leading-tight">
          {item.title}
        </h2>
        <p className="text-sm md:text-base text-white/50 mb-8 max-w-lg leading-relaxed font-mono">
          {item.description}
        </p>
        
        <div className="flex flex-col gap-6">
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-3">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {item.skills.map(skill => (
                <span key={skill} className="px-3 py-1 border border-white/10 text-xs font-mono text-white/60 hover:border-white/30 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-3">Milestones</h4>
            <ul className="space-y-1">
              {item.milestones.map(milestone => (
                <li key={milestone} className="font-mono text-xs text-white/50 flex items-start gap-2">
                  <span style={{ color: "var(--color-accent-blue)" }}>›</span>
                  {milestone}
                </li>
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
        className="h-[700dvh] w-full relative bg-transparent"
      >
        <div className="sticky top-0 left-0 w-full h-[100dvh]">

          {/* Vertical Timeline Track */}
          <div className="absolute left-6 md:left-[20%] top-[10dvh] bottom-[10dvh] w-1 bg-white/10 rounded-full overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.05)]">
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
            <div className="w-[85%] md:w-2/3 relative h-[80dvh]">
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

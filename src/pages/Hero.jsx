import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedLayout from "../components/AnimatedLayout";
import { ArrowDown } from "lucide-react";

const Hero = ({ id = "home" }) => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <AnimatedLayout id={id} className="flex flex-col justify-center relative overflow-hidden">
      {/* Background Abstract Elements */}
      <div className="absolute inset-0 overflow-hidden flex justify-center items-center">
        
        {/* Glowing Orbs Layer (pointer-events-none to let particles receive mouse events) */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
          style={{ y: y1 }}
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute w-[600px] h-[600px] rounded-full border border-white/5 bg-gradient-to-br from-accent-blue/10 to-transparent blur-3xl -top-20 -left-20"
        />
        <motion.div
          style={{ y: y2 }}
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute w-[500px] h-[500px] rounded-full border border-accent-purple/20 bg-gradient-to-tl from-accent-purple/10 to-transparent blur-2xl bottom-0 right-0"
        />
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6">
            Hi, I'm <span className="text-gradient">Akash</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-xl md:text-2xl text-white/70 font-medium mb-12">
            Graphics Designer, App & Web Developer, 3D Modeler.
            <br className="hidden md:block" /> Crafting digital experiences that merge logic with art.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href="#showcase"
            className="px-8 py-4 rounded-full bg-white text-primary-900 font-bold text-lg hover:bg-white/90 hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] cursor-pointer"
          >
            Explore Work
          </a>
          <a
            href="#contact"
            className="px-8 py-4 rounded-full glass-panel text-white font-bold text-lg hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
          >
            Get In Touch
          </a>
        </motion.div>
      </div>

      <motion.div
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-white/50">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={20} className="text-accent-blue" />
        </motion.div>
      </motion.div>
    </AnimatedLayout>
  );
};

export default Hero;

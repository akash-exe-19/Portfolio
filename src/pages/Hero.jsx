import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import CodeRain from '../components/CodeRain';
import { activityData } from '../data/activityData';

const Hero = ({ id = 'home' }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const roles = ['DESIGNER & DEVELOPER', '3D MODELER', 'CREATIVE DESIGNER'];

  // Typewriter effect
  useEffect(() => {
    let timer;
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      if (displayText === '') {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40); // Faster delete
      }
    } else {
      if (displayText === currentRole) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000); // Hold for 2s
      } else {
        timer = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 80); // 80ms per char
      }
    }
    
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles]); // Added roles to dependency array

  // Clock effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section id={id} className="min-h-screen bg-black relative overflow-hidden">

      {/* RIGHT — Code rain behind everything, full screen */}
      <div className="absolute inset-0 z-0">
        <CodeRain />
      </div>

      {/* Floating island content — sits in a contained dark card, rain flows around all edges */}
      <div className="relative z-20 flex items-center justify-start min-h-screen px-8 md:px-16 lg:px-24">
        <motion.div
          className="max-w-2xl w-full py-12 px-10 md:px-14"
          style={{
            background: 'rgba(0, 0, 0, 0.72)',
            borderLeft: '2px solid var(--color-accent-blue)',
            boxShadow: '0 0 80px rgba(0,0,0,0.8), inset 0 0 40px rgba(0,0,0,0.3)'
          }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <p className="text-xs font-mono tracking-widest mb-6" style={{ color: 'var(--color-accent-blue)' }}>
              [ PORTFOLIO v1.0 ]
            </p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h1
              className="leading-none font-bold text-white display-text"
              style={{ fontSize: 'clamp(4rem, 11vw, 10rem)', letterSpacing: '-0.04em' }}
            >
              AKASH
            </h1>
          </motion.div>

          <motion.div variants={itemVariants} className="mt-4 flex items-center h-8">
            <p className="text-xl md:text-2xl font-mono text-white/60 tracking-widest">
              {displayText}
              <span className="animate-pulse" style={{ color: 'var(--color-accent-blue)' }}>|</span>
            </p>
          </motion.div>

          {/* Live Activity Radar */}
          <motion.div variants={itemVariants} className="mt-6 p-3.5 border border-white/10 bg-white/5 font-mono text-xs">
            <div className="flex items-center justify-between mb-1.5 text-[10px] uppercase tracking-widest text-white/40">
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                LIVE RADAR
              </span>
              <span>{activityData.location}</span>
            </div>
            <p className="text-white text-xs sm:text-sm font-bold flex items-center gap-2">
              <span className="text-white/40 font-mono font-normal">CURRENTLY:</span>
              <span style={{ color: 'var(--color-accent-blue)' }}>{activityData.currentProject}</span>
            </p>
          </motion.div>

          <motion.hr variants={itemVariants} className="border-white/10 my-6" />

          <motion.div variants={itemVariants} className="flex flex-row gap-4 flex-wrap">
            <a
              href="#showcase"
              className="border border-white/40 px-6 py-3 font-mono text-sm uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all"
            >
              [ VIEW WORK ]
            </a>
            <a
              href="#contact"
              className="border px-6 py-3 font-mono text-sm uppercase tracking-widest transition-all"
              style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent-blue)'; e.currentTarget.style.color = 'var(--color-accent-blue)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = 'white'; }}
            >
              [ CONTACT ]
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Clock overlay — bottom right, above code rain */}
      <div className="absolute bottom-16 right-8 z-10 text-right pointer-events-none hidden md:block">
        <p className="font-mono text-2xl text-white/15 tracking-wider">{time}</p>
        <p className="font-mono text-xs text-white/10 tracking-widest mt-1">COIMBATORE, IN</p>
      </div>

      {/* Scroll arrow */}
      <motion.a
        href="#journey"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="animate-bounce p-2 cursor-pointer text-white/40 hover:text-white transition-colors">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </div>
      </motion.a>
    </section>
  );
};

export default Hero;

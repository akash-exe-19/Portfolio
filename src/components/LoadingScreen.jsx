import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const bootSequence = [
  { text: 'INITIALIZING AKASH.EXE...', delay: 0 },
  { text: 'LOADING MODULES.............. [OK]', delay: 600 },
  { text: 'MOUNTING COMPONENTS.......... [OK]', delay: 1200 },
  { text: 'CALIBRATING VIBES............ [OK]', delay: 1800 },
  { text: 'SYSTEM READY.', delay: 2400 },
  { text: 'PRESS ANY KEY OR WAIT...', delay: 3000 }
];

const LoadingScreen = () => {
  const [visible, setVisible] = useState(false);
  const [lines, setLines] = useState([]);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    const hasLoaded = sessionStorage.getItem('hasLoaded');
    if (!hasLoaded) {
      setVisible(true);
      window.scrollTo(0, 0);
    }
  }, []);

  const dismiss = () => {
    sessionStorage.setItem('hasLoaded', 'true');
    window.scrollTo(0, 0);
    setVisible(false);
  };

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;

    const timeouts = bootSequence.map(({ text, delay }) => {
      return setTimeout(() => {
        setLines(prev => [...prev, text]);
      }, delay);
    });

    const autoDismissTimeout = setTimeout(() => {
      dismiss();
    }, 3000 + 1500); // 1500ms after the last line appears

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(autoDismissTimeout);
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    
    const handleInteraction = () => dismiss();
    
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('click', handleInteraction);
    
    return () => {
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-black text-white flex flex-col justify-center items-center"
          style={{ fontFamily: '"JetBrains Mono", monospace' }}
        >
          <div className="w-full max-w-3xl px-6 sm:px-12 text-left">
            {lines.map((line, index) => (
              <div key={index} className="mb-2 text-sm sm:text-base md:text-lg flex items-center">
                <span className="mr-3" style={{ color: 'var(--color-accent-blue, #00f0ff)' }}>{'>'}</span>
                <span>{line}</span>
                {index === lines.length - 1 && (
                  <span className="ml-1 animate-pulse">_</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;

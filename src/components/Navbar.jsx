import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", path: "home" },
  { name: "Journey", path: "journey" },
  { name: "Showcase", path: "showcase" },
  { name: "Tech Stack", path: "techstack" },
  { name: "Contact", path: "contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navLinks.forEach((link) => {
      const section = document.getElementById(link.path);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleLinkClick = (e, path) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(path);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(0,0,0,0.95)] border-b border-white/10 py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300">
        <div className="font-mono text-sm tracking-[0.3em] text-white/80">AKASH</div>
        
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.path;
            return (
              <a
                key={link.name}
                href={`#${link.path}`}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`font-mono text-xs uppercase tracking-widest transition-colors cursor-pointer ${
                  isActive 
                  ? 'text-white border-b border-accent-blue pb-1' 
                  : 'text-white/40 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>
        
        <button
          className="md:hidden text-white/80 hover:text-white focus:outline-none cursor-pointer flex items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={24} />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black flex flex-col justify-center items-center gap-8"
          >
            <button
              className="absolute top-6 right-6 text-white/60 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <X size={32} />
            </button>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.path}`}
                onClick={(e) => handleLinkClick(e, link.path)}
                className="text-4xl font-bold text-white/60 hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

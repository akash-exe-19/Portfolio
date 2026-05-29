import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
    <nav
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-full glass-panel bg-primary-900/60 backdrop-blur-md border border-white/10 px-6 md:px-12 py-3 md:py-4 shadow-2xl hover:shadow-[0_0_40px_-10px_color-mix(in_srgb,var(--color-accent-blue)_40%,transparent)] w-[90%] md:w-[600px] flex justify-center"
    >
      <div className="flex justify-center items-center w-full">
        {/* Desktop Nav */}
        <div className="hidden md:flex justify-center w-full gap-10">
          {navLinks.map((link) => {
            const isActive = activeSection === link.path;
            return (
              <a
                key={link.name}
                href={`#${link.path}`}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`relative text-sm font-medium transition-colors cursor-pointer ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-2 left-0 right-0 h-0.5 bg-accent-blue rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden text-white focus:outline-none cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="absolute top-[120%] left-0 w-full bg-primary-900/90 backdrop-blur-lg border border-white/10 rounded-2xl md:hidden flex flex-col py-4 shadow-2xl overflow-hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={`#${link.path}`}
              onClick={(e) => handleLinkClick(e, link.path)}
              className={`px-6 py-3 text-sm font-medium cursor-pointer ${
                activeSection === link.path ? "text-accent-blue bg-white/5" : "text-white/70"
              }`}
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;

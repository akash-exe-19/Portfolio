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
      rootMargin: "-20% 0px -60% 0px",
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
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-primary-900/80 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a 
          href="#home" 
          onClick={(e) => handleLinkClick(e, "home")}
          className="text-2xl font-bold tracking-tighter text-white cursor-pointer"
        >
          AKASH<span className="text-accent-blue">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.path;
            return (
              <a
                key={link.name}
                href={`#${link.path}`}
                onClick={(e) => handleLinkClick(e, link.path)}
                className="relative text-sm font-medium transition-colors hover:text-white cursor-pointer"
                style={{ color: isActive ? "#fff" : "rgba(255,255,255,0.6)" }}
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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-primary-800 border-b border-white/10 md:hidden flex flex-col py-4"
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

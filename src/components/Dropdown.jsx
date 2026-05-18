import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Dropdown = ({ categories, selectedCategory, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-between w-48 rounded-md border border-white/10 shadow-sm px-4 py-2 bg-primary-800 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-accent-blue transition-colors"
      >
        {selectedCategory}
        <ChevronDown className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-primary-800 ring-1 ring-black ring-opacity-5 divide-y divide-white/10 focus:outline-none z-10 border border-white/5"
          >
            <div className="py-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    onSelect(category);
                    setIsOpen(false);
                  }}
                  className={`${
                    selectedCategory === category
                      ? "bg-primary-700 text-accent-blue"
                      : "text-white/80 hover:bg-primary-700 hover:text-white"
                  } group flex items-center w-full px-4 py-2 text-sm transition-colors`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;

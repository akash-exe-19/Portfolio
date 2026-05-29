import { useState } from "react";
import { Share2, Globe, Briefcase, MessageSquare, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const socialLinks = [
  { name: "GitHub", icon: Globe, url: "https://github.com" },
  { name: "LinkedIn", icon: Briefcase, url: "https://linkedin.com" },
  { name: "Twitter", icon: MessageSquare, url: "https://twitter.com" },
  { name: "Email", icon: Mail, url: "mailto:hello@example.com" },
];

const Socials = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed bottom-6 left-6 z-50 flex flex-col-reverse items-center justify-start p-3 rounded-full glass-panel bg-primary-900/60 backdrop-blur-md border border-white/10 shadow-xl group hover:shadow-[0_0_30px_-5px_color-mix(in_srgb,var(--color-accent-blue)_40%,transparent)] transition-shadow duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        className="flex items-center justify-center text-white/60 group-hover:text-white transition-colors cursor-pointer relative z-10"
        aria-label="Socials Menu"
      >
        <Share2 size={22} className="group-hover:text-accent-blue transition-colors" />
      </button>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginBottom: 0 }}
            animate={{ height: 150, opacity: 1, marginBottom: 12 }}
            exit={{ height: 0, opacity: 0, marginBottom: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col justify-around overflow-hidden"
          >
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-accent-blue transition-all hover:scale-110 p-1"
                  title={social.name}
                  aria-label={social.name}
                >
                  <Icon size={20} />
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Socials;

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative rounded-2xl overflow-hidden glass-panel flex flex-col h-full"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900 to-transparent opacity-80" />
      </div>
      
      <div className="flex-1 p-6 flex flex-col">
        <h3 className="text-xl font-bold mb-2 group-hover:text-accent-blue transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-white/70 mb-6 flex-1">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/90"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-accent-blue hover:text-accent-neon transition-colors"
        >
          View Project <ExternalLink size={16} className="ml-2" />
        </a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

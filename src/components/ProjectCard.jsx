import { motion } from "framer-motion";
import { ExternalLink, Terminal } from "lucide-react";

const ProjectCard = ({ project, onSelectProject }) => {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative border border-white/15 bg-black flex flex-col h-full overflow-hidden cursor-pointer"
      onClick={() => onSelectProject && onSelectProject(project)}
    >
      {/* Terminal Header Bar */}
      <div className="bg-white/5 border-b border-white/10 px-4 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          <span className="font-mono text-[11px] text-white/40 ml-2 tracking-wider">
            proj_{String(project.id).padStart(2, '0')}.manifest
          </span>
        </div>
        <div className={`flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest ${
          project.inDevelopment ? "text-amber-400" : "text-emerald-400"
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
            project.inDevelopment ? "bg-amber-400" : "bg-emerald-400"
          }`} />
          <span>{project.status || (project.inDevelopment ? "IN DEVELOPMENT" : "DEPLOYED")}</span>
        </div>
      </div>

      {/* Project Image Box */}
      <div className="relative h-48 w-full overflow-hidden bg-white/5 border-b border-white/10">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      </div>
      
      {/* Card Content */}
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold mb-3 text-white group-hover:text-accent-blue transition-colors tracking-tight flex items-center gap-2">
            <Terminal size={16} className="text-accent-blue shrink-0" />
            {project.title}
          </h3>
          <p className="font-mono text-xs text-white/50 mb-6 leading-relaxed">
            {project.description}
          </p>
        </div>

        <div>
          {/* CLI Style Tech Flags */}
          <div className="mb-6">
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-2">--stack</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[11px] px-2.5 py-1 border border-white/10 bg-white/5 text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Action Link */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onSelectProject) onSelectProject(project);
            }}
            className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase border border-white/20 px-4 py-2.5 text-white hover:border-accent-blue hover:text-accent-blue transition-all w-full justify-center cursor-pointer bg-white/5"
          >
            <span>[ VIEW DETAILS & REPO ]</span>
            <ExternalLink size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

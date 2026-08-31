import { motion } from "framer-motion";
import AnimatedLayout from "../components/AnimatedLayout";

const skills = [
  {
    category: "Languages & Core",
    items: [
      { name: "Python", level: 80 },
      { name: "C/C++", level: 70 },
      { name: "Java", level: 70 },
      { name: "TypeScript", level: 50 },
    ]
  },
  {
    category: "Frontend & UI",
    items: [
      { name: "HTML", level: 90 },
      { name: "CSS", level: 90 },
      { name: "React", level: 80 },
    ]
  },
  {
    category: "Backend & Systems",
    items: [
      { name: "FastAPI", level: 70 },
      { name: "Python/C/C++", level: 80 },
      { name: "Firebase", level: 75 },
      { name: "MongoDB", level: 85 },
    ]
  },
  {
    category: "Creative & Design",
    items: [
      { name: "Figma (UI/UX)", level: 90 },
      { name: "Adobe Photoshop", level: 85 },
      { name: "Adobe Illustrator", level: 80 },
      { name: "Blender (3D)", level: 65 },
    ]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const TechStack = ({ id = "techstack" }) => {
  return (
    <AnimatedLayout id={id}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-white">Technical Arsenal</h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            A comprehensive overview of my programming languages, frameworks, and creative software proficiencies.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {skills.map((group, groupIndex) => (
            <motion.div 
              key={group.category}
              variants={itemVariants}
              className="glass-panel p-8 rounded-3xl relative overflow-hidden group"
            >
              {/* Background Glow Effect */}
              <div className="absolute -inset-20 bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none" />
              
              <h3 className="text-2xl font-bold mb-8 text-accent-blue relative z-10">
                {group.category}
              </h3>
              
              <div className="space-y-6 relative z-10">
                {group.items.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-white/90">{skill.name}</span>
                      <span className="text-sm text-white/50">{skill.level}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-accent-blue to-accent-purple rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedLayout>
  );
};

export default TechStack;

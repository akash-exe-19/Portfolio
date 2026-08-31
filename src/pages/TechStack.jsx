import { motion } from "framer-motion";
import AnimatedLayout from "../components/AnimatedLayout";

const bentoItems = [
  { label: 'Python', level: 80, category: 'Languages', size: 'lg' },
  { label: 'C / C++', level: 70, category: 'Languages', size: 'sm' },
  { label: 'Java', level: 70, category: 'Languages', size: 'sm' },
  { label: 'TypeScript', level: 50, category: 'Languages', size: 'sm' },
  { label: 'HTML', level: 90, category: 'Frontend', size: 'sm' },
  { label: 'CSS', level: 90, category: 'Frontend', size: 'sm' },
  { label: 'React', level: 80, category: 'Frontend', size: 'lg' },
  { label: 'FastAPI', level: 70, category: 'Backend', size: 'sm' },
  { label: 'MongoDB', level: 85, category: 'Backend', size: 'lg' },
  { label: 'Firebase', level: 75, category: 'Backend', size: 'sm' },
  { label: 'Python/C/C++', level: 80, category: 'Backend', size: 'sm' },
  { label: 'Photoshop', level: 85, category: 'Creative', size: 'sm' },
  { label: 'Illustrator', level: 80, category: 'Creative', size: 'sm' },
  { label: 'Figma', level: 90, category: 'Creative', size: 'lg' },
  { label: 'Blender', level: 65, category: 'Creative', size: 'sm' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
};

const TechStack = ({ id = "techstack" }) => {
  return (
    <AnimatedLayout id={id}>
      <div className="max-w-7xl mx-auto px-4 md:px-0">
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-white uppercase">
            Technical Arsenal
          </h2>
          <p className="font-mono text-sm text-white/40">
            Here's what I actually know how to use.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
        >
          {bentoItems.map((item, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className={`relative bg-[#0a0a0a] border border-white/10 p-6 transition-all duration-300 hover:border-accent-blue rounded-lg overflow-hidden flex flex-col justify-between min-h-[160px] ${
                item.size === 'lg' ? 'col-span-2' : 'col-span-1'
              }`}
            >
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-white/30 mb-3">
                  {item.category}
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white">
                  {item.label}
                </div>
              </div>
              
              <div className="absolute bottom-4 right-4 text-4xl md:text-5xl font-bold text-white/10 pointer-events-none select-none">
                {item.level}
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                  className="h-full bg-accent-blue"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedLayout>
  );
};

export default TechStack;

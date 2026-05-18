import { motion } from "framer-motion";

const AnimatedLayout = ({ children, className = "", id }) => {
  return (
    <section
      id={id}
      className={`min-h-screen pt-24 pb-12 px-6 md:px-12 lg:px-24 ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
};

export default AnimatedLayout;

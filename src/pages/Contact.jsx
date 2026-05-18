import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedLayout from "../components/AnimatedLayout";
import { Mail, Send } from "lucide-react";

// Inline SVG for LinkedIn
const LinkedinIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

// Inline SVG for GitHub
const GithubIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const Contact = ({ id = "contact" }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, submitting, success, error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");
    
    // Simulate API call
    setTimeout(() => {
      if (formData.name && formData.email && formData.message) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 3000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    }, 1500);
  };

  return (
    <AnimatedLayout id={id}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* Left Column - Info & Socials */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">Let's Create<br/><span className="text-accent-blue">Together.</span></h2>
            <p className="text-lg text-white/70 mb-12 max-w-md">
              Whether you have a project in mind, need a designer, or just want to chat about tech, I'm always open to discussing new opportunities.
            </p>
            
            <div className="flex flex-col gap-6">
              <a href="mailto:akash19cbe@gmail.com" className="flex items-center gap-4 text-white/80 hover:text-accent-blue transition-colors group w-fit">
                <div className="p-4 rounded-full bg-white/5 border border-white/10 group-hover:border-accent-blue/50 transition-colors">
                  <Mail size={24} />
                </div>
                <span className="text-lg font-medium">akash19cbe@gmail.com</span>
              </a>
              
              <a href="https://www.linkedin.com/in/akash-k-19-cbe/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white/80 hover:text-accent-blue transition-colors group w-fit">
                <div className="p-4 rounded-full bg-white/5 border border-white/10 group-hover:border-accent-blue/50 transition-colors">
                  <LinkedinIcon size={24} />
                </div>
                <span className="text-lg font-medium">LinkedIn Profile</span>
              </a>
              
              <a href="https://github.com/akash-exe-19?tab=repositories" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white/80 hover:text-accent-blue transition-colors group w-fit">
                <div className="p-4 rounded-full bg-white/5 border border-white/10 group-hover:border-accent-blue/50 transition-colors">
                  <GithubIcon size={24} />
                </div>
                <span className="text-lg font-medium">GitHub Repositories</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Column - Form */}
        <div className="flex-1">
          <motion.form 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="glass-panel p-8 md:p-12 rounded-3xl"
          >
            <h3 className="text-2xl font-bold mb-8">Send a Message</h3>
            
            <div className="space-y-6">
              <div className="relative group">
                <input 
                  type="text" 
                  name="name" 
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b-2 border-white/20 py-3 px-2 text-white focus:outline-none focus:border-accent-blue transition-colors peer"
                  placeholder=" "
                />
                <label 
                  htmlFor="name" 
                  className="absolute left-2 top-3 text-white/50 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent-blue peer-valid:-top-4 peer-valid:text-xs"
                >
                  Your Name
                </label>
              </div>

              <div className="relative group">
                <input 
                  type="email" 
                  name="email" 
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b-2 border-white/20 py-3 px-2 text-white focus:outline-none focus:border-accent-blue transition-colors peer"
                  placeholder=" "
                />
                <label 
                  htmlFor="email" 
                  className="absolute left-2 top-3 text-white/50 transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent-blue peer-valid:-top-4 peer-valid:text-xs"
                >
                  Email Address
                </label>
              </div>

              <div className="relative group pt-4">
                <textarea 
                  name="message" 
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full bg-transparent border-b-2 border-white/20 py-3 px-2 text-white focus:outline-none focus:border-accent-blue transition-colors peer resize-none"
                  placeholder=" "
                ></textarea>
                <label 
                  htmlFor="message" 
                  className="absolute left-2 top-7 text-white/50 transition-all peer-focus:top-0 peer-focus:text-xs peer-focus:text-accent-blue peer-valid:top-0 peer-valid:text-xs"
                >
                  Your Message
                </label>
              </div>
              
              <button 
                type="submit"
                disabled={status === "submitting"}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple text-white font-bold flex justify-center items-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {status === "submitting" ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                    <Send size={20} />
                  </motion.div>
                ) : status === "success" ? (
                  "Message Sent!"
                ) : status === "error" ? (
                  "Error Sending"
                ) : (
                  <>Send Message <Send size={20} /></>
                )}
              </button>
              
              {status === "success" && (
                <p className="text-green-400 text-sm text-center">Thanks for reaching out! I'll get back to you soon.</p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-sm text-center">Please fill out all fields.</p>
              )}
            </div>
          </motion.form>
        </div>

      </div>
    </AnimatedLayout>
  );
};

export default Contact;

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedLayout from "../components/AnimatedLayout";
import { Mail, Send } from "lucide-react";

const LinkedinIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GithubIcon = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const Contact = ({ id = "contact" }) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");
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
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-16">
          <p className="font-mono text-xs tracking-[0.3em] uppercase mb-4" style={{ color: "var(--color-accent-blue)" }}>
            [ GET IN TOUCH ]
          </p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-none">
            GOT SOMETHING<br />
            <span style={{ color: "var(--color-accent-blue)" }}>IN MIND?</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Left — contacts */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-white/50 mb-12 max-w-sm leading-relaxed">
              A project, a collab, or just want to say hi — I'm usually free. Just say it.
            </p>

            <div className="space-y-6">
              {[
                { href: "mailto:akash19cbe@gmail.com", icon: Mail, label: "akash19cbe@gmail.com" },
                { href: "https://www.linkedin.com/in/akash-k-19-cbe/", icon: LinkedinIcon, label: "LinkedIn" },
                { href: "https://github.com/akash-exe-19?tab=repositories", icon: GithubIcon, label: "GitHub" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-white/40 hover:text-white transition-colors group w-fit"
                >
                  <div className="p-3 border border-white/10 group-hover:border-white/40 transition-colors">
                    <Icon size={20} />
                  </div>
                  <span className="font-mono text-sm tracking-wide">{label}</span>
                </a>
              ))}
            </div>

            {/* Availability indicator */}
            <div className="mt-16 flex items-center gap-3">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: "var(--color-accent-blue)" }}
              />
              <span className="font-mono text-xs text-white/30 tracking-widest uppercase">Available for work</span>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <form onSubmit={handleSubmit} className="border border-white/10 p-8 md:p-12">
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-white/30 mb-8">SEND A MESSAGE</h3>

              <div className="space-y-8">
                {[
                  { name: "name", label: "Name", type: "text" },
                  { name: "email", label: "Email", type: "email" },
                ].map(({ name, label, type }) => (
                  <div key={name} className="relative group">
                    <input
                      type={type}
                      name={name}
                      id={name}
                      value={formData[name]}
                      onChange={handleChange}
                      required
                      placeholder=" "
                      className="w-full bg-transparent border-b border-white/15 py-3 px-0 text-white text-sm focus:outline-none focus:border-white transition-colors peer font-mono"
                    />
                    <label
                      htmlFor={name}
                      className="absolute left-0 top-3 text-white/30 text-xs font-mono uppercase tracking-widest transition-all peer-focus:-top-5 peer-focus:text-[10px] peer-valid:-top-5 peer-valid:text-[10px]"
                      style={{}}
                    >
                      {label}
                    </label>
                  </div>
                ))}

                <div className="relative">
                  <textarea
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    placeholder=" "
                    className="w-full bg-transparent border-b border-white/15 py-3 px-0 text-white text-sm focus:outline-none focus:border-white transition-colors peer resize-none font-mono"
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-0 top-3 text-white/30 text-xs font-mono uppercase tracking-widest transition-all peer-focus:-top-5 peer-focus:text-[10px] peer-valid:-top-5 peer-valid:text-[10px]"
                  >
                    Message
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-4 border border-white/20 text-white font-mono text-xs tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all disabled:opacity-40 flex items-center justify-center gap-3"
                  style={status !== "submitting" ? { borderColor: "var(--color-accent-blue)", color: "var(--color-accent-blue)" } : {}}
                >
                  {status === "submitting" ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                      <Send size={16} />
                    </motion.div>
                  ) : status === "success" ? (
                    "MESSAGE SENT."
                  ) : status === "error" ? (
                    "FILL ALL FIELDS."
                  ) : (
                    <><Send size={14} /> SEND MESSAGE</>
                  )}
                </button>

                {status === "success" && (
                  <p className="font-mono text-xs text-center" style={{ color: "var(--color-accent-blue)" }}>
                    Got it. I'll get back to you soon.
                  </p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </AnimatedLayout>
  );
};

export default Contact;

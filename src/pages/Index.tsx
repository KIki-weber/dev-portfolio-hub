import { motion } from "framer-motion";
import { Code2, Database, Globe, Layout, Mail, MapPin, ExternalLink, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const navLinks = ["About", "Skills", "Projects", "Contact"];

const skills = {
  Frontend: [
    { name: "Vue.js", level: 90 },
    { name: "React", level: 85 },
    { name: "Angular", level: 80 },
    { name: "HTML/CSS", level: 95 },
    { name: "TypeScript", level: 88 },
  ],
  Backend: [
    { name: "Node.js", level: 88 },
    { name: "Python", level: 82 },
    { name: "MySQL", level: 85 },
    { name: "PostgreSQL", level: 83 },
    { name: "REST APIs", level: 90 },
  ],
};

interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  color: string;
  live_url: string | null;
  github_url: string | null;
}

const Index = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    supabase.from("projects").select("*").order("created_at").then(({ data }) => {
      if (data) setProjects(data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 glass"
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <span className="font-display text-xl font-bold text-gradient">Kiki.</span>
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                {link}
              </a>
            ))}
          </div>
          <a href="#contact" className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
            Hire Me
          </a>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/3 blur-3xl" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-3xl">
            <motion.p variants={fadeUp} custom={0} className="text-primary font-display text-sm tracking-widest uppercase mb-4">
              Web & Application Developer
            </motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
              Hi, I'm <span className="text-gradient">Kiflom Mamo</span>
            </motion.h1>
            <motion.p variants={fadeUp} custom={2} className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
              Full-stack developer specializing in Vue, React, Angular on the frontend and Node.js, Python on the backend. Turning ideas into polished, performant applications from Mekelle, Ethiopia.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex gap-4">
              <a href="#projects" className="rounded-lg bg-primary px-8 py-3 font-display font-medium text-primary-foreground hover:opacity-90 transition-opacity glow-box">
                View Projects
              </a>
              <a href="#contact" className="rounded-lg border border-border px-8 py-3 font-display font-medium text-foreground hover:border-primary/50 transition-colors">
                Get in Touch
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-28">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} custom={0}>
              <p className="text-primary font-display text-sm tracking-widest uppercase mb-3">About Me</p>
              <h2 className="font-display text-4xl font-bold mb-6">
                Passionate about crafting <span className="text-gradient">quality software</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I'm Kiflom Mamo, a full-stack developer based in Mekelle, Ethiopia. With expertise across multiple frontend frameworks and backend technologies, I bring versatility and depth to every project.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From coaching platforms to project management systems, I've delivered solutions that solve real problems. I believe in clean code, smooth user experiences, and continuous learning.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="grid grid-cols-2 gap-4">
              {[
                { icon: Layout, label: "Frontend", value: "Vue, React, Angular" },
                { icon: Database, label: "Backend", value: "Node.js, Python" },
                { icon: Globe, label: "Databases", value: "MySQL, PostgreSQL" },
                { icon: Code2, label: "Projects", value: "5+ Delivered" },
              ].map((item) => (
                <div key={item.label} className="rounded-xl bg-card p-6 border border-border hover:border-primary/30 transition-colors">
                  <item.icon className="w-8 h-8 text-primary mb-3" />
                  <p className="font-display font-semibold text-sm mb-1">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.value}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-28 bg-card/50">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.p variants={fadeUp} custom={0} className="text-primary font-display text-sm tracking-widest uppercase mb-3 text-center">Skills</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-4xl font-bold mb-16 text-center">
              My <span className="text-gradient">Tech Stack</span>
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {Object.entries(skills).map(([category, items], ci) => (
                <motion.div key={category} variants={fadeUp} custom={ci + 2}>
                  <h3 className="font-display text-lg font-semibold mb-6 flex items-center gap-2">
                    {category === "Frontend" ? <Layout className="w-5 h-5 text-primary" /> : <Database className="w-5 h-5 text-primary" />}
                    {category}
                  </h3>
                  <div className="space-y-5">
                    {items.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-secondary overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 }}
                            className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-28">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.p variants={fadeUp} custom={0} className="text-primary font-display text-sm tracking-widest uppercase mb-3 text-center">Portfolio</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-4xl font-bold mb-16 text-center">
              Featured <span className="text-gradient">Projects</span>
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {projects.map((project, i) => (
                <motion.div
                  key={project.id}
                  variants={fadeUp}
                  custom={i + 2}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="group rounded-xl bg-card border border-border hover:border-primary/30 overflow-hidden transition-colors"
                >
                  <div className="h-40 relative overflow-hidden" style={{ background: `linear-gradient(135deg, hsl(${project.color} / 0.15), hsl(${project.color} / 0.05))` }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Code2 className="w-12 h-12 text-muted-foreground/30 group-hover:text-primary/40 transition-colors" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-display font-semibold text-lg">{project.title}</h3>
                      {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span key={t} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">{t}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-28 bg-card/50">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="max-w-2xl mx-auto text-center">
            <motion.p variants={fadeUp} custom={0} className="text-primary font-display text-sm tracking-widest uppercase mb-3">Contact</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-4xl font-bold mb-6">
              Let's <span className="text-gradient">Work Together</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground mb-10">
              Have a project in mind? I'd love to hear about it. Let's create something amazing together.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="flex flex-col gap-4 items-center">
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:habeshakefi@gmail.com" className="flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-display font-medium text-primary-foreground hover:opacity-90 transition-opacity glow-box">
                  <Mail className="w-4 h-4" /> habeshakefi@gmail.com
                </a>
                <a href="tel:0901302252" className="flex items-center gap-2 rounded-lg border border-border px-8 py-3 font-display font-medium text-foreground hover:border-primary/50 transition-colors">
                  <Phone className="w-4 h-4" /> 0901302252
                </a>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Mekelle, Ethiopia</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Kiflom Mamo — Built with passion & clean code</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

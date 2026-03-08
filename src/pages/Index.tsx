import { motion } from "framer-motion";
import { Code2, Database, Globe, Layout, Mail, MapPin, ExternalLink, Phone, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import profilePhoto from "@/assets/profile-photo.png";
import { translations, type Lang } from "@/lib/translations";

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

const langLabels: Record<Lang, string> = { en: "EN", am: "አማ", ti: "ትግ" };

const Index = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [lang, setLang] = useState<Lang>("en");
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const t = translations[lang];

  useEffect(() => {
    supabase.from("projects").select("*").order("created_at").then(({ data }) => {
      if (data) setProjects(data);
    });
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:habeshakefi@gmail.com?subject=${encodeURIComponent(formData.subject || "Portfolio Contact")}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

  const navLinks = [
    { key: "about", label: t.nav_about },
    { key: "skills", label: t.nav_skills },
    { key: "projects", label: t.nav_projects },
    { key: "contact", label: t.nav_contact },
  ];

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
          <span className="font-display text-xl font-bold text-gradient">kiki</span>
          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a key={link.key} href={`#${link.key}`} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex rounded-lg border border-border overflow-hidden">
              {(Object.keys(langLabels) as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1.5 text-xs font-medium transition-colors ${lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {langLabels[l]}
                </button>
              ))}
            </div>
            <a href="#contact" className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
              {t.hire_me}
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/3 blur-3xl" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            {/* Text */}
            <div className="flex-1 max-w-2xl">
              {/* Phone at top with fast nonstop golden animation */}
              <motion.a
                variants={fadeUp}
                custom={0}
                href="tel:0901302252"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 mb-6"
              >
                <motion.div
                  animate={{ rotate: [0, 20, -20, 15, -15, 10, -10, 0] }}
                  transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 0 }}
                  className="w-11 h-11 rounded-lg flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, hsl(45, 90%, 50%), hsl(35, 95%, 55%))", boxShadow: "0 0 20px hsl(45 90% 50% / 0.4)" }}
                >
                  <Phone className="w-5 h-5" style={{ color: "hsl(30, 20%, 10%)" }} />
                </motion.div>
                <span className="font-display text-sm font-bold" style={{ color: "hsl(45, 90%, 55%)" }}>0901302252</span>
              </motion.a>

              <motion.p variants={fadeUp} custom={1} className="text-primary font-display text-sm tracking-widest uppercase mb-4">
                {t.hero_subtitle}
              </motion.p>
              <motion.h1 variants={fadeUp} custom={2} className="font-display text-5xl md:text-7xl font-bold leading-tight mb-6">
                {t.hero_title_1} <span className="text-gradient">{t.hero_title_2}</span>
              </motion.h1>
              <motion.p variants={fadeUp} custom={3} className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
                {t.hero_desc}
              </motion.p>
              <motion.div variants={fadeUp} custom={4} className="flex flex-wrap gap-4">
                <a href="#projects" className="rounded-lg bg-primary px-8 py-3 font-display font-medium text-primary-foreground hover:opacity-90 transition-opacity glow-box">
                  {t.view_projects}
                </a>
                <a href="#contact" className="rounded-lg border border-border px-8 py-3 font-display font-medium text-foreground hover:border-primary/50 transition-colors">
                  {t.get_in_touch}
                </a>
              </motion.div>
            </div>
            {/* Photo */}
            <motion.div
              variants={fadeUp}
              custom={2}
              className="flex-shrink-0"
            >
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 glow-box">
                  <img src={profilePhoto} alt="Kiflom Mamo" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-20 h-20 rounded-full bg-primary/10 blur-2xl" />
                <div className="absolute -top-2 -left-2 w-16 h-16 rounded-full bg-primary/10 blur-2xl" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-28">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeUp} custom={0}>
              <p className="text-primary font-display text-sm tracking-widest uppercase mb-3">{t.about_label}</p>
              <h2 className="font-display text-4xl font-bold mb-6">
                {t.about_title_1} <span className="text-gradient">{t.about_title_2}</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{t.about_p1}</p>
              <p className="text-muted-foreground leading-relaxed">{t.about_p2}</p>
            </motion.div>
            <motion.div variants={fadeUp} custom={1} className="grid grid-cols-2 gap-4">
              {[
                { icon: Layout, label: t.frontend, value: "Vue, React, Angular" },
                { icon: Database, label: t.backend, value: "Node.js, Python" },
                { icon: Globe, label: t.databases, value: "MySQL, PostgreSQL" },
                { icon: Code2, label: t.nav_projects, value: t.projects_delivered },
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
            <motion.p variants={fadeUp} custom={0} className="text-primary font-display text-sm tracking-widest uppercase mb-3 text-center">{t.skills_label}</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-4xl font-bold mb-16 text-center">
              {t.skills_title_1} <span className="text-gradient">{t.skills_title_2}</span>
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {Object.entries(skills).map(([category, items], ci) => (
                <motion.div key={category} variants={fadeUp} custom={ci + 2}>
                  <h3 className="font-display text-lg font-semibold mb-6 flex items-center gap-2">
                    {category === "Frontend" ? <Layout className="w-5 h-5 text-primary" /> : <Database className="w-5 h-5 text-primary" />}
                    {category === "Frontend" ? t.frontend : t.backend}
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
            <motion.p variants={fadeUp} custom={0} className="text-primary font-display text-sm tracking-widest uppercase mb-3 text-center">{t.portfolio_label}</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-4xl font-bold mb-16 text-center">
              {t.portfolio_title_1} <span className="text-gradient">{t.portfolio_title_2}</span>
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
                      {project.tech.map((techItem) => (
                        <span key={techItem} className="text-xs px-3 py-1 rounded-full bg-secondary text-secondary-foreground">{techItem}</span>
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
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger} className="max-w-3xl mx-auto">
            <motion.p variants={fadeUp} custom={0} className="text-primary font-display text-sm tracking-widest uppercase mb-3 text-center">{t.contact_label}</motion.p>
            <motion.h2 variants={fadeUp} custom={1} className="font-display text-4xl font-bold mb-6 text-center">
              {t.contact_title_1} <span className="text-gradient">{t.contact_title_2}</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-muted-foreground mb-10 text-center">
              {t.contact_desc}
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="grid md:grid-cols-5 gap-8">
              {/* Form */}
              <form onSubmit={handleFormSubmit} className="md:col-span-3 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.form_name}
                    required
                    className="w-full rounded-lg bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.form_email}
                    required
                    className="w-full rounded-lg bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder={t.form_subject}
                  className="w-full rounded-lg bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                />
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.form_message}
                  rows={5}
                  required
                  className="w-full rounded-lg bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-display font-medium text-primary-foreground hover:opacity-90 transition-opacity glow-box"
                >
                  <Send className="w-4 h-4" /> {t.form_send}
                </button>
              </form>

              {/* Contact Info */}
              <div className="md:col-span-2 space-y-6 flex flex-col justify-center">
                <a href="mailto:habeshakefi@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm">habeshakefi@gmail.com</span>
                </a>
                <a href="tel:0901302252" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm">0901302252</span>
                </a>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm">{t.location}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Kiflom Mamo — {t.footer}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

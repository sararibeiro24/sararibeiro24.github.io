import React, { useState, useEffect } from "react";
import { GraduationCap, MapPin, X, ExternalLink } from "lucide-react";
import { EXPERIENCE, SKILLS, LANGUAGES, VOLUNTEER, SOCIALS, EDUCATION, PROJECTS, ACTIVITIES } from "./constants";
import { Robot } from "./robot";

function Section({ id, title, children }) {
  return (
    <section id={id} className="max-w-3xl mx-auto px-6 py-16 border-t border-cyan-950/60">
      <div className="w-12 h-0.5 bg-cyan-400 shadow-[0_0_10px_#00e5ff] mb-4" />
      <h2 className="text-2xl font-display font-bold mb-6 text-white tracking-wider uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    if (selectedProject) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [selectedProject]);

  return (
    <div>
      {/* NAV */}
      <header className="sticky top-0 bg-[#030712]/90 backdrop-blur-md border-b border-cyan-900/40 z-10">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between text-sm">
          <span className="font-display font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-cyan-400 rounded-sm shadow-[0_0_8px_#00e5ff]" />
            Sara Ribeiro
          </span>
          <nav className="hidden sm:flex gap-5 text-xs font-mono font-semibold uppercase tracking-widest text-slate-400">
            <a href="#build" className="hover:text-cyan-400 transition-colors">Build</a>
            <a href="#education" className="hover:text-cyan-400 transition-colors">Education</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
            <a href="#activities" className="hover:text-cyan-400 transition-colors">Activities</a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
            <a href="#contact" className="border border-cyan-400/60 px-2.5 py-1 rounded text-cyan-400 hover:bg-cyan-400/10 transition-all">Contact</a>
          </nav>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-6 py-20 flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
        <div>
            <p className="text-cyan-400/80 font-mono text-xs uppercase tracking-widest mb-3">
              Porto, Portugal - incoming MSc student
            </p>
            <h1 className="text-5xl font-display font-black tracking-tight text-gradient">
              Sara Ribeiro
            </h1>
          </div>

        <div className="w-full sm:w-80 h-64 shrink-0 flex items-center justify-center">
          <Robot />
        </div>
      </section>

      <Section id="build" title="Build something">
        <p className="text-slate-300 leading-relaxed max-w-xl text-sm font-light">
          Just finished a Bachelor's in Informatics and Computing Engineering
          at FEUP, University of Porto, and starting an MSc later this year.
        </p>
      </Section>

      <Section id="education" title="Education">
        <div className="space-y-4">
          {EDUCATION.map((edu) => (
            <div key={edu.name} className="edu-card p-6 flex gap-4">
              <div className="edu-ring w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                <GraduationCap size={22} />
              </div>
              <div>
                <p className="font-mono text-xs text-cyan-400/70">{edu.when}</p>
                <p className="font-display font-semibold text-lg text-white mt-1">{edu.name}</p>
                <p className="text-xs mt-2 flex items-center gap-1 text-slate-400 font-mono uppercase tracking-wider">
                  <MapPin size={14} className="text-cyan-400" /> {edu.where}
                </p>
                <p className="text-xs mt-4 max-w-xl leading-relaxed text-slate-400">{edu.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="languages" title="Languages">
        <div className="edu-card p-8 md:p-10 max-w-xl space-y-8">
          {LANGUAGES.map((l) => (
            <div key={l.name}>
              <div className="flex justify-between items-baseline mb-2 text-xs">
                <span className="font-display text-white tracking-wider">{l.name}</span>
                <span className="font-mono text-cyan-400 font-semibold">{l.level}</span>
              </div>
              <div className="lang-track h-2 rounded-full overflow-hidden">
                <div className="lang-fill h-full rounded-full" style={{ width: `${l.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="projects" title="Projects">
        <p className="font-mono text-xs text-cyan-400/60 -mt-2 mb-6 flex items-center gap-2">
          <span/>
          click any project to view details
        </p>

        <div className="space-y-4">
          {PROJECTS.map((proj) => (
            <div
              key={proj.role}
              onClick={() => setSelectedProject(proj)}
              className="edu-card p-6 cursor-pointer group transition-all duration-300 hover:border-cyan-400/70 hover:shadow-[0_0_24px_rgba(0,229,255,0.18)] hover:-translate-y-0.5 relative overflow-hidden"
            >

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-display font-semibold text-base text-white  transition-colors">
                    {proj.role}{" "}
                    <span className="text-cyan-400 font-normal">
                      [{proj.org}]
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="edu-card max-w-xl w-full p-7 sm:p-8 relative bg-[#030712] border border-cyan-500/50 shadow-[0_0_40px_rgba(0,229,255,0.25)] rounded-lg text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-cyan-950/80 pb-4">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
                  {selectedProject.org}
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
                  {selectedProject.role}
                </h3>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-cyan-950/60 border border-transparent hover:border-cyan-500/40 transition-all font-mono text-xs flex items-center gap-1"
                aria-label="Close modal"
              >
                <span className="hidden sm:inline text-[10px] uppercase text-slate-500">ESC</span>
                <X size={18} />
              </button>
            </div>

            <div className="mt-6">
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                {selectedProject.points?.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 leading-relaxed">
                    <span className="text-cyan-400 font-mono text-xs mt-0.5">▪</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <Section id="experience" title="Experience">
        <div className="space-y-6">
          {EXPERIENCE.map((job) => (
            <div key={job.role} className="edu-card p-6">
              <p className="text-cyan-400/70 text-xs font-mono">{job.when}</p>
              <p className="font-display font-semibold text-base text-white mt-1">
                {job.role} <span className="text-cyan-400 font-normal">[{job.org}]</span>
              </p>
              <ul className="mt-3 text-xs text-slate-300 space-y-2">
                {job.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-cyan-400 font-mono">▪</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="activities" title="Activities">
        <p className="font-mono text-xs text-cyan-400/60 -mt-2 mb-6 flex items-center gap-2">
          <span/>
          click any activity to view details
        </p>

        <div className="space-y-4">
          {ACTIVITIES.map((activity) => (
            <div
              key={activity.role}
              onClick={() => setSelectedProject(activity)}
              className="edu-card p-6 cursor-pointer group transition-all duration-300 hover:border-cyan-400/70 hover:shadow-[0_0_24px_rgba(0,229,255,0.18)] hover:-translate-y-0.5 relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-display font-semibold text-base text-white transition-colors">
                    {activity.role}{" "}
                    <span className="text-cyan-400 font-normal">
                      [{activity.org}]
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="skills" title="Technical skills">
        <div className="grid sm:grid-cols-2 gap-4">
          {SKILLS.map((group) => (
            <div key={group.label} className="edu-card p-5">
              <p className="text-cyan-400 font-display text-xs tracking-wider uppercase mb-3 font-mono">{group.label}</p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="skill-tag text-xs rounded px-2.5 py-1 font-mono tracking-wide">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="volunteering" title="Volunteering">
        <div className="space-y-4">
          {VOLUNTEER.map((v) => (
            <div key={v.org} className="edu-card p-5">
              <p className="font-display font-semibold text-sm text-white">
                {v.org} <span className="text-cyan-400 font-normal text-xs font-mono">/ {v.role}</span>
              </p>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <section id="contact" className="relative border-t border-cyan-950/60 overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 py-24 text-center">
          <h2 className="font-display font-bold text-3xl text-white [text-shadow:0_0_12px_rgba(0,229,255,0.7)] uppercase">
            Let's build something.
          </h2>
          <p className="mt-4 max-w-md mx-auto text-xs font-light text-slate-400">
            placeholder
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 text-xs font-mono tracking-widest uppercase">
            {SOCIALS.map((s) => (
              <a key={s.name} href={s.href} className="social-link">
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="max-w-3xl mx-auto px-6 py-10 text-center text-xs font-mono tracking-widest uppercase text-slate-600">
        sara ribeiro
      </footer>
    </div>
  );
}
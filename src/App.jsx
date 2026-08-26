import React from "react";
import { GraduationCap, MapPin } from "lucide-react";
import { EXPERIENCE, SKILLS, LANGUAGES, VOLUNTEER, SOCIALS, EDUCATION } from "./constants";


function Section({ id, title, children }) {
  return (
    <section id={id} className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10">
      <h2 className="text-2xl font-display font-semibold mb-6">{title}</h2>
      {children}
    </section>
  );
}

export default function App() {
  return (
    <div>
      {/* NAV */}
      <header className="sticky top-0 bg-[#0f0f14]/90 border-b border-white/10 z-10">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between text-sm">
          <span className="font-semibold font-display">Sara Ribeiro</span>
          <nav className="hidden sm:flex gap-5 text-white/60">
            <a href="#build" className="hover:text-white">Build</a>
            <a href="#education" className="hover:text-white">Education</a>
            <a href="#experience" className="hover:text-white">Experience</a>
            <a href="#skills" className="hover:text-white">Skills</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-6 py-24">
        <p className="text-white/50 text-sm mb-3">Porto, Portugal - incoming MSc student</p>
        <h1 className="text-5xl font-bold">Sara Ribeiro</h1>
      </section>

      <Section id="build" title="Build something">
        <p className="text-white/70 leading-relaxed max-w-xl">
          Just finished a Bachelor's in Informatics and Computing Engineering
          at FEUP, University of Porto, and starting an MSc later this year.
        </p>
      </Section>

      <Section id="education" title="Education">
        <div className="space-y-4">
          {EDUCATION.map((edu) => (
            <div key={edu.name} className="border border-white/15 rounded-xl p-6 flex gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2 border-white"
                style={{ background: "#071c33" }}
              >
                <GraduationCap size={22} color="white" />
              </div>
              <div>
                <p className="font-mono text-xs text-white/50">{edu.when}</p>
                <p className="font-display font-semibold text-xl mt-1">{edu.name}</p>
                <p className="text-sm mt-2 flex items-center gap-1 text-white/60">
                  <MapPin size={14} /> {edu.where}
                </p>
                <p className="text-sm mt-4 max-w-xl leading-relaxed text-white/60">{edu.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="languages" title="Languages">
        <ul className="space-y-2">
          {LANGUAGES.map((l) => (
            <li key={l.name} className="flex justify-between max-w-xs text-white/70">
              <span>{l.name}</span>
              <span>{l.level}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="experience" title="Experience">
        <div className="space-y-8">
          {EXPERIENCE.map((job) => (
            <div key={job.role}>
              <p className="text-white/50 text-xs font-mono">{job.when}</p>
              <p className="font-medium">{job.role} · {job.org}</p>
              <ul className="mt-1 text-sm text-white/60 list-disc list-inside">
                {job.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="skills" title="Technical skills">
        <div className="grid sm:grid-cols-2 gap-6">
          {SKILLS.map((group) => (
            <div key={group.label}>
              <p className="text-white/50 text-xs uppercase mb-2 font-mono">{group.label}</p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="text-xs border border-white/15 rounded px-2 py-1 text-white/70 font-mono">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="volunteering" title="Volunteering">
        <div className="space-y-6">
          {VOLUNTEER.map((v) => (
            <div key={v.org}>
              <p className="font-medium">{v.org} <span className="text-white/50 font-normal">· {v.role}</span></p>
              <p className="text-sm text-white/60 mt-1">{v.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <section id="contact" className="relative border-t border-white/10 overflow-hidden">
        <div className="absolute inset-0 blueprint-grid opacity-40 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 py-24 text-center">
          <h2 className="font-display font-bold text-3xl">Let's build something.</h2>
          <p className="mt-4 max-w-md mx-auto text-white/60">
            placeholder
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 text-white/70">
            {SOCIALS.map((s) => (
              <a key={s.name} href={s.href} className="hover:text-white underline">
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="max-w-3xl mx-auto px-6 py-10 text-center text-xs text-white/40">
        sara ribeiro
      </footer>
    </div>
  );
}

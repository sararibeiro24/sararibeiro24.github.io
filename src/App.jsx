import React from "react";
import { EXPERIENCE, SKILLS, LANGUAGES, VOLUNTEER, SOCIALS } from "./constants";

function Section({ id, title, children }) {
  return (
    <section id={id} className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
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
          <span className="font-semibold">Sara Ribeiro</span>
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
        <p className="font-medium">Bachelor in Informatics and Computing Engineering</p>
        <p className="text-white/60 text-sm mt-1">Faculty of Engineering, University of Porto · Sept 2023 — Jun 2026</p>
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
              <p className="text-white/50 text-xs">{job.when}</p>
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
              <p className="text-white/50 text-xs uppercase mb-2">{group.label}</p>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="text-xs border border-white/15 rounded px-2 py-1 text-white/70">
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

      <Section id="contact" title="Contact">
        <div className="flex gap-4 text-white/70">
          {SOCIALS.map((s) => (
            <a key={s.name} href={s.href} className="hover:text-white underline">
              {s.name}
            </a>
          ))}
        </div>
      </Section>

      <footer className="max-w-3xl mx-auto px-6 py-10 text-center text-xs text-white/40">
        sara ribeiro
      </footer>
    </div>
  );
}

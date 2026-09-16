import React from "react";
import { GraduationCap, MapPin } from "lucide-react";
import Section from "./Section";
import { EDUCATION } from "../constants";

export default function Education() {
  return (
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
  );
}

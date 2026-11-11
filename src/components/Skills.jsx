import React from "react";
import Section from "./Section";
import { useLocale } from "../locale-context";

export default function Skills() {
  const { t, content } = useLocale();

  return (
    <Section id="skills" title={t.skillsTitle}>
      <div className="grid sm:grid-cols-2 gap-4">
        {content.skills.map((group) => (
          <div key={group.label} className="edu-card p-5">
            <p className="text-cyan-400 font-display text-xs tracking-wider uppercase mb-3 font-mono">{group.label}</p>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="skill-tag text-xs rounded px-2.5 py-1 font-mono tracking-wide">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

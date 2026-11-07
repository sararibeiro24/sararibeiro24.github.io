import React from "react";
import Section from "./Section";
import { useLocale } from "../locale-context";

export default function Projects({ onSelect }) {
  const { t, content } = useLocale();

  return (
    <Section id="projects" title={t.projectsTitle}>
      <p className="font-mono text-xs text-cyan-400/60 -mt-2 mb-6 flex items-center gap-2">
        <span />
        {t.projectsHint}
      </p>

      <div className="space-y-4">
        {content.projects.map((proj) => (
          <div
            key={proj.role}
            onClick={() => onSelect(proj)}
            className="edu-card p-6 cursor-pointer group transition-all duration-300 hover:border-cyan-400/70 hover:shadow-[0_0_24px_rgba(0,229,255,0.18)] hover:-translate-y-0.5 relative overflow-hidden"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-display font-semibold text-base text-white  transition-colors">{proj.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

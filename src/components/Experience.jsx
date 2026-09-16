import React from "react";
import Section from "./Section";
import { EXPERIENCE } from "../constants";

export default function Experience() {
  return (
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
  );
}

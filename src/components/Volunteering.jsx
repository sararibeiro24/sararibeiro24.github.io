import React from "react";
import Section from "./Section";
import { useLocale } from "../locale-context";

export default function Volunteering() {
  const { t, content } = useLocale();

  return (
    <Section id="volunteering" title={t.volunteeringTitle}>
      <div className="space-y-4">
        {content.volunteering.map((v) => (
          <div key={v.org} className="edu-card p-5">
            <p className="font-display font-semibold text-sm text-white">{v.org} <span className="text-cyan-400 font-normal text-xs font-mono">/ {v.role}</span></p>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">{v.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

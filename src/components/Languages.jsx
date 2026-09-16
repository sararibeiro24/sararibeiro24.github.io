import React from "react";
import Section from "./Section";
import { LANGUAGES } from "../constants";

export default function Languages() {
  return (
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
  );
}

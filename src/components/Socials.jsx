import React from "react";
import Section from "./Section";
import { SOCIALS } from "../constants";

export default function Socials() {
  return (
    <Section id="contact" title="Let's build something.">
      <p className="mt-4 max-w-md mx-auto text-xs font-light text-slate-400">Always curious. Always building.</p>
      <div className="mt-8 flex items-center justify-center gap-4 text-xs font-mono tracking-widest uppercase">
        {SOCIALS.map((s) => (
          <a key={s.name} href={s.href} className="social-link">
            {s.name}
          </a>
        ))}
      </div>
    </Section>
  );
}

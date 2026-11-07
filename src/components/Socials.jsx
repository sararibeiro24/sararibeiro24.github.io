import React from "react";
import Section from "./Section";
import { SOCIALS } from "../constants";
import { useLocale } from "../locale-context";

export default function Socials() {
  const { t } = useLocale();

  return (
    <Section id="contact" title={t.contactTitle}>
      <p className="mt-4 max-w-md mx-auto text-xs font-light text-slate-400">{t.tagline}</p>
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

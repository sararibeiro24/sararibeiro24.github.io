import React from "react";
import Section from "./Section";
import { SOCIALS } from "../constants";
import { useLocale } from "../locale-context";

export default function Socials() {
  const { t } = useLocale();

  return (
    <Section id="contact" title={t.contactTitle}>
      <p className="mt-4 max-w-md mx-auto text-center text-xs font-light text-slate-400">{t.tagline}</p>
      <div className="mt-8 flex items-center justify-center gap-4 text-xs font-mono tracking-widest uppercase">
        <div className="mt-8 flex items-center justify-center gap-4">
        {SOCIALS.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            title={s.name}
            aria-label={s.name}
            className="social-link w-12 h-12 flex items-center justify-center rounded-full"
          >
            <img
              src={s.image}
              alt=""
              className="w-5 h-5 object-contain"
            />
          </a>
        ))}
      </div>
      </div>
    </Section>
  );
}

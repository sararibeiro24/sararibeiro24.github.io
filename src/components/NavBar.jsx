import React from "react";
import { useLocale } from "../locale-context";

export default function Header() {
  const { language, setLanguage, t } = useLocale();

  return (
    <header className="site-nav sticky top-3 z-20 mx-auto w-[calc(100%-2rem)] max-w-6xl rounded-2xl">
      <div className="flex min-h-16 items-center justify-between gap-6 px-5 py-3 sm:px-7">
        <a href="#top" className="font-display flex shrink-0 items-center font-bold text-white">
          Sara Ribeiro
        </a>
        <div className="flex items-center gap-5">
          <nav aria-label={t.navLabel} className="hidden flex-wrap items-center justify-end gap-x-5 gap-y-2 text-xs font-mono font-semibold uppercase tracking-widest text-slate-300 sm:flex">
            <a href="#build" className="nav-link">{t.build}</a>
            <a href="#education" className="nav-link">{t.education}</a>
            <a href="#projects" className="nav-link">{t.projects}</a>
            <a href="#experience" className="nav-link">{t.experience}</a>
            <a href="#activities" className="nav-link">{t.activities}</a>
            <a href="#skills" className="nav-link">{t.skills}</a>
            <a href="#contact" className="nav-contact">{t.contact}</a>
          </nav>
          <div className="language-switch" role="group" aria-label={t.languageLabel}>
            {["en", "pt"].map((option) => (
              <button
                key={option}
                type="button"
                lang={option}
                aria-pressed={language === option}
                onClick={() => setLanguage(option)}
                className={`language-option ${language === option ? "is-active" : ""}`}
              >
                {option.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

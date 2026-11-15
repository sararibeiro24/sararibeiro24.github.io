import React from "react";
import { FileDown } from "lucide-react";
import { TypingScene } from "./TypingScene";
import GithubCommitCount from "./GithubCommitCount";
import { useLocale } from "../locale-context";

export default function Hero() {
  const { t } = useLocale();

  return (
    <section id="top" className="hero-section mx-auto flex max-w-6xl flex-col items-center justify-between gap-12 px-6 py-20 text-center sm:flex-row sm:text-left lg:py-28">
      <div className="hero-copy">
        <p className="text-cyan-400/80 font-mono text-xs uppercase tracking-widest mb-3">
          {t.heroLocation}
        </p>
        <h1 className="text-6xl font-display font-black tracking-tight text-gradient sm:text-7xl lg:text-8xl">Sara<br />Ribeiro</h1>
        <p className="hero-intro mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
          {t.heroIntro}
        </p>
        <div className="mt-6 flex justify-center sm:justify-start">
          <a
            href="/CV-SaraRibeiro.pdf"
            download="CV-SaraRibeiro.pdf"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <FileDown size={14} />
            <span>Download CV</span>
          </a>
        </div>
      </div>

      <div className="hero-art flex w-full shrink-0 flex-col items-center gap-3 sm:w-88 md:w-96">
        <div className="w-full">
          <TypingScene />
        </div>
        <GithubCommitCount />
      </div>
    </section>
  );
}

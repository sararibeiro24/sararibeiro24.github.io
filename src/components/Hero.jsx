import React from "react";
import { Robot } from "../robot";
import GithubCommitCount from "./GithubCommitCount";

export default function Hero() {
  return (
    <section id="top" className="hero-section mx-auto flex max-w-6xl flex-col items-center justify-between gap-12 px-6 py-20 text-center sm:flex-row sm:text-left lg:py-28">
      <div className="hero-copy">
        <p className="text-cyan-400/80 font-mono text-xs uppercase tracking-widest mb-3">
          Porto, Portugal - incoming MSc student
        </p>
        <h1 className="text-6xl font-display font-black tracking-tight text-gradient sm:text-7xl lg:text-8xl">Sara<br />Ribeiro</h1>
        <p className="hero-intro mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
          Informatics and Computing Engineering graduate building thoughtful software and exploring systems.
        </p>
      </div>

      <div className="hero-art flex w-full shrink-0 flex-col items-center gap-3 sm:w-80">
        <div className="hero-orbit">
          <Robot />
        </div>
        <GithubCommitCount />
      </div>
    </section>
  );
}

import React from "react";

export default function Header() {
  return (
    <header className="site-nav sticky top-3 z-20 mx-auto w-[calc(100%-2rem)] max-w-6xl rounded-2xl">
      <div className="flex min-h-16 items-center justify-between gap-6 px-5 py-3 sm:px-7">
        <a href="#top" className="font-display flex shrink-0 items-center font-bold text-white">
          Sara Ribeiro
        </a>
        <nav aria-label="Main navigation" className="hidden flex-wrap items-center justify-end gap-x-5 gap-y-2 text-xs font-mono font-semibold uppercase tracking-widest text-slate-300 sm:flex">
          <a href="#build" className="nav-link">Build</a>
          <a href="#education" className="nav-link">Education</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#experience" className="nav-link">Experience</a>
          <a href="#activities" className="nav-link">Activities</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#contact" className="nav-contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}

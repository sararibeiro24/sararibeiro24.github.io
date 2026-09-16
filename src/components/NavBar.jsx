import React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 bg-[#030712]/90 backdrop-blur-md border-b border-cyan-900/40 z-10">
      <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between text-sm">
        <span className="font-display font-bold text-white flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-cyan-400 rounded-sm shadow-[0_0_8px_#00e5ff]" />
          Sara Ribeiro
        </span>
        <nav className="hidden sm:flex gap-5 text-xs font-mono font-semibold uppercase tracking-widest text-slate-400">
          <a href="#build" className="hover:text-cyan-400 transition-colors">Build</a>
          <a href="#education" className="hover:text-cyan-400 transition-colors">Education</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
          <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
          <a href="#activities" className="hover:text-cyan-400 transition-colors">Activities</a>
          <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
          <a href="#contact" className="border border-cyan-400/60 px-2.5 py-1 rounded text-cyan-400 hover:bg-cyan-400/10 transition-all">Contact</a>
        </nav>
      </div>
    </header>
  );
}

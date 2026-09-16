import React from "react";

export default function Section({ id, title, children }) {
  return (
    <section id={id} className="max-w-3xl mx-auto px-6 py-16 border-t border-cyan-950/60">
      <div className="w-12 h-0.5 bg-cyan-400 shadow-[0_0_10px_#00e5ff] mb-4" />
      <h2 className="text-2xl font-display font-bold mb-6 text-white tracking-wider uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

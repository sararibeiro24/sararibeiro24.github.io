import React from "react";
import { Robot } from "../robot";

export default function Hero() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20 flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
      <div>
        <p className="text-cyan-400/80 font-mono text-xs uppercase tracking-widest mb-3">
          Porto, Portugal - incoming MSc student
        </p>
        <h1 className="text-5xl font-display font-black tracking-tight text-gradient">Sara Ribeiro</h1>
      </div>

      <div className="w-full sm:w-80 h-64 shrink-0 flex items-center justify-center">
        <Robot />
      </div>
    </section>
  );
}

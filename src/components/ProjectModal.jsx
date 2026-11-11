import React from "react";
import { X, ExternalLink } from "lucide-react";
import { useLocale } from "../locale-context";

export default function ProjectModal({ project, onClose }) {
  const { t } = useLocale();
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}>
      <div className="edu-card max-w-xl w-full p-7 sm:p-8 relative bg-[#030712] border border-cyan-500/50 shadow-[0_0_40px_rgba(0,229,255,0.25)] rounded-lg text-left" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4 border-b border-cyan-950/80 pb-4">
          <div>
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">{project.org}</span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">{project.role}</h3>
          </div>

          <button onClick={onClose} className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-cyan-950/60 border border-transparent hover:border-cyan-500/40 transition-all font-mono text-xs flex items-center gap-1" aria-label={t.close}>
            <span className="hidden sm:inline text-[10px] uppercase text-slate-500">ESC</span>
            <X size={18} />
          </button>
        </div>

        <div className="mt-6">
          {project.description && (
            <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed bg-cyan-950/30 p-3.5 rounded border border-cyan-500/20">
              {project.description}
            </p>
          )}
          <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
            {project.points?.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3 leading-relaxed">
                <span className="text-cyan-400 font-mono text-xs mt-0.5">▪</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-end">
            {project.info && (
              <a href={project.info} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 border border-cyan-400/30 px-3 py-2 rounded hover:bg-cyan-400/10 transition-all">
                <ExternalLink size={14} />
                {t.viewProject}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

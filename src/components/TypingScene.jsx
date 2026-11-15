import React, { useEffect, useRef, useState } from "react";
import { Terminal } from "lucide-react";
import { useLocale } from "../locale-context";
import { initScene } from "./objects/Scene.js";

export const TypingScene = () => {
  const mountRef = useRef(null);
  const { t } = useLocale();
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const { dispose } = initScene(container, {
      onProgress: (pct) => setLoadProgress(pct),
      onLoad: () => setIsLoaded(true),
      onError: () => setIsLoaded(true),
    });

    return () => {
      dispose();
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center select-none">
      <div
        ref={mountRef}
        className="w-full relative flex items-center justify-center overflow-visible"
        style={{ height: "340px" }}
      >
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-950/60 backdrop-blur-xs rounded-2xl z-10 border border-cyan-500/20">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin" />
              <Terminal size={18} className="text-cyan-300" />
            </div>
            <div className="flex flex-col items-center gap-1.5 px-4 w-48">
              <span className="text-[11px] font-mono tracking-wide text-cyan-300 text-center">
                {t.typingLoading || "Loading 3D workspace..."}
              </span>
              <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden border border-cyan-500/20">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-sky-400 transition-all duration-200"
                  style={{ width: `${Math.max(8, loadProgress)}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {loadProgress > 0 ? `${loadProgress}%` : "Initialising..."}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingScene;

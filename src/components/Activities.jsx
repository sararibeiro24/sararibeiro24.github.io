import React from "react";
import Section from "./Section";
import { useLocale } from "../locale-context";

export default function Activities({ onSelect }) {
  const { t, content } = useLocale();

  return (
    <Section id="activities" title={t.activitiesTitle}>
      <p className="font-mono text-xs text-cyan-400/60 -mt-2 mb-6 flex items-center gap-2">
        <span />
        {t.activitiesHint}
      </p>

      <div className="space-y-4">
        {content.activities.map((activity) => (
          <div
            key={activity.role}
            onClick={() => onSelect(activity)}
            className="edu-card p-6 cursor-pointer group transition-all duration-300 hover:border-cyan-400/70 hover:shadow-[0_0_24px_rgba(0,229,255,0.18)] hover:-translate-y-0.5 relative overflow-hidden"
          >

           

            <p className="font-display font-semibold text-base text-white">
              {activity.role}
               <span className="text-cyan-400 font-normal">
                [{activity.org}]
              </span>
            </p>

            {activity.description && (
              <p className="text-xs text-slate-300/80 mt-2 leading-relaxed">
                {activity.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
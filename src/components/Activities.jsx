import React from "react";
import Section from "./Section";
import { ACTIVITIES } from "../constants";

export default function Activities() {
  return (
    <Section id="activities" title="Activities">
      <p className="font-mono text-xs text-cyan-400/60 -mt-2 mb-6 flex items-center gap-2">
        <span />
        click any activity to view details
      </p>

      <div className="space-y-4">
        {ACTIVITIES.map((activity) => (
          <div key={activity.role} className="edu-card p-6 cursor-pointer group transition-all duration-300 hover:border-cyan-400/70 hover:shadow-[0_0_24px_rgba(0,229,255,0.18)] hover:-translate-y-0.5 relative overflow-hidden">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-display font-semibold text-base text-white transition-colors">
                  {activity.role} <span className="text-cyan-400 font-normal">[{activity.org}]</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

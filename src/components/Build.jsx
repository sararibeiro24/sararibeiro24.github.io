import React from "react";
import Section from "./Section";
import { useLocale } from "../locale-context";

export default function Build() {
  const { t } = useLocale();

  return (
    <Section id="build" title={t.buildTitle}>
      <p className="text-slate-300 leading-relaxed max-w-xl text-sm font-light">
        {t.buildDescription}
      </p>
    </Section>
  );
}

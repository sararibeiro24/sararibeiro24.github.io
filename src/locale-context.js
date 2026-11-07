import { createContext, useContext } from "react";

export const LocaleContext = createContext(null);

export function useLocale() {
  const locale = useContext(LocaleContext);
  if (!locale) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return locale;
}

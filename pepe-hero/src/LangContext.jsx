import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { MESSAGES } from "./i18n.js";

const KEY = "lang";
const DEFAULT = "en"; // anglais par défaut, français seulement si le visiteur le choisit

const Ctx = createContext({ lang: DEFAULT, setLang: () => {}, t: k => k });
export const useLang = () => useContext(Ctx);

const read = () => {
  try { const v = localStorage.getItem(KEY); return v === "fr" || v === "en" ? v : DEFAULT; }
  catch { return DEFAULT; }
};

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(read);

  const setLang = useCallback(l => {
    setLangState(l);
    try { localStorage.setItem(KEY, l); } catch { /* navigation privée : on ignore */ }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement("meta"); m.name = "description"; document.head.appendChild(m); }
    m.content = MESSAGES[lang]["meta.desc"];
  }, [lang]);

  const t = useCallback((key, vars) => {
    let s = (MESSAGES[lang] && MESSAGES[lang][key]) ?? MESSAGES.en[key] ?? key;
    if (vars) for (const k in vars) s = s.split("{" + k + "}").join(vars[k]);
    return s;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

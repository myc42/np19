import { useLang } from "./LangContext.jsx";
import "./langswitch.css";

export default function LangSwitch() {
  const { lang, setLang, t } = useLang();
  return (
    <div className="lang" role="group" aria-label={t("lang.label")}>
      <button type="button" className="lang-btn" lang="fr" aria-label="Français" aria-pressed={lang === "fr"} onClick={() => setLang("fr")}>FR</button>
      <span className="lang-sep" aria-hidden="true">|</span>
      <button type="button" className="lang-btn" lang="en" aria-label="English" aria-pressed={lang === "en"} onClick={() => setLang("en")}>EN</button>
    </div>
  );
}

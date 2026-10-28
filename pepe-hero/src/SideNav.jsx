import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useContact } from "./ContactContext.jsx";
import { useLang } from "./LangContext.jsx";
import LangSwitch from "./LangSwitch.jsx";
import "./sidenav.css";

const INITIALES = "NP19";
const NOM = ["Nicolas", "Pépé"];
const LINKS = [
  { to: "/", label: "nav.home" },
  { to: "/#apropos", label: "nav.about" },
  { to: "/#parcours", label: "nav.career" },
];

// Nav latéral fixe (ordinateur) ou petit panneau sous le bouton (téléphone).
// Texte clair sur fond sombre, noir sur fond blanc : change tout seul au défilement.
export default function SideNav() {
  const { pathname } = useLocation();
  const { openContact } = useContact();
  const { t } = useLang();
  const home = pathname === "/";
  const [on, setOn] = useState("dark");     // fond derrière le nav : "dark" ou "light"
  const [active, setActive] = useState(0);  // section en cours : 0 accueil, 1 à propos, 2 parcours
  const [onHero, setOnHero] = useState(true);
  const [heroUi, setHeroUi] = useState(false);
  const [open, setOpen] = useState(false);

  // Le hero annonce la fin de son entrée : le nav apparaît alors avec le titre.
  useEffect(() => {
    const f = e => setHeroUi(!!e.detail);
    window.addEventListener("hero-ui", f);
    return () => window.removeEventListener("hero-ui", f);
  }, []);

  // Fond sous le nav et section courante, recalculés au défilement.
  useEffect(() => {
    if (!home) { setOn("light"); setOnHero(false); return; }
    let raf = 0;
    const calc = () => {
      raf = 0;
      const Y = 110, vh = window.innerHeight;
      const dark = [...document.querySelectorAll(".ph, .cover:not(.no-img)")].some(el => {
        const r = el.getBoundingClientRect();
        const rel = (Y - r.top) / r.height;
        return rel >= 0 && rel < (el.classList.contains("ph") ? 0.5 : 0.6); // seuils : bas de bannière = fond blanc
      });
      setOn(dark ? "dark" : "light");
      let a = 0;
      [".ph", "#apropos", "#parcours"].forEach((q, i) => {
        const el = document.querySelector(q);
        if (el && el.getBoundingClientRect().top <= vh * 0.4) a = i;
      });
      setActive(a);
      const hero = document.querySelector(".ph");
      setOnHero(!!hero && hero.getBoundingClientRect().bottom > 140);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(calc); };
    calc();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [home]);

  // Panneau mobile : Échap le ferme.
  useEffect(() => {
    if (!open) return;
    const k = e => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [open]);

  const show = !home || !onHero || heroUi; // caché seulement pendant l’entrée du hero
  const close = () => setOpen(false);

  return (
    <div className={"sn" + (show ? " show" : "")} data-on={on}>
      <div className="sn-side">
        <Link to="/" className="sn-logo">
          <span className="sn-logo-icon">{INITIALES}</span>
          <span className="sn-logo-div" />
          <span className="sn-logo-text">{NOM[0]}<br />{NOM[1]}</span>
        </Link>
        <nav className="sn-nav" aria-label={t("nav.main")}>
          {LINKS.map((l, i) => (
            <Link key={l.to} to={l.to} className="sn-link" aria-current={home && active === i ? "location" : undefined}>{t(l.label)}</Link>
          ))}
        </nav>
        <LangSwitch />
      </div>

      <button type="button" className="sn-contact" onClick={openContact}>
        {t("contact")} <span className="sn-arrow" aria-hidden="true">↗</span>
      </button>

      {open && <div className="sn-away" onClick={close} aria-hidden="true" />}
      <div className={"sn-menu" + (open ? " open" : "")} id="sn-menu">
        <nav aria-label={t("nav.menu")}>
          {LINKS.map((l, i) => (
            <Link key={l.to} to={l.to} onClick={close} aria-current={home && active === i ? "location" : undefined}>{t(l.label)}</Link>
          ))}
        </nav>
        <LangSwitch />
      </div>

      <button type="button" className="sn-burger" aria-expanded={open} aria-controls="sn-menu"
        aria-label={open ? t("nav.close") : t("nav.open")} onClick={() => setOpen(o => !o)}>
        <span /><span /><span />
      </button>
    </div>
  );
}

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "./LangContext.jsx";
import "./contact.css";

const EMAIL = "contact@nicolaspepe.com"; // remplacez par votre adresse
const EMPTY = { name: "", company: "", email: "", subject: "", msg: "", priv: false };

const Ctx = createContext({ openContact: () => {} });
export const useContact = () => useContext(Ctx);

// À placer une seule fois, dans App.jsx : n’importe quel bouton du site peut ensuite appeler openContact.
export function ContactProvider({ children }) {
  const [open, setOpen] = useState(false);
  const opener = useRef(null);
  const openContact = useCallback(e => {
    opener.current = (e && e.currentTarget) || document.activeElement; // pour rendre le focus à la fermeture
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);
  return (
    <Ctx.Provider value={{ openContact }}>
      {children}
      <ContactModal open={open} onClose={close} opener={opener} />
    </Ctx.Provider>
  );
}

function ContactModal({ open, onClose, opener }) {
  const { t } = useLang();
  const [sent, setSent] = useState(false);
  const [f, setF] = useState(EMPTY);
  const box = useRef(null), first = useRef(null), timers = useRef([]);
  const set = k => e => setF(s => ({ ...s, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  // Ouverte : défilement bloqué, focus dans la fenêtre, Échap ferme, Tab reste dans la fenêtre.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => first.current && first.current.focus());
    const onKey = e => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab" || !box.current) return;
      const els = [...box.current.querySelectorAll("a[href],button,input,select,textarea")];
      if (!els.length) return;
      const a = els[0], z = els[els.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      if (opener.current && opener.current.focus) opener.current.focus({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const submit = e => {
    e.preventDefault(); // champs obligatoires et case cochée : vérifiés par le navigateur (required)
    const subj = f.subject ? t("c.s." + f.subject) : t("c.message");
    const subject = encodeURIComponent(subj + " : " + f.name);
    const body = encodeURIComponent(f.msg + "\n\n" + f.name + (f.company ? " (" + f.company + ")" : "") + "\n" + f.email);
    window.location.href = "mailto:" + EMAIL + "?subject=" + subject + "&body=" + body;
    setSent(true);
    timers.current.push(setTimeout(() => {
      onClose();
      timers.current.push(setTimeout(() => { setSent(false); setF(EMPTY); }, 400));
    }, 2600));
  };

  return (
    <div className={"modal" + (open ? " open" : "")} aria-hidden={!open} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-box" role="dialog" aria-modal="true" aria-labelledby="modal-title" ref={box}>
        <button type="button" className="modal-close" onClick={onClose} aria-label={t("c.close")}>×</button>
        {sent ? (
          <div className="modal-success" role="status">
            <h2 id="modal-title">{t("c.thanks")}</h2>
            <p>{t("c.thanksText")}</p>
          </div>
        ) : (
          <form onSubmit={submit}>
            <h2 id="modal-title">{t("contact")}</h2>
            <label htmlFor="f-name">{t("c.name")}<input id="f-name" ref={first} value={f.name} onChange={set("name")} required /></label>
            <label htmlFor="f-company">{t("c.company")}<input id="f-company" value={f.company} onChange={set("company")} /></label>
            <label htmlFor="f-email">{t("c.email")}<input id="f-email" type="email" value={f.email} onChange={set("email")} required /></label>
            <label htmlFor="f-subject">{t("c.subject")}
              <select id="f-subject" value={f.subject} onChange={set("subject")}>
                <option value="">{t("c.choose")}</option>
                <option value="press">{t("c.s.press")}</option>
                <option value="partner">{t("c.s.partner")}</option>
                <option value="question">{t("c.s.question")}</option>
                <option value="other">{t("c.s.other")}</option>
              </select>
            </label>
            <label htmlFor="f-msg">{t("c.msgLabel")}<textarea id="f-msg" rows="5" value={f.msg} onChange={set("msg")} required /></label>
            <label className="modal-check" htmlFor="f-priv">
              <input id="f-priv" type="checkbox" checked={f.priv} onChange={set("priv")} required />
              <span>{t("c.privA")}<Link to="/mentions-legales" onClick={onClose}>{t("c.privB")}</Link>{t("c.privC")}</span>
            </label>
            <button type="submit" className="modal-submit">{t("c.send")}</button>
          </form>
        )}
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { useContact } from "./ContactContext.jsx";
import { useLang } from "./LangContext.jsx";
import "./footer.css";

export default function Footer() {
  const { openContact } = useContact();
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-tag">{t("footer.tag")}</p>
        <button type="button" className="footer-cta" onClick={openContact}>{t("contact")}</button>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© NICOLAS PEPE</span>
        <div className="footer-links">
          <Link to="/mentions-legales" className="footer-link">{t("footer.legal")}</Link>
          <Link to="/#parcours" className="footer-link">{t("footer.career")}</Link>
          <Link to="/#apropos" className="footer-link">{t("footer.about")}</Link>
        </div>
        <div className="footer-socials">
          <a href="https://x.com/Nicolaspepe1919" target="_blank" rel="noopener noreferrer" className="footer-social">X/Twitter</a>
          <a href="https://www.instagram.com/nicolas.pepe19" target="_blank" rel="noopener noreferrer" className="footer-social">Instagram</a>
          <a href="https://www.facebook.com/NicolasPepe19/" target="_blank" rel="noopener noreferrer" className="footer-social">Facebook</a>
        </div>
      </div>
    </footer>
  );
}

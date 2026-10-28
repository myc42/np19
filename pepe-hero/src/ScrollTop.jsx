import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// À chaque navigation : défilement jusqu’à la section visée (#parcours), sinon retour en haut.
export default function ScrollTop() {
  const { pathname, hash, key } = useLocation();
  const prev = useRef(null);
  useEffect(() => {
    const samePage = prev.current === pathname;
    prev.current = pathname;
    const el = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (el) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ behavior: samePage && !reduced ? "smooth" : "auto", block: "start" });
    } else {
      window.scrollTo(0, 0);
    }
  }, [key]); // key change à chaque clic, même sur un lien identique
  return null;
}

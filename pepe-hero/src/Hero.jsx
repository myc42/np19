import { useEffect, useRef, useState } from "react";
import { MEDIA } from "./media.js";
import { useLang } from "./LangContext.jsx";
import "./hero.css";
import { animate, useMotionValue } from "framer-motion"; // ou "motion/react" avec le paquet Motion récent

/* ───────── Médias : remplace par tes propres fichiers (droits d’utilisation en règle) ─────────
   Une entrée par carte ; la liste est répétée si elle compte moins de 34 éléments.
   Sans média, des couvertures de remplacement sont générées. */
const MONO = "NP";

const N = 34, STEP = 360 / N, DRIFT = 7;
const wrap = a => ((a + 180) % 360 + 360) % 360 - 180;
const clamp = t => Math.min(1, Math.max(0, t));
const easeOut = t => 1 - Math.pow(1 - t, 3);
const r2 = n => Math.round(n * 100) / 100;
const r3 = n => Math.round(n * 1000) / 1000;
const ORD = Array.from({ length: N }, (_, i) => Math.abs(wrap(i * STEP)) / 180); // 0 = carte du haut

const ph = i => "data:image/svg+xml," + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 320"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${(i * 47) % 360},55%,62%)"/><stop offset="1" stop-color="hsl(${(i * 47 + 60) % 360},60%,28%)"/></linearGradient></defs><rect width="180" height="320" fill="url(#g)"/><text x="90" y="178" font-family="Georgia,serif" font-size="64" fill="#fff" fill-opacity=".85" text-anchor="middle">${i + 1}</text></svg>`);
const CDN = ""; // ex. "https://cdn.monsite.fr" : préfixe des chemins qui commencent par /
const url = p => (p && p.startsWith("/") ? CDN + p : p || "");
const CARDS = Array.from({ length: N }, (_, i) => {
  const m = MEDIA.length ? MEDIA[i % MEDIA.length] : {};
  return { cover: url(m.cover) || ph(i), video: url(m.video), n: m.n || i + 1, href: m.href || "", ext: /^https?:/.test(m.href || "") };
});

/* ═════════ 1 · LA POSE D’UNE CARTE ═════════
   Une seule transformation, dans cet ordre : aller au pivot, tourner autour,
   pousser le long de l’axe tourné, retourner, mettre à l’échelle. */
const pose = (pivotY, depth, angle, radius, flip, s) =>
  `translate3d(0,${r2(pivotY)}px,${r2(depth)}px) rotateZ(${r2(angle)}deg) translate3d(0,${r2(-radius)}px,0) rotateY(${r2(flip)}deg) scale(${r3(s)})`;

/* ═════════ 2 · LA DISTRIBUTION (deal : 0 → 1) ═════════
   Chaque carte a sa tranche : la carte du haut part la première, puis on s’étend des deux côtés. */
const dealCard = (d, i) => {
  const p = easeOut(clamp((d - ORD[i] * 0.6) / 0.4));
  return {
    p,                 // 0 → 1
    sweep: 70 * (1 - p), // part 70° à droite de sa place, tout le paquet va vers la gauche
    low: 140 * (1 - p),  // démarre 140px plus bas, hors écran
    flip: 180 * (1 - p), // dos → face pendant le vol
    sc: 0.7 + 0.3 * p,
  };
};

/* ═════════ 3 · L’OUVERTURE (lift : 0 → 1) ═════════
   Rayon et pivot grandissent avec les cartes ; la scène se penche ; la roue fait 28° vers la gauche,
   dans le même sens que la dérive, donc jamais de retour en arrière. */
const liftGeo = L => ({ R: 580 + 430 * L, P: 500 + 314 * L, cs: 1 + 0.35 * L, ws: 1 + 0.14 * L, tip: 12 * L, turn: -28 * L });

const put = (el, c, k, v) => { if (c[k] !== v) { c[k] = v; el.style[k] = v; } }; // n’écrit que si ça a changé
const decode = src => new Promise(res => { const im = new Image(); im.src = src; (im.decode ? im.decode() : Promise.resolve()).then(res, res); });
const warm = src => new Promise(res => { const v = document.createElement("video"); v.muted = true; v.preload = "auto"; v.oncanplay = v.onerror = () => res(); setTimeout(res, 6000); v.src = src; });

const CLOUD_BACK = Array.from({ length: 13 }, (_, k) => [k * 135, 210 + (k % 3) * 22, 90 + ((k * 37) % 40)]);
const CLOUD_FRONT = Array.from({ length: 11 }, (_, k) => [80 + k * 160, 322 + (k % 2) * 14, 80 + ((k * 53) % 45)]);
// Version téléphone : quelques grandes courbes (rayon 58 à 72), sans déformation.
const CLOUD_BACK_M = [[-10, 190, 66], [112, 192, 72], [236, 190, 64], [356, 193, 70], [440, 190, 66]];
const CLOUD_FRONT_M = [[10, 278, 60], [128, 280, 66], [250, 277, 58], [372, 281, 64]];

export default function Hero() {
  const { t } = useLang();
  const deal = useMotionValue(0), lift = useMotionValue(0);
  const frame = useRef(null), world = useRef(null), sky = useRef(null), clouds = useRef(null);
  const cardEls = useRef([]), vidEls = useRef([]), ctls = useRef([]);
  const cache = useRef({ cards: Array.from({ length: N }, () => ({})), world: {}, sky: {}, clouds: {} });
  const S = useRef({ target: 0, vis: 0, vel: 0, drag: false, moved: 0, x0: 0, t0: 0, lastT: 0, dpp: 0.05, suppress: false, end: 0, reduced: false, pl: [] });
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [ui, setUi] = useState(false);
  const [ended, setEnded] = useState(false);
  useEffect(() => { window.dispatchEvent(new CustomEvent("hero-ui", { detail: ui })); }, [ui]);

  /* Échap, Tab et le bouton : fin immédiate de l’entrée */
  const finish = () => {
    const g = S.current; if (g.end) return; g.end = 1;
    ctls.current.forEach(c => c.stop());
    deal.set(1); lift.set(1);
    setProgress(100); setLoaded(true); setUi(true); setEnded(true);
  };

  /* Séquence : décoder les couvertures → distribuer (en chargeant les aperçus vidéo) → ouvrir */
  useEffect(() => {
    const g = S.current; let dead = false, timer;
    g.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    g.end = 0;
    if (g.reduced) { finish(); return; }
    deal.set(0); lift.set(0);
    const run = async () => {
      const covers = [...new Set(CARDS.map(c => c.cover))];
      const near = [...new Set(CARDS.filter((c, i) => c.video && Math.abs(wrap(i * STEP)) <= 45).map(c => c.video))];
      const total = covers.length + near.length; let n = 0;
      const bump = () => setProgress(Math.round((++n / total) * 100));
      await Promise.all(covers.map(s => decode(s).then(bump))); // avant la distribution : aucune carte n’apparaît en plein vol
      if (dead || g.end) return;
      const d = animate(deal, 1, { duration: 2.6, ease: "linear" }); ctls.current.push(d);
      await Promise.all([d, Promise.all(near.map(s => warm(s).then(bump)))]); // distribution finie ET médias prêts
      if (dead || g.end) return;
      setProgress(100); setLoaded(true);
      const l = animate(lift, 1, { duration: 1.9, ease: [0.5, 0, 0.15, 1] }); ctls.current.push(l);
      timer = setTimeout(() => setUi(true), 1000); // titre et en-tête : environ 1 s après le début, roue encore en mouvement
      await l;
      if (!dead && !g.end) setEnded(true);
    };
    run();
    return () => { dead = true; clearTimeout(timer); ctls.current.forEach(c => c.stop()); ctls.current = []; };
  }, []);

  useEffect(() => {
    const k = e => { if (e.key === "Escape" || e.key === "Tab") finish(); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  /* ═════════ 4 · BOUCLE UNIQUE : roue, vidéo, inertie ═════════ */
  useEffect(() => {
    const g = S.current, C = cache.current;
    let raf, last = performance.now();
    const tick = now => {
      const dt = Math.min(0.05, (now - last) / 1000); last = now;
      const d = deal.get(), L = lift.get();
      const { R, P, cs, ws, tip, turn } = liftGeo(L);
      g.dpp = 180 / (Math.PI * R * ws); // degrés par pixel : la roue suit le doigt

      if (!g.drag) {
        g.target += g.vel * dt; g.vel *= Math.exp(-dt * 3.2);          // un coup de doigt glisse puis s’éteint
        g.target -= (g.reduced ? 0 : DRIFT) * L * dt;                   // dérive vers la gauche, montée en charge avec lift
      }
      g.vis += (g.target - g.vis) * (1 - Math.exp(-dt * 9));            // suivi exponentiel

      put(world.current, C.world, "transform", `rotateX(${r2(tip)}deg) scale(${r3(ws)})`);
      put(sky.current, C.sky, "opacity", String(r3(L)));
      put(clouds.current, C.clouds, "transform", `translate3d(0,${r2((1 - L) * 105)}%,0)`);

      for (let i = 0; i < N; i++) {
        const el = cardEls.current[i]; if (!el) continue;
        const c = dealCard(d, i), cc = C.cards[i];
        const a = i * STEP + g.vis + turn + c.sweep;
        const aw = Math.abs(wrap(a));
        const show = c.p > 0 && aw < 100;                                // le reste est masqué : jamais de raccord
        put(el, cc, "visibility", show ? "visible" : "hidden");
        if (show) put(el, cc, "transform", pose(P + c.low, -aw * 0.6, a, R * c.p, c.flip, c.sc * cs));

        const v = vidEls.current[i];                                      // lecture seulement près du haut, une fois la roue ouverte
        if (v && !g.reduced) {
          const want = L > 0.6 && show && aw < 40;
          if (want !== !!g.pl[i]) { g.pl[i] = want; if (want) v.play().catch(() => {}); else { v.pause(); v.classList.remove("on"); } }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  /* Gestes : glisser, balayer, molette. Le curseur n’incline jamais les cartes. */
  const down = e => {
    if (e.button > 0) return;
    const g = S.current; g.drag = true; g.moved = 0; g.x0 = e.clientX; g.t0 = g.target; g.lastT = performance.now(); g.vel = 0;
  };
  const move = e => {
    const g = S.current; if (!g.drag) return;
    const dx = e.clientX - g.x0;
    if (!g.moved && Math.abs(dx) > 6) { g.moved = 1; e.currentTarget.setPointerCapture(e.pointerId); }
    if (!g.moved) return;
    const now = performance.now(), dt = (now - g.lastT) / 1000, nt = g.t0 + dx * g.dpp;
    if (dt > 0) g.vel = g.vel * 0.6 + ((nt - g.target) / dt) * 0.4;
    g.target = nt; g.lastT = now;
  };
  const up = () => {
    const g = S.current; if (!g.drag) return; g.drag = false;
    if (!g.moved) return;
    if (performance.now() - g.lastT > 80) g.vel = 0;                      // pointeur arrêté avant le relâchement : on ignore la vitesse
    g.suppress = true; setTimeout(() => { g.suppress = false; }, 0);
  };
  const clickCapture = e => { if (S.current.suppress) { e.preventDefault(); e.stopPropagation(); } }; // un glissement n’ouvre pas de lien

  useEffect(() => {
    const el = frame.current;
    const onWheel = e => {
      const horizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (horizontal) e.preventDefault();                                  // le défilement vertical de la page reste libre
      S.current.target -= (horizontal ? e.deltaX : e.deltaY) * 0.03;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <section className="ph" ref={frame} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onClickCapture={clickCapture}>
      <button className="ph-skip" onClick={finish} hidden={ended}>{t("hero.skip")}</button>

      <div className="ph-sky" ref={sky} />
      <div className="ph-scene">
        <div className="ph-world" ref={world}>
          {CARDS.map((c, i) => (
            <a key={i} className="ph-card" href={c.href || undefined} target={c.ext ? "_blank" : undefined} rel={c.ext ? "noopener noreferrer" : undefined} draggable={false} ref={el => (cardEls.current[i] = el)}>
              <span className="ph-face">
                <img src={c.cover} alt="" draggable={false} onError={e => { e.currentTarget.src = ph(i); }} />
                {c.video && (
                  <video ref={el => (vidEls.current[i] = el)} src={c.video} muted loop playsInline preload="none" disablePictureInPicture disableRemotePlayback controlsList="nodownload nofullscreen noremoteplayback"
                    onPlaying={e => e.currentTarget.classList.add("on")} />
                )}
              </span>
              <span className="ph-face ph-back" aria-hidden="true">{MONO}</span>
              <span className="ph-sr">{t("hero.reel", { n: c.n })}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="ph-clouds" ref={clouds} aria-hidden="true">
        <svg className="ph-cloud-d" viewBox="0 0 1600 420" preserveAspectRatio="none">
          <g className="ph-cloud-back">{CLOUD_BACK.map(([x, y, r], k) => <circle key={k} cx={x} cy={y} r={r} />)}<rect y="270" width="1600" height="150" /></g>
          <g className="ph-cloud-front">{CLOUD_FRONT.map(([x, y, r], k) => <circle key={k} cx={x} cy={y} r={r} />)}<rect y="335" width="1600" height="85" /></g>
        </svg>
        <svg className="ph-cloud-m" viewBox="0 0 400 340" preserveAspectRatio="xMidYMax slice">
          <g className="ph-cloud-back">{CLOUD_BACK_M.map(([x, y, r], k) => <circle key={k} cx={x} cy={y} r={r} />)}<rect y="190" width="400" height="150" /></g>
          <g className="ph-cloud-front">{CLOUD_FRONT_M.map(([x, y, r], k) => <circle key={k} cx={x} cy={y} r={r} />)}<rect y="278" width="400" height="62" /></g>
        </svg>
      </div>

      <div className={"ph-title" + (ui ? " in" : "")}>
        <h1>{t("hero.title")}</h1>
        <p>{t("hero.tagline")}</p>
      </div>
      <div className={"ph-load" + (loaded ? " off" : "")} role="status">{t("hero.pct", { n: progress })}</div>
    </section>
    
  );
}


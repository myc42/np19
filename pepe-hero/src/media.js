// Vidéos      : src/videos/0.mp4 … 22.mp4, dans l’ordre de LINKS ci-dessous (0 = premier lien).
// Couvertures : src/covers/0.jpg … 22.jpg, extraites des vidéos.
// Les 34 cartes sont des vidéos : les 23 reels remplissent la roue, 11 d’entre eux y figurent deux fois,
// toujours à l’opposé l’un de l’autre (17 places d’écart), donc jamais visibles ensemble.
const byNumber = g => Object.fromEntries(Object.entries(g).map(([p, u]) => [p.match(/(\d+)\.\w+$/)[1], u]));
const VIDEOS = byNumber(import.meta.glob("./videos/*.mp4", { eager: true, query: "?url", import: "default" }));
const COVERS = byNumber(import.meta.glob("./covers/*.jpg", { eager: true, query: "?url", import: "default" }));

const LINKS = [
  "reel/DX1sJ1QsqKJ", "reel/CacrnwBDww2", "reel/DXrELSit_JA", "reel/DXm2NSzjnet", "reel/CaSeaYRDv4d", "p/B_nfapmhkpO",
  "reel/DWHqNHJjsnR", "reel/DV-z8WZDaqZ", "reel/DUjQSORjeX_", "reel/DPgrvw9jeXH", "reel/DPR_J8tDWo-", "reel/DOghTk3jLlC",
  "reel/DMKrdTbof1e", "reel/DK9vUT3tH7U", "reel/DI9CzwfMifp", "reel/DBlkaMuI4kP", "reel/DAlGsQvobjx", "reel/C-aBtSzI2qC",
  "reel/C-QIc_9NJCK", "reel/C-AepzosGRC", "reel/Cs00os3r9A2", "reel/CiCgBf9jDg9", "reel/CbxjYQDjfvT",
];

const reel = k => ({
  cover: COVERS[k],
  video: VIDEOS[k],
  href: `https://www.instagram.com/${LINKS[k]}/`,
  kind: "Reel",
  n: k + 1,
});

// Place de la roue (0–33) → numéro de vidéo (0–22).
const slot = s => (s <= 16 ? s : s <= 27 ? s - 17 : s - 11);

export const MEDIA = Array.from({ length: 34 }, (_, s) => reel(slot(s)));

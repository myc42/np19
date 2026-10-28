// Bannière de section : image (optionnelle), dégradé vers le blanc, titre en bas à gauche.
// Votre image : src/design/<name>.jpg (ou .jpeg, .png, .webp). Sans image, un dégradé de ciel s’affiche.
const IMGS = Object.fromEntries(
  Object.entries(import.meta.glob("./design/*.{jpg,jpeg,png,webp}", { eager: true, query: "?url", import: "default" }))
    .map(([p, u]) => [p.split("/").pop().replace(/\.\w+$/, ""), u])
);

export default function Cover({ name, id, title }) {
  const src = IMGS[name];
  return (
    <div className={"cover" + (src ? "" : " no-img")}>
      {src && <img src={src} alt="" />}
      <div className="cover-fade" />
      <h2 className="cover-title" id={id}>{title}</h2>
    </div>
  );
}

import Hero from "./Hero.jsx";
import Cover from "./Cover.jsx";
import AboutStory from "./AboutStory.jsx";
import CareerTable from "./CareerTable.jsx";
import { useLang } from "./LangContext.jsx";

export default function Home() {
  const { t } = useLang();
  return (
    <>
      <Hero />
      <div className="pg">
        <section className="sec" id="apropos" aria-labelledby="apropos-titre">
          <Cover name="apropos" id="apropos-titre" title={t("nav.about")} />
          <div className="sec-body"><div className="ap-col"><AboutStory /></div></div>
        </section>
        <section className="sec" id="parcours" aria-labelledby="parcours-titre">
          <Cover name="parcours" id="parcours-titre" title={t("nav.career")} />
          <div className="sec-body"><CareerTable /></div>
        </section>
      </div>
    </>
  );
}

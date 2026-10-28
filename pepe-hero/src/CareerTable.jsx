import { useLang } from "./LangContext.jsx";

const FM = "https://www.footmercato.net/club/";

// Du plus récent au plus ancien.
// date : "jj/mm/aaaa" ("" si inconnue)
// type : "free" | "return" | "loan" | "" (inconnu) · fee : montant en millions d’euros
const CAREER = [
  { club: "Villarreal",     date: "04/08/2024", type: "free",   slug: "villarreal-cf" },
  { club: "Trabzonspor",    date: "08/09/2023", type: "free",   slug: "trabzonspor-kulubu" },
  { club: "Arsenal",        date: "01/07/2023", type: "return", slug: "arsenal" },
  { club: "Nice",           date: "25/08/2022", type: "loan",   slug: "ogc-nice" },
  { club: "Arsenal",        date: "01/08/2019", fee: 80,        slug: "arsenal" },
  { club: "Lille",          date: "21/06/2017", fee: 10,        slug: "losc" },
  { club: "Angers",         date: "01/07/2016", type: "return", slug: "angers-sco" },
  { club: "Orléans",        date: "01/07/2015", type: "loan",   slug: "us-orleans-loiret" },
  { club: "Angers",         date: "01/07/2013", type: "",       slug: "angers-sco" },
  { club: "Stade Poitevin", date: "",           type: "",       slug: "stade-poitevin-fc" },
];

const iso = d => d.split("/").reverse().join("-");
// FR : jj/mm/aaaa (inchangé) · EN : « 4 Aug 2024 » (évite la confusion jour/mois)
const fmtDate = (d, lang) => lang === "fr" ? d
  : new Date(iso(d) + "T00:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const fmtFee = (n, lang) => lang === "fr" ? n.toFixed(2).replace(".", ",") + "\u00a0M\u00a0€" : "€" + n.toFixed(2) + "M";
const none = <span className="ct-none">—</span>;

export default function CareerTable() {
  const { lang, t } = useLang();
  return (
    <>
      <h2 className="ct-title" id="ct-title">{t("career.title")}</h2>
      <table className="ct" aria-labelledby="ct-title">
        <thead>
          <tr>
            <th scope="col">{t("career.date")}</th>
            <th scope="col">{t("career.club")}</th>
            <th scope="col">{t("career.transfer")}</th>
            <th scope="col"><span className="ct-sr">{t("career.link")}</span></th>
          </tr>
        </thead>
        <tbody>
          {CAREER.map((c, i) => (
            <tr key={i}>
              <td>{c.date ? <time dateTime={iso(c.date)}>{fmtDate(c.date, lang)}</time> : none}</td>
              <td className="ct-club">{c.club}</td>
              <td>{c.fee ? fmtFee(c.fee, lang) : c.type ? t("career." + c.type) : none}</td>
              <td className="ct-act">
                <a className="ct-btn" href={FM + c.slug + "/"} target="_blank" rel="noopener noreferrer"
                   aria-label={t("career.aria", { club: c.club })}>{t("career.btn")}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

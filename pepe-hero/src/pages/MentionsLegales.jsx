import Page from "./Page.jsx";
import { useLang } from "../LangContext.jsx";

export default function MentionsLegales() {
  const { lang } = useLang();
  return lang === "fr" ? <PolicyFR /> : <PolicyEN />;
}

function PolicyEN() {
  return (
    <Page title="Privacy policy">
      <h2>01 — General information</h2>

      <h3>Unofficial site</h3>
      <p>
        This site is not officially affiliated with Nicolas Pépé,
        his entourage, his clubs, partners or official organizations.
      </p>

      <p>
        All brands, images, names, videos and content related to
        Nicolas Pépé belong to their respective owners.
      </p>

      <h3>Important</h3>
      <p>
        This site is a fan project created for informational and
        creative purposes only. The domain was secured by the agency
        the42.fr in order to preserve and protect the digital identity
        of our icon. This space is graciously dedicated to Nicolas Pépé,
        as a token of recognition and gratitude for the happiness and
        pride he has brought to Côte d’Ivoire.
      </p>

      <h2>02 — Data collected</h2>

      <h3>Very little data</h3>
      <p>
        We do not knowingly collect personal data.
      </p>

      <p>
        No user account
        <br />
        No sign-up
        <br />
        No login system
        <br />
        No personalized advertising
        <br />
        No sale of data
      </p>

      <p>
        The only information we may receive is what you choose
        to send us by email.
      </p>

      <h2>03 — Technical information</h2>

      <h3>How the site works</h3>
      <p>
        Like most websites, some technical information may be
        automatically processed by the host.
      </p>

      <p>
        IP address
        <br />
        Browser type
        <br />
        Device used
        <br />
        General visit statistics
      </p>

      <p>
        This information is used solely for the security, stability
        and proper functioning of the site.
      </p>

      <h2>04 — Cookies</h2>

      <h3>Limited cookies</h3>
      <p>
        This site does not use advertising cookies, retargeting
        or marketing profiling systems.
      </p>

      <p>
        Some basic technical cookies may be used by the hosting
        service to ensure the site works properly.
      </p>

      <h2>05 — External links</h2>

      <h3>Social networks and platforms</h3>
      <p>
        This site may contain links to external platforms such as
        Instagram, TikTok, Facebook, YouTube or other services.
      </p>

      <p>
        These platforms have their own privacy policies. We are not
        responsible for their content or practices.
      </p>

      <h2>06 — Security</h2>

      <h3>Protecting the site</h3>
      <p>
        Reasonable technical measures are used to maintain the
        security and stability of the site.
      </p>

      <p>
        However, no online system can guarantee absolute security.
      </p>

      <h2>07 — Minors</h2>

      <h3>Protection of minors</h3>
      <p>
        This site is open to everyone, with no age restriction. We respect everyone’s privacy and do not knowingly collect personal data without consent.
      </p>

      <h2>08 — Contact</h2>

      <h3>Contact us</h3>
      <p>
        For any question about this privacy policy, you can
        contact us at:
      </p>

      <p>
        <strong>Contact</strong>
        <br />
        <a href="mailto:contact@nicolaspepe.com">
          contact@nicolaspepe.com
        </a>
      </p>

      <p>
        Developer:{" "}
        <a
          href="https://the42.fr"
          target="_blank"
          rel="noopener noreferrer"
        >
          the42.fr
        </a>
      </p>
    </Page>
  );
}

function PolicyFR() {
  return (
    <Page title="Politique de confidentialité">
      <h2>01 — Informations générales</h2>

      <h3>Site non officiel</h3>
      <p>
        Ce site n'est pas affilié officiellement à Nicolas Pépé,
        à son entourage, ses clubs, partenaires ou organisations
        officielles.
      </p>

      <p>
        Toutes les marques, images, noms, vidéos et contenus liés
        à Nicolas Pépé appartiennent à leurs propriétaires respectifs.
      </p>

      <h3>Important</h3>
      <p>
        Ce site est un projet de fan créé à titre exclusivement
        informatif et créatif. Le domaine a été sécurisé par
        l’agence the42.fr, afin de préserver et protéger l’identité
        numérique de notre icône. Cet espace est gracieusement dédié
        à Nicolas Pépé, en signe de reconnaissance et de gratitude
        pour le bonheur et la fierté qu’il a apportés à la Côte d’Ivoire.
      </p>

      <h2>02 — Données collectées</h2>

      <h3>Très peu de données</h3>
      <p>
        Nous ne collectons pas volontairement de données personnelles.
      </p>

      <p>
        Aucun compte utilisateur
        <br />
        Aucune inscription
        <br />
        Aucun système de connexion
        <br />
        Aucune publicité personnalisée
        <br />
        Aucune vente de données
      </p>

      <p>
        La seule information pouvant être reçue est celle que vous
        choisissez volontairement d'envoyer par e-mail.
      </p>

      <h2>03 — Informations techniques</h2>

      <h3>Fonctionnement du site</h3>
      <p>
        Comme la plupart des sites internet, certaines informations
        techniques peuvent être automatiquement traitées par
        l'hébergeur.
      </p>

      <p>
        Adresse IP
        <br />
        Type de navigateur
        <br />
        Appareil utilisé
        <br />
        Statistiques générales de visite
      </p>

      <p>
        Ces informations servent uniquement à la sécurité,
        à la stabilité et au bon fonctionnement du site.
      </p>

      <h2>04 — Cookies</h2>

      <h3>Cookies limités</h3>
      <p>
        Ce site n'utilise pas de cookies publicitaires, de retargeting
        ou de systèmes de profilage marketing.
      </p>

      <p>
        Certains cookies techniques basiques peuvent être utilisés
        par l'hébergement afin d'assurer le fonctionnement du site.
      </p>

      <h2>05 — Liens externes</h2>

      <h3>Réseaux sociaux et plateformes</h3>
      <p>
        Ce site peut contenir des liens vers des plateformes externes
        comme Instagram, TikTok, Facebook, YouTube ou d'autres services.
      </p>

      <p>
        Ces plateformes disposent de leurs propres politiques
        de confidentialité. Nous ne sommes pas responsables de leur
        contenu ni de leurs pratiques.
      </p>

      <h2>06 — Sécurité</h2>

      <h3>Protection du site</h3>
      <p>
        Des mesures techniques raisonnables sont utilisées pour
        maintenir la sécurité et la stabilité du site.
      </p>

      <p>
        Cependant, aucun système en ligne ne peut garantir
        une sécurité absolue.
      </p>

      <h2>07 — Mineurs</h2>

      <h3>Protection des mineurs</h3>
      <p>
        Ce site est accessible à tous, sans restriction d’âge. Nous respectons la vie privée de chacun et ne collectons pas volontairement de données personnelles sans consentement.
      </p>

      <h2>08 — Contact</h2>

      <h3>Nous contacter</h3>
      <p>
        Pour toute question concernant cette politique de
        confidentialité, vous pouvez nous contacter à :
      </p>

      <p>
        <strong>Contact</strong>
        <br />
        <a href="mailto:contact@nicolaspepe.com">
          contact@nicolaspepe.com
        </a>
      </p>

      <p>
        Développeur :{" "}
        <a
          href="https://the42.fr"
          target="_blank"
          rel="noopener noreferrer"
        >
          the42.fr
        </a>
      </p>
    </Page>
  );
}

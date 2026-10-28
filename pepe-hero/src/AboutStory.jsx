import { useLang } from "./LangContext.jsx";

export default function AboutStory() {
  const { lang } = useLang();
  return lang === "fr" ? <StoryFR /> : <StoryEN />;
}

function StoryEN() {
  return (
    <>
      <p className="ap-lead">
        Nicolas Pépé was born on <time dateTime="1995-05-29">May 29, 1995</time> in Mantes-la-Jolie. His path to the professional game is like no other.
      </p>

      <section className="ap-sec">
        <h2>A Parisian childhood in a goalkeeper’s gloves</h2>
        <p>He grew up in Paris’s 19th arrondissement. From a modest background — his father is a prison officer and his mother a hotel cleaner — Nicolas is surrounded by a close family. Every Sunday morning, he goes along to his father’s amateur football matches.</p>
        <p>On the touchline, to kill time, he and his older brother improvise penalty shootouts. The older brother shoots, Nicolas dives. <span className="ap-q">“Except my brother would shoot and I’d go in goal, you know,”</span> he recalls. Repeated every Sunday, these face-offs become real training. Nicolas develops excellent reflexes and falls in love with the goalkeeper role. Much to his father’s surprise — he eventually comes round — Nicolas will keep goal for his teams from the youngest age groups up to under-13s.</p>
      </section>

      <section className="ap-sec">
        <h2>The attacking breakthrough in Poitiers</h2>
        <p>The turning point comes around the age of 15, in Poitiers, when he gives up his gloves for good to become a forward. In truth, he had long been itching to play outfield. Back then, rolling substitutions allowed players to switch positions mid-match. As soon as his team was well ahead, Nicolas wouldn’t hesitate to hand the goal over to a teammate and go and score. <span className="ap-q">“When we were winning 5-0, 6-0, back then you could swap. The other guy went in goal, I went up front and did my thing. It was wild.”</span></p>
      </section>

      <section className="ap-sec">
        <h2>The demands of the Angers academy</h2>
        <p>Unlike many professional footballers, Nicolas slips under the radar of youth academies during his childhood. He plays as an amateur until the age of 17 and a half. It is then that Poitiers’ sporting director, a close contact of head coach Stéphane Moulin, passes his name on to Angers. The club offers him a two-year professional trainee contract, paying around €780 to €790 gross.</p>
        <p>At the Angers academy, he meets Abdel Bouhazama, the academy’s director. Known for his extreme strictness, this coach puts constant pressure on his young players to prepare them for the top level. Looking back, Nicolas acknowledges that this strict framework was his lifeline: <span className="ap-q">“He’s the only coach where I say: he helped me become a pro. If I hadn’t had that coach, I don’t know what I would have become.”</span></p>
      </section>

      <section className="ap-sec">
        <h2>The National standoff and the breakthrough</h2>
        <p>At the end of his training, Nicolas is full of confidence and already pictures himself shining at the highest level. <span className="ap-q">“I told myself: I could see everything clearly. I’m going to sign pro and go straight to Ligue&nbsp;1, no question.”</span></p>
        <p>But Angers’ management sees things differently. Because he had become distracted and got up to far too much mischief at the academy, the club decides to send him to National (France’s third tier) to rein him in and toughen him up. Nicolas takes it as a rejection and firmly objects: <span className="ap-q">“They threw me into National. I told them: I’m not going there.”</span></p>
        <p>His father backs him in this standoff. His agents, for their part, try to convince him to accept in order to build up playing time, but Nicolas stands his ground in the hope of a contract extension. Tension with the management rises. To force him to sign, the club threatens to leave him with no sporting prospects at all, even raising the possibility of making him work as a gardener!</p>
        <p>Eventually, the situation unlocks thanks to a cynical but effective strategy by the club. Wanting to sell him at the best price, Angers decides to put him in the best possible shop window. Nicolas starts the big fixtures broadcast on Canal+ (against Lyon, Marseille, PSG or Lille), while being kept out of the less televised matches, such as the one against Guingamp. <span className="ap-q">“Since they wanted to sell me, I played all the Canal Plus games,”</span> he sums up.</p>
        <p>The plan works perfectly: his performances light up the screen and in 2017, LOSC doesn’t hesitate to pay €10&nbsp;million to secure his services.</p>
      </section>
    </>
  );
}

function StoryFR() {
  return (
    <>
      <p className="ap-lead">
        Nicolas Pépé est né le <time dateTime="1995-05-29">29 mai 1995</time> à Mantes-la-Jolie. Son histoire pour atteindre le monde professionnel ne ressemble à aucune autre.
      </p>

      <section className="ap-sec">
        <h2>Une enfance parisienne dans les gants d’un gardien</h2>
        <p>Il grandit dans le 19e arrondissement de Paris. Issu d’un milieu modeste — son père est surveillant pénitentiaire et sa mère femme de ménage dans un hôtel —, Nicolas est très entouré par sa famille. Tous les dimanches matin, il accompagne son père, footballeur amateur, à ses matchs.</p>
        <p>Sur le bord du terrain, pour tuer le temps, son grand frère et lui improvisent des séances de tirs au but. Le grand frère frappe, Nicolas plonge. <span className="ap-q">«&nbsp;Sauf que mon frère, il tirait et moi, j’allais au but, tu vois&nbsp;»</span>, raconte-t-il. Répétés chaque dimanche, ces face-à-face deviennent un véritable entraînement. Nicolas y développe d’excellents réflexes et se prend de passion pour le rôle de gardien. À la grande surprise de son père, qui finit par accepter, il gardera les cages des poussins jusqu’aux moins de 13 ans.</p>
      </section>

      <section className="ap-sec">
        <h2>Le déclic offensif à Poitiers</h2>
        <p>Le tournant survient vers l’âge de 15 ans, à Poitiers, lorsqu’il délaisse définitivement ses gants pour devenir attaquant. En réalité, le goût du jeu de champ le démangeait déjà depuis longtemps. À l’époque, les remplacements volants permettaient de changer de poste en plein match. Dès que son équipe menait largement, Nicolas n’hésitait pas à laisser sa place dans les buts à un coéquipier pour aller marquer. <span className="ap-q">«&nbsp;Quand on gagnait 5-0, 6-0, à l’époque on pouvait changer. L’autre allait au goal, moi j’y allais et je faisais ça. C’est une dinguerie.&nbsp;»</span></p>
      </section>

      <section className="ap-sec">
        <h2>L’exigence du centre de formation d’Angers</h2>
        <p>Contrairement à beaucoup de footballeurs professionnels, Nicolas échappe aux radars des centres de formation durant son enfance. Il joue en amateur jusqu’à 17 ans et demi. C’est à ce moment-là que le directeur sportif de Poitiers, proche de l’entraîneur Stéphane Moulin, glisse son nom à Angers. Le club lui propose alors un contrat de stagiaire professionnel de deux ans, rémunéré autour de 780 à 790&nbsp;euros brut.</p>
        <p>Au centre de formation angevin, il fait la rencontre d’Abdel Bouhazama, le directeur du centre. Réputé pour son extrême exigence, ce coach met une pression constante sur ses jeunes joueurs pour les préparer au haut niveau. Avec le recul, Nicolas reconnaît que ce cadre strict a été sa planche de salut&nbsp;: <span className="ap-q">«&nbsp;C’est le seul coach où je dis&nbsp;: il m’a aidé à devenir pro. Si je n’avais pas eu ce coach, je ne sais pas ce que je serais devenu.&nbsp;»</span></p>
      </section>

      <section className="ap-sec">
        <h2>Le bras de fer du National et l’explosion</h2>
        <p>À la fin de sa formation, Nicolas est en pleine confiance et s’imagine déjà briller au plus haut niveau. <span className="ap-q">«&nbsp;Je me suis dit&nbsp;: là, je voyais tout clair. Je vais signer pro, aller en Ligue&nbsp;1 carré.&nbsp;»</span></p>
        <p>Mais la direction d’Angers ne voit pas les choses du même œil. Parce qu’il s’est dissipé et a fait beaucoup trop de bêtises au centre, le club décide de l’envoyer en National pour le recadrer et l’aguerrir. Nicolas le vit comme un rejet et s’y oppose fermement&nbsp;: <span className="ap-q">«&nbsp;Ils m’ont jeté en National. Moi, je leur ai dit&nbsp;: je ne vais pas aller là-bas.&nbsp;»</span></p>
        <p>Son père le soutient dans ce bras de fer. Ses agents, de leur côté, tentent de le convaincre d’accepter pour accumuler du temps de jeu, mais Nicolas campe sur ses positions dans l’espoir d’une prolongation. La tension monte avec la direction. Pour le forcer à signer, le club le menace de le laisser sans aucune perspective sportive, évoquant même la possibilité de l’obliger à travailler comme jardinier&nbsp;!</p>
        <p>Finalement, la situation se débloque grâce à une stratégie cynique mais efficace du club. Souhaitant le vendre au meilleur prix, Angers décide de l’exposer dans la plus belle des vitrines. Nicolas est titularisé lors des grandes affiches diffusées sur Canal+ (contre Lyon, Marseille, le PSG ou Lille), tout en étant préservé lors des matchs moins médiatisés, comme face à Guingamp. <span className="ap-q">«&nbsp;Comme ils voulaient me vendre, les matchs où c’est Canal Plus, j’ai joué tous ces matchs-là&nbsp;»</span>, résume-t-il.</p>
        <p>Le plan fonctionne à merveille&nbsp;: ses performances crèvent l’écran et en 2017, le LOSC n’hésite pas à débourser 10&nbsp;millions d’euros pour s’attacher ses services.</p>
      </section>
    </>
  );
}

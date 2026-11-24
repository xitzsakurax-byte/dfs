import type { Test } from "./types";
import { SNN } from "./types";

// Original practice set. Structure follows the official Goethe-Zertifikat C1 Modellsatz (format since 01.01.2024):
// Lesen 65 min — T1 8 gaps, 4-option MC (~320 words) · T2 7 MC (~680 words) · T3 8 sentence gaps, 10 sentences (~530 words)
//               · T4 7 statements → 3 expert texts, 2 statements fit none (~430 words)
// Hören ~40 min — T1 podcast on 3 books, 6 items, once · T2 expert interview, 9 items stimmt/stimmt nicht/nicht gesagt, twice
//               · T3 discussion with 3 people in 4 sections × 2 MC, each once · T4 lecture, 7 MC, twice
// Schreiben 75 min — forum post ~230 words (50 min) + e-mail ~120 words (25 min)
// Sprechen ~20 min per pair, 20 min preparation — talk ~5 min + questions, discussion ~5 min.
export const goetheC1_1: Test = {
  id: "goethe-c1-1",
  level: "C1",
  title: "Modelltest 1",
  exam: "Goethe-Zertifikat C1",
  theme: "Stadt, Gesellschaft, Wissenschaft",
  modules: [
    {
      id: "lesen",
      title: "Lesen",
      minutes: 65,
      parts: [
        {
          kind: "obj",
          title: "Teil 1",
          minutes: 10,
          task: "Sie lesen in einer Zeitschrift einen Artikel über ein Konzept der Stadtplanung. Wählen Sie für jede Lücke die richtige Lösung.",
          gapExample: "längst",
          groups: [
            {
              title: "STADTPLANUNG — Die Stadt als Schwamm",
              text: `Starkregen und Hitzeperioden nehmen zu. Immer mehr Kommunen setzen daher auf ein Konzept, das ursprünglich aus Asien stammt.

Wenn nach einem heftigen Gewitter Keller volllaufen und Straßen sich in reißende Bäche verwandeln, zeigt sich, wie schlecht viele Städte auf extreme Wetterereignisse vorbereitet sind. Das Problem ist [[0]] bekannt: Asphalt und Beton versiegeln den Boden, sodass das Wasser nicht versickern kann und die Kanalisation in kürzester Zeit überlastet ist.

Das Konzept der „Schwammstadt“ zielt darauf [[1]], Regenwasser nicht mehr so schnell wie möglich abzuleiten, sondern es dort zu speichern, wo es fällt – in begrünten Dächern, Mulden, unterirdischen Zisternen oder Parks, die sich bei Bedarf in Rückhaltebecken verwandeln. In Trockenperioden gibt die Stadt das gespeicherte Wasser [[2]] wieder ab, etwa über Verdunstung, die die Umgebung spürbar kühlt.

[[3]] die Idee auf den ersten Blick einleuchtet, ist ihre Umsetzung alles andere als trivial. Bestehende Viertel lassen sich nur mit enormem Aufwand umbauen, denn unter den Straßen verlaufen Leitungen für Strom, Gas und Internet, [[4]] genaue Lage oft nicht einmal dokumentiert ist. Hinzu kommt, dass die Zuständigkeiten auf zahlreiche Ämter verteilt sind, [[5]] Planungsprozesse erheblich verzögert.

Als Vorreiter in Europa gilt Kopenhagen. Nach einem verheerenden Unwetter, das Schäden in Milliardenhöhe verursachte, beschloss die Stadt einen umfassenden Plan, der seither Schritt für Schritt in die Tat [[6]] wird. Auch hierzulande gibt es Beispiele: In manchen Städten müssen Neubauprojekte ihr Regenwasser inzwischen zumindest teilweise auf dem eigenen Grundstück bewirtschaften.

Fachleute betonen allerdings, dass technische Lösungen allein nicht ausreichen. Ohne die Bereitschaft der Bürgerinnen und Bürger, etwa Vorgärten zu entsiegeln, statt sie mit Kies und Schotter [[7]], werde die Schwammstadt Stückwerk bleiben. Mehrere Kommunen fördern solche Maßnahmen deshalb [[8]] Zuschüssen.`,
              qs: [
                { t: "mc", q: "", o: ["an", "ab", "zu", "aus"], a: 1 },
                { t: "mc", q: "", o: ["bisweilen", "vorerst", "allmählich", "neuerdings"], a: 2 },
                { t: "mc", q: "", o: ["Sofern", "Während", "Indem", "Nachdem"], a: 1 },
                { t: "mc", q: "", o: ["dessen", "denen", "die", "deren"], a: 3 },
                { t: "mc", q: "", o: ["was", "das", "welches", "wodurch"], a: 0 },
                { t: "mc", q: "", o: ["gebracht", "übertragen", "umgesetzt", "gesetzt"], a: 2 },
                { t: "mc", q: "", o: ["zuzuschütten", "zu schütten zu", "zugeschüttet", "zuschütten"], a: 0 },
                { t: "mc", q: "", o: ["durch", "von", "bei", "mit"], a: 3 },
              ],
            },
          ],
        },
        {
          kind: "obj",
          title: "Teil 2",
          minutes: 20,
          task: "Sie lesen im Internet einen Artikel über Einsamkeit als gesellschaftliches Problem. Wählen Sie bei jeder Aufgabe die richtige Lösung.",
          groups: [
            {
              title: "Allein unter vielen",
              text: `Lange galt Einsamkeit als Privatsache – als etwas, worüber man nicht spricht und wofür jeder selbst verantwortlich ist. Das hat sich grundlegend geändert. Großbritannien richtete bereits vor einigen Jahren ein eigenes Regierungsamt für das Thema ein, und auch in Deutschland hat die Bundesregierung inzwischen eine Strategie gegen Einsamkeit vorgelegt. Was hat das Phänomen auf die politische Tagesordnung gebracht?

„Zunächst einmal muss man klären, wovon wir überhaupt reden“, sagt die Soziologin Dr. Johanna Weil, die seit fünfzehn Jahren zu sozialen Beziehungen forscht. „Einsamkeit ist nicht dasselbe wie Alleinsein.“ Viele Menschen lebten allein und fühlten sich dennoch gut eingebunden, während andere inmitten einer großen Familie oder eines vollen Büros vereinsamten. Entscheidend sei die subjektive Empfindung, dass die eigenen Beziehungen nicht den eigenen Bedürfnissen entsprechen – sei es, weil sie zu wenige sind, sei es, weil ihnen die Tiefe fehlt.

Entgegen einem verbreiteten Klischee sind keineswegs nur ältere Menschen betroffen. Mehrere repräsentative Erhebungen zeigen, dass sich junge Erwachsene zwischen 18 und 29 Jahren besonders häufig einsam fühlen. Weil führt das vor allem auf die vielen Umbrüche in dieser Lebensphase zurück: Auszug aus dem Elternhaus, Studienbeginn, Berufseinstieg, Umzug in eine fremde Stadt. Soziale Medien spielten dabei eine ambivalente Rolle. Sie erleichterten zwar das Knüpfen von Kontakten, verleiteten aber auch zu ständigen Vergleichen mit dem scheinbar aufregenderen Leben anderer.

Dass Einsamkeit nicht nur unglücklich, sondern auch krank machen kann, ist gut belegt. Wer über lange Zeit unter Einsamkeit leidet, hat ein erhöhtes Risiko für Herz-Kreislauf-Erkrankungen, Depressionen und Schlafstörungen. In der öffentlichen Debatte wird häufig ein drastischer Vergleich bemüht: Chronische Einsamkeit sei so schädlich wie das Rauchen von fünfzehn Zigaretten am Tag. Weil hält diese Zuspitzung für problematisch. „Einsame Menschen bewegen sich im Schnitt weniger, ernähren sich ungesünder und schlafen schlechter. Wie groß der Anteil der Einsamkeit selbst ist, lässt sich aus solchen Daten kaum herausrechnen.“ Ein Grund zur Entwarnung sei das allerdings nicht.

Besonders tückisch ist ein Mechanismus, den die Forschung als Teufelskreis beschreibt. Wer sich einsam fühlt, nimmt seine Umgebung zunehmend als bedrohlich wahr. Ein ausbleibender Gruß, eine kurze Antwort auf eine Nachricht – neutrale Signale werden eher als Zurückweisung gedeutet. Die Betroffenen ziehen sich daraufhin weiter zurück, was ihre Isolation verstärkt. „Deshalb hilft der gut gemeinte Rat, doch einfach mal unter Leute zu gehen, oft wenig“, so Weil.

Auf kommunaler Ebene ist in den vergangenen Jahren eine Vielzahl von Initiativen entstanden: Plauderbänke in Parks, auf denen man signalisiert, dass man gern ins Gespräch käme, Nachbarschaftscafés oder Telefonketten für Seniorinnen und Senioren. Weil begrüßt solche Projekte, warnt aber davor, sich auf sie zu beschränken. „Sie behandeln Symptome. Die Ursachen liegen oft in Strukturen, über die wir viel zu selten reden.“ Sie nennt Städte, in denen es kaum noch öffentliche Orte gibt, an denen man sich ohne Konsumzwang aufhalten kann, ländliche Regionen ohne funktionierenden Nahverkehr und Arbeitsverhältnisse, die kaum Zeit für Freundschaften lassen. Bibliotheken, Parks und Gemeindezentren seien deshalb keine Luxusgüter, sondern soziale Infrastruktur.

Und was können Betroffene selbst tun? Weil rät, weniger auf die Zahl als auf die Regelmäßigkeit von Kontakten zu achten. Ein fester wöchentlicher Termin – im Chor, im Sportverein, bei einem Ehrenamt – schaffe Verbindlichkeit und damit die Grundlage, aus der sich tiefere Beziehungen entwickeln könnten. „Freundschaft entsteht selten auf Partys“, sagt sie. „Sie entsteht durch Wiederholung.“`,
              qs: [
                { t: "mc", q: "Einsamkeit wird heute …", o: ["zunehmend als politische Aufgabe betrachtet.", "nach wie vor als reine Privatsache gesehen.", "vor allem in Großbritannien erforscht."], a: 0 },
                { t: "mc", q: "Nach Dr. Weil hängt Einsamkeit vor allem davon ab, …", o: ["ob jemand allein lebt.", "wie jemand die eigenen Beziehungen bewertet.", "wie viele Familienmitglieder jemand hat."], a: 1 },
                { t: "mc", q: "Junge Erwachsene fühlen sich besonders häufig einsam, weil …", o: ["sie soziale Medien ablehnen.", "sie seltener allein leben als Ältere.", "sich in dieser Lebensphase vieles verändert."], a: 2 },
                { t: "mc", q: "Den Vergleich zwischen Einsamkeit und Rauchen hält Weil für …", o: ["zutreffend, weil er durch Studien gut belegt ist.", "irreführend, weil sich der Effekt der Einsamkeit kaum isolieren lässt.", "nützlich, weil er die Gefahren endlich sichtbar macht."], a: 1 },
                { t: "mc", q: "Der beschriebene Teufelskreis entsteht, weil einsame Menschen …", o: ["neutrale Reaktionen anderer eher negativ interpretieren.", "andere häufiger kritisieren.", "zu viele oberflächliche Kontakte pflegen."], a: 0 },
                { t: "mc", q: "An kommunalen Initiativen wie Plauderbänken kritisiert Weil, dass …", o: ["sie vor allem ältere Menschen ansprechen.", "sie zu hohe Kosten verursachen.", "sie die strukturellen Ursachen nicht angehen."], a: 2 },
                { t: "mc", q: "Weil empfiehlt Betroffenen, …", o: ["möglichst viele neue Bekanntschaften zu schließen.", "regelmäßige Termine mit denselben Menschen wahrzunehmen.", "häufiger an Feiern teilzunehmen."], a: 1 },
              ],
            },
          ],
        },
        {
          kind: "obj",
          title: "Teil 3",
          minutes: 20,
          task: "Sie lesen in einer Zeitschrift einen Kommentar. Welche Sätze passen in die Lücken? Zwei Sätze passen nicht.",
          bankTitle: "Sätze",
          gapExample: "Es klingt nach Niederlage, nach Schande, nach endgültigem Aus.",
          bank: [
            { k: "a", v: "Viele scheuen das Risiko, im Fall eines Misserfolgs gesellschaftlich abgestempelt zu werden." },
            { k: "b", v: "Die erfolgreichsten Menschen sind oft nicht jene, die nie gescheitert sind, sondern jene, die nach einer Niederlage weitergemacht haben." },
            { k: "c", v: "Statt Fehler ausschließlich zu sanktionieren, könnten sie diese gezielt zum Ausgangspunkt des Unterrichts machen." },
            { k: "d", v: "Sie fallen unzählige Male hin, stehen wieder auf und probieren es erneut." },
            { k: "e", v: "Deshalb sollten Noten an Schulen vollständig abgeschafft werden." },
            { k: "f", v: "Scheitern tut weh, und das soll es vermutlich auch." },
            { k: "g", v: "Der Erfinder Thomas Edison soll gesagt haben, er sei nicht gescheitert, sondern habe lediglich zehntausend Wege gefunden, die nicht funktionieren." },
            { k: "h", v: "Wer so lernt, versucht vor allem, Fehler zu vermeiden – und damit zwangsläufig auch alles Neue." },
            { k: "i", v: "Hierzulande werden pro Kopf inzwischen mehr Unternehmen gegründet als in den USA." },
            { k: "j", v: "Das Publikum lacht, applaudiert – und lernt dabei oft mehr als in manchem Seminar." },
          ],
          groups: [
            {
              title: "Lob des Scheiterns",
              text: `Kaum ein Wort hat in Deutschland einen so schlechten Ruf wie das Scheitern. [[0]] Wer mit einem Unternehmen pleitegeht, gilt schnell als Versager; wer ein Studium abbricht, muss sich rechtfertigen. Dabei ist das Scheitern ein unverzichtbarer Bestandteil jedes Lernprozesses.

Man muss nur Kindern beim Laufenlernen zusehen. [[1]] Niemand käme auf die Idee, ein Kleinkind deswegen für unbegabt zu halten. Irgendwann im Laufe der Schulzeit aber kippt diese Haltung. Fehler werden nicht mehr als Schritte auf einem Weg betrachtet, sondern rot angestrichen und mit schlechten Noten bestraft. [[2]]

Die Folgen zeigen sich spätestens im Berufsleben. Umfragen zufolge ist die Angst vor dem Scheitern einer der Hauptgründe dafür, dass hierzulande vergleichsweise wenige Menschen ein eigenes Unternehmen gründen. [[3]] In den USA dagegen gilt eine gescheiterte Gründung bei Investoren nicht selten als Pluspunkt – schließlich habe der Gründer daraus gelernt.

Nun soll hier keineswegs einer naiven Verklärung des Misserfolgs das Wort geredet werden. [[4]] Wer seine Ersparnisse verliert oder Mitarbeitende entlassen muss, durchlebt eine Krise, die man niemandem wünscht. Es geht vielmehr um die Frage, wie eine Gesellschaft mit solchen Erfahrungen umgeht.

Einige Initiativen versuchen, das Tabu zu brechen. Bei sogenannten Fuckup Nights erzählen Unternehmerinnen und Unternehmer vor Publikum, woran ihre Projekte gescheitert sind – schonungslos und oft mit erstaunlicher Selbstironie. [[5]] Das Format hat sich inzwischen in Hunderten Städten weltweit verbreitet.

Auch die Schulen könnten mehr tun. [[6]] Projekte mit offenem Ausgang und Bewertungen, die den Lernweg und nicht nur das Endprodukt berücksichtigen, würden Schülerinnen und Schülern signalisieren, dass Ausprobieren erwünscht ist.

Am Ende ist es eine Frage der Haltung. [[7]] Wer aus Angst vor dem Scheitern nichts wagt, scheitert gewissermaßen schon im Voraus – nur eben unbemerkt. [[8]] Vielleicht wäre es an der Zeit, dass wir uns diese Einsicht zu eigen machen.`,
              qs: [
                { t: "pick", q: "", a: "d" },
                { t: "pick", q: "", a: "h" },
                { t: "pick", q: "", a: "a" },
                { t: "pick", q: "", a: "f" },
                { t: "pick", q: "", a: "j" },
                { t: "pick", q: "", a: "c" },
                { t: "pick", q: "", a: "b" },
                { t: "pick", q: "", a: "g" },
              ],
            },
          ],
        },
        {
          kind: "obj",
          title: "Teil 4",
          minutes: 15,
          task: "Sie lesen in einer Fachzeitschrift Beiträge von Wissenschaftlerinnen und Wissenschaftlern zum Thema „Künstliche Intelligenz in der Schule“. Wählen Sie bei jeder Aussage: Wer äußert das? Zwei Aussagen passen nicht. Markieren Sie in diesem Fall 0.",
          bankTitle: "Wer äußert das?", reuse: true,
          noneKey: "0",
          bank: [
            { k: "a", v: "Prof. Dr. Sabine Hartmann, Bildungsforscherin" },
            { k: "b", v: "Dr. Malte Brenner, Informatiker" },
            { k: "c", v: "Prof. Dr. Leyla Aksoy, Philosophin" },
          ],
          groups: [
            {
              title: "a  Prof. Dr. Sabine Hartmann, Bildungsforscherin",
              text: "Wer Unterricht nur vom Klassenzimmer aus kennt, unterschätzt, wie unterschiedlich das Lerntempo von dreißig Kindern ist. Adaptive Lernprogramme, die Aufgaben automatisch an den Kenntnisstand des Einzelnen anpassen, können hier eine echte Entlastung sein: Wer schneller vorankommt, langweilt sich nicht, und wer Unterstützung braucht, erhält sie, ohne vor der Klasse bloßgestellt zu werden. Die Lehrkraft wird dadurch keineswegs überflüssig; im Gegenteil, sie gewinnt Zeit für das, was keine Software leisten kann – Beziehungen aufbauen, motivieren, Konflikte begleiten. Sorgen bereitet mir etwas anderes: Schon heute klaffen die technischen Voraussetzungen zwischen den Schulen weit auseinander. Wenn wir nicht gegensteuern, profitieren am Ende vor allem die ohnehin privilegierten Schülerinnen und Schüler.",
              qs: [],
            },
            {
              title: "b  Dr. Malte Brenner, Informatiker",
              text: "Sprachmodelle formulieren erstaunlich überzeugend – und liegen trotzdem regelmäßig daneben. Sie erfinden Quellen, Zitate und Zahlen, ohne dass dies an der Oberfläche erkennbar wäre. Die wichtigste Kompetenz der kommenden Jahre wird daher sein, maschinell erzeugte Inhalte kritisch zu prüfen. Das größte praktische Problem sehe ich jedoch bei der Leistungsbewertung: Eine zu Hause geschriebene Hausarbeit sagt heute praktisch nichts mehr über die Fähigkeiten ihres Verfassers aus. Schulen werden um mündliche Formate, Präsentationen und Arbeiten unter Aufsicht nicht herumkommen. Hinzu kommt ein Aspekt, der gern übersehen wird: Viele der populären Anwendungen speichern sämtliche Eingaben auf Servern außerhalb der Europäischen Union. Was Schülerinnen und Schüler dort eingeben, verlässt damit den Geltungsbereich unseres Datenschutzrechts.",
              qs: [],
            },
            {
              title: "c  Prof. Dr. Leyla Aksoy, Philosophin",
              text: "Schreiben ist nicht bloß das Aufschreiben fertiger Gedanken, sondern selbst eine Form des Denkens. Wer einen Text verfasst, muss gewichten, ordnen, verwerfen und neu ansetzen. Lagern wir diesen Prozess an Maschinen aus, verkümmert genau jene Fähigkeit, die wir in einer komplexen Welt am dringendsten brauchen: die eigenen Gedanken zu strukturieren. Ein Verbot halte ich gleichwohl für eine Illusion; die Programme sind längst Teil des Alltags. Sinnvoller wären regelmäßige Schreibwerkstätten im Unterricht, in denen von Hand und ohne Hilfsmittel geschrieben wird. Im Übrigen lohnt ein Blick in die Geschichte: Als Taschenrechner und später Online-Lexika in die Schulen kamen, prophezeiten viele den Niedergang des Lernens. Die Debatte, die wir heute führen, ist also weniger neu, als sie scheint.",
              qs: [
                { t: "pick", q: "KI-gestützte Programme können sich an das Tempo einzelner Lernender anpassen.", a: "a", ex: true },
                { t: "pick", q: "Schulen in benachteiligten Lagen könnten den Anschluss verlieren.", a: "a" },
                { t: "pick", q: "Die Art, wie Leistungen überprüft werden, muss sich grundlegend ändern.", a: "b" },
                { t: "pick", q: "Wer das Verfassen von Texten abgibt, büßt die Fähigkeit ein, Gedanken zu ordnen.", a: "c" },
                { t: "pick", q: "Vergleichbare Befürchtungen gab es bereits bei früheren technischen Neuerungen.", a: "c" },
                { t: "pick", q: "Lehrkräfte werden langfristig durch Software ersetzt werden.", a: "0" },
                { t: "pick", q: "Eingaben in manche Anwendungen werden außerhalb der EU gespeichert.", a: "b" },
                { t: "pick", q: "Der Gesetzgeber sollte KI-Programme an Schulen untersagen.", a: "0" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "hoeren",
      title: "Hören",
      minutes: 40,
      parts: [
        {
          kind: "obj",
          title: "Teil 1",
          task: "Sie hören einen Podcast über neue Bücher. Sie hören den Text einmal. Wählen Sie bei jeder Aufgabe, zu welchem Buch die Aussage passt. Lesen Sie jetzt die Aufgaben 1 bis 6. Dazu haben Sie 60 Sekunden Zeit.",
          plays: 1,
          readSeconds: 60,
          bankTitle: "Buch", reuse: true,
          bank: [
            { k: "a", v: "Buch 1 – Die Stille nach der Flut" },
            { k: "b", v: "Buch 2 – Wie wir denken, wenn wir gehen" },
            { k: "c", v: "Buch 3 – Zwischen zwei Sprachen" },
          ],
          groups: [
            {
              audio: [
                { s: "Podcasterin", t: "Hallo und herzlich willkommen zu „Neu im Regal“, dem Podcast für alle, die zu viele Bücher kaufen und zu wenig Zeit zum Lesen haben. Ich habe diesen Monat drei Neuerscheinungen für euch gelesen, die unterschiedlicher kaum sein könnten." },
                { s: "Podcasterin", t: "Beginnen wir mit „Die Stille nach der Flut“, dem ersten Roman von Merle Jansen. Die Geschichte spielt auf einer Hallig in der Nordsee, wo eine Familie nach einer Sturmflut versucht, ihr Leben neu zu ordnen. Die Insel ist dabei weit mehr als Kulisse: Wind, Watt und Wasser bestimmen den Rhythmus der Figuren, manchmal fast stärker als ihre eigenen Entscheidungen. Jansen hat ohne Zweifel ein Gespür für Atmosphäre. Allerdings hat sie die Neigung, jede Wolke und jede Welle mit drei Adjektiven zu versehen, und an manchen Stellen habe ich mir gewünscht, sie würde ihrer Geschichte mehr vertrauen und ihre Sprache etwas zurücknehmen. Trotzdem: ein bemerkenswertes Debüt." },
                { s: "Podcasterin", t: "Ganz anders das zweite Buch: „Wie wir denken, wenn wir gehen“ von dem Neurowissenschaftler Dr. Paul Riedel. Riedel trägt zusammen, was Experimente über den Zusammenhang zwischen Bewegung und Kreativität herausgefunden haben, und er macht das erfreulich verständlich, ohne die Forschung zu stark zu vereinfachen. Wer schon immer wissen wollte, warum einem die besten Ideen beim Spazierengehen kommen, findet hier fundierte Antworten. Mein Kritikpunkt: Nach etwa hundertfünfzig Seiten ist das Wesentliche gesagt, und der Rest des Buches variiert vor allem bereits bekannte Ergebnisse. Die praktischen Übungen am Ende des Buches, etwa zu Gehmeditationen, fand ich dagegen durchaus brauchbar." },
                { s: "Podcasterin", t: "Und schließlich mein persönlicher Favorit: „Zwischen zwei Sprachen“ von der Übersetzerin Thi Mai Bauer. In kurzen Essays erzählt sie, wie sie als Tochter einer vietnamesischen Mutter und eines deutschen Vaters zwischen zwei Welten aufgewachsen ist, und welche Wörter sich einfach nicht übersetzen lassen. Bauer schreibt über Missverständnisse am Familientisch mit so viel Witz, dass ich in der U-Bahn laut lachen musste, und kurz darauf über den Tod ihrer Großmutter mit einer Zartheit, die mich sehr berührt hat. Dieses Wechselspiel macht das Buch aus. Für alle, die selbst zwischen Kulturen leben, ist es fast ein Pflichtbuch." },
                { s: "Podcasterin", t: "Das war es für heute. Schreibt mir gern, welches Buch ihr euch vorgenommen habt. Bis zum nächsten Monat!" },
              ],
              qs: [
                { t: "pick", q: "Das Buch ist ein Debütroman.", a: "a", ex: true },
                { t: "pick", q: "Das Buch stützt sich auf Ergebnisse empirischer Studien.", a: "b" },
                { t: "pick", q: "Die Autorin verarbeitet ihre eigene Biografie.", a: "c" },
                { t: "pick", q: "Der Stil ist stellenweise zu ausschmückend.", a: "a" },
                { t: "pick", q: "In der zweiten Hälfte wiederholt sich das Buch.", a: "b" },
                { t: "pick", q: "Heitere und ernste Passagen wechseln sich ab.", a: "c" },
                { t: "pick", q: "Der Schauplatz prägt das Verhalten der Figuren.", a: "a" },
              ],
            },
          ],
        },
        {
          kind: "obj",
          title: "Teil 2",
          task: "Sie hören ein Radiointerview mit einer Persönlichkeit aus der Wissenschaft. Sie hören den Text zweimal. Wählen Sie bei jeder Aufgabe die richtige Lösung. Lesen Sie jetzt die Aufgaben 7 bis 15. Dazu haben Sie 60 Sekunden Zeit.",
          plays: 2,
          readSeconds: 60,
          groups: [
            {
              audio: [
                { s: "Moderatorin", t: "In unserer Reihe „Wissen am Mittag“ begrüße ich heute die Sprachwissenschaftlerin Doktor Hanna Vogel. Sie forscht zu Mehrsprachigkeit in Familien. Frau Vogel, viele Eltern haben Angst, ihre Kinder mit zwei oder drei Sprachen zu überfordern. Ist diese Sorge berechtigt?" },
                { s: "Dr. Vogel", t: "Diese Sorge begegnet mir ständig, und sie ist verständlich, aber unbegründet. Kinder sind ausgesprochen gut darin, mehrere Sprachen gleichzeitig zu erwerben. Richtig ist, dass ein zweisprachiges Kind in jeder einzelnen Sprache anfangs manchmal etwas weniger Wörter kennt als ein einsprachiges Kind. Zählt man aber beide Sprachen zusammen, ist der Wortschatz mindestens gleich groß." },
                { s: "Moderatorin", t: "Und wenn Kinder die Sprachen mischen, also mitten im Satz wechseln, ist das kein Warnsignal?" },
                { s: "Dr. Vogel", t: "Ganz im Gegenteil. Dieses sogenannte Code-Switching folgt erstaunlich klaren Regeln. Kinder wechseln nicht willkürlich, sondern dann, wenn ihnen in einer Sprache ein Wort fehlt oder wenn ein Ausdruck in der anderen Sprache besser passt. Das zeigt, dass sie beide Systeme sehr genau auseinanderhalten können. Auch erwachsene Mehrsprachige tun das übrigens ständig." },
                { s: "Moderatorin", t: "Viele Ratgeber empfehlen das Prinzip „eine Person, eine Sprache“: Die Mutter spricht nur die eine Sprache, der Vater nur die andere. Ist das der Königsweg?" },
                { s: "Dr. Vogel", t: "Es ist ein Weg, aber kein Muss. Die Forschung zeigt, dass andere Faktoren viel wichtiger sind: Wie viel hört das Kind die Sprache? In welchen Situationen? Und vor allem: Verbindet es mit der Sprache etwas Positives? Eine Sprache, die nur beim Schimpfen oder bei Hausaufgaben benutzt wird, hat es schwer. Eine Sprache, in der Gute-Nacht-Geschichten erzählt werden und in der man mit den Großeltern lacht, hat dagegen beste Chancen." },
                { s: "Moderatorin", t: "Sie haben die Großeltern erwähnt. Was passiert mit den Herkunftssprachen über die Generationen hinweg?" },
                { s: "Dr. Vogel", t: "Hier gibt es ein recht stabiles Muster. Die erste Generation spricht die Herkunftssprache selbstverständlich, die zweite meist noch gut, oft aber schon mit Lücken in der Schriftsprache. In der dritten Generation geht sie häufig verloren, wenn es außerhalb der Familie keine Unterstützung gibt. Deshalb plädiere ich für herkunftssprachlichen Unterricht an Schulen. Das Angebot ist in Deutschland allerdings sehr ungleich verteilt. In manchen Bundesländern ist es gut ausgebaut, in anderen hängt es vom Engagement einzelner Vereine ab." },
                { s: "Moderatorin", t: "Was raten Sie Eltern konkret?" },
                { s: "Dr. Vogel", t: "Sprechen Sie mit Ihrem Kind die Sprache, in der Sie sich am wohlsten fühlen, in der Sie Gefühle ausdrücken und Witze machen können. Manche Eltern sprechen aus gutem Willen Deutsch mit ihren Kindern, obwohl sie es selbst nur unsicher beherrschen. Davon rate ich ab. Ein Kind braucht ein reiches, lebendiges sprachliches Vorbild, und das Deutsche lernt es ohnehin in der Kita und in der Schule." },
                { s: "Moderatorin", t: "Haben Sie das selbst so erlebt?" },
                { s: "Dr. Vogel", t: "Ja, ich bin mit Polnisch und Deutsch aufgewachsen und habe meinen Kindern Polnisch weitergegeben. Meine Tochter hat sich mit acht Jahren eine Zeit lang strikt geweigert, Polnisch zu sprechen, weil das in ihrer Klasse niemand konnte. Solche Phasen sind völlig normal. Wichtig ist, dann keinen Druck aufzubauen, sondern die Sprache einfach weiter anzubieten." },
                { s: "Moderatorin", t: "Man liest oft, Mehrsprachigkeit mache Kinder schlauer, etwa konzentrierter. Stimmt das?" },
                { s: "Dr. Vogel", t: "Da muss ich bremsen. Es gab eine Phase, in der viele Studien solche Vorteile zu belegen schienen. Neuere, größere Untersuchungen kommen aber zu sehr gemischten Ergebnissen. Ich würde Eltern deshalb nicht versprechen, dass ihr Kind durch zwei Sprachen klüger wird. Es bekommt etwas anderes, aus meiner Sicht viel Wertvolleres: Zugang zu zwei Kulturen und zu den Menschen, die sie sprechen." },
                { s: "Moderatorin", t: "Frau Vogel, vielen Dank für das Gespräch." },
              ],
              qs: [
                { t: "mc", q: "Mehrsprachige Kinder verfügen insgesamt über einen kleineren Wortschatz als einsprachige.", o: SNN, a: 1 },
                { t: "mc", q: "Das Wechseln zwischen Sprachen innerhalb eines Satzes deutet auf Verwirrung hin.", o: SNN, a: 1 },
                { t: "mc", q: "Frau Vogel hält das Prinzip „eine Person, eine Sprache“ für unverzichtbar.", o: SNN, a: 1 },
                { t: "mc", q: "Positive Erlebnisse mit einer Sprache fördern ihren Erwerb.", o: SNN, a: 0 },
                { t: "mc", q: "In der dritten Generation geht die Herkunftssprache häufig verloren.", o: SNN, a: 0 },
                { t: "mc", q: "Frau Vogel hat selbst als Lehrerin für Herkunftssprachen gearbeitet.", o: SNN, a: 2 },
                { t: "mc", q: "Eltern sollten mit ihren Kindern die Sprache sprechen, die sie am besten beherrschen.", o: SNN, a: 0 },
                { t: "mc", q: "Frau Vogels Tochter spricht heute fließend Polnisch.", o: SNN, a: 2 },
                { t: "mc", q: "Neuere Studien belegen eindeutig, dass Mehrsprachigkeit die Konzentration verbessert.", o: SNN, a: 1 },
              ],
            },
          ],
        },
        {
          kind: "obj",
          title: "Teil 3",
          task: "Sie hören ein Gespräch mit mehreren Personen über die Zukunft der Innenstädte. Sie hören den Text in vier Abschnitten jeweils einmal. Zu jedem Abschnitt gibt es zwei Aufgaben. Wählen Sie bei jeder Aufgabe die richtige Lösung. Vor dem Hören eines Abschnitts haben Sie 30 Sekunden Zeit, um die zwei Aufgaben zu lesen.",
          plays: 1,
          readSeconds: 30,
          groups: [
            {
              title: "Abschnitt 1",
              audio: [
                { s: "Moderatorin", t: "Leere Schaufenster, Kaufhäuser, die schließen, Fußgängerzonen, in denen nach Ladenschluss niemand mehr unterwegs ist: Viele Innenstädte stecken in der Krise. Darüber spreche ich mit dem Stadtplaner Doktor Jonas Kühn und mit Ines Sommer, die seit zwanzig Jahren ein Buchgeschäft in der Altstadt führt. Frau Sommer, wie erleben Sie die Situation?" },
                { s: "Ines Sommer", t: "Ehrlich gesagt mit wachsender Sorge. In unserer Straße stehen inzwischen fünf Läden leer. Natürlich spielt der Onlinehandel eine Rolle, das will ich gar nicht kleinreden. Aber das eigentliche Problem ist, dass die Mieten in den letzten Jahren immer weiter gestiegen sind, obwohl die Umsätze sinken. Diese Kombination hält kaum ein kleines Geschäft lange durch." },
                { s: "Dr. Kühn", t: "Ich würde gern einen Schritt zurückgehen. Wir haben unsere Innenstädte über Jahrzehnte zu reinen Einkaufszonen gemacht. Gewohnt wird woanders, gearbeitet wird woanders, und die Kultur sitzt am Stadtrand in großen Hallen. Wenn dann der Handel schwächelt, bleibt nichts mehr übrig. Der Onlinehandel hat diese Schwäche nicht verursacht, er hat sie nur sichtbar gemacht." },
              ],
              qs: [
                { t: "mc", q: "Frau Sommer sieht den Hauptgrund für den Leerstand in …", o: ["steigenden Mieten bei gleichzeitig sinkenden Einnahmen.", "fehlenden Parkplätzen in der Altstadt.", "der Konkurrenz durch große Kaufhäuser."], a: 0 },
                { t: "mc", q: "Herr Kühn meint, dass der Onlinehandel …", o: ["die Hauptursache für die Krise ist.", "ein bereits bestehendes Problem offengelegt hat.", "den Innenstädten langfristig nützen wird."], a: 1 },
              ],
            },
            {
              title: "Abschnitt 2",
              audio: [
                { s: "Moderatorin", t: "Herr Kühn, was wäre die Alternative?" },
                { s: "Dr. Kühn", t: "Mischung. In ein leer stehendes Kaufhaus können Wohnungen ziehen, eine Stadtbibliothek, eine Volkshochschule, Arztpraxen, vielleicht ein Markt im Erdgeschoss. Es gibt Städte, in denen das bereits gelungen ist. Dort sind die Menschen auch abends und am Wochenende in der Innenstadt, und davon profitiert am Ende auch der Handel." },
                { s: "Ines Sommer", t: "Das klingt gut, aber ich bin da skeptisch. Bei uns sind vor zwei Jahren Wohnungen über einer Musikkneipe entstanden. Seitdem gibt es ständig Ärger, weil sich die neuen Bewohner über den Lärm beschweren. Die Kneipe gab es übrigens schon vierzig Jahre vorher." },
                { s: "Dr. Kühn", t: "Das sind reale Konflikte, keine Frage. Aber sie lassen sich lösen, mit klaren Regeln, mit Schallschutz und indem man die Leute von Anfang an an der Planung beteiligt. Eine Innenstadt, in der nichts los ist, ist sicher ruhig, aber eben auch tot." },
              ],
              qs: [
                { t: "mc", q: "Herr Kühn schlägt vor, leer stehende Kaufhäuser …", o: ["für unterschiedliche Zwecke umzubauen.", "abzureißen und durch Grünflächen zu ersetzen.", "Onlinehändlern als Lager anzubieten."], a: 0 },
                { t: "mc", q: "Frau Sommer berichtet von …", o: ["einer Kneipe, die wegen neuer Wohnungen schließen musste.", "Plänen, die Altstadt nachts zu sperren.", "Streit zwischen neuen Bewohnern und einem Lokal."], a: 2 },
              ],
            },
            {
              title: "Abschnitt 3",
              audio: [
                { s: "Moderatorin", t: "Ein weiteres Streitthema ist der Verkehr. Viele Städte wollen Autos aus den Zentren verbannen. Frau Sommer, was bedeutet das für Sie?" },
                { s: "Ines Sommer", t: "Ein großer Teil meiner Kundschaft kommt aus den umliegenden Dörfern, und dort fährt abends kein Bus mehr. Wenn diese Menschen nicht mehr mit dem Auto in die Stadt kommen können, bestellen sie eben im Internet. Das ist keine Theorie, das höre ich jeden Tag an der Kasse." },
                { s: "Dr. Kühn", t: "Ich verstehe den Einwand. Die Daten aus vielen Städten zeigen allerdings ein anderes Bild, als die meisten Händler vermuten. Autofahrer geben pro Besuch zwar etwas mehr aus, aber Fußgänger und Radfahrer kommen deutlich häufiger und lassen deshalb über den Monat gerechnet mehr Geld in den Geschäften." },
                { s: "Moderatorin", t: "Wäre ein Kompromiss denkbar, etwa große Parkhäuser am Stadtrand und von dort ein dichter Takt mit kleinen Bussen ins Zentrum?" },
                { s: "Ines Sommer", t: "Wenn das zuverlässig funktioniert, könnte ich damit leben." },
              ],
              qs: [
                { t: "mc", q: "Laut Herrn Kühn …", o: ["geben Autofahrer insgesamt am meisten Geld aus.", "kommen die meisten Kunden mit dem Auto.", "lassen Fußgänger und Radfahrer auf Dauer mehr Geld in der Stadt."], a: 2 },
                { t: "mc", q: "Die Moderatorin bringt ins Gespräch, …", o: ["den Nahverkehr kostenlos zu machen.", "den Lieferverkehr einzuschränken.", "Parkmöglichkeiten außerhalb mit einem Shuttle zu verbinden."], a: 2 },
              ],
            },
            {
              title: "Abschnitt 4",
              audio: [
                { s: "Moderatorin", t: "Zum Schluss: Was können die Händler selbst tun, und was die Städte?" },
                { s: "Ines Sommer", t: "Mit dem Preis kann ich gegen die großen Plattformen nicht gewinnen. Was ich bieten kann, ist Beratung, Lesungen am Abend, ein Ort, an dem man sich wohlfühlt. Außerdem haben wir uns mit sechs anderen Geschäften zusammengetan und bieten jetzt gemeinsam einen Lieferdienst mit dem Lastenrad an. Allein hätte das keiner von uns stemmen können." },
                { s: "Dr. Kühn", t: "Und die Städte müssen den Rahmen schaffen. Sie können leer stehende Läden anmieten und sie befristet und günstig an junge Unternehmen, Künstlerinnen oder soziale Projekte weitergeben, damit Leben in die Straßen kommt. Ein leerer Laden zieht den nächsten nach sich, ein lebendiger übrigens auch." },
                { s: "Moderatorin", t: "Vielen Dank Ihnen beiden." },
              ],
              qs: [
                { t: "mc", q: "Frau Sommer setzt in ihrem Geschäft vor allem auf …", o: ["günstige Preise.", "Erlebnis, Beratung und Kooperation.", "einen eigenen Onlineshop."], a: 1 },
                { t: "mc", q: "Herr Kühn fordert von den Städten, …", o: ["leere Läden zeitweise zu günstigen Bedingungen weiterzuvermieten.", "den Onlinehandel stärker zu besteuern.", "neue Einkaufszentren am Stadtrand zu bauen."], a: 0 },
              ],
            },
          ],
        },
        {
          kind: "obj",
          title: "Teil 4",
          task: "Sie hören einen Vortrag über Lichtverschmutzung. Sie hören den Text zweimal. Wählen Sie bei jeder Aufgabe die richtige Lösung. Lesen Sie jetzt die Aufgaben 24 bis 30. Dazu haben Sie 90 Sekunden Zeit.",
          plays: 2,
          readSeconds: 90,
          groups: [
            {
              audio: [
                { s: "Rednerin", t: "Meine Damen und Herren, wann haben Sie zuletzt die Milchstraße gesehen? Wenn Sie in einer Stadt leben, lautet die ehrliche Antwort vermutlich: noch nie oder vor sehr langer Zeit. Damit sind Sie nicht allein. Ein großer Teil der Menschen in Europa kann sie vom eigenen Wohnort aus nicht mehr erkennen. Der Grund ist das, was wir Lichtverschmutzung nennen: künstliches Licht, das dort leuchtet, wo es niemand braucht. Lange wurde das Thema als ästhetisches Problem für Hobbyastronomen belächelt. Inzwischen gilt es in der Forschung als ernst zu nehmende Umweltbelastung, und auch erste Gesetze greifen es auf." },
                { s: "Rednerin", t: "Besonders gut untersucht sind die Folgen für Insekten. Viele nachtaktive Arten werden von Lampen geradezu magisch angezogen. Sie umkreisen die Lichtquelle, bis sie vor Erschöpfung sterben oder von Fressfeinden erbeutet werden. Allein an einer einzigen Straßenlaterne können in einer Sommernacht Hunderte Insekten verenden. Das hat Folgen für die gesamte Nahrungskette, denn Insekten bestäuben Pflanzen und sind Nahrung für Vögel und Fledermäuse." },
                { s: "Rednerin", t: "Auch Zugvögel geraten in Schwierigkeiten. Viele Arten ziehen nachts und orientieren sich dabei unter anderem am Sternenhimmel. Hell erleuchtete Städte und Gebäude können sie von ihrer Route abbringen; manche kreisen stundenlang um beleuchtete Hochhäuser, bis sie entkräftet sind." },
                { s: "Rednerin", t: "Und der Mensch? Unser Körper ist auf den Wechsel von Hell und Dunkel eingestellt. Licht am Abend, vor allem mit hohem Blauanteil, hemmt die Ausschüttung des Hormons Melatonin, das uns müde macht. Wer nachts in einem hell erleuchteten Schlafzimmer liegt, weil gegenüber eine Leuchtreklame blinkt, schläft schlechter. Auf Dauer bringt das unseren gesamten Tag-Nacht-Rhythmus durcheinander." },
                { s: "Rednerin", t: "Nun könnte man meinen, mit der Umstellung auf sparsame LED-Leuchten sei das Problem gelöst. Leider ist das nur halb richtig. LEDs sparen tatsächlich viel Energie. Weil Licht dadurch aber billiger geworden ist, wird mancherorts heller und großflächiger beleuchtet als zuvor. Hinzu kommt, dass viele der ersten LED-Generationen sehr kaltweißes Licht abstrahlen, das für Insekten besonders anziehend ist." },
                { s: "Rednerin", t: "Was also tun? Die gute Nachricht: Lichtverschmutzung lässt sich vergleichsweise leicht verringern. Leuchten sollten nur nach unten strahlen und nicht in den Himmel. Warmweißes Licht ist deutlich weniger problematisch als kaltweißes. Und vieles muss gar nicht die ganze Nacht brennen. Bewegungsmelder oder eine Abschaltung nach Mitternacht reichen oft völlig aus. Einige Gemeinden haben ihre Straßenbeleuchtung entsprechend umgerüstet und sparen dabei auch noch erhebliche Kosten." },
                { s: "Rednerin", t: "Ich möchte deshalb mit einer Bitte schließen, die sich an Kommunen, Unternehmen und an jeden Einzelnen richtet: Schauen Sie sich Ihre Beleuchtung einmal kritisch an. Braucht der Garten wirklich die ganze Nacht Licht? Muss das Schaufenster bis zum Morgen strahlen? Wenn wir die Nacht wieder ein Stück dunkler werden lassen, gewinnen wir mehr, als wir verlieren. Vielen Dank." },
              ],
              qs: [
                { t: "mc", q: "Lichtverschmutzung wird heute …", o: ["als ernsthaftes Umweltproblem betrachtet.", "vor allem als ästhetisches Problem gesehen.", "nur von Hobbyastronomen untersucht."], a: 0 },
                { t: "mc", q: "Was sagt die Rednerin über Insekten?", o: ["Sie meiden beleuchtete Straßen.", "Viele sterben an künstlichen Lichtquellen.", "Sie spielen für die Nahrungskette kaum eine Rolle."], a: 1 },
                { t: "mc", q: "Zugvögel …", o: ["fliegen ausschließlich tagsüber.", "lassen sich von Licht nicht beeinflussen.", "nutzen unter anderem die Sterne zur Orientierung."], a: 2 },
                { t: "mc", q: "Beim Menschen führt Licht in der Nacht vor allem zu …", o: ["einer Störung des Schlaf-Wach-Rhythmus.", "Unfällen im Straßenverkehr.", "einem höheren Stromverbrauch."], a: 0 },
                { t: "mc", q: "Die Umstellung auf LED-Leuchten hat …", o: ["das Problem vollständig gelöst.", "teilweise zu mehr Beleuchtung geführt.", "keinerlei Energie eingespart."], a: 1 },
                { t: "mc", q: "Als wirksame Maßnahme nennt die Rednerin, …", o: ["Außenbeleuchtung grundsätzlich zu verbieten.", "die Strompreise zu erhöhen.", "das Licht gezielt nach unten zu lenken."], a: 2 },
                { t: "mc", q: "Die Rednerin schließt mit …", o: ["einem Appell, die eigene Beleuchtung zu überdenken.", "einer Kritik an der Forschung.", "der Prognose, dass das Problem bald verschwindet."], a: 0 },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "schreiben",
      title: "Schreiben",
      minutes: 75,
      parts: [
        {
          kind: "write",
          title: "Teil 1 – Diskussionsbeitrag",
          minutes: 50,
          words: 230,
          formal: false,
          task: "Für das Internetforum „Gesellschaft & Zukunft“ verfassen Sie einen Diskussionsbeitrag zu diesem Thema:\n\nEin Pflichtjahr für alle?\nSollten junge Menschen nach der Schule ein verpflichtendes soziales Jahr leisten?\n\nSchreiben Sie circa 230 Wörter. Bei der Bewertung wird darauf geachtet, wie genau die Inhaltspunkte bearbeitet sind, wie korrekt der Text ist und wie gut die Sätze und Abschnitte sprachlich miteinander verknüpft sind.",
          points: [
            "Erklären Sie, welche Ziele mit einem solchen Pflichtjahr verfolgt werden könnten.",
            "Argumentieren Sie anhand eines Beispiels für oder gegen ein Pflichtjahr.",
            "Nennen Sie mögliche Probleme bei der Umsetzung.",
            "Erläutern Sie eine Alternative, wie junge Menschen für gesellschaftliches Engagement gewonnen werden könnten.",
          ],
          checklist: ["Einleitung mit Bezug zum Thema", "Alle vier Inhaltspunkte, jeweils ausgeführt", "C1-Verknüpfungen: zumal, wohingegen, insofern, nicht zuletzt", "Nominalstil und Passiv, wo es passt", "circa 230 Wörter"],
          model: `Die Forderung nach einem sozialen Pflichtjahr taucht in der politischen Debatte regelmäßig auf – und spaltet die Gemüter.

Befürworter verfolgen damit vor allem zwei Ziele: Zum einen sollen Pflegeeinrichtungen, Kitas und Katastrophenschutz dringend benötigte Unterstützung erhalten. Zum anderen soll das Jahr junge Menschen aus ihrer gewohnten Umgebung herausholen und mit Lebenswelten in Kontakt bringen, die ihnen sonst verschlossen blieben. Gerade in einer zunehmend polarisierten Gesellschaft könnte dies den Zusammenhalt stärken.

Wie wertvoll eine solche Erfahrung sein kann, zeigt das Beispiel meines Cousins, der nach dem Abitur freiwillig ein Jahr in einer Behindertenwerkstatt arbeitete. Er selbst sagt, er habe dort mehr über sich gelernt als in dreizehn Schuljahren. Entscheidend ist allerdings das Wort „freiwillig“.

Genau hier liegen die Probleme einer Pflicht. Wer gegen seinen Willen eingesetzt wird, ist kaum motiviert, und Einrichtungen müssten unwillige Helfer betreuen, statt entlastet zu werden. Hinzu kommen rechtliche Hürden sowie die Frage, wer die Kosten für Unterkunft und Taschengeld trägt.

Sinnvoller erscheint mir daher, die bestehenden Freiwilligendienste attraktiver zu machen: durch ein angemessenes Entgelt, die Anrechnung auf Studium oder Ausbildung und gezielte Werbung an Schulen. Nicht zuletzt würde es helfen, wenn Arbeitgeber ein solches Jahr im Lebenslauf ausdrücklich honorierten.

Engagement lässt sich, so meine Überzeugung, nicht verordnen – wohl aber ermöglichen.`,
        },
        {
          kind: "write",
          title: "Teil 2 – E-Mail",
          minutes: 25,
          words: 120,
          formal: true,
          task: "Sie sind seit vielen Jahren Mitglied in einem Sportverein. Der Vorstand hat beschlossen, die Mitgliedsbeiträge um 40 Prozent zu erhöhen und die Trainingszeiten am Abend zu streichen. Schreiben Sie eine E-Mail an den Vorsitzenden, Herrn Petersen. Schreiben Sie circa 120 Wörter.",
          points: [
            "Zeigen Sie Verständnis für die finanzielle Lage des Vereins.",
            "Beschreiben Sie, welche Folgen die Änderungen für Sie persönlich haben.",
            "Machen Sie auf mögliche Konsequenzen für den Verein aufmerksam.",
            "Schlagen Sie eine Alternative vor.",
          ],
          checklist: ["Formelle Anrede und Gruß", "Höflicher, aber bestimmter Ton", "Alle vier Punkte", "Konjunktiv II für Vorschläge", "circa 120 Wörter"],
          model: `Sehr geehrter Herr Petersen,

mit Bedauern habe ich von den Beschlüssen der letzten Vorstandssitzung erfahren. Mir ist bewusst, dass die gestiegenen Energie- und Hallenkosten den Verein vor erhebliche Herausforderungen stellen.

Für mich persönlich bedeuten die Änderungen allerdings, dass ich nicht mehr am Training teilnehmen kann, da ich berufsbedingt erst nach 18 Uhr Zeit habe. Ähnlich geht es vielen berufstätigen Mitgliedern.

Ich befürchte daher, dass zahlreiche langjährige Mitglieder austreten werden – womit dem Verein am Ende noch weniger Einnahmen zur Verfügung stünden.

Wäre es nicht denkbar, die Beiträge moderater anzuheben und die Abendtermine stattdessen auf zwei Tage pro Woche zu bündeln? Gern unterstütze ich den Vorstand auch bei der Suche nach Sponsoren.

Mit freundlichen Grüßen
Thanh Nguyen`,
        },
      ],
    },
    {
      id: "sprechen",
      title: "Sprechen",
      minutes: 20,
      prep: 20,
      parts: [
        {
          kind: "speak",
          title: "Teil 1 – Vortrag halten",
          talk: 5,
          task: "Wählen Sie aus den beiden Themen ein Thema aus. Sie nehmen an einem Seminar zu aktuellen Fragen teil und halten einen kurzen Vortrag zu dem von Ihnen gewählten Thema. Ihre Gesprächspartner hören zu und stellen Ihnen anschließend Fragen. Gehen Sie auf alle vier Punkte ein und achten Sie darauf, Ihren Vortrag gut zu strukturieren. Sprechen Sie circa 5 Minuten und beantworten Sie danach Fragen.",
          topics: [
            {
              title: "Thema 1: Sollten Städte großflächige Werbung im öffentlichen Raum verbieten?",
              text: "Einige Städte haben Werbeplakate und digitale Werbetafeln stark eingeschränkt, um das Stadtbild zu verbessern und den Konsumdruck zu verringern. Kritiker sehen darin einen Eingriff in die unternehmerische Freiheit und warnen vor Einnahmeverlusten für die Kommunen.",
              points: ["Geben Sie ein Beispiel.", "Argumentieren Sie für oder gegen ein solches Verbot.", "Äußern Sie sich: Welche Folgen hätte ein Verbot für Unternehmen und Kommunen?", "Machen Sie einen Vorschlag für einen Kompromiss."],
            },
            {
              title: "Thema 2: Sollte das Wahlalter auf 16 Jahre gesenkt werden?",
              text: "In mehreren Ländern dürfen Jugendliche bereits mit 16 Jahren wählen. Befürworter verweisen darauf, dass politische Entscheidungen die Zukunft junger Menschen besonders stark betreffen. Gegner bezweifeln, dass Sechzehnjährige reif genug für diese Verantwortung sind.",
              points: ["Geben Sie ein Beispiel.", "Argumentieren Sie für oder gegen eine Senkung des Wahlalters.", "Äußern Sie sich: Welche Voraussetzungen müssten Schulen schaffen?", "Machen Sie einen Vorschlag, wie Jugendliche auf andere Weise beteiligt werden könnten."],
            },
          ],
          phrases: ["Ich möchte mich in meinem Vortrag mit der Frage befassen, ob …", "Ein anschauliches Beispiel hierfür ist …", "Für ein solches Verbot spricht in erster Linie, dass …", "Dem lässt sich entgegenhalten, dass …", "Wägt man die Argumente gegeneinander ab, …", "Ein denkbarer Kompromiss bestünde darin, …"],
        },
        {
          kind: "speak",
          title: "Teil 2 – Diskussion führen",
          talk: 5,
          task: "Sie diskutieren mit einer Kollegin / einem Kollegen über die Vier-Tage-Woche. Ihr Arbeitgeber überlegt, sie testweise einzuführen. Dazu haben Sie folgende Meldung gelesen:\n\nVier-Tage-Woche im Test\nIn einem mehrmonatigen Pilotprojekt arbeiteten Beschäftigte zahlreicher Unternehmen bei vollem Lohn nur noch an vier Tagen. Viele Betriebe berichteten von zufriedeneren Mitarbeitenden und weniger Krankheitstagen; einige kehrten jedoch zum alten Modell zurück, weil Kundenanfragen liegen blieben.\n\nDiskutieren Sie gemeinsam circa 5 Minuten.",
          points: ["Kommentieren Sie: Was halten Sie von einer Vier-Tage-Woche?", "Begründen Sie Ihre Haltung.", "Gehen Sie auf die Situation in Ihrem Heimatland oder einem anderen Land ein.", "Einigen Sie sich auf Argumente für ein Gespräch mit Ihrer Geschäftsleitung."],
          phrases: ["Ich stehe dem Modell grundsätzlich positiv/skeptisch gegenüber, weil …", "Da muss ich Ihnen widersprechen: …", "Das ist sicher ein berechtigter Einwand, allerdings …", "In meinem Heimatland ist es eher so, dass …", "Können wir uns darauf verständigen, dass …?"],
        },
      ],
    },
  ],
};

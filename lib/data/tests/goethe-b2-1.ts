import type { Test } from "./types";

// Original practice set. Structure follows the official Goethe-Zertifikat B2 Modellsatz (Erwachsene):
// Lesen 65 min (9/6/6/6/3 items), Hören 40 min (10/6/6/8), Schreiben 75 min (150 + 100 words), Sprechen ~15 min.
// Texts are invented and deliberately denser than the model test.
export const goetheB2_1: Test = {
  id: "goethe-b2-1",
  level: "B2",
  title: "Modelltest 1",
  exam: "Goethe-Zertifikat B2",
  theme: "Engagement, Mobilität, Wissen",
  modules: [
    {
      id: "lesen",
      title: "Lesen",
      minutes: 65,
      parts: [
        {
          kind: "obj",
          title: "Teil 1",
          minutes: 18,
          task: "Sie lesen in einem Forum, wie Menschen über ihr ehrenamtliches Engagement denken. Auf welche der vier Personen treffen die einzelnen Aussagen zu? Die Personen können mehrmals gewählt werden.",
          bankTitle: "Personen", reuse: true,
          bank: [
            { k: "a", v: "Katharina" },
            { k: "b", v: "Tobias" },
            { k: "c", v: "Elena" },
            { k: "d", v: "Herbert" },
          ],
          groups: [
            {
              title: "a  Katharina",
              text: "Ich engagiere mich seit fünf Jahren bei der Tafel, wo wir gespendete Lebensmittel an Bedürftige verteilen. Angefangen habe ich ehrlich gesagt aus Einsamkeit: Nach meinem Umzug kannte ich in der neuen Stadt keinen Menschen. Heute gehören einige der anderen Helferinnen zu meinen engsten Vertrauten. Was mich allerdings zunehmend wütend macht: Politiker loben das Ehrenamt bei jeder Gelegenheit, verlassen sich aber viel zu sehr darauf. In einem so reichen Land müsste eigentlich der Staat dafür sorgen, dass niemand auf Lebensmittelspenden angewiesen ist. Wir stopfen Löcher, die gar nicht erst entstehen dürften.",
              qs: [],
            },
            {
              title: "b  Tobias",
              text: "Ich trainiere eine Fußballmannschaft mit Zehnjährigen. Das kostet Zeit – zwei Abende pro Woche, dazu die Spiele am Wochenende. Neben dem Studium wird mir das in der Prüfungszeit manchmal zu viel, und ich habe schon überlegt, eine Pause einzulegen. Andererseits lerne ich dabei Dinge, die mir an der Uni niemand beibringt: wie man eine Gruppe motiviert, wie man mit enttäuschten Eltern umgeht, wie man Streit schlichtet. Das habe ich übrigens auch in meinen Lebenslauf geschrieben, und im letzten Vorstellungsgespräch drehte sich die halbe Zeit genau darum. Die Stelle habe ich bekommen.",
              qs: [],
            },
            {
              title: "c  Elena",
              text: "Lange hatte ich keine Lust auf ein Ehrenamt, weil ich den Verdacht hatte, man werde nur als kostenlose Arbeitskraft ausgenutzt. Dann hat mich meine Tochter zu einem Projekt mitgenommen, bei dem wir mit Geflüchteten Deutsch üben. Ich war verblüfft, wie viel ich selbst dabei lerne – über andere Kulturen, aber auch über meine eigene Sprache, deren Regeln ich plötzlich erklären muss. Mein Rat an alle, die zögern: Suchen Sie sich etwas, das wirklich zu Ihnen passt, und sagen Sie lieber einmal zu wenig zu als einmal zu viel. Wer sich übernimmt, gibt nach ein paar Monaten frustriert auf.",
              qs: [],
            },
            {
              title: "d  Herbert",
              text: "Seit ich in Rente bin, lese ich zweimal pro Woche Kindern im Krankenhaus vor. Für mich ist das mehr als ein Zeitvertreib: Diese festen Termine geben meiner Woche einen Rahmen, den ich nach dem Berufsleben schmerzlich vermisst habe. Ich finde allerdings, dass man es Freiwilligen unnötig schwer macht. Für alles braucht man Formulare, Schulungen und Bescheinigungen – bevor ich das erste Mal vorlesen durfte, vergingen fast drei Monate. Ich verstehe ja, dass Kinder geschützt werden müssen. Aber manche Interessenten springen bei so viel Papierkram einfach wieder ab.",
              qs: [
                { t: "pick", q: "Wer hilft bei der Versorgung von Menschen mit Essen?", a: "a", ex: true },
                { t: "pick", q: "Wer hat durch das Ehrenamt enge Freundschaften geschlossen?", a: "a" },
                { t: "pick", q: "Wer beklagt den bürokratischen Aufwand?", a: "d" },
                { t: "pick", q: "Wer hatte zunächst Vorbehalte gegen ehrenamtliche Arbeit?", a: "c" },
                { t: "pick", q: "Wer meint, der Staat delegiere seine Aufgaben an Freiwillige?", a: "a" },
                { t: "pick", q: "Wem hat das Engagement bei der Jobsuche genützt?", a: "b" },
                { t: "pick", q: "Wer warnt davor, sich zu viel vorzunehmen?", a: "c" },
                { t: "pick", q: "Wer hat schon daran gedacht, das Ehrenamt vorübergehend aufzugeben?", a: "b" },
                { t: "pick", q: "Wer schätzt die Regelmäßigkeit, die das Ehrenamt in den Alltag bringt?", a: "d" },
                { t: "pick", q: "Wer ist durch ein Familienmitglied zum Ehrenamt gekommen?", a: "c" },
              ],
            },
          ],
        },
        {
          kind: "obj",
          title: "Teil 2",
          minutes: 12,
          task: "Sie lesen in einer Zeitschrift einen Artikel über Nachtzüge. Welche Sätze passen in die Lücken? Zwei Sätze passen nicht.",
          bankTitle: "Sätze",
          gapExample: "Kaum jemand wollte noch eine ganze Nacht im Zug verbringen, wenn man in einer Stunde am Ziel sein konnte.",
          bank: [
            { k: "a", v: "Viele Reisende würden deshalb gern aufs Fliegen verzichten, können sich aber keine langen Reisetage leisten." },
            { k: "b", v: "Mit den ratternden Liegewagen von früher haben die neuen Züge kaum noch etwas gemein." },
            { k: "c", v: "So fehlt es etwa an Schlafwagen, weil nur noch wenige Hersteller sie überhaupt bauen." },
            { k: "d", v: "Gleiche Wettbewerbsbedingungen für Bahn und Flugzeug seien längst überfällig." },
            { k: "e", v: "Ende 2016 stellte sogar die Deutsche Bahn ihre letzten eigenen Nachtzüge ein." },
            { k: "f", v: "Experten gehen davon aus, dass Kurzstreckenflüge in Europa schon bald verboten werden." },
            { k: "g", v: "Das wird vor allem davon abhängen, ob weiter in Fahrzeuge und Verbindungen investiert wird." },
            { k: "h", v: "Die meisten Österreicher fahren ohnehin lieber mit dem Auto in den Urlaub." },
          ],
          groups: [
            {
              title: "Die Rückkehr der Nachtzüge",
              text: `Lange Zeit galten Nachtzüge in Europa als Auslaufmodell. Billigflieger waren schneller und meist auch günstiger. [[0]] Eine Bahngesellschaft nach der anderen strich deshalb ihre Verbindungen. [[1]] Inzwischen erleben die Züge jedoch ein überraschendes Comeback.

Ein Grund dafür ist das gewachsene Umweltbewusstsein. Wer mit dem Zug statt mit dem Flugzeug von Wien nach Paris reist, verursacht nur einen Bruchteil der Emissionen. [[2]] Für sie ist die Fahrt über Nacht ein idealer Kompromiss: Man verliert keinen Urlaubstag und kommt am Morgen ausgeschlafen mitten in der Stadt an.

Besonders die Österreichischen Bundesbahnen haben in den letzten Jahren kräftig investiert. Sie haben Strecken übernommen, die andere Unternehmen aufgegeben hatten, und eine neue Fahrzeuggeneration bestellt. [[3]] Statt enger Sechser-Abteile gibt es dort Mini-Kabinen für eine Person, mit Schließfach, Steckdose und WLAN.

Doch der Ausbau stößt an Grenzen. [[4]] Hinzu kommt, dass die Betreiber für jede Strecke Gebühren an die Netzbetreiber mehrerer Länder zahlen müssen, was die Tickets verteuert. Eine Fahrt im Schlafwagen kostet daher oft deutlich mehr als ein Flug.

Kritiker fordern deshalb Unterstützung von der Politik. [[5]] Solange Kerosin für Flugzeuge steuerfrei sei, könne die Bahn kaum konkurrieren, argumentiert etwa ein großer Verkehrsclub.

Ob die Nachtzüge langfristig zur echten Alternative werden, ist offen. [[6]] An der Nachfrage jedenfalls dürfte es nicht scheitern: Viele Verbindungen sind in den Ferien schon Wochen im Voraus ausgebucht.`,
              qs: [
                { t: "pick", q: "", a: "e" },
                { t: "pick", q: "", a: "a" },
                { t: "pick", q: "", a: "b" },
                { t: "pick", q: "", a: "c" },
                { t: "pick", q: "", a: "d" },
                { t: "pick", q: "", a: "g" },
              ],
            },
          ],
        },
        {
          kind: "obj",
          title: "Teil 3",
          minutes: 12,
          task: "Sie lesen in einer Zeitung einen Artikel über das Lesen im digitalen Zeitalter. Wählen Sie bei jeder Aufgabe die richtige Lösung.",
          groups: [
            {
              title: "Lesen ist wie ein Muskel",
              text: `Wer heute ein Buch liest, wird ständig unterbrochen: Das Smartphone vibriert, eine Nachricht kommt an, schnell noch die Wettervorhersage checken. Die Leseforscherin Prof. Dr. Miriam Kessler beobachtet diese Entwicklung mit Sorge. „Wir lesen heute mehr als je zuvor – E-Mails, Nachrichten, Posts. Aber wir lesen anders“, sagt sie. „Unser Gehirn gewöhnt sich daran, Texte nur noch zu überfliegen, und verlernt dabei, sich in komplexe Gedankengänge zu vertiefen.“

In einer Studie ließ Kessler 300 Studierende denselben Sachtext lesen, die Hälfte auf Papier, die andere Hälfte am Bildschirm. Bei einfachen Fragen nach Fakten gab es kaum Unterschiede. Ging es jedoch darum, Zusammenhänge zu erklären oder die Argumentation des Autors zu bewerten, schnitt die Papiergruppe deutlich besser ab. Besonders aufschlussreich: Die Bildschirmleser schätzten ihr eigenes Verständnis höher ein als die Papierleser – obwohl ihre Ergebnisse schlechter waren.

Kessler spricht von einem „Überschätzungseffekt“. Wer am Bildschirm lese, erwarte unbewusst einen schnellen, oberflächlichen Text und investiere entsprechend weniger Mühe. Ein Grund zur Panik sei das jedoch nicht, betont die Forscherin. „Digitale Medien haben enorme Vorteile, gerade wenn es darum geht, schnell eine bestimmte Information zu finden.“ Entscheidend sei, für jede Aufgabe das passende Medium zu wählen und das konzentrierte Lesen bewusst zu trainieren.

Wie das gelingen kann, zeigt ein Projekt an mehreren Grundschulen. Dort gibt es jeden Tag eine feste Lesezeit von zwanzig Minuten, in der alle – auch die Lehrkräfte und der Hausmeister – ein Buch ihrer Wahl lesen. Nach einem Jahr hatten sich die Leseleistungen der Kinder messbar verbessert. Bemerkenswert fanden die Initiatoren vor allem eine Nebenwirkung: Viele Eltern berichteten, ihre Kinder griffen nun auch zu Hause von sich aus zum Buch.

Kessler empfiehlt auch Erwachsenen, sich solche „Leseinseln“ zu schaffen: eine halbe Stunde am Abend, das Telefon im Nebenzimmer. Wer längere Texte am Bildschirm lesen müsse, solle Notizen machen oder den Inhalt anschließend in eigenen Worten zusammenfassen. „Lesen ist wie ein Muskel“, sagt sie. „Wenn wir ihn nicht benutzen, wird er schwächer.“`,
              qs: [
                { t: "mc", q: "Frau Kessler ist besorgt, weil …", o: ["heute weniger gelesen wird als früher.", "die Fähigkeit zum vertieften Lesen nachlässt.", "Kinder kaum noch Bücher besitzen."], a: 1 },
                { t: "mc", q: "In der Studie zeigte sich, dass …", o: ["die Bildschirmleser bei Faktenfragen schlechter abschnitten.", "beide Gruppen verschiedene Texte lasen.", "Papierleser komplexe Inhalte besser verstanden."], a: 2 },
                { t: "mc", q: "Die Bildschirmleser …", o: ["hielten ihr Textverständnis für besser, als es war.", "brauchten mehr Zeit für den Text.", "bewerteten den Text kritischer."], a: 0 },
                { t: "mc", q: "Die Forscherin rät, …", o: ["digitale Medien aus Schulen zu verbannen.", "das Medium je nach Leseziel zu wählen.", "grundsätzlich nur noch auf Papier zu lesen."], a: 1 },
                { t: "mc", q: "Am Schulprojekt überraschte die Initiatoren besonders, dass …", o: ["auch das Personal mitlas.", "sich die Leseleistung verbesserte.", "die Kinder auch in ihrer Freizeit mehr lasen."], a: 2 },
                { t: "mc", q: "Für das Lesen längerer Texte am Bildschirm empfiehlt Kessler, …", o: ["den Inhalt danach mit eigenen Worten wiederzugeben.", "das Telefon in ein anderes Zimmer zu legen.", "nur kurze Abschnitte zu lesen."], a: 0 },
              ],
            },
          ],
        },
        {
          kind: "obj",
          title: "Teil 4",
          minutes: 12,
          task: "Sie lesen in einer Zeitschrift Meinungsäußerungen zu einem möglichen Verbot von Inlandsflügen. Welche Äußerung passt zu welcher Überschrift? Eine Äußerung passt nicht. Die Äußerung a ist das Beispiel und kann nicht noch einmal verwendet werden.",
          bankTitle: "Äußerungen",
          bank: [
            { k: "a", v: "Stefan: Frankreich hat es vorgemacht: Inlandsflüge sind dort untersagt, sofern es eine Bahnverbindung von weniger als zweieinhalb Stunden gibt. Die Welt ist davon nicht untergegangen. Ich sehe nicht ein, warum ausgerechnet wir uns so schwer damit tun." },
            { k: "b", v: "Lena: Ich pendle beruflich jede Woche zwischen Hamburg und München. Theoretisch könnte ich den Zug nehmen, praktisch kommt er in jeder zweiten Woche mit Verspätung an, und Anschlusstermine platzen. Erst wenn die Bahn pünktlich ist, können wir über Verbote reden." },
            { k: "c", v: "Aylin: Menschen ändern ihr Verhalten selten, weil man es ihnen vorschreibt. Würde man die Bahn so günstig machen, dass sich das Fliegen schlicht nicht mehr lohnt, würden die meisten von selbst umsteigen. Ein Verbot erzeugt nur Trotz." },
            { k: "d", v: "Martin: Ich bin Pilot und verstehe die Debatte. Man sollte aber die Zahlen kennen: Inlandsflüge verursachen nur einen sehr kleinen Teil der Emissionen im Verkehr. Wer glaubt, mit einem Verbot das Klima zu retten, macht sich etwas vor." },
            { k: "e", v: "Ute: Wir leben auf dem Land, der nächste Bahnhof ist 30 Kilometer entfernt, und dort halten nur Regionalzüge. Für uns ist der kleine Flughafen in der Nähe die einzige Möglichkeit, schnell in eine andere Region zu kommen. In der Debatte denkt man offenbar nur an Großstädter." },
            { k: "f", v: "Jan: Ich bin vor einem Jahr aus Neugier mit dem Nachtzug nach Wien gefahren, statt zu fliegen. Es war günstiger als befürchtet und unglaublich entspannt. Seitdem prüfe ich vor jeder Reise zuerst, ob es auch ohne Flugzeug geht – meistens geht es." },
            { k: "g", v: "Petra: Ich arbeite in einem Reisebüro, und die meisten Kunden entscheiden nach dem Preis. Dass der Flug fast immer billiger ist, liegt auch daran, dass Flugbenzin nicht besteuert wird. Solange das so bleibt, ist der Wettbewerb einfach unfair." },
            { k: "h", v: "Konrad: Mir ist das Thema ehrlich gesagt ziemlich egal, ich bin seit zehn Jahren nicht mehr geflogen. Ich wünschte, die Politik würde sich mit derselben Energie um bezahlbare Wohnungen kümmern." },
          ],
          groups: [
            {
              qs: [
                { t: "pick", q: "Ein Nachbarland zeigt, wie es geht", a: "a", ex: true },
                { t: "pick", q: "Erst muss die Alternative zuverlässig sein", a: "b" },
                { t: "pick", q: "Anreize wirken besser als Zwang", a: "c" },
                { t: "pick", q: "Die Wirkung wird überschätzt", a: "d" },
                { t: "pick", q: "Die Provinz wird übersehen", a: "e" },
                { t: "pick", q: "Eine Reise, die Gewohnheiten verändert hat", a: "f" },
                { t: "pick", q: "Ungleiche Bedingungen verzerren den Markt", a: "g" },
              ],
            },
          ],
        },
        {
          kind: "obj",
          title: "Teil 5",
          minutes: 6,
          task: "Sie möchten an einem Weiterbildungsprogramm teilnehmen und lesen die Teilnahmebedingungen. Welche der Überschriften aus dem Inhaltsverzeichnis passen zu den Paragrafen? Vier Überschriften werden nicht gebraucht.",
          bankTitle: "Inhaltsverzeichnis",
          bank: [
            { k: "a", v: "Abschluss und Zertifikat" },
            { k: "b", v: "Unterkunft und Verpflegung" },
            { k: "c", v: "Zielgruppe und Voraussetzungen" },
            { k: "d", v: "Kosten und Zahlungsweise" },
            { k: "e", v: "Dauer und vorzeitige Beendigung" },
            { k: "f", v: "Fristen für die Bewerbung" },
            { k: "g", v: "Umgang mit vertraulichen Informationen" },
            { k: "h", v: "Versicherungsschutz" },
          ],
          groups: [
            { title: "§ 1", text: "Das Programm richtet sich an Beschäftigte und Studierende aller Fachrichtungen mit mindestens zwei Jahren Berufs- oder Studienerfahrung. Deutschkenntnisse auf dem Niveau B2 werden vorausgesetzt; Englischkenntnisse sind erwünscht, aber nicht Bedingung.", qs: [{ t: "pick", q: "§ 1", a: "c", ex: true }] },
            { title: "§ 2", text: "Die Teilnahmegebühr beträgt 450 Euro und kann in zwei Raten entrichtet werden. Die erste Rate ist vier Wochen vor Programmbeginn fällig, die zweite zur Halbzeit. Reise- und Übernachtungskosten sind nicht enthalten und werden auch nicht erstattet.", qs: [{ t: "pick", q: "§ 2", a: "d" }] },
            { title: "§ 3", text: "Das Programm umfasst zwölf Wochen. Wer die Teilnahme früher beenden möchte, teilt dies der Programmleitung spätestens zwei Wochen im Voraus schriftlich mit. Ein Anspruch auf anteilige Rückzahlung besteht in diesem Fall nicht.", qs: [{ t: "pick", q: "§ 3", a: "e" }] },
            { title: "§ 4", text: "Nach erfolgreicher Teilnahme wird ein Zertifikat ausgestellt. Voraussetzung sind eine Anwesenheit von mindestens 90 Prozent sowie eine Abschlusspräsentation. Wer sich anschließend für das Aufbauprogramm bewerben will, sollte das Zertifikat seiner Bewerbung beilegen.", qs: [{ t: "pick", q: "§ 4", a: "a" }] },
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
          task: "Sie hören fünf Gespräche und Äußerungen. Sie hören jeden Text einmal. Zu jedem Text lösen Sie zwei Aufgaben. Wählen Sie bei jeder Aufgabe die richtige Lösung.",
          plays: 1,
          groups: [
            {
              title: "Text 1",
              audio: [{ s: "Mann", t: "Seit unsere Firma das Homeoffice wieder eingeschränkt hat, muss ich dreimal pro Woche ins Büro. Klar, die Fahrt nervt, vierzig Minuten pro Strecke. Aber ehrlich gesagt merke ich, dass mir die spontanen Gespräche in der Kaffeeküche gefehlt haben. Manches Problem löst sich da in fünf Minuten, für das wir online eine Stunde lang Mails hin- und hergeschickt hätten. Was mich allerdings ärgert: Die Büros sind noch genauso eng wie vorher, und Ruhe zum Konzentrieren findet man kaum." }],
              qs: [
                { t: "tf", q: "Der Mann spricht über Vor- und Nachteile der Arbeit im Büro.", a: true },
                { t: "mc", q: "Was schätzt der Mann am Büro?", o: ["Den schnellen Austausch mit Kollegen.", "Die ruhige Arbeitsatmosphäre.", "Den kurzen Arbeitsweg."], a: 0 },
              ],
            },
            {
              title: "Text 2",
              audio: [
                { s: "Frau 1", t: "Sag mal, hast du dich jetzt für den Töpferkurs angemeldet?" },
                { s: "Frau 2", t: "Wollte ich, aber der Kurs am Dienstag war schon voll. Jetzt stehe ich auf der Warteliste. Man hat mir einen Kurs am Samstag angeboten, aber da arbeite ich ja." },
                { s: "Frau 1", t: "Schade. Und online, gibt's da nichts?" },
                { s: "Frau 2", t: "Töpfern online? Nein, das ist nichts für mich. Ich warte einfach ab. Es springen ja oft Leute kurz vorher ab." },
              ],
              qs: [
                { t: "tf", q: "Die Frau hat einen Platz im Kurs bekommen.", a: false },
                { t: "mc", q: "Was hat die Frau vor?", o: ["Sie macht einen Online-Kurs.", "Sie hofft, dass noch ein Platz frei wird.", "Sie besucht den Kurs am Samstag."], a: 1 },
              ],
            },
            {
              title: "Text 3",
              audio: [{ s: "Frau", t: "Ich lerne seit einem Jahr Japanisch mit einer App, jeden Tag zehn Minuten. Am Anfang war ich total motiviert, weil man für jede Lektion Punkte sammelt. Inzwischen sehe ich das kritischer. Ich kenne zwar eine Menge Wörter, aber als ich neulich mit einer japanischen Kollegin sprechen wollte, habe ich keinen vernünftigen Satz herausgebracht. Ohne echte Gespräche geht es eben nicht. Ich habe mich deshalb zusätzlich für ein Sprachtandem angemeldet." }],
              qs: [
                { t: "tf", q: "Die Frau erklärt, warum sie mit dem Japanischlernen aufgehört hat.", a: false },
                { t: "mc", q: "Welche Meinung hat die Frau?", o: ["Zum Sprechenlernen braucht man echte Gesprächspartner.", "Apps sind besonders gut für die Grammatik.", "Punktesysteme nehmen einem die Motivation."], a: 0 },
              ],
            },
            {
              title: "Text 4",
              audio: [
                { s: "Mann", t: "Und, habt ihr die Wohnung in der Südstadt genommen?" },
                { s: "Frau", t: "Fast. Die Wohnung ist super, aber im Vertrag steht, dass die Miete jedes Jahr automatisch steigt. Das hat uns der Makler bei der Besichtigung verschwiegen." },
                { s: "Mann", t: "Das nennt man Staffelmiete, oder? Das ist doch erlaubt." },
                { s: "Frau", t: "Erlaubt schon, aber bei drei Prozent pro Jahr zahlen wir in fünf Jahren deutlich mehr. Wir lassen den Vertrag jetzt erst einmal vom Mieterverein prüfen, bevor wir unterschreiben." },
              ],
              qs: [
                { t: "tf", q: "Die Frau und ihr Partner haben den Mietvertrag bereits unterschrieben.", a: false },
                { t: "mc", q: "Was stört die Frau an dem Vertrag?", o: ["Die Miete erhöht sich regelmäßig.", "Der Makler verlangt eine hohe Provision.", "Die Wohnung liegt zu weit draußen."], a: 0 },
              ],
            },
            {
              title: "Text 5",
              audio: [{ s: "Mann", t: "Bei uns im Dorf gäbe es ohne die freiwillige Feuerwehr gar keinen Brandschutz. Ich bin seit zwanzig Jahren dabei. Was mir Sorgen macht: Es kommen kaum junge Leute nach. Viele arbeiten in der Stadt und sind tagsüber gar nicht im Ort. Wenn mittags ein Alarm kommt, sind wir manchmal nur zu dritt. Wir versuchen jetzt, die Arbeitgeber in der Region zu überzeugen, ihre Leute für Einsätze freizustellen." }],
              qs: [
                { t: "tf", q: "Der Mann spricht über Personalprobleme bei der Feuerwehr.", a: true },
                { t: "mc", q: "Was ist laut dem Mann das Hauptproblem?", o: ["Die Feuerwehr hat zu wenig Geld.", "Tagsüber sind zu wenige Helfer im Ort.", "Arbeitgeber verbieten ihren Leuten den Einsatz."], a: 1 },
              ],
            },
          ],
        },
        {
          kind: "obj",
          title: "Teil 2",
          task: "Sie hören im Radio ein Interview mit einer Persönlichkeit aus der Wissenschaft. Sie hören den Text zweimal. Wählen Sie bei jeder Aufgabe die richtige Lösung.",
          plays: 2,
          readSeconds: 90,
          groups: [
            {
              audio: [
                { s: "Moderator", t: "Unser Gast heute ist Professorin Anna Berg. Sie leitet an einer Technischen Universität eine Forschungsgruppe zum Stadtklima. Frau Berg, wie sind Sie zu diesem Thema gekommen?" },
                { s: "Prof. Berg", t: "Eigentlich über einen Umweg. Ich habe Geografie studiert und wollte ursprünglich über Gletscher forschen. Dann kam der Hitzesommer 2003, in dem in Europa viele tausend Menschen an den Folgen der Hitze gestorben sind, vor allem ältere Menschen in Städten. Da wurde mir klar, dass die Gefahr nicht nur in den Alpen liegt, sondern direkt vor unserer Haustür." },
                { s: "Moderator", t: "Warum ist es in Städten eigentlich so viel heißer als auf dem Land?" },
                { s: "Prof. Berg", t: "Asphalt und Beton speichern tagsüber die Wärme und geben sie nachts wieder ab. Deshalb ist der Unterschied nachts am größten, in manchen Großstädten bis zu zehn Grad. Außerdem bremsen dicht stehende Gebäude den Wind, der sonst kühlere Luft hereinbringen würde." },
                { s: "Moderator", t: "Was kann man dagegen tun?" },
                { s: "Prof. Berg", t: "Das wirksamste Mittel sind Bäume. Ein großer Stadtbaum kühlt durch Verdunstung so stark wie mehrere Klimaanlagen, ohne Strom zu verbrauchen. Das Problem: Junge Bäume brauchen Jahrzehnte, bis sie diese Wirkung entfalten, und viele Arten vertragen die zunehmende Trockenheit nicht. Wir testen deshalb gerade, welche Baumarten mit den künftigen Bedingungen zurechtkommen." },
                { s: "Moderator", t: "Viele Städte setzen auch auf begrünte Dächer und Fassaden." },
                { s: "Prof. Berg", t: "Die helfen, aber man sollte sie nicht überschätzen. Für die Menschen auf der Straße bringt ein grünes Dach im fünften Stock wenig, es kühlt vor allem das Gebäude selbst. Für Fußgänger sind Schatten und Wasserflächen auf Plätzen viel wichtiger." },
                { s: "Moderator", t: "Was können Bürgerinnen und Bürger selbst tun?" },
                { s: "Prof. Berg", t: "Mehr als man denkt. Morgens früh lüften, tagsüber die Fenster geschlossen halten und abdunkeln. Und, das ist mir besonders wichtig, sich um ältere Nachbarn kümmern. Viele alte Menschen spüren Durst nicht mehr so stark und trinken bei Hitze zu wenig. Ein kurzer Besuch kann da Leben retten." },
                { s: "Moderator", t: "Sind Sie optimistisch?" },
                { s: "Prof. Berg", t: "Vorsichtig. Das Wissen ist da, und viele Städte haben inzwischen Hitzeaktionspläne. Aber die Umsetzung dauert viel zu lange. Wenn wir heute keinen Baum pflanzen, haben wir in dreißig Jahren keinen Schatten." },
              ],
              qs: [
                { t: "mc", q: "Frau Berg forscht zum Stadtklima, weil …", o: ["sie als Kind einen extremen Sommer erlebt hat.", "ein Hitzesommer ihr die Gefahren in Städten bewusst gemacht hat.", "sie in der Gletscherforschung keine Stelle fand."], a: 1 },
                { t: "mc", q: "Der Temperaturunterschied zwischen Stadt und Land ist …", o: ["tagsüber am größten.", "im Winter am größten.", "nachts am größten."], a: 2 },
                { t: "mc", q: "Was sagt Frau Berg über Stadtbäume?", o: ["Ihre volle Wirkung entfalten sie erst nach vielen Jahren.", "Sie verbrauchen sehr viel Wasser und Energie.", "Alle Arten kommen mit Trockenheit gut zurecht."], a: 0 },
                { t: "mc", q: "Begrünte Dächer …", o: ["kühlen vor allem die Straße.", "nützen vor allem dem Gebäude selbst.", "sind wirksamer als Bäume."], a: 1 },
                { t: "mc", q: "Frau Berg empfiehlt, …", o: ["ältere Menschen in der Nachbarschaft zu unterstützen.", "bei Hitze tagsüber die Fenster zu öffnen.", "mehr Klimaanlagen einzubauen."], a: 0 },
                { t: "mc", q: "Frau Berg ist …", o: ["sehr pessimistisch, weil das Wissen fehlt.", "mit den bisherigen Maßnahmen zufrieden.", "zuversichtlich, findet aber, dass zu langsam gehandelt wird."], a: 2 },
              ],
            },
          ],
        },
        {
          kind: "obj",
          title: "Teil 3",
          task: "Sie hören im Radio ein Gespräch mit mehreren Personen. Die Personen sprechen über ein Auslandsjahr nach der Schule. Sie hören den Text einmal. Wählen Sie bei jeder Aufgabe: Wer sagt das?",
          plays: 1,
          readSeconds: 60,
          bankTitle: "Wer sagt das?", reuse: true,
          bank: [
            { k: "a", v: "Moderator" },
            { k: "b", v: "Dr. Katrin Roth, Bildungsforscherin" },
            { k: "c", v: "David Okafor, Student" },
          ],
          groups: [
            {
              audio: [
                { s: "Moderator", t: "Willkommen zu unserer Diskussion. Immer mehr junge Menschen gehen nach dem Abitur für ein Jahr ins Ausland, als Au-pair, für Work and Travel oder für einen Freiwilligendienst. Lohnt sich das? Bei mir sind die Bildungsforscherin Doktor Katrin Roth und David Okafor, der nach der Schule ein Jahr in Neuseeland verbracht hat. Herr Okafor, warum sind Sie gegangen?" },
                { s: "David Okafor", t: "Ehrlich gesagt wusste ich nach dem Abitur nicht, was ich studieren soll. Ich wollte nicht einfach irgendetwas anfangen und dann abbrechen. In Neuseeland habe ich auf Farmen und in einem Hostel gearbeitet. Dabei habe ich gemerkt, dass mich Tourismus und Management interessieren. Das studiere ich jetzt." },
                { s: "Dr. Roth", t: "Das ist typisch. Unsere Studien zeigen, dass junge Leute nach einem Auslandsjahr ihr Studium seltener abbrechen. Sie wissen einfach besser, was sie wollen." },
                { s: "Moderator", t: "Es gibt aber auch Kritik. Manche sagen, das sei vor allem ein langer Urlaub für Kinder aus wohlhabenden Familien." },
                { s: "Dr. Roth", t: "Da ist etwas dran. Ein Jahr Work and Travel kostet schnell mehrere tausend Euro, bevor man überhaupt Geld verdient. Das können sich nicht alle leisten. Deshalb fordern wir mehr Stipendien, gerade für Jugendliche aus Familien mit wenig Geld." },
                { s: "David Okafor", t: "Ich musste vorher auch ein halbes Jahr im Supermarkt jobben, um das Flugticket zu bezahlen. Aber ich finde, das gehört dazu. Dabei habe ich gelernt, Verantwortung für meine Pläne zu übernehmen." },
                { s: "Moderator", t: "Und was sagen Arbeitgeber? Ist ein Auslandsjahr im Lebenslauf wirklich ein Vorteil?" },
                { s: "Dr. Roth", t: "Das kommt darauf an, was man daraus macht. Wer nur am Strand lag, kann damit kaum punkten. Wer aber erklären kann, was er gelernt hat, etwa Probleme selbstständig zu lösen, hat gute Chancen." },
                { s: "Moderator", t: "Herr Okafor, gab es auch schwierige Momente?" },
                { s: "David Okafor", t: "Natürlich. Am Anfang hatte ich großes Heimweh, und einmal habe ich drei Wochen lang keinen Job gefunden. Da wollte ich fast zurückfliegen. Aber gerade diese Zeit hat mich am meisten geprägt." },
                { s: "Moderator", t: "Frau Roth, Ihr Fazit?" },
                { s: "Dr. Roth", t: "Ein Auslandsjahr ist kein Muss. Man kann auch zu Hause viel lernen, zum Beispiel in einem Freiwilligen Sozialen Jahr. Wichtig ist, dass man die Zeit bewusst nutzt." },
              ],
              qs: [
                { t: "pick", q: "Viele junge Menschen gehen nach der Schule für ein Jahr ins Ausland.", a: "a", ex: true },
                { t: "pick", q: "Nach einem Auslandsjahr werden Studiengänge seltener abgebrochen.", a: "b" },
                { t: "pick", q: "Kritiker halten das Auslandsjahr für ein Privileg der Wohlhabenden.", a: "a" },
                { t: "pick", q: "Jugendliche aus ärmeren Familien sollten finanziell unterstützt werden.", a: "b" },
                { t: "pick", q: "Das Geldverdienen vor der Reise war eine wertvolle Erfahrung.", a: "c" },
                { t: "pick", q: "Ein Auslandsjahr hilft bei der Bewerbung nur, wenn man darüber reflektiert hat.", a: "b" },
                { t: "pick", q: "Eine Krise während des Aufenthalts war besonders prägend.", a: "c" },
              ],
            },
          ],
        },
        {
          kind: "obj",
          title: "Teil 4",
          task: "Sie hören einen kurzen Vortrag. Der Redner spricht über das Thema „Schlaf und Lernen“. Sie hören den Text zweimal. Wählen Sie bei jeder Aufgabe die richtige Lösung.",
          plays: 2,
          readSeconds: 90,
          groups: [
            {
              audio: [
                { s: "Redner", t: "Guten Tag, meine Damen und Herren. Ich freue mich, dass Sie so zahlreich zu unserer Ringvorlesung gekommen sind. Mein Thema heute: Warum wir schlafen müssen, um zu lernen." },
                { s: "Redner", t: "Lange Zeit dachte man, das Gehirn ruhe sich im Schlaf einfach aus. Heute wissen wir, dass das Gegenteil der Fall ist. Im Schlaf ist unser Gehirn sehr aktiv. Es sortiert die Informationen des Tages und entscheidet, was ins Langzeitgedächtnis kommt und was vergessen wird." },
                { s: "Redner", t: "Besonders wichtig ist dabei der Tiefschlaf, der vor allem in der ersten Hälfte der Nacht stattfindet. In unserem Labor haben wir Studierende abends eine Liste mit vierzig Wortpaaren lernen lassen. Die eine Gruppe durfte danach normal schlafen, die andere musste wach bleiben. Am nächsten Morgen erinnerte sich die Schlafgruppe an fast dreißig Prozent mehr Wortpaare. Und, das ist der interessante Teil, auch nach einer Woche war der Unterschied noch messbar, obwohl die zweite Gruppe in der Zwischenzeit wieder normal geschlafen hatte." },
                { s: "Redner", t: "Was bedeutet das für die Praxis? Erstens: Die berühmte Nacht vor der Prüfung durchzulernen, ist keine gute Idee. Man nimmt zwar viele Informationen auf, aber das Gehirn kann sie nicht mehr richtig speichern. Zweitens: Es lohnt sich, wichtigen Stoff am Abend zu wiederholen, kurz vor dem Schlafengehen. Drittens: Auch ein kurzer Mittagsschlaf von zwanzig Minuten verbessert nachweislich die Konzentration am Nachmittag. Länger sollte er allerdings nicht sein, sonst fühlt man sich danach wie gerädert." },
                { s: "Redner", t: "Ein großes Problem sehen wir bei Jugendlichen. Ihre innere Uhr verschiebt sich in der Pubertät nach hinten. Sie werden abends später müde. Das ist biologisch bedingt und keine Faulheit. Wenn die Schule dann um acht Uhr beginnt, schlafen viele Jugendliche dauerhaft zu wenig. Einige Schulen haben deshalb den Unterrichtsbeginn auf neun Uhr verschoben, mit vielversprechenden ersten Ergebnissen." },
                { s: "Redner", t: "Zum Schluss noch ein Wort zu Smartphones. Das blaue Licht der Bildschirme hemmt die Produktion des Schlafhormons Melatonin. Ich empfehle daher, eine Stunde vor dem Schlafengehen auf Bildschirme zu verzichten. Ich danke Ihnen für Ihre Aufmerksamkeit und freue mich auf Ihre Fragen." },
              ],
              qs: [
                { t: "mc", q: "Früher nahm man an, dass das Gehirn im Schlaf …", o: ["besonders aktiv ist.", "sich ausruht.", "neue Informationen aufnimmt."], a: 1 },
                { t: "mc", q: "Im Schlaf entscheidet das Gehirn, …", o: ["welche Informationen dauerhaft gespeichert werden.", "wie lange wir schlafen.", "wann wir aufwachen."], a: 0 },
                { t: "mc", q: "In dem Experiment …", o: ["schlief eine Gruppe nur wenige Stunden.", "lernten die Studierenden am Morgen.", "erinnerte sich die Schlafgruppe an mehr Wortpaare."], a: 2 },
                { t: "mc", q: "Eine Woche nach dem Experiment …", o: ["gab es keinen Unterschied mehr.", "war die Schlafgruppe immer noch im Vorteil.", "hatten alle die Wörter vergessen."], a: 1 },
                { t: "mc", q: "Der Redner rät, …", o: ["Wichtiges am Abend zu wiederholen.", "die Nacht vor der Prüfung durchzulernen.", "nur morgens zu lernen."], a: 0 },
                { t: "mc", q: "Ein Mittagsschlaf …", o: ["macht grundsätzlich müde.", "ist nur für Kinder sinnvoll.", "sollte nicht länger als etwa zwanzig Minuten dauern."], a: 2 },
                { t: "mc", q: "Jugendliche werden abends später müde, weil …", o: ["sie zu viel Zeit am Handy verbringen.", "sich ihre innere Uhr verändert.", "sie zu wenig Sport treiben."], a: 1 },
                { t: "mc", q: "Was empfiehlt der Redner zum Thema Smartphone?", o: ["Vor dem Schlafen eine Zeit lang auf Bildschirme verzichten.", "Das Handy nachts ausschalten.", "Eine Schlaf-App verwenden."], a: 0 },
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
          title: "Teil 1 – Forumsbeitrag",
          minutes: 50,
          words: 150,
          formal: false,
          task: "Sie schreiben einen Forumsbeitrag zum Thema „Arbeiten von zu Hause“. Denken Sie an eine Einleitung und einen Schluss. Bei der Bewertung wird darauf geachtet, wie genau die Inhaltspunkte bearbeitet sind, wie korrekt der Text ist und wie gut die Sätze und Abschnitte sprachlich miteinander verknüpft sind. Schreiben Sie circa 150 Wörter.",
          points: [
            "Äußern Sie Ihre Meinung dazu, ob Homeoffice für alle Berufe geeignet ist.",
            "Nennen Sie Gründe, warum viele Beschäftigte gern von zu Hause arbeiten.",
            "Nennen Sie andere Möglichkeiten, wie Arbeitgeber ihre Beschäftigten entlasten können.",
            "Nennen Sie Nachteile des Homeoffice für die Zusammenarbeit im Team.",
          ],
          checklist: ["Einleitung, die das Thema nennt", "Alle vier Punkte, jeweils mit Begründung/Beispiel", "Verknüpfungen: zum einen … zum anderen, außerdem, allerdings, dennoch", "Schluss mit klarer Position", "circa 150 Wörter"],
          model: `Das Thema Homeoffice wird seit einigen Jahren intensiv diskutiert, und ich möchte gern meine Sicht schildern.

Meiner Meinung nach ist Homeoffice keineswegs für alle Berufe geeignet. Eine Pflegekraft oder ein Koch kann die Arbeit nun einmal nicht vom Küchentisch aus erledigen. Für Büroangestellte sieht das jedoch anders aus.

Dass viele gern zu Hause arbeiten, hat gute Gründe: Zum einen fällt der oft lange Arbeitsweg weg, zum anderen lassen sich Beruf und Familie leichter vereinbaren. Arbeitgeber, die kein Homeoffice anbieten können, könnten ihre Beschäftigten trotzdem entlasten, etwa durch Gleitzeit, eine Vier-Tage-Woche oder einen Zuschuss zum Deutschlandticket.

Allerdings hat das Homeoffice auch Schattenseiten für die Zusammenarbeit. Spontane Absprachen fallen weg, und neue Kolleginnen und Kollegen lernen das Team kaum kennen.

Insgesamt halte ich eine Mischung aus Büro- und Heimarbeit für die beste Lösung – vorausgesetzt, beide Seiten vertrauen einander.`,
        },
        {
          kind: "write",
          title: "Teil 2 – Nachricht",
          minutes: 25,
          words: 100,
          formal: true,
          task: "Sie arbeiten in einem Unternehmen und haben den Auftrag, für Ihr Team einen Workshop zum Thema Zeitmanagement zu organisieren. Die Trainerin hat kurzfristig abgesagt. Schreiben Sie eine Nachricht an Ihren Vorgesetzten, Herrn Albrecht. Überlegen Sie sich eine passende Reihenfolge für die Inhaltspunkte. Vergessen Sie nicht Anrede und Gruß. Schreiben Sie circa 100 Wörter.",
          points: [
            "Entschuldigen Sie sich für die Verzögerung.",
            "Beschreiben Sie, was passiert ist.",
            "Zeigen Sie Verständnis für die Situation im Team.",
            "Machen Sie einen Vorschlag, wie es weitergehen kann.",
          ],
          checklist: ["Formelle Anrede und Gruß", "Alle vier Punkte in sinnvoller Reihenfolge", "Höfliche Formulierungen (Konjunktiv II)", "Konkreter Vorschlag", "circa 100 Wörter"],
          model: `Sehr geehrter Herr Albrecht,

leider muss ich Ihnen mitteilen, dass der Workshop zum Thema Zeitmanagement nicht wie geplant am 28. stattfinden kann. Die Trainerin hat gestern aus gesundheitlichen Gründen abgesagt. Ich bitte die Verzögerung zu entschuldigen.

Mir ist bewusst, dass das Team gerade jetzt, vor dem Projektabschluss, dringend Unterstützung bräuchte. Deshalb habe ich bereits mit zwei anderen Anbietern gesprochen. Einer von ihnen könnte den Workshop Mitte nächsten Monats zum gleichen Preis durchführen; alternativ wäre noch in diesem Monat ein Online-Training möglich.

Wären Sie damit einverstanden, wenn ich eine der beiden Optionen verbindlich buche?

Mit freundlichen Grüßen
Lan Nguyen`,
        },
      ],
    },
    {
      id: "sprechen",
      title: "Sprechen",
      minutes: 15,
      prep: 15,
      parts: [
        {
          kind: "speak",
          title: "Teil 1 – Vortrag halten",
          talk: 4,
          task: "Sie nehmen an einem Seminar teil und sollen dort einen kurzen Vortrag halten. Wählen Sie ein Thema (Thema 1 oder 2) aus. Ihre Gesprächspartner hören zu und stellen Ihnen anschließend Fragen. Strukturieren Sie Ihren Vortrag mit einer Einleitung, einem Hauptteil und einem Schluss. Sprechen Sie circa 4 Minuten.",
          topics: [
            { title: "Thema 1: Kostenloser Nahverkehr", points: ["Beschreiben Sie mehrere Möglichkeiten, den Nahverkehr attraktiver zu machen.", "Beschreiben Sie eine Möglichkeit genauer.", "Nennen Sie Vor- und Nachteile und bewerten Sie diese."] },
            { title: "Thema 2: Arbeiten im Rentenalter", points: ["Beschreiben Sie mehrere Gründe, warum Menschen im Alter weiterarbeiten.", "Beschreiben Sie einen Grund genauer.", "Nennen Sie Vor- und Nachteile und bewerten Sie diese."] },
          ],
          phrases: ["In meinem Vortrag geht es um …", "Zunächst möchte ich …, anschließend …", "Ein großer Vorteil wäre, dass …", "Kritiker wenden ein, dass …", "Wenn ich die Argumente abwäge, …", "Zusammenfassend lässt sich sagen, …"],
        },
        {
          kind: "speak",
          title: "Teil 2 – Diskussion führen",
          talk: 5,
          task: "Sie sind Teilnehmende eines Debattierclubs und diskutieren über die Frage: „Sollte Fliegen deutlich teurer werden?“\n• Tauschen Sie Ihren Standpunkt und Ihre Argumente aus.\n• Reagieren Sie auf die Argumente Ihres Gesprächspartners / Ihrer Gesprächspartnerin.\n• Fassen Sie am Ende zusammen: Sind Sie dafür oder dagegen?",
          points: ["Klimaschutz wird wirksamer?", "Urlaub nur noch für Reiche?", "Arbeitsplätze im Tourismus in Gefahr?", "Gibt es genug Alternativen?"],
          phrases: ["Ich bin der Ansicht, dass …", "Das sehe ich anders, denn …", "Da muss ich dir widersprechen.", "Da hast du nicht ganz unrecht, aber …", "Zusammenfassend bin ich dafür/dagegen, weil …"],
        },
      ],
    },
  ],
};

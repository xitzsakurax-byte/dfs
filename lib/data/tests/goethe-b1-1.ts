import type { Test } from "./types";

// Original practice set. Structure follows the official Goethe-Zertifikat B1 Modellsatz (Erwachsene):
// Lesen 65 min (6/6/7/7/4 items), Hören 40 min (10/5/7/8), Schreiben 60 min (80/80/40 words), Sprechen ~15 min.
// Texts are invented and deliberately a little harder than the model test (more paraphrase, more distractors).
export const goetheB1_1: Test = {
  id: "goethe-b1-1",
  level: "B1",
  title: "Modelltest 1",
  exam: "Goethe-Zertifikat B1",
  theme: "Ankommen, Arbeiten, Mitreden",
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
          task: "Lesen Sie den Text und die Aufgaben 1 bis 6 dazu. Wählen Sie: Sind die Aussagen Richtig oder Falsch?",
          groups: [
            {
              title: "linh-in-freiburg.blog",
              text: `Montag, 14. Oktober

Liebe Leserinnen und Leser,

heute vor genau einem Jahr bin ich in Freiburg angekommen – Zeit für eine kleine Bilanz. Ehrlich gesagt hätte ich nie gedacht, dass mir der Anfang so schwerfallen würde. In Hanoi hatte ich immerhin zwei Jahre lang einen Deutschkurs besucht und die B1-Prüfung mit „gut“ bestanden. Trotzdem verstand ich in den ersten Wochen kaum etwas, weil die Leute hier nicht nur schnell sprechen, sondern auch Wörter benutzen, die in keinem Lehrbuch stehen. Statt nachzufragen, habe ich oft einfach gelächelt – was manchmal zu ziemlich peinlichen Situationen geführt hat.

Am meisten Nerven hat mich die Wohnungssuche gekostet. Auf eine bezahlbare Einzimmerwohnung kamen oft fünfzig Bewerbungen, und ohne Arbeitsvertrag hatte ich praktisch keine Chance. Dass ich heute trotzdem ein schönes Zimmer habe, verdanke ich Mai, die mit mir im Sprachkurs saß: Ihre Tante vermietet in ihrer großen Wohnung ein Zimmer, und als die bisherige Mieterin auszog, durfte ich einziehen. Die Miete ist zwar nicht gerade niedrig, dafür brauche ich mit dem Rad nur zehn Minuten ins Zentrum.

Seit März mache ich eine Ausbildung zur Pflegefachfrau. Die Schichtarbeit, vor allem der Nachtdienst, ist anstrengender, als ich erwartet hatte. Aber das Team im Krankenhaus ist toll: Wenn ich einen Fachbegriff nicht kenne, nimmt sich immer jemand Zeit, ihn mir zu erklären. In der Berufsschule sieht es anders aus. Der Unterricht selbst ist kein Problem – Anatomie hatte ich schon in Vietnam –, aber für die schriftlichen Berichte brauche ich noch dreimal so lange wie meine deutschen Mitschülerinnen.

Und Heimweh? Natürlich vermisse ich meine Familie, vor allem das gemeinsame Essen am Sonntag. Kräuter wie zu Hause bekommt man hier nur in einem einzigen Laden in Bahnhofsnähe, und die Preise sind unverschämt. Deshalb habe ich angefangen, auf meinem Balkon Koriander und Minze anzupflanzen – mit gemischtem Erfolg.

Im November steht die B2-Prüfung an. Wer Tipps hat, wie man sich am besten vorbereitet: immer her damit!

Eure Linh`,
              qs: [
                { t: "tf", q: "Linh lebt seit zwölf Monaten in Freiburg.", a: true, ex: true },
                { t: "tf", q: "Linh hatte schon in Vietnam ein Sprachzertifikat erworben.", a: true },
                { t: "tf", q: "Wenn Linh am Anfang etwas nicht verstand, fragte sie sofort nach.", a: false },
                { t: "tf", q: "Linh hat ihr Zimmer über eine Wohnungsanzeige gefunden.", a: false },
                { t: "tf", q: "Das Zimmer ist günstig, liegt aber weit vom Zentrum entfernt.", a: false },
                { t: "tf", q: "Mit den Unterrichtsinhalten in der Berufsschule hat Linh kaum Schwierigkeiten.", a: true },
                { t: "tf", q: "Linh baut inzwischen selbst Kräuter an.", a: true },
              ],
            },
          ],
        },
        {
          kind: "obj",
          title: "Teil 2",
          minutes: 20,
          task: "Lesen Sie die Texte aus der Presse und die Aufgaben 7 bis 12 dazu. Wählen Sie bei jeder Aufgabe die richtige Lösung a, b oder c.",
          groups: [
            {
              title: "Bohrmaschine statt Bestseller",
              text: `Leipzig. Wer eine Bohrmaschine nur zweimal im Jahr braucht, muss sie nicht unbedingt besitzen. Diese Überzeugung steckt hinter der „Bibliothek der Dinge“, die die Leipziger Stadtbibliothek im Herbst eröffnet hat. Neben Büchern und Filmen können Mitglieder dort inzwischen mehr als 200 Gegenstände ausleihen – vom Akkuschrauber über die Nähmaschine bis zum Zelt. Eine zusätzliche Gebühr wird dafür nicht erhoben; es genügt der reguläre Bibliotheksausweis, der für Erwachsene 20 Euro im Jahr kostet und für Kinder kostenlos ist.

„Ursprünglich wollten wir nur testen, ob überhaupt Interesse besteht“, erzählt Projektleiterin Sabine Krüger. Inzwischen ist die Nachfrage so groß, dass für einige Geräte Wartelisten geführt werden. Besonders gefragt sind Werkzeuge, aber auch Spiele für Kindergeburtstage. Das Lastenfahrrad, das ein Fahrradgeschäft der Bibliothek geschenkt hat, ist bis zum Frühjahr ausgebucht.

Um die Gegenstände kümmern sich Ehrenamtliche, die jedes Stück nach der Rückgabe prüfen. Geht bei normaler Nutzung etwas kaputt, müssen die Nutzer nicht dafür aufkommen. Krüger betont allerdings, dass die Bibliothek keine Konkurrenz zum Handel sein wolle: „Wer etwas täglich braucht, soll es sich ruhig kaufen. Uns geht es um die Dinge, die sonst ungenutzt im Keller liegen.“

Ob das Angebot bleibt, hängt vom Geld ab. Bisher wird das Projekt von einer Stiftung finanziert – allerdings nur bis Ende nächsten Jahres.`,
              qs: [
                { t: "mc", q: "In der „Bibliothek der Dinge“ …", o: ["zahlt man für jedes ausgeliehene Gerät eine kleine Gebühr.", "reicht für das Ausleihen der normale Ausweis.", "dürfen nur Erwachsene Gegenstände ausleihen."], a: 1 },
                { t: "mc", q: "Das Lastenfahrrad …", o: ["hat die Bibliothek geschenkt bekommen.", "kann man im Fahrradgeschäft reservieren.", "kann man ab sofort wieder ausleihen."], a: 0 },
                { t: "mc", q: "Frau Krüger möchte, dass …", o: ["die Menschen grundsätzlich weniger kaufen.", "die Bibliothek die Geschäfte ersetzt.", "Dinge geteilt werden, die man selten braucht."], a: 2 },
              ],
            },
            {
              title: "Die Box kommt zurück",
              text: `Hamburg. Seit dem Sommer gibt es in der Kantine des Versicherungsunternehmens Nordschutz keine Einwegverpackungen mehr. Wer sein Essen lieber am Schreibtisch isst, bekommt es in einer Mehrwegbox, für die fünf Euro Pfand fällig werden. Die Idee kam nicht von der Geschäftsführung, sondern von einer Gruppe Auszubildender, die im Rahmen eines Projekts ausgerechnet hatte, wie viel Verpackungsmüll die Kantine produziert: rund 6.000 Plastikschalen pro Monat.

Die Umstellung verlief nicht ohne Probleme. „In den ersten Wochen standen die Leute Schlange, weil die Boxen nur an der Kantinenkasse zurückgegeben werden konnten“, erinnert sich Kantinenchef Murat Yılmaz. Erst als im ganzen Gebäude Rückgabeautomaten aufgestellt wurden, beruhigte sich die Lage. Einige Beschäftigte hätten anfangs auch befürchtet, die Boxen würden nicht gründlich genug gereinigt. „Dabei werden sie heißer gespült als normales Geschirr“, so Yılmaz.

Dass sich das Projekt auch finanziell lohnt, hatte niemand erwartet. Weil keine Verpackungen mehr gekauft werden müssen, spart die Kantine jedes Jahr mehrere tausend Euro. Das Geld soll aber nicht in die Firmenkasse fließen: Ab Januar will Nordschutz damit mehr Zutaten von Bauernhöfen aus der Region bezahlen.`,
              qs: [
                { t: "mc", q: "Die Mehrwegboxen gibt es, weil …", o: ["die Geschäftsführung Geld sparen wollte.", "junge Beschäftigte das Müllproblem sichtbar gemacht haben.", "ein neues Gesetz das verlangt."], a: 1 },
                { t: "mc", q: "Was war am Anfang ein Problem?", o: ["Die Boxen wurden nicht richtig sauber.", "Es gab nicht genug Boxen für alle.", "Man konnte die Boxen nur an einer Stelle abgeben."], a: 2 },
                { t: "mc", q: "Das gesparte Geld …", o: ["wird für Lebensmittel aus der Umgebung verwendet.", "bekommen die Beschäftigten als Prämie.", "wird in weitere Automaten investiert."], a: 0 },
              ],
            },
          ],
        },
        {
          kind: "obj",
          title: "Teil 3",
          minutes: 10,
          task: "Lesen Sie die Situationen 13 bis 19 und die Anzeigen A bis J aus verschiedenen deutschsprachigen Medien. Wählen Sie: Welche Anzeige passt zu welcher Situation? Sie können jede Anzeige nur einmal verwenden. Die Anzeige aus dem Beispiel können Sie nicht mehr verwenden. Für eine Situation gibt es keine passende Anzeige. In diesem Fall wählen Sie 0.",
          bankTitle: "Anzeigen",
          noneKey: "0",
          bank: [
            { k: "a", v: "Fotostudio Blende 8: „Erste Schritte“ – Wochenendkurs für alle, die noch nie bewusst fotografiert haben. Sa + So, 10–16 Uhr. Eine Smartphone-Kamera genügt." },
            { k: "b", v: "Ostsee, Warnemünde: gemütliche Ferienwohnung, 200 m zum Strand, für 2–4 Personen. Vierbeiner sind bei uns herzlich willkommen! Frei: 1.–21. August." },
            { k: "c", v: "Großer Fahrradflohmarkt im Hof der Martin-Luther-Schule – Samstag, 10–14 Uhr. Räder aus zweiter Hand ab 40 Euro, alle von unserer Werkstatt durchgesehen." },
            { k: "d", v: "„Digital fit mit 70 plus“: Schülerinnen und Schüler zeigen Seniorinnen und Senioren geduldig, wie Tablet und Smartphone funktionieren – vom Foto-Versand bis zur Videotelefonie. Dienstags im Café Miteinander, kostenlos." },
            { k: "e", v: "Business English für Berufstätige: montags und donnerstags 19:00–20:30 Uhr. Kleine Gruppen, Schwerpunkt Telefonate, E-Mails und Präsentationen. Sprachschule Lingua Plus." },
            { k: "f", v: "Zweirad Becker: Nur diese Woche 20 % auf alle neuen E-Bikes und Trekkingräder! Finanzierung möglich." },
            { k: "g", v: "Lesepatinnen und Lesepaten gesucht! Die Stadtbücherei sucht Menschen, die einmal pro Woche ehrenamtlich mit Grundschulkindern lesen. Eine Einführung erhalten Sie von uns." },
            { k: "h", v: "Fotoworkshop „Licht und Schatten“ – für Fortgeschrittene mit eigener Spiegelreflexkamera. Mittwochs 18–21 Uhr, Volkshochschule Mitte." },
            { k: "i", v: "Smartfix: Handy kaputt? Wir tauschen Display, Akku und Kamera in 30 Minuten. Ohne Termin, Bahnhofstraße 12." },
            { k: "j", v: "Englisch mit Musik und Bewegung: spielerischer Kurs für Kinder von 4 bis 8 Jahren, samstags vormittags im Familienzentrum." },
          ],
          groups: [
            {
              qs: [
                { t: "pick", q: "Ihre Nachbarin möchte, dass ihr sechsjähriger Sohn früh mit Englisch anfängt.", a: "j", ex: true },
                { t: "pick", q: "Ihre Freundin hat noch nie fotografiert und kann nur am Wochenende.", a: "a" },
                { t: "pick", q: "Ein Kollege möchte für ein Fahrrad wenig ausgeben und hat nichts gegen ein gebrauchtes.", a: "c" },
                { t: "pick", q: "Ihre Nachbarin (72) möchte ihre Enkel in Kanada auf dem Bildschirm sehen und mit ihnen sprechen.", a: "d" },
                { t: "pick", q: "Sie müssen im Job immer öfter auf Englisch telefonieren und haben nur nach Feierabend Zeit.", a: "e" },
                { t: "pick", q: "Ein Freund möchte im Sommer zwei Wochen an die Küste fahren – und sein Hund soll mit.", a: "b" },
                { t: "pick", q: "Ihre Schwester möchte sich in ihrer Freizeit für Kinder engagieren.", a: "g" },
                { t: "pick", q: "Ihre Waschmaschine verliert Wasser, und Sie suchen jemanden, der sie repariert.", a: "0" },
              ],
            },
          ],
        },
        {
          kind: "obj",
          title: "Teil 4",
          minutes: 15,
          task: "Lesen Sie die Texte 20 bis 26. Wählen Sie: Ist die Person für ein Autoverbot in der Innenstadt? In einer Zeitung lesen Sie Kommentare zu einem Artikel über autofreie Innenstädte.",
          groups: [
            {
              title: "Leserbriefe",
              qs: [
                { t: "tf", labels: ["Ja", "Nein"], ex: true, q: "Nora: Seit in unserer Straße keine Autos mehr fahren dürfen, spielen dort Kinder, und die Nachbarn sitzen abends draußen. So sollte es überall sein.", a: true },
                { t: "tf", labels: ["Ja", "Nein"], q: "Markus: Ich wohne an einer Hauptstraße und kann nachts kaum schlafen. Andere Städte haben längst gezeigt, dass Innenstädte ohne Autos funktionieren. Worauf warten wir eigentlich noch?", a: true },
                { t: "tf", labels: ["Ja", "Nein"], q: "Brigitte: Ich verstehe die Idee, aber ich kann nicht mehr gut laufen. Mit dem Bus brauche ich zum Arzt in der Innenstadt fast eine Stunde, mit dem Auto zehn Minuten. Solange es keine Lösung für Menschen wie mich gibt, halte ich nichts davon.", a: false },
                { t: "tf", labels: ["Ja", "Nein"], q: "Jonas: Die Gegner behaupten immer, die Geschäfte würden leiden. In Münster ist seit der Sperrung der Altstadt genau das Gegenteil passiert. Wenn ihr mich fragt: Andere Städte sollten endlich nachziehen.", a: true },
                { t: "tf", labels: ["Ja", "Nein"], q: "Petra: Ich habe ein kleines Modegeschäft in der Fußgängerzone. Viele Kundinnen kommen aus den Dörfern, wo abends kaum ein Bus fährt. Können sie nicht mehr mit dem Auto kommen, bestellen sie eben online.", a: false },
                { t: "tf", labels: ["Ja", "Nein"], q: "Ahmed: Am Anfang war ich skeptisch, weil ich beruflich viel unterwegs bin. Ein Jahr in Kopenhagen hat meine Meinung komplett geändert: weniger Autos, mehr Platz für Menschen. Davon profitieren alle.", a: true },
                { t: "tf", labels: ["Ja", "Nein"], q: "Sabine: Ein komplettes Verbot geht mir zu weit. Viel sinnvoller wäre es, das Parken in der Innenstadt deutlich teurer zu machen. Dann überlegt sich jeder, ob die Fahrt wirklich nötig ist.", a: false },
                { t: "tf", labels: ["Ja", "Nein"], q: "Lukas: Eigentlich finde ich es sympathisch, wenn Städte grüner werden. Aber ich bin Handwerker und muss mein Werkzeug transportieren – mit dem Lastenrad komme ich da nicht weit. Solange niemand an Leute wie mich denkt, kann ich so etwas nicht unterstützen.", a: false },
              ],
            },
          ],
        },
        {
          kind: "obj",
          title: "Teil 5",
          minutes: 10,
          task: "Lesen Sie die Aufgaben 27 bis 30 und den Text dazu. Wählen Sie bei jeder Aufgabe die richtige Lösung a, b oder c. Sie informieren sich über die Kursbedingungen eines Sprachenzentrums, bei dem Sie einen Kurs gebucht haben.",
          groups: [
            {
              title: "Sprachenzentrum am Markt – Teilnahmebedingungen",
              text: `Anmeldung: Sie können sich online oder persönlich im Sekretariat anmelden. Ihr Platz ist jedoch erst verbindlich reserviert, wenn die Kursgebühr auf unserem Konto eingegangen ist. Geben Sie bei der Überweisung bitte unbedingt Ihre Kursnummer an.

Rücktritt: Bis 14 Tage vor Kursbeginn ist ein Rücktritt kostenlos. Bei einem späteren Rücktritt behalten wir 30 % der Gebühr ein. Nach Kursbeginn ist eine Rückzahlung grundsätzlich nicht möglich. Im Krankheitsfall wenden Sie sich bitte an das Sekretariat; gegen Vorlage eines ärztlichen Attests bieten wir Ihnen einen Platz in einem späteren Kurs an.

Unterricht: Das Kursbuch ist nicht in der Gebühr enthalten. Eine Teilnahmebestätigung erhalten nur Personen, die an mindestens 80 % der Unterrichtsstunden teilgenommen haben. Fällt Unterricht wegen Krankheit der Lehrkraft aus, wird er nachgeholt.

Hausordnung: In den Kursräumen sind Speisen nicht gestattet; Getränke in verschließbaren Flaschen sind erlaubt. Die Cafeteria im Erdgeschoss ist von 8 bis 20 Uhr geöffnet. Fahrräder sind ausschließlich im Innenhof abzustellen.`,
              qs: [
                { t: "mc", q: "Ein Kursplatz ist sicher, sobald …", o: ["man sich online angemeldet hat.", "das Geld überwiesen und angekommen ist.", "man mit dem Sekretariat telefoniert hat."], a: 1 },
                { t: "mc", q: "Wer zehn Tage vor Kursbeginn absagt, …", o: ["bekommt das ganze Geld zurück.", "bekommt kein Geld zurück.", "bekommt einen Teil der Gebühr zurück."], a: 2 },
                { t: "mc", q: "Wer krank wird und ein Attest bringt, …", o: ["kann später an einem anderen Kurs teilnehmen.", "erhält die Kursgebühr zurück.", "bekommt trotzdem eine Teilnahmebestätigung."], a: 0 },
                { t: "mc", q: "In den Kursräumen …", o: ["darf man in den Pausen essen.", "darf man Fahrräder abstellen.", "darf man aus einer geschlossenen Flasche trinken."], a: 2 },
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
          task: "Sie hören nun fünf kurze Texte. Sie hören jeden Text zweimal. Zu jedem Text lösen Sie zwei Aufgaben. Wählen Sie bei jeder Aufgabe die richtige Lösung.",
          plays: 2,
          groups: [
            {
              title: "Text 1",
              audio: [{ s: "Sprecher", t: "Und nun die Verkehrsmeldungen. Auf der A5 zwischen Frankfurt-Süd und Darmstadt staut sich der Verkehr nach einem Unfall auf zehn Kilometern. Die Baustelle bei Langen, über die wir heute Morgen berichtet haben, ist dagegen inzwischen geräumt. Die Polizei empfiehlt, die Autobahn bei Langen zu verlassen und über die B3 zu fahren. In der Frankfurter Innenstadt bleibt die Mainzer Landstraße wegen Bauarbeiten noch bis Freitag gesperrt." }],
              qs: [
                { t: "tf", q: "Auf der A5 gibt es einen Stau wegen einer Baustelle.", a: false },
                { t: "mc", q: "Was empfiehlt die Polizei?", o: ["Bei Langen von der Autobahn abzufahren.", "Bis Freitag nicht in die Innenstadt zu fahren.", "In Darmstadt eine Pause zu machen."], a: 0 },
              ],
            },
            {
              title: "Text 2",
              audio: [{ s: "Praxis", t: "Guten Tag, hier ist die Praxis Doktor Hoffmann. Frau Nguyen, Sie haben am Donnerstag um neun Uhr einen Termin zur Blutabnahme. Leider ist Frau Doktor Hoffmann an diesem Tag auf einer Fortbildung. Wir hatten Ihnen gestern schon Freitag um halb neun angeboten, aber der Termin ist inzwischen leider vergeben. Möglich wäre noch Montag um elf Uhr. Bitte kommen Sie nüchtern, also ohne Frühstück. Rufen Sie uns bitte bis morgen Mittag zurück." }],
              qs: [
                { t: "tf", q: "Frau Nguyen soll vor der Blutabnahme nichts essen.", a: true },
                { t: "mc", q: "Welcher Termin ist noch frei?", o: ["Donnerstag um neun Uhr.", "Freitag um halb neun.", "Montag um elf Uhr."], a: 2 },
              ],
            },
            {
              title: "Text 3",
              audio: [{ s: "Durchsage", t: "Liebe Kundinnen und Kunden, nur heute erhalten Sie in unserer Sportabteilung im dritten Stock dreißig Prozent Rabatt auf alle Laufschuhe – ausgenommen sind lediglich Kinderschuhe. Probieren Sie Ihre neuen Schuhe direkt auf unserem Laufband neben der Kasse in der Sportabteilung aus. Die Kundentoiletten finden Sie übrigens im Erdgeschoss neben dem Haupteingang." }],
              qs: [
                { t: "tf", q: "Heute sind alle Laufschuhe im Angebot.", a: false },
                { t: "mc", q: "Wo kann man die Schuhe testen?", o: ["Im Erdgeschoss.", "Am Haupteingang.", "In der Sportabteilung."], a: 2 },
              ],
            },
            {
              title: "Text 4",
              audio: [{ s: "Clara", t: "Hi Tom, hier ist Clara. Du, wegen Samstag: Das Grillen im Park fällt leider ins Wasser, es soll den ganzen Tag regnen. Wir machen stattdessen einen Spieleabend bei mir. Getränke und Spiele haben wir mehr als genug, aber es wäre super, wenn du einen Salat mitbringen könntest. Ach ja, und wir fangen schon um sechs an, nicht wie geplant um sieben. Bis dann!" }],
              qs: [
                { t: "tf", q: "Das Treffen am Samstag findet trotz des Wetters statt.", a: true },
                { t: "mc", q: "Was soll Tom mitbringen?", o: ["Getränke.", "Etwas zu essen.", "Ein Spiel."], a: 1 },
              ],
            },
            {
              title: "Text 5",
              audio: [{ s: "Bahnhof", t: "Achtung an Gleis sieben: Der ICE 578 nach Hamburg-Altona, planmäßige Abfahrt 14 Uhr 12, hat heute circa 25 Minuten Verspätung. Grund ist eine Reparatur am Zug. Der Zug fährt wie geplant von Gleis sieben ab. Reisende nach Bremen nutzen bitte den Regional-Express um 14 Uhr 20 von Gleis neun. Wir bitten um Entschuldigung." }],
              qs: [
                { t: "tf", q: "Der ICE fährt heute von einem anderen Gleis ab.", a: false },
                { t: "mc", q: "Was sollen Reisende nach Bremen tun?", o: ["Einen anderen Zug nehmen.", "25 Minuten auf den ICE warten.", "Zu Gleis sieben gehen."], a: 0 },
              ],
            },
          ],
        },
        {
          kind: "obj",
          title: "Teil 2",
          task: "Sie hören nun einen Text. Sie hören den Text einmal. Dazu lösen Sie fünf Aufgaben. Wählen Sie bei jeder Aufgabe die richtige Lösung a, b oder c. Sie nehmen an einer Führung durch ein Schokoladenmuseum teil.",
          plays: 1,
          readSeconds: 60,
          groups: [
            {
              audio: [
                { s: "Führerin", t: "Herzlich willkommen im Schokoladenmuseum! Mein Name ist Anja Berger, und ich begleite Sie heute durch unser Haus. Die Führung dauert ungefähr eine Stunde. Bitte bleiben Sie in der Gruppe, denn in der Produktion ist es ziemlich laut, und man verliert sich schnell. Fotografieren dürfen Sie überall, nur bitte ohne Blitz." },
                { s: "Führerin", t: "Normalerweise beginnen wir mit der Geschichte des Kakaos, aber weil im ersten Stock gerade renoviert wird, machen wir es heute umgekehrt: Wir starten in der gläsernen Fabrik im Erdgeschoss. Dort sehen Sie, wie aus Kakaobohnen Schokolade wird. Am Schokoladenbrunnen bekommt jeder eine Waffel mit warmer Schokolade, und zwar kostenlos." },
                { s: "Führerin", t: "Danach geht es in die Ausstellung zur Geschichte. Dort erfahren Sie, dass die Menschen in Mittelamerika schon vor über dreitausend Jahren Kakao getrunken haben, allerdings nicht süß, sondern scharf, mit Chili." },
                { s: "Führerin", t: "Zum Schluss kommen wir in unseren Museumsshop. Mit Ihrer Eintrittskarte bekommen Sie dort heute zehn Prozent Rabatt. Wer möchte, kann im Anschluss an einem Workshop teilnehmen und eigene Pralinen herstellen. Der Workshop dauert 45 Minuten und kostet fünfzehn Euro, die Anmeldung ist an der Kasse möglich, solange noch Plätze frei sind. Gibt es noch Fragen? Nein? Dann los!" },
              ],
              qs: [
                { t: "mc", q: "Während der Führung …", o: ["darf man nicht fotografieren.", "soll man zusammenbleiben.", "muss man leise sein."], a: 1 },
                { t: "mc", q: "Die Führung beginnt heute …", o: ["mit der Geschichte des Kakaos.", "in der Produktion.", "im ersten Stock."], a: 1 },
                { t: "mc", q: "Am Schokoladenbrunnen …", o: ["kann man Schokolade kaufen.", "bekommt man etwas umsonst.", "darf man nicht fotografieren."], a: 1 },
                { t: "mc", q: "Im Museumsshop …", o: ["zahlen Besucher mit Eintrittskarte weniger.", "kann man nur bar bezahlen.", "gibt es heute kostenlose Pralinen."], a: 0 },
                { t: "mc", q: "Für den Workshop …", o: ["muss man sich vorher online anmelden.", "braucht man 15 Minuten.", "kann man sich an der Kasse anmelden."], a: 2 },
              ],
            },
          ],
        },
        {
          kind: "obj",
          title: "Teil 3",
          task: "Sie hören nun ein Gespräch. Sie hören das Gespräch einmal. Dazu lösen Sie sieben Aufgaben. Wählen Sie: Sind die Aussagen Richtig oder Falsch? Sie sind an einer Bushaltestelle und hören, wie sich Mia und Daniel unterhalten.",
          plays: 1,
          readSeconds: 60,
          groups: [
            {
              audio: [
                { s: "Mia", t: "Daniel! Hallo! Dich habe ich ja ewig nicht gesehen. Wie geht's dir?" },
                { s: "Daniel", t: "Hallo Mia! Gut, danke. Viel Stress im Moment, aber positiver Stress. Ich habe nämlich eine neue Stelle." },
                { s: "Mia", t: "Wirklich? Erzähl! Bist du nicht mehr bei der Bank?" },
                { s: "Daniel", t: "Nein, seit dem ersten Oktober arbeite ich bei einer kleinen Softwarefirma. Ich kümmere mich dort um die Kundenbetreuung." },
                { s: "Mia", t: "Und, gefällt es dir?" },
                { s: "Daniel", t: "Sehr. Das Team ist jung, und ich darf zwei Tage pro Woche von zu Hause arbeiten. Nur der Weg ist leider weit. Die Firma ist in Mannheim. Ich bin am Anfang mit dem Auto gefahren, aber im Stau war ich manchmal zwei Stunden unterwegs. Jetzt nehme ich den Zug, das dauert gut eine Stunde." },
                { s: "Mia", t: "Oh, das ist anstrengend. Willst du dann nicht umziehen?" },
                { s: "Daniel", t: "Doch, eigentlich schon. Meine Freundin und ich suchen gerade in Mannheim. Letzte Woche haben wir eine Wohnung besichtigt, die war toll, aber da waren noch dreißig andere Leute. Wir haben noch nichts gehört." },
                { s: "Mia", t: "Das kenne ich. Als ich nach Heidelberg gezogen bin, habe ich fast ein halbes Jahr gesucht. Am Ende hat mir mein Chef geholfen, er kannte den Vermieter." },
                { s: "Daniel", t: "So viel Glück haben wir leider nicht. Aber Moment, du arbeitest doch bei der Stadtverwaltung, oder? Weißt du, ob es in Mannheim Wohnungen von der Stadt gibt?" },
                { s: "Mia", t: "Ja, es gibt eine städtische Wohnungsgesellschaft. Die Wartelisten sind lang, aber anmelden lohnt sich trotzdem. Ich schicke dir heute Abend den Link." },
                { s: "Daniel", t: "Super, danke! Und bei dir? Alles gut?" },
                { s: "Mia", t: "Ja, alles bestens. Ich mache übrigens gerade einen Spanischkurs. Mein Mann und ich fahren im Frühling für drei Wochen nach Valencia, und ich will mich wenigstens im Restaurant verständigen können." },
                { s: "Daniel", t: "Wie schön! Oh, da kommt mein Bus. Wir telefonieren, ja?" },
                { s: "Mia", t: "Machen wir! Tschüss!" },
              ],
              qs: [
                { t: "tf", q: "Daniel hat seinen Arbeitgeber gewechselt.", a: true },
                { t: "tf", q: "Daniel muss jeden Tag ins Büro fahren.", a: false },
                { t: "tf", q: "Daniel fährt zurzeit mit dem Auto zur Arbeit.", a: false },
                { t: "tf", q: "Daniel und seine Freundin haben schon eine Zusage für eine Wohnung.", a: false },
                { t: "tf", q: "Mia hat ihre Wohnung mithilfe ihres Chefs gefunden.", a: true },
                { t: "tf", q: "Mia will Daniel Informationen über städtische Wohnungen geben.", a: true },
                { t: "tf", q: "Mia lernt Spanisch für ihren Beruf.", a: false },
              ],
            },
          ],
        },
        {
          kind: "obj",
          title: "Teil 4",
          task: "Sie hören nun eine Diskussion. Sie hören die Diskussion zweimal. Dazu lösen Sie acht Aufgaben. Ordnen Sie die Aussagen zu: Wer sagt was? Die Moderatorin der Radiosendung „Thema am Abend“ diskutiert mit Herrn Lange, Schulleiter, und Frau Demir, Mutter von zwei Kindern, zum Thema „Sollen Smartphones an Schulen verboten werden?“.",
          plays: 2,
          readSeconds: 60,
          bankTitle: "Wer sagt was?", reuse: true,
          bank: [
            { k: "a", v: "Moderatorin" },
            { k: "b", v: "Herr Lange" },
            { k: "c", v: "Frau Demir" },
          ],
          groups: [
            {
              audio: [
                { s: "Moderatorin", t: "Herzlich willkommen zu „Thema am Abend“. Heute geht es um die Frage: Sollen Smartphones an Schulen verboten werden? Bei mir im Studio sind Herr Lange, Schulleiter eines Gymnasiums in Bremen, und Frau Demir, Mutter von zwei Kindern. Herr Lange, an Ihrer Schule gibt es seit einem Jahr ein Handyverbot. Warum?" },
                { s: "Herr Lange", t: "Wir haben gemerkt, dass sich die Schülerinnen und Schüler in den Pausen kaum noch unterhalten haben. Alle saßen nur mit dem Handy in der Ecke. Seit dem Verbot spielen die Kinder wieder Tischtennis oder reden miteinander. Das hat mich ehrlich gesagt selbst überrascht." },
                { s: "Moderatorin", t: "Frau Demir, sind Sie auch für ein Verbot?" },
                { s: "Frau Demir", t: "Nicht ganz. Ich verstehe das Problem, aber ein komplettes Verbot finde ich übertrieben. Meine Tochter fährt jeden Tag vierzig Minuten mit dem Bus zur Schule. Ich möchte, dass ich sie unterwegs erreichen kann, wenn etwas passiert." },
                { s: "Herr Lange", t: "Das ist bei uns auch möglich. Die Handys sind ja nicht ganz verboten. Sie müssen nur während des Unterrichts und in den Pausen im Schließfach bleiben. Nach der Schule bekommen die Kinder sie zurück." },
                { s: "Moderatorin", t: "Wie haben die Jugendlichen auf die Regel reagiert?" },
                { s: "Herr Lange", t: "Am Anfang gab es Widerstand. Inzwischen sagen aber viele, dass sie sich im Unterricht besser konzentrieren können." },
                { s: "Frau Demir", t: "Das glaube ich gern. Trotzdem: Die Schule soll die Kinder doch auf das Leben vorbereiten, und zum Leben gehört nun mal das Smartphone. Ich wünsche mir, dass die Schulen zeigen, wie man es sinnvoll benutzt, zum Beispiel für Recherchen." },
                { s: "Moderatorin", t: "Ein interessanter Punkt. In einer aktuellen Studie heißt es allerdings, dass viele Lehrkräfte selbst nicht genug über digitale Medien wissen." },
                { s: "Herr Lange", t: "Da haben Sie leider recht. Wir brauchen mehr Fortbildungen für Lehrer. Bei uns gibt es jetzt einmal im Monat einen Workshop zu digitalen Medien." },
                { s: "Frau Demir", t: "Und die Eltern müssen auch etwas tun. Viele Kinder haben schon mit acht Jahren ein eigenes Handy, und niemand kontrolliert, was sie damit machen. Das kann die Schule allein nicht lösen." },
                { s: "Moderatorin", t: "Zum Schluss: Was würden Sie anderen Schulen raten?" },
                { s: "Herr Lange", t: "Ausprobieren! Am besten mit einer Testphase von einem halben Jahr. Danach weiß man, ob es funktioniert." },
                { s: "Frau Demir", t: "Ja, und dabei sollten die Schüler mitreden dürfen. Dann halten sie sich auch eher an die Regeln." },
                { s: "Moderatorin", t: "Vielen Dank Ihnen beiden." },
              ],
              qs: [
                { t: "pick", q: "An einer Schule gibt es seit einem Jahr ein Handyverbot.", a: "a", ex: true },
                { t: "pick", q: "Die Schüler sprechen in den Pausen wieder mehr miteinander.", a: "b" },
                { t: "pick", q: "Eltern sollten ihre Kinder auf dem Schulweg erreichen können.", a: "c" },
                { t: "pick", q: "Die Smartphones werden während der Schulzeit weggeschlossen.", a: "b" },
                { t: "pick", q: "Die Schule sollte den sinnvollen Umgang mit Smartphones unterrichten.", a: "c" },
                { t: "pick", q: "Laut einer Untersuchung wissen Lehrkräfte zu wenig über digitale Medien.", a: "a" },
                { t: "pick", q: "Lehrkräfte brauchen mehr Weiterbildung.", a: "b" },
                { t: "pick", q: "Auch die Familien sind für die Handynutzung der Kinder verantwortlich.", a: "c" },
                { t: "pick", q: "Schulen sollten eine neue Regel zuerst eine Zeit lang testen.", a: "b" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "schreiben",
      title: "Schreiben",
      minutes: 60,
      parts: [
        {
          kind: "write",
          title: "Aufgabe 1",
          minutes: 20,
          words: 80,
          formal: false,
          task: "Sie sind letzte Woche in eine neue Wohnung umgezogen. Ein Freund / Eine Freundin von Ihnen konnte beim Umzug nicht helfen, weil er/sie auf einer Dienstreise war.",
          points: ["Beschreiben Sie: Wie war der Umzug?", "Begründen Sie: Was gefällt Ihnen an der neuen Wohnung besonders und warum?", "Machen Sie einen Vorschlag für ein Treffen."],
          checklist: ["Anrede (Liebe/Lieber …,) und Einleitung", "Alle drei Punkte in dieser Reihenfolge", "Verknüpfungen: weil, deshalb, außerdem, trotzdem …", "Schluss und Gruß (Liebe Grüße …)", "circa 80 Wörter"],
          model: `Lieber Paul,

wie war deine Dienstreise? Ich wollte dir unbedingt erzählen, dass wir endlich umgezogen sind! Der Umzug am Samstag war ziemlich anstrengend, weil es den ganzen Tag geregnet hat und der Aufzug kaputt war. Zum Glück haben mir zwei Kollegen geholfen.

Am besten gefällt mir der große Balkon, denn dort kann ich im Sommer frühstücken. Außerdem brauche ich jetzt nur zehn Minuten zur Arbeit.

Hast du nächsten Sonntag Zeit? Dann koche ich für dich und zeige dir alles.

Liebe Grüße
Minh`,
        },
        {
          kind: "write",
          title: "Aufgabe 2",
          minutes: 25,
          words: 80,
          formal: false,
          task: "Sie haben im Fernsehen eine Diskussionssendung zum Thema „Sollen Kinder im Haushalt mithelfen?“ gesehen. Im Online-Gästebuch der Sendung finden Sie folgende Meinung:\n\n„Kinder haben heute schon genug Stress in der Schule. Sie sollen in ihrer Freizeit spielen und sich erholen. Den Haushalt sollen die Eltern machen – dafür sind sie ja erwachsen.“ – Jana\n\nSchreiben Sie nun Ihre Meinung zum Thema (circa 80 Wörter).",
          checklist: ["Bezug auf Janas Meinung", "Eigene Meinung mit Begründung", "Beispiel oder eigene Erfahrung", "Abschluss", "circa 80 Wörter"],
          model: `Ich verstehe Jana, aber ich sehe das anders. Natürlich haben Kinder heute viel Stress, und sie brauchen Zeit zum Spielen. Kleine Aufgaben im Haushalt schaden ihnen aber nicht – im Gegenteil: Wer schon als Kind den Tisch deckt oder sein Zimmer aufräumt, lernt, Verantwortung zu übernehmen. Später, wenn man allein wohnt, ist das sehr nützlich. Bei uns zu Hause musste jeder etwas tun, und ich fand das fair. Wichtig ist nur, dass die Aufgaben zum Alter passen.`,
        },
        {
          kind: "write",
          title: "Aufgabe 3",
          minutes: 15,
          words: 40,
          formal: true,
          task: "Ihre Kursleiterin, Frau Schröder, hat Sie zu einem Gespräch über Ihre Prüfungsvorbereitung eingeladen. Zu dem Termin können Sie aber nicht kommen.\n\nSchreiben Sie an Frau Schröder. Entschuldigen Sie sich höflich und berichten Sie, warum Sie nicht kommen können. Schreiben Sie eine E-Mail (circa 40 Wörter). Vergessen Sie nicht die Anrede und den Gruß am Schluss.",
          checklist: ["Formelle Anrede (Sehr geehrte Frau Schröder,)", "Höfliche Entschuldigung", "Grund", "Vorschlag für einen neuen Termin", "Mit freundlichen Grüßen"],
          model: `Sehr geehrte Frau Schröder,

leider kann ich am Donnerstag nicht zu unserem Gespräch kommen, weil ich an diesem Tag kurzfristig im Betrieb arbeiten muss. Das tut mir sehr leid. Hätten Sie vielleicht nächste Woche einen anderen Termin für mich?

Mit freundlichen Grüßen
Minh Tran`,
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
          title: "Teil 1 – Gemeinsam etwas planen",
          talk: 3,
          task: "Eine Teilnehmerin aus Ihrem Deutschkurs hat die B1-Prüfung bestanden und zieht in zwei Wochen in eine andere Stadt. Sie möchten mit der ganzen Gruppe ein Abschiedsfest für sie organisieren. Sprechen Sie über die Punkte unten, machen Sie Vorschläge und reagieren Sie auf die Vorschläge Ihres Gesprächspartners / Ihrer Gesprächspartnerin. Planen und entscheiden Sie gemeinsam, was Sie tun möchten.",
          points: ["Wann feiern? (Tag, Uhrzeit?)", "Wo feiern?", "Was essen und trinken?", "Welches Geschenk?", "…"],
          phrases: ["Wie wäre es, wenn wir …?", "Was hältst du davon, …?", "Das ist eine gute Idee, aber …", "Lass uns doch lieber …", "Einverstanden. Dann machen wir es so."],
          model: "A: Wann sollen wir feiern? Wie wäre es mit Freitagabend?\nB: Freitag ist gut, aber ich arbeite bis 18 Uhr. Können wir um 19 Uhr anfangen?\nA: Klar. Und wo? Bei mir ist es leider zu klein für zwölf Leute.\nB: Was hältst du davon, wenn wir im Kursraum feiern? Ich frage die Kursleiterin.\nA: Gute Idee! Dann bringt jeder etwas zu essen mit …",
        },
        {
          kind: "speak",
          title: "Teil 2 – Ein Thema präsentieren",
          talk: 3,
          task: "Wählen Sie ein Thema (Thema 1 oder Thema 2) aus. Sie sollen Ihren Zuhörern ein aktuelles Thema präsentieren. Dazu finden Sie hier fünf Folien. Folgen Sie den Anweisungen und notieren Sie Ihre Ideen.",
          topics: [
            {
              title: "Thema 1: Online einkaufen – praktisch oder problematisch?",
              points: [
                "Stellen Sie Ihr Thema vor. Erklären Sie den Inhalt und die Struktur Ihrer Präsentation.",
                "Berichten Sie von Ihrer Situation oder einem Erlebnis im Zusammenhang mit dem Thema.",
                "Berichten Sie von der Situation in Ihrem Heimatland und geben Sie Beispiele.",
                "Nennen Sie die Vor- und Nachteile und sagen Sie dazu Ihre Meinung. Geben Sie auch Beispiele.",
                "Beenden Sie Ihre Präsentation und bedanken Sie sich bei den Zuhörern.",
              ],
            },
            {
              title: "Thema 2: Haustiere in der Stadt – ja oder nein?",
              points: [
                "Stellen Sie Ihr Thema vor. Erklären Sie den Inhalt und die Struktur Ihrer Präsentation.",
                "Berichten Sie von Ihrer Situation oder einem Erlebnis im Zusammenhang mit dem Thema.",
                "Berichten Sie von der Situation in Ihrem Heimatland und geben Sie Beispiele.",
                "Nennen Sie die Vor- und Nachteile und sagen Sie dazu Ihre Meinung. Geben Sie auch Beispiele.",
                "Beenden Sie Ihre Präsentation und bedanken Sie sich bei den Zuhörern.",
              ],
            },
          ],
          phrases: ["Ich möchte euch heute das Thema … vorstellen.", "Zuerst spreche ich über …, danach …", "Ich persönlich habe die Erfahrung gemacht, dass …", "In meinem Heimatland ist es so, dass …", "Ein Vorteil ist …, ein Nachteil ist …", "Danke fürs Zuhören! Habt ihr Fragen?"],
        },
        {
          kind: "speak",
          title: "Teil 3 – Über ein Thema sprechen",
          talk: 2,
          task: "Nach Ihrer Präsentation: Reagieren Sie auf die Rückmeldung und auf Fragen der Prüfer/-innen und Ihres Gesprächspartners / Ihrer Gesprächspartnerin.\n\nNach der Präsentation Ihres Partners / Ihrer Partnerin: a) Geben Sie eine Rückmeldung zur Präsentation (z. B. wie Ihnen die Präsentation gefallen hat, was für Sie neu oder besonders interessant war usw.). b) Stellen Sie auch eine Frage zur Präsentation.",
          phrases: ["Vielen Dank für deine Präsentation, sie war sehr interessant.", "Besonders interessant fand ich, dass …", "Neu war für mich, dass …", "Ich habe noch eine Frage: …", "Wie ist das eigentlich bei dir?"],
        },
      ],
    },
  ],
};

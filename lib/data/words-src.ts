// Vocabulary source. One entry per line: German | English | example sentence.
// "# B1" / "# B2" / "# C1" set the level for the following lines.
// Curated for Goethe/telc B1–C1 exam topics. Original example sentences.

export const DECK_SRC: { id: string; title: string; de: string; blurb: string; typing: boolean; src: string }[] = [
  {
    id: "arbeit",
    title: "Work & careers",
    de: "Arbeit & Beruf",
    blurb: "Applications, contracts, the workplace — in every exam at every level.",
    typing: true,
    src: `
# B1
die Bewerbung, -en | application | Ich habe meine Bewerbung gestern per E-Mail abgeschickt.
sich bewerben (um + A) | to apply (for) | Sie bewirbt sich um eine Stelle als Krankenpflegerin.
der Lebenslauf, ¨-e | CV, résumé | In Ihrem Lebenslauf fehlen noch die Sprachkenntnisse.
das Vorstellungsgespräch, -e | job interview | Das Vorstellungsgespräch findet am Montag um zehn Uhr statt.
die Stelle, -n | position, job | Die Stelle ist ab sofort zu besetzen.
der Arbeitgeber, - | employer | Mein Arbeitgeber bezahlt mir einen Deutschkurs.
der Arbeitnehmer, - | employee | Arbeitnehmer haben Anspruch auf bezahlten Urlaub.
das Gehalt, ¨-er | salary | Über das Gehalt sprechen wir im zweiten Gespräch.
die Überstunde, -n | hour of overtime | Diese Woche habe ich fünf Überstunden gemacht.
kündigen | to quit, to give notice | Er hat gekündigt, weil er eine bessere Stelle gefunden hat.
die Erfahrung, -en | experience | Haben Sie schon Erfahrung im Verkauf?
die Abteilung, -en | department | Sie arbeitet in der Abteilung für Kundenservice.
die Ausbildung, -en | vocational training | Nach der Ausbildung möchte er im Betrieb bleiben.
der Betrieb, -e | company, firm | Der Betrieb hat vierzig Mitarbeiter.
die Teilzeit | part-time | Seit der Geburt ihres Sohnes arbeitet sie in Teilzeit.
der Vertrag, ¨-e | contract | Der Vertrag ist zunächst auf ein Jahr befristet.
die Besprechung, -en | meeting | Die Besprechung wurde auf Donnerstag verschoben.
verantwortlich (für + A) | responsible (for) | Wer ist für die Planung verantwortlich?
# B2
die Fachkraft, ¨-e | skilled worker | In der Pflege fehlen dringend Fachkräfte.
die Weiterbildung, -en | further training | Die Firma unterstützt Weiterbildungen finanziell.
die Arbeitsbedingungen (Pl.) | working conditions | Die Arbeitsbedingungen haben sich deutlich verbessert.
der Arbeitsplatz, ¨-e | workplace; job | Durch die Automatisierung gehen Arbeitsplätze verloren.
die Gleitzeit | flexitime | Dank Gleitzeit kann ich meine Kinder morgens zur Schule bringen.
die Probezeit, -en | probationary period | In der Probezeit gilt eine kürzere Kündigungsfrist.
die Kündigungsfrist, -en | notice period | Die Kündigungsfrist beträgt drei Monate.
befristet | fixed-term | Leider habe ich nur einen befristeten Vertrag.
der Fachkräftemangel | skills shortage | Der Fachkräftemangel betrifft vor allem das Handwerk.
die Belastung, -en | strain, burden | Die psychische Belastung im Job nimmt zu.
die Anforderung, -en | requirement | Die Anforderungen an Berufseinsteiger sind gestiegen.
die Gewerkschaft, -en | trade union | Die Gewerkschaft fordert höhere Löhne.
der Streik, -s | strike | Wegen des Streiks fielen viele Züge aus.
selbstständig | self-employed; independent | Seit zwei Jahren ist sie als Grafikerin selbstständig.
die Beförderung, -en | promotion | Nach drei Jahren bekam er endlich eine Beförderung.
die Vereinbarkeit von Familie und Beruf | work–family balance | Flexible Arbeitszeiten erleichtern die Vereinbarkeit von Familie und Beruf.
# C1
die Erwerbstätigkeit | gainful employment | Die Erwerbstätigkeit von Frauen ist stark gestiegen.
die Leistungsbereitschaft | willingness to perform | Arbeitgeber erwarten eine hohe Leistungsbereitschaft.
der Quereinsteiger, - | career changer | Viele Schulen stellen inzwischen Quereinsteiger ein.
die Fluktuation | staff turnover | Eine hohe Fluktuation kostet Unternehmen viel Geld.
das Arbeitsverhältnis, -se | employment relationship | Das Arbeitsverhältnis endet zum 31. März.
die Vergütung, -en | remuneration | Die Vergütung richtet sich nach dem Tarifvertrag.
der Tarifvertrag, ¨-e | collective wage agreement | Der neue Tarifvertrag gilt ab Januar.
die Eigenverantwortung | personal responsibility | Im Homeoffice ist viel Eigenverantwortung gefragt.
ausschlaggebend | decisive | Ausschlaggebend für meine Entscheidung war das gute Betriebsklima.
das Betriebsklima | working atmosphere | Ein gutes Betriebsklima steigert die Motivation.
die Entlassung, -en | dismissal, layoff | Das Unternehmen kündigte Entlassungen an.
die Wertschätzung | appreciation | Viele Beschäftigte wünschen sich mehr Wertschätzung.
der/die Vorgesetzte, -n | superior, boss | Das muss ich zuerst mit meiner Vorgesetzten klären.
`,
  },
  {
    id: "bildung",
    title: "Education & study",
    de: "Bildung & Studium",
    blurb: "School, university, courses and qualifications.",
    typing: true,
    src: `
# B1
das Zeugnis, -se | report; certificate | Im Zeugnis hatte sie in Mathematik eine Eins.
bestehen | to pass (an exam) | Ich hoffe, dass ich die Prüfung beim ersten Mal bestehe.
durchfallen (fällt durch) | to fail (an exam) | Er ist leider in der mündlichen Prüfung durchgefallen.
sich anmelden (für + A) | to register (for) | Bis Freitag muss man sich für den Kurs anmelden.
die Gebühr, -en | fee | Die Gebühr für die Prüfung beträgt 250 Euro.
der Abschluss, ¨-e | qualification, degree | Mit diesem Abschluss kann man an einer Universität studieren.
das Fach, ¨-er | subject | Mein Lieblingsfach war immer Geschichte.
die Note, -n | grade, mark | Für die Bewerbung sind gute Noten wichtig.
die Volkshochschule, -n | adult education centre | An der Volkshochschule gibt es günstige Sprachkurse.
sich vorbereiten (auf + A) | to prepare (for) | Ich bereite mich gerade auf die B1-Prüfung vor.
wiederholen | to repeat; to revise | Vor der Prüfung wiederhole ich die wichtigsten Regeln.
der Studienplatz, ¨-e | university place | Sie hat einen Studienplatz in Leipzig bekommen.
das Stipendium, Stipendien | scholarship | Ohne Stipendium könnte ich mir das Studium nicht leisten.
der Teilnehmer, - | participant | Der Kurs hat maximal zwölf Teilnehmer.
# B2
die Hochschule, -n | university, college | Die Hochschule bietet viele englischsprachige Studiengänge an.
der Studiengang, ¨-e | degree programme | Der Studiengang Informatik ist zulassungsbeschränkt.
die Zulassung, -en | admission | Für die Zulassung braucht man ein C1-Zertifikat.
die Vorlesung, -en | lecture | Die Vorlesung über Statistik ist immer überfüllt.
das Referat, -e | (academic) presentation | Mein Referat dauert etwa zwanzig Minuten.
die Hausarbeit, -en | term paper | Die Hausarbeit muss bis Ende März abgegeben werden.
die Chancengleichheit | equal opportunities | Das Bildungssystem soll Chancengleichheit gewährleisten.
das lebenslange Lernen | lifelong learning | Lebenslanges Lernen wird in der Arbeitswelt immer wichtiger.
der Leistungsdruck | pressure to perform | Viele Schüler leiden unter starkem Leistungsdruck.
die Kenntnisse (Pl.) | knowledge, skills | Gute EDV-Kenntnisse werden vorausgesetzt.
das Fernstudium | distance learning | Neben dem Job macht er ein Fernstudium.
die Abschlussarbeit, -en | final thesis | Für ihre Abschlussarbeit hat sie Interviews geführt.
voraussetzen | to require, presuppose | Für diesen Kurs werden Grundkenntnisse vorausgesetzt.
# C1
die Bildungsgerechtigkeit | educational equity | Der Bildungserfolg hängt stark vom Elternhaus ab – ein Problem der Bildungsgerechtigkeit.
die Wissensvermittlung | transfer of knowledge | Digitale Medien verändern die Wissensvermittlung grundlegend.
die Lehrkraft, ¨-e | teacher (formal) | An vielen Schulen fehlen qualifizierte Lehrkräfte.
die Fördermaßnahme, -n | support measure | Gezielte Fördermaßnahmen helfen leistungsschwachen Schülern.
nachholen | to make up, catch up on | Sie möchte das Abitur an der Abendschule nachholen.
die Anerkennung | recognition | Die Anerkennung ausländischer Abschlüsse dauert oft Monate.
die Eigeninitiative | initiative (one's own) | Im Studium wird viel Eigeninitiative erwartet.
die Promotion, -en | doctorate | Nach der Promotion möchte sie in die Forschung gehen.
fundiert | well-founded, sound | Das Studium vermittelt fundierte Fachkenntnisse.
praxisnah | practice-oriented | Duale Studiengänge gelten als besonders praxisnah.
der Bildungsweg, -e | educational path | Er hat seinen Abschluss auf dem zweiten Bildungsweg gemacht.
`,
  },
  {
    id: "gesundheit",
    title: "Health",
    de: "Gesundheit & Ernährung",
    blurb: "Doctors, insurance, prevention, healthy living.",
    typing: true,
    src: `
# B1
die Krankenkasse, -n | health insurance fund | Die Krankenkasse übernimmt die Kosten für die Behandlung.
die Behandlung, -en | treatment | Die Behandlung dauert etwa sechs Wochen.
das Rezept, -e | prescription | Für dieses Medikament brauchen Sie ein Rezept.
die Sprechstunde, -n | surgery hours | Die Sprechstunde ist dienstags bis 18 Uhr.
krankgeschrieben | on sick leave | Ich bin noch bis Freitag krankgeschrieben.
die Verletzung, -en | injury | Die Verletzung am Knie ist zum Glück nicht schlimm.
sich erholen | to recover | Im Urlaub konnte ich mich endlich richtig erholen.
die Ernährung | diet, nutrition | Eine gesunde Ernährung ist die Basis für ein langes Leben.
vorbeugen (+ D) | to prevent | Regelmäßige Bewegung beugt vielen Krankheiten vor.
die Vorsorgeuntersuchung, -en | medical check-up | Ab 35 zahlt die Kasse eine Vorsorgeuntersuchung.
die Notaufnahme, -n | emergency department | Nachts musste er in die Notaufnahme.
schädlich | harmful | Rauchen ist schädlich für fast alle Organe.
das Gewicht | weight | Er möchte sein Gewicht reduzieren.
# B2
die Lebenserwartung | life expectancy | Die Lebenserwartung ist in den letzten fünfzig Jahren gestiegen.
die Nebenwirkung, -en | side effect | Lesen Sie die Packungsbeilage wegen möglicher Nebenwirkungen.
chronisch | chronic | Immer mehr Menschen leiden an chronischen Krankheiten.
die Pflege | care, nursing | Die Pflege älterer Angehöriger belastet viele Familien.
der Bewegungsmangel | lack of exercise | Bewegungsmangel gilt als Risikofaktor für Herzkrankheiten.
übergewichtig | overweight | Fast ein Viertel der Kinder ist übergewichtig.
die Sucht, ¨-e | addiction | Die Sucht nach dem Smartphone wird oft unterschätzt.
das Immunsystem | immune system | Ausreichend Schlaf stärkt das Immunsystem.
die Beschwerden (Pl.) | symptoms, complaints | Seit wann haben Sie diese Beschwerden?
der Eingriff, -e | (medical) procedure | Der Eingriff dauert nur eine halbe Stunde.
der Wirkstoff, -e | active ingredient | Der Wirkstoff wirkt schmerzlindernd.
ausgewogen | balanced | Eine ausgewogene Ernährung enthält viel Gemüse.
# C1
das Gesundheitswesen | healthcare system | Das Gesundheitswesen steht durch den demografischen Wandel unter Druck.
der Pflegenotstand | care crisis | Der Pflegenotstand zeigt sich vor allem in Altenheimen.
psychosomatisch | psychosomatic | Viele Rückenschmerzen sind psychosomatisch bedingt.
die Prävention | prevention | Die Krankenkassen investieren mehr in Prävention.
die Diagnose, -n | diagnosis | Eine frühe Diagnose erhöht die Heilungschancen.
heilbar | curable | Viele Krebsarten sind heilbar, wenn sie früh erkannt werden.
die Selbstoptimierung | self-optimisation | Fitness-Apps fördern den Trend zur Selbstoptimierung.
gesundheitsbewusst | health-conscious | Jüngere Menschen ernähren sich oft gesundheitsbewusster.
die Zuzahlung, -en | co-payment | Für Medikamente fällt eine Zuzahlung von bis zu zehn Euro an.
beeinträchtigen | to impair | Schlafmangel beeinträchtigt die Konzentration.
die Überforderung | being overwhelmed | Dauerhafte Überforderung kann zu einem Burnout führen.
`,
  },
  {
    id: "umwelt",
    title: "Environment",
    de: "Umwelt & Klima",
    blurb: "Climate, energy, waste and sustainability — a favourite essay topic.",
    typing: true,
    src: `
# B1
der Umweltschutz | environmental protection | Jeder kann etwas für den Umweltschutz tun.
der Müll | rubbish, waste | Wir trennen den Müll in vier Tonnen.
trennen | to separate | Plastik und Papier muss man trennen.
verschmutzen | to pollute | Fabriken haben den Fluss früher stark verschmutzt.
die Verpackung, -en | packaging | Im Unverpackt-Laden gibt es keine Verpackungen.
das Abgas, -e | exhaust fumes | Die Abgase der Autos belasten die Luft.
öffentliche Verkehrsmittel (Pl.) | public transport | Ich fahre meistens mit öffentlichen Verkehrsmitteln.
umweltfreundlich | eco-friendly | Das Fahrrad ist das umweltfreundlichste Verkehrsmittel.
die Hitze | heat | Im Sommer war die Hitze kaum auszuhalten.
der Strom | electricity | Unser Strom kommt zum Teil aus Solaranlagen.
die Energie, -n | energy | Mit LED-Lampen spart man Energie.
# B2
der Klimawandel | climate change | Der Klimawandel führt zu mehr extremen Wetterereignissen.
die Erderwärmung | global warming | Ziel ist es, die Erderwärmung auf 1,5 Grad zu begrenzen.
erneuerbare Energien (Pl.) | renewable energy | Der Anteil erneuerbarer Energien wächst jedes Jahr.
der Treibhauseffekt | greenhouse effect | Kohlendioxid verstärkt den Treibhauseffekt.
der Ausstoß | emissions, output | Der CO₂-Ausstoß soll bis 2030 deutlich sinken.
die Nachhaltigkeit | sustainability | Viele Kunden achten beim Einkaufen auf Nachhaltigkeit.
nachhaltig | sustainable | Nachhaltig produzierte Kleidung ist oft teurer.
der Verbrauch | consumption | Der Verbrauch von Plastik ist weiterhin hoch.
die Ressource, -n | resource | Wir müssen sparsamer mit unseren Ressourcen umgehen.
die Dürre, -n | drought | Die Dürre hat zu großen Ernteausfällen geführt.
das Artensterben | extinction of species | Das Artensterben schreitet schneller voran als erwartet.
der ökologische Fußabdruck | ecological footprint | Flugreisen vergrößern den ökologischen Fußabdruck enorm.
die Wegwerfgesellschaft | throwaway society | In der Wegwerfgesellschaft werden Geräte selten repariert.
# C1
die Energiewende | energy transition | Die Energiewende erfordert einen massiven Ausbau der Stromnetze.
klimaneutral | climate-neutral | Die Stadt will bis 2035 klimaneutral werden.
eindämmen | to curb, contain | Die Regierung will den Flächenverbrauch eindämmen.
der Verzicht (auf + A) | doing without | Klimaschutz bedeutet nicht unbedingt Verzicht auf Lebensqualität.
die Biodiversität | biodiversity | Monokulturen gefährden die Biodiversität.
der Raubbau | overexploitation | Der Raubbau an den Regenwäldern hat dramatische Folgen.
die Kreislaufwirtschaft | circular economy | In einer Kreislaufwirtschaft werden Rohstoffe immer wieder genutzt.
unumkehrbar | irreversible | Manche Schäden an Ökosystemen sind unumkehrbar.
die Folgekosten (Pl.) | follow-up costs | Die Folgekosten des Klimawandels werden oft unterschätzt.
die CO₂-Bepreisung | carbon pricing | Die CO₂-Bepreisung soll klimafreundliches Verhalten belohnen.
der Rohstoff, -e | raw material | Seltene Rohstoffe werden für Akkus gebraucht.
`,
  },
  {
    id: "medien",
    title: "Media & digital life",
    de: "Medien & Digitales",
    blurb: "News, social media, data protection, AI.",
    typing: true,
    src: `
# B1
die Nachricht, -en | news; message | Ich lese die Nachrichten morgens auf dem Handy.
die Sendung, -en | programme, broadcast | Die Sendung läuft jeden Sonntag um 20 Uhr.
herunterladen (lädt herunter) | to download | Die App kann man kostenlos herunterladen.
das Passwort, ¨-er | password | Ändern Sie Ihr Passwort regelmäßig.
die Werbung | advertising | Im Internet sieht man ständig Werbung.
speichern | to save | Vergiss nicht, das Dokument zu speichern.
der Bildschirm, -e | screen | Zu viel Zeit vor dem Bildschirm ist für Kinder ungesund.
die Zeitschrift, -en | magazine | Sie hat eine Zeitschrift für Gartenfreunde abonniert.
das soziale Netzwerk, -e | social network | In sozialen Netzwerken teilen viele Menschen private Fotos.
die Daten (Pl.) | data | Die App sammelt viele persönliche Daten.
erreichbar | reachable | Im Urlaub bin ich nicht erreichbar.
der Empfang | reception (signal) | Im Keller habe ich keinen Empfang.
# B2
der Datenschutz | data protection | Beim Datenschutz gibt es in der EU strenge Regeln.
die Privatsphäre | privacy | Viele Nutzer geben ihre Privatsphäre leichtfertig auf.
die Falschmeldung, -en | false report | Falschmeldungen verbreiten sich im Netz rasend schnell.
die Quelle, -n | source | Überprüfen Sie immer die Quelle einer Information.
zuverlässig | reliable | Ist diese Quelle zuverlässig?
der Nutzer, - | user | Die Plattform hat weltweit über eine Milliarde Nutzer.
die Bildschirmzeit | screen time | Eltern sollten die Bildschirmzeit ihrer Kinder begrenzen.
die Medienkompetenz | media literacy | Schulen sollen die Medienkompetenz der Schüler fördern.
der Algorithmus, Algorithmen | algorithm | Algorithmen bestimmen, welche Beiträge wir sehen.
der Beitrag, ¨-e | post; contribution | Ihr Beitrag im Forum wurde oft geteilt.
die Berichterstattung | (news) coverage | Die Berichterstattung über den Prozess war sehr einseitig.
die künstliche Intelligenz | artificial intelligence | Künstliche Intelligenz verändert viele Berufe.
# C1
die Meinungsbildung | opinion forming | Soziale Medien spielen bei der Meinungsbildung eine zentrale Rolle.
die Filterblase, -n | filter bubble | In der Filterblase begegnen uns kaum noch andere Meinungen.
die Desinformation | disinformation | Desinformation gilt als Gefahr für die Demokratie.
die Glaubwürdigkeit | credibility | Durch den Skandal hat die Zeitung an Glaubwürdigkeit verloren.
die Überwachung | surveillance | Kritiker warnen vor einer flächendeckenden Überwachung.
manipulieren | to manipulate | Bilder lassen sich heute leicht manipulieren.
die Reichweite, -n | reach | Influencer mit großer Reichweite verdienen viel Geld mit Werbung.
der öffentlich-rechtliche Rundfunk | public broadcasting | Der öffentlich-rechtliche Rundfunk wird über Beiträge finanziert.
die Cyberkriminalität | cybercrime | Die Schäden durch Cyberkriminalität steigen jährlich.
die Pressefreiheit | freedom of the press | Die Pressefreiheit ist ein Grundpfeiler der Demokratie.
die Digitalisierung | digitalisation | Die Digitalisierung der Verwaltung kommt nur langsam voran.
`,
  },
  {
    id: "gesellschaft",
    title: "Society & politics",
    de: "Gesellschaft & Politik",
    blurb: "Government, migration, equality, civic life.",
    typing: true,
    src: `
# B1
die Regierung, -en | government | Die Regierung plant eine Reform der Rente.
die Wahl, -en | election | Die nächste Wahl findet im Herbst statt.
der Bürger, - | citizen | Die Bürger können ihre Meinung bei einer Versammlung äußern.
die Gesellschaft, -en | society | Unsere Gesellschaft wird immer älter.
das Gesetz, -e | law | Das neue Gesetz gilt ab Januar.
die Behörde, -n | public authority | Für den Antrag müssen Sie zur zuständigen Behörde gehen.
der Antrag, ¨-e | application (form) | Der Antrag auf Elterngeld ist ziemlich kompliziert.
beantragen | to apply for | Ich habe mein Visum rechtzeitig beantragt.
die Staatsangehörigkeit, -en | citizenship | Sie hat die deutsche Staatsangehörigkeit beantragt.
ehrenamtlich | voluntary | Er arbeitet ehrenamtlich bei der Tafel.
die Rente, -n | pension | Mit 67 geht man in Deutschland in Rente.
demonstrieren (für/gegen + A) | to demonstrate (for/against) | Tausende demonstrierten für mehr Klimaschutz.
das Recht, -e | right | Jeder hat das Recht auf freie Meinungsäußerung.
# B2
die Integration | integration | Sprachkurse sind ein wichtiger Teil der Integration.
die Zuwanderung | immigration | Ohne Zuwanderung würde die Bevölkerung schrumpfen.
die Gleichberechtigung | equal rights | Bei der Gleichberechtigung gibt es noch viel zu tun.
das Vorurteil, -e | prejudice | Begegnungen helfen, Vorurteile abzubauen.
der demografische Wandel | demographic change | Der demografische Wandel belastet die Rentenversicherung.
die Armut | poverty | Kinderarmut ist auch in reichen Ländern ein Thema.
die Ungleichheit, -en | inequality | Die soziale Ungleichheit hat zugenommen.
die Partei, -en | (political) party | Die Partei hat bei der Wahl Stimmen verloren.
die Abstimmung, -en | vote | Die Abstimmung im Bundestag ist für Donnerstag geplant.
sich engagieren (für + A) | to get involved (in) | Sie engagiert sich seit Jahren für Geflüchtete.
die Bevölkerung | population | Ein Drittel der Bevölkerung lebt auf dem Land.
die Mehrheit, -en | majority | Die Mehrheit der Befragten ist für ein Tempolimit.
# C1
der gesellschaftliche Zusammenhalt | social cohesion | Vereine stärken den gesellschaftlichen Zusammenhalt.
die Teilhabe | participation | Barrierefreiheit ermöglicht die Teilhabe aller Menschen.
die Benachteiligung, -en | disadvantage, discrimination | Die Benachteiligung von Frauen bei der Bezahlung ist belegt.
die Polarisierung | polarisation | Viele sprechen von einer zunehmenden Polarisierung der Gesellschaft.
verankert sein (in + D) | to be enshrined (in) | Die Würde des Menschen ist im Grundgesetz verankert.
die Bürokratie | bureaucracy | Viele Unternehmen klagen über zu viel Bürokratie.
die Einbürgerung, -en | naturalisation | Für die Einbürgerung braucht man in der Regel B1-Kenntnisse.
die Altersarmut | old-age poverty | Wer lange in Teilzeit arbeitet, ist stärker von Altersarmut bedroht.
der Wohlstand | prosperity | Der Wohlstand ist ungleich verteilt.
die Bürgerbeteiligung | citizen participation | Bei Bauprojekten wird mehr Bürgerbeteiligung gefordert.
umstritten | controversial | Das Gesetz ist politisch umstritten.
`,
  },
  {
    id: "wohnen",
    title: "Housing & everyday life",
    de: "Wohnen & Alltag",
    blurb: "Renting, neighbours, moving — classic letter and complaint topics.",
    typing: true,
    src: `
# B1
die Miete, -n | rent | Die Miete ist im letzten Jahr gestiegen.
die Nebenkosten (Pl.) | utility costs | Die Nebenkosten betragen 200 Euro im Monat.
der Vermieter, - | landlord | Der Vermieter will die Heizung erst im Herbst reparieren.
der Mieter, - | tenant | Die Mieter beschweren sich über den Lärm.
die Kaution, -en | deposit | Die Kaution beträgt drei Monatsmieten.
umziehen (zieht um) | to move (house) | Nächsten Monat ziehen wir nach Hamburg um.
der Umzug, ¨-e | move (house) | Für den Umzug haben wir einen Transporter gemietet.
die Hausordnung, -en | house rules | Laut Hausordnung ist ab 22 Uhr Ruhe.
der Lärm | noise | Der Lärm von der Baustelle stört mich sehr.
sich beschweren (über + A) | to complain (about) | Die Nachbarn haben sich über die laute Musik beschwert.
die Wohngemeinschaft, -en | flat share | In der Wohngemeinschaft teilen wir uns Küche und Bad.
der Hausmeister, - | caretaker | Der Hausmeister kümmert sich um kleine Reparaturen.
der Schaden, ¨- | damage | Den Schaden muss die Versicherung bezahlen.
ausziehen (zieht aus) | to move out | Mein Mitbewohner zieht Ende Mai aus.
# B2
der Mietvertrag, ¨-e | tenancy agreement | Im Mietvertrag steht, dass Haustiere erlaubt sind.
die Wohnungsnot | housing shortage | In Großstädten herrscht große Wohnungsnot.
bezahlbar | affordable | Bezahlbarer Wohnraum ist knapp.
der Wohnraum | housing, living space | Die Stadt will mehr Wohnraum für Familien schaffen.
die Mieterhöhung, -en | rent increase | Gegen die Mieterhöhung haben wir Widerspruch eingelegt.
die Nachbarschaft | neighbourhood | In unserer Nachbarschaft hilft man sich gegenseitig.
der Mangel, ¨- | defect; shortage | Der Mangel muss dem Vermieter sofort gemeldet werden.
die Eigentumswohnung, -en | owner-occupied flat | Eine Eigentumswohnung können sich viele nicht leisten.
die Lage | location | Die Wohnung ist klein, aber die Lage ist perfekt.
pendeln | to commute | Jeden Tag pendle ich vierzig Kilometer zur Arbeit.
der Pendler, - | commuter | Pendler verbringen oft viele Stunden pro Woche im Zug.
das Mehrgenerationenhaus, ¨-er | multigenerational house | Im Mehrgenerationenhaus wohnen Jung und Alt zusammen.
# C1
die Gentrifizierung | gentrification | Durch die Gentrifizierung werden alteingesessene Bewohner verdrängt.
verdrängen | to displace, push out | Hohe Mieten verdrängen Familien an den Stadtrand.
die Mietpreisbremse | rent cap | Die Mietpreisbremse soll den Anstieg der Mieten begrenzen.
die Zersiedelung | urban sprawl | Die Zersiedelung der Landschaft schreitet voran.
der Leerstand | vacancy | In manchen Dörfern gibt es viel Leerstand.
die Stadtplanung | urban planning | Moderne Stadtplanung setzt auf kurze Wege.
die Infrastruktur, -en | infrastructure | Die Infrastruktur auf dem Land muss verbessert werden.
das Eigenheim, -e | one's own home | Der Traum vom Eigenheim ist für viele unerreichbar geworden.
die Barrierefreiheit | accessibility | Neubauten müssen Barrierefreiheit gewährleisten.
der Ballungsraum, ¨-e | conurbation | In den Ballungsräumen steigen die Preise am stärksten.
`,
  },
  {
    id: "wirtschaft",
    title: "Economy, money & shopping",
    de: "Wirtschaft & Konsum",
    blurb: "Banking, complaints about products, the economy.",
    typing: true,
    src: `
# B1
das Konto, Konten | (bank) account | Ich möchte ein Konto eröffnen.
überweisen | to transfer (money) | Ich überweise Ihnen den Betrag morgen.
die Rechnung, -en | bill, invoice | Die Rechnung ist innerhalb von 14 Tagen zu bezahlen.
der Betrag, ¨-e | amount | Der Betrag wurde von meinem Konto abgebucht.
der Rabatt, -e | discount | Studierende bekommen zehn Prozent Rabatt.
umtauschen | to exchange (goods) | Kann ich die Jacke umtauschen, wenn sie nicht passt?
die Quittung, -en | receipt | Ohne Quittung können wir die Ware nicht zurücknehmen.
die Garantie, -n | guarantee, warranty | Auf das Gerät gibt es zwei Jahre Garantie.
reklamieren | to make a complaint (about a product) | Ich möchte diesen defekten Toaster reklamieren.
die Lieferung, -en | delivery | Die Lieferung kommt voraussichtlich am Dienstag.
sich leisten (+ D) | to afford | Ein neues Auto kann ich mir im Moment nicht leisten.
der Kunde, -n | customer | Der Kunde ist mit dem Service sehr zufrieden.
# B2
die Wirtschaft | economy | Die Wirtschaft ist im letzten Quartal gewachsen.
das Unternehmen, - | company | Das Unternehmen beschäftigt 2.000 Mitarbeiter.
der Umsatz, ¨-e | turnover, sales | Der Umsatz ist um fünf Prozent gestiegen.
der Gewinn, -e | profit | Trotz der Krise machte die Firma Gewinn.
der Verlust, -e | loss | Das Geschäft schreibt seit Monaten Verluste.
die Inflation | inflation | Die Inflation macht das Leben teurer.
der Verbraucher, - | consumer | Verbraucher sollten Preise online vergleichen.
die Nachfrage | demand | Die Nachfrage nach Elektroautos ist gestiegen.
der Kredit, -e | loan | Für die Wohnung mussten wir einen Kredit aufnehmen.
die Steuer, -n | tax | Die Steuern werden automatisch vom Gehalt abgezogen.
der Wettbewerb | competition | Der Wettbewerb im Onlinehandel ist hart.
die Ware, -n | goods | Die Ware wird innerhalb von 24 Stunden verschickt.
erstatten | to refund | Wir erstatten Ihnen den vollen Kaufpreis.
# C1
die Konjunktur | economic activity | Die Konjunktur hat sich abgeschwächt.
die Globalisierung | globalisation | Die Globalisierung hat Gewinner und Verlierer.
die Lieferkette, -n | supply chain | Die Pandemie hat die Schwächen globaler Lieferketten gezeigt.
die Kaufkraft | purchasing power | Die Inflation verringert die Kaufkraft der Haushalte.
der Mittelstand | small and mid-sized businesses | Der Mittelstand gilt als Rückgrat der deutschen Wirtschaft.
das Konsumverhalten | consumer behaviour | Das Konsumverhalten hat sich durch soziale Medien verändert.
die Rezession, -en | recession | Ökonomen rechnen mit einer leichten Rezession.
das Wachstum | growth | Unbegrenztes Wachstum ist auf einem begrenzten Planeten nicht möglich.
die Subvention, -en | subsidy | Subventionen für fossile Energien sollen abgebaut werden.
rentabel | profitable | Kleine Bauernhöfe sind oft nicht mehr rentabel.
der Wirtschaftszweig, -e | sector of industry | Der Tourismus ist ein wichtiger Wirtschaftszweig.
`,
  },
  {
    id: "wissenschaft",
    title: "Science & technology",
    de: "Wissenschaft & Technik",
    blurb: "Studies, research, progress — core C1 reading vocabulary.",
    typing: true,
    src: `
# B1
die Erfindung, -en | invention | Das Telefon war eine wichtige Erfindung.
erfinden | to invent | Wer hat eigentlich das Fahrrad erfunden?
das Gerät, -e | device, appliance | Das Gerät lässt sich per App steuern.
die Anleitung, -en | instructions | Lesen Sie zuerst die Anleitung.
der Versuch, -e | attempt; experiment | Im Chemieunterricht machen wir heute einen Versuch.
die Entwicklung, -en | development | Die Entwicklung neuer Medikamente dauert viele Jahre.
das Ergebnis, -se | result | Die Ergebnisse der Studie sind überraschend.
die Untersuchung, -en | examination; study | Die Untersuchung hat gezeigt, dass Lärm krank macht.
die Umfrage, -n | survey | Laut einer Umfrage nutzen 80 Prozent täglich das Internet.
# B2
die Forschung, -en | research | Die Forschung zu Alzheimer macht Fortschritte.
der Fortschritt, -e | progress | Der technische Fortschritt erleichtert unseren Alltag.
die Studie, -n | study | Eine neue Studie belegt den Zusammenhang zwischen Schlaf und Gedächtnis.
belegen | to prove, document | Die Zahlen belegen einen klaren Trend.
die Erkenntnis, -se | finding, insight | Neue Erkenntnisse der Hirnforschung zeigen, wie wir lernen.
die Auswirkung, -en (auf + A) | effect (on) | Welche Auswirkungen hat das Smartphone auf unser Sozialleben?
die Ursache, -n | cause | Die Ursache des Problems ist noch unklar.
die Herausforderung, -en | challenge | Die Digitalisierung ist eine große Herausforderung für Schulen.
die Anwendung, -en | application, use | Die Anwendung der neuen Software ist einfach.
erforschen | to research, explore | Wissenschaftler erforschen die Ursachen der Krankheit.
der Zusammenhang, ¨-e | connection, context | Ein Zusammenhang zwischen den beiden Faktoren ist nicht nachgewiesen.
# C1
bahnbrechend | groundbreaking | Die Entdeckung des Penicillins war bahnbrechend.
die Hypothese, -n | hypothesis | Die Hypothese konnte nicht bestätigt werden.
widerlegen | to refute | Die Studie widerlegt eine verbreitete Annahme.
die Annahme, -n | assumption | Diese Annahme ist wissenschaftlich nicht haltbar.
die Stichprobe, -n | sample | Die Stichprobe umfasste 2.000 Personen.
repräsentativ | representative | Die Umfrage ist nicht repräsentativ.
die Fachzeitschrift, -en | academic journal | Der Artikel erschien in einer renommierten Fachzeitschrift.
ethisch vertretbar | ethically justifiable | Ist es ethisch vertretbar, das Erbgut von Embryonen zu verändern?
der Durchbruch, ¨-e | breakthrough | Den Forschern gelang ein Durchbruch bei der Batterietechnik.
die Grundlagenforschung | basic research | Ohne Grundlagenforschung gäbe es keine neuen Technologien.
nachweisen (weist nach) | to prove, detect | Die Wirkung des Mittels konnte nicht nachgewiesen werden.
`,
  },
  {
    id: "kultur",
    title: "Culture, leisure & travel",
    de: "Kultur, Freizeit & Reisen",
    blurb: "Events, bookings, tourism, traditions.",
    typing: true,
    src: `
# B1
die Ausstellung, -en | exhibition | Die Ausstellung im Stadtmuseum ist noch bis Juni zu sehen.
die Veranstaltung, -en | event | Die Veranstaltung findet bei jedem Wetter statt.
stattfinden (findet statt) | to take place | Das Konzert findet im Stadtpark statt.
ausverkauft | sold out | Das Konzert war schon nach einer Stunde ausverkauft.
der Verein, -e | club, association | Er spielt seit zehn Jahren in einem Fußballverein.
die Unterkunft, ¨-e | accommodation | Wir suchen eine günstige Unterkunft in der Nähe des Bahnhofs.
stornieren | to cancel (a booking) | Die Reise kann bis 14 Tage vorher kostenlos storniert werden.
die Verspätung, -en | delay | Der Zug hat zwanzig Minuten Verspätung.
der Anschluss, ¨-e | connection (train) | Wegen der Verspätung habe ich meinen Anschluss verpasst.
die Sehenswürdigkeit, -en | sight, attraction | Die Stadt hat viele Sehenswürdigkeiten.
die Führung, -en | guided tour | Die Führung durch das Schloss dauert eine Stunde.
sich entspannen | to relax | Beim Wandern kann ich mich am besten entspannen.
# B2
der Massentourismus | mass tourism | Venedig leidet unter dem Massentourismus.
die Pauschalreise, -n | package holiday | Pauschalreisen sind oft günstiger als individuell geplante Reisen.
die Aufführung, -en | performance | Die Aufführung wurde vom Publikum begeistert aufgenommen.
die Inszenierung, -en | staging, production | Die neue Inszenierung des Klassikers ist sehr modern.
die Tradition, -en | tradition | Weihnachtsmärkte haben in Deutschland eine lange Tradition.
der Brauch, ¨-e | custom | Zu Ostern gibt es viele regionale Bräuche.
das Reiseziel, -e | destination | Spanien ist eines der beliebtesten Reiseziele der Deutschen.
die Erholung | rest, relaxation | Nach dem Projekt brauche ich dringend Erholung.
der Zeitvertreib | pastime | Lesen ist mein liebster Zeitvertreib.
die Kulturszene | cultural scene | Leipzig hat eine lebendige Kulturszene.
# C1
das kulturelle Erbe | cultural heritage | Das kulturelle Erbe muss für kommende Generationen bewahrt werden.
bewahren | to preserve | Das Archiv bewahrt viele historische Dokumente.
die Kulturförderung | arts funding | Die Kulturförderung wurde wegen der Sparmaßnahmen gekürzt.
der sanfte Tourismus | sustainable tourism | Sanfter Tourismus schont Natur und Bevölkerung.
die Vielfalt | diversity, variety | Die kulturelle Vielfalt der Stadt ist beeindruckend.
der Freizeitstress | leisure stress | Wer jedes Wochenende verplant, leidet schnell unter Freizeitstress.
die Muße | leisure, idleness | Für echte Muße bleibt im Alltag kaum Zeit.
das Fernweh | wanderlust | Im Winter packt mich immer das Fernweh.
die Gastfreundschaft | hospitality | Die Gastfreundschaft der Menschen hat uns beeindruckt.
der/die Einheimische, -n | local (person) | Die Einheimischen empfahlen uns ein kleines Restaurant.
`,
  },
  {
    id: "beziehungen",
    title: "Relationships & feelings",
    de: "Beziehungen & Gefühle",
    blurb: "Family, friendship, conflict — speaking-test favourites.",
    typing: true,
    src: `
# B1
sich verlieben (in + A) | to fall in love (with) | Sie hat sich im Urlaub verliebt.
sich trennen (von + D) | to separate (from) | Nach zehn Jahren haben sie sich getrennt.
sich streiten (über + A) | to argue (about) | Meine Geschwister streiten sich ständig über Kleinigkeiten.
sich versöhnen | to make up | Nach dem Streit haben wir uns schnell wieder versöhnt.
vertrauen (+ D) | to trust | Ich vertraue meiner besten Freundin.
das Vertrauen | trust | Vertrauen ist die Grundlage jeder Beziehung.
enttäuscht (von + D) | disappointed (by) | Ich bin von seinem Verhalten enttäuscht.
eifersüchtig | jealous | Er ist eifersüchtig auf den neuen Kollegen seiner Freundin.
der/die Verwandte, -n | relative | Zu Weihnachten besuchen wir unsere Verwandten.
die Erziehung | upbringing | Die Erziehung der Kinder teilen sich beide Eltern.
sich kümmern (um + A) | to take care (of) | Wer kümmert sich um den Hund, wenn ihr verreist?
# B2
die Partnerschaft, -en | partnership | In einer Partnerschaft ist Kommunikation entscheidend.
die Fernbeziehung, -en | long-distance relationship | Eine Fernbeziehung ist auf Dauer anstrengend.
alleinerziehend | single (parent) | Alleinerziehende Mütter brauchen mehr Unterstützung.
die Einsamkeit | loneliness | Einsamkeit betrifft nicht nur ältere Menschen.
das Selbstbewusstsein | self-confidence | Lob stärkt das Selbstbewusstsein von Kindern.
rücksichtsvoll | considerate | Sie ist eine sehr rücksichtsvolle Mitbewohnerin.
der Konflikt, -e | conflict | Konflikte sollte man offen ansprechen.
die Geborgenheit | sense of security | Kinder brauchen Geborgenheit.
die Gleichgültigkeit | indifference | Seine Gleichgültigkeit hat mich verletzt.
verletzen | to hurt | Mit dieser Bemerkung hast du sie verletzt.
der Generationenkonflikt, -e | generational conflict | Zwischen Eltern und Teenagern gibt es oft einen Generationenkonflikt.
# C1
die Wertvorstellung, -en | (moral) values | Die Wertvorstellungen haben sich in den letzten Jahrzehnten gewandelt.
die Bindung, -en | bond, attachment | Eine sichere Bindung ist für die Entwicklung eines Kindes wichtig.
das Zugehörigkeitsgefühl | sense of belonging | Vereine vermitteln ein Zugehörigkeitsgefühl.
die Anteilnahme | sympathy, condolence | Wir möchten Ihnen unsere aufrichtige Anteilnahme aussprechen.
die Kränkung, -en | offence, slight | Die Kränkung saß tief.
nachtragend | resentful | Zum Glück ist er überhaupt nicht nachtragend.
die Empathie | empathy | Empathie ist eine Schlüsselkompetenz in sozialen Berufen.
das Rollenbild, -er | (gender) role model | Traditionelle Rollenbilder verlieren an Bedeutung.
die Patchworkfamilie, -n | blended family | In einer Patchworkfamilie leben Kinder aus verschiedenen Beziehungen zusammen.
`,
  },
  {
    id: "verben-praep",
    title: "Verbs + prepositions",
    de: "Verben mit Präpositionen",
    blurb: "Fixed prepositions and their case. Tested in every Sprachbausteine part.",
    typing: true,
    src: `
# B1
sich interessieren für + A | to be interested in | Ich interessiere mich sehr für Politik.
sich freuen auf + A | to look forward to | Ich freue mich schon auf den Urlaub.
sich freuen über + A | to be pleased about | Sie hat sich über das Geschenk gefreut.
warten auf + A | to wait for | Wir warten seit einer halben Stunde auf den Bus.
sich erinnern an + A | to remember | Ich erinnere mich gern an meine Schulzeit.
teilnehmen an + D | to take part in | Er nimmt an einem Integrationskurs teil.
gehören zu + D | to be part of | Brot gehört zu jedem deutschen Frühstück.
bitten um + A | to ask for | Darf ich Sie um einen Gefallen bitten?
fragen nach + D | to ask about | Der Arzt hat nach meinen Beschwerden gefragt.
Angst haben vor + D | to be afraid of | Viele haben Angst vor der mündlichen Prüfung.
sich gewöhnen an + A | to get used to | Ich habe mich an das Wetter in Deutschland gewöhnt.
sich ärgern über + A | to be annoyed about | Ich ärgere mich über meinen Fehler.
# B2
abhängen von + D | to depend on | Das hängt ganz vom Wetter ab.
sich beschäftigen mit + D | to deal with | Die Studie beschäftigt sich mit dem Konsumverhalten Jugendlicher.
sich verlassen auf + A | to rely on | Auf ihn kann man sich immer verlassen.
sich entscheiden für + A | to decide on | Ich habe mich für ein Studium in Wien entschieden.
sich einsetzen für + A | to stand up for | Die Organisation setzt sich für Kinderrechte ein.
überzeugen von + D | to convince of | Er hat mich von seiner Idee überzeugt.
neigen zu + D | to tend to | Er neigt dazu, alles zu kritisieren.
sich auseinandersetzen mit + D | to engage with, examine | Im Seminar setzen wir uns mit dem Thema Migration auseinander.
leiden unter + D | to suffer from (circumstances) | Viele Anwohner leiden unter dem Lärm.
leiden an + D | to suffer from (an illness) | Sie leidet an einer seltenen Krankheit.
beitragen zu + D | to contribute to | Jeder kann zum Klimaschutz beitragen.
sich beziehen auf + A | to refer to | Ich beziehe mich auf Ihre Anzeige vom 3. Mai.
zweifeln an + D | to doubt | Ich zweifle nicht an seiner Ehrlichkeit.
verzichten auf + A | to do without | Der Umwelt zuliebe verzichte ich aufs Fliegen.
sich wenden an + A | to turn to, contact | Bei Fragen wenden Sie sich bitte an die Rezeption.
# C1
sich ergeben aus + D | to result from | Daraus ergibt sich eine neue Frage.
basieren auf + D | to be based on | Die Ergebnisse basieren auf einer Umfrage unter 3.000 Personen.
sich niederschlagen in + D | to be reflected in | Die Krise schlägt sich in den Arbeitslosenzahlen nieder.
hinweisen auf + A | to point out | Ich möchte darauf hinweisen, dass die Frist morgen endet.
plädieren für + A | to argue in favour of | Die Autorin plädiert für eine Reform des Schulsystems.
sich abfinden mit + D | to come to terms with | Mit dieser Entscheidung kann ich mich nicht abfinden.
appellieren an + A | to appeal to | Der Bürgermeister appellierte an die Vernunft der Bürger.
resultieren aus + D | to result from | Die Probleme resultieren aus mangelnder Planung.
sich äußern zu + D | to comment on | Der Minister wollte sich zu den Vorwürfen nicht äußern.
Bezug nehmen auf + A | to refer to | In Ihrem Text sollen Sie auf die Grafik Bezug nehmen.
`,
  },
  {
    id: "nvv",
    title: "Noun–verb phrases",
    de: "Nomen-Verb-Verbindungen",
    blurb: "Fixed phrases that make B2/C1 writing sound native.",
    typing: true,
    src: `
# B2
eine Entscheidung treffen | to make a decision | Wir müssen bis Freitag eine Entscheidung treffen.
in Frage kommen | to be an option | Ein Umzug kommt für uns nicht in Frage.
eine Rolle spielen | to play a role | Der Preis spielt bei der Wahl eine große Rolle.
Kritik üben (an + D) | to criticise | Die Opposition übte scharfe Kritik an dem Gesetz.
zur Verfügung stehen | to be available | Für Fragen stehe ich Ihnen gern zur Verfügung.
zur Verfügung stellen | to provide | Die Firma stellt jedem Mitarbeiter einen Laptop zur Verfügung.
in Kraft treten | to come into force | Das Gesetz tritt am 1. Januar in Kraft.
Bescheid geben | to let someone know | Gib mir bitte Bescheid, wenn du angekommen bist.
einen Antrag stellen | to submit an application | Sie hat einen Antrag auf Wohngeld gestellt.
Rücksicht nehmen (auf + A) | to show consideration (for) | Bitte nehmen Sie Rücksicht auf die Nachbarn.
in Anspruch nehmen | to take up; to make use of | Die Renovierung wird viel Zeit in Anspruch nehmen.
zur Sprache bringen | to bring up (a topic) | Ich möchte noch ein Problem zur Sprache bringen.
Abschied nehmen (von + D) | to say goodbye (to) | Wir mussten Abschied von unserem alten Haus nehmen.
# C1
in Betracht ziehen | to consider | Wir sollten auch andere Lösungen in Betracht ziehen.
zum Ausdruck bringen | to express | In seiner Rede brachte er seine Dankbarkeit zum Ausdruck.
in Erfüllung gehen | to come true | Ihr Traum vom eigenen Café ist in Erfüllung gegangen.
Stellung nehmen (zu + D) | to take a stand (on) | Bitte nehmen Sie zu den Vorwürfen Stellung.
Maßnahmen ergreifen | to take measures | Die Stadt hat Maßnahmen gegen den Lärm ergriffen.
Einfluss nehmen (auf + A) | to exert influence (on) | Lobbyisten nehmen Einfluss auf die Gesetzgebung.
in Verbindung stehen (mit + D) | to be connected (with) | Die Krankheit steht in Verbindung mit Bewegungsmangel.
zur Folge haben | to result in | Der Streik hatte lange Wartezeiten zur Folge.
den Ausschlag geben | to tip the balance | Am Ende gab der Preis den Ausschlag.
unter Druck setzen | to put under pressure | Lass dich von deinem Chef nicht unter Druck setzen.
in Kauf nehmen | to accept (a drawback) | Für die schöne Wohnung nehmen wir den langen Arbeitsweg in Kauf.
zur Kenntnis nehmen | to take note of | Wir haben Ihre Beschwerde zur Kenntnis genommen.
Anwendung finden | to be applied | Die neue Methode findet in vielen Kliniken Anwendung.
in Frage stellen | to call into question | Die Studie stellt bisherige Ergebnisse in Frage.
`,
  },
  {
    id: "redemittel",
    title: "Phrases for writing & speaking",
    de: "Redemittel",
    blurb: "Ready-made sentence frames for letters, opinions, presentations and discussions.",
    typing: false,
    src: `
# B1
Sehr geehrte Damen und Herren, | Dear Sir or Madam (formal opening) | Sehr geehrte Damen und Herren, ich schreibe Ihnen wegen Ihrer Anzeige.
Mit freundlichen Grüßen | Kind regards (formal closing) | Ich freue mich auf Ihre Antwort. Mit freundlichen Grüßen
Vielen Dank für deine Nachricht. | Thanks for your message. | Vielen Dank für deine Nachricht, ich habe mich sehr gefreut.
Was hältst du davon, wenn …? | What do you think about …? | Was hältst du davon, wenn wir zusammen kochen?
Ich schlage vor, dass … | I suggest that … | Ich schlage vor, dass wir uns um zehn Uhr treffen.
Meiner Meinung nach … | In my opinion … | Meiner Meinung nach sollte man weniger Auto fahren.
Ich bin der Meinung, dass … | I believe that … | Ich bin der Meinung, dass Hausaufgaben sinnvoll sind.
Einerseits …, andererseits … | on the one hand …, on the other … | Einerseits ist das Leben in der Stadt praktisch, andererseits ist es teuer.
Ich würde gern wissen, ob … | I'd like to know whether … | Ich würde gern wissen, ob der Kurs auch abends stattfindet.
Könnten Sie mir bitte mitteilen, …? | Could you please tell me …? | Könnten Sie mir bitte mitteilen, wann die Prüfung beginnt?
Es tut mir leid, dass … | I'm sorry that … | Es tut mir leid, dass ich mich erst jetzt melde.
Das stimmt, aber … | That's true, but … | Das stimmt, aber man muss auch an die Kosten denken.
Wie wäre es mit …? | How about …? | Wie wäre es mit einem Picknick im Park?
Ich bin dafür, weil … | I'm in favour because … | Ich bin dafür, weil wir so Geld sparen.
# B2
Ich beziehe mich auf … | I am writing with reference to … | Ich beziehe mich auf Ihre Anzeige in der Tageszeitung.
Hiermit möchte ich mich über … beschweren. | I wish to complain about … | Hiermit möchte ich mich über den mangelhaften Service beschweren.
Ich wäre Ihnen dankbar, wenn … | I would be grateful if … | Ich wäre Ihnen dankbar, wenn Sie mir die Unterlagen zuschicken könnten.
Ich gehe davon aus, dass … | I assume that … | Ich gehe davon aus, dass Sie mir den Betrag erstatten.
Ein wichtiges Argument für … ist … | A key argument for … is … | Ein wichtiges Argument für das Homeoffice ist die gesparte Fahrzeit.
Dagegen spricht, dass … | An argument against is that … | Dagegen spricht, dass der Kontakt zu den Kollegen fehlt.
Es lässt sich nicht leugnen, dass … | It cannot be denied that … | Es lässt sich nicht leugnen, dass das Internet unser Leben verändert hat.
Im Vergleich zu … | Compared with … | Im Vergleich zu meinem Heimatland ist das Wohnen hier teuer.
Zusammenfassend lässt sich sagen, dass … | In summary, … | Zusammenfassend lässt sich sagen, dass beide Seiten gute Argumente haben.
Da bin ich anderer Meinung. | I see it differently. | Da bin ich anderer Meinung, denn die Kosten sind zu hoch.
Darf ich kurz unterbrechen? | May I interrupt briefly? | Darf ich kurz unterbrechen? Ich habe eine Frage dazu.
Das Thema meiner Präsentation ist … | The topic of my presentation is … | Das Thema meiner Präsentation ist „Leben auf dem Land“.
Ich komme nun zum nächsten Punkt. | Now to my next point. | Ich komme nun zum nächsten Punkt: den Nachteilen.
Ich erwarte, dass … | I expect that … | Ich erwarte, dass Sie das Problem bis Ende der Woche lösen.
# C1
Es ist unbestritten, dass … | It is undisputed that … | Es ist unbestritten, dass Bildung der Schlüssel zum Erfolg ist.
Hinzu kommt, dass … | Moreover, … | Hinzu kommt, dass die Mieten ständig steigen.
Demgegenüber steht … | Against this stands … | Demgegenüber steht die Gefahr der Vereinsamung.
Aus meiner Sicht überwiegen die Vorteile. | In my view the advantages prevail. | Aus meiner Sicht überwiegen die Vorteile, auch wenn es Risiken gibt.
Die Grafik veranschaulicht, … | The chart illustrates … | Die Grafik veranschaulicht, wie sich der Anteil der Pendler entwickelt hat.
Auffällig ist, dass … | It is striking that … | Auffällig ist, dass vor allem junge Menschen betroffen sind.
Dies lässt sich darauf zurückführen, dass … | This can be attributed to the fact that … | Dies lässt sich darauf zurückführen, dass die Löhne kaum gestiegen sind.
Man darf nicht außer Acht lassen, dass … | One must not overlook that … | Man darf nicht außer Acht lassen, dass nicht alle Zugang zum Internet haben.
Abschließend möchte ich betonen, dass … | Finally, I'd like to stress that … | Abschließend möchte ich betonen, dass wir schnell handeln müssen.
Wenn ich Sie richtig verstanden habe, … | If I understood you correctly, … | Wenn ich Sie richtig verstanden habe, sind Sie gegen ein Verbot.
Das mag zutreffen, dennoch … | That may be true; nevertheless … | Das mag zutreffen, dennoch halte ich die Maßnahme für übertrieben.
Es stellt sich die Frage, ob … | The question arises whether … | Es stellt sich die Frage, ob ein Verbot wirklich hilft.
Ich möchte zu bedenken geben, dass … | I'd ask you to consider that … | Ich möchte zu bedenken geben, dass die Kosten enorm sind.
`,
  },
];

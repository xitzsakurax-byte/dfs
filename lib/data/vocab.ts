// GermanForge — B1-C1 Vocabulary Bank
// Curated from official Goethe-Zertifikat B1 Wortliste (~2400 units), supplemented with B2/C1 professional/academic terms.
// Focus: exam-relevant professional, academic, and workplace vocabulary (no A1/A2 basics).

export type VocabItem = {
  de: string;
  en: string;
  example?: string;
  topic?: string;
  cefr?: 'B1' | 'B2' | 'C1';
};

export const vocab: VocabItem[] = [
  // Core professional B1
  { de: "die Nachhaltigkeit", en: "sustainability", example: "Nachhaltigkeit ist wichtig für die Zukunft der Industrie.", topic: "Umwelt & Industrie", cefr: "B1" },
  { de: "sich bewerben um", en: "to apply for (a job)", example: "Ich bewerbe mich um eine Ausbildungsstelle als Mechatroniker.", topic: "Bewerbung & Karriere", cefr: "B1" },
  { de: "konsequent", en: "consistent / rigorous", example: "Er arbeitet konsequent an seinen Zielen für die Prüfung.", topic: "Arbeitsweise", cefr: "B1" },
  { de: "umweltbewusst", en: "environmentally conscious", example: "Der Betrieb fördert umweltbewusstes Handeln bei allen Mitarbeitern.", topic: "Nachhaltigkeit", cefr: "B1" },
  { de: "die Bewerbungsunterlagen", en: "application documents", example: "Bitte schicken Sie Ihre Bewerbungsunterlagen bis Ende der Woche.", topic: "Bewerbung & Karriere", cefr: "B1" },
  { de: "das Praktikum", en: "internship / placement", example: "Während des Praktikums lernt man den Betriebsalltag kennen.", topic: "Ausbildung", cefr: "B1" },
  { de: "die Ausbildung", en: "vocational training / apprenticeship", example: "Die Ausbildung dauert drei Jahre und kombiniert Theorie mit Praxis im Betrieb.", topic: "Ausbildung", cefr: "B1" },
  { de: "der Lebenslauf", en: "CV / resume", example: "Bitte fügen Sie Ihren Lebenslauf und Zeugnisse der Bewerbung bei.", topic: "Bewerbung & Karriere", cefr: "B1" },
  { de: "pünktlich", en: "punctual / on time", example: "Es ist wichtig, pünktlich zum Unterricht und zur Arbeit zu erscheinen.", topic: "Arbeitsweise", cefr: "B1" },
  { de: "sich vorstellen", en: "to introduce oneself", example: "Im Vorstellungsgespräch soll man sich kurz und professionell vorstellen.", topic: "Bewerbung & Karriere", cefr: "B1" },
  { de: "die Kollegin", en: "female colleague", example: "Meine Kollegin hilft mir bei der Vorbereitung der Präsentation.", topic: "Arbeitsplatz", cefr: "B1" },
  { de: "der Teamgeist", en: "team spirit", example: "In der Ausbildung ist Teamgeist besonders wichtig für den Erfolg.", topic: "Soft Skills", cefr: "B1" },
  { de: "die Qualität", en: "quality", example: "Die Qualität der Produkte ist unser oberstes Ziel.", topic: "Beruf & Qualifikation", cefr: "B1" },
  { de: "die Veranstaltung", en: "event", example: "Die Veranstaltung zur Berufsorientierung war ein großer Erfolg.", topic: "Beruf & Qualifikation", cefr: "B1" },
  { de: "der Vertrag", en: "contract", example: "Der Vertrag wurde gestern unterschrieben.", topic: "Beruf & Qualifikation", cefr: "B1" },
  { de: "die Qualifikation", en: "qualification", example: "Die Qualifikation durch die Ausbildung eröffnet viele Möglichkeiten.", topic: "Karriere", cefr: "B1" },
  { de: "die Initiative", en: "initiative", example: "Zeigen Sie Initiative bei der Lösung von Problemen im Team.", topic: "Arbeitsweise", cefr: "B1" },

  // B2 professional
  { de: "die Fachkraft", en: "skilled worker / specialist", example: "Als Fachkraft in der Pflege übernimmt man verantwortungsvolle Aufgaben.", topic: "Beruf & Qualifikation", cefr: "B2" },
  { de: "die Weiterbildung", en: "further training / professional development", example: "Die Weiterbildung nach der Ausbildung verbessert die Karrierechancen.", topic: "Karriere", cefr: "B2" },
  { de: "die Verantwortung", en: "responsibility", example: "Als Fachkraft trägt man Verantwortung für die Qualität der Arbeit.", topic: "Beruf & Qualifikation", cefr: "B2" },
  { de: "die Veränderung", en: "change", example: "Die Veränderung in der Produktion hat zu mehr Effizienz geführt.", topic: "Innovation & Wandel", cefr: "B2" },
  { de: "die Versicherung", en: "insurance", example: "Die Versicherung deckt alle Risiken am Arbeitsplatz ab.", topic: "Beruf & Qualifikation", cefr: "B2" },
  { de: "die Verwaltung", en: "administration", example: "Die Verwaltung kümmert sich um die Personalangelegenheiten.", topic: "Beruf & Qualifikation", cefr: "B2" },
  { de: "der Vorschlag", en: "suggestion / proposal", example: "Der Vorschlag zur Verbesserung der Abläufe wurde angenommen.", topic: "Beruf & Qualifikation", cefr: "B2" },
  { de: "die Zukunft", en: "future", example: "Die Zukunft der Branche liegt in der Nachhaltigkeit.", topic: "Innovation & Wandel", cefr: "B2" },
  { de: "die Kooperation", en: "cooperation", example: "Gute Kooperation zwischen Abteilungen ist entscheidend für den Erfolg.", topic: "Team & Organisation", cefr: "B2" },
  { de: "die Flexibilität", en: "flexibility", example: "Flexibilität ist eine wichtige Kompetenz in modernen Betrieben.", topic: "Persönliche Kompetenz", cefr: "B2" },
  { de: "die Belastbarkeit", en: "resilience under pressure", example: "Hohe Belastbarkeit ist in der Ausbildung oft gefragt.", topic: "Persönliche Kompetenz", cefr: "B2" },
  { de: "die Produktivität", en: "productivity", example: "Die Produktivität des Teams hat sich durch neue Prozesse gesteigert.", topic: "Arbeitsweise", cefr: "B2" },
  { de: "die Kompetenz", en: "competence / skill", example: "Fachliche und soziale Kompetenz sind gleichermaßen wichtig.", topic: "Beruf & Qualifikation", cefr: "B2" },
  { de: "die Digitalisierung", en: "digitalization", example: "Die Digitalisierung verändert die Arbeitswelt grundlegend.", topic: "Innovation & Wandel", cefr: "B2" },
  { de: "die Automatisierung", en: "automation", example: "Durch Automatisierung werden viele manuelle Tätigkeiten ersetzt.", topic: "Innovation & Wandel", cefr: "B2" },
  { de: "proaktiv", en: "proactive", example: "Ein proaktives Vorgehen verhindert Probleme frühzeitig.", topic: "Arbeitsweise", cefr: "B2" },
  { de: "die Koordination", en: "coordination", example: "Die Koordination der verschiedenen Abteilungen ist anspruchsvoll.", topic: "Team & Organisation", cefr: "B2" },
  { de: "die Methodenkompetenz", en: "methodological competence", example: "Methodenkompetenz hilft bei der strukturierten Problemlösung.", topic: "Persönliche Kompetenz", cefr: "B2" },
  { de: "die Kritikfähigkeit", en: "ability to take criticism", example: "Kritikfähigkeit ist eine zentrale Soft Skill in der Ausbildung.", topic: "Soft Skills", cefr: "B2" },
  { de: "die Fachkompetenz", en: "technical / professional competence", example: "Die Fachkompetenz wird in der Berufsschule und im Betrieb aufgebaut.", topic: "Beruf & Qualifikation", cefr: "B2" },
  { de: "die Effizienz", en: "efficiency", example: "Die Effizienz der Prozesse konnte durch Optimierungen gesteigert werden.", topic: "Arbeitsweise", cefr: "B2" },
  { de: "die Resilienz", en: "resilience", example: "Resilienz hilft Azubis, mit Stress in der Ausbildung umzugehen.", topic: "Persönliche Kompetenz", cefr: "B2" },
  { de: "vorausschauend", en: "forward-looking / proactive", example: "Eine vorausschauende Planung ist in jedem Betrieb wichtig.", topic: "Planung & Projekt", cefr: "B2" },
  { de: "ambivalent", en: "ambivalent / having mixed feelings", example: "Viele Auszubildende sind ambivalent gegenüber der langen Ausbildungszeit.", topic: "Kommunikation", cefr: "B2" },
  { de: "die Selbstverwirklichung", en: "self-actualization", example: "Die Ausbildung ermöglicht Selbstverwirklichung im gewählten Beruf.", topic: "Persönliche Entwicklung", cefr: "B2" },

  // B2 everyday/communication
  { de: "sich beschweren", en: "to complain", example: "Der Gast beschwerte sich höflich über das kalte Essen.", topic: "Alltag & Service", cefr: "B2" },
  { de: "die Nachbarschaft", en: "neighborhood", example: "In unserer Nachbarschaft gibt es viele junge Familien und Grünflächen.", topic: "Wohnen & Alltag", cefr: "B2" },
  { de: "verpassen", en: "to miss (e.g. bus, opportunity)", example: "Ich habe den letzten Bus verpasst und musste zu Fuß gehen.", topic: "Alltag", cefr: "B2" },
  { de: "sich erholen", en: "to recover / to relax", example: "Nach der anstrengenden Woche muss ich mich endlich erholen.", topic: "Freizeit & Gesundheit", cefr: "B2" },
  { de: "die Freizeit", en: "leisure time", example: "In meiner Freizeit treibe ich gerne Sport oder lese Romane.", topic: "Alltag & Hobbys", cefr: "B2" },
  { de: "umziehen", en: "to move (house)", example: "Wir ziehen nächstes Jahr in eine günstigere Wohnung um.", topic: "Wohnen", cefr: "B2" },
  { de: "die Miete", en: "rent", example: "Die Miete in der Innenstadt ist in den letzten Jahren stark gestiegen.", topic: "Wohnen & Finanzen", cefr: "B2" },
  { de: "sich streiten", en: "to argue / quarrel", example: "Die Nachbarn streiten sich oft über den Lärm.", topic: "Alltag & Beziehungen", cefr: "B2" },
  { de: "die Meinung", en: "opinion / view", example: "Ich respektiere deine Meinung, auch wenn ich nicht derselben Ansicht bin.", topic: "Kommunikation & Diskussion", cefr: "B2" },
  { de: "der Stress", en: "stress", example: "Der Stress vor wichtigen Terminen ist bei vielen Menschen hoch.", topic: "Gesundheit & Alltag", cefr: "B2" },
  { de: "die Herausforderung", en: "challenge", example: "Die größte Herausforderung war es, pünktlich fertig zu werden.", topic: "Persönliche Entwicklung", cefr: "B2" },
  { de: "effizient", en: "efficient", example: "Das neue System arbeitet deutlich effizienter als das alte.", topic: "Arbeitsweise", cefr: "B2" },
  { de: "die Beziehung", en: "relationship", example: "Eine gute Beziehung zu den Kollegen macht die Arbeit angenehmer.", topic: "Soziales & Arbeit", cefr: "B2" },
  { de: "die Auseinandersetzung", en: "discussion / debate", example: "Eine sachliche Auseinandersetzung mit dem Thema ist notwendig.", topic: "Kommunikation", cefr: "B2" },
  { de: "der Standpunkt", en: "point of view / stance", example: "Ich vertrete den Standpunkt, dass Nachhaltigkeit Priorität haben muss.", topic: "Kommunikation & Diskussion", cefr: "B2" },
  { de: "die Perspektive", en: "perspective", example: "Aus einer anderen Perspektive betrachtet, ergeben sich neue Lösungen.", topic: "Kommunikation", cefr: "B2" },
  { de: "die Kontroverse", en: "controversy", example: "Die Kontroverse um die neuen Arbeitszeiten dauert an.", topic: "Arbeitsplatz", cefr: "B2" },
  { de: "die Argumentation", en: "argumentation", example: "Ihre Argumentation war überzeugend und gut strukturiert.", topic: "Kommunikation", cefr: "B2" },
  { de: "sich auseinandersetzen mit", en: "to engage with / deal with critically", example: "Man muss sich kritisch mit den neuen Vorschriften auseinandersetzen.", topic: "Persönliche Entwicklung", cefr: "B2" },
  { de: "die Belastung", en: "strain / burden", example: "Die hohe Arbeitsbelastung führt bei vielen Azubis zu Stress.", topic: "Gesundheit & Alltag", cefr: "B2" },

  // Academic / C1
  { de: "die Analyse", en: "analysis", example: "Eine gründliche Analyse der Daten ist für die Entscheidung unerlässlich.", topic: "Wissenschaft & Forschung", cefr: "B2" },
  { de: "empirisch", en: "empirical", example: "Empirische Studien liefern die besten Belege für die These.", topic: "Akademisch", cefr: "C1" },
  { de: "die Hypothese", en: "hypothesis", example: "Die Hypothese wurde durch mehrere Experimente bestätigt.", topic: "Wissenschaft", cefr: "B2" },
  { de: "konzeptionell", en: "conceptual", example: "Der konzeptionelle Rahmen des Projekts muss noch geschärft werden.", topic: "Planung & Innovation", cefr: "C1" },
  { de: "die Relevanz", en: "relevance", example: "Die Relevanz dieser Forschung für die Praxis ist sehr hoch.", topic: "Akademisch", cefr: "B2" },
  { de: "substantiell", en: "substantial", example: "Es gibt substantielle Unterschiede in den Testergebnissen.", topic: "Wissenschaft", cefr: "C1" },
  { de: "die These", en: "thesis / central claim", example: "Die zentrale These des Artikels wird durch die Daten gestützt.", topic: "Akademisch", cefr: "B2" },
  { de: "die Implikation", en: "implication", example: "Die Implikationen für die Gesellschaft sind weitreichend.", topic: "Akademisch", cefr: "C1" },
  { de: "paradigmatisch", en: "paradigmatic", example: "Dieses Beispiel ist paradigmatisch für den aktuellen Wandel.", topic: "Innovation & Wandel", cefr: "C1" },
  { de: "die Schlussfolgerung", en: "conclusion", example: "Die Schlussfolgerung aus der Studie ist klar und nachvollziehbar.", topic: "Wissenschaft & Forschung", cefr: "B2" },
  { de: "die Kausalität", en: "causality", example: "Die Kausalität zwischen den Faktoren muss klar nachgewiesen werden.", topic: "Akademisch", cefr: "C1" },
  { de: "die Korrelation", en: "correlation", example: "Es besteht eine starke Korrelation zwischen Weiterbildung und Karrierechancen.", topic: "Wissenschaft & Forschung", cefr: "B2" },
  { de: "die Evidenz", en: "evidence", example: "Die Evidenz aus den Studien unterstützt die neue Strategie.", topic: "Akademisch", cefr: "C1" },
  { de: "die Validität", en: "validity", example: "Die Validität der Ergebnisse wurde durch unabhängige Prüfer bestätigt.", topic: "Wissenschaft", cefr: "C1" },
  { de: "kontextualisieren", en: "to contextualize", example: "Man muss die Ergebnisse immer im gesellschaftlichen Kontext kontextualisieren.", topic: "Akademisch", cefr: "C1" },
  { de: "die Ambiguität", en: "ambiguity", example: "Die Ambiguität der Formulierung führte zu Missverständnissen.", topic: "Kommunikation", cefr: "C1" },
  { de: "die Deduktion", en: "deduction", example: "Durch Deduktion lassen sich allgemeine Regeln aus Einzelfällen ableiten.", topic: "Wissenschaft", cefr: "C1" },
  { de: "jemandem den Wind aus den Segeln nehmen", en: "to take the wind out of someone's sails", example: "Durch gute Vorbereitung nahm er dem Prüfer den Wind aus den Segeln.", topic: "Umgangssprache Beruf", cefr: "C1" },
];

// NOTE: Shuffle must happen in a useEffect/client-side call, NOT at module scope.
// Module-scope shuffle causes SSR/client hydration mismatch.
// The quiz component handles shuffling client-side.
export const vocabQuestions = vocab.map((v) => ({
  de: v.de,
  en: v.en,
  example: v.example,
  topic: v.topic,
  cefr: v.cefr,
}));

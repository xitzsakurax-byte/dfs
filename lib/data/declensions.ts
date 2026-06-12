// GermanForge — B1-C1 Declension / Word Forms practice for TELC & Goethe exams
// Focus: the 4 cases (Nominativ, Akkusativ, Dativ, Genitiv) in realistic exam-style sentences.
// Each item has exactly 4 UNIQUE options. Correct answer is always included.

export type DeclensionItem = {
  base: string;
  sentence: string;
  correct: string;
  options: string[];
  case: 'Nominativ' | 'Akkusativ' | 'Dativ' | 'Genitiv';
  explanation: string;
  topic: string;
};

export const declensionItems: DeclensionItem[] = [
  {
    base: "der Park",
    sentence: "Ich gehe jeden Tag ___ spazieren.",
    correct: "in den Park",
    options: ["in den Park", "in dem Park", "in der Park", "in des Parkes"],
    case: "Akkusativ",
    explanation: "Richtung / Bewegung in etwas hinein → Akkusativ (in + Akk).",
    topic: "Alltag & Freizeit"
  },
  {
    base: "die Stadt",
    sentence: "Ich wohne seit drei Jahren ___ .",
    correct: "in der Stadt",
    options: ["in der Stadt", "in die Stadt", "in das Stadt", "in den Stadt"],
    case: "Dativ",
    explanation: "Position / Wo? → Dativ (in + Dativ).",
    topic: "Wohnen & Leben"
  },
  {
    base: "der Freund",
    sentence: "Ich fahre mit ___ in Urlaub.",
    correct: "meinem Freund",
    options: ["meinem Freund", "meinen Freund", "meines Freundes", "mein Freund"],
    case: "Dativ",
    explanation: "mit + Dativ. Viele Verben und Präpositionen verlangen Dativ.",
    topic: "Freundschaft & Reisen"
  },
  {
    base: "das Buch",
    sentence: "Ich lese ___ jeden Abend.",
    correct: "das Buch",
    options: ["das Buch", "dem Buch", "des Buches", "den Buch"],
    case: "Akkusativ",
    explanation: "Direktes Objekt des Verbs 'lesen' → Akkusativ.",
    topic: "Alltag"
  },
  {
    base: "die Lehrerin",
    sentence: "Ich habe gestern ___ getroffen.",
    correct: "die Lehrerin",
    options: ["die Lehrerin", "der Lehrerin", "eine Lehrerin", "den Lehrerin"],
    case: "Akkusativ",
    explanation: "Direktes Objekt (wen?) → Akkusativ. Femininum Akkusativ: die (bestimmt) oder eine (unbestimmt).",
    topic: "Beruf & Ausbildung"
  },
  {
    base: "der Kollege",
    sentence: "Ich helfe ___ bei dem Projekt.",
    correct: "meinem Kollegen",
    options: ["meinem Kollegen", "meinen Kollegen", "meines Kollegen", "mein Kollege"],
    case: "Dativ",
    explanation: "helfen + Dativ (Person). Typisch für B1: Verben mit Dativ.",
    topic: "Arbeit & Team"
  },
  {
    base: "die Freundin",
    sentence: "Das Geschenk ist für ___ .",
    correct: "meine Freundin",
    options: ["meine Freundin", "meiner Freundin", "meinen Freundinnen", "meiner Freunden"],
    case: "Akkusativ",
    explanation: "für + Akkusativ (Person oder Sache). Femininum Akkusativ Singular: meine Freundin.",
    topic: "Beziehungen"
  },
  {
    base: "der Chef",
    sentence: "Ich warte auf ___ .",
    correct: "den Chef",
    options: ["den Chef", "dem Chef", "des Chefs", "der Chef"],
    case: "Akkusativ",
    explanation: "auf + Akkusativ bei 'warten auf' (Richtung/Ziel).",
    topic: "Beruf"
  },
  {
    base: "das Auto",
    sentence: "Ich fahre mit ___ zur Arbeit.",
    correct: "dem Auto",
    options: ["dem Auto", "den Auto", "des Autos", "das Auto"],
    case: "Dativ",
    explanation: "mit + Dativ (Transportmittel).",
    topic: "Alltag & Mobilität"
  },
  {
    base: "die Prüfung",
    sentence: "Ich habe Angst vor ___ .",
    correct: "der Prüfung",
    options: ["der Prüfung", "die Prüfung", "den Prüfungen", "eine Prüfung"],
    case: "Dativ",
    explanation: "vor + Dativ (bei 'Angst haben vor'). Wichtige B1-Struktur.",
    topic: "Prüfung & Lernen"
  },
  {
    base: "der Lehrer",
    sentence: "___ kommt gleich in die Klasse.",
    correct: "Der Lehrer",
    options: ["Der Lehrer", "Dem Lehrer", "Den Lehrer", "Des Lehrers"],
    case: "Nominativ",
    explanation: "Subjekt des Satzes → Nominativ.",
    topic: "Schule & Unterricht"
  },
  {
    base: "die Kollegin",
    sentence: "Ich gebe ___ das Dokument.",
    correct: "der Kollegin",
    options: ["der Kollegin", "die Kollegin", "den Kollegin", "eine Kollegin"],
    case: "Dativ",
    explanation: "geben + Dativ (indirektes Objekt) + Akkusativ (direktes Objekt). Femininum Dativ: der Kollegin.",
    topic: "Arbeit"
  },
  {
    base: "das Kind",
    sentence: "Das Spielzeug gehört ___ .",
    correct: "dem Kind",
    options: ["dem Kind", "den Kind", "des Kindes", "das Kind"],
    case: "Dativ",
    explanation: "gehören + Dativ. Typisch für Besitzangaben.",
    topic: "Familie & Alltag"
  },
  {
    base: "die Universität",
    sentence: "Ich studiere an ___ .",
    correct: "der Universität",
    options: ["der Universität", "die Universität", "den Universitäten", "eine Universität"],
    case: "Dativ",
    explanation: "an + Dativ bei 'studieren an' (Ort / Institution). Femininum Dativ: der Universität.",
    topic: "Bildung & Studium"
  },
  {
    base: "der Zug",
    sentence: "Ich steige in ___ ein.",
    correct: "den Zug",
    options: ["den Zug", "dem Zug", "des Zuges", "der Zug"],
    case: "Akkusativ",
    explanation: "in + Akkusativ bei Bewegung (einsteigen).",
    topic: "Reisen & Verkehr"
  },
  {
    base: "die Frau",
    sentence: "Ich habe ___ gestern gesehen.",
    correct: "die Frau",
    options: ["die Frau", "der Frau", "den Frauen", "des Frau"],
    case: "Akkusativ",
    explanation: "sehen + Akkusativ (direktes Objekt). Femininum Akkusativ: die Frau.",
    topic: "Alltag"
  },
  {
    base: "der Mann",
    sentence: "Das ist das Auto ___ .",
    correct: "des Mannes",
    options: ["des Mannes", "dem Mann", "den Mann", "der Mann"],
    case: "Genitiv",
    explanation: "Genitiv zur Angabe von Besitz (das Auto des Mannes). B1+ Struktur.",
    topic: "Alltag & Besitz"
  },
  {
    base: "die Eltern",
    sentence: "Ich habe ___ angerufen.",
    correct: "meine Eltern",
    options: ["meine Eltern", "meinen Eltern", "meiner Eltern", "meines Eltern"],
    case: "Akkusativ",
    explanation: "anrufen + Akkusativ (Person). Plural Akkusativ: meine Eltern (Plural, kein -n im Akkusativ).",
    topic: "Familie"
  }
];

// Shuffle helper — call client-side only (inside useEffect), never at module scope
export function getShuffledDeclensions(): DeclensionItem[] {
  return [...declensionItems].sort(() => Math.random() - 0.5);
}

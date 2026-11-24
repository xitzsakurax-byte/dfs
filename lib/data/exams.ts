// Goethe-Zertifikat B1 / B2 / C1 — structure as published by the Goethe-Institut.
// Sources (checked): official Modellsätze (B1 Erwachsene, B2 Erwachsene, C1 modular, format since 01.01.2024),
// Handbuch „Prüfungsziele, Testbeschreibung“ C1, Durchführungsbestimmungen B1/B2/C1.
import type { Level } from "../core";

export type ExamPart = { teil: string; goal: string; type: string; items?: number; time?: string };
export type ExamModule = { name: string; time: string; parts: ExamPart[]; note?: string };
export type ExamInfo = {
  level: Level;
  name: string;
  written: string;
  pass: string;
  modules: ExamModule[];
  facts: string[];
  sources: { label: string; url: string }[];
};

const PASS = "Each module: max. 100 points, passed with at least 60 points (60 %).";

export const EXAMS: ExamInfo[] = [
  {
    level: "B1",
    name: "Goethe-Zertifikat B1",
    written: "Written modules about 165 minutes in total, without breaks.",
    pass: PASS,
    modules: [
      {
        name: "Lesen",
        time: "65 min",
        parts: [
          { teil: "1", goal: "Korrespondenz lesen (Blog/E-Mail)", type: "Richtig/Falsch", items: 6, time: "10 min" },
          { teil: "2", goal: "Information und Argumentation verstehen (2 Pressetexte)", type: "Mehrfachauswahl a/b/c", items: 6, time: "20 min" },
          { teil: "3", goal: "Zur Orientierung lesen (Anzeigen A–J)", type: "Zuordnung, eine Situation ohne Lösung (0)", items: 7, time: "10 min" },
          { teil: "4", goal: "Information und Argumentation verstehen (Leserbriefe)", type: "Ja/Nein", items: 7, time: "15 min" },
          { teil: "5", goal: "Schriftliche Anweisung verstehen (Hausordnung o. Ä.)", type: "Mehrfachauswahl a/b/c", items: 4, time: "10 min" },
        ],
      },
      {
        name: "Hören",
        time: "40 min",
        parts: [
          { teil: "1", goal: "Ankündigungen, Durchsagen, Anweisungen — 5 kurze Texte, je zweimal", type: "Richtig/Falsch + a/b/c", items: 10 },
          { teil: "2", goal: "Als Zuhörer im Publikum verstehen (Führung, Vortrag) — einmal", type: "Mehrfachauswahl a/b/c", items: 5 },
          { teil: "3", goal: "Gespräche zwischen Muttersprachlern — einmal", type: "Richtig/Falsch", items: 7 },
          { teil: "4", goal: "Radiodiskussion — zweimal", type: "Zuordnung: Wer sagt was?", items: 8 },
        ],
      },
      {
        name: "Schreiben",
        time: "60 min",
        parts: [
          { teil: "1", goal: "Persönliche E-Mail: beschreiben, begründen, Vorschlag machen", type: "circa 80 Wörter", time: "20 min" },
          { teil: "2", goal: "Meinung zu einem Thema (Gästebuch/Forum)", type: "circa 80 Wörter", time: "25 min" },
          { teil: "3", goal: "Halbformelle E-Mail: sich entschuldigen, um etwas bitten", type: "circa 40 Wörter", time: "15 min" },
        ],
      },
      {
        name: "Sprechen",
        time: "about 15 min per pair · 15 min preparation",
        parts: [
          { teil: "1", goal: "Gemeinsam etwas planen (4 Leitpunkte)", type: "Dialog", time: "~3 min" },
          { teil: "2", goal: "Ein Thema präsentieren (5 Folien, Thema 1 oder 2)", type: "Monolog", time: "~3 min" },
          { teil: "3", goal: "Über ein Thema sprechen: Rückmeldung + eine Frage", type: "Interaktion", time: "~2 min" },
        ],
      },
    ],
    facts: ["The four modules can be taken together or separately (modular).", "Example items („Beispiel 0“) at the start of most parts are not scored."],
    sources: [
      { label: "Modellsatz B1 (Erwachsene), PDF", url: "https://www.goethe.de/pro/relaunch/prf/materialien/B1/b1_modellsatz_erwachsene.pdf" },
      { label: "Übungssatz B1 (Erwachsene), PDF", url: "https://www.goethe.de/pro/relaunch/prf/materialien/B1/B1_Uebungssatz_Erwachsene.pdf" },
      { label: "Modellsatz B1 online (interactive)", url: "https://bfu.goethe.de/b1_mod/lesen.php" },
      { label: "Durchführungsbestimmungen B1, PDF", url: "https://www.goethe.de/pro/relaunch/prf/de/Durchfuehrungsbestimmungen_B1.pdf" },
    ],
  },
  {
    level: "B2",
    name: "Goethe-Zertifikat B2",
    written: "Written modules about 180 minutes in total, without breaks.",
    pass: PASS,
    modules: [
      {
        name: "Lesen",
        time: "65 min",
        parts: [
          { teil: "1", goal: "Einstellungen/Haltungen verstehen (4 Forumstexte)", type: "Zuordnung zu Personen a–d", items: 9, time: "18 min" },
          { teil: "2", goal: "Informationen verstehen (Zeitschriftenartikel)", type: "Sätze in Lücken, 2 Sätze übrig", items: 6, time: "12 min" },
          { teil: "3", goal: "Informationen verstehen (Zeitungsartikel)", type: "Mehrfachauswahl a/b/c", items: 6, time: "12 min" },
          { teil: "4", goal: "Standpunkte verstehen (8 Meinungsäußerungen)", type: "Zuordnung zu Überschriften, 1 Äußerung übrig", items: 6, time: "12 min" },
          { teil: "5", goal: "Regeln/Instruktionen verstehen (z. B. Studienordnung)", type: "Überschriften zu Paragrafen, 4 übrig", items: 3, time: "6 min" },
        ],
      },
      {
        name: "Hören",
        time: "about 40 min",
        parts: [
          { teil: "1", goal: "Alltagsgespräche und Äußerungen — 5 Texte, je einmal", type: "Richtig/Falsch + a/b/c", items: 10 },
          { teil: "2", goal: "Interview mit einer Persönlichkeit aus der Wissenschaft — zweimal", type: "Mehrfachauswahl a/b/c", items: 6 },
          { teil: "3", goal: "Radiogespräch mit mehreren Personen — einmal", type: "Zuordnung: Wer sagt das?", items: 6 },
          { teil: "4", goal: "Kurzer Vortrag — zweimal", type: "Mehrfachauswahl a/b/c", items: 8 },
        ],
      },
      {
        name: "Schreiben",
        time: "75 min",
        parts: [
          { teil: "1", goal: "Forumsbeitrag: Meinung äußern, begründen, Vor- und Nachteile (4 Inhaltspunkte)", type: "circa 150 Wörter", time: "50 min" },
          { teil: "2", goal: "Nachricht (z. B. an Vorgesetzte): erklären, vorschlagen, höflich bitten (4 Inhaltspunkte)", type: "circa 100 Wörter", time: "25 min" },
        ],
      },
      {
        name: "Sprechen",
        time: "about 15 min per pair · 15 min preparation",
        parts: [
          { teil: "1", goal: "Vortrag halten (Thema 1 oder 2) und Fragen beantworten", type: "Monolog + Fragen", time: "~4 min each" },
          { teil: "2", goal: "Diskussion zu einer kontroversen Frage", type: "Dialog", time: "~5 min together" },
        ],
      },
    ],
    facts: ["Modular: each module can be taken and passed separately.", "Lesen Teil 4 and 5 use one example each that cannot be used again."],
    sources: [
      { label: "Modellsatz B2 (Erwachsene), PDF", url: "https://www.goethe.de/pro/relaunch/prf/materialien/B2/b2_modellsatz_erwachsene.pdf" },
      { label: "Durchführungsbestimmungen B2, PDF", url: "https://www.goethe.de/pro/relaunch/prf/de/Durchfuehrungsbestimmungen_B2.pdf" },
    ],
  },
  {
    level: "C1",
    name: "Goethe-Zertifikat C1",
    written: "Written modules about 180 minutes in total, without breaks. New format since 1 January 2024.",
    pass: PASS,
    modules: [
      {
        name: "Lesen",
        time: "65 min",
        note: "About 2,000 words in total.",
        parts: [
          { teil: "1", goal: "Text mit Wörtern rekonstruieren (populärwissenschaftlicher Artikel, ~320 Wörter)", type: "Lückentext, Multiple Choice mit 4 Optionen", items: 8, time: "10 min" },
          { teil: "2", goal: "Hauptaussagen und Einzelinformationen verstehen (~680 Wörter)", type: "Multiple Choice a/b/c", items: 7, time: "20 min" },
          { teil: "3", goal: "Text mit Sätzen rekonstruieren (Kommentar/Reportage, ~530 Wörter)", type: "Sätze in Lücken, 2 Sätze übrig", items: 8, time: "20 min" },
          { teil: "4", goal: "Meinungen suchen und zuordnen (3 Expertenbeiträge, ~430 Wörter)", type: "Wer äußert das? 2 Aussagen ohne Lösung (0)", items: 7, time: "15 min" },
        ],
      },
      {
        name: "Hören",
        time: "about 40 min",
        note: "About 2,300 words in total; parts 1 and 3 heard once, parts 2 and 4 twice.",
        parts: [
          { teil: "1", goal: "Podcast mit Rezensionen (3 Bücher, ~420 Wörter) — einmal", type: "Zuordnung zu Buch 1/2/3", items: 6 },
          { teil: "2", goal: "Interview mit Expertin/Experte (~620 Wörter) — zweimal", type: "stimmt / stimmt nicht / dazu wird nichts gesagt", items: 9 },
          { teil: "3", goal: "Diskussion mit drei Personen (~710 Wörter) — 4 Abschnitte, je einmal", type: "Multiple Choice a/b/c, 2 pro Abschnitt", items: 8 },
          { teil: "4", goal: "Vortrag (~540 Wörter) — zweimal", type: "Multiple Choice a/b/c", items: 7 },
        ],
      },
      {
        name: "Schreiben",
        time: "75 min",
        parts: [
          { teil: "1", goal: "Diskussionsbeitrag in einem Online-Forum (4 Inhaltspunkte)", type: "circa 230 Wörter", time: "50 min" },
          { teil: "2", goal: "(Halb-)formelle E-Mail (4 Inhaltspunkte)", type: "circa 120 Wörter", time: "25 min" },
        ],
      },
      {
        name: "Sprechen",
        time: "about 20 min per pair · 20 min preparation",
        parts: [
          { teil: "1", goal: "Vortrag zu einem gewählten Thema (4 Punkte) + Fragen", type: "Monolog + Fragen", time: "~5 min + ~2 min" },
          { teil: "2", goal: "Diskussion zu einer Situation mit Infotext (4 Punkte)", type: "Dialog", time: "~5 min together" },
        ],
      },
    ],
    facts: ["The C1 exam was redeveloped and relaunched on 1 January 2024 under the same name.", "Modular: each module can be taken separately."],
    sources: [
      { label: "Modellsatz C1 (format 2024), PDF", url: "https://www.goethe.de/pro/relaunch/prf/materialien/C1_modular/c1-modular_modellsatz.pdf" },
      { label: "Handbuch Prüfungsziele & Testbeschreibung C1, PDF", url: "https://www.goethe.de/pro/relaunch/prf/de/Handbuch_Pruefungsziele_Testbeschreibung_C1.pdf" },
      { label: "Durchführungsbestimmungen C1, PDF", url: "https://www.goethe.de/pro/relaunch/prf/de/Durchfuehrungsbestimmungen_C1.pdf" },
    ],
  },
];

export const EXAM_BY_LEVEL: Record<Level, ExamInfo> = Object.fromEntries(EXAMS.map((e) => [e.level, e])) as Record<Level, ExamInfo>;

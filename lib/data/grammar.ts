// GermanForge — B1-C1 Grammar structures for professional / Ausbildung German
// Richer data: full sentences, hints, explanations, topics, CEFR.
// Used for quiz + future resources / documentation section.
// Inspired by real B1-B2 patterns from Goethe practice materials (model exercises focus on work, future plans, descriptions, processes).

export type GrammarItem = {
  q: string;           // the gapped sentence (as in exam style)
  en: string;          // English meaning / task
  options: string[];
  correct: string;
  hint: string;        // short explanation shown on wrong or reveal
  explanation: string; // longer learning note (for resources page)
  topic: string;
  cefr: 'B1' | 'B2' | 'C1';
};

export const grammar: GrammarItem[] = [
  {
    q: "Wenn ich mehr Zeit ___ (haben), ___ ich nach Berlin reisen.",
    en: "If I had more time, I would travel to Berlin.",
    options: ["hätte / würde", "habe / werde", "hatte / reise", "hätte / reise"],
    correct: "hätte / würde",
    hint: "Konjunktiv II for hypothetical situations",
    explanation: "Use Konjunktiv II (hätte + würde + infinitive) for unreal or hypothetical present/future. Very common in professional planning discussions.",
    topic: "Hypothetische Situationen / Zukunft",
    cefr: "B2",
  },
  {
    q: "Das Projekt ___ (müssen / abschließen) werden.",
    en: "The project must be completed.",
    options: ["muss abgeschlossen", "müssen abgeschlossen", "muss abschließen", "müssen abschließen"],
    correct: "muss abgeschlossen",
    hint: "Passive with modal verb (müssen + werden)",
    explanation: "Modal + passive: 'muss abgeschlossen werden'. Structure is essential for describing processes, deadlines and responsibilities in the workplace.",
    topic: "Passive & Prozesse",
    cefr: "B1",
  },
  {
    q: "Der Mann, ___ ich gestern getroffen habe, ist mein Professor.",
    en: "The man whom I met yesterday is my professor.",
    options: ["den", "der", "dem", "dessen"],
    correct: "den",
    hint: "Relative pronoun in accusative (direct object)",
    explanation: "Relative pronouns agree in gender/number with antecedent and take case from their role in the relative clause. Key for describing colleagues, customers, documents.",
    topic: "Relativsätze",
    cefr: "B1",
  },
  {
    q: "Es ___ (werden / sagen), dass die Wirtschaft sich erholt.",
    en: "It is said that the economy is recovering.",
    options: ["wird gesagt", "werden gesagt", "sagt", "gesagt wird"],
    correct: "wird gesagt",
    hint: "Impersonal passive (man sagt → es wird gesagt)",
    explanation: "Impersonal passive with 'es' + werden is formal and frequent in reports, news, and professional summaries.",
    topic: "Passiv & Berichte",
    cefr: "B2",
  },
  {
    q: "Hätte er die Prüfung bestanden, ___ er das Stipendium bekommen.",
    en: "Had he passed the exam, he would have received the scholarship.",
    options: ["hätte / hätte", "hätte / würde", "hat / hat", "würde / würde"],
    correct: "hätte / hätte",
    hint: "Past unreal conditional (Konjunktiv II Perfekt)",
    explanation: "For unreal past: hätte + past participle in both clauses (or würde + haben in the result). Critical for discussing past mistakes or alternative career paths.",
    topic: "Vergangenheit & Bedingungen",
    cefr: "C1",
  },
  {
    q: "Die Studierenden, ___ die Vorlesung besucht hatten, bestanden die Klausur.",
    en: "The students who had attended the lecture passed the exam.",
    options: ["die", "deren", "denen", "welche"],
    correct: "die",
    hint: "Relative pronoun nominative plural (subject of relative clause)",
    explanation: "When the relative pronoun is the subject of the clause, use nominative form (die for plural). Common when describing groups in professional or academic contexts.",
    topic: "Relativsätze",
    cefr: "B1",
  },
  // Additional high-value items for commercial depth
  {
    q: "Die Bewerbung ___ (müssen / einreichen) werden, bevor die Frist abläuft.",
    en: "The application must be submitted before the deadline expires.",
    options: ["muss eingereicht", "müssen eingereicht", "muss einreichen", "müssen einreichen"],
    correct: "muss eingereicht",
    hint: "Modal passive: müssen + past participle + werden",
    explanation: "Typical Ausbildung / job language. Practice this pattern for emails, reports and instructions.",
    topic: "Bewerbung & Fristen",
    cefr: "B1",
  },
  {
    q: "Obwohl es schwierig war, ___ er die Ausbildung erfolgreich abgeschlossen.",
    en: "Although it was difficult, he successfully completed the training.",
    options: ["hat", "habe", "hätte", "wird"],
    correct: "hat",
    hint: "Obwohl + main clause in indicative (normal past)",
    explanation: "Obwohl introduces a concessive clause. Use normal indicative in the main clause. Very useful for describing challenges overcome during Ausbildung.",
    topic: "Konnektoren & Bericht",
    cefr: "B2",
  },
  // Additional from B1 model exercises (connectors, future in past, descriptions)
  {
    q: "Ich habe die Stelle bekommen, ___ ich gut vorbereitet war.",
    en: "I got the job because I was well prepared.",
    options: ["weil", "obwohl", "trotzdem", "sondern"],
    correct: "weil",
    hint: "Causal connector 'weil' (because)",
    explanation: "Use 'weil' for reasons. Common in job interviews and reports: explain why something happened or decision was made.",
    topic: "Konnektoren & Bericht",
    cefr: "B1",
  },
  {
    q: "Er sagte, er ___ (kommen) später zur Besprechung.",
    en: "He said he would come to the meeting later.",
    options: ["würde kommen", "wird kommen", "kam", "kommt"],
    correct: "würde kommen",
    hint: "Reported speech / Konjunktiv I or II for future in past",
    explanation: "In professional reported speech (e.g. meeting notes): use 'würde + infinitive' for future from past perspective.",
    topic: "Bericht & Kommunikation",
    cefr: "B2",
  },
  {
    q: "Die Maschine, ___ in der Werkstatt steht, muss repariert werden.",
    en: "The machine that is standing in the workshop must be repaired.",
    options: ["die", "der", "dem", "das"],
    correct: "die",
    hint: "Relative pronoun nominative feminine (die Maschine)",
    explanation: "Relative pronouns must match gender/number of antecedent. Practice for technical descriptions in Ausbildung (machines, processes).",
    topic: "Relativsätze & Technik",
    cefr: "B1",
  },
  {
    q: "Trotz des Regens ___ wir pünktlich auf der Baustelle angekommen.",
    en: "Despite the rain, we arrived on the construction site on time.",
    options: ["sind", "ist", "waren", "war"],
    correct: "sind",
    hint: "Trotz + genitive or trotz + noun, main clause normal",
    explanation: "'Trotz' for despite. Useful for describing overcoming obstacles in work reports or daily Ausbildung life.",
    topic: "Konnektoren & Bericht",
    cefr: "B2",
  },
];

// Backwards-compatible export for existing quiz components
export const grammarQuestions = grammar.map((g) => ({
  q: g.q,
  en: g.en,
  options: g.options,
  correct: g.correct,
  hint: g.hint,
  explanation: g.explanation,
  topic: g.topic,
  cefr: g.cefr,
}));

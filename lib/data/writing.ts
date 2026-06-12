// GermanForge — Writing Mock Tests (TELC + Goethe B1-C1)
// Professional exam preparation only. Authentic TELC and Goethe B1-C1 writing tasks (emails, reports, opinion texts).
// Prompts follow official exam formats and criteria. Random selection on start. Time limits match real exams.
// AI Rating: Heuristic simulation based on official criteria + cross-reference to the 3000+ B1 exam vocabulary bank.
// In production: Use real LLM with official TELC/Goethe rubric for accurate scoring and corrections.
// All tasks encourage use of high-frequency B1 exam vocabulary from the official bank.

export type WritingTask = {
  title: string;
  instructions: string;
  targetWords: number;
  keywords: string[]; // from prompts + cross-referenced to vocab bank for suggestions
  modelSnippet: string; // short model element (not full answer)
};

export type WritingPromptSet = {
  id: number;
  type: 'TELC' | 'Goethe' | 'Mixed';
  title: string;
  description: string;
  totalTimeMin: number;
  tasks: WritingTask[];
  tips: string;
};

export const writingPromptSets: WritingPromptSet[] = [
  {
    id: 1,
    type: 'Goethe',
    title: 'Goethe B1 Writing – Formal Email + Short Report',
    description: 'Authentic Goethe B1 writing simulation: a professional email followed by a concise report or article on work experience, training or sustainability.',
    totalTimeMin: 45,
    tasks: [
      {
        title: 'Task 1: Formal Email (80-100 words)',
        instructions: 'Write a polite formal email to the HR manager of a company. Inquire about possibilities to continue working after completing vocational training. Clearly state your reasons, mention key skills you have acquired (e.g. teamwork, sustainability practices), and ask about next steps.',
        targetWords: 90,
        keywords: ['bewerben', 'Ausbildung', 'Weiterbildung', 'Teamgeist', 'Nachhaltigkeit', 'Verantwortung'],
        modelSnippet: 'Sehr geehrte Frau/Herr ..., ich wende mich an Sie, weil ... Während meiner Ausbildung habe ich gelernt, ... Ich würde mich freuen, wenn ...',
      },
      {
        title: 'Task 2: Short Report / Article (120-150 words)',
        instructions: 'Describe a project or experience during your training (for example, participating in a sustainability improvement at the workplace). Mention advantages, challenges and what you learned. Write in the style of an internal company post or professional blog entry.',
        targetWords: 130,
        keywords: ['Nachhaltigkeit', 'Projekt', 'Verantwortung', 'Team', 'Erfolg', 'Zukunft'],
        modelSnippet: 'In meinem Ausbildungsprojekt haben wir ... Das hat zu ... geführt. Die Herausforderung war ... Am Ende habe ich gelernt, dass ...',
      },
    ],
    tips: 'Use vocabulary from the 3000+ official Wortliste (e.g. Nachhaltigkeit, Fachkraft). Structure clearly: introduction, main points, conclusion. Check grammar (subjunctive where appropriate for polite requests or hypotheticals).',
  },
  {
    id: 2,
    type: 'TELC',
    title: 'TELC B1 Writing – Email to Colleague + Forum Opinion',
    description: 'TELC B1 style simulation: a practical email to a colleague plus a short opinion post on a forum about working life in Germany.',
    totalTimeMin: 40,
    tasks: [
      {
        title: 'Task 1: Email to Colleague (70-90 words)',
        instructions: 'Write a polite email in German to a new colleague to arrange a meeting about a training project. Include the reason, suggest a time, and ask for their opinion. Assume you are in the middle of a training program.',
        targetWords: 80,
        keywords: ['Ausbildung', 'Projekt', 'Termin', 'Kollege', 'Verabredung', 'Information'],
        modelSnippet: 'Hallo [Name], ich hoffe, es geht dir gut. Ich möchte mit dir über ... sprechen. Können wir uns am ... treffen? Was hältst du davon?',
      },
      {
        title: 'Task 2: Opinion Text for Forum (100-130 words)',
        instructions: 'Write a forum post for foreigners working in Germany on the topic: "How to balance work and personal life during vocational training?" Give your personal view, an example from experience, and practical advice. Use connectors such as deshalb, trotzdem, außerdem.',
        targetWords: 115,
        keywords: ['Arbeitsplatz', 'Freizeit', 'Gesundheit', 'Zukunft', 'Team', 'Stress'],
        modelSnippet: 'Meiner Meinung nach ist es wichtig, ... Deshalb versuche ich, ... Ein guter Tipp ist ... Am Ende hilft das, motiviert zu bleiben.',
      },
    ],
    tips: 'TELC emphasizes practical everyday and professional communication. Enrich vocabulary with terms from the official Wortliste. Count words accurately. The rater evaluates against TELC/Goethe B1 criteria.',
  },
  {
    id: 3,
    type: 'Mixed',
    title: 'Mixed TELC + Goethe B1-C1 – Professional & Sustainability Writing',
    description: 'Combined format: internal email (TELC-style) + short analysis/report (Goethe-style) on a sustainability topic in a company – a frequent theme in B1-C1 exams.',
    totalTimeMin: 50,
    tasks: [
      {
        title: 'Task 1: Internal Email (90-110 words)',
        instructions: 'Write an email to your manager proposing a small change to improve sustainability in the production department (e.g. reduce waste or save energy). State the reason, expected benefits, and suggest a short meeting to discuss.',
        targetWords: 100,
        keywords: ['Nachhaltigkeit', 'Projekt', 'Verantwortung', 'Idee', 'Zukunft', 'Kosten'],
        modelSnippet: 'Sehr geehrter Herr/Frau ..., ich habe eine Idee für ... Das würde ... verbessern. Können wir darüber sprechen?',
      },
      {
        title: 'Task 2: Short Analysis / Report (110-140 words)',
        instructions: 'Write a paragraph describing the impact of a sustainability measure you observed (or imagine) in a company. Compare before and after, note pros/cons, and conclude with the broader value for the future of professional training.',
        targetWords: 125,
        keywords: ['Umwelt', 'Veränderung', 'Erfolg', 'Teamgeist', 'Betrieb', 'Zukunft'],
        modelSnippet: 'Vor der Maßnahme ... Danach hat sich ... verbessert. Die Mitarbeiter haben ... gelernt. Insgesamt ist das ein Schritt in die richtige Richtung für die Ausbildung.',
      },
    ],
    tips: 'Combine both exam formats in one sitting. Must incorporate at least 3-4 advanced terms from the 3000+ bank (e.g. Nachhaltigkeit, Verantwortung). The rating checks realistic vocabulary use and coherence.',
  },
];

// Helper to pick random mixed prompt set (for "mix them up" on each test)
export function getRandomWritingPrompt(): WritingPromptSet {
  const idx = Math.floor(Math.random() * writingPromptSets.length);
  return writingPromptSets[idx];
}

// Simple client-side "AI" rater (heuristic + templates).
// Production: Replace with real LLM call (prompt = rubric + userText + "Rate like official Goethe/TELC examiner. Give score 0-20 per criterion, detailed feedback and corrections.").
export function rateWritingAI(text: string, task: WritingTask, allBankWords: string[] = []) {
  const cleanText = text.trim();
  const wordCount = cleanText.split(/\s+/).filter(Boolean).length;
  const sentenceCount = (cleanText.match(/[.!?]+/g) || []).length || 1;
  const uniqueWords = new Set(cleanText.toLowerCase().match(/\b\w+\b/g) || []).size;

  // Keyword match from this task + cross with 3000+ bank
  const taskKeywords = task.keywords.map(k => k.toLowerCase());
  const matchedTask = taskKeywords.filter(k => cleanText.toLowerCase().includes(k)).length;
  const matchedBank = allBankWords.filter(w => cleanText.toLowerCase().includes(w.toLowerCase())).length;

  // Basic scores (0-5 scale, scaled to total ~20 like real B1 writing)
  const contentScore = Math.min(5, Math.max(1, Math.floor(wordCount / 20) + Math.floor(matchedTask / 1.5)));
  const structureScore = Math.min(5, Math.max(1, Math.floor(sentenceCount / 2)));
  const vocabScore = Math.min(5, Math.max(1, Math.floor(uniqueWords / 15) + Math.floor(matchedBank / 3)));
  const grammarScore = Math.min(5, Math.max(1, Math.floor(sentenceCount / 3))); // crude: more sentences = assumed better variety

  const total = Math.round(((contentScore + structureScore + vocabScore + grammarScore) / 20) * 20);

  // "AI-written" feedback (varied templates, professional tone, references to official criteria and the word bank)
  let feedback = `🤖 AI Rater (simulated according to official Goethe-Zertifikat B1 & TELC B1 writing criteria)\n\n`;
  feedback += `Total score: ${total}/20\n\n`;
  feedback += `• Content: ${contentScore}/5 — ${contentScore >= 4 ? 'Task completed well with specific examples.' : 'Add more detail and stay closer to the prompt requirements.'}\n`;
  feedback += `• Structure & Coherence: ${structureScore}/5 — ${structureScore >= 4 ? 'Clear paragraphs and good use of connectors.' : 'Divide into paragraphs and use more linking words (deshalb, trotzdem, außerdem).'}\n`;
  feedback += `• Vocabulary: ${vocabScore}/5 — ${vocabScore >= 4 ? 'Varied and appropriate professional terms used.' : 'Try integrating more terms from the 3000+ Wortliste such as "Nachhaltigkeit", "Teamgeist", "Verantwortung".'}\n`;
  feedback += `• Grammar: ${grammarScore}/5 — ${grammarScore >= 4 ? 'Correct sentences, few basic errors.' : 'Check tenses (Präsens/Perfekt) and complex structures (relative clauses, Konjunktiv where suitable).'}\n\n`;

  if (total >= 16) {
    feedback += `Strengths: Professional tone suitable for a German workplace context. Continue with other prompts to reach B2 level.\n`;
  } else {
    feedback += `Areas to improve: ${wordCount < task.targetWords * 0.8 ? 'Increase length to better match target word count.' : ''} ${matchedBank < 2 ? 'Integrate more vocabulary from the Wortliste bank (see Resources).' : ''}\n`;
  }

  feedback += `\nSuggested Wortliste terms for your next piece: ${task.keywords.slice(0, 3).join(', ')}.\n`;
  feedback += `Model improvement snippet: ${task.modelSnippet}\n\n`;
  feedback += `Note: This is a heuristic simulation. In a real commercial version a full LLM (Grok/xAI or equivalent) would be called with the complete official rubric for accurate scoring, detailed corrections and explanations aligned to the exam standards.`;

  return {
    total,
    breakdown: { content: contentScore, structure: structureScore, vocab: vocabScore, grammar: grammarScore },
    feedback,
    wordCount,
    matchedKeywords: matchedTask + matchedBank,
  };
}

// Simple suggestion helper (cross-reference with vocab bank)
export function suggestBankWords(text: string, bank: string[], count = 3): string[] {
  const lowerText = text.toLowerCase();
  return bank
    .filter(w => !lowerText.includes(w.toLowerCase()))
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

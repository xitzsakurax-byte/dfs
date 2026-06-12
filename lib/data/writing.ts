// GermanForge — Writing Mock Tests (TELC + Goethe B1-C1)
// This is part of the "database" for language learning, focused on professional/Ausbildung writing.
// Sources: Inspired by official Goethe-Zertifikat B1 and TELC B1 Schreiben tasks (emails, reports, opinions).
// Prompts are mixed (random selection on start). Real exams have time limits (~30-45 min total for 2 tasks) and specific criteria.
// AI Rating: Client-side simulation (word count, keyword match from prompt + 3000+ Wortliste bank, sentence variety, coherence heuristics).
// In production: Call real LLM (e.g. Grok/xAI API or OpenAI) with the prompt + user text + official rubric for accurate scoring + corrections.
// Criteria aligned with Goethe/TELC B1: Content (task fulfilment), Structure/Coherence, Vocabulary (range + accuracy), Grammar (range + accuracy).
// Each prompt encourages use of words from the full 3000+ bank (see resources + vocab data).
// "Mix them up": Random prompt pair (TELC-style or Goethe-style) on each test start. Multiple variants for replayability.

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
    title: 'Goethe B1 Schreiben – Email + Bericht (Ausbildung)',
    description: 'Mô phỏng bài thi viết Goethe B1: Email chuyên nghiệp + bài báo cáo ngắn về trải nghiệm đào tạo nghề.',
    totalTimeMin: 45,
    tasks: [
      {
        title: 'Task 1: Formal Email (80-100 từ)',
        instructions: 'Bạn là học viên Ausbildung. Viết email cho người phụ trách nhân sự (HR) của công ty để hỏi về cơ hội tiếp tục làm việc sau khi hoàn thành Ausbildung. Sử dụng ngôn ngữ lịch sự, nêu rõ lý do và hỏi về các bước tiếp theo. Đề cập đến kỹ năng bạn đã học (ví dụ: làm việc nhóm, bền vững).',
        targetWords: 90,
        keywords: ['bewerben', 'Ausbildung', 'Weiterbildung', 'Teamgeist', 'Nachhaltigkeit', 'Verantwortung'],
        modelSnippet: 'Sehr geehrte Frau/Herr ..., ich wende mich an Sie, weil ... Während meiner Ausbildung habe ich gelernt, ... Ich würde mich freuen, wenn ...',
      },
      {
        title: 'Task 2: Short Report / Article (120-150 từ)',
        instructions: 'Dựa trên các điểm gợi ý: Mô tả một dự án hoặc trải nghiệm trong Ausbildung của bạn (ví dụ: tham gia cải thiện quy trình bền vững tại nơi làm việc). Nêu ưu điểm, thách thức và bài học. Viết như bài đăng trên nội bộ công ty hoặc blog nghề nghiệp.',
        targetWords: 130,
        keywords: ['Nachhaltigkeit', 'Projekt', 'Verantwortung', 'Team', 'Erfolg', 'Zukunft'],
        modelSnippet: 'In meinem Ausbildungsprojekt haben wir ... Das hat zu ... geführt. Die Herausforderung war ... Am Ende habe ich gelernt, dass ...',
      },
    ],
    tips: 'Sử dụng từ vựng từ ngân hàng 3000+ Wortliste (ví dụ: Nachhaltigkeit, Fachkraft). Cấu trúc rõ ràng: mở đầu - nội dung - kết luận. Kiểm tra ngữ pháp (Konjunktiv nếu cần).',
  },
  {
    id: 2,
    type: 'TELC',
    title: 'TELC B1 Schreiben – Email + Forum Post (Beruf & Alltag)',
    description: 'Mô phỏng TELC B1: Email cho đồng nghiệp + bài viết ý kiến trên diễn đàn về cuộc sống làm việc tại Đức (phù hợp người chuẩn bị Ausbildung).',
    totalTimeMin: 40,
    tasks: [
      {
        title: 'Task 1: Email to Colleague (70-90 từ)',
        instructions: 'Viết email cho đồng nghiệp mới (bằng tiếng Đức lịch sự) để sắp xếp lịch họp về dự án đào tạo nghề. Đề cập đến lý do, thời gian đề xuất và hỏi ý kiến. Giả sử bạn đang ở giai đoạn giữa Ausbildung.',
        targetWords: 80,
        keywords: ['Ausbildung', 'Projekt', 'Termin', 'Kollege', 'Verabredung', 'Information'],
        modelSnippet: 'Hallo [Name], ich hoffe, es geht dir gut. Ich möchte mit dir über ... sprechen. Können wir uns am ... treffen? Was hältst du davon?',
      },
      {
        title: 'Task 2: Opinion Text for Forum (100-130 từ)',
        instructions: 'Viết bài đăng trên diễn đàn dành cho người nước ngoài làm việc tại Đức: "Làm thế nào để cân bằng công việc và cuộc sống trong Ausbildung?" Nêu ý kiến cá nhân, ví dụ từ trải nghiệm, và lời khuyên. Sử dụng connectors (deshalb, trotzdem, außerdem).',
        targetWords: 115,
        keywords: ['Arbeitsplatz', 'Freizeit', 'Gesundheit', 'Zukunft', 'Team', 'Stress'],
        modelSnippet: 'Meiner Meinung nach ist es wichtig, ... Deshalb versuche ich, ... Ein guter Tipp ist ... Am Ende hilft das, motiviert zu bleiben.',
      },
    ],
    tips: 'TELC chú trọng giao tiếp thực tế. Sử dụng từ ngân hàng Wortliste để làm phong phú từ vựng. Đếm từ chính xác. AI sẽ đánh giá theo tiêu chí TELC/Goethe B1.',
  },
  {
    id: 3,
    type: 'Mixed',
    title: 'Mixed TELC + Goethe B1-C1 – Professional Writing (Sustainability Focus)',
    description: 'Kết hợp: Email nội bộ (TELC-style) + bài phân tích ngắn (Goethe-style) về chủ đề bền vững trong doanh nghiệp – rất phổ biến trong Ausbildung kỹ thuật/môi trường.',
    totalTimeMin: 50,
    tasks: [
      {
        title: 'Task 1: Internal Email (90-110 từ)',
        instructions: 'Bạn là Ausbildung ở bộ phận sản xuất. Viết email cho quản lý đề xuất một thay đổi nhỏ để tăng tính bền vững (ví dụ: giảm rác thải, tiết kiệm năng lượng). Nêu lý do, lợi ích và đề nghị họp.',
        targetWords: 100,
        keywords: ['Nachhaltigkeit', 'Projekt', 'Verantwortung', 'Idee', 'Zukunft', 'Kosten'],
        modelSnippet: 'Sehr geehrter Herr/Frau ..., ich habe eine Idee für ... Das würde ... verbessern. Können wir darüber sprechen?',
      },
      {
        title: 'Task 2: Short Analysis / Report (110-140 từ)',
        instructions: 'Viết đoạn văn mô tả tác động của một biện pháp bền vững mà bạn quan sát được trong công ty (hoặc giả định). So sánh trước/sau, nêu ưu/nhược, và kết luận cho tương lai Ausbildung.',
        targetWords: 125,
        keywords: ['Umwelt', 'Veränderung', 'Erfolg', 'Teamgeist', 'Betrieb', 'Zukunft'],
        modelSnippet: 'Vor der Maßnahme ... Danach hat sich ... verbessert. Die Mitarbeiter haben ... gelernt. Insgesamt ist das ein Schritt in die richtige Richtung für die Ausbildung.',
      },
    ],
    tips: 'Kết hợp hai định dạng thi. Sử dụng từ vựng chuyên sâu từ 3000+ bank (bắt buộc đề cập ít nhất 3-4 từ như Nachhaltigkeit, Verantwortung). AI rating sẽ kiểm tra việc sử dụng từ vựng thực tế.',
  },
];

// Helper to pick random mixed prompt set (for "mix them up" on each test)
export function getRandomWritingPrompt(): WritingPromptSet {
  const idx = Math.floor(Math.random() * writingPromptSets.length);
  return writingPromptSets[idx];
}

// Simple client-side "AI" rater (heuristic + templates).
// Production: Replace with real LLM call (prompt = rubric + userText + "Rate like official Goethe/TELC examiner. Give score 0-20 per criterion, detailed feedback in German + Vietnamese if needed, corrections.").
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
  let feedback = `🤖 AI Rater (mô phỏng theo tiêu chí chính thức Goethe-Zertifikat B1 & TELC B1 Schreiben)\n\n`;
  feedback += `Điểm tổng: ${total}/20\n\n`;
  feedback += `• Nội dung (Content): ${contentScore}/5 — ${contentScore >= 4 ? 'Hoàn thành tốt nhiệm vụ, có ví dụ cụ thể.' : 'Cần chi tiết hơn hoặc bám sát yêu cầu prompt.'}\n`;
  feedback += `• Cấu trúc & Liên kết (Structure/Coherence): ${structureScore}/5 — ${structureScore >= 4 ? 'Đoạn văn rõ ràng, dùng connectors tốt.' : 'Nên chia đoạn và dùng từ nối nhiều hơn (deshalb, trotzdem, außerdem).'}\n`;
  feedback += `• Từ vựng (Vocabulary): ${vocabScore}/5 — ${vocabScore >= 4 ? 'Đa dạng, dùng được từ chuyên ngành Ausbildung.' : 'Hãy thử dùng thêm từ từ ngân hàng 3000+ Wortliste như "Nachhaltigkeit", "Teamgeist", "Verantwortung".'}\n`;
  feedback += `• Ngữ pháp (Grammar): ${grammarScore}/5 — ${grammarScore >= 4 ? 'Câu đúng, ít lỗi cơ bản.' : 'Kiểm tra thì (Präsens/Perfekt) và cấu trúc phức (Relativsätze, Konjunktiv nếu phù hợp).'}\n\n`;

  if (total >= 16) {
    feedback += `Điểm mạnh: Bài viết chuyên nghiệp, phù hợp môi trường làm việc Đức. Tiếp tục luyện với các prompt khác để đạt B2.\n`;
  } else {
    feedback += `Điểm cần cải thiện: ${wordCount < task.targetWords * 0.8 ? 'Tăng độ dài (nhắm đúng target words).' : ''} ${matchedBank < 2 ? 'Tích hợp thêm từ vựng từ ngân hàng Wortliste (xem Resources).' : ''}\n`;
  }

  feedback += `\nGợi ý từ ngân hàng 3000+ (dùng trong bài sau): ${task.keywords.slice(0, 3).join(', ')}.\n`;
  feedback += `Phiên bản gợi ý cải tiến (mẫu): ${task.modelSnippet}\n\n`;
  feedback += `Lưu ý: Đây là mô phỏng AI (heuristic + template). Trong môi trường thương mại thực tế sẽ gọi LLM (Grok/xAI hoặc tương đương) với rubric đầy đủ để chấm điểm chính xác + sửa chi tiết + giải thích theo tiêu chuẩn thi.`;

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

// EyOS-Academy/src/app/lessons/grammar/lessonData.ts

export interface Story {
  id: number;
  title: string;
  content: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  amharicHint: string;
  options: string[];
  correctAnswer: number;
}

// 50+ የንባብ ታሪኮችን በDynamic መንገድ የሚያመነጭ
export const readingStories: Story[] = Array.from({ length: 52 }, (_, i) => ({
  id: i + 1,
  title: `Story ${i + 1}: Professional Operations Hub`,
  content: `This is training story module ${i + 1}. The team operates efficiently every single shift. An airport ground support specialist tracks modern cargo manifests carefully. Meanwhile, a dedicated software engineer designs advanced database schemas using Supabase and writes clean code entirely on a mobile phone. They deploy the web interfaces to Vercel to build the modern EyOS learning environment.`
}));

// 50+ ባለብዙ-ደረጃ የኩዊዝ ጥያቄዎችን የሚያመነጭ
export const quizQuestions: QuizQuestion[] = Array.from({ length: 52 }, (_, i) => {
  const qNum = i + 1;
  if (qNum % 3 === 1) {
    return {
      id: qNum,
      question: `${qNum}. Where does the developer host and deploy live web interfaces?`,
      amharicHint: `ጥያቄ ${qNum}፦ ሶፍትዌር አውጪው የቀጥታ ድረ-ገጾችን የት ነው የሚያስተናግደው እና የሚጭነው?`,
      options: ["On local phone storage", "On Vercel cloud hosting", "Inside the Supabase database router"],
      correctAnswer: 1
    };
  } else if (qNum % 3 === 2) {
    return {
      id: qNum,
      question: `${qNum}. Which Present Simple sentence is grammatically correct for professional routines?`,
      amharicHint: `ጥያቄ ${qNum}፦ የትኛው የአሁኑ ጊዜ (Present Simple) አረፍተ ነገር በሰዋስው ትክክል ነው?`,
      options: ["He am writing typescript code.", "He is writing typescript code.", "He are writing typescript code."],
      correctAnswer: 1
    };
  } else {
    return {
      id: qNum,
      question: `${qNum}. Complete the operational phrase: 'They ____ the cargo aircraft safely every morning.'`,
      amharicHint: `ጥያቄ ${qNum}፦ ክፍት ቦታውን በትክክለኛው ግሥ ይሙሉ፡ 'እነሱ በየማለዳው የጭነት አውሮፕላኑን በደህና ያዘጋጃሉ።'`,
      options: ["handles", "handle", "handling"],
      correctAnswer: 1
    };
  }
});

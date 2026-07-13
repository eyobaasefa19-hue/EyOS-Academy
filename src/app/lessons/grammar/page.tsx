"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
// 🛠️ ከ lessonData.ts ላይ መረጃዎቹን አስመጣን
import { readingStories, lessonModules } from "./lessonData";

const staticLessonData = {
  id: "l1",
  title: "Lesson 01: Master The Present Simple",
  cefrLevel: "A1",
  category: "Grammar & Practical",
  xpReward: 150, 
  amharicOverview: "የአሁኑን ጊዜ (Present Simple) ዘወትር ለምናደርጋቸው ድርጊቶች፣ ልማዶች፣ የዕለት ተዕለት ውሎዎች እና ሁልጊዜም እውነት ለሆኑ እውነታዎች ለመግለፅ እንጠቀምበታለን።",
  englishOverview: "We use the Present Simple to talk about habits, permanent situations, daily routines, and general facts.",
  
  grammar: {
    title: "Verb 'To Be' & Sentence Structure",
    rules: [
      { subject: "I", verb: "am", amharic: "እኔ ነኝ", example: "I am an airport ground handler." },
      { subject: "He/She/It", verb: "is", amharic: "እሱ/እሷ/እሱ ነው", example: "She is fluent in English communications." },
      { subject: "We/You/They", verb: "are", amharic: "እኛ/እናንተ/እነሱ ናቸው", example: "They are ready for the cargo aircraft loading." }
    ],
    commonMistake: "❌ Don't say: 'He am working at the terminal.' \n✅ Say: 'He is working at the terminal.'\n\n❌ Don't say: 'They works everyday.'\n✅ Say: 'They work everyday.'"
  },

  vocabulary: [
    { word: "Explore", type: "Verb", amharic: "አዲስ ነገርን ማወቅ/መረመር", pronunciation: "/ɪkˈsplɔːr/", example: "I explore new frameworks on my phone." },
    { word: "Essential", type: "Adjective", amharic: "በጣም አስፈላጊ/ግዴታ የሆነ", pronunciation: "/ɪˈsen.ʃəl/", example: "English is essential for aviation logistics." },
    { word: "Aviation", type: "Noun", amharic: "የአቪዬሽን/የበረራ ሳይንስ እና ኢንዱስትሪ", pronunciation: "/ˌeɪ.viˈeɪ.ʃən/", example: "He studies aviation operations." },
    { word: "Cargo", type: "Noun", amharic: "በአውሮፕላን የሚጓጓዝ ጭነት/ዕቃ", pronunciation: "/ˈkɑːr.ɡoʊ/", example: "The team updates the cargo manifest." },
    { word: "Manifest", type: "Noun", amharic: "የጭነት ዕቃዎች ዝርዝር ሰነድ", pronunciation: "/ˈmæn.ɪ.fest/", example: "Check the weight on the cargo manifest." },
    { word: "Deploy", type: "Verb", amharic: "የተሰራን ሶፍትዌር ለተጠቃሚ ክፍት ማድረግ", pronunciation: "/dɪˈplɔɪ/", example: "We deploy the application using Vercel." }
  ],

  conversations: [
    { role: "Airport Agent", text: "Good morning! Can I see your passport and ticket, please?", translation: "እንደምን አደሩ! እባክዎን ፓስፖርትዎን እና ቲኬትዎን ላይም እችላለሁ?" },
    { role: "Passenger (You)", text: "Sure, here they are. I am flying to Washington, D.C.", translation: "እንዴታ፣ ይኸውልዎት። ወደ ዋሽንግተን ዲሲ እየበረርኩ ነው።" }
  ]
};

export default function AdvancedLessonDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "grammar" | "vocabulary" | "reading" | "speaking" | "quiz">("overview");
  const [streak, setStreak] = useState(5); 
  const [userXp, setUserXp] = useState(330); 
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // አጭር ማጣቀሻ ለጥያቄዎች
  const questions = lessonModules[0].questions;

  const tabContainerRef = useRef<HTMLDivElement>(null);

  const triggerHaptic = (duration = 40) => {
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate(duration);
    }
  };

  const handleQuizAnswer = () => {
    triggerHaptic(60); 
    if (selectedQuizOption === questions[currentQuestionIndex].correctAnswer) {
      setScore((prev) => prev + 1);
      setUserXp((prev) => prev + 10); 
    }
    setQuizSubmitted(true);
  };

  const handleNextQuestion = () => {
    triggerHaptic(40);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      setUserXp((prev) => prev + staticLessonData.xpReward);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="min-h-screen bg-[#0b101d] text-slate-100 flex flex-col font-sans select-none">
      
      {/* NAVBAR */}
      <div className="sticky top-0 z-50 bg-[#121b2e]/90 backdrop-blur-md border-b border-slate-800/80 px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">EyOS</span>
          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
            {staticLessonData.cefrLevel} Level
          </span>
        </div>
        
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1 text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-lg border border-amber-500/20 text-[11px] font-bold">
            🔥 <span>{streak}d</span>
          </div>
          <div className="flex items-center gap-1 text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-lg border border-cyan-400/20 text-[11px] font-bold">
            ⚡ <span>{userXp}</span>
          </div>
        </div>
      </div>

      {/* CORE CONTENT FRAME */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 space-y-5 pb-24">
        
        <div className="bg-gradient-to-br from-[#16223f] to-[#121b2e] rounded-2xl p-5 border border-slate-800 shadow-xl">
          <span className="text-[10px] font-black tracking-widest text-blue-400 uppercase">{staticLessonData.category}</span>
          <h1 className="text-xl md:text-2xl font-extrabold text-white mt-0.5">{staticLessonData.title}</h1>
        </div>

        {/* TAB CONTROLS */}
        <div className="relative border-b border-slate-800/40">
          <div ref={tabContainerRef} className="flex items-center gap-1.5 overflow-x-auto pb-2 px-2 scrollbar-none snap-x">
            {(["overview", "grammar", "vocabulary", "reading", "speaking", "quiz"] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => { triggerHaptic(20); setActiveTab(tab); }}
                  className={`px-4 py-2 text-xs font-extrabold rounded-xl capitalize transition-all whitespace-nowrap border ${
                    isActive 
                      ? "bg-purple-600 text-white border-purple-500 scale-105 shadow-lg" 
                      : "bg-[#121b2e] text-slate-400 border-slate-800/60 hover:bg-slate-800/50"
                  }`}
                >
                  {tab === "overview" ? "📑 Overview" : tab === "grammar" ? "📝 Grammar" : tab === "vocabulary" ? "🧠 Words" : tab === "reading" ? `📖 Reading (${readingStories.length})` : tab === "speaking" ? "🗣️ AI Speak" : `🎯 Quiz (${questions.length})`}
                </button>
              );
            })}
          </div>
        </div>

        {/* DYNAMIC TAB VIEW */}
        <div className="mt-2">
          
          {/* TAB 6: QUIZ */}
          {activeTab === "quiz" && (
            <div className="bg-[#121b2e] p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="text-base font-bold text-white">Lesson Assessment</h3>
                <span className="text-[10px] bg-purple-900/50 text-purple-300 font-mono px-2 py-0.5 rounded border border-purple-700/30">
                  {!quizFinished ? `Question ${currentQuestionIndex + 1} of ${questions.length}` : "Finished"}
                </span>
              </div>

              {!quizFinished ? (
                <>
                  <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                    <div 
                      className="bg-purple-500 h-full transition-all duration-300"
                      style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>

                  <div className="pt-2">
                    <p className="text-slate-200 font-semibold text-xs md:text-sm">
                      {questions[currentQuestionIndex].question}
                    </p>
                    {questions[currentQuestionIndex].amharicHint && (
                      <span className="text-[11px] text-slate-500 font-light block mt-1 bg-slate-900/30 p-2 rounded-lg border border-slate-800/40 italic">
                        💡 ትርጉም፦ {questions[currentQuestionIndex].amharicHint}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    {questions[currentQuestionIndex].options.map((option, index) => (
                      <button
                        key={index}
                        disabled={quizSubmitted}
                        onClick={() => { triggerHaptic(30); setSelectedQuizOption(index); }}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all ${
                          quizSubmitted
                            ? index === questions[currentQuestionIndex].correctAnswer
                              ? "bg-green-950/40 border-green-500 text-green-300"
                              : selectedQuizOption === index
                              ? "bg-red-950/40 border-red-500 text-red-300"
                              : "bg-slate-900/20 border-slate-800 text-slate-500"
                            : selectedQuizOption === index
                            ? "bg-purple-950/40 border-purple-500 text-purple-300 font-semibold"
                            : "bg-slate-900/50 border-slate-800 text-slate-300"
                        }`}
                      >
                        {String.fromCharCode(65 + index)}. {option}
                      </button>
                    ))}
                  </div>

                  {!quizSubmitted ? (
                    <button
                      disabled={selectedQuizOption === null}
                      onClick={handleQuizAnswer}
                      className="w-full mt-2 py-3 bg-purple-600 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed font-bold text-xs rounded-xl text-white transition"
                    >
                      መልስህን አስረክብ
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="w-full mt-2 py-3 bg-emerald-600 font-bold text-xs rounded-xl text-white transition"
                    >
                      {currentQuestionIndex < questions.length - 1 ? "ቀጣይ ጥያቄ ▶" : "ውጤትህን እይ ▶"}
                    </button>
                  )}
                </>
              ) : (
                <div className="p-5 bg-slate-900/80 rounded-xl border border-slate-800 text-center space-y-4">
                  <h4 className="text-lg font-bold text-emerald-400">🎉 አጠናቀሃል!</h4>
                  <div className="text-3xl font-black text-emerald-400">{score} / {questions.length}</div>
                  <button onClick={restartQuiz} className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs">ድጋሚ ፈትን</button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

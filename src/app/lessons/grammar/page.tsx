"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
// 🛠️ ከ lessonData.ts ላይ መረጃዎቹን አስመጣን
import { readingStories, quizQuestions } from "./lessonData";

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

  const tabContainerRef = useRef<HTMLDivElement>(null);

  const triggerHaptic = (duration = 40) => {
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate(duration);
    }
  };

  const handleQuizAnswer = () => {
    triggerHaptic(60); 
    if (selectedQuizOption === quizQuestions[currentQuestionIndex].correctAnswer) {
      setScore((prev) => prev + 1);
      setUserXp((prev) => prev + 10); 
    }
    setQuizSubmitted(true);
  };

  const handleNextQuestion = () => {
    triggerHaptic(40);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    if (currentQuestionIndex < quizQuestions.length - 1) {
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

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 space-y-5 pb-24">
        
        <div className="bg-gradient-to-br from-[#16223f] to-[#121b2e] rounded-2xl p-5 border border-slate-800 shadow-xl">
          <h1 className="text-xl md:text-2xl font-extrabold text-white mt-0.5">{staticLessonData.title}</h1>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 px-2">
          {(["overview", "grammar", "vocabulary", "reading", "speaking", "quiz"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => { triggerHaptic(20); setActiveTab(tab); }}
              className={`px-4 py-2 text-xs font-extrabold rounded-xl capitalize ${activeTab === tab ? "bg-purple-600 text-white" : "bg-[#121b2e] text-slate-400"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* QUIZ TAB - ማስተካከያው እዚህ ላይ ነው */}
        {activeTab === "quiz" && (
          <div className="bg-[#121b2e] p-5 rounded-2xl border border-slate-800 space-y-4">
            {!quizFinished ? (
              <>
                <p className="text-slate-200 font-semibold text-xs md:text-sm">{quizQuestions[currentQuestionIndex].question}</p>
                {quizQuestions[currentQuestionIndex].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedQuizOption(index)}
                    className={`w-full text-left p-3.5 rounded-xl border ${selectedQuizOption === index ? "bg-purple-900/50 border-purple-500" : "bg-slate-900 border-slate-800"}`}
                  >
                    {option}
                  </button>
                ))}
                {!quizSubmitted ? (
                  <button onClick={handleQuizAnswer} className="w-full py-3 bg-purple-600 rounded-xl text-xs font-bold text-white">Submit</button>
                ) : (
                  <button onClick={handleNextQuestion} className="w-full py-3 bg-emerald-600 rounded-xl text-xs font-bold text-white">Next</button>
                )}
              </>
            ) : (
              <div className="text-center p-5">
                <h4 className="text-lg font-bold">ውጤትህ: {score} / {quizQuestions.length}</h4>
                <button onClick={restartQuiz} className="mt-4 px-4 py-2 bg-slate-800 rounded-xl text-xs">ድጋሚ ሞክር</button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

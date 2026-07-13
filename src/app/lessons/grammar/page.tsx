"use client";

import React, { useState } from "react";

// 1. የትምህርቱ ሙሉ ዳታ (Mock Data structured for CEFR Standard)
const currentLessonData = {
  id: "l1",
  title: "Lesson 01: Master The Present Simple",
  cefrLevel: "A1",
  category: "Grammar & Practical",
  xpReward: 50,
  amharicOverview: "የአሁኑን ጊዜ (Present Simple) ድርጊቶችን፣ ልማዶችን እና እውነታዎችን ለመግለፅ እንጠቀምበታለን።",
  englishOverview: "We use the Present Simple to talk about habits, routines, permanent situations, and general truths.",
  
  grammar: {
    title: "Verb 'To Be' & Sentence Structure",
    rules: [
      { subject: "I", verb: "am", amharic: "እኔ ነኝ", example: "I am a software developer." },
      { subject: "He/She/It", verb: "is", amharic: "እሱ/እሷ/እሱ ነው", example: "She is fluent in English." },
      { subject: "We/You/They", verb: "are", amharic: "እኛ/እናንተ/እነሱ ናቸው", example: "They are ready for the airport logistics test." }
    ],
    commonMistake: "❌ Don't say: 'He am a pilot.' \n✅ Say: 'He is a pilot.'"
  },

  vocabulary: [
    { word: "Explore", type: "Verb", amharic: "አዲስ ነገርን ማወቅ/መረመር", pronunciation: "/ɪkˈsplɔːr/", example: "I want to explore new frameworks." },
    { word: "Essential", type: "Adjective", amharic: "በጣም አስፈላጊ/ግዴታ የሆነ", pronunciation: "/ɪˈsen.ʃəl/", example: "Learning idioms is essential for fluency." },
    { word: "Aviation", type: "Noun", amharic: "የአቪዬሽን/የአውሮፕላን በረራ ሳይንስ", pronunciation: "/ˌeɪ.viˈeɪ.ʃən/", example: "He wants to study aviation management." }
  ],

  reading: {
    title: "Short Story: The New Airport Operations",
    content: "Abebe started his new job at Addis Ababa Airport today. He is very excited to work with a great team. His task is to handle cargo and manage logistics. He wants to study Aviation Management in the future to grow his career. Everyone welcomed him warmly on his first day.",
    question: "What is Abebe's future career plan?",
    options: ["To become a pilot", "To study Aviation Management", "To open a shopping mall"],
    correctAnswer: 1
  },

  conversations: [
    { role: "Airport Agent", text: "Good morning! Can I see your passport and ticket, please?", translation: "እንደምን አደሩ! እባክዎን ፓስፖርትዎን እና ቲኬትዎን ላይም እችላለሁ?" },
    { role: "Passenger (You)", text: "Sure, here they are. I am flying to Washington, D.C.", translation: "እንዴታ፣ ይኸውልዎት። ወደ ዋሽንግተን ዲሲ እየበረርኩ ነው።" }
  ]
};

export default function AdvancedLessonDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "grammar" | "vocabulary" | "reading" | "speaking" | "quiz">("overview");
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [streak, setStreak] = useState(5); // Example User Streak State
  const [userXp, setUserXp] = useState(320); // Example User XP

  return (
    <div className="min-h-screen bg-[#0b101d] text-slate-100 flex flex-col font-sans">
      
      {/* --- TOP GAMIFICATION BAR --- */}
      <div className="sticky top-0 z-50 bg-[#121b2e] border-b border-slate-800 px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black tracking-wider text-purple-400">EyOS</span>
          <span className="bg-purple-900/60 text-purple-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-purple-700/50">
            {currentLessonData.cefrLevel} Level
          </span>
        </div>
        
        {/* Streak, XP and Level Status */}
        <div className="flex items-center gap-4 text-sm font-semibold">
          <div className="flex items-center gap-1 text-amber-500" title="Daily Streak">
            🔥 <span>{streak} Days</span>
          </div>
          <div className="flex items-center gap-1 text-cyan-400" title="Total Experience Points">
            ⚡ <span>{userXp} XP</span>
          </div>
          <div className="w-16 bg-slate-800 rounded-full h-2 overflow-hidden hidden md:block">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-full w-[65%]"></div>
          </div>
        </div>
      </div>

      {/* --- CORE CONTENT FRAME --- */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 space-y-6 pb-24">
        
        {/* Lesson General Header */}
        <div className="bg-gradient-to-br from-[#16223f] to-[#121b2e] rounded-2xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
          <span className="text-xs font-bold tracking-widest text-blue-400 uppercase">{currentLessonData.category}</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-1">{currentLessonData.title}</h1>
          <p className="text-slate-400 text-xs md:text-sm mt-2 font-light">Complete all tabs to earn +{currentLessonData.xpReward} XP</p>
        </div>

        {/* --- MOBILE FIRST SCROLLABLE TABS --- */}
        <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800/60">
          {(["overview", "grammar", "vocabulary", "reading", "speaking", "quiz"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-bold rounded-xl capitalize transition-all whitespace-nowrap ${
                activeTab === tab 
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20 scale-105" 
                  : "bg-[#121b2e] text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              }`}
            >
              {tab === "overview" ? "📑 Overview" : tab === "grammar" ? "📝 Grammar" : tab === "vocabulary" ? "🧠 Words" : tab === "reading" ? "📖 Reading" : tab === "speaking" ? "🗣️ AI Speak" : "🎯 Quiz"}
            </button>
          ))}
        </div>

        {/* --- DYNAMIC TAB VIEW --- */}
        <div className="mt-4 transition-all duration-300">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-[#121b2e] p-5 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-slate-200">የአጠቃላይ መግለጫ (Overview)</h3>
                <div className="p-4 bg-slate-900/60 rounded-xl border border-l-4 border-l-blue-500 border-slate-800">
                  <p className="text-xs text-blue-400 uppercase font-black tracking-wider mb-1">Amharic Explanation</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{currentLessonData.amharicOverview}</p>
                </div>
                <div className="p-4 bg-slate-900/60 rounded-xl border border-l-4 border-l-purple-500 border-slate-800">
                  <p className="text-xs text-purple-400 uppercase font-black tracking-wider mb-1">English Explanation</p>
                  <p className="text-slate-300 text-sm leading-relaxed">{currentLessonData.englishOverview}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GRAMMAR */}
          {activeTab === "grammar" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-[#121b2e] p-5 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-slate-200">{currentLessonData.grammar.title}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-slate-300">
                    <thead className="text-xs uppercase bg-slate-900 text-slate-400">
                      <tr>
                        <th className="p-3 rounded-l-lg">Subject</th>
                        <th className="p-3">Verb</th>
                        <th className="p-3">Amharic</th>
                        <th className="p-3 rounded-r-lg">Example Sentence</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {currentLessonData.grammar.rules.map((rule, idx) => (
                        <tr key={idx} className="hover:bg-slate-900/40">
                          <td className="p-3 font-mono font-bold text-purple-400">{rule.subject}</td>
                          <td className="p-3 font-semibold text-blue-400">{rule.verb}</td>
                          <td className="p-3 text-xs text-slate-400">{rule.amharic}</td>
                          <td className="p-3 font-light text-slate-200 italic">"{rule.example}"</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 bg-amber-950/20 border border-amber-800/50 rounded-xl text-sm font-mono whitespace-pre-line text-amber-300">
                  {currentLessonData.grammar.commonMistake}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: VOCABULARY */}
          {activeTab === "vocabulary" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
              {currentLessonData.vocabulary.map((vocab, index) => (
                <div key={index} className="bg-[#121b2e] p-5 rounded-2xl border border-slate-800 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-xl font-bold text-white tracking-wide">{vocab.word}</h4>
                      <span className="text-xs font-semibold bg-slate-800 px-2 py-0.5 rounded text-slate-400">{vocab.type}</span>
                    </div>
                    <p className="text-xs text-purple-400 font-mono mt-1">{vocab.pronunciation} 🔊</p>
                    <p className="text-sm font-medium text-slate-300 mt-3 border-l-2 border-slate-700 pl-2">
                      <span className="text-xs text-slate-500 block">ትርጉም፡</span>{vocab.amharic}
                    </p>
                  </div>
                  <p className="text-xs italic text-slate-400 mt-4 bg-slate-900/50 p-2 rounded-lg">"{vocab.example}"</p>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: READING & LOGISTICS DIALOGUE */}
          {activeTab === "reading" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-[#121b2e] p-5 rounded-2xl border border-slate-800 space-y-4">
                <h3 className="text-lg font-bold text-green-400">{currentLessonData.reading.title}</h3>
                <p className="text-slate-300 leading-relaxed tracking-wide text-sm md:text-base font-light bg-slate-900/40 p-4 rounded-xl border border-slate-800">
                  {currentLessonData.reading.content}
                </p>
                
                {/* Situation Conversation Add-on */}
                <h4 className="text-sm font-black uppercase text-slate-400 tracking-wider pt-2">🔊 Real-world Daily Conversation (Airport Hub)</h4>
                <div className="space-y-3">
                  {currentLessonData.conversations.map((chat, idx) => (
                    <div key={idx} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <p className="text-xs font-bold text-blue-400">{chat.role}:</p>
                      <p className="text-sm text-slate-200 font-mono">"{chat.text}"</p>
                      <p className="text-xs text-slate-500 mt-1">{chat.translation}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: AI SPEAKING & SHADOWING PRACTICE */}
          {activeTab === "speaking" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-[#121b2e] p-5 rounded-2xl border border-slate-800 text-center space-y-4">
                <div className="w-16 h-16 bg-purple-600/10 border border-purple-500/30 text-purple-400 flex items-center justify-center rounded-full mx-auto text-2xl animate-pulse">
                  🎙️
                </div>
                <h3 className="text-lg font-bold text-white">Interactive Shadowing & Pronunciation AI</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  ለማንበብ የሚከተለውን አረፍተ ነገር ይበሉ፤ የእኛ የ AI ሞዴል አጠራርዎን (Pronunciation) ገምግሞ ትክክለኛ ግብረ-መልስ (Feedback) ይሰጥዎታል።
                </p>
                <div className="bg-slate-900 p-4 rounded-xl font-mono text-slate-300 italic max-w-xl mx-auto border border-slate-800">
                  "I am exploring aviation management and learning English."
                </div>
                <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 font-bold text-sm rounded-xl hover:opacity-90 transition shadow-md shadow-purple-900/20">
                  Start AI Microphone
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: COMPREHENSIVE QUIZ */}
          {activeTab === "quiz" && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-[#121b2e] p-5 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Lesson Assessment</h3>
                  <span className="text-xs bg-purple-900/50 text-purple-300 font-mono px-2 py-0.5 rounded border border-purple-700/30">Quiz 1 of 1</span>
                </div>
                <p className="text-slate-300 font-medium text-sm md:text-base">{currentLessonData.reading.question}</p>
                
                <div className="space-y-2">
                  {currentLessonData.reading.options.map((option, index) => (
                    <button
                      key={index}
                      disabled={quizSubmitted}
                      onClick={() => setSelectedQuizOption(index)}
                      className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between ${
                        quizSubmitted
                          ? index === currentLessonData.reading.correctAnswer
                            ? "bg-green-950/40 border-green-500 text-green-300"
                            : selectedQuizOption === index
                            ? "bg-red-950/40 border-red-500 text-red-300"
                            : "bg-slate-900/20 border-slate-800 text-slate-500"
                          : selectedQuizOption === index
                          ? "bg-purple-950/40 border-purple-500 text-purple-300 font-semibold shadow-inner"
                          : "bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800/50"
                      }`}
                    >
                      <span>{String.fromCharCode(65 + index)}. {option}</span>
                      {quizSubmitted && index === currentLessonData.reading.correctAnswer && <span>Event Key: ✅ Correct</span>}
                    </button>
                  ))}
                </div>

                {!quizSubmitted ? (
                  <button
                    disabled={selectedQuizOption === null}
                    onClick={() => {
                      setQuizSubmitted(true);
                      if (selectedQuizOption === currentLessonData.reading.correctAnswer) {
                        setUserXp((prev) => prev + currentLessonData.xpReward);
                      }
                    }}
                    className="w-full mt-4 py-3 bg-purple-600 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed font-bold text-sm rounded-xl text-white transition hover:bg-purple-700"
                  >
                    መልስህን አስረክብ (Submit Answer)
                  </button>
                ) : (
                  <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-center text-xs text-slate-400 animate-slideUp">
                    🎉 ትምህርቱን በተሳካ ሁኔታ አጠናቀሃል! ቀጣዩን የ CEFR ደረጃዎችን ለመክፈት ወደ ዋናው ማውጫ ተመለስ።
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* --- FLOATING CONTROLS FOOTER (Mobile Sticky Footer) --- */}
      <footer className="fixed bottom-0 left-0 right-0 bg-[#0d1424]/95 backdrop-blur-md border-t border-slate-800/80 px-4 py-3 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <button className="px-4 py-2 border border-slate-700 text-slate-400 rounded-xl text-xs font-bold hover:bg-slate-800 hover:text-slate-200 transition">
            ◀ ወደ ማውጫ ተመለስ
          </button>
          
          <div className="flex-1 max-w-xs bg-slate-800 h-2 rounded-full overflow-hidden hidden sm:block">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full w-[100%] transition-all duration-500"></div>
          </div>

          <button 
            onClick={() => {
              // Simple routing logic or Tab jumping logic
              if(activeTab !== "quiz") setActiveTab("quiz");
            }}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition shadow-md shadow-emerald-950/20"
          >
            ቀጣይ ምዕራፍ (Next) ▶
          </button>
        </div>
      </footer>

    </div>
  );
}

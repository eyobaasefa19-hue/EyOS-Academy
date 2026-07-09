"use client";

import { useState } from "react";
import Link from "next/link";

export default function PracticalHubLesson() {
  const [activeTab, setActiveTab] = useState<"reading" | "dialogue" | "writing">("reading");
  
  // Reading Section States
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showReadingResult, setShowReadingResult] = useState(false);

  // Writing Section States
  const [userText, setUserText] = useState("");
  const [aiFeedback, setAiFeedback] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);

  // Quiz Validation
  const handleQuizSubmit = () => {
    if (!selectedAnswer) return;
    setShowReadingResult(true);
  };

  // AI Writing Review Simulation
  const handleWritingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userText.trim()) return;
    setIsReviewing(true);

    try {
      // እዚህ ጋር ከፈለግክ ወደ AI API መላክ ትችላለህ፤ ለጊዜው ግን ፈጣን የሆነ ሲሙሌሽን አስቀምጬልሃለሁ
      setTimeout(() => {
        setAiFeedback(
          `**Great job on practicing your writing!** Here is a quick review of your text:\n\n` +
          `*   **Grammar Check:** Your sentence structure is good. Ensure proper capitalization.\n` +
          `*   **Vocabulary:** Try using words like *excellent* or *splendid* next time.\n` +
          `*   **Correction:** Always remember to end your sentences with a full stop (.).`
        );
        setIsReviewing(false);
      }, 1500);
    } catch (error) {
      setIsReviewing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-4 sm:p-6 flex flex-col">
      <div className="max-w-3xl w-full mx-auto flex-1 flex flex-col">
        
        {/* Header */}
        <div>
          <Link href="/dashboard" className="text-indigo-400 hover:underline mb-4 inline-block text-sm">
            ← ወደ ዳሽቦርድ ይመለሱ
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-indigo-400 bg-clip-text text-transparent mb-1">
            Lesson 04: Practical English Hub
          </h1>
          <p className="text-sm text-gray-400 mb-6">ማንበብ፣ የዕለት ተዕለት ውይይቶችን መለማመድ እና የጽሑፍ ብቃትዎን በአንድ ቦታ ያሳድጉ።</p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-3 gap-2 bg-[#161B26]/60 p-1.5 rounded-xl border border-gray-800 mb-6">
          <button
            onClick={() => setActiveTab("reading")}
            className={`py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
              activeTab === "reading" ? "bg-emerald-600 text-white shadow-lg" : "text-gray-400 hover:text-white"
            }`}
          >
            📖 Reading
          </button>
          <button
            onClick={() => setActiveTab("dialogue")}
            className={`py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
              activeTab === "dialogue" ? "bg-emerald-600 text-white shadow-lg" : "text-gray-400 hover:text-white"
            }`}
          >
            💬 Dialogue
          </button>
          <button
            onClick={() => setActiveTab("writing")}
            className={`py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
              activeTab === "writing" ? "bg-emerald-600 text-white shadow-lg" : "text-gray-400 hover:text-white"
            }`}
          >
            ✍️ Writing
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-[#161B26]/40 backdrop-blur-md border border-gray-800 rounded-2xl p-5 sm:p-6 min-h-[400px]">
          
          {/* TAB 1: READING */}
          {activeTab === "reading" && (
            <div className="space-y-5">
              <div className="border-l-4 border-emerald-500 pl-3">
                <h2 className="text-lg font-semibold text-emerald-400">Short Story: The New Airport</h2>
                <p className="text-xs text-gray-400">ታሪኩን በጥንቃቄ ያንብቡና ከታች ያለውን ጥያቄ ይመልሱ።</p>
              </div>
              <p className="text-gray-200 text-sm leading-relaxed bg-[#0B0F19]/60 p-4 rounded-xl border border-gray-800/80">
                Abebe started his new job at Addis Ababa Airport today. He is very excited to work with a great team. 
                His task is to handle cargo and manage logistics. He wants to study Aviation Management in the future 
                to grow his career. Everyone welcomed him warmly on his first day.
              </p>
              <div className="pt-2 space-y-3">
                <p className="text-sm font-medium text-gray-300">Question: What is Abebe's future career plan?</p>
                <div className="space-y-2">
                  {[
                    { key: "A", text: "To become a pilot" },
                    { key: "B", text: "To study Aviation Management" },
                    { key: "C", text: "To open a shopping mall" }
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => !showReadingResult && setSelectedAnswer(opt.key)}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all flex items-center justify-between ${
                        selectedAnswer === opt.key
                          ? "border-indigo-500 bg-indigo-600/20 text-indigo-300"
                          : "border-gray-800 bg-[#0B0F19]/40 text-gray-300 hover:border-gray-700"
                      }`}
                    >
                      <span>{opt.key}. {opt.text}</span>
                    </button>
                  ))}
                </div>
                {!showReadingResult ? (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={!selectedAnswer}
                    className="w-full mt-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 font-medium rounded-xl text-sm transition-all"
                  >
                    መልስህን አስረክብ (Submit)
                  </button>
                ) : (
                  <div className={`p-4 rounded-xl text-sm mt-4 border ${
                    selectedAnswer === "B" ? "bg-emerald-950/40 border-emerald-800 text-emerald-300" : "bg-red-950/40 border-red-800 text-red-300"
                  }`}>
                    {selectedAnswer === "B" 
                      ? "🎉 ትክክል ነህ! Excellent job! Abebe wants to study Aviation Management." 
                      : "❌ የተሳሳተ መልስ። ትክክለኛው መልስ B (To study Aviation Management) ነው።"}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: DIALOGUE */}
          {activeTab === "dialogue" && (
            <div className="space-y-5">
              <div className="border-l-4 border-emerald-500 pl-3">
                <h2 className="text-lg font-semibold text-emerald-400">Daily Conversation: Meeting a Colleague</h2>
                <p className="text-xs text-gray-400">በሥራ ቦታ አዲስ የሥራ ባልደረባ ሲያገኙ የሚደረግ ውይይት።</p>
              </div>
              <div className="space-y-4 pt-2">
                <div className="flex gap-3 items-start">
                  <div className="bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 text-xs px-2.5 py-1 rounded-md font-bold mt-0.5">Person A</div>
                  <div className="flex-1 bg-[#0B0F19]/60 p-3 rounded-xl border border-gray-800 text-sm">
                    <p className="text-white font-medium">"Good afternoon! My name is Eyob. I just joined the cargo operations team."</p>
                    <p className="text-xs text-gray-400 mt-1">ትርጉም: እንደምን አረፈዱ! ስሜ እዮብ ይባላል። አሁን ነው የካርጎ ኦፕሬሽን ቡድኑን የተቀላቀልኩት።</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 text-xs px-2.5 py-1 rounded-md font-bold mt-0.5">Person B</div>
                  <div className="flex-1 bg-[#0B0F19]/60 p-3 rounded-xl border border-gray-800 text-sm">
                    <p className="text-white font-medium">"Welcome to the team, Eyob! Nice to meet you. My name is Samuel."</p>
                    <p className="text-xs text-gray-400 mt-1">ትርጉም: ወደ ቡድኑ እንኳን ደህና መጣህ እዮብ! ስለተገናኘን ደስ ብሎኛል። ስሜ ሳሙኤል ይባላል።</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 text-xs px-2.5 py-1 rounded-md font-bold mt-0.5">Person A</div>
                  <div className="flex-1 bg-[#0B0F19]/60 p-3 rounded-xl border border-gray-800 text-sm">
                    <p className="text-white font-medium">"Nice to meet you too, Samuel. I am excited to work with you all safely and quickly."</p>
                    <p className="text-xs text-gray-400 mt-1">ትርጉም: እኔም ስለተገናኘን ደስ ብሎኛል ሳሙኤል ከእናንተ ጋር በደኅንነት እና በፈጣን ሁኔታ ለመሥራት ጓጉቻለሁ።</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: WRITING */}
          {activeTab === "writing" && (
            <div className="space-y-5">
              <div className="border-l-4 border-emerald-500 pl-3">
                <h2 className="text-lg font-semibold text-emerald-400">Writing Practice & Feedback</h2>
                <p className="text-xs text-gray-400">ስለ ራስዎ ወይም ስለ ሥራዎ አጭር አንቀጽ በእንግሊዘኛ ይጻፉ እና አስተያየት ያግኙ።</p>
              </div>
              <form onSubmit={handleWritingSubmit} className="space-y-3 pt-2">
                <textarea
                  value={userText}
                  onChange={(e) => setUserText(e.target.value)}
                  disabled={isReviewing}
                  rows={4}
                  placeholder="Example: My name is Eyob. I live in Addis Ababa. I work at Ethiopian Airlines..."
                  className="w-full bg-[#0B0F19] border border-gray-800 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors disabled:opacity-50 resize-none leading-relaxed"
                />
                <button
                  type="submit"
                  disabled={isReviewing || !userText.trim()}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 font-medium rounded-xl text-sm transition-all"
                >
                  {isReviewing ? "ጽሑፍዎ እየተገመገመ ነው..." : "ጽሑፉን አርምልኝ (Check Text)"}
                </button>
              </form>

              {aiFeedback && (
                <div className="p-4 bg-[#161B26] border border-gray-800 rounded-xl text-sm text-gray-200 space-y-2 mt-4 leading-relaxed">
                  <p className="font-semibold text-emerald-400">✨ AI Feedback:</p>
                  <p className="whitespace-pre-line text-xs sm:text-sm">{aiFeedback}</p>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer Navigation */}
        <div className="mt-6 flex justify-between items-center">
          <span className="text-xs text-gray-500">Lesson 4 of 4</span>
          <Link href="/dashboard" className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 font-medium rounded-xl text-xs sm:text-sm transition-all">
            ወደ ማውጫ ተመለስ
          </Link>
        </div>

      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { dialogueScenarios } from "./lessonFourData";
import { checkWritingWithAI } from "./actions";

interface FeedbackType {
  intro: string;
  points: { label: string; text: string }[];
}

export default function PracticalHubLesson() {
  const [activeTab, setActiveTab] = useState<"reading" | "dialogue" | "writing">("reading");
  
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showReadingResult, setShowReadingResult] = useState(false);

  const [userText, setUserText] = useState("");
  const [aiFeedback, setAiFeedback] = useState<FeedbackType | null>(null);
  const [isReviewing, setIsReviewing] = useState(false);

  const handleQuizSubmit = () => {
    if (!selectedAnswer) return;
    setShowReadingResult(true);
  };

  // እውነተኛው Gemini AI አራሚ
  const handleWritingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanText = userText.trim();
    if (!cleanText) return;
    
    setIsReviewing(true);

    try {
      const result = await checkWritingWithAI(cleanText);
      if (result) {
        setAiFeedback(result);
      }
    } catch (error) {
      console.error("Failed to get feedback");
      setAiFeedback({
        intro: "ይቅርታ፣ ፅሁፍዎን ለመገምገም የኔትወርክ ችግር አጋጥሟል።",
        points: [{ label: "Error", text: "እባክዎትን ትንሽ ቆይተው እንደገና ይሞክሩ።" }]
      });
    } finally {
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
            <div className="space-y-8 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-800">
              {dialogueScenarios.map((scenario) => (
                <div key={scenario.id} className="space-y-4 border-b border-gray-800 pb-6 last:border-0">
                  <div className="border-l-4 border-emerald-500 pl-3">
                    <h2 className="text-lg font-semibold text-emerald-400">{scenario.title}</h2>
                    <p className="text-xs text-gray-400">{scenario.contextAmh}</p>
                  </div>
                  
                  <div className="space-y-4 pt-2">
                    {scenario.dialogues.map((dialogue, index) => {
                      const isPersonA = dialogue.speaker === "Person A";
                      return (
                        <div key={index} className="flex gap-3 items-start">
                          <div className={`text-xs px-2.5 py-1 rounded-md font-bold mt-0.5 border ${
                            isPersonA 
                              ? "bg-emerald-600/20 border-emerald-500/30 text-emerald-400" 
                              : "bg-indigo-600/20 border-indigo-500/30 text-indigo-400"
                          }`}>
                            {dialogue.speaker}
                          </div>
                          <div className="flex-1 bg-[#0B0F19]/60 p-3 rounded-xl border border-gray-800 text-sm">
                            <p className="text-white font-medium">&quot;{dialogue.textEng}&quot;</p>
                            <p className="text-xs text-gray-400 mt-1">ትርጉም: {dialogue.textAmh}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
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
                  {isReviewing ? "ጽሑፍዎ በ AI እየተገመገመ ነው..." : "ጽሑፉን አርምልኝ (Check Text)"}
                </button>
              </form>

              {aiFeedback && (
                <div className="p-4 bg-[#161B26] border border-gray-800 rounded-xl text-sm text-gray-200 space-y-3 mt-4 leading-relaxed">
                  <p className="font-semibold text-emerald-400 flex items-center gap-1.5">✨ AI Feedback</p>
                  <p className="text-gray-300 font-medium text-xs sm:text-sm">{aiFeedback.intro}</p>
                  <ul className="space-y-2 text-xs sm:text-sm pl-1">
                    {aiFeedback.points.map((pt, idx) => (
                      <li key={idx} className="text-gray-400">
                        <strong className="text-gray-200 font-semibold">🔹 {pt.label}:</strong> {pt.text}
                      </li>
                    ))}
                  </ul>
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

"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
// ትክክለኛውን የውሂብ መዋቅር አገናኘን
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
    commonMistake: "❌ Don't say: 'He am working at the terminal.' \n✅ Say: 'He is working at the terminal.'"
  },
  vocabulary: [
    { word: "Explore", type: "Verb", amharic: "መረመር", pronunciation: "/ɪkˈsplɔːr/", example: "I explore new frameworks." },
    { word: "Aviation", type: "Noun", amharic: "የበረራ ሳይንስ", pronunciation: "/ˌeɪ.viˈeɪ.ʃən/", example: "He studies aviation." }
  ],
  conversations: [
    { role: "Agent", text: "Good morning! Passport please?", translation: "እንደምን አደሩ! ፓስፖርት እባክዎን?" }
  ]
};

export default function AdvancedLessonDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "grammar" | "vocabulary" | "reading" | "speaking" | "quiz">("overview");
  const [userXp, setUserXp] = useState(330);
  
  // የኩዊዝ መረጃን ከ lessonModules[0] እንወስዳለን
  const activeQuestions = lessonModules[0].questions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const triggerHaptic = (duration = 40) => { if (typeof window !== "undefined" && navigator.vibrate) navigator.vibrate(duration); };

  const handleQuizAnswer = () => {
    triggerHaptic(60);
    if (selectedQuizOption === activeQuestions[currentQuestionIndex].correctAnswer) {
      setScore((prev) => prev + 1);
      setUserXp((prev) => prev + 10);
    }
    setQuizSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedQuizOption(null);
      setQuizSubmitted(false);
    } else {
      setQuizFinished(true);
      setUserXp((prev) => prev + staticLessonData.xpReward);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b101d] text-slate-100 p-4">
      <h1 className="text-xl font-bold">{staticLessonData.title}</h1>
      
      {/* Tab Controls */}
      <div className="flex gap-2 my-4 overflow-x-auto">
        {(["overview", "grammar", "vocabulary", "reading", "quiz"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`p-2 rounded ${activeTab === tab ? "bg-purple-600" : "bg-slate-800"}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Quiz Tab View */}
      {activeTab === "quiz" && (
        <div className="bg-[#121b2e] p-6 rounded-xl">
          {!quizFinished ? (
            <>
              <p className="mb-4">{activeQuestions[currentQuestionIndex].question}</p>
              {activeQuestions[currentQuestionIndex].options.map((opt, i) => (
                <button key={i} onClick={() => setSelectedQuizOption(i)} className={`block w-full p-3 mb-2 rounded ${selectedQuizOption === i ? "bg-purple-900" : "bg-slate-700"}`}>
                  {opt}
                </button>
              ))}
              {!quizSubmitted ? (
                <button onClick={handleQuizAnswer} className="w-full bg-blue-600 p-3 mt-4 rounded">Submit</button>
              ) : (
                <button onClick={handleNextQuestion} className="w-full bg-green-600 p-3 mt-4 rounded">Next</button>
              )}
            </>
          ) : (
            <p>Score: {score} / {activeQuestions.length}</p>
          )}
        </div>
      )}
    </div>
  );
}

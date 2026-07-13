"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
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
    { word: "Explore", type: "Verb", amharic: "አዲስ ነገርን ማወቅ", pronunciation: "/ɪkˈsplɔːr/", example: "I explore new frameworks." },
    { word: "Essential", type: "Adjective", amharic: "አስፈላጊ", pronunciation: "/ɪˈsen.ʃəl/", example: "English is essential." },
    { word: "Aviation", type: "Noun", amharic: "የአቪዬሽን", pronunciation: "/ˌeɪ.viˈeɪ.ʃən/", example: "He studies aviation." },
    { word: "Cargo", type: "Noun", amharic: "ጭነት", pronunciation: "/ˈkɑːr.ɡoʊ/", example: "The cargo manifest." },
    { word: "Manifest", type: "Noun", amharic: "የዕቃ ዝርዝር", pronunciation: "/ˈmæn.ɪ.fest/", example: "Check the manifest." },
    { word: "Deploy", type: "Verb", amharic: "ለተጠቃሚ ክፍት ማድረግ", pronunciation: "/dɪˈplɔɪ/", example: "We deploy the app." }
  ],
  conversations: [
    { role: "Airport Agent", text: "Good morning! Can I see your passport and ticket?", translation: "እንደምን አደሩ! ፓስፖርትዎን እና ቲኬትዎን ላሳይ?" },
    { role: "Passenger (You)", text: "Sure, here they are.", translation: "እንዴታ፣ ይኸውልዎት።" }
  ]
};

export default function AdvancedLessonDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "grammar" | "vocabulary" | "reading" | "speaking" | "quiz">("overview");
  const [streak] = useState(5);
  const [userXp, setUserXp] = useState(330);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const questions = lessonModules[0].questions;
  const triggerHaptic = (duration = 40) => { if (typeof window !== "undefined" && navigator.vibrate) navigator.vibrate(duration); };

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

  return (
    <div className="min-h-screen bg-[#0b101d] text-slate-100 p-4">
      <main className="max-w-4xl mx-auto space-y-5">
        <div className="bg-[#121b2e] p-6 rounded-2xl border border-slate-800">
          <h1 className="text-2xl font-bold">{staticLessonData.title}</h1>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {(["overview", "grammar", "vocabulary", "reading", "speaking", "quiz"] as const).map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === tab ? "bg-purple-600" : "bg-slate-800"}`}>
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {activeTab === "quiz" && (
          <div className="bg-[#121b2e] p-5 rounded-2xl border border-slate-800">
            {!quizFinished ? (
              <div className="space-y-4">
                <p className="text-lg font-semibold">{questions[currentQuestionIndex].question}</p>
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <button key={index} onClick={() => setSelectedQuizOption(index)} className={`w-full p-4 rounded-xl border ${selectedQuizOption === index ? "bg-purple-900" : "bg-slate-900"}`}>
                    {option}
                  </button>
                ))}
                {!quizSubmitted ? (
                  <button onClick={handleQuizAnswer} className="w-full py-3 bg-purple-600 rounded-xl">Submit</button>
                ) : (
                  <button onClick={handleNextQuestion} className="w-full py-3 bg-emerald-600 rounded-xl">Next</button>
                )}
              </div>
            ) : (
              <div className="text-center py-10">
                <h2 className="text-2xl font-bold">🎉 አጠናቀሃል!</h2>
                <p>ውጤትህ፡ {score} / {questions.length}</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

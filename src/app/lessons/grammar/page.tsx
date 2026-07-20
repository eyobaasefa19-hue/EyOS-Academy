'use client';

import React, { useState, useRef, useEffect } from "endl"; // wait, keeping standard react imports below
import Link from "next/link";
// የ Supabase ኮኔክሽን ከትክክለኛው ፎልደር (Path ስተካከልቷል)
import { supabase } from "../../lib/supabase"; 
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
    { role: "Airport Agent", text: "Good morning! Can I see your passport and ticket, please?", translation: "እንደምን አደሩ! እባክዎን ፓስፖርትዎን እና ቲኬትዎን ማየት እችላለሁ?" },
    { role: "Passenger (You)", text: "Sure, here they are. I am flying to Washington, D.C.", translation: "እንዴታ፣ ይኸውልዎት። ወደ ዋሽንግተን ዲሲ እየበረርኩ ነው።" }
  ]
};

export default function AdvancedLessonDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "grammar" | "vocabulary" | "reading" | "speaking" | "quiz">("overview");
  
  // State variables for Database Auth & Stats
  const [authUser, setAuthUser] = useState<any>(null);
  const [streak, setStreak] = useState(0); 
  const [userXp, setUserXp] = useState(0); 
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const questions = lessonModules[0].questions;
  const tabContainerRef = useRef<HTMLDivElement>(null);

  // 🛠️ 1. ገፁ ሲከፈት የዩዘሩን ትክክለኛ XP እና Streak ከ Supabase እናመጣለን
  useEffect(() => {
    async function loadUserData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setAuthUser(user);
        setIsUserLoggedIn(true);
        
        const { data: profile } = await supabase
          .from('UserProfile')
          .select('xpPoints, streak')
          .eq('id', user.id)
          .single();

        if (profile) {
          setUserXp(profile.xpPoints || 0);
          setStreak(profile.streak || 0);
        }
      }
    }
    loadUserData();
  }, []);

  const triggerHaptic = (duration = 40) => {
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate(duration);
    }
  };

  const handleQuizAnswer = () => {
    triggerHaptic(60); 
    if (selectedQuizOption === questions[currentQuestionIndex].correctAnswer) {
      setScore((prev) => prev + 1);
      setUserXp((prev) => prev + 10); // ጥያቄ ሲመልስ 10 XP በጊዜያዊነት (Locally) ይጨምራል
    }
    setQuizSubmitted(true);
  };

  // 🛠️ 2. ጥያቄው ሲያልቅ አዲሱን ጠቅላላ የ XP መጠን በቀጥታ ዳታቤዝ ላይ ሴቭ እናደርጋለን
  const handleNextQuestion = async () => {
    triggerHaptic(40);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      
      // 150 Completion XP ከጥያቄዎቹ XP ጋር እንደምራለን
      const finalXpToSave = userXp + staticLessonData.xpReward;
      setUserXp(finalXpToSave); // UI አፕዴት ለማድረግ
      
      // አዲሱን XP ዳታቤዝ ላይ ማስቀመጥ (Saving to Supabase)
      if (authUser) {
        try {
          await supabase
            .from('UserProfile')
            .update({ xpPoints: finalXpToSave })
            .eq('id', authUser.id);
        } catch (error) {
          console.error("Error updating XP in database:", error);
        }
      }
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

          {isUserLoggedIn ? (
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center text-xs font-black text-white border border-purple-400/30 shadow-inner ml-1">
              {authUser?.email?.charAt(0).toUpperCase() || 'E'}
            </div>
          ) : (
            <button className="text-xs bg-purple-600 px-3 py-1.5 font-bold rounded-xl text-white">
              Get Started 🚀
            </button>
          )}
        </div>
      </div>

      {/* CORE CONTENT FRAME */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 space-y-5 pb-24">
        
        {/* Lesson Header */}
        <div className="bg-gradient-to-br from-[#16223f] to-[#121b2e] rounded-2xl p-5 border border-slate-800 shadow-xl">
          <span className="text-[10px] font-black tracking-widest text-blue-400 uppercase">{staticLessonData.category}</span>
          <h1 className="text-xl md:text-2xl font-extrabold text-white mt-0.5">{staticLessonData.title}</h1>
          <p className="text-slate-400 text-xs mt-1 font-light">Complete all items to earn +{staticLessonData.xpReward} Completion XP</p>
        </div>

        {/* TAB CONTROLS */}
        <div className="relative border-b border-slate-800/40">
          <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-[#0b101d] to-transparent pointer-events-none z-10" />
          
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

          <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-[#0b101d] to-transparent pointer-events-none z-10" />
        </div>

        {/* DYNAMIC TAB VIEW */}
        <div className="mt-2">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="bg-[#121b2e] p-5 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-slate-200">የአጠቃላይ መግለጫ (Overview)</h3>
              <div className="p-4 bg-slate-900/40 rounded-xl border-l-4 border-l-blue-500 border-slate-800">
                <p className="text-[10px] text-blue-400 uppercase font-black tracking-wider mb-1">Amharic Explanation</p>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed">{staticLessonData.amharicOverview}</p>
              </div>
              <div className="p-4 bg-slate-900/40 rounded-xl border-l-4 border-l-purple-500 border-slate-800">
                <p className="text-[10px] text-purple-400 uppercase font-black tracking-wider mb-1">English Explanation</p>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed">{staticLessonData.englishOverview}</p>
              </div>
            </div>
          )}

          {/* TAB 2: GRAMMAR */}
          {activeTab === "grammar" && (
            <div className="bg-[#121b2e] p-5 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-slate-200">{staticLessonData.grammar.title}</h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3">Subject</th>
                      <th className="p-3">Verb</th>
                      <th className="p-3">Example</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 bg-slate-900/20">
                    {staticLessonData.grammar.rules.map((rule, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40">
                        <td className="p-3 font-mono font-bold text-purple-400">{rule.subject}</td>
                        <td className="p-3 font-semibold text-blue-400">{rule.verb}</td>
                        <td className="p-3 font-light text-slate-200 italic">"{rule.example}"</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-red-950/20 rounded-xl border border-red-900/40 text-xs whitespace-pre-line text-slate-300 font-mono">
                {staticLessonData.grammar.commonMistake}
              </div>
            </div>
          )}

          {/* TAB 3: VOCABULARY */}
          {activeTab === "vocabulary" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {staticLessonData.vocabulary.map((vocab, index) => (
                <div key={index} className="bg-[#121b2e] p-4 rounded-2xl border border-slate-800 flex flex-col justify-between shadow-sm">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-white tracking-wide">{vocab.word}</h4>
                      <span className="text-[10px] font-semibold bg-slate-800 px-2 py-0.5 rounded text-slate-400">{vocab.type}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500 block mt-0.5">{vocab.pronunciation}</span>
                    <p className="text-xs font-medium text-slate-300 mt-2 border-l-2 border-slate-700 pl-2">
                      <span className="text-[10px] text-slate-500 block">ትርጉም፡</span>{vocab.amharic}
                    </p>
                    <p className="text-[11px] text-slate-400 italic mt-1.5">Ex: "{vocab.example}"</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: READING */}
          {activeTab === "reading" && (
            <div className="bg-[#121b2e] p-5 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-purple-400">📚 Practice Library ({readingStories.length} Stories)</h3>
              <div className="space-y-4 max-h-[58vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-800">
                {readingStories.map((story) => (
                  <div key={story.id} className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/70 space-y-1">
                    <h4 className="text-xs font-black uppercase text-green-400 tracking-wide">● {story.title}</h4>
                    <p className="text-slate-300 leading-relaxed text-xs md:text-sm font-light">{story.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: AI SPEAKING */}
          {activeTab === "speaking" && (
            <div className="bg-[#121b2e] p-5 rounded-2xl border border-slate-800 text-center space-y-5">
              <div className="w-12 h-12 bg-purple-600/10 border border-purple-500/30 text-purple-400 flex items-center justify-center rounded-full mx-auto text-xl">
                🎙️
              </div>
              <h3 className="text-base font-bold text-white">Interactive Shadowing</h3>
              <div className="space-y-3 text-left max-w-md mx-auto bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                {staticLessonData.conversations.map((conv, index) => (
                  <div key={index} className="text-xs space-y-0.5">
                    <span className="font-bold text-blue-400 block">{conv.role}:</span>
                    <p className="text-slate-200">"{conv.text}"</p>
                    <p className="text-slate-500 italic">({conv.translation})</p>
                  </div>
                ))}
              </div>
              <button className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 font-bold text-xs rounded-xl hover:opacity-90 transition shadow-md">
                Start Microphone
              </button>
            </div>
          )}

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
                        className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between ${
                          quizSubmitted
                            ? index === questions[currentQuestionIndex].correctAnswer
                              ? "bg-green-950/40 border-green-500 text-green-300"
                              : selectedQuizOption === index
                              ? "bg-red-950/40 border-red-500 text-red-300"
                              : "bg-slate-900/20 border-slate-800 text-slate-500"
                            : selectedQuizOption === index
                            ? "bg-purple-950/40 border-purple-500 text-purple-300 font-semibold"
                            : "bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800/50"
                        }`}
                      >
                        <span>{String.fromCharCode(65 + index)}. {option}</span>
                        {quizSubmitted && index === questions[currentQuestionIndex].correctAnswer && <span>✓</span>}
                      </button>
                    ))}
                  </div>

                  {!quizSubmitted ? (
                    <button
                      disabled={selectedQuizOption === null}
                      onClick={handleQuizAnswer}
                      className="w-full mt-2 py-3 bg-purple-600 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed font-bold text-xs rounded-xl text-white transition hover:bg-purple-700 shadow-md"
                    >
                      መልስህን አስረክብ (Submit Answer)
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="w-full mt-2 py-3 bg-emerald-600 hover:bg-emerald-500 font-bold text-xs rounded-xl text-white transition shadow-md"
                    >
                      {currentQuestionIndex < questions.length - 1 ? "ቀጣይ ጥያቄ ▶" : "የመጨረሻ ውጤትህን እይ ▶"}
                    </button>
                  )}
                </>
              ) : (
                <div className="p-5 bg-slate-900/80 rounded-xl border border-slate-800 text-center space-y-4">
                  <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">🎉 ሙሉ ማጠቃለያውን አጠናቀሃል!</h4>
                  <div className="text-3xl font-black text-emerald-400 bg-emerald-500/10 py-3 rounded-xl border border-emerald-500/20 max-w-[150px] mx-auto">
                    {score} / {questions.length}
                  </div>
                  <p className="text-slate-400 text-xs mt-2">
                    +{staticLessonData.xpReward} Completion XP ወደ አካውንትህ ተደምሯል!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
                    <button 
                      onClick={restartQuiz}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs rounded-xl transition"
                    >
                      🔄 ድጋሚ ፈትን
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* FLOATING FOOTER */}
      <footer className="fixed bottom-0 left-0 right-0 bg-[#0b101d]/90 backdrop-blur-md border-t border-slate-800/60 px-4 py-3 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/Dashboard" onClick={() => triggerHaptic(20)} className="px-4 py-2 border border-slate-800 text-slate-400 rounded-xl text-xs font-bold hover:bg-slate-800 transition">
            ◀ ወደ ማውጫ ተመለስ
          </Link>
          
          {activeTab !== "quiz" && (
            <button 
              onClick={() => { triggerHaptic(30); setActiveTab("quiz"); }}
              className="px-4 py-2 bg-purple-600/20 text-purple-300 border border-purple-500/30 font-bold text-xs rounded-xl transition hover:bg-purple-600 hover:text-white"
            >
              ወደ ኩዊዝ ሂድ 🎯
            </button>
          )}
        </div>
      </footer>

    </div>
  );
}

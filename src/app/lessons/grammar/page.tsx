'use client';

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase"; 
import { readingStories, allGrammarLessons, GrammarLesson } from "./lessonData";

export default function AdvancedLessonDashboard() {
  // 1. ACTIVE LESSON STATE (Default: Lesson 01 Present Simple)
  const [activeLessonId, setActiveLessonId] = useState<string>("l1");
  const currentLesson: GrammarLesson = allGrammarLessons.find(l => l.id === activeLessonId) || allGrammarLessons[0];

  const [activeTab, setActiveTab] = useState<"overview" | "grammar" | "vocabulary" | "reading" | "speaking" | "quiz">("overview");
  
  // Auth & User Profile Stats
  const [authUser, setAuthUser] = useState<any>(null);
  const [streak, setStreak] = useState(0); 
  const [userXp, setUserXp] = useState(0); 
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  // Completion Tracking State
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  // Quiz Engine States
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // AI SPEECH RECOGNITION & SHADOWING STATES
  const [selectedConvIndex, setSelectedConvIndex] = useState<number>(0);
  const [isListening, setIsListening] = useState(false);
  const [userTranscript, setUserTranscript] = useState("");
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);

  const questions = currentLesson.questions;
  const tabContainerRef = useRef<HTMLDivElement>(null);

  // 1. Fetch User Data from Supabase
  useEffect(() => {
    async function loadUserData() {
      try {
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
      } catch (error) {
        console.error("User data loading error:", error);
      }
    }
    loadUserData();
  }, []);

  // Reset Quiz & Speech State when switching Lessons
  useEffect(() => {
    restartQuiz();
    resetSpeechState();
  }, [activeLessonId]);

  const triggerHaptic = (duration = 40) => {
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate(duration);
    }
  };

  // ----------------------------------------------------
  // SPEECH SYNTHESIS (TEXT TO SPEECH)
  // ----------------------------------------------------
  const handlePlayAudio = (text: string) => {
    triggerHaptic(30);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85; // slightly slower for language learning
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in this browser.");
    }
  };

  // ----------------------------------------------------
  // SPEECH RECOGNITION (VOICE TO TEXT & MATCHING)
  // ----------------------------------------------------
  const resetSpeechState = () => {
    setIsListening(false);
    setUserTranscript("");
    setMatchScore(null);
    setSpeechError(null);
  };

  const handleStartListening = () => {
    triggerHaptic(50);
    resetSpeechState();

    if (typeof window === "undefined") return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechError("የድምፅ መቅረጫው በዚህ ብራውዘር ላይ አይሰራም። እባክዎን Chrome ወይም Edge ይጠቀሙ።");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcriptText = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        
        setUserTranscript(transcriptText);

        if (event.results[0].isFinal) {
          calculateMatchScore(transcriptText);
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech Recognition Error:", event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setSpeechError("እባክዎን የብራውዘርዎን ማይክራፎን ፈቃድ (Microphone Permission) ይፍቀዱ።");
        } else {
          setSpeechError("ድምፅ አልተሰማም ወይም ችግር አጋጥሟል። እባክዎን ደግመው ይሞክሩ።");
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();

    } catch (err) {
      setIsListening(false);
      setSpeechError("ማይክራፎኑን ማስነሳት አልተቻለም።");
    }
  };

  const calculateMatchScore = (spokenText: string) => {
    const targetText = currentLesson.conversations[selectedConvIndex]?.text || "";
    
    const clean = (str: string) => str.toLowerCase().replace(/[^\w\s]/gi, '').trim().split(/\s+/);
    const spokenWords = clean(spokenText);
    const targetWords = clean(targetText);

    if (targetWords.length === 0) return;

    let matched = 0;
    targetWords.forEach(word => {
      if (spokenWords.includes(word)) {
        matched++;
      }
    });

    const calculatedPercent = Math.min(100, Math.round((matched / targetWords.length) * 100));
    setMatchScore(calculatedPercent);

    // Award XP bonus for good practice (>60%)
    if (calculatedPercent >= 60) {
      const newXp = userXp + 15;
      setUserXp(newXp);
      triggerHaptic(100);
    }
  };

  // ----------------------------------------------------
  // QUIZ ENGINE HANDLERS
  // ----------------------------------------------------
  const handleQuizAnswer = () => {
    triggerHaptic(60); 
    if (selectedQuizOption === questions[currentQuestionIndex].correctAnswer) {
      setScore((prev) => prev + 1);
      setUserXp((prev) => prev + 10);
    }
    setQuizSubmitted(true);
  };

  const handleNextQuestion = async () => {
    triggerHaptic(40);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      
      const finalXpToSave = userXp + currentLesson.xpReward;
      setUserXp(finalXpToSave);
      
      if (!completedLessons.includes(currentLesson.id)) {
        setCompletedLessons((prev) => [...prev, currentLesson.id]);
      }
      
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
            {currentLesson.cefrLevel} Level
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
        
        {/* GRAMMAR MODULE SWITCHER */}
        <div className="space-y-1.5">
          <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 px-1">Select Grammar Module ({allGrammarLessons.length})</span>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
            {allGrammarLessons.map((lesson) => {
              const isActive = lesson.id === activeLessonId;
              const isDone = completedLessons.includes(lesson.id);
              return (
                <button
                  key={lesson.id}
                  onClick={() => { triggerHaptic(20); setActiveLessonId(lesson.id); setActiveTab("overview"); }}
                  className={`snap-start whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-black transition-all border flex items-center gap-1.5 ${
                    isActive
                      ? "bg-purple-600 text-white border-purple-400 shadow-lg scale-105"
                      : isDone
                      ? "bg-emerald-950/40 text-emerald-400 border-emerald-800/60"
                      : "bg-[#121b2e] text-slate-400 border-slate-800 hover:bg-slate-800/50"
                  }`}
                >
                  <span>{lesson.title.split(":")[1]}</span>
                  {isDone && <span className="text-emerald-400 text-[10px]">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Lesson Header */}
        <div className="bg-gradient-to-br from-[#16223f] to-[#121b2e] rounded-2xl p-5 border border-slate-800 shadow-xl relative overflow-hidden">
          {completedLessons.includes(currentLesson.id) && (
            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[9px] font-black px-3 py-1 rounded-bl-xl tracking-wider">
              COMPLETED ✅
            </div>
          )}
          <span className="text-[10px] font-black tracking-widest text-blue-400 uppercase">{currentLesson.category}</span>
          <h1 className="text-xl md:text-2xl font-extrabold text-white mt-0.5">{currentLesson.title}</h1>
          <p className="text-slate-400 text-xs mt-1 font-light">Complete all items to earn +{currentLesson.xpReward} Completion XP</p>
        </div>

        {/* TAB CONTROLS */}
        <div className="relative border-b border-slate-800/40">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 px-1 scrollbar-none snap-x">
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
                  {tab === "overview" ? "📑 Overview" : tab === "grammar" ? "📝 Grammar" : tab === "vocabulary" ? `🧠 Words (${currentLesson.vocabulary.length})` : tab === "reading" ? `📖 Reading (${readingStories.length})` : tab === "speaking" ? "🗣️ AI Speak" : `🎯 Quiz (${questions.length})`}
                </button>
              );
            })}
          </div>
        </div>

        {/* DYNAMIC TAB VIEW */}
        <div className="mt-2">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="bg-[#121b2e] p-5 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-slate-200">የአጠቃላይ መግለጫ (Overview)</h3>
              <div className="p-4 bg-slate-900/40 rounded-xl border-l-4 border-l-blue-500 border-slate-800">
                <p className="text-[10px] text-blue-400 uppercase font-black tracking-wider mb-1">Amharic Explanation</p>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed">{currentLesson.amharicOverview}</p>
              </div>
              <div className="p-4 bg-slate-900/40 rounded-xl border-l-4 border-l-purple-500 border-slate-800">
                <p className="text-[10px] text-purple-400 uppercase font-black tracking-wider mb-1">English Explanation</p>
                <p className="text-slate-300 text-xs md:text-sm leading-relaxed">{currentLesson.englishOverview}</p>
              </div>
            </div>
          )}

          {/* TAB 2: GRAMMAR */}
          {activeTab === "grammar" && (
            <div className="bg-[#121b2e] p-5 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-slate-200">{currentLesson.grammar.title}</h3>
              <div className="overflow-x-auto rounded-xl border border-slate-800">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3">Subject</th>
                      <th className="p-3">Verb Form</th>
                      <th className="p-3">Example Sentence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 bg-slate-900/20">
                    {currentLesson.grammar.rules.map((rule, idx) => (
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
                {currentLesson.grammar.commonMistake}
              </div>
            </div>
          )}

          {/* TAB 3: VOCABULARY */}
          {activeTab === "vocabulary" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentLesson.vocabulary.map((vocab, index) => (
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

          {/* TAB 5: AI SPEAKING & SHADOWING (REAL MICROPHONE ENGINE) */}
          {activeTab === "speaking" && (
            <div className="bg-[#121b2e] p-5 rounded-2xl border border-slate-800 text-center space-y-5">
              <div className="flex items-center justify-center gap-2">
                <div className={`w-12 h-12 border rounded-full flex items-center justify-center text-xl transition-all ${
                  isListening 
                    ? "bg-red-500/20 border-red-500 text-red-400 animate-pulse scale-110" 
                    : "bg-purple-600/10 border-purple-500/30 text-purple-400"
                }`}>
                  🎙️
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">Interactive Shadowing</h3>
                <p className="text-slate-400 text-xs mt-0.5">ዓረፍተ ነገሩን መርጠህ 🔊 ድምፁን አዳምጥ፡ ከዚያም ማይክራፎኑን ተጭነህ በድምፅ ተለማመድ።</p>
              </div>

              {/* Conversation Selector Box */}
              <div className="space-y-3 text-left max-w-md mx-auto bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                {currentLesson.conversations.map((conv, index) => {
                  const isSelected = selectedConvIndex === index;
                  return (
                    <div 
                      key={index} 
                      onClick={() => { triggerHaptic(20); setSelectedConvIndex(index); resetSpeechState(); }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer relative ${
                        isSelected 
                          ? "bg-purple-950/40 border-purple-500 text-white shadow-md" 
                          : "bg-slate-900/30 border-slate-800/80 hover:bg-slate-800/40 text-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-blue-400">{conv.role}:</span>
                        <button 
                          onClick={(e) => { e.stopPropagation(); handlePlayAudio(conv.text); }}
                          className="px-2 py-1 bg-slate-800 hover:bg-purple-600 hover:text-white rounded-lg text-[10px] text-slate-300 transition flex items-center gap-1"
                        >
                          🔊 <span>Listen</span>
                        </button>
                      </div>
                      <p className="text-xs font-semibold text-slate-100">"{conv.text}"</p>
                      <p className="text-[11px] text-slate-400 italic mt-0.5">({conv.translation})</p>
                    </div>
                  );
                })}
              </div>

              {/* Live Speech Recognition Panel */}
              <div className="max-w-md mx-auto space-y-3">
                
                {isListening && (
                  <div className="p-3 bg-red-950/30 border border-red-800/50 rounded-xl text-red-300 text-xs animate-pulse flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span>ድምፅህን በማዳመጥ ላይ ነው... አሁን ተናገር!</span>
                  </div>
                )}

                {speechError && (
                  <div className="p-3 bg-amber-950/30 border border-amber-800/50 rounded-xl text-amber-300 text-xs">
                    {speechError}
                  </div>
                )}

                {userTranscript && (
                  <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-left space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">የተናገርከው ድምፅ (Transcribed):</span>
                    <p className="text-xs font-mono text-purple-300">"{userTranscript}"</p>
                  </div>
                )}

                {matchScore !== null && (
                  <div className={`p-4 rounded-xl border text-center space-y-1 ${
                    matchScore >= 80 
                      ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300" 
                      : matchScore >= 50 
                      ? "bg-amber-950/40 border-amber-500/50 text-amber-300" 
                      : "bg-red-950/40 border-red-500/50 text-red-300"
                  }`}>
                    <div className="text-2xl font-black">{matchScore}% Match</div>
                    <p className="text-xs font-medium">
                      {matchScore >= 80 
                        ? "🔥 Excellent Pronunciation! (+15 XP)" 
                        : matchScore >= 50 
                        ? "👍 Good try! Keep practicing for higher accuracy." 
                        : "💡 Try listening to the sentence audio again."}
                    </p>
                  </div>
                )}

                {/* Microhpone Action Button */}
                <button 
                  onClick={handleStartListening}
                  disabled={isListening}
                  className={`w-full py-3.5 px-5 font-bold text-xs rounded-xl transition shadow-lg flex items-center justify-center gap-2 ${
                    isListening 
                      ? "bg-red-600 text-white animate-pulse cursor-wait" 
                      : "bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 text-white"
                  }`}
                >
                  <span>{isListening ? "⏹️ Listening... (Speak Now)" : "🎙️ Start Microphone"}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: QUIZ */}
          {activeTab === "quiz" && (
            <div className="bg-[#121b2e] p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="text-base font-bold text-white">{currentLesson.title.split(":")[1]} Assessment</h3>
                <span className="text-[10px] bg-purple-900/50 text-purple-300 font-mono px-2 py-0.5 rounded border border-purple-700/30">
                  {!quizFinished ? `Question ${currentQuestionIndex + 1} of ${questions.length}` : "Finished"}
                </span>
              </div>

              {!quizFinished ? (
                <>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
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
                      <span className="text-[11px] text-slate-400 font-light block mt-1.5 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/60 italic">
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
                    +{currentLesson.xpReward} Completion XP ወደ አካውንትህ ተደምሯል!
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
      <footer className="fixed bottom-0 left-0 right-0 bg-[#0b101d]/95 backdrop-blur-md border-t border-slate-800/80 px-4 py-3 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link 
            href="/dashboard" 
            onClick={() => triggerHaptic(20)} 
            className="px-4 py-2 border border-slate-800 text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-800/80 transition flex items-center gap-1.5"
          >
            <span>◀</span> ወደ ማውጫ ተመለስ
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

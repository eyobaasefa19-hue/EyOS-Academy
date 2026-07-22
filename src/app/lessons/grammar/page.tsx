'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabase"; 
import { readingStories, allGrammarLessons, GrammarLesson, Story } from "./lessonData";

export default function AdvancedLessonDashboard() {
  const [activeLessonId, setActiveLessonId] = useState<string>("l1");
  const currentLesson: GrammarLesson = allGrammarLessons.find(l => l.id === activeLessonId) || allGrammarLessons[0];

  const [activeTab, setActiveTab] = useState<"overview" | "grammar" | "vocabulary" | "reading" | "speaking" | "quiz">("overview");
  
  const [authUser, setAuthUser] = useState<any>(null);
  const [streak, setStreak] = useState(0); 
  const [userXp, setUserXp] = useState(0); 
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const [selectedConvIndex, setSelectedConvIndex] = useState<number>(0);
  const [isListening, setIsListening] = useState(false);
  const [userTranscript, setUserTranscript] = useState("");
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);

  const questions = currentLesson.questions;

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

  useEffect(() => {
    restartQuiz();
    resetSpeechState();
  }, [activeLessonId]);

  const triggerHaptic = (duration = 40) => {
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate(duration);
    }
  };

  const handlePlayAudio = (text: string) => {
    triggerHaptic(30);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85; 
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech is not supported in this browser.");
    }
  };

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
      setSpeechError("የድምፅ መቅረጫው በዚህ ብራውዘር ላይ አይሰራም። እባክዎን Chrome ይጠቀሙ።");
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
        console.error("Speech Error:", event.error);
        setIsListening(false);
        if (event.error === 'not-allowed') {
          setSpeechError("እባክዎን የብራውዘርዎን ማይክራፎን ፈቃድ (Permission) ይፍቀዱ።");
        } else {
          setSpeechError("ድምፅ አልተሰማም ወይም ችግር አጋጥሟል።");
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
      if (spokenWords.includes(word)) matched++;
    });

    const calculatedPercent = Math.min(100, Math.round((matched / targetWords.length) * 100));
    setMatchScore(calculatedPercent);

    if (calculatedPercent >= 60) {
      const newXp = userXp + 15;
      setUserXp(newXp);
      triggerHaptic(100);
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
          await supabase.from('UserProfile').update({ xpPoints: finalXpToSave }).eq('id', authUser.id);
        } catch (error) {
          console.error("Error updating XP:", error);
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
      
      {/* HEADER */}
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

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 space-y-5 pb-24">
        
        {/* MODULE SELECTOR */}
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

        {/* LESSON TITLE BANNER */}
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

        {/* TABS MENU */}
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

        {/* TAB CONTENTS */}
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
                        <td className="p-3 font-sans font-bold text-purple-400">{rule.subject}</td>
                        <td className="p-3 font-semibold text-blue-400">{rule.verb}</td>
                        <td className="p-3 font-light text-slate-200 italic">"{rule.example}"</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-red-950/20 rounded-xl border border-red-900/40 text-xs whitespace-pre-line text-slate-300 font-sans">
                {currentLesson.grammar.commonMistake}
              </div>
            </div>
          )}

          {/* TAB 3: VOCABULARY */}
          {activeTab === "vocabulary" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentLesson.vocabulary.map((vocab, index) => (
                <div key={index} className="bg-[#121b2e] p-4 rounded-2xl border border-slate-800 flex flex-col justify-between shadow-sm hover:border-purple-500/30 transition-all">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-bold text-white tracking-wide">{vocab.word}</h4>
                      <span className="text-[10px] font-semibold bg-slate-800 px-2 py-0.5 rounded text-slate-400">{vocab.type}</span>
                    </div>
                    <span className="text-[11px] font-medium text-purple-400 block mt-1 tracking-wide">{vocab.pronunciation}</span>
                    
                    <p className="text-xs font-medium text-slate-300 mt-2.5 border-l-2 border-slate-700 pl-2">
                      <span className="text-[10px] text-slate-500 block mb-0.5">ትርጉም፡</span>
                      {vocab.amharic}
                    </p>
                    <p className="text-[11px] text-slate-400 italic mt-2 bg-slate-900/50 p-2 rounded-lg">
                      Ex: "{vocab.example}"
                    </p>
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
                {readingStories.map((story: Story) => (
                  <div key={story.id} className="bg-slate-900/40 p-4 rounded-xl border border-slate-800/70 space-y-2">
                    <h4 className="text-xs font-black uppercase text-green-400 tracking-wide">● {story.title}</h4>
                    
                    <p className="text-slate-200 leading-relaxed text-xs md:text-sm font-medium">{story.content}</p>
                    
                    {story.amharicTranslation && (
                      <div className="mt-2 pt-2 border-t border-slate-800/60">
                        <span className="text-[10px] text-blue-400 font-bold block mb-1">ትርጉም፡</span>
                        <p className="text-slate-400 text-[11px] leading-relaxed font-light">
                          {story.amharicTranslation}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SPEAKING */}
          {activeTab === "speaking" && (
            <div className="bg-[#121b2e] p-5 rounded-2xl border border-slate-800 space-y-5">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-slate-200">AI Roleplay Conversation</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => { triggerHaptic(); setSelectedConvIndex(Math.max(0, selectedConvIndex - 1)); resetSpeechState(); }}
                    disabled={selectedConvIndex === 0}
                    className="p-1.5 bg-slate-800 rounded disabled:opacity-30"
                  >
                    ◀
                  </button>
                  <span className="text-xs font-bold px-2 py-1 bg-slate-900 rounded">{selectedConvIndex + 1} / {currentLesson.conversations.length}</span>
                  <button 
                    onClick={() => { triggerHaptic(); setSelectedConvIndex(Math.min(currentLesson.conversations.length - 1, selectedConvIndex + 1)); resetSpeechState(); }}
                    disabled={selectedConvIndex === currentLesson.conversations.length - 1}
                    className="p-1.5 bg-slate-800 rounded disabled:opacity-30"
                  >
                    ▶
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 relative">
                  <span className="text-[10px] uppercase font-black text-blue-400 block mb-1">{currentLesson.conversations[selectedConvIndex].role}</span>
                  <p className="text-sm font-semibold text-slate-100">{currentLesson.conversations[selectedConvIndex].text}</p>
                  <p className="text-[11px] text-slate-400 mt-2 font-light border-l border-slate-700 pl-2">{currentLesson.conversations[selectedConvIndex].translation}</p>
                  <button 
                    onClick={() => handlePlayAudio(currentLesson.conversations[selectedConvIndex].text)}
                    className="absolute top-3 right-3 p-2 bg-blue-500/10 text-blue-400 rounded-lg"
                  >
                    🔊
                  </button>
                </div>

                <div className="flex flex-col items-center space-y-4 pt-4">
                  <button 
                    onClick={handleStartListening}
                    disabled={isListening}
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg border-2 transition-all ${
                      isListening ? 'bg-red-500 border-red-300 animate-pulse' : 'bg-purple-600 border-purple-400 hover:scale-105'
                    }`}
                  >
                    {isListening ? '🎙️' : '🎤'}
                  </button>
                  <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">
                    {isListening ? "Listening... Speak now!" : "Tap to speak"}
                  </p>

                  {userTranscript && (
                    <div className="w-full bg-slate-900/80 p-3 rounded-lg border border-slate-700 text-center">
                      <p className="text-xs text-slate-400 font-light mb-1">You said:</p>
                      <p className="text-sm font-medium text-slate-200">"{userTranscript}"</p>
                    </div>
                  )}

                  {matchScore !== null && (
                    <div className={`px-4 py-2 rounded-xl text-xs font-black border ${
                      matchScore >= 80 ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                      matchScore >= 50 ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                      'bg-red-500/20 text-red-400 border-red-500/30'
                    }`}>
                      Match Accuracy: {matchScore}%
                    </div>
                  )}

                  {speechError && (
                    <p className="text-xs text-red-400 font-bold bg-red-950/40 px-3 py-1.5 rounded">{speechError}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: QUIZ */}
          {activeTab === "quiz" && (
            <div className="bg-[#121b2e] p-5 rounded-2xl border border-slate-800">
              {!quizFinished ? (
                <div className="space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Question {currentQuestionIndex + 1} of {questions.length}</span>
                    <span className="text-[10px] font-bold bg-slate-800 px-2 py-1 rounded text-purple-300">Score: {score}</span>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-bold text-white mb-2 leading-relaxed">{questions[currentQuestionIndex].question}</h3>
                    {questions[currentQuestionIndex].amharicHint && (
                      <p className="text-[11px] text-blue-300/80 font-light border-l-2 border-blue-500/30 pl-2 mb-4">
                        💡 {questions[currentQuestionIndex].amharicHint}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2.5">
                    {questions[currentQuestionIndex].options.map((option, index) => {
                      const isSelected = selectedQuizOption === index;
                      const isCorrect = index === questions[currentQuestionIndex].correctAnswer;
                      let btnClass = "bg-slate-900 border-slate-700 text-slate-300";
                      
                      if (quizSubmitted) {
                        if (isCorrect) btnClass = "bg-green-600/20 border-green-500 text-green-400";
                        else if (isSelected && !isCorrect) btnClass = "bg-red-600/20 border-red-500 text-red-400";
                        else btnClass = "bg-slate-900/50 border-slate-800 text-slate-500 opacity-50";
                      } else if (isSelected) {
                        btnClass = "bg-purple-600 border-purple-400 text-white";
                      }

                      return (
                        <button
                          key={index}
                          disabled={quizSubmitted}
                          onClick={() => { triggerHaptic(15); setSelectedQuizOption(index); }}
                          className={`w-full p-3.5 rounded-xl border flex items-center justify-between transition-all text-sm font-semibold text-left ${btnClass}`}
                        >
                          <span>{option}</span>
                          {quizSubmitted && isCorrect && <span className="text-lg">✅</span>}
                          {quizSubmitted && isSelected && !isCorrect && <span className="text-lg">❌</span>}
                        </button>
                      );
                    })}
                  </div>

                  {!quizSubmitted ? (
                    <button
                      onClick={handleQuizAnswer}
                      disabled={selectedQuizOption === null}
                      className="w-full mt-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white p-3.5 rounded-xl font-bold transition-all"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="w-full mt-4 bg-purple-600 hover:bg-purple-500 text-white p-3.5 rounded-xl font-bold transition-all shadow-[0_0_15px_rgba(147,51,234,0.3)]"
                    >
                      {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Quiz"}
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center space-y-4 py-8">
                  <div className="text-6xl mb-2">🎉</div>
                  <h3 className="text-xl font-black text-white">Quiz Completed!</h3>
                  <p className="text-slate-300 text-sm">
                    You scored <span className="text-green-400 font-bold">{score}</span> out of <span className="text-blue-400 font-bold">{questions.length}</span>
                  </p>
                  <div className="pt-4 flex gap-3 justify-center">
                    <button onClick={restartQuiz} className="bg-slate-800 px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-700">Try Again</button>
                    <button onClick={() => { setActiveLessonId(allGrammarLessons[0].id); setActiveTab("overview"); }} className="bg-purple-600 px-4 py-2 rounded-xl text-xs font-bold text-white shadow-lg">Back to Overview</button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* BOTTOM NAVIGATION - z-50 ተጨምሯል (AI Chat እና Profile ተሰርዟል) */}
      <nav className="fixed bottom-0 z-50 w-full bg-[#0b101d]/95 backdrop-blur-xl border-t border-slate-800/80 pb-safe">
        <div className="flex justify-evenly items-center p-3 max-w-md mx-auto">
          <Link href="/dashboard" className="flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity">
            <span className="text-lg">🏠</span>
            <span className="text-[9px] font-black tracking-widest uppercase">Home</span>
          </Link>
          <button className="flex flex-col items-center gap-1 opacity-100 text-purple-400">
            <span className="text-lg">📖</span>
            <span className="text-[9px] font-black tracking-widest uppercase">Learn</span>
          </button>
        </div>
      </nav>

    </div>
  );
}

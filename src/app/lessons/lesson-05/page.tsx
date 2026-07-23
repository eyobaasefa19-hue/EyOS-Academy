/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// Heroicons ፓኬጅ ስላልተጫነ አጥፍተነዋል፣ በምትኩ ቀጥታ SVG እንጠቀማለን።

// ማሳሰቢያ፡ ይህ የ Supabase አድራሻ ከሌሎች ሌሰኖች (Lesson 02/04) ጋር ተመሳሳይ መሆን አለበት። 
// ካልሰራ '../' እየጨመርክ ወይም እየቀነስክ አስተካክለው።
import { supabase } from "../../../lib/supabase"; 

const practiceWords = [
  { word: "Aviation", meaning: "ከአውሮፕላን በረራ ጋር የተያያዘ" },
  { word: "Logistics", meaning: "የቁሳቁሶች እና ጭነቶች ዝውውር" },
  { word: "Optimization", meaning: "አንድን ነገር ይበልጥ ውጤታማ ማድረግ" },
  { word: "Manifest", meaning: "የጭነቶች ዝርዝር መግለጫ ሰነድ" },
  { word: "Framework", meaning: "ሶፍትዌር ለመስራት የሚያስችል መዋቅር" }
];

export default function SpeakingPractice() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const [feedback, setFeedback] = useState<"idle" | "correct" | "incorrect">("idle");
  const [isClaiming, setIsClaiming] = useState(false);
  const [completed, setCompleted] = useState(false);

  const currentWord = practiceWords[currentIndex];

  const speakWord = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(currentWord.word);
      utterance.lang = "en-US";
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("ይቅርታ፣ የእርስዎ ብሮውዘር ድምፅ ማሰማት አይችልም።");
    }
  };

  const listenWord = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("ይቅርታ፣ የእርስዎ ብሮውዘር ድምፅ መቀበል (Speech Recognition) አይደግፍም። (Chrome ይጠቀሙ)");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setSpokenText("");
      setFeedback("idle");
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSpokenText(transcript);
      
      if (transcript.toLowerCase().replace(/[.,]/g, '') === currentWord.word.toLowerCase()) {
        setFeedback("correct");
      } else {
        setFeedback("incorrect");
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleNext = () => {
    if (currentIndex < practiceWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFeedback("idle");
      setSpokenText("");
    } else {
      setCompleted(true);
    }
  };

  const handleCompleteLesson = async () => {
    setIsClaiming(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('UserProfile')
          .select('xpPoints')
          .eq('id', user.id)
          .single();

        const currentXP = profile?.xpPoints || 0;
        await supabase
          .from('UserProfile')
          .update({ xpPoints: currentXP + 100 })
          .eq('id', user.id);
      }
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Error claiming XP:", error);
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-4 sm:p-6 pb-24 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg">
        
        <Link href="/dashboard" className="text-indigo-400 hover:underline mb-8 inline-block transition-transform hover:-translate-x-1">
          ← ዳሽቦርድ
        </Link>

        <div className="mb-8">
          <div className="flex justify-between text-xs mb-2 text-gray-400">
            <span>Progress</span>
            <span>{currentIndex + 1} / {practiceWords.length}</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / practiceWords.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {!completed ? (
          <div className="bg-[#161B26]/80 backdrop-blur-md border border-gray-800 rounded-3xl p-8 text-center shadow-xl">
            <h1 className="text-xl text-gray-400 mb-2">Speak this word:</h1>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-4">
              {currentWord.word}
            </h2>
            <p className="text-sm text-gray-500 mb-8">{currentWord.meaning}</p>

            <div className="flex justify-center gap-6 mb-8">
              <button 
                onClick={speakWord}
                className="w-14 h-14 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all border border-gray-700 hover:border-indigo-500 group"
                title="Listen to the word"
              >
                {/* Speaker Icon SVG */}
                <svg className="w-6 h-6 text-indigo-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
                  <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
                </svg>
              </button>

              <button 
                onClick={listenWord}
                disabled={isListening}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-lg border-4 ${
                  isListening 
                    ? "bg-rose-500/20 border-rose-500 animate-pulse shadow-rose-500/40" 
                    : "bg-indigo-600 hover:bg-indigo-700 border-indigo-500/50 hover:scale-105"
                }`}
                title="Tap and Speak"
              >
                {/* Microphone Icon SVG */}
                <svg className={`w-8 h-8 ${isListening ? "text-rose-500" : "text-white"}`} fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 14a3 3 0 003-3V6a3 3 0 00-6 0v5a3 3 0 003 3zm5-3a1 1 0 012 0 7 7 0 01-14 0 1 1 0 012 0 5 5 0 0010 0zm-6 8v3h2v-3h-2z" />
                </svg>
              </button>
            </div>

            <div className="h-20 flex flex-col items-center justify-center">
              {isListening && (
                <p className="text-indigo-400 animate-pulse text-sm">እያዳመጠ ነው (Listening)... 🎙️</p>
              )}
              
              {!isListening && spokenText && (
                <div className="flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                  <p className="text-gray-300 text-sm">አንተ ያልከው: <span className="font-semibold text-white italic">"{spokenText}"</span></p>
                  
                  {feedback === "correct" ? (
                    <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-lg text-sm">
                      {/* Check Icon SVG */}
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 11.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                      </svg>
                      <span>ትክክል ነው! (Perfect)</span>
                    </div>
                  ) : feedback === "incorrect" ? (
                    <div className="flex items-center gap-1.5 text-rose-400 bg-rose-400/10 px-3 py-1.5 rounded-lg text-sm">
                      {/* X Icon SVG */}
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                      </svg>
                      <span>አልተመሳሰለም፣ ድጋሚ ሞክር!</span>
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            {feedback === "correct" && (
              <button 
                onClick={handleNext}
                className="mt-6 w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all animate-in zoom-in"
              >
                ቀጣይ ቃል (Next) ➡️
              </button>
            )}
          </div>
        ) : (
          <div className="bg-[#161B26]/80 backdrop-blur-md border border-gray-800 rounded-3xl p-8 text-center shadow-xl animate-in fade-in zoom-in">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              {/* Large Check Icon SVG */}
              <svg className="w-12 h-12 text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 11.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">ድንቅ ስራ! (Excellent)</h2>
            <p className="text-gray-400 mb-8">የንግግር ልምምድህን በሚገባ አጠናቀሃል።</p>
            
            <button
              onClick={handleCompleteLesson}
              disabled={isClaiming}
              className={`w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg ${
                isClaiming
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 text-white"
              }`}
            >
              {isClaiming ? "XP በማስመዝገብ ላይ..." : "🎉 ሽልማት ተቀበል (+100 XP)"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

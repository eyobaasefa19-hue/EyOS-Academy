"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  MicrophoneIcon, 
  SpeakerWaveIcon, 
  CheckCircleIcon, 
  XCircleIcon 
} from "@heroicons/react/24/solid";
// ሱፓቤዝን በ Next.js standard alias (@/lib/supabase) ቀይረነዋል
import { supabase } from "@/lib/supabase"; 

// የምንለማመድባቸው ቃላት ዝርዝር
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

  // 1. Text-to-Speech (ቃሉን በድምፅ ለማሰማት)
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

  // 2. Speech Recognition (የተጠቃሚውን ድምፅ ለማዳመጥ)
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

  // ቀጣይ ቃል ለማምጣት
  const handleNext = () => {
    if (currentIndex < practiceWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFeedback("idle");
      setSpokenText("");
    } else {
      setCompleted(true);
    }
  };

  // XP መዝግቦ ትምህርቱን ለመጨረስ
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

        {/* Progress Bar */}
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

            {/* Action Buttons */}
            <div className="flex justify-center gap-6 mb-8">
              <button 
                onClick={speakWord}
                className="w-14 h-14 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-all border border-gray-700 hover:border-indigo-500 group"
                title="Listen to the word"
              >
                <SpeakerWaveIcon className="w-6 h-6 text-indigo-400 group-hover:scale-110 transition-transform" />
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
                <MicrophoneIcon className={`w-8 h-8 ${isListening ? "text-rose-500" : "text-white"}`} />
              </button>
            </div>

            {/* Feedback Area */}
            <div className="h-20 flex flex-col items-center justify-center">
              {isListening && (
                <p className="text-indigo-400 animate-pulse text-sm">እያዳመጠ ነው (Listening)... 🎙️</p>
              )}
              
              {!isListening && spokenText && (
                <div className="flex flex-col items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                  <p className="text-gray-300 text-sm">አንተ ያልከው: <span className="font-semibold text-white italic">"{spokenText}"</span></p>
                  
                  {feedback === "correct" ? (
                    <div className="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-lg text-sm">
                      <CheckCircleIcon className="w-5 h-5" />
                      <span>ትክክል ነው! (Perfect)</span>
                    </div>
                  ) : feedback === "incorrect" ? (
                    <div className="flex items-center gap-1.5 text-rose-400 bg-rose-400/10 px-3 py-1.5 rounded-lg text-sm">
                      <XCircleIcon className="w-5 h-5" />
                      <span>አልተመሳሰለም፣ ድጋሚ ሞክር!</span>
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            {/* Next Button */}
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
          // Completion State
          <div className="bg-[#161B26]/80 backdrop-blur-md border border-gray-800 rounded-3xl p-8 text-center shadow-xl animate-in fade-in zoom-in">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="w-12 h-12 text-emerald-500" />
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

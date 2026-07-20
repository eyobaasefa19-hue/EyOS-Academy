"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { lessonTwoVocabulary } from "./vocabularyData"; 
import { supabase } from "../../../lib/supabase";

export default function VocabularyLesson() {
  const [isClaiming, setIsClaiming] = useState(false);
  const router = useRouter();

  const handleCompleteLesson = async () => {
    setIsClaiming(true);

    try {
      // 1. የገባውን ተጠቃሚ (User) መለየት
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // 2. አሁን ያለውን የ XP መጠን ከ UserProfile ቴብል ማምጣት
        const { data: profile, error: fetchError } = await supabase
          .from('UserProfile')
          .select('xpPoints')
          .eq('id', user.id)
          .single();

        if (fetchError) throw fetchError;

        const currentXP = profile?.xpPoints || 0;

        // 3. አዲሱን 50 XP ደምሮ UserProfile ቴብሉን አፕዴት ማድረግ
        const { error: updateError } = await supabase
          .from('UserProfile')
          .update({ xpPoints: currentXP + 50 })
          .eq('id', user.id);

        if (updateError) throw updateError;
      }

      // ሁሉም ሲሳካ ወደ ዳሽቦርድ መመለስ
      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("Error claiming XP:", error);
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-6 pb-24">
      <div className="max-w-3xl mx-auto">
        <Link href="/dashboard" className="text-indigo-400 hover:underline mb-6 inline-block transition-transform hover:-translate-x-1">
          ← ወደ ማውጫ ይመለሱ
        </Link>

        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Lesson 02: Vocabulary Builder
        </h1>
        <p className="text-gray-400 mb-8">ቃላትን በፍጥነት የሚያጠኑበት እና አጠቃቀማቸውን የሚለማመዱበት ክፍል::</p>

        {/* ዳይናሚክ የሆነው የካርዶች ሉፕ (Map) */}
        {lessonTwoVocabulary.map((item, index) => (
          <div key={index} className="bg-[#161B26]/60 backdrop-blur-md border border-gray-800 p-6 rounded-2xl mb-6 hover:border-purple-500/40 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl font-bold text-purple-400">
                {item.word} <span className="text-lg text-gray-400 font-normal">({item.amharicType})</span>
              </h2>
              <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                {item.englishType}
              </span>
            </div>
            
            <p className="text-gray-300 mb-4">
              <strong className="text-white">ትርጉም:-</strong> {item.meaning}
            </p>
            
            <div className="bg-[#0B0F19] p-4 rounded-xl border border-gray-800/50">
              <p className="text-sm text-gray-400 mb-1`">ምሳሌ በአረፍተ ነገር:-</p>
              <p className="text-gray-200 italic">
                "{item.exampleEng}"
              </p>
              <p className="text-xs text-indigo-400 mt-1">
                ({item.exampleAmh})
              </p>
            </div>
          </div>
        ))}
        {/* ሉፕ እዚህ ያልቃል */}

        {/* ማጠናቀቂያ እና XP መቀበያ ቁልፍ */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleCompleteLesson}
            disabled={isClaiming}
            className={`px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg ${
              isClaiming
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 hover:shadow-purple-500/25 text-white"
            }`}
          >
            {isClaiming ? "XP እየመዘገበ ነው ⏳..." : "🎉 ትምህርቱን ጨርሻለሁ (+50 XP)"}
          </button>
        </div>

      </div>
    </div>
  );
}

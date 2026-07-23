"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { lessonTwoVocabulary } from "./vocabularyData"; 
import { supabase } from "../../../lib/supabase";

export default function VocabularyLesson() {
  const [isClaiming, setIsClaiming] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [bookmarkedWords, setBookmarkedWords] = useState<string[]>([]);
  
  const router = useRouter();

  // ቃላትን በፍለጋ እና በምድብ የማጣራት ሎጂክ
  const filteredVocabulary = useMemo(() => {
    return lessonTwoVocabulary.filter((item) => {
      const matchesSearch = 
        item.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.exampleEng.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === "All" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // ቃላትን ከዕልባት (Bookmark) የማድረግ/የማንሳት ሎጂክ
  const toggleBookmark = (word: string) => {
    setBookmarkedWords((prev) => 
      prev.includes(word) ? prev.filter(w => w !== word) : [...prev, word]
    );
  };

  const handleCompleteLesson = async () => {
    setIsClaiming(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: profile, error: fetchError } = await supabase
          .from('UserProfile')
          .select('xpPoints')
          .eq('id', user.id)
          .single();

        if (fetchError) throw fetchError;

        const currentXP = profile?.xpPoints || 0;

        const { error: updateError } = await supabase
          .from('UserProfile')
          .update({ xpPoints: currentXP + 50 })
          .eq('id', user.id);

        if (updateError) throw updateError;
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
    <div className="min-h-screen bg-[#0B0F19] text-white p-4 sm:p-6 pb-24">
      <div className="max-w-3xl mx-auto">
        <Link href="/dashboard" className="text-indigo-400 hover:underline mb-6 inline-block transition-transform hover:-translate-x-1 text-sm sm:text-base">
          ← ወደ ማውጫ ይመለሱ
        </Link>

        <h1 className="text-2xl sm:text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Lesson 02: Vocabulary Builder
        </h1>
        <p className="text-sm text-gray-400 mb-6">ቃላትን በፍጥነት የሚያጠኑበት እና አጠቃቀማቸውን የሚለማመዱበት ክፍል::</p>

        {/* ፈልግ እና ማጣሪያ (Search and Filters) */}
        <div className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="🔍 ቃላትን ፈልግ (Search words)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#161B26] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
          />

          <div className="flex flex-wrap gap-2">
            {["All", "Aviation", "Tech", "General"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-900/30"
                    : "bg-[#161B26] text-gray-400 hover:text-white border border-gray-800"
                }`}
              >
                {cat === "All" ? "ሁሉም (All)" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* የቃላት ብዛት ማሳያ */}
        <div className="flex justify-between items-center mb-4 text-xs text-gray-400 px-1">
          <span>ተገኘ: {filteredVocabulary.length} ቃላት</span>
          <span>{bookmarkedWords.length} ቃላት ተቀምጠዋል (Bookmarks)</span>
        </div>

        {/* ዳይናሚክ የሆነው የካርዶች ሉፕ (Map) */}
        {filteredVocabulary.length === 0 ? (
          <div className="text-center py-12 bg-[#161B26]/40 border border-gray-800 rounded-2xl">
            <p className="text-gray-400 text-sm">ምንም የሚዛመድ ቃል አልተገኘም።</p>
          </div>
        ) : (
          filteredVocabulary.map((item, index) => {
            const isBookmarked = bookmarkedWords.includes(item.word);
            return (
              <div 
                key={index} 
                className="bg-[#161B26]/60 backdrop-blur-md border border-gray-800 p-5 sm:p-6 rounded-2xl mb-4 hover:border-purple-500/40 transition-colors relative"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-purple-400 flex items-center gap-2">
                      {item.word} 
                      <span className="text-sm text-gray-400 font-normal">({item.amharicType})</span>
                    </h2>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleBookmark(item.word)}
                      className={`p-1.5 rounded-lg border text-xs transition-colors ${
                        isBookmarked 
                          ? "bg-amber-500/20 border-amber-500/40 text-amber-300" 
                          : "bg-gray-800/50 border-gray-700 text-gray-400 hover:text-white"
                      }`}
                      title={isBookmarked ? "ከተቀመጡ ቃላት ሰርዝ" : "አስቀምጥ (Bookmark)"}
                    >
                      {isBookmarked ? "⭐ ተቀምጧል" : "☆ አስቀምጥ"}
                    </button>
                    <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                      {item.englishType}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-4 text-sm sm:text-base">
                  <strong className="text-white">ትርጉም:-</strong> {item.meaning}
                </p>
                
                <div className="bg-[#0B0F19] p-3.5 sm:p-4 rounded-xl border border-gray-800/50">
                  <p className="text-xs text-gray-400 mb-1">ምሳሌ በአረፍተ ነገር:-</p>
                  <p className="text-gray-200 italic text-sm">
                    "{item.exampleEng}"
                  </p>
                  <p className="text-xs text-indigo-400 mt-1">
                    ({item.exampleAmh})
                  </p>
                </div>
              </div>
            );
          })
        )}
        {/* ሉፕ እዚህ ያልቃል */}

        {/* ማጠናቀቂያ እና XP መቀበያ ቁልፍ */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleCompleteLesson}
            disabled={isClaiming}
            className={`px-8 py-3.5 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all shadow-lg ${
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

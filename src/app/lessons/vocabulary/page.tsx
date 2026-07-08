"use client";

import Link from "next/link";

export default function VocabularyLesson() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/dashboard" className="text-indigo-400 hover:underline mb-6 inline-block">
          ← ወደ ዳሽቦርድ ይመለሱ
        </Link>
        
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Lesson 02: Vocabulary Builder
        </h1>
        <p className="text-gray-400 mb-8">ቃላትን በፍጥነት የሚያጠኑበት እና አጠቃቀማቸውን የሚለማመዱበት ክፍል።</p>

        {/* Word Card 1 */}
        <div className="bg-[#161B26]/60 backdrop-blur-md border border-gray-800 p-6 rounded-2xl mb-6">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold text-purple-400">Explore (ግስ)</h2>
            <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">Verb</span>
          </div>
          <p className="text-gray-300 mb-4"><strong>ትርጉም፦</strong> አዲስ ነገርን ለማወቅ መፈለግ፣ መመርመር ወይም መቃኘት።</p>
          <div className="bg-[#0B0F19] p-4 rounded-xl border border-gray-800/50">
            <p className="text-sm text-gray-400 mb-1">ምሳሌ በአረፍተ ነገር፦</p>
            <p className="text-gray-200 italic">"I want to explore new technologies and software development."</p>
            <p className="text-xs text-indigo-400 mt-1">(አዳዲስ ቴክኖሎጂዎችን እና የሶፍትዌር ልማትን መመርመር/ማወቅ እፈልጋለሁ።)</p>
          </div>
        </div>

        {/* Word Card 2 */}
        <div className="bg-[#161B26]/60 backdrop-blur-md border border-gray-800 p-6 rounded-2xl">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold text-purple-400">Essential (ቅጽል)</h2>
            <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">Adjective</span>
          </div>
          <p className="text-gray-300 mb-4"><strong>ትርጉம்፦</strong> በጣም አስፈላጊ ወይም ግዴታ የሆነ ነገር።</p>
          <div className="bg-[#0B0F19] p-4 rounded-xl border border-gray-800/50">
            <p className="text-sm text-gray-400 mb-1">ምሳሌ በአረፍተ ነገር፦</p>
            <p className="text-gray-200 italic">"Learning English is essential for global communication."</p>
            <p className="text-xs text-indigo-400 mt-1">(እንግሊዝኛን መማር ለአለም አቀፍ ተግባቦት በጣም አስፈላጊ ነው።)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

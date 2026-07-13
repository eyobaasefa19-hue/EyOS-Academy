"use client";

import Link from "next/link";
import { lessonTwoVocabulary } from "./vocabularyData"; 

export default function VocabularyLesson() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/dashboard" className="text-indigo-400 hover:underline mb-6 inline-block">
          ← ወደ ማውጫ ይመለሱ
        </Link>

        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Lesson 02: Vocabulary Builder
        </h1>
        <p className="text-gray-400 mb-8">ቃላትን በፍጥነት የሚያጠኑበት እና አጠቃቀማቸውን የሚለማመዱበት ክፍል::</p>

        {/* ዳይናሚክ የሆነው የካርዶች ሉፕ (Map) እዚህ ይጀምራል */}
        {lessonTwoVocabulary.map((item, index) => (
          <div key={index} className="bg-[#161B26]/60 backdrop-blur-md border border-gray-800 p-6 rounded-2xl mb-6">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl font-bold text-purple-400">
                {item.word} ({item.amharicType})
              </h2>
              <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded">
                {item.englishType}
              </span>
            </div>
            
            <p className="text-gray-300 mb-4">
              <strong>ትርጉም:-</strong> {item.meaning}
            </p>
            
            <div className="bg-[#0B0F19] p-4 rounded-xl border border-gray-800/50">
              <p className="text-sm text-gray-400 mb-1">ምሳሌ በአረፍተ ነገር:-</p>
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

      </div>
    </div>
  );
}

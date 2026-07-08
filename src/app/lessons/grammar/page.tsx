"use client";

import Link from "next/link";

export default function GrammarLesson() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/dashboard" className="text-indigo-400 hover:underline mb-6 inline-block">
          ← ወደ ዳሽቦርድ ይመለሱ
        </Link>
        
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Lesson 01: Grammar & Speaking
        </h1>
        <p className="text-gray-400 mb-8">መሠረታዊ የእንግሊዝኛ ሰዋስው እና የዕለት ተዕለት የንግግር ልምምዶች።</p>

        <div className="bg-[#161B26]/60 backdrop-blur-md border border-gray-800 p-6 rounded-2xl mb-6">
          <h2 className="text-xl font-semibold mb-3 text-indigo-300">1. Introduction to Verb "To Be"</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            በእንግሊዝኛ ቋንቋ ውስጥ ትልቁን ድርሻ የሚይዘው <strong>Verb to be (Am, Is, Are)</strong> አጠቃቀም ነው። 
            እነዚህን ቃላት ስለ ራሳችን፣ ስለ ሌላ ሰው ወይም ስለ ዕቃዎች ማንነት፣ ሁኔታ እና መገኛ ለመናገር እንጠቀምባቸዋለን።
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-400">
            <li><strong className="text-white">I am</strong> a student. (እኔ ተማሪ ነኝ።)</li>
            <li><strong className="text-white">He/She is</strong> smart. (እሱ/እሷ ጎበዝ ናት።)</li>
            <li><strong className="text-white">They are</strong> here. (እነሱ እዚህ አሉ።)</li>
          </ul>
        </div>

        <div className="bg-[#161B26]/60 backdrop-blur-md border border-gray-800 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold mb-3 text-purple-300">2. Speaking Practice (የንግግር ልምምድ)</h2>
          <p className="text-gray-300 mb-4">የሚከተሉትን ዓረፍተ ነገሮች ጮክ ብለው በማንበብ ይለማመዱ፦</p>
          <blockquote className="border-l-4 border-indigo-500 bg-[#0B0F19] p-4 rounded-r-xl text-gray-300 italic">
            "Hello, my name is Eyob. I am exploring software development and learning English to level up my career!"
          </blockquote>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050b14] text-white flex flex-col items-center justify-center px-4 relative overflow-hidden pt-20">
      
      {/* Background Ambient Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-[300px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Hero Badge */}
      <div className="inline-flex items-center gap-2 bg-[#0f172a]/80 border border-gray-800/80 px-4 py-2 rounded-full text-xs font-medium text-blue-300 mb-8 backdrop-blur-md shadow-xl shadow-black/20 animate-fade-in">
        <span>✨ AI-Powered English Learning</span>
      </div>

      {/* Main Heading with Gradient */}
      <h1 className="text-4xl md:text-6xl font-black text-center tracking-tight leading-[1.25] max-w-3xl mb-6">
        በእንግሊዝኛ ቋንቋ 
        <span className="block mt-2 bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
          በራስ መተማመን ይናገሩ!
        </span>
      </h1>

      {/* Subtext description */}
      <p className="text-gray-400 text-center text-base md:text-lg max-w-xl mb-12 leading-relaxed font-light px-2">
        EyOS Academy ለአማርኛ ተናጋሪዎች ተብሎ የተሰራ፣ በAI የታገዘ የግል የእንግሊዝኛ ቋንቋ ማስተማሪያ መድረክ ነው። ንግግርዎን፣ አጻጻፍዎን እና ሰዋስውዎን በተግባር ያሳድጉ።
      </p>

      {/* Action Buttons connected to /login */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs sm:max-w-none sm:justify-center items-center z-10">
        <Link href="/login" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 flex items-center justify-center gap-2 text-sm transform hover:-translate-y-0.5 active:translate-y-0 text-center">
          ነጻ የ AI Tutor ይጀምሩ 🧠
        </Link>
        
        <Link href="/login" className="w-full sm:w-auto bg-[#0f172a]/60 hover:bg-[#0f172a] border border-gray-800 hover:border-gray-700 text-gray-300 hover:text-white font-medium px-8 py-4 rounded-2xl transition-all duration-300 backdrop-blur-md flex items-center justify-center text-sm text-center">
          ባህሪያትን ይመልከቱ
        </Link>
      </div>

    </main>
  );
}

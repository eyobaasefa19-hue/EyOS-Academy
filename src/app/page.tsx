import React from 'react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#090d16] text-white flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-[250px] h-[250px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Hero Content */}
      <div className="max-w-3xl mx-auto text-center z-10 space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full text-xs font-medium text-blue-400">
          <span>✨ AI-Powered English Learning</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
          በእንግሊዘኛ ቋንቋ <br />
          <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            በልበ ሙሉነት ይናገሩ!
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          EyOS Academy ለአማርኛ ተናጋሪዎች ተብሎ የተሰራ፣ በAI የታገዘ የግል የእንግሊዘኛ ቋንቋ ማስተማሪያ መድረክ ነው። ንግግርዎን፣ አጻጻፍዎን እና ሰዋስውዎን በተግባር ያሳድጉ።
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold px-8 py-3.5 rounded-xl shadow-xl shadow-blue-500/10 transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-sm">
            ነፃ የ AI Tutor ይጀምሩ 🧠
          </button>
          <a 
            href="#features" 
            className="w-full sm:w-auto text-center border border-gray-800 hover:border-gray-700 bg-gray-900/40 text-gray-300 font-medium px-8 py-3.5 rounded-xl text-sm transition"
          >
            ባህሪያትን ይመልከቱ
          </a>
        </div>
      </div>
    </main>
  );
}

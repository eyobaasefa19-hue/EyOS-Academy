/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import Link from "next/link";

// --- Types ---
interface UserStats {
  username: string;
  xp: number;
  coins: number;
  streakDays: number;
  currentLevel: number;
  dailyGoalPercent: number;
}

interface CoreModule {
  id: string;
  title: string;
  desc: string;
  icon: string;
  href: string;
  badge: string;
  color: string;
}

interface CourseItem {
  id: string;
  title: string;
  category: string;
  progress: number;
}

// --- Dynamic Profile Data ---
const INITIAL_STATS: UserStats = {
  username: "eyob19",
  xp: 6390,
  coins: 1250,
  streakDays: 8,
  currentLevel: 14,
  dailyGoalPercent: 80,
};

// --- PERFECTED ROUTES (Matched EXACTLY with your Vercel Logs) ---
const CORE_HUB_MODULES: CoreModule[] = [
  {
    id: "grammar",
    title: "Grammar & Basics",
    desc: "የእንግሊዘኛ ቋንቋ ሰዋሰው እና መሰረታዊ የዓረፍተ ነገር አወቃቀር",
    icon: "📝",
    href: "/lessons/grammar",      // ✅ ተስተካክሏል (ወደ ኮርስ አይወስድም)
    badge: "Lesson 01",
    color: "from-blue-900/40 to-[#0F172A] border-blue-500/20",
  },
  {
    id: "vocab",
    title: "Vocabulary Builder",
    desc: "ቃላትን በፍጥነት የሚያጠናክሩበት እና የሚያስታውሱበት ክፍል",
    icon: "🔤",
    href: "/lessons/vocabulary",   // ✅ Lesson 02
    badge: "Lesson 02",
    color: "from-purple-900/40 to-[#0F172A] border-purple-500/20",
  },
  {
    id: "ai-tutor",
    title: "AI Chat Tutor",
    desc: "ከአርቴፊሻል ኢንተለጀንስ ጋር በመወያየት በቀጥታ ልምድ ያዳብሩ",
    icon: "🤖",
    href: "/lessons/ai-chat",      // ✅ Lesson 03
    badge: "Lesson 03",
    color: "from-emerald-900/40 to-[#0F172A] border-emerald-500/20",
  },
  {
    id: "practical",
    title: "Practical Hub",
    desc: "የንግግር፣ የፅሁፍ እና የቀን ተቀን የቋንቋ ክህሎት ማሳደጊያ",
    icon: "🎓",
    href: "/lessons/practical-hub", // ✅ Lesson 04
    badge: "Lesson 04",
    color: "from-amber-900/40 to-[#0F172A] border-amber-500/20",
  },
];

// --- Added the exact courses from your Logs ---
const IN_PROGRESS_COURSES: CourseItem[] = [
  {
    id: "flutter-mobile-mastery",
    title: "Full-Stack Flutter & Supabase App",
    category: "Mobile Dev",
    progress: 68,
  },
  {
    id: "ai-prompt-engineering",
    title: "Advanced AI Prompt Engineering",
    category: "AI & Tech",
    progress: 34,
  }
];

export default function ProDashboard() {
  const [stats] = useState<UserStats>(INITIAL_STATS);

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-200 font-sans pb-24">
      
      {/* 1. TOP NAVBAR (Ultra Clean) */}
      <nav className="sticky top-0 z-50 bg-[#070B14]/80 backdrop-blur-xl border-b border-white/5 px-4 py-3.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-[11px] text-white shadow-lg">
              EY
            </div>
            <span className="text-sm font-extrabold tracking-wide text-slate-100">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">EyOS</span> Academy
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold">
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-amber-400 shadow-sm">
              <span>🔥 {stats.streakDays}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-indigo-400 shadow-sm">
              <span>⚡ {stats.xp}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 pt-6 space-y-8">

        {/* 2. WELCOME BANNER & DAILY GOAL (Combined to avoid repetition) */}
        <section className="bg-gradient-to-br from-[#111827] to-[#0F172A] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Background Glow Effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-widest">
                Level {stats.currentLevel} Scholar
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                ሰላም፣ {stats.username} 👋
              </h1>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                እንኳን በደህና መጣህ። አሁን በ <strong className="text-amber-400">{stats.streakDays} ቀን Streak</strong> ላይ ትገኛለህ። የዛሬውን የመማር ግብህን ከዳር አድርስ!
              </p>
            </div>

            {/* Daily Goal Compact UI */}
            <div className="w-full md:w-64 bg-black/20 rounded-2xl p-4 border border-white/5">
               <div className="flex justify-between items-end mb-2">
                 <span className="text-[11px] text-slate-400 font-medium">የዛሬው ግብ (Daily Goal)</span>
                 <span className="text-xs font-bold text-indigo-400">45 / 60 ደቂቃ</span>
               </div>
               <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                 <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full" style={{ width: `${stats.dailyGoalPercent}%` }} />
               </div>
            </div>
          </div>
        </section>

        {/* 3. CORE LESSONS (The 4 Modules - Perfectly Routed) */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <span className="text-lg">🧩</span> የቋንቋ ማዳበሪያ ክፍሎች (Lessons)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CORE_HUB_MODULES.map((mod) => (
              <Link href={mod.href} key={mod.id} className="group outline-none">
                <div className={`bg-gradient-to-br ${mod.color} rounded-2xl p-5 border transition-all duration-300 group-hover:border-white/20 group-hover:-translate-y-1 group-hover:shadow-xl h-full flex flex-col justify-between gap-5 relative overflow-hidden`}>
                  
                  <div className="flex items-start justify-between relative z-10">
                    <span className="text-3xl bg-black/20 p-2.5 rounded-xl border border-white/5 shadow-inner">
                      {mod.icon}
                    </span>
                    <span className="text-[10px] bg-black/40 text-slate-300 px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider border border-white/5">
                      {mod.badge}
                    </span>
                  </div>
                  
                  <div className="relative z-10">
                    <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-indigo-300 transition-colors">{mod.title}</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">{mod.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. ACTIVE COURSES (Based on your Vercel logs) */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <span className="text-lg">📚</span> የጀመርካቸው ኮርሶች (Courses)
            </h2>
            <Link href="/courses" className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300">
              ሁሉንም እይ →
            </Link>
          </div>
          
          <div className="grid gap-3">
            {IN_PROGRESS_COURSES.map((course) => (
              <div key={course.id} className="bg-[#111827] hover:bg-[#151E32] transition-colors border border-white/5 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1 w-full">
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">{course.category}</span>
                  <h3 className="text-sm font-bold text-white mt-0.5 mb-2">{course.title}</h3>
                  <div className="flex items-center gap-3">
                     <div className="flex-1 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                       <div className="bg-emerald-500 h-full" style={{ width: `${course.progress}%` }} />
                     </div>
                     <span className="text-[10px] text-emerald-400 font-bold w-6">{course.progress}%</span>
                  </div>
                </div>
                <Link
                  href={`/courses/${course.id}/learn`}
                  className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white text-[11px] font-bold px-6 py-2.5 rounded-xl border border-white/10 transition-colors text-center shrink-0"
                >
                  ቀጥል (Resume)
                </Link>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

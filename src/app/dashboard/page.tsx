/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import Link from "next/link";

// --- Types ---
interface UserStats {
  username: string;
  email: string;
  xp: number;
  coins: number;
  gems: number;
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
  badge?: string;
  color: string;
}

interface CourseItem {
  id: string;
  title: string;
  category: string;
  progress: number;
  lastLesson: string;
}

// --- Dynamic Profile Data ---
const INITIAL_STATS: UserStats = {
  username: "eyob19",
  email: "eyob19@gmail.com",
  xp: 6390,
  coins: 1250,
  gems: 85,
  streakDays: 8,
  currentLevel: 14,
  dailyGoalPercent: 80,
};

// --- CORRECTED ROUTES (Based on your Vercel Build Logs) ---
const CORE_HUB_MODULES: CoreModule[] = [
  {
    id: "syllabus",
    title: "Syllabus Modules",
    desc: "በደረጃና በዘርፍ የተከፈሉ የተዋቀሩ የትምህርት አርእስቶችና ኮርሶች",
    icon: "📖",
    href: "/courses", // ትክክል
    badge: "የተሟላ",
    color: "from-blue-900/40 to-slate-900 border-blue-500/30",
  },
  {
    id: "vocab",
    title: "Vocabulary Builder",
    desc: "ቃላትን በፍጥነት የሚያጠናክሩበት እና የሚያስታውሱበት ልዩ ክፍል",
    icon: "🔤",
    href: "/lessons/vocabulary", // ተስተካክሏል (Log: /lessons/vocabulary)
    badge: "AI Powered",
    color: "from-purple-900/40 to-slate-900 border-purple-500/30",
  },
  {
    id: "ai-tutor",
    title: "AI Chat Tutor",
    desc: "ከአርቴፊሻል ኢንተለጀንስ ጋር በመወያየት በቀጥታ ልምድ ያዳብሩ",
    icon: "🤖",
    href: "/lessons/ai-chat", // ተስተካክሏል (Log: /lessons/ai-chat)
    badge: "Live 24/7",
    color: "from-emerald-900/40 to-slate-900 border-emerald-500/30",
  },
  {
    id: "practical-english",
    title: "Practical English Hub",
    desc: "የንግግር፣ የፅሁፍ እና የቀን ተቀን የቋንቋ ክህሎት ማሳደጊያ",
    icon: "🎓",
    href: "/lessons/practical-hub", // ተስተካክሏል (Log: /lessons/practical-hub)
    badge: "Essential",
    color: "from-amber-900/40 to-slate-900 border-amber-500/30",
  },
];

const IN_PROGRESS_COURSES: CourseItem[] = [
  {
    id: "flutter-mobile-mastery",
    title: "Full-Stack Flutter & Supabase Mobile App",
    category: "Mobile Dev",
    progress: 68,
    lastLesson: "2.2 Authentication",
  }
];

// --- Clean Glass Card Component ---
const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-2xl p-5 text-white shadow-lg ${className}`}>
    {children}
  </div>
);

export default function EyOSCleanDashboard() {
  const [stats] = useState<UserStats>(INITIAL_STATS);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans pb-20">
      
      {/* 1. TOP NAVBAR (Clean & Simple) */}
      <div className="sticky top-0 z-40 bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800 px-4 py-3">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs text-white">
              EY
            </span>
            <span className="text-sm font-bold text-slate-300">
              <span className="text-indigo-400">EyOS</span> Academy
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold">
            <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-2.5 py-1.5 rounded-lg text-amber-400">
              <span>🔥 {stats.streakDays} ቀን</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-2.5 py-1.5 rounded-lg text-indigo-400">
              <span>⚡ {stats.xp} XP</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-2.5 py-1.5 rounded-lg text-yellow-300">
              <span>🪙 {stats.coins}</span>
            </div>
          </div>

        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 pt-6 space-y-6">

        {/* 2. WELCOME BANNER (Fixed Layout - No more overlapping) */}
        <div className="bg-gradient-to-r from-indigo-950 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 sm:p-6 shadow-xl">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
               <span className="bg-indigo-500/20 text-indigo-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-indigo-500/30 uppercase tracking-wider">
                 Level {stats.currentLevel} Scholar
               </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              ሰላም፣ {stats.username} 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
              እንኳን በደህና መጣህ። አሁን በ <strong className="text-amber-400">{stats.streakDays} ቀን ተከታታይ (Streak)</strong> የመማር ሂደት ላይ ትገኛለህ።
            </p>
            
            <div className="pt-2">
               <Link
                 href="/courses"
                 className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-6 py-3 rounded-xl transition-colors"
               >
                 የትምህርት ክፍሎችን ቀጥል ➔
               </Link>
            </div>
          </div>
        </div>

        {/* 3. DAILY GOAL (Clean UI) */}
        <GlassCard>
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[11px] text-slate-400 font-medium">የዛሬው ግብ (Daily Goal)</span>
              <h3 className="text-sm font-bold text-white mt-0.5">45 / 60 ደቂቃ ተጠናቋል</h3>
            </div>
            <span className="text-2xl">🎯</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold">
              <span className="text-indigo-400">{stats.dailyGoalPercent}% ተጠናቋል</span>
              <span className="text-slate-400">15 ደቂቃ ቀርቷል</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
              <div
                className="bg-indigo-500 h-full rounded-full transition-all"
                style={{ width: `${stats.dailyGoalPercent}%` }}
              />
            </div>
          </div>
        </GlassCard>

        {/* 4. LEARNING HUB MODULES (The 4 Core Cards - No 404s now) */}
        <div>
          <div className="mb-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span>🧩</span> የመማሪያ ክፍሎች (LEARNING HUB)
            </h2>
            <p className="text-[11px] text-slate-400 mt-1">ዋና ዋና የትምህርት ክፍሎች</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CORE_HUB_MODULES.map((mod) => (
              <Link href={mod.href} key={mod.id}>
                <div className={`bg-gradient-to-br ${mod.color} rounded-2xl p-5 border transition-all hover:scale-[1.02] cursor-pointer h-full flex flex-col justify-between gap-4`}>
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <span className="text-3xl bg-slate-900/50 p-2 rounded-xl border border-slate-700/50 shadow-inner">
                        {mod.icon}
                      </span>
                      {mod.badge && (
                        <span className="text-[10px] bg-slate-800/80 text-slate-300 px-2 py-1 rounded-lg font-medium border border-slate-700">
                          {mod.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-sm font-bold text-white mt-2">{mod.title}</h3>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{mod.desc}</p>
                  </div>
                  
                  <div className="w-full bg-slate-900/60 text-slate-300 text-[11px] font-bold py-2.5 rounded-xl text-center border border-slate-700/50 hover:bg-slate-800 transition-colors mt-auto">
                    ትምህርት ጀምር →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 5. CONTINUE COURSE */}
        <div>
           <div className="mb-4">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span>📚</span> የጀመርካቸው ኮርሶች
            </h2>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {IN_PROGRESS_COURSES.map((course) => (
              <GlassCard key={course.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <span className="text-[10px] text-indigo-400 font-bold uppercase">{course.category}</span>
                  <h3 className="text-sm font-bold text-white mt-0.5">{course.title}</h3>
                  <div className="flex items-center gap-3 mt-3">
                     <div className="flex-1 bg-slate-800 h-1.5 rounded-full overflow-hidden">
                       <div className="bg-emerald-500 h-full" style={{ width: `${course.progress}%` }} />
                     </div>
                     <span className="text-[10px] text-emerald-400 font-bold">{course.progress}%</span>
                  </div>
                </div>
                <Link
                  href={`/courses/${course.id}/learn`}
                  className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-bold px-6 py-2.5 rounded-xl border border-slate-700 transition-colors text-center"
                >
                  ቀጥል (Resume)
                </Link>
              </GlassCard>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}

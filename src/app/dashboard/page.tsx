/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
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
  dailyGoalPercent: 75, // 45/60 mins
};

const CORE_HUB_MODULES: CoreModule[] = [
  {
    id: "grammar",
    title: "Grammar & Basics",
    desc: "የእንግሊዘኛ ቋንቋ ሰዋሰው እና መሰረታዊ የዓረፍተ ነገር አወቃቀር",
    icon: "📝",
    href: "/lessons/grammar",
    badge: "LESSON 01",
    color: "from-blue-600/10 to-blue-900/5 border-blue-500/20 hover:border-blue-500/40",
  },
  {
    id: "vocab",
    title: "Vocabulary Builder",
    desc: "ቃላትን በፍጥነት የሚያጠናክሩበት እና የሚያስታውሱበት ክፍል",
    icon: "🔤",
    href: "/lessons/vocabulary",
    badge: "LESSON 02",
    color: "from-purple-600/10 to-purple-900/5 border-purple-500/20 hover:border-purple-500/40",
  },
  {
    id: "ai-tutor",
    title: "AI Chat Tutor",
    desc: "ከአርቴፊሻል ኢንተለጀንስ ጋር በመወያየት በቀጥታ ልምድ ያዳብሩ",
    icon: "🤖",
    href: "/lessons/ai-chat",
    badge: "LESSON 03",
    color: "from-emerald-600/10 to-emerald-900/5 border-emerald-500/20 hover:border-emerald-500/40",
  },
  {
    id: "practical",
    title: "Practical Hub",
    desc: "የንግግር፣ የፅሁፍ እና የቀን ተቀን የቋንቋ ክህሎት ማሳደጊያ",
    icon: "🎓",
    href: "/lessons/practical-hub",
    badge: "LESSON 04",
    color: "from-amber-600/10 to-amber-900/5 border-amber-500/20 hover:border-amber-500/40",
  },
];

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState<string>("");

  // Get live formatted date safely for Next.js SSR
  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(new Date().toLocaleDateString('en-US', options));
  }, []);

  return (
    <div className="min-h-screen bg-[#040810] text-slate-200 font-sans pb-24 selection:bg-indigo-500/30">
      
      {/* 1. TOP NAVBAR & MENU (Pro Global Design) */}
      <nav className="sticky top-0 z-50 bg-[#040810]/70 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-black text-xs text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              EY
            </div>
            <span className="text-sm font-extrabold tracking-wide text-slate-100 hidden sm:block">
              EyOS <span className="text-indigo-400 font-medium">Academy</span>
            </span>
          </div>

          {/* Quick Stats & Menu Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg text-amber-500 font-bold text-xs shadow-sm">
                <span>🔥 {stats.streakDays}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg text-indigo-400 font-bold text-xs shadow-sm">
                <span>⚡ {stats.xp}</span>
              </div>
            </div>

            {/* Pro Hamburger Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-slate-300"
            >
              {isMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7"></path></svg>
              )}
            </button>
          </div>
        </div>

        {/* The Missing Menu (Now fully functional with Courses) */}
        {isMenuOpen && (
          <div className="absolute top-full right-0 w-full sm:w-80 bg-[#0F172A]/95 backdrop-blur-3xl border-b sm:border border-white/10 sm:rounded-2xl sm:mr-4 sm:mt-2 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col gap-1 p-2">
              <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-500/10 text-indigo-400 font-semibold text-sm transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                Dashboard
              </Link>
              <Link href="/courses" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-300 font-medium text-sm transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                My Courses
              </Link>
              <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-300 font-medium text-sm transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                Profile & Certs
              </Link>
              <div className="h-px w-full bg-white/5 my-1"></div>
              <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 font-medium text-sm transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                Admin Panel
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-5xl mx-auto px-4 pt-8 space-y-10">

        {/* 2. WELCOME BANNER (With Date & Clean Design) */}
        <section className="bg-[#0B1221] border border-white/5 rounded-3xl p-7 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle Abstract Background */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              {/* THE DATE - Formatted Professionally */}
              <div className="inline-flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                {currentDate || "Loading Date..."}
              </div>
              
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight">
                  ሰላም፣ {stats.username} <span className="inline-block origin-bottom-right hover:rotate-12 transition-transform duration-300">👋</span>
                </h1>
                <p className="text-sm text-slate-400 max-w-md leading-relaxed font-medium">
                  እንኳን በደህና መጣህ። አሁን በ <strong className="text-amber-400 font-bold">{stats.streakDays} ቀናት Streak</strong> ላይ ትገኛለህ። የዛሬን ግብ ከዳር ለማድረስ ትምህርትህን ቀጥል!
                </p>
              </div>
            </div>

            {/* Pro Level & Daily Goal Card */}
            <div className="w-full md:w-72 bg-[#040810]/50 rounded-2xl p-5 border border-white/5 backdrop-blur-md">
               <div className="flex justify-between items-center mb-4">
                 <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Level {stats.currentLevel} Scholar</span>
                 <span className="text-xs font-black text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md">45 / 60 Min</span>
               </div>
               <div className="space-y-2">
                 <div className="flex justify-between text-[11px] font-medium text-slate-500">
                   <span>Daily Goal</span>
                   <span>{stats.dailyGoalPercent}%</span>
                 </div>
                 <div className="w-full bg-slate-800/50 h-2.5 rounded-full overflow-hidden border border-white/5">
                   <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full relative">
                     <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/20 blur-[2px]" />
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* 3. CORE LESSONS (Ultra-clean Grid) */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2.5 uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              የቋንቋ ማዳበሪያ ክፍሎች (Lessons)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {CORE_HUB_MODULES.map((mod) => (
              <Link href={mod.href} key={mod.id} className="group outline-none block h-full">
                <div className={`bg-gradient-to-br ${mod.color} bg-[#0B1221] rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] h-full flex flex-col justify-between gap-6`}>
                  
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-[#040810]/50 rounded-xl border border-white/5 shadow-inner flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                      {mod.icon}
                    </div>
                    <span className="text-[9px] text-slate-400 bg-white/5 px-2.5 py-1.5 rounded-lg font-black tracking-widest border border-white/5">
                      {mod.badge}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-base font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{mod.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{mod.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. ACTIVE COURSES (Fully Integrated) */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2.5 uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              የጀመርካቸው ኮርሶች (Active Courses)
            </h2>
            <Link href="/courses" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors">
              ሁሉንም እይ <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </Link>
          </div>
          
          <div className="grid gap-4">
            {IN_PROGRESS_COURSES.map((course) => (
              <div key={course.id} className="bg-[#0B1221] hover:bg-[#0F172A] transition-colors border border-white/5 hover:border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 group">
                <div className="flex-1 w-full">
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-1.5 block">{course.category}</span>
                  <h3 className="text-[15px] font-bold text-white mb-3 group-hover:text-indigo-200 transition-colors">{course.title}</h3>
                  <div className="flex items-center gap-4">
                     <div className="flex-1 bg-slate-800/80 h-2 rounded-full overflow-hidden border border-white/5">
                       <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${course.progress}%` }} />
                     </div>
                     <span className="text-xs text-emerald-400 font-black w-8">{course.progress}%</span>
                  </div>
                </div>
                <Link
                  href={`/courses/${course.id}/learn`}
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-7 py-3 rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.2)] hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all text-center shrink-0"
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

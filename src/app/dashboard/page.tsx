"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, BookOpen, User, ShieldAlert, 
  Menu, X, Flame, Zap, CheckCircle, Clock, 
  PenTool, MessageSquare, Mic, PlayCircle, ChevronRight
} from "lucide-react";

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
  icon: React.ReactNode;
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
  dailyGoalPercent: 75,
};

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
  const [mounted, setMounted] = useState(false);
  const [currentDate, setCurrentDate] = useState<string>("");

  // Fix Hydration mismatch & format date safely
  useEffect(() => {
    setMounted(true);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    };
    setCurrentDate(new Date().toLocaleDateString('en-US', options));
  }, []);

  const CORE_HUB_MODULES: CoreModule[] = [
    {
      id: "grammar",
      title: "Grammar & Basics",
      desc: "የእንግሊዘኛ ቋንቋ ሰዋሰው እና መሰረታዊ የዓረፍተ ነገር አወቃቀር",
      icon: <PenTool className="w-6 h-6 text-blue-400" />,
      href: "/lessons/grammar",
      badge: "LESSON 01",
      color: "from-blue-600/10 to-blue-900/5 border-blue-500/20 hover:border-blue-500/40 hover:shadow-blue-500/10",
    },
    {
      id: "vocab",
      title: "Vocabulary Builder",
      desc: "ቃላትን በፍጥነት የሚያጠናክሩበት እና የሚያስታውሱበት ክፍል",
      icon: <BookOpen className="w-6 h-6 text-purple-400" />,
      href: "/lessons/vocabulary",
      badge: "LESSON 02",
      color: "from-purple-600/10 to-purple-900/5 border-purple-500/20 hover:border-purple-500/40 hover:shadow-purple-500/10",
    },
    {
      id: "ai-tutor",
      title: "AI Chat Tutor",
      desc: "ከአርቴፊሻል ኢንተለጀንስ ጋር በመወያየት በቀጥታ ልምድ ያዳብሩ",
      icon: <MessageSquare className="w-6 h-6 text-emerald-400" />,
      href: "/lessons/ai-chat",
      badge: "LESSON 03",
      color: "from-emerald-600/10 to-emerald-900/5 border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-emerald-500/10",
    },
    {
      id: "practical",
      title: "Practical Hub",
      desc: "የንግግር፣ የፅሁፍ እና የቀን ተቀን የቋንቋ ክህሎት ማሳደጊያ",
      icon: <Mic className="w-6 h-6 text-amber-400" />,
      href: "/lessons/practical-hub",
      badge: "LESSON 04",
      color: "from-amber-600/10 to-amber-900/5 border-amber-500/20 hover:border-amber-500/40 hover:shadow-amber-500/10",
    },
  ];

  if (!mounted) return null; // Prevent hydration flash

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-200 font-sans pb-24 selection:bg-indigo-500/30">
      
      {/* 1. TOP NAVBAR & MENU */}
      <nav className="sticky top-0 z-50 bg-[#050b14]/80 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-black text-sm text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              EY
            </div>
            <span className="text-sm font-extrabold tracking-wide text-slate-100 hidden sm:block">
              EyOS <span className="text-indigo-400 font-medium">Academy</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg text-amber-500 font-bold text-xs">
                <Flame className="w-4 h-4" /> 
                <span>{stats.streakDays}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-lg text-indigo-400 font-bold text-xs">
                <Zap className="w-4 h-4" />
                <span>{stats.xp}</span>
              </div>
            </div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-slate-300 focus:outline-none"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute top-full right-0 w-full sm:w-80 bg-[#0F172A]/95 backdrop-blur-3xl border-b sm:border border-white/10 sm:rounded-2xl sm:mr-4 sm:mt-2 shadow-2xl p-2 z-50 animate-in slide-in-from-top-4 fade-in duration-200">
            <div className="flex flex-col gap-1 p-2">
              <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-indigo-500/15 text-indigo-400 font-semibold text-sm transition-colors">
                <LayoutDashboard className="w-5 h-5" />
                Dashboard
              </Link>
              <Link href="/courses" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-300 font-medium text-sm transition-colors">
                <PlayCircle className="w-5 h-5" />
                My Courses
              </Link>
              <Link href="/profile" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-300 font-medium text-sm transition-colors">
                <User className="w-5 h-5" />
                Profile & Certs
              </Link>
              <div className="h-px w-full bg-white/5 my-2"></div>
              <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 font-medium text-sm transition-colors">
                <ShieldAlert className="w-5 h-5 text-rose-400" />
                Admin Panel
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-5xl mx-auto px-4 pt-8 space-y-12">

        {/* 2. WELCOME BANNER */}
        <section className="bg-[#0f172a]/60 border border-white/5 rounded-3xl p-7 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-md">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">
                <Clock className="w-3.5 h-3.5" />
                {currentDate}
              </div>
              
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight flex items-center gap-2">
                  ሰላም፣ {stats.username} 
                  <span className="inline-block origin-bottom-right hover:rotate-12 transition-transform duration-300 text-3xl">👋</span>
                </h1>
                <p className="text-sm text-slate-400 max-w-md leading-relaxed font-medium">
                  እንኳን በደህና መጣህ። አሁን በ <strong className="text-amber-400 font-bold">{stats.streakDays} ቀናት Streak</strong> ላይ ትገኛለህ። የዛሬን ግብ ከዳር ለማድረስ ትምህርትህን ቀጥል!
                </p>
              </div>
            </div>

            {/* Daily Goal Card */}
            <div className="w-full md:w-72 bg-[#050b14]/60 rounded-2xl p-5 border border-white/10 backdrop-blur-xl shadow-lg">
               <div className="flex justify-between items-center mb-4">
                 <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Level {stats.currentLevel} Scholar</span>
                 <span className="text-xs font-black text-indigo-300 bg-indigo-500/20 px-3 py-1 rounded-lg">45 / 60 Min</span>
               </div>
               <div className="space-y-2.5">
                 <div className="flex justify-between text-[11px] font-medium text-slate-400">
                   <span>Daily Goal</span>
                   <span className="text-indigo-400">{stats.dailyGoalPercent}%</span>
                 </div>
                 <div className="w-full bg-slate-800/80 h-3 rounded-full overflow-hidden border border-white/5">
                   <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full relative transition-all duration-1000 ease-out" 
                    style={{ width: `${stats.dailyGoalPercent}%` }}
                   >
                     <div className="absolute top-0 right-0 bottom-0 w-6 bg-white/20 blur-[3px]" />
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* 3. CORE LESSONS */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2.5 uppercase tracking-wide">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"></span>
              የቋንቋ ማዳበሪያ ክፍሎች (Lessons)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CORE_HUB_MODULES.map((mod) => (
              <Link href={mod.href} key={mod.id} className="group outline-none block h-full">
                <div className={`bg-gradient-to-br ${mod.color} bg-[#0f172a]/40 rounded-3xl p-6 border transition-all duration-300 hover:-translate-y-1 shadow-lg h-full flex flex-col justify-between gap-6 backdrop-blur-sm`}>
                  
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 bg-[#050b14]/80 rounded-2xl border border-white/10 shadow-inner flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {mod.icon}
                    </div>
                    <span className="text-[9px] text-slate-400 bg-white/5 px-3 py-1.5 rounded-xl font-black tracking-widest border border-white/5">
                      {mod.badge}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{mod.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{mod.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. ACTIVE COURSES */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-bold text-slate-200 flex items-center gap-2.5 uppercase tracking-wide">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
              የጀመርካቸው ኮርሶች (Active)
            </h2>
            <Link href="/courses" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors group">
              ሁሉንም እይ <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid gap-4">
            {IN_PROGRESS_COURSES.map((course) => (
              <div key={course.id} className="bg-[#0f172a]/60 hover:bg-[#1e293b]/80 backdrop-blur-sm transition-all duration-300 border border-white/5 hover:border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 group shadow-lg">
                <div className="flex-1 w-full">
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mb-1.5 block">
                    {course.category}
                  </span>
                  <h3 className="text-[15px] font-bold text-white mb-3 group-hover:text-indigo-200 transition-colors">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-4">
                     <div className="flex-1 bg-slate-800/80 h-2.5 rounded-full overflow-hidden border border-white/5">
                       <div 
                         className="bg-emerald-500 h-full rounded-full relative" 
                         style={{ width: `${course.progress}%` }} 
                       >
                         <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/30 blur-[2px]" />
                       </div>
                     </div>
                     <span className="text-xs text-emerald-400 font-black w-10">{course.progress}%</span>
                  </div>
                </div>
                <Link
                  href={`/courses/${course.id}/learn`}
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-7 py-3.5 rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transition-all text-center shrink-0 flex items-center justify-center gap-2 active:scale-95"
                >
                  <PlayCircle className="w-4 h-4" />
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

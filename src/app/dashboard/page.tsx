"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { 
  LayoutDashboard, BookOpen, User, ShieldAlert, 
  Menu, X, Flame, Zap, Clock, 
  PenTool, MessageSquare, Mic, PlayCircle, ChevronRight, LogOut, Coins, Sparkles, ArrowRight
} from "lucide-react";

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
  accentGlow: string;
}

interface CourseItem {
  id: string;
  title: string;
  category: string;
  totalLessons: number;
  progressPercent: number;
}

export default function ProDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<UserStats>({
    username: "Scholar",
    xp: 0,
    coins: 0,
    streakDays: 0,
    currentLevel: 1,
    dailyGoalPercent: 0,
  });

  const [inProgressCourses, setInProgressCourses] = useState<CourseItem[]>([
    {
      id: "flutter-mobile-mastery",
      title: "Full-Stack Flutter & Supabase App",
      category: "Mobile Dev",
      totalLessons: 6,
      progressPercent: 0,
    },
    {
      id: "aviation-logistics-pro",
      title: "Aviation Logistics & Ground Operations",
      category: "Aviation & Logistics",
      totalLessons: 5,
      progressPercent: 0,
    },
    {
      id: "ai-prompt-engineering",
      title: "Advanced AI Prompt Engineering",
      category: "AI & Tech",
      totalLessons: 3,
      progressPercent: 0,
    }
  ]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    setMounted(true);

    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    };
    setCurrentDate(new Date().toLocaleDateString('en-US', options));

    // Progress Fetching Simulation
    setInProgressCourses((prevCourses) =>
      prevCourses.map((course) => {
        const localData = localStorage.getItem(`progress_${course.id}`);
        if (localData) {
          try {
            const completedIds: string[] = JSON.parse(localData);
            const calculatedPercent = Math.round((completedIds.length / course.totalLessons) * 100);
            return {
              ...course,
              progressPercent: Math.min(calculatedPercent, 100),
            };
          } catch (e) {
            console.error("Failed to parse progress for course:", course.id, e);
          }
        }
        return course;
      })
    );

    const checkAuthAndFetchProfile = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        // ማስተካከያ: router.push('/login') አጥፍተነዋል ምክንያቱም middleware እየጠበቀው ስለሆነ።
        if (session) {
          const res = await fetch("/api/user/profile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: session.user.email }),
          });

          if (res.ok) {
            const data = await res.json();
            if (data.user) {
              setStats({
                username: data.user.username || session.user.email?.split("@")[0] || "Scholar",
                xp: data.user.xpPoints || 0,
                coins: data.user.coins || 0,
                streakDays: data.user.streak || 0,
                currentLevel: data.user.currentLevel || 1,
                dailyGoalPercent: data.user.dailyGoalPercent || 0,
              });
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetchProfile();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // ራውተር ከመጠቀም ይልቅ ፔጁን ሪፍሬሽ በማድረግ እናስወጣዋለን
    window.location.href = "/login";
  };

  const CORE_HUB_MODULES: CoreModule[] = [
    {
      id: "grammar",
      title: "Grammar & Basics",
      desc: "የእንግሊዘኛ ቋንቋ ሰዋሰው እና መሰረታዊ የዓረፍተ ነገር አወቃቀር",
      icon: <PenTool className="w-6 h-6 text-blue-400" />,
      href: "/lessons/grammar",
      badge: "LESSON 01",
      color: "from-blue-600/15 via-blue-900/10 to-transparent border-blue-500/30 hover:border-blue-500/60",
      accentGlow: "shadow-[0_0_30px_rgba(59,130,246,0.15)]",
    },
    {
      id: "vocab",
      title: "Vocabulary Builder",
      desc: "ቃላትን በፍጥነት የሚያጠናክሩበት እና የሚያስታውሱበት ክፍል",
      icon: <BookOpen className="w-6 h-6 text-purple-400" />,
      href: "/lessons/vocabulary",
      badge: "LESSON 02",
      color: "from-purple-600/15 via-purple-900/10 to-transparent border-purple-500/30 hover:border-purple-500/60",
      accentGlow: "shadow-[0_0_30px_rgba(168,85,247,0.15)]",
    },
    {
      id: "ai-tutor",
      title: "AI Chat Tutor",
      desc: "ከአርቴፊሻል ኢንተለጀንስ ጋር በመወያየት በቀጥታ ልምድ ያዳብሩ",
      icon: <MessageSquare className="w-6 h-6 text-emerald-400" />,
      href: "/lessons/ai-chat",
      badge: "LESSON 03",
      color: "from-emerald-600/15 via-emerald-900/10 to-transparent border-emerald-500/30 hover:border-emerald-500/60",
      accentGlow: "shadow-[0_0_30px_rgba(16,185,129,0.15)]",
    },
    {
      id: "practical",
      title: "Practical Hub",
      desc: "የንግግር፣ የፅሁፍ እና የቀን ተቀን የቋንቋ ክህሎት ማሳደጊያ",
      icon: <Mic className="w-6 h-6 text-amber-400" />,
      href: "/lessons/practical-hub",
      badge: "LESSON 04",
      color: "from-amber-600/15 via-amber-900/10 to-transparent border-amber-500/30 hover:border-amber-500/60",
      accentGlow: "shadow-[0_0_30px_rgba(245,158,11,0.15)]",
    },
  ];

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#050b14] flex flex-col items-center justify-center text-slate-200 font-sans">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
          <Sparkles className="w-5 h-5 text-indigo-400 absolute inset-0 m-auto animate-pulse" />
        </div>
        <p className="text-xs font-semibold tracking-wider text-slate-400 mt-4 uppercase">የተማሪ መረጃ ከዳታቤዝ በመጫን ላይ...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-200 font-sans pb-24 pt-4 selection:bg-indigo-500/30 relative">
      
      {/* 1. TOP STATS BAR */}
      <header className="sticky top-0 z-40 bg-[#050b14]/90 backdrop-blur-2xl border-b border-white/10 px-4 py-3 mb-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 p-0.5 shadow-[0_0_20px_rgba(99,102,241,0.4)]">
              <div className="w-full h-full bg-[#050b14] rounded-[14px] flex items-center justify-center font-black text-sm text-indigo-400">
                EY
              </div>
            </div>
            <div>
              <span className="text-sm font-black tracking-wide text-white block">
                EyOS <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Academy</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Lvl {stats.currentLevel} Student</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-xl text-amber-400 font-extrabold text-xs shadow-[0_0_15px_rgba(245,158,11,0.1)]">
              <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" /> 
              <span>{stats.streakDays} <span className="text-[10px] font-normal text-amber-300 hidden sm:inline">Days</span></span>
            </div>
            <div className="flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1.5 rounded-xl text-indigo-400 font-extrabold text-xs shadow-[0_0_15px_rgba(99,102,241,0.1)]">
              <Zap className="w-4 h-4 fill-indigo-400 text-indigo-400" />
              <span>{stats.xp} <span className="text-[10px] font-normal text-indigo-300 hidden sm:inline">XP</span></span>
            </div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-slate-300 focus:outline-none cursor-pointer active:scale-95 md:hidden"
            >
              {isMenuOpen ? <X className="w-5 h-5 text-rose-400" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Desktop Logout - Hidden on mobile */}
            <button 
              onClick={handleSignOut}
              className="hidden md:flex items-center gap-2 bg-rose-500/10 border border-rose-500/30 px-3 py-1.5 rounded-xl text-rose-400 font-extrabold text-xs hover:bg-rose-500/20 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Exit
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute top-full right-4 left-4 bg-[#0c1322]/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl p-3 mt-2 z-50 animate-in slide-in-from-top-3 duration-200 md:hidden">
            <div className="flex flex-col gap-1.5">
              <button 
                onClick={handleSignOut}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-semibold text-sm transition-all w-full text-left cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
                ይውጡ (Log Out)
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="max-w-5xl mx-auto px-4 space-y-10">
        {/* 2. WELCOME HERO BANNER */}
        <section className="bg-gradient-to-br from-[#0f172a] via-[#0b1326] to-[#080d1a] border border-white/10 rounded-3xl p-6 sm:p-9 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-500/15 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-purple-500/10 rounded-full blur-[90px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full text-[11px] font-black text-indigo-400 tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                {currentDate}
              </div>
              
              <div>
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-2">
                  ሰላም፣ {stats.username} 
                  <span className="inline-block origin-bottom-right hover:rotate-12 transition-transform duration-300">👋</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed font-normal mt-2">
                  እንኳን በደህና መጣህ! አሁን በ <strong className="text-amber-400 font-bold">{stats.streakDays} ቀናት Streak</strong> ላይ ትገኛለህ። የዛሬን ግብ ከዳር ለማድረስ ትምህርትህን ቀጥል!
                </p>
              </div>
            </div>

            {/* Daily Goal Card */}
            <div className="w-full md:w-80 bg-[#050b14]/80 rounded-2xl p-5 border border-white/10 backdrop-blur-2xl shadow-xl">
               <div className="flex justify-between items-center mb-3">
                 <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Level {stats.currentLevel} Scholar</span>
                 <span className="text-xs font-black text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 px-3 py-1 rounded-lg">
                   {stats.dailyGoalPercent}% Goal
                 </span>
               </div>
               <div className="space-y-2">
                 <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                   <span>Daily Progress</span>
                   <span className="text-indigo-400 font-bold">{stats.dailyGoalPercent}%</span>
                 </div>
                 <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-white/10 p-0.5">
                   <div 
                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 h-full rounded-full relative transition-all duration-1000 ease-out shadow-[0_0_12px_rgba(99,102,241,0.5)]" 
                    style={{ width: `${stats.dailyGoalPercent}%` }}
                   >
                     <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/40 blur-[2px]" />
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* 3. CORE LESSON MODULES */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xs sm:text-sm font-black text-slate-200 flex items-center gap-2.5 uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,1)]"></span>
              የቋንቋ ማዳበሪያ ክፍሎች (Lessons)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {CORE_HUB_MODULES.map((mod) => (
              <Link href={mod.href} key={mod.id} className="group block outline-none h-full">
                <div className={`bg-gradient-to-br ${mod.color} bg-[#0c1322]/60 rounded-3xl p-6 border transition-all duration-300 hover:-translate-y-1.5 shadow-xl ${mod.accentGlow} h-full flex flex-col justify-between backdrop-blur-md relative overflow-hidden`}>
                  
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 bg-[#050b14]/90 rounded-2xl border border-white/10 shadow-inner flex items-center justify-center group-hover:scale-110 group-hover:border-indigo-500/40 transition-all duration-300">
                      {mod.icon}
                    </div>
                    <span className="text-[10px] text-slate-400 bg-white/5 px-3 py-1 rounded-xl font-black tracking-widest border border-white/10">
                      {mod.badge}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-indigo-300 transition-colors flex items-center justify-between">
                      {mod.title}
                      <ArrowRight className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-normal">{mod.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. ACTIVE COURSES PROGRESS */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xs sm:text-sm font-black text-slate-200 flex items-center gap-2.5 uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,1)]"></span>
              የጀመርካቸው ኮርሶች (Active)
            </h2>
            <Link href="/courses" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors group">
              ሁሉንም እይ <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid gap-3.5">
            {inProgressCourses.map((course) => (
              <div key={course.id} className="bg-[#0c1322]/80 hover:bg-[#111a2e] backdrop-blur-md transition-all duration-300 border border-white/10 hover:border-indigo-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 group shadow-lg">
                <div className="flex-1 w-full">
                  <span className="text-[10px] text-indigo-400 font-extrabold uppercase tracking-widest mb-1 block">
                    {course.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-3 group-hover:text-indigo-200 transition-colors">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-3">
                     <div className="flex-1 bg-slate-900 h-2.5 rounded-full overflow-hidden border border-white/10">
                       <div 
                         className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full relative transition-all duration-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" 
                         style={{ width: `${course.progressPercent}%` }} 
                       >
                         <div className="absolute top-0 right-0 bottom-0 w-3 bg-white/40 blur-[2px]" />
                       </div>
                     </div>
                     <span className="text-xs text-emerald-400 font-black shrink-0">{course.progressPercent}%</span>
                  </div>
                </div>
                <Link
                  href={`/courses/${course.id}/learn`}
                  className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold px-6 py-3 rounded-xl shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transition-all text-center shrink-0 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  <PlayCircle className="w-4 h-4" />
                  ቀጥል (Resume)
                </Link>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* 5. MOBILE BOTTOM NAVIGATION */}
      <nav className="fixed bottom-0 w-full md:hidden bg-[#0c1322]/95 backdrop-blur-2xl border-t border-white/10 z-50 px-2 py-3 pb-safe shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <Link href="/dashboard" className="flex flex-col items-center gap-1.5 text-indigo-400">
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px] font-bold">Dashboard</span>
          </Link>
          <Link href="/courses" className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors">
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px] font-medium">Courses</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors">
            <User className="w-5 h-5" />
            <span className="text-[10px] font-medium">Profile</span>
          </Link>
          <Link href="/admin" className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors">
            <ShieldAlert className="w-5 h-5" />
            <span className="text-[10px] font-medium">Admin</span>
          </Link>
        </div>
      </nav>

    </div>
  );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
  titleAm: string;
  desc: string;
  icon: string;
  href: string;
  badge?: string;
  gradient: string;
}

interface CourseItem {
  id: string;
  title: string;
  category: string;
  progress: number;
  lastLesson: string;
  thumbnail: string;
}

interface Achievement {
  id: string;
  title: string;
  icon: string;
  unlocked: boolean;
  desc: string;
}

interface LeaderboardUser {
  rank: number;
  name: string;
  xp: number;
  avatar: string;
  isCurrentUser?: boolean;
}

// --- Dynamic Profile Data (Merged from Original Dashboard) ---
const INITIAL_STATS: UserStats = {
  username: "eyob19",
  email: "eyob19@gmail.com",
  xp: 6390, // ከበፊቱ የተጠበቀ
  coins: 1250,
  gems: 85,
  streakDays: 8, // ከበፊቱ የተጠበቀ
  currentLevel: 14,
  dailyGoalPercent: 80,
};

// --- Original 4 Core Learning Hub Modules ---
const CORE_HUB_MODULES: CoreModule[] = [
  {
    id: "syllabus",
    title: "Syllabus Modules",
    titleAm: "የትምህርት ክፍሎች",
    desc: "በደረጃና በዘርፍ የተከፈሉ የተዋቀሩ የትምህርት አርእስቶችና ኮርሶች",
    icon: "📖",
    href: "/courses",
    badge: "የተሟላ",
    gradient: "from-blue-600/20 via-indigo-600/10 to-slate-900 border-blue-500/30",
  },
  {
    id: "vocab",
    title: "Vocabulary Builder",
    titleAm: "ቃላት ማበልጸጊያ",
    desc: "ቃላትን በፍጥነት የሚያጠናክሩበት እና የሚያስታውሱበት ልዩ ክፍል",
    icon: "🔤",
    href: "/vocabulary",
    badge: "AI Powered",
    gradient: "from-purple-600/20 via-pink-600/10 to-slate-900 border-purple-500/30",
  },
  {
    id: "ai-tutor",
    title: "AI Chat Tutor",
    titleAm: "የኤአይ ረዳት",
    desc: "ከአርቴፊሻል ኢንተለጀንስ ጋር በመወያየት በቀጥታ ልምድ ያዳብሩ",
    icon: "🤖",
    href: "/api/chat",
    badge: "Live 24/7",
    gradient: "from-emerald-600/20 via-teal-600/10 to-slate-900 border-emerald-500/30",
  },
  {
    id: "practical-english",
    title: "Practical English Hub",
    titleAm: "ተግባራዊ እንግሊዝኛ",
    desc: "የንግግር፣ የፅሁፍ እና የቀን ተቀን የቋንቋ ክህሎት ማሳደጊያ",
    icon: "🎓",
    href: "/courses/english",
    badge: "Essential",
    gradient: "from-amber-600/20 via-orange-600/10 to-slate-900 border-amber-500/30",
  },
];

const IN_PROGRESS_COURSES: CourseItem[] = [
  {
    id: "flutter-mobile-mastery",
    title: "Full-Stack Flutter & Supabase Mobile App",
    category: "Mobile Dev",
    progress: 68,
    lastLesson: "2.2 Authentication & User Profiles",
    thumbnail: "📱",
  },
  {
    id: "aviation-logistics-pro",
    title: "Aviation Logistics, Cargo & Ground Ops",
    category: "Aviation",
    progress: 40,
    lastLesson: "1.2 Air Waybill (AWB) & Cargo Manifest",
    thumbnail: "✈️",
  },
  {
    id: "ai-prompt-engineering",
    title: "Advanced Prompt Engineering & Automation",
    category: "AI & Data",
    progress: 85,
    lastLesson: "1.2 Few-Shot Prompt Architecture",
    thumbnail: "🧠",
  },
];

const ACHIEVEMENTS_LIST: Achievement[] = [
  { id: "1", title: "Early Bird", icon: "🌅", unlocked: true, desc: "Completed a lesson before 8 AM" },
  { id: "2", title: "8-Day Streak", icon: "🔥", unlocked: true, desc: "Learned 8 consecutive days" },
  { id: "3", title: "Flutter Master", icon: "⚡", unlocked: false, desc: "Finish Full-Stack Flutter Course" },
];

const LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, name: "eyob19 (You)", xp: 6390, avatar: "🚀", isCurrentUser: true },
  { rank: 2, name: "eyob1", xp: 3200, avatar: "👨‍💻" },
  { rank: 3, name: "eyob12", xp: 1800, avatar: "👩‍💻" },
  { rank: 4, name: "eyob21", xp: 950, avatar: "👨‍🎓" },
];

// --- Reusable Glassmorphic Card Component ---
const GlassCard = ({
  children,
  className = "",
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) => (
  <div
    className={`bg-slate-900/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 text-white shadow-2xl transition-all duration-300 ${
      hover ? "hover:scale-[1.01] hover:-translate-y-0.5 hover:border-slate-700/80 hover:shadow-indigo-500/10" : ""
    } ${className}`}
  >
    {children}
  </div>
);

export default function EyOSWorldClassDashboard() {
  const [stats] = useState<UserStats>(INITIAL_STATS);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 font-sans pb-16">
      
      {/* 1. TOP GAMIFICATION NAVBAR */}
      <div className="sticky top-0 z-40 bg-[#0B0F19]/80 backdrop-blur-md border-b border-slate-800/80 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <span className="text-base font-black tracking-wider bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              EyOS
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-xs text-slate-400 font-semibold">Academy Hub</span>
          </div>

          {/* Gamification Counters */}
          <div className="flex items-center gap-2.5 text-xs font-bold flex-wrap">
            <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl text-amber-400">
              <span>🔥</span>
              <span>{stats.streakDays} ቀን Streak</span>
            </div>
            <div className="flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-xl text-indigo-400">
              <span>⚡</span>
              <span>{stats.xp} XP</span>
            </div>
            <div className="flex items-center gap-1.5 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1.5 rounded-xl text-yellow-300">
              <span>🪙</span>
              <span>{stats.coins}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 rounded-xl text-cyan-300">
              <span>💎</span>
              <span>{stats.gems}</span>
            </div>

            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-xs ring-2 ring-indigo-500/30">
              EY
            </div>
          </div>

        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-8">

        {/* 2. WELCOME BANNER & PROFILE CARD */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <GlassCard className="lg:col-span-2 relative overflow-hidden bg-gradient-to-br from-indigo-950/50 via-slate-900 to-purple-950/40 border-indigo-500/30 flex flex-col justify-between">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-2 z-10">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  LEVEL {stats.currentLevel} SCHOLAR
                </span>
                <span className="text-xs text-emerald-400 font-semibold">• {stats.email}</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white">
                ሰላም፤ {stats.username} 👋
              </h1>
              <p className="text-xs text-slate-300 max-w-lg leading-relaxed">
                የዛሬውን የመማሪያ ጉዞዎን ይጀምሩ! አሁን በ <strong className="text-amber-400">{stats.streakDays} ቀን ተከታታይ የመማር ሂደት (Streak)</strong> ላይ ይገኛሉ።
              </p>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-between gap-4 z-10">
              <div className="flex items-center gap-3">
                <Link
                  href="/courses/flutter-mobile-mastery/learn"
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
                >
                  <span>▶</span> የትምህርት ክፍሎችን ቀጥል
                </Link>
              </div>
            </div>
          </GlassCard>

          {/* Daily Goal Widget */}
          <GlassCard className="flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 font-medium">የዛሬው ግብ (Daily Goal)</span>
                <h3 className="text-sm font-bold text-white">45 / 60 ደቂቃ ተጠናቋል</h3>
              </div>
              <span className="text-2xl">🎯</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-indigo-400">{stats.dailyGoalPercent}% ተጠናቋል</span>
                <span className="text-slate-400">15 ደቂቃ ቀርቷል</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${stats.dailyGoalPercent}%` }}
                />
              </div>
            </div>

            <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-300">የዛሬው ሽልማት:</span>
              <span className="text-amber-400 font-bold">+50 Coins 🪙</span>
            </div>
          </GlassCard>

        </div>

        {/* 3. CORE LEARNING HUB (የመጀመሪያዎቹ 4ቱ ዋና ዋና ክፍሎች) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span>🧩</span> የመማሪያ ክፍሎች (LEARNING HUB)
              </h2>
              <p className="text-xs text-slate-400">ዋና ዋና የትምህርት እና የልምድ ማደጊያ ክፍሎች</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CORE_HUB_MODULES.map((mod) => (
              <GlassCard key={mod.id} className={`bg-gradient-to-br ${mod.gradient} flex flex-col justify-between space-y-4`}>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{mod.icon}</span>
                    {mod.badge && (
                      <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-bold border border-indigo-500/30">
                        {mod.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-white">{mod.title}</h3>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{mod.desc}</p>
                </div>

                <Link
                  href={mod.href}
                  className="w-full bg-slate-800/80 hover:bg-indigo-600 text-slate-200 hover:text-white text-xs font-bold py-2 rounded-xl text-center transition-all border border-slate-700 hover:border-indigo-500 block"
                >
                  ትምህርት ጀምር →
                </Link>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* 4. CONTINUE LEARNING & SIDEBAR */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT 2 COLUMNS: Courses & AI Insights */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    <span>📚</span> የቀጠሉ ኮርሶች (Continue Learning)
                  </h2>
                  <p className="text-xs text-slate-400">ያቆሙበት ቦታ ላይ በቀጥታ ይቀጥሉ</p>
                </div>
                <Link href="/courses" className="text-xs text-indigo-400 font-bold hover:underline">
                  ሁሉንም ኮርሶች ይመልከቱ →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {IN_PROGRESS_COURSES.map((course) => (
                  <GlassCard key={course.id} className="flex flex-col justify-between space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-xl shrink-0">
                        {course.thumbnail}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider">
                          {course.category}
                        </span>
                        <h3 className="text-xs font-bold text-white truncate">{course.title}</h3>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          ቀጣይ፡ {course.lastLesson}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-800/80">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="text-slate-400">ደረጃ</span>
                        <span className="text-emerald-400">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-emerald-500 h-full transition-all duration-700"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    <Link
                      href={`/courses/${course.id}/learn`}
                      className="w-full bg-slate-800 hover:bg-indigo-600 hover:text-white text-slate-300 text-xs font-bold py-2 rounded-xl text-center transition-all border border-slate-700 hover:border-indigo-500 block"
                    >
                      ትምህርቱን ቀጥል (Resume)
                    </Link>
                  </GlassCard>
                ))}
              </div>
            </div>

            {/* AI Recommendation */}
            <GlassCard className="bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border-indigo-500/30 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold text-sm">
                  🤖
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">AI Learning Recommendation</h3>
                  <p className="text-[11px] text-slate-400">በቀደመው የትምህርት ሂደትህ ላይ ተመስርቶ የተዘጋጀ</p>
                </div>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                "በ Flutter እና Supabase ትምህርት ላይ እጅግ ጥሩ እድገት አሳይተሃል! አሁን በቀጥታ ወደ <strong>Lesson 2.3: Realtime Data Fetching</strong> በመሸጋገር አፕሊኬሽንህን ማጠናቀቅ ትችላለህ።"
              </div>
            </GlassCard>

          </div>

          {/* RIGHT COLUMN: Leaderboard & Achievements */}
          <div className="space-y-6">
            
            {/* LEADERBOARD */}
            <GlassCard className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                  <span>🏆</span> ከፍተኛ ተማሪዎች (Leaderboard)
                </h3>
                <span className="text-[10px] text-indigo-400 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                  Top League
                </span>
              </div>

              <div className="space-y-2">
                {LEADERBOARD.map((user) => (
                  <div
                    key={user.rank}
                    className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-all ${
                      user.isCurrentUser
                        ? "bg-indigo-600/20 border-indigo-500 text-white font-bold"
                        : "bg-slate-800/40 border-slate-800 text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-5 text-center font-extrabold text-[11px] ${user.rank === 1 ? "text-amber-400" : "text-slate-500"}`}>
                        #{user.rank}
                      </span>
                      <span className="text-base">{user.avatar}</span>
                      <span className="truncate max-w-[110px]">{user.name}</span>
                    </div>
                    <span className="text-indigo-400 font-bold">{user.xp} XP</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* ACHIEVEMENTS */}
            <GlassCard className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-white flex items-center gap-2">
                  <span>🎖️</span> Achievements
                </h3>
                <span className="text-[10px] text-slate-400">2 / 3 Unlocked</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {ACHIEVEMENTS_LIST.map((ach) => (
                  <div
                    key={ach.id}
                    title={`${ach.title}: ${ach.desc}`}
                    className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1 transition-all ${
                      ach.unlocked
                        ? "bg-slate-800/80 border-indigo-500/40 text-white"
                        : "bg-slate-950/40 border-slate-800 text-slate-600 grayscale opacity-50"
                    }`}
                  >
                    <span className="text-2xl">{ach.icon}</span>
                    <span className="text-[10px] font-bold truncate w-full">{ach.title}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

          </div>

        </div>

      </main>

    </div>
  );
}

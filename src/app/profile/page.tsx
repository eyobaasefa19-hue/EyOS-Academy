"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trophy, Flame, Coins, BookOpen, CheckCircle, Loader2, ArrowRight } from "lucide-react";

interface UserProfileData {
  id: string;
  fullName: string;
  avatarUrl?: string | null;
  bio?: string | null;
  xpPoints: number;
  coins: number;
  streakDays: number;
  email: string;
}

interface EnrolledCourse {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string | null;
  totalLessons: number;
  completedLessons: number;
  progressPercentage: number;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [stats, setStats] = useState<{ totalCompletedLessons: number; totalEnrolledCourses: number } | null>(null);
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfileData() {
      try {
        setLoading(true);
        setError(null);

        const userEmail = typeof window !== "undefined" ? localStorage.getItem("userEmail") : null;
        const emailQuery = userEmail ? `?email=${encodeURIComponent(userEmail)}` : "";

        const res = await fetch(`/api/user/profile${emailQuery}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const responseText = await res.text();
        if (!responseText) {
          throw new Error("ከሰርቨር ምንም ምላሽ አልተገኘም");
        }

        let data;
        try {
          data = JSON.parse(responseText);
        } catch {
          throw new Error("ከሰርቨር የመጣው ምላሽ ትክክለኛ JSON አይደለም");
        }

        if (!res.ok) {
          throw new Error(data.error || "መረጃውን መጫን አልተቻለም");
        }

        setProfile(data.profile ?? null);
        setStats(data.stats ?? { totalCompletedLessons: 0, totalEnrolledCourses: 0 });
        setCourses(Array.isArray(data.enrolledCourses) ? data.enrolledCourses : []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("ያልታወቀ ስህተት ተፈጥሯል");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProfileData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#0B0F17]">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-[70vh] bg-[#0B0F17] p-6 text-center text-rose-400 space-y-3 flex flex-col items-center justify-center">
        <p className="font-semibold">{error || "የተማሪው መረጃ አልተገኘም"}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 text-xs font-medium bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-xl hover:bg-indigo-600/30 transition"
        >
          እንደገና ሞክር (Reload)
        </button>
      </div>
    );
  }

  // የሰውየው ስም የመጀመሪያ ፊደል ለ Avatar Fallback
  const userInitial = profile.fullName ? profile.fullName.charAt(0).toUpperCase() : "U";

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 p-4 sm:p-6 space-y-6 pb-24">
      {/* 1. Profile Header Card (Dark Theme Glassmorphism) */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row items-center gap-6">
        
        {/* Avatar Circle with Fallback Initial (Fixes text overlay bug) */}
        <div className="relative h-24 w-24 rounded-full border-2 border-indigo-500/50 bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-indigo-500/20 overflow-hidden flex-shrink-0">
          {profile.avatarUrl && profile.avatarUrl.startsWith("http") ? (
            <Image
              src={profile.avatarUrl}
              alt=""
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <span>{userInitial}</span>
          )}
        </div>

        {/* User Details */}
        <div className="flex-1 text-center sm:text-left space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-white">{profile.fullName}</h1>
          <p className="text-sm text-slate-400">{profile.email}</p>
          {profile.bio && (
            <p className="mt-2 text-sm text-slate-300 bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
              {profile.bio}
            </p>
          )}
        </div>

        {/* Badges / Stats Bar */}
        <div className="flex gap-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
          <div className="text-center">
            <div className="flex items-center justify-center text-amber-400 font-bold gap-1">
              <Trophy className="w-5 h-5" />
              <span>{profile.xpPoints ?? 0}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">XP</p>
          </div>

          <div className="text-center border-x border-slate-800 px-4">
            <div className="flex items-center justify-center text-orange-500 font-bold gap-1">
              <Flame className="w-5 h-5" />
              <span>{profile.streakDays ?? 0}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">ቀናት Streak</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center text-yellow-500 font-bold gap-1">
              <Coins className="w-5 h-5" />
              <span>{profile.coins ?? 0}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Coins</p>
          </div>
        </div>
      </div>

      {/* 2. Quick Overview Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
            <BookOpen className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400">የተመዘገቡባቸው ኮርሶች</p>
            <p className="text-xl font-bold text-white">{stats?.totalEnrolledCourses || 0}</p>
          </div>
        </div>

        <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-slate-400">ያለቁ ትምህርቶች</p>
            <p className="text-xl font-bold text-white">{stats?.totalCompletedLessons || 0}</p>
          </div>
        </div>
      </div>

      {/* 3. Enrolled Courses Progress */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">የእኔ ኮርሶች እና ሂደት (Progress)</h2>

        {courses.length === 0 ? (
          <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 text-center space-y-3">
            <p className="text-sm text-slate-400">እስካሁን በምንም ኮርስ አልተመዘገቡም።</p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300"
            >
              ኮርሶችን ይመልከቱ <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {courses.map((course) => (
              <div key={course.id} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex gap-3 items-center">
                  <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-slate-800 border border-slate-700 flex-shrink-0">
                    {course.thumbnail ? (
                      <Image
                        src={course.thumbnail}
                        alt=""
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500">
                        <BookOpen className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white line-clamp-1">{course.title}</h3>
                    <p className="text-xs text-slate-400">
                      {course.completedLessons} ከ {course.totalLessons} ትምህርቶች ተጠናቀዋል
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400 font-medium">
                    <span>ሂደት</span>
                    <span className="text-indigo-400 font-bold">{course.progressPercentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.max(0, course.progressPercentage))}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

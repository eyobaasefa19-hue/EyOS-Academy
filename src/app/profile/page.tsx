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

        // LocalStorage ውስጥ የተቀመጠ ኢሜይል ካለ መውሰድ
        const userEmail = typeof window !== "undefined" ? localStorage.getItem("userEmail") : null;
        const emailQuery = userEmail ? `?email=${encodeURIComponent(userEmail)}` : "";

        const res = await fetch(`/api/user/profile${emailQuery}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // ምላሹ ባዶ አለመሆኑን ማረጋገጥ (Unexpected end of JSON input የሚለውን የሚከላከል)
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
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="p-6 text-center text-red-600 space-y-3">
        <p className="font-semibold">{error || "የተማሪው መረጃ አልተገኘም"}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-xs font-medium text-blue-600 underline hover:text-blue-800"
        >
          እንደገና ሞክር (Reload)
        </button>
      </div>
    );
  }

  // Fallback avatar
  const avatarSrc =
    profile.avatarUrl && profile.avatarUrl.trim() !== ""
      ? profile.avatarUrl
      : "https://avatar.iran.liara.run/public/avatar";

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 space-y-6">
      {/* 1. Profile Header Card */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center gap-6">
        <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-blue-500 bg-slate-100 flex-shrink-0">
          <Image
            src={avatarSrc}
            alt={profile.fullName || "User Avatar"}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-bold text-slate-900">{profile.fullName}</h1>
          <p className="text-sm text-slate-500">{profile.email}</p>
          {profile.bio && <p className="mt-2 text-sm text-slate-600">{profile.bio}</p>}
        </div>

        {/* Badges / Stats */}
        <div className="flex gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div className="text-center">
            <div className="flex items-center justify-center text-amber-500 font-bold gap-1">
              <Trophy className="w-5 h-5" />
              <span>{profile.xpPoints ?? 0}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">XP</p>
          </div>

          <div className="text-center border-x border-slate-200 px-4">
            <div className="flex items-center justify-center text-orange-500 font-bold gap-1">
              <Flame className="w-5 h-5" />
              <span>{profile.streakDays ?? 0}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">ቀናት Streak</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center text-yellow-600 font-bold gap-1">
              <Coins className="w-5 h-5" />
              <span>{profile.coins ?? 0}</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">Coins</p>
          </div>
        </div>
      </div>

      {/* 2. Quick Overview Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-blue-600 flex-shrink-0" />
          <div>
            <p className="text-xs text-slate-500">የተመዘገቡባቸው ኮርሶች</p>
            <p className="text-xl font-bold text-slate-800">{stats?.totalEnrolledCourses || 0}</p>
          </div>
        </div>

        <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 flex items-center gap-3">
          <CheckCircle className="w-8 h-8 text-emerald-600 flex-shrink-0" />
          <div>
            <p className="text-xs text-slate-500">ያለቁ ትምህርቶች</p>
            <p className="text-xl font-bold text-slate-800">{stats?.totalCompletedLessons || 0}</p>
          </div>
        </div>
      </div>

      {/* 3. Enrolled Courses Progress */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">የእኔ ኮርሶች እና ሂደት (Progress)</h2>

        {courses.length === 0 ? (
          <div className="bg-white p-6 rounded-xl border border-slate-100 text-center space-y-3 shadow-sm">
            <p className="text-sm text-slate-500">እስካሁን በምንም ኮርስ አልተመዘገቡም።</p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              ኮርሶችን ይመልከቱ <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {courses.map((course) => {
              const thumbnailSrc =
                course.thumbnail && course.thumbnail.trim() !== ""
                  ? course.thumbnail
                  : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&auto=format&fit=crop&q=60";

              return (
                <div key={course.id} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm space-y-3">
                  <div className="flex gap-3 items-center">
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                      <Image
                        src={thumbnailSrc}
                        alt={course.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 line-clamp-1">{course.title}</h3>
                      <p className="text-xs text-slate-500">
                        {course.completedLessons} ከ {course.totalLessons} ትምህርቶች ተጠናቀዋል
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-500 font-medium">
                      <span>ሂደት</span>
                      <span>{course.progressPercentage}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, Math.max(0, course.progressPercentage))}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

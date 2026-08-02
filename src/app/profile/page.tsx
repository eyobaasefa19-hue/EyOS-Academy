"use client";

import { useEffect, useState, ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { 
  Trophy, Flame, Coins, BookOpen, CheckCircle, Loader2, ArrowRight, 
  Edit3, X, Save, Upload, Camera, LogOut, Award, ShieldCheck, Sparkles 
} from "lucide-react";

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
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [stats, setStats] = useState<{ totalCompletedLessons: number; totalEnrolledCourses: number } | null>(null);
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Profile Edit Modal States
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [editFullName, setEditFullName] = useState<string>("");
  const [editEmail, setEditEmail] = useState<string>("");
  const [editBio, setEditBio] = useState<string>("");
  const [editAvatarUrl, setEditAvatarUrl] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  async function fetchProfileData() {
    try {
      setLoading(true);
      setError(null);

      const { data: { session } } = await supabase.auth.getSession();
      let emailToFetch = session?.user?.email;

      if (!emailToFetch && typeof window !== "undefined") {
        emailToFetch = localStorage.getItem("userEmail") || undefined;
      }

      if (!emailToFetch) {
        router.push("/login");
        return;
      }

      const res = await fetch(`/api/user/profile?email=${encodeURIComponent(emailToFetch)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "መረጃውን መጫን አልተቻለም");

      const userProfile = data.profile || data.user;

      setProfile(userProfile ?? null);
      setStats(data.stats ?? { totalCompletedLessons: 0, totalEnrolledCourses: 0 });
      setCourses(Array.isArray(data.enrolledCourses) ? data.enrolledCourses : []);

      if (userProfile) {
        setEditFullName(userProfile.fullName || userProfile.username || "");
        setEditEmail(userProfile.email || "");
        setEditBio(userProfile.bio || "");
        setEditAvatarUrl(userProfile.avatarUrl || "");
        if (typeof window !== "undefined") {
          localStorage.setItem("userEmail", userProfile.email);
        }
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "ያልታወቀ ስህተት ተፈጥሯል");
    } finally {
      setLoading(false);
    }
  }

  // ፎቶውን ሳይበላሽ መጠን አነስ አድርጎ መቀየሪያ (Canvas Compression)
  const compressAndConvertImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new window.Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 300;
          const MAX_HEIGHT = 300;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.7)); // 70% quality JPG Base64
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedBase64 = await compressAndConvertImage(file);
      setEditAvatarUrl(compressedBase64);
    } catch (err) {
      alert("ምስሉን ማዘጋጀት አልተቻለም፣ እባክዎ ሌላ ምስል ይሞክሩ።");
    }
  };

  async function handleUpdateProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;

    try {
      setIsUpdating(true);
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentEmail: profile.email,
          fullName: editFullName,
          newEmail: editEmail,
          bio: editBio,
          avatarUrl: editAvatarUrl,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "ማስተካከል አልተቻለም");

      if (typeof window !== "undefined" && editEmail) {
        localStorage.setItem("userEmail", editEmail);
      }

      setIsEditOpen(false);
      await fetchProfileData();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "ስህተት ተፈጥሯል");
    } finally {
      setIsUpdating(false);
    }
  }

  const handleSignOut = async () => {
    if (confirm("እርግጠኛ ነዎት መውጣት (Log Out) ይፈልጋሉ?")) {
      await supabase.auth.signOut();
      if (typeof window !== "undefined") {
        localStorage.removeItem("userEmail");
      }
      router.push("/login");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050b14] text-slate-200">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
          <p className="text-xs text-slate-400">ፕሮፋይል በመጫን ላይ...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-[#050b14] p-6 text-center text-rose-400 space-y-4 flex flex-col items-center justify-center">
        <p className="font-semibold text-sm">{error || "የተማሪው መረጃ አልተገኘም"}</p>
        <button
          onClick={() => fetchProfileData()}
          className="px-5 py-2.5 text-xs font-bold bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-xl hover:bg-indigo-600/30 transition cursor-pointer"
        >
          እንደገና ሞክር (Reload)
        </button>
      </div>
    );
  }

  const userInitial = profile.fullName ? profile.fullName.charAt(0).toUpperCase() : "U";

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-200 p-4 sm:p-6 space-y-6 pb-28">
      
      {/* 1. Header Navigation Bar */}
      <div className="flex justify-between items-center bg-slate-900/50 border border-white/10 p-3 rounded-2xl backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <span className="text-xs font-black text-white">EyOS Academy Profile</span>
        </div>

        {/* LOG OUT BUTTON */}
        <button
          onClick={handleSignOut}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl text-xs font-bold transition cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>ይውጡ (Log Out)</span>
        </button>
      </div>

      {/* 2. Profile Header Card */}
      <div className="relative rounded-3xl bg-slate-900/80 border border-white/10 p-6 backdrop-blur-xl shadow-2xl flex flex-col sm:flex-row items-center gap-6">
        
        {/* Profile Edit Button */}
        <button
          onClick={() => setIsEditOpen(true)}
          className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 rounded-xl hover:bg-indigo-600/40 transition cursor-pointer"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>ፕሮፋይል አስተካክል</span>
        </button>

        {/* Avatar Display */}
        <div className="relative h-24 w-24 rounded-2xl border-2 border-indigo-500/50 bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-3xl font-black text-white shadow-xl shadow-indigo-500/20 overflow-hidden shrink-0">
          {profile.avatarUrl ? (
            <Image src={profile.avatarUrl} alt="Avatar" fill className="object-cover" unoptimized />
          ) : (
            <span>{userInitial}</span>
          )}
        </div>

        {/* User Details */}
        <div className="flex-1 text-center sm:text-left space-y-1">
          <h1 className="text-2xl font-black text-white">{profile.fullName}</h1>
          <p className="text-xs text-slate-400">{profile.email}</p>
          {profile.bio && (
            <p className="mt-2 text-xs text-slate-300 bg-slate-950/50 p-3 rounded-xl border border-white/5 max-w-md">
              {profile.bio}
            </p>
          )}
        </div>

        {/* Stats Badges */}
        <div className="flex gap-4 bg-slate-950/80 p-4 rounded-2xl border border-white/10">
          <div className="text-center">
            <div className="flex items-center justify-center text-amber-400 font-extrabold gap-1 text-sm">
              <Trophy className="w-4 h-4" />
              <span>{profile.xpPoints ?? 0}</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 font-bold">XP</p>
          </div>

          <div className="text-center border-x border-white/10 px-4">
            <div className="flex items-center justify-center text-orange-500 font-extrabold gap-1 text-sm">
              <Flame className="w-4 h-4" />
              <span>{profile.streakDays ?? 0}</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 font-bold">Streak</p>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center text-yellow-500 font-extrabold gap-1 text-sm">
              <Coins className="w-4 h-4" />
              <span>{profile.coins ?? 0}</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 font-bold">Coins</p>
          </div>
        </div>
      </div>

      {/* 3. Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
            <BookOpen className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">የተመዘገቡባቸው ኮርሶች</p>
            <p className="text-lg font-black text-white">{stats?.totalEnrolledCourses || 0}</p>
          </div>
        </div>

        <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-[10px] text-slate-400 font-bold uppercase">ያለቁ ትምህርቶች</p>
            <p className="text-lg font-black text-white">{stats?.totalCompletedLessons || 0}</p>
          </div>
        </div>
      </div>

      {/* 4. SENIOR FEATURE: ACHIEVEMENTS & BADGES */}
      <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-4 space-y-3">
        <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          የክብር ባጆችና ሽልማቶች (Achievements)
        </h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-slate-950/60 border border-white/5 p-3 rounded-xl flex flex-col items-center text-center">
            <ShieldCheck className="w-6 h-6 text-indigo-400 mb-1" />
            <span className="text-[11px] font-bold text-slate-200">Level 1 Scholar</span>
            <span className="text-[9px] text-slate-500">ተከፍቷል</span>
          </div>
          <div className="bg-slate-950/60 border border-white/5 p-3 rounded-xl flex flex-col items-center text-center opacity-70">
            <Flame className="w-6 h-6 text-orange-400 mb-1" />
            <span className="text-[11px] font-bold text-slate-200">Streak Master</span>
            <span className="text-[9px] text-amber-400">{profile.streakDays}/7 Days</span>
          </div>
          <div className="bg-slate-950/60 border border-white/5 p-3 rounded-xl flex flex-col items-center text-center opacity-70">
            <Trophy className="w-6 h-6 text-yellow-400 mb-1" />
            <span className="text-[11px] font-bold text-slate-200">10K XP Club</span>
            <span className="text-[9px] text-emerald-400">ተሳክቷል</span>
          </div>
        </div>
      </div>

      {/* 5. Enrolled Courses */}
      <div className="space-y-4">
        <h2 className="text-sm font-black text-white uppercase tracking-wider">የእኔ ኮርሶች እና ሂደት (Progress)</h2>

        {courses.length === 0 ? (
          <div className="bg-slate-900/50 p-8 rounded-2xl border border-white/10 text-center space-y-3">
            <p className="text-xs text-slate-400">እስካሁን በምንም ኮርስ አልተመዘገቡም።</p>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300"
            >
              ኮርሶችን ይመልከቱ <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {courses.map((course) => (
              <div key={course.id} className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 space-y-3">
                <div className="flex gap-3 items-center">
                  <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-slate-800 border border-white/10 shrink-0">
                    {course.thumbnail ? (
                      <Image src={course.thumbnail} alt="" fill className="object-cover" unoptimized />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500">
                        <BookOpen className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white line-clamp-1">{course.title}</h3>
                    <p className="text-[10px] text-slate-400">
                      {course.completedLessons} ከ {course.totalLessons} ትምህርቶች
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                    <span>ሂደት</span>
                    <span className="text-indigo-400">{course.progressPercentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.max(0, course.progressPercentage))}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 6. EDIT PROFILE MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#0c1322] border border-white/10 p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-sm font-black text-white uppercase tracking-wider">ፕሮፋይል አስተካክል</h3>
              <button onClick={() => setIsEditOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              
              {/* Photo Upload Section with Compression */}
              <div className="flex flex-col items-center gap-3 py-2">
                <div className="relative h-20 w-20 rounded-2xl border-2 border-indigo-500/50 bg-slate-800 flex items-center justify-center overflow-hidden">
                  {editAvatarUrl ? (
                    <Image src={editAvatarUrl} alt="Preview" fill className="object-cover" unoptimized />
                  ) : (
                    <Camera className="w-8 h-8 text-slate-500" />
                  )}
                </div>

                <label className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-bold cursor-pointer hover:bg-indigo-600/30 transition">
                  <Upload className="w-3.5 h-3.5" />
                  <span>ፎቶ ምረጥ (Auto Compressed)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">ሙሉ ስም</label>
                <input
                  type="text"
                  value={editFullName}
                  onChange={(e) => setEditFullName(e.target.value)}
                  className="w-full rounded-xl bg-slate-900 border border-white/10 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">ኢሜይል</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full rounded-xl bg-slate-900 border border-white/10 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">ወይም የፎቶ URL (Image URL)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={editAvatarUrl.startsWith("data:") ? "" : editAvatarUrl}
                  onChange={(e) => setEditAvatarUrl(e.target.value)}
                  className="w-full rounded-xl bg-slate-900 border border-white/10 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">ስለ እኔ (Bio)</label>
                <textarea
                  rows={3}
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className="w-full rounded-xl bg-slate-900 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="flex-1 py-2.5 text-xs font-bold bg-slate-800 text-slate-300 rounded-xl hover:bg-slate-700 transition"
                >
                  ሰርዝ
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-bold bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition disabled:opacity-50 cursor-pointer"
                >
                  {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>አስቀምጥ</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

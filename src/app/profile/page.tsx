/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// Default Profile Data (እስከ Supabase መረጃ ድረስ የሚታይ)
const INITIAL_PROFILE = {
  name: "Eyob Asefa",
  email: "eyob19@gmail.com",
  avatar: "https://ui-avatars.com/api/?name=Eyob+Asefa&background=4F46E5&color=fff&size=256",
  joinDate: "June 2026",
  stats: {
    enrolledCourses: 4,
    completedCourses: 2,
    totalCertificates: 2,
    learningHours: 45
  },
  enrolled: [
    { id: "1", title: "Full-Stack Flutter Mobile Dev", progress: 100, isCompleted: true },
    { id: "2", title: "Aviation Logistics & Cargo Pro", progress: 100, isCompleted: true },
    { id: "3", title: "Advanced AI Prompt Engineering", progress: 65, isCompleted: false },
  ],
  certificates: [
    {
      id: "CERT-2026-FLT",
      courseName: "Full-Stack Flutter Mobile App Development",
      issueDate: "July 15, 2026",
      instructor: "EyOS Academy Team"
    },
    {
      id: "CERT-2026-AVL",
      courseName: "Aviation Logistics, Cargo & Ground Operations",
      issueDate: "July 20, 2026",
      instructor: "Aviation Training Hub"
    }
  ]
};

export default function UserProfilePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State Management
  const [activeTab, setActiveTab] = useState<"overview" | "certificates">("overview");
  const [selectedCert, setSelectedCert] = useState<any>(null);

  // Profile Edit States
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [editName, setEditName] = useState(INITIAL_PROFILE.name);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [toastMessage, setToastMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Fetch Current User from Supabase Session if logged in
  useEffect(() => {
    async function loadUser() {
      try {
        if (!supabase) return;
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const user = session.user;
          const meta = user.user_metadata || {};
          
          const userFullName = meta.full_name || user.email?.split("@")[0] || INITIAL_PROFILE.name;
          const userAvatar = meta.avatar_url || INITIAL_PROFILE.avatar;
          const createdDate = new Date(user.created_at || Date.now()).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric"
          });

          setProfile(prev => ({
            ...prev,
            name: userFullName,
            email: user.email || prev.email,
            avatar: userAvatar,
            joinDate: createdDate
          }));
          setEditName(userFullName);
        }
      } catch (err) {
        console.error("User session fetch error:", err);
      }
    }
    loadUser();
  }, []);

  // Handle Photo Picker Change
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setToastMessage({ type: "error", text: "የምስሉ መጠን ከ 5MB ማነስ አለበት!" });
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewImage(objectUrl);
    setToastMessage(null);
  };

  // Convert File to Base64 (Fallback if Supabase Storage bucket isn't setup)
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  // Save Profile Edits
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setToastMessage(null);

    try {
      let finalAvatar = profile.avatar;

      // Upload or convert image if selected
      if (selectedFile) {
        try {
          const fileExt = selectedFile.name.split(".").pop();
          const fileName = `avatar-${Date.now()}.${fileExt}`;
          const filePath = `avatars/${fileName}`;

          if (supabase) {
            const { error: uploadErr } = await supabase.storage
              .from("avatars")
              .upload(filePath, selectedFile, { upsert: true });

            if (!uploadErr) {
              const { data: publicUrlData } = supabase.storage
                .from("avatars")
                .getPublicUrl(filePath);

              if (publicUrlData?.publicUrl) {
                finalAvatar = publicUrlData.publicUrl;
              }
            } else {
              // Fallback to Base64
              finalAvatar = await fileToBase64(selectedFile);
            }
          } else {
            finalAvatar = await fileToBase64(selectedFile);
          }
        } catch {
          finalAvatar = await fileToBase64(selectedFile);
        }
      }

      // Update Supabase Auth user metadata if logged in
      if (supabase) {
        await supabase.auth.updateUser({
          data: {
            full_name: editName,
            avatar_url: finalAvatar
          }
        });
      }

      // Update local UI state
      setProfile(prev => ({
        ...prev,
        name: editName,
        avatar: previewImage || finalAvatar
      }));

      setIsEditing(false);
      setSelectedFile(null);
      setPreviewImage(null);
      setToastMessage({ type: "success", text: "ፕሮፋይልዎ በጥሩ ሁኔታ ተስተካክሏል! 🎉" });
    } catch (err: any) {
      console.error("Save error:", err);
      setToastMessage({ type: "error", text: err.message || "ማስተካከል አልተቻለም፣ እባክዎ ደግመው ይሞክሩ።" });
    } finally {
      setSaving(false);
    }
  };

  const currentAvatarDisplay = previewImage || profile.avatar;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-4 sm:p-8 pb-32">
      
      {/* Hidden File Input for Avatar Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageSelect}
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
      />

      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-6">
          <Link href="/dashboard" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
            ← ወደ ዳሽቦርድ ተመለስ
          </Link>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">የእኔ ፕሮፋይል</h1>
        </div>

        {/* Notification Toast */}
        {toastMessage && (
          <div className={`p-4 rounded-2xl text-xs font-bold border flex items-center justify-between animate-in fade-in duration-300 ${
            toastMessage.type === "success" 
              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              : "bg-rose-500/10 border-rose-500/30 text-rose-400"
          }`}>
            <span>{toastMessage.text}</span>
            <button onClick={() => setToastMessage(null)} className="text-slate-400 hover:text-white">✕</button>
          </div>
        )}

        {/* Profile Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Profile Card */}
          <div className="bg-[#161B26] border border-gray-800 rounded-3xl p-6 flex flex-col items-center text-center space-y-4 shadow-xl relative overflow-hidden">
            
            {/* Avatar Container */}
            <div className="relative group">
              <img
                src={currentAvatarDisplay}
                alt={profile.name}
                className="w-28 h-28 rounded-full border-4 border-indigo-500/40 object-cover shadow-lg transition-transform group-hover:scale-105"
              />
              
              {/* Photo Upload Trigger Button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-indigo-600 p-2.5 rounded-full border-2 border-[#161B26] text-white hover:bg-indigo-500 transition-all active:scale-90 shadow-md cursor-pointer"
                title="ፎቶ ቀይር"
              >
                ✏️
              </button>
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">{profile.name}</h2>
              <p className="text-xs text-gray-400">{profile.email}</p>
            </div>

            <div className="text-[11px] text-gray-400 bg-gray-900/60 px-3 py-1 rounded-full border border-gray-800">
              አባል የሆነበት፡ {profile.joinDate}
            </div>

            {/* Toggle Edit Profile Button */}
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full py-2.5 bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold rounded-xl transition-all border border-gray-700 cursor-pointer active:scale-95 flex items-center justify-center gap-2"
              >
                <span>✏️</span> ፕሮፋይል አስተካክል (Edit Profile)
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsEditing(false);
                  setPreviewImage(null);
                  setSelectedFile(null);
                }}
                className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold rounded-xl transition-all border border-gray-700 cursor-pointer"
              >
                ሰርዝ (Cancel)
              </button>
            )}

          </div>

          {/* Stats Grid */}
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#161B26] border border-gray-800 rounded-2xl p-5 flex flex-col justify-center items-center shadow-lg hover:border-indigo-500/40 transition-colors">
              <span className="text-3xl font-extrabold text-indigo-400">{profile.stats.enrolledCourses}</span>
              <span className="text-xs text-gray-400 mt-1 text-center font-medium">የተመዘገቡ ኮርሶች</span>
            </div>
            <div className="bg-[#161B26] border border-gray-800 rounded-2xl p-5 flex flex-col justify-center items-center shadow-lg hover:border-emerald-500/40 transition-colors">
              <span className="text-3xl font-extrabold text-emerald-400">{profile.stats.completedCourses}</span>
              <span className="text-xs text-gray-400 mt-1 text-center font-medium">ያጠናቀቋቸው</span>
            </div>
            <div className="bg-[#161B26] border border-gray-800 rounded-2xl p-5 flex flex-col justify-center items-center shadow-lg hover:border-amber-500/40 transition-colors">
              <span className="text-3xl font-extrabold text-amber-400">{profile.stats.totalCertificates}</span>
              <span className="text-xs text-gray-400 mt-1 text-center font-medium">ሰርተፊኬቶች</span>
            </div>
            <div className="bg-[#161B26] border border-gray-800 rounded-2xl p-5 flex flex-col justify-center items-center shadow-lg hover:border-purple-500/40 transition-colors">
              <span className="text-3xl font-extrabold text-purple-400">{profile.stats.learningHours}h</span>
              <span className="text-xs text-gray-400 mt-1 text-center font-medium">የመማሪያ ሰዓት</span>
            </div>
          </div>

        </div>

        {/* Edit Form Modal/Drawer Section */}
        {isEditing && (
          <form 
            onSubmit={handleSaveProfile} 
            className="bg-[#161B26] border border-indigo-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in slide-in-from-top-4 duration-300"
          >
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <h3 className="text-base font-bold text-indigo-400 flex items-center gap-2">
                <span>⚙️</span> የፕሮፋይል መረጃ ማስተካከያ
              </h3>
              <span className="text-xs text-gray-400">የአካውንት መረጃዎችን እዚህ መቀየር ይችላሉ</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Photo Selector inside Form */}
              <div className="sm:col-span-2 bg-gray-900/60 p-4 rounded-2xl border border-gray-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img 
                    src={currentAvatarDisplay} 
                    alt="Preview" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500" 
                  />
                  <div>
                    <p className="text-xs font-bold text-white">የፕሮፋይል ፎቶ መቀየሪያ</p>
                    <p className="text-[10px] text-gray-400">PNG, JPG እስከ 5MB</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  {selectedFile ? "ሌላ ፎቶ ምረጥ" : "ፎቶ ምረጥ (Upload)"}
                </button>
              </div>

              {/* Full Name Input */}
              <div className="space-y-2 sm:col-span-2">
                <label className="text-xs font-semibold text-gray-300">ሙሉ ስም (Full Name)</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="ሙሉ ስም ያስገቡ"
                />
              </div>

            </div>

            {/* Submit Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-3 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {saving ? "እየተቀመጠ ነው..." : "✓ መረጃውን አስቀምጥ (Save Changes)"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setPreviewImage(null);
                  setSelectedFile(null);
                }}
                className="px-5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-semibold py-3 rounded-xl transition-all cursor-pointer"
              >
                ሰርዝ
              </button>
            </div>
          </form>
        )}

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-800 gap-6 text-sm font-bold">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-3 transition-colors cursor-pointer ${
              activeTab === "overview" 
                ? "text-indigo-400 border-b-2 border-indigo-500" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            የኮርስ ሂደቶች (My Courses)
          </button>
          <button
            onClick={() => setActiveTab("certificates")}
            className={`pb-3 transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === "certificates" 
                ? "text-amber-400 border-b-2 border-amber-400" 
                : "text-gray-400 hover:text-white"
            }`}
          >
            ሰርተፊኬቶች 🎓
          </button>
        </div>

        {/* Tab Content: Course Progress */}
        {activeTab === "overview" && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {profile.enrolled.map((course) => (
              <div 
                key={course.id} 
                className="bg-[#161B26] border border-gray-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-gray-700 transition-all"
              >
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white">{course.title}</h3>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="w-full max-w-xs bg-gray-800 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${course.isCompleted ? "bg-emerald-500" : "bg-indigo-500"}`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-gray-400">{course.progress}%</span>
                  </div>
                </div>
                <div>
                  {course.isCompleted ? (
                    <span className="px-3.5 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-bold inline-block">
                      ✓ ተጠናቋል
                    </span>
                  ) : (
                    <Link 
                      href={`/courses/${course.id}/learn`} 
                      className="inline-block px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md active:scale-95"
                    >
                      ቀጥል (Continue) →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: Certificates Grid */}
        {activeTab === "certificates" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in duration-200">
            {profile.certificates.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="bg-gradient-to-br from-[#1a1f2e] to-[#121620] border border-gray-700 hover:border-amber-500/60 rounded-2xl p-1 cursor-pointer transition-all hover:scale-[1.02] shadow-2xl group"
              >
                <div className="border border-dashed border-gray-600 group-hover:border-amber-500/40 rounded-xl p-6 h-full flex flex-col justify-center items-center text-center space-y-3 relative overflow-hidden transition-colors">
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-30 transition-opacity text-2xl">
                    🎓
                  </div>
                  <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center text-xl border border-amber-500/20 mb-1">
                    🏆
                  </div>
                  <h3 className="text-sm font-bold text-white leading-snug">{cert.courseName}</h3>
                  <p className="text-[11px] text-gray-400">የተሰጠበት ቀን: {cert.issueDate}</p>
                  <button className="text-xs text-amber-400 font-semibold mt-2 opacity-90 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    ሰርተፊኬቱን እይ 🔍
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Certificate Viewer Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white text-gray-900 rounded-2xl max-w-3xl w-full p-2 relative animate-in zoom-in-95 duration-200 shadow-2xl">
            
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 text-sm font-bold flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full cursor-pointer"
            >
              ✕ ዝጋ (Close)
            </button>
            
            {/* The Certificate Document Template */}
            <div className="border-[10px] border-[#1e293b] p-6 sm:p-12 text-center relative overflow-hidden bg-slate-50 rounded-xl">
              <div className="absolute inset-0 border-[3px] border-amber-500/30 m-2 pointer-events-none" />
              
              <div className="relative z-10 space-y-5">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-indigo-950 text-white rounded-full flex items-center justify-center font-black text-xl shadow-xl border-2 border-amber-400">
                    EyOS
                  </div>
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-serif text-[#1e293b] uppercase tracking-widest font-extrabold">
                  Certificate of Completion
                </h2>
                
                <p className="text-xs sm:text-sm text-gray-600 font-medium">This is to certify that</p>
                
                <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 italic border-b-2 border-gray-300 inline-block pb-2 px-6">
                  {profile.name}
                </h1>
                
                <p className="text-xs sm:text-sm text-gray-600 font-medium">has successfully completed the course</p>
                
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 max-w-xl mx-auto leading-snug">
                  {selectedCert.courseName}
                </h3>
                
                <div className="grid grid-cols-2 gap-8 pt-8 text-left">
                  <div className="border-t border-gray-300 pt-2">
                    <p className="text-xs font-bold text-gray-800">{selectedCert.instructor}</p>
                    <p className="text-[10px] text-gray-500 uppercase font-semibold">Instructor / Academy</p>
                  </div>
                  <div className="border-t border-gray-300 pt-2 text-right">
                    <p className="text-xs font-bold text-gray-800">{selectedCert.issueDate}</p>
                    <p className="text-[10px] text-gray-500 uppercase font-semibold">Date Issued</p>
                  </div>
                </div>

                <div className="pt-4 text-[9px] text-gray-400 font-mono tracking-wider">
                  Credential ID: {selectedCert.id}
                </div>
              </div>
            </div>
            
            {/* Action buttons inside Modal */}
            <div className="mt-3 flex flex-wrap justify-center gap-3 bg-gray-100 p-3 rounded-b-xl">
              <button 
                onClick={() => window.print()}
                className="px-5 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-500 transition-all cursor-pointer shadow-md"
              >
                📥 Download / Print PDF
              </button>
              <button 
                onClick={() => setSelectedCert(null)}
                className="px-5 py-2.5 bg-gray-200 text-gray-800 text-xs font-bold rounded-xl hover:bg-gray-300 transition-all cursor-pointer"
              >
                ዝጋ
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

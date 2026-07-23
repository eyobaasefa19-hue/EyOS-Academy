/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";

// --- Mock User Data ---
const USER_PROFILE = {
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
  const [activeTab, setActiveTab] = useState<"overview" | "certificates">("overview");
  const [selectedCert, setSelectedCert] = useState<any>(null);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-4 sm:p-8 pb-32">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Navigation */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-6">
          <Link href="/dashboard" className="text-xs text-indigo-400 hover:underline">
            ← ወደ ዳሽቦርድ ተመለስ
          </Link>
          <h1 className="text-2xl font-extrabold text-white">የእኔ ፕሮፋይል</h1>
        </div>

        {/* Profile Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Profile Card */}
          <div className="bg-[#161B26] border border-gray-800 rounded-3xl p-6 flex flex-col items-center text-center space-y-4 shadow-xl">
            <div className="relative">
              <img
                src={USER_PROFILE.avatar}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-indigo-500/30 object-cover"
              />
              <button className="absolute bottom-0 right-0 bg-indigo-600 p-1.5 rounded-full border border-gray-900 hover:bg-indigo-700 transition-colors">
                ✏️
              </button>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{USER_PROFILE.name}</h2>
              <p className="text-xs text-gray-400">{USER_PROFILE.email}</p>
            </div>
            <div className="text-[11px] text-gray-500 bg-gray-900/50 px-3 py-1 rounded-full border border-gray-800">
              አባል የሆነበት፡ {USER_PROFILE.joinDate}
            </div>
            <button className="w-full py-2 bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold rounded-xl transition-all border border-gray-700">
              ፕሮፋይል አስተካክል (Edit Profile)
            </button>
          </div>

          {/* Stats Grid */}
          <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#161B26] border border-gray-800 rounded-2xl p-5 flex flex-col justify-center items-center shadow-lg">
              <span className="text-3xl font-extrabold text-indigo-400">{USER_PROFILE.stats.enrolledCourses}</span>
              <span className="text-xs text-gray-400 mt-1 text-center">የተመዘገቡ ኮርሶች</span>
            </div>
            <div className="bg-[#161B26] border border-gray-800 rounded-2xl p-5 flex flex-col justify-center items-center shadow-lg">
              <span className="text-3xl font-extrabold text-emerald-400">{USER_PROFILE.stats.completedCourses}</span>
              <span className="text-xs text-gray-400 mt-1 text-center">ያጠናቀቋቸው</span>
            </div>
            <div className="bg-[#161B26] border border-gray-800 rounded-2xl p-5 flex flex-col justify-center items-center shadow-lg">
              <span className="text-3xl font-extrabold text-amber-400">{USER_PROFILE.stats.totalCertificates}</span>
              <span className="text-xs text-gray-400 mt-1 text-center">ሰርተፊኬቶች</span>
            </div>
            <div className="bg-[#161B26] border border-gray-800 rounded-2xl p-5 flex flex-col justify-center items-center shadow-lg">
              <span className="text-3xl font-extrabold text-purple-400">{USER_PROFILE.stats.learningHours}h</span>
              <span className="text-xs text-gray-400 mt-1 text-center">የመማሪያ ሰዓት</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-800 gap-6 text-sm font-bold">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-3 transition-colors ${activeTab === "overview" ? "text-indigo-400 border-b-2 border-indigo-500" : "text-gray-400 hover:text-white"}`}
          >
            የኮርስ ሂደቶች (My Courses)
          </button>
          <button
            onClick={() => setActiveTab("certificates")}
            className={`pb-3 transition-colors flex items-center gap-2 ${activeTab === "certificates" ? "text-amber-400 border-b-2 border-amber-400" : "text-gray-400 hover:text-white"}`}
          >
            ሰርተፊኬቶች 🎓
          </button>
        </div>

        {/* Tab Content: Course Progress */}
        {activeTab === "overview" && (
          <div className="space-y-4 animate-in fade-in">
            {USER_PROFILE.enrolled.map((course) => (
              <div key={course.id} className="bg-[#161B26] border border-gray-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white">{course.title}</h3>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="w-full max-w-xs bg-gray-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${course.isCompleted ? "bg-emerald-500" : "bg-indigo-500"}`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-gray-400">{course.progress}%</span>
                  </div>
                </div>
                <div>
                  {course.isCompleted ? (
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-xs font-bold">
                      ✓ ተጠናቋል
                    </span>
                  ) : (
                    <Link href={`/courses/${course.id}/learn`} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md">
                      ቀጥል (Continue)
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Content: Certificates */}
        {activeTab === "certificates" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in">
            {USER_PROFILE.certificates.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="bg-gradient-to-br from-[#1a1f2e] to-[#121620] border border-gray-700 hover:border-amber-500/50 rounded-2xl p-1 cursor-pointer transition-all hover:scale-[1.02] shadow-2xl group"
              >
                <div className="border border-dashed border-gray-600 rounded-xl p-5 h-full flex flex-col justify-center items-center text-center space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                    🎓
                  </div>
                  <div className="w-12 h-12 bg-amber-500/10 text-amber-400 rounded-full flex items-center justify-center text-xl border border-amber-500/20 mb-2">
                    🏆
                  </div>
                  <h3 className="text-sm font-bold text-white leading-snug">{cert.courseName}</h3>
                  <p className="text-[10px] text-gray-400">የተሰጠበት ቀን: {cert.issueDate}</p>
                  <button className="text-xs text-amber-400 font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    ሰርተፊኬቱን እይ →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Certificate View Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-gray-900 rounded-lg max-w-3xl w-full p-2 relative animate-in zoom-in-95">
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 text-xl"
            >
              ✕ ዝጋ
            </button>
            
            {/* The Certificate UI */}
            <div className="border-[12px] border-[#1e293b] p-8 sm:p-12 text-center relative overflow-hidden bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
              <div className="absolute inset-0 border-[4px] border-amber-400/30 m-2" />
              
              <div className="relative z-10 space-y-6">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-indigo-900 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg border-2 border-amber-400">
                    EyOS
                  </div>
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-serif text-[#1e293b] uppercase tracking-widest">
                  Certificate of Completion
                </h2>
                
                <p className="text-sm text-gray-600 font-medium">This is to certify that</p>
                
                <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 italic border-b-2 border-gray-300 inline-block pb-2 px-8">
                  {USER_PROFILE.name}
                </h1>
                
                <p className="text-sm text-gray-600 font-medium">has successfully completed the course</p>
                
                <h3 className="text-xl sm:text-2xl font-bold text-gray-800 max-w-xl mx-auto leading-snug">
                  {selectedCert.courseName}
                </h3>
                
                <div className="grid grid-cols-2 gap-8 pt-12 text-left">
                  <div className="border-t border-gray-400 pt-2">
                    <p className="text-xs font-bold text-gray-800">{selectedCert.instructor}</p>
                    <p className="text-[10px] text-gray-500 uppercase">Instructor / Academy</p>
                  </div>
                  <div className="border-t border-gray-400 pt-2 text-right">
                    <p className="text-xs font-bold text-gray-800">{selectedCert.issueDate}</p>
                    <p className="text-[10px] text-gray-500 uppercase">Date Issued</p>
                  </div>
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] text-gray-400 font-mono">
                  Credential ID: {selectedCert.id}
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-center gap-4 bg-gray-100 p-3 rounded-b-lg">
              <button className="px-6 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700">
                📥 Download PDF
              </button>
              <button className="px-6 py-2 bg-gray-200 text-gray-800 text-xs font-bold rounded-lg hover:bg-gray-300">
                🔗 Share Link
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

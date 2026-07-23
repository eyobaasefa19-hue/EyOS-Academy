/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";

// --- Mock Admin Data ---
const ADMIN_STATS = {
  totalRevenue: 245000, // ETB
  activeStudents: 1420,
  totalCourses: 12,
  pendingApprovals: 5
};

const INITIAL_COURSES = [
  { id: "1", title: "Full-Stack Flutter & Supabase Mobile App Dev", category: "Mobile Dev", price: 1500, students: 420, status: "Active" },
  { id: "2", title: "Advanced Prompt Engineering & AI Automation", category: "AI Tech", price: 1200, students: 310, status: "Active" },
  { id: "3", title: "Aviation Logistics & Cargo Operations", category: "Aviation", price: 2000, students: 690, status: "Active" },
];

const RECENT_TRANSACTIONS = [
  { id: "TX-901", student: "Abebe Kebede", course: "Flutter Mobile Dev", amount: 999, method: "Telebirr", date: "Just now" },
  { id: "TX-902", student: "Tigist Alemu", course: "AI Automation", amount: 799, method: "Chapa", date: "10 mins ago" },
  { id: "TX-903", student: "Dawit Isaac", course: "Aviation Logistics", amount: 1499, method: "Telebirr", date: "1 hour ago" },
];

export default function AdminDashboardPage() {
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  
  // Form State
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Mobile Dev");
  const [newPrice, setNewPrice] = useState("");

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newPrice) return;

    const newCourseObj = {
      id: Date.now().toString(),
      title: newTitle,
      category: newCategory,
      price: Number(newPrice),
      students: 0,
      status: "Active"
    };

    setCourses([newCourseObj, ...courses]);
    setNewTitle("");
    setNewPrice("");
    setIsAddCourseModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-4 sm:p-8 pb-32">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-red-500/10 text-red-400 text-xs font-bold px-2.5 py-0.5 rounded-md border border-red-500/20">
                ADMIN PANEL
              </span>
              <Link href="/dashboard" className="text-xs text-indigo-400 hover:underline">
                ← ወደ ተማሪዎች ዳሽቦርድ
              </Link>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              EyOS Academy Admin Management
            </h1>
          </div>

          <button
            onClick={() => setIsAddCourseModalOpen(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2"
          >
            ➕ አዲስ ኮርስ ጨምር (Add Course)
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-[#161B26] border border-gray-800 rounded-2xl p-5 space-y-2 shadow-xl">
            <span className="text-xs text-gray-400">አጠቃላይ ገቢ (Total Revenue)</span>
            <div className="text-2xl font-extrabold text-emerald-400">
              {ADMIN_STATS.totalRevenue.toLocaleString()} <span className="text-xs text-gray-500">ETB</span>
            </div>
            <span className="text-[10px] text-emerald-500/80">▲ +18% በዚህ ወር</span>
          </div>

          <div className="bg-[#161B26] border border-gray-800 rounded-2xl p-5 space-y-2 shadow-xl">
            <span className="text-xs text-gray-400">የነቁ ተማሪዎች (Active Students)</span>
            <div className="text-2xl font-extrabold text-indigo-400">{ADMIN_STATS.activeStudents}</div>
            <span className="text-[10px] text-gray-500">በሁሉም ኮርሶች ላይ</span>
          </div>

          <div className="bg-[#161B26] border border-gray-800 rounded-2xl p-5 space-y-2 shadow-xl">
            <span className="text-xs text-gray-400">የተለቀቁ ኮርሶች (Active Courses)</span>
            <div className="text-2xl font-extrabold text-amber-400">{courses.length}</div>
            <span className="text-[10px] text-gray-500">በእይኦስ አካደሚ</span>
          </div>

          <div className="bg-[#161B26] border border-gray-800 rounded-2xl p-5 space-y-2 shadow-xl">
            <span className="text-xs text-gray-400">የሚጠበቁ ማረጋገጫዎች</span>
            <div className="text-2xl font-extrabold text-purple-400">{ADMIN_STATS.pendingApprovals}</div>
            <span className="text-[10px] text-purple-400/80">የቴሌብር ማረጋገጫዎች</span>
          </div>
        </div>

        {/* Main Content: Course Management & Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Active Courses List (2 Columns) */}
          <div className="lg:col-span-2 bg-[#161B26] border border-gray-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h3 className="font-bold text-sm text-white">የኮርሶች አስተዳደር (Course Inventory)</h3>
              <span className="text-xs text-gray-400">ጠቅላላ፡ {courses.length}</span>
            </div>

            <div className="divide-y divide-gray-800/80">
              {courses.map((course) => (
                <div key={course.id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="space-y-1 truncate">
                    <h4 className="text-xs sm:text-sm font-bold text-white truncate">{course.title}</h4>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400">
                      <span className="bg-gray-800 px-2 py-0.5 rounded-md">{course.category}</span>
                      <span>👥 {course.students} ተማሪዎች</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-xs font-extrabold text-emerald-400">{course.price} ETB</span>
                    <button className="text-xs text-gray-400 hover:text-white p-1.5 bg-gray-800/60 rounded-lg">
                      ⚙️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Live Transactions (1 Column) */}
          <div className="bg-[#161B26] border border-gray-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h3 className="font-bold text-sm text-white">የቅርብ ጊዜ ክፍያዎች</h3>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full">Live</span>
            </div>

            <div className="space-y-3">
              {RECENT_TRANSACTIONS.map((tx) => (
                <div key={tx.id} className="p-3 bg-gray-900/60 rounded-xl border border-gray-800/80 space-y-1">
                  <div className="flex justify-between items-center text-xs font-bold text-white">
                    <span>{tx.student}</span>
                    <span className="text-emerald-400">+{tx.amount} ETB</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-gray-400">
                    <span className="truncate max-w-[140px]">{tx.course}</span>
                    <span className="text-sky-400 font-semibold">{tx.method}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* --- ADD COURSE MODAL --- */}
      {isAddCourseModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161B26] border border-gray-800 rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative animate-in zoom-in-95">
            
            <button
              onClick={() => setIsAddCourseModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg"
            >
              ✕
            </button>

            <div>
              <h3 className="text-lg font-bold text-white">አዲስ ኮርስ መፍጠሪያ (Create Course)</h3>
              <p className="text-xs text-gray-400">የአዲሱን ኮርስ መረጃዎች እዚህ ያስገቡ</p>
            </div>

            <form onSubmit={handleAddCourse} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-gray-300 font-semibold">የኮርሱ ርዕስ (Course Title)</label>
                <input
                  type="text"
                  required
                  placeholder="እ.ኤ.አ. Full-Stack Web Development with Next.js"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-gray-300 font-semibold">ካቴጎሪ (Category)</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Mobile Dev">Mobile Dev</option>
                    <option value="AI Tech">AI Tech</option>
                    <option value="Aviation">Aviation</option>
                    <option value="Web Development">Web Development</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs text-gray-300 font-semibold">ዋጋ በ ETB (Price)</label>
                  <input
                    type="number"
                    required
                    placeholder="1200"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-indigo-600/30 mt-2"
              >
                ኮርሱን መዝግብ እና አሳትም (Publish Course)
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}

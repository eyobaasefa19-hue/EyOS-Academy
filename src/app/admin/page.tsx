"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  TrendingUp, Users, BookOpen, Clock, 
  Plus, Settings, ChevronLeft, CreditCard, 
  Wallet, X, ShieldAlert 
} from "lucide-react";

// --- Mock Admin Data ---
const ADMIN_STATS = {
  totalRevenue: 245000,
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
    <div className="min-h-screen bg-[#050b14] text-white p-4 sm:p-8 pb-32 font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-rose-500/10 text-rose-400 text-[10px] font-black px-3 py-1 rounded-md border border-rose-500/20 flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" /> ADMIN PANEL
              </span>
              <Link href="/dashboard" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors">
                <ChevronLeft className="w-4 h-4" /> ወደ ተማሪዎች ዳሽቦርድ
              </Link>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1 tracking-tight">
              EyOS Academy Management
            </h1>
          </div>

          <button
            onClick={() => setIsAddCourseModalOpen(true)}
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 active:scale-95"
          >
            <Plus className="w-4 h-4" /> አዲስ ኮርስ (Add Course)
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Stat 1 */}
          <div className="bg-[#0f172a]/60 backdrop-blur-md border border-white/5 hover:border-emerald-500/30 transition-colors rounded-3xl p-6 space-y-3 shadow-xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 text-emerald-500/10 group-hover:text-emerald-500/20 transition-colors">
              <TrendingUp className="w-24 h-24" />
            </div>
            <span className="text-xs font-medium text-gray-400 relative z-10">አጠቃላይ ገቢ (Revenue)</span>
            <div className="text-3xl font-black text-emerald-400 relative z-10 tracking-tight">
              {ADMIN_STATS.totalRevenue.toLocaleString()} <span className="text-sm font-semibold text-emerald-500/70">ETB</span>
            </div>
            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md w-max relative z-10">
              ▲ +18% በዚህ ወር
            </span>
          </div>

          {/* Stat 2 */}
          <div className="bg-[#0f172a]/60 backdrop-blur-md border border-white/5 hover:border-indigo-500/30 transition-colors rounded-3xl p-6 space-y-3 shadow-xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 text-indigo-500/10 group-hover:text-indigo-500/20 transition-colors">
              <Users className="w-24 h-24" />
            </div>
            <span className="text-xs font-medium text-gray-400 relative z-10">የነቁ ተማሪዎች (Active)</span>
            <div className="text-3xl font-black text-indigo-400 relative z-10 tracking-tight">{ADMIN_STATS.activeStudents}</div>
            <span className="text-[10px] font-bold text-gray-400 bg-white/5 px-2 py-1 rounded-md w-max relative z-10">
              በሁሉም ኮርሶች ላይ
            </span>
          </div>

          {/* Stat 3 */}
          <div className="bg-[#0f172a]/60 backdrop-blur-md border border-white/5 hover:border-amber-500/30 transition-colors rounded-3xl p-6 space-y-3 shadow-xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 text-amber-500/10 group-hover:text-amber-500/20 transition-colors">
              <BookOpen className="w-24 h-24" />
            </div>
            <span className="text-xs font-medium text-gray-400 relative z-10">የተለቀቁ ኮርሶች</span>
            <div className="text-3xl font-black text-amber-400 relative z-10 tracking-tight">{courses.length}</div>
            <span className="text-[10px] font-bold text-gray-400 bg-white/5 px-2 py-1 rounded-md w-max relative z-10">
              በእይኦስ አካደሚ
            </span>
          </div>

          {/* Stat 4 */}
          <div className="bg-[#0f172a]/60 backdrop-blur-md border border-white/5 hover:border-purple-500/30 transition-colors rounded-3xl p-6 space-y-3 shadow-xl relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 text-purple-500/10 group-hover:text-purple-500/20 transition-colors">
              <Clock className="w-24 h-24" />
            </div>
            <span className="text-xs font-medium text-gray-400 relative z-10">የሚጠበቁ ማረጋገጫዎች</span>
            <div className="text-3xl font-black text-purple-400 relative z-10 tracking-tight">{ADMIN_STATS.pendingApprovals}</div>
            <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-1 rounded-md w-max relative z-10">
              የክፍያ ማረጋገጫዎች
            </span>
          </div>
        </div>

        {/* Main Content: Course Management & Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Active Courses List */}
          <div className="lg:col-span-2 bg-[#0f172a]/60 backdrop-blur-md border border-white/5 rounded-3xl p-6 shadow-xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-400" /> የኮርሶች አስተዳደር (Inventory)
              </h3>
              <span className="text-[10px] font-bold bg-white/10 px-3 py-1 rounded-full">ጠቅላላ፡ {courses.length}</span>
            </div>

            <div className="divide-y divide-white/5">
              {courses.map((course) => (
                <div key={course.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/[0.02] px-2 rounded-xl transition-colors">
                  <div className="space-y-1.5 truncate">
                    <h4 className="text-sm font-bold text-white truncate">{course.title}</h4>
                    <div className="flex items-center gap-3 text-[10px] font-medium text-gray-400">
                      <span className="bg-gray-800/80 px-2.5 py-1 rounded-md text-indigo-300">{course.category}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {course.students} ተማሪዎች</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-5 shrink-0">
                    <span className="text-sm font-black text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                      {course.price} ETB
                    </span>
                    <button className="text-gray-400 hover:text-white p-2 bg-gray-800/50 hover:bg-indigo-600 rounded-xl transition-colors">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Live Transactions */}
          <div className="bg-[#0f172a]/60 backdrop-blur-md border border-white/5 rounded-3xl p-6 shadow-xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                <Wallet className="w-5 h-5 text-emerald-400" /> የቅርብ ክፍያዎች
              </h3>
              <span className="text-[9px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full animate-pulse">
                Live
              </span>
            </div>

            <div className="space-y-4">
              {RECENT_TRANSACTIONS.map((tx) => (
                <div key={tx.id} className="p-4 bg-gray-900/40 rounded-2xl border border-white/5 hover:border-white/10 transition-colors space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-white">
                    <span className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                        {tx.student.charAt(0)}
                      </div>
                      {tx.student}
                    </span>
                    <span className="text-emerald-400 text-sm font-black">+{tx.amount} ETB</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-gray-400 font-medium pl-8">
                    <span className="truncate max-w-[120px]">{tx.course}</span>
                    <span className="flex items-center gap-1 text-sky-400 bg-sky-400/10 px-2 py-0.5 rounded">
                      <CreditCard className="w-3 h-3" /> {tx.method}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* --- ADD COURSE MODAL --- */}
      {isAddCourseModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#050b14]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border border-white/10 rounded-[2rem] max-w-lg w-full p-8 shadow-2xl relative animate-in zoom-in-95 fade-in duration-200">
            
            <button
              onClick={() => setIsAddCourseModalOpen(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white bg-gray-800/50 hover:bg-rose-500/20 p-2 rounded-full transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <h3 className="text-xl font-black text-white mb-1">አዲስ ኮርስ መፍጠሪያ</h3>
              <p className="text-xs text-gray-400 font-medium">የአዲሱን ኮርስ ዝርዝር መረጃዎች እዚህ ያስገቡ</p>
            </div>

            <form onSubmit={handleAddCourse} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs text-gray-300 font-bold uppercase tracking-wide">የኮርሱ ርዕስ (Course Title)</label>
                <input
                  type="text"
                  required
                  placeholder="እ.ኤ.አ. Advanced Web Development"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#050b14]/50 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-gray-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs text-gray-300 font-bold uppercase tracking-wide">ካቴጎሪ (Category)</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-[#050b14]/50 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none"
                  >
                    <option value="Mobile Dev">Mobile Dev</option>
                    <option value="AI Tech">AI Tech</option>
                    <option value="Aviation">Aviation</option>
                    <option value="Web Development">Web Development</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs text-gray-300 font-bold uppercase tracking-wide">ዋጋ (Price in ETB)</label>
                  <input
                    type="number"
                    required
                    placeholder="1500"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full bg-[#050b14]/50 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] mt-4 active:scale-95 flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" /> ኮርሱን መዝግብ እና አሳትም
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}

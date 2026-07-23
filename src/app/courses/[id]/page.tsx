/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// --- Types ---
interface Lesson {
  id: string;
  title: string;
  duration: string;
  isFreePreview: boolean;
}

interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface CourseDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  category: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  duration: string;
  lessonsCount: number;
  difficulty: string;
  language: string;
  instructor: {
    name: string;
    title: string;
    avatar: string;
  };
  chapters: Chapter[];
}

// --- Mock Single Course Data ---
const COURSE_DATA: CourseDetail = {
  id: "flutter-mobile-mastery",
  title: "Full-Stack Flutter & Supabase Mobile App Development",
  subtitle: "ከስልክህ ላይ ሆነህ ፕሮፌሽናል ሞባይል አፕሊኬሽኖችን መገንባት ተማር",
  description: "በአንድ ስማርት ስልክ ብቻ Flutter እና Supabaseን በመጠቀም የራስህን አፕሊኬሽኖች ገንብተህ Vercel እና App Stores ላይ የመልቀቅ ሙሉ ሂደት። ይህ ኮርስ ከጀማሪ እስከ ከፍተኛ ደረጃ ያሉ የፕሮግራሚንግ ፅንሰ ሀሳቦችን በምሳሌ ያስረዳል።",
  thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200&auto=format&fit=crop",
  category: "Mobile Development",
  price: 1500,
  discountPrice: 999,
  rating: 4.9,
  reviewsCount: 128,
  studentsCount: 1420,
  duration: "18h 30m",
  lessonsCount: 42,
  difficulty: "Intermediate",
  language: "አማርኛ / English",
  instructor: {
    name: "Eyob Asefa",
    title: "Senior Full-Stack Developer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
  },
  chapters: [
    {
      id: "ch-1",
      title: "ክፍል 1: መግቢያ እና የዴቨሎፕመንት አካባቢ ማዘጋጀት",
      lessons: [
        { id: "l-1", title: "1.1 የኮርሱ መግቢያ እና የምንሰራቸው ፕሮጀክቶች", duration: "08:15", isFreePreview: true },
        { id: "l-2", title: "1.2 Flutter እና Dart በሞባይል ላይ መጫን", duration: "14:20", isFreePreview: true },
        { id: "l-3", title: "1.3 የፕሮጀክት መዋቅር እና የመጀመሪያው App", duration: "18:45", isFreePreview: false }
      ]
    },
    {
      id: "ch-2",
      title: "ክፍል 2: Supabase Database Integration",
      lessons: [
        { id: "l-4", title: "2.1 Supabase Project መፍጠር እና Schema ዲዛይን", duration: "22:10", isFreePreview: false },
        { id: "l-5", title: "2.2 Authentication እና User Profiles አሰራር", duration: "25:00", isFreePreview: false },
        { id: "l-6", title: "2.3 Realtime Data Fetching & State Management", duration: "30:15", isFreePreview: false }
      ]
    }
  ]
};

export default function CourseDetailPage() {
  const params = useParams();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"telebirr" | "chapa" | "card">("telebirr");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // mock current active course
  const course = COURSE_DATA; 

  const handlePaymentSubmit = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-4 sm:p-8 pb-32">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Back Link */}
        <Link href="/courses" className="text-xs text-indigo-400 hover:underline inline-flex items-center gap-1">
          ← ወደ ኮርሶች ዝርዝር ተመለስ
        </Link>

        {/* Hero Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info (Left 2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="inline-block bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold px-3 py-1 rounded-full">
              {course.category}
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              {course.title}
            </h1>

            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {course.subtitle}
            </p>

            {/* Meta Stats */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 border-y border-gray-800 py-3">
              <span className="flex items-center gap-1 text-amber-400 font-bold">
                ★ {course.rating} ({course.reviewsCount} አስተያየቶች)
              </span>
              <span>👥 {course.studentsCount} ተማሪዎች</span>
              <span>⏱️ {course.duration}</span>
              <span>🌐 {course.language}</span>
            </div>

            {/* Instructor Card */}
            <div className="flex items-center gap-4 bg-[#161B26] p-4 rounded-2xl border border-gray-800">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-12 h-12 rounded-full object-cover border border-indigo-500/40"
              />
              <div>
                <h4 className="text-sm font-bold text-white">{course.instructor.name}</h4>
                <p className="text-xs text-gray-400">{course.instructor.title}</p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3 pt-4">
              <h3 className="text-lg font-bold text-white">ስለ ኮርሱ ማብራሪያ</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                {course.description}
              </p>
            </div>
          </div>

          {/* Pricing Card & Checkout CTA (Right Column) */}
          <div className="lg:col-span-1">
            <div className="bg-[#161B26] border border-gray-800 rounded-3xl p-6 sticky top-8 space-y-6 shadow-2xl">
              
              {/* Preview Image */}
              <div className="relative rounded-2xl overflow-hidden h-44 bg-gray-900 border border-gray-800">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-12 h-12 bg-indigo-600/90 rounded-full flex items-center justify-center text-white shadow-lg">
                    ▶
                  </div>
                </div>
              </div>

              {/* Price Tag */}
              <div className="space-y-1">
                <div className="text-xs text-gray-400">ሙሉ የኮርሱ ዋጋ፡</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-emerald-400">{course.discountPrice || course.price} ETB</span>
                  {course.discountPrice && (
                    <span className="text-sm text-gray-500 line-through">{course.price} ETB</span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <button
                onClick={() => setIsPaymentModalOpen(true)}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-600 hover:to-indigo-700 text-white font-extrabold rounded-xl transition-all shadow-lg shadow-indigo-600/25 text-sm"
              >
                አሁኑኑ ይግዙ (Enroll Now)
              </button>

              <div className="text-center text-[11px] text-gray-500 space-y-1">
                <p>✓ የዕድሜ ልክ የመጠቀም መብት (Lifetime Access)</p>
                <p>✓ የብቃት ማረጋገጫ ሰርተፊኬት ያካትታል</p>
              </div>

            </div>
          </div>

        </div>

        {/* Curriculum Section */}
        <div className="pt-8 border-t border-gray-800 space-y-4">
          <h2 className="text-xl font-bold text-white">የኮርሱ ይዘቶች (Curriculum)</h2>

          <div className="space-y-4">
            {course.chapters.map((chapter) => (
              <div key={chapter.id} className="bg-[#161B26] border border-gray-800 rounded-2xl overflow-hidden">
                <div className="p-4 bg-gray-800/40 font-semibold text-sm text-indigo-300 border-b border-gray-800">
                  {chapter.title}
                </div>
                <div className="divide-y divide-gray-800/60">
                  {chapter.lessons.map((lesson) => (
                    <div key={lesson.id} className="p-4 flex items-center justify-between hover:bg-gray-800/20 transition-colors">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">▶</span>
                        <span className="text-xs sm:text-sm text-gray-200">{lesson.title}</span>
                        {lesson.isFreePreview && (
                          <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                            ነፃ ቅምሻ
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">{lesson.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* --- PAYMENT MODAL --- */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161B26] border border-gray-800 rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            
            {/* Close Modal */}
            <button
              onClick={() => { setIsPaymentModalOpen(false); setPaymentSuccess(false); }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg"
            >
              ✕
            </button>

            {!paymentSuccess ? (
              <>
                <div>
                  <h3 className="text-xl font-bold text-white">ክፍያ ፈፅም (Checkout)</h3>
                  <p className="text-xs text-gray-400 mt-1">
                    ለመማር የፈለጉት ኮርስ፡ <span className="text-indigo-400 font-semibold">{course.title}</span>
                  </p>
                </div>

                {/* Amount */}
                <div className="bg-gray-900/80 p-4 rounded-xl border border-gray-800 flex justify-between items-center">
                  <span className="text-xs text-gray-400">የሚከፈለው መጠን፡</span>
                  <span className="text-xl font-extrabold text-emerald-400">{course.discountPrice || course.price} ETB</span>
                </div>

                {/* Payment Methods */}
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-gray-300">የክፍያ መንገድ ይምረጡ፡</label>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setSelectedPaymentMethod("telebirr")}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                        selectedPaymentMethod === "telebirr"
                          ? "bg-sky-500/20 border-sky-500 text-sky-400"
                          : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700"
                      }`}
                    >
                      📱 Telebirr
                    </button>

                    <button
                      onClick={() => setSelectedPaymentMethod("chapa")}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                        selectedPaymentMethod === "chapa"
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                          : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700"
                      }`}
                    >
                      🟢 Chapa
                    </button>

                    <button
                      onClick={() => setSelectedPaymentMethod("card")}
                      className={`p-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                        selectedPaymentMethod === "card"
                          ? "bg-purple-500/20 border-purple-500 text-purple-400"
                          : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700"
                      }`}
                    >
                      💳 Card / Visa
                    </button>
                  </div>
                </div>

                {/* Pay Action Button */}
                <button
                  onClick={handlePaymentSubmit}
                  disabled={isProcessing}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-xl text-sm transition-all shadow-lg shadow-indigo-600/30 flex justify-center items-center gap-2"
                >
                  {isProcessing ? (
                    <span className="animate-pulse">ክፍያው በመከናወን ላይ ነው...</span>
                  ) : (
                    `በ ${selectedPaymentMethod.toUpperCase()} ክፈል`
                  )}
                </button>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-3xl mx-auto border border-emerald-500/40">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-white">ክፍያው በተሳካ ሁኔታ ተጠናቋል!</h3>
                <p className="text-xs text-gray-400">
                  እንኳን ወደ ኮርሱ በደህና መጡ! አሁን ትምህርቱን መከታተል መጀመር ይችላሉ።
                </p>
                <button
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all"
                >
                  ወደ ትምህርቱ ሂድ (Start Learning)
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

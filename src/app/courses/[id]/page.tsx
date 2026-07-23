/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  PlayCircle, CheckCircle, ChevronDown, ChevronUp, 
  Star, Clock, Users, ShieldCheck, MonitorPlay, Smartphone, Infinity 
} from "lucide-react";

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
  whatYouWillLearn: string[];
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

// --- Dynamic Courses Database (EyOS Academy Premium Data) ---
const COURSES_DB: Record<string, CourseDetail> = {
  "flutter-mobile-mastery": {
    id: "flutter-mobile-mastery",
    title: "Full-Stack Flutter & Supabase Mobile App Development",
    subtitle: "ከስልክህ ላይ ሆነህ ፕሮፌሽናል ሞባይል አፕሊኬሽኖችን መገንባት ተማር",
    description: "በአንድ ስማርት ስልክ ብቻ Flutter እና Supabaseን በመጠቀም የራስህን አፕሊኬሽኖች ገንብተህ Vercel እና App Stores ላይ የመልቀቅ ሙሉ ሂደት። ይህ ኮርስ ከጀማሪ እስከ ከፍተኛ ደረጃ ያሉ የፕሮግራሚንግ ፅንሰ ሀሳቦችን በምሳሌ ያስረዳል።",
    whatYouWillLearn: [
      "የ Flutter መሰረታዊ እና የላቁ ፅንሰ ሀሳቦችን በስፋት መረዳት",
      "Supabase Database በመጠቀም የ Backend ሲስተም ማዋቀር",
      "ያለ ኮምፒውተር በስልክ ብቻ ኮድ መፃፍ እና ቴስት ማድረግ",
      "የተጠቃሚ መረጃዎችን ደህንነቱ በተጠበቀ ሁኔታ ማስተዳደር"
    ],
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
      avatar: "https://ui-avatars.com/api/?name=Eyob+Asefa&background=4F46E5&color=fff"
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
  },
  "ai-video-editing": {
    id: "ai-video-editing",
    title: "Advanced AI Video Editing & Prompt Engineering",
    subtitle: "የ 'Fidel AI' ቴክኖሎጂን በመጠቀም በ AI የታገዘ ከፍተኛ ጥራት ያለው የቪዲዮ ኤዲቲንግ ጥበብ።",
    description: "በዘመናዊው የ AI ቴክኖሎጂ ቪዲዮዎችን እንዴት ኤዲት ማድረግ፣ አኒሜሽኖችን መፍጠር እና የ Prompt Engineering ሚስጥሮችን መጠቀም እንደሚችሉ የሚማሩበት የተሟላ ኮርስ።",
    whatYouWillLearn: [
      "ውስብስብ የ AI Prompts አፃፃፍ ቴክኒኮች (Prompt Engineering)",
      "ከፅሁፍ ወደ ቪዲዮ (Text-to-Video) የመቀየር ጥበብ",
      "የቪዲዮ ጥራት እና ቀለማትን በ AI ማስተካከል",
      "የራስዎን የ AI ቪዲዮ ኤዲቲንግ ዎርክፍሎው መፍጠር"
    ],
    thumbnail: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1200&auto=format&fit=crop",
    category: "Artificial Intelligence",
    price: 1200,
    discountPrice: 799,
    rating: 4.8,
    reviewsCount: 85,
    studentsCount: 890,
    duration: "12h 45m",
    lessonsCount: 30,
    difficulty: "Advanced",
    language: "አማርኛ / English",
    instructor: {
      name: "Eyob Asefa",
      title: "AI Prompt Engineer",
      avatar: "https://ui-avatars.com/api/?name=Eyob+Asefa&background=8B5CF6&color=fff"
    },
    chapters: [
      {
        id: "ch-1",
        title: "ክፍል 1: የ Prompt Engineering መግቢያ",
        lessons: [
          { id: "l-1", title: "1.1 AI እንዴት ያስባል? የቃላት አደራደር", duration: "10:15", isFreePreview: true },
          { id: "l-2", title: "1.2 Midjourney እና RunwayML መግቢያ", duration: "15:30", isFreePreview: true }
        ]
      }
    ]
  }
};

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  // Dynamic Route Handling (Fallback to flutter course if ID not found)
  const courseId = params.id as string;
  const course = COURSES_DB[courseId] || COURSES_DB["flutter-mobile-mastery"];

  // States
  const [activeChapter, setActiveChapter] = useState<string | null>(course.chapters[0]?.id || null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<"telebirr" | "chapa" | "card">("telebirr");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const toggleChapter = (id: string) => {
    setActiveChapter(activeChapter === id ? null : id);
  };

  const handlePaymentSubmit = () => {
    setIsProcessing(true);
    // Simulate Payment API Call
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  const handleStartLearning = () => {
    setIsPaymentModalOpen(false);
    // 🌟 Smart Routing: ቀጥታ ወደ መማሪያ ክፍሉ ይወስዳል
    router.push(`/courses/${course.id}/learn`);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-white pb-32 font-sans">
      
      {/* 🌟 PREMIUM HERO BANNER */}
      <div className="bg-gradient-to-b from-[#0f172a] to-[#090d16] border-b border-gray-800/60 pt-24 pb-12 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <Link href="/courses" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors inline-flex items-center gap-1">
            ← ወደ ኮርሶች ዝርዝር ተመለስ
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2 space-y-6">
              <div className="inline-block bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold px-3 py-1 rounded-full">
                {course.category}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                {course.title}
              </h1>

              <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
                {course.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-medium border-y border-gray-800/80 py-4">
                <span className="flex items-center gap-1.5 text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                  <Star className="w-4 h-4 fill-current" /> {course.rating} ({course.reviewsCount} Reviews)
                </span>
                <span className="flex items-center gap-1.5 text-gray-300">
                  <Users className="w-4 h-4 text-indigo-400" /> {course.studentsCount.toLocaleString()} ተማሪዎች
                </span>
                <span className="flex items-center gap-1.5 text-gray-300">
                  <Clock className="w-4 h-4 text-indigo-400" /> {course.duration}
                </span>
              </div>

              <div className="flex items-center gap-4 pt-2">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-indigo-500/40"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{course.instructor.name}</h4>
                  <p className="text-xs text-gray-400">{course.instructor.title}</p>
                </div>
              </div>
            </div>

            {/* Right Video Cover (Mobile Hidden, Desktop Shows Here) */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-gray-900 border border-gray-700/50 shadow-2xl shadow-indigo-900/20 group cursor-pointer">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-16 h-16 bg-indigo-600/90 rounded-full flex items-center justify-center text-white shadow-xl shadow-indigo-600/40 backdrop-blur-sm border border-indigo-400/30 group-hover:scale-110 transition-transform">
                    <PlayCircle className="w-8 h-8 ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 to-transparent p-4 text-center">
                  <p className="text-xs font-bold text-white">Preview Course</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🌟 MAIN CONTENT & PRICING */}
      <div className="max-w-6xl mx-auto p-4 sm:p-8 grid grid-cols-1 lg:grid-cols-3 gap-10 relative">
        
        {/* Left Column (Details & Curriculum) */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* What You Will Learn Grid */}
          <div className="bg-[#101724] border border-gray-800/80 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-white mb-6">ከዚህ ኮርስ ምን ይማራሉ?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {course.whatYouWillLearn.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-300 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white">ስለ ኮርሱ ማብራሪያ</h2>
            <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
              {course.description}
            </p>
          </div>

          {/* Interactive Curriculum Accordion */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">የኮርሱ ይዘቶች (Syllabus)</h2>
              <span className="text-xs text-gray-400">{course.lessonsCount} ትምህርቶች • {course.duration}</span>
            </div>

            <div className="border border-gray-800/80 rounded-2xl overflow-hidden bg-[#101724]">
              {course.chapters.map((chapter) => (
                <div key={chapter.id} className="border-b border-gray-800/60 last:border-0">
                  <button 
                    onClick={() => toggleChapter(chapter.id)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 hover:bg-gray-800/40 transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      {activeChapter === chapter.id ? <ChevronUp className="w-5 h-5 text-indigo-400" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                      <span className="text-sm sm:text-base font-bold text-gray-200">{chapter.title}</span>
                    </div>
                    <span className="text-xs text-gray-400 hidden sm:block">{chapter.lessons.length} Lessons</span>
                  </button>
                  
                  {activeChapter === chapter.id && (
                    <div className="bg-[#0b0f19] px-4 py-2 sm:px-12 space-y-1">
                      {chapter.lessons.map((lesson) => (
                        <div key={lesson.id} className="flex items-center justify-between p-3 hover:bg-gray-800/30 rounded-xl transition-colors group">
                          <div className="flex items-center gap-3">
                            <PlayCircle className="w-4 h-4 text-gray-500 group-hover:text-indigo-400 transition-colors" />
                            <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{lesson.title}</span>
                            {lesson.isFreePreview && (
                              <span className="hidden sm:inline-block text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded ml-2">
                                ነፃ ቅምሻ
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">{lesson.duration}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (Sticky Pricing Card) */}
        <div className="lg:col-span-1">
          <div className="bg-[#101724] border border-gray-700/60 rounded-3xl p-6 sticky top-24 space-y-6 shadow-2xl shadow-black/50">
            
            {/* Mobile Video Cover (Only shows on mobile) */}
            <div className="lg:hidden relative rounded-2xl overflow-hidden aspect-video bg-gray-900 border border-gray-800 mb-6">
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayCircle className="w-12 h-12 text-white/90 drop-shadow-lg" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-emerald-400 font-semibold mb-2">★ የቅናሽ ጊዜ የተወሰነ ነው</div>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-black text-white">{course.discountPrice || course.price} ETB</span>
                {course.discountPrice && (
                  <span className="text-lg text-gray-500 line-through mb-1">{course.price} ETB</span>
                )}
              </div>
            </div>

            <button
              onClick={() => setIsPaymentModalOpen(true)}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-600/30 active:scale-95 text-sm"
            >
              አሁኑኑ ይመዝገቡ (Enroll Now)
            </button>

            <div className="pt-6 border-t border-gray-800/80 space-y-3">
              <h3 className="text-sm font-bold text-white mb-4">ይህ ኮርስ የሚያካትታቸው፡</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-xs text-gray-300">
                  <MonitorPlay className="w-4 h-4 text-indigo-400" /> {course.duration} የቪዲዮ ትምህርት
                </li>
                <li className="flex items-center gap-3 text-xs text-gray-300">
                  <Smartphone className="w-4 h-4 text-indigo-400" /> በስልክ እና በኮምፒውተር ይሰራል
                </li>
                <li className="flex items-center gap-3 text-xs text-gray-300">
                  <Infinity className="w-4 h-4 text-indigo-400" /> የዕድሜ ልክ አክሰስ (Lifetime Access)
                </li>
                <li className="flex items-center gap-3 text-xs text-gray-300">
                  <ShieldCheck className="w-4 h-4 text-indigo-400" /> የብቃት ማረጋገጫ ሰርተፊኬት
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>

      {/* 💳 PAYMENT MODAL (Your Logic Intact, Styled Premium) */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161B26] border border-gray-700/80 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
            
            <button
              onClick={() => { setIsPaymentModalOpen(false); setPaymentSuccess(false); }}
              className="absolute top-5 right-5 text-gray-400 hover:text-white bg-gray-800/50 rounded-full p-1 transition-colors"
            >
              ✕
            </button>

            {!paymentSuccess ? (
              <>
                <div>
                  <h3 className="text-xl font-bold text-white">ክፍያ ፈፅም (Checkout)</h3>
                  <p className="text-sm text-gray-400 mt-2">
                    <span className="text-indigo-400 font-semibold">{course.title}</span>
                  </p>
                </div>

                <div className="bg-[#0b0f19] p-5 rounded-2xl border border-gray-800 flex justify-between items-center shadow-inner">
                  <span className="text-sm font-medium text-gray-400">የሚከፈለው መጠን፡</span>
                  <span className="text-2xl font-black text-emerald-400">{course.discountPrice || course.price} ETB</span>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-gray-300">የክፍያ መንገድ ይምረጡ፡</label>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setSelectedPaymentMethod("telebirr")}
                      className={`p-3 rounded-xl border-2 text-xs font-bold transition-all flex flex-col items-center gap-2 ${
                        selectedPaymentMethod === "telebirr"
                          ? "bg-sky-500/10 border-sky-500 text-sky-400 shadow-lg shadow-sky-500/20"
                          : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700"
                      }`}
                    >
                      <Smartphone className="w-5 h-5" /> Telebirr
                    </button>

                    <button
                      onClick={() => setSelectedPaymentMethod("chapa")}
                      className={`p-3 rounded-xl border-2 text-xs font-bold transition-all flex flex-col items-center gap-2 ${
                        selectedPaymentMethod === "chapa"
                          ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-500/20"
                          : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700"
                      }`}
                    >
                      <ShieldCheck className="w-5 h-5" /> Chapa
                    </button>

                    <button
                      onClick={() => setSelectedPaymentMethod("card")}
                      className={`p-3 rounded-xl border-2 text-xs font-bold transition-all flex flex-col items-center gap-2 ${
                        selectedPaymentMethod === "card"
                          ? "bg-purple-500/10 border-purple-500 text-purple-400 shadow-lg shadow-purple-500/20"
                          : "bg-gray-900 border-gray-800 text-gray-400 hover:border-gray-700"
                      }`}
                    >
                      <MonitorPlay className="w-5 h-5" /> Card
                    </button>
                  </div>
                </div>

                <button
                  onClick={handlePaymentSubmit}
                  disabled={isProcessing}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-indigo-600/30 flex justify-center items-center gap-2 disabled:opacity-70"
                >
                  {isProcessing ? (
                    <span className="animate-pulse">ክፍያው በመከናወን ላይ ነው...</span>
                  ) : (
                    `በ ${selectedPaymentMethod.toUpperCase()} ክፈል`
                  )}
                </button>
              </>
            ) : (
              <div className="text-center py-8 space-y-5 animate-in slide-in-from-bottom-4">
                <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-500/30">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">እንኳን ደስ አሎት! 🎉</h3>
                  <p className="text-sm text-gray-400 leading-relaxed px-4">
                    ክፍያው በተሳካ ሁኔታ ተጠናቋል። አሁን ትምህርቱን መከታተል መጀመር ይችላሉ።
                  </p>
                </div>
                <button
                  onClick={handleStartLearning}
                  className="w-full py-4 mt-4 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-emerald-600/30"
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

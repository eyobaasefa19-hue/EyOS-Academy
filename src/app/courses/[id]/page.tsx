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
  // 1. MOBILE DEVELOPMENT COURSE
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

  // 2. ARTIFICIAL INTELLIGENCE & PROMPT ENGINEERING
  "ai-prompt-engineering": {
    id: "ai-prompt-engineering",
    title: "Advanced Prompt Engineering & AI Automation",
    subtitle: "የ AI ኤጀንቶች እና Prompt Engineering ጥበብን በመማር በየዕለቱ የምትሰራቸውን ስራዎች አውቶሜት አድርግ",
    description: "በዚህ ኮርስ ውስጥ የ System Prompts፣ Chain-of-Thought እና Few-Shot Prompting የላቁ ስልቶችን በመማር ከ AI ሞዴሎች ከፍተኛ ጥራት ያለው ውጤት ማግኘት ትችላለህ። በተጨማሪም OpenAI APIs እና Supabaseን በማገናኘት ብጁ የ AI አውቶሜሽን አፕሊኬሽኖችን መገንባት ታጠናለህ።",
    whatYouWillLearn: [
      "የ System Prompts፣ Chain-of-Thought እና Few-Shot Prompting የላቁ ስልቶች",
      "በ AI Image & Video Generators (Midjourney, Sora, Runway) ከፍተኛ ጥራት ያላቸውን አሴቶች መፍጠር",
      "LLM APIs (OpenAI, Claude) ከትግበራዎች ጋር ማገናኘት እና አውቶሜሽን መገንባት",
      "ብጁ AI Video/Media Processing Workflows መፍጠር"
    ],
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200&auto=format&fit=crop",
    category: "Artificial Intelligence",
    price: 1200,
    discountPrice: 799,
    rating: 4.8,
    reviewsCount: 94,
    studentsCount: 890,
    duration: "12h 15m",
    lessonsCount: 28,
    difficulty: "All Levels",
    language: "አማርኛ / English",
    instructor: {
      name: "Sami Tech",
      title: "AI Researcher & Prompt Engineer",
      avatar: "https://ui-avatars.com/api/?name=Sami+Tech&background=8B5CF6&color=fff"
    },
    chapters: [
      {
        id: "ai-ch-1",
        title: "ክፍል 1: የመሰረታዊ እና የላቀ Prompt Architecture",
        lessons: [
          { id: "ai-l-1", title: "1.1 የ AI Prompts አወቃቀር እና System Instructions", duration: "12:30", isFreePreview: true },
          { id: "ai-l-2", title: "1.2 Few-Shot & Chain-of-Thought Prompting", duration: "18:20", isFreePreview: true },
          { id: "ai-l-3", title: "1.3 Multi-Modal AI (Text, Vision, Audio) መመሪያዎች", duration: "15:45", isFreePreview: false }
        ]
      },
      {
        id: "ai-ch-2",
        title: "ክፍል 2: AI Media & Video Generation Workflows",
        lessons: [
          { id: "ai-l-4", title: "2.1 Midjourney & RunwayML የቪዲዮ አኒሜሽን ጥበብ", duration: "20:15", isFreePreview: false },
          { id: "ai-l-5", title: "2.2 Text-to-Video Prompts እና Frame Rendering Optimization", duration: "24:30", isFreePreview: false }
        ]
      },
      {
        id: "ai-ch-3",
        title: "ክፍል 3: AI Automation & API Integration",
        lessons: [
          { id: "ai-l-6", title: "3.1 OpenAI API እና Supabase Backend ማገናኘት", duration: "25:10", isFreePreview: false },
          { id: "ai-l-7", title: "3.2 AI Automated Content & Video Generation Pipeline", duration: "30:00", isFreePreview: false }
        ]
      }
    ]
  },

  // 3. AVIATION LOGISTICS, CARGO & GROUND OPERATIONS
  "aviation-logistics-pro": {
    id: "aviation-logistics-pro",
    title: "Aviation Logistics, Cargo & Ground Operations",
    subtitle: "የአየር መንገድ የካርጎ አሰራር፣ የ ULD አያያዝ፣ የበረራ ጭነት እና Ground Equipment (GSE) ኦፕሬሽን ጥልቅ ሙያዊ ስልጠና",
    description: "የአየር መንገድ የካርጎ ፍሰት (Cargo Flow)፣ የ Air Waybill (AWB) እና Manifest ሰነዶች አሰራር፣ የ ULDs (AKE, PAG, PMC) አጠቃቀም፣ የአውሮፕላን Weight & Balance፣ Hazardous Materials (HAZMAT) ደንቦች እና የ Ground Support Equipment (GSE) ደህንነቱ የተጠበቀ ኦፕሬሽን ሙሉ በሙሉ የሚያስተምር ሙያዊ ኮርስ።",
    whatYouWillLearn: [
      "የአየር መንገድ Cargo Manifest፣ Air Waybill (AWB) እና Logistics ሰነዶች አሰራር",
      "የ ULD (Unit Load Device) አይነቶች (AKE, PAG, PMC)፣ Contour እና የኮድ አጠራር ህጎች",
      "የአውሮፕላን Weight & Balance፣ Loading Plans እና Trim Sheet አሰራር",
      "የ Hazardous Materials (Dangerous Goods) ህጎች እና NOTOC አዘጋጃጀት",
      "የ Ground Support Equipment (GSE) ደህንነቱ የተጠበቀ ኦፕሬሽን እና Ramp Safety"
    ],
    thumbnail: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200&auto=format&fit=crop",
    category: "Aviation & Logistics",
    price: 2000,
    discountPrice: 1499,
    rating: 5.0,
    reviewsCount: 210,
    studentsCount: 2300,
    duration: "24h 00m",
    lessonsCount: 35,
    difficulty: "Beginner",
    language: "አማርኛ / English",
    instructor: {
      name: "Aviation Academy Team",
      title: "Senior Flight Operations Specialist",
      avatar: "https://ui-avatars.com/api/?name=Aviation+Academy&background=059669&color=fff"
    },
    chapters: [
      {
        id: "av-ch-1",
        title: "ክፍል 1: የኤርፖርት ካርጎ እና Ground Handling መግቢያ",
        lessons: [
          { id: "av-l-1", title: "1.1 የኤርፖርት ግራውንድ ኦፕሬሽን እና የካርጎ ፍሰት (Cargo Flow)", duration: "15:20", isFreePreview: true },
          { id: "av-l-2", title: "1.2 Air Waybill (AWB) እና የካርጎ ማኒፈስት (Cargo Manifest)", duration: "20:40", isFreePreview: true },
          { id: "av-l-3", title: "1.3 Cargo Acceptance and Warehouse Logistics", duration: "18:15", isFreePreview: false }
        ]
      },
      {
        id: "av-ch-2",
        title: "ክፍል 2: ULD Naming, Contours እና Flight Loading Configurations",
        lessons: [
          { id: "av-l-4", title: "2.1 የ ULD አይነቶች (Containers & Pallets: AKE, PAG, PMC)", duration: "24:15", isFreePreview: false },
          { id: "av-l-5", title: "2.2 ULD Identification Code, Contour & Maximum Gross Weight", duration: "22:00", isFreePreview: false },
          { id: "av-l-6", title: "2.3 የአውሮፕላን Weight & Balance እና Loading Configuration", duration: "28:30", isFreePreview: false },
          { id: "av-l-7", title: "2.4 Trim Sheet አሰራር እና የሎድ ፕላን (Loading Plan) ንባብ", duration: "26:40", isFreePreview: false }
        ]
      },
      {
        id: "av-ch-3",
        title: "ክፍል 3: Dangerous Goods (HAZMAT) & NOTOC",
        lessons: [
          { id: "av-l-8", title: "3.1 የ Dangerous Goods Classifications (IATA DGR)", duration: "21:10", isFreePreview: false },
          { id: "av-l-9", title: "3.2 NOTOC (Notice to Captain) ዝግጅት እና የካፕቴን ፈርማ", duration: "19:50", isFreePreview: false }
        ]
      },
      {
        id: "av-ch-4",
        title: "ክፍል 4: Ground Support Equipment (GSE) & Ramp Safety",
        lessons: [
          { id: "av-l-10", title: "4.1 የ GSE መሳሪያዎች (High Loaders, Tug Tractors, Belt Loaders) ኦፕሬሽን", duration: "25:00", isFreePreview: false },
          { id: "av-l-11", title: "4.2 የ Ramp Safety ደንቦች እና Aircraft Safety Zone", duration: "19:45", isFreePreview: false },
          { id: "av-l-12", title: "4.3 FOD (Foreign Object Debris) Prevention and Aircraft Arrival/Departure", duration: "23:10", isFreePreview: false }
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

            {/* Right Video Cover */}
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
            
            {/* Mobile Video Cover */}
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

      {/* 💳 PAYMENT MODAL */}
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

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";

// --- TYPES (ለብቻው ፋይል እንዳይፈልግ እዚሁ አካትተነዋል) ---
export type DifficultyLevel = "Beginner" | "Intermediate" | "Advanced" | "All Levels";

export interface Instructor {
  id: string;
  name: string;
  title: string;
  avatar: string;
}

export interface Course {
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
  difficulty: DifficultyLevel;
  language: string;
  instructor: Instructor;
  isFeatured?: boolean;
  isTrending?: boolean;
}

// ሞክ ኮርሶች (Mock Course Data)
const MOCK_COURSES: Course[] = [
  {
    id: "flutter-mobile-mastery",
    title: "Full-Stack Flutter & Supabase Mobile App Development",
    subtitle: "ከስልክህ ላይ ሆነህ ፕሮፌሽናል ሞባይል አፕሊኬሽኖችን መገንባት ተማር",
    description: "በአንድ ስማርት ስልክ ብቻ Flutter እና Supabaseን በመጠቀም የራስህን አፕሊኬሽኖች ገንብተህ Vercel እና Stores ላይ የመልቀቅ ሙሉ ሂደት።",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
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
      id: "inst-1",
      name: "Eyob Asefa",
      title: "Senior Full-Stack Developer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
    },
    isFeatured: true,
    isTrending: true
  },
  {
    id: "ai-prompt-engineering",
    title: "Advanced Prompt Engineering & AI Automation",
    subtitle: "የ AI ሌቨልህን ወደ ላቀ ደረጃ በማሳደግ በየቀኑ የምትሰራቸውን ስራዎች አውቶሜት አድርግ",
    description: "ተወሳስበው የተቀመጡ የ AI መመሪያዎችን (Prompts) በመፃፍ የቪዲዮ፣ የኢሜጅ እና የኮዲንግ ስራዎችን በፍጥነት ማጠናቀቂያ ዘዴዎች።",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=800&auto=format&fit=crop",
    category: "Artificial Intelligence",
    price: 1200,
    discountPrice: 799,
    rating: 4.8,
    reviewsCount: 94,
    studentsCount: 890,
    duration: "12h 15m",
    lessonsCount: 28,
    difficulty: "All Levels",
    language: "አማርኛ",
    instructor: {
      id: "inst-2",
      name: "Sami Tech",
      title: "AI Researcher & Prompt Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    },
    isFeatured: true
  },
  {
    id: "aviation-logistics-pro",
    title: "Aviation Logistics, Cargo & Ground Operations",
    subtitle: "የአየር መንገድ የካርጎ እና የምድር ላይ ኦፕሬሽኖች አሰራር ሙሉ ኮርስ",
    description: "የካርጎ ማኒፌስት፣ ULD አጠቃቀም፣ የበረራ ደህንነት እና የመሬት ላይ ድጋፍ መስጫ መሳሪያዎች አሰራርን በዝርዝር የሚያብራራ ትምህርት።",
    thumbnail: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop",
    category: "Aviation & Logistics",
    price: 2000,
    discountPrice: 1499,
    rating: 5.0,
    reviewsCount: 210,
    studentsCount: 2300,
    duration: "24h 00m",
    lessonsCount: 56,
    difficulty: "Beginner",
    language: "አማርኛ / English",
    instructor: {
      id: "inst-3",
      name: "Aviation Academy Team",
      title: "Senior Flight Operations Specialist",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
    }
  }
];

const CATEGORIES = ["All", "Mobile Development", "Artificial Intelligence", "Aviation & Logistics", "Web Tech"];

export default function CourseCatalogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredCourses = MOCK_COURSES.filter((course) => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-4 sm:p-8 pb-32">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header & Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
          <div>
            <Link href="/dashboard" className="text-xs text-indigo-400 hover:underline mb-2 inline-block">
              ← ወደ ዳሽቦርድ ተመለስ
            </Link>
            <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-emerald-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              EyOS Premium Academy
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              ሙያዎን የሚያሳድጉበት የቪዲዮ ኮርሶች፣ የተግባር ፕሮጀክቶች እና የብቃት ማረጋገጫ ሰርተፊኬቶች።
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="ኮርሶችን እዚህ ይፈልጉ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#161B26] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors pl-10"
            />
            <svg className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                  : "bg-[#161B26] text-gray-400 hover:text-white border border-gray-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const isBookmarked = bookmarkedIds.includes(course.id);
            return (
              <div
                key={course.id}
                className="bg-[#161B26]/80 border border-gray-800/80 hover:border-indigo-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 flex flex-col group shadow-xl"
              >
                {/* Thumbnail Header */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-900">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161B26] via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-white/10 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-lg">
                    {course.category}
                  </span>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => toggleBookmark(course.id)}
                    className="absolute top-3 right-3 p-2 bg-black/60 backdrop-blur-md rounded-full text-white hover:text-indigo-400 transition-colors"
                  >
                    <svg
                      className={`w-4 h-4 ${isBookmarked ? "fill-indigo-500 text-indigo-500" : "fill-none stroke-currentColor"}`}
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                    </svg>
                  </button>
                </div>

                {/* Course Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                      <span className="flex items-center gap-1 text-amber-400 font-semibold">
                        ★ {course.rating} <span className="text-gray-500">({course.reviewsCount})</span>
                      </span>
                      <span>{course.difficulty}</span>
                    </div>

                    <h3 className="font-bold text-lg text-white group-hover:text-indigo-400 transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                      {course.subtitle}
                    </p>
                  </div>

                  {/* Stats Meta */}
                  <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-800/80">
                    <span className="flex items-center gap-1">
                      ⏱️ {course.duration}
                    </span>
                    <span>📚 {course.lessonsCount} Lessons</span>
                    <span>👥 {course.studentsCount} Students</span>
                  </div>

                  {/* Instructor & Pricing Footer */}
                  <div className="pt-3 flex items-center justify-between gap-2 border-t border-gray-800/80">
                    <div className="flex items-center gap-2">
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="w-7 h-7 rounded-full object-cover border border-indigo-500/30"
                      />
                      <span className="text-xs text-gray-300 truncate max-w-[90px]">
                        {course.instructor.name}
                      </span>
                    </div>

                    <div className="text-right">
                      {course.discountPrice ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs text-gray-500 line-through">{course.price} ETB</span>
                          <span className="text-sm font-extrabold text-emerald-400">{course.discountPrice} ETB</span>
                        </div>
                      ) : (
                        <span className="text-sm font-extrabold text-white">{course.price} ETB</span>
                      )}
                    </div>
                  </div>

                  {/* Action Link */}
                  <Link
                    href={`/courses/${course.id}`}
                    className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl text-center transition-all block shadow-md shadow-indigo-600/20"
                  >
                    ኮርሱን ይመልከቱ (View Course)
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

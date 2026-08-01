"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// --- Types Fallback & Definitions ---
export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl?: string;
  isFreePreview?: boolean;
  isCompleted?: boolean;
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface CourseLearningData {
  id: string;
  title: string;
  chapters: Chapter[];
}

interface NoteItem {
  id: string;
  text: string;
  timestamp: string;
}

// --- 🌟 Helper Function: Standard & Shorts YouTube URL to Embed Formatter ---
function getYouTubeEmbedUrl(url?: string): string {
  if (!url) return "";
  if (url.includes("embed/")) return url;
  
  // Handles standard watch?v=, Shorts, and shortened youtu.be links
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0`
    : url;
}

// --- 🌟 Dynamic Database Mock for EyOS Academy Courses ---
const COURSES_LEARNING_DB: Record<string, CourseLearningData> = {
  "flutter-mobile-mastery": {
    id: "flutter-mobile-mastery",
    title: "Full-Stack Flutter & Supabase Mobile App Development",
    chapters: [
      {
        id: "ch-1",
        title: "ክፍል 1: መግቢያ እና የዴቨሎፕመንት አካባቢ ማዘጋጀት",
        lessons: [
          { 
            id: "l-1", 
            title: "1.1 የኮርሱ መግቢያ እና የምንሰራቸው ፕሮጀክቶች", 
            duration: "02:15", 
            videoUrl: "https://www.youtube.com/embed/I9ceqw5Ny-4", 
            isFreePreview: true,
            isCompleted: false 
          },
          { 
            id: "l-2", 
            title: "1.2 Flutter እና Dart በሞባይል ላይ መጫን", 
            duration: "14:20", 
            videoUrl: "https://www.youtube.com/embed/1ukSR1GRtMU", 
            isFreePreview: true,
            isCompleted: false 
          },
          { 
            id: "l-3", 
            title: "1.3 የፕሮጀክት መዋቅር እና የመጀመሪያው App", 
            duration: "18:45", 
            videoUrl: "https://www.youtube.com/embed/pTJJsmejUOQ", 
            isFreePreview: false,
            isCompleted: false 
          }
        ]
      },
      {
        id: "ch-2",
        title: "ክፍል 2: Supabase Database Integration",
        lessons: [
          { 
            id: "l-4", 
            title: "2.1 Supabase Project መፍጠር እና Schema ዲዛይን", 
            duration: "02:10", 
            videoUrl: "https://www.youtube.com/embed/WQIjoEYXy0c", 
            isFreePreview: false,
            isCompleted: false 
          },
          { 
            id: "l-5", 
            title: "2.2 Authentication እና User Profiles አሰራር", 
            duration: "25:00", 
            videoUrl: "https://www.youtube.com/embed/ydMqaAGheZA", 
            isFreePreview: false,
            isCompleted: false 
          },
          { 
            id: "l-6", 
            title: "2.3 Realtime Data Fetching & State Management", 
            duration: "30:15", 
            videoUrl: "https://www.youtube.com/embed/7uKQBl9uZ00", 
            isFreePreview: false,
            isCompleted: false 
          }
        ]
      }
    ]
  },
  "aviation-logistics-pro": {
    id: "aviation-logistics-pro",
    title: "Aviation Logistics, Cargo & Ground Operations",
    chapters: [
      {
        id: "av-ch-1",
        title: "ክፍል 1: የኤርፖርት ካርጎ እና Ground Handling መግቢያ",
        lessons: [
          { 
            id: "av-l-1", 
            title: "1.1 የኤርፖርት ግራውንድ ኦፕሬሽን እና የካርጎ ፍሰት (Cargo Flow)", 
            duration: "15:20", 
            videoUrl: "https://www.youtube.com/embed/M4_dE2_fXgQ", 
            isFreePreview: true,
            isCompleted: false 
          },
          { 
            id: "av-l-2", 
            title: "1.2 Air Waybill (AWB) እና የካርጎ ማኒፈስት (Cargo Manifest)", 
            duration: "20:40", 
            videoUrl: "https://www.youtube.com/embed/9Z44ZtE9b2Q", 
            isFreePreview: false,
            isCompleted: false 
          }
        ]
      },
      {
        id: "av-ch-2",
        title: "ክፍል 2: ULD Naming, Contours እና Flight Loading Configurations",
        lessons: [
          { 
            id: "av-l-3", 
            title: "2.1 የ ULD አይነቶች (Containers & Pallets: AKE, PAG, PMC)", 
            duration: "24:15", 
            videoUrl: "https://www.youtube.com/embed/y_b1D3KkR2c", 
            isFreePreview: false,
            isCompleted: false 
          },
          { 
            id: "av-l-4", 
            title: "2.2 የአውሮፕላን Weight & Balance እና Loading Configuration", 
            duration: "28:30", 
            videoUrl: "https://www.youtube.com/embed/6B0n2K_Qz5c", 
            isFreePreview: false,
            isCompleted: false 
          }
        ]
      },
      {
        id: "av-ch-3",
        title: "ክፍል 3: Ground Support Equipment (GSE) & Ramp Safety",
        lessons: [
          { 
            id: "av-l-5", 
            title: "3.1 የ GSE መሳሪያዎች (High Loaders, Tug Tractors) ኦፕሬሽን", 
            duration: "25:00", 
            videoUrl: "https://www.youtube.com/embed/21Zz1A00r0A", 
            isFreePreview: false,
            isCompleted: false 
          }
        ]
      }
    ]
  },
  "ai-prompt-engineering": {
    id: "ai-prompt-engineering",
    title: "Advanced Prompt Engineering & AI Automation",
    chapters: [
      {
        id: "ai-ch-1",
        title: "ክፍል 1: የመሰረታዊ እና የላቀ Prompt Architecture",
        lessons: [
          { 
            id: "ai-l-1", 
            title: "1.1 የ AI Prompts አወቃቀር እና System Instructions", 
            duration: "12:30", 
            videoUrl: "https://www.youtube.com/embed/jC4v5AS4RIM", 
            isFreePreview: true,
            isCompleted: false 
          },
          { 
            id: "ai-l-2", 
            title: "1.2 Few-Shot & Chain-of-Thought Prompting", 
            duration: "18:20", 
            videoUrl: "https://www.youtube.com/embed/_ZvnD733f0U", 
            isFreePreview: false,
            isCompleted: false 
          }
        ]
      },
      {
        id: "ai-ch-2",
        title: "ክፍል 2: AI Media & Video Generation Workflows",
        lessons: [
          { 
            id: "ai-l-3", 
            title: "2.1 Midjourney & RunwayML የቪዲዮ አኒሜሽን ጥበብ", 
            duration: "20:15", 
            videoUrl: "https://www.youtube.com/embed/2vI_J2886wQ", 
            isFreePreview: false,
            isCompleted: false 
          }
        ]
      }
    ]
  }
};

export default function CourseLearningPage() {
  const params = useParams();
  const rawId = params?.id;
  const courseId = typeof rawId === "string" ? rawId : Array.isArray(rawId) ? rawId[0] : "flutter-mobile-mastery";

  const defaultCourse = useMemo(() => {
    return COURSES_LEARNING_DB[courseId] || COURSES_LEARNING_DB["flutter-mobile-mastery"];
  }, [courseId]);

  const [courseData, setCourseData] = useState<CourseLearningData>(defaultCourse);
  const [activeLesson, setActiveLesson] = useState<Lesson>(
    defaultCourse.chapters[0]?.lessons[0] || {
      id: "fallback",
      title: "መግቢያ",
      duration: "00:00",
      videoUrl: "",
      isFreePreview: true,
      isCompleted: false,
    }
  );

  const [activeTab, setActiveTab] = useState<"overview" | "notes" | "resources">("overview");
  const [userNote, setUserNote] = useState("");
  const [savedNotes, setSavedNotes] = useState<NoteItem[]>([]);
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({});
  const [showSidebarMobile, setShowSidebarMobile] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const selectedCourse = COURSES_LEARNING_DB[courseId] || COURSES_LEARNING_DB["flutter-mobile-mastery"];
    
    let completedLessonIds: string[] = [];
    const localProgress = localStorage.getItem(`progress_${courseId}`);
    if (localProgress) {
      try {
        completedLessonIds = JSON.parse(localProgress);
      } catch (e) {
        console.error("Failed to parse local progress", e);
      }
    }

    const updatedChapters = selectedCourse.chapters.map((ch) => ({
      ...ch,
      lessons: ch.lessons.map((l) => ({
        ...l,
        isCompleted: completedLessonIds.includes(l.id),
      })),
    }));

    const updatedCourse = { ...selectedCourse, chapters: updatedChapters };
    setCourseData(updatedCourse);

    if (updatedChapters[0]?.lessons[0]) {
      setActiveLesson(updatedChapters[0].lessons[0]);
    }

    const initialAccordionState: Record<string, boolean> = {};
    updatedChapters.forEach((ch) => {
      initialAccordionState[ch.id] = true;
    });
    setOpenChapters(initialAccordionState);

    const localNotes = localStorage.getItem(`notes_${courseId}`);
    if (localNotes) {
      try {
        setSavedNotes(JSON.parse(localNotes));
      } catch (e) {
        console.error("Failed to parse saved notes", e);
      }
    }
  }, [courseId]);

  const toggleComplete = useCallback(async (lessonId: string) => {
    let targetLessonStatus = false;

    setCourseData((prev) => {
      const updatedChapters = prev.chapters.map((ch) => ({
        ...ch,
        lessons: ch.lessons.map((l) => {
          if (l.id === lessonId) {
            targetLessonStatus = !l.isCompleted;
            return { ...l, isCompleted: !l.isCompleted };
          }
          return l;
        }),
      }));

      const completedIds: string[] = [];
      updatedChapters.forEach((ch) =>
        ch.lessons.forEach((l) => {
          if (l.isCompleted) completedIds.push(l.id);
        })
      );
      localStorage.setItem(`progress_${courseId}`, JSON.stringify(completedIds));

      return { ...prev, chapters: updatedChapters };
    });

    setActiveLesson((prev) =>
      prev.id === lessonId ? { ...prev, isCompleted: !prev.isCompleted } : prev
    );

    // Sync state with Backend API
    setIsSyncing(true);
    try {
      await fetch("/api/lessons/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          courseId, 
          lessonId, 
          isCompleted: targetLessonStatus 
        }),
      });

      if (targetLessonStatus) {
        await fetch("/api/update-xp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ xpToAdd: 15, source: "lesson_completion" }),
        });
      }
    } catch (err) {
      console.log("Progress/XP update offline failover active:", err);
    } finally {
      setIsSyncing(false);
    }
  }, [courseId]);

  const toggleChapterAccordion = (chapterId: string) => {
    setOpenChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }));
  };

  const handleAddNote = () => {
    if (!userNote.trim()) return;
    const newNote: NoteItem = {
      id: Date.now().toString(),
      text: userNote.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    const updated = [newNote, ...savedNotes];
    setSavedNotes(updated);
    localStorage.setItem(`notes_${courseId}`, JSON.stringify(updated));
    setUserNote("");
  };

  const handleDeleteNote = (id: string) => {
    const updated = savedNotes.filter((n) => n.id !== id);
    setSavedNotes(updated);
    localStorage.setItem(`notes_${courseId}`, JSON.stringify(updated));
  };

  const allLessons = useMemo(() => courseData.chapters.flatMap((ch) => ch.lessons), [courseData]);
  const currentLessonIndex = allLessons.findIndex((l) => l.id === activeLesson.id);

  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  const totalLessons = allLessons.length;
  const completedLessons = allLessons.filter((l) => l.isCompleted).length;
  const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const formattedVideoUrl = getYouTubeEmbedUrl(activeLesson.videoUrl);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header Navigation */}
      <header className="bg-[#161B26] border-b border-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <Link
            href={`/courses/${courseData.id}`}
            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 font-semibold"
          >
            ← ወደ ኮርሱ ገፅ
          </Link>
          <span className="text-gray-700 hidden sm:inline">|</span>
          <h1 className="text-xs sm:text-sm font-bold text-white truncate max-w-[170px] sm:max-w-md">
            {courseData.title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[11px] text-gray-400">የትምህርት ሂደት</span>
            <span className="text-xs font-bold text-emerald-400">{progressPercent}% ተጠናቋል</span>
          </div>
          <div className="w-16 sm:w-28 bg-gray-800 h-2 rounded-full overflow-hidden border border-gray-700">
            <div
              className="bg-emerald-500 h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <button
            onClick={() => setShowSidebarMobile(!showSidebarMobile)}
            className="lg:hidden bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 px-2.5 py-1.5 rounded-lg text-xs font-bold"
          >
            {showSidebarMobile ? "ቪዲዮ አሳይ" : "ማውጫ አሳይ"}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3">
        {/* Left Section: Video Player & Tabs */}
        <div className={`lg:col-span-2 p-4 sm:p-6 space-y-6 flex flex-col ${showSidebarMobile ? "hidden lg:flex" : "flex"}`}>
          {/* Video Player Box */}
          <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
            {formattedVideoUrl ? (
              <iframe
                src={formattedVideoUrl}
                title={activeLesson.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 text-xs p-6 text-center space-y-2">
                <span className="text-2xl">📖</span>
                <p className="font-semibold text-white">{activeLesson.title}</p>
                <p className="text-gray-500 max-w-sm">ይህ ትምህርት የቪዲዮ ፋይል የለውም። ከታች ያለውን የትምህርት ፅሁፍ ያንብቡ።</p>
              </div>
            )}
          </div>

          {/* Video Controls & Title Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#161B26] p-4 sm:p-5 rounded-2xl border border-gray-800 shadow-sm">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-indigo-400 font-semibold tracking-wide">አሁን እየተመለከቱት ያለው፡</span>
                {isSyncing && <span className="text-[10px] text-amber-400 animate-pulse">● በመመዝገብ ላይ...</span>}
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-0.5">{activeLesson.title}</h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleComplete(activeLesson.id)}
                className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeLesson.isCompleted
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20"
                }`}
              >
                {activeLesson.isCompleted ? "✓ ተጠናቋል (Completed)" : "ትምህርቱን ጨርሻለሁ (Mark as Done)"}
              </button>
            </div>
          </div>

          {/* Next / Prev Fast Navigation */}
          <div className="flex items-center justify-between gap-2 text-xs">
            {prevLesson ? (
              <button
                onClick={() => {
                  setActiveLesson(prevLesson);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-3 py-2 bg-[#161B26] border border-gray-800 rounded-xl text-gray-300 hover:text-white hover:border-indigo-500 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                ← የቀደመ ትምህርት
              </button>
            ) : <div />}

            {nextLesson && (
              <button
                onClick={() => {
                  setActiveLesson(nextLesson);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-3 py-2 bg-[#161B26] border border-gray-800 rounded-xl text-indigo-400 hover:text-indigo-300 hover:border-indigo-500 transition-all flex items-center gap-1.5 ml-auto font-semibold cursor-pointer"
              >
                ቀጣይ ትምህርት ➔
              </button>
            )}
          </div>

          {/* Interactive Content Tabs */}
          <div className="bg-[#161B26] border border-gray-800 rounded-2xl p-4 flex-1 space-y-4 shadow-sm">
            <div className="flex border-b border-gray-800 gap-4 text-xs font-bold pb-2">
              <button
                onClick={() => setActiveTab("overview")}
                className={`pb-2 transition-colors cursor-pointer ${
                  activeTab === "overview"
                    ? "text-indigo-400 border-b-2 border-indigo-500"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                መግለጫ (Overview)
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`pb-2 transition-colors cursor-pointer ${
                  activeTab === "notes"
                    ? "text-indigo-400 border-b-2 border-indigo-500"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                ማስታወሻዎቼ ({savedNotes.length})
              </button>
              <button
                onClick={() => setActiveTab("resources")}
                className={`pb-2 transition-colors cursor-pointer ${
                  activeTab === "resources"
                    ? "text-indigo-400 border-b-2 border-indigo-500"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                ፋይሎች (Downloads)
              </button>
            </div>

            {activeTab === "overview" && (
              <div className="text-xs text-gray-300 leading-relaxed space-y-3">
                <p>
                  በዚህ ትምህርት ውስጥ ስለ <strong className="text-indigo-300">{activeLesson.title}</strong> ዋና ዋና ነጥቦች፣ የቪዲዮ ትንታኔዎች እና ተግባራዊ ማብራሪያዎችን በዝርዝር እንመለከታለን።
                </p>
                <div className="p-3 bg-gray-900/60 rounded-xl border border-gray-800 text-gray-400">
                  💡 <strong>የጥናት ምክር፡</strong> ትምህርቱን ከተመለከቱ በኋላ ሊያስታውሷቸው የሚፈልጓቸውን ነጥቦች በማስታወሻ ሳጥኑ (Notes Tab) ውስጥ ያስቀምጡ።
                </div>
              </div>
            )}

            {activeTab === "notes" && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="እዚህ ላይ ማስታወሻ ይጻፉ..."
                    value={userNote}
                    onChange={(e) => setUserNote(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddNote()}
                    className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={handleAddNote}
                    className="bg-indigo-600 text-white text-xs px-4 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-colors cursor-pointer"
                  >
                    መዝግብ
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {savedNotes.map((note) => (
                    <div
                      key={note.id}
                      className="bg-gray-900/80 p-3 rounded-xl border border-gray-800 text-xs text-gray-300 flex justify-between items-center gap-2"
                    >
                      <span className="flex-1">• {note.text}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-gray-500">{note.timestamp}</span>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="text-rose-400 hover:text-rose-300 text-[10px] font-bold cursor-pointer"
                          title="ሰርዝ"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                  {savedNotes.length === 0 && (
                    <p className="text-xs text-gray-500 text-center py-4">
                      ምንም የተቀመጠ ማስታወሻ የለም።
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "resources" && (
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 flex justify-between items-center">
                  <span className="text-gray-300">📄 የኮርሱ ማጠቃለያ ፋይሎች (.pdf / .zip)</span>
                  <button className="text-indigo-400 font-bold hover:underline cursor-pointer">Download</button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Section: Collapsible Curriculum Sidebar */}
        <div className={`bg-[#161B26] border-t lg:border-t-0 lg:border-l border-gray-800 p-4 space-y-4 ${showSidebarMobile ? "block" : "hidden lg:block"}`}>
          <h3 className="font-bold text-sm text-white border-b border-gray-800 pb-3 flex items-center justify-between">
            <span>የትምህርቱ ማውጫ (Curriculum)</span>
            <span className="text-xs text-indigo-400 font-normal">
              {completedLessons}/{totalLessons} ተጠናቋል
            </span>
          </h3>

          <div className="space-y-3 max-h-[calc(100vh-140px)] overflow-y-auto pr-1">
            {courseData.chapters.map((chapter) => {
              const isOpen = !!openChapters[chapter.id];
              return (
                <div key={chapter.id} className="space-y-1 bg-gray-900/40 rounded-xl p-2 border border-gray-800/60">
                  <button
                    onClick={() => toggleChapterAccordion(chapter.id)}
                    className="w-full text-xs font-semibold text-indigo-300 flex items-center justify-between py-1.5 px-2 hover:bg-gray-800/50 rounded-lg transition-colors cursor-pointer"
                  >
                    <span className="text-left font-bold">{chapter.title}</span>
                    <span className="text-gray-400 text-[10px] ml-2">{isOpen ? "▲" : "▼"}</span>
                  </button>

                  {isOpen && (
                    <div className="space-y-1 pt-1 border-t border-gray-800/40">
                      {chapter.lessons.map((lesson) => {
                        const isActive = activeLesson.id === lesson.id;
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => {
                              setActiveLesson(lesson);
                              setShowSidebarMobile(false);
                            }}
                            className={`w-full p-2.5 rounded-lg text-left text-xs transition-all flex items-center justify-between gap-2 cursor-pointer ${
                              isActive
                                ? "bg-indigo-600/20 border border-indigo-500 text-indigo-300 font-bold shadow-sm"
                                : "hover:bg-gray-800/40 text-gray-400 border border-transparent hover:text-gray-200"
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className="text-[10px]">{isActive ? "▶" : "•"}</span>
                              <span className="truncate">{lesson.title}</span>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              {lesson.isCompleted && (
                                <span className="text-emerald-400 text-xs font-bold" title="ተጠናቋል">
                                  ✓
                                </span>
                              )}
                              <span className="text-[10px] text-gray-500">{lesson.duration}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

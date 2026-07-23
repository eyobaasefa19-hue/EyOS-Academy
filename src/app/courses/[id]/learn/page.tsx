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
  videoUrl: string;
  isCompleted?: boolean;
}

interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

// --- Real Classroom Data with Proper Flutter & Supabase Video Embeds ---
const COURSE_LEARNING_DATA = {
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
          duration: "08:15", 
          videoUrl: "https://www.youtube.com/embed/VPvVD8t02U8", // Real Flutter Intro
          isCompleted: true 
        },
        { 
          id: "l-2", 
          title: "1.2 Flutter እና Dart በሞባይል ላይ መጫን", 
          duration: "14:20", 
          videoUrl: "https://www.youtube.com/embed/fq4N0hgOWzU", // Real Setup Video
          isCompleted: true 
        },
        { 
          id: "l-3", 
          title: "1.3 የፕሮጀክት መዋቅር እና የመጀመሪያው App", 
          duration: "18:45", 
          videoUrl: "https://www.youtube.com/embed/x0uinJvhNxI", // Real Project Structure
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
          duration: "22:10", 
          videoUrl: "https://www.youtube.com/embed/1xipg02Wu8s", // Real Supabase Video
          isCompleted: false 
        },
        { 
          id: "l-5", 
          title: "2.2 Authentication እና User Profiles አሰራር", 
          duration: "25:00", 
          videoUrl: "https://www.youtube.com/embed/3J3mThf6k7k", // Real Supabase Auth
          isCompleted: false 
        },
        { 
          id: "l-6", 
          title: "2.3 Realtime Data Fetching & State Management", 
          duration: "30:15", 
          videoUrl: "https://www.youtube.com/embed/3H_mOnI8Uas", // Real State Management
          isCompleted: false 
        }
      ]
    }
  ]
};

export default function VideoLearningRoomPage() {
  const params = useParams();
  const [courseData, setCourseData] = useState(COURSE_LEARNING_DATA);
  const [activeLesson, setActiveLesson] = useState<Lesson>(COURSE_LEARNING_DATA.chapters[0].lessons[0]);
  const [activeTab, setActiveTab] = useState<"overview" | "notes" | "resources">("overview");
  const [userNote, setUserNote] = useState("");
  const [savedNotes, setSavedNotes] = useState<string[]>([]);

  // Toggle completion status of lesson
  const toggleComplete = (lessonId: string) => {
    setCourseData((prev) => ({
      ...prev,
      chapters: prev.chapters.map((ch) => ({
        ...ch,
        lessons: ch.lessons.map((l) =>
          l.id === lessonId ? { ...l, isCompleted: !l.isCompleted } : l
        )
      }))
    }));
  };

  // Save note
  const handleAddNote = () => {
    if (!userNote.trim()) return;
    setSavedNotes((prev) => [userNote, ...prev]);
    setUserNote("");
  };

  // Calculate overall course progress percentage
  const totalLessons = courseData.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
  const completedLessons = courseData.chapters.reduce(
    (acc, ch) => acc + ch.lessons.filter((l) => l.isCompleted).length,
    0
  );
  const progressPercent = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col">
      
      {/* Top Header Navigation */}
      <header className="bg-[#161B26] border-b border-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link href={`/courses/${courseData.id}`} className="text-xs text-indigo-400 hover:underline">
            ← ወደ ኮርሱ ገፅ
          </Link>
          <span className="text-gray-600">|</span>
          <h1 className="text-sm font-bold text-white truncate max-w-xs sm:max-w-md">
            {courseData.title}
          </h1>
        </div>

        {/* Progress Badge */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[11px] text-gray-400">የትምህርት ሂደት (Progress)</span>
            <span className="text-xs font-bold text-emerald-400">{progressPercent}% ተጠናቋል</span>
          </div>
          <div className="w-20 sm:w-28 bg-gray-800 h-2 rounded-full overflow-hidden border border-gray-700">
            <div
              className="bg-emerald-500 h-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Classroom Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3">
        
        {/* Left/Center: Video Player & Tabs (2 Columns) */}
        <div className="lg:col-span-2 p-4 sm:p-6 space-y-6 flex flex-col">
          
          {/* Responsive Video Container */}
          <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
            <iframe
              src={activeLesson.videoUrl}
              title={activeLesson.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Active Lesson Header & Complete Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#161B26] p-5 rounded-2xl border border-gray-800">
            <div>
              <span className="text-xs text-indigo-400 font-semibold">አሁን እየተመለከቱት ያለው፡</span>
              <h2 className="text-lg font-bold text-white mt-0.5">{activeLesson.title}</h2>
            </div>

            <button
              onClick={() => toggleComplete(activeLesson.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
                activeLesson.isCompleted
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20"
              }`}
            >
              {activeLesson.isCompleted ? "✓ ተጠናቋል (Completed)" : "ትምህርቱን ጨርሻለሁ (Mark as Done)"}
            </button>
          </div>

          {/* Classroom Tabs */}
          <div className="bg-[#161B26] border border-gray-800 rounded-2xl p-4 flex-1 space-y-4">
            
            <div className="flex border-b border-gray-800 gap-4 text-xs font-bold pb-2">
              <button
                onClick={() => setActiveTab("overview")}
                className={`pb-2 transition-colors ${activeTab === "overview" ? "text-indigo-400 border-b-2 border-indigo-500" : "text-gray-400"}`}
              >
                መግለጫ (Overview)
              </button>
              <button
                onClick={() => setActiveTab("notes")}
                className={`pb-2 transition-colors ${activeTab === "notes" ? "text-indigo-400 border-b-2 border-indigo-500" : "text-gray-400"}`}
              >
                ማስታወሻዎቼ (Notes)
              </button>
              <button
                onClick={() => setActiveTab("resources")}
                className={`pb-2 transition-colors ${activeTab === "resources" ? "text-indigo-400 border-b-2 border-indigo-500" : "text-gray-400"}`}
              >
                ፋይሎች (Downloads)
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="text-xs text-gray-300 leading-relaxed space-y-2">
                <p>በዚህ ትምህርት ውስጥ ስለ ሞባይል መተግበሪያ ግንባታ፣ የፋይል መዋቅር እና አስፈላጊ ኮዶችን በዝርዝር እንመለከታለን።</p>
                <p className="text-gray-500">ማንኛውም ጥያቄ ካለዎት በማስታወሻ ሳጥኑ ውስጥ ማስቀመጥ ይችላሉ።</p>
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
                    className="flex-1 bg-gray-900 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={handleAddNote}
                    className="bg-indigo-600 text-white text-xs px-4 py-2 rounded-xl font-bold hover:bg-indigo-700 transition-colors"
                  >
                    መዝግብ
                  </button>
                </div>

                <div className="space-y-2">
                  {savedNotes.map((note, idx) => (
                    <div key={idx} className="bg-gray-900/80 p-3 rounded-xl border border-gray-800 text-xs text-gray-300 flex justify-between">
                      <span>• {note}</span>
                      <span className="text-[10px] text-gray-500">አሁን</span>
                    </div>
                  ))}
                  {savedNotes.length === 0 && (
                    <p className="text-xs text-gray-500 text-center py-4">ምንም የተቀመጠ ማስታወሻ የለም።</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "resources" && (
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-gray-900 rounded-xl border border-gray-800 flex justify-between items-center">
                  <span className="text-gray-300">📄 Source Code Files (.zip)</span>
                  <button className="text-indigo-400 font-bold hover:underline">Download</button>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Right Column: Playlist / Curriculum Sidebar */}
        <div className="bg-[#161B26] border-t lg:border-t-0 lg:border-l border-gray-800 p-4 space-y-4">
          <h3 className="font-bold text-sm text-white border-b border-gray-800 pb-3">
            የትምህርቱ ማውጫ (Curriculum)
          </h3>

          <div className="space-y-4">
            {courseData.chapters.map((chapter) => (
              <div key={chapter.id} className="space-y-1">
                <div className="text-xs font-semibold text-indigo-400 py-1 px-2 bg-gray-800/40 rounded-lg">
                  {chapter.title}
                </div>

                <div className="space-y-1 pt-1">
                  {chapter.lessons.map((lesson) => {
                    const isActive = activeLesson.id === lesson.id;
                    return (
                      <button
                        key={lesson.id}
                        onClick={() => setActiveLesson(lesson)}
                        className={`w-full p-3 rounded-xl text-left text-xs transition-all flex items-center justify-between gap-2 ${
                          isActive
                            ? "bg-indigo-600/20 border border-indigo-500 text-indigo-300 font-bold"
                            : "hover:bg-gray-800/40 text-gray-400 border border-transparent"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="text-[10px]">{isActive ? "▶" : "•"}</span>
                          <span className="truncate">{lesson.title}</span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          {lesson.isCompleted && (
                            <span className="text-emerald-400 text-xs font-bold">✓</span>
                          )}
                          <span className="text-[10px] text-gray-500">{lesson.duration}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { BookOpen, CheckCircle, ArrowRight, Award, Edit3, RefreshCw } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  level: string;
  category: string;
  content: string;
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  };
  writingPrompt: string;
}

const lessons: Lesson[] = [
  {
    id: 'lesson-1',
    title: 'Introducing Yourself Professionally',
    level: 'Beginner',
    category: 'Speaking & Social',
    content: `When introducing yourself in a professional setting (like a job interview or meeting a new team), follow the Present-Past-Future formula:\n\n1. Present: State who you are and your current role.\n"Hello, my name is Eyob. I am a ground cargo operations specialist at Ethiopian Airlines."\n\n2. Past: Briefly mention your background or key experience.\n"I have a background in technical vocational education and have been handling aircraft loading configurations and ground support equipment for several months."\n\n3. Future: Share why you are excited to be here.\n"I am focused on continuously improving my professional English skills to grow within the aviation logistics industry."`,
    quiz: {
      question: 'What is the recommended 3-step formula for a professional introduction?',
      options: [
        'Name, Age, Hobbies',
        'Present, Past, Future',
        'Salary, Education, Experience',
        'Greeting, Small Talk, Goodbye'
      ],
      correctAnswer: 1,
      explanation: 'The Present-Past-Future formula helps you structure your introduction logically: what you do now, your background, and your future goals.'
    },
    writingPrompt: 'Write your own professional introduction using the Present-Past-Future formula. Tailor it to your background in cargo operations or software development.'
  },
  {
    id: 'lesson-2',
    title: 'Aviation Logistics & Cargo Communication',
    level: 'Intermediate',
    category: 'Vocational English',
    content: `Clear communication is vital in airport ground operations to ensure safety and efficiency. Key terminology includes:\n\n- ULD (Unit Load Device): Standard pallets and containers used to load luggage and cargo on aircraft.\n- Manifest: A document listing the cargo, passengers, and crew of an aircraft.\n- Loading Configurations: Ensuring weight is balanced across the Main Deck, Forward (FWD), and Aft (AFT) compartments.\n\nExample Scenario:\nWhen coordinating a Boeing 777 loading, you might report: "We have secured the PMC pallets in the forward compartment. The cargo manifest is updated and ready for review."`,
    quiz: {
      question: 'What does the abbreviation ULD stand for in aviation logistics?',
      options: [
        'Universal Loading Dock',
        'Unit Load Device',
        'United Logistics Department',
        'Upper Deck Loading'
      ],
      correctAnswer: 1,
      explanation: 'ULD stands for Unit Load Device. It refers to the containers and pallets used to transport cargo safely on aircraft.'
    },
    writingPrompt: 'Describe a typical shift handling cargo operations or operating ground support equipment, using at least two professional aviation terms.'
  }
];

export default function EnglishLearningDashboard() {
  const [user, setUser] = useState<any>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson>(lessons[0]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [writingInput, setWritingInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState<Record<string, any>>({});
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        fetchUserProgress(user.id);
      }
    }
    getUser();
  }, []);

  async function fetchUserProgress(userId: string) {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      if (data) {
        const progressMap: Record<string, any> = {};
        data.forEach((item) => {
          progressMap[item.lesson_id] = item;
        });
        setProgress(progressMap);

        // Current lesson initial state
        const currentLessonProgress = progressMap[activeLesson.id];
        if (currentLessonProgress) {
          setWritingInput(currentLessonProgress.user_writing || '');
          if (currentLessonProgress.completed) {
            setQuizSubmitted(true);
            setSelectedOption(currentLessonProgress.quiz_score > 0 ? activeLesson.quiz.correctAnswer : null);
          } else {
            setQuizSubmitted(false);
            setSelectedOption(null);
          }
        }
      }
    } catch (err) {
      console.error('Error fetching progress:', err);
    }
  }

  const handleLessonChange = (lesson: Lesson) => {
    setActiveLesson(lesson);
    const lessonProg = progress[lesson.id];
    if (lessonProg) {
      setWritingInput(lessonProg.user_writing || '');
      setQuizSubmitted(lessonProg.completed);
      setSelectedOption(lessonProg.completed ? lesson.quiz.correctAnswer : null);
    } else {
      setWritingInput('');
      setQuizSubmitted(false);
      setSelectedOption(null);
    }
    setMessage(null);
  };

  const handleQuizSubmit = () => {
    if (selectedOption === null) return;
    setQuizSubmitted(true);
  };

  const handleSaveProgress = async () => {
    if (!user) {
      setMessage({ type: 'error', text: 'Please sign in to save your progress.' });
      return;
    }

    setSaving(true);
    setMessage(null);

    const isCorrect = selectedOption === activeLesson.quiz.correctAnswer;
    const score = isCorrect ? 100 : 0;

    try {
      const existingProgress = progress[activeLesson.id];

      if (existingProgress?.id) {
        const { error } = await supabase
          .from('user_progress')
          .update({
            completed: quizSubmitted,
            quiz_score: score,
            user_writing: writingInput,
          })
          .eq('id', existingProgress.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('user_progress')
          .insert([
            {
              user_id: user.id,
              lesson_id: activeLesson.id,
              completed: quizSubmitted,
              quiz_score: score,
              user_writing: writingInput,
            }
          ]);

        if (error) throw error;
      }

      setMessage({ type: 'success', text: 'Your learning progress has been saved successfully!' });
      await fetchUserProgress(user.id);
    } catch (err: any) {
      console.error('Error saving progress:', err);
      setMessage({ type: 'error', text: err.message || 'Failed to save progress. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 border-b border-slate-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              EyobFluent OS
            </h1>
            <p className="text-slate-400 text-sm mt-1">Professional & Vocational English Accelerator</p>
          </div>
          {user && (
            <div className="bg-slate-800/80 px-4 py-2 rounded-lg border border-slate-700/50 text-xs text-slate-300">
              Active Session: <span className="text-blue-400 font-medium">{user.email}</span>
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-400" /> Syllabus Modules
            </h2>
            <div className="space-y-2">
              {lessons.map((lesson) => {
                const isCompleted = progress[lesson.id]?.completed;
                const isActive = activeLesson.id === lesson.id;
                return (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonChange(lesson)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      isActive
                        ? 'bg-blue-600/10 border-blue-500/50 text-white shadow-lg shadow-blue-950/20'
                        : 'bg-slate-800/40 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-blue-400 border border-slate-700/50">
                        {lesson.level}
                      </span>
                      {isCompleted && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <h3 className="font-medium text-sm text-slate-100">{lesson.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">{lesson.category}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
                {activeLesson.title}
              </h2>
              <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line bg-slate-900/40 p-4 rounded-xl border border-slate-800/60">
                {activeLesson.content}
              </div>
            </div>

            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 shadow-xl workspace-card">
              <h3 className="text-md font-semibold text-slate-200 mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" /> Module Knowledge Check
              </h3>
              <p className="text-sm text-slate-300 mb-4 font-medium">{activeLesson.quiz.question}</p>
              
              <div className="space-y-2">
                {activeLesson.quiz.options.map((option, idx) => {
                  let optionStyle = "bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-300";
                  if (quizSubmitted) {
                    if (idx === activeLesson.quiz.correctAnswer) {
                      optionStyle = "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 font-medium";
                    } else if (selectedOption === idx && selectedOption !== activeLesson.quiz.correctAnswer) {
                      optionStyle = "bg-rose-500/10 border-rose-500/50 text-rose-400";
                    }
                  } else if (selectedOption === idx) {
                    optionStyle = "bg-blue-600/10 border-blue-500 text-blue-400 font-medium";
                  }

                  return (
                    <button
                      key={idx}
                      disabled={quizSubmitted}
                      onClick={() => setSelectedOption(idx)}
                      className={`w-full text-left p-3 text-xs rounded-xl border transition-all ${optionStyle}`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {!quizSubmitted ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleQuizSubmit}
                  className="mt-4 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-medium text-xs flex items-center gap-2 transition-all shadow-md shadow-blue-900/20"
                >
                  Verify Answer <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div className="mt-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 leading-normal">
                  <span className="font-semibold text-slate-200 block mb-1">Explanation:</span>
                  {activeLesson.quiz.explanation}
                </div>
              )}
            </div>

            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-md font-semibold text-slate-200 mb-3 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-purple-400" /> Active Composition Exercise
              </h3>
              <p className="text-xs text-slate-400 mb-3 leading-normal">{activeLesson.writingPrompt}</p>
              <textarea
                value={writingInput}
                onChange={(e) => setWritingInput(e.target.value)}
                placeholder="Type your professional composition or response script here..."
                rows={5}
                className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-slate-200 text-sm focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-600"
              />

              {message && (
                <div className={`mt-4 p-3 rounded-xl text-xs border ${
                  message.type === 'success' 
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                    : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                }`}>
                  {message.text}
                </div>
              )}

              <div className="mt-4 flex justify-end">
                <button
                  disabled={saving}
                  onClick={handleSaveProgress}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-2 transition-all shadow-lg shadow-indigo-950/40"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Syncing Progress...
                    </>
                  ) : (
                    'Commit Progress to Cloud'
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

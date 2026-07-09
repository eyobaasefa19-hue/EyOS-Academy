'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { BookOpen, CheckCircle, ArrowRight, Award, Edit3, RefreshCw, User, LayoutGrid, Bot, BrainCircuit, GraduationCap, ArrowLeft, Send } from 'lucide-react';

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
  const [currentView, setCurrentView] = useState<'hub' | 'lessons' | 'chat' | 'vocab' | 'practical'>('hub');
  const [activeLesson, setActiveLesson] = useState<Lesson>(lessons[0]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [writingInput, setWritingInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [progress, setProgress] = useState<Record<string, any>>({});
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // AI Chat States
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'model'; text: string }>>([
    { role: 'model', text: 'Hello! I am your AI English Tutor. Let\'s practice speaking or writing. How can I help you today?' }
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  useEffect(() => {
    async function getUser() {
      if (!supabase || !supabase.auth) return;
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        if (user) {
          fetchUserProgress(user.id);
        }
      } catch (e) {
        console.error(e);
      }
    }
    getUser();
  }, []);

  async function fetchUserProgress(userId: string) {
    if (!supabase) return;
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

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
      });
      const data = await response.json();
      setChatMessages(prev => [...prev, { role: 'model', text: data.reply || data.text || 'I am processing your request.' }]);
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [...prev, { role: 'model', text: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 border-b border-slate-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              EyOS Academy
            </h1>
            <p className="text-slate-400 text-sm mt-1">Professional & Vocational English Accelerator</p>
          </div>
          {user && (
            <div className="bg-slate-800/80 px-4 py-2 rounded-lg border border-slate-700/50 text-xs text-slate-300 flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-blue-400" />
              <span>Active Session: <span className="text-blue-400 font-medium">{user.email}</span></span>
            </div>
          )}
        </header>

        {/* 1. HUB VIEW (ዋናው ማውጫ) */}
        {currentView === 'hub' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-200 flex items-center gap-2 mb-4">
              <LayoutGrid className="w-5 h-5 text-blue-400" /> የመማሪያ ክፍሎች (Learning Hub)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ካርድ 01 */}
              <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
                <div>
                  <span className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 font-bold flex items-center justify-center text-sm mb-4 border border-indigo-500/20">01</span>
                  <h3 className="text-lg font-bold text-white mb-2">Syllabus Modules</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-light">በሙያዎ እና በዕለት ተዕለት ሕይወትዎ የሚጠቅሙትን የእንግሊዘኛ ትምህርቶች ይማሩ::</p>
                </div>
                <button onClick={() => setCurrentView('lessons')} className="mt-6 w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg">ትምህርቱን ጀምር</button>
              </div>

              {/* ካርድ 02 */}
              <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
                <div>
                  <span className="w-8 h-8 rounded-lg bg-fuchsia-600/20 text-fuchsia-400 font-bold flex items-center justify-center text-sm mb-4 border border-fuchsia-500/20">02</span>
                  <h3 className="text-lg font-bold text-white mb-2">Vocabulary Builder</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-light">ቃላትን በፍጥነት የሚያጠኑበት እና አጠቃቀማቸውን የሚለማመዱበት ልዩ ክፍል::</p>
                </div>
                <button onClick={() => setCurrentView('vocab')} className="mt-6 w-full py-3 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-semibold text-sm transition-all shadow-lg">ትምህርቱን ጀምር</button>
              </div>

              {/* ካርድ 03 */}
              <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
                <div>
                  <span className="w-8 h-8 rounded-lg bg-emerald-600/20 text-emerald-400 font-bold flex items-center justify-center text-sm mb-4 border border-emerald-500/20">03</span>
                  <h3 className="text-lg font-bold text-white mb-2">AI Chat Tutor</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-light">ከአርቲፊሻል ኢንተለጀንስ አስተማሪ ጋር በቀጥታ በድምፅ እና በፅሁፍ ይለማመዱ::</p>
                </div>
                <button onClick={() => setCurrentView('chat')} className="mt-6 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg">ትምህርቱን ጀምር</button>
              </div>

              {/* ካርድ 04 */}
              <div className="bg-slate-800/50 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
                <div>
                  <span className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 font-bold flex items-center justify-center text-sm mb-4 border border-blue-500/20">04</span>
                  <h3 className="text-lg font-bold text-white mb-2">Practical English Hub</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-light">ማንበብ፣ የዕለት ተዕለት ውይይቶችን መለማመድ እና የፅሁፍ ብቃትዎን ያሳድጉ::</p>
                </div>
                <button onClick={() => setCurrentView('practical')} className="mt-6 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg">ትምህርቱን ጀምር</button>
              </div>
            </div>
          </div>
        )}

        {/* 2. LESSONS VIEW (01 Syllabus) */}
        {currentView === 'lessons' && (
          <div className="space-y-4">
            <button onClick={() => setCurrentView('hub')} className="text-xs text-slate-400 hover:text-white bg-slate-800 px-3 py-2 rounded-xl flex items-center gap-1">← ወደ ማውጫ</button>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full lg:w-1/3 space-y-4">
                <h2 className="text-lg font-semibold flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-400" /> Modules</h2>
                <div className="space-y-3">
                  {lessons.map((l) => (
                    <button key={l.id} onClick={() => handleLessonChange(l)} className={`w-full text-left p-4 rounded-xl border ${activeLesson.id === l.id ? 'bg-blue-600/10 border-blue-500 text-white' : 'bg-slate-800/40 border-slate-800'}`}>
                      <h3 className="font-medium text-sm">{l.title}</h3>
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-full lg:w-2/3 space-y-6">
                <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6">
                  <h2 className="text-xl font-bold mb-4">{activeLesson.title}</h2>
                  <div className="text-slate-300 text-sm whitespace-pre-line bg-slate-900/40 p-4 rounded-xl">{activeLesson.content}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. AI CHAT TUTOR VIEW (03 AI Chat) */}
        {currentView === 'chat' && (
          <div className="space-y-4">
            <button onClick={() => setCurrentView('hub')} className="text-xs text-slate-400 hover:text-white bg-slate-800 px-3 py-2 rounded-xl flex items-center gap-1">← ወደ ማውጫ</button>
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-6 h-[500px] flex flex-col justify-between shadow-xl">
              <div className="overflow-y-auto space-y-4 flex-1 pr-2">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-slate-200 border border-slate-800'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {chatLoading && <div className="text-xs text-slate-500 animate-pulse">AI is thinking...</div>}
              </div>
              <div className="mt-4 flex gap-2 border-t border-slate-800 pt-4">
                <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendMessage()} type="text" placeholder="Type an English sentence to practice..." className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" />
                <button onClick={handleSendMessage} className="p-3 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white transition-all"><Send className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        )}

        {/* 4. VOCAB BUILDER VIEW (02) */}
        {currentView === 'vocab' && (
          <div className="space-y-4">
            <button onClick={() => setCurrentView('hub')} className="text-xs text-slate-400 hover:text-white bg-slate-800 px-3 py-2 rounded-xl flex items-center gap-1">← ወደ ማውጫ</button>
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-8 text-center shadow-xl">
              <BrainCircuit className="w-12 h-12 text-fuchsia-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Vocabulary Builder</h3>
              <p className="text-slate-400 text-sm">ይህ ክፍል በቅርብ ቀን ይዘመናል! አዳዲስ የቃላት መማሪያ ካርዶች በመዘጋጀት ላይ ናቸው።</p>
            </div>
          </div>
        )}

        {/* 5. PRACTICAL ENGLISH HUB VIEW (04) */}
        {currentView === 'practical' && (
          <div className="space-y-4">
            <button onClick={() => setCurrentView('hub')} className="text-xs text-slate-400 hover:text-white bg-slate-800 px-3 py-2 rounded-xl flex items-center gap-1">← ወደ ማውጫ</button>
            <div className="bg-slate-800/40 border border-slate-800 rounded-2xl p-8 text-center shadow-xl">
              <GraduationCap className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Practical English Hub</h3>
              <p className="text-slate-400 text-sm">ይህ ክፍል በቅርብ ቀን ይዘመናል! የዕለት ተዕለት ውይይቶች እዚህ ይካተታሉ።</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

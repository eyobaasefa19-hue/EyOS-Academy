'use client';

import { useRouter } from 'next/navigation';
import { BookOpen, BrainCircuit, Bot, GraduationCap, LayoutGrid, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function DashboardHub() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function getUser() {
      if (!supabase || !supabase.auth) return;
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (e) {
        console.error(e);
      }
    }
    getUser();
  }, []);

  const menuItems = [
    {
      id: '01',
      title: 'Syllabus Modules',
      description: 'በሙያዎ እና በዕለት ተዕለት ሕይወትዎ የሚጠቅሙትን የእንግሊዘኛ ትምህርቶች ይማሩ።',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'bg-indigo-600',
      route: '/lessons/grammar' // ወደ ሰራኸው ሰዋስው/ትምህርት ገጽ ይወስዳል
    },
    {
      id: '02',
      title: 'Vocabulary Builder',
      description: 'ቃላትን በፍጥነት የሚያጠኑበት እና አጠቃቀማቸውን የሚለማመዱበት ልዩ ክፍል::',
      icon: <BrainCircuit className="w-6 h-6" />,
      color: 'bg-fuchsia-600',
      route: '/lessons/vocabulary' // ወደ ሰራኸው vocabulary ፎልደር ይወስዳል
    },
    {
      id: '03',
      title: 'AI Chat Tutor',
      description: 'ከአርቲፊሻል ኢንተለጀንስ አስተማሪ ጋር በቀጥታ በድምፅ እና በፅሁፍ ይለማመዱ::',
      icon: <Bot className="w-6 h-6" />,
      color: 'bg-emerald-600',
      route: '/lessons/ai-chat' // ወደ ሰራኸው ai-chat ፎልደር ይወስዳል
    },
    {
      id: '04',
      title: 'Practical English Hub',
      description: 'ማንበብ፣ የዕለት ተዕለት ውይይቶችን መለማመድ እና የፅሁፍ ብቃትዎን ያሳድጉ::',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'bg-blue-600',
      route: '/lessons/practical-hub' // ወደ ሰራኸው practical-hub ፎልደር ይወስዳል
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 border-b border-slate-800 pb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
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

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-200 flex items-center gap-2 mb-4">
            <LayoutGrid className="w-5 h-5 text-blue-400" /> የመማሪያ ክፍሎች (Learning Hub)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems.map((item) => (
              <div key={item.id} className="bg-slate-800/50 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center text-white mb-4`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 mb-6 leading-relaxed font-light">{item.description}</p>
                </div>
                <button 
                  onClick={() => router.push(item.route)}
                  className="w-full py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold text-sm transition-all shadow-lg"
                >
                  ትምህርቱን ጀምር
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

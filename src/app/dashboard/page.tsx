'use client';

import { useRouter } from 'next/navigation';
import { BookOpen, BrainCircuit, Bot, GraduationCap, User } from 'lucide-react';

export default function DashboardHub() {
  const router = useRouter();

  const menuItems = [
    {
      id: '01',
      title: 'Syllabus Modules',
      description: 'በሙያዎ እና በዕለት ተዕለት ሕይወትዎ የሚጠቅሙትን የእንግሊዘኛ ትምህርቶች ይማሩ።',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'bg-indigo-600',
      route: '/lessons' // ወደ 'src/app/lessons' ይሄዳል
    },
    {
      id: '02',
      title: 'Vocabulary Builder',
      description: 'ቃላትን በፍጥነት የሚያጠኑበት እና አጠቃቀማቸውን የሚለማመዱበት ልዩ ክፍል::',
      icon: <BrainCircuit className="w-6 h-6" />,
      color: 'bg-fuchsia-600',
      route: '/vocabulary' // ይህንን ወደፊት እንፈጥረዋለን
    },
    {
      id: '03',
      title: 'AI Chat Tutor',
      description: 'ከአርቲፊሻል ኢንተለጀንስ አስተማሪ ጋር በቀጥታ በድምፅ እና በፅሁፍ ይለማመዱ::',
      icon: <Bot className="w-6 h-6" />,
      color: 'bg-emerald-600',
      route: '/api/chat' // የቻት ኤፒአይህ ያለበት
    },
    {
      id: '04',
      title: 'Practical English Hub',
      description: 'ማንበብ፣ የዕለት ተዕለት ውይይቶችን መለማመድ እና የፅሁፍ ብቃትዎን ያሳድጉ::',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'bg-blue-600',
      route: '/practical' // ይህንን ወደፊት እንፈጥረዋለን
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">እንኳን ደህና መጡ!</h1>
          <p className="text-slate-400">ዛሬ ምን እንለማመድ?</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item) => (
            <div key={item.id} className="bg-slate-800/50 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center text-white mb-4`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 mb-6">{item.description}</p>
              </div>
              <button 
                onClick={() => router.push(item.route)}
                className="w-full py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-semibold text-sm transition-all"
              >
                ወደ ክፍል ይግቡ
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

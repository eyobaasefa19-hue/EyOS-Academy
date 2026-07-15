'use client';

import { useRouter } from 'next/navigation';
import { BookOpen, BrainCircuit, Bot, GraduationCap, LayoutGrid, User, Flame, Zap, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function DashboardHub() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [leaders, setLeaders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getDashboardData() {
      if (!supabase || !supabase.auth) {
        setLoading(false);
        return;
      }
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          setUser(authUser);
          
          const { data: profileData } = await supabase
            .from('UserProfile')
            .select('xpPoints, streak, fullName, lastActive')
            .eq('id', authUser.id)
            .single();

          if (profileData) {
            let currentStreak = profileData.streak ?? 0;
            const todayStr = new Date().toISOString().split('T')[0]; 
            
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0]; 
            
            let newStreak = currentStreak;
            let shouldUpdate = false;
            
            if (!profileData.lastActive) {
              newStreak = 1;
              shouldUpdate = true;
            } else {
              const lastActiveStr = profileData.lastActive.split('T')[0];
              
              if (lastActiveStr === yesterdayStr) {
                newStreak = currentStreak + 1;
                shouldUpdate = true;
              } else if (lastActiveStr !== todayStr) {
                newStreak = 1;
                shouldUpdate = true;
              }
            }
            
            if (shouldUpdate) {
              await supabase
                .from('UserProfile')
                .update({ streak: newStreak, lastActive: todayStr })
                .eq('id', authUser.id);
                
              profileData.streak = newStreak;
              profileData.lastActive = todayStr;
            }
            
            setProfile(profileData);
          }
        }

        // 🌟 አዲሱ የ Leaderboard ኮድ 🌟
        // ከፍተኛ XP ያላቸውን 5 ተማሪዎች ከዳታቤዝ ማምጣት
        const { data: topUsers } = await supabase
          .from('UserProfile')
          .select('fullName, xpPoints, email')
          .order('xpPoints', { ascending: false })
          .limit(5);

        if (topUsers) {
          setLeaders(topUsers);
        }

      } catch (e) {
        console.error('Error fetching dashboard data:', e);
      } finally {
        setLoading(false);
      }
    }
    getDashboardData();
  }, []);

  const menuItems = [
    {
      id: '01',
      title: 'Syllabus Modules',
      description: 'በሙያዎ እና በዕለት ተዕለት ሕይወትዎ የሚጠቅሙትን የእንግሊዘኛ ትምህርቶች ይማሩ።',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'bg-indigo-600',
      route: '/lessons/grammar'
    },
    {
      id: '02',
      title: 'Vocabulary Builder',
      description: 'ቃላትን በፍጥነት የሚያጠኑበት እና አጠቃቀማቸውን የሚለማመዱበት ልዩ ክፍል::',
      icon: <BrainCircuit className="w-6 h-6" />,
      color: 'bg-fuchsia-600',
      route: '/lessons/vocabulary'
    },
    {
      id: '03',
      title: 'AI Chat Tutor',
      description: 'ከአርቲፊሻል ኢንተለጀንስ አስተማሪ ጋር በቀጥታ በድምፅ እና በፅሁፍ ይለማመዱ::',
      icon: <Bot className="w-6 h-6" />,
      color: 'bg-emerald-600',
      route: '/lessons/ai-chat'
    },
    {
      id: '04',
      title: 'Practical English Hub',
      description: 'ማንበብ፣ የዕለት ተዕለት ውይይቶችን መለማመድ እና የፅሁፍ ብቃትዎን ያሳድጉ::',
      icon: <GraduationCap className="w-6 h-6" />,
      color: 'bg-blue-600',
      route: '/lessons/practical-hub'
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

        {user && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Stats Column (Takes 2/3 space on desktop) */}
            <div className="md:col-span-2 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-800/60 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-600/10 flex items-center justify-center border border-amber-500/20">
                    <Zap className="w-6 h-6 text-amber-400 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">ያገኙት ነጥብ</p>
                    <p className="text-2xl font-bold text-amber-400">{profile?.xpPoints ?? 0} XP</p>
                  </div>
                </div>

                <div className="bg-slate-800/40 p-5 rounded-2xl border border-slate-800/60 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-rose-600/10 flex items-center justify-center border border-rose-500/20">
                    <Flame className="w-6 h-6 text-rose-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">የቀናት ተከታታይነት</p>
                    <p className="text-2xl font-bold text-rose-400">{profile?.streak ?? 0} ቀናት</p>
                  </div>
                </div>
              </div>

              {/* 🌟 አዲሱ የ Leaderboard ዩአይ (UI) 🌟 */}
              <div className="bg-slate-800/40 border border-slate-800/60 rounded-2xl p-5">
                <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2 mb-4">
                  <Trophy className="w-5 h-5 text-yellow-400" /> ከፍተኛ ተማሪዎች (Top 5 Learners)
                </h2>
                <div className="space-y-3">
                  {leaders.length > 0 ? (
                    leaders.map((leader, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:bg-slate-800 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md ${
                            index === 0 ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' : 
                            index === 1 ? 'bg-slate-300/20 text-slate-300 border border-slate-300/30' : 
                            index === 2 ? 'bg-amber-600/20 text-amber-500 border border-amber-600/30' : 
                            'bg-slate-800 text-slate-400 border border-slate-700'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="text-sm font-medium text-slate-200">
                            {leader.fullName || leader.email?.split('@')[0]}
                          </span>
                          {user.email === leader.email && (
                            <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full ml-2 border border-indigo-500/30">እርስዎ</span>
                          )}
                        </div>
                        <span className="text-sm font-bold text-amber-400">{leader.xpPoints || 0} XP</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-slate-500 text-center py-4">ምንም መረጃ አልተገኘም...</p>
                  )}
                </div>
              </div>
            </div>

            {/* Profile Info Column */}
            <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-800/60 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-blue-600/20 flex items-center justify-center border-4 border-slate-800 mb-4 relative">
                <User className="w-10 h-10 text-blue-400" />
                <div className="absolute -bottom-2 -right-2 bg-slate-800 p-1.5 rounded-full border border-slate-700">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                {profile?.fullName || user.email?.split('@')[0]}
              </h3>
              <p className="text-xs text-slate-400 mb-4">{user.email}</p>
              <div className="w-full bg-slate-800 rounded-full h-2 mb-2 overflow-hidden border border-slate-700">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" style={{ width: `${Math.min(((profile?.xpPoints || 0) / 100) * 100, 100)}%` }}></div>
              </div>
              <p className="text-[10px] text-slate-500">ወደ ቀጣዩ ደረጃ ለመድረስ አዲስ ነጥቦችን ይሰብስቡ</p>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-200 flex items-center gap-2 mb-4">
            <LayoutGrid className="w-5 h-5 text-blue-400" /> የመማሪያ ክፍሎች (Learning Hub)
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems.map((item) => (
              <div key={item.id} className="bg-slate-800/50 border border-slate-800/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between hover:border-slate-700/60 transition-all duration-300">
                <div>
                  <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
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

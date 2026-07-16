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
      icon: <BookOpen className="w-5 h-5" />,
      color: 'bg-indigo-600',
      route: '/lessons/grammar'
    },
    {
      id: '02',
      title: 'Vocabulary Builder',
      description: 'ቃላትን በፍጥነት የሚያጠኑበት እና አጠቃቀማቸውን የሚለማመዱበት ልዩ ክፍል::',
      icon: <BrainCircuit className="w-5 h-5" />,
      color: 'bg-fuchsia-600',
      route: '/lessons/vocabulary'
    },
    {
      id: '03',
      title: 'AI Chat Tutor',
      description: 'ከአርቲፊሻል ኢንተለጀንስ አስተማሪ ጋር በቀጥታ በድምፅ እና በፅሁፍ ይለማመዱ::',
      icon: <Bot className="w-5 h-5" />,
      color: 'bg-emerald-600',
      route: '/lessons/ai-chat'
    },
    {
      id: '04',
      title: 'Practical English Hub',
      description: 'ማንበብ፣ የዕለት ተዕለት ውይይቶችን መለማመድ እና የፅሁፍ ብቃትዎን ያሳድጉ::',
      icon: <GraduationCap className="w-5 h-5" />,
      color: 'bg-blue-600',
      route: '/lessons/practical-hub'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-955 text-slate-100 p-4 md:p-8 font-sans antialiased">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* 🌟 የተስተካከለው ፕሪሚየም ሄደር (Personalized Welcome) 🌟 */}
        <header className="border-b border-slate-900 pb-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              ሰላም፣ <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">{profile?.fullName || user?.email?.split('@')[0] || 'ተማሪ'}</span> 👋
            </h1>
            <p className="text-slate-400 text-xs mt-1 font-medium">የዛሬውን የእንግሊዘኛ ትምህርቶን እዚህ ይጀምሩ</p>
          </div>
          {user && (
            <div className="bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-850 text-[11px] text-slate-400 flex items-center gap-2 shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>አካውንት: <span className="text-blue-400 font-mono">{user.email}</span></span>
            </div>
          )}
        </header>

        {user && !loading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* ─── LEFT COLUMN: STATS & LEARNING ─── */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-900 shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20 shrink-0">
                    <Zap className="w-5 h-5 text-amber-400 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-500 font-medium">ያገኙት ነጥብ</p>
                    <p className="text-lg font-black text-amber-400 tracking-tight">{profile?.xpPoints ?? 0} <span className="text-xs font-normal text-amber-500/80">XP</span></p>
                  </div>
                </div>

                <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-900 shadow-xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20 shrink-0">
                    <Flame className="w-5 h-5 text-rose-400" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-500 font-medium">ተከታታይነት</p>
                    <p className="text-lg font-black text-rose-400 tracking-tight">{profile?.streak ?? 0} <span className="text-xs font-normal text-rose-500/80">ቀናት</span></p>
                  </div>
                </div>
              </div>

              {/* Learning Hub */}
              <div className="space-y-4">
                <h2 className="text-sm font-bold text-slate-400 flex items-center gap-2 uppercase tracking-wider">
                  <LayoutGrid className="w-4 h-4 text-blue-400" /> የመማሪያ ክፍሎች (Learning Hub)
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {menuItems.map((item) => (
                    <div key={item.id} className="bg-slate-900/40 border border-slate-900 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-slate-800/80 transition-all duration-300 group">
                      <div>
                        <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center text-white mb-3 shadow-md`}>
                          {item.icon}
                        </div>
                        <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-blue-400 transition-colors">{item.title}</h3>
                        <p className="text-xs text-slate-400 mb-4 leading-relaxed font-normal line-clamp-2">{item.description}</p>
                      </div>
                      <button 
                        onClick={() => router.push(item.route)}
                        className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-blue-600 text-white font-semibold text-xs transition-all shadow-md active:scale-[0.98]"
                      >
                        ትምህርቱን ጀምር
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* ─── RIGHT COLUMN: SIDEBAR ─── */}
            <div className="space-y-6">
              
              {/* Profile Card */}
              <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-900 shadow-xl flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-600/10 flex items-center justify-center border-2 border-slate-800 mb-3 relative">
                  <User className="w-7 h-7 text-blue-400" />
                  <div className="absolute bottom-0 right-0 bg-slate-950 p-1 rounded-full border border-slate-800">
                    <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {profile?.fullName || user?.email?.split('@')[0]}
                </h3>
                <p className="text-[11px] text-slate-500 font-mono mb-4">{user.email}</p>
                
                <div className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 space-y-1.5">
                  <div className="flex justify-between text-[10px] font-medium text-slate-400">
                     <span>የደረጃዎ ፕሮግረስ</span>
                     <span className="text-blue-400 font-bold">{Math.min(((profile?.xpPoints || 0) / 100) * 100, 100).toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${Math.min(((profile?.xpPoints || 0) / 100) * 100, 100)}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Leaderboard Card */}
              <div className="bg-slate-900/60 border border-slate-900 rounded-2xl p-4 shadow-xl">
                <h2 className="text-sm font-bold text-slate-300 flex items-center gap-2 mb-3.5">
                  <Trophy className="w-4 h-4 text-yellow-500" /> ከፍተኛ ተማሪዎች (Top 5 Learners)
                </h2>
                <div className="space-y-2">
                  {leaders.length > 0 ? (
                    leaders.map((leader, index) => (
                      <div key={index} className={`flex items-center justify-between p-2.5 rounded-xl border transition-all ${
                        user.email === leader.email 
                          ? 'bg-blue-600/10 border-blue-500/30' 
                          : 'bg-slate-950/40 border-slate-900 hover:bg-slate-950'
                      }`}>
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-[11px] shadow-sm shrink-0 ${
                            index === 0 ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' : 
                            index === 1 ? 'bg-slate-400/10 text-slate-300 border border-slate-400/30' : 
                            index === 2 ? 'bg-orange-600/10 text-orange-400 border border-orange-600/30' : 
                            'bg-slate-900 text-slate-500 border border-slate-800'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="text-xs font-semibold text-slate-300 truncate max-w-[110px]">
                            {leader.fullName || leader.email?.split('@')[0]}
                          </span>
                          {user.email === leader.email && (
                            <span className="text-[9px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-md border border-blue-500/20 font-medium shrink-0">እርስዎ</span>
                          )}
                        </div>
                        <span className="text-xs font-bold text-amber-400 font-mono shrink-0">{leader.xpPoints || 0} XP</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-500 text-center py-3">ምንም መረጃ አልተገኘም...</p>
                  )}
                </div>
              </div>

            </div>

          </div>
        )}
      </div>
    </div>
  );
}

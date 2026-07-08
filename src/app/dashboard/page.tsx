"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push("/login");
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };

    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19]">
        <div className="text-xl font-medium text-white animate-pulse">ማንነትዎን በማረጋገጥ ላይ...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-[#161B26]/40 backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          EyOS Academy
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400 hidden sm:inline">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 text-sm font-medium rounded-xl transition-all"
          >
            ውጣ (Logout)
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">እንኳን ደህና መጡ 👋</h2>
          <p className="text-gray-400">የእንግሊዝኛ ቋንቋ ትምህርቶን ከዚህ መከታተል ይችላሉ።</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 - Grammar with Link */}
          <div className="bg-[#161B26]/60 backdrop-blur-md border border-gray-800 p-6 rounded-2xl hover:border-indigo-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center text-indigo-400 font-bold mb-4 text-xl">
              01
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-indigo-400 transition-colors">Grammar & Speaking</h3>
            <p className="text-gray-400 text-sm mb-4">መሠረታዊ የእንግሊዝኛ ሰዋስው እና የዕለት ተዕለት የንግግር ልምምዶች።</p>
            <Link 
              href="/lessons/grammar" 
              className="block w-full text-center py-2.5 bg-indigo-600 hover:bg-indigo-700 font-medium rounded-xl transition-all"
            >
              ትምህርቱን ጀምር
            </Link>
          </div>

          {/* Card 2 */}
          <div className="bg-[#161B26]/60 backdrop-blur-md border border-gray-800 p-6 rounded-2xl hover:border-purple-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-400 font-bold mb-4 text-xl">
              02
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-purple-400 transition-colors">Vocabulary Builder</h3>
            <p className="text-gray-400 text-sm mb-4">ቃላትን በፍጥነት የሚያጠኑበት እና አጠቃቀማቸውን የሚለማመዱበት ክፍል።</p>
            <button className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 font-medium rounded-xl transition-all opacity-60 cursor-not-allowed">
              በቅርቡ የሚለቀቅ
            </button>
          </div>

          {/* Card 3 */}
          <div className="bg-[#161B26]/60 backdrop-blur-md border border-gray-800 p-6 rounded-2xl hover:border-emerald-500/50 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-emerald-600/20 flex items-center justify-center text-emerald-400 font-bold mb-4 text-xl">
              03
            </div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-emerald-400 transition-colors">AI Chat Tutor</h3>
            <p className="text-gray-400 text-sm mb-4">ከአርቴፊሻል ኢንተለጀንስ አስተማሪዎ ጋር በቀጥታ በድምፅ እና በጽሑፍ ይለማመዱ።</p>
            <button className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 font-medium rounded-xl transition-all opacity-60 cursor-not-allowed">
              በቅርቡ የሚለቀቅ
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

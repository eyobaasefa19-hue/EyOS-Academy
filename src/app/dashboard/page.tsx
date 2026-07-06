'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([
    { id: 1, text: "ሰላም! እኔ EyOS AI አስተማሪህ ነኝ። ዛሬ ምን መለማመድ ትፈልጋለህ? ሰዋስው (Grammar) ወይስ የዕለት ተዕለት ውይይት (Speaking)?", isAi: true }
  ]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);
      }
      setLoading(false);
    };
    checkUser();
  }, [router]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // User message
    const userMsg = { id: Date.now(), text: input, isAi: false };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Simulated AI Response (ይህንን ቆይተን ከእውነተኛ AI API ጋር እናገናኘዋለን)
    setTimeout(() => {
      const aiMsg = {
        id: Date.now() + 1,
        text: `Great choice! " ${input} " የሚለው ሀሳብ በጣም ጥሩ ነው። እስቲ በእንግሊዝኛ አረፍተ ነገር እንስራበት።`,
        isAi: true
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050b14] flex items-center justify-center text-gray-400">
        Loading Academy...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050b14] text-white flex flex-col max-w-lg mx-auto border-x border-gray-900 shadow-2xl relative">
      
      {/* Header */}
      <header className="p-4 border-b border-gray-900 bg-[#0f172a]/40 backdrop-blur-md flex justify-between items-center sticky top-0 z-10">
        <div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">EyOS AI Tutor</h1>
          <p className="text-[10px] text-gray-500">{user?.email}</p>
        </div>
        <button 
          onClick={handleLogout}
          className="text-xs bg-red-950/40 hover:bg-red-900/40 text-red-400 px-3 py-1.5 rounded-xl border border-red-900/50 transition"
        >
          ውጣ (Logout)
        </button>
      </header>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[65vh]">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isAi ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              msg.isAi 
                ? 'bg-[#0f172a] text-gray-200 border border-gray-800/60 rounded-tl-none' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none shadow-md shadow-blue-500/10'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Form Area */}
      <form onSubmit={handleSend} className="p-4 bg-[#050b14] border-t border-gray-900 sticky bottom-0 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type in English or Amharic..."
          className="flex-1 bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 placeholder-gray-600 transition"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 rounded-xl font-medium text-sm transition shadow-lg shadow-blue-600/20"
        >
          ላክ
        </button>
      </form>

    </div>
  );
}

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
  const [sending, setSending] = useState(false);

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

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || sending) return;

    const userText = input;
    setInput('');
    setSending(true);

    // 1. የተማሪውን መልእክት ስክሪን ላይ አሳይ
    const userMsg = { id: Date.now(), text: userText, isAi: false };
    setMessages((prev) => [...prev, userMsg]);

    try {
      // 2. እውነተኛውን የጌሚኒ API Route ጥራ
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/center' },
        body: JSON.stringify({ message: userText }),
      });
      
      const data = await res.json();
      
      // 3. የ AI መምህሩን እውነተኛ ምላሽ ስክሪን ላይ አሳይ
      const aiMsg = {
        id: Date.now() + 1,
        text: data.reply || data.error || "መምህሩ ምላሽ አልሰጠም።",
        isAi: true
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [...prev, { id: Date.now() + 1, text: "ግንኙነት ተቋርጧል።", isAi: true }]);
    } finally {
      setSending(false);
    }
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
      <header className="p-4 border-b border-gray-900 bg-[#0f172a]/40 backdrop-blur-md flex justify-between items-center sticky top-0 z-10">
        <div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">EyOS AI Tutor</h1>
          <p className="text-[10px] text-gray-500">{user?.email}</p>
        </div>
        <button onClick={handleLogout} className="text-xs bg-red-950/40 hover:bg-red-900/40 text-red-400 px-3 py-1.5 rounded-xl border border-red-900/50 transition">
          ውጣ (Logout)
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[65vh]">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isAi ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.isAi ? 'bg-[#0f172a] text-gray-200 border border-gray-800/60 rounded-tl-none' : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-none shadow-md'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {sending && (
          <div className="flex justify-start">
            <div className="bg-[#0f172a] text-gray-400 text-xs rounded-2xl px-4 py-2 italic animate-pulse">
              AI መምህሩ እያሰበ ነው...
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-4 bg-[#050b14] border-t border-gray-900 sticky bottom-0 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={sending ? "Responding..." : "Type in English or Amharic..."}
          disabled={sending}
          className="flex-1 bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 placeholder-gray-600 transition"
        />
        <button type="submit" disabled={sending} className="bg-blue-600 hover:bg-blue-500 text-white px-5 rounded-xl font-medium text-sm transition disabled:opacity-50">
          {sending ? "..." : "ላክ"}
        </button>
      </form>
    </div>
  );
}

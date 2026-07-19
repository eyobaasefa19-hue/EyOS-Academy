'use client';

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { supabase } from "../../../lib/supabase";
import { Send, Bot, User, ArrowLeft, Loader2 } from "lucide-react";

export default function AIChatLesson() {
  const router = useRouter();
  const [messages, setMessages] = useState([
    { id: 1, sender: "ai", text: "Hello! I am your AI English Tutor. Let's practice English. Tell me about yourself or ask me anything!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // የባለቤትነት እና የ XP መረጃዎች
  const [user, setUser] = useState<any>(null);
  const [showXpAlert, setShowXpAlert] = useState(false); 
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ተጠቃሚውን ከ Supabase ማረጋገጥ
  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    getUser();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    const userMessage = { id: messages.length + 1, sender: "user", text: userText };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch");
      }

      const aiMessage = {
        id: Date.now(),
        sender: "ai",
        text: data.reply
      };
      setMessages((prev) => [...prev, aiMessage]);

      // 🌟 የ Supabase XP ነጥብ መጨመሪያ ሎጂክ 🌟
      if (user) {
        const { data: profile } = await supabase
          .from('UserProfile')
          .select('xpPoints')
          .eq('id', user.id)
          .single();

        const currentXP = profile?.xpPoints || 0;
        const newXP = currentXP + 10; // ለእያንዳንዱ ቻት 10 XP

        await supabase
          .from('UserProfile')
          .update({ xpPoints: newXP })
          .eq('id', user.id);

        setShowXpAlert(true);
        setTimeout(() => setShowXpAlert(false), 3000);
      }

    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: "ai", text: "የግንኙነት ችግር አጋጥሟል። እባክህ መስመርህን አረጋግጠህ እንደገና ሞክር።" }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col font-sans relative text-white">
      
      {/* 🌟 የ XP መጨመሩን የሚያሳውቅ ባውንሲንግ አኒሜሽን 🌟 */}
      {showXpAlert && (
        <div className="fixed top-20 right-1/2 translate-x-1/2 z-50 bg-amber-500 text-white text-sm font-bold px-5 py-2 rounded-full animate-bounce shadow-lg shadow-amber-500/50">
          +10 XP አግኝተዋል! 🎉
        </div>
      )}

      {/* ሄደር ባር */}
      <header className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> ወደ ዳሽቦርድ
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <Bot className="w-4 h-4 text-emerald-400" />
            </div>
            <h1 className="text-white font-bold text-sm tracking-wide">Lesson 03: AI Tutor</h1>
          </div>
        </div>
      </header>

      {/* የቻት መድረክ */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6 max-w-3xl mx-auto w-full pb-32">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0 mt-1">
                <Bot className="w-4 h-4 text-emerald-400" />
              </div>
            )}
            <div className={`p-4 rounded-2xl max-w-[85%] text-sm leading-relaxed shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-sm' 
                : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-sm'
            }`}>
              {/* ያንተ ውብ ማርክዳውን ፓርሰር */}
              <ReactMarkdown 
                className="text-sm space-y-2 text-gray-200 break-words"
                components={{
                  strong: ({node, ...props}) => <strong className="font-bold text-emerald-400 inline" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-1 my-2 block" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-5 space-y-1 my-2 block" {...props} />,
                  li: ({node, ...props}) => <li className="list-item" {...props} />,
                  p: ({node, ...props}) => <p className="mb-1 leading-relaxed" {...props} />
                }}
              >
                {msg.text}
              </ReactMarkdown>
            </div>
            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-md shrink-0 mt-1">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
        
        {/* AI በሚያስብበት ጊዜ የሚታይ የጭነት አኒሜሽን */}
        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shrink-0">
              <Bot className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex gap-1.5 items-center rounded-tl-sm">
              <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-75" />
              <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce delay-150" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* የፅሁፍ መፃፊያ ፎርም */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/90 backdrop-blur-md border-t border-slate-800">
        <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto relative flex items-end gap-2">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isTyping ? "አስተማሪዎ እየመረመረ ነው..." : "እዚህ ጋር ይጻፉ..."}
            className="w-full bg-slate-900 border border-slate-800 rounded-2xl pl-5 pr-14 py-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50"
            disabled={isTyping}
          />
          <button 
            type="submit"
            disabled={isTyping || !input.trim()}
            className="absolute right-2 bottom-2 w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 flex items-center justify-center text-white transition-colors"
          >
            {isTyping ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 ml-1" />}
          </button>
        </form>
      </div>
    </div>
  );
}

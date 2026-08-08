'use client';

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { supabase } from "../../../lib/supabase"; 
import { Send, Bot, User, ArrowLeft, Loader2 } from "lucide-react";

export default function AIChatLesson() {
  const router = useRouter();
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: "ai", 
      text: "Hello! I am your AI English Tutor. Let's practice English. Tell me about yourself or ask me anything!" 
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  const [user, setUser] = useState<any>(null);
  const [showXpAlert, setShowXpAlert] = useState(false); 
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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

      if (user) {
        const xpResponse = await fetch('/api/update-xp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id }),
        });

        if (xpResponse.ok) {
          setShowXpAlert(true);
          setTimeout(() => setShowXpAlert(false), 3000);
        }
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
    // 🌟 ዋናው መፍትሄ እዚህ ጋር ነው፡ pb-[80px] ተጨምሯል ከስር ላለው ማውጫ ቦታ እንዲተው 🌟
    <div className="h-[100dvh] pb-[80px] bg-[#0B1120] flex flex-col font-sans relative text-white overflow-hidden">
      
      {showXpAlert && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold px-6 py-2.5 rounded-full animate-bounce shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center gap-2 border border-amber-400/50">
          <span>+10 XP አግኝተዋል!</span>
          <span className="text-lg">🎉</span>
        </div>
      )}

      {/* ሄደር ባር */}
      <header className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/60 p-4 shrink-0 z-10 sticky top-0">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-all duration-300 text-sm font-medium hover:-translate-x-1"
          >
            <ArrowLeft className="w-4 h-4" /> ወደ ዳሽቦርድ
          </button>
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <h1 className="text-slate-200 font-semibold text-xs tracking-wider uppercase">AI Tutor</h1>
          </div>
        </div>
      </header>

      {/* የቻት መድረክ */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 max-w-3xl mx-auto w-full scroll-smooth">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex gap-3 max-w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center border border-emerald-500/30 shrink-0 mt-1 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                <Bot className="w-4 h-4 text-emerald-400" />
              </div>
            )}
            <div className={`px-4 py-3 rounded-2xl max-w-[85%] sm:max-w-[75%] text-[15px] leading-relaxed shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-blue-600 text-white rounded-br-sm' 
                : 'bg-slate-800/60 border border-slate-700/50 text-slate-200 rounded-bl-sm backdrop-blur-sm'
            }`}>
              <ReactMarkdown 
                className="space-y-3 break-words"
                components={{
                  strong: ({node, ...props}) => <strong className={`${msg.sender === 'ai' ? 'text-emerald-400' : 'text-white'} font-bold`} {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-1.5 my-2 block marker:text-emerald-500" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-5 space-y-1.5 my-2 block marker:text-emerald-500" {...props} />,
                  li: ({node, ...props}) => <li className="pl-1" {...props} />,
                  p: ({node, ...props}) => <p className="mb-0 whitespace-pre-wrap" {...props} />,
                  code: ({node, ...props}) => <code className="bg-slate-950/50 text-emerald-300 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
                }}
              >
                {msg.text}
              </ReactMarkdown>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3 justify-start animate-in fade-in duration-300">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500/20 to-teal-500/10 flex items-center justify-center border border-emerald-500/30 shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
              <Bot className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="px-5 py-4 rounded-2xl bg-slate-800/60 border border-slate-700/50 flex gap-1.5 items-center rounded-bl-sm backdrop-blur-sm">
              <div className="w-2 h-2 bg-emerald-500/50 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-emerald-500/50 rounded-full animate-bounce delay-150" />
              <div className="w-2 h-2 bg-emerald-500/50 rounded-full animate-bounce delay-300" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-2" />
      </main>

      {/* የፅሁፍ መፃፊያ ፎርም */}
      <div className="w-full bg-slate-900/95 backdrop-blur-xl border-t border-slate-800/80 shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] z-10">
        <div className="p-3 md:p-4 max-w-3xl mx-auto">
          <form onSubmit={handleSendMessage} className="relative flex items-end gap-2 bg-slate-950/50 p-1.5 rounded-3xl border border-slate-800 focus-within:border-slate-600 focus-within:ring-2 focus-within:ring-slate-800/50 transition-all duration-300">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isTyping ? "አስተማሪዎ እየመረመረ ነው..." : "እዚህ ጋር ይጻፉ..."}
              className="w-full bg-transparent pl-4 pr-12 py-3.5 text-[15px] text-white placeholder-slate-500 focus:outline-none transition-all disabled:opacity-50"
              disabled={isTyping}
              autoComplete="off"
            />
            <button 
              type="submit"
              disabled={isTyping || !input.trim()}
              className="absolute right-2.5 bottom-2.5 w-[38px] h-[38px] rounded-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 flex items-center justify-center text-white transition-all duration-200 active:scale-90 shadow-md disabled:shadow-none"
            >
              {isTyping ? (
                <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
              ) : (
                <Send className="w-4 h-4 ml-0.5" />
              )}
            </button>
          </form>
        </div>
      </div>
      
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";

export default function AIChatLesson() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "ai", text: "Hello! I am your AI English Tutor. How can I help you practice your English today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // የተማሪውን መልዕክት መጋበዝ
    const userMessage = { id: messages.length + 1, sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // የ AI አውቶማቲክ ምላሽ (ለጊዜው Mock-up)
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        sender: "ai",
        text: `Great sentence! " ${input} " is a good way to start. Let's keep practicing! Can you tell me more about your day?`
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-4 sm:p-6 flex flex-col">
      <div className="max-w-3xl w-full mx-auto flex-1 flex flex-col">
        
        <div>
          <Link href="/dashboard" className="text-indigo-400 hover:underline mb-4 inline-block">
            ← ወደ ዳሽቦርድ ይመለሱ
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-indigo-400 bg-clip-text text-transparent mb-1">
            Lesson 03: AI Chat Tutor
          </h1>
          <p className="text-sm text-gray-400 mb-6">ከአርቴፊሻል ኢንተለጀንስ አስተማሪዎ ጋር በቀጥታ በጽሑፍ ይለማመዱ።</p>
        </div>

        {/* Chat Interface Box */}
        <div className="flex-1 bg-[#161B26]/40 backdrop-blur-md border border-gray-800 rounded-2xl flex flex-col h-[500px] overflow-hidden">
          
          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                    msg.sender === "user"
                      ? "bg-indigo-600 text-white rounded-tr-none"
                      : "bg-[#161B26] border border-gray-800 text-gray-200 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Form */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800 flex gap-2 bg-[#161B26]/60">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message in English..."
              className="flex-1 bg-[#0B0F19] border border-gray-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 font-medium rounded-xl text-sm transition-all"
            >
              Send
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

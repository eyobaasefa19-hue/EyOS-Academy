"use client";

import { useState } from "react";
import Link from "next/link";

export default function AIChatLesson() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "ai", text: "Hello! I am your AI English Tutor. Let's practice English. Tell me about yourself or ask me anything!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input;
    const userMessage = { id: messages.length + 1, sender: "user", text: userText };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error("API Key is missing.");
      }

      // v1beta ወደ v1 በመቀየር አስተማማኝ የጥሪ መስመር መጠቀም
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a friendly and helpful English Language Tutor for an Ethiopian student. Chat with them in simple English, correct their grammar gently if they make mistakes, and explain things in Amharic only when necessary. User message: ${userText}`
                  }
                ]
              }
            ]
          })
        }
      );

      if (!response.ok) {
        throw new Error("API response was not OK");
      }

      const data = await response.json();
      const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I am sorry, I couldn't understand that. Let's try again!";

      const aiMessage = {
        id: messages.length + 2,
        sender: "ai",
        text: aiText
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { id: messages.length + 2, sender: "ai", text: "Something went wrong. Please check your network or API settings." }
      ]);
    } finally {
      setIsTyping(false);
    }
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
          <p className="text-sm text-gray-400 mb-6">ከእውነተኛ አርቴፊሻል ኢንተለጀንስ አስተማሪዎ ጋር በቀጥታ ይለማመዱ።</p>
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
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm whitespace-pre-wrap ${
                    msg.sender === "user"
                      ? "bg-indigo-600 text-white rounded-tr-none"
                      : "bg-[#161B26] border border-gray-800 text-gray-200 rounded-tl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#161B26] border border-gray-800 text-gray-400 text-xs rounded-2xl rounded-tl-none px-4 py-2 animate-pulse">
                  AI አስተማሪዎ እየጻፈ ነው...
                </div>
              </div>
            )}
          </div>

          {/* Chat Input Form */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800 flex gap-2 bg-[#161B26]/60">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isTyping}
              placeholder={isTyping ? "Waiting for response..." : "Type your message in English..."}
              className="flex-1 bg-[#0B0F19] border border-gray-800 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isTyping}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 font-medium rounded-xl text-sm transition-all disabled:opacity-50"
            >
              Send
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}

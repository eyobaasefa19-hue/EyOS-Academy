"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(`❌ ስህተት፦ ${error.message}`);
    } else {
      setMessage("✅ የምዝገባ መልእክት በተሳካ ሁኔታ ተልኳል! እባክህ ኢሜይልህን ቼክ አድርግ።");
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] px-4">
      <div className="w-full max-w-md bg-[#161B26]/60 backdrop-blur-md border border-gray-800 p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-white mb-2">EyOS Academy</h2>
        <p className="text-center text-gray-400 text-sm mb-6">አዲስ አካውንት በመክፈት እንግሊዝኛ መማር ይጀምሩ</p>
        
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">ኢሜይል (Email)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full px-4 py-3 bg-[#0B0F19] border border-gray-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">የይለፍ ቃል (Password)</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[#0B0F19] border border-gray-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 transition-colors"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/30 disabled:opacity-50"
          >
            {loading ? "በማረጋገጥ ላይ..." : "ይመዝገቡ (Sign Up)"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm font-medium text-gray-200 bg-gray-800/50 p-2 rounded-lg">
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-gray-400">
          አካውንት አለዎት?{" "}
          <Link href="/login" className="text-indigo-400 hover:underline">
            ይግቡ (Login)
          </Link>
        </p>
      </div>
    </div>
  );
}

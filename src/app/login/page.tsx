"use client";

import { useState } from "react";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // የ Supabase Browser Client (ቶከኑን በ Cookie ውስጥ ሴቭ እንዲያደርግልን)
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // የ Supabase ስህተቶችን ወደ አማርኛ መቀየር
        if (error.message.includes("Invalid login credentials")) {
          setErrorMsg("የተሳሳተ ኢሜይል ወይም የይለፍ ቃል አስገብተዋል!");
        } else {
          setErrorMsg(error.message);
        }
        setLoading(false);
      } else {
        setSuccessMsg("በተሳካ ሁኔታ ገብተዋል! ወደ ዳሽቦርድ በመጓዝ ላይ...");
        
        // ራውተር ከመጠቀም ይልቅ አድሶ በሙሉ ገጽ እንልከዋለን (Cookie በትክክል እንዲነበብ)
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 800);
      }
    } catch (err) {
      setErrorMsg("ያልተጠበቀ ስህተት አጋጥሟል። እባክዎ እንደገና ይሞክሩ።");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050b14] px-4 relative overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-[#0f172a]/80 backdrop-blur-xl border border-gray-800 p-8 rounded-3xl shadow-2xl z-10">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
            EyOS Academy
          </h2>
          <p className="text-gray-400 text-sm">እንኳን ደህና መጡ! ኢሜይልና የይለፍ ቃልዎን ያስገቡ</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-300">ኢሜይል (Email)</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full pl-11 pr-4 py-3 bg-[#050b14]/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-gray-300">የይለፍ ቃል (Password)</label>
              <Link href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">
                ረሱት?
              </Link>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-12 py-3 bg-[#050b14]/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          {/* Messages */}
          {errorMsg && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm animate-fade-in">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <p>{errorMsg}</p>
            </div>
          )}
          {successMsg && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm animate-fade-in">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <p>{successMsg}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-indigo-600/25 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>በማረጋገጥ ላይ...</span>
              </>
            ) : (
              "ይግቡ (Login)"
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400">
            አካውንት የለዎትም?{" "}
            <Link href="/signup" className="text-indigo-400 font-semibold hover:text-indigo-300 hover:underline transition-all">
              አዲስ ይመዝገቡ
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabase';
import { LogOut, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkUser() {
      if (!supabase) return;
      const { data: { user: authUser } } = await supabase.auth.getUser();
      setUser(authUser);
    }
    checkUser();

    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
      });
      return () => subscription.unsubscribe();
    }
  }, []);

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut();
      router.push('/');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-[#090d16]/85 backdrop-blur-md px-4 py-3.5 sm:px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo Section */}
        <div className="flex items-center space-x-1.5 shrink-0">
          <span className="text-xl sm:text-2xl font-black tracking-wider bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">EyOS</span>
          <span className="text-[11px] sm:text-sm font-semibold bg-gray-800 text-blue-400 px-2 py-0.5 rounded-full">Academy</span>
        </div>
        
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#tutor" className="hover:text-white transition">AI Tutor</a>
        </div>

        {/* 🌟 Dynamic Auth Buttons (Optimized for Mobile Touch) 🌟 */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <>
              {/* Dashboard Button: Now styled as a proper, highly-clickable button on all devices */}
              <Link 
                href="/dashboard" 
                className="bg-slate-900/90 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold px-2.5 py-2 rounded-xl transition-all flex items-center gap-1.5 active:scale-95 shrink-0"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[11px] sm:text-xs">Dashboard</span>
              </Link>
              
              {/* Sign Out Button */}
              <button 
                onClick={handleSignOut}
                className="bg-slate-900/90 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-semibold px-2.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-md active:scale-95 shrink-0"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">Sign Out</span>
                <span className="sm:hidden text-[11px]">Exit</span>
              </button>
            </>
          ) : (
            <Link 
              href="/signup" 
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all inline-block shadow-lg active:scale-95"
            >
              Get Started 🚀
            </Link>
          )}
        </div>

      </div>
    </nav>
  );
}

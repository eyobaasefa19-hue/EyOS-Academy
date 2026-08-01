'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import { 
  LogOut, 
  LayoutDashboard, 
  BookOpen, 
  User as UserIcon, 
  ShieldCheck, 
  Menu, 
  X,
  Sparkles
} from 'lucide-react';

const NAV_LINKS = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Courses', path: '/courses', icon: BookOpen },
  { name: 'Profile', path: '/profile', icon: UserIcon },
  { name: 'Admin', path: '/admin', icon: ShieldCheck },
] as const;

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    let isMounted = true;

    async function checkUser() {
      if (!supabase) return;
      try {
        const { data: { user: authUser }, error } = await supabase.auth.getUser();
        if (error) {
          console.error('Error fetching auth user:', error.message);
        }
        if (isMounted) {
          setUser(authUser ?? null);
        }
      } catch (err) {
        console.error('Unexpected error checking auth status:', err);
      }
    }

    checkUser();

    if (supabase) {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (isMounted) {
          setUser(session?.user ?? null);
        }
      });

      return () => {
        isMounted = false;
        subscription.unsubscribe();
      };
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSignOut = async () => {
    if (supabase) {
      try {
        await supabase.auth.signOut();
        router.push('/');
      } catch (err) {
        console.error('Error signing out:', err);
      }
    }
  };

  const handleDashboardNavigation = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname === '/dashboard') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push('/dashboard');
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* 1. TOP NAVBAR FOR DESKTOP & TABLETS */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#050b14]/90 backdrop-blur-2xl px-4 py-3 sm:px-6 select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo Section */}
          <div 
            onClick={() => router.push('/')} 
            className="flex items-center space-x-2 shrink-0 cursor-pointer active:scale-95 transition-transform"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)]">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black tracking-wider bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">EyOS</span>
            </div>
            <span className="text-[10px] font-bold bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 px-2 py-0.5 rounded-full">Academy</span>
          </div>
          
          {/* Desktop Navigation Links */}
          {user && (
            <div className="hidden md:flex items-center space-x-1.5 bg-slate-900/80 border border-white/10 p-1.5 rounded-2xl">
              {NAV_LINKS.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);
                return (
                  <button
                    key={link.path}
                    onClick={(e) => {
                      if (link.path === '/dashboard') handleDashboardNavigation(e);
                      else router.push(link.path);
                    }}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      active 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Dynamic Auth Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <>
                <button 
                  onClick={handleSignOut}
                  className="bg-slate-900 hover:bg-rose-500/10 border border-white/10 hover:border-rose-500/30 text-slate-300 hover:text-rose-400 text-xs font-bold px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
                  style={{ touchAction: 'manipulation' }}
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-400" />
                  <span className="hidden sm:inline">Sign Out</span>
                  <span className="sm:hidden text-[11px]">Exit</span>
                </button>

                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 text-slate-300 hover:text-white bg-slate-900 border border-white/10 rounded-xl"
                  aria-label="Toggle Menu"
                >
                  {isMobileMenuOpen ? <X className="w-4 h-4 text-rose-400" /> : <Menu className="w-4 h-4" />}
                </button>
              </>
            ) : (
              <button 
                onClick={() => router.push('/signup')}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-lg active:scale-95 cursor-pointer"
                style={{ touchAction: 'manipulation' }}
              >
                Get Started 🚀
              </button>
            )}
          </div>

        </div>

        {/* Mobile Dropdown Menu (Top) */}
        {user && isMobileMenuOpen && (
          <div className="md:hidden mt-3 border-t border-white/10 pt-3 pb-2 space-y-1 bg-[#090d16] rounded-b-2xl animate-in slide-in-from-top-2">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <button
                  key={link.path}
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    if (link.path === '/dashboard') handleDashboardNavigation(e);
                    else router.push(link.path);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    active 
                      ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' 
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                </button>
              );
            })}
          </div>
        )}
      </nav>

      {/* 2. MOBILE BOTTOM NAVIGATION BAR (ለስልክ ተጠቃሚዎች) */}
      {user && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#050b14]/95 backdrop-blur-2xl border-t border-white/10 px-4 py-2">
          <div className="flex items-center justify-around max-w-md mx-auto">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <button
                  key={link.path}
                  onClick={(e) => {
                    if (link.path === '/dashboard') handleDashboardNavigation(e);
                    else router.push(link.path);
                  }}
                  className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                    active ? 'text-indigo-400 font-bold scale-105' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span className="text-[10px] tracking-tight">{link.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

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
  X 
} from 'lucide-react';

// Declared outside component scope to prevent memory re-allocation on re-renders
const NAV_LINKS = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Courses', path: '/courses', icon: BookOpen },
  { name: 'Profile & Certs', path: '/profile', icon: UserIcon },
  { name: 'Admin Panel', path: '/admin', icon: ShieldCheck },
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
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-[#090d16]/90 backdrop-blur-md px-4 py-3 sm:px-6 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo Section */}
        <div 
          onClick={() => router.push('/')} 
          className="flex items-center space-x-1.5 shrink-0 cursor-pointer active:scale-95 transition-transform"
        >
          <span className="text-xl sm:text-2xl font-black tracking-wider bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-400 bg-clip-text text-transparent">EyOS</span>
          <span className="text-[11px] sm:text-xs font-semibold bg-blue-500/10 border border-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">Academy</span>
        </div>
        
        {/* Desktop Navigation Links */}
        {user && (
          <div className="hidden md:flex items-center space-x-1 bg-gray-900/80 border border-gray-800 p-1 rounded-2xl">
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
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    active 
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
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
              {/* Sign Out Button */}
              <button 
                onClick={handleSignOut}
                className="bg-slate-900/90 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-750 text-slate-300 text-xs font-semibold px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow-md active:scale-95 shrink-0 cursor-pointer"
                style={{ touchAction: 'manipulation' }}
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span className="hidden sm:inline">Sign Out</span>
                <span className="sm:hidden text-[11px]">Exit</span>
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-300 hover:text-white bg-slate-900 border border-slate-800 rounded-xl"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4 text-gray-300" /> : <Menu className="w-4 h-4 text-gray-300" />}
              </button>
            </>
          ) : (
            <button 
              onClick={() => router.push('/signup')}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all inline-block shadow-lg active:scale-95 cursor-pointer"
              style={{ touchAction: 'manipulation' }}
            >
              Get Started 🚀
            </button>
          )}
        </div>

      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {user && isMobileMenuOpen && (
        <div className="md:hidden mt-3 border-t border-gray-800 pt-3 pb-2 space-y-1 bg-[#090d16] rounded-b-2xl animate-in slide-in-from-top-2">
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
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30' 
                    : 'text-gray-300 hover:bg-gray-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-blue-400' : 'text-gray-400'}`} />
                <span>{link.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}

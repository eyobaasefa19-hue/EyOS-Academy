import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-[#090d16]/80 backdrop-blur-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">EyOS</span>
          <span className="text-sm font-semibold bg-gray-800 text-blue-400 px-2 py-0.5 rounded-full">Academy</span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#tutor" className="hover:text-white transition">AI Tutor</a>
        </div>
        <div>
          <Link href="/signup" className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all inline-block">
            Get Started 🚀
          </Link>
        </div>
      </div>
    </nav>
  );
}

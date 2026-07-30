import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. ተጠቃሚው የትኛው ገፅ ላይ መግባት እንደፈለገ መለየት
  const path = request.nextUrl.pathname;

  // 2. ጥበቃ የሚፈልጉ ገፆች (Protected Routes)
  const isProtectedRoute = path.startsWith('/dashboard') || path.startsWith('/admin');

  // 3. የተጠቃሚውን ሎጊን መረጃ ከ ኩኪ (Cookies) መፈለግ
  // Supabase ሎጊን ሲያደርግ ኩኪ ያስቀምጣል፣ እሱን ቼክ እናደርጋለን
  const session = request.cookies.get('sb-access-token') || request.cookies.get('supabase-auth-token');

  // 4. ተጠቃሚው ሎጊን ካላደረገ እና ወደ ተከለከለ ገፅ ለመግባት ከሞከረ
  if (isProtectedRoute && !session) {
    // በቀጥታ ወደ መግቢያ (login) ገፅ እንመልሰዋለን
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // ችግር ከሌለ ወደ ፈለገው ገፅ እንዲያልፍ እንፈቅዳለን
  return NextResponse.next();
}

// ሚድልዌሩ የትኞቹ ገፆች ላይ ብቻ እንደሚሰራ መወሰኛ (Matcher)
export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/admin/:path*'
  ],
};

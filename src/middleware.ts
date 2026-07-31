import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // @supabase/supabase-js ቶከኑን localStorage ውስጥ ስለሚያስቀምጥ
  // ሚድልዌር ኩኪ ባለመኖሩ ዳሽቦርዱን እንዳይዘጋ በቀጥታ እንዲያሳልፍ እናደርገዋለን።
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/admin/:path*'
  ],
};

import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  // የ Next.js response ሪኩዌስቱን ተቀብሎ እናዘጋጃለን
  let supabaseResponse = NextResponse.next({
    request,
  });

  // Supabase SSR Client መፍጠር
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // ኩኪዎችን በ request ውስጥ ማስገባት
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          // ኩኪዎችን በ response ውስጥ ማስገባት
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // ተጠቃሚው ወደ አካውንቱ መግባቱን (Log in) ማረጋገጥ
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ተጠቃሚው ካልገባ እና የተከለከሉ (Protected) ገፆች ላይ መግባት ከፈለገ ወደ መግቢያ ገፅ (Login) እንመልሰዋለን
  if (
    !user &&
    (request.nextUrl.pathname.startsWith('/dashboard') ||
      request.nextUrl.pathname.startsWith('/admin'))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // ተጠቃሚው ትክክለኛ ከሆነ ወደ ፈለገው ገፅ እንዲያልፍ ይደረጋል
  return supabaseResponse;
}

export const config = {
  matcher: [
    // መከላከል የምንፈልጋቸው የገፅ መስመሮች
    '/dashboard/:path*',
    '/admin/:path*',
  ],
};

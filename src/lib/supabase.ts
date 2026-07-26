import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Fail-fast: Environment variables ከሌሉ ግልጽ የሆነ ስህተት (Error) በማውጣት ያስጠነቅቃል
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '⚠️ Missing Supabase environment variables! Please check your .env file for NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ከላይ ከሌሎች ኢምፖርቶች ጋር ይህን ጨምር (የፋይሉን ሎኬሽን እንዳንተ ፎልደር አቀማመጥ አስተካክለው)
import { supabase } from "../../../lib/supabase";

// ... (ውስጥ ላይ ያለውን ፋንክሽን በዚህ ተካው) ...

const handleCompleteLesson = async () => {
  setIsClaiming(true);

  try {
    // 1. የገባውን ተጠቃሚ (User) መለየት
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      // 2. አሁን ያለውን የ XP መጠን ከዳታቤዝ ማምጣት
      const { data: profile, error: fetchError } = await supabase
        .from('UserProfile')
        .select('xpPoints')
        .eq('id', user.id)
        .single();

      if (fetchError) throw fetchError;

      const currentXP = profile?.xpPoints || 0;

      // 3. አዲሱን 50 XP ደምሮ ዳታቤዙን አፕዴት ማድረግ
      const { error: updateError } = await supabase
        .from('UserProfile')
        .update({ xpPoints: currentXP + 50 })
        .eq('id', user.id);

      if (updateError) throw updateError;
    }

    // ሁሉም ሲሳካ ወደ ዳሽቦርድ መመለስ
    router.push("/dashboard");
    router.refresh(); // ዳሽቦርዱ አዲሱን ነጥብ እንዲያነብ ሪፍሬሽ ያደርገዋል
  } catch (error) {
    console.error("Error claiming XP:", error);
  } finally {
    setIsClaiming(false);
  }
};

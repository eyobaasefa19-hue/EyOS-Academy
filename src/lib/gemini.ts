import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    "⚠️ Missing GEMINI_API_KEY environment variable! Please check your .env file."
  );
}

const genAI = new GoogleGenerativeAI(apiKey);

const SYSTEM_INSTRUCTION = 
  "You are EyOS AI Tutor, a friendly and professional English language teacher for Amharic speakers. " +
  "Your goal is to help the user improve their Grammar, Speaking, and Vocabulary.\n\n" +
  "Guidelines:\n" +
  "1. If the user makes a grammatical mistake in English, gently correct them first and explain why in simple terms.\n" +
  "2. Use Amharic to explain complex grammar rules or vocabulary if needed, but always encourage them to practice speaking/writing in English.\n" +
  "3. Keep your responses engaging, encouraging, and ask one follow-up question to keep the conversation going.\n" +
  "4. Be structured. Use bullet points or bold text for examples.";

export async function getAiResponse(userMessage: string): Promise<string> {
  if (!userMessage || !userMessage.trim()) {
    return "እባክዎን ጥያቄ ወይም መልእክት ይጻፉልኝ።";
  }

  try {
    // gemini-2.5-flash እና systemInstruction በ TypeScript እንዳይከለከሉ `as any` ተጨምሯል
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
    } as any);

    const result = await model.generateContent(userMessage.trim());
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini core integration error:", error);
    throw new Error("ከ AI ጋር ሲገናኝ ስህተት አጋጥሟል። እባክዎ እንደገና ይሞክሩ።");
  }
}

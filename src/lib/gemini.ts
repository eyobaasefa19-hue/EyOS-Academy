import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("Missing GEMINI_API_KEY environment variable");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

export async function getAiResponse(userMessage: string): Promise<string> {
  try {
    // እዚህ ጋር ሞዴሉን እናነሳለን
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    // ለጌሚኒ የሚሰጥ ጥብቅ መመሪያ (System Prompt)
    const systemInstruction = 
      "You are EyOS AI Tutor, a friendly and professional English language teacher for Amharic speakers. " +
      "Your goal is to help the user improve their Grammar, Speaking, and Vocabulary. " +
      "Guidelines:\n" +
      "1. If the user makes a grammatical mistake in English, gently correct them first and explain why in simple terms.\n" +
      "2. Use Amharic to explain complex grammar rules or vocabulary if needed, but always encourage them to practice speaking/writing in English.\n" +
      "3. Keep your responses engaging, encouraging, and ask one follow-up question to keep the conversation going.\n" +
      "4. Be structured. Use bullet points or bold text for examples.";

    // መልእክቱን ከነ መመሪያው አብረን እንልካለን
    const result = await model.generateContent([
      { text: systemInstruction },
      { text: `User message: ${userMessage}` }
    ]);
    
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini core integration error:", error);
    throw error;
  }
}

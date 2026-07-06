import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function getAiResponse(message: string) {
  try {
    // ይበልጥ ተኳሃኝ የሆነውን gemini-pro ሞዴል እንጠቀማለን
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `You are EyOS AI Tutor, a friendly English language teacher for Amharic speakers. 
    Your goal is to help students learn English grammar, vocabulary, and speaking.
    If the user writes in Amharic or English, respond in a mix of both to help them learn.
    Correct their mistakes gently and provide a simple explanation in Amharic.
    Keep your response short and suitable for a mobile screen.

    User message: ${message}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "ይቅርታ፣ ከ AI አስተማሪው ጋር ለመገናኘት አልተቻለም። እባክህ ድጋሚ ሞክር!";
  }
}

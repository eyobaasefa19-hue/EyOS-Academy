import { GoogleGenerativeAI } from "@google/generative-ai";

// በVercel ላይ ያስቀመጥነውን ቁልፍ ይጠራል
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function getAiResponse(message: string) {
  // የቅርብ ጊዜውን ፈጣን ሞዴል እንጠቀማለን
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `You are EyOS AI Tutor, a friendly, encouraging, and expert English language teacher specifically for Amharic speakers. 
  Your goal is to help students learn English grammar, vocabulary, writing, and speaking.
  
  Guidelines:
  1. If the user writes in Amharic or a mix of English and Amharic, understand it perfectly and reply in a helpful mix of both languages (using Amharic for explanations and instructions).
  2. If they make a grammatical error in English, gently point it out, show the corrected version, and explain why in simple Amharic.
  3. Keep your answers engaging, short, and optimized for a mobile chat UI screen. Always end with a question or a practice prompt to keep the conversation going.

  User message: ${message}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "ይቅርታ፣ ከ AI መምህሩ ጋር ለመገናኘት ትንሽ ችግር አጋጥሟል። እባክህ ድጋሚ ይሞክሩ!";
  }
}

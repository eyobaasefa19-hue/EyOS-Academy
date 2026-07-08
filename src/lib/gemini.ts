import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("Missing GEMINI_API_KEY environment variable");
}

// እዚህ ጋር ሙሉ ስሙን 'GoogleGenerativeAI' በመጠቀም እንቀሰቅሰዋለን
const genAI = new GoogleGenerativeAI(apiKey || "");

export async function getAiResponse(userMessage: string): Promise<string> {
  try {
    // በቪርሴል ኤጅ ላይ በፍጥነት የሚሰራው ሞዴል
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini core integration error:", error);
    throw error;
  }
}

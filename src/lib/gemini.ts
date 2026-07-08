import { GoogleGenAI } from "@google/generative-ai";

// ቁልፉን በቀጥታ ከኢንቫይሮንመንት ተለዋዋጭ ያነባል
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("Missing GEMINI_API_KEY environment variable");
}

// አዲሱን የጌሚኒ መዋቅር እዚህ ላይ እንቀሰቅሰዋለን
const ai = new GoogleGenAI({ apiKey });

export async function getAiResponse(userMessage: string): Promise<string> {
  try {
    // እዚህ ጋር ሞዴሉን 'gemini-1.5-flash' ወይም የያዝከውን ስም ማረጋገጥ ትችላለህ
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini core integration error:", error);
    throw error;
  }
}

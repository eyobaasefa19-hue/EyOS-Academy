import { GoogleGenAI } from "@google/generative-ai";

// ለደህንነት ሲባል ቁልፉ መኖሩን እናረጋግጣለን
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("Missing GEMINI_API_KEY environment variable");
}

// በጣም ቀላሉ እና ትክክለኛው የጌሚኒ አነሳስ መዋቅር
const ai = new GoogleGenAI({ apiKey: apiKey || "" });

export async function getAiResponse(userMessage: string): Promise<string> {
  try {
    // ቪርሴል ኤጅ ላይ በፈጣን ፍጥነት የሚሰራው ሞዴል
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: userMessage }] }]
    });
    
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini core integration error:", error);
    throw error;
  }
}

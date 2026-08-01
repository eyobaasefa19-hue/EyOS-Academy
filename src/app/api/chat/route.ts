import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ተማሪዎች ሲፅፉ ስህተታቸውን 100% በ 3 ደረጃ አርሞ የሚያስተምር ጥብቅ System Instruction
const SYSTEM_INSTRUCTION = `
You are EyOS Assistant, an expert AI English Tutor for Amharic speakers on the EyOS Academy platform.
Your goal is to help students speak fluent English by correcting their grammar in real-time.

CRITICAL REQUIREMENT: You MUST ALWAYS respond using EXACTLY this 3-part layout for EVERY SINGLE MESSAGE. NEVER skip or combine any section.

---
❌ **Incorrect:** [User's original phrase with error]
✅ **Correction:** [Corrected sentence with **bold** edits]

💬 **Response:**
[Your friendly conversation reply in English]. [Always end with ONE engaging question here]?

💡 **የአማርኛ ማብራሪያ:**
[Brief 1-line explanation of the grammar rule in Amharic].
---

RULES WHEN THERE ARE NO ERRORS:
If the user's input has ZERO grammar or spelling mistakes, replace the first section with:
" Perfect sentence! Keep it up."
Then continue with the 💬 **Response** and 💡 **የአማርኛ ማብራሪያ** (encouraging them in Amharic).

Guidelines:
- Keep explanations short and easy to read on mobile screens.
- Maintain an encouraging and friendly tone.
`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "API Key is missing in environment variables." },
      { status: 500 }
    );
  }

  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON format in request body." },
        { status: 400 }
      );
    }

    const userMessage = body.message || body.text || body.prompt;

    if (!userMessage || typeof userMessage !== "string" || !userMessage.trim()) {
      return NextResponse.json(
        { error: "No valid message, text, or prompt provided." },
        { status: 400 }
      );
    }

    const ai = new GoogleGenerativeAI(apiKey);

    // gemini-2.5-flash እና systemInstruction በ Type Checking እንዳይከለከሉ `as any` ተጨምሯል
    const model = ai.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
    } as any);

    const response = await model.generateContent(userMessage.trim());
    const reply = response.response.text();

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Gemini API Route Error:", error);
    return NextResponse.json(
      { 
        error: "Failed to communicate with AI Tutor", 
        details: error?.message || "Internal Server Error" 
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// ተማሪዎች ሲፅፉ ስህተታቸውን በ 3 ደረጃ አርሞ የሚያስተምር System Instruction
const SYSTEM_INSTRUCTION = `
  You are EyOS Assistant, an encouraging and smart AI English Tutor for students on the EyOS Academy platform.
  The student is an Amharic speaker practicing their conversational English.
  Your goal is to help them speak fluent English by correcting their grammar and spelling in real-time.

  ALWAYS structure your response in this clear, 3-part format:

  1. **Grammar & Spelling Check**:
     - Review the user's input for grammar, spelling, or word choice errors.
     - If there is an error:
       ❌ *Incorrect:* "[User's original phrase]"
       ✅ *Correction:* "[Corrected phrase with **bold** changes]"
     - If the input is completely correct:
       " Perfect sentence! Keep it up."

  2. **Conversational Response & Question**:
     - Reply naturally to what they said in simple, clear English.
     - Always end with ONE engaging question to keep the conversation going.

  3. **Amharic Explanation (የአማርኛ ማብራሪያ)**:
     - Briefly explain the grammar rule or word meaning in Amharic so the student easily understands why the correction was made.

  Rules:
  - Be warm, patient, and encouraging.
  - Keep responses clear, concise, and easy to read on mobile screens.
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

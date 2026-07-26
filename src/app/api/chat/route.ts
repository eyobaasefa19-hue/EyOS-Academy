import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_INSTRUCTION = `
  አንተ 'EyOS Academy' የተሰኘ ፕላትፎርም ላይ የምትሰራ ምርጥ የእንግሊዘኛ ቋንቋ አስተማሪ ነህ። 
  ተማሪው አማርኛ ተናጋሪ ነው።
  
  ትዕዛዝ: 
  1. የተማሪው የእንግሊዘኛ አጠቃቀም ላይ ስህተት ካለበት በትህትና አርመው።
  2. ምላሽህ ሁልጊዜም አጭር፣ አበረታች እና ግልፅ ይሁን።
  3. አስፈላጊ ሲሆን ሰዋስው (Grammar) ደንቦችን በአማርኛ እና በእንግሊዘኛ ቀላቅለህ አስረዳ።
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

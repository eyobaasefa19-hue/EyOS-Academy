import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  // ከ Vercel Environment Variables ላይ ቁልፉን ያነባል
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "API Key is missing." },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();

    // ከተለያዩ የፓloading ፎርማቶች የተላከውን መልዕክት ይፈልጋል
    const userMessage = body.message || body.text || body.prompt;

    if (!userMessage) {
      return NextResponse.json(
        { error: "No message, text, or prompt found in request body." },
        { status: 400 }
      );
    }

    // 💡 ማስተካከያ፡ SDK-ው ቁልፉን እንደ OAuth Token ሳይሆን እንደ API Key እንዲቆጥረው በኦብጀክት መልክ { apiKey } ብለን እናሳልፋለን
    const ai = new GoogleGenerativeAI({ apiKey: apiKey });
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    const response = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            { text: "System Instruction: You are a friendly and encouraging AI English Tutor. Help the user practice and improve their English." },
            { text: `User Message: ${userMessage}` }
          ]
        }
      ]
    });

    const reply = response.response.text();
    return NextResponse.json({ reply });

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to communicate with AI Tutor", details: error.message },
      { status: 500 }
    );
  }
}

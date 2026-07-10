import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/generative-ai";

// 1. የ Gemini API Key በVercel ላይ መኖሩን ማረጋገጥ
const apiKey = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  if (!apiKey) {
    return NextResponse.json(
      { error: 'GEMINI_API_KEY is not configured in environment variables.' },
      { status: 500 }
    );
  }

  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // 2. በድሮው SDK አማካኝነት Gemini 2.5 Flashን መጥራት
    const ai = new GoogleGenAI({ apiKey: apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: "You are a friendly and encouraging AI English Tutor. Help the user practice and correct their English."
      }
    });

    // 3. የተገኘውን ፅሁፍ ለ Client መላክ
    const reply = response.text;
    return NextResponse.json({ reply });

  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { error: 'Failed to communicate with AI Tutor', details: error.message },
      { status: 500 }
    );
  }
}

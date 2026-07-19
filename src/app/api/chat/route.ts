import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  if (!apiKey) {
    return NextResponse.json(
      { error: 'API Key is missing.' },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const userMessage = body.message || body.text || body.prompt;

    if (!userMessage) {
      return NextResponse.json(
        { error: 'No message, text, or prompt found in request body.' },
        { status: 400 }
      );
    }

    const ai = new GoogleGenerativeAI(apiKey);
    // ለፈጣን እና ወቅታዊ ምላሽ gemini-2.5-flashን እንጠቀማለን
    const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash' });

    // ለ AI አስተማሪው የተሰጠ ልዩ መመሪያ (System Instruction)
    const systemInstruction = `
      አንተ 'EyOS Academy' የተሰኘ ፕላትፎርም ላይ የምትሰራ ምርጥ የእንግሊዘኛ ቋንቋ አስተማሪ ነህ። 
      ተማሪው አማርኛ ተናጋሪ ነው።
      
      ትዕዛዝ: 
      1. የተማሪው የእንግሊዘኛ አጠቃቀም ላይ ስህተት ካለበት በትህትና አርመው።
      2. ምላሽህ ሁልጊዜም አጭር፣ አበረታች እና ግልፅ ይሁን።
      3. አስፈላጊ ሲሆን ሰዋስው (Grammar) ደንቦችን በአማርኛ እና በእንግሊዘኛ ቀላቅለህ አስረዳ።
    `;

    const response = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            { text: systemInstruction },
            { text: `User Message: ${userMessage}` }
          ]
        }
      ]
    });

    const reply = response.response.text();
    return NextResponse.json({ reply });

  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { error: 'Failed to communicate with AI Tutor', details: error.message },
      { status: 500 }
    );
  }
}

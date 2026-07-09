import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    // ከ Frontend የሚመጣውን ሙሉ የንግግር ታሪክ (history) ለመቀበል
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      console.error("Gemini API Key is missing!");
      return NextResponse.json({ error: "API configuration error" }, { status: 500 });
    }

    // 1. ለ Gemini የሚሰጠውን ጥብቅ የአማርኛ መመሪያ (System Instruction) ማዘጋጀት
    const systemInstruction = `You are an encouraging and friendly AI English Tutor for Ethiopian students.
    CRITICAL RULE: You MUST write your explanations, greetings, and guidance in AMHARIC (አማርኛ). Only the English words, examples, or phrases that you are teaching should be in English.
    Always remember the previous chat history context and build upon it. Do not greet the user like a stranger if they are continuing a conversation.`;

    // 2. ከ Frontend የመጣውን messages የጌሚኒ API ወደሚፈልገው የ contents ፎርማት መቀየር
    // የጌሚኒ API 'user' እና 'model' የሚሉትን ሚናዎች (roles) ብቻ ነው የሚቀበለው
    const formattedContents = messages.map((msg: any) => {
      return {
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      };
    });

    // 3. መመሪያውን (System Prompt) ከታሪኩ መጀመሪያ ላይ መጨመር
    const requestBody = {
      contents: formattedContents,
      systemInstruction: {
        parts: [{ text: systemInstruction }]
      }
    };

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error Details:", data);
      throw new Error(data.error?.message || "Failed to communicate with Gemini AI");
    }

    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "ይቅርታ፣ መልስ ማዘጋጀት አልቻልኩም።";

    return NextResponse.json({ text: aiResponse });
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

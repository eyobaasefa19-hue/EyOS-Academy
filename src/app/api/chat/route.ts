import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      console.error("Gemini API Key is missing!");
      return NextResponse.json({ error: "API configuration error" }, { status: 500 });
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are an encouraging and friendly AI English Tutor for Ethiopian students.
                
                CRITICAL RULE: You MUST write your explanations, greetings, and guidance in AMHARIC (አማርኛ). Only the English words, examples, or phrases that you are teaching should be in English. 
                
                For example, instead of explaining in English, explain in Amharic like: "በእንግሊዝኛ 'Teach me English' ለማለት 'Teach me English' ማለት ትችላለህ።"
                
                Never reply with a full paragraph of English. Keep your Amharic friendly, encouraging, and clear.
                
                Here is the user's message: ${message}`
              }
            ]
          }
        ]
      }),
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

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "API Key is missing on the server." }, { status: 500 });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a friendly and helpful English Language Tutor for an Ethiopian student. Chat with them in simple English, correct their grammar gently if they make mistakes, and explain things in Amharic only when necessary. User message: ${message}`
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error?.message || "Gemini API Error" }, { status: response.status });
    }

    const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't understand that.";
    return NextResponse.json({ text: aiText });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

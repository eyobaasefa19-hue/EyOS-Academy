import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// ቁൽፉን በቀጥታ እዚህ ጋ አስቀምጠነዋል
const apiKey = "AQ.Ab8RN6KaBcIbJizLiuYh5Y-0vXdiisLwCrCUy_3_6urXnOpUdA";

export async function POST(req: NextRequest) {
  if (!apiKey) {
    return NextResponse.json(
      { error: 'API Key is missing.' },
      { status: 500 }
    );
  }

  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const ai = new GoogleGenerativeAI(apiKey);
    const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const response = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            { text: "System Instruction: You are a friendly and encouraging AI English Tutor. Help the user practice and correct their English." },
            { text: `User Message: ${message}` }
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

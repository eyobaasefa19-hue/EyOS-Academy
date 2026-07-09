import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

// 1. የ Gemini API Key መኖሩን እናረጋግጣለን
const apiKey = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  if (!apiKey) {
    return NextResponse.json(
      { error: 'GEMINI_API_KEY is not configured in environment variables.' },
      { status: 505 }
    );
  }

  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // 2. አዲሱን የ SDK አወቃቀር በመጠቀም Gemini 2.5 Flashን እንጠራዋለን
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      // እዚህ ላይ ለቱተሩ ባህሪ መስጠት ትችላለህ
      config: {
        systemInstruction: "You are a friendly and encouraging AI English Tutor. Help the user practice and correct their grammar gently if they make mistakes.",
      }
    });

    // 3. የተመለሰውን ፅሁፍ ለ Client እንልካለን
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

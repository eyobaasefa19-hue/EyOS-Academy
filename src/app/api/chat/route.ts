import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  if (!apiKey) {
    return NextResponse.json(
      { error: 'GEMINI_API_KEY is not configured.' },
      { status: 500 }
    );
  }

  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const ai = new GoogleGenerativeAI(apiKey);
    
    const model = ai.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      systemInstruction: "You are a friendly and encouraging AI English Tutor. Help the user practice and correct their English."
    });

    const response = await model.generateContent({
      contents: [{ text: message }]
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

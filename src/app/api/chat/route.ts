import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// ያወጣኸው ትክክለኛው የጌሚኒ ቁልፍህ
const apiKey = "AQ.Ab8RN6KaBcIbJizLiuYh5Y-0vXdiisLwCrCUy_3_6urXnOpUdA";

export async function POST(req: NextRequest) {
  if (!apiKey) {
    return NextResponse.json(
      { error: 'API Key is missing.' },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    
    // የትኛውም የሳጥን ስም ቢመጣ ፈልጎ እንዲያገኝ አማራጮችን በሙሉ እንሰጠዋለን
    const userMessage = body.message || body.text || body.prompt;

    if (!userMessage) {
      return NextResponse.json(
        { error: 'No message, text, or prompt found in request body.' }, 
        { status: 400 }
      );
    }

    const ai = new GoogleGenerativeAI(apiKey);
    const model = ai.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const response = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            { text: "System Instruction: You are a friendly and encouraging AI English Tutor. Help the user practice and correct their English." },
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

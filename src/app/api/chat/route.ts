import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // እዚህ ጋር የ OpenAI ወይም የ AI አገልግሎትህ ኮድ አለ
    // ለምሳሌ ያህል፡
    const aiResponse = `You said: "${message}". I am ready to help you learn English!`;

    return NextResponse.json({ text: aiResponse });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

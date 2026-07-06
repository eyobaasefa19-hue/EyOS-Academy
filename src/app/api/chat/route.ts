import { getAiResponse } from "../../../lib/gemini";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    if (!message) {
      return NextResponse.json({ error: "መልእክት አልተገኘም" }, { status: 400 });
    }

    const aiReply = await getAiResponse(message);
    return NextResponse.json({ reply: aiReply });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: "የውስጥ ሰርቨር ችግር አጋጥሟል" }, { status: 500 });
  }
}

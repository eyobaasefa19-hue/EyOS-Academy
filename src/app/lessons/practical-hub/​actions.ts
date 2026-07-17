"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

// የ AI API ቁልፍህን አስገባ
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function checkWritingWithAI(userText: string) {
  if (!userText) return null;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    You are an expert English teacher. Review the following text written by a student.
    Text: "${userText}"
    
    Provide your feedback strictly in JSON format. Do not add any markdown formatting like \`\`\`json. Just return the raw JSON object.
    
    Structure:
    {
      "intro": "A short encouraging opening sentence evaluating their writing.",
      "points": [
        { "label": "Grammar/Spelling/Punctuation", "text": "Specific correction or praise here." },
        { "label": "Structure", "text": "Feedback on sentence structure." }
      ]
    }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let aiText = response.text().trim();
    
    // AI-ው በስህተት የ JSON ማርክዳውን ከጨመረ ለማፅዳት
    if (aiText.startsWith('```json')) {
        aiText = aiText.replace(/^```json\n/, '').replace(/\n```$/, '');
    } else if (aiText.startsWith('```')) {
        aiText = aiText.replace(/^```\n/, '').replace(/\n```$/, '');
    }

    const feedback = JSON.parse(aiText);
    return feedback;

  } catch (error) {
    console.error("AI Generation Error:", error);
    return {
      intro: "ይቅርታ፣ ፅሁፍዎን ለመገምገም የኔትወርክ ችግር አጋጥሟል።",
      points: [{ label: "System Error", text: "Please try submitting your text again." }]
    };
  }
}


import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getGeminiResponse = async (prompt: string, history: { role: 'user' | 'model', content: string }[]) => {
  try {
    const chat = ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { role: 'user', parts: [{ text: "You are the InstaGemini assistant. You help users of a social media app with captions, photo ideas, and app navigation. Keep responses concise and use emojis to fit the social media vibe." }] },
        ...history.map(h => ({
            role: h.role,
            parts: [{ text: h.content }]
        })),
        { role: 'user', parts: [{ text: prompt }] }
      ]
    });

    const response = await chat;
    return response.text;
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Sorry, I'm having trouble connecting to my creative brain right now. Please try again later! ✨";
  }
};

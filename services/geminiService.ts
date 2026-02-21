import { GoogleGenAI } from "@google/genai";

// Ensure API key is strictly from process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface HistoryItem {
  role: 'user' | 'model';
  content: string;
  images?: string[]; // Array of base64 strings
}

export const getGeminiResponse = async (prompt: string, images: string[], history: HistoryItem[]) => {
  try {
    // Construct the history for the API
    const contents = [
      { 
        role: 'user', 
        parts: [{ text: "You are the Hyper Media assistant. You help users of a social media app with captions, photo ideas, and app navigation. Keep responses concise and use emojis to fit the social media vibe." }] 
      }
    ];

    // Add previous history
    history.forEach(h => {
      const parts: any[] = [{ text: h.content }];
      // Note: In a real app, sending back large base64 images in history can hit token limits quickly.
      // For this demo, we'll mostly rely on text history context or simple image context if needed.
      contents.push({
        role: h.role,
        parts: parts
      });
    });

    // Construct current user message
    const currentParts: any[] = [{ text: prompt }];
    
    // Add images if present
    if (images && images.length > 0) {
      images.forEach(img => {
        currentParts.push({
          inlineData: {
            mimeType: 'image/png', // Assuming PNG/JPEG generic handling for base64
            data: img
          }
        });
      });
    }

    contents.push({ role: 'user', parts: currentParts });

    // Use gemini-3-flash-preview for multimodal text generation tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents
    });

    return response.text || "I saw the image but couldn't think of a response! ✨";
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Sorry, I'm having trouble connecting to my creative brain right now. Please try again later! ✨";
  }
};
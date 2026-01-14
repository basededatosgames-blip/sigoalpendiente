
import { GoogleGenAI, Type } from "@google/genai";
import { PromptResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const optimizeArtPrompt = async (input: string): Promise<PromptResult> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze this art concept and expand it into a high-detail professional artistic prompt for an AI generator: "${input}"`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          refinedPrompt: { type: Type.STRING, description: 'The expanded, highly detailed artistic prompt' },
          artisticStyle: { type: Type.STRING, description: 'The primary artistic movement or style' },
          suggestedMedium: { type: Type.STRING, description: 'Traditional or digital medium suggestion' },
          tags: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: 'Relevant artistic keywords'
          }
        },
        required: ['refinedPrompt', 'artisticStyle', 'suggestedMedium', 'tags']
      }
    }
  });

  const text = response.text || "{}";
  return JSON.parse(text) as PromptResult;
};

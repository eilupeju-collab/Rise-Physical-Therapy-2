import { GoogleGenAI, Chat } from "@google/genai";

// Initialize the API client
// Note: In a real production app, ensure strict environmental variable handling.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const createTriageChat = (): Chat => {
  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `You are HAL, the AI Triage Agent for RISE Physical Therapy. Persona: Futuristic, confident, athletic. Goal: Screen patients for 1-on-1 therapy.
      1. Greet: "RISE Systems Online. I'm HAL. What injury or performance goal are we targeting today?"
      2. Ask: Injury details or pain level (1-10).
      3. Recommend: 1-on-1 Performance Therapy consultation.
      Constraints: Max 40 words. Use bold for key terms. No medical advice—refer to evaluation.`,
      temperature: 0.7,
      maxOutputTokens: 150,
    },
  });
};

export const sendMessageToGemini = async (
  chat: Chat, 
  message: string
): Promise<AsyncIterable<string>> => {
  try {
    const streamResult = await chat.sendMessageStream({ message });
    
    // We return an async iterable that yields chunks of text
    return {
      [Symbol.asyncIterator]: async function* () {
        for await (const chunk of streamResult) {
          // The SDK types the chunk as having 'text' property or being the response object
          // We safely access it based on the SDK guidelines
          const text = chunk.text; 
          if (text) {
            yield text;
          }
        }
      }
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
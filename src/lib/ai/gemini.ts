/**
 * Gemini API Client (Server-Only)
 * Handles communication with Google's Gemini API for the AI Wealth Avatar.
 * This module should NEVER be imported on the client side.
 */

import { GoogleGenAI } from '@google/genai';

/** Gemini model to use */
const MODEL_NAME = 'gemini-2.0-flash';

/** Maximum tokens in response */
const MAX_OUTPUT_TOKENS = 1024;

/**
 * Creates a configured Gemini client instance.
 * API key is read from environment variable.
 *
 * @returns GoogleGenAI instance
 * @throws Error if API key is not configured
 */
function getClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'GEMINI_API_KEY is not set. Please add it to your .env.local file.'
    );
  }
  return new GoogleGenAI({ apiKey });
}

/**
 * Sends a message to Gemini and returns the full response.
 *
 * @param systemPrompt - System prompt with financial context
 * @param userMessage - User's chat message
 * @param conversationHistory - Previous messages for context
 * @returns AI-generated response text
 */
export async function generateChatResponse(
  systemPrompt: string,
  userMessage: string,
  conversationHistory: Array<{ role: string; content: string }> = []
): Promise<string> {
  try {
    const client = getClient();

    // Build conversation contents
    const contents = conversationHistory.map((msg) => ({
      role: msg.role === 'assistant' ? ('model' as const) : ('user' as const),
      parts: [{ text: msg.content }],
    }));

    // Add the current user message
    contents.push({
      role: 'user' as const,
      parts: [{ text: userMessage }],
    });

    const response = await client.models.generateContent({
      model: MODEL_NAME,
      contents,
      config: {
        systemInstruction: systemPrompt,
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
      },
    });

    const text = response.text;
    if (!text) {
      return 'I apologize, but I was unable to generate a response. Please try rephrasing your question.';
    }

    return text;
  } catch (error) {
    console.error('[Gemini] Error generating response:', error);

    // Return user-friendly error message
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return 'The AI service is not configured. Please set up the Gemini API key to enable the AI Wealth Avatar.';
      }
      if (error.message.includes('quota') || error.message.includes('rate')) {
        return 'The AI service is currently at capacity. Please try again in a moment.';
      }
    }

    return 'I encountered an issue processing your request. Please try again or contact IDBI Bank support for assistance.';
  }
}

/**
 * Generates a streaming response from Gemini.
 *
 * @param systemPrompt - System prompt with financial context
 * @param userMessage - User's chat message
 * @param conversationHistory - Previous messages
 * @returns ReadableStream of response chunks
 */
export async function generateStreamingResponse(
  systemPrompt: string,
  userMessage: string,
  conversationHistory: Array<{ role: string; content: string }> = []
): Promise<ReadableStream<Uint8Array>> {
  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      try {
        const client = getClient();

        const contents = conversationHistory.map((msg) => ({
          role: msg.role === 'assistant' ? ('model' as const) : ('user' as const),
          parts: [{ text: msg.content }],
        }));

        contents.push({
          role: 'user' as const,
          parts: [{ text: userMessage }],
        });

        const response = await client.models.generateContentStream({
          model: MODEL_NAME,
          contents,
          config: {
            systemInstruction: systemPrompt,
            maxOutputTokens: MAX_OUTPUT_TOKENS,
            temperature: 0.7,
            topP: 0.9,
            topK: 40,
          },
        });

        for await (const chunk of response) {
          const text = chunk.text;
          if (text) {
            controller.enqueue(encoder.encode(text));
          }
        }

        controller.close();
      } catch (error) {
        console.error('[Gemini] Streaming error:', error);
        controller.enqueue(
          encoder.encode(
            'I encountered an issue. Please try again or contact IDBI Bank support.'
          )
        );
        controller.close();
      }
    },
  });
}

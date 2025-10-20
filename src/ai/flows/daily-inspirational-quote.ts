'use server';
/**
 * @fileOverview Fetches a daily inspirational-quote from the Gemini API.
 *
 * - getDailyInspirationalQuote - A function that fetches and formats the quote.
 * - DailyInspirationalQuoteOutput - The return type for the getDailyInspirationalQuote function.
 */

import * as genkit from '@/ai/genkit';
import {z} from 'genkit';
import { unstable_cache as cache } from 'next/cache';

const DailyInspirationalQuoteOutputSchema = z.object({
  quote: z.string().describe('The inspirational quote for the day.'),
  author: z.string().describe('The author of the inspirational quote.'),
});

export type DailyInspirationalQuoteOutput = z.infer<typeof DailyInspirationalQuoteOutputSchema>;

// We wrap the AI call in Next.js's `cache` function.
// This tells Next.js to cache the result of this function.
// The `revalidate: 86400` option sets the cache to expire after 86400 seconds (24 hours).
export const getDailyInspirationalQuote = cache(
  async (): Promise<DailyInspirationalQuoteOutput> => {
    console.log("Fetching new inspirational quote from API...");
    // We generate a unique ID (the current date as YYYY-MM-DD) to ensure the AI generates
    // a new quote each day, but Genkit returns a cached response for the same day.
    const dailyId = new Date().toISOString().split('T')[0];

    try {
      const result = await dailyInspirationalQuoteFlow(dailyId);
      return result;
    }
    catch (error) {
        console.error("Error executing flow, returning fallback quote.", error);
        // If the AI call fails for any reason, we return a fallback quote.
        return {
            quote: "La perseverancia no es una carrera larga; son muchas carreras cortas una tras otra.",
            author: "Walter Elliot"
        };
    }
  },
  ['daily-inspirational-quote'], // A unique key for this cache entry
  {
    revalidate: 86400, // Revalidate every 24 hours (86400 seconds)
  }
);


// 1. Define the prompt separately. This is the correct pattern.
const dailyInspirationalQuotePrompt = genkit.ai.definePrompt(
  {
    name: 'dailyInspirationalQuotePrompt',
    input: { schema: z.string() },
    output: { schema: DailyInspirationalQuoteOutputSchema },
    prompt: `Eres un experto en motivación y curador de citas. Genera una única frase inspiradora sobre temas variados como la vida, el trabajo, la superación personal o la felicidad. Usa este dato para asegurar que la cita sea única para el día: {{{input}}}`,
    config: {
      temperature: 0.9,
    },
  }
);

// 2. Define the flow that uses the prompt.
const dailyInspirationalQuoteFlow = genkit.ai.defineFlow(
  {
    name: 'dailyInspirationalQuoteFlow',
    inputSchema: z.string(),
    outputSchema: DailyInspirationalQuoteOutputSchema,
  },
  async (uniqueId) => {
    const { output } = await dailyInspirationalQuotePrompt(uniqueId);
    if (!output) {
      throw new Error('Failed to generate inspirational quote. Output was null.');
    }
    return output;
  }
);

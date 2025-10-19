'use server';
/**
 * @fileOverview Fetches a daily inspirational-quote from the Gemini API.
 *
 * - getDailyInspirationalQuote - A function that fetches and formats the quote.
 * - DailyInspirationalQuoteOutput - The return type for the getDailyInspirationalQuote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { unstable_noStore as noStore } from 'next/cache';

const DailyInspirationalQuoteOutputSchema = z.object({
  quote: z.string().describe('The inspirational quote for the day.'),
  author: z.string().describe('The author of the inspirational quote.'),
});

export type DailyInspirationalQuoteOutput = z.infer<typeof DailyInspirationalQuoteOutputSchema>;

export async function getDailyInspirationalQuote(): Promise<DailyInspirationalQuoteOutput> {
  noStore(); // Prevent Next.js from caching the response of this function.
  return dailyInspirationalQuoteFlow();
}

const dailyInspirationalQuoteFlow = ai.defineFlow({
    name: 'dailyInspirationalQuoteFlow',
    outputSchema: DailyInspirationalQuoteOutputSchema,
  },
  async () => {
    const {output} = await ai.generate({
      prompt: `Eres un experto en motivación y curador de citas. Genera una única frase inspiradora sobre temas variados como la vida, el trabajo, la superación personal o la felicidad. La fecha y hora actual es ${new Date().toISOString()} para asegurar que la cita sea única.`,
      output: {
        schema: DailyInspirationalQuoteOutputSchema,
      },
      config: {
        temperature: 0.9,
      },
    });

    if (!output) {
        throw new Error("Failed to generate inspirational quote.");
    }
    
    return output;
  }
);

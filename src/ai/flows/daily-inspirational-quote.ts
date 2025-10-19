'use server';
/**
 * @fileOverview Fetches a daily inspirational-quote from the Gemini API.
 *
 * - getDailyInspirationalQuote - A function that fetches and formats the quote.
 * - DailyInspirationalQuoteOutput - The return type for the getDailyInspirationalQuote function.
 */

import * as genkit from '@/ai/genkit';
import {z} from 'genkit';
import { unstable_noStore as noStore } from 'next/cache';

const DailyInspirationalQuoteOutputSchema = z.object({
  quote: z.string().describe('The inspirational quote for the day.'),
  author: z.string().describe('The author of the inspirational quote.'),
});

export type DailyInspirationalQuoteOutput = z.infer<typeof DailyInspirationalQuoteOutputSchema>;

export async function getDailyInspirationalQuote(): Promise<DailyInspirationalQuoteOutput> {
  // Esta función le dice a Next.js que no guarde en caché el resultado de esta función.
  noStore();
  const uniqueId = new Date().toISOString();
  try {
    const result = await dailyInspirationalQuoteFlow(uniqueId);
    return result;
  }
  catch (error) {
      console.error("Error executing flow, returning fallback quote.", error);
      return {
          quote: "La perseverancia no es una carrera larga; son muchas carreras cortas una tras otra.",
          author: "Walter Elliot"
      };
  }
}

const dailyInspirationalQuotePrompt = genkit.ai.definePrompt(
  {
    name: 'dailyInspirationalQuotePrompt',
    input: { schema: z.string() },
    output: { schema: DailyInspirationalQuoteOutputSchema },
    prompt: `Eres un experto en motivación y curador de citas. Genera una única frase inspiradora sobre temas variados como la vida, el trabajo, la superación personal o la felicidad. Usa este dato para asegurar que la cita sea única: {{{input}}}`,
    config: {
      temperature: 0.9,
    },
  }
);


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
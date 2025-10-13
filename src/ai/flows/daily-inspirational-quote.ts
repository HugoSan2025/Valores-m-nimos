'use server';
/**
 * @fileOverview Fetches a daily inspirational-quote from the Gemini API.
 *
 * - getDailyInspirationalQuote - A function that fetches and formats the quote.
 * - DailyInspirationalQuoteOutput - The return type for the getDailyInspirationalQuote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { parseQuoteAndAuthor } from './parse-quote-and-author';
import { unstable_noStore as noStore } from 'next/cache';

const DailyInspirationalQuoteOutputSchema = z.object({
  quote: z.string().describe('The inspirational quote for the day.'),
  author: z.string().describe('The author of the inspirational quote.'),
});

export type DailyInspirationalQuoteOutput = z.infer<typeof DailyInspirationalQuoteOutputSchema>;

export async function getDailyInspirationalQuote(): Promise<DailyInspirationalQuoteOutput> {
  noStore(); // This will prevent the response from being cached.
  return dailyInspirationalQuoteFlow();
}

const dailyInspirationalQuotePrompt = ai.definePrompt({
  name: 'dailyInspirationalQuotePrompt',
  prompt: `Eres un experto en motivación y curador de citas. Responde ÚNICAMENTE con una única frase inspiradora del día y su autor. La frase debe ser sobre tecnología, valores, innovación o desarrollo personal.`,
});

const dailyInspirationalQuoteFlow = ai.defineFlow({
  name: 'dailyInspirationalQuoteFlow',
  outputSchema: DailyInspirationalQuoteOutputSchema,
},
async () => {
  const {output} = await dailyInspirationalQuotePrompt({
    input: "Dame la frase inspiradora más relevante y actual que puedas encontrar hoy."
  });
  
  if (!output) {
    return {
      quote: "La perseverancia no es una carrera larga; son muchas carreras cortas una tras otra.",
      author: "Walter Elliot"
    };
  }

  // Handle cases where the output might be a string that needs parsing
  if (typeof output === 'string') {
      return await parseQuoteAndAuthor(output);
  }
  
  // Assuming output is already in the correct JSON format
  return output as DailyInspirationalQuoteOutput;
});

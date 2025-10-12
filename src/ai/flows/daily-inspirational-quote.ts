'use server';
/**
 * @fileOverview Fetches a daily inspirational quote from the Gemini API.
 *
 * - getDailyInspirationalQuote - A function that fetches and formats the quote.
 * - DailyInspirationalQuoteOutput - The return type for the getDailyInspirationalQuote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import wav from 'wav';

const DailyInspirationalQuoteOutputSchema = z.object({
  quote: z.string().describe('The inspirational quote for the day.'),
  author: z.string().describe('The author of the inspirational quote.'),
});

export type DailyInspirationalQuoteOutput = z.infer<typeof DailyInspirationalQuoteOutputSchema>;

export async function getDailyInspirationalQuote(): Promise<DailyInspirationalQuoteOutput> {
  return dailyInspirationalQuoteFlow();
}

const dailyInspirationalQuotePrompt = ai.definePrompt({
  name: 'dailyInspirationalQuotePrompt',
  output: {schema: DailyInspirationalQuoteOutputSchema},
  prompt: `You are an expert in delivering inspirational quotes. Provide a single inspirational quote and its author. Focus the quote on technology, values, innovation, or personal development. Format your response as a JSON object:
{
  "quote": "Inspirational Quote Here",
  "author": "Author Name"
}`,
});

const dailyInspirationalQuoteFlow = ai.defineFlow({
  name: 'dailyInspirationalQuoteFlow',
  outputSchema: DailyInspirationalQuoteOutputSchema,
},
async () => {
  const {output} = await dailyInspirationalQuotePrompt();
  return output!;
});
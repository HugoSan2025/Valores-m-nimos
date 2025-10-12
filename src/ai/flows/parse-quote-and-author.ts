'use server';
/**
 * @fileOverview AI flow to parse a quote and author from a text string.
 *
 * This file exports:
 *   - `parseQuoteAndAuthor`: An async function that takes a text string and returns
 *     the parsed quote and author.
 *   - `ParseQuoteAndAuthorInput`: The input type for the `parseQuoteAndAuthor` function.
 *   - `ParseQuoteAndAuthorOutput`: The output type for the `parseQuoteAndAuthor` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ParseQuoteAndAuthorInputSchema = z.string().describe('The input string containing the quote and author.');
export type ParseQuoteAndAuthorInput = z.infer<typeof ParseQuoteAndAuthorInputSchema>;

const ParseQuoteAndAuthorOutputSchema = z.object({
  quote: z.string().describe('The parsed quote.'),
  author: z.string().describe('The parsed author.'),
});
export type ParseQuoteAndAuthorOutput = z.infer<typeof ParseQuoteAndAuthorOutputSchema>;

export async function parseQuoteAndAuthor(input: ParseQuoteAndAuthorInput): Promise<ParseQuoteAndAuthorOutput> {
  return parseQuoteAndAuthorFlow(input);
}

const parseQuoteAndAuthorPrompt = ai.definePrompt({
  name: 'parseQuoteAndAuthorPrompt',
  input: {schema: ParseQuoteAndAuthorInputSchema},
  output: {schema: ParseQuoteAndAuthorOutputSchema},
  prompt: `You are an AI expert in parsing quotes and authors from a given text. Your task is to extract the quote and the author from the input text. The quote is typically enclosed in quotation marks, and the author is mentioned after the quote, often preceded by a '—' or '-'.

Input text: {{{$input}}}

Output in JSON format:
{
  "quote": "extracted quote",
  "author": "extracted author"
}`,
});

const parseQuoteAndAuthorFlow = ai.defineFlow(
  {
    name: 'parseQuoteAndAuthorFlow',
    inputSchema: ParseQuoteAndAuthorInputSchema,
    outputSchema: ParseQuoteAndAuthorOutputSchema,
  },
  async input => {
    const {output} = await parseQuoteAndAuthorPrompt(input);
    return output!;
  }
);

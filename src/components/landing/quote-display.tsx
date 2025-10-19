"use client";

import type { DailyInspirationalQuoteOutput } from '@/ai/flows/daily-inspirational-quote';

// Este componente ahora solo recibe los datos y los muestra.
// No tiene estado, no hace fetching, es un "dumb component".
export default function QuoteDisplay({ quoteData }: { quoteData: DailyInspirationalQuoteOutput }) {

  return (
    <div className="text-center max-w-4xl mx-auto">
      <i className="fas fa-quote-left text-5xl mb-4 opacity-90"></i>
      <>
        <blockquote className="text-3xl md:text-4xl font-light italic mb-4">
          {quoteData.quote}
        </blockquote>
        <p className="text-xl font-semibold opacity-90">— {quoteData.author}</p>
      </>
    </div>
  );
}

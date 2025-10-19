"use client";

import type { DailyInspirationalQuoteOutput } from '@/ai/flows/daily-inspirational-quote';

interface QuoteDisplayProps {
  quoteData: DailyInspirationalQuoteOutput | null;
}

export default function QuoteDisplay({ quoteData }: QuoteDisplayProps) {

  return (
    <div className="text-center max-w-4xl mx-auto min-h-[150px]">
      <i className="fas fa-quote-left text-5xl mb-4 opacity-90"></i>
      {quoteData ? (
        <>
          <blockquote className="text-3xl md:text-4xl font-light italic mb-4">
            {quoteData.quote}
          </blockquote>
          <p className="text-xl font-semibold opacity-90">— {quoteData.author}</p>
        </>
      ) : (
        <div className="animate-pulse">
            <div className="h-8 bg-white/30 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-6 bg-white/30 rounded w-1/4 mx-auto"></div>
        </div>
      )}
    </div>
  );
}

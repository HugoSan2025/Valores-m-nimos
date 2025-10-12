"use client";

import { useEffect, useState } from 'react';
import { getDailyInspirationalQuote, DailyInspirationalQuoteOutput } from '@/ai/flows/daily-inspirational-quote';
import { Quote } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const fallbackQuote = {
  quote: "La única forma de hacer un gran trabajo es amar lo que haces.",
  author: "Steve Jobs",
};

export default function QuoteDisplay() {
  const [quoteData, setQuoteData] = useState<DailyInspirationalQuoteOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuote() {
      try {
        const result = await getDailyInspirationalQuote();
        setQuoteData(result);
      } catch (error) {
        console.error("Error fetching daily quote:", error);
        setQuoteData(fallbackQuote);
      } finally {
        setLoading(false);
      }
    }
    fetchQuote();
  }, []);

  const displayData = quoteData || fallbackQuote;

  return (
    <div className="text-center max-w-4xl mx-auto">
      <Quote className="h-12 w-12 md:h-14 md:w-14 text-primary-foreground/80 mx-auto mb-6" />
      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4 mx-auto bg-primary-foreground/20" />
          <Skeleton className="h-8 w-1/2 mx-auto bg-primary-foreground/20" />
          <Skeleton className="h-8 w-1/4 mx-auto bg-primary-foreground/20" />
        </div>
      ) : (
        <>
          <blockquote className="text-3xl md:text-4xl font-light italic mb-4">
            {displayData.quote}
          </blockquote>
          <p className="text-xl font-semibold opacity-90">— {displayData.author}</p>
        </>
      )}
    </div>
  );
}

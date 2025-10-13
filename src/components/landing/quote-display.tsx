"use client";

import { useEffect, useState } from 'react';
import { getDailyInspirationalQuote, DailyInspirationalQuoteOutput } from '@/ai/flows/daily-inspirational-quote';
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
      setLoading(true);
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
    
    const intervalId = setInterval(fetchQuote, 30000); // Fetch a new quote every 30 seconds
    
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const displayData = quoteData || fallbackQuote;

  return (
    <div className="text-center max-w-4xl mx-auto">
      <i className="fas fa-quote-left text-5xl mb-4 opacity-90"></i>
      {loading && !quoteData ? (
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4 mx-auto bg-white/20" />
          <Skeleton className="h-8 w-1/4 mx-auto bg-white/20" />
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

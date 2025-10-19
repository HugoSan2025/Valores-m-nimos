"use client";

import { useEffect, useState } from 'react';
import type { DailyInspirationalQuoteOutput } from '@/ai/flows/daily-inspirational-quote';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from "@/hooks/use-toast";

const fallbackQuote = {
  quote: "La única forma de hacer un gran trabajo es amar lo que haces.",
  author: "Steve Jobs",
};

export default function QuoteDisplay() {
  const [quoteData, setQuoteData] = useState<DailyInspirationalQuoteOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchQuote() {
      setLoading(true);
      try {
        const response = await fetch(`/api/quote?t=${new Date().getTime()}`, { cache: 'no-store' });
        
        if (!response.ok) {
          // Leer el error del cuerpo de la respuesta si es posible
          const errorBody = await response.json().catch(() => ({ message: response.statusText }));
          throw new Error(`Error ${response.status}: ${errorBody.message || 'Failed to fetch quote'}`);
        }
        
        const result = await response.json();
        setQuoteData(result);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error("Error fetching daily quote:", errorMessage);
        
        // Mostrar notificación de error al usuario
        toast({
          title: "Error al cargar la frase",
          description: "No se pudo obtener una nueva frase. Se mostrará una de respaldo.",
          variant: "destructive",
        });

        setQuoteData(fallbackQuote);
      } finally {
        setLoading(false);
      }
    }
    
    fetchQuote();
  }, [toast]); // Agregamos toast a las dependencias de useEffect

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

// src/app/api/quote/route.ts

import { getDailyInspirationalQuote } from '@/ai/flows/daily-inspirational-quote';
import { NextResponse } from 'next/server';

// Esta es la instrucción clave para forzar que esta ruta nunca sea cacheada.
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const quoteData = await getDailyInspirationalQuote();
    return NextResponse.json(quoteData);
  } catch (error) {
    console.error('Error fetching daily quote:', error);
    // Devuelve una frase de respaldo en caso de error
    return NextResponse.json(
      {
        quote: 'La perseverancia no es una carrera larga; son muchas carreras cortas una tras otra.',
        author: 'Walter Elliot',
      },
      { status: 500 }
    );
  }
}

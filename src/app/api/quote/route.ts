// src/app/api/quote/route.ts

import { getDailyInspirationalQuote } from '@/ai/flows/daily-inspirational-quote';
import { NextResponse } from 'next/server';

// This is the key change to force Vercel/Next.js to not cache this route.
// It ensures this endpoint is treated as a dynamic API route.
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const quoteData = await getDailyInspirationalQuote();
    return NextResponse.json(quoteData);
  } catch (error) {
    console.error('Error fetching daily quote:', error);
    // Return a fallback quote in case of an error
    return NextResponse.json(
      {
        quote: 'La perseverancia no es una carrera larga; son muchas carreras cortas una tras otra.',
        author: 'Walter Elliot',
      },
      { status: 500 }
    );
  }
}

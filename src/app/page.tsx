'use client';

import Image from 'next/image';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import SearchSection from '@/components/landing/search-section';
import QuoteDisplay from '@/components/landing/quote-display';
import { Card } from '@/components/ui/card';
import { getDailyInspirationalQuote, DailyInspirationalQuoteOutput } from '@/ai/flows/daily-inspirational-quote';
import { useEffect, useState } from 'react';

// Este componente ahora es un componente de cliente que obtiene los datos en el montaje.
export default function Home() {
  const [quoteData, setQuoteData] = useState<DailyInspirationalQuoteOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchQuote() {
      try {
        const data = await getDailyInspirationalQuote();
        setQuoteData(data);
      } catch (error) {
        console.error("Failed to get quote, using fallback:", error);
        setQuoteData({
          quote: "La perseverancia no es una carrera larga; son muchas carreras cortas una tras otra.",
          author: "Walter Elliot"
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchQuote();
  }, []);


  const heroImage = {
    src: "/hero.jpg",
    alt: "Imagen de profesionales de la salud o científicos interactuando con equipo de alta tecnología",
    width: 600,
    height: 400,
    hint: "health professionals technology"
  };
  const creatorImage = {
    src: "/creator-profile.jpg",
    alt: "Imagen del Fundador - Hugo Quispe",
    width: 96,
    height: 96,
    hint: "founder portrait"
  };
  const featuredImage = {
    src: "/featured-professional.jpg",
    alt: "Imagen destacada de una profesional de laboratorio trabajando con equipo de análisis",
    width: 400,
    height: 400,
    hint: "laboratory professional"
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        {/* HERO/INICIO */}
        <section id="inicio" className="section-padding pt-24">
          <Card className="flex flex-col lg:flex-row items-center gap-12 p-8 md:p-12">
            <div className="lg:w-1/2">
              <h1 className="text-5xl md:text-6xl font-extrabold text-foreground leading-tight mb-4">
                <span className="text-primary">Innovación</span> con rostro humano
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                La ciencia evoluciona, nosotros también.
              </p>
            </div>
            <div className="lg:w-1/2 w-full">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                width={heroImage.width}
                height={heroImage.height}
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                data-ai-hint={heroImage.hint}
                priority
              />
            </div>
          </Card>
        </section>

        {/* CREADOR */}
        <section id="creador" className="section-padding bg-secondary/50">
          <h2 className="text-4xl font-bold text-center text-foreground mb-12">
            Conoce a Nuestro Creador
          </h2>
          <Card className="flex flex-col lg:flex-row gap-10 items-center p-8">
            <div className="lg:w-2/3">
              <div className="flex items-center mb-6">
                <Image
                  src={creatorImage.src}
                  alt={creatorImage.alt}
                  width={creatorImage.width}
                  height={creatorImage.height}
                  className="rounded-full w-24 h-24 object-cover mr-6 border-4 border-primary"
                  data-ai-hint={creatorImage.hint}
                />
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    Hugo Quispe
                  </h3>
                  <p className="text-primary font-medium">
                    Visionario Principal
                  </p>
                </div>
              </div>
              <blockquote className="text-muted-foreground leading-relaxed" data-search-content="Referente en innovación digital, plataformas que integren datos, comunicación entre profesionales, diagnóstico clínico, calidad en sedes.">
                "Aspiramos a convertirnos en un <strong className="text-primary/90">referente en innovación digital</strong> para las sedes. Buscamos crear plataformas que integren datos, mejoren la comunicación entre profesionales y eleven los estándares de calidad en el diagnóstico clínico."
              </blockquote>
            </div>

            <div className="lg:w-1/3 w-full mt-6 lg:mt-0">
              <div className="bg-card rounded-xl overflow-hidden border shadow-2xl">
                <Image
                  src={featuredImage.src}
                  alt={featuredImage.alt}
                  width={featuredImage.width}
                  height={featuredImage.height}
                  className="w-full h-auto object-cover transition duration-300 hover:scale-[1.02] transform"
                  data-ai-hint={featuredImage.hint}
                />
                <div className="p-3 text-center bg-muted text-sm font-light text-muted-foreground">
                    Visión y Liderazgo Digital
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* BÚSQUEDA */}
        <SearchSection />

        {/* FRASE MOTIVACIONAL */}
        <section
          id="motivacion"
          className="section-padding bg-primary text-primary-foreground"
        >
          <QuoteDisplay quoteData={quoteData} isLoading={isLoading} />
        </section>
      </main>
      <Footer />
    </div>
  );
}

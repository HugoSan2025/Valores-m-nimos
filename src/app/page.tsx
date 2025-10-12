import Image from 'next/image';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import SearchSection from '@/components/landing/search-section';
import QuoteDisplay from '@/components/landing/quote-display';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card } from '@/components/ui/card';

export default function Home() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero');
  const creatorImage = PlaceHolderImages.find((p) => p.id === 'creator');
  const featuredImage = PlaceHolderImages.find((p) => p.id === 'featured');


  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        {/* HERO/INICIO */}
        <section id="inicio" className="section-padding pt-24">
          <Card className="flex flex-col lg:flex-row items-center gap-12 p-8 md:p-12">
            <div className="lg:w-1/2">
              <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-4">
                <span className="text-primary">Innovación</span> con rostro humano
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                La ciencia evoluciona, nosotros también.
              </p>
            </div>
            <div className="lg:w-1/2 w-full">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                  data-ai-hint={heroImage.imageHint}
                  priority
                />
              )}
            </div>
          </Card>
        </section>

        {/* CREADOR */}
        <section id="creador" className="section-padding bg-background">
          <h2 className="text-4xl font-bold text-center text-white mb-12">
            Conoce a Nuestro Creador
          </h2>
          <Card className="flex flex-col lg:flex-row gap-10 items-center p-8">
            <div className="lg:w-2/3">
              <div className="flex items-center mb-6">
                {creatorImage && (
                    <Image
                    src={creatorImage.imageUrl}
                    alt={creatorImage.description}
                    width={96}
                    height={96}
                    className="rounded-full w-24 h-24 object-cover mr-6 border-4 border-primary"
                    data-ai-hint={creatorImage.imageHint}
                    />
                )}
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    Hugo Quispe
                  </h3>
                  <p className="text-primary font-medium">
                    Visionario Principal
                  </p>
                </div>
              </div>
              <blockquote className="text-gray-300 leading-relaxed" data-search-content="Referente en innovación digital, plataformas que integren datos, comunicación entre profesionales, diagnóstico clínico, calidad en sedes.">
                "Aspiramos a convertirnos en un **referente en innovación digital** para las sedes. Buscamos crear plataformas que integren datos, mejoren la comunicación entre profesionales y eleven los estándares de calidad en el diagnóstico clínico."
              </blockquote>
            </div>

            <div className="lg:w-1/3 w-full mt-6 lg:mt-0">
                {featuredImage && (
                    <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
                        <Image
                            src={featuredImage.imageUrl}
                            alt={featuredImage.description}
                            width={400}
                            height={400}
                            className="w-full h-auto object-cover transition duration-300 hover:scale-[1.02] transform"
                            data-ai-hint={featuredImage.imageHint}
                        />
                        <div className="p-3 text-center bg-gray-700 text-sm font-light text-gray-300">
                            Visión y Liderazgo Digital
                        </div>
                    </div>
                )}
            </div>
          </Card>
        </section>

        {/* BÚSQUEDA */}
        <SearchSection />

        {/* FRASE MOTIVACIONAL */}
        <section
          id="motivacion"
          className="section-padding bg-primary text-white"
        >
            <QuoteDisplay />
        </section>
      </main>
      <Footer />
    </div>
  );
}

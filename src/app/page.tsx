import Image from 'next/image';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import SearchSection from '@/components/landing/search-section';
import QuoteDisplay from '@/components/landing/quote-display';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card } from '@/components/ui/card';

export default function Home() {
  const heroImage = PlaceHolderImages.find((p) => p.id === 'hero');
  const partnerImage = PlaceHolderImages.find((p) => p.id === 'partner');
  const projectImage = PlaceHolderImages.find((p) => p.id === 'project');
  const awardImage = PlaceHolderImages.find((p) => p.id === 'award');
  const certImage = PlaceHolderImages.find((p) => p.id === 'cert');

  const creatorPartners = [
    { image: partnerImage, label: 'Socio Cloud' },
    { image: projectImage, label: 'Proyecto Alpha' },
    { image: awardImage, label: 'Premio Innovación' },
    { image: certImage, label: 'Certificado Dev' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main>
        {/* HERO/INICIO */}
        <section id="inicio" className="section-padding pt-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 text-center lg:text-left">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-foreground leading-tight mb-4">
                  <span className="text-primary">Innovación</span> que Impulsa tu
                  Negocio
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8">
                  Somos tu socio estratégico para el desarrollo de software a
                  medida, aplicaciones móviles y soluciones de TI empresariales.
                  Construyendo el futuro digital, hoy.
                </p>
              </div>
              <div className="lg:w-1/2 w-full">
                {heroImage && (
                  <Card className="overflow-hidden rounded-2xl shadow-2xl">
                    <Image
                      src={heroImage.imageUrl}
                      alt={heroImage.description}
                      width={600}
                      height={400}
                      className="w-full h-auto object-cover aspect-[3/2]"
                      data-ai-hint={heroImage.imageHint}
                      priority
                    />
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CREADOR */}
        <section id="creador" className="section-padding bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
              Conoce a Nuestro Creador
            </h2>
            <Card className="p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="flex flex-col lg:flex-row gap-10 items-center">
                <div className="lg:w-2/3">
                  <div className="flex flex-col sm:flex-row items-center text-center sm:text-left mb-6">
                    <Image
                      src="/mi-foto.png"
                      alt="Imagen del Fundador"
                      width={100}
                      height={100}
                      className="rounded-full w-24 h-24 object-cover mr-0 sm:mr-6 mb-4 sm:mb-0 border-4 border-primary"
                      data-ai-hint="founder portrait"
                    />
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">
                        Javier Domínguez
                      </h3>
                      <p className="text-primary font-medium">
                        Fundador y Visionario Principal
                      </p>
                    </div>
                  </div>
                  <blockquote className="text-muted-foreground leading-relaxed italic border-l-4 border-border pl-4">
                    "Mi visión siempre ha sido simple: no solo construir
                    software, sino{' '}
                    <strong>construir imperios tecnológicos</strong> que resistan
                    el paso del tiempo. Creemos en la artesanía del código y en
                    la pasión por resolver los problemas más complejos de
                    nuestros clientes. Esto es más que un negocio; es una
                    misión."
                  </blockquote>
                </div>

                <div className="lg:w-1/3 w-full grid grid-cols-2 gap-4 mt-6 lg:mt-0">
                  {creatorPartners.map((partner, index) => (
                    <Card
                      key={index}
                      className="p-4 bg-muted/50 flex flex-col items-center justify-center text-center aspect-square hover:shadow-md transition-shadow"
                    >
                      {partner.image && (
                        <Image
                          src={partner.image.imageUrl}
                          alt={partner.image.description}
                          width={48}
                          height={48}
                          className="w-12 h-12 mb-2"
                          data-ai-hint={partner.image.imageHint}
                        />
                      )}
                      <p className="text-xs text-muted-foreground font-semibold">
                        {partner.label}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* BÚSQUEDA */}
        <SearchSection />

        {/* FRASE MOTIVACIONAL */}
        <section
          id="motivacion"
          className="section-padding bg-primary text-primary-foreground"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <QuoteDisplay />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

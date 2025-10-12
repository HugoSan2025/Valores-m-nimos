"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

type SearchableItem = {
  id: string;
  title: string;
  content: string;
  snippet: string;
  category: string;
  link: string;
};

export default function SearchSection() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchableItem[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const searchableContent = useMemo<SearchableItem[]>(() => [
    {
      id: 'creator-item-1',
      title: 'Hugo Quispe, Fundador',
      content: 'hugo quispe fundador visionario mi visión siempre ha sido simple: no solo construir software, sino construir imperios tecnológicos que resistan el paso del tiempo. creemos en la artesanía del código y en la pasión por resolver los problemas más complejos de nuestros clientes. esto es más que un negocio; es una misión.',
      snippet: '"Mi visión siempre ha sido simple: no solo construir software, sino construir imperios tecnológicos..."',
      category: 'Creador',
      link: '#creador',
    },
    { 
      id: 'gen-1', 
      title: 'Sobre Nuestra Misión de Innovación', 
      content: 'innovación que impulsa tu negocio. somos tu socio estratégico para el desarrollo de software a medida, aplicaciones móviles y soluciones de ti empresariales. construyendo el futuro digital, hoy.', 
      snippet: 'Somos tu socio estratégico para el desarrollo de software a medida, aplicaciones móviles y soluciones de TI empresariales.', 
      category: 'Acerca de', 
      link: '#inicio' 
    },
    { 
      id: 'gen-2', 
      title: 'Contacto y Redes', 
      content: 'contacto linkedin twitter email correo', 
      snippet: 'Información de contacto y redes sociales para empezar tu proyecto.', 
      category: 'Contacto', 
      link: '#contacto' 
    }
  ], []);

  const performSearch = () => {
    setHasSearched(true);
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const lowerCaseQuery = query.toLowerCase();
    const filteredResults = searchableContent.filter(item => 
      item.content.includes(lowerCaseQuery) || item.title.toLowerCase().includes(lowerCaseQuery)
    );
    setResults(filteredResults);
  };
  
  const handleSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  return (
    <section id="busqueda" className="section-padding">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
            <h2 className="text-4xl font-bold text-foreground mb-8">Buscar en el Sitio</h2>
            <Card className="flex mb-8 p-2">
              <Input
                type="text"
                id="searchInput"
                placeholder="Escribe 'Creador' o 'innovación' para buscar..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={handleSearchKey}
                className="flex-grow p-3 text-base sm:text-lg bg-card border-border focus-visible:ring-primary"
              />
              <Button onClick={performSearch} className="w-28 text-base bg-primary text-background hover:bg-secondary">
                <Search className="mr-2 h-5 w-5" /> Buscar
              </Button>
            </Card>
        </div>
        
        <div id="searchResults" className="min-h-[150px] text-left">
          {!hasSearched && (
            <p className="text-center text-muted-foreground mt-4">
              Los resultados aparecerán aquí.
            </p>
          )}
          {hasSearched && query.trim() && results.length === 0 && (
             <Card className="bg-destructive/20 border-l-4 border-destructive text-destructive-foreground p-4 text-center">
                <CardContent className="p-2 flex flex-col items-center gap-4">
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                  <div>
                    <p className="font-bold">No se encontraron resultados</p>
                    <p className="text-sm">Intenta con otra palabra clave (Ej: 'Creador', 'innovación', 'misión').</p>
                  </div>
                </CardContent>
              </Card>
          )}
          {results.length > 0 && (
            <div className="space-y-4">
              {results.map(item => (
                <Link href={item.link} key={item.id} className="block">
                    <Card className="text-left hover:shadow-lg hover:border-primary/50 transition-all duration-300 border-l-4 border-primary">
                        <CardContent className="p-6">
                        <p className="text-sm text-primary font-semibold mb-2">[ {item.category} ]</p>
                        <h4 className="text-xl font-semibold text-foreground mb-2 hover:text-primary transition">
                            {item.title}
                        </h4>
                        <p className="text-muted-foreground">{item.snippet}</p>
                        </CardContent>
                    </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

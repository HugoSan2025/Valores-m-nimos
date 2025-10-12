"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

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
      title: 'Javier Domínguez, Fundador',
      content: 'javier domínguez fundador visionario mi visión siempre ha sido simple: no solo construir software, sino construir imperios tecnológicos que resistan el paso del tiempo. creemos en la artesanía del código y en la pasión por resolver los problemas más complejos de nuestros clientes. esto es más que un negocio; es una misión.',
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
    <section id="busqueda" className="section-padding bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Buscar en el Sitio</h2>
            <div className="flex mb-8 rounded-xl shadow-lg p-2 bg-card border">
              <Input
                type="text"
                id="searchInput"
                placeholder="Escribe 'Creador' o 'innovación' para buscar..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={handleSearchKey}
                className="flex-grow p-3 text-base sm:text-lg bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button onClick={performSearch} className="w-28 text-base">
                <Search className="mr-2 h-5 w-5" /> Buscar
              </Button>
            </div>
        </div>
        
        <div id="searchResults" className="min-h-[150px] text-left">
          {!hasSearched && (
            <p className="text-center text-muted-foreground mt-4">
              Los resultados aparecerán aquí.
            </p>
          )}
          {hasSearched && query.trim() && results.length === 0 && (
             <Card className="bg-yellow-100/20 border-l-4 border-yellow-500/50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200 p-4 text-center">
                <CardContent className="p-2 flex flex-col items-center gap-4">
                  <AlertTriangle className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
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
                    <Card className="text-left hover:shadow-lg hover:border-primary/50 transition-all duration-300">
                        <CardContent className="p-6">
                        <p className="text-sm text-primary font-semibold mb-2">[ {item.category} ]</p>
                        <h4 className="text-xl font-semibold text-foreground mb-2">
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

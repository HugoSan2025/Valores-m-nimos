"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
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
      title: 'Hugo Quispe, Fundador y Visionario Principal', 
      content: 'hugo quispe fundador de it solutions, se dedica a la excelencia tecnológica y a la creación de productos innovadores.', 
      snippet: '"Mi visión siempre ha sido simple: no solo construir software, sino construir imperios tecnológicos..."', 
      category: 'Creador', 
      link: '#creador' 
    },
    { 
      id: 'gen-1', 
      title: 'Sobre Nuestra Misión', 
      content: 'somos una empresa de desarrollo de software con misión de excelencia e innovación', 
      snippet: 'Conoce nuestra misión de crear soluciones tecnológicas.', 
      category: 'Acerca de', 
      link: '#inicio' 
    },
    { 
      id: 'gen-2', 
      title: 'Contacto y Ubicación', 
      content: 'número de teléfono email ubicación contacto dirección', 
      snippet: 'Información de contacto para empezar tu proyecto.', 
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
        <h2 className="text-4xl font-bold text-center text-white mb-8">Buscar en el Sitio</h2>
        <div className="flex mb-8 card p-2 bg-card">
          <Input
            type="text"
            id="searchInput"
            placeholder="Escribe 'Creador' o 'innovación' para buscar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={handleSearchKey}
            className="flex-grow p-3 text-white focus:outline-none rounded-l-lg bg-card border border-border"
          />
          <Button onClick={performSearch} className="btn-primary flex items-center justify-center w-28">
            <i className="fas fa-search mr-2"></i> Buscar
          </Button>
        </div>
        
        <div id="searchResults" className="min-h-[150px]">
          {!hasSearched && (
            <p className="text-center text-gray-400 mt-4">
              Los resultados aparecerán aquí.
            </p>
          )}
          {hasSearched && query.trim() && results.length === 0 && (
             <div className="bg-red-900 border-l-4 border-red-500 text-red-100 p-4 rounded-lg">
                <p className="font-bold">No se encontraron resultados</p>
                <p>Intenta con otra palabra clave. (Ej: 'Creador', 'innovación', 'misión').</p>
             </div>
          )}
          {results.length > 0 && (
            <div className="space-y-4">
              {results.map(item => (
                <Link href={item.link} key={item.id} className="block">
                    <Card className="p-4 mb-4 bg-card border-l-4 border-primary">
                        <CardContent className="p-0">
                          <h4 className="text-xl font-semibold text-white mb-1">
                            <span className="hover:text-primary transition">{item.title}</span>
                          </h4>
                          <p className="text-sm text-blue-400 mb-2">[{item.category}]</p>
                          <p className="text-gray-300">{item.snippet}</p>
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

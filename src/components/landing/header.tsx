"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#creador', label: 'Creador' },
  { href: '#busqueda', label: 'Buscar' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);


  return (
    <header className="sticky top-0 bg-card/80 backdrop-blur-lg shadow-lg z-10 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="#inicio" className="text-4xl font-extrabold text-primary uppercase tracking-wider">
          Valores Minimos
        </Link>
        
        <nav className="hidden md:flex space-x-8 font-medium text-foreground">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-primary transition duration-150">
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="md:hidden">
         {isMounted && (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
                  <i className="fas fa-bars text-2xl"></i>
                  <span className="sr-only">Abrir menú</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs bg-card p-0">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center p-4 border-b">
                     <Link href="#inicio" className="text-xl font-extrabold text-primary uppercase tracking-wider" onClick={() => setIsOpen(false)}>
                        Valores Minimos
                     </Link>
                     <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                        <i className="fas fa-times text-2xl"></i>
                        <span className="sr-only">Cerrar menú</span>
                     </Button>
                  </div>
                  <nav className="flex-1 flex flex-col items-start space-y-4 p-4">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors duration-150"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}

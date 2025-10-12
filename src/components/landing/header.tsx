"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#creador', label: 'Creador' },
  { href: '#busqueda', label: 'Buscar' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-card/80 backdrop-blur-sm shadow-xl z-10 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="#inicio" className="text-4xl font-extrabold text-primary uppercase tracking-wider">
          Valores Minimos
        </Link>
        
        <nav className="hidden md:flex space-x-8 font-medium text-muted-foreground">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-primary transition duration-150">
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-card p-0">
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-4 border-b border-border">
                   <Link href="#inicio" className="text-xl font-extrabold text-primary uppercase tracking-wider" onClick={() => setIsOpen(false)}>
                      Valores Minimos
                   </Link>
                   <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                      <X className="h-6 w-6" />
                      <span className="sr-only">Cerrar menú</span>
                   </Button>
                </div>
                <nav className="flex-1 flex flex-col items-start space-y-4 p-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors duration-150"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

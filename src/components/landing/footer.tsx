"use client";

import { Linkedin, Twitter, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contacto" className="bg-card text-foreground p-8 border-t border-border">
      <div className="max-w-7xl mx-auto text-center">
        <p className="mb-2">&copy; {currentYear} Valores minimos. Todos los derechos reservados.</p>
        <p className="text-sm text-muted-foreground">Transformando tu visión en realidad digital.</p>
        <div className="mt-6 flex justify-center space-x-6">
          <Link href="#" className="text-muted-foreground hover:text-primary transition">
            <Linkedin className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary transition">
            <Twitter className="h-6 w-6" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="text-muted-foreground hover:text-primary transition">
            <Mail className="h-6 w-6" />
            <span className="sr-only">Correo</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

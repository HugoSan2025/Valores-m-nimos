"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);


  return (
    <footer id="contacto" className="bg-card text-white p-8 border-t border-border">
      <div className="max-w-7xl mx-auto text-center">
        <p className="mb-2">&copy; {currentYear} VALORES MINIMOS. Todos los derechos reservados.</p>
        <p className="text-sm text-gray-400">Transformando tu visión en realidad digital.</p>
        <div className="mt-4 flex justify-center space-x-4">
          <Link href="#" className="text-gray-400 hover:text-primary transition">
            <i className="fab fa-linkedin text-xl"></i>
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="#" className="text-gray-400 hover:text-primary transition">
            <i className="fab fa-twitter text-xl"></i>
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="text-gray-400 hover:text-primary transition">
            <i className="fas fa-envelope text-xl"></i>
            <span className="sr-only">Correo</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

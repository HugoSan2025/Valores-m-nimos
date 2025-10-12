"use client";

import { Linkedin, Twitter, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contacto" className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:px-8">
        <p className="mb-2">&copy; {currentYear} Valores minimos. Todos los derechos reservados.</p>
        <p className="text-sm text-gray-400">Transformando tu visión en realidad digital.</p>
        <div className="mt-6 flex justify-center space-x-6">
          <Link href="#" className="text-gray-400 hover:text-blue-500 transition">
            <Linkedin className="h-6 w-6" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link href="#" className="text-gray-400 hover:text-blue-500 transition">
            <Twitter className="h-6 w-6" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="#" className="text-gray-400 hover:text-blue-500 transition">
            <Mail className="h-6 w-6" />
            <span className="sr-only">Correo</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

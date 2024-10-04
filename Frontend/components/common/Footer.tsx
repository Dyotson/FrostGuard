import React from "react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 bg-white dark:bg-gray-900 border-t">
      <div className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2023 FrostGuard. Todos los derechos reservados.
        </p>
        <nav className="flex space-x-4 sm:space-x-6 mt-4 sm:mt-0">
          <Link
            className="text-xs text-gray-600 dark:text-gray-300 hover:underline underline-offset-4"
            href="#"
          >
            Términos de Servicio
          </Link>
          <Link
            className="text-xs text-gray-600 dark:text-gray-300 hover:underline underline-offset-4"
            href="#"
          >
            Privacidad
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

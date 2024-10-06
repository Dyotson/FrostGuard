import React from "react";
import Link from "next/link";
import Logo from "@/components/common/Logo";
import { Menu } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-white dark:bg-gray-900 shadow-md">
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2">
        <Logo className="h-8 w-8" />
        <span className="text-lg font-semibold text-gray-800 dark:text-white">
          FrostAway
        </span>
      </Link>

      {/* Navegación para pantallas medianas y grandes */}
      <nav className="hidden md:flex space-x-6">
        <Link
          className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:underline underline-offset-4"
          href="#features"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:underline underline-offset-4"
          href="#pricing"
        >
          Pricing
        </Link>
        <Link
          className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:underline underline-offset-4"
          href="#about"
        >
          About Us
        </Link>
        <Link
          className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:underline underline-offset-4"
          href="#contact"
        >
          Contact
        </Link>
      </nav>

      {/* Botón de menú móvil */}
      <div className="md:hidden">
        <input type="checkbox" id="menu-toggle" className="hidden peer" />
        <label htmlFor="menu-toggle" className="cursor-pointer">
          <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </label>

        {/* Menú móvil */}
        <nav className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-md hidden peer-checked:flex flex-col items-center space-y-4 py-4">
          <Link
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:underline underline-offset-4"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:underline underline-offset-4"
            href="#pricing"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:underline underline-offset-4"
            href="#about"
          >
            About Us
          </Link>
          <Link
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:underline underline-offset-4"
            href="#contact"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

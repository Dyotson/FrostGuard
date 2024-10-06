import React from "react";
import Link from "next/link";
import Logo from "@/components/common/Logo";
import { Menu } from "lucide-react";

const Header: React.FC = () => {

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center justify-between bg-white dark:bg-gray-900 shadow-md">
      <Link href="/" className="flex items-center space-x-2">
        <Logo className="h-8 w-8" />
        <span className="text-lg font-semibold text-gray-800 dark:text-white">
          FrostAway
        </span>
      </Link>

      <nav className="hidden md:flex space-x-6">
        <Link
          href="/aboutus"
          className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:underline underline-offset-4"
        >
          Features
        </Link>
        <Link
          href="/aboutus"
          className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:underline underline-offset-4"
        >
          Pricing
        </Link>
        <Link
          href="/aboutus"
          className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:underline underline-offset-4"
        >
          About Us
        </Link>
        <Link
          href="/aboutus"
          className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:underline underline-offset-4"
        >
          Contact
        </Link>
      </nav>

      <div className="md:hidden">
        <input type="checkbox" id="menu-toggle" className="hidden peer" />
        <label htmlFor="menu-toggle" className="cursor-pointer">
          <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        </label>

        <nav className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-md hidden peer-checked:flex flex-col items-center space-y-4 py-4">
          <Link
            href="/aboutus"
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:underline underline-offset-4"
          >
            Features
          </Link>
          <Link
            href="/aboutus"
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:underline underline-offset-4"
          >
            Pricing
          </Link>
          <Link
            href="/aboutus"
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:underline underline-offset-4"
          >
            About Us
          </Link>
          <Link
            href="/aboutus"
            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:underline underline-offset-4"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

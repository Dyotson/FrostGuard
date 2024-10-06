"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, AlertTriangle, Bell, Sprout, Settings } from "lucide-react";
import Logo from "@/components/common/Logo";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "General",
      href: "/dashboard/general",
      icon: <Home className="mr-2" />,
    },
    {
      name: "Alertas",
      href: "/dashboard/alerts",
      icon: <AlertTriangle className="mr-2" />,
    },
    {
      name: "Pronósticos",
      href: "/dashboard/activity",
      icon: <Bell className="mr-2" />,
    },
    {
      name: "Métodos de Control",
      href: "/dashboard/control_methods",
      icon: <Sprout className="mr-2" />,
    },
    {
      name: "Configuraciones",
      href: "/dashboard/configurations",
      icon: <Settings className="mr-2" />,
    },
  ];

  return (
    <nav className="bg-white p-4 flex flex-col h-full shadow-lg">
      <Link href="/" className="flex items-center space-x-2 mb-6">
        <Logo className="h-8 w-8" />
        <span className="text-lg font-semibold text-gray-800 dark:text-white">
          FrostAway
        </span>
      </Link>
      <ul className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center w-full text-left p-2 rounded ${
                  isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

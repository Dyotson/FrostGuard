"use client";

import { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Header para pantallas móviles */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-50 p-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">FrostAway</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      {/* Sidebar fijo para pantallas grandes */}
      <div className="hidden md:block w-64">
        <Sidebar />
      </div>

      {/* Contenido Principal */}
      <main className="flex-1 p-8 mt-16 md:mt-0 overflow-auto">{children}</main>
    </div>
  );
}

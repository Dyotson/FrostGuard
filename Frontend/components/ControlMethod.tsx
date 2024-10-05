
"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface ControlMethodProps {
  name: string;
  icon: ReactNode;
}

export default function ControlMethod({ name, icon }: ControlMethodProps) {
  return (
    <Card className="flex flex-col items-center p-4 hover:bg-gray-100 cursor-pointer transition-colors">
      {icon}
      <h3 className="mt-2 text-sm font-medium">{name}</h3>
      <Button className="mt-2" variant="outline" size="sm">
        Agregar
      </Button>
    </Card>
  );
}

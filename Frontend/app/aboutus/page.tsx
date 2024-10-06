import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import React from "react";

const teamMembers = [
  {
    name: "Maximiliano Militzer",
    role: "Encargado de...",
    linkedin: "https://www.linkedin.com/in/maxmilitzer/",
    github: "https://github.com/Dyotson",
    avatar: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Francisco Wulf",
    role: "Encargado de...",
    linkedin: "https://www.linkedin.com/in/0wulf",
    github: "https://github.com/0wulf",
    avatar: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Diego Costa",
    role: "Encargado de...",
    linkedin: "https://www.linkedin.com/in/diegocostar",
    github: "https://github.com/diegocostares",
    avatar: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Ignacio Muñoz",
    role: "Encargado de...",
    linkedin: "https://linkedin.com/in/ignacio-munoz-repetto",
    github: "https://github.com/itmunoz",
    avatar: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Gabriel Miranda Contreras",
    role: "Encargado de...",
    linkedin: "www.linkedin.com/in/gabriel-ignacio-miranda-contreras",
    github: "https://github.com/ggmirandac",
    avatar: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Maite Estay",
    role: "Encargado de...",
    linkedin: "https://www.linkedin.com/in/maite-estay-casanova-9a7511229/",
    github: "",
    avatar: "/placeholder.svg?height=400&width=400",
  },
];

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 bg-gradient-to-b py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">
            Nuestro Equipo
          </h1>
          <p className="text-center mb-12 text-lg text-gray-600 max-w-2xl mx-auto">
            Somos un equipo muy apasionado que participó en "NASA Space Apps
            Challenge 2024". Juntos, hemos creado FrostAway para revolucionar la
            protección de cultivos contra las heladas.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="w-32 h-32 mb-4">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">
                      {member.name}
                    </h2>
                    <p className="text-sm text-blue-600 mb-4">{member.role}</p>
                    <div className="flex space-x-2 mb-4">
                      {member.linkedin && (
                        <Button variant="outline" size="icon" asChild>
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      {member.github && (
                        <Button variant="outline" size="icon" asChild>
                          <a
                            href={member.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

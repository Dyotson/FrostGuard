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
    role: "CTO",
    linkedin: "https://www.linkedin.com/in/maxmilitzer/",
    github: "https://github.com/Dyotson",
    avatar: "https://media.licdn.com/dms/image/v2/D4E03AQEYjA2XAmnYGQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1719448146310?e=1733961600&v=beta&t=fwOI1ecoJ9y_yOjGN342EqDLQZFDDwno_f69lbCixfU",
  },
  {
    name: "Francisco Wulf",
    role: "Hardware Engineer & Embedded Systems Engineer",
    linkedin: "https://www.linkedin.com/in/0wulf",
    github: "https://github.com/0wulf",
    avatar: "https://media.licdn.com/dms/image/v2/D4D03AQHd15iy5eQg4g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1712691322903?e=1733961600&v=beta&t=WQN5kSQWso7owS_nzW1lZdAHiCMMZtRrHP3ua9-xTyU",
  },
  {
    name: "Diego Costa",
    role: "Frontend Engineer & UX/UI Designer",
    linkedin: "https://www.linkedin.com/in/diegocostar",
    github: "https://github.com/diegocostares",
    avatar: "https://media.licdn.com/dms/image/v2/D4E03AQGuczMU6gvOMg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718812788742?e=1733961600&v=beta&t=XtE7WML0RoNqzO1qzBOLf8A8QvBynUOdLxe8enETwtk",
  },
  {
    name: "Ignacio Muñoz",
    role: "Backend Engineer",
    linkedin: "https://linkedin.com/in/ignacio-munoz-repetto",
    github: "https://github.com/itmunoz",
    avatar: "https://media.licdn.com/dms/image/v2/C4E03AQHztLucZSBK0g/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1630514401155?e=1733961600&v=beta&t=RqfeEAbn1OU5uxeU7ubLQqBNzKHeXKGcrG_f2cTiHDI",
  },
  {
    name: "Gabriel Miranda Contreras",
    role: "Data Science & AI/ML Engineer",
    linkedin: "www.linkedin.com/in/gabriel-ignacio-miranda-contreras",
    github: "https://github.com/ggmirandac",
    avatar: "https://media.licdn.com/dms/image/v2/C4E03AQG02eZuwdNkiQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1658099914299?e=1733961600&v=beta&t=C9KfPdNI5O_CABEKAMB8X2GxecIQAI3KJvLAqCLjGO0",
  },
  {
    name: "Maite Estay",
    role: "CEO",
    linkedin: "https://www.linkedin.com/in/maite-estay-casanova-9a7511229/",
    github: "",
    avatar: "https://media.licdn.com/dms/image/v2/D4E03AQHnrnkfsh0b_A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1713659018639?e=1733961600&v=beta&t=nC-cMNTIur5VxK0VNT3kP595ewt_Gjv55kOvXfEEbIQ",
  },
];

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 bg-gradient-to-b py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">
            Our Team
          </h1>
          <p className="text-center mb-12 text-lg text-gray-600 max-w-2xl mx-auto">
            We are a passionate team that participated in the "NASA Space Apps
            Challenge 2024". Together, we created FrostAway to revolutionize crop
            protection against frost.
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
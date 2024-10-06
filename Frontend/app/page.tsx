import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ThermometerSnowflake, Bell, BarChart, Shield } from "lucide-react";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Welcome Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-800 dark:text-white">
                  Welcome to FrostAway
                </h1>
                <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400 text-lg md:text-xl">
                  Protect your crops with precise alerts and real-time analysis
                  of adverse weather conditions.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                    Go to Dashboard
                  </Button>
                </Link>
                <Link href="/aboutus" className="w-full sm:w-auto">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Learn more
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-8 text-gray-800 dark:text-white">
              Key Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 */}
              <Link href="/aboutus" className="w-full">
                <Card className="flex flex-col items-center text-center p-6">
                  <CardHeader className="flex flex-col items-center">
                    <Bell className="h-8 w-8 mb-4 text-primary" />
                    <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
                      Real-Time Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Receive instant notifications about weather conditions
                      that could affect your crops.
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>

              {/* Card 2 */}
              <Link href="/aboutus" className="w-full">
                <Card className="flex flex-col items-center text-center p-6">
                  <CardHeader className="flex flex-col items-center">
                    <BarChart className="h-8 w-8 mb-4 text-primary" />
                    <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
                      Predictive Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Use advanced models to predict and prevent frost damage
                      and other weather events.
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>

              {/* Card 3 */}
              <Link href="/aboutus" className="w-full">
                <Card className="flex flex-col items-center text-center p-6">
                  <CardHeader className="flex flex-col items-center">
                    <Shield className="h-8 w-8 mb-4 text-primary" />
                    <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
                      Smart Protection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Implement custom protection strategies based on specific
                      data from your location.
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>

              {/* Card 4 */}
              <Link href="/aboutus" className="w-full">
                <Card className="flex flex-col items-center text-center p-6">
                  <CardHeader className="flex flex-col items-center">
                    <ThermometerSnowflake className="h-8 w-8 mb-4 text-primary" />
                    <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
                      Continuous Monitoring
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      Continuously monitor weather conditions to keep your crops
                      safe at all times.
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
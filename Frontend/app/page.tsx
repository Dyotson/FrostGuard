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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main */}
      <main className="flex-1">
        {/* Sección de Bienvenida */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-gray-800 dark:text-white">
                  Bienvenido a FrostGuard
                </h1>
                <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-400 text-lg md:text-xl">
                  Protege tus cultivos con alertas precisas y análisis en tiempo
                  real de condiciones climáticas adversas.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
                    Ir al Dashboard
                  </Button>
                </Link>
                <Button variant="outline" className="w-full sm:w-auto">
                  Saber más
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Características */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-8 text-gray-800 dark:text-white">
              Características Principales
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Tarjeta 1 */}
              <Card className="flex flex-col items-center text-center p-6">
                <CardHeader className="flex flex-col items-center">
                  <Bell className="h-8 w-8 mb-4 text-primary" />
                  <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
                    Alertas en Tiempo Real
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Recibe notificaciones instantáneas sobre condiciones
                    climáticas que puedan afectar tus cultivos.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Tarjeta 2 */}
              <Card className="flex flex-col items-center text-center p-6">
                <CardHeader className="flex flex-col items-center">
                  <BarChart className="h-8 w-8 mb-4 text-primary" />
                  <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
                    Análisis Predictivo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Utiliza modelos avanzados para predecir y prevenir daños por
                    heladas y otros eventos climáticos.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Tarjeta 3 */}
              <Card className="flex flex-col items-center text-center p-6">
                <CardHeader className="flex flex-col items-center">
                  <Shield className="h-8 w-8 mb-4 text-primary" />
                  <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
                    Protección Inteligente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Implementa estrategias de protección personalizadas basadas
                    en datos específicos de tu ubicación.
                  </CardDescription>
                </CardContent>
              </Card>

              {/* Tarjeta 4 */}
              <Card className="flex flex-col items-center text-center p-6">
                <CardHeader className="flex flex-col items-center">
                  <ThermometerSnowflake className="h-8 w-8 mb-4 text-primary" />
                  <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
                    Monitoreo Continuo
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    Supervisa constantemente las condiciones climáticas para
                    mantener tus cultivos seguros en todo momento.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

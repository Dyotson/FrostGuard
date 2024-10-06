import type { Metadata } from "next";
import "./globals.css";
import { geistSans, geistMono } from "./fonts";

// Metadatos mejorados para SEO
export const metadata: Metadata = {
  //   metadataBase: new URL("http://frostaway.earth/"),
  title: "FrostAway - Protege tus cultivos",
  description:
    "Plataforma para monitorear condiciones climáticas y proteger cultivos de manera efectiva.",
  //   openGraph: {
  //     title: "FrostAway",
  //     description: "Monitoreo de clima en tiempo real para cultivos.",
  //     // url: "http://frostaway.earth/",
  //     siteName: "FrostAway",
  //     images: [
  //       {
  //         url: "/assets/logo.svg",
  //         width: 1200,
  //         height: 630,
  //         alt: "FrostAway logo",
  //       },
  //     ],
  //     locale: "es_ES",
  //     type: "website",
  //   },
  //   twitter: {
  //     card: "summary_large_image",
  //     site: "@frostaway",
  //     title: "FrostAway",
  //     description: "Protege tus cultivos con monitoreo en tiempo real.",
  //     images: ["/assets/logo.svg"],
  //   },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/assets/logo.svg" type="image/svg+xml" />

        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Protege tus cultivos con monitoreo en tiempo real." />
        <meta name="theme-color" content="#ffffff" />

        {/* Metadatos de OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="FrostAway - Protege tus cultivos" />
        <meta property="og:description" content="Plataforma para monitorear condiciones climáticas y proteger cultivos de manera efectiva." />
        <meta property="og:image" content="/assets/logo.svg" />
        {/* <meta property="og:url" content="http://frostaway.earth/" /> */}
        <meta property="og:locale" content="es_ES" />

        {/* Metadatos de Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@frostaway" />
        <meta name="twitter:title" content="FrostAway" />
        <meta name="twitter:description" content="Protege tus cultivos con monitoreo en tiempo real." />
        <meta name="twitter:image" content="/assets/logo.svg" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
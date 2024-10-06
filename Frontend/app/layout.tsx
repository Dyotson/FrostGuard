import type { Metadata } from "next";
import "./globals.css";
import { geistSans, geistMono } from "./fonts";

// Enhanced metadata for SEO
export const metadata: Metadata = {
  //   metadataBase: new URL("http://frostaway.earth/"),
  title: "FrostAway - Protect Your Crops",
  description:
    "Platform to monitor weather conditions and effectively protect crops.",
  //   openGraph: {
  //     title: "FrostAway",
  //     description: "Real-time weather monitoring for crops.",
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
  //     description: "Protect your crops with real-time monitoring.",
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
        <meta name="description" content="Protect your crops with real-time monitoring." />
        <meta name="theme-color" content="#ffffff" />

        {/* OpenGraph Metadata */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="FrostAway - Protect Your Crops" />
        <meta property="og:description" content="Platform to monitor weather conditions and effectively protect crops." />
        <meta property="og:image" content="/assets/logo.svg" />
        {/* <meta property="og:url" content="http://frostaway.earth/" /> */}
        <meta property="og:locale" content="es_ES" />

        {/* Twitter Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@frostaway" />
        <meta name="twitter:title" content="FrostAway" />
        <meta name="twitter:description" content="Protect your crops with real-time monitoring." />
        <meta name="twitter:image" content="/assets/logo.svg" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
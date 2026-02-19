import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import { LanguageProvider } from "@/context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MiPapantla | Donde la tradición cobra vida",
  description:
    "Explora las maravillas culturales, naturales y turísticas de Papantla desde una sola aplicación.",

  manifest: "/manifest.json",

  themeColor: "#0f172a",

  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "MiPapantla",
  },

  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
  },

  openGraph: {
    title: "MiPapantla",
    description:
      "Directorio digital de negocios, cultura y servicios de Papantla",
    url: "https://mipapantla.com",
    siteName: "MiPapantla",
    images: [
      {
        url: "/icons/icon-512.png",
        width: 512,
        height: 512,
        alt: "MiPapantla Logo",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {/* Splash iOS */}
        <link
          rel="apple-touch-startup-image"
          href="/splash/splash.png"
        />

        {/* Safari PWA theme */}
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />

        {/* Color barra navegador Android */}
        <meta name="theme-color" content="#0f172a" />
      </head>

      <body suppressHydrationWarning className="antialiased bg-[#0f172a] text-white">
        <LanguageProvider>
          <ClientBody>{children}</ClientBody>
        </LanguageProvider>
      </body>
    </html>
  );
}

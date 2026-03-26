import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import { LanguageProvider } from "@/context/LanguageContext";
import { GoogleAnalytics } from "@next/third-parties/google";

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
  description: "Explora las maravillas culturales, naturales y turísticas de Papantla.",
  icons: {
    icon: "/icons/icon-192.png",
  },
  openGraph: {
    title: "MiPapantla",
    description: "Directorio digital de negocios, cultura y servicios de Papantla",
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

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning className="antialiased bg-[#0f172a] text-white">
        <LanguageProvider>
          <ClientBody>{children}</ClientBody>
        </LanguageProvider>
        <GoogleAnalytics gaId="G-29WL3L3T5K" />
      </body>
    </html>
  );
}

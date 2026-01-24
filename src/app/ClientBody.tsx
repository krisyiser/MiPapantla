"use client";

import { useEffect, useState } from "react";
import AppLoader from "./components/AppLoader";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);

  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    document.body.className = "antialiased";

    // Detect iOS
    const ua = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(ua);
    setIsIOS(ios);

    // Detect if already installed
    const checkInstalled = () => {
      if (window.matchMedia("(display-mode: standalone)").matches) {
        setIsInstalled(true);
      }

      // iOS standalone detection
      if ("standalone" in window.navigator && (window.navigator as Navigator & { standalone?: boolean }).standalone) {
        setIsInstalled(true);
      }
    };

    checkInstalled();

    // Install prompt handler (Android)
    const handler = (e: Event) => {
      const event = e as BeforeInstallPromptEvent;
      event.preventDefault();
      setDeferredPrompt(event);
      setIsInstallable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;

    if (result.outcome === "accepted") {
      console.log("PWA installed");
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  return (
    <div className="antialiased relative min-h-screen">
      {/* LOADER */}
      <AppLoader />

      {/* INSTALL BAR — Android */}
      {!isInstalled && isInstallable && !isIOS && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-4">
          <span className="text-sm">
            Instalar la app de <strong>MiPapantla</strong>
          </span>
          <button
            onClick={handleInstall}
            className="bg-white text-black px-3 py-1 rounded-md text-sm font-medium hover:bg-gray-200 transition"
          >
            Instalar
          </button>
        </div>
      )}

      {/* INSTALL BAR — iOS */}
      {!isInstalled && isIOS && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-5 py-3 rounded-xl shadow-xl text-sm max-w-xs text-center">
          Para instalar MiPapantla, toca <strong>Compartir</strong> y luego{" "}
          <strong>“Agregar a pantalla de inicio”</strong>
        </div>
      )}

      {children}
    </div>
  );
}

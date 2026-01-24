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
  const [showPrompt, setShowPrompt] = useState(true);

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
      if (
        "standalone" in window.navigator &&
        (window.navigator as Navigator & { standalone?: boolean }).standalone
      ) {
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
      setShowPrompt(false);
    }
  };

  return (
    <div className="antialiased relative min-h-screen">
      {/* LOADER */}
      <AppLoader />

      {/* INSTALL MODAL */}
      {!isInstalled && showPrompt && (isInstallable || isIOS) && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-md px-6">
          <div className="bg-[#0f172a] text-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center space-y-4 animate-fade-in">
            <h3 className="text-lg font-bold tracking-wide">
              Instalar MiPapantla
            </h3>

            {!isIOS ? (
              <p className="text-sm text-white/80">
                Agrega MiPapantla a tu pantalla de inicio para una experiencia
                rápida, offline y como una app real.
              </p>
            ) : (
              <p className="text-sm text-white/80">
                En iPhone: toca <strong>Compartir</strong> y luego{" "}
                <strong>“Agregar a pantalla de inicio”</strong>
              </p>
            )}

            <div className="flex gap-3 justify-center pt-2">
              {!isIOS && (
                <button
                  onClick={handleInstall}
                  className="bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-200 transition"
                >
                  Instalar
                </button>
              )}

              <button
                onClick={() => setShowPrompt(false)}
                className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm hover:bg-white/20 transition"
              >
                Ahora no
              </button>
            </div>
          </div>
        </div>
      )}

      {children}
    </div>
  );
}

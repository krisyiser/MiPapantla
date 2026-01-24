"use client";

import { useEffect, useState } from "react";

export default function AppLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0f172a] transition-opacity duration-700">
      <div className="flex flex-col items-center animate-fadeIn">
        <img
          src="/splash/splash.png"
          alt="MiPapantla Logo"
          className="w-40 h-40 object-contain animate-pulseSoft"
        />
      </div>
    </div>
  );
}

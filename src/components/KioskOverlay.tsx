"use client";

import { X, Smartphone, QrCode } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface KioskOverlayProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function KioskOverlay({ isVisible, onClose }: KioskOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-[#1a2236]/90 border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-3xl" />

            {/* Header */}
            <div className="flex justify-end p-4">
              <button
                onClick={onClose}
                className="p-2 text-white/50 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="px-8 pb-10 text-center space-y-8">
              {/* Icon & Title */}
              <div className="space-y-3">
                <div className="flex justify-center">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 shadow-inner group">
                    <Smartphone
                      className="text-purple-400 group-hover:scale-110 transition-transform duration-300"
                      size={48}
                    />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white tracking-tight">
                  ¡Llévate la app contigo!
                </h2>
                <p className="text-gray-400 text-lg">
                  Escanea el código para ver el contenido completo y navegar por
                  toda la guía interactiva.
                </p>
              </div>

              {/* QR Code Placeholder */}
              <div className="flex justify-center">
                <div className="relative p-6 bg-white rounded-3xl shadow-2xl transition-transform hover:scale-105 duration-300">
                  <div className="w-48 h-48 flex items-center justify-center bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl overflow-hidden">
                    {/* Generamos un QR via API pública para facilitar la demo */}
                    <img
                      src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=https://mipapantla.com"
                      alt="QR Code MiPapantla"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-purple-600 rounded-full shadow-lg">
                    <span className="text-white text-xs font-bold uppercase tracking-widest whitespace-nowrap flex items-center gap-2">
                       <QrCode size={12} /> Escanea Aquí
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer text */}
              <div className="pt-4 border-t border-white/5">
                <p className="text-white/40 text-sm italic">
                  Disponible para iOS y Android como Web App (PWA).
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

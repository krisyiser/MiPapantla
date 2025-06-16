// src/app/mapa/page.tsx

import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'

export default function Mapa() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow flex flex-col">
        <div className="text-center p-4">
          <h1 className="text-3xl font-bold text-[#2c363b] mb-2">Mapa Interactivo de Papantla</h1>
          <p className="text-base text-gray-600">
            Explora los puntos turísticos, culturales y servicios desde nuestro mapa interactivo.
          </p>
        </div>

        <div className="flex-grow w-full px-4 pb-4">
          <div className="w-full h-[60vh] md:h-[75vh] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/d/u/2/embed?mid=1pycmXHD4yq0Fq5xi3YYyJOQM3A8UEi4&ehbc=2E312F&noprof=1"
              className="w-full h-full border-none"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  )
}

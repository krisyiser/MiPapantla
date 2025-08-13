// src/app/hoteles/page.tsx
import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import { fetchBusinesses } from '@/lib/fetchBusinesses'
import BusinessCard from '@/components/BusinessCard'

export default async function Hoteles() {
  const all = await fetchBusinesses()
  // Coincide con "Hotel" aunque vengan varios giros en la misma celda
  const hoteles = all.filter(b => b.giros.some(g => g.includes('hotel')))

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Hero */}
        <div className="relative h-64 rounded-lg overflow-hidden mb-8">
          <img
            src="/pictures/hotel.png"
            alt="Hoteles en Papantla"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-2">Hospedaje en Papantla</h1>
              <p className="text-xl">Encuentra el lugar perfecto para descansar</p>
            </div>
          </div>
        </div>

        {/* Grid de hoteles */}
        <h2 className="text-3xl font-bold text-[#2c363b] mb-6">
          Hoteles ({hoteles.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hoteles.map((h) => (
            <BusinessCard
              key={h.id}
              tituloTag="Hotel"
              image="/pictures/hotel.png"
              rating={4}             // si luego quieres rating real, lo añadimos al form
              negocio={h}
            />
          ))}
        </div>
      </main>
      <BottomNavigation />
    </div>
  )
}

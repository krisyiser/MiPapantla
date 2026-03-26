// src/app/vida-nocturna/page.tsx

import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import { Music, Clock, Martini } from 'lucide-react'
import { fetchBusinesses } from '@/lib/fetchBusinesses'
import BusinessCard from '@/components/BusinessCard'
import SectionHero from '@/components/SectionHero'
import { businessInSection } from '@/lib/giros'

export default async function VidaNocturna() {
  const all = await fetchBusinesses()

  // Filtra por sección 'vida-nocturna'
  const venues = all
    .filter(b => businessInSection(b, 'vida-nocturna'))
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }))

  const events = [
    { day: "Viernes", event: "Ronda Jarocha", description: "Música tradicional en bares del centro histórico" },
    { day: "Sábado", event: "Noche Bohemia", description: "Cantos, poesía y trova" },
    { day: "Domingo", event: "Cierre Cultural", description: "Narraciones y conciertos acústicos" }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6 pb-20">
        
        <SectionHero 
          imageSrc="/pictures/vida nocturna.jpg"
          titleKey="hero.vidaNocturna.title"
          subtitleKey="hero.vidaNocturna.subtitle"
        />

        <div className="flex justify-center items-center space-x-6 text-sm mb-8 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center text-[#814739]">
            <Music className="mr-2" size={20} />
            <span>Música en vivo</span>
          </div>
          <div className="flex items-center text-[#814739]">
            <Clock className="mr-2" size={20} />
            <span>Horarios extendidos</span>
          </div>
          <div className="flex items-center text-[#814739]">
            <Martini className="mr-2" size={20} />
            <span>Coctelería</span>
          </div>
        </div>

        {/* Lugares */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#2c363b] mb-6">
            Lugares Destacados ({venues.length})
          </h2>
          
          {venues.length === 0 ? (
            <div className="text-gray-600 bg-white border border-gray-100 rounded-lg p-6 text-center">
              <p className="text-lg font-semibold">Aún no hay lugares de vida nocturna registrados.</p>
              <p className="text-sm mt-2">Vuelve pronto para descubrir la noche en Papantla.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {venues.map((v) => (
                <BusinessCard 
                  key={v.id}
                  tituloTag="Vida Nocturna"
                  rating={5}
                  negocio={v}
                />
              ))}
            </div>
          )}
        </div>

        {/* Eventos */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border border-purple-100">
          <h2 className="text-3xl font-bold text-[#2c363b] mb-6 flex items-center">
             Eventos de la Semana
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <div key={index} className="border-l-4 border-purple-600 pl-4 py-2">
                <h3 className="font-bold text-purple-600 text-lg">{event.day}</h3>
                <h4 className="font-semibold text-[#2c363b]">{event.event}</h4>
                <p className="text-gray-600 text-sm mt-1">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <BottomNavigation />
    </div>
  )
}

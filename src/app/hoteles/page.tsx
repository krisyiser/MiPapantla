// src/app/hoteles/page.tsx
import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import { fetchBusinesses } from '@/lib/fetchBusinesses'
import BusinessCard from '@/components/BusinessCard'
import { businessInSection } from '@/lib/giros'
import { BedDouble, Wifi, Car, Coffee } from 'lucide-react'
import Image from 'next/image'

// Server Component
export default async function Hoteles() {
  const all = await fetchBusinesses()

  // Filtra por sección usando el helper (soporta celdas con múltiples giros)
  const hoteles = all
    .filter(b => businessInSection(b, 'hospedaje'))
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }))

  // “Amenidades” solo son informativas/estéticas (no filtran nada)
  const amenidades = [
    { icon: BedDouble, label: 'Camas cómodas', hint: 'Descanso garantizado' },
    { icon: Wifi, label: 'Wi-Fi', hint: 'Conéctate sin complicaciones' },
    { icon: Car, label: 'Estacionamiento', hint: 'Comodidad para llegar' },
    { icon: Coffee, label: 'Café/Desayuno', hint: 'Empieza bien tu día' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Hero */}
        <section className="relative h-64 rounded-lg overflow-hidden mb-8">
          <Image
            src="/pictures/hospedaje.jpeg"
            alt="Hoteles en Papantla"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-2">Hospedaje en Papantla</h1>
              <p className="text-xl">Encuentra el lugar perfecto para descansar</p>
            </div>
          </div>
        </section>

        {/* Amenidades destacadas (UI informativa, sin filtros) */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {amenidades.map((a, i) => {
            const Icon = a.icon
            return (
              <div
                key={i}
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-[#bb904d] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-semibold text-[#2c363b]">{a.label}</h3>
                <p className="text-xs text-gray-600 mt-1">{a.hint}</p>
              </div>
            )
          })}
        </section>

        {/* Listado de hoteles */}
        <section className="mb-8">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-3xl font-bold text-[#2c363b]">
              Hoteles ({hoteles.length})
            </h2>
          </div>

          {hoteles.length === 0 ? (
            <div className="text-gray-600 bg-white border border-gray-100 rounded-lg p-6">
              Aún no hay hoteles registrados. Vuelve pronto.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hoteles.map((h) => (
                <BusinessCard
                  key={h.id}
                  tituloTag="Hotel"
                  rating={4}
                  negocio={h}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <BottomNavigation />
    </div>
  )
}

// src/app/transporte/page.tsx

import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import { PhoneCall } from 'lucide-react'
import { fetchBusinesses } from '@/lib/fetchBusinesses'
import BusinessCard from '@/components/BusinessCard'
import { businessInSection } from '@/lib/giros'

const taxiServices = [
  {
    name: 'Radio Taxi Naku',
    phone: '7848425872'
  },
  {
    name: 'Radio Taxi Papantla',
    phone: '7841046824'
  },
  {
    name: 'Radio Taxi Voladores',
    phone: '7848426606'
  },
  {
    name: 'Radio Taxi Express',
    phone: '7841046824'
  }
]

export default async function Transporte() {
  const all = await fetchBusinesses()

  const estacionamientos = all
    .filter(b => businessInSection(b, 'transporte'))
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }))

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-6 pb-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#2c363b] mb-4">Transporte Local</h1>
          <p className="text-lg text-gray-600">
            Encuentra servicios de taxi disponibles en Papantla. Llama directamente desde la app.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#2c363b] mb-6">Taxis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {taxiServices.map((service, index) => (
              <a
                key={index}
                href={`tel:${service.phone}`}
                className="flex items-center justify-between bg-red-700 hover:bg-red-800 text-white text-lg font-semibold rounded-lg px-6 py-4 shadow-md transition-colors border-l-4 border-yellow-400"
              >
                <span>{service.name}</span>
                <PhoneCall size={24} />
              </a>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#2c363b]">
              Estacionamientos ({estacionamientos.length})
            </h2>
          </div>

          {estacionamientos.length === 0 ? (
            <div className="text-gray-600 bg-white border border-gray-100 rounded-lg p-6">
              Aún no hay estacionamientos registrados. Vuelve pronto.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {estacionamientos.map((est) => (
                <BusinessCard
                  key={est.id}
                  tituloTag="Estacionamiento"
                  rating={4}
                  negocio={est}
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

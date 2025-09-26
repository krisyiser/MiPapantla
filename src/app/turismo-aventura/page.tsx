// src/app/agencias/page.tsx
import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import { fetchBusinesses } from '@/lib/fetchBusinesses'
import BusinessCard from '@/components/BusinessCard'
import { businessInSection } from '@/lib/giros'
import { Map, Compass, CalendarRange, Users } from 'lucide-react'

// Server Component
export default async function Agencias() {
  const all = await fetchBusinesses()

  // Soporta celdas con múltiples giros. Usamos el helper
  // y añadimos un fallback por substring “agencia”.
  const agencias = all
    .filter(b => businessInSection(b, 'turismo') || b.giros.some(g => g.includes('agencia')))
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }))

  const highlights = [
    { icon: Map,            title: 'Rutas y recorridos',     hint: 'Explora Papantla y alrededores' },
    { icon: Compass,        title: 'Guías certificados',     hint: 'Acompañamiento profesional' },
    { icon: CalendarRange,  title: 'Experiencias programadas', hint: 'Agenda flexible' },
    { icon: Users,          title: 'Grupos y privados',      hint: 'Hecho a tu medida' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Hero sin depender de assets locales */}
        <section className="relative h-56 rounded-lg overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-500" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl font-bold mb-1">Agencias de Turismo</h1>
              <p className="text-lg opacity-95">Tours, experiencia y cultura totonaca</p>
            </div>
          </div>
        </section>

        {/* Highlights informativos */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {highlights.map((h, i) => {
            const Icon = h.icon
            return (
              <div
                key={i}
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 text-center hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-[#bb904d] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-semibold text-[#2c363b]">{h.title}</h3>
                <p className="text-xs text-gray-600 mt-1">{h.hint}</p>
              </div>
            )
          })}
        </section>

        {/* Listado dinámico */}
        <section className="mb-8">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-3xl font-bold text-[#2c363b]">
              Agencias ({agencias.length})
            </h2>
          </div>

          {agencias.length === 0 ? (
            <div className="text-gray-600 bg-white border border-gray-100 rounded-lg p-6">
              Aún no hay agencias registradas. Vuelve pronto.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agencias.map((a) => (
                <BusinessCard
                  key={a.id}
                  tituloTag="Agencia"
                  rating={4}
                  negocio={a}
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

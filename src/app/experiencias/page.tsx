// src/app/experiencias/page.tsx
import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import { fetchBusinesses } from '@/lib/fetchBusinesses'
import BusinessCard from '@/components/BusinessCard'
import { businessInSection } from '@/lib/giros'
import { Sparkles, Camera, Leaf, Footprints } from 'lucide-react'

// Server Component
export default async function Experiencias() {
  const all = await fetchBusinesses()

  // Soporta celdas con múltiples giros (helper + fallback por substring)
  const experiencias = all
    .filter(
      (b) => businessInSection(b, 'experiencias') || b.giros.some((g) => g.includes('experien'))
    )
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }))

  const highlights = [
    { icon: Sparkles,   title: 'Cultura viva',         hint: 'Tradiciones y saberes' },
    { icon: Camera,     title: 'Momentos únicos',      hint: 'Tours fotográficos' },
    { icon: Leaf,       title: 'Naturaleza',           hint: 'Rutas ecoturísticas' },
    { icon: Footprints, title: 'Caminatas guiadas',    hint: 'Senderos y relatos' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Hero (gradiente, sin depender de assets locales) */}
        <section className="relative h-56 rounded-lg overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-700 via-fuchsia-600 to-pink-500" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl font-bold mb-1">Experiencias</h1>
              <p className="text-lg opacity-95">Vive Papantla con todos los sentidos</p>
            </div>
          </div>
        </section>

        {/* Highlights */}
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
              Experiencias ({experiencias.length})
            </h2>
          </div>

          {experiencias.length === 0 ? (
            <div className="text-gray-600 bg-white border border-gray-100 rounded-lg p-6">
              Aún no hay experiencias registradas. Vuelve pronto.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiencias.map((e) => (
                <BusinessCard
                  key={e.id}
                  tituloTag="Experiencia"
                  rating={4}
                  negocio={e}
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

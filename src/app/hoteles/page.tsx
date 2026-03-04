// src/app/hoteles/page.tsx
import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import { fetchBusinesses } from '@/lib/fetchBusinesses'
import BusinessCard from '@/components/BusinessCard'
import SectionHero from '@/components/SectionHero'
import { businessInSection } from '@/lib/giros'
// Server Component
export default async function Hoteles() {
  const all = await fetchBusinesses()

  // Filtra por sección usando el helper
  const hoteles = all
    .filter(b => businessInSection(b, 'hospedaje'))
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }))
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Hero Reutilizable */}
        <SectionHero
          imageSrc="/pictures/hospedaje.jpeg"
          titleKey="hero.hoteles.title"
          subtitleKey="hero.hoteles.subtitle"
        />

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

// src/app/vainilla/page.tsx
import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import { fetchBusinesses } from '@/lib/fetchBusinesses'
import BusinessCard from '@/components/BusinessCard'
import SectionHero from '@/components/SectionHero'
import { businessInSection } from '@/lib/giros'
// Server Component
export default async function Vainilla() {
  const all = await fetchBusinesses()

  const vainilla = all
    .filter(
      (b) =>
        businessInSection(b, 'vainilla') ||
        b.giros.some((g) => g.includes('vainilla'))
    )
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }))
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Hero */}
        <SectionHero
          imageSrc="/pictures/vainilla.jpg"
          titleKey="hero.vainilla.title"
          subtitleKey="hero.vainilla.subtitle"
        />

        {/* Listado dinámico */}
        <section className="mb-8">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-3xl font-bold text-[#2c363b]">
              Productores y experiencias ({vainilla.length})
            </h2>
          </div>

          {vainilla.length === 0 ? (
            <div className="text-gray-600 bg-white border border-gray-100 rounded-lg p-6">
              Aún no hay registros en esta sección. Vuelve pronto.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vainilla.map((v) => (
                <BusinessCard
                  key={v.id}
                  tituloTag="Vainilla"
                  rating={4}
                  negocio={v}
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

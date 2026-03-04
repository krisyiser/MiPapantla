// src/app/experiencias/page.tsx
import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import { fetchBusinesses } from '@/lib/fetchBusinesses'
import BusinessCard from '@/components/BusinessCard'
import SectionHero from '@/components/SectionHero'
import { businessInSection } from '@/lib/giros'
// Server Component
export default async function Experiencias() {
  const all = await fetchBusinesses()

  // Soporta celdas con múltiples giros
  const experiencias = all
    .filter(
      (b) => businessInSection(b, 'experiencias') || b.giros.some((g) => g.includes('experien'))
    )
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }))
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Hero Reutilizable */}
        <SectionHero
          imageSrc="/pictures/experiencias.jpg"
          titleKey="hero.experiencias.title"
          subtitleKey="hero.experiencias.subtitle"
        />

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

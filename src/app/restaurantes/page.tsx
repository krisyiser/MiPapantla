// src/app/restaurantes/page.tsx
import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import { businessInSection } from '@/lib/giros'
// Server Component
export default async function Restaurantes() {
  const all = await fetchBusinesses()

  // Filtra por sección
  const restaurantes = all
    .filter(b => businessInSection(b, 'restaurantes'))
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }))

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Hero Reutilizable */}
        <SectionHero
          imageSrc="/pictures/restaurantes.jpeg"
          titleKey="hero.restaurantes.title"
          subtitleKey="hero.restaurantes.subtitle"
        />

        {/* Cards dinámicas */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#2c363b] mb-6">
            Restaurantes ({restaurantes.length})
          </h2>

          {restaurantes.length === 0 ? (
            <div className="text-gray-600 bg-white border border-gray-100 rounded-lg p-6">
              Aún no hay restaurantes registrados. Vuelve pronto.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurantes.map((r) => (
                <BusinessCard
                  key={r.id}
                  tituloTag="Restaurante"
                  rating={4}
                  negocio={r}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <BottomNavigation />
    </div>
  )
}

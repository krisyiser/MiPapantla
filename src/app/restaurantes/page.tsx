// src/app/restaurantes/page.tsx
import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import { ChefHat, Coffee, Pizza } from 'lucide-react'
import { fetchBusinesses } from '@/lib/fetchBusinesses'
import BusinessCard from '@/components/BusinessCard'
import SectionHero from '@/components/SectionHero'
import { businessInSection } from '@/lib/giros'

const cuisineTypes = [
  { name: 'Cocina Totonaca', icon: ChefHat, description: 'Tradición ancestral' },
  { name: 'Pizzerías', icon: Pizza, description: 'Favoritas locales' },
  { name: 'Cafeterías', icon: Coffee, description: 'Café y descanso' }
]

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

        {/* Tipos */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {cuisineTypes.map((c, i) => {
            const Icon = c.icon
            return (
              <div
                key={i}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="w-12 h-12 bg-[#bb904d] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-[#2c363b] mb-1">{c.name}</h3>
                <p className="text-sm text-gray-600">{c.description}</p>
              </div>
            )
          })}
        </div>

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

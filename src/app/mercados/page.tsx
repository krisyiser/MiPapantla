// src/app/mercados/page.tsx
import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import { fetchBusinesses } from '@/lib/fetchBusinesses'
import BusinessCard from '@/components/BusinessCard'
import { businessInSection } from '@/lib/giros'
import { Store, ShoppingBasket, BadgePercent, MapPin } from 'lucide-react'

// Server Component
export default async function Mercados() {
  const all = await fetchBusinesses()

  // Filtra por sección usando el helper (soporta celdas con múltiples giros)
  // Si en tu mapeo usaste "locales" para mercados, esto lo cubre.
  // (De todas formas, añadimos un fallback por substring “mercado”.)
  const mercados = all
    .filter(b => businessInSection(b, 'mercados') || b.giros.some(g => g.includes('mercado')))
    .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }))

  // Tarjetitas informativas (solo UI, no filtran)
  const highlights = [
    { icon: Store,          title: 'Locales del mercado',      hint: 'Productos frescos y artesanías' },
    { icon: ShoppingBasket, title: 'Compras locales',          hint: 'Apoya a productores y familias' },
    { icon: BadgePercent,   title: 'Precios accesibles',       hint: 'Variedad para todos los gustos' },
    { icon: MapPin,         title: 'Ubicaciones céntricas',    hint: 'Llega fácil y rápido' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Hero sin depender de imagen local (gradiente para evitar assets faltantes) */}
        <section className="relative h-56 rounded-lg overflow-hidden mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-700 via-amber-600 to-amber-500" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h1 className="text-4xl font-bold mb-1">Mercados de Papantla</h1>
              <p className="text-lg opacity-95">Tradición, sabor y productos locales</p>
            </div>
          </div>
        </section>

        {/* Highlights (estéticos, consistentes con el resto del sitio) */}
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

        {/* Listado de locales/mercados */}
        <section className="mb-8">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-3xl font-bold text-[#2c363b]">
              Locales de mercado ({mercados.length})
            </h2>
          </div>

          {mercados.length === 0 ? (
            <div className="text-gray-600 bg-white border border-gray-100 rounded-lg p-6">
              Aún no hay locales registrados en los mercados. Vuelve pronto.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mercados.map((m) => (
                <BusinessCard
                  key={m.id}
                  tituloTag="Mercado"
                  rating={4}
                  negocio={m}
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

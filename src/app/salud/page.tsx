// src/app/salud/page.tsx
import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import { fetchBusinesses } from '@/lib/fetchBusinesses'
import BusinessCard from '@/components/BusinessCard'
import SectionHero from '@/components/SectionHero'
import { businessInSection } from '@/lib/giros'
// Server Component
export default async function Salud() {
    const all = await fetchBusinesses()

    // Filtra por sección 'salud'
    const salud = all
        .filter(b => businessInSection(b, 'salud'))
        .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }))
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="container mx-auto px-4 py-6 pb-20">
                {/* Hero Reutilizable con i18n */}
                <SectionHero
                    imageSrc="/pictures/salud.png"
                    titleKey="hero.salud.title"
                    subtitleKey="hero.salud.subtitle"
                />

                {/* Listado de Negocios de Salud */}
                <section className="mb-8">
                    <div className="flex items-baseline justify-between mb-6">
                        <h2 className="text-3xl font-bold text-[#2c363b]">
                            Servicios ({salud.length})
                        </h2>
                    </div>

                    {salud.length === 0 ? (
                        <div className="text-gray-600 bg-white border border-gray-100 rounded-lg p-6 text-center">
                            <p className="text-lg font-semibold">Aún no hay servicios de salud registrados.</p>
                            <p className="text-sm mt-2">Estamos actualizando nuestro directorio constantemente.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {salud.map((b) => (
                                <BusinessCard
                                    key={b.id}
                                    tituloTag="Salud"
                                    rating={5} // Valor por defecto visual
                                    negocio={b}
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

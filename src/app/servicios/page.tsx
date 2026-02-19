// src/app/servicios/page.tsx
import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import { fetchBusinesses } from '@/lib/fetchBusinesses'
import BusinessCard from '@/components/BusinessCard'
import SectionHero from '@/components/SectionHero'
import { businessInSection } from '@/lib/giros'
import { Briefcase, Gavel, Calculator, Wrench } from 'lucide-react'

// Server Component
export default async function ServiciosProfesionales() {
    const all = await fetchBusinesses()

    // Filtra por sección 'servicios'
    const servicios = all
        .filter(b => businessInSection(b, 'servicios'))
        .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }))

    // Categorías visuales
    const categorias = [
        { icon: Gavel, label: 'Legal', hint: 'Abogados y Notarías' },
        { icon: Calculator, label: 'Contabilidad', hint: 'Asesoría fiscal' },
        { icon: Briefcase, label: 'Consultoría', hint: 'Gestión y trámites' },
        { icon: Wrench, label: 'Oficios', hint: 'Mantenimiento y técnicos' },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="container mx-auto px-4 py-6 pb-20">
                {/* Hero Reutilizable */}
                <SectionHero
                    imageSrc="/pictures/profesionales.avif"
                    titleKey="hero.servicios.title"
                    subtitleKey="hero.servicios.subtitle"
                />

                {/* Categorías (UI informativa) */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {categorias.map((c, i) => {
                        const Icon = c.icon
                        return (
                            <div
                                key={i}
                                className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 text-center hover:shadow-md transition-shadow"
                            >
                                <div className="w-12 h-12 bg-[#bb904d] rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Icon size={24} className="text-white" />
                                </div>
                                <h3 className="font-semibold text-[#2c363b]">{c.label}</h3>
                                <p className="text-xs text-gray-600 mt-1">{c.hint}</p>
                            </div>
                        )
                    })}
                </section>

                {/* Listado de Negocios */}
                <section className="mb-8">
                    <div className="flex items-baseline justify-between mb-6">
                        <h2 className="text-3xl font-bold text-[#2c363b]">
                            Directorio ({servicios.length})
                        </h2>
                    </div>

                    {servicios.length === 0 ? (
                        <div className="text-gray-600 bg-white border border-gray-100 rounded-lg p-6 text-center">
                            <p className="text-lg font-semibold">Aún no hay servicios profesionales registrados.</p>
                            <p className="text-sm mt-2">Nuestra base de datos crece día con día.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {servicios.map((b) => (
                                <BusinessCard
                                    key={b.id}
                                    tituloTag="Profesional"
                                    rating={5}
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

// src/app/salud/page.tsx
import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import { fetchBusinesses } from '@/lib/fetchBusinesses'
import BusinessCard from '@/components/BusinessCard'
import { businessInSection } from '@/lib/giros'
import { Stethoscope, Activity, Heart, UserPlus } from 'lucide-react'
import Image from 'next/image'

// Server Component
export default async function Salud() {
    const all = await fetchBusinesses()

    // Filtra por sección 'salud'
    const salud = all
        .filter(b => businessInSection(b, 'salud'))
        .sort((a, b) => a.nombre.localeCompare(b.nombre, 'es', { sensitivity: 'base' }))

    // Categorías visuales (informativas)
    const categorias = [
        { icon: Stethoscope, label: 'Medicina General', hint: 'Atención primaria' },
        { icon: Heart, label: 'Especialidades', hint: 'Cardiología, Pediatría...' },
        { icon: Activity, label: 'Laboratorios', hint: 'Análisis clínicos' },
        { icon: UserPlus, label: 'Terapias', hint: 'Fisioterapia y más' },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="container mx-auto px-4 py-6 pb-20">
                {/* Hero */}
                <section className="relative h-64 rounded-lg overflow-hidden mb-8">
                    <Image
                        src="/pictures/salud.png"
                        alt="Salud y Bienestar en Papantla"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-center text-white px-4">
                            <h1 className="text-4xl font-bold mb-2">Salud y Bienestar</h1>
                            <p className="text-xl">Directorio médico y servicios de salud en Papantla</p>
                        </div>
                    </div>
                </section>

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

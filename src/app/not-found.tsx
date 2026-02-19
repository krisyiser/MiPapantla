import Link from 'next/link'
import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                <h1 className="text-6xl font-extrabold text-[#bb904d] mb-4">404</h1>
                <h2 className="text-2xl font-bold text-[#2c363b] mb-4">Página no encontrada</h2>
                <p className="text-gray-600 mb-8 max-w-md">
                    Lo sentimos, la página que estás buscando no existe o ha sido movida.
                </p>
                <Link
                    href="/"
                    className="px-6 py-3 bg-[#2c363b] text-white rounded-lg hover:bg-[#1a2023] transition-colors shadow-lg"
                >
                    Volver al inicio
                </Link>
            </main>

            <BottomNavigation />
        </div>
    )
}

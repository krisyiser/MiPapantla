'use client' // Error components must be Client Components

import { useEffect } from 'react'
import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                <h2 className="text-2xl font-bold text-[#2c363b] mb-4">
                    ¡Algo salió mal!
                </h2>
                <p className="text-gray-600 mb-8">
                    Ha ocurrido un error inesperado al cargar esta página.
                </p>
                <button
                    onClick={
                        // Attempt to recover by trying to re-render the segment
                        () => reset()
                    }
                    className="px-6 py-3 bg-[#bb904d] text-white rounded-lg hover:bg-[#a07b3e] transition-colors shadow-lg"
                >
                    Intentar de nuevo
                </button>
            </main>

            <BottomNavigation />
        </div>
    )
}

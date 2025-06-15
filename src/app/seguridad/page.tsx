import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'

export default function Seguridad() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6 pb-20">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-[#2c363b] mb-4">Seguridad en Mazatlán</h1>
          <p className="text-lg text-gray-600">Información de seguridad y servicios de emergencia.</p>
          <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-[#814739] mb-4">Números de Emergencia</h2>
            <div className="space-y-2">
              <p><strong>SOS:</strong> <a href="tel:6699868126" className="text-[#bb904d]">669-986-8126</a></p>
              <p><strong>Cruz Roja:</strong> 065</p>
              <p><strong>Bomberos:</strong> 911</p>
              <p><strong>Policía:</strong> 911</p>
            </div>
          </div>
        </div>
      </main>
      <BottomNavigation />
    </div>
  )
}

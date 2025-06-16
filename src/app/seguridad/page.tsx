import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'

export default function Seguridad() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6 pb-20">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-[#2c363b] mb-4">Seguridad en Papantla</h1>
          <p className="text-lg text-gray-600 mb-8">
            En caso de emergencia, pulsa el botón correspondiente para realizar una llamada directa.
          </p>

          <div className="space-y-6">
            <a
              href="tel:7848420075"
              className="block bg-[#b22222] hover:bg-[#8b1a1a] text-white text-xl font-bold py-5 px-6 rounded-lg shadow border-l-8 border-yellow-400"
            >
              Policía Municipal
            </a>

            <a
              href="tel:0987654321"
              className="block bg-[#b22222] hover:bg-[#8b1a1a] text-white text-xl font-bold py-5 px-6 rounded-lg shadow border-l-8 border-yellow-400"
            >
              Policía Turística
            </a>

            <a
              href="tel:7848420039"
              className="block bg-[#b22222] hover:bg-[#8b1a1a] text-white text-xl font-bold py-5 px-6 rounded-lg shadow border-l-8 border-yellow-400"
            >
              Tránsito
            </a>

            <a
              href="tel:7848420175"
              className="block bg-[#b22222] hover:bg-[#8b1a1a] text-white text-xl font-bold py-5 px-6 rounded-lg shadow border-l-8 border-yellow-400"
            >
              Protección Civil
            </a>

            <a
              href="tel:7846881611"
              className="block bg-[#b22222] hover:bg-[#8b1a1a] text-white text-xl font-bold py-5 px-6 rounded-lg shadow border-l-8 border-yellow-400"
            >
              Bomberos
            </a>
          </div>

          <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-[#814739] mb-4">Recomendaciones</h2>
            <ul className="text-left text-gray-700 list-disc list-inside space-y-2">
              <li>Identifica y memoriza los servicios de emergencia más cercanos.</li>
              <li>Viaja acompañado y permanece en zonas bien iluminadas.</li>
              <li>Contacta con autoridades si notas situaciones sospechosas.</li>
              <li>Confirma siempre con guías locales certificados si visitas áreas rurales o arqueológicas.</li>
            </ul>
          </div>
        </div>
      </main>
      <BottomNavigation />
    </div>
  )
}

import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import { Waves, Sun, Volleyball, Camera, Umbrella, Activity, MapPin, Clock } from 'lucide-react'

const beaches = [
  {
    id: 1,
    name: "Playa Olas Altas",
    type: "Playa Histórica",
    image: "https://ugc.same-assets.com/1qQ1ZwpOYDqJx2RF9TvpigjsAQEB-_Kr.jpeg",
    location: "Centro Histórico",
    length: "1.5 km",
    characteristics: ["Arena Dorada", "Oleaje Moderado", "Histórica"],
    activities: ["Caminatas", "Fotografía", "Contemplación"],
    amenities: ["Malecón", "Restaurantes", "Estacionamiento"],
    bestFor: "Paseos románticos y contemplación del atardecer",
    description: "La playa más emblemática de Mazatlán, con más de 100 años de historia turística. Perfecta para disfrutar atardeceres espectaculares."
  },
  {
    id: 2,
    name: "Playa Norte",
    type: "Playa Familiar",
    image: "https://ugc.same-assets.com/TQ_s1GC7achOWmNUJIzijy0xkZ9c89Tt.jpeg",
    location: "Zona Dorada",
    length: "3 km",
    characteristics: ["Arena Fina", "Aguas Tranquilas", "Amplia"],
    activities: ["Natación", "Voleibol", "Deportes Acuáticos"],
    amenities: ["Palapas", "Baños", "Renta de Equipo"],
    bestFor: "Familias con niños y actividades acuáticas",
    description: "La playa más popular para familias, con aguas tranquilas y arena suave, ideal para actividades recreativas."
  },
  {
    id: 3,
    name: "Playa Gaviotas",
    type: "Playa Deportiva",
    image: "https://ugc.same-assets.com/Pq5hTeY6bHjnaAIYoQDDIwdrX2o_FNop.jpeg",
    location: "Zona Dorada",
    length: "2 km",
    characteristics: ["Oleaje Fuerte", "Arena Compacta", "Ventosa"],
    activities: ["Surf", "Windsurf", "Kitesurf"],
    amenities: ["Escuelas de Surf", "Renta de Tablas", "Beach Clubs"],
    bestFor: "Deportes acuáticos y aventura",
    description: "Centro de deportes acuáticos de Mazatlán, con condiciones perfectas para surf y actividades de viento."
  },
  {
    id: 4,
    name: "Playa Brujas",
    type: "Playa Natural",
    image: "https://ugc.same-assets.com/e6AYDo-XhOcMJlNBSvEsf59vWkUmQqQX.jpeg",
    location: "Zona Norte",
    length: "4 km",
    characteristics: ["Salvaje", "Pocas Multitudes", "Natural"],
    activities: ["Caminatas", "Observación de Aves", "Pesca"],
    amenities: ["Palapas Rústicas", "Estacionamiento"],
    bestFor: "Tranquilidad y contacto con la naturaleza",
    description: "Playa virgen perfecta para escapar de las multitudes y disfrutar de la naturaleza en estado puro."
  },
  {
    id: 5,
    name: "Playa Cerritos",
    type: "Playa Bohemia",
    image: "https://ugc.same-assets.com/qcy8x-sF-VewrxttGU60J1vMpYOxdMp5.jpeg",
    location: "Pueblo Mágico",
    length: "2.5 km",
    characteristics: ["Bohemia", "Artística", "Relajada"],
    activities: ["Yoga", "Arte", "Música"],
    amenities: ["Cafés", "Galerías", "Hostales"],
    bestFor: "Ambiente bohemio y cultural",
    description: "La playa preferida de artistas y viajeros bohemios, con un ambiente relajado y creativo único."
  },
  {
    id: 6,
    name: "Isla de Venados",
    type: "Isla Paradisíaca",
    image: "https://ugc.same-assets.com/lEwVR2NqlZC_56eq5S-1K87hDRXCdnD3.jpeg",
    location: "Bahía de Mazatlán",
    length: "Isla completa",
    characteristics: ["Aguas Cristalinas", "Snorkel", "Privacidad"],
    activities: ["Snorkel", "Kayak", "Banana Boat"],
    amenities: ["Tour en Lancha", "Restaurante", "Baños"],
    bestFor: "Excursiones y deportes acuáticos",
    description: "Isla paradisíaca a 10 minutos en lancha, perfecta para snorkel y disfrutar aguas cristalinas."
  }
]

const activities = [
  { name: "Surf", icon: Waves, description: "Olas perfectas todo el año" },
  { name: "Voleibol", icon: Volleyball, description: "Canchas en varias playas" },
  { name: "Fotografía", icon: Camera, description: "Atardeceres espectaculares" },
  { name: "Deportes Acuáticos", icon: Activity, description: "Kayak, jet ski, parasailing" }
]

export default function Playas() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Hero Section */}
        <div className="relative h-72 rounded-lg overflow-hidden mb-8">
          <img
            src="https://ugc.same-assets.com/1qQ1ZwpOYDqJx2RF9TvpigjsAQEB-_Kr.jpeg"
            alt="Playas de Mazatlán"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-2">Playas de Mazatlán</h1>
              <p className="text-xl mb-4">21 kilómetros de costa dorada en el Pacífico</p>
              <div className="flex justify-center items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <Sun className="mr-2" size={20} />
                  <span>320 días de sol</span>
                </div>
                <div className="flex items-center">
                  <Waves className="mr-2" size={20} />
                  <span>Agua 26°C promedio</span>
                </div>
                <div className="flex items-center">
                  <Umbrella className="mr-2" size={20} />
                  <span>6 playas principales</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Beach Activities */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {activities.map((activity, index) => {
            const Icon = activity.icon
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#1dace0] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-[#2c363b] mb-1">{activity.name}</h3>
                <p className="text-sm text-gray-600">{activity.description}</p>
              </div>
            )
          })}
        </div>

        {/* Beaches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {beaches.map((beach) => (
            <div key={beach.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img
                  src={beach.image}
                  alt={beach.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#1dace0] text-white px-2 py-1 rounded text-sm font-medium">
                  {beach.type}
                </div>
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm">
                  {beach.length}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2c363b] mb-2">{beach.name}</h3>

                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin size={16} className="mr-2" />
                  <span className="text-sm">{beach.location}</span>
                </div>

                <p className="text-gray-700 text-sm mb-4">{beach.description}</p>

                <div className="mb-4">
                  <h4 className="font-semibold text-[#814739] mb-2">Características:</h4>
                  <div className="flex flex-wrap gap-1">
                    {beach.characteristics.map((char, index) => (
                      <span key={index} className="bg-[#f6f7f5] text-[#814739] px-2 py-1 rounded text-xs">
                        {char}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-[#1dace0] mb-2">Actividades:</h4>
                  <div className="flex flex-wrap gap-1">
                    {beach.activities.map((activity, index) => (
                      <span key={index} className="bg-[#1dace0] text-white px-2 py-1 rounded text-xs">
                        {activity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-[#bb904d] mb-2">Servicios:</h4>
                  <div className="flex flex-wrap gap-1">
                    {beach.amenities.map((amenity, index) => (
                      <span key={index} className="bg-[#bb904d] text-white px-2 py-1 rounded text-xs">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded mb-4">
                  <p className="text-sm"><strong>Ideal para:</strong> {beach.bestFor}</p>
                </div>

                <button className="w-full bg-[#1dace0] hover:bg-[#1690b8] text-white py-2 px-4 rounded-md transition-colors">
                  Ver en Mapa
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Beach Guide */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#2c363b] mb-6">Guía de Playas por Temporada</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-[#bb904d] mb-4">Temporada Alta (Nov - Abr)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Clima perfecto: 24-28°C</li>
                <li>• Mar tranquilo ideal para familias</li>
                <li>• Temporada de ballenas</li>
                <li>• Festivales y eventos</li>
                <li>• Reservar con anticipación</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#814739] mb-4">Temporada Media (May - Jun, Oct)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Temperaturas cálidas: 28-32°C</li>
                <li>• Menos multitudes</li>
                <li>• Precios más accesibles</li>
                <li>• Ideal para relajarse</li>
                <li>• Buenas condiciones para surf</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1dace0] mb-4">Temporada Baja (Jul - Sep)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Temporada de lluvias</li>
                <li>• Mejor época para surf</li>
                <li>• Paisajes más verdes</li>
                <li>• Ofertas especiales</li>
                <li>• Atardeceres espectaculares</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-gradient-to-r from-[#1dace0] to-[#bb904d] rounded-lg shadow-md p-8 text-white">
          <h2 className="text-3xl font-bold mb-6">Consejos de Seguridad</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-4">En el Mar</h3>
              <ul className="space-y-2">
                <li>• Respeta las banderas de advertencia</li>
                <li>• Nunca nades solo</li>
                <li>• Mantente hidratado</li>
                <li>• Usa protector solar factor 30+</li>
                <li>• Evita el alcohol en exceso</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">En la Playa</h3>
              <ul className="space-y-2">
                <li>• Cuida tus pertenencias</li>
                <li>• Busca sombra en horas pico</li>
                <li>• Mantén la playa limpia</li>
                <li>• Respeta la vida marina</li>
                <li>• Conoce los números de emergencia</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <BottomNavigation />
    </div>
  )
}

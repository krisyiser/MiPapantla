// src/app/playas/page.tsx

import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import { Waves, Sun, Volleyball, Camera, Umbrella, Activity, MapPin } from 'lucide-react'
import Image from 'next/image'

const activities = [
  { name: 'Pesca', icon: Activity, description: 'Costumbre local y actividad recreativa' },
  { name: 'Fotografía', icon: Camera, description: 'Paisajes costeros y vida silvestre' },
  { name: 'Caminatas', icon: Volleyball, description: 'Senderos rústicos y orilla del mar' },
  { name: 'Descanso', icon: Umbrella, description: 'Entornos relajantes y poco concurridos' }
]

const beaches = [
  {
    id: 1,
    name: 'Rancho Playa',
    type: 'Playa Campestre',
    image: '/pictures/rancho-playa.jpeg',
    location: 'Costa Norte de Papantla',
    distance: '35 km del centro',
    characteristics: ['Arenas vírgenes', 'Acceso privado', 'Entorno rústico'],
    activities: ['Picnic', 'Caminatas', 'Pesca recreativa'],
    amenities: ['Estacionamiento', 'Zonas de sombra', 'Baños rústicos'],
    bestFor: 'Descanso en ambiente rural y privado',
    locationUrl: 'https://maps.google.com/?q=Rancho+Playa+Papantla'
  },
  {
    id: 2,
    name: 'La Bocana',
    type: 'Desembocadura natural',
    image: '/pictures/la-bocana.jpeg',
    location: 'Río Tecolutla',
    distance: '24 km del centro',
    characteristics: ['Aguas dulces y salobres', 'Ecosistemas mixtos', 'Vegetación abundante'],
    activities: ['Observación de aves', 'Fotografía', 'Pesca artesanal'],
    amenities: ['Palapas', 'Venta de comida local'],
    bestFor: 'Exploradores y amantes de la naturaleza',
    locationUrl: 'https://www.google.com/maps/place/La+Bocana+de+Rancho+Playa'
  },
  {
    id: 3,
    name: 'Tecolutla',
    type: 'Destino turístico costero',
    image: '/pictures/tecolutla.jpeg',
    location: 'Tecolutla, Veracruz',
    distance: '50 km del centro',
    characteristics: ['Amplia zona hotelera', 'Malecón', 'Aguas tranquilas'],
    activities: ['Natación', 'Paseos en lancha', 'Degustación de mariscos'],
    amenities: ['Hoteles', 'Restaurantes', 'Servicios turísticos'],
    bestFor: 'Vacaciones familiares y turismo relajado',
    locationUrl: 'https://maps.google.com/?q=Playa+Tecolutla'
  },
  {
    id: 4,
    name: 'Tenixtepec',
    type: 'Playa Comunitaria',
    image: '/pictures/tenixtepec.jpeg',
    location: 'Tenixtepec, Papantla',
    distance: '40 km del centro',
    characteristics: ['Ambiente local', 'Acceso comunitario', 'Entorno tranquilo'],
    activities: ['Convivencia', 'Caminatas', 'Pesca artesanal'],
    amenities: ['Zonas techadas', 'Comida regional'],
    bestFor: 'Conexión con comunidades locales y tradiciones',
    locationUrl: 'https://maps.google.com/?q=Tenixtepec+Papantla'
  },
  {
    id: 5,
    name: 'Costa Esmeralda',
    type: 'Franja Turística',
    image: '/pictures/costa-esmeralda.jpeg',
    location: 'Entre Nautla y Tecolutla',
    distance: '60 km del centro',
    characteristics: ['Aguas color esmeralda', 'Larga extensión', 'Servicios turísticos'],
    activities: ['Vacaciones', 'Actividades acuáticas', 'Descanso'],
    amenities: ['Hoteles', 'Restaurantes', 'Clubes de playa'],
    bestFor: 'Turismo de descanso y actividades en familia',
    locationUrl: 'https://maps.google.com/?q=Costa+Esmeralda+Veracruz'
  },
  {
    id: 6,
    name: 'Barra de Cazones',
    type: 'Boca de río y mar',
    image: '/pictures/cazones.jpeg',
    location: 'Cazones de Herrera',
    distance: '70 km del centro',
    characteristics: ['Encuentro río-mar', 'Manglares', 'Pesca'],
    activities: ['Observación de fauna', 'Paseos en lancha', 'Convivencia comunitaria'],
    amenities: ['Guías locales', 'Comida regional', 'Espacios naturales'],
    bestFor: 'Exploración ecológica y cultura pesquera',
    locationUrl: 'https://maps.google.com/?q=Barra+de+Cazones'
  }
]

export default function Playas() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6 pb-20">
        <div className="relative h-72 rounded-lg overflow-hidden mb-8">
          <Image
            src="/pictures/playa.jpg"
            alt="Playas de Papantla"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-2">Playas Cercanas a Papantla</h1>
              <p className="text-xl mb-4">Descubre los destinos costeros de la región totonaca</p>
              <div className="flex justify-center items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <Sun className="mr-2" size={20} />
                  <span>Clima cálido todo el año</span>
                </div>
                <div className="flex items-center">
                  <Waves className="mr-2" size={20} />
                  <span>Mar y río en armonía</span>
                </div>
                <div className="flex items-center">
                  <Umbrella className="mr-2" size={20} />
                  <span>6 playas destacadas</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actividades */}
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

        {/* Playas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {beaches.map((beach) => (
            <div key={beach.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image src={beach.image} alt={beach.name} fill className="object-cover" />
                <div className="absolute top-4 right-4 bg-[#1dace0] text-white px-2 py-1 rounded text-sm font-medium">
                  {beach.type}
                </div>
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-sm">
                  {beach.distance}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2c363b] mb-2">{beach.name}</h3>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin size={16} className="mr-2" />
                  <span className="text-sm">{beach.location}</span>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-[#814739] mb-2">Características:</h4>
                  <div className="flex flex-wrap gap-1">
                    {beach.characteristics.map((char, index) => (
                      <span key={index} className="bg-[#f6f7f5] text-[#814739] px-2 py-1 rounded text-xs">{char}</span>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-[#1dace0] mb-2">Actividades:</h4>
                  <div className="flex flex-wrap gap-1">
                    {beach.activities.map((act, index) => (
                      <span key={index} className="bg-[#1dace0] text-white px-2 py-1 rounded text-xs">{act}</span>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-[#bb904d] mb-2">Servicios:</h4>
                  <div className="flex flex-wrap gap-1">
                    {beach.amenities.map((srv, index) => (
                      <span key={index} className="bg-[#bb904d] text-white px-2 py-1 rounded text-xs">{srv}</span>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded mb-4">
                  <p className="text-sm"><strong>Ideal para:</strong> {beach.bestFor}</p>
                </div>
                <a
                  href={beach.locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-[#1dace0] hover:bg-[#1690b8] text-white py-2 px-4 rounded-md transition-colors"
                >
                  Ver en Mapa
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Guía */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#2c363b] mb-6">Guía de Playas por Temporada</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-[#bb904d] mb-4">Temporada Alta (Nov - Abr)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Clima templado</li>
                <li>• Eventos culturales</li>
                <li>• Mayor afluencia turística</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#814739] mb-4">Temporada Media (May - Jun, Oct)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Menos multitudes</li>
                <li>• Precios moderados</li>
                <li>• Buen clima</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#1dace0] mb-4">Temporada Baja (Jul - Sep)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Temporada de lluvias</li>
                <li>• Ríos y vegetación abundante</li>
                <li>• Ideal para turismo ecológico</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Consejos */}
        <div className="bg-gradient-to-r from-[#1dace0] to-[#bb904d] rounded-lg shadow-md p-8 text-white">
          <h2 className="text-3xl font-bold mb-6">Consejos de Seguridad</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-4">En el Mar</h3>
              <ul className="space-y-2">
                <li>• No nades solo</li>
                <li>• Usa chaleco si no sabes nadar</li>
                <li>• Observa las condiciones del mar</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">En la Playa</h3>
              <ul className="space-y-2">
                <li>• Hidrátate</li>
                <li>• Usa protector solar</li>
                <li>• Respeta la naturaleza</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <BottomNavigation />
    </div>
  )
}

import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import { Music, Martini, Users, Clock, MapPin, Calendar, Volume2, PartyPopper } from 'lucide-react'

const venues = [
  {
    id: 1,
    name: "Joe Allen's Bar",
    type: "Bar Clásico",
    image: "https://ugc.same-assets.com/ou35V0qlzH_a76BybIwvUbbiyTAT4z5Y.jpeg",
    location: "Zona Dorada",
    hours: "18:00 - 02:00",
    specialty: "Cocteles Artesanales",
    atmosphere: "Elegante y Sofisticado",
    features: ["Live Jazz", "Terraza", "Happy Hour"],
    priceRange: "$$ - $$$",
    description: "Icónico bar con más de 40 años, famoso por sus cocteles únicos y ambiente elegante con música jazz en vivo."
  },
  {
    id: 2,
    name: "Señor Frog's",
    type: "Bar de Fiesta",
    image: "https://ugc.same-assets.com/_5tfvZ9UDdjS7JuN74WOxl2DSpLw0kef.jpeg",
    location: "Zona Dorada",
    hours: "12:00 - 04:00",
    specialty: "Margaritas y Shots",
    atmosphere: "Fiesta y Diversión",
    features: ["DJ", "Shows", "Karaoke"],
    priceRange: "$ - $$",
    description: "El lugar perfecto para fiestas legendarias con shows en vivo, karaoke y la mejor música para bailar."
  },
  {
    id: 3,
    name: "Valentino's Disco",
    type: "Discoteca",
    image: "https://ugc.same-assets.com/qmEXg8cs9Z5CQyZEpQ0SWEYyiUO1dcjJ.jpeg",
    location: "Punta Camarón",
    hours: "22:00 - 06:00",
    specialty: "Música Electrónica",
    atmosphere: "Club Nocturno",
    features: ["DJ Internacional", "Luces LED", "VIP Area"],
    priceRange: "$$$ - $$$$",
    description: "La discoteca más exclusiva con DJs internacionales, sistema de sonido de última generación y vista al mar."
  },
  {
    id: 4,
    name: "La Tertulia",
    type: "Café Cultural",
    image: "https://ugc.same-assets.com/NsCIzvkcnp-AihFNBKA5Gqx_ubTqwKdk.jpeg",
    location: "Centro Histórico",
    hours: "19:00 - 01:00",
    specialty: "Café y Cultura",
    atmosphere: "Bohemio y Artístico",
    features: ["Música en Vivo", "Poesía", "Arte"],
    priceRange: "$ - $$",
    description: "Espacio cultural bohemio con noches de poesía, música acústica y exposiciones de arte local."
  },
  {
    id: 5,
    name: "Onilikan",
    type: "Bar de Playa",
    image: "https://ugc.same-assets.com/ehB8HSnyN5OAmaAEt4lnsKVxpeDS6O4a.jpeg",
    location: "Playa Norte",
    hours: "16:00 - 02:00",
    specialty: "Cocteles Tropicales",
    atmosphere: "Relajado y Playero",
    features: ["Vista al Mar", "Fogatas", "Música Chill"],
    priceRange: "$$ - $$$",
    description: "Bar de playa con los mejores atardeceres, fogatas nocturnas y ambiente relajado frente al mar."
  },
  {
    id: 6,
    name: "Mazatlán Comedy Club",
    type: "Club de Comedia",
    image: "https://ugc.same-assets.com/_5tfvZ9UDdjS7JuN74WOxl2DSpLw0kef.jpeg",
    location: "Zona Dorada",
    hours: "20:00 - 23:00",
    specialty: "Stand-up Comedy",
    atmosphere: "Divertido y Familiar",
    features: ["Comediantes", "Shows", "Cena"],
    priceRange: "$$ - $$$",
    description: "Shows de comedia en vivo con comediantes locales e internacionales, perfecto para una noche diferente."
  }
]

const nightActivities = [
  { name: "Música en Vivo", icon: Music, venues: 12, description: "Jazz, rock, mariachi" },
  { name: "Discotecas", icon: PartyPopper, venues: 8, description: "Música electrónica y pop" },
  { name: "Bares de Cocteles", icon: Martini, venues: 15, description: "Mixología artesanal" },
  { name: "Entretenimiento", icon: Volume2, venues: 6, description: "Shows y espectáculos" }
]

const events = [
  { day: "Lunes", event: "Ladies Night", description: "Descuentos especiales para damas en múltiples venues" },
  { day: "Martes", event: "Karaoke Night", description: "Noches de karaoke en Señor Frog's y otros bares" },
  { day: "Miércoles", event: "Jazz Night", description: "Música jazz en vivo en Joe Allen's y La Tertulia" },
  { day: "Jueves", event: "Salsa Night", description: "Clases de salsa gratis y baile en varios venues" },
  { day: "Viernes", event: "Party Night", description: "La noche más movida con DJs en todas las discotecas" },
  { day: "Sábado", event: "Live Music", description: "Bandas en vivo y espectáculos especiales" },
  { day: "Domingo", event: "Sunset Party", description: "Fiestas de atardecer en bares de playa" }
]

export default function VidaNocturna() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Hero */}
        <div className="relative h-72 rounded-lg overflow-hidden mb-8">
          <img
            src="https://ugc.same-assets.com/ou35V0qlzH_a76BybIwvUbbiyTAT4z5Y.jpeg"
            alt="Vida Nocturna en Mazatlán"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-2">Vida Nocturna de Mazatlán</h1>
              <p className="text-xl mb-4">Donde la diversión nunca termina</p>
              <div className="flex justify-center items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <Music className="mr-2" size={20} />
                  <span>15+ Venues</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2" size={20} />
                  <span>Hasta las 6 AM</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2" size={20} />
                  <span>Ambiente Internacional</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actividades */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {nightActivities.map((activity, index) => {
            const Icon = activity.icon
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-[#2c363b] mb-1">{activity.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                  {activity.venues} lugares
                </span>
              </div>
            )
          })}
        </div>

        {/* Lugares */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#2c363b] mb-6">Lugares Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venues.map((venue) => (
              <div key={venue.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-purple-600 text-white px-2 py-1 rounded text-sm font-medium">
                    {venue.type}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                    {venue.priceRange}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#2c363b] mb-2">{venue.name}</h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin size={16} className="mr-2" />
                      <span>{venue.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Clock size={16} className="mr-2" />
                      <span>{venue.hours}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Martini size={16} className="mr-2" />
                      <span>{venue.specialty}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm mb-4">{venue.description}</p>

                  <div className="mb-4">
                    <span className="inline-block bg-[#f6f7f5] text-[#814739] px-3 py-1 rounded-full text-sm font-medium">
                      {venue.atmosphere}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {venue.features.map((feature, index) => (
                      <span key={index} className="bg-purple-600 text-white px-2 py-1 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-colors">
                    Ver Más Info
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Eventos */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-[#2c363b] mb-6">Eventos de la Semana</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <div key={index} className="border-l-4 border-purple-600 pl-4">
                <h3 className="font-bold text-purple-600 text-lg mb-2">{event.day}</h3>
                <h4 className="font-semibold text-[#2c363b] mb-2">{event.event}</h4>
                <p className="text-gray-600 text-sm">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <BottomNavigation />
    </div>
  )
}

// src/app/vida-nocturna/page.tsx

import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import { Music, Martini, Users, Clock, MapPin, Calendar, Volume2, PartyPopper, Phone } from 'lucide-react'
import Image from 'next/image'

const venues = [
  {
    id: 1,
    name: "La Palapa Bar",
    type: "Bar Tradicional",
    image: "/pictures/vida nocturna.jpg",
    location: "Centro de Papantla",
    hours: "18:00 - 01:00",
    specialty: "Micheladas y cocteles",
    atmosphere: "Ambiente local y relajado",
    features: ["Música viva", "Botanas", "Promociones nocturnas"],
    priceRange: "$ - $$",
    description: "Uno de los bares más populares entre locales, ideal para comenzar la noche con amigos."
  },
  {
    id: 2,
    name: "El Callejón",
    type: "Antro joven",
    image: "/pictures/vida nocturna.jpg",
    location: "Zona Centro",
    hours: "21:00 - 03:00",
    specialty: "Shots y mixes tropicales",
    atmosphere: "Joven y energético",
    features: ["DJ local", "Pista de baile", "Promos universitarias"],
    priceRange: "$ - $$",
    description: "Antro con ambiente juvenil, luces y sonido para los que buscan fiesta intensa."
  },
  {
    id: 3,
    name: "La Cueva",
    type: "Cantina cultural",
    image: "/pictures/vida nocturna.jpg",
    location: "Barrio del Naranjal",
    hours: "17:00 - 00:00",
    specialty: "Mezcal y cerveza artesanal",
    atmosphere: "Bohemio y alternativo",
    features: ["Poesía", "Música trova", "Arte local"],
    priceRange: "$ - $$",
    description: "Espacio alternativo para disfrutar de música tranquila y eventos culturales."
  },
  {
    id: 4,
    name: "El Mirador",
    type: "Bar con vista",
    image: "/pictures/vida nocturna.jpg",
    location: "Cerro del Campanario",
    hours: "18:00 - 02:00",
    specialty: "Cocteles con fruta regional",
    atmosphere: "Panorámico y romántico",
    features: ["Vista nocturna", "Luz tenue", "Ambiente tranquilo"],
    priceRange: "$$ - $$$",
    description: "Lugar ideal para una cita o para disfrutar de la vista de Papantla bajo las estrellas."
  },
  {
    id: 5,
    name: "Club Noche Mística",
    type: "Discoteca",
    image: "/pictures/vida nocturna.jpg",
    location: "Zona Periférica",
    hours: "22:00 - 04:00",
    specialty: "Reggaetón y electrónica",
    atmosphere: "Ruidoso y festivo",
    features: ["DJ en vivo", "Shows", "Área VIP"],
    priceRange: "$$$",
    description: "La discoteca más grande de la zona, con múltiples salas y fiestas temáticas."
  },
  {
    id: 6,
    name: "Noches del Totonacapan",
    type: "Bar Cultural",
    image: "/pictures/vida nocturna.jpg",
    location: "Centro Histórico",
    hours: "19:00 - 01:00",
    specialty: "Vinos locales y tradición",
    atmosphere: "Cultural y relajado",
    features: ["Son jarocho", "Narración oral", "Gastronomía regional"],
    priceRange: "$$",
    description: "Bar con identidad cultural donde se fusionan tradición y modernidad."
  }
]

const nightActivities = [
  { name: "Música en Vivo", icon: Music, venues: 8, description: "Jazz, rock, mariachi" },
  { name: "Discotecas", icon: PartyPopper, venues: 3, description: "Electrónica, reggaetón" },
  { name: "Bares de Cocteles", icon: Martini, venues: 5, description: "Mixología con frutas locales" },
  { name: "Cultura y Show", icon: Volume2, venues: 4, description: "Poesía, narración, trova" }
]

const events = [
  { day: "Viernes", event: "Ronda Jarocha", description: "Música tradicional en bares del centro histórico" },
  { day: "Sábado", event: "Noche Bohemia", description: "Cantos, poesía y trova en La Cueva" },
  { day: "Domingo", event: "Cierre Cultural", description: "Narraciones y conciertos acústicos en Noches del Totonacapan" }
]

export default function VidaNocturna() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6 pb-20">
        <div className="relative h-72 rounded-lg overflow-hidden mb-8">
          <Image
            src="/pictures/vida nocturna.jpg"
            alt="Vida Nocturna en Papantla"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-2">Vida Nocturna en Papantla</h1>
              <p className="text-xl mb-4">Tradición, música y diversión local</p>
              <div className="flex justify-center items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <Music className="mr-2" size={20} />
                  <span>6 lugares</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2" size={20} />
                  <span>Hasta las 4 AM</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2" size={20} />
                  <span>Ambiente local</span>
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
                  <Image
                    src={venue.image}
                    alt={venue.name}
                    fill
                    className="object-cover"
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
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center">
                    <Phone size={16} className="mr-2" /> Contactar
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

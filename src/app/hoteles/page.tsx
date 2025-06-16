import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import { Star, MapPin, Wifi, Car, Coffee, Users } from 'lucide-react'

const hotels = [
  {
    id: 1,
    name: "Hotel Tajín",
    category: "Hotel Clásico",
    rating: 4,
    image: "/pictures/hotel.png",
    location: "Centro, Papantla",
    price: "$600 - $900",
    features: ["Centro Histórico", "WiFi Gratis", "Atención personalizada"],
    amenities: [Wifi, Coffee],
    phone: "7848420121",
    description: "Ubicado en el corazón de Papantla, ideal para explorar el centro y sus alrededores."
  },
  {
    id: 2,
    name: "Hotel Totonacapan",
    category: "Hotel Tradicional",
    rating: 4,
    image: "/pictures/hotel.png",
    location: "Centro, Papantla",
    price: "$650 - $1000",
    features: ["Estilo tradicional", "Ubicación céntrica", "Restaurante local"],
    amenities: [Wifi, Coffee],
    phone: "7848421224",
    description: "Una opción acogedora con detalles totonacas y ambiente familiar."
  },
  {
    id: 3,
    name: "Centro Ecoturístico La Esperanza",
    category: "Ecoturismo",
    rating: 3,
    image: "/pictures/hotel.png",
    location: "La Concha",
    price: "$500 - $750",
    features: ["Naturaleza", "Tranquilidad", "Tours guiados"],
    amenities: [Car, Users],
    phone: "7821237692",
    description: "Refugio natural perfecto para quienes buscan desconectarse."
  },
  {
    id: 4,
    name: "Xanath Inn",
    category: "Moderno y Acogedor",
    rating: 5,
    image: "/pictures/hotel.png",
    location: "Zona Urbana, Papantla",
    price: "$700 - $1100",
    features: ["Moderno", "Desayuno incluido", "Estacionamiento gratuito"],
    amenities: [Wifi, Car, Coffee],
    phone: "7841353574",
    description: "Comodidad y estilo contemporáneo en una ubicación privilegiada."
  },
  {
    id: 5,
    name: "Hotel Familiar Carlota",
    category: "Familiar",
    rating: 4,
    image: "/pictures/hotel.png",
    location: "Centro, Papantla",
    price: "$500 - $800",
    features: ["Ambiente familiar", "WiFi", "Cerca del zócalo"],
    amenities: [Wifi, Users],
    phone: "7848424353",
    description: "Perfecto para familias que desean comodidad y cercanía."
  },
  {
    id: 6,
    name: "Rancho Ecoturístico Santa Fe",
    category: "Ecoturismo",
    rating: 3,
    image: "/pictures/hotel.png",
    location: "Salida al Chote",
    price: "$450 - $700",
    features: ["Caballos", "Cabañas", "Contacto con la naturaleza"],
    amenities: [Car],
    phone: "7841070537",
    description: "Vive una experiencia rural con actividades al aire libre."
  }
]

export default function Hoteles() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6 pb-20">
        <div className="relative h-64 rounded-lg overflow-hidden mb-8">
          <img
            src="/pictures/hotel.png"
            alt="Hoteles en Papantla"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-2">Hospedaje en Papantla</h1>
              <p className="text-xl">Encuentra el lugar perfecto para descansar</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-[#bb904d] text-white px-2 py-1 rounded text-sm font-medium">
                  {hotel.category}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold text-[#2c363b]">{hotel.name}</h3>
                  <div className="flex items-center">
                    {[...Array(hotel.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{hotel.location}</span>
                </div>

                <p className="text-gray-700 text-sm mb-4">{hotel.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.features.map((feature, index) => (
                    <span key={index} className="bg-[#f6f7f5] text-[#814739] px-2 py-1 rounded text-xs">
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex space-x-2">
                    {hotel.amenities.map((Amenity, index) => (
                      <Amenity key={index} size={18} className="text-[#bb904d]" />
                    ))}
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Desde</div>
                    <div className="text-lg font-bold text-[#814739]">{hotel.price}</div>
                    <div className="text-sm text-gray-600">por noche</div>
                  </div>
                </div>

                <a
                  href={`tel:${hotel.phone}`}
                  className="block text-center w-full bg-[#bb904d] hover:bg-[#814739] text-white py-2 px-4 rounded-md transition-colors"
                >
                  Reservar
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>
      <BottomNavigation />
    </div>
  )
}

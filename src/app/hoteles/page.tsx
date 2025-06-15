import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import { Star, MapPin, Wifi, Car, Waves, Coffee, Users } from 'lucide-react'

const hotels = [
  {
    id: 1,
    name: "Pueblo Bonito Mazatlán",
    category: "Resort de Lujo",
    rating: 5,
    image: "https://ugc.same-assets.com/5Bw8hxZxcAXTHCyjTX6PezI4WSoGvPRg.jpeg",
    location: "Zona Dorada",
    price: "$180 - $350",
    features: ["Todo Incluido", "Frente al Mar", "Spa", "3 Restaurantes"],
    amenities: [Wifi, Car, Waves, Coffee],
    description: "Resort de lujo frente al mar con servicios de clase mundial y vistas espectaculares al Pacífico."
  },
  {
    id: 2,
    name: "Costa de Oro Beach Hotel",
    category: "Hotel Boutique",
    rating: 4,
    image: "https://ugc.same-assets.com/qcy8x-sF-VewrxttGU60J1vMpYOxdMp5.jpeg",
    location: "Zona Dorada",
    price: "$90 - $180",
    features: ["Vista al Mar", "Piscina", "Restaurante", "Bar"],
    amenities: [Wifi, Waves, Coffee],
    description: "Hotel boutique con excelente ubicación y servicios personalizados en el corazón de la Zona Dorada."
  },
  {
    id: 3,
    name: "Oceano Palace Beach Hotel",
    category: "Hotel Familiar",
    rating: 4,
    image: "https://ugc.same-assets.com/lEwVR2NqlZC_56eq5S-1K87hDRXCdnD3.jpeg",
    location: "Zona Dorada",
    price: "$70 - $140",
    features: ["Familiar", "Playa Privada", "Actividades", "Piscina"],
    amenities: [Wifi, Car, Waves, Users],
    description: "Hotel ideal para familias con amplias habitaciones y actividades para toda la familia."
  },
  {
    id: 4,
    name: "Hotel Riu Emerald Bay",
    category: "Resort Todo Incluido",
    rating: 4,
    image: "https://ugc.same-assets.com/BToXS_U8FiCIfCI-s3nx8KeE48JpkASD.jpeg",
    location: "Zona Hotelera",
    price: "$120 - $220",
    features: ["Todo Incluido", "Entretenimiento", "5 Restaurantes", "Spa"],
    amenities: [Wifi, Car, Waves, Coffee, Users],
    description: "Resort todo incluido con entretenimiento en vivo y múltiples opciones gastronómicas."
  },
  {
    id: 5,
    name: "Quality Inn Mazatlán",
    category: "Hotel Económico",
    rating: 3,
    image: "https://ugc.same-assets.com/B6-OZ8sHQ0WZFVHya0Jw6FoEUrDWzz_w.jpeg",
    location: "Centro Histórico",
    price: "$45 - $85",
    features: ["Céntrico", "Desayuno", "WiFi Gratis", "Parking"],
    amenities: [Wifi, Car, Coffee],
    description: "Hotel económico con excelente ubicación para explorar el centro histórico de Mazatlán."
  },
  {
    id: 6,
    name: "Pacific Palace Beach Tower",
    category: "Hotel de Negocios",
    rating: 4,
    image: "https://ugc.same-assets.com/j7diHsQvARYH9ftLlvfXu6BqI5vQMqc9.jpeg",
    location: "Zona Comercial",
    price: "$95 - $160",
    features: ["Centro de Negocios", "Gimnasio", "Restaurante", "WiFi"],
    amenities: [Wifi, Car, Coffee],
    description: "Hotel moderno ideal para viajeros de negocios con todas las comodidades necesarias."
  }
]

export default function Hoteles() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Hero Section */}
        <div className="relative h-64 rounded-lg overflow-hidden mb-8">
          <img
            src="https://ugc.same-assets.com/1qQ1ZwpOYDqJx2RF9TvpigjsAQEB-_Kr.jpeg"
            alt="Hoteles en Mazatlán"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-2">Hospedaje en Mazatlán</h1>
              <p className="text-xl">Encuentra el hotel perfecto para tu estancia</p>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-[#2c363b] mb-4">Encuentra tu Hotel Ideal</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Zona</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>Todas las zonas</option>
                <option>Zona Dorada</option>
                <option>Centro Histórico</option>
                <option>Zona Hotelera</option>
                <option>Zona Comercial</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>Todas las categorías</option>
                <option>Resort de Lujo</option>
                <option>Hotel Boutique</option>
                <option>Hotel Familiar</option>
                <option>Hotel Económico</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Precio</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>Todos los precios</option>
                <option>$40 - $80</option>
                <option>$80 - $150</option>
                <option>$150 - $250</option>
                <option>$250+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Servicios</label>
              <select className="w-full p-2 border border-gray-300 rounded-md">
                <option>Todos los servicios</option>
                <option>Todo Incluido</option>
                <option>Frente al Mar</option>
                <option>Spa</option>
                <option>Familiar</option>
              </select>
            </div>
          </div>
        </div>

        {/* Hotels Grid */}
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

                <button className="w-full bg-[#bb904d] hover:bg-[#814739] text-white py-2 px-4 rounded-md transition-colors">
                  Ver Disponibilidad
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-[#2c363b] mb-6">¿Por qué elegir Mazatlán?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#bb904d] rounded-full flex items-center justify-center mx-auto mb-4">
                <Waves size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#814739] mb-2">Playas Doradas</h3>
              <p className="text-gray-600">21 km de playas con arena dorada y aguas cristalinas del Pacífico.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#bb904d] rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#814739] mb-2">Gastronomía Única</h3>
              <p className="text-gray-600">Sabores del mar y tradiciones culinarias que deleitan todos los paladares.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#bb904d] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[#814739] mb-2">Hospitalidad</h3>
              <p className="text-gray-600">La calidez de nuestra gente hace de cada visita una experiencia única.</p>
            </div>
          </div>
        </div>
      </main>
      <BottomNavigation />
    </div>
  )
}

import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import { Star, MapPin, Clock, Phone, ChefHat, Coffee, Pizza } from 'lucide-react'

const cuisineTypes = [
  { name: "Cocina Totonaca", icon: ChefHat, count: 6, description: "Tradición ancestral" },
  { name: "Pizzerías", icon: Pizza, count: 6, description: "Favoritas locales" },
  { name: "Cafeterías", icon: Coffee, count: 4, description: "Café y descanso" }
]

const restaurants = [
  {
    id: 1,
    name: "Pizzería El Uli",
    cuisine: "Pizzerías",
    rating: 4,
    image: "/pictures/ic_food.png",
    location: "Calle J.J. Núñez #109, Centro",
    priceRange: "$ - $$",
    hours: "13:00 - 22:00",
    phone: "tel:7848420064",
    specialties: ["Pizza artesanal", "Salsas caseras"],
    features: ["Ambiente familiar", "Para llevar"],
    description: "Deliciosas pizzas con receta casera en el corazón de Papantla."
  },
  {
    id: 2,
    name: "Restaurante Nakú",
    cuisine: "Cocina Totonaca",
    rating: 5,
    image: "/pictures/ic_food.png",
    location: "Heroico Colegio Militar S/N, Barrio del Naranjo",
    priceRange: "$$",
    hours: "12:00 - 22:00",
    phone: "tel:7848423112",
    specialties: ["Tamal totonaca", "Chanchamito", "Mole regional"],
    features: ["Tradición", "Ingredientes locales"],
    description: "Cocina ancestral totonaca con platillos tradicionales únicos."
  },
  {
    id: 3,
    name: "Café Sereno",
    cuisine: "Cafeterías",
    rating: 4,
    image: "/pictures/ic_food.png",
    location: "Reforma #110, Centro",
    priceRange: "$",
    hours: "08:00 - 21:00",
    phone: "tel:7841353775",
    specialties: ["Café de olla", "Pan artesanal"],
    features: ["WiFi gratuito", "Ambiente relajado"],
    description: "Cafetería local ideal para descansar o reunirse con amigos."
  },
  {
    id: 4,
    name: "Restaurante El Zaguán",
    cuisine: "Cocina Totonaca",
    rating: 5,
    image: "/pictures/ic_food.png",
    location: "Pino Suárez #206, Centro",
    priceRange: "$$ - $$$",
    hours: "13:00 - 23:00",
    phone: "tel:8426416",
    specialties: ["Carnes asadas", "Moles regionales"],
    features: ["Música en vivo", "Terraza"],
    description: "Espacio tradicional con cocina local e ideal para eventos."
  }
]

export default function Restaurantes() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Hero Section */}
        <div className="relative h-64 rounded-lg overflow-hidden mb-8">
          <img
            src="/pictures/restaurantes.jpeg"
            alt="Restaurantes en Papantla"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-2">Gastronomía de Papantla</h1>
              <p className="text-xl">Sabores tradicionales, café aromático y sazón local</p>
            </div>
          </div>
        </div>

        {/* Cuisine Types */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {cuisineTypes.map((cuisine, index) => {
            const Icon = cuisine.icon
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-[#bb904d] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-[#2c363b] mb-1">{cuisine.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{cuisine.description}</p>
                <span className="bg-[#f6f7f5] text-[#814739] px-2 py-1 rounded text-xs">
                  {cuisine.count} restaurantes
                </span>
              </div>
            )
          })}
        </div>

        {/* Featured Restaurants */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#2c363b] mb-6">Restaurantes Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-[#bb904d] text-white px-2 py-1 rounded text-sm font-medium">
                    {restaurant.cuisine}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center">
                      {[...Array(restaurant.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#2c363b] mb-2">{restaurant.name}</h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin size={16} className="mr-2" />
                      <span>{restaurant.location}</span>
                      <span className="ml-auto font-medium text-[#814739]">{restaurant.priceRange}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Clock size={16} className="mr-2" />
                      <span>{restaurant.hours}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm mb-4">{restaurant.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-[#814739] mb-2">Especialidades:</h4>
                    <div className="flex flex-wrap gap-1">
                      {restaurant.specialties.map((specialty, index) => (
                        <span key={index} className="bg-[#f6f7f5] text-[#814739] px-2 py-1 rounded text-xs">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {restaurant.features.map((feature, index) => (
                      <span key={index} className="bg-[#bb904d] text-white px-2 py-1 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>

                  <a
                    href={restaurant.phone}
                    className="block text-center w-full bg-[#bb904d] hover:bg-[#814739] text-white py-2 px-4 rounded-md transition-colors"
                  >
                    Reservar
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <BottomNavigation />
    </div>
  )
}

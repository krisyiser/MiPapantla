import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import { Star, MapPin, Clock, Phone, ChefHat, Fish, Coffee, Utensils } from 'lucide-react'

const restaurants = [
  {
    id: 1,
    name: "El Shrimp Bucket",
    cuisine: "Mariscos",
    rating: 5,
    image: "https://ugc.same-assets.com/gTk2W2RsUQF39naWUgkxh-yxnIQRQ3U-.jpeg",
    location: "Centro Histórico",
    priceRange: "$$ - $$$",
    hours: "12:00 - 23:00",
    phone: "+52 669 981 6350",
    specialties: ["Camarones al Coco", "Pescado Zarandeado", "Aguachile Verde"],
    features: ["Terraza", "Vista al Mar", "Música en Vivo"],
    description: "Icónico restaurante de mariscos con más de 50 años de tradición, famoso por sus camarones al coco."
  },
  {
    id: 2,
    name: "Pancho's Restaurant",
    cuisine: "Mexicana Contemporánea",
    rating: 5,
    image: "https://ugc.same-assets.com/IvjqOtKAZj1Uq_xgG8tZ4gBUWGG8KO8L.jpeg",
    location: "Zona Dorada",
    priceRange: "$$ - $$$",
    hours: "18:00 - 00:00",
    phone: "+52 669 914 3977",
    specialties: ["Cochinita Pibil", "Mole Poblano", "Chiles en Nogada"],
    features: ["Ambiente Elegante", "Cava de Vinos", "Chef Ejecutivo"],
    description: "Refinada cocina mexicana contemporánea con ingredientes locales y presentación de vanguardia."
  },
  {
    id: 3,
    name: "Mariscos El Güero",
    cuisine: "Mariscos Tradicionales",
    rating: 4,
    image: "https://ugc.same-assets.com/HRawxe4t6hOX6_ZEbVS6DDChTit8-IqX.jpeg",
    location: "Mercado Pino Suárez",
    priceRange: "$ - $$",
    hours: "09:00 - 18:00",
    phone: "+52 669 982 7682",
    specialties: ["Ceviche de Camarón", "Tostadas de Marlin", "Sopa de Siete Mares"],
    features: ["Auténtico", "Ambiente Local", "Precios Accesibles"],
    description: "Auténtico restaurante de mariscos frecuentado por locales, con los mejores ceviches de la ciudad."
  },
  {
    id: 4,
    name: "Casa Loma",
    cuisine: "Internacional",
    rating: 5,
    image: "https://ugc.same-assets.com/PSzr6RnHibhfn14HDqf8EuIbSyHkOEzx.jpeg",
    location: "Zona Dorada",
    priceRange: "$$$ - $$$$",
    hours: "18:00 - 23:00",
    phone: "+52 669 913 5398",
    specialties: ["Filete Wellington", "Risotto de Mariscos", "Crème Brûlée"],
    features: ["Fine Dining", "Sommelier", "Reservaciones Requeridas"],
    description: "Elegante restaurante de alta cocina internacional con carta de vinos selecta y ambiente sofisticado."
  },
  {
    id: 5,
    name: "Los Arcos",
    cuisine: "Fusión Asia-Mexicana",
    rating: 4,
    image: "https://ugc.same-assets.com/lXxeRD25e18nJyP4NwW7PwT6OeSjuP5I.jpeg",
    location: "Zona Dorada",
    priceRange: "$$ - $$$",
    hours: "17:00 - 23:00",
    phone: "+52 669 913 5767",
    specialties: ["Sushi de Atún Rojo", "Tacos de Pato", "Ramen de Mariscos"],
    features: ["Fusión Innovadora", "Bar de Sushi", "Ambiente Moderno"],
    description: "Innovadora fusión de sabores asiáticos con ingredientes mexicanos en un ambiente contemporáneo."
  },
  {
    id: 6,
    name: "Angelina's Café",
    cuisine: "Cafetería Gourmet",
    rating: 4,
    image: "https://ugc.same-assets.com/OUlVvgabOEvfqZ_ZdCaYKoHABcIE4zcs.jpeg",
    location: "Centro Histórico",
    priceRange: "$ - $$",
    hours: "07:00 - 22:00",
    phone: "+52 669 982 5613",
    specialties: ["Café de Olla", "Pasteles Artesanales", "Breakfast Americano"],
    features: ["Terraza", "WiFi Gratis", "Ambiente Relajado"],
    description: "Acogedora cafetería con los mejores cafés de especialidad y repostería artesanal de la región."
  }
]

const cuisineTypes = [
  { name: "Mariscos", icon: Fish, count: 15, description: "Frescos del Pacífico" },
  { name: "Mexicana", icon: ChefHat, count: 12, description: "Tradición culinaria" },
  { name: "Internacional", icon: Utensils, count: 8, description: "Sabores del mundo" },
  { name: "Cafeterías", icon: Coffee, count: 6, description: "Café de especialidad" }
]

export default function Restaurantes() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Hero Section */}
        <div className="relative h-64 rounded-lg overflow-hidden mb-8">
          <img
            src="https://ugc.same-assets.com/gTk2W2RsUQF39naWUgkxh-yxnIQRQ3U-.jpeg"
            alt="Restaurantes en Mazatlán"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-2">Gastronomía de Mazatlán</h1>
              <p className="text-xl">Sabores del mar que conquistarán tu paladar</p>
            </div>
          </div>
        </div>

        {/* Cuisine Types */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
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
                    <div className="flex items-center text-gray-600 text-sm">
                      <Phone size={16} className="mr-2" />
                      <span>{restaurant.phone}</span>
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

                  <button className="w-full bg-[#bb904d] hover:bg-[#814739] text-white py-2 px-4 rounded-md transition-colors">
                    Ver Menú
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Local Specialties */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-[#2c363b] mb-6">Especialidades de Mazatlán</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src="https://ugc.same-assets.com/HRawxe4t6hOX6_ZEbVS6DDChTit8-IqX.jpeg"
                  alt="Aguachile"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-[#814739] mb-2">Aguachile</h3>
              <p className="text-sm text-gray-600">Camarones marinados en lima con chile y cebolla</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src="https://ugc.same-assets.com/gTk2W2RsUQF39naWUgkxh-yxnIQRQ3U-.jpeg"
                  alt="Pescado Zarandeado"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-[#814739] mb-2">Pescado Zarandeado</h3>
              <p className="text-sm text-gray-600">Pescado entero asado con especias y chiles</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src="https://ugc.same-assets.com/PSzr6RnHibhfn14HDqf8EuIbSyHkOEzx.jpeg"
                  alt="Camarones al Coco"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-[#814739] mb-2">Camarones al Coco</h3>
              <p className="text-sm text-gray-600">Camarones empanizados en coco con salsa dulce</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
                <img
                  src="https://ugc.same-assets.com/lXxeRD25e18nJyP4NwW7PwT6OeSjuP5I.jpeg"
                  alt="Marlín Ahumado"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-[#814739] mb-2">Marlín Ahumado</h3>
              <p className="text-sm text-gray-600">Tradicional técnica de ahumado local</p>
            </div>
          </div>
        </div>
      </main>
      <BottomNavigation />
    </div>
  )
}

import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import { Camera, Clock, MapPin, Star, Ticket, Users, Lighthouse, Building, Fish, TreePine } from 'lucide-react'

const attractions = [
  {
    id: 1,
    name: "El Faro de Mazatlán",
    type: "Monumento Histórico",
    image: "https://ugc.same-assets.com/B6-OZ8sHQ0WZFVHya0Jw6FoEUrDWzz_w.jpeg",
    location: "Cerro del Crestón",
    hours: "09:00 - 17:00",
    price: "Entrada Moderada",
    rating: 5,
    duration: "2-3 horas",
    difficulty: "Moderada",
    highlights: ["Vista Panorámica", "Faro más Alto del Mundo", "Atardecer Espectacular"],
    description: "El segundo faro más alto del mundo con 157 metros sobre el nivel del mar. Ofrece vistas panorámicas incomparables de la ciudad y el océano.",
    activities: ["Senderismo", "Fotografía", "Observación"],
    tips: "Lleva agua y protector solar. Los mejores atardeceres son entre noviembre y abril."
  },
  {
    id: 2,
    name: "Centro Histórico",
    type: "Patrimonio Cultural",
    image: "https://ugc.same-assets.com/TQ_s1GC7achOWmNUJIzijy0xkZ9c89Tt.jpeg",
    location: "Centro de Mazatlán",
    hours: "24 horas",
    price: "Gratis",
    rating: 5,
    duration: "3-4 horas",
    difficulty: "Fácil",
    highlights: ["Catedral", "Plaza Principal", "Arquitectura Colonial"],
    description: "Corazón histórico de Mazatlán con arquitectura colonial del siglo XIX, la majestuosa Catedral y el vibrante mercado municipal.",
    activities: ["Caminata", "Compras", "Gastronomía"],
    tips: "Visita por la mañana para evitar el calor. No te pierdas el mercado Pino Suárez."
  },
  {
    id: 3,
    name: "Gran Acuario Mazatlán",
    type: "Acuario",
    image: "https://ugc.same-assets.com/qcy8x-sF-VewrxttGU60J1vMpYOxdMp5.jpeg",
    location: "Av. de los Deportes",
    hours: "10:00 - 18:00",
    price: "$180 - $250",
    rating: 5,
    duration: "2-3 horas",
    difficulty: "Fácil",
    highlights: ["Túnel de Tiburones", "Show de Lobos Marinos", "Especies del Pacífico"],
    description: "Uno de los acuarios más grandes de México con más de 200 especies marinas del Pacífico mexicano, incluyendo tiburones, mantarrayas y lobos marinos.",
    activities: ["Shows", "Alimentación", "Exhibiciones"],
    tips: "Compra boletos en línea para descuentos. Los shows son cada 2 horas."
  },
  {
    id: 4,
    name: "Observatorio Mazatlán 1873",
    type: "Observatorio Astronómico",
    image: "https://ugc.same-assets.com/BToXS_U8FiCIfCI-s3nx8KeE48JpkASD.jpeg",
    location: "Cerro del Vigía",
    hours: "19:00 - 23:00",
    price: "$120 - $180",
    rating: 4,
    duration: "2 horas",
    difficulty: "Fácil",
    highlights: ["Observación Estelar", "Telescopios", "Vista Nocturna"],
    description: "Observatorio astronómico histórico con telescopios modernos para observar estrellas, planetas y la luna. Experiencia única bajo el cielo de Mazatlán.",
    activities: ["Astronomía", "Fotografía", "Educación"],
    tips: "Reserva con anticipación. Las noches despejadas son ideales entre diciembre y mayo."
  },
  {
    id: 5,
    name: "Teatro Ángela Peralta",
    type: "Teatro Histórico",
    image: "https://ugc.same-assets.com/j7diHsQvARYH9ftLlvfXu6BqI5vQMqc9.jpeg",
    location: "Centro Histórico",
    hours: "Según programación",
    price: "$200 - $800",
    rating: 5,
    duration: "2-3 horas",
    difficulty: "Fácil",
    highlights: ["Arquitectura Neoclásica", "Espectáculos", "Historia Cultural"],
    description: "Joya arquitectónica neoclásica de 1874, considerado uno de los teatros más bellos de México. Sede de eventos culturales y artísticos.",
    activities: ["Espectáculos", "Tours", "Cultura"],
    tips: "Revisa la cartelera en línea. Los tours guiados son los martes y jueves."
  },
  {
    id: 6,
    name: "Malecón de Mazatlán",
    type: "Paseo Costero",
    image: "https://ugc.same-assets.com/1qQ1ZwpOYDqJx2RF9TvpigjsAQEB-_Kr.jpeg",
    location: "Costa de Mazatlán",
    hours: "24 horas",
    price: "Gratis",
    rating: 5,
    duration: "1-4 horas",
    difficulty: "Fácil",
    highlights: ["Vista al Mar", "Esculturas", "Atardeceres"],
    description: "Uno de los malecones más largos del mundo con 8.5 km de extensión. Perfecto para caminar, correr o simplemente disfrutar del océano.",
    activities: ["Caminata", "Ciclismo", "Fotografía"],
    tips: "Ideal para el atardecer. Hay bicicletas de alquiler disponibles."
  },
  {
    id: 7,
    name: "Isla de la Piedra",
    type: "Isla Natural",
    image: "https://ugc.same-assets.com/lEwVR2NqlZC_56eq5S-1K87hDRXCdnD3.jpeg",
    location: "Bahía de Mazatlán",
    hours: "09:00 - 17:00",
    price: "$50 - $150",
    rating: 4,
    duration: "4-6 horas",
    difficulty: "Fácil",
    highlights: ["Playas Vírgenes", "Paseos a Caballo", "Mariscos Frescos"],
    description: "Paraíso natural a 15 minutos en lancha, famosa por sus playas vírgenes, paseos a caballo en la arena y auténticos restaurantes de mariscos.",
    activities: ["Playa", "Equitación", "Gastronomía"],
    tips: "Las lanchas salen cada 30 minutos desde el embarcadero. Lleva efectivo."
  },
  {
    id: 8,
    name: "Mercado Pino Suárez",
    type: "Mercado Tradicional",
    image: "https://ugc.same-assets.com/HRawxe4t6hOX6_ZEbVS6DDChTit8-IqX.jpeg",
    location: "Centro Histórico",
    hours: "07:00 - 18:00",
    price: "Gratis entrada",
    rating: 4,
    duration: "1-2 horas",
    difficulty: "Fácil",
    highlights: ["Artesanías", "Comida Local", "Cultura Popular"],
    description: "Mercado tradicional con más de 100 años de historia, donde encontrarás artesanías locales, comida típica y el auténtico ambiente mazatleco.",
    activities: ["Compras", "Gastronomía", "Cultura"],
    tips: "Regatear es parte de la experiencia. Prueba las tostadas de marlín."
  }
]

const attractionTypes = [
  { name: "Históricos", icon: Building, count: 4, description: "Patrimonio cultural" },
  { name: "Naturales", icon: TreePine, count: 3, description: "Belleza natural" },
  { name: "Acuáticos", icon: Fish, count: 2, description: "Vida marina" },
  { name: "Monumentos", icon: Lighthouse, count: 3, description: "Iconos de la ciudad" }
]

export default function Visitame() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6 pb-20">
        {/* Hero Section */}
        <div className="relative h-72 rounded-lg overflow-hidden mb-8">
          <img
            src="https://ugc.same-assets.com/B6-OZ8sHQ0WZFVHya0Jw6FoEUrDWzz_w.jpeg"
            alt="Atractivos de Mazatlán"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-2">¡Visítame Mazatlán!</h1>
              <p className="text-xl mb-4">Descubre los tesoros de la Perla del Pacífico</p>
              <div className="flex justify-center items-center space-x-6 text-sm">
                <div className="flex items-center">
                  <Camera className="mr-2" size={20} />
                  <span>15+ Atractivos</span>
                </div>
                <div className="flex items-center">
                  <Users className="mr-2" size={20} />
                  <span>Para toda la familia</span>
                </div>
                <div className="flex items-center">
                  <Ticket className="mr-2" size={20} />
                  <span>Desde gratis</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Attraction Types */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {attractionTypes.map((type, index) => {
            const Icon = type.icon
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className="w-12 h-12 bg-[#bb904d] rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-[#2c363b] mb-1">{type.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                <span className="bg-[#f6f7f5] text-[#814739] px-2 py-1 rounded text-xs">
                  {type.count} lugares
                </span>
              </div>
            )
          })}
        </div>

        {/* Attractions Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-[#2c363b] mb-6">Atractivos Imperdibles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attractions.map((attraction) => (
              <div key={attraction.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img
                    src={attraction.image}
                    alt={attraction.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-[#bb904d] text-white px-2 py-1 rounded text-sm font-medium">
                    {attraction.type}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center bg-black bg-opacity-60 text-white px-2 py-1 rounded">
                      {[...Array(attraction.rating)].map((_, i) => (
                        <Star key={i} size={14} className="text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-green-600 text-white px-2 py-1 rounded text-sm">
                    {attraction.price}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#2c363b] mb-2">{attraction.name}</h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin size={16} className="mr-2" />
                      <span>{attraction.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Clock size={16} className="mr-2" />
                      <span>{attraction.hours}</span>
                      <span className="ml-auto font-medium text-[#814739]">{attraction.duration}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 text-sm mb-4">{attraction.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-[#814739] mb-2">Destacados:</h4>
                    <div className="flex flex-wrap gap-1">
                      {attraction.highlights.map((highlight, index) => (
                        <span key={index} className="bg-[#f6f7f5] text-[#814739] px-2 py-1 rounded text-xs">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      attraction.difficulty === 'Fácil' ? 'bg-green-100 text-green-700' :
                      attraction.difficulty === 'Moderada' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      Dificultad: {attraction.difficulty}
                    </span>
                  </div>

                  <div className="bg-blue-50 p-3 rounded mb-4">
                    <p className="text-sm text-blue-800"><strong>Consejo:</strong> {attraction.tips}</p>
                  </div>

                  <button className="w-full bg-[#bb904d] hover:bg-[#814739] text-white py-2 px-4 rounded-md transition-colors">
                    Ver Detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Planning Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-[#2c363b] mb-4">Planifica tu Visita</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-[#814739]">Mejor época para visitar</h3>
                <p className="text-gray-600 text-sm">Noviembre a abril: clima perfecto, menor humedad</p>
              </div>
              <div>
                <h3 className="font-bold text-[#814739]">Duración recomendada</h3>
                <p className="text-gray-600 text-sm">3-5 días para visitar los principales atractivos</p>
              </div>
              <div>
                <h3 className="font-bold text-[#814739]">Presupuesto promedio</h3>
                <p className="text-gray-600 text-sm">$500-1500 MXN por día (sin hospedaje)</p>
              </div>
              <div>
                <h3 className="font-bold text-[#814739]">Recomendación</h3>
                <p className="text-gray-600 text-sm">Combina atractivos históricos con naturales</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#1dace0] to-[#bb904d] rounded-lg shadow-md p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Rutas Sugeridas</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold">Ruta Histórica (1 día)</h3>
                <p className="text-sm">Centro Histórico → Teatro Ángela Peralta → Mercado Pino Suárez</p>
              </div>
              <div>
                <h3 className="font-bold">Ruta Natural (1 día)</h3>
                <p className="text-sm">El Faro → Malecón → Isla de la Piedra</p>
              </div>
              <div>
                <h3 className="font-bold">Ruta Familiar (1 día)</h3>
                <p className="text-sm">Gran Acuario → Playa Norte → Observatorio (noche)</p>
              </div>
              <div>
                <h3 className="font-bold">Ruta Completa (3 días)</h3>
                <p className="text-sm">Combina todas las rutas anteriores con tiempo libre</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transportation Info */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-6 rounded">
          <h3 className="font-bold text-yellow-800 mb-2">🚌 Transporte y Acceso</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-yellow-700">
            <div>
              <p><strong>Transporte público:</strong> Autobuses urbanos conectan todos los atractivos principales ($12 MXN)</p>
              <p><strong>Taxi/Uber:</strong> Disponible 24/7, ideal para distancias cortas</p>
            </div>
            <div>
              <p><strong>Tours organizados:</strong> Varias agencias ofrecen paquetes completos</p>
              <p><strong>Bicicletas:</strong> Disponibles para alquiler en el malecón y centro histórico</p>
            </div>
          </div>
        </div>
      </main>
      <BottomNavigation />
    </div>
  )
}

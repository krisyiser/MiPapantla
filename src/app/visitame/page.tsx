import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import { Camera, Clock, MapPin, Star, Ticket, Users, Building, Landmark, Palette } from 'lucide-react'
import Image from 'next/image'

const attractions = [
  {
    id: 1,
    name: 'Zona Arqueológica de El Tajín',
    type: 'Sitio Arqueológico',
    image: '/pictures/visitame.jpeg',
    location: 'Col. Tajín, Papantla, Veracruz',
    hours: '09:00 - 17:00',
    price: '$100 MXN (gratuito para menores, estudiantes y adultos mayores)',
    rating: 5,
    duration: '2-3 horas',
    difficulty: 'Moderada',
    highlights: ['Templo de los Nichos', 'Museo de sitio', '17 Juegos de pelota'],
    description: 'Centro ceremonial totonaca que floreció entre 600–1200 d.C., famoso por su arquitectura singular y valor histórico.',
    activities: ['Visita guiada', 'Explorar estructuras', 'Museo'],
    tips: 'Lleva agua, sombrero y calzado cómodo. Evita las horas de sol intenso.',
    mapUrl: 'https://maps.app.goo.gl/nMZ9uNcVDWSTVJbX9'
  },
  {
    id: 2,
    name: 'Monumento al Volador',
    type: 'Monumento Cultural',
    image: '/pictures/visitame.jpeg',
    location: 'Cerro del Campanario, Papantla',
    hours: '24 horas',
    price: 'Gratis',
    rating: 5,
    duration: '30-45 min',
    difficulty: 'Fácil',
    highlights: ['Vista Panorámica', 'Diseño de Teodoro Cano', 'Tradición Totonaca'],
    description: 'Monumento de 18m de altura dedicado al ritual de los Voladores de Papantla, ubicado en lo alto del cerro.',
    activities: ['Fotografía', 'Observación cultural'],
    tips: 'Sube temprano para evitar el calor y disfrutar la vista despejada.',
    mapUrl: 'https://maps.app.goo.gl/zZ9PMtBNFgEps9vZ9'
  },
  {
    id: 3,
    name: 'Museo Teodoro Cano',
    type: 'Museo',
    image: '/pictures/visitame.jpeg',
    location: 'Rodolfo Curti 101, Papantla',
    hours: '09:00 - 18:00 (Martes a Domingo)',
    price: 'Entrada gratuita',
    rating: 5,
    duration: '1-2 horas',
    difficulty: 'Fácil',
    highlights: ['Obra pictórica', 'Escultura', 'Casita Totonaca'],
    description: 'Exhibe la obra del pintor y muralista Teodoro Cano, incluyendo óleo, barro, escultura y tradiciones.',
    activities: ['Talleres', 'Exposiciones', 'Visitas guiadas'],
    tips: 'Ideal para conocer la identidad visual de Papantla.',
    mapUrl: 'https://maps.app.goo.gl/9KD7LihCEaZ9kVvk8'
  },
  {
    id: 4,
    name: 'Centro de las Artes Indígenas',
    type: 'Centro Cultural',
    image: '/pictures/visitame.jpeg',
    location: 'Parque Takilhsukut, Papantla',
    hours: '09:00 - 17:00',
    price: 'Entrada libre',
    rating: 5,
    duration: '1-3 horas',
    difficulty: 'Fácil',
    highlights: ['Casas-Escuela', 'Patrimonio UNESCO', 'Arte Indígena'],
    description: 'Complejo de formación artística totonaca con 16 casas dedicadas a danza, música, cocina, medicina, etc.',
    activities: ['Talleres', 'Demostraciones', 'Festivales'],
    tips: 'Ideal para visitar durante Cumbre Tajín.',
    mapUrl: 'https://maps.app.goo.gl/fPSji9AgNmQEvGeZA'
  },
  {
    id: 5,
    name: 'Zona Arqueológica Cuyuxquihui',
    type: 'Sitio Arqueológico',
    image: '/pictures/visitame.jpeg',
    location: 'Paso del Correo, Papantla',
    hours: '09:00 - 17:00',
    price: 'Entrada libre',
    rating: 4,
    duration: '1-2 horas',
    difficulty: 'Moderada',
    highlights: ['Ciudad-Fortaleza', 'Juego de Pelota', 'Panorámica'],
    description: 'Ruinas fortificadas del siglo XIII con edificios ceremoniales y militares.',
    activities: ['Senderismo', 'Exploración', 'Fotografía'],
    tips: 'Requiere transporte. Lleva calzado de campo.',
    mapUrl: 'https://maps.app.goo.gl/GKWrTivDCcGTrvMj6'
  },
  {
    id: 6,
    name: 'Mural Escultórico a la Cultura Totonaca',
    type: 'Arte Monumental',
    image: '/pictures/visitame.jpeg',
    location: 'Zócalo de Papantla',
    hours: '24 horas',
    price: 'Gratis',
    rating: 5,
    duration: '30 min - 1 hora',
    difficulty: 'Fácil',
    highlights: ['Relieves Históricos', 'Teodoro Cano', 'Quetzalcóatl'],
    description: 'Mural de 84m que narra el origen, historia y cosmovisión totonaca, realizado por Cano y colaboradores.',
    activities: ['Observación', 'Arte público'],
    tips: 'Ideal para comenzar el recorrido por el centro.',
    mapUrl: 'https://maps.app.goo.gl/UmVXm8Jkk9dhs38M6'
  }
]

export default function VisitamePapantla() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6 pb-20">
        <div className="relative h-72 rounded-lg overflow-hidden mb-8">
          <Image
            src="/pictures/visitame.jpeg"
            alt="Visítame Papantla"
            fill
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold mb-2">Visítame Papantla</h1>
              <p className="text-xl">Recorre los tesoros culturales y naturales del Totonacapan</p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-[#2c363b] mb-6">Lugares Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {attractions.map((place) => (
            <div key={place.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <div className="relative h-44">
                <Image src={place.image} alt={place.name} fill className="object-cover w-full h-full" />
                <div className="absolute top-2 left-2 bg-[#bb904d] text-white px-2 py-1 rounded text-xs font-semibold">
                  {place.type}
                </div>
                <div className="absolute bottom-2 right-2 flex space-x-1">
                  {[...Array(place.rating)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold text-[#2c363b] mb-1">{place.name}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin size={16} className="mr-2" />
                  {place.location}
                </div>
                <p className="text-sm text-gray-700 mb-2">{place.description}</p>
                <div className="text-sm text-gray-600 mb-2 flex items-center">
                  <Clock size={16} className="mr-2" />
                  <span>{place.hours}</span>
                  <span className="ml-auto text-[#814739] font-medium">{place.duration}</span>
                </div>
                <p className="text-sm text-gray-600 mb-1"><strong>Precio:</strong> {place.price}</p>
                <div className="mb-2">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    place.difficulty === 'Fácil' ? 'bg-green-100 text-green-700' :
                    place.difficulty === 'Moderada' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    Dificultad: {place.difficulty}
                  </span>
                </div>
                <p className="text-sm text-blue-800 bg-blue-50 rounded p-2 mb-3"><strong>Consejo:</strong> {place.tips}</p>
                <a
                  href={place.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-[#bb904d] hover:bg-[#814739] text-white py-2 px-4 rounded-md"
                >
                  Ver en Mapa
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Planifica tu visita */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-[#2c363b] mb-4">Planifica tu Visita</h2>
            <ul className="space-y-3 text-sm text-gray-700">
              <li><strong>Mejor época:</strong> Noviembre a marzo, clima templado y seco</li>
              <li><strong>Duración ideal:</strong> 3-4 días para conocer atractivos y alrededores</li>
              <li><strong>Presupuesto medio:</strong> $500 - $1200 MXN diarios (sin hospedaje)</li>
              <li><strong>Vestimenta:</strong> Ropa ligera, sombrero, bloqueador, zapatos para caminata</li>
              <li><strong>Recomendación:</strong> Combina atractivos naturales y culturales</li>
            </ul>
          </div>

          {/* Rutas Sugeridas */}
          <div className="bg-gradient-to-r from-[#1dace0] to-[#bb904d] rounded-lg shadow-md p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Rutas Sugeridas</h2>
            <ul className="space-y-3 text-sm">
              <li><strong>Ruta Cultural:</strong> Museo Teodoro Cano → Mural Totonaca → Centro de las Artes</li>
              <li><strong>Ruta Arqueológica:</strong> El Tajín → Cuyuxquihui</li>
              <li><strong>Ruta Panorámica:</strong> Monumento al Volador → Centro Histórico</li>
              <li><strong>Ruta Completa:</strong> 2 días combinando todas las anteriores</li>
            </ul>
          </div>
        </div>

        {/* Transporte */}
        <div className="bg-yellow-100 border-l-4 border-yellow-600 p-6 rounded">
          <h3 className="text-xl font-bold text-yellow-800 mb-2">🚌 Transporte y Acceso</h3>
          <p className="text-sm text-yellow-800 mb-1"><strong>Desde el centro:</strong> La mayoría de los atractivos están a 5-15 min en auto</p>
          <p className="text-sm text-yellow-800 mb-1"><strong>Opciones:</strong> Taxis locales, RadioTaxi Naku (7848425872), transporte público a El Tajín y Takilhsukut</p>
          <p className="text-sm text-yellow-800"><strong>Recomendación:</strong> Consulta horarios anticipadamente en fines de semana y feriados</p>
        </div>
      </main>
      <BottomNavigation />
    </div>
  )
}

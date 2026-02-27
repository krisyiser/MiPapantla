// src/app/visitame/page.tsx
import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import Image from 'next/image'
import SectionHero from '@/components/SectionHero'
import MapButton from '@/components/MapButton'
import {
  MapPin,
  Clock,
  Star,
  Ticket,
  BadgeInfo,
  Footprints,
  Building,
  Users,
  Camera,
  Palette,
} from 'lucide-react'

type Attraction = {
  id: number
  name: string
  type: string
  image: string
  location: string
  hours: string
  price: string
  rating: number
  duration: string
  difficulty: 'Fácil' | 'Moderada' | 'Demandante'
  highlights: string[]
  description: string
  activities: string[]
  tips: string
  mapUrl: string
}

const attractions: Attraction[] = [
  {
    id: 1,
    name: 'Zona Arqueológica de El Tajín',
    type: 'Sitio Arqueológico',
    image: '/pictures/el-tajin.jpg',
    location: 'Col. Tajín, Papantla, Veracruz',
    hours: '09:00 – 17:00',
    price: '$100 MXN (gratuito para menores, estudiantes y adultos mayores)',
    rating: 5,
    duration: '2–3 horas',
    difficulty: 'Moderada',
    highlights: ['Templo de los Nichos', 'Museo de sitio', '17 juegos de pelota'],
    description:
      'Centro ceremonial totonaca que floreció entre 600–1200 d.C., famoso por su arquitectura singular y valor histórico.',
    activities: ['Visita guiada', 'Explorar estructuras', 'Museo'],
    tips: 'Lleva agua, sombrero y calzado cómodo. Evita las horas de sol intenso.',
    mapUrl: 'https://maps.app.goo.gl/nMZ9uNcVDWSTVJbX9',
  },
  {
    id: 2,
    name: 'Monumento al Volador',
    type: 'Monumento Cultural',
    image: '/pictures/monumento al volador.jpg',
    location: 'Cerro del Campanario, Papantla',
    hours: '24 horas',
    price: 'Gratis',
    rating: 5,
    duration: '30–45 min',
    difficulty: 'Fácil',
    highlights: ['Vista panorámica', 'Diseño de Teodoro Cano', 'Tradición totonaca'],
    description:
      'Monumento de 18 m de altura dedicado al ritual de los Voladores de Papantla, ubicado en lo alto del cerro.',
    activities: ['Fotografía', 'Observación cultural'],
    tips: 'Sube temprano para evitar el calor y disfrutar la vista despejada.',
    mapUrl: 'https://maps.app.goo.gl/zZ9PMtBNFgEps9vZ9',
  },
  {
    id: 3,
    name: 'Museo Teodoro Cano',
    type: 'Museo',
    image: '/pictures/museo.jpeg',
    location: 'Rodolfo Curti 101, Papantla',
    hours: '09:00 – 18:00 (Martes a Domingo)',
    price: 'Entrada gratuita',
    rating: 5,
    duration: '1–2 horas',
    difficulty: 'Fácil',
    highlights: ['Obra pictórica', 'Escultura', 'Casita totonaca'],
    description:
      'Exhibe la obra del pintor y muralista Teodoro Cano: óleo, barro, escultura y tradiciones.',
    activities: ['Talleres', 'Exposiciones', 'Visitas guiadas'],
    tips: 'Ideal para conocer la identidad visual de Papantla.',
    mapUrl: 'https://maps.app.goo.gl/9KD7LihCEaZ9kVvk8',
  },
  {
    id: 4,
    name: 'Centro de las Artes Indígenas',
    type: 'Centro Cultural',
    image: '/pictures/cai-takilhsukut.jpg',
    location: 'Parque Takilhsukut, Papantla',
    hours: '09:00 – 17:00',
    price: 'Entrada libre',
    rating: 5,
    duration: '1–3 horas',
    difficulty: 'Fácil',
    highlights: ['Casas-escuela', 'Patrimonio UNESCO', 'Arte indígena'],
    description:
      'Complejo de formación artística totonaca con 16 casas dedicadas a danza, música, cocina, medicina y más.',
    activities: ['Talleres', 'Demostraciones', 'Festivales'],
    tips: 'Ideal para visitar durante Cumbre Tajín.',
    mapUrl: 'https://maps.app.goo.gl/fPSji9AgNmQEvGeZA',
  },
  {
    id: 5,
    name: 'Zona Arqueológica Cuyuxquihui',
    type: 'Sitio Arqueológico',
    image: '/pictures/cuyuxquihui.jpeg',
    location: 'Paso del Correo, Papantla',
    hours: '09:00 – 17:00',
    price: 'Entrada libre',
    rating: 4,
    duration: '1–2 horas',
    difficulty: 'Moderada',
    highlights: ['Ciudad-fortaleza', 'Juego de pelota', 'Panorámica'],
    description:
      'Ruinas fortificadas del siglo XIII con edificios ceremoniales y militares.',
    activities: ['Senderismo', 'Exploración', 'Fotografía'],
    tips: 'Requiere transporte. Lleva calzado de campo.',
    mapUrl: 'https://maps.app.goo.gl/GKWrTivDCcGTrvMj6',
  },
  {
    id: 6,
    name: 'Mural Escultórico a la Cultura Totonaca',
    type: 'Arte Monumental',
    image: '/pictures/mural-totonaca.jpg',
    location: 'Zócalo de Papantla',
    hours: '24 horas',
    price: 'Gratis',
    rating: 5,
    duration: '30 min – 1 hora',
    difficulty: 'Fácil',
    highlights: ['Relieves históricos', 'Teodoro Cano', 'Quetzalcóatl'],
    description:
      'Mural de 84 m que narra el origen, historia y cosmovisión totonaca, realizado por Teodoro Cano y colaboradores.',
    activities: ['Observación', 'Arte público'],
    tips: 'Perfecto para comenzar el recorrido por el centro.',
    mapUrl: 'https://maps.app.goo.gl/UmVXm8Jkk9dhs38M6',
  },
]

export default function VisitamePapantla() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-6 pb-20">
        <SectionHero
          imageSrc="/pictures/visitame-hero.jpeg"
          titleKey="hero.visitame.title"
          subtitleKey="hero.visitame.subtitle"
        />
        {/* LISTADO */}
        <h2 className="text-3xl font-bold text-[#2c363b] mb-6">Lugares destacados</h2>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {attractions.map((place) => (
            <article
              key={place.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-44">
                <Image
                  src={place.image}
                  alt={place.name}
                  fill
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className="absolute top-2 left-2 bg-[#bb904d] text-white px-2 py-1 rounded text-xs font-semibold">
                  {place.type}
                </span>
                <div className="absolute bottom-2 right-2 flex space-x-1">
                  {Array.from({ length: place.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-[#2c363b] mb-1">{place.name}</h3>

                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin size={16} className="mr-2 shrink-0" />
                  <span className="truncate">{place.location}</span>
                </div>

                {place.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {place.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="bg-[#f6f7f5] text-[#814739] px-2 py-0.5 rounded text-xs"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-3">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2 shrink-0" />
                    <span className="truncate">{place.hours}</span>
                  </div>
                  <div className="flex items-center">
                    <Ticket size={16} className="mr-2 shrink-0" />
                    <span className="truncate">{place.price}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${place.difficulty === 'Fácil'
                      ? 'bg-green-100 text-green-700'
                      : place.difficulty === 'Moderada'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                      }`}
                    title="Nivel de exigencia"
                  >
                    <Footprints size={14} />
                    Dificultad: {place.difficulty}
                  </span>
                  <span className="text-[#814739] text-sm font-medium">{place.duration}</span>
                </div>

                <details className="group mb-3">
                  <summary className="cursor-pointer select-none text-sm text-[#2c363b] font-medium flex items-center gap-2">
                    <BadgeInfo size={16} />
                    Ver detalles y consejos
                    <span className="ml-auto text-[#bb904d] group-open:hidden">+ abrir</span>
                    <span className="ml-auto text-[#bb904d] hidden group-open:inline">– cerrar</span>
                  </summary>
                  <div className="mt-2 text-sm text-gray-700 space-y-2">
                    <p className="whitespace-pre-line">{place.description}</p>
                    {place.activities.length > 0 && (
                      <div>
                        <span className="font-medium text-[#2c363b]">Actividades: </span>
                        <span>{place.activities.join(' · ')}</span>
                      </div>
                    )}
                    <p className="text-blue-900 bg-blue-50 rounded p-2">
                      <strong>Consejo:</strong> {place.tips}
                    </p>
                  </div>
                </details>

                <MapButton url={place.mapUrl} />
              </div>
            </article>
          ))}
        </section>

        {/* Información para planear tu visita */}
        <section className="space-y-10 mb-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <a
              href="#rutas"
              className="group rounded-xl p-4 bg-gradient-to-br from-amber-50 to-amber-100/60 border border-amber-200 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <Palette className="text-amber-700 group-hover:scale-110 transition" size={22} />
                <div>
                  <p className="text-xs uppercase tracking-wide text-amber-700/80">Descubre</p>
                  <p className="text-sm font-semibold text-amber-900">Rutas culturales</p>
                </div>
              </div>
            </a>

            <a
              href="#clima"
              className="group rounded-xl p-4 bg-gradient-to-br from-cyan-50 to-cyan-100/60 border border-cyan-200 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <Clock className="text-cyan-700 group-hover:scale-110 transition" size={22} />
                <div>
                  <p className="text-xs uppercase tracking-wide text-cyan-700/80">Prepárate</p>
                  <p className="text-sm font-semibold text-cyan-900">Clima & tiempos</p>
                </div>
              </div>
            </a>

            <a
              href="#llegar"
              className="group rounded-xl p-4 bg-gradient-to-br from-emerald-50 to-emerald-100/60 border border-emerald-200 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <MapPin className="text-emerald-700 group-hover:scale-110 transition" size={22} />
                <div>
                  <p className="text-xs uppercase tracking-wide text-emerald-700/80">Cómo llegar</p>
                  <p className="text-sm font-semibold text-emerald-900">Rutas & accesos</p>
                </div>
              </div>
            </a>

            <a
              href="#transporte"
              className="group rounded-xl p-4 bg-gradient-to-br from-indigo-50 to-indigo-100/60 border border-indigo-200 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <Ticket className="text-indigo-700 group-hover:scale-110 transition" size={22} />
                <div>
                  <p className="text-xs uppercase tracking-wide text-indigo-700/80">Muévete</p>
                  <p className="text-sm font-semibold text-indigo-900">Transporte local</p>
                </div>
              </div>
            </a>
          </div>

          <div id="clima" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-2 mb-3">
                <Building size={18} className="text-[#bb904d]" />
                <h2 className="text-xl font-bold text-[#2c363b]">Planifica tu visita</h2>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Mejor época:</strong> Nov–Mar (templado y seco). En lluvias (jun–oct) lleva impermeable.
                </li>
                <li>
                  <strong>Duración ideal:</strong> 3–4 días para combinar arqueología, cultura y gastronomía.
                </li>
                <li>
                  <strong>Presupuesto:</strong> $500–$1200 MXN diarios por persona (sin hospedaje).
                </li>
                <li>
                  <strong>Vestimenta:</strong> Ropa ligera, sombrero/gorra, bloqueador, repelente, calzado cómodo.
                </li>
                <li>
                  <strong>Tip:</strong> Evita el sol intenso del mediodía en sitios abiertos.
                </li>
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs bg-emerald-50 text-emerald-700">Hidratación</span>
                <span className="px-2.5 py-1 rounded-full text-xs bg-amber-50 text-amber-700">Efectivo</span>
                <span className="px-2.5 py-1 rounded-full text-xs bg-indigo-50 text-indigo-700">Calzado</span>
                <span className="px-2.5 py-1 rounded-full text-xs bg-rose-50 text-rose-700">Bloqueador</span>
              </div>
            </article>

            <article
              id="rutas"
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-2 mb-3">
                <Palette size={18} className="text-[#bb904d]" />
                <h2 className="text-xl font-bold text-[#2c363b]">Rutas sugeridas</h2>
              </div>
              <ol className="relative ms-4 space-y-4">
                <li className="before:content-[''] before:absolute before:-left-4 before:top-2 before:h-full before:w-0.5 before:bg-amber-200">
                  <span className="absolute -left-5 top-1 h-2.5 w-2.5 rounded-full bg-[#bb904d]" />
                  <p className="text-sm text-gray-700">
                    <strong>Cultural (½ día):</strong> Museo Teodoro Cano → Mural Totonaca → Centro de las Artes.
                  </p>
                </li>
                <li className="before:content-[''] before:absolute before:-left-4 before:top-2 before:h-full before:w-0.5 before:bg-amber-200">
                  <span className="absolute -left-5 top-1 h-2.5 w-2.5 rounded-full bg-[#bb904d]" />
                  <p className="text-sm text-gray-700">
                    <strong>Arqueológica (1 día):</strong> El Tajín (mañana) → Cuyuxquihui (tarde).
                  </p>
                </li>
                <li>
                  <span className="absolute -left-5 top-1 h-2.5 w-2.5 rounded-full bg-[#bb904d]" />
                  <p className="text-sm text-gray-700">
                    <strong>Panorámica (½ día):</strong> Monumento al Volador → Centro Histórico → Cafecito local.
                  </p>
                </li>
              </ol>
              <div className="mt-4 text-xs text-gray-500">
                Tip: Si cuentas con 2–3 días, combina todas para una experiencia completa.
              </div>
            </article>

            <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={18} className="text-[#bb904d]" />
                <h2 className="text-xl font-bold text-[#2c363b]">Clima & tiempos</h2>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Clima:</strong> Cálido-húmedo; mañanas más frescas.
                </li>
                <li>
                  <strong>Tiempos estimados:</strong> Poza Rica (≈45–60 min), Tecolutla (≈1 h),
                  Veracruz (≈3.5–4.5 h), CDMX (≈5.5–6.5 h).
                </li>
                <li>
                  <strong>Temporada alta:</strong> Puentes, vacaciones y Cumbre Tajín. Planea con antelación.
                </li>
              </ul>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="rounded-lg bg-amber-50 py-3">
                  <p className="text-[11px] text-amber-700 uppercase tracking-wide">Sensación</p>
                  <p className="text-sm font-semibold text-amber-900">Cálida</p>
                </div>
                <div className="rounded-lg bg-cyan-50 py-3">
                  <p className="text-[11px] text-cyan-700 uppercase tracking-wide">Humedad</p>
                  <p className="text-sm font-semibold text-cyan-900">Alta</p>
                </div>
                <div className="rounded-lg bg-emerald-50 py-3">
                  <p className="text-[11px] text-emerald-700 uppercase tracking-wide">Sombras</p>
                  <p className="text-sm font-semibold text-emerald-900">Recomendadas</p>
                </div>
              </div>
            </article>
          </div>

          <div id="llegar" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={18} className="text-[#bb904d]" />
                <h2 className="text-xl font-bold text-[#2c363b]">Cómo llegar</h2>
              </div>
              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  <strong>Bus:</strong> Conexiones desde Poza Rica, Veracruz y CDMX (ADO y líneas regionales).
                </p>
                <p>
                  <strong>Auto:</strong> Vías federales/estatales conectan con Poza Rica, Tecolutla y Veracruz-Puerto.
                </p>
              </div>
              <details className="mt-4 group">
                <summary className="cursor-pointer select-none text-sm text-[#2c363b] font-medium flex items-center gap-2">
                  <Users size={16} /> Consejos de traslado
                  <span className="ml-auto text-[#bb904d] group-open:hidden">+ abrir</span>
                  <span className="ml-auto text-[#bb904d] hidden group-open:inline">– cerrar</span>
                </summary>
                <ul className="mt-2 space-y-2 text-sm text-gray-700">
                  <li>Compra boletos con antelación en puentes y vacaciones.</li>
                  <li>Si manejas, considera peajes y periodos de mayor tráfico.</li>
                  <li>
                    Para grupos, las{' '}
                    <a href="/agencias" className="text-[#bb904d] underline">
                      agencias locales
                    </a>{' '}
                    son una gran opción.
                  </li>
                </ul>
              </details>
            </article>

            <article
              id="transporte"
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-2 mb-3">
                <Ticket size={18} className="text-[#bb904d]" />
                <h2 className="text-xl font-bold text-[#2c363b]">Transporte local</h2>
              </div>
              <div className="space-y-3 text-sm text-gray-700">
                <p>
                  <strong>En ciudad:</strong> Taxis locales y transporte urbano a puntos cercanos.
                </p>
                <p>
                  <strong>Atractivos:</strong> Para El Tajín, Takilhsukut o Cuyuxquihui, considera taxi, transporte suburbano o tour.
                </p>
                <p>
                  <strong>Horarios:</strong> Verifica últimos retornos (especialmente fines de semana y feriados).
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-full text-xs bg-indigo-50 text-indigo-700">Tarifa local</span>
                <span className="px-2.5 py-1 rounded-full text-xs bg-rose-50 text-rose-700">Último regreso</span>
                <span className="px-2.5 py-1 rounded-full text-xs bg-emerald-50 text-emerald-700">Tour recomendado</span>
              </div>
            </article>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-2 mb-3">
                <Camera size={18} className="text-[#bb904d]" />
                <h2 className="text-xl font-bold text-[#2c363b]">Eventos & temporada</h2>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <strong>Cumbre Tajín:</strong> Actividades en Takilhsukut y zona arqueológica.
                </li>
                <li>
                  <strong>Tradiciones:</strong> Danzas y rituales totonacas a lo largo del año.
                </li>
                <li>
                  <strong>Mercados:</strong> Sábados y domingos con mayor movimiento y productos locales.
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-2 mb-3">
                <Users size={18} className="text-[#bb904d]" />
                <h2 className="text-xl font-bold text-[#2c363b]">Seguridad & salud</h2>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>Hidrátate y usa bloqueador/repelente.</li>
                <li>Cuida tus pertenencias en zonas concurridas.</li>
                <li>
                  Emergencias en México: <strong>911</strong>.
                </li>
              </ul>
            </article>

            <article className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-2 mb-3">
                <Building size={18} className="text-[#bb904d]" />
                <h2 className="text-xl font-bold text-[#2c363b]">Accesibilidad & familias</h2>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>Varios sitios cuentan con accesos y rampas (confirma en taquilla).</li>
                <li>Planea descansos/sombras para carriolas y adultos mayores.</li>
                <li>Snacks ligeros y agua para niñas y niños.</li>
              </ul>
            </article>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="bg-gradient-to-br from-[#1dace0] via-[#2b9ccf] to-[#bb904d] p-6">
              <h2 className="text-2xl font-bold text-white mb-1">Organiza tu viaje con MiPapantla</h2>
              <p className="text-white/95 text-sm">
                Hospedaje, comida tradicional, experiencias y agencias locales para armar tu itinerario.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-0">
              {[
                { href: '/hoteles', label: 'Hospedaje' },
                { href: '/restaurantes', label: 'Restaurantes' },
                { href: '/experiencias', label: 'Experiencias' },
                { href: '/agencias', label: 'Agencias' },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="group p-4 text-center bg-white hover:bg-gray-50 border-t border-gray-100 sm:border-t-0 sm:border-l"
                >
                  <span className="inline-flex items-center justify-center gap-1 text-[#2c363b] font-medium">
                    {l.label}
                    <Star
                      size={14}
                      className="text-yellow-400 fill-current opacity-0 group-hover:opacity-100 transition"
                    />
                  </span>
                  <p className="text-[11px] text-gray-500 mt-1">Ver opciones</p>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-[#2c363b] mb-3">Preguntas frecuentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
              <details className="group rounded-lg border border-gray-100 p-3 open:bg-gray-50">
                <summary className="cursor-pointer font-medium text-[#2c363b]">
                  ¿Necesito guía para visitar El Tajín?
                </summary>
                <p className="mt-1">No es obligatorio, pero enriquece la visita. Pregunta por guías acreditados en la entrada.</p>
              </details>
              <details className="group rounded-lg border border-gray-100 p-3 open:bg-gray-50">
                <summary className="cursor-pointer font-medium text-[#2c363b]">
                  ¿Se aceptan tarjetas en todos lados?
                </summary>
                <p className="mt-1">No siempre. Lleva efectivo para mercados, artesanías y transporte local.</p>
              </details>
              <details className="group rounded-lg border border-gray-100 p-3 open:bg-gray-50">
                <summary className="cursor-pointer font-medium text-[#2c363b]">
                  ¿Puedo visitar con mascotas?
                </summary>
                <p className="mt-1">
                  Depende del sitio. En espacios arqueológicos suele estar restringido; consulta reglamento local.
                </p>
              </details>
              <details className="group rounded-lg border border-gray-100 p-3 open:bg-gray-50">
                <summary className="cursor-pointer font-medium text-[#2c363b]">
                  ¿Hay lockers o guarda equipaje?
                </summary>
                <p className="mt-1">No es común. Viaja ligero para mayor comodidad.</p>
              </details>
            </div>
          </div>
        </section>
      </main>
      <BottomNavigation />
    </div>
  )
}

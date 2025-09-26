// src/app/eventos/page.tsx
import Header from '@/components/Header'
import BottomNavigation from '@/components/BottomNavigation'
import Image from 'next/image'
import {
  CalendarDays,
  MapPin,
  Clock,
  Ticket,
  Info,
  PartyPopper,
  Star,
  Sparkles,
  Gift,
} from 'lucide-react'

type EventCore = {
  slug: string
  title: string
  image: string         // TODO: reemplaza por la ruta correcta de tu imagen optimizada
  location?: string
  venue?: string
  price?: string
  description: string
  highlights?: string[]
  link?: string
}

type Dated = {
  dateStart?: string    // ISO (YYYY-MM-DD) si hay fecha
  dateEnd?: string      // ISO (YYYY-MM-DD) si hay rango
  monthHint?: number    // 1..12 para “fechas por confirmar”
  tbc?: boolean         // fechas por confirmar
  allYear?: boolean     // abierto todo el año
}

type EventItem = EventCore & Dated

// -------------------- UTILIDADES --------------------
const MONTHS_ES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
]

function toDateISO(d?: string) {
  return d ? new Date(d + 'T00:00:00') : undefined
}

function formatDateRangeEs(start?: string, end?: string) {
  if (!start && !end) return ''
  const s = toDateISO(start)
  const e = toDateISO(end)
  if (s && !e) {
    return s.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
  }
  if (!s && e) {
    return e.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
  }
  if (s && e) {
    const sameMonth = s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()
    if (sameMonth) {
      // 14–22 de junio de 2025
      return `${s.getDate()}–${e.getDate()} de ${MONTHS_ES[s.getMonth()]} de ${e.getFullYear()}`
    }
    // 31 de oct – 2 de nov de 2025
    const startStr = `${s.getDate()} de ${MONTHS_ES[s.getMonth()]}`
    const endStr = `${e.getDate()} de ${MONTHS_ES[e.getMonth()]} de ${e.getFullYear()}`
    return `${startStr} – ${endStr}`
  }
  return ''
}

function getMonthFromEvent(ev: EventItem): number | 'all-year' | 'tbc' {
  if (ev.allYear) return 'all-year'
  if (ev.tbc && ev.monthHint) return ev.monthHint
  if (ev.dateStart) return (toDateISO(ev.dateStart)!.getMonth() + 1)
  if (ev.dateEnd) return (toDateISO(ev.dateEnd)!.getMonth() + 1)
  return 'tbc'
}

function isUpcoming(ev: EventItem, from = new Date(), horizonDays = 90) {
  const start = ev.dateStart ? toDateISO(ev.dateStart)! : undefined
  const end = ev.dateEnd ? toDateISO(ev.dateEnd)! : start
  if (!start && !end) return false
  const horizon = new Date(from.getTime() + horizonDays * 24 * 60 * 60 * 1000)
  // si el evento ya terminó completamente, no es “próximo”
  if (end && end < from) return false
  // si empieza o está en curso en los próximos N días
  if (start && start <= horizon) return true
  return false
}

// -------------------- DATOS (con tus textos) --------------------
const EVENTS: EventItem[] = [
  {
    slug: 'cumbre-tajin',
    title: 'Cumbre Tajín',
    image: '/pictures/cumbre-tajin.jpeg', // TODO: reemplaza por tu imagen
    location: 'Papantla, Veracruz',
    venue: 'Parque Takilhsukut · Zona Arqueológica El Tajín · Zócalo',
    price: 'Variado según actividades',
    description:
      'Festival cultural que preserva y difunde la riqueza cultural y arqueológica de la Ciudad Sagrada de El Tajín. Ceremonias, talleres, rituales, terapias, juegos autóctonos, conciertos, danzas, circo, conferencias, exposiciones y más.',
    highlights: ['Equinoccio de primavera', 'Talleres y rituales', 'Conciertos y danzas'],
    // Edición típica alrededor del equinoccio de primavera. Para 2025, referencial:
    dateStart: '2025-03-19',
    dateEnd: '2025-03-24',
  },
  {
    slug: 'rancho-fest',
    title: 'Rancho Fest',
    image: '/pictures/rancho-fest.jpeg', // TODO: reemplaza por tu imagen
    location: 'Papantla, Veracruz',
    venue: 'Rancho Playa',
    price: 'Acceso general',
    description:
      'Festival playero con música en vivo, torneos deportivos, talleres para niños y gastronomía local. Enfocado en fortalecer el turismo y la convivencia familiar.',
    highlights: ['Música en vivo', 'Fútbol y voleibol', 'Talleres y gastronomía'],
    dateStart: '2025-04-18',
    dateEnd: '2025-04-19',
  },
  {
    slug: 'carnaval-papantla',
    title: 'Carnaval de Papantla – Carnaval de la Alegría',
    image: '/pictures/carnaval.jpeg', // TODO: reemplaza por tu imagen
    location: 'Papantla, Veracruz',
    venue: 'Desfile por la ciudad · Concierto en Campo Deportivo Anáhuac',
    price: 'Gratuito (concierto: acceso según programa)',
    description:
      'Desfile de comparsas y carros alegóricos; gran concierto con artistas invitados. Colores, ritmo y alegría en las calles de Papantla.',
    highlights: ['Desfile', 'Concierto', 'Ambiente familiar'],
    dateStart: '2025-05-24',
  },
  {
    slug: 'feria-corpus-christi',
    title: 'Feria de Corpus Christi',
    image: '/pictures/corpus-christi.jpeg', // TODO: reemplaza por tu imagen
    location: 'Papantla, Veracruz',
    venue: 'Terrenos de la feria · Campo Deportivo Anáhuac',
    price: 'Variado según evento',
    description:
      'Celebración anual que combina elementos religiosos y culturales: conciertos, Festival Xanath, danzas y rituales, cabalgata, muestra gastronómica y más.',
    highlights: ['Conciertos', 'Festival Xanath', 'Cabalgata', 'Gastronomía'],
    dateStart: '2025-06-14',
    dateEnd: '2025-06-22',
  },
  {
    slug: 'festival-xanath',
    title: 'Festival Xanath',
    image: '/pictures/festival-xanath.jpeg', // TODO: reemplaza por tu imagen
    location: 'Papantla, Veracruz',
    venue: 'Campo Deportivo Anáhuac',
    price: 'Acceso según programa',
    description:
      'Monumental obra de teatro al aire libre que celebra la cosmovisión totonaca, con más de 300 participantes. Parte de la Feria de Corpus Christi.',
    highlights: ['Ofrenda Cósmica', 'Danzas autóctonas', 'Cosmovisión totonaca'],
    // Dentro de la feria 2025: 19 y 22 de junio (modelo como rango de la feria)
    dateStart: '2025-06-19',
    dateEnd: '2025-06-22',
  },
  {
    slug: 'feria-del-tumin',
    title: 'Feria del Túmin',
    image: '/pictures/feria-tumin.jpeg', // TODO: reemplaza por tu imagen
    location: 'Papantla, Veracruz',
    venue: 'Parque Israel C. Téllez',
    price: 'Acceso libre',
    description:
      'Celebración de economía solidaria y cultura local: talleres, exposiciones, trueque, diálogos sobre sustentabilidad, música, danza y gastronomía.',
    highlights: ['Trueque', 'Economía solidaria', 'Artesanías y orgánicos'],
    dateStart: '2025-07-18',
    dateEnd: '2025-07-20',
  },
  {
    slug: 'ninin-dia-de-muertos',
    title: 'Ninín · Día de Muertos',
    image: '/pictures/ninin.jpeg', // TODO: reemplaza por tu imagen
    location: 'Papantla, Veracruz',
    venue: 'Cementerio · Centro de la ciudad',
    price: 'Libre',
    description:
      'Procesión simbólica donde las “calaveras” descienden del cementerio al centro, con danzas totonacas y tradiciones que reflejan el sincretismo cultural.',
    highlights: ['Procesión', 'Danzas totonacas', 'Altares y tradición'],
    dateStart: '2025-10-31',
    dateEnd: '2025-11-02',
  },
  {
    slug: 'feria-de-la-vainilla',
    title: 'Feria de la Vainilla',
    image: '/pictures/feria-vainilla.jpeg', // TODO: reemplaza por tu imagen
    location: 'Papantla, Veracruz',
    venue: 'Centro histórico',
    price: 'Acceso libre',
    description:
      'Expo-venta de vainilla y derivados, degustaciones, demostraciones culinarias, talleres y concursos. Conmemora el Día Nacional de la Vainilla (16 de diciembre).',
    highlights: ['Expo-venta', 'Degustaciones', 'Talleres y concursos'],
    // Fechas varían por edición → tbc con mes sugerido
    tbc: true,
    monthHint: 12,
  },
  {
    slug: 'navidad-en-papantla',
    title: 'Navidad en Papantla',
    image: '/pictures/navidad.jpeg', // TODO: reemplaza por tu imagen
    location: 'Papantla, Veracruz',
    venue: 'Centro · Foros artísticos · Villa Navideña',
    price: 'Libre (según actividad)',
    description:
      'Programa navideño: Villa, desfiles de carritos y faroles, foro artístico y cultural, desfile navideño y árbol monumental.',
    highlights: ['Villa navideña', 'Desfiles', 'Foro artístico y cultural'],
    dateStart: '2025-12-01',
    dateEnd: '2026-01-06',
  },
  {
    slug: 'ruta-chichinit',
    title: 'Ruta Chichinit',
    image: '/pictures/chichinit.jpeg', // TODO: reemplaza por tu imagen
    location: 'Rancho Playa',
    description:
      'Más de 100 participantes en razers, jeeps, cuatrimotos, motos y buggies; en un recorrido de aventura desde Rancho Playa (Papantla) hasta Playa Boquillas (Cazones).',
    highlights: ['playa', 'Paisaje natural', 'zona costera'],
    allYear: true,
  },
]

// -------------------- VISTAS --------------------
export default function Eventos() {
  // agrupamos por mes
  const byMonth = new Map<number, EventItem[]>()
  const tbcList: EventItem[] = []
  const allYearList: EventItem[] = []

  EVENTS.forEach((ev) => {
    const bucket = getMonthFromEvent(ev)
    if (bucket === 'all-year') {
      allYearList.push(ev)
    } else if (bucket === 'tbc') {
      tbcList.push(ev)
    } else {
      if (!byMonth.has(bucket)) byMonth.set(bucket, [])
      byMonth.get(bucket)!.push(ev)
    }
  })

  // próximos (siguientes ~90 días)
  const now = new Date()
  const upcoming = EVENTS
    .filter((ev) => isUpcoming(ev, now, 120))
    .sort((a, b) => {
      const ad = toDateISO(a.dateStart || a.dateEnd || '')?.getTime() ?? Infinity
      const bd = toDateISO(b.dateStart || b.dateEnd || '')?.getTime() ?? Infinity
      return ad - bd
    })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-6 pb-20">
        {/* HERO */}
        <section className="relative h-64 md:h-72 rounded-xl overflow-hidden mb-8">
          <Image
            src="/pictures/hero-eventos.jpeg" // TODO: imagen hero real
            alt="Eventos en Papantla"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-end md:items-center justify-start md:justify-center p-6 md:p-0">
            <div className="text-left md:text-center text-white max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Eventos de Papantla</h1>
              <p className="mt-2 text-lg md:text-xl opacity-95">
                Cultura viva, festivales y tradiciones durante todo el año
              </p>
            </div>
          </div>
        </section>

        {/* PRÓXIMOS */}
        <section id="proximos" className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <PartyPopper className="text-emerald-600" size={18} />
            <h2 className="text-2xl font-bold text-[#2c363b]">Próximos</h2>
          </div>

          {upcoming.length === 0 ? (
            <div className="text-sm text-gray-700 bg-white border border-gray-100 rounded-lg p-4">
              No hay eventos próximos en el periodo inmediato. Revisa el calendario anual más abajo.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((ev) => (
                <EventCard key={ev.slug} ev={ev} />
              ))}
            </div>
          )}
        </section>

        {/* CALENDARIO ANUAL POR MES */}
        <section className="space-y-10 mb-12">
          {MONTHS_ES.map((m, idx) => {
            const list = byMonth.get(idx + 1) || []
            return (
              <div key={m} id={`mes-${idx + 1}`}>
                <div className="flex items-center gap-2 mb-4">
                  <CalendarDays className="text-[#bb904d]" size={18} />
                  <h3 className="text-xl font-bold text-[#2c363b] capitalize">{m}</h3>
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                    {list.length} evento{list.length === 1 ? '' : 's'}
                  </span>
                </div>
                {list.length === 0 ? (
                  <div className="text-sm text-gray-600 bg-white border border-gray-100 rounded-lg p-4">
                    Sin eventos registrados este mes (por ahora).
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {list.map((ev) => (
                      <EventCard key={ev.slug} ev={ev} />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </section>

        {/* FECHAS POR CONFIRMAR */}
        {tbcList.length > 0 && (
          <section id="tbc" className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <Info className="text-amber-600" size={18} />
              <h2 className="text-2xl font-bold text-[#2c363b]">Fechas por confirmar</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tbcList.map((ev) => (
                <EventCard key={ev.slug} ev={ev} />
              ))}
            </div>
          </section>
        )}



        {/* CTA a secciones del sitio */}
        <section className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
          <div className="bg-gradient-to-br from-[#1dace0] via-[#2b9ccf] to-[#bb904d] p-6">
            <h2 className="text-2xl font-bold text-white mb-1">Arma tu viaje con MiPapantla</h2>
            <p className="text-white/95 text-sm">
              Hospedaje, comida tradicional, experiencias y agencias locales para complementar tu asistencia a los eventos.
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
                  <Star size={14} className="text-yellow-400 fill-current opacity-0 group-hover:opacity-100 transition" />
                </span>
                <p className="text-[11px] text-gray-500 mt-1">Ver opciones</p>
              </a>
            ))}
          </div>
        </section>
      </main>

      <BottomNavigation />
    </div>
  )
}

// -------------------- CARD DE EVENTO --------------------
function EventCard({ ev }: { ev: EventItem }) {
  const dateStr = ev.tbc && ev.monthHint
    ? `Fechas por confirmar · ${MONTHS_ES[ev.monthHint - 1]}`
    : ev.allYear
    ? 'Disponible todo el año'
    : formatDateRangeEs(ev.dateStart, ev.dateEnd)

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-44">
        <Image
          src={ev.image}
          alt={ev.title}
          fill
          className="object-cover w-full h-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-2 left-2 flex items-center gap-1 bg-[#bb904d] text-white px-2 py-1 rounded text-xs font-semibold">
          <CalendarDays size={14} />
          <span>{dateStr}</span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-[#2c363b]">{ev.title}</h3>

        {/* ubicación / sede */}
        {(ev.location || ev.venue) && (
          <div className="mt-1 text-sm text-gray-700 space-y-1">
            {ev.location && (
              <div className="flex items-start gap-1.5">
                <MapPin size={16} className="shrink-0 mt-0.5 text-gray-600" />
                <span>{ev.location}</span>
              </div>
            )}
            {ev.venue && (
              <div className="flex items-start gap-1.5">
                <Clock size={16} className="shrink-0 mt-0.5 text-gray-600" />
                <span>{ev.venue}</span>
              </div>
            )}
          </div>
        )}

        {/* chips */}
        <div className="mt-2 flex flex-wrap gap-2">
          {ev.price && (
            <span className="px-2 py-0.5 rounded text-xs bg-[#f6f7f5] text-[#814739] inline-flex items-center gap-1">
              <Ticket size={14} /> {ev.price}
            </span>
          )}
          {ev.highlights?.slice(0, 3).map((h, i) => (
            <span key={i} className="px-2 py-0.5 rounded text-xs bg-[#bb904d]/10 text-[#814739]">
              {h}
            </span>
          ))}
        </div>

        {/* detalles nativos */}
        <details className="group mt-3">
          <summary className="cursor-pointer select-none text-sm text-[#2c363b] font-medium flex items-center gap-2">
            <Info size={16} />
            Más información
            <span className="ml-auto text-[#bb904d] group-open:hidden">+ abrir</span>
            <span className="ml-auto text-[#bb904d] hidden group-open:inline">– cerrar</span>
          </summary>
          <div className="mt-2 text-sm text-gray-700 space-y-2">
            <p className="whitespace-pre-line">{ev.description}</p>
            {ev.highlights && ev.highlights.length > 0 && (
              <p>
                <span className="font-medium text-[#2c363b]">Destacados:</span>{' '}
                {ev.highlights.join(' · ')}
              </p>
            )}
            {ev.link && (
              <p>
                <a
                  href={ev.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#bb904d] underline"
                >
                  Sitio / Programa
                </a>
              </p>
            )}
          </div>
        </details>
      </div>
    </article>
  )
}

'use client'

import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/context/LanguageContext"

type Shape = "square" | "wide" | "tall"

interface MosaicBlock {
  id: string
  translationKey: string // Nueva clave para i18n
  href: string
  image: string
  shape: Shape
  labelPosition: "tl" | "tr" | "bl" | "br"
  group: "featured" | "service" | "explore"
  priority: number
}

const blocks: MosaicBlock[] = [
  // === HERO ===
  {
    id: "eventos",
    translationKey: "grid.eventos",
    href: "/eventos",
    image: "/pictures/eventos.jpg",
    shape: "wide",
    labelPosition: "bl",
    group: "featured",
    priority: 1,
  },
  {
    id: "visitame",
    translationKey: "grid.visitame",
    href: "/visitame",
    image: "/pictures/visitame.jpeg",
    shape: "tall",
    labelPosition: "tl",
    group: "featured",
    priority: 2,
  },

  // === SERVICIOS ===
  {
    id: "hospedaje",
    translationKey: "grid.hospedaje",
    href: "/hoteles",
    image: "/pictures/hospedaje.jpg",
    shape: "wide",
    labelPosition: "br",
    group: "service",
    priority: 10,
  },
  {
    id: "restaurantes",
    translationKey: "grid.restaurantes",
    href: "/restaurantes",
    image: "/pictures/restaurantes.jpeg",
    shape: "square",
    labelPosition: "tl",
    group: "service",
    priority: 11,
  },
  {
    id: "mercados",
    translationKey: "grid.mercados",
    href: "/mercados",
    image: "/pictures/mercado.jpg",
    shape: "square",
    labelPosition: "tr",
    group: "service",
    priority: 12,
  },
  {
    id: "salud",
    translationKey: "grid.salud",
    href: "/salud",
    image: "/pictures/salud.png",
    shape: "square",
    labelPosition: "bl",
    group: "service",
    priority: 13,
  },
  {
    id: "profesionales",
    translationKey: "grid.profesionales",
    href: "/servicios",
    image: "/pictures/profesionales.avif",
    shape: "square",
    labelPosition: "bl",
    group: "service",
    priority: 14,
  },

  // === EXPLORA ===
  {
    id: "experiencias",
    translationKey: "grid.experiencias",
    href: "/experiencias",
    image: "/pictures/experiencias.jpg",
    shape: "tall",
    labelPosition: "tl",
    group: "explore",
    priority: 20,
  },
  {
    id: "turismo-aventura",
    translationKey: "grid.agencias",
    href: "/turismo-aventura",
    image: "/pictures/turismo rural.jpg",
    shape: "wide",
    labelPosition: "tl",
    group: "explore",
    priority: 21,
  },
  {
    id: "playas",
    translationKey: "grid.playas",
    href: "/playas",
    image: "/pictures/playa.jpg",
    shape: "wide",
    labelPosition: "br",
    group: "explore",
    priority: 23,
  },
  {
    id: "vainilla",
    translationKey: "grid.vainilla",
    href: "/vainilla",
    image: "/pictures/vainilla.jpg",
    shape: "tall",
    labelPosition: "bl",
    group: "explore",
    priority: 24,
  },
]

function labelPosCls(pos: MosaicBlock["labelPosition"]) {
  switch (pos) {
    case "tl": return "top-4 left-4"
    case "tr": return "top-4 right-4 text-right"
    case "bl": return "bottom-4 left-4"
    case "br": return "bottom-4 right-4 text-right"
  }
}

function spanByShape(shape: Shape) {
  switch (shape) {
    case "wide": return "md:col-span-2 md:row-span-2"
    case "tall": return "md:row-span-3"
    case "square": return "md:row-span-2"
  }
}

// Subcomponente Card que recibe la función de traducción o el texto ya traducido
function Card({ b, translatedTitle }: { b: MosaicBlock; translatedTitle: string }) {
  return (
    <Link href={b.href} className={`block group w-full h-56 md:h-full relative ${spanByShape(b.shape)}`}>
      <div className="relative w-full h-full overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition">
        <Image
          src={b.image}
          alt={translatedTitle}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className={`absolute ${labelPosCls(b.labelPosition)} text-white font-extrabold tracking-wide drop-shadow text-lg md:text-xl lg:text-2xl max-w-[90%]`}>
          <span className="uppercase border-b-2 border-[#bb904d]/0 group-hover:border-[#bb904d] transition-all pb-0.5">
            {translatedTitle}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function MosaicHome() {
  const { t } = useLanguage() // Hook de traducción

  const featured = blocks.filter(b => b.group === "featured")
  const rest = blocks.filter(b => b.group !== "featured")

  return (
    <div className="space-y-4 md:space-y-6">

      {/* HERO SECTION */}
      <section className="grid grid-cols-1 md:grid-cols-5 gap-4">

        {/* Bloque 1: Eventos */}
        <div className="w-full aspect-[16/9] md:col-span-3 md:aspect-auto md:h-full relative transform transition hover:scale-[1.01] duration-300">
          <div className="w-full h-full">
            <Link href={featured[0].href} className="block group w-full h-full relative">
              <div className="relative w-full h-full overflow-hidden rounded-xl shadow-md hover:shadow-xl transition">
                <Image
                  src={featured[0].image}
                  alt={t(featured[0].translationKey)}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                <div className={`absolute bottom-6 left-6 text-white font-black tracking-wider drop-shadow-md text-2xl md:text-4xl`}>
                  {t(featured[0].translationKey)}
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Bloque 2: Visitame */}
        <div className="w-full aspect-[16/9] md:col-span-2 md:aspect-auto md:h-full relative">
          <div className="w-full h-full">
            <Link href={featured[1].href} className="block group w-full h-full relative">
              <div className="relative w-full h-full overflow-hidden rounded-xl shadow-md hover:shadow-xl transition">
                <Image
                  src={featured[1].image}
                  alt={t(featured[1].translationKey)}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className={`absolute top-6 left-6 text-white font-black tracking-wider drop-shadow-md text-2xl md:text-3xl`}>
                  {t(featured[1].translationKey)}
                </div>
              </div>
            </Link>
          </div>
        </div>

      </section>

      {/* MASONRY GRID RESTO */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:auto-rows-[140px] gap-4">
        {rest.map(b => (
          <Card key={b.id} b={b} translatedTitle={t(b.translationKey)} />
        ))}
      </section>

    </div>
  )
}

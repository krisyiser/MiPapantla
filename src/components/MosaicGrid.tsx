import Link from "next/link"

type Shape = "square" | "wide" | "tall"

interface MosaicBlock {
  id: string
  title: string
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
    title: "EVENTOS",
    href: "/eventos",
    image: "/pictures/eventos.jpg",
    shape: "wide",
    labelPosition: "bl",
    group: "featured",
    priority: 1,
  },
  {
    id: "visitame",
    title: "¡VISÍTAME!",
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
    title: "HOSPEDAJE",
    href: "/hoteles",
    image: "/pictures/hospedaje.jpg",
    shape: "wide",
    labelPosition: "br",
    group: "service",
    priority: 10,
  },
  {
    id: "restaurantes",
    title: "RESTAURANTES",
    href: "/restaurantes",
    image: "/pictures/restaurantes.jpeg",
    shape: "square",
    labelPosition: "tl",
    group: "service",
    priority: 11,
  },
  {
    id: "mercados",
    title: "MERCADOS",
    href: "/mercados",
    image: "/pictures/mercado.jpg",
    shape: "square",
    labelPosition: "tr",
    group: "service",
    priority: 12,
  },
  {
    id: "salud",
    title: "SALUD",
    href: "/salud",
    image: "/pictures/salud.png",
    shape: "square",
    labelPosition: "bl",
    group: "service",
    priority: 13,
  },
  {
    id: "profesionales",
    title: "Servicios Profesionales",
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
    title: "EXPERIENCIAS",
    href: "/experiencias",
    image: "/pictures/experiencias.jpg",
    shape: "tall",
    labelPosition: "tl",
    group: "explore",
    priority: 20,
  },
  {
    id: "turismo-aventura",
    title: "AGENCIAS DE TURISMO",
    href: "/turismo-aventura",
    image: "/pictures/turismo rural.jpg",
    shape: "wide",
    labelPosition: "tl",
    group: "explore",
    priority: 21,
  },
  {
    id: "playas",
    title: "PLAYAS",
    href: "/playas",
    image: "/pictures/playa.jpg",
    shape: "wide",
    labelPosition: "br",
    group: "explore",
    priority: 23,
  },
  {
    id: "vainilla",
    title: "VAINILLA",
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
    case "wide": return "row-span-2"
    case "tall": return "row-span-3"
    case "square": return "row-span-2"
  }
}

function Card({ b }: { b: MosaicBlock }) {
  return (
    <Link href={b.href} className={`block group ${spanByShape(b.shape)}`}>
      <div className="relative w-full h-full overflow-hidden rounded-xl shadow hover:shadow-lg transition">
        <img
          src={b.image}
          alt={b.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        <div className={`absolute ${labelPosCls(b.labelPosition)} text-white font-extrabold tracking-wide drop-shadow text-base md:text-lg lg:text-xl max-w-[85%]`}>
          {b.title}
        </div>
      </div>
    </Link>
  )
}

export default function MosaicHome() {
  const featured = blocks.filter(b => b.group === "featured")
  const rest = blocks.filter(b => b.group !== "featured")

  return (
    <div className="space-y-6">

      {/* HERO */}
      <section className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-3 aspect-[16/9]">
          <Card b={featured[0]} />
        </div>
        <div className="md:col-span-2 aspect-[3/4]">
          <Card b={featured[1]} />
        </div>
      </section>

      {/* MASONRY GRID REAL */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[140px] gap-4">
        {rest.map(b => (
          <Card key={b.id} b={b} />
        ))}
      </section>

    </div>
  )
}
